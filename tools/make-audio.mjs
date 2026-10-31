/**
 * The generation run: turns the manifest into audio files.
 *
 * Usage: node tools/make-audio.mjs [--lang=de] [options]
 *
 *   --models            list the models this account may use, then stop
 *   --dry-run           what would be sent and what it would cost, no calls
 *   --trial=<name>      write into voice/trial/<name>/ instead of the real
 *                       output, with a ledger of its own. A trial can never
 *                       damage a finished run.
 *   --pool=<name>       only this pool
 *   --limit=<n>         only the first n pieces still to do
 *   --model=<id>        override the configured model (for an A/B trial)
 *   --context           send the scene opening with each result as
 *                       previous_text. OFF by default - see below.
 *   --jobs=<n>          parallel requests (default 2; Starter allows 3)
 *
 * The key comes from the environment variable ELEVENLABS_API_KEY and is never
 * written to a file, a log line or an error message.
 *
 * WHY THE RUN IS RESUMABLE. 4651 calls is twenty minutes of network on a good
 * day and an afternoon on a bad one. Every finished piece is recorded in a
 * ledger that lives WITH the masters, so an abort costs nothing and a second
 * run picks up where the first stopped. The ledger holds the checksum and the
 * model, so a rewritten line or a changed model re-renders and nothing else.
 *
 * WHY THE MP3 MASTERS ARE KEPT. The provider bills per character, not per
 * download. Re-encoding to another bitrate or another format from the masters
 * is free; doing it from the provider costs the full run again. The masters
 * are the thing that was bought - the opus files are a derivative.
 *
 * WHY --context IS OFF. Short pieces are the known weak spot: the median here
 * is 171 characters, and the provider's own guidance is that longer passages
 * give a model a better sense of pacing. previous_text is the documented cure,
 * BUT it is not documented whether it is billed. At 3185 results with a ~207
 * character opening each, being wrong about that costs about 660,000
 * characters - more than the whole German run. So it stays off until a trial
 * measures it, which is what the usage report below is for.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { collectEntries, fileFor } from './voice-text.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const args = process.argv.slice(2);
const flag = (n, d) => { const h = args.find(a => a.startsWith(`--${n}=`)); return h ? h.slice(n.length + 3) : d; };
const has  = (n) => args.includes(`--${n}`);

const LANG    = flag('lang', 'de');
const TRIAL   = flag('trial', null);
const POOL    = flag('pool', null);
const LIMIT   = Number(flag('limit', '0')) || 0;
const JOBS    = Math.max(1, Number(flag('jobs', '2')) || 2);
const DRY     = has('dry-run');
const CONTEXT = has('context');

const API = 'https://api.elevenlabs.io/v1';

/** Price per 1000 characters, for the report only. The bill is the provider's. */
const RATE = { eleven_v4: 0.08, eleven_v3: 0.08, eleven_multilingual_v2: 0.08,
               eleven_v4_turbo: 0.04, eleven_v3_conversational: 0.04,
               eleven_turbo_v2_5: 0.04, eleven_flash_v2_5: 0.04 };

const die = (msg) => { console.error(`✗ ${msg}`); process.exit(1); };

/**
 * A status code with the thing to do about it. "the provider answered 401" is
 * true and useless: the first run of this tool met exactly that, and the
 * answer - no key exists yet, here is where it is made - was nowhere near it.
 */
function explain(status) {
    if (status === 401) {
        return 'the key was rejected (401). ELEVENLABS_API_KEY holds something, but not a\n'
             + '  valid key. Create one at https://elevenlabs.io/app/developers/api-keys\n'
             + '  - it is shown once. The playground on the website needs no key; the API does.';
    }
    if (status === 403) {
        return 'the key was refused (403). It is valid but not allowed here - check its scope\n'
             + '  restrictions and its IP allowlist at https://elevenlabs.io/app/developers/api-keys';
    }
    if (status === 402) {
        return 'out of credit (402). Top up at https://elevenlabs.io/app/developers/top-up\n'
             + '  (minimum $5). Everything finished so far is in the ledger and will not be paid for twice.';
    }
    return `the provider answered ${status}`;
}

// ------------------------------------------------------------------- the key

/**
 * Read once, held in a closure, never interpolated into anything that is
 * printed. An error from fetch() can carry the request headers, so every call
 * site catches and re-throws a message of its own making.
 */
function apiKey() {
    const k = process.env.ELEVENLABS_API_KEY;
    if (!k) die('ELEVENLABS_API_KEY is not set. Export it in the shell that runs this;\n'
              + '  it must not go into a file in this repository.');
    return k;
}

async function call(path, init = {}) {
    let res;
    try {
        res = await fetch(`${API}${path}`, {
            ...init,
            headers: { 'xi-api-key': apiKey(), ...(init.headers ?? {}) }
        });
    } catch (err) {
        // err.cause can hold the request, headers included. Only the reason.
        throw new Error(`network: ${err.cause?.code ?? err.message}`);
    }
    return res;
}

// --------------------------------------------------------------- the account

