// Lưu toàn bộ dữ liệu người học trong localStorage của trình duyệt (không gửi đi đâu)
const KEY = 'hanngu-viet:v1';

const DEFAULT = {
  profile: { name: '', createdAt: Date.now(), goal: 20 },
  settings: {
    hanzi: true,            // hiện chữ Hán
    pinyin: 'above',        // 'above' | 'tap' | 'off'
    meaning: 'show',        // 'show' | 'tap' | 'off'
    rate: 1, voice: '', voice2: '', zhFont: 'kai', theme: 'auto', curriculum: 'HSK 2.0', fontSize: 1,
  },
  last: null,               // { route, title, at }
  lessons: {},              // idx -> { done, best, at, steps: {} }
  tests: [],                // { kind, level, score, total, at }
  srs: {},                  // hanzi -> { ef, iv, due, reps, lapses, seen }
  saved: {},                // hanzi -> true
  hard: {},                 // hanzi -> true
  hardAudio: [],            // { text, at }
  activity: {},             // 'YYYY-MM-DD' -> số hoạt động
  community: { words: [], examples: [], tips: [], dialogues: [], questions: [], topics: [], reports: [], likes: {} },
  journal: [],              // bài viết của người học { lesson, text, at }
  grammarSeen: {},
  skill: {},
  known30: {},              // từ trong bảng 500 từ HSK 1 đã thuộc
  readDone: {},             // bài đọc đã làm -> điểm cao nhất               // kỹ năng -> [đúng, tổng]
};

function merge(base, extra) {
  if (Array.isArray(base) || typeof base !== 'object' || base === null) return extra ?? base;
  const out = { ...base };
  for (const k of Object.keys(extra || {})) out[k] = (k in base) ? merge(base[k], extra[k]) : extra[k];
  return out;
}

let state;
try { state = merge(DEFAULT, JSON.parse(localStorage.getItem(KEY) || '{}')); }
catch { state = structuredClone(DEFAULT); }

const listeners = new Set();
let timer;
export const store = {
  get s() { return state; },
  save() {
    clearTimeout(timer);
    timer = setTimeout(() => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {} }, 150);
    listeners.forEach(f => f(state));
  },
  update(fn) { fn(state); this.save(); },
  on(fn) { listeners.add(fn); return () => listeners.delete(fn); },
  export() { return JSON.stringify(state, null, 2); },
  import(json) { state = merge(DEFAULT, JSON.parse(json)); this.save(); },
  reset() { state = structuredClone(DEFAULT); this.save(); },
};

export const today = () => new Date().toLocaleDateString('sv');

export function logActivity(n = 1) {
  store.update(s => { const d = today(); s.activity[d] = (s.activity[d] || 0) + n; });
}

export function streak() {
  const a = store.s.activity; let n = 0; const d = new Date();
  if (!a[today()]) d.setDate(d.getDate() - 1);
  while (a[d.toLocaleDateString('sv')]) { n++; d.setDate(d.getDate() - 1); }
  return n;
}

export function setLast(route, title) {
  store.update(s => { s.last = { route, title, at: Date.now() }; });
}

// ── Lặp lại ngắt quãng (SM-2 rút gọn) ──
const DAY = 864e5;
export function srsGrade(h, q) { // q: 0 quên, 3 khó, 4 nhớ, 5 dễ
  store.update(s => {
    const c = s.srs[h] || { ef: 2.5, iv: 0, due: 0, reps: 0, lapses: 0, seen: 0 };
    c.seen++;
    if (q < 3) { c.reps = 0; c.iv = 0; c.lapses++; c.due = Date.now() + 10 * 60e3; }
    else {
      c.reps++;
      c.iv = c.reps === 1 ? 1 : c.reps === 2 ? 3 : Math.round(c.iv * c.ef);
      if (q === 3) c.iv = Math.max(1, Math.round(c.iv * 0.6));
      c.ef = Math.max(1.3, c.ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
      c.due = Date.now() + c.iv * DAY;
    }
    s.srs[h] = c;
  });
  logActivity();
}
export function srsAdd(h) { store.update(s => { if (!s.srs[h]) s.srs[h] = { ef: 2.5, iv: 0, due: Date.now(), reps: 0, lapses: 0, seen: 0, added: Date.now() }; }); }
export function dueWords() { const now = Date.now(); return Object.entries(store.s.srs).filter(([, c]) => c.due <= now).map(([h]) => h); }
export function masteryOf(h) { const c = store.s.srs[h]; if (!c) return 0; if (c.iv >= 21) return 3; if (c.iv >= 3) return 2; return 1; }

const SKILL_OF = t => /Nghe/.test(t) ? 'Nghe' : /Đọc/.test(t) ? 'Đọc hiểu' : /Ngữ pháp|Biến đổi|Sắp xếp/.test(t) ? 'Ngữ pháp & viết câu' : /Phát âm/.test(t) ? 'Phát âm' : 'Từ vựng';
export function logSkill(tag, ok) { store.update(s => { const k = SKILL_OF(tag || ''); const v = s.skill[k] || [0, 0]; v[1]++; if (ok) v[0]++; s.skill[k] = v; }); }
