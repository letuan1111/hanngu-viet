// Luyện nói theo chủ đề: bài nói mẫu ~300 chữ, bật/tắt pinyin & nghĩa, đổi phông, nghe mẫu, ghi âm và chấm từng chữ
import { store, logActivity } from '../core/store.js';
import { SPEAK_GROUPS, SPEAK_ITEMS, SPEAK_VOCAB } from '../data/speaking.js';
import { segment, charPinyins, isHan, examplesFor, sentencePinyin, grammarById } from '../core/dict.js';
import { esc, icon, $, $$, toast, applyDisplay, say, sentence, exampleHtml } from '../core/ui.js';
import { checkSentence } from '../core/checker.js';
import { vocabSet, ex5 } from './vocabset.js';
import { typingTrainer } from './typing.js';
import { speak, speakSeq, stopSeq, SR } from '../core/tts.js';

const FONTS = [['kai', 'Khải thư 楷体 (chuẩn sách giáo khoa)'], ['song', 'Tống thể 宋体 (chữ in)'], ['hei', 'Hắc thể 黑体 (không chân)']];
const strip = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ü/g, 'v');

// ── Danh sách chủ đề ──
export function speakingList(root) {
  const best = store.s.speakBest || {};
  root.innerHTML = `<div class="page-head"><div><p class="eyebrow">Luyện nói theo chủ đề</p><h1>32 câu hỏi nói thường gặp</h1></div></div>
  <p class="muted">Mỗi câu hỏi có một bài nói mẫu khoảng 300 chữ. Đọc với pinyin và nghĩa tiếng Việt, tắt dần khi đã quen, nghe giọng mẫu, rồi ghi âm để máy chấm từng chữ bạn đọc đúng hay sai.</p>
  ${SPEAK_GROUPS.map(([g, name, ic]) => { const items = SPEAK_ITEMS.filter(x => x.g === g); return `<section class="chapter"><h2><small>${items.length} bài</small>${ic} ${esc(name)}</h2>
    <div class="lesson-list">${items.map(x => `<a class="lesson-item ${best[x.id] >= 80 ? 'done' : ''}" href="#/speaking/${x.id}"><span class="ln">${best[x.id] >= 80 ? icon('check') : x.id}</span><span class="lt"><b lang="zh-CN" class="sp-q">${esc(x.q)}</b><small>${esc(x.qvi)}</small></span>${best[x.id] != null ? `<span class="best">${best[x.id]}%</span>` : ''}</a>`).join('')}</div></section>`; }).join('')}`;
  return 'Luyện nói theo chủ đề';
}

// Hiển thị câu theo từng chữ (để tô màu kết quả), gom chữ theo từ để tra nghĩa
function sentenceChars(zh, base) {
  const arr = charPinyins([...zh].filter(isHan).join('')) || [];
  let k = 0, html = '';
  for (const t of segment(zh)) {
    if (!t.han) { html += `<span class="pn">${esc(t.t)}</span>`; continue; }
    const chars = [...t.t].map(c => `<span class="cz" data-k="${base + k}">${esc(c)}</span>`);
    const py = t.w && t.t.length > 1 ? t.w.p : [...t.t].map((_, j) => arr[k + j] || '').join(' ');
    html += `<span class="tk" data-w="${esc(t.t)}"><ruby>${chars.join('')}<rt>${esc(py)}</rt></ruby></span>`;
    k += t.t.length;
  }
  return { html, n: k };
}

