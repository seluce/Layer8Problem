/**
 * The generation run: turns the manifest into audio files.
 *
 * Usage: node tools/make-audio.mjs [--lang=de] [options]
 *
 *   --models            list the models this account may use, then stop
 *   --voices            list the voices this account HAS, then stop
 *   --dry-run           what would be sent and what it would cost, no calls
 *   --trial=<name>      write into voice/trial/<name>/ instead of the real
 *                       output, with a ledger of its own. A trial can never
 *                       damage a finished run.
 *   --set=fm            GlobalCorp FM's spots (7.2): its own manifest,
 *                       voice/run.fm.<lang>.json for the voice, and
 *                       public/audio/fm/<lang>/ for the files - see
 *                       VOICE_SETS in voice-text.mjs. Without it, the
 *                       narrator.
 *   --pool=<name>       only this pool
 *   --key=<part>[,..]   only pieces whose key contains one of these, e.g.
 *                       one scene, or the five spots of an FM probe
 *   --limit=<n>         only the first n pieces still to do
 *   --model=<id>        override the configured model (for an A/B trial)
 *   --voice=<id>        read everything in this voice instead of the
 *                       configured one(s) (for an A/B trial)
 *   --same-text=<part>[,..]  a run of another language refuses pieces that
 *                       say word for word what the German tree says (an
 *                       untranslated block); this names the keys of lines
 *                       meant to read the same in both
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
 * run picks up where the first stopped. The ledger holds both checksums, the
 * model and the voice, so a rewritten line, a new respelling, another model or
 * another voice re-renders - and nothing else does.
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
 * characters - more than the whole German run. So it stays off until a run
 * measures it: the report prints credits spent per character, and the same
 * pool run twice, once with --context, settles it by the ratio.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, statSync, renameSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { fileFor, oneCallPerText, speakerFor, untranslatedPieces, voiceSet } from './voice-text.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const args = process.argv.slice(2);
const flag = (n, d) => { const h = args.find(a => a.startsWith(`--${n}=`)); return h ? h.slice(n.length + 3) : d; };
const has  = (n) => args.includes(`--${n}`);

const LANG    = flag('lang', 'de');
const SET_NAME = flag('set', 'narrator');
const TRIAL   = flag('trial', null);
const POOL    = flag('pool', null);
/**
 * One scene, by a piece of its key. Written for the question a respelling
 * raises: does the voice really say it that way? A trial of the ONE scene
 * somebody heard it in costs a few dozen credits and settles it by ear, where
 * --pool would have rendered the first three pieces of a pool that may not
 * contain the word at all.
 */
const KEY     = flag('key', null);
const KEYS    = KEY ? KEY.split(',').map(k => k.trim()).filter(Boolean) : [];
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

/** What to do about a status, where we know something the provider does not say. */
const HINT = {
    401: 'No valid key. Create one at https://elevenlabs.io/app/developers/api-keys -\n'
       + '    it is shown once. The playground on the website needs no key; the API does.',
    402: 'Out of credit. Top up at https://elevenlabs.io/app/developers/top-up (minimum $5).\n'
       + '    Everything already finished is in the ledger and will not be paid for twice.',
    403: 'The key is valid but not allowed here - check its scope restrictions and its\n'
       + '    IP allowlist at https://elevenlabs.io/app/developers/api-keys',
    404: 'The provider does not know this id. Run --voices to see the voices this\n'
       + '    account actually has.',
    400: 'If this was about a voice: run --voices. A voice added from the library\n'
       + '    gets its OWN id in the account, which is not the id on the library page.',
    422: 'The request was understood and rejected - usually a setting out of range.',
};

/**
 * The provider explains itself in the response body. Throwing that away is how
 * a bare "the provider answered 400" ended up on screen with nothing to act on,
 * twice. The body comes first, because it knows more than this table does.
 */
async function explain(res, what) {
    let body = '';
    try { body = (await res.text()).trim(); } catch { /* nothing to add */ }
    const out = [`${what}: the provider answered ${res.status}`];
    if (body) out.push(`    ${body.slice(0, 400)}`);
    const hint = HINT_BY_CODE[providerCode(body)] ?? HINT[res.status];
    if (hint) out.push(`    ${hint}`);
    return out.join('\n');
}