/** Characters billed so far. The difference across a run is the true cost. */
async function billedSoFar() {
    const res = await call('/user/subscription');
    if (!res.ok) return null;
    const j = await res.json();
    return { used: j.character_count, limit: j.character_limit };
}

if (has('models')) {
    const res = await call('/models');
    if (!res.ok) die(explain(res.status));
    const models = await res.json();
    console.log('\nModels this account may use:\n');
    for (const m of models) {
        if (!m.can_do_text_to_speech) continue;
        const rate = RATE[m.model_id];
        console.log(`  ${m.model_id.padEnd(28)} ${rate ? `$${rate.toFixed(2)}/1k` : '   ?    '}  ${m.name}`);
    }
    console.log('\nPut the one you want into voice/run.<lang>.json as "modelId".\n');
    process.exit(0);
}

// ---------------------------------------------------------------- the config

const CONFIG = `${ROOT}voice/run.${LANG}.json`;
if (!existsSync(CONFIG)) die(`no ${CONFIG.slice(ROOT.length)}. Copy voice/run.example.json and fill it in.`);
const cfg = JSON.parse(readFileSync(CONFIG, 'utf8'));
const MODEL = flag('model', cfg.modelId);

if (!cfg.voiceId) die(`voiceId is empty in ${CONFIG.slice(ROOT.length)}.`);
if (!MODEL) die(`modelId is empty in ${CONFIG.slice(ROOT.length)}. Run with --models to see the choices.`);
if (!RATE[MODEL]) console.log(`  ! unknown model "${MODEL}" - the cost report below is a guess.`);

// ----------------------------------------------------------------- the pieces

let entries;
try {
    ({ entries } = await collectEntries(LANG));
} catch (err) { die(err.message); }

// The manifest is the contract: generate only what it records, so audio can
// never appear for a text the gate has not seen.
const MANIFEST = `${ROOT}voice/manifest.${LANG}.json`;
if (!existsSync(MANIFEST)) die(`no manifest for "${LANG}". Run npm run voice:manifest.`);
const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'));
const recorded = new Map(manifest.entries.map(e => [e.key, e.sha]));

const drifted = entries.filter(e => recorded.get(e.key) !== e.sha);
if (drifted.length) {
    die(`the ${LANG} tree and the manifest disagree in ${drifted.length} places.\n`
      + '  Run npm run voice:manifest before generating, or audio is bought for text\n'
      + '  the manifest never recorded.');
}

/**
 * The scene opening that belongs to a result, for previous_text. A result key
 * is <base>/opts/<n>/r or <base>/fail/r, and the opening is <base>/text - the
 * same rule for a flat scene and for a chain node.
 */
