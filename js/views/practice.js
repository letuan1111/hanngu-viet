import { store, logActivity } from '../core/store.js';
import { hskWords, sentenceBank, LESSON_LIST, lessonsOf, pick, sentencePinyin } from '../core/dict.js';
import { esc, say, sentence, icon, $, $$, writer, gridSvg, short, toast } from '../core/ui.js';
import { Q, runQuiz } from '../core/quiz.js';
import { speak, listen, SR } from '../core/tts.js';
import { similarity } from './course.js';
import { checkHtml } from './grammar.js';

const MODES = [
  ['listen', '🎧', 'Luyện nghe', 'Nghe từ, nghe câu, chép chính tả'],
  ['speak', '🗣️', 'Phát âm & giao tiếp', 'Đọc theo, nhập vai hội thoại'],
  ['../speaking', '🎤', 'Luyện nói theo chủ đề', '32 bài nói mẫu ~300 chữ, ghi âm chấm điểm'],
  ['read', '📖', 'Đọc hiểu', 'Đọc hội thoại, trả lời câu hỏi'],
  ['write', '✍️', 'Viết chữ Hán', 'Viết từng nét theo thứ tự'],
  ['essay', '📝', 'Viết đoạn văn', 'Viết theo chủ đề, tự kiểm tra lỗi'],
  ['order', '🔀', 'Sắp xếp câu', 'Ghép từ thành câu đúng'],
  ['reflex', '⚡', 'Phản xạ', 'Dịch nhanh Việt → Trung có tính giờ'],
];

function levelPicker(cur) { return `<div class="chips" id="lvp">${[1, 2, 3].map(l => `<button class="chip ${l === cur ? 'on' : ''}" data-l="${l}">HSK ${l}</button>`).join('')}</div>`; }
const curLevel = () => { const s = store.s; for (const lv of [1, 2, 3]) if (lessonsOf(lv).some(l => !s.lessons[l.idx]?.done)) return lv; return 3; };
const bankUpTo = lv => sentenceBank().filter(x => x.level <= lv);

export function practice(root, mode) {
  if (!mode) {
    root.innerHTML = `<div class="page-head"><h1>Luyện tập kỹ năng</h1></div>
    <div class="paths">${MODES.map(([k, i, t, d]) => `<a class="path" href="${k.startsWith('../') ? '#/' + k.slice(3) : '#/practice/' + k}"><span class="pi">${i}</span><b>${t}</b><small>${d}</small></a>`).join('')}</div>`;
    return 'Luyện tập';
  }
  const M = MODES.find(m => m[0] === mode) || MODES[0];
  let lv = curLevel();
  root.innerHTML = `<nav class="crumb"><a href="#/practice">Luyện tập</a> › ${M[2]}</nav><div class="page-head"><h1>${M[1]} ${M[2]}</h1>${levelPicker(lv)}</div><div id="pz"></div>`;
  const pz = $('#pz', root);
  const run = () => ({ listen: pListen, speak: pSpeak, read: pRead, write: pWrite, essay: pEssay, order: pOrder, reflex: pReflex }[mode] || pListen)(pz, lv);
  $('#lvp', root).onclick = e => { const b = e.target.closest('[data-l]'); if (!b) return; lv = +b.dataset.l; $$('#lvp .chip', root).forEach(x => x.classList.toggle('on', x === b)); run(); };
  run();
  return M[2];
}

