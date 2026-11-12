/**
 * Masters the house band: from the provider's FLAC files in music/ to the
 * files the game plays, in public/audio/music/.
 *
 * Usage: node tools/master-music.mjs [--cue=<id>] [--list]
 *
 *   (no option)   every piece, then src/engine/music_files.js is rewritten
 *   --cue=<id>    only this piece; the table keeps every other entry
 *   --list        the set with its sources and cuts, nothing is written
 *
 * No network and no key: everything here is ffmpeg and arithmetic, so a run
 * can be repeated as often as an ear asks for it. ffmpeg must be on the PATH
 * with libopus.
 *
 * WHAT HAPPENS TO A PIECE, in this order:
 *
 *   1. the source is cut where SET says (`from`, `to`) and, where `fadeOut`
 *      is given, faded over its last seconds - the provider sometimes fades a
 *      band that is still playing, and the next piece follows on `ended`, so
 *      a nine-second fade is nine seconds of a hole
 *   2. silence at either end goes (below -50 dBFS at the front, -60 at the
 *      back), then 5 ms in and 50 ms out against clicks
 *   3. a piece with layers is split into bed and rhythm (see separate()):
 *      bed on channels 1/2, rhythm on 3/4, the bass in the bed
 *   4. one linear gain brings the SUM to its target: the office to
 *      TARGET_LUFS, the emergency and the gala INTENT_DB above it
 *      (music_cues.js). Measured on the sum, because the sum is what plays
 *      at full pressure - and it is exactly the original, bed + rhythm
 *   5. the floor is measured: the bed with the rhythm at RHYTHM_FLOOR_DB
 *      (or the piece's own `floorDb`). More than MAX_FLOOR_LOSS below the
 *      sum, and the band would audibly drop out on a quiet morning - the
 *      piece is refused
 *   6. encoded: Opus 96 kbit/s stereo for every piece, and for a layered one
 *      also 192 kbit/s quad (mapping family 1 - four channels are the one
 *      count whose order every decoder keeps). Bit-exact muxing, so the same
 *      input gives the same bytes
 *   7. filed under `<id>.<8 hex of its SHA-1>.opus` (the quad as
 *      `<id>.quad.<hex>.opus`): same name, same audio - the rule
 *      check-audio.mjs relies on when it copies docs/ back into public/
 *   8. the shipped stereo file is decoded again and measured; that number,
 *      not the one before encoding, goes into the table
 *
 * Every run also builds the probe: four tones (300/500/700/900 Hz) on four
 * channels, encoded the same way and decoded again to prove the order holds.
 * engine_audio.probeLayers() plays it silently once a session and uses the
 * quad files only if channels 3 and 4 arrive.
 *
 * A re-mastered piece gets a new name. The old one is deleted from
 * public/audio/music/ AND from docs/audio/music/ - otherwise check-audio.mjs
 * would copy it back out of docs/ before the next build, and the week suite
 * fails on a file without an entry.
 */
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync, rmSync, renameSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { CUES, TARGET_LUFS, INTENT_DB, RHYTHM_FLOOR_DB, MAX_FLOOR_LOSS, PROBE_TONES } from '../src/engine/music_cues.js';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SRC_DIR = `${ROOT}music/`;
const WORK = `${ROOT}music/work/`;
const OUT_DIRS = [`${ROOT}public/audio/music/`, `${ROOT}docs/audio/music/`];
const TABLE = `${ROOT}src/engine/music_files.js`;
const SR = 48000;

/**
 * Where each piece comes from and how it is cut. The choice of take and every
 * cut is recorded with its measurement in music/prompts.md ("Messprotokoll");
 * the edges were measured again before this table was written (12.11.2026):
 *
 *   day_2      the band plays on under a fade from 170 s (attacks to 178.7 s):
 *              cut at the bar at 171.25 s with a 1.5 s release
 *   morning_2  the same after the last bar hit at 168 s: cut at 171 s, 2 s
 *   emergency_2  26.6 s of a quiet intro; bar 17 begins at 26.66 s
 *   lunch_1    NOT cut: after the last attack at 171.4 s the level falls
 *              without a single further attack - a closing chord, not a fade
 *   gala_2     NOT cut: ends 0.2 s after a downbeat, which reads as a button
 */
