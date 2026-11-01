/**
 * A page for listening to the narration, scene by scene.
 *
 * The audio is filed under the checksum of its text (see voice-text.mjs,
 * fileFor), which is right for the browser and useless for a person: a folder
 * of 4,648 files called 0ca9ab1281f7.opus says nothing about what is in them.
 * The manifest holds the map and this turns it into something playable.
 *
 * Writes voice/index.<lang>.html. Generated, never committed - it is derived
 * from the manifest and the rendered audio, and regenerating costs a second.
 * It points at docs/audio/, the copy that IS in the repository, so the page
 * works on any clone that has been built.
 *
 * WHY IT IS SERVED RATHER THAN DOUBLE-CLICKED. The page sits in voice/ and the
 * audio in docs/audio/ - siblings. Since Firefox 68 a file:// page may only
 * read files in its OWN directory and below, so the buttons would have been
 * dead there and alive in Chrome, which is the worst kind of difference to
 * hand someone. Over http both are simply files on one server.
 *
 * Usage: node tools/voice-index.mjs [--lang=de|en] [--all] [--serve]
 *        --all     write both languages
 *        --serve   write, then serve the repository on :4180 until Ctrl-C
 */
import { readFileSync, writeFileSync, existsSync, statSync, createReadStream } from 'node:fs';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { collectEntries } from './voice-text.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const args = process.argv.slice(2);
const flag = (n, d) => { const h = args.find(a => a.startsWith(`--${n}=`)); return h ? h.slice(n.length + 3) : d; };
const LANGS = args.includes('--all') ? ['de', 'en'] : [flag('lang', 'de')];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

for (const LANG of LANGS) {
    const { entries } = await collectEntries(LANG);
    const manifest = JSON.parse(readFileSync(`${ROOT}voice/manifest.${LANG}.json`, 'utf8'));
    const known = new Map(manifest.entries.map(e => [e.key, e.sha]));

    let missing = 0, bytes = 0;
    const rows = entries.map(e => {
        const sha = known.get(e.key);
        const file = `${ROOT}docs/audio/${LANG}/${sha}.opus`;
        const here = sha && existsSync(file);
        if (!here) missing++; else bytes += statSync(file).size;
        const [pool, ...rest] = e.key.split('/');
        return { pool, key: e.key, tail: rest.join('/'), sha, here, chars: e.chars, spoken: e.spoken };
    });

    const pools = [...new Set(rows.map(r => r.pool))].sort();
    const html = `<!doctype html>
<html lang="${LANG}">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Narration (${LANG})</title>
<style>
  :root { color-scheme: dark; --bg:#0f172a; --panel:#1e293b; --line:#334155; --ink:#e2e8f0; --dim:#94a3b8; --go:#22c55e; }
  * { box-sizing: border-box; }
  body { margin:0; background:var(--bg); color:var(--ink); font:14px/1.5 system-ui, sans-serif; }
  header { position:sticky; top:0; background:var(--bg); border-bottom:1px solid var(--line); padding:14px 20px; z-index:2; }
  h1 { margin:0 0 4px; font-size:16px; letter-spacing:.08em; text-transform:uppercase; color:var(--dim); font-weight:700; }
  .meta { color:var(--dim); font-size:12px; }
  .bar { display:flex; gap:8px; flex-wrap:wrap; margin-top:10px; }
  input, select { background:var(--panel); color:var(--ink); border:1px solid var(--line); border-radius:6px; padding:6px 10px; font:inherit; min-width:0; }
  input { flex:1 1 260px; }
  main { padding:12px 20px 60px; }
  .row { display:grid; grid-template-columns:auto 1fr; gap:12px; padding:10px 0; border-bottom:1px solid var(--line); align-items:start; }
  button.play { background:var(--panel); border:1px solid var(--line); color:var(--go); border-radius:6px; width:36px; height:36px; font-size:14px; cursor:pointer; }
  button.play:hover { border-color:var(--go); }
  button.play:disabled { color:var(--dim); cursor:not-allowed; opacity:.45; }
  button.play.on { background:var(--go); color:#06240f; border-color:var(--go); }
  .key { font-family:ui-monospace, monospace; font-size:11px; color:var(--dim); word-break:break-all; }
  .key b { color:var(--ink); font-weight:600; }
  .txt { margin-top:3px; white-space:pre-wrap; }
  .gone { color:#f87171; }
  .none { color:var(--dim); padding:24px 0; }
</style>
<header>
  <h1>Narration &mdash; ${LANG}</h1>
  <div class="meta">${rows.length} Stücke · ${(bytes / 1024 / 1024).toFixed(1)} MiB${missing ? ` · <span class="gone">${missing} ohne Datei</span>` : ''} · aus voice/manifest.${LANG}.json</div>
  <div class="bar">
    <input id="q" type="search" placeholder="Suche in Text, Schlüssel oder Dateiname…" autofocus>
    <select id="pool"><option value="">alle Bereiche</option>${pools.map(p => `<option>${p}</option>`).join('')}</select>
    <span class="meta" id="count" style="align-self:center"></span>
  </div>
</header>
<main id="list">
<div class="none" id="none" hidden>Nichts gefunden.</div>
${rows.map(r => `<div class="row" data-pool="${r.pool}" data-hay="${esc((r.key + ' ' + r.sha + ' ' + r.spoken).toLowerCase())}">
  <button class="play" ${r.here ? `data-src="../docs/audio/${LANG}/${r.sha}.opus"` : 'disabled'} title="${r.here ? 'abspielen' : 'keine Datei'}">&#9654;</button>
  <div><div class="key"><b>${esc(r.pool)}</b>/${esc(r.tail)} &nbsp;·&nbsp; ${r.sha}.opus &nbsp;·&nbsp; ${r.chars} Zeichen${r.here ? '' : ' <span class="gone">— Datei fehlt</span>'}</div><div class="txt">${esc(r.spoken)}</div></div>
</div>`).join('\n')}
</main>
<script>
  // One player for the whole page. 4648 audio elements would each hold a
  // decoder, and the point of the page is to hear ONE line at a time.
  var player = new Audio(), current = null;
  player.addEventListener('ended', function () { if (current) current.classList.remove('on'); current = null; });
  document.getElementById('list').addEventListener('click', function (e) {
    var b = e.target.closest('button.play');
    if (!b || !b.dataset.src) return;
    if (current === b) { player.pause(); b.classList.remove('on'); current = null; return; }
    if (current) current.classList.remove('on');
    player.src = b.dataset.src;
    player.play().catch(function () { b.classList.remove('on'); current = null; });
    b.classList.add('on'); current = b;
  });

  var rows = [].slice.call(document.querySelectorAll('.row'));
  var q = document.getElementById('q'), pool = document.getElementById('pool'),
      count = document.getElementById('count'), none = document.getElementById('none');
  function filter() {
    var needle = q.value.trim().toLowerCase(), want = pool.value, shown = 0;
    for (var i = 0; i < rows.length; i++) {
      var hit = (!want || rows[i].dataset.pool === want) && (!needle || rows[i].dataset.hay.indexOf(needle) !== -1);
      rows[i].style.display = hit ? '' : 'none';
      if (hit) shown++;
    }
    count.textContent = shown + ' von ' + rows.length;
    // An empty page looks like a broken one. Say so instead.
    none.hidden = shown > 0;
  }
  q.addEventListener('input', filter); pool.addEventListener('change', filter); filter();
</script>
</html>
`;
    writeFileSync(`${ROOT}voice/index.${LANG}.html`, html);
    console.log(`  voice/index.${LANG}.html  -  ${rows.length} pieces, ${(bytes / 1024 / 1024).toFixed(1)} MiB${missing ? `, ${missing} without a file` : ''}`);
}

