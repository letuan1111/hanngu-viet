// Luyện gõ lại bài đọc: chạy từng câu, gõ đúng đến đâu chữ biến mất đến đó; có đồng hồ, chữ/phút, từ/phút, độ chính xác
import { store, logActivity } from '../core/store.js';
import { segment, charPinyins, isHan } from '../core/dict.js';
import { esc, icon, $, toast, recAudio, sentence, grammarInText, structsInText, quickSaveOn, setQuickSave } from '../core/ui.js';
import { speak } from '../core/tts.js';
import { AI_DEFAULT, aiModelOptions, aiPreload, aiLong, toPcm16k, recordVoice, alignZh, onAIStatus } from '../core/ai.js';

const tone = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ü/g, 'v');
const isKeyable = c => isHan(c) || /[0-9a-zA-Z]/.test(c);
const normHan = s => [...s].filter(isKeyable).join('').toLowerCase();
const normPy = s => tone(s).replace(/[^a-z0-9]/g, '');
const eq = (typed, key) => typed === key || (key === 'v' && typed === 'u');
const fmt = ms => { const s = Math.floor(ms / 1000); return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; };

// Tách văn bản tự soạn thành câu
export function splitSentences(text) {
  return text.replace(/\r/g, '').split(/(?<=[。！？!?；;…])|\n+/).map(s => s.trim()).filter(s => [...s].some(isHan));
}

function buildUnits(zh) {
  const pys = charPinyins([...zh].filter(isHan).join('')) || [];
  let k = 0;
  const units = [...zh].map(c => {
    if (isHan(c)) { const p = pys[k++] || ''; return { c, py: p, kh: c, kp: normPy(p) }; }
    if (/[0-9a-zA-Z]/.test(c)) return { c, py: '', kh: c.toLowerCase(), kp: c.toLowerCase() };
    return { c, py: '', kh: '', kp: '' };
  });
  // ranh giới từ để tính từ/phút
  let i = 0; const wordEnds = [];
  for (const t of segment(zh)) { const n = [...t.t].length; if (t.han) wordEnds.push(i + n); i += n; }
  return { units, wordEnds, han: units.filter(u => isHan(u.c)).length };
}

// Bảng tra: mỗi từ bấm được (nghĩa, cấp độ, ngữ pháp liên quan), mỗi câu liệt kê điểm ngữ pháp có trong câu
export function analyzeHtml(sentences) {
  const all = sentences.map(x => x[0]).join('');
  const gAll = grammarInText(all), sAll = structsInText(all);
  return `<div class="ty-save"><label class="chk"><input type="checkbox" class="ty-qs" ${quickSaveOn() ? 'checked' : ''}> ⚡ Bấm vào từ là <b>lưu ngay vào Ôn tập</b></label> <span class="muted small">· Muốn lưu một <b>cụm từ</b>: bôi đen cụm đó → bấm “⭐ Lưu cụm này”. Từ đã lưu được gạch chân vàng. <a href="#/review/mine">Xem từ đã lưu (Ôn tập › ⭐ Từ tôi đã thêm)</a></span></div>
    <div class="ty-gsum"><b>📐 Ngữ pháp trong đoạn (${gAll.length}):</b> ${gAll.map(g => `<a class="chip" href="#/grammar/${g.id}" title="${esc(g.formula || '')}">HSK${g.level} · ${esc(g.name)}</a>`).join(' ') || '<span class="muted">không tìm thấy</span>'}
    ${sAll.length ? `<div style="margin-top:6px"><b>🧩 Cấu trúc câu:</b> ${sAll.map(t => `<span class="chip" lang="zh-CN" title="${esc(t.vi)}">${esc(t.f)}</span>`).join(' ')}</div>` : ''}</div>
    ${sentences.map(([zh, vi]) => { const gs = grammarInText(zh).filter(g => g.level >= 2); return sentence(zh, vi, { extra: gs.length ? `<div class="ty-sg small">📐 ${gs.map(g => `<a href="#/grammar/${g.id}">${esc(g.name)}</a>`).join(' · ')}</div>` : '' }); }).join('')}`;
}

