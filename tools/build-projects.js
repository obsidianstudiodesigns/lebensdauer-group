const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const DATA = require('./projects-data.js');

const ROOT = 'C:\\Users\\Nadia\\Desktop\\Website market\\Lebensdauer Group EC';
const SRC = path.join(ROOT, 'Our work');
const THUMB = path.join(ROOT, 'assets', 'img', 'projects');
const FULL = path.join(THUMB, 'full');
fs.mkdirSync(FULL, { recursive: true });

const ff = a => execFileSync('ffmpeg', a, { stdio: ['ignore', 'ignore', 'pipe'] });
const order = ['residential', 'commercial', 'industrial'];

/* ---------- 1. process any image that doesn't exist yet ---------- */
let made = 0, skipped = 0;
const problems = [];

for (const key of order) {
  for (const [slug, file] of DATA[key].items) {
    const thumb = path.join(THUMB, slug + '.jpg');
    const full = path.join(FULL, slug + '.jpg');

    if (fs.existsSync(thumb) && fs.existsSync(full)) { skipped++; continue; }

    if (!file) { problems.push('no source and no existing file: ' + slug); continue; }
    const srcPath = path.join(SRC, file);
    if (!fs.existsSync(srcPath)) { problems.push('missing source: ' + file + ' (' + slug + ')'); continue; }

    ff(['-y', '-v', 'error', '-i', srcPath,
        '-vf', 'scale=800:600:force_original_aspect_ratio=increase,crop=800:600,unsharp=5:5:0.3',
        '-q:v', '4', thumb]);
    ff(['-y', '-v', 'error', '-i', srcPath,
        '-vf', "scale='min(iw,1600)':-2",
        '-q:v', '4', full]);
    made++;
  }
}
console.log('images: ' + made + ' new, ' + skipped + ' already present');
if (problems.length) { console.log('PROBLEMS:\n' + problems.join('\n')); process.exit(1); }

/* every source used exactly once? */
const used = {};
for (const key of order) for (const [, f] of DATA[key].items) if (f) used[f] = (used[f] || 0) + 1;
const dupes = Object.keys(used).filter(f => used[f] > 1);
if (dupes.length) { console.log('DUPLICATE SOURCES:\n' + dupes.join('\n')); process.exit(1); }

const allSources = fs.readdirSync(SRC).filter(f => /\.jpe?g$/i.test(f));
const unused = allSources.filter(f => !used[f]);
console.log('sources used ' + Object.keys(used).length + ' of ' + allSources.length +
  (unused.length ? '\nnot published: ' + unused.join(', ') : ''));

/* ---------- 2. rebuild projects.html ---------- */
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const total = order.reduce((n, k) => n + DATA[k].items.length, 0);

const catTiles = order.map(k => {
  const c = DATA[k];
  return `      <button class="cat" type="button" role="tab" data-cat="${k}"
        id="tab-${k}" aria-controls="panel-${k}" aria-selected="false" tabindex="-1">
        <img src="assets/img/projects/${c.cover}.jpg" alt="${esc(c.coverAlt)}" width="800" height="600" loading="lazy" decoding="async">
        <span class="cat__body">
          <span class="cat__name">${esc(c.name)}</span>
          <span class="cat__count">${c.items.length} project${c.items.length === 1 ? '' : 's'}</span>
        </span>
      </button>`;
}).join('\n\n');

const panels = order.map(k => {
  const c = DATA[k];
  const tiles = c.items.map(([slug, , eyebrow, title, alt]) => `        <button class="tile" type="button" data-lb
          data-full="assets/img/projects/full/${slug}.jpg"
          data-sector="${esc(eyebrow)}"
          data-title="${esc(title)}"
          data-alt="${esc(alt)}">
          <img src="assets/img/projects/${slug}.jpg" alt="${esc(alt)}" width="800" height="600" loading="lazy" decoding="async">
          <span class="tile__zoom" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3.5 9.5v-6h6M20.5 14.5v6h-6M20.5 9.5v-6h-6M3.5 14.5v6h6"/></svg>
          </span>
          <span class="tile__cap"><em>${esc(eyebrow)}</em>${esc(title)}</span>
        </button>`).join('\n\n');

  return `    <div class="catpanel" id="panel-${k}" data-panel="${k}" role="tabpanel" aria-labelledby="tab-${k}">
      <h2 class="sr-only">${esc(c.name)} projects</h2>
      <div class="gallery">
${tiles}
      </div>
    </div>`;
}).join('\n\n');

const existing = fs.readFileSync(path.join(ROOT, 'projects.html'), 'utf8');

/* swap the category tiles block */
const tilesStart = existing.indexOf('    <div class="cats" role="tablist"');
const tilesEnd = existing.indexOf('    </div>\n  </div>\n</section>', tilesStart);
if (tilesStart < 0 || tilesEnd < 0) { console.log('could not locate cats block'); process.exit(1); }
let out = existing.slice(0, tilesStart) +
  `    <div class="cats" role="tablist" aria-label="Project categories" data-reveal>\n${catTiles}\n` +
  existing.slice(tilesEnd);

/* swap the panels block */
const panelStart = out.indexOf('    <div class="catpanel"');
const panelEnd = out.indexOf('    <p class="muted" style="margin-top:clamp(2rem,4vw,3rem)');
if (panelStart < 0 || panelEnd < 0) { console.log('could not locate panels block'); process.exit(1); }
out = out.slice(0, panelStart) + panels + '\n\n' + out.slice(panelEnd);

/* lightbox default counter */
out = out.replace(/<span class="lightbox__count" data-lb-count>[^<]*<\/span>/,
  '<span class="lightbox__count" data-lb-count>1 / ' + DATA.residential.items.length + '</span>');

fs.writeFileSync(path.join(ROOT, 'projects.html'), out);
console.log('projects.html rebuilt â€” ' + order.map(k => DATA[k].name + ':' + DATA[k].items.length).join(', ') + ' (total ' + total + ')');