// So khớp chữ đọc được với văn bản: đúng chữ/đúng âm = đúng; cùng âm khác thanh = sai thanh; còn lại = thiếu/sai
function align(target, said) {
  const T = [...target].filter(isHan), S = [...said].filter(isHan);
  if (!T.length) return { marks: [], score: 0 };
  const tp = charPinyins(T.join('')) || T, sp = charPinyins(S.join('')) || S;
  const sim = (i, j) => T[i] === S[j] || tp[i] === sp[j] ? 2 : strip(tp[i]) === strip(sp[j]) ? 1 : 0;
  const n = T.length, m = S.length, dp = Array.from({ length: n + 1 }, () => new Int16Array(m + 1));
  for (let i = 1; i <= n; i++) for (let j = 1; j <= m; j++) { const s = sim(i - 1, j - 1); dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1], s ? dp[i - 1][j - 1] + s : 0); }
  const marks = Array(n).fill('miss'); let i = n, j = m;
  while (i > 0 && j > 0) { const s = sim(i - 1, j - 1); if (s && dp[i][j] === dp[i - 1][j - 1] + s) { marks[i - 1] = s === 2 ? 'ok' : 'tone'; i--; j--; } else if (dp[i - 1][j] >= dp[i][j - 1]) i--; else j--; }
  const ok = marks.filter(x => x === 'ok').length, tone = marks.filter(x => x === 'tone').length;
  return { marks, score: Math.round((ok + tone * 0.5) / n * 100), ok, tone };
}

