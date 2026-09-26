#!/usr/bin/env node
// Check a JIZURA project file and (optionally) expand the compact "only" shorthand into the "enabled" map JIZURA reads.
// usage: node scripts/finalize.js <draft.json> [out.jizura.json]
//   "only": { "exit": ["glassBreak", "shredOut"], ... }  -> every other part of that group is switched off
// Exit code: 0 = ok (warnings allowed), 1 = errors, 2 = bad usage. Rules mirror JIZURA's own おまかせ (src/08b_omakase.js).
'use strict';
const fs = require('fs'), path = require('path');

const [, , inFile, outFile] = process.argv;
if (!inFile) { console.error('usage: node finalize.js <draft.json> [out.jizura.json]'); process.exit(2); }
const cat = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'references', 'catalog.json'), 'utf8'));
const errors = [], warns = [];
let p;
try { p = JSON.parse(fs.readFileSync(inFile, 'utf8')); } catch (e) { console.error('not valid JSON: ' + e.message); process.exit(1); }

const GROUPS = Object.keys(cat.parts);
const keysOf = g => cat.parts[g].map(x => x.key);
const partOf = (g, k) => cat.parts[g].find(x => x.key === k);
// what JIZURA's own おまかせ keeps (src/08b_omakase.js): room to vary, and the plain fall-backs. The planner still works
// without them (it falls back to 'cut'), so breaking these is a warning; unknown keys and bad values are errors because
// they fail silently.
const MIN = { layout: 6, enter: 5, exit: 5, hold: 3, decor: 6, treat: 4, bg: 4, cam: 3, fx: 4, trans: 3 };
const ALWAYS_ON = { enter: ['cut'], exit: ['cut'], hold: ['still'], treat: ['none'], bg: ['none'], cam: ['push'] };

// ---- expand "only" ----
if (p.only) {
  p.enabled = p.enabled || {};
  for (const [g, list] of Object.entries(p.only)) {
    if (!cat.parts[g]) { errors.push(`only.${g}: unknown group (groups: ${GROUPS.join(', ')})`); continue; }
    const want = new Set(list);
    for (const k of list) if (!partOf(g, k)) errors.push(`only.${g}: unknown part "${k}"`);
    for (const k of ALWAYS_ON[g] || []) want.add(k);
    p.enabled[g] = Object.fromEntries(keysOf(g).map(k => [k, want.has(k)]));
  }
  delete p.only;
}

// ---- top-level fields ----
// JIZURA keeps unknown fields but never reads them, so an invented field is a setting that silently does nothing
const KNOWN = cat.projectFields || ['version', 'title', 'artist', 'lyrics', 'style', 'mood', 'extra', 'wa', 'lang', 'keyBg', 'unify', 'typeset',
  'centerDir', 'centerFree', 'seed', 'aspect', 'res', 'fps', 'fx', 'enabled', 'timing', 'overrides', 'colors', 'fonts', 'userFonts'];
for (const k of Object.keys(p)) if (!KNOWN.includes(k)) errors.push(`${k}: not a JIZURA setting (it would be silently ignored)`);
const oneOf = (field, vals) => { if (p[field] !== undefined && !vals.includes(p[field])) errors.push(`${field}: "${p[field]}" is not one of ${vals.join(', ')}`); };
if (typeof p.lyrics !== 'string' || !p.lyrics.trim()) errors.push('lyrics: must be one non-empty string, lines separated by \\n');
if (p.style !== undefined && !cat.styles.some(s => s.key === p.style)) errors.push(`style: unknown "${p.style}"`);
if (p.mood !== undefined && p.mood !== null && !cat.moods.some(m => m.key === p.mood)) errors.push(`mood: unknown "${p.mood}"`);
oneOf('lang', ['auto', 'ja', 'zh-Hant', 'zh-Hans', 'ko', 'en']);
oneOf('aspect', ['16:9', '9:16', '4:3', '3:4', '1:1', '4:5', '21:9']);
oneOf('res', [720, 1080, 1440, 2160]);
oneOf('keyBg', ['off', 'green', 'black']);
if (p.seed !== undefined && !Number.isInteger(p.seed)) errors.push('seed: must be an integer');
const st = cat.styles.find(s => s.key === p.style);
if (st && st.flags.includes('extra') && p.extra !== true) warns.push(`style "${p.style}" is an 追加分 style: fine when set directly, but set "extra": true if you also want 追加分 parts picked`);

// ---- fx ----
for (const [k, v] of Object.entries(p.fx || {})) {
  if (['motion', 'glitch', 'chroma', 'decor', 'density', 'texture', 'bgSwitch'].includes(k)) { if (typeof v !== 'number' || v < 0 || v > 1) errors.push(`fx.${k}: ${v} must be a number 0..1`); }
  else if (k === 'koma') { if (![0, 8, 12].includes(v)) errors.push(`fx.koma: ${v} must be 0, 8 or 12`); }
  else if (k === 'hud') { if (!['auto', 'on', 'off'].includes(v)) errors.push(`fx.hud: "${v}" must be auto, on or off`); }
  else if (!['flash', 'onTwos'].includes(k)) warns.push(`fx.${k}: not a known setting (ignored by JIZURA)`);
}
if (p.fx && p.fx.koma !== undefined && p.fx.onTwos === undefined) p.fx.onTwos = p.fx.koma > 0;

