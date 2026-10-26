// Sinh đề HSK 1 / 2 / 3 đúng cấu trúc đề thật (HSK 2.0)
import { H1_PIC, H1_L4, H1_QA, H1_FILL } from '../data/examgen1.js';
import { PIC2, DLG_S, DLG_L, TF, PAIRS, FILL2, FILL3, FILL3D, PASS3, ORDER3, PYW3 } from '../data/examgen23.js';

const AF = 'ABCDEF';
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const sample = (a, n) => shuffle(a).slice(0, n);
const grp = p => p.g || p.zh;
// chọn n phần tử không trùng nhóm (tránh 2 đáp án dễ nhầm)
function distinct(pool, n, key, avoid = []) { const out = [], seen = new Set(avoid.map(key)); for (const p of shuffle(pool)) { const k = key(p); if (seen.has(k)) continue; out.push(p); seen.add(k); if (out.length === n) break; } return out; }
const line = (who, zh, vi) => ({ who, t: zh, vi });
const fmtD = d => d.map(x => `${x.who === '男' ? 'Nam' : 'Nữ'}: ${x.t} – ${x.vi}`).join('\n');

// Các phần của từng cấp: mã phần → [tiêu đề, hướng dẫn]
export const GEN_PARTS = {
  1: { L1: ['Nghe – Phần 1 (câu 1–5)', 'Nghe cụm từ, xem tranh đúng (✓) hay sai (✗). Mỗi câu nghe 2 lần.'], L2: ['Nghe – Phần 2 (câu 6–10)', 'Nghe câu, chọn tranh đúng A, B hoặc C.'], L3: ['Nghe – Phần 3 (câu 11–15)', 'Nghe hội thoại, chọn tranh phù hợp (A–F).'], L4: ['Nghe – Phần 4 (câu 16–20)', 'Nghe câu và câu hỏi, chọn đáp án đúng.'],
    R1: ['Đọc – Phần 1 (câu 21–25)', 'Xem tranh và từ, đúng (✓) hay sai (✗).'], R2: ['Đọc – Phần 2 (câu 26–30)', 'Chọn tranh phù hợp với câu (A–F).'], R3: ['Đọc – Phần 3 (câu 31–35)', 'Chọn câu trả lời phù hợp (A–F).'], R4: ['Đọc – Phần 4 (câu 36–40)', 'Chọn từ thích hợp điền vào chỗ trống (A–F).'] },
  2: { L1: ['Nghe – Phần 1 (câu 1–10)', 'Nghe một câu, xem tranh đúng (✓) hay sai (✗).'], L2a: ['Nghe – Phần 2 (câu 11–15)', 'Nghe hội thoại, chọn tranh phù hợp (A–F).'], L2b: ['Nghe – Phần 2 (câu 16–20)', 'Nghe hội thoại, chọn tranh phù hợp (A–E).'], L3: ['Nghe – Phần 3 (câu 21–30)', 'Nghe hội thoại ngắn và câu hỏi, chọn A, B hoặc C.'], L4: ['Nghe – Phần 4 (câu 31–35)', 'Nghe hội thoại dài hơn và câu hỏi, chọn A, B hoặc C.'],
    R1: ['Đọc – Phần 1 (câu 36–40)', 'Chọn tranh phù hợp với câu (A–F).'], R2: ['Đọc – Phần 2 (câu 41–45)', 'Chọn từ thích hợp điền vào chỗ trống (A–F).'], R3: ['Đọc – Phần 3 (câu 46–50)', 'Đọc đoạn văn, câu ★ đúng (✓) hay sai (✗).'], R4a: ['Đọc – Phần 4 (câu 51–55)', 'Chọn câu ở trên có liên quan (A–F).'], R4b: ['Đọc – Phần 4 (câu 56–60)', 'Chọn câu ở trên có liên quan (A–E).'] },
  3: { L1a: ['Nghe – Phần 1 (câu 1–5)', 'Nghe hội thoại, chọn tranh phù hợp (A–F).'], L1b: ['Nghe – Phần 1 (câu 6–10)', 'Nghe hội thoại, chọn tranh phù hợp (A–E).'], L2: ['Nghe – Phần 2 (câu 11–20)', 'Nghe một đoạn, câu ★ đúng (✓) hay sai (✗).'], L3: ['Nghe – Phần 3 (câu 21–30)', 'Nghe hội thoại ngắn và câu hỏi, chọn A, B hoặc C.'], L4: ['Nghe – Phần 4 (câu 31–40)', 'Nghe hội thoại dài hơn và câu hỏi, chọn A, B hoặc C.'],
    R1a: ['Đọc – Phần 1 (câu 41–45)', 'Chọn câu ở trên có liên quan (A–F).'], R1b: ['Đọc – Phần 1 (câu 46–50)', 'Chọn câu ở trên có liên quan (A–E).'], R2a: ['Đọc – Phần 2 (câu 51–55)', 'Chọn từ thích hợp điền vào chỗ trống (A–F).'], R2b: ['Đọc – Phần 2 (câu 56–60)', 'Chọn từ thích hợp điền vào chỗ trống (A–E).'], R3: ['Đọc – Phần 3 (câu 61–70)', 'Đọc đoạn văn, chọn đáp án đúng A, B hoặc C.'],
    W1: ['Viết – Phần 1 (câu 71–75)', 'Sắp xếp các từ thành câu hoàn chỉnh.'], W2: ['Viết – Phần 2 (câu 76–80)', 'Nhìn pinyin, viết chữ Hán vào chỗ trống.'] },
};