// ── Trang bài nói ──
export function speakingItem(root, id) {
  const x = SPEAK_ITEMS.find(i => i.id === +id); if (!x) { root.innerHTML = '<p>Không có bài này.</p>'; return; }
  const st = store.s.settings, opt = store.s.speakOpt || { py: true, vi: true, size: 1.5 };
  const idx = SPEAK_ITEMS.indexOf(x), prev = SPEAK_ITEMS[idx - 1], next = SPEAK_ITEMS[idx + 1];
  const g = SPEAK_GROUPS.find(gg => gg[0] === x.g);
  let base = 0;
  const rows = x.s.map(([zh, vi], i) => { const r = sentenceChars(zh, base); const row = `<div class="sp-row" data-i="${i}" data-zh="${esc(zh)}" data-from="${base}" data-n="${r.n}">
      <div class="sp-body"><div class="sp-zh" lang="zh-CN">${r.html}</div><div class="sp-vi">${esc(vi)}</div><div class="sp-res"></div></div>
      <div class="sp-act"><button class="say sp-play" title="Nghe câu này" aria-label="Nghe câu này">${icon('vol')}</button>${SR ? `<button class="say sp-mic" title="Ghi âm câu này" aria-label="Ghi âm câu này">${icon('mic')}</button>` : ''}</div></div>`; base += r.n; return row; }).join('');
  const total = base;
  const qr = sentenceChars(x.q, 100000);
  root.innerHTML = `<nav class="crumb"><a href="#/speaking">Luyện nói</a> › ${g[2]} ${esc(g[1])}</nav>
  <div class="sp-head card"><p class="eyebrow">Câu hỏi ${x.id} · ${esc(g[1])}</p><div class="sp-qbig" lang="zh-CN">${qr.html}</div><div class="sp-qvi">${esc(x.qvi)}</div></div>
  <div class="sp-bar card" role="toolbar" aria-label="Tùy chọn hiển thị">
    <label class="sw"><input type="checkbox" id="oPy" ${opt.py ? 'checked' : ''}><span></span> Pinyin</label>
    <label class="sw"><input type="checkbox" id="oVi" ${opt.vi ? 'checked' : ''}><span></span> Tiếng Việt</label>
    <label class="sel">Phông <select id="oFont">${FONTS.map(([k, n]) => `<option value="${k}" ${st.zhFont === k ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
    <span class="row gap"><button class="mini" id="aMinus" aria-label="Chữ nhỏ hơn">A−</button><button class="mini" id="aPlus" aria-label="Chữ to hơn">A+</button></span>
    <span class="grow"></span>
    <button class="btn sm" id="pAll">${icon('play')} Nghe cả bài</button><button class="btn sm ghost" id="pStop">${icon('stop')}</button>
    <label class="sel">Tốc độ <select id="pRate">${[0.75, 1, 1.25].map(r => `<option ${r === (st.rate || 1) ? 'selected' : ''} value="${r}">${r}x</option>`).join('')}</select></label>
  </div>
  <article class="sp-text card ${opt.py ? '' : 'no-py'} ${opt.vi ? '' : 'no-vi'}" style="--sp-size:${opt.size}rem">${rows}</article>
  <section class="card sp-rec">
    <h2>${icon('mic')} Ghi âm & kiểm tra phát âm</h2>
    ${SR ? `<p class="muted small">Bấm “Bắt đầu đọc”, đọc to cả bài (có thể tắt pinyin để thử thách), rồi bấm “Dừng & chấm điểm”. Máy sẽ tô màu từng chữ: <span class="lg ok">đúng</span> <span class="lg tone">gần đúng / nên kiểm tra thanh điệu</span> <span class="lg miss">thiếu hoặc sai</span>. Cũng có thể bấm biểu tượng micro bên cạnh từng câu để luyện riêng câu đó.</p>`
      : `<p class="note">Trình duyệt này chưa hỗ trợ nhận dạng giọng nói nên không chấm điểm tự động được. Hãy mở bằng <b>Chrome</b> hoặc <b>Edge</b> trên máy tính/Android. Bạn vẫn có thể ghi âm và nghe lại để tự so với giọng mẫu.</p>`}
    <div class="row gap wrap"><button class="btn" id="rStart">${icon('mic')} Bắt đầu đọc</button><button class="btn ghost" id="rStop" disabled>Dừng & chấm điểm</button><span id="rTime" class="muted"></span></div>
    <div id="rLive" class="sp-live" aria-live="polite"></div>
    <div id="rOut"></div>
  </section>
  <section class="card ty-sec"><h2>⌨️ Luyện gõ lại bài đọc</h2>
    <p class="muted small">Gõ lại từng câu của bài: gõ đúng đến chữ nào, chữ đó biến mất khỏi câu mẫu; gõ xong một câu sẽ tự chuyển sang câu tiếp. Đồng hồ tính tốc độ theo chữ/phút và từ/phút.</p>
    <div id="typing"></div></section>
  <div id="study"></div>
  <div class="lesson-nav">${prev ? `<a class="btn ghost" href="#/speaking/${prev.id}">‹ Câu ${prev.id}</a>` : '<span></span>'}${next ? `<a class="btn" href="#/speaking/${next.id}">Câu ${next.id} ›</a>` : ''}</div>`;

  const text = $('.sp-text', root), srows = $$('.sp-row', root);
  const saveOpt = () => store.update(s => s.speakOpt = { py: $('#oPy', root).checked, vi: $('#oVi', root).checked, size: opt.size });
  $('#oPy', root).onchange = e => { text.classList.toggle('no-py', !e.target.checked); saveOpt(); };
  $('#oVi', root).onchange = e => { text.classList.toggle('no-vi', !e.target.checked); saveOpt(); };
  $('#oFont', root).onchange = e => { store.update(s => s.settings.zhFont = e.target.value); applyDisplay(); };
  const size = d => { opt.size = Math.min(2.6, Math.max(1.1, +(opt.size + d).toFixed(2))); text.style.setProperty('--sp-size', opt.size + 'rem'); saveOpt(); };
  $('#aMinus', root).onclick = () => size(-0.15); $('#aPlus', root).onclick = () => size(0.15);
  $('#pAll', root).onclick = () => { logActivity(); speakSeq(srows.map(el => ({ text: el.dataset.zh, el, onBoundary: hlBoundary(el) })), { rate: +$('#pRate', root).value, onItem: k => { srows.forEach((r, j) => r.classList.toggle('now', j === k)); if (k >= 0) srows[k].scrollIntoView({ block: 'center', behavior: 'smooth' }); } }); };
  $('#pStop', root).onclick = stopSeq;
  $('#pRate', root).onchange = e => store.update(s => s.settings.rate = +e.target.value);
  function hlBoundary(el) {
    // charIndex tính theo cả câu (gồm dấu câu) → quy về chỉ số chữ Hán
    const zh = el.dataset.zh; const map = []; let h = 0; [...zh].forEach((c, i) => { map[i] = isHan(c) ? h++ : -1; });
    const cs = $$('.cz', el);
    return (i, len) => { const idxs = new Set(); for (let t = i; t < i + Math.max(1, len); t++) if (map[t] >= 0) idxs.add(map[t]); cs.forEach((c, j) => c.classList.toggle('hl', idxs.has(j))); };
  }

  // tô màu kết quả lên các chữ
  const paint = (el, marks) => { $$('.cz', el).forEach((c, j) => { c.classList.remove('ok', 'tone', 'miss', 'hl'); if (marks[j]) c.classList.add(marks[j]); }); };
  const badge = s => `<span class="score ${s >= 80 ? 'good' : s >= 50 ? 'mid' : 'bad'}">${s}%</span>`;

  // ── Ghi âm từng câu ──
  root.onclick = async e => {
    const a = e.target.closest('[data-goto]'); if (a) { e.preventDefault(); const el = srows[+a.dataset.goto]; el.scrollIntoView({ block: 'center', behavior: 'smooth' }); el.classList.add('flash-row'); setTimeout(() => el.classList.remove('flash-row'), 1600); return; }
    const pl = e.target.closest('.sp-play'); if (pl) { const el = pl.closest('.sp-row'); speak(el.dataset.zh, { el, rate: +$('#pRate', root).value, onBoundary: hlBoundary(el) }); return; }
    const mic = e.target.closest('.sp-mic'); if (!mic) return;
    const el = mic.closest('.sp-row'), out = $('.sp-res', el);
    if (mic.classList.contains('rec')) return;
    mic.classList.add('rec'); out.innerHTML = '<span class="muted">Đang nghe… đọc to câu này</span>';
    try {
      const said = await recognizeOnce();
      const best = said.map(s => ({ s, ...align(el.dataset.zh, s) })).sort((a, b) => b.score - a.score)[0];
      if (!best || !best.s) { out.innerHTML = '<span class="muted">Không nghe rõ, hãy thử lại gần micro hơn.</span>'; }
      else { paint(el, best.marks); out.innerHTML = `${badge(best.score)} <span class="muted small">Máy nghe được:</span> <span lang="zh-CN">${esc(best.s)}</span>`; logActivity(); }
    } catch (err) { out.innerHTML = `<span class="bad-t">${esc(err.message)}</span>`; }
    mic.classList.remove('rec');
  };

  // ── Ghi âm cả bài: nhận dạng liên tục + thu âm để nghe lại ──
  let rec = null;
  $('#rStart', root).onclick = async () => {
    stopSeq();
    $('#rOut', root).innerHTML = ''; srows.forEach(r => { paint(r, []); $('.sp-res', r).innerHTML = ''; });
    rec = await startSession($('#rLive', root), $('#rTime', root));
    if (!rec) return;
    $('#rStart', root).disabled = true; $('#rStop', root).disabled = false;
  };
  $('#rStop', root).onclick = async () => {
    if (!rec) return;
    $('#rStop', root).disabled = true; $('#rStart', root).disabled = false;
    const { transcript, audioUrl } = await rec.stop(); rec = null;
    $('#rLive', root).innerHTML = '';
    const out = $('#rOut', root);
    if (!SR) { out.innerHTML = audioUrl ? `<p>Nghe lại giọng của bạn:</p><audio controls src="${audioUrl}"></audio>` : ''; return; }
    if (!transcript.trim()) { out.innerHTML = '<p class="bad-t">Không nhận được giọng nói. Hãy kiểm tra micro và đọc to, rõ hơn.</p>' + (audioUrl ? `<audio controls src="${audioUrl}"></audio>` : ''); return; }
    const all = x.s.map(s => s[0]).join('');
    const r = align(all, transcript);
    const per = srows.map(el => { const from = +el.dataset.from, n = +el.dataset.n; const m = r.marks.slice(from, from + n); paint(el, m); const sc = n ? Math.round((m.filter(v => v === 'ok').length + m.filter(v => v === 'tone').length * 0.5) / n * 100) : 100; $('.sp-res', el).innerHTML = badge(sc); return { el, sc, i: +el.dataset.i }; });
    const weak = per.filter(p => p.sc < 70);
    store.update(s => { s.speakBest = s.speakBest || {}; s.speakBest[x.id] = Math.max(s.speakBest[x.id] || 0, r.score); });
    logActivity(5);
    out.innerHTML = `<div class="sp-sum">
      <div class="score-ring" style="--p:${r.score}"><span>${r.score}%</span></div>
      <div><h3>${r.score >= 85 ? 'Rất tốt! Phát âm rõ ràng.' : r.score >= 65 ? 'Khá tốt, luyện thêm vài câu nữa nhé.' : 'Cần luyện thêm – hãy nghe mẫu rồi đọc chậm, rõ từng chữ.'}</h3>
        <p>Đọc đúng <b>${r.ok}</b>/${total} chữ · gần đúng <b>${r.tone}</b> · thiếu/sai <b>${total - r.ok - r.tone}</b>. Điểm cao nhất: <b>${store.s.speakBest[x.id]}%</b></p>
        ${audioUrl ? `<p class="small muted">Nghe lại giọng của bạn rồi so với giọng mẫu:</p><audio controls src="${audioUrl}"></audio>` : ''}
      </div></div>
      ${weak.length ? `<h3 class="sub">Câu nên luyện lại (${weak.length})</h3><ul class="weak">${weak.map(p => `<li><a href="#" data-goto="${p.i}">Câu ${p.i + 1}: <span lang="zh-CN">${esc(x.s[p.i][0])}</span></a> ${badge(p.sc)}</li>`).join('')}</ul>` : '<p class="ok-t">Không có câu nào dưới 70%. Giỏi lắm!</p>'}
      <details class="small"><summary>Văn bản máy nghe được</summary><p lang="zh-CN">${esc(transcript)}</p></details>
      <p class="muted small">Lưu ý: chấm điểm dựa trên nhận dạng giọng nói của trình duyệt, chỉ mang tính tham khảo. Chữ màu cam thường là chữ đồng âm hoặc cần kiểm tra lại thanh điệu.</p>`;
    out.scrollIntoView({ behavior: 'smooth' });
  };
  typingTrainer($('#typing', root), { key: 'sp' + x.id, sentences: x.s });
  renderStudy($('#study', root), x);
  return `Luyện nói: ${x.q}`;
}

// Nhận dạng một câu (trả về các phương án)
function recognizeOnce() {
  return new Promise((res, rej) => {
    if (!SR) return rej(new Error('Trình duyệt không hỗ trợ nhận dạng giọng nói (hãy dùng Chrome hoặc Edge).'));
    stopSeq();
    const r = new SR(); r.lang = 'zh-CN'; r.interimResults = false; r.maxAlternatives = 5;
    let got = false;
    r.onresult = e => { got = true; res([...e.results[0]].map(a => a.transcript)); };
    r.onerror = e => rej(new Error(e.error === 'not-allowed' ? 'Bạn chưa cho phép dùng micro.' : e.error === 'no-speech' ? 'Không nghe thấy giọng nói, hãy thử lại.' : 'Lỗi nhận dạng: ' + e.error));
    r.onend = () => { if (!got) res([]); };
    r.start();
  });
}

// Phiên ghi âm cả bài: nhận dạng liên tục (tự khởi động lại khi trình duyệt ngắt) + MediaRecorder
async function startSession(live, timeEl) {
  let stream = null, mr = null, chunks = [];
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    if (window.MediaRecorder) { mr = new MediaRecorder(stream); mr.ondataavailable = e => e.data.size && chunks.push(e.data); mr.start(); }
  } catch (e) {
    if (!SR) { toast('Không truy cập được micro. Hãy cho phép quyền micro.', 'bad'); return null; }
  }
  let finals = '', interim = '', running = true, r = null;
  const t0 = Date.now(); const tick = setInterval(() => { const s = Math.floor((Date.now() - t0) / 1000); timeEl.textContent = `⏺ ${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; }, 500);
  const show = () => { live.innerHTML = `<span lang="zh-CN">${esc(finals)}</span><span class="muted" lang="zh-CN">${esc(interim)}</span>` || ''; live.scrollTop = live.scrollHeight; };
  const begin = () => {
    if (!SR || !running) return;
    r = new SR(); r.lang = 'zh-CN'; r.continuous = true; r.interimResults = true;
    r.onresult = e => { interim = ''; for (let i = e.resultIndex; i < e.results.length; i++) { const t = e.results[i][0].transcript; if (e.results[i].isFinal) finals += t; else interim += t; } show(); };
    r.onerror = e => { if (e.error === 'not-allowed') { running = false; toast('Bạn chưa cho phép dùng micro.', 'bad'); } };
    r.onend = () => { if (running) setTimeout(begin, 150); };
    try { r.start(); } catch {}
  };
  begin();
  live.innerHTML = '<span class="muted">Đang ghi âm… hãy đọc to bài nói.</span>';
  return {
    stop: () => new Promise(res => {
      running = false; clearInterval(tick); timeEl.textContent = '';
      try { r && r.stop(); } catch {}
      const finish = () => { stream && stream.getTracks().forEach(t => t.stop()); const audioUrl = chunks.length ? URL.createObjectURL(new Blob(chunks, { type: chunks[0].type || 'audio/webm' })) : ''; setTimeout(() => res({ transcript: finals + interim, audioUrl }), 50); };
      if (mr && mr.state !== 'inactive') { mr.onstop = () => setTimeout(finish, 400); mr.stop(); } else setTimeout(finish, 600);
    }),
  };
}

