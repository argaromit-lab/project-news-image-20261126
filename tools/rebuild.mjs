import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import {stories, timeline, day} from '../reporting.mjs';
import {coastlines, editorialScene} from './editorial-art.mjs';

const require = createRequire(process.env.ATLAS_RENDER_PACKAGES ?? 'G:/kits/news-image-20261126-tools/package.json');
const {chromium} = require('playwright');
const sharp = require('sharp');
const root = path.resolve(import.meta.dirname, '..');
const out = path.join(root, 'entry.png');

const W = 1024;
const P = {
  paper: '#F7F3EB', ink: '#171717', muted: '#5E5A52', rule: '#B8B1A4',
  navy: '#10263A', navy2: '#183A52', red: '#A42C2C', gold: '#E1A52D',
  green: '#1E6255', blue: '#2A527C', purple: '#674A65', map: '#D8DFD6',
};
const regionColors = {
  Asia: '#19756A', Europe: '#345A85', 'Middle East': '#A13A32',
  Americas: '#9A661C', Africa: '#6E6C31', Oceania: '#724B68', World: '#5C6264',
};
const stateColors = {OFFICIAL: '#145A32', OFFICIALS: '#0E6251', REPORTED: '#922B21', FORECAST: '#1B4F72', CLAIM: '#784212'};
const esc = value => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const rect = (x, y, w, h, fill, more = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${more}/>`;
const line = (x1, y1, x2, y2, stroke = P.rule, width = 1, more = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${width}" ${more}/>`;
const circle = (cx, cy, r, fill, more = '') => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" ${more}/>`;
const pathEl = (d, fill, more = '') => `<path d="${d}" fill="${fill}" ${more}/>`;
const text = (x, y, value, size, opts = {}) => {
  const {fill = P.ink, weight = 400, serif = false, anchor = 'start', italic = false, letter = 0} = opts;
  return `<text x="${x}" y="${y}" fill="${fill}" font-family="${serif ? 'Georgia,Times New Roman,serif' : 'Arial,Helvetica,sans-serif'}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}" ${italic ? 'font-style="italic"' : ''} letter-spacing="${letter}">${esc(value)}</text>`;
};
const wrap = (value, max) => {
  const chunks = String(value).split('|').flatMap(part => {
    const words = part.trim().split(/\s+/); const rows = []; let row = '';
    for (const word of words) {
      if (row && (row + ' ' + word).length > max) { rows.push(row); row = word; }
      else row += (row ? ' ' : '') + word;
    }
    if (row) rows.push(row);
    return rows;
  });
  return chunks;
};
const headline = story => story.headline.replaceAll('|', ' ');
const shortDetail = story => story.detail.replaceAll('|', ' ');
const sourceLine = story => `${story.outlet} · ${story.status}`;

function leadArt(kind) {
  if (kind === 'storm') return `<g>
    ${rect(0, 0, 600, 240, 'url(#storm)')}
    ${pathEl('M0 180L160 148 298 166 460 142 600 164V240H0Z', '#2B414D')}
    ${line(300, 157, 260, 240, '#B9CBC8', 3)}${line(330, 157, 380, 240, '#B9CBC8', 3)}
    ${pathEl('M188 97C152 61 177 19 214 28C226 -4 278 12 279 55C311 16 359 38 341 78C330 112 283 131 238 126C218 127 199 116 188 97Z', '#C86C44', 'stroke="#FFE2A2" stroke-width="4"')}
    ${pathEl('M240 113C251 84 280 77 307 90C320 113 296 140 261 138Z', '#E8B172', 'stroke="#FFE7B8" stroke-width="3"')}
    ${circle(280, 100, 5, '#15333E')}${circle(281, 98, 1.5, '#FFF4D8')}
    ${pathEl('M307 105L332 113 310 121Z', '#F1A14D')}
    ${pathEl('M382 45Q434 20 493 57L512 93 483 78 459 102 433 80 405 103Z', '#D2524B', 'stroke="#F7B187" stroke-width="3"')}
    ${line(455, 53, 460, 150, '#F4D4A2', 4)}
    ${Array.from({length: 18}, (_, i) => line(25 + i * 35, 18 + (i % 5) * 19, 12 + i * 35, 44 + (i % 5) * 19, '#B9D5DA', 2, 'opacity=".65"')).join('')}
  </g>`;
  if (kind === 'mumbai') return `<g>
    ${rect(0, 0, 600, 240, 'url(#mumbai)')}
    ${pathEl('M0 205Q140 154 300 190T600 178V240H0Z', '#342A2B')}
    ${rect(63, 45, 54, 137, '#D7CFB7')}${rect(111, 55, 43, 127, '#B3A992')}${rect(160, 33, 57, 149, '#E1D6B9')}
    ${rect(70, 75, 14, 14, '#7C6657')}${rect(93, 111, 14, 14, '#7C6657')}${rect(125, 86, 13, 13, '#6E5B53')}${rect(179, 67, 15, 15, '#7C6657')}
    ${pathEl('M305 168V94H349V67H396V168H438V107H492V181H305Z', '#524946')}
    ${line(0, 211, 600, 211, '#D5B66A', 2)}
    ${Array.from({length: 9}, (_, i) => `<g transform="translate(${245 + i * 31} 177)">${line(0, 0, 0, 30, '#E3C99B', 2)}${circle(0, 2, 5, i % 2 ? '#E6A36F' : '#F2E0B0')}</g>`).join('')}
    ${rect(458, 23, 112, 42, '#9C2D2C')}${text(514, 41, '26/11', 21, {fill: '#FFF3D4', weight: 800, anchor: 'middle'})}${text(514, 57, 'REMEMBERED', 8, {fill: '#FFF3D4', weight: 700, anchor: 'middle', letter: .6})}
  </g>`;
  if (kind === 'chess') return `<g>
    ${rect(0, 0, 600, 240, 'url(#chess)')}
    ${Array.from({length: 8}, (_, r) => Array.from({length: 12}, (_, c) => rect(72 + c * 33, 34 + r * 24, 33, 24, (r + c) % 2 ? '#C3A477' : '#F0D6A8')).join('')).join('')}
    ${circle(182, 90, 27, '#F1E4C9', 'stroke="#473D36" stroke-width="3"')}${circle(397, 90, 27, '#242C32', 'stroke="#D7C18F" stroke-width="3"')}
    ${pathEl('M166 178L182 125 198 178Z', '#F1E4C9', 'stroke="#473D36" stroke-width="3"')}${pathEl('M380 178L397 125 414 178Z', '#242C32', 'stroke="#D7C18F" stroke-width="3"')}
    ${text(182, 215, 'GUKESH', 15, {fill: '#F7F0DE', weight: 800, anchor: 'middle', letter: 1})}${text(397, 215, 'SINDAROV', 15, {fill: '#F7F0DE', weight: 800, anchor: 'middle', letter: 1})}
    ${rect(468, 25, 93, 39, '#A52D2D')}${text(514, 51, 'GAME 3', 16, {fill: '#FFF4D2', weight: 800, anchor: 'middle'})}
  </g>`;
  if (kind === 'summit') return `<g>${rect(0, 0, 600, 240, 'url(#green)')}${pathEl('M0 170L112 119 266 140 420 104 600 153V240H0Z', '#244A44')}${circle(285, 100, 55, '#E4D7A6')}${circle(285, 100, 36, '#244D79')}${text(285, 108, 'EU 27', 19, {fill: '#F6E8BB', weight: 800, anchor: 'middle'})}${pathEl('M105 179L262 144 455 161 506 194 138 203Z', '#B38C55')}${text(302, 58, '2028–34', 24, {fill: '#FFE08A', weight: 800, anchor: 'middle'})}</g>`;
  if (kind === 'radar') return `<g>${rect(0, 0, 600, 240, 'url(#blue)')}${pathEl('M0 188L168 142 318 160 472 132 600 158V240H0Z', '#1B3947')}${rect(57, 67, 132, 101, '#2C676A', 'stroke="#A6D4C3" stroke-width="3"')}${circle(123, 117, 22, 'none', 'stroke="#6EE0BF" stroke-width="3"')}${circle(123, 117, 45, 'none', 'stroke="#6EE0BF" stroke-width="2" opacity=".7"')}${line(123, 117, 166, 80, '#FFE29A', 4)}${pathEl('M391 172L449 74 507 172Z', '#E2B957', 'stroke="#FFF0BA" stroke-width="3"')}${text(450, 202, 'DRONE DEBRIS', 17, {fill: '#FFE5A5', weight: 800, anchor: 'middle', letter: 1})}</g>`;
  return `<g>${rect(0, 0, 600, 240, 'url(#blue)')}${pathEl('M0 195L150 143 318 171 450 136 600 175V240H0Z', '#223B4D')}${text(300, 130, 'WORLD NEWS', 35, {fill: '#FFE4A1', weight: 800, anchor: 'middle'})}</g>`;
}

function sceneArt(story) {
  if (story.scene === 'storm') return leadArt('storm');
  const custom = ['summit', 'radar'].includes(story.scene) ? leadArt(story.scene) : null;
  return custom ?? editorialScene(story.scene) ?? leadArt('generic');
}

function statusBadge(story, x, y, w, small = false) {
  const label = story.status;
  const bw = Math.min(w, Math.max(42, label.length * (small ? 5.4 : 6.2) + 14));
  return `${rect(x, y, bw, small ? 13 : 16, stateColors[label] ?? P.navy, 'stroke="#F7F3EB" stroke-width="1"')}${text(x + bw / 2, y + (small ? 9.5 : 11.5), label, small ? 7.3 : 8.5, {fill: '#FFFDF5', weight: 800, anchor: 'middle', letter: .25})}`;
}

function featureCard(story, number, x, y, w, h, lead = false) {
  const artH = lead ? 88 : 59;
  const titleSize = lead ? 22 : 13.2;
  const titleMax = lead ? 24 : 21;
  const titleRows = wrap(headline(story), titleMax).slice(0, lead ? 2 : 2);
  const body = lead ? wrap(shortDetail(story), 43).slice(0, 1) : [];
  const art = story.place === 'Mumbai' && lead ? leadArt('mumbai') : story.field === 'Sport' && lead ? leadArt('chess') : sceneArt(story);
  const artScale = w / 600;
  const parts = [];
  parts.push(rect(x, y, w, h, '#FFFDF7', 'stroke="#B8B1A4" stroke-width="1"'));
  parts.push(`<svg x="${x}" y="${y}" width="${w}" height="${artH}" viewBox="0 0 600 240" preserveAspectRatio="none" overflow="hidden">${art}</svg>`);
  parts.push(circle(x + 15, y + 15, lead ? 11 : 9, P.red, 'stroke="#FFF9E7" stroke-width="2"'));
  parts.push(text(x + 15, y + (lead ? 19 : 18), number, lead ? 12 : 10, {fill: '#FFF8E2', weight: 800, anchor: 'middle'}));
  parts.push(text(x + 8, y + artH + 16, `${story.region.toUpperCase()} · ${story.place.toUpperCase()}`, lead ? 8.5 : 7, {fill: regionColors[story.region] ?? P.navy, weight: 800, letter: .45}));
  titleRows.forEach((row, i) => parts.push(text(x + 8, y + artH + (lead ? 38 : 24) + i * (lead ? 21 : 13), row, lead ? titleSize : 12.2, {serif: true, weight: 800})));
  const bodyY = y + artH + 38 + titleRows.length * (lead ? 21 : 13) + (lead ? 2 : 0);
  body.forEach((row, i) => parts.push(text(x + 8, bodyY + i * 10, row, 9, {fill: P.muted})));
  const bottom = y + h - (lead ? 17 : 15);
  parts.push(text(x + 8, bottom + (lead ? 10 : 9), `SOURCE: ${story.outlet}`, lead ? 7.5 : 6.7, {fill: P.muted, weight: 700, letter: .2}));
  parts.push(statusBadge(story, x + w - (lead ? 82 : 62), bottom - 1, lead ? 76 : 58, !lead));
  return parts.join('');
}

function geo(lon, lat, x, y, w, h) {
  return [x + ((lon + 180) / 360) * w, y + ((80 - lat) / 140) * h];
}
function mapBlock(x, y, w, h, featured) {
  const parts = [rect(x, y, w, h, '#102A40', 'stroke="#17222A" stroke-width="1"')];
  const mx = x + 8, my = y + 22, mw = w - 16, mh = h - 40;
  for (const outline of coastlines) {
    const d = outline.map(([lon, lat], i) => { const [px, py] = geo(lon, lat, mx, my, mw, mh); return `${i ? 'L' : 'M'}${px.toFixed(1)} ${py.toFixed(1)}`; }).join(' ') + 'Z';
    parts.push(pathEl(d, '#4F8A6B', 'stroke="#87B08A" stroke-width=".7"'));
  }
  parts.push(text(x + 10, y + 15, 'WHERE IT HAPPENED · PINS 1–13', 8.5, {fill: '#F8E6B1', weight: 800, letter: .6}));
  featured.forEach((story, i) => {
    if (story.lat == null || story.lon == null) return;
    const [px, py] = geo(story.lon, story.lat, mx, my, mw, mh);
    parts.push(circle(px, py, 9, i < 3 ? P.gold : P.red, 'stroke="#FFF0BF" stroke-width="1.5"'));
    parts.push(text(px, py + 3.5, i + 1, 8, {fill: i < 3 ? '#13283B' : '#FFF7DB', weight: 800, anchor: 'middle'}));
  });
  stories.slice(13, 36).forEach((story, i) => {
    if (story.lat == null || story.lon == null) return;
    const [px, py] = geo(story.lon, story.lat, mx, my, mw, mh);
    parts.push(circle(px, py, 3, '#C9D77B', 'stroke="#102A40" stroke-width=".7"'));
  });
  parts.push(text(x + 10, y + h - 9, 'PINS MARK THE FEATURE SCENES · DOTS MARK BRIEFS', 7.2, {fill: '#D8E6D5', weight: 700, letter: .25}));
  return parts.join('');
}

function briefColumns(x, y, w, h, briefStories) {
  const cols = [[], [], []];
  briefStories.forEach((story, i) => cols[i % 3].push(story));
  const colW = w / 3;
  const parts = [text(x, y + 14, 'ALSO ON THURSDAY 26 NOVEMBER · 23 MORE DATED STORIES', 8.5, {fill: P.navy, weight: 800, letter: .45})];
  cols.forEach((col, c) => {
    const cx = x + c * colW;
    if (c) parts.push(line(cx - 8, y + 22, cx - 8, y + h, P.rule, 1));
    col.forEach((story, i) => {
      const n = 14 + c + i * 3;
      const yy = y + 32 + i * 25;
      parts.push(circle(cx + 8, yy - 3, 8, regionColors[story.region] ?? P.navy));
      parts.push(text(cx + 8, yy, n, 7.5, {fill: '#FFF7DF', weight: 800, anchor: 'middle'}));
      const lead = `${story.place} — ${headline(story)}`;
      const rows = wrap(lead, c === 1 ? 31 : 28).slice(0, 2);
      rows.forEach((row, j) => parts.push(text(cx + 20, yy + j * 10, row, 8.2, {fill: j ? P.muted : P.ink, weight: j ? 400 : 700})));
      if (story.status === 'FORECAST' || story.status === 'CLAIM') parts.push(text(cx + colW - 9, yy, story.status, 6.2, {fill: stateColors[story.status], weight: 800, anchor: 'end'}));
      parts.push(text(cx + 20, yy + rows.length * 10 + 1, story.outlet, 6.2, {fill: P.muted, letter: .15}));
    });
  });
  return parts.join('');
}

function buildSvg() {
  const features = [stories[1], stories[14], stories[15], stories[0], stories[2], stories[3], stories[4], stories[5], stories[6], stories[7], stories[8], stories[9], stories[10]];
  const used = new Set(features.map(story => story.id));
  const briefs = stories.filter(story => story.id <= 36 && !used.has(story.id));
  const counts = [...new Set(stories.slice(0, 36).map(s => s.region))].map(region => `${region.toUpperCase()} ${stories.slice(0, 36).filter(s => s.region === region).length}`);
  const svg = [];
  const add = part => svg.push(part);
  add(`<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><defs>
    <linearGradient id="storm" x2=".7" y2="1"><stop stop-color="#405B6A"/><stop offset="1" stop-color="#172E40"/></linearGradient>
    <linearGradient id="mumbai" x2=".7" y2="1"><stop stop-color="#5D3E45"/><stop offset="1" stop-color="#1E2834"/></linearGradient>
    <linearGradient id="chess" x2=".7" y2="1"><stop stop-color="#2B5278"/><stop offset="1" stop-color="#162A3D"/></linearGradient>
    <linearGradient id="blue" x2=".6" y2="1"><stop stop-color="#2E6171"/><stop offset="1" stop-color="#0E1E32"/></linearGradient>
    <linearGradient id="green" x2=".7" y2="1"><stop stop-color="#2C735C"/><stop offset="1" stop-color="#0B3B2E"/></linearGradient>
    <linearGradient id="red" x2=".6" y2="1"><stop stop-color="#9A4938"/><stop offset="1" stop-color="#5C161B"/></linearGradient>
  </defs>${rect(0, 0, W, W, P.paper)}`);

  add(text(18, 27, 'THE DAILY ATLAS', 11, {fill: P.navy, weight: 800, letter: .5}));
  add(text(1006, 27, 'THURSDAY 26 NOVEMBER 2026 · 36 STORIES · 9 REGIONS', 8.2, {fill: P.muted, weight: 800, anchor: 'end', letter: .4}));
  add(line(18, 37, 1006, 37, P.ink, 2));
  add(text(512, 89, 'Thursday 26 November 2026', 48, {serif: true, weight: 800, anchor: 'middle'}));
  add(text(512, 112, 'A storm stills Thanksgiving · Mumbai remembers · Game 3 goes to Geneva', 11.5, {fill: P.red, serif: true, italic: true, anchor: 'middle'}));
  add(line(18, 123, 1006, 123, P.ink, 1));

  const stats = [['36', 'DATED STORIES'], ['9', 'REGIONS'], ['17', 'FIELDS'], ['13', 'PICTURED MOMENTS']];
  stats.forEach(([num, label], i) => {
    const x = 18 + i * 247;
    add(text(x, 150, num, 24, {fill: i === 0 ? P.red : P.navy, serif: true, weight: 800}));
    add(text(x + 42, 149, label, 8.2, {fill: P.muted, weight: 800, letter: .6}));
    if (i < 3) add(line(x + 229, 137, x + 229, 157, P.rule, 1));
  });
  add(line(18, 162, 1006, 162, P.ink, 1));
  let cursor = 18;
  const total = 988;
  counts.forEach((label, i) => { const width = total / counts.length; add(rect(cursor, 164, width + .5, 16, regionColors[label.split(' ')[0].replace('MIDDLE', 'Middle') ] ?? Object.values(regionColors)[i % 7])); add(text(cursor + width / 2, 175, label, 7, {fill: '#FFF8E2', weight: 800, anchor: 'middle', letter: .15})); cursor += width; });

  add(rect(18, 188, 988, 21, P.navy));
  add(text(27, 202, 'THE DAY IN UTC', 8.5, {fill: '#FFF1C9', weight: 800, letter: .5}));
  timeline.slice(0, 6).forEach(([time, label], i) => {
    const x = 136 + i * 143;
    add(text(x, 201, time, 8.5, {fill: P.gold, weight: 800}));
    add(text(x + 37, 201, label, 7.5, {fill: '#F5F0E4'}));
    if (i < 5) add(line(x + 133, 193, x + 133, 205, '#5A7182', 1));
  });

  const leadY = 218, leadH = 190, leadW = 322, gap = 11;
  [features[0], features[1], features[2]].forEach((story, i) => add(featureCard(story, i + 1, 18 + i * (leadW + gap), leadY, leadW, leadH, true)));
  const support = features.slice(3);
  const smallW = 190, smallH = 125, smallGap = 8;
  support.forEach((story, i) => { const row = Math.floor(i / 5), col = i % 5; add(featureCard(story, i + 4, 18 + col * (smallW + smallGap), 415 + row * (smallH + 8), smallW, smallH, false)); });

  add(line(18, 675, 1006, 675, P.ink, 1));
  add(mapBlock(18, 683, 372, 244, features));
  add(briefColumns(410, 683, 596, 244, briefs));
  add(rect(18, 938, 988, 42, '#F0E8D8', 'stroke="#A42C2C" stroke-width="1"'));
  add(text(27, 954, 'DATE CHECK · NOT 26 NOV', 8.5, {fill: P.red, weight: 800, letter: .45}));
  add(text(27, 970, 'x Parade delay announced 25 Nov  ·  x Cairo crash occurred 25 Nov  ·  x NZ final count due 27 Nov', 8, {fill: P.ink}));
  add(text(1006, 994, 'OFFICIAL = on the record · OFFICIALS = attributed statement · REPORTED = news report · FORECAST = outlook · CLAIM = unverified', 6.8, {fill: P.muted, anchor: 'end'}));
  add('</svg>');
  return svg.join('');
}

const browser = await chromium.launch({headless: true, executablePath: process.env.ATLAS_CHROME_PATH || undefined});
try {
  const page = await browser.newPage({viewport: {width: W, height: W}, deviceScaleFactor: 2});
  await page.setContent(buildSvg(), {waitUntil: 'load'});
  const geometry = await page.evaluate(() => {
    const svg = document.querySelector('svg');
    const boxes = [...document.querySelectorAll('text')].map((node, index) => {
      const box = node.getBBox();
      return {index, text: node.textContent, x: box.x, y: box.y, right: box.x + box.width, bottom: box.y + box.height};
    });
    const overflow = boxes.filter(box => box.x < 1 || box.y < 1 || box.right > 1023 || box.bottom > 1023);
    return {textCount: boxes.length, overflow};
  });
  fs.mkdirSync(path.join(root, '.makefun-kit'), {recursive: true});
  fs.writeFileSync(path.join(root, '.makefun-kit', 'geometry.json'), JSON.stringify(geometry, null, 2));
  if (geometry.overflow.length) throw new Error(`text outside canvas: ${JSON.stringify(geometry.overflow.slice(0, 3))}`);
  const png = await page.screenshot({type: 'png'});
  await sharp(png).resize(W, W, {fit: 'fill'}).png({compressionLevel: 9, palette: true, colours: 256}).toFile(out);
} finally {
  await browser.close();
}
console.log(`wrote ${out}`);