/**
 * @param el   phần tử chứa
 * @param o    { key: mã lưu kỷ lục, sentences: [[zh, vi]], openAnalyze: mở sẵn phần tra từ }
 */
export function typingTrainer(el, o) {
  const opt = store.s.typeOpt || { mode: 'han', py: true, vi: true };
  const saveOpt = () => store.update(s => { s.typeOpt = { ...opt }; });
  el.innerHTML = `
    <div class="ty-opts row gap wrap">
      <span class="seg" role="radiogroup" aria-label="Cách gõ"><label><input type="radio" name="tyMode" value="han" ${opt.mode === 'han' ? 'checked' : ''}><span>Gõ chữ Hán (bộ gõ tiếng Trung)</span></label><label><input type="radio" name="tyMode" value="py" ${opt.mode === 'py' ? 'checked' : ''}><span>Gõ pinyin (không cần dấu)</span></label></span>
      <label class="sw"><input type="checkbox" class="tyPy" ${opt.py ? 'checked' : ''}><span></span> Pinyin</label>
      <label class="sw"><input type="checkbox" class="tyVi" ${opt.vi ? 'checked' : ''}><span></span> Tiếng Việt</label>
    </div>
    <div class="ty-run"></div>
    <details class="vs-det ty-an"><summary>📖 Tra từ & ngữ pháp trong đoạn này <small class="muted">(bấm vào từng từ để xem nghĩa, cấp HSK và ngữ pháp liên quan)</small></summary><div class="ty-anBody"></div></details>`;
  const run = $('.ty-run', el);
  const sentences = o.sentences, srcKey = o.key; let timer = 0;
  el.querySelectorAll('[name=tyMode]').forEach(r => r.onchange = () => { opt.mode = r.value; saveOpt(); start(); });
  $('.tyPy', el).onchange = e => { opt.py = e.target.checked; saveOpt(); run.classList.toggle('no-py', !opt.py); };
  $('.tyVi', el).onchange = e => { opt.vi = e.target.checked; saveOpt(); run.classList.toggle('no-vi', !opt.vi); };
  const stopTimer = () => { clearInterval(timer); timer = 0; };

  // Phân tích đoạn: mỗi từ bấm được (nghĩa, cấp độ, ngữ pháp liên quan), mỗi câu liệt kê điểm ngữ pháp có trong câu
  function analyze() {
    const box = $('.ty-anBody', el), det = $('.ty-an', el);
    if (o.openAnalyze) det.open = true;
    box.innerHTML = analyzeHtml(sentences);
  }
  el.addEventListener('change', e => { if (e.target.classList.contains('ty-qs')) setQuickSave(e.target.checked); });
  function start() {
    stopTimer(); analyze();
    const mode = opt.mode;
    const data = sentences.map(([zh, vi]) => ({ zh, vi, ...buildUnits(zh) }));
    const totalHan = data.reduce((s, d) => s + d.han, 0), totalWords = data.reduce((s, d) => s + d.wordEnds.length, 0);
    let si = 0, t0 = 0, doneHan = 0, doneWords = 0, good = 0, errs = 0, lastErrLen = -1, composing = false;
    run.className = `ty-run ${opt.py ? '' : 'no-py'} ${opt.vi ? '' : 'no-vi'}`;
    run.innerHTML = `
      <div class="ty-stats"><span>⏱ <b class="ty-t">00:00</b></span><span><b class="ty-cpm">0</b> chữ/phút</span><span><b class="ty-wpm">0</b> từ/phút</span><span>Chính xác <b class="ty-acc">100%</b></span><span>Câu <b class="ty-si">1</b>/${data.length}</span></div>
      <div class="bar"><i class="ty-bar" style="width:0"></i></div>
      <div class="ty-stage"><div class="ty-cur" lang="zh-CN" aria-live="polite"></div><div class="ty-vi"></div><div class="ty-next" lang="zh-CN"></div></div>
      <div class="ty-inrow"><input class="inp ty-inp" ${mode === 'han' ? 'lang="zh-CN"' : ''} autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="${mode === 'han' ? 'Gõ chữ Hán của câu trên…' : 'Gõ pinyin của câu trên, ví dụ: wo jiao xiaoming'}">
        <button class="say ty-say" title="Nghe câu này" aria-label="Nghe câu này">${icon('vol')}</button><button class="say ty-mic" title="Đọc to câu này – AI chấm phát âm" aria-label="Đọc to câu này để AI chấm">${icon('mic')}</button></div>
      <div class="row gap wrap ty-btns"><button class="mini ty-skip">Bỏ qua câu này</button><button class="mini ty-reset">↺ Bắt đầu lại</button><span class="muted small">${mode === 'han' ? 'Dấu câu được bỏ qua tự động. Đồng hồ chạy khi bạn gõ phím đầu tiên.' : 'Không cần gõ dấu thanh và dấu câu; “ü” gõ là v hoặc u.'}</span></div>
      <div class="ty-ai">
        <div class="row gap wrap" style="align-items:center"><b>🤖 AI chấm đọc</b>
          <button class="btn sm ty-rd1">${icon('mic')} Đọc câu này</button><button class="btn sm ghost ty-rdall">${icon('mic')} Đọc cả đoạn</button>
          <label class="sel small">AI <select class="ty-model">${aiModelOptions(store.s.aiModel || AI_DEFAULT)}</select></label>
          <span class="tp-vu"><span class="ty-vu"></span></span><span class="muted small ty-aiT"></span></div>
        <p class="muted small">Đọc to câu đang gõ (hoặc cả đoạn), nói xong im khoảng 1,5 giây là máy tự dừng. AI Whisper chạy ngay trên máy nghe lại và tô màu từng chữ: <span class="lg ok">đúng</span> <span class="lg tone">gần đúng – kiểm tra thanh điệu</span> <span class="lg miss">thiếu hoặc sai</span>.</p>
        <div class="small ai-status ty-aiS"></div><div class="ty-aiOut"></div>
      </div>
      <div class="ty-out"></div>`;
    const inp = $('.ty-inp', run), cur = $('.ty-cur', run);
    const kOf = u => mode === 'han' ? u.kh : u.kp;
    const drawSentence = () => {
      const d = data[si];
      cur.innerHTML = d.units.map((u, i) => `<span class="tu ${kOf(u) ? '' : 'pn'}" data-i="${i}"><span class="tp">${esc(u.py)}</span><span class="tz">${esc(u.c)}</span></span>`).join('');
      $('.ty-vi', run).textContent = d.vi || '';
      $('.ty-next', run).textContent = data[si + 1] ? 'Câu tiếp: ' + data[si + 1].zh : '';
      $('.ty-si', run).textContent = si + 1;
      inp.value = ''; lastErrLen = -1; update();
    };
    const stats = () => {
      const ms = t0 ? performance.now() - t0 : 0, min = ms / 60000;
      $('.ty-t', run).textContent = fmt(ms);
      $('.ty-cpm', run).textContent = min > 0.02 ? Math.round(doneHan / min) : 0;
      $('.ty-wpm', run).textContent = min > 0.02 ? Math.round(doneWords / min) : 0;
      $('.ty-acc', run).textContent = good + errs ? Math.round(good / (good + errs) * 100) + '%' : '100%';
      $('.ty-bar', run).style.width = (doneHan / Math.max(1, totalHan) * 100) + '%';
    };
    let sentHan = 0, sentWords = 0; // phần đã gõ trong câu hiện tại
    function update(fromInput) {
      const d = data[si]; if (!d) return;
      const typed = mode === 'han' ? normHan(inp.value) : normPy(inp.value);
      // so khớp tiền tố
      let p = 0, ui = 0, within = 0;
      const ends = []; let acc = 0; d.units.forEach(u => { acc += kOf(u).length; ends.push(acc); });
      const K = d.units.map(kOf).join('');
      while (p < typed.length && p < K.length && eq(typed[p], K[p])) p++;
      const wrong = typed.length > p;
      if (fromInput && wrong && typed.length > lastErrLen) { errs++; lastErrLen = typed.length; }
      if (!wrong) lastErrLen = -1;
      // đơn vị hoàn thành: đã gõ hết khóa; dấu câu đứng ngay sau phần đã gõ cũng biến mất
      let doneIdx = -1;
      for (let i = 0; i < d.units.length; i++) { if (ends[i] <= p && (kOf(d.units[i]) || i === 0 || doneIdx === i - 1)) doneIdx = i; else break; }
      const spans = cur.children;
      for (let i = 0; i < spans.length; i++) { spans[i].classList.toggle('gone', i <= doneIdx); spans[i].classList.remove('err', 'next'); }
      const nextI = doneIdx + 1; if (spans[nextI]) spans[nextI].classList.add(wrong ? 'err' : 'next');
      inp.classList.toggle('bad', wrong);
      sentHan = d.units.slice(0, doneIdx + 1).filter(u => isHan(u.c)).length;
      sentWords = d.wordEnds.filter(e => e <= doneIdx + 1).length;
      const baseHan = data.slice(0, si).reduce((s, x) => s + x.han, 0), baseW = data.slice(0, si).reduce((s, x) => s + x.wordEnds.length, 0);
      doneHan = baseHan + sentHan; doneWords = baseW + sentWords;
      good = data.slice(0, si).reduce((s, x) => s + x.units.map(kOf).join('').length, 0) + p;
      stats();
      if (p >= K.length && K.length) { cur.classList.add('ty-flash'); setTimeout(() => cur.classList.remove('ty-flash'), 300); si++; if (si >= data.length) return finish(); setTimeout(drawSentence, 120); }
    }
    inp.addEventListener('compositionstart', () => { composing = true; });
    inp.addEventListener('compositionend', () => { composing = false; onType(); });
    inp.addEventListener('input', e => { if (composing || e.isComposing) return; onType(); });
    function onType() {
      if (!t0) { t0 = performance.now(); timer = setInterval(() => { if (!el.isConnected) return stopTimer(); stats(); }, 250); }
      update(true);
    }
    $('.ty-say', run).onclick = () => data[si] && speak(data[si].zh);
    // ── AI chấm đọc: đọc to câu đang gõ hoặc cả đoạn ──
    const aiOut = $('.ty-aiOut', run), aiS = $('.ty-aiS', run);
    const offS = onAIStatus(h => { if (aiS.isConnected) aiS.innerHTML = h; else offS(); });
    $('.ty-model', run).onchange = e => store.update(s => { s.aiModel = e.target.value; });
    let ctl = null, busyBtn = null;
    const colored = (zh, marks) => { let k = 0; return [...zh].map(c => isHan(c) ? `<span class="cz ${marks[k++] || ''}">${esc(c)}</span>` : `<span class="pn">${esc(c)}</span>`).join(''); };
    const badgeH = sc => `<span class="score ${sc >= 80 ? 'good' : sc >= 50 ? 'mid' : 'bad'}">${sc}%</span>`;
    async function readCheck(btn, targets) {
      if (ctl) { ctl.stop(); return; }
      if (!targets.length) return;
      const model = $('.ty-model', run).value; aiPreload(model);
      try { ctl = await recordVoice({ maxSec: targets.length > 1 ? 240 : 40, silenceSec: targets.length > 1 ? 2.5 : 1.5, onLevel: v => { $('.ty-vu', run).style.width = Math.min(100, v / 0.15 * 100) + '%'; }, onTime: t => { $('.ty-aiT', run).textContent = `⏺ ${t.toFixed(0)} giây`; } }); }
      catch { toast('Cần cho phép dùng micro.', 'bad'); return; }
      busyBtn = btn; const lbl = btn.innerHTML; btn.classList.add('rec'); btn.innerHTML = '⏹ Đang nghe – bấm để dừng';
      $('.ty-mic', run).classList.add('rec');
      aiOut.innerHTML = `<p class="muted">🎤 Hãy đọc to: <span lang="zh-CN">${esc(targets.length > 1 ? targets[0] + '…' : targets[0])}</span></p>`;
      const { blob, voiced } = await ctl.done; ctl = null;
      btn.classList.remove('rec'); btn.innerHTML = lbl; $('.ty-mic', run).classList.remove('rec'); $('.ty-vu', run).style.width = '0'; $('.ty-aiT', run).textContent = '';
      const url = URL.createObjectURL(blob);
      if (!voiced) { aiOut.innerHTML = `<p class="bad-t">Không nghe thấy giọng đọc – hãy đọc to hơn, gần micro.</p>${recAudio(url)}`; return; }
      aiOut.innerHTML = `<p class="muted">🤖 AI đang nghe bản ghi…</p>${recAudio(url)}`;
      let said = '';
      try { said = (await aiLong(await toPcm16k(await blob.arrayBuffer()), model)).map(l => l.zh).join(''); }
      catch (e) { aiOut.innerHTML = `<p class="bad-t">AI không chạy được (${esc(e.message || e)}).</p>${recAudio(url)}`; return; }
      if (!said) { aiOut.innerHTML = `<p class="bad-t">AI không nhận ra chữ nào rõ ràng.</p>${recAudio(url)}`; return; }
      const all = targets.join(''), r = alignZh(all, said);
      let k0 = 0;
      const per = targets.map(z => { const n = [...z].filter(isHan).length, m = r.marks.slice(k0, k0 + n); k0 += n; const sc = n ? Math.round((m.filter(v => v === 'ok').length + m.filter(v => v === 'tone').length * 0.5) / n * 100) : 100; return { z, m, sc }; });
      aiOut.innerHTML = `<div class="ty-aiRes"><div class="row gap wrap" style="align-items:center">${badgeH(r.score)} <span>Đúng <b>${r.ok}</b> · gần đúng <b>${r.tone}</b> / ${r.marks.length} chữ</span><span class="grow"></span><button class="mini ty-aiClr">🗑️ Xóa</button></div>
        <div class="ty-aiLines">${per.map(p => `<div class="ty-aiL"><span lang="zh-CN" class="ty-aiZ">${colored(p.z, p.m)}</span> ${targets.length > 1 ? badgeH(p.sc) : ''}</div>`).join('')}</div>
        <div class="small"><span class="muted">🤖 AI nghe được:</span> <span lang="zh-CN">${esc(said)}</span></div>${recAudio(url)}</div>`;
      $('.ty-aiClr', aiOut).onclick = () => { try { URL.revokeObjectURL(url); } catch {} aiOut.innerHTML = ''; };
      logActivity(2);
    }
    $('.ty-rd1', run).onclick = e => readCheck(e.currentTarget, data[si] ? [data[si].zh] : []);
    $('.ty-mic', run).onclick = () => readCheck($('.ty-rd1', run), data[si] ? [data[si].zh] : []);
    $('.ty-rdall', run).onclick = e => readCheck(e.currentTarget, data.map(x => x.zh));
    $('.ty-skip', run).onclick = () => { si++; if (si >= data.length) finish(); else drawSentence(); inp.focus(); };
    $('.ty-reset', run).onclick = () => { start(); $('.ty-inp', el)?.focus(); };
    function finish() {
      stopTimer();
      const ms = t0 ? performance.now() - t0 : 0, min = Math.max(ms / 60000, 1 / 60);
      const cpm = Math.round(doneHan / min), wpm = Math.round(doneWords / min), accu = good + errs ? Math.round(good / (good + errs) * 100) : 100;
      const k = `${srcKey}:${mode}`, prev = (store.s.typeBest || {})[k];
      const rec = !prev || cpm > prev.cpm;
      if (rec && doneHan) store.update(s => { s.typeBest = s.typeBest || {}; s.typeBest[k] = { cpm, wpm, acc: accu, ms, at: Date.now() }; });
      logActivity(3);
      run.innerHTML = `<div class="ty-end"><div class="ty-big"><b>${cpm}</b><span>chữ/phút</span></div><div class="ty-big"><b>${wpm}</b><span>từ/phút</span></div><div class="ty-big"><b>${accu}%</b><span>chính xác</span></div><div class="ty-big"><b>${fmt(ms)}</b><span>thời gian</span></div></div>
        <p class="ty-msg">${rec && doneHan ? '🏆 Kỷ lục mới cho bài này!' : `Kỷ lục của bạn: <b>${prev.cpm}</b> chữ/phút · ${prev.wpm} từ/phút · ${prev.acc}%`} <span class="muted small">(gõ ${mode === 'han' ? 'chữ Hán' : 'pinyin'} · ${doneHan}/${totalHan} chữ · ${doneWords}/${totalWords} từ · ${errs} lần gõ sai)</span></p>
        <button class="btn ty-again">↺ Gõ lại</button>`;
      $('.ty-again', run).onclick = () => { start(); $('.ty-inp', el)?.focus(); };
    }
    drawSentence();
  }
  start();
}