// Tranh HSK2/3: dùng tranh HSK2 + tranh HSK1 (tự tạo hội thoại cho tranh HSK1)
const H1asPic = H1_PIC.map(p => ({ zh: p.zh, vi: p.vi, e: p.e, g: p.g, s: [p.s[0], p.s[2]],
  d: p.act ? [['女', '你在做什么？', 'Bạn đang làm gì?'], ['男', '我在' + p.zh + '。', 'Tôi đang ' + p.vi + '.']] : [['男', p.s[0], p.s[2]], ['女', '是吗？', 'Thế à?']] }));
const PICS23 = [...PIC2, ...H1asPic.filter(p => !PIC2.some(q => q.zh === p.zh || q.e === p.e))];

function picTF(Q, part, sec, pool, n, { read = false } = {}) {
  sample(pool, n).forEach(p => {
    const ok = Math.random() < .5, said = ok ? p : distinct(pool, 1, grp, [p])[0];
    if (read) Q.push({ part, sec, type: 'tf', pic: p.e, word: said.zh, ans: ok ? '✓' : '✗', exp: `${said.zh} = ${said.vi}. Tranh: ${p.vi}.` });
    else Q.push({ part, sec, type: 'tf', pic: p.e, audio: [line('女', said.s[0], said.s[1])], ans: ok ? '✓' : '✗', exp: `Nghe: ${said.s[0]} – ${said.s[1]}\nTranh: ${p.vi}.` });
  });
}
function picGroupDlg(Q, part, sec, n, avoid = []) { // n tranh, n hoặc 5 câu
  const set = distinct(PICS23, n, grp, avoid), qs = n === 6 ? sample(set, 5) : set;
  const gid = part + Math.random();
  shuffle(qs).forEach(p => Q.push({ part, sec, type: n === 6 ? 'af' : 'ae', gid, group: set.map(x => x.e), groupKind: 'pic', audio: p.d.map(x => line(...x)), ans: AF[set.indexOf(p)], exp: fmtD(p.d.map(x => line(...x))) }));
  return set;
}
function picGroupText(Q, part, sec, n, avoid = []) {
  const set = distinct(PICS23, n, grp, avoid), qs = n === 6 ? sample(set, 5) : set, gid = part + Math.random();
  qs.forEach(p => Q.push({ part, sec, type: n === 6 ? 'af' : 'ae', gid, group: set.map(x => x.e), groupKind: 'pic', text: p.s[0], ans: AF[set.indexOf(p)], exp: `${p.s[0]} – ${p.s[1]}` }));
  return set;
}
function dlgABC(Q, part, sec, items) {
  items.forEach(x => {
    const opts = shuffle(x.o), right = x.o[0], d = x.d.map(y => line(...y));
    Q.push({ part, sec, type: 'abc', opts: opts.map(o => o[0]), audio: [...d, line(x.d.at(-1)[0] === '男' ? '女' : '男', '问：' + x.q[0], 'Hỏi: ' + x.q[1])], ans: AF[opts.indexOf(right)],
      exp: `${fmtD(d)}\nHỏi: ${x.q[0]} – ${x.q[1]}\nĐáp án: ${right[0]} (${right[1]})` });
  });
}
function pairGroup(Q, part, sec, n, used) {
  const set = distinct(PAIRS.filter(p => !used.has(p.c)), n, p => p.c); set.forEach(p => used.add(p.c));
  const qs = n === 6 ? sample(set, 5) : set, opts = shuffle(set), gid = part + Math.random();
  qs.forEach(p => Q.push({ part, sec, type: n === 6 ? 'af' : 'ae', gid, group: opts.map(x => x.b[0]), groupKind: 'text', text: p.a[0], ans: AF[opts.indexOf(p)], exp: `${p.a[0]} – ${p.a[1]}\n→ ${p.b[0]} – ${p.b[1]}` }));
}
function fillGroup(Q, part, sec, pool, n) {
  const set = distinct(pool, n, x => x.g), qs = n === 6 ? sample(set, 5) : set, opts = shuffle(set), gid = part + Math.random();
  qs.forEach(x => Q.push({ part, sec, type: n === 6 ? 'af' : 'ae', gid, group: opts.map(y => y.w[0]), groupKind: 'word', text: x.s[0], ans: AF[opts.indexOf(x)], exp: `${x.s[0].replace('（　）', '（' + x.w[0] + '）')}\n${x.s[1]} · ${x.w[0]}: ${x.w[1]}` }));
}
function tfStar(Q, part, sec, n, listen) {
  sample(TF, n).forEach(x => {
    const s = x.s[Math.random() * 2 | 0], ok = !!s[2];
    const base = { part, sec, type: 'tf', star: s[0], ans: ok ? '✓' : '✗', exp: `${x.t[0]} – ${x.t[1]}\n★ ${s[0]} – ${s[1]} → ${ok ? 'Đúng' : 'Sai'}` };
    Q.push(listen ? { ...base, audio: [line('女', x.t[0], x.t[1])] } : { ...base, text: x.t[0] });
  });
}

