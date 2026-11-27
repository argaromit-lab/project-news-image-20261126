// SPDX-License-Identifier: MIT
// Browser-side refinements for the original Daily Atlas vector composition.
export function refineEdition({pass, stories, coastlines, palette, regions}) {
  if (!/^Q[1-3]$/.test(pass)) return;
  const svg = document.querySelector('svg');
  const headlinePass = pass === 'Q1';
  const mapPass = pass === 'Q2';
  const ns = 'http://www.w3.org/2000/svg';
  const node = (tag, attrs, value) => {
    const el = document.createElementNS(ns, tag);
    for (const [name, attribute] of Object.entries(attrs)) el.setAttribute(name, String(attribute));
    if (value !== undefined) el.textContent = String(value);
    return el;
  };
  const shiftText = (el, dy) => {
    el.setAttribute('y', Number(el.getAttribute('y')) + dy);
    if (el.dataset.bounds) {
      const box = el.dataset.bounds.split(',').map(Number);
      box[1] += dy;
      el.dataset.bounds = box.join(',');
    }
  };

  if (pass === 'Q3') {
    const picture = svg.querySelector('[data-story="2"] svg');
    const scene = node('g', {'data-original-scene': 'turkey-parade-balloon'});
    const draw = (tag, attrs) => scene.appendChild(node(tag, attrs));
    const shape = (d, fill, stroke = '', width = 2) => draw('path', {
      d, fill, ...(stroke ? {stroke, 'stroke-width': width, 'stroke-linejoin': 'round', 'stroke-linecap': 'round'} : {}),
    });
    const oval = (cx, cy, rx, ry, fill, more = {}) => draw('ellipse', {cx, cy, rx, ry, fill, ...more});
    draw('rect', {x: 0, y: 0, width: 600, height: 240, fill: 'url(#blue)'});
    shape('M0 167V63H28V34H60V76H91V15H127V78H157V41H185V169Z M473 166V60H502V26H536V81H566V45H600V190Z', '#274E60');
    for (const [x, y] of [[12, 91], [48, 107], [103, 52], [107, 112], [158, 86], [491, 90], [517, 53], [552, 108], [581, 82]]) {
      draw('rect', {x, y, width: 8, height: 14, fill: '#F7D683', opacity: 0.8});
    }
    shape('M0 188L220 155H451L600 199V240H0Z', '#41606B');
    shape('M300 169L264 240M355 169L400 240', 'none', '#B1C6C2', 3);
    // A tall fan, round body, raised head and visible strings distinguish a balloon from food.
    for (const [cx, cy, rx, ry, angle, fill] of [
      [227, 80, 22, 70, -47, '#D67B41'], [250, 62, 23, 72, -25, '#ECA653'],
      [280, 58, 24, 74, -4, '#F2C266'], [310, 69, 23, 71, 19, '#E8A24E'],
      [333, 89, 20, 67, 43, '#D77D45'],
    ]) {
      oval(cx, cy, rx, ry, fill, {transform: `rotate(${angle} ${cx} ${cy})`, stroke: '#FFE0A0', 'stroke-width': 3});
    }
    oval(316, 106, 65, 66, '#B97643', {stroke: '#F6D58F', 'stroke-width': 3});
    shape('M272 104Q302 69 342 102Q348 135 316 151Q283 148 272 104Z', '#E3AA62', '#F7D793', 2);
    shape('M346 104Q351 79 359 62Q365 44 379 36L395 49Q383 71 384 107Z', '#E9B475', '#FFE3A4', 3);
    oval(394, 32, 24, 25, '#97C8C6', {stroke: '#D8E7C4', 'stroke-width': 3});
    shape('M413 28L449 38 414 46Z', '#F1C45D', '#FFE0A0', 2);
    oval(403, 24, 5, 6, '#163442');
    oval(405, 22, 1.5, 2, '#FFF1C8');
    shape('M412 43Q432 72 417 81Q401 75 407 56Z', '#E35E50', '#F8A06C', 2);
    shape('M388 9Q397-3 407 9', 'none', '#EC7653', 7);
    shape('M293 164L278 183M330 167L344 185', 'none', '#EFBE72', 7);
    shape('M275 136L220 216M319 167L315 219M375 103L404 213', 'none', '#F4E5B6', 2.5);
    for (const [x, y, coat] of [[219, 210, '#D89550'], [315, 214, '#E3B55E'], [406, 209, '#CB7753']]) {
      oval(x, y - 12, 5, 7, '#E5BE8D');
      shape(`M${x - 6} ${y - 4}H${x + 6}L${x + 9} ${y + 15}H${x - 10}Z`, coat);
      shape(`M${x - 4} ${y + 14}L${x - 7} ${y + 26}M${x + 4} ${y + 14}L${x + 8} ${y + 26}`, 'none', '#142F3C', 4);
      shape(`M${x - 4} ${y}L${x - 12} ${y - 13}M${x + 4} ${y}L${x + 12} ${y - 11}`, 'none', coat, 4);
    }
    shape('M456 67Q497 13 546 66L555 87 533 73 513 90 491 74 469 91Z', '#D95D52', '#F39B76', 2);
    shape('M506 53L515 128Q519 143 531 131', 'none', '#F2D09B', 4);
    draw('rect', {x: 424, y: 190, width: 163, height: 15, fill: '#EDBD64', stroke: '#15333E', 'stroke-width': 3});
    for (let x = 435; x < 575; x += 27) shape(`M${x} 191L${x + 13} 204`, 'none', '#81523A', 7);
    for (let i = 0; i < 22; i++) {
      const x = i * 83 % 620, y = i * 47 % 170;
      shape(`M${x} ${y}L${x - 16} ${y + 21}`, 'none', '#BFDADE', 1.8);
    }
    picture.replaceChildren(scene);
  }

  if (headlinePass) {
    shiftText(document.getElementById('date'), -16);
    for (const child of [...svg.children]) {
      if (child.tagName === 'text') {
        const y = Number(child.getAttribute('y'));
        if (y === 215) shiftText(child, -16);
        else if (y === 248) shiftText(child, -16);
        else if ([292, 303, 317].includes(y)) shiftText(child, -24);
      } else if (child.tagName === 'rect') {
        const y = Number(child.getAttribute('y'));
        if (y === 225) child.setAttribute('y', y - 16);
        else if (y === 268 || y === 270) child.setAttribute('y', y - 24);
      }
    }
    const titles = {
      1: ['EU budget puts', 'Kyiv aid at stake'],
      2: ['Storm stalls', '100th NYC parade'],
      3: ['Kuwait reports', 'two Italians killed'],
    };
    for (const id of [1, 2, 3]) {
      const card = svg.querySelector(`[data-story="${id}"]`);
      const background = card.querySelector('rect');
      background.setAttribute('y', Number(background.getAttribute('y')) - 26);
      background.setAttribute('height', Number(background.getAttribute('height')) + 32);
      const picture = card.querySelector('svg');
      picture.setAttribute('y', Number(picture.getAttribute('y')) - 26);
      picture.setAttribute('height', Number(picture.getAttribute('height')) + 26);
      const number = [...card.children].find(el => el.tagName === 'circle');
      number.setAttribute('cy', Number(number.getAttribute('cy')) - 26);
      const numberText = [...card.children].find(el => el.tagName === 'text' && el.textContent === String(id));
      shiftText(numberText, -26);
      const lines = [...card.querySelectorAll(`[id^="headline-${id}-"]`)];
      if (lines.length !== 2) throw new Error(`Expected two headline lines in story ${id}`);
      lines.forEach((line, index) => {
        line.textContent = titles[id][index];
        line.setAttribute('font-size', 50);
        if (index === 1) shiftText(line, 2);
        const bounds = line.dataset.bounds.split(',').map(Number);
        bounds[1] -= 2;
        bounds[3] += 8;
        line.dataset.bounds = bounds.join(',');
      });
      for (const summary of card.querySelectorAll('[id^="summary-"]')) shiftText(summary, 4);
      for (const credit of [...card.children].filter(el => el.tagName === 'text' && el.textContent.startsWith('SOURCE:'))) shiftText(credit, 4);
    }
  }

  if (!mapPass) return;
  const group = svg.querySelector('[data-atlas-map]');
  group.replaceChildren();
  const add = (tag, attrs, value) => group.appendChild(node(tag, attrs, value));
  const label = (x, y, value, size = 18, more = {}) => add('text', {
    x, y, fill: '#F5E7BF', 'font-family': 'Arial Narrow,Arial,sans-serif',
    'font-size': size, 'font-weight': 700, ...more,
  }, value);
  const europe = new Set([1, 16, 27, 28, 29, 30, 31, 37]);
  const asia = new Set([5, 10, 11, 12, 14, 15, 20, 34, 35, 36, 38, 39, 44]);
  const areas = {
    world: {x: 46, y: 1389, w: 507, h: 213, lonMin: -180, lonMax: 180, latMin: -64, latMax: 83},
    europe: {x: 46, y: 1660, w: 231, h: 167, lonMin: -13, lonMax: 37, latMin: 36, latMax: 63},
    asia: {x: 321, y: 1660, w: 231, h: 167, lonMin: 44, lonMax: 154, latMin: -7, latMax: 59},
  };
  const project = (area, lon, lat) => [
    area.x + (lon - area.lonMin) / (area.lonMax - area.lonMin) * area.w,
    area.y + (area.latMax - lat) / (area.latMax - area.latMin) * area.h,
  ];
  add('rect', {x: 32, y: 1375, width: 535, height: 475, fill: palette.ocean});
  const defs = node('defs', {});
  group.appendChild(defs);
  for (const [key, area] of Object.entries(areas)) {
    if (key !== 'world') {
      add('rect', {x: area.x - 10, y: 1620, width: 251, height: 220,
        fill: '#102D3B', stroke: '#88A296', 'stroke-width': 1.4});
      label(area.x, 1646, `${key.toUpperCase()} DETAIL · ${key === 'europe' ? europe.size : asia.size}`,
        21, {id: `map-detail-title-${key}`});
    }
    const clip = node('clipPath', {id: `edition-map-${key}`});
    clip.appendChild(node('rect', {x: area.x, y: area.y, width: area.w, height: area.h}));
    defs.appendChild(clip);
    const land = node('g', {'clip-path': `url(#edition-map-${key})`});
    group.appendChild(land);
    for (const shape of coastlines) {
      land.appendChild(node('polygon', {points: shape.map(([lon, lat]) => project(area, lon, lat).join(',')).join(' '),
        fill: palette.land, stroke: '#8DB299', 'stroke-width': 1.2, 'stroke-linejoin': 'round'}));
    }
  }
  const pins = stories.filter(story => story.lat !== null).map(story => {
    const zone = europe.has(story.id) ? 'europe' : asia.has(story.id) ? 'asia' : 'world';
    const [ax, ay] = project(areas[zone], story.lon, story.lat);
    return {id: story.id, region: story.region, zone, ax, ay,
      x: ax + (story.id % 3 - 1) * 7, y: ay + (story.id % 4 - 1.5) * 7,
      r: story.id <= 13 ? 14 : 12};
  });
  for (let iteration = 0; iteration < 1200; iteration++) {
    for (let i = 0; i < pins.length; i++) {
      const pin = pins[i], area = areas[pin.zone];
      if (iteration < 850) {
        pin.x += (pin.ax - pin.x) * 0.005;
        pin.y += (pin.ay - pin.y) * 0.005;
      }
      for (const other of pins.slice(i + 1)) {
        if (other.zone !== pin.zone) continue;
        const dx = other.x - pin.x, dy = other.y - pin.y;
        const distance = Math.hypot(dx, dy) || 0.1;
        const required = pin.r + other.r + 10;
        if (distance >= required) continue;
        const push = (required - distance) * 0.51;
        const ux = distance === 0.1 ? 0.7 : dx / distance;
        const uy = distance === 0.1 ? 0.7 : dy / distance;
        pin.x -= ux * push; pin.y -= uy * push;
        other.x += ux * push; other.y += uy * push;
      }
      pin.x = Math.max(area.x + pin.r + 4, Math.min(area.x + area.w - pin.r - 4, pin.x));
      pin.y = Math.max(area.y + pin.r + 4, Math.min(area.y + area.h - pin.r - 4, pin.y));
    }
  }
  for (const pin of pins) {
    add('line', {x1: pin.ax, y1: pin.ay, x2: pin.x, y2: pin.y,
      stroke: '#BED0BD', 'stroke-width': 1.1, opacity: 0.8});
    add('circle', {cx: pin.ax, cy: pin.ay, r: 2, fill: '#F4D693'});
  }
  for (const pin of pins) {
    add('circle', {cx: pin.x, cy: pin.y, r: pin.r + 2.5, fill: palette.ocean});
    add('circle', {cx: pin.x, cy: pin.y, r: pin.r,
      fill: pin.id <= 13 ? palette.gold : palette.paper,
      stroke: pin.id <= 13 ? palette.gold : regions[pin.region], 'stroke-width': 2,
      'data-pin': pin.id, 'data-map-zone': pin.zone,
      'data-anchor-x': pin.ax, 'data-anchor-y': pin.ay});
    label(pin.x, pin.y + 5, pin.id, pin.id <= 13 ? 20 : 18,
      {fill: palette.ocean, 'text-anchor': 'middle',
        'font-weight': 800, id: `map-number-${pin.id}`});
  }
  add('rect', {x: 32, y: 1857, width: 535, height: 30, fill: '#173B4A'});
  label(43, 1879, '8  ISS ORBIT · 17  GLOBAL SHIPPING', 20);
  label(32, 1907, 'World + two details. Lines locate numbered stories.', 18, {fill: palette.muted});
}