// ════════════ Trang Đánh máy: tự nhập nội dung, mỗi từ bấm vào xem nghĩa, rồi luyện gõ ════════════
export function typingPage(root) {
  root.innerHTML = `<div class="page-head"><div><p class="eyebrow">Tự nhập nội dung</p><h1>⌨️ Đánh máy</h1></div></div>
  <section class="card tp-in">
    <p class="muted small">Dán hoặc tự viết một đoạn tiếng Trung (tối đa 3.000 ký tự). Ngay bên dưới, <b>mỗi từ bạn nhập đều bấm vào được</b> để xem nghĩa, pinyin, cấp HSK, ngữ pháp liên quan và lưu vào Ôn tập. Nội dung được lưu trên trình duyệt của bạn.</p>
    <textarea class="inp ty-text" id="tpText" lang="zh-CN" rows="6" maxlength="3000" placeholder="Ví dụ: 我叫小明。我是越南人。我很喜欢学习汉语。">${esc(store.s.typeCustom || '')}</textarea>
    <div class="row gap wrap"><button class="btn" id="tpStart">⌨️ Luyện gõ đoạn này</button><button class="btn ghost" id="tpClear">🗑️ Xóa nội dung</button><span class="muted small" id="tpCnt"></span></div>
  </section>
  <section class="card"><h2>📖 Từ mới & ngữ pháp trong đoạn <small class="muted">(bấm vào từng từ)</small></h2><div id="tpWords"></div></section>
  <section class="card ty-sec" id="tpTrain" hidden><h2>⌨️ Luyện gõ</h2><div id="tpTy"></div></section>`;
  const ta = $('#tpText', root), words = $('#tpWords', root);
  let tm = 0;
  const draw = () => {
    const ss = splitSentences(ta.value);
    $('#tpCnt', root).textContent = ss.length ? `${ss.length} câu · ${[...ss.join('')].filter(isHan).length} chữ Hán` : '';
    words.innerHTML = ss.length ? analyzeHtml(ss.map(z => [z, ''])) : '<p class="muted">Nhập nội dung tiếng Trung ở ô phía trên – các từ sẽ hiện ra ở đây để bạn bấm xem.</p>';
  };
  ta.oninput = () => { store.update(s => { s.typeCustom = ta.value; }); clearTimeout(tm); tm = setTimeout(draw, 350); };
  words.addEventListener('change', e => { if (e.target.classList.contains('ty-qs')) setQuickSave(e.target.checked); });
  $('#tpClear', root).onclick = () => { if (ta.value && !confirm('Xóa nội dung đã nhập?')) return; ta.value = ''; store.update(s => { s.typeCustom = ''; }); draw(); $('#tpTrain', root).hidden = true; ta.focus(); };
  $('#tpStart', root).onclick = () => {
    const ss = splitSentences(ta.value);
    if (!ss.length) { toast('Nội dung cần có chữ Hán.', 'bad'); return; }
    const box = $('#tpTrain', root); box.hidden = false;
    typingTrainer($('#tpTy', root), { key: 'custom', sentences: ss.map(z => [z, '']) });
    $('.ty-an', box)?.remove(); // phần tra từ đã có ở trên
    box.scrollIntoView({ behavior: 'smooth', block: 'start' }); $('.ty-inp', box)?.focus();
  };
  draw();
  return 'Đánh máy';
}
