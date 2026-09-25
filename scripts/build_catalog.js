#!/usr/bin/env node
// Build references/catalog.md (+ catalog.json) from a JIZURA checkout, so the part list never drifts from the source.
// usage: node scripts/build_catalog.js <path-to-JIZURA-checkout> [commit-label]
// Reads src/*.js (engine + expression packs) and the label scripts app/english.js, app/chinese.js, app/chinese_hans.js.
'use strict';
const fs = require('fs'), vm = require('vm'), path = require('path');

const repo = process.argv[2];
if (!repo || !fs.existsSync(path.join(repo, 'src'))) { console.error('usage: node build_catalog.js <JIZURA checkout> [commit]'); process.exit(2); }
const commit = process.argv[3] || '';
const out = path.join(__dirname, '..', 'references');

// a browser-ish sandbox: anything the engine touches at load time returns another harmless stub
const stub = () => new Proxy(function () {}, {
  get: (t, k) => (k === Symbol.toPrimitive ? () => '' : k === 'measureText' ? () => ({ width: 100 }) : stub()),
  apply: () => stub(), construct: () => stub(),
});
const ctx = { console: { log() {}, warn() {}, error() {} }, Intl, Math, JSON, Set, Map, Promise, setTimeout, clearTimeout,
  document: stub(), navigator: {}, performance: { now: () => 0 }, localStorage: { getItem: () => null, setItem() {} } };
ctx.window = ctx; ctx.self = ctx;
vm.createContext(ctx);
const run = (file) => vm.runInContext(fs.readFileSync(file, 'utf8'), ctx, { filename: path.basename(file) });

for (const f of fs.readdirSync(path.join(repo, 'src')).filter(f => f.endsWith('.js')).sort()) {
  if (f === '12_ui.js') continue;                      // the editor UI needs a real DOM and adds no catalogue data
  run(path.join(repo, 'src', f));
}
const J = ctx.J;
const groups = J.GROUP_KEYS;
const names = {};                                       // group.key -> { ja, en, zhHant, zhHans }
const snap = (lang) => { for (const g of groups) for (const k of J.order(g)) { const d = J.registry(g)[k]; (names[g + '.' + k] ||= {})[lang] = d && d.name; } };
const styleNames = {};
const snapStyles = (lang) => { for (const [k, s] of Object.entries(J.STYLES)) (styleNames[k] ||= {})[lang] = [s.name, s.desc || '']; };
const moodNames = {};
const snapMoods = (lang) => { for (const [k, m] of Object.entries(J.MOODS)) (moodNames[k] ||= {})[lang] = m.name; };

snap('ja'); snapStyles('ja'); snapMoods('ja');
const labelScripts = [['en', 'app/english.js'], ['zhHant', 'app/chinese.js'], ['zhHans', 'app/chinese_hans.js']];
for (const [lang, rel] of labelScripts) {
  const file = path.join(repo, rel);
  if (!fs.existsSync(file)) continue;
  run(file); snap(lang); snapStyles(lang); snapMoods(lang);
}

// 追加分 (extra) and 和風 (wa) flags, read through the engine's own random-pick filter
const ok = (p, g, k) => !J.randomOk || J.randomOk(p, g, k);
const flagsOf = (g, k) => {
  const d = J.registry(g)[k] || {};
  const f = [];
  if (d.special) f.push('special');
  if (!ok({ extra: false, wa: true }, g, k) && ok({ extra: true, wa: true }, g, k)) f.push('extra');
  if (ok({ extra: true, wa: true }, g, k) && !ok({ extra: true, wa: false }, g, k)) f.push('wa');
  return f;
};

const parts = {};
for (const g of groups) parts[g] = J.order(g).map(k => {
  const d = J.registry(g)[k] || {}, n = names[g + '.' + k] || {};
  return { key: k, zh: n.zhHant || '', zhHans: n.zhHans || '', en: n.en || '', ja: n.ja || '', tags: d.tags || [], flags: flagsOf(g, k) };
});
const styles = J.STYLE_ORDER.concat(Object.keys(J.STYLES).filter(k => !J.STYLE_ORDER.includes(k))).map(k => {
  const s = J.STYLES[k], n = styleNames[k] || {};
  return { key: k, zh: (n.zhHant || [])[0] || '', zhDesc: (n.zhHant || [])[1] || '', en: (n.en || [])[0] || '', ja: (n.ja || [])[0] || '',
    moods: s.moods || [], fonts: s.fonts || {}, bg: ((s.schemes || [])[0] || {}).bg, flags: ok({ extra: false, wa: true }, 'style', k) ? [] : ['extra'] };
});
const moods = Object.entries(J.MOODS).map(([k, m]) => ({ key: k, zh: (moodNames[k] || {}).zhHant || '', en: (moodNames[k] || {}).en || '', ja: (moodNames[k] || {}).ja || '',
  fx: m.fx || {}, layout: m.layout || [], enter: m.enter || [], exit: m.exit || [], styles: m.styles || [], noHold: m.noHold || [] }));
const fonts = Object.entries(J.FONTS).filter(([, f]) => !f.user).map(([k, f]) => ({ key: k, label: f.label, kind: f.kind, weight: f.weight }));
const def = J.defaultProject();