/**
 * Where the provider's own code says more than the status does.
 *
 * An exhausted quota comes back as 401 - the status for a bad key - so the
 * table above told an operator whose key was perfectly fine to go and make a
 * new one, in the middle of a run that had simply spent its last 21 credits.
 * The code in the body is the more specific answer and is asked first.
 */
const HINT_BY_CODE = {
    quota_exceeded: HINT[402],
};

/** `detail.code`, or `detail.status` where the code is missing; null otherwise. */
function providerCode(body) {
    try {
        const d = JSON.parse(body)?.detail;
        return d?.code ?? d?.status ?? null;
    } catch { return null; }
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

/**
 * CREDITS spent so far, not characters. The subscription endpoint calls the
 * field character_count, which is what made an earlier version of this tool
 * multiply credits by the per-character dollar rate and print a number that
 * meant nothing. A character is not a credit: the meetings run spoke 46,176
 * characters and spent 5,754 credits, so one character cost 0.125 credits
 * there. That rate depends on the model and the plan, so it is reported and
 * not assumed.
 */
async function billedSoFar() {
    const res = await call('/user/subscription');
    if (!res.ok) return null;
    const j = await res.json();
    // What a run costs is the fall in what is LEFT, not the rise in
    // character_count. Spending a plan's own credits raises character_count,
    // but spending topped-up ones lowers character_limit instead and leaves
    // character_count where it was - which reported a 6005-character run as
    // costing nothing, and then divided by that nothing.
    return { left: j.character_limit - j.character_count, limit: j.character_limit };
}

if (has('models')) {
    const res = await call('/models');
    if (!res.ok) die(await explain(res, 'the model list'));
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

if (has('voices')) {
    const res = await call('/voices');
    if (!res.ok) die(await explain(res, 'the voice list'));
    const { voices } = await res.json();
    console.log(`\nVoices this account can use (${voices.length}):\n`);
    for (const v of voices) console.log(`  ${v.voice_id}  ${(v.category ?? '').padEnd(12)} ${v.name}`);
    console.log('\nA voice taken from the library has to be ADDED to the account before the API\n'
              + 'can read its settings. If the one you want is not listed, open it in the voice\n'
              + 'library in the web app and add it to your voices.\n');
    process.exit(0);
}

// ---------------------------------------------------------------- the config

let SET;
try { SET = voiceSet(SET_NAME); } catch (err) { die(err.message); }
const CONFIG = `${ROOT}${SET.config(LANG)}`;
if (!existsSync(CONFIG)) die(`no ${CONFIG.slice(ROOT.length)}. Copy voice/run.example.json and fill it in.`);
const cfg = JSON.parse(readFileSync(CONFIG, 'utf8'));
const MODEL = flag('model', cfg.modelId);

/**
 * Who speaks. A run file names one voice at its top and may add more by kind
 * of spot (`byKind`, the radio's two presenters - see speakerFor). --voice
 * reads EVERYTHING in one voice for a trial, and its settings are never
 * pinned: they belong to no block of the file. The configured voice passed
 * by hand is no override, as long as it is the only voice there is.
 */
let OVERRIDE = flag('voice', null);
if (OVERRIDE === cfg.voiceId && !cfg.byKind?.length) OVERRIDE = null;
const SPEAKERS = OVERRIDE ? [{ voiceId: OVERRIDE, voiceName: '' }] : [cfg, ...(cfg.byKind ?? [])];
const speakerOf = (e) => OVERRIDE ? SPEAKERS[0] : speakerFor(cfg, e.kind);
const voiceOf = (e) => speakerOf(e).voiceId;
const nameOf = (b) => b.voiceName || b.voiceId;

for (const b of SPEAKERS) {
    const where = b === cfg ? '' : ` (byKind ${JSON.stringify(b.kinds ?? null)})`;
    if (b !== cfg && (!Array.isArray(b.kinds) || !b.kinds.length)) die(`a byKind voice in ${CONFIG.slice(ROOT.length)} names no kinds.`);
    if (!b.voiceId) die(`voiceId is empty in ${CONFIG.slice(ROOT.length)}${where}. Run --voices, or pass --voice=<id>.`);
}
if (!MODEL) die(`modelId is empty in ${CONFIG.slice(ROOT.length)}. Run with --models to see the choices.`);
if (!RATE[MODEL]) console.log(`  ! unknown model "${MODEL}" - the cost report below is a guess.`);

// ----------------------------------------------------------------- the pieces

let entries;
try {
    ({ entries } = await SET.collect(LANG));
} catch (err) { die(err.message); }

// The manifest is the contract: generate only what it records, so audio can
// never appear for a text the gate has not seen.
const MANIFEST = `${ROOT}${SET.manifest(LANG)}`;
if (!existsSync(MANIFEST)) die(`no ${SET.manifest(LANG)}. Run npm run voice:manifest.`);
const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'));
const recorded = new Map(manifest.entries.map(e => [e.key, e]));

// Both checksums: the text as written and the text as sent. A manifest that
// knows only the first cannot see a new respelling, which is how a rule could
// be added, committed and gated green while every affected file went on saying
// the old thing. See the note on the two of them in voice-text.mjs.
const drifted = entries.filter(e => recorded.get(e.key)?.sha !== e.sha
                                 || recorded.get(e.key)?.spk !== e.spk);
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

const OUT    = TRIAL ? `${ROOT}voice/trial/${TRIAL}` : `${ROOT}${SET.out(LANG)}`;
const MASTER = TRIAL ? `${ROOT}voice/trial/${TRIAL}/master` : `${ROOT}${SET.master(LANG)}`;
const LEDGER = `${MASTER}/ledger.json`;

// A trial keeps its ledger inside its own folder, so it is isolated from the
// real run without being unrecorded: a trial that dies at piece 60 of 100
// must not charge for those 60 again on the next attempt.
const ledger = existsSync(LEDGER) ? JSON.parse(readFileSync(LEDGER, 'utf8')) : {};
const saveLedger = () => {
    // Write-then-rename, because writeFileSync is not atomic: a kill in the
    // middle of it leaves a truncated ledger, and a truncated ledger means the
    // run is forgotten entirely and every finished piece is bought a second
    // time. Rename within one filesystem is atomic, so the ledger is either
    // the old one or the new one, never half of either.
    const tmp = `${LEDGER}.tmp`;
    writeFileSync(tmp, JSON.stringify(ledger, null, 1));
    renameSync(tmp, LEDGER);
};

/**
 * Done means: this exact text, sent in this exact form, through this exact
 * model and voice, with the file actually on disk.
 *
 * A field that did not yet exist when an entry was written is grandfathered
 * rather than treated as stale - the alternative is re-rendering, and re-
 * buying, a finished run the first time this tool is updated. That is a real
 * trade and not a free one: an entry taken on trust is an entry nothing can
 * check, so they are counted and reported instead of being passed over in
 * silence. Both ledgers were stamped with `spk` on 01.11.2026, so the count
 * is 0 here and anything above that is worth asking about.
 */
let trusted = 0;
const done = (e) => {
    const r = ledger[e.key];
    if (!r) return false;
    if (r.spk === undefined || r.voice === undefined) trusted++;
    return r.sha === e.sha && r.model === MODEL
        && (r.spk === undefined || r.spk === e.spk)
        && (r.voice === undefined || r.voice === voiceOf(e))
        && existsSync(`${OUT}/${fileFor(e)}.opus`);
};

let todo = entries.filter(e => !done(e));
if (POOL) todo = todo.filter(e => e.key.startsWith(`${POOL}/`));
if (KEYS.length) todo = todo.filter(e => KEYS.some(k => e.key.includes(k)));

// ONE TEXT, ONE CALL - see oneCallPerText. A twin of a text this run renders
// is booked once its first is done; a text already rendered under another
// key on an earlier run is booked without a call at all. Before --limit, so
// the limit counts calls rather than keys.
const onDisk = new Map();
for (const r of Object.values(ledger)) {
    if (r.model === MODEL && r.voice && r.spk) onDisk.set(`${r.sha}|${r.spk}|${r.voice}`, r);
}
const { calls, twins } = oneCallPerText(todo);
// One file per text: twins in two voices cannot both be right. lint-data
// refuses a repeated spot text, so this is the net under it.
const split = twins.find(([e, lead]) => voiceOf(e) !== voiceOf(lead));
if (split) die(`${split[0].key} and ${split[1].key} say the same text in two voices - one file cannot hold both.`);
const early = [];
todo = calls.filter(e => {
    const r = onDisk.get(`${e.sha}|${e.spk}|${voiceOf(e)}`);
    if (r && existsSync(`${OUT}/${fileFor(e)}.opus`)) { early.push([e, r]); return false; }
    return true;
});
if (LIMIT) todo = todo.slice(0, LIMIT);

// Not German audio in another language's folder - see untranslatedPieces.
// Held against the German MANIFEST, never the German tree: collecting the
// other language here would swap the pool cache under the entries this run
// is about to send (data.js, ensure()).
const SAME_OK = flag('same-text', '').split(',').map(k => k.trim()).filter(Boolean);
const DE_MANIFEST = `${ROOT}${SET.manifest('de')}`;
const untranslated = LANG === 'de' || !existsSync(DE_MANIFEST) ? []
    : untranslatedPieces(todo, JSON.parse(readFileSync(DE_MANIFEST, 'utf8')).entries, SAME_OK);

/** Books every twin whose first is finished. Returns how many it booked. */
let pendingTwins = twins;
const bookTwins = () => {
    let n = 0;
    for (const [e, r] of early.splice(0)) { ledger[e.key] = { ...r, chars: e.chars }; n++; }
    pendingTwins = pendingTwins.filter(([e, lead]) => {
        const r = ledger[lead.key];
        if (!r || r.sha !== lead.sha || r.spk !== lead.spk || r.model !== MODEL || r.voice !== voiceOf(lead)) return true;
        ledger[e.key] = { ...r, chars: e.chars };
        n++;
        return false;
    });
    return n;
};

const chars = todo.reduce((n, e) => n + e.chars, 0);
const ctxChars = CONTEXT ? todo.reduce((n, e) => n + (openingFor(e.key)?.length ?? 0), 0) : 0;
const rate = RATE[MODEL] ?? 0.08;

console.log(`\nGeneration run (${LANG}${SET_NAME === 'narrator' ? '' : `, ${SET_NAME}`})${TRIAL ? `  TRIAL "${TRIAL}"` : ''}`);
if (OVERRIDE) console.log(`  voice   ${OVERRIDE}   (--voice, settings not pinned)`);
else if (SPEAKERS.length === 1) console.log(`  voice   ${nameOf(cfg)}`);
else SPEAKERS.forEach((b, i) => console.log(`  ${i ? '       ' : 'voice  '} ${nameOf(b)}`
    + `${b === cfg ? '' : ` (${b.kinds.join(', ')})`}: ${todo.filter(e => speakerOf(e) === b).length} to do`));
console.log(`  model   ${MODEL}`);
console.log(`  out     ${OUT.slice(ROOT.length)}`);
if (KEYS.length) console.log(`  only    keys containing ${KEYS.map(k => `"${k}"`).join(' or ')}`);
console.log(`  to do   ${todo.length} of ${entries.length} pieces, ${chars.toLocaleString('de-DE')} characters`);
if (twins.length + early.length) {
    console.log(`  twins   ${twins.length + early.length} more say a text already on this list or on disk - booked, not bought`);
}
if (trusted) console.log(`  ! ${trusted} finished pieces predate a field this tool checks and are taken on trust`);
if (CONTEXT) console.log(`  context ${ctxChars.toLocaleString('de-DE')} characters as previous_text (billing unknown)`);
// At the published pay-as-you-go rate, which is the dearest way to buy it:
// usage inside a plan's included credits has come out cheaper than this.
console.log(`  at most $${(chars / 1000 * rate).toFixed(2)} at the published rate`
          + (CONTEXT ? `, $${((chars + ctxChars) / 1000 * rate).toFixed(2)} if context is billed` : ''));

if (untranslated.length) {
    const shown = untranslated.slice(0, 3).map(e => e.key).join(', ') + (untranslated.length > 3 ? ', ...' : '');
    if (DRY) console.log(`  german  ${untranslated.length} of these say word for word what the German tree says - a real run refuses to start`);
    else die(`${untranslated.length} pieces to do say word for word what the German tree says (${shown}).\n`
           + '  Translate them first, or pass --same-text=<key> for a line meant to read the same in both.');
}

if (!todo.length) {
    if (!DRY && (early.length || pendingTwins.length)) {
        mkdirSync(MASTER, { recursive: true });
        const n = bookTwins();
        saveLedger();
        if (n) console.log(`\n  ${n} twins booked.`);
    }
    console.log('\n✅ Nothing to do.\n');
    process.exit(0);
}
if (DRY) { console.log('\n  (dry run - nothing sent)\n'); process.exit(0); }

// ------------------------------------------------------------- the voice check

/**
 * A voice id the account does not have fails on every single piece, one
 * error at a time, after the folders are made and the run looks under way.
 * One call up front turns that into a stop that names the right id.
 *
 * The id on a library page is NOT the id the account gets when the voice is
 * added to it - that is how rKiu7lQ4c5P3az3745s3 reached voice/run.de.json
 * while the account held the same voice as kkJxCnlRCckmfFvzDW5Q.
 */
{
    const res = await call('/voices');
    if (!res.ok) die(await explain(res, 'the voice list'));
    const { voices } = await res.json();
    const missing = SPEAKERS.find(b => todo.some(e => speakerOf(e) === b) && !voices.some(v => v.voice_id === b.voiceId));
    if (missing) {
        const first = (missing.voiceName ?? '').split(/[\s-]+/)[0];
        const near = first ? voices.filter(v => v.name.startsWith(first)) : [];
        die(`this account has no voice ${missing.voiceId}.\n`
          + (near.length ? `  Did you mean:\n${near.map(v => `    ${v.voice_id}  ${v.name}`).join('\n')}\n` : '')
          + '  A voice added from the library gets its OWN id in the account; the id on\n'
          + '  the library page is a different one. Run --voices for the full list.');
    }
}

// --------------------------------------------------------------- the settings

/**
 * Recorded on the first run and reused after, so a run a year from now sounds
 * like this one. "Everything on default" is only reproducible while the
 * provider's defaults stay put; written down, it is reproducible for good.
 *
 * NOT fatal when it fails. A voice taken from the library but never added to
 * the account answers 400 here, and refusing to start over a convenience would
 * be wrong: leaving voice_settings out of the request makes the provider use
 * that voice's own defaults, which is what "everything on default" meant in
 * the first place. It is simply not pinned, and the run says so rather than
 * pretending otherwise.
 */
// Per voice, and pinned in that voice's own block of the run file.
const settingsOf = new Map();
for (const b of SPEAKERS) {
    if (!todo.some(e => speakerOf(e) === b)) continue;
    if (OVERRIDE) {
        // A voice being tried out. Take its own settings for the run so it is
        // heard the way its maker tuned it, but never write them into the
        // config - those belong to the voices the config names.
        const res = await call(`/voices/${b.voiceId}/settings`);
        settingsOf.set(b.voiceId, res.ok ? await res.json() : null);
        console.log(`  settings ${settingsOf.get(b.voiceId) ? JSON.stringify(settingsOf.get(b.voiceId)) : "the voice's own defaults"}`);
        continue;
    }
    if (b.voiceSettings !== null && b.voiceSettings !== undefined) { settingsOf.set(b.voiceId, b.voiceSettings); continue; }
    const res = await call(`/voices/${b.voiceId}/settings`);
    if (res.ok) {
        b.voiceSettings = await res.json();
        settingsOf.set(b.voiceId, b.voiceSettings);
        writeFileSync(CONFIG, `${JSON.stringify(cfg, null, 4)}\n`);
        console.log(`  settings for ${nameOf(b)} pinned in ${CONFIG.slice(ROOT.length)}`);
        console.log(`    ${JSON.stringify(b.voiceSettings)}`);
    } else {
        console.log(`  ! ${await explain(res, `reading the settings of ${nameOf(b)}`)}`);
        console.log('  ! Going on with the provider\'s own defaults for this voice. They are');
        console.log('  ! NOT written down, so a run months from now could sound different.');
    }
}

// -------------------------------------------------------------------- the run

mkdirSync(OUT, { recursive: true });
mkdirSync(MASTER, { recursive: true });

const before = await billedSoFar();
if (before) console.log(`  credits ${before.left.toLocaleString('de-DE')} left before this run`);
console.log();

const fmt = cfg.outputFormat ?? 'mp3_44100_128';
const bitrate = cfg.opusBitrate ?? '24k';
let sent = 0, failed = 0;

/** One piece. Throws only on something that should stop the whole run. */
async function speak(e) {
    const voice = voiceOf(e);
    const body = { text: e.spoken, model_id: MODEL };
    if (settingsOf.get(voice)) body.voice_settings = settingsOf.get(voice);
    if (CONTEXT) {
        const prev = openingFor(e.key);
        if (prev) body.previous_text = prev;
    }

    for (let attempt = 1; ; attempt++) {
        const res = await call(`/text-to-speech/${voice}?output_format=${fmt}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (res.ok) {
            const mp3 = `${MASTER}/${fileFor(e)}.mp3`;
            writeFileSync(mp3, Buffer.from(await res.arrayBuffer()));
            // -ac 1: speech is mono, and a stereo copy of a mono signal is
            // twice the bytes for nothing. libopus defaults to the `audio`
            // application, which beats `voip` for narration at this bitrate.
            execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y',
                '-i', mp3, '-c:a', 'libopus', '-b:a', bitrate, '-ac', '1',
                `${OUT}/${fileFor(e)}.opus`]);
            ledger[e.key] = { sha: e.sha, spk: e.spk, model: MODEL, voice, chars: e.chars };
            return true;
        }

        // 429 is the concurrency limit, 5xx is theirs. Everything else is ours
        // and will not get better by being asked again - stop before the run
        // burns money on 4651 identical rejections.
        const retryable = res.status === 429 || res.status >= 500;
        if (!retryable) {
            throw new Error(await explain(res, `"${e.key}"`));
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
    bookTwins();
    saveLedger();
    console.error(`\n✗ stopped: ${err.message}`);
    console.error('  Everything finished so far is in the ledger. Run again to continue.\n');
    process.exit(1);
}
const booked = bookTwins();
saveLedger();
if (booked) console.log(`  ${booked} twins booked without a call`);

// ----------------------------------------------------------------- the report

const after = await billedSoFar();
console.log(`\n✅ ${index - failed} pieces, ${sent.toLocaleString('de-DE')} characters spoken`
          + (failed ? `, ${failed} failed` : ''));
if (before && after) {
    const spent = before.left - after.left;
    const per = spent / Math.max(sent, 1);
    console.log(`   spent ${spent.toLocaleString('de-DE')} credits on ${sent.toLocaleString('de-DE')} characters`
              + (per > 0 ? `  =  ${per.toFixed(3)} credits a character` : ''));
    console.log(`   ${after.left.toLocaleString('de-DE')} credits left`);
    // Guarded: a counter that has not caught up yet gives per = 0, and
    // dividing the balance by it once reported eleven trillion characters.
    if (per >= 0.001) {
        console.log(`   at this rate that reaches`
                  + ` ${Math.floor(after.left / per).toLocaleString('de-DE')} more characters`);
        console.log('   (hold that per-character rate against another run: twice the rate with');
        console.log('    --context on would mean previous_text is billed)');
    } else {
        console.log('   (the account counter has not caught up - no rate to report from this run)');
    }
}
const size = todo.reduce((n, e) => {
    const f = `${OUT}/${fileFor(e)}.opus`;
    return n + (existsSync(f) ? statSync(f).size : 0);
}, 0);
console.log(`   ${(size / 1024 / 1024).toFixed(1)} MiB of opus at ${bitrate}\n`);
