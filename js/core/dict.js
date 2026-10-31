import { VOCAB, POS, TOPICS } from '../data/vocab.js';
import { LESSONS, CHAPTERS } from '../data/lessons.js';
import { GRAMMAR } from '../data/grammar.js';
import { CHARS } from '../data/chars.js';
import { store } from './store.js';
import { HSK30_1_ORDER, HSK30_1_NEW, HSK30_2_ORDER, HSK30_3_ORDER, HSK30_23_NEW } from '../data/hsk30.js';
import { READINGS } from '../data/readings.js';
import { EXAMPLES1 } from '../data/examples1.js';
import { EXAMPLES_SP } from '../data/examples-speak.js';
import { EXAMPLES23 } from '../data/examples23.js';
import { SPEAK_DICT } from '../data/speaking.js';

export { POS, TOPICS, LESSONS, CHAPTERS, GRAMMAR, CHARS, READINGS, EXAMPLES1 };
export const isHan = c => /\p{Script=Han}/u.test(c);

// Từ HSK 1 chuẩn 3.0 chưa có trong bộ HSK 2.0
const V30_NEW = HSK30_1_NEW.trim().split('\n').map((line, i) => {
  const [h, p, vi, pos, topics] = line.split('|');
  return { id: `30-${i}`, h, p, vi, pos, topics: topics.split(','), level: 1, source: 'hsk30' };
});
export const IN30 = new Set(HSK30_1_ORDER);
// Từ HSK 3.0 cấp 2, 3 chưa có trong từ điển
const V30_NEW23 = HSK30_23_NEW.trim().split('\n').map((line, i) => { const [h, p, vi, lv] = line.split('|'); return { id: `30b-${i}`, h, p, vi, pos: '', topics: [], level: +lv, source: 'hsk30' }; });
export const HSK30_ORDER = { 1: HSK30_1_ORDER, 2: HSK30_2_ORDER, 3: HSK30_3_ORDER };
// cấp HSK 3.0 thấp nhất của mỗi từ
export const LV30 = new Map(); [3, 2, 1].forEach(l => HSK30_ORDER[l].forEach(h => LV30.set(h, l)));

// ── Chỉ mục từ điển (HSK + từ mở rộng + đóng góp cá nhân) ──
let byH = new Map(); let maxLen = 1;
const segCache = new Map();
let baseBank = null;
export function rebuild() {
  byH = new Map(); segCache.clear(); baseBank = null;
  const add = w => { if (!byH.has(w.h)) byH.set(w.h, []); byH.get(w.h).push(w); maxLen = Math.max(maxLen, w.h.length); };
  VOCAB.forEach(add);
  V30_NEW.forEach(add);
  V30_NEW23.forEach(add);
  for (const [h, p, vi] of SPEAK_DICT) if (!byH.has(h)) add({ id: `sp-${h}`, h, p, vi, pos: '', topics: ['coban'], level: 0, source: 'extra' });
  for (const w of store.s.community.words) add({ ...w, source: 'community' });
  for (const [h, w] of Object.entries(store.s.myPhrases || {})) if (!byH.has(h) || (w.vi && !byH.get(h).some(x => x.vi === w.vi))) add({ id: `my-${h}`, h, p: w.p || '', vi: w.vi || '(cụm từ bạn đã lưu)', ex: w.ex || '', pos: '', topics: ['coban'], level: 0, source: 'mine' });
}
rebuild();
export const lookup = h => byH.get(h) || [];
export const entry = h => lookup(h)[0];
export const allWords = () => [...byH.values()].map(a => a[0]);
export const hskWords = lv => VOCAB.filter(v => v.level === lv);
// Bảng 500 từ HSK 1 (chuẩn 3.0) theo thứ tự chính thức
export const hsk30List = (lv = 1) => HSK30_ORDER[lv].map((h, i) => { const e = lookup(h).find(x => x.source === 'hsk30') || lookup(h).find(x => x.source === 'hsk' && x.level === lv) || entry(h) || { h, p: '', vi: '' }; return { no: i + 1, ...e, isNew: lv === 1 ? e.source === 'hsk30' : !lookup(h).some(x => x.source === 'hsk' && x.level <= 3) }; });