const byKey = new Map(entries.map(e => [e.key, e]));
const openingFor = (key) => {
    const cut = key.search(/\/(opts|fail)\//);
    return cut < 0 ? null : byKey.get(`${key.slice(0, cut)}/text`)?.spoken ?? null;
};

// ------------------------------------------------------------------ the paths

const OUT    = TRIAL ? `${ROOT}voice/trial/${TRIAL}` : `${ROOT}public/audio/${LANG}`;
const MASTER = TRIAL ? `${ROOT}voice/trial/${TRIAL}/master` : `${ROOT}voice/master/${LANG}`;
const LEDGER = `${MASTER}/ledger.json`;

// A trial keeps its ledger inside its own folder, so it is isolated from the
// real run without being unrecorded: a trial that dies at piece 60 of 100
// must not charge for those 60 again on the next attempt.
const ledger = existsSync(LEDGER) ? JSON.parse(readFileSync(LEDGER, 'utf8')) : {};
const saveLedger = () => writeFileSync(LEDGER, JSON.stringify(ledger, null, 1));

/** Done means: this exact text, through this exact model, and the file is there. */
const done = (e) => {
    const r = ledger[e.key];
    return !!r && r.sha === e.sha && r.model === MODEL && existsSync(`${OUT}/${fileFor(e.key)}.opus`);
};

let todo = entries.filter(e => !done(e));
if (POOL) todo = todo.filter(e => e.key.startsWith(`${POOL}/`));
if (LIMIT) todo = todo.slice(0, LIMIT);

const chars = todo.reduce((n, e) => n + e.chars, 0);
const ctxChars = CONTEXT ? todo.reduce((n, e) => n + (openingFor(e.key)?.length ?? 0), 0) : 0;
const rate = RATE[MODEL] ?? 0.08;

console.log(`\nGeneration run (${LANG})${TRIAL ? `  TRIAL "${TRIAL}"` : ''}`);
console.log(`  voice   ${cfg.voiceName ?? cfg.voiceId}`);
console.log(`  model   ${MODEL}`);
console.log(`  out     ${OUT.slice(ROOT.length)}`);
console.log(`  to do   ${todo.length} of ${entries.length} pieces, ${chars.toLocaleString('de-DE')} characters`);
if (CONTEXT) console.log(`  context ${ctxChars.toLocaleString('de-DE')} characters as previous_text (billing unknown)`);
console.log(`  cost    $${(chars / 1000 * rate).toFixed(2)}`
          + (CONTEXT ? ` spoken, up to $${((chars + ctxChars) / 1000 * rate).toFixed(2)} if context is billed` : ''));

if (!todo.length) { console.log('\n✅ Nothing to do.\n'); process.exit(0); }
if (DRY) { console.log('\n  (dry run - nothing sent)\n'); process.exit(0); }

// --------------------------------------------------------------- the settings

/**
 * Recorded on the first run and reused after, so a run a year from now sounds
 * like this one. "all on default" is only reproducible while the provider's
 * defaults do not move; written down, it is reproducible for good.
 */
if (!cfg.voiceSettings) {
    const res = await call(`/voices/${cfg.voiceId}/settings`);
    if (!res.ok) die(explain(res.status));
    cfg.voiceSettings = await res.json();
    writeFileSync(CONFIG, `${JSON.stringify(cfg, null, 4)}\n`);
    console.log(`  settings fetched and written into ${CONFIG.slice(ROOT.length)}:`);
    console.log(`    ${JSON.stringify(cfg.voiceSettings)}`);
}

// -------------------------------------------------------------------- the run

mkdirSync(OUT, { recursive: true });
mkdirSync(MASTER, { recursive: true });

const before = await billedSoFar();
if (before) console.log(`  billed  ${before.used.toLocaleString('de-DE')} of ${before.limit.toLocaleString('de-DE')} characters before this run`);
console.log();

const fmt = cfg.outputFormat ?? 'mp3_44100_128';
const bitrate = cfg.opusBitrate ?? '24k';
let sent = 0, failed = 0;

/** One piece. Throws only on something that should stop the whole run. */
async function speak(e) {
    const body = { text: e.spoken, model_id: MODEL, voice_settings: cfg.voiceSettings };
    if (CONTEXT) {
        const prev = openingFor(e.key);
        if (prev) body.previous_text = prev;
    }

    for (let attempt = 1; ; attempt++) {
        const res = await call(`/text-to-speech/${cfg.voiceId}?output_format=${fmt}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (res.ok) {
            const mp3 = `${MASTER}/${fileFor(e.key)}.mp3`;
            writeFileSync(mp3, Buffer.from(await res.arrayBuffer()));
            // -ac 1: speech is mono, and a stereo copy of a mono signal is
            // twice the bytes for nothing. libopus defaults to the `audio`
            // application, which beats `voip` for narration at this bitrate.
            execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y',
                '-i', mp3, '-c:a', 'libopus', '-b:a', bitrate, '-ac', '1',
                `${OUT}/${fileFor(e.key)}.opus`]);
            ledger[e.key] = { sha: e.sha, model: MODEL, chars: e.chars };
            return true;
        }

        // 429 is the concurrency limit, 5xx is theirs. Everything else is ours
        // and will not get better by being asked again - stop before the run
        // burns money on 4651 identical rejections.
        const retryable = res.status === 429 || res.status >= 500;
        if (!retryable) {
            const detail = await res.text().catch(() => '');
            throw new Error(`${explain(res.status)}\n  (on ${e.key})\n  ${detail.slice(0, 200)}`);
        }
        if (attempt >= 5) { failed++; console.log(`  ! gave up on ${e.key} after ${attempt} attempts (${res.status})`); return false; }
        await new Promise(r => setTimeout(r, 1000 * 2 ** (attempt - 1)));
    }
}

const started = Date.now();
const queue = [...todo];
let index = 0;

async function worker() {
    while (queue.length) {
        const e = queue.shift();
        const ok = await speak(e);
        if (ok) sent += e.chars;
        index++;
        if (index % 25 === 0 || !queue.length) {
            const per = (Date.now() - started) / index;
            const left = Math.round(per * queue.length / 1000);
            saveLedger();
            console.log(`  ${String(index).padStart(5)}/${todo.length}`
                      + `  $${(sent / 1000 * rate).toFixed(2)}`
                      + `  ~${Math.floor(left / 60)}m${String(left % 60).padStart(2, '0')}s left`);
        }
    }
}

try {
    await Promise.all(Array.from({ length: JOBS }, worker));
} catch (err) {
    saveLedger();
    console.error(`\n✗ stopped: ${err.message}`);
    console.error('  Everything finished so far is in the ledger. Run again to continue.\n');
    process.exit(1);
}
saveLedger();

// ----------------------------------------------------------------- the report

const after = await billedSoFar();
console.log(`\n✅ ${index - failed} pieces, ${sent.toLocaleString('de-DE')} characters spoken`
          + (failed ? `, ${failed} failed` : ''));
if (before && after) {
    const billed = after.used - before.used;
    console.log(`   billed ${billed.toLocaleString('de-DE')} characters`
              + `  =  $${(billed / 1000 * rate).toFixed(2)}`
              + `  (${(billed / Math.max(sent, 1)).toFixed(2)}x what was spoken)`);
    if (CONTEXT) console.log('   That factor is the answer to whether previous_text is billed.');
}
const size = todo.reduce((n, e) => {
    const f = `${OUT}/${fileFor(e.key)}.opus`;
    return n + (existsSync(f) ? statSync(f).size : 0);
}, 0);
console.log(`   ${(size / 1024 / 1024).toFixed(1)} MiB of opus at ${bitrate}\n`);
