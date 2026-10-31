import { store, today } from '../core/store.js';
import { lookup, rebuild } from '../core/dict.js';
import { esc, sentence, $, toast } from '../core/ui.js';

const TABS = [['home', 'Tổng quan'], ['example', 'Ví dụ'], ['tip', 'Mẹo ghi nhớ'], ['dialogue', 'Hội thoại'], ['question', 'Câu hỏi giao tiếp'], ['topic', 'Chủ đề viết']];
const BAD = ['đm', 'dm ', 'vcl', 'vkl', 'địt', 'lồn', 'cặc', 'đéo', 'buồi', 'fuck', 'shit', 'http://', 'https://', 'www.'];
const params = () => new URLSearchParams(location.hash.split('?')[1] || '');

// Kiểm tra tự động trước khi lưu: định dạng, trùng lặp, spam, nội dung không phù hợp
function guard(texts) {
  const s = store.s.community;
  if ((s.strikes || 0) >= 5) return 'Bạn đã bị tạm khóa đóng góp vì gửi nội dung không hợp lệ nhiều lần. Hãy xóa bớt hoặc liên hệ quản trị viên.';
  const all = texts.filter(Boolean).join(" ").toLowerCase();
  if (BAD.some(b => all.includes(b))) { store.update(x => x.community.strikes = (x.community.strikes || 0) + 1); return 'Nội dung chứa từ ngữ không phù hợp hoặc đường link – không được lưu.'; }
  if (/(\S)\1{4,}/u.test(all)) { store.update(x => x.community.strikes = (x.community.strikes || 0) + 1); return 'Nội dung có dấu hiệu spam (lặp ký tự).'; }
  const todayN = Object.values(s).filter(Array.isArray).flat().filter(i => i.at && new Date(i.at).toLocaleDateString('sv') === today()).length;
  if (todayN >= 30) return 'Bạn đã đóng góp 30 mục hôm nay – hãy quay lại vào ngày mai.';
  return '';
}

export function community(root, tab = 'home') {
  root.innerHTML = `<div class="page-head"><h1>Góc đóng góp</h1></div>
  <div class="card note-card">Mọi đóng góp được lưu <b>riêng trên trình duyệt của bạn</b> và không hiển thị công khai với người khác. Bạn có thể xuất ra tệp để chia sẻ với bạn bè, rồi họ nhập vào máy của họ. Nội dung đóng góp luôn có nhãn <span class="badge community">Cộng đồng</span> và không thay thế giáo trình HSK.</div>
  <div class="tabs">${TABS.map(([k, n]) => `<a class="tab ${k === tab ? 'on' : ''}" href="#/community/${k}">${n}</a>`).join('')}</div><div id="cz"></div>`;
  const cz = $('#cz', root);
  ({ home: cHome, example: cExample, tip: cTip, dialogue: cDialogue, question: cQuestion, topic: cTopic }[tab] || cHome)(cz);
  return 'Góc đóng góp';
}

function likeBtn(id) { const on = store.s.community.likes[id]; return `<button class="mini like ${on ? 'on' : ''}" data-like="${esc(id)}">👍 ${on ? 'Hữu ích' : 'Đánh dấu hữu ích'}</button>`; }
function delBtn(kind, i) { return `<button class="mini" data-del="${kind}:${i}">Xóa</button>`; }
function bindCommon(el, redraw) {
  el.onclick = e => {
    const l = e.target.closest('[data-like]'); if (l) { store.update(s => { const k = l.dataset.like; if (s.community.likes[k]) delete s.community.likes[k]; else s.community.likes[k] = true; }); redraw(); }
    const d = e.target.closest('[data-del]'); if (d && confirm('Xóa mục này khỏi trình duyệt của bạn?')) { const [k, i] = d.dataset.del.split(':'); store.update(s => s.community[k].splice(+i, 1)); rebuild(); redraw(); }
  };
}