// Tách từ: khớp dài nhất từ trái sang phải (ưu tiên từ ghép)
export function segment(text) {
  const c0 = segCache.get(text); if (c0) return c0;
  const out = segmentRaw(text);
  if (segCache.size > 20000) segCache.clear();
  segCache.set(text, out); return out;
}
function segmentRaw(text) {
  const out = []; let i = 0;
  while (i < text.length) {
    const c = text[i];
    if (!isHan(c)) {
      let j = i; while (j < text.length && !isHan(text[j])) j++;
      out.push({ t: text.slice(i, j), han: false }); i = j; continue;
    }
    let len = Math.min(maxLen, text.length - i), hit = null;
    for (; len > 1; len--) { const w = text.slice(i, i + len); if (byH.has(w)) { hit = w; break; } }
    const w = hit || c;
    out.push({ t: w, han: true, w: entry(w) }); i += w.length;
  }
  return out;
}

// ── Pinyin theo ngữ cảnh (pinyin-pro nếu đã tải, nếu không dùng từ điển) ──
const PP = () => window.pinyinPro;
export function charPinyins(text) {
  if (PP()) { try { return fixPy([...text], PP().pinyin(text, { type: 'array', toneSandhi: true, nonZh: 'consecutive' })); } catch {} }
  return null;
}
// Sửa vài chữ đa âm pinyin-pro hay đọc sai: 得/地 trợ từ (de), 教会 (jiāohuì)
const DE_PREV_V = new Set([...'玩睡跑说写做学吃唱跳来走长过记跑考讲画住干办打洗过扫觉懂值显晓']), DE_NEXT = new Set([...'很太非真好不更比挺特越多快慢清']);
const DI_PREV = new Set([...'心情利敢好律乐慢真动兴静轻断细松快']), DI_NEXT_NOUN = new Set([...'方图铁点区球址面板上下里']);
function fixPy(cs, a) {
  if (!Array.isArray(a) || a.length !== cs.length) return a;
  for (let i = 0; i < cs.length; i++) {
    const c = cs[i], pv = cs[i - 1], nx = cs[i + 1];
    if (c === '得' && a[i] === 'dé' && nx !== '到' && pv && (DE_PREV_V.has(pv) || (nx && DE_NEXT.has(nx)))) a[i] = 'de';
    else if (c === '地' && a[i] === 'dì' && pv && DI_PREV.has(pv) && nx && isHan(nx) && !DI_NEXT_NOUN.has(nx)) a[i] = 'de';
    else if (c === '教' && a[i] === 'jiào' && !(nx && '室育学练材授师导'.includes(nx)) && !(pv && '请宗佛道领'.includes(pv))) a[i] = 'jiāo';
  }
  return a;
}
export function tokensWithPinyin(text) {
  const toks = segment(text);
  const han = [...text].filter(isHan).join('');
  const arr = charPinyins(han); let k = 0;
  for (const t of toks) {
    if (!t.han) continue;
    const n = t.t.length;
    const ctx = arr ? arr.slice(k, k + n) : null; k += n;
    if (t.w && n > 1) t.py = t.w.p;
    else if (ctx) t.py = ctx.join(' ');
    else if (t.w) t.py = t.w.p;
    else t.py = (CHARS[t.t]?.[7] || '').split(',')[0];
  }
  return toks;
}
export function sentencePinyin(text) {
  const P = { '，': ',', '。': '.', '！': '!', '？': '?', '、': ',', '：': ':', '；': ';', '“': '"', '”': '"', '…': '…' };
  return tokensWithPinyin(text).map(t => t.han ? t.py : t.t.trim().replace(/[，。！？、：；“”]/g, c => P[c])).join(' ').replace(/\s+([,.!?:;…])/g, '$1').replace(/\s+/g, ' ').trim();
}
export function charPinyin(c) {
  const a = charPinyins(c); if (a && a[0] && a[0] !== c) return a[0];
  return (CHARS[c]?.[7] || '').split(',')[0] || entry(c)?.p || '';
}