function pListen(pz, lv) {
  const hard = store.s.hardAudio;
  pz.innerHTML = `<div class="tabs" id="lt">${[['w', 'Nghe chọn từ'], ['s', 'Nghe hiểu câu'], ['d', 'Chép chính tả'], ['h', `Câu khó nghe (${hard.length})`]].map(([k, n], i) => `<button class="tab ${i ? '' : 'on'}" data-k="${k}">${n}</button>`).join('')}</div><div id="lz"></div>`;
  const lz = $('#lz', pz);
  const go = k => {
    $$('#lt .tab', pz).forEach(t => t.classList.toggle('on', t.dataset.k === k));
    const ws = hskWords(lv), bank = bankUpTo(lv).filter(x => x.level === lv || lv === 1);
    if (k === 'w') runQuiz(lz, pick(ws, 10).map(w => Q.listen(w, ws)), { title: 'Nghe chọn từ' });
    if (k === 's') runQuiz(lz, pick(bank, 8).map(x => Q.listenSent(x, bank)), { title: 'Nghe hiểu' });
    if (k === 'd') dictation(lz, pick(bank.filter(x => x.zh.length <= 16), 6));
    if (k === 'h') lz.innerHTML = hard.length ? `<p class="muted small">Các câu bạn đã đánh dấu khó nghe. Nghe lại ở tốc độ chậm rồi bình thường.</p>${[...hard].reverse().map((x, i) => sentence(x.text, '', { extra: `<div class="no-pop row gap">${say(x.text, ' 0.75x').replace('data-say', 'data-rate="0.75" data-say')}<button class="mini" data-rm="${hard.length - 1 - i}">Đã nghe được – bỏ đánh dấu</button></div>` })).join('')}` : '<p class="muted">Chưa có câu nào. Trong phần hội thoại của bài học, bấm “Khó nghe” để lưu câu vào đây.</p>';
  };
  pz.onclick = e => { const t = e.target.closest('#lt .tab'); if (t) go(t.dataset.k); const r = e.target.closest('[data-rm]'); if (r) { store.update(s => s.hardAudio.splice(+r.dataset.rm, 1)); pListen(pz, lv); go('h'); } };
  go('w');
}

function dictation(el, items) {
  let i = 0, total = 0;
  const draw = () => {
    if (i >= items.length) { el.innerHTML = `<div class="quiz done"><h3>Điểm chính tả trung bình: ${Math.round(total / items.length)}%</h3><button class="btn" id="again">Làm bài mới</button></div>`; $('#again', el).onclick = () => dictation(el, pick(items, items.length)); return; }
    const x = items[i];
    el.innerHTML = `<div class="quiz"><div class="qz-top"><span class="tag">Chép chính tả</span><span>${i + 1}/${items.length}</span></div>
      <div class="qz-q"><button class="big-say" data-say="${esc(x.zh)}">${icon('vol')} Nghe</button> ${say(x.zh, ' Chậm').replace('data-say', 'data-rate="0.7" data-say')}<div class="qz-sub">Gõ lại câu bạn nghe được bằng chữ Hán (có thể gõ pinyin nếu chưa quen bộ gõ).</div></div>
      <input class="inp big" id="din" lang="zh-CN" autocomplete="off"><div class="row gap"><button class="btn" id="dchk">Kiểm tra</button><button class="btn ghost" id="dnext" hidden>Câu tiếp ›</button></div><div class="qz-fb" id="dfb"></div></div>`;
    setTimeout(() => speak(x.zh), 300);
    const chk = () => {
      const v = $('#din', el).value.trim(); if (!v) return;
      let sc;
      if (/\p{Script=Han}/u.test(v)) sc = similarity(v, x.zh);
      else { const strip = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z]/g, ''); const a = strip(v), b = strip(sentencePinyin(x.zh)); sc = a === b ? 100 : Math.round(100 * (1 - lev(a, b) / Math.max(a.length, b.length))); }
      total += sc;
      $('#dfb', el).className = 'qz-fb ' + (sc >= 80 ? 'good' : 'bad');
      $('#dfb', el).innerHTML = `<b>${sc}%</b> <div lang="zh-CN">${esc(x.zh)}</div><div class="muted">${esc(sentencePinyin(x.zh))}</div><div>${esc(x.vi)}</div>`;
      $('#dchk', el).hidden = true; $('#dnext', el).hidden = false; $('#dnext', el).focus(); logActivity();
    };
    $('#dchk', el).onclick = chk; $('#din', el).onkeydown = e => { if (e.key === 'Enter') chk(); };
    $('#dnext', el).onclick = () => { i++; draw(); };
  };
  draw();
}
function lev(a, b) { const d = Array.from({ length: a.length + 1 }, (_, i) => [i]); for (let j = 1; j <= b.length; j++) d[0][j] = j; for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); return d[a.length][b.length]; }