if (!args.includes('--serve')) {
    console.log(`\n  Open it with:  node tools/voice-index.mjs --lang=${LANGS[0]} --serve\n`);
    process.exit(0);
}

// --- the server ---------------------------------------------------------------
//
// Range requests are not optional here: an <audio> element asks for one, and a
// server that answers 200 to a Range request makes some browsers refuse to
// play at all. These are 30 kB files, so the whole thing is read and sliced.
const TYPES = { html: 'text/html; charset=utf-8', opus: 'audio/ogg', mp3: 'audio/mpeg', json: 'application/json' };
const PORT = 4180;

createServer((req, res) => {
    const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    // Nothing outside the repository, whatever the path says.
    const file = ROOT + path.replace(/^\/+/, '').replace(/\.\./g, '');
    if (!existsSync(file) || statSync(file).isDirectory()) { res.writeHead(404).end('not here'); return; }

    const size = statSync(file).size;
    const type = TYPES[file.split('.').pop()] ?? 'application/octet-stream';
    const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range ?? '');
    if (range) {
        const from = range[1] ? +range[1] : 0;
        const to = range[2] ? Math.min(+range[2], size - 1) : size - 1;
        res.writeHead(206, { 'Content-Type': type, 'Content-Length': to - from + 1,
                             'Content-Range': `bytes ${from}-${to}/${size}`, 'Accept-Ranges': 'bytes' });
        createReadStream(file, { start: from, end: to }).pipe(res);
        return;
    }
    res.writeHead(200, { 'Content-Type': type, 'Content-Length': size, 'Accept-Ranges': 'bytes' });
    createReadStream(file).pipe(res);
}).listen(PORT, () => {
    for (const l of LANGS) console.log(`\n  http://localhost:${PORT}/voice/index.${l}.html`);
    console.log('\n  Ctrl-C to stop.\n');
});