const SET = {
    morning_1:   { src: '03_morning_1_v2.flac' },
    morning_2:   { src: '04_morning_2_v2.flac', to: 171.0, fadeOut: 2.0 },
    day_a:       { src: 'Office_Bossa_Underscore_2026-11-11T180655.flac' },
    day_1:       { src: '01_day_1_v3.flac' },
    day_2:       { src: '02_day_2_v2.flac', to: 171.25, fadeOut: 1.5 },
    day_3:       { src: '05_day_3_v2.flac' },
    day_4:       { src: '06_day_4_v1.flac' },
    lunch_1:     { src: '07_lunch_1_v1.flac' },
    afternoon_1: { src: '08_afternoon_1_v1.flac' },
    afternoon_2: { src: '09_afternoon_2_v1.flac' },
    tense_1:     { src: '10_tense_1_v2.flac' },
    tense_2:     { src: '11_tense_2_v1.flac' },
    tense_3:     { src: '12_tense_3_v1.flac' },
    emergency_a: { src: 'Back_Alley_File_2026-11-11T180453.flac' },
    emergency_2: { src: '13_emergency_2_v2.flac', from: 26.65 },
    emergency_3: { src: '14_emergency_3_v1.flac' },
    gala_1:      { src: '15_gala_1_v1.flac' },
    gala_2:      { src: '16_gala_2_v1.flac' },
    gala_3:      { src: '17_gala_3_v2.flac' },
};

const STEREO_KBPS = 96;
const QUAD_KBPS = 192;

// --- arguments -----------------------------------------------------------------

const args = process.argv.slice(2);
const only = args.find(a => a.startsWith('--cue='))?.slice('--cue='.length);
const listOnly = args.includes('--list');

const missingFromSet = Object.keys(CUES).filter(id => !SET[id]);
const strays = Object.keys(SET).filter(id => !CUES[id]);
if (missingFromSet.length || strays.length) {
    console.error(`The set and music_cues.js disagree.` +
        (missingFromSet.length ? ` No source for: ${missingFromSet.join(', ')}.` : '') +
        (strays.length ? ` Not a piece in the game: ${strays.join(', ')}.` : ''));
    process.exit(1);
}
if (only && !CUES[only]) {
    console.error(`Unknown piece "${only}". Pieces: ${Object.keys(CUES).join(', ')}`);
    process.exit(1);
}

const targetOf = (id) => TARGET_LUFS + (INTENT_DB[CUES[id].pool] ?? 0);

if (listOnly) {
    for (const [id, s] of Object.entries(SET)) {
        const cut = [s.from != null && `from ${s.from} s`, s.to != null && `to ${s.to} s`, s.fadeOut && `${s.fadeOut} s release`]
            .filter(Boolean).join(', ') || 'whole';
        console.log(`${id.padEnd(12)} ${CUES[id].pool.padEnd(10)} ${CUES[id].layers ? 'layers' : 'stereo'}  ` +
                    `${targetOf(id).toFixed(1)} LUFS  ${cut.padEnd(30)} ${s.src}`);
    }
    process.exit(0);
}

// --- ffmpeg ----------------------------------------------------------------------

function ffmpeg(argv, what) {
    const r = spawnSync('ffmpeg', ['-hide_banner', '-nostdin', ...argv], { maxBuffer: 1 << 30 });
    if (r.status !== 0) {
        console.error(`ffmpeg failed while ${what}:\n${r.stderr.toString().slice(-1500)}`);
        process.exit(1);
    }
    return r;
}

/** The source, cut, as interleaved stereo float at 48 kHz. */
function decode(path, from, to) {
    const trim = [];
    if (from != null) trim.push(`start=${from}`);
    if (to != null) trim.push(`end=${to}`);
    const af = trim.length ? ['-af', `atrim=${trim.join(':')},asetpts=PTS-STARTPTS`] : [];
    const r = ffmpeg(['-v', 'error', '-i', path, ...af, '-f', 'f32le', '-ac', '2', '-ar', String(SR), '-'], `decoding ${path}`);
    return new Float32Array(r.stdout.buffer, r.stdout.byteOffset, r.stdout.byteLength / 4).slice();
}