function pSpeak(pz, lv) {
  const ls = lessonsOf(lv);
  pz.innerHTML = `${SR ? '' : '<div class="card note-card">Trình duyệt này chưa hỗ trợ nhận dạng giọng nói. Hãy mở bằng <b>Chrome</b> hoặc <b>Edge</b> trên máy tính/Android để được chấm phát âm. Bạn vẫn có thể nghe mẫu và tự đọc theo.</div>'}
  <div class="tabs" id="st"><button class="tab on" data-k="w">Đọc từ</button><button class="tab" data-k="r">Nhập vai hội thoại</button></div><div id="sz"></div>`;
  const sz = $('#sz', pz);
  const words = () => {
    const list = pick(hskWords(lv), 8); let i = 0, sum = 0;
    const draw = () => {
      if (i >= list.length) { sz.innerHTML = `<div class="quiz done"><h3>Điểm phát âm trung bình: ${Math.round(sum / list.length)}%</h3><button class="btn" id="ag">Luyện tiếp</button></div>`; $('#ag', sz).onclick = words; return; }
      const w = list[i];
      sz.innerHTML = `<div class="quiz speak-card"><div class="qz-top"><span>${i + 1}/${list.length}</span></div>
        <div class="fc-h" lang="zh-CN">${esc(w.h)}</div><div class="fc-p">${esc(w.p)}</div><div class="muted">${esc(w.vi)}</div>
        <div class="row gap center">${say(w.h, ' Nghe mẫu')}${SR ? `<button class="btn" id="rec">${icon('mic')} Đọc</button>` : ''}<button class="btn ghost" id="nx">Tiếp ›</button></div><div id="res" class="said"></div>
        <p class="muted small">Mẹo thanh điệu: thanh 1 (ā) cao và ngang · thanh 2 (á) đi lên như hỏi “hả?” · thanh 3 (ǎ) xuống thấp rồi lên · thanh 4 (à) đi xuống dứt khoát.</p></div>`;
      if ($('#rec', sz)) $('#rec', sz).onclick = async () => {
        $('#res', sz).innerHTML = '<span class="muted">Đang nghe…</span>';
        try { const r = await listen(); const sc = r.length ? Math.max(...r.map(x => similarity(x, w.h))) : 0; sum += sc; $('#res', sz).innerHTML = `<span class="score ${sc >= 80 ? 'good' : sc >= 50 ? 'mid' : 'bad'}">${sc}%</span> Máy nghe được: <span lang="zh-CN">${esc(r[0] || '—')}</span>`; logActivity(); }
        catch (e) { $('#res', sz).innerHTML = `<span class="bad-t">${esc(e.message)}</span>`; }
      };
      $('#nx', sz).onclick = () => { i++; draw(); };
    };
    draw();
  };
  const roleplay = () => {
    sz.innerHTML = `<label class="sel">Chọn bài <select id="rl" class="inp">${ls.map(l => `<option value="${l.idx}">Bài ${l.no}: ${esc(l.t)}</option>`).join('')}</select></label>
      <label class="sel">Bạn đóng vai <select id="rr" class="inp"><option value="B">B</option><option value="A">A</option></select></label>
      <button class="btn" id="rs">Bắt đầu</button><div id="rv"></div>`;
    $('#rs', sz).onclick = async () => {
      const l = LESSON_LIST[+$('#rl', sz).value], me = $('#rr', sz).value; const rv = $('#rv', sz);
      rv.innerHTML = `<p class="muted small">Máy đọc vai còn lại. Đến lượt bạn: nói câu được gợi ý (bấm 👁 để xem gợi ý nếu quên).</p><div class="dialog">${l.d.map(([sp, zh, vi], k) => `<div class="rp ${sp === me ? 'me' : ''}" id="rp${k}">${sentence(zh, vi, { speaker: sp, role: sp === 'A' ? 0 : 1 })}<div class="rp-res"></div></div>`).join('')}</div>`;
      $$('.rp.me .sent', rv).forEach(e => e.classList.add('masked'));
      for (let k = 0; k < l.d.length; k++) {
        if (!rv.isConnected) return;
        const [sp, zh] = l.d[k]; const box = $(`#rp${k}`, rv); box.classList.add('now'); box.scrollIntoView({ block: 'center', behavior: 'smooth' });
        if (sp !== me) await speak(zh, { role: sp === 'A' ? 0 : 1, el: box.querySelector('.sent') });
        else if (SR) {
          const out = $('.rp-res', box); out.innerHTML = `<span class="muted">${icon('mic')} Đến lượt bạn – hãy nói…</span>`;
          try { const r = await listen(); const sc = r.length ? Math.max(...r.map(x => similarity(x, zh))) : 0; out.innerHTML = `<span class="score ${sc >= 80 ? 'good' : sc >= 50 ? 'mid' : 'bad'}">${sc}%</span> <span lang="zh-CN">${esc(r[0] || '')}</span>`; } catch (e) { out.innerHTML = `<span class="bad-t">${esc(e.message)}</span>`; }
          box.querySelector('.sent').classList.remove('masked');
        } else { box.querySelector('.sent').classList.remove('masked'); await new Promise(r => setTimeout(r, 3500)); }
        box.classList.remove('now');
      }
      logActivity(3);
    };
  };
  pz.onclick = e => { const t = e.target.closest('#st .tab'); if (!t) return; $$('#st .tab', pz).forEach(x => x.classList.toggle('on', x === t)); t.dataset.k === 'w' ? words() : roleplay(); };
  words();
}