export function generate(lv) {
  lv = +lv; const Q = [];
  if (lv === 1) {
    picTF(Q, 'L1', 'L', H1_PIC.map(p => ({ ...p, s: [p.zh, p.vi] })), 5);
    sample(H1_PIC, 5).forEach(p => { const opts = shuffle([p, ...distinct(H1_PIC, 2, grp, [p])]); Q.push({ part: 'L2', sec: 'L', type: 'abc', pics: opts.map(o => o.e), audio: [line('女', p.s[0], p.s[2])], ans: AF[opts.indexOf(p)], exp: `${p.s[0]} – ${p.s[2]}` }); });
    { const six = distinct(H1_PIC, 6, grp), gid = 'L3';
      sample(six, 5).forEach(p => { const d = p.act ? [line('女', '你在做什么？', 'Bạn đang làm gì?'), line('男', '我在' + p.zh + '。', 'Tôi đang ' + p.vi + '.')] : [line('男', p.s[0], p.s[2]), line('女', '是吗？', 'Thế à?')];
        Q.push({ part: 'L3', sec: 'L', type: 'af', gid, group: six.map(o => o.e), groupKind: 'pic', audio: d, ans: AF[six.indexOf(p)], exp: fmtD(d) }); }); }
    sample(H1_L4, 5).forEach(f => { const g = f(), opts = shuffle(g.opts), right = g.opts[0];
      Q.push({ part: 'L4', sec: 'L', type: 'abc', opts: opts.map(o => o[0]), audio: [line('女', g.a[0], g.a[2]), line('男', '问：' + g.q[0], 'Hỏi: ' + g.q[2])], ans: AF[opts.indexOf(right)], exp: `${g.a[0]} – ${g.a[2]}\nHỏi: ${g.q[0]} – ${g.q[2]}\nĐáp án: ${right[0]} (${right[2]})` }); });
    picTF(Q, 'R1', 'R', H1_PIC, 5, { read: true });
    { const six = distinct(H1_PIC, 6, grp); sample(six, 5).forEach(p => Q.push({ part: 'R2', sec: 'R', type: 'af', gid: 'R2', group: six.map(o => o.e), groupKind: 'pic', text: p.s[0], ans: AF[six.indexOf(p)], exp: `${p.s[0]} – ${p.s[2]}` })); }
    { const qa = distinct(H1_QA, 6, x => x.c), opts = shuffle(qa);
      qa.slice(0, 5).forEach(x => Q.push({ part: 'R3', sec: 'R', type: 'af', gid: 'R3', group: opts.map(y => y.a[0]), groupKind: 'text', text: x.q[0], ans: AF[opts.indexOf(x)], exp: `${x.q[0]} – ${x.q[2]}\n→ ${x.a[0]} – ${x.a[2]}` })); }
    { const fl = distinct(H1_FILL, 6, x => x.g), opts = shuffle(fl);
      fl.slice(0, 5).forEach(x => Q.push({ part: 'R4', sec: 'R', type: 'af', gid: 'R4', group: opts.map(y => y.w[0]), groupKind: 'word', text: x.s[0], ans: AF[opts.indexOf(x)], exp: `${x.s[0].replace('（　）', '（' + x.w[0] + '）')}\n${x.s[2]} · ${x.w[0]}: ${x.w[2]}` })); }
  }
  if (lv === 2) {
    picTF(Q, 'L1', 'L', PICS23, 10);
    const a = picGroupDlg(Q, 'L2a', 'L', 6); picGroupDlg(Q, 'L2b', 'L', 5, a);
    dlgABC(Q, 'L3', 'L', sample(DLG_S.filter(x => x.lv === 2), 10));
    dlgABC(Q, 'L4', 'L', sample(DLG_L.filter(x => x.lv === 2), 5));
    picGroupText(Q, 'R1', 'R', 6);
    fillGroup(Q, 'R2', 'R', FILL2, 6);
    tfStar(Q, 'R3', 'R', 5, false);
    const used = new Set(); pairGroup(Q, 'R4a', 'R', 6, used); pairGroup(Q, 'R4b', 'R', 5, used);
  }
  if (lv === 3) {
    const a = picGroupDlg(Q, 'L1a', 'L', 6); picGroupDlg(Q, 'L1b', 'L', 5, a);
    tfStar(Q, 'L2', 'L', 10, true);
    const s3 = shuffle(DLG_S.filter(x => x.lv === 3)), s2 = shuffle(DLG_S.filter(x => x.lv === 2));
    dlgABC(Q, 'L3', 'L', [...s3, ...s2].slice(0, 10));
    const l3 = shuffle(DLG_L.filter(x => x.lv === 3)), l2 = shuffle(DLG_L.filter(x => x.lv === 2));
    dlgABC(Q, 'L4', 'L', [...l3, ...l2].slice(0, 10));
    const used = new Set(); pairGroup(Q, 'R1a', 'R', 6, used); pairGroup(Q, 'R1b', 'R', 5, used);
    fillGroup(Q, 'R2a', 'R', FILL3, 6); fillGroup(Q, 'R2b', 'R', FILL3D, 5);
    sample(PASS3, 10).forEach(x => { const opts = shuffle(x.o), right = x.o[0];
      Q.push({ part: 'R3', sec: 'R', type: 'abc', text: x.t[0], qtext: x.q[0], opts: opts.map(o => o[0]), ans: AF[opts.indexOf(right)], exp: `${x.t[0]}\n${x.t[1]}\n★ ${x.q[0]} – ${x.q[1]}\nĐáp án: ${right[0]} (${right[1]})` }); });
    sample(ORDER3, 5).forEach(x => { let p = shuffle(x.p); for (let k = 0; k < 5 && p.join('') === x.p.join(''); k++) p = shuffle(x.p);
      const full = x.p.join('') + '。'; Q.push({ part: 'W1', sec: 'W', type: 'text', pieces: p, ans: full, exp: `${full} – ${x.vi}` }); });
    sample(PYW3, 5).forEach(([s, py, vi]) => { const m = s.match(/（(.+?)）/); Q.push({ part: 'W2', sec: 'W', type: 'text', pyw: s, py, ans: m[1], exp: `${s.replace(/（(.+?)）/, '$1')} – ${vi}` }); });
  }
  Q.forEach((q, i) => q.n = i + 1);
  const key = {}; Q.forEach(q => key[q.n] = q.ans);
  const d = new Date();
  return { id: 'g' + Date.now().toString(36), generated: true, level: lv, name: `Đề HSK ${lv} tự sinh · ${d.toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' })}`, created: Date.now(), questions: Q, key, tries: [] };
}
