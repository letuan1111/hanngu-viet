// Luyện nói theo chủ đề: bài nói mẫu ~300 chữ, bật/tắt pinyin & nghĩa, đổi phông, nghe mẫu, ghi âm và chấm từng chữ
import { store, logActivity } from '../core/store.js';
import { SPEAK_GROUPS, SPEAK_ITEMS } from '../data/speaking.js';
import { segment, charPinyins, isHan } from '../core/dict.js';
import { esc, icon, $, $$, toast, applyDisplay } from '../core/ui.js';
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