function cHome(cz) {
  const c = store.s.community;
  const counts = [['words', 'Từ mới'], ['examples', 'Ví dụ'], ['tips', 'Mẹo'], ['dialogues', 'Hội thoại'], ['questions', 'Câu hỏi'], ['topics', 'Chủ đề viết'], ['reports', 'Báo lỗi']];
  cz.innerHTML = `<div class="stats">${counts.map(([k, n]) => `<div class="stat"><b>${c[k].length}</b><span>${n}</span></div>`).join('')}</div>
  <div class="card"><h3>Chia sẻ với bạn bè</h3><p class="muted small">Xuất toàn bộ đóng góp ra tệp JSON. Người nhận chọn “Nhập tệp” để thêm vào máy họ (nội dung nhập sẽ ghi tên người chia sẻ).</p>
    <div class="row gap wrap"><input class="inp" id="author" placeholder="Tên hiển thị khi chia sẻ" value="${esc(store.s.profile.name || '')}"><button class="btn" id="exp">Xuất tệp</button><label class="btn ghost">Nhập tệp<input type="file" id="imp" accept=".json,application/json" hidden></label></div></div>
  <h3 class="sub">Từ bạn đã thêm</h3>
  ${c.words.length ? `<div class="wlist">${c.words.map((w, i) => `<div class="wrow"><a href="#/word/${encodeURIComponent(w.h)}" class="wr-h" lang="zh-CN">${esc(w.h)}</a><span class="wr-p">${esc(w.p)}</span><span class="wr-vi">${esc(w.vi)}${w.by ? ` <small class="muted">· ${esc(w.by)}</small>` : ''}</span>${likeBtn('w:' + w.h)}${delBtn('words', i)}</div>`).join('')}</div>` : '<p class="muted">Từ mới bạn tự thêm nay được lưu ở <a href="#/review/mine">⭐ Ôn tập › Từ của tôi</a> (có Quizlet và ôn lặp lại).</p>'}
  ${c.reports.length ? `<h3 class="sub">Báo lỗi bạn đã ghi</h3>${c.reports.map((r, i) => `<div class="card journal"><b lang="zh-CN">${esc(r.h)}</b> · ${esc(r.type)} – ${esc(r.text)} ${delBtn('reports', i)}</div>`).join('')}` : ''}`;
  bindCommon(cz, () => cHome(cz));
  $('#exp', cz).onclick = () => {
    const by = $('#author', cz).value.trim();
    const data = { app: 'hanngu-viet', type: 'community', by, at: Date.now(), ...Object.fromEntries(['words', 'examples', 'tips', 'dialogues', 'questions', 'topics'].map(k => [k, c[k]])) };
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
    a.download = `hanngu-viet-dong-gop-${today()}.json`; a.click();
  };
  $('#imp', cz).onchange = async e => {
    const f = e.target.files[0]; if (!f) return;
    try {
      const d = JSON.parse(await f.text()); if (d.app !== 'hanngu-viet') throw new Error();
      let n = 0;
      store.update(s => { for (const k of ['words', 'examples', 'tips', 'dialogues', 'questions', 'topics']) for (const it of d[k] || []) {
        const dup = s.community[k].some(x => JSON.stringify({ ...x, by: 0, at: 0 }) === JSON.stringify({ ...it, by: 0, at: 0 })) || (k === 'words' && (s.community[k].some(x => x.h === it.h) || lookup(it.h).some(x => x.source === 'hsk')));
        const txt = Object.values(it).filter(v => typeof v === 'string').join(' ').toLowerCase();
        if (!dup && !BAD.some(b => txt.includes(b))) { s.community[k].push({ ...it, by: it.by || d.by || 'Bạn bè' }); n++; }
      } });
      rebuild(); toast(`Đã nhập ${n} mục`); cHome(cz);
    } catch { toast('Tệp không hợp lệ', 'bad'); }
  };
}