/** Integrated loudness (LUFS) of raw float audio with `channels` channels. */
function loudness(rawPath, channels, pan) {
    const af = (pan ? `${pan},` : '') + 'ebur128=framelog=quiet';
    const r = ffmpeg(['-v', 'info', '-nostats', '-f', 'f32le', '-ac', String(channels), '-ar', String(SR),
                      '-i', rawPath, '-af', af, '-f', 'null', '-'], 'measuring loudness');
    const m = r.stderr.toString().match(/I:\s+(-?[\d.]+) LUFS/g);
    if (!m) { console.error(`No loudness in ffmpeg's report for ${rawPath}`); process.exit(1); }
    return parseFloat(m[m.length - 1].replace(/[^-\d.]/g, ''));
}

/** Integrated loudness of an encoded file, as it ships. */
function loudnessOfFile(path) {
    const r = ffmpeg(['-v', 'info', '-nostats', '-i', path, '-af', 'ebur128=framelog=quiet', '-f', 'null', '-'], `measuring ${path}`);
    const m = r.stderr.toString().match(/I:\s+(-?[\d.]+) LUFS/g);
    return parseFloat(m[m.length - 1].replace(/[^-\d.]/g, ''));
}

function encode(rawPath, layout, kbps, outPath) {
    const family = layout === 'quad' ? ['-mapping_family', '1'] : [];
    ffmpeg(['-v', 'error', '-y', '-f', 'f32le', '-ar', String(SR), '-ch_layout', layout, '-i', rawPath,
            '-c:a', 'libopus', '-b:a', `${kbps}k`, ...family,
            '-fflags', '+bitexact', '-flags:a', '+bitexact', '-map_metadata', '-1', outPath], `encoding ${outPath}`);
}

/** The channel count an Ogg Opus file declares in its OpusHead. */
function opusChannels(bytes) {
    const at = bytes.indexOf('OpusHead');
    return at < 0 ? 0 : bytes[at + 9];
}

// --- edges -------------------------------------------------------------------------

/** Fades the last `seconds` of interleaved stereo out along a raised cosine. */
function fadeOutTail(x, seconds) {
    const len = x.length / 2, n = Math.min(len, Math.round(seconds * SR));
    for (let i = 0; i < n; i++) {
        const g = 0.5 + 0.5 * Math.cos(Math.PI * (i + 1) / n);
        const k = len - n + i;
        x[2 * k] *= g; x[2 * k + 1] *= g;
    }
}

/** Silence off both ends, then a short fade in and out against clicks. */
function trimEdges(x) {
    const len = x.length / 2;
    const loud = (i, lim) => Math.max(Math.abs(x[2 * i]), Math.abs(x[2 * i + 1])) >= lim;
    let first = 0;
    while (first < len && !loud(first, 10 ** (-50 / 20))) first++;
    let last = len - 1;
    while (last > first && !loud(last, 10 ** (-60 / 20))) last--;
    const a = Math.max(0, first - Math.round(0.005 * SR));
    const b = Math.min(len, last + Math.round(0.1 * SR));
    const y = x.slice(2 * a, 2 * b);
    const n = y.length / 2;
    const fin = Math.min(n, Math.round(0.005 * SR)), fout = Math.min(n, Math.round(0.05 * SR));
    for (let i = 0; i < fin; i++) { y[2 * i] *= i / fin; y[2 * i + 1] *= i / fin; }
    for (let i = 0; i < fout; i++) {
        const k = n - 1 - i, g = i / fout;
        y[2 * k] *= g; y[2 * k + 1] *= g;
    }
    return { y, cutFront: a / SR, cutBack: (len - b) / SR };
}

// --- the split -----------------------------------------------------------------------

/**
 * Bed and rhythm out of one finished stereo piece, with nothing but Node.
 *
 *   rhythm = what is percussive: median filtering of the spectrogram
 *            (Fitzgerald 2010), a soft mask, back to the time domain
 *   bed    = original - rhythm, sample by sample
 *
 * So bed + rhythm IS the original, and whatever the split gets wrong is
 * audible only in proportion to how far the rhythm is turned down. The bass
 * stays in the bed: measured on the auditions (11.11.2026), a bed without it
 * cost up to 2.3 LU at the floor, with it 1.5. This is the separation the
 * operator heard on the density probe page.
 *
 * Returns interleaved quad: bedL bedR rhythmL rhythmR.
 */