function pRead(pz, lv) {
  const ls = lessonsOf(lv);
  const l = pick(ls, 1)[0];
  const bank = bankUpTo(lv);
  pz.innerHTML = `<div class="card"><p class="muted small">Đọc đoạn hội thoại (nghĩa tiếng Việt đang ẩn – bấm 👁 nếu cần), sau đó trả lời câu hỏi bên dưới.</p>
    <h3>Bài đọc: ${esc(l.t)}</h3><div class="dialog reading">${l.d.map(([sp, zh, vi]) => sentence(zh, vi, { speaker: sp, role: sp === 'A' ? 0 : 1 })).join('')}</div>
    <button class="btn ghost sm" id="other">Đổi bài đọc khác</button></div><div id="rq"></div>`;
  $$('.reading .sent', pz).forEach(s => s.classList.add('hide-vi'));
  const sents = l.d.map(d => ({ zh: d[1], vi: d[2] }));
  runQuiz($('#rq', pz), pick(sents, 4).map(x => Q.readMeaning(x, bank)), { title: 'Đọc hiểu' });
  $('#other', pz).onclick = () => pRead(pz, lv);
}

function pWrite(pz, lv) {
  const ws = pick(hskWords(lv), 6);
  pz.innerHTML = `<p class="muted">Xem thứ tự nét, sau đó tự viết bằng chuột/ngón tay. Hệ thống sẽ nhận diện từng nét và báo sai. Nét đỏ là bộ thủ.</p>
  <div class="write-list">${ws.map((w, i) => `<div class="card wcard"><div class="row gap"><b lang="zh-CN" class="big-h" data-w="${esc(w.h)}">${esc(w.h)}</b><span>${esc(w.p)} – ${esc(short(w.vi))}</span>${say(w.h)}</div>
    <div class="write-row">${[...w.h].map((c, k) => `<div class="wbox"><div class="wgrid">${gridSvg()}<div class="wtarget" id="w${i}_${k}"></div></div><div class="row gap center"><button class="mini" data-a="${i}_${k}">${icon('play')} Nét</button><button class="mini" data-q="${i}_${k}">${icon('brush')} Viết</button></div><div class="wmsg" id="m${i}_${k}"></div></div>`).join('')}</div></div>`).join('')}</div>
  <div class="center"><button class="btn" id="more">Từ khác</button></div>`;
  const W = {};
  ws.forEach((w, i) => [...w.h].forEach((c, k) => { W[`${i}_${k}`] = writer($(`#w${i}_${k}`, pz), c, { size: 150 }); }));
  pz.onclick = e => {
    const a = e.target.closest('[data-a]'); if (a) W[a.dataset.a]?.animateCharacter();
    const q = e.target.closest('[data-q]'); if (q) { const m = $(`#m${q.dataset.q}`, pz); m.textContent = 'Viết từng nét…'; W[q.dataset.q]?.quiz({ onComplete: d => { m.textContent = d.totalMistakes ? `Xong, sai ${d.totalMistakes} nét.` : 'Hoàn hảo!'; logActivity(); } }); }
    if (e.target.id === 'more') pWrite(pz, lv);
  };
}