// ── Bài học: tự phân bổ từ HSK chưa gán vào bài cùng cấp, cùng chủ đề ──
export const LESSON_LIST = (() => {
  const list = LESSONS.map((l, i) => ({ ...l, idx: i, extra: [] }));
  const assigned = new Set(list.flatMap(l => l.words));
  for (const v of VOCAB) {
    if (v.source !== 'hsk' || assigned.has(v.h)) continue;
    const same = list.filter(l => l.level === v.level);
    const cand = same.filter(l => v.topics.includes(l.topic));
    const pick = (cand.length ? cand : same).reduce((a, b) => (a.extra.length <= b.extra.length ? a : b));
    pick.extra.push(v.h); assigned.add(v.h);
  }
  // số thứ tự bài trong cấp
  const cnt = {}; list.forEach(l => { cnt[l.level] = (cnt[l.level] || 0) + 1; l.no = cnt[l.level]; });
  return list;
})();
export const lessonsOf = lv => LESSON_LIST.filter(l => l.level === lv);
export const lessonsWithWord = h => LESSON_LIST.filter(l => l.words.includes(h) || l.extra.includes(h) || l.d.some(x => x[1].includes(h)));
export const grammarById = id => GRAMMAR.find(g => g.id === id);
export const lessonsWithGrammar = id => LESSON_LIST.filter(l => l.g.includes(id));