function separate(inter) {
    const N = 2048, HOP = 512, BINS = N / 2 + 1;
    const KT = 41;     // median over time: 41 frames = 0.44 s
    const KF = 17;     // median over frequency: 17 bins = 400 Hz
    const len = inter.length / 2;
    const PAD = N, padded = len + 2 * PAD;
    const ch = [new Float32Array(padded), new Float32Array(padded)];
    for (let i = 0; i < len; i++) { ch[0][i + PAD] = inter[2 * i]; ch[1][i + PAD] = inter[2 * i + 1]; }
    const frames = Math.floor((padded - N) / HOP) + 1;

    const rev = new Uint32Array(N);
    for (let i = 0, bits = Math.log2(N); i < N; i++) {
        let r = 0;
        for (let b = 0; b < bits; b++) r |= ((i >> b) & 1) << (bits - 1 - b);
        rev[i] = r;
    }
    const cosT = new Float64Array(N / 2), sinT = new Float64Array(N / 2);
    for (let i = 0; i < N / 2; i++) { cosT[i] = Math.cos(2 * Math.PI * i / N); sinT[i] = Math.sin(2 * Math.PI * i / N); }
    const fft = (re, im, inverse) => {
        for (let i = 0; i < N; i++) {
            const j = rev[i];
            if (j > i) { let t = re[i]; re[i] = re[j]; re[j] = t; t = im[i]; im[i] = im[j]; im[j] = t; }
        }
        for (let size = 2; size <= N; size <<= 1) {
            const half = size >> 1, step = N / size;
            for (let start = 0; start < N; start += size) {
                for (let k = 0, t = 0; k < half; k++, t += step) {
                    const wr = cosT[t], wi = inverse ? sinT[t] : -sinT[t];
                    const a = start + k, b = a + half;
                    const xr = re[b] * wr - im[b] * wi, xi = re[b] * wi + im[b] * wr;
                    re[b] = re[a] - xr; im[b] = im[a] - xi;
                    re[a] += xr; im[a] += xi;
                }
            }
        }
        if (inverse) for (let i = 0; i < N; i++) { re[i] /= N; im[i] /= N; }
    };
    const win = new Float64Array(N);
    for (let i = 0; i < N; i++) win[i] = 0.5 - 0.5 * Math.cos(2 * Math.PI * i / N);

    // Pass 1: the magnitude of both channels together.
    const mag = new Float32Array(frames * BINS);
    const re = new Float64Array(N), im = new Float64Array(N);
    for (let c = 0; c < 2; c++) {
        for (let f = 0; f < frames; f++) {
            const off = f * HOP;
            for (let i = 0; i < N; i++) { re[i] = ch[c][off + i] * win[i]; im[i] = 0; }
            fft(re, im, false);
            const row = f * BINS;
            for (let k = 0; k < BINS; k++) mag[row + k] += re[k] * re[k] + im[k] * im[k];
        }
    }
    for (let i = 0; i < mag.length; i++) mag[i] = Math.sqrt(mag[i]);

    const slidingMedian = (src, n, width, dst) => {
        const half = width >> 1;
        const sorted = new Float64Array(width + 1);
        let size = 0;
        const find = (v) => { let lo = 0, hi = size; while (lo < hi) { const mid = (lo + hi) >> 1; if (sorted[mid] < v) lo = mid + 1; else hi = mid; } return lo; };
        const insert = (v) => { const at = find(v); for (let j = size; j > at; j--) sorted[j] = sorted[j - 1]; sorted[at] = v; size++; };
        const remove = (v) => { const at = find(v); for (let j = at; j < size - 1; j++) sorted[j] = sorted[j + 1]; size--; };
        for (let i = 0; i < Math.min(half, n); i++) insert(src[i]);
        for (let i = 0; i < n; i++) {
            if (i + half < n) insert(src[i + half]);
            if (i - half - 1 >= 0) remove(src[i - half - 1]);
            dst[i] = sorted[size >> 1];
        }
    };

    // Harmonic: the median along time, per bin.
    const harm = new Float32Array(frames * BINS);
    {
        const col = new Float64Array(frames), out = new Float64Array(frames);
        for (let k = 0; k < BINS; k++) {
            for (let f = 0; f < frames; f++) col[f] = mag[f * BINS + k];
            slidingMedian(col, frames, KT, out);
            for (let f = 0; f < frames; f++) harm[f * BINS + k] = out[f];
        }
    }
    // Percussive: the median along frequency, per frame - straight into a
    // soft (Wiener) mask.
    const mask = new Float32Array(frames * BINS);
    {
        const rowIn = new Float64Array(BINS), rowOut = new Float64Array(BINS);
        for (let f = 0; f < frames; f++) {
            const row = f * BINS;
            for (let k = 0; k < BINS; k++) rowIn[k] = mag[row + k];
            slidingMedian(rowIn, BINS, KF, rowOut);
            for (let k = 0; k < BINS; k++) {
                const p = rowOut[k] * rowOut[k], h = harm[row + k] * harm[row + k];
                mask[row + k] = p / (p + h + 1e-20);
            }
        }
    }

    // Pass 2: rhythm = the masked spectrum back in time; bed = the rest.
    const out = new Float32Array(len * 4);
    const acc = new Float64Array(padded), norm = new Float64Array(padded);
    for (let c = 0; c < 2; c++) {
        acc.fill(0); norm.fill(0);
        for (let f = 0; f < frames; f++) {
            const off = f * HOP, row = f * BINS;
            for (let i = 0; i < N; i++) { re[i] = ch[c][off + i] * win[i]; im[i] = 0; }
            fft(re, im, false);
            for (let k = 0; k < BINS; k++) {
                const m = mask[row + k];
                re[k] *= m; im[k] *= m;
                if (k > 0 && k < N / 2) { re[N - k] = re[k]; im[N - k] = -im[k]; }
            }
            fft(re, im, true);
            for (let i = 0; i < N; i++) { acc[off + i] += re[i] * win[i]; norm[off + i] += win[i] * win[i]; }
        }
        for (let i = 0; i < len; i++) {
            const x = ch[c][i + PAD];
            const r = norm[i + PAD] > 1e-9 ? acc[i + PAD] / norm[i + PAD] : 0;
            out[4 * i + c] = x - r;
            out[4 * i + 2 + c] = r;
        }
    }
    return out;
}