fs.mkdirSync(out, { recursive: true });
// every field JIZURA reads from a project file: the defaults, plus userFonts (read by the editor's mergeProject)
const projectFields = [...new Set([...Object.keys(def), 'userFonts'])];
fs.writeFileSync(path.join(out, 'catalog.json'), JSON.stringify({ commit, projectFields, styles, moods, fonts, parts, defaultFx: def.fx }, null, 1));
// every key of every group switched on, one group per line: models that cannot run code copy a group and flip the ones they drop
const allOn = groups.map(g => `  ${JSON.stringify(g)}: {${parts[g].map(p => `${JSON.stringify(p.key)}: true`).join(', ')}}`);
fs.writeFileSync(path.join(out, 'enabled-all.json'), '{\n' + allOn.join(',\n') + '\n}\n');

// ---- markdown for the model to read ----
const GROUP_TITLE = {
  layout: 'layout 版面（每個片段的排版）', enter: 'enter 進場動畫', hold: 'hold 停留時的動作', exit: 'exit 退場動畫',
  decor: 'decor 裝飾（一個片段可放 0 到數個）', treat: 'treat 文字處理（描邊、立體、錯位…）', bg: 'bg 背景圖形（每行一個）',
  cam: 'cam 運鏡', fx: 'fx 畫面效果（閃光、故障等事件）', trans: 'trans 片段之間的轉場',
};
const esc = s => String(s).replace(/\|/g, '／').replace(/\n/g, ' ');
const L = [];
L.push('# JIZURA 零件與風格目錄', '');
L.push(`> 由 \`scripts/build_catalog.js\` 從 JIZURA 原始碼自動產生${commit ? `（commit \`${commit}\`）` : ''}，請勿手改。`);
L.push('> 欄位：`key` 是寫進設定檔的代號；中文名是繁中版介面顯示的名稱；`tags` 是作者標的氛圍；',
  '> `flags`：`extra` = 首次公開版之後新增（要 `"extra": true` 才會被隨機選到）、`wa` = 和風（`"wa": false` 時不會被隨機選到）、`special` = 系統內部使用，不要動。', '');
L.push('## 目錄', '', '- [風格 styles](#風格-styles)', '- [氛圍 moods](#氛圍-moods)', '- [字型 fonts](#字型-fonts)');
for (const g of groups) L.push(`- [${GROUP_TITLE[g]}](#${g})`);
L.push('', '## 風格 styles', '', '| key | 中文名 | 說明 | English | 適合的氛圍 | flags |', '|---|---|---|---|---|---|');
for (const s of styles) L.push(`| \`${s.key}\` | ${esc(s.zh)} | ${esc(s.zhDesc)} | ${esc(s.en)} | ${s.moods.join(', ')} | ${s.flags.join(', ')} |`);
L.push('', '## 氛圍 moods', '', '`mood` 欄位本身只是標籤。要得到某個氛圍的感覺，請把下面的滑桿範圍取值寫進 `fx`，並優先開啟帶有該 tag 的零件（見 format.md）。', '');
L.push('| key | 中文名 | English | 滑桿範圍 fx | 偏好的版面 / 進場 / 退場 |', '|---|---|---|---|---|');
for (const m of moods) {
  const fx = Object.entries(m.fx).map(([k, v]) => `${k} ${Array.isArray(v) ? v.join('–') : v}`).join('; ');
  const pref = [['版面', m.layout], ['進場', m.enter], ['退場', m.exit]].filter(([, a]) => a.length).map(([t, a]) => `${t}: ${a.join(', ')}`).join('<br>');
  L.push(`| \`${m.key}\` | ${esc(m.zh)} | ${esc(m.en)} | ${fx} | ${pref} |`);
}
L.push('', '## 字型 fonts', '', '用在 `fonts.display` / `fonts.serif` / `fonts.body`。歌詞是中文時，程式會自動換成對應的繁中／簡中字型。', '');
L.push('| key | 名稱 | 類型 | 粗細 |', '|---|---|---|---|');
for (const f of fonts) L.push(`| \`${f.key}\` | ${esc(f.label)} | ${f.kind} | ${f.weight} |`);
for (const g of groups) {
  L.push('', `## ${g}`, '', `**${GROUP_TITLE[g]}**，共 ${parts[g].length} 個`, '', '| key | 中文名 | English | tags | flags |', '|---|---|---|---|---|');
  for (const p of parts[g]) L.push(`| \`${p.key}\` | ${esc(p.zh)} | ${esc(p.en)} | ${p.tags.join(', ')} | ${p.flags.join(', ')} |`);
}
fs.writeFileSync(path.join(out, 'catalog.md'), L.join('\n') + '\n');
const total = groups.reduce((n, g) => n + parts[g].length, 0);
console.log(`catalog: ${styles.length} styles, ${moods.length} moods, ${fonts.length} fonts, ${total} parts`);
for (const g of groups) {
  const miss = parts[g].filter(p => !p.zh).length;
  console.log(`  ${g.padEnd(6)} ${String(parts[g].length).padStart(3)} parts, ${miss} without a Chinese name`);
}