// ── Kho câu ví dụ: hội thoại + ngữ pháp + đóng góp ──
// 5 ví dụ chuẩn của từ HSK 1 (bỏ ký hiệu người nói A/B)
export const curatedExamples = h => {
  if (EXAMPLES1[h]) return EXAMPLES1[h].map(([zh, vi]) => ({ zh, vi, level: 1, src: 'Ví dụ chuẩn HSK 1', core: true }));
  const seen = new Set(), out = [];
  for (const [zh, vi] of [...(EXAMPLES_SP[h] || []), ...(EXAMPLES23[h] || [])]) if (!seen.has(zh)) { seen.add(zh); out.push({ zh, vi, level: 3, src: 'Ví dụ chuẩn', core: true }); }
  return out;
};
export function sentenceBank() {
  if (!baseBank) {
    baseBank = [];
    for (const l of LESSON_LIST) for (const d of l.d) baseBank.push({ zh: d[1], vi: d[2], level: l.level, src: `Bài ${l.no} HSK ${l.level}` });
    for (const g of GRAMMAR) for (const e of g.ex) baseBank.push({ zh: e[0], vi: e[1], level: g.level, src: g.name });
    const seen = new Set(baseBank.map(x => x.zh));
    for (const [h, list] of [...Object.entries(EXAMPLES1), ...Object.entries(EXAMPLES_SP), ...Object.entries(EXAMPLES23)]) for (const [zh, vi] of list) {
      if (/[AB]：.*[AB]：/.test(zh) || seen.has(zh)) continue;
      seen.add(zh); baseBank.push({ zh: zh.replace(/^[AB]：/, ''), vi: vi.replace(/^[AB]: /, ''), level: 1, src: `Ví dụ của ${h}` });
    }
  }
  return baseBank.concat(store.s.community.examples.map(e => ({ zh: e.zh, vi: e.vi, level: 9, src: 'Bạn đóng góp', community: true })));
}
export function examplesFor(h, max = 6) {
  const core = curatedExamples(h);
  const coreSet = new Set(core.map(x => x.zh.replace(/^[AB]：/, '')));
  const bank = sentenceBank().filter(s => !coreSet.has(s.zh));
  const hits = bank.filter(s => segment(s.zh).some(t => t.t === h));
  const loose = h.length === 1 ? [] : bank.filter(s => s.zh.includes(h) && !hits.includes(s));
  const rest = [...hits, ...loose].sort((a, b) => (a.src.startsWith('Ví dụ của') - b.src.startsWith('Ví dụ của')) || a.level - b.level || a.zh.length - b.zh.length);
  return [...core, ...rest].slice(0, max);
}
// Từ hay đi kèm: từ ghép chứa từ này + cặp từ đứng liền nhau trong cùng vế câu (động–danh, tính–danh…)
const CONTENT = new Set(['d', 'đg', 't', 'n']);
export function collocations(h) {
  const res = new Map();
  for (const w of allWords()) if (w.h !== h && w.h.length > h.length && w.h.includes(h) && w.source === 'hsk') res.set(w.h, { h: w.h, n: 99 });
  const me = entry(h);
  if (me && CONTENT.has(me.pos)) {
    for (const s of sentenceBank()) {
      const toks = segment(s.zh);
      toks.forEach((t, i) => {
        if (t.t !== h) return;
        const nx = toks[i + 1], pv = toks[i - 1];
        const ok = x => x && x.han && x.w && x.w.source === 'hsk' && CONTENT.has(x.w.pos) && x.t !== h;
        // động từ/năng nguyện + tân ngữ phía sau; danh từ + động từ/tính từ phía trước
        if (['đg', 'n', 't'].includes(me.pos) && ok(nx) && (nx.w.pos === 'd' || me.pos === 'n')) add(h + nx.t);
        if (me.pos === 'd' && ok(pv) && ['đg', 't'].includes(pv.w.pos)) add(pv.t + h);
      });
    }
  }
  function add(k) { const v = res.get(k) || { h: k, n: 0, combo: true }; v.n++; res.set(k, v); }
  return [...res.values()].sort((a, b) => b.n - a.n).slice(0, 10);
}
// Từ dễ nhầm: chung chữ, cùng âm khác chữ
export function confusables(h) {
  const w = entry(h); if (!w) return [];
  const base = w.p.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s/g, '');
  const out = [];
  for (const x of allWords()) {
    if (x.h === h || x.source === 'extra') continue;
    const xb = x.p.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s/g, '');
    if (xb === base) out.push({ ...x, why: 'Cùng âm khác thanh/chữ' });
    else if (h.length === 1 && x.h.length === 1 && CHARS[h] && CHARS[x.h] && CHARS[h][0] === CHARS[x.h][0] && CHARS[h][0] !== h && out.length < 6 && looksAlike(h, x.h)) out.push({ ...x, why: 'Chữ có hình dạng gần giống' });
  }
  return out.slice(0, 6);
}
function looksAlike(a, b) { const da = CHARS[a]?.[1] || '', db = CHARS[b]?.[1] || ''; return [...da].filter(c => isHan(c) && db.includes(c)).length > 0; }

export function search(q) {
  q = q.trim().toLowerCase(); if (!q) return [];
  const plain = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/\s/g, '');
  const pq = plain(q);
  return allWords().map(w => {
    let sc = 0;
    if (w.h === q) sc = 100; else if (w.h.includes(q)) sc = 60;
    else if (plain(w.p) === pq) sc = 80; else if (plain(w.p).startsWith(pq)) sc = 50;
    else if (w.vi.toLowerCase().includes(q)) sc = 40; else if (plain(w.vi).includes(pq)) sc = 30;
    return [sc, w];
  }).filter(x => x[0]).sort((a, b) => b[0] - a[0] || a[1].level - b[1].level).map(x => x[1]);
}

export const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
export const pick = (a, n) => shuffle(a).slice(0, n);
export const levelLabel = w => w.source === 'mine' ? 'Cụm bạn lưu' : w.source === 'community' ? 'Cộng đồng' : w.source === 'hsk30' ? `HSK ${w.level} · 3.0` : w.source === 'extra' ? (IN30.has(w.h) ? 'HSK 1 · 3.0' : 'Mở rộng') : `HSK ${w.level}`;