// --- files -----------------------------------------------------------------------------

const sha8 = (path) => createHash('sha1').update(readFileSync(path)).digest('hex').slice(0, 8);
const writeRaw = (path, f32) => writeFileSync(path, Buffer.from(f32.buffer, f32.byteOffset, f32.byteLength));

/** Moves an encoded file to its checksum name in public/, returns the name. */
function file(tmp, stem) {
    const name = `${stem}.${sha8(tmp)}.opus`;
    renameSync(tmp, `${OUT_DIRS[0]}${name}`);
    return name;
}

/** Deletes every file of piece `stem` in both folders except those in `keep`. */
function sweep(stem, keep) {
    const mine = (f) => f.startsWith(`${stem}.`) && f.endsWith('.opus')
        && /^[0-9a-f]{8}$/.test(f.slice(stem.length + 1).replace(/^quad\./, '').replace(/\.opus$/, ''));
    for (const dir of OUT_DIRS) {
        if (!existsSync(dir)) continue;
        for (const f of readdirSync(dir)) if (mine(f) && !keep.includes(f)) rmSync(`${dir}${f}`);
    }
}

// --- one piece ---------------------------------------------------------------------------

function master(id) {
    const s = SET[id];
    const cue = CUES[id];
    const target = targetOf(id);
    const t0 = Date.now();

    let x = decode(`${SRC_DIR}${s.src}`, s.from, s.to);
    if (s.fadeOut) fadeOutTail(x, s.fadeOut);
    const edges = trimEdges(x);
    x = edges.y;
    const seconds = x.length / 2 / SR;

    // Loudness of the sum, then one gain for every channel.
    writeRaw(`${WORK}${id}.f32`, x);
    const before = loudness(`${WORK}${id}.f32`, 2);
    const gain = 10 ** ((target - before) / 20);
    for (let i = 0; i < x.length; i++) x[i] *= gain;
    let peak = 0;
    for (let i = 0; i < x.length; i++) peak = Math.max(peak, Math.abs(x[i]));
    if (peak > 10 ** (-1 / 20)) {
        console.error(`${id}: the gain to ${target} LUFS puts a sample at ${(20 * Math.log10(peak)).toFixed(1)} dBFS - refused`);
        process.exit(1);
    }
    writeRaw(`${WORK}${id}.f32`, x);
    encode(`${WORK}${id}.f32`, 'stereo', STEREO_KBPS, `${WORK}${id}.opus`);
    const entry = { stereo: file(`${WORK}${id}.opus`, id) };

    if (cue.layers) {
        const q = separate(x);
        writeRaw(`${WORK}${id}.4ch`, q);
        // The floor: bed plus the rhythm at the piece's floor, against the sum.
        const g = (10 ** ((cue.floorDb ?? RHYTHM_FLOOR_DB) / 20)).toFixed(5);
        const floorLufs = loudness(`${WORK}${id}.4ch`, 4, `pan=stereo|c0=c0+${g}*c2|c1=c1+${g}*c3`);
        entry.floor = +(target - floorLufs).toFixed(1);
        if (entry.floor > MAX_FLOOR_LOSS) {
            console.error(`${id}: the floor costs ${entry.floor} LU, more than ${MAX_FLOOR_LOSS} - refused`);
            process.exit(1);
        }
        encode(`${WORK}${id}.4ch`, 'quad', QUAD_KBPS, `${WORK}${id}.quad.opus`);
        const name = file(`${WORK}${id}.quad.opus`, `${id}.quad`);
        if (opusChannels(readFileSync(`${OUT_DIRS[0]}${name}`)) !== 4) {
            console.error(`${id}: the quad file does not declare four channels`);
            process.exit(1);
        }
        entry.quad = name;
        rmSync(`${WORK}${id}.4ch`);
    }
    rmSync(`${WORK}${id}.f32`);

    entry.lufs = +loudnessOfFile(`${OUT_DIRS[0]}${entry.stereo}`).toFixed(1);
    entry.peak = +(20 * Math.log10(peak)).toFixed(1);
    entry.seconds = +seconds.toFixed(2);
    sweep(id, [entry.stereo, entry.quad].filter(Boolean));

    console.log(`${id.padEnd(12)} ${entry.seconds.toFixed(1).padStart(6)} s  ${before.toFixed(1)} -> ${entry.lufs.toFixed(1)} LUFS` +
                `  peak ${entry.peak.toFixed(1)} dBFS` + (cue.layers ? `  floor ${entry.floor.toFixed(1)} LU` : '') +
                `  cut ${edges.cutFront.toFixed(2)}/${edges.cutBack.toFixed(2)} s  (${((Date.now() - t0) / 1000).toFixed(0)} s)`);
    return entry;
}