// ---- enabled ----
const extraOn = p.extra === true, waOn = p.wa !== false;
// part sets with their own switch (horror is off unless the file says true; typo / kinetic are on unless it says false)
const SETS = cat.sets || {};
const setOn = s => (typeof p[s] === 'boolean' ? p[s] : !!SETS[s]);
for (const s of Object.keys(SETS)) if (p[s] !== undefined && typeof p[s] !== 'boolean') errors.push(`${s}: must be true or false`);
for (const [g, map] of Object.entries(p.enabled || {})) {
  if (!cat.parts[g]) { errors.push(`enabled.${g}: unknown group`); continue; }
  for (const k of Object.keys(map)) if (!partOf(g, k)) warns.push(`enabled.${g}.${k}: unknown part (ignored by JIZURA)`);
  // JIZURA: anything not explicitly false is on
  const on = keysOf(g).filter(k => map[k] !== false);
  const pickable = on.filter(k => { const f = partOf(g, k).flags; return !f.includes('special') && (extraOn || !f.includes('extra')) && (waOn || !f.includes('wa')) && Object.keys(SETS).every(s => setOn(s) || !f.includes(s)); });
  if (pickable.length < (MIN[g] || 3)) warns.push(`enabled.${g}: only ${pickable.length} parts can be picked; JIZURA's own random pick keeps ≥ ${MIN[g] || 3} so the video does not repeat itself`);
  const extraOnly = on.filter(k => partOf(g, k).flags.includes('extra'));
  if (!extraOn && extraOnly.length) warns.push(`enabled.${g}: ${extraOnly.length} of the parts you left on are 追加分 and are skipped unless "extra": true (${extraOnly.slice(0, 4).join(', ')}${extraOnly.length > 4 ? '…' : ''})`);
  for (const s of Object.keys(SETS)) {
    const inSet = on.filter(k => partOf(g, k).flags.includes(s) && map[k] === true);
    if (!setOn(s) && inSet.length) warns.push(`enabled.${g}: ${inSet.length} ${s} part(s) you switched on are skipped unless "${s}": true (${inSet.slice(0, 4).join(', ')}${inSet.length > 4 ? '…' : ''})`);
  }
  for (const k of ALWAYS_ON[g] || []) if (map[k] === false) warns.push(`enabled.${g}.${k}: JIZURA's random pick always keeps this plain fall-back on (it is still used when nothing else fits)`);
}

// ---- overrides ----
for (const [line, o] of Object.entries(p.overrides || {})) {
  if (!/^\d+$/.test(line)) errors.push(`overrides."${line}": key must be a 0-based line number`);
  for (const g of ['layout', 'enter', 'hold', 'exit', 'treat', 'bg', 'cam', 'trans']) if (o[g] !== undefined && !partOf(g, o[g])) errors.push(`overrides.${line}.${g}: unknown part "${o[g]}"`);
  if (o.decor !== undefined) { if (!Array.isArray(o.decor)) errors.push(`overrides.${line}.decor: must be an array`); else for (const k of o.decor) if (!partOf('decor', k)) errors.push(`overrides.${line}.decor: unknown part "${k}"`); }
}

// ---- colors / fonts ----
const hex = /^#[0-9a-fA-F]{6}$/;
for (const k of ['bg', 'fg', 'sub', 'accent', 'ghostA', 'ghostB']) { const v = (p.colors || {})[k]; if (v !== undefined && !hex.test(v)) errors.push(`colors.${k}: "${v}" must look like #RRGGBB`); }
if (p.colors && (p.colors.bg || p.colors.fg) && p.colors.enabled !== true) warns.push('colors: bg/fg are only used when "enabled": true');
if (p.colors && (p.colors.accent || p.colors.ghostA || p.colors.ghostB) && p.colors.accentOn !== true) warns.push('colors: accent/ghostA/ghostB are only used when "accentOn": true');
for (const [role, k] of Object.entries(p.fonts || {})) {
  if (!['display', 'serif', 'body'].includes(role)) warns.push(`fonts.${role}: only display, serif and body are used`);
  else if (!cat.fonts.some(f => f.key === k)) errors.push(`fonts.${role}: unknown font "${k}"`);
}

for (const w of warns) console.log('warning: ' + w);
for (const e of errors) console.log('ERROR:   ' + e);
if (errors.length) { console.log(`\n${errors.length} error(s): fix them before opening the file in JIZURA.`); process.exit(1); }
const text = JSON.stringify(p, null, 1);
if (outFile) { fs.writeFileSync(outFile, text); console.log(`ok: wrote ${outFile} (${Buffer.byteLength(text)} bytes, ${warns.length} warning(s))`); }
else console.log(`ok: ${warns.length} warning(s)`);