// ════════════ Từ mới · Cấu trúc · Thẻ lật · Tự đặt câu ════════════
const knownOf = id => (store.s.spKnown || {})[id] || {};
function setKnown(id, h, v) { store.update(s => { s.spKnown = s.spKnown || {}; s.spKnown[id] = s.spKnown[id] || {}; s.spKnown[id][h] = v; }); }
const sentWith = (x, h) => x.s.filter(([zh]) => zh.includes(h));

function renderStudy(box, x) {
  const v = SPEAK_VOCAB[x.id] || { w: [], g: [] };
  const words = v.w.map(([h, p, vi]) => ({ h, p, vi }));
  box.innerHTML = `
  <section class="card vs-sec"><div class="row gap wrap" style="justify-content:space-between"><h2>📘 Từ vựng trong bài <small class="muted">(${words.length})</small></h2><span class="muted small" id="wkc"></span></div>
    <p class="muted small">Học như Quizlet: xem danh sách kèm 5 câu ví dụ mỗi từ, lật thẻ, học trắc nghiệm, làm bài kiểm tra và chơi trò chơi. Từ đánh dấu ✓/✗ được lưu trên trình duyệt.</p>
    <div id="vsBox"></div></section>
  <section class="card"><h2>🧩 Cấu trúc ngữ pháp trong bài <small class="muted">(${v.g.length})</small></h2>
    <div class="gs-list">${v.g.map(([f, ex, s, gid]) => { const g = gid && grammarById(gid); return `<div class="gs"><div class="gs-f" lang="zh-CN">${esc(f)}</div><div class="gs-x">${esc(ex)}${g ? ` · <a href="#/grammar/${g.id}">Xem bài ngữ pháp</a>` : ''}</div>${sentence(s, x.s.find(([zh]) => zh === s)?.[1] || '')}</div>`; }).join('')}</div></section>
  <section class="card" id="msSec"><h2>✍️ Tự đặt 5 câu & ghi âm</h2>
    <p class="muted small">Chọn một từ, tự viết 5 câu có dùng từ đó, bấm “Kiểm tra” để máy soát lỗi, rồi bấm 🎤 đọc to câu bạn viết – máy so giọng đọc với câu đã viết và cho bạn nghe lại. Câu viết được lưu trên trình duyệt; bản ghi âm chỉ giữ trong phiên này.</p>
    <label class="sel">Từ <select id="msWord" class="inp"></select></label><div id="msBox"></div></section>`;

  const drawCount = () => { const k = knownOf(x.id); $('#wkc', box).textContent = `Đã thuộc ${words.filter(w => k[w.h] === true).length}/${words.length}`; };
  drawCount();
  vocabSet($('#vsBox', box), words, {
    id: x.id, sent: x.s, known: () => knownOf(x.id), setKnown: (h, val) => setKnown(x.id, h, val),
    onChange: () => { drawCount(); drawMsOptions(); },
    onPractice: h => { $('#msWord', box).value = h; drawMs(); $('#msSec', box).scrollIntoView({ behavior: 'smooth' }); },
  });

  // ── tự đặt câu ──
  const drawMsOptions = () => {
    const k = knownOf(x.id), cur = $('#msWord', box).value;
    const sorted = [...words].sort((a, b) => (k[a.h] === false ? 0 : 1) - (k[b.h] === false ? 0 : 1));
    $('#msWord', box).innerHTML = sorted.map(w => `<option value="${esc(w.h)}">${k[w.h] === false ? '✗ ' : k[w.h] === true ? '✓ ' : ''}${esc(w.h)} (${esc(w.p)}) – ${esc(w.vi)}</option>`).join('');
    if (cur) $('#msWord', box).value = cur;
  };
  const drawMs = () => {
    const h = $('#msWord', box).value, w = words.find(z => z.h === h); if (!w) return;
    const mine = (store.s.mySent || {})[h] || [];
    const ref = sentWith(x, h)[0];
    const refs = ex5(h, sentWith(x, h));
    $('#msBox', box).innerHTML = `${ref ? `<div class="ms-ref"><span class="muted small">Câu mẫu trong bài:</span>${sentence(ref[0], ref[1])}</div>` : ''}
      <details class="vs-det"><summary>📖 Xem 5 câu ví dụ với “${esc(h)}” để tham khảo</summary><div class="ex-box">${refs.map(([zh, vi]) => exampleHtml(zh, vi)).join('')}</div></details>
      ${[0, 1, 2, 3, 4].map(n => `<div class="ms-row" data-n="${n}">
        <span class="ms-no">${n + 1}</span>
        <div class="ms-main"><input class="inp ms-in" lang="zh-CN" placeholder="Viết câu có từ “${esc(h)}”…" value="${esc(mine[n] || '')}">
          <div class="ms-py muted small"></div><div class="ms-out"></div></div>
        <div class="ms-act"><button class="mini ms-chk">Kiểm tra</button><button class="say ms-say" title="Nghe câu của bạn" aria-label="Nghe câu của bạn">${icon('vol')}</button><button class="say ms-rec" title="Ghi âm" aria-label="Ghi âm">${icon('mic')}</button></div>
      </div>`).join('')}
      <p class="muted small" id="msDone"></p>`;
    const done = () => { const arr = (store.s.mySent || {})[h] || []; const n = arr.filter(t => t && t.includes(h)).length; $('#msDone', box).textContent = `Đã viết ${n}/5 câu có dùng “${h}”.`; };
    $$('.ms-row', box).forEach(row => { const inp = $('.ms-in', row); const upd = () => { $('.ms-py', row).textContent = inp.value.trim() ? sentencePinyin(inp.value.trim()) : ''; }; upd();
      inp.oninput = () => { upd(); store.update(s => { s.mySent = s.mySent || {}; const a = s.mySent[h] || []; a[+row.dataset.n] = inp.value.trim(); s.mySent[h] = a; }); done(); }; });
    done();
  };
  drawMsOptions(); $('#msWord', box).value = (words.find(w => knownOf(x.id)[w.h] === false) || words[0] || {}).h || ''; drawMs();
  $('#msWord', box).onchange = drawMs;

  box.addEventListener('click', async e => {
    const row = e.target.closest('.ms-row'); if (!row) return;
    const h = $('#msWord', box).value, inp = $('.ms-in', row), t = inp.value.trim(), out = $('.ms-out', row);
    if (e.target.closest('.ms-say')) { if (t) speak(t); return; }
    if (e.target.closest('.ms-chk')) {
      if (!t) { out.innerHTML = '<span class="muted">Hãy viết một câu trước.</span>'; return; }
      const { issues } = checkSentence(t);
      out.innerHTML = `${t.includes(h) ? `<span class="ok-t">✓ Có dùng “${esc(h)}”</span>` : `<span class="bad-t">✗ Câu chưa có từ “${esc(h)}”</span>`}
        ${issues.length ? `<ul class="ms-iss">${issues.map(i => `<li class="${i.info ? 'info' : 'warn'}">${esc(i.msg)}</li>`).join('')}</ul>` : ' <span class="ok-t">· Không phát hiện lỗi phổ biến</span>'}`;
      return;
    }
    const rb = e.target.closest('.ms-rec'); if (!rb) return;
    if (!t) { out.innerHTML = '<span class="muted">Hãy viết câu trước rồi ghi âm.</span>'; return; }
    if (rb.classList.contains('rec')) { rb._stop && rb._stop(); return; }
    rb.classList.add('rec'); out.innerHTML = '<span class="muted">Đang ghi âm… đọc to câu bạn vừa viết' + (SR ? '' : ', bấm lại micro để dừng') + '</span>';
    try {
      const r = await recordClip(rb);
      let html = '';
      if (r.alts && r.alts.length) { const best = r.alts.map(a => ({ a, ...align(t, a) })).sort((p, q) => q.score - p.score)[0]; html += `<span class="score ${best.score >= 80 ? 'good' : best.score >= 50 ? 'mid' : 'bad'}">${best.score}%</span> <span class="muted small">Máy nghe được:</span> <span lang="zh-CN">${esc(best.a)}</span>`; }
      else if (SR) html += '<span class="muted">Không nghe rõ, hãy thử lại.</span>';
      if (r.url) html += `<audio controls src="${r.url}"></audio>`;
      out.innerHTML = html; logActivity(2);
    } catch (err) { out.innerHTML = `<span class="bad-t">${esc(err.message)}</span>`; }
    rb.classList.remove('rec');
  });
}

// Ghi một đoạn ngắn: nhận dạng giọng nói (nếu có) + thu âm để nghe lại
async function recordClip(btn) {
  let stream = null, mr = null, chunks = [];
  try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); if (window.MediaRecorder) { mr = new MediaRecorder(stream); mr.ondataavailable = e => e.data.size && chunks.push(e.data); mr.start(); } }
  catch { if (!SR) throw new Error('Không truy cập được micro. Hãy cho phép quyền micro.'); }
  const stopRec = () => new Promise(res => { const fin = () => { stream && stream.getTracks().forEach(t => t.stop()); res(chunks.length ? URL.createObjectURL(new Blob(chunks, { type: chunks[0].type || 'audio/webm' })) : ''); }; if (mr && mr.state !== 'inactive') { mr.onstop = fin; mr.stop(); } else fin(); });
  if (SR) { let alts = []; try { alts = await recognizeOnce(); } finally { var url = await stopRec(); } return { alts, url }; }
  await new Promise(res => { btn._stop = res; setTimeout(res, 15000); });
  btn._stop = null;
  return { alts: [], url: await stopRec() };
}