// --- the probe ----------------------------------------------------------------------------

/** Four tones on four channels, encoded and decoded again: the order must hold. */
function probe() {
    const seconds = 1.5, n = Math.round(seconds * SR);
    const q = new Float32Array(n * 4);
    for (let i = 0; i < n; i++) {
        const env = Math.min(1, i / 480, (n - i) / 480);
        for (let c = 0; c < 4; c++) q[4 * i + c] = 0.25 * env * Math.sin(2 * Math.PI * PROBE_TONES[c] * i / SR);
    }
    writeRaw(`${WORK}probe.4ch`, q);
    encode(`${WORK}probe.4ch`, 'quad', QUAD_KBPS, `${WORK}probe.quad.opus`);
    rmSync(`${WORK}probe.4ch`);

    const r = ffmpeg(['-v', 'error', '-i', `${WORK}probe.quad.opus`, '-f', 'f32le', '-ar', String(SR), '-'], 'decoding the probe');
    const d = new Float32Array(r.stdout.buffer, r.stdout.byteOffset, r.stdout.byteLength / 4);
    const frames = d.length / 4;
    for (let c = 0; c < 4; c++) {
        // Zero crossings over the steady middle half give the frequency.
        let z = 0;
        const a = Math.floor(frames / 4), b = Math.floor(frames * 3 / 4);
        for (let i = a + 1; i < b; i++) if ((d[4 * (i - 1) + c] < 0) !== (d[4 * i + c] < 0)) z++;
        const hz = z / 2 / ((b - a) / SR);
        if (Math.abs(hz - PROBE_TONES[c]) > PROBE_TONES[c] * 0.05) {
            console.error(`The probe came back with ${hz.toFixed(0)} Hz on channel ${c + 1}, not ${PROBE_TONES[c]} - the channel order does not hold`);
            process.exit(1);
        }
    }
    const name = file(`${WORK}probe.quad.opus`, 'probe.quad');
    // The probe's stem is "probe.quad"; its old copies go like any piece's.
    sweep('probe.quad', [name]);
    console.log(`probe        four tones, order held after encoding: ${name}`);
    return name;
}