function pEssay(pz, lv) {
  const topics = [
    ...lessonsOf(lv).map(l => ({ t: l.write, src: `Bài ${l.no}: ${l.t}`, idx: l.idx })),
    ...store.s.community.topics.map(t => ({ t: t.text, src: 'Chủ đề bạn thêm' })),
  ];
  const tp = pick(topics, 1)[0];
  const old = store.s.journal.slice(-5).reverse();
  pz.innerHTML = `<div class="card mission"><p class="eyebrow">${esc(tp.src)}</p><h3>${esc(tp.t)}</h3>
    <textarea id="es" class="inp area" lang="zh-CN" rows="7" placeholder="Viết bằng chữ Hán…"></textarea>
    <div class="row gap"><button class="btn" id="ec">Kiểm tra & lưu</button><button class="btn ghost" id="eo">Chủ đề khác</button><span class="muted small" id="ecnt"></span></div><div id="er"></div></div>
  ${old.length ? `<h3 class="sub">Bài viết gần đây</h3>${old.map(j => `<div class="card journal"><div class="muted small">${new Date(j.at).toLocaleString('vi')}</div><div lang="zh-CN">${esc(j.text)}</div></div>`).join('')}` : ''}`;
  const ta = $('#es', pz);
  ta.oninput = () => $('#ecnt', pz).textContent = `${[...ta.value].filter(c => /\p{Script=Han}/u.test(c)).length} chữ Hán`;
  $('#eo', pz).onclick = () => pEssay(pz, lv);
  $('#ec', pz).onclick = () => {
    const t = ta.value.trim(); if (!t) return;
    $('#er', pz).innerHTML = t.split(/(?<=[。！？!?])/).filter(x => x.trim()).map(x => `<div class="ck-sent"><div lang="zh-CN">${esc(x)}</div>${checkHtml(x)}</div>`).join('');
    store.update(s => s.journal.push({ lesson: tp.idx ?? null, text: t, at: Date.now() })); logActivity(2); toast('Đã lưu bài viết');
  };
}

function pOrder(pz, lv) {
  const bank = bankUpTo(lv).filter(x => x.level === lv || lv === 1);
  pz.innerHTML = '<div id="oz"></div>';
  runQuiz($('#oz', pz), pick(bank, 14).map(Q.order).filter(Boolean).slice(0, 8), { title: 'Sắp xếp câu' });
}

function pReflex(pz, lv) {
  const bank = bankUpTo(lv);
  pz.innerHTML = `<div class="card note-card">Mỗi câu chỉ có ít thời gian – đọc nghĩa tiếng Việt và chọn câu tiếng Trung đúng thật nhanh. Tổng thời gian: 2 phút.</div><div id="rz"></div>`;
  runQuiz($('#rz', pz), pick(bank, 12).map(x => Q.translate(x, bank)), { title: 'Phản xạ', timeLimit: 120 });
}