function simpleList(cz, kind, fields, render, label) {
  const p = params();
  const draw = () => {
    const items = store.s.community[kind];
    cz.innerHTML = `<form class="card form" id="cf"><div class="fgrid">${fields.map(([id, name, opt = {}]) => `<label class="fld ${opt.wide ? 'span2' : ''}">${name}${opt.area ? `<textarea class="inp area" id="${id}" rows="${opt.rows || 3}" ${opt.zh ? 'lang="zh-CN"' : ''} placeholder="${esc(opt.ph || '')}">${esc(p.get(id) || '')}</textarea>` : `<input class="inp" id="${id}" ${opt.zh ? 'lang="zh-CN"' : ''} placeholder="${esc(opt.ph || '')}" value="${esc(p.get(id) || '')}">`}</label>`).join('')}</div>
      <div class="row gap"><button class="btn">Lưu ${label}</button><span id="cerr" class="bad-t"></span></div></form>
      <h3 class="sub">${label[0].toUpperCase() + label.slice(1)} của bạn (${items.length})</h3>
      <div>${items.map((it, i) => `<div class="card journal">${render(it)}<div class="row gap">${likeBtn(kind + ':' + i)}${delBtn(kind, i)}${it.by ? `<span class="muted small">từ ${esc(it.by)}</span>` : ''}</div></div>`).reverse().join('') || '<p class="muted">Chưa có.</p>'}</div>`;
    bindCommon(cz, draw);
    $('#cf', cz).onsubmit = e => {
      e.preventDefault();
      const it = Object.fromEntries(fields.map(([id]) => [id, $('#' + id, cz).value.trim()])); it.at = Date.now();
      const req = fields.filter(f => f[2]?.req).find(f => !it[f[0]]);
      const zhField = fields.find(f => f[2]?.zh && f[2]?.req);
      const err = req ? `Hãy nhập “${req[1]}”.` : zhField && !/\p{Script=Han}/u.test(it[zhField[0]]) ? 'Nội dung tiếng Trung cần có chữ Hán.' : guard(Object.values(it).filter(v => typeof v === 'string'));
      if (err) { $('#cerr', cz).textContent = err; return; }
      store.update(s => s.community[kind].push(it)); toast('Đã lưu'); history.replaceState(null, '', location.hash.split('?')[0]); draw();
    };
  };
  draw();
}

function cExample(cz) {
  simpleList(cz, 'examples', [['h', 'Từ liên quan', { zh: true, ph: '喜欢' }], ['zh', 'Câu ví dụ (chữ Hán)', { zh: true, req: true, wide: true }], ['vi', 'Nghĩa tiếng Việt', { req: true, wide: true }]],
    it => sentence(it.zh, it.vi) + (it.h ? `<div class="muted small">Từ: <span data-w="${esc(it.h)}" lang="zh-CN">${esc(it.h)}</span></div>` : ''), 'ví dụ');
}
function cTip(cz) {
  simpleList(cz, 'tips', [['h', 'Từ / chữ', { zh: true, req: true }], ['text', 'Mẹo ghi nhớ', { area: true, req: true, wide: true, ph: 'Ví dụ: 休 = người (亻) dựa vào cây (木) để nghỉ' }]],
    it => `<b lang="zh-CN" data-w="${esc(it.h)}">${esc(it.h)}</b> <span class="tip-tag">Mẹo cá nhân</span> ${esc(it.text)}`, 'mẹo');
}
function cDialogue(cz) {
  simpleList(cz, 'dialogues', [['title', 'Tiêu đề', { req: true }], ['zh', 'Hội thoại (mỗi dòng một câu, dạng A：…)', { area: true, zh: true, req: true, wide: true, rows: 5, ph: 'A：你好！\nB：你好！' }], ['vi', 'Bản dịch (mỗi dòng một câu)', { area: true, wide: true, rows: 5 }]],
    it => { const z = it.zh.split('\n'), v = (it.vi || '').split('\n'); return `<b>${esc(it.title)}</b><div class="dialog">${z.filter(Boolean).map((line, k) => { const m = line.match(/^([AB甲乙])[：:]\s*(.*)$/); return sentence(m ? m[2] : line, v[k]?.replace(/^[AB][：:]\s*/, '') || '', { speaker: m ? m[1] : '', role: m && /[B乙]/.test(m[1]) ? 1 : 0 }); }).join('')}</div>`; }, 'hội thoại');
}
function cQuestion(cz) {
  simpleList(cz, 'questions', [['zh', 'Câu hỏi giao tiếp (chữ Hán)', { zh: true, req: true, wide: true, ph: '你周末喜欢做什么？' }], ['vi', 'Nghĩa', { wide: true }], ['answer', 'Câu trả lời mẫu', { zh: true, wide: true }]],
    it => sentence(it.zh, it.vi) + (it.answer ? `<div class="muted small">Gợi ý trả lời:</div>${sentence(it.answer, '')}` : ''), 'câu hỏi');
}
function cTopic(cz) {
  simpleList(cz, 'topics', [['text', 'Chủ đề luyện viết', { req: true, wide: true, ph: 'Viết 5 câu về món ăn Việt Nam bạn thích nhất' }]],
    it => `<b>${esc(it.text)}</b> <a class="small" href="#/practice/essay">Luyện viết ›</a>`, 'chủ đề');
}