// --- the table --------------------------------------------------------------------------------

async function previousTable() {
    if (!existsSync(TABLE)) return { files: {}, probe: null };
    const mod = await import(`${new URL(`file://${TABLE}`).href}?t=${Date.now()}`);
    return { files: { ...mod.MUSIC_FILES }, probe: mod.MUSIC_PROBE };
}

function writeTable(files, probeName) {
    const rows = Object.keys(CUES).filter(id => files[id]).map(id => {
        const f = files[id];
        const parts = [`stereo: '${f.stereo}'`];
        if (f.quad) parts.push(`quad: '${f.quad}'`);
        parts.push(`lufs: ${f.lufs.toFixed(1)}`);
        if (f.floor != null) parts.push(`floor: ${f.floor.toFixed(1)}`);
        parts.push(`peak: ${f.peak.toFixed(1)}`, `seconds: ${f.seconds.toFixed(2)}`);
        return `    ${id}: { ${parts.join(', ')} },`;
    });
    writeFileSync(TABLE, `/**
 * WRITTEN BY tools/master-music.mjs - do not edit by hand; run
 * \`npm run music:master\` (or \`-- --cue=<id>\` for one piece).
 *
 * The file names of the house band under MUSIC_DIR and what the tool
 * measured on them:
 *
 *   stereo   every piece, Opus 96 kbit/s
 *   quad     a layered piece only: bed on channels 1/2, rhythm on 3/4
 *   lufs     integrated loudness of the stereo file as it ships
 *   floor    LU lost with the rhythm at its floor (layered pieces)
 *   peak     sample peak before encoding, dBFS
 *   seconds  the length after cutting
 *
 * The week suite holds this table against docs/audio/music/ and the
 * loudness against TARGET_LUFS - nobody types these numbers.
 */
export const MUSIC_DIR = 'audio/music/';

export const MUSIC_PROBE = '${probeName}';

export const MUSIC_FILES = {
${rows.join('\n')}
};
`);
}

// --- run ------------------------------------------------------------------------------------------

mkdirSync(WORK, { recursive: true });
mkdirSync(OUT_DIRS[0], { recursive: true });
const prev = await previousTable();
const files = only ? prev.files : {};
const probeName = probe();
for (const id of Object.keys(CUES)) {
    if (only && id !== only) continue;
    files[id] = master(id);
}
if (!only) {
    // A full run owns the folders: whatever has no entry any more goes.
    const keep = new Set([probeName, ...Object.values(files).flatMap(f => [f.stereo, f.quad].filter(Boolean))]);
    for (const dir of OUT_DIRS) {
        if (!existsSync(dir)) continue;
        for (const f of readdirSync(dir)) if (f.endsWith('.opus') && !keep.has(f)) rmSync(`${dir}${f}`);
    }
}
writeTable(files, probeName);
const total = Object.values(files).reduce((n, f) => n + f.seconds, 0);
console.log(`\n${Object.keys(files).length} pieces, ${(total / 60).toFixed(1)} minutes. Table written: src/engine/music_files.js`);
