// Luyện gõ lại bài đọc: chạy từng câu, gõ đúng đến đâu chữ biến mất đến đó; có đồng hồ, chữ/phút, từ/phút, độ chính xác
import { store, logActivity } from '../core/store.js';
import { segment, charPinyins, isHan, sentencePinyin } from '../core/dict.js';
import { esc, icon, $, $$, toast, recAudio, sentence, zhTokens, grammarInText, structsInText, quickSaveOn, setQuickSave, closePop } from '../core/ui.js';
import { speak, stopSeq, isIOS } from '../core/tts.js';
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
      <label class="sw" title="Bắt đầu gõ câu nào, máy tự đọc câu đó một lần"><input type="checkbox" class="tyAuto" ${opt.auto !== false ? 'checked' : ''}><span></span> 🔊 Tự đọc câu</label>
    </div>
    <div class="ty-run"></div>
    <details class="vs-det ty-an"><summary>📖 Tra từ & ngữ pháp trong đoạn này <small class="muted">(bấm vào từng từ để xem nghĩa, cấp HSK và ngữ pháp liên quan)</small></summary><div class="ty-anBody"></div></details>`;
  const run = $('.ty-run', el);
  const sentences = o.sentences, srcKey = o.key; let timer = 0;
  el.querySelectorAll('[name=tyMode]').forEach(r => r.onchange = () => { opt.mode = r.value; saveOpt(); start(); });
  $('.tyPy', el).onchange = e => { opt.py = e.target.checked; saveOpt(); run.classList.toggle('no-py', !opt.py); };
  $('.tyVi', el).onchange = e => { opt.vi = e.target.checked; saveOpt(); run.classList.toggle('no-vi', !opt.vi); };
  $('.tyAuto', el).onchange = e => { opt.auto = e.target.checked; saveOpt(); };
  let active = false; // chỉ tự đọc sau khi người học đã bấm vào ô gõ (trình duyệt chặn tự phát âm thanh khi vừa mở trang)
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
    let readSi = -1;
    const autoRead = () => { if (!active || opt.auto === false || readSi === si || !data[si] || !el.isConnected) return; readSi = si; speak(data[si].zh); };
    const drawSentence = () => {
      const d = data[si];
      cur.innerHTML = d.units.map((u, i) => `<span class="tu ${kOf(u) ? '' : 'pn'}" data-i="${i}"><span class="tp">${esc(u.py)}</span><span class="tz">${esc(u.c)}</span></span>`).join('');
      $('.ty-vi', run).textContent = d.vi || '';
      $('.ty-next', run).textContent = data[si + 1] ? 'Câu tiếp: ' + data[si + 1].zh : '';
      $('.ty-si', run).textContent = si + 1;
      inp.value = ''; lastErrLen = -1; update();
      autoRead();
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
    inp.addEventListener('focus', () => { active = true; autoRead(); });
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

// ════════════ Trang Đánh máy: nhập Tiếng Trung – Tiếng Việt – Pinyin, máy chạy tự động, tra từ, luyện gõ ════════════
const VI_CH = /[ăâđêôơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹđ]/gi;
const PY_CH = /[āēīōūǖǎěǐǒǔǚǘǜü]/gi;
const kindOf = t => [...t].some(isHan) ? 'zh' : (t.match(PY_CH) || []).length > (t.match(VI_CH) || []).length ? 'py' : (t.match(VI_CH) || []).length ? 'vi' : '?';
// Đọc nội dung nhập: mỗi dòng "中文 | Tiếng Việt | pinyin" (hoặc cách nhau bằng Tab khi dán bảng Word/Excel, thứ tự cột tùy ý),
// hoặc mỗi câu tiếng Trung một dòng, dòng nghĩa / pinyin ngay bên dưới. Đoạn văn liền sẽ được tách thành câu.
export function parseRows(text) {
  const rows = [];
  for (const raw of String(text || '').replace(/\r/g, '').split('\n')) {
    const line = raw.trim(); if (!line) continue;
    const parts = line.split(/\t+|\s*\|\s*/).map(x => x.trim()).filter(Boolean);
    if (parts.length > 1) {
      const r = { zh: '', vi: '', py: '' }, rest = [];
      parts.forEach(x => { const k = kindOf(x); if (k !== '?' && !r[k]) r[k] = x; else rest.push(x); });
      rest.forEach(x => { if (!r.vi) r.vi = x; else if (!r.py) r.py = x; });
      if (r.zh) { rows.push(r); continue; }
    }
    const k = kindOf(line);
    if (k === 'zh') { rows.push({ zh: line, vi: '', py: '' }); continue; }
    const last = rows[rows.length - 1]; if (!last) continue;      // bỏ dòng tiêu đề như “TIẾNG TRUNG | TIẾNG VIỆT | PINYIN”
    const kk = k === '?' ? (last.vi ? 'py' : 'vi') : k;
    last[kk] = last[kk] ? last[kk] + ' ' + line : line;
  }
  // đoạn văn dài chưa có nghĩa/pinyin → tách thành từng câu
  return rows.flatMap(r => !r.vi && !r.py && splitSentences(r.zh).length > 1 ? splitSentences(r.zh).map(z => ({ zh: z, vi: '', py: '' })) : [r]);
}
const rowsToText = rows => rows.map(r => [r.zh, r.vi, r.py].filter((x, k) => x || k < 2).join(' | ').replace(/ \| $/, '')).join('\n');
// Link chia sẻ: nội dung nằm ngay trong link (không cần máy chủ)
const b64e = str => btoa(String.fromCharCode(...new TextEncoder().encode(str))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const b64d = str => new TextDecoder().decode(Uint8Array.from(atob(str.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0)));

export function typingPage(root) {
  const q = new URLSearchParams(location.hash.split('?')[1] || '');
  let fromLink = null;
  if (q.get('d')) { try { const a = JSON.parse(b64d(q.get('d'))); fromLink = { t: a.t || '', rows: (a.r || []).map(([zh, vi, py]) => ({ zh: zh || '', vi: vi || '', py: py || '' })).filter(r => r.zh) }; } catch { toast('Link không đúng hoặc bị thiếu – không đọc được nội dung.', 'bad'); } }
  const opt = { py: true, vi: true, voice: true, rate: 0.9, gap: 2, rep: 1, loop: false, ...(store.s.apOpt || {}) };
  const saveOpt = () => store.update(s => { s.apOpt = { ...opt }; });
  root.innerHTML = `<div class="page-head"><div><p class="eyebrow">Tự nhập nội dung</p><h1>⌨️ Đánh máy</h1></div></div>
  ${fromLink ? `<div class="note">🔗 Đang mở nội dung từ link được chia sẻ${fromLink.t ? `: <b>${esc(fromLink.t)}</b>` : ''} (${fromLink.rows.length} câu). Nội dung chỉ được lưu vào máy bạn khi bạn sửa ô nhập bên dưới.</div>` : ''}
  <section class="card tp-in">
    <p class="muted small">Nhập mỗi câu một dòng theo dạng <b>Tiếng Trung | Tiếng Việt</b> (có thể dán thẳng bảng từ Word/Excel, hoặc ghi câu tiếng Trung rồi xuống dòng ghi nghĩa). <b>Pinyin do máy tự tạo</b> và hiện ngay trên đầu từng chữ; chỉ có tiếng Trung cũng được. Mỗi từ đều bấm vào được để xem nghĩa. Nội dung được lưu trên trình duyệt của bạn.</p>
    <textarea class="inp ty-text" id="tpText" lang="zh-CN" rows="7" maxlength="6000" placeholder="我叫小明。 | Tôi tên là Tiểu Minh.&#10;我是越南人。 | Tôi là người Việt Nam.&#10;我很喜欢学习汉语。 | Tôi rất thích học tiếng Trung.">${esc(fromLink ? rowsToText(fromLink.rows) : store.s.typeCustom || '')}</textarea>
    <div class="row gap wrap"><button class="btn" id="tpRun">▶ Máy chạy tự động</button><button class="btn ghost" id="tpStart">⌨️ Luyện gõ đoạn này</button><button class="btn ghost" id="tpLink">🔗 Tạo link chia sẻ</button><button class="btn ghost" id="tpClear">🗑️ Xóa nội dung</button><span class="muted small" id="tpCnt"></span></div>
  </section>
  <section class="card ap" id="ap">
    <div class="row gap wrap" style="justify-content:space-between;align-items:center"><h2>▶ Máy chạy tự động</h2><span class="muted small">Phím tắt: <kbd>Space</kbd> chạy/dừng · <kbd>←</kbd> <kbd>→</kbd> câu trước/sau</span></div>
    <div class="ap-bar">
      <button class="btn" id="apPlay">▶ Chạy</button><button class="btn ghost sm" id="apPrev" aria-label="Câu trước">‹ Trước</button><button class="btn ghost sm" id="apNext" aria-label="Câu sau">Sau ›</button><button class="btn ghost sm" id="apSay">🔊 Đọc câu này</button>
      <label class="sw" title="Tắt để máy chạy im lặng: chữ vẫn sáng lần lượt và tự chuyển câu"><input type="checkbox" id="apVoice" ${opt.voice ? 'checked' : ''}><span></span> 🔊 Máy đọc</label>
      <label class="sw"><input type="checkbox" id="apPy" ${opt.py ? 'checked' : ''}><span></span> Pinyin</label>
      <label class="sw"><input type="checkbox" id="apVi" ${opt.vi ? 'checked' : ''}><span></span> Tiếng Việt</label>
      <label class="sel">Tốc độ <select id="apRate">${[0.6, 0.75, 0.9, 1, 1.2].map(v => `<option value="${v}" ${v === +opt.rate ? 'selected' : ''}>${v}x</option>`).join('')}</select></label>
      <label class="sel">Nghỉ <select id="apGap">${[1, 2, 3, 5, 8].map(v => `<option value="${v}" ${v === +opt.gap ? 'selected' : ''}>${v} giây</option>`).join('')}</select></label>
      <label class="sel">Đọc <select id="apRep">${[1, 2, 3].map(v => `<option value="${v}" ${v === +opt.rep ? 'selected' : ''}>${v} lần</option>`).join('')}</select></label>
      <label class="chk"><input type="checkbox" id="apLoop" ${opt.loop ? 'checked' : ''}> Chạy lại từ đầu khi hết bài</label>
      <button class="btn ghost sm" id="apFull">⛶ Toàn màn hình</button>
    </div>
    <div class="ap-stage ${opt.py ? '' : 'no-py'} ${opt.vi ? '' : 'no-vi'}" id="apStage">
      <div class="ap-n" id="apN"></div>
      <div class="ap-py" id="apPyT" hidden></div><div class="ap-zh zh" id="apZh" lang="zh-CN"></div><div class="ap-vi" id="apViT"></div>
      <div class="bar"><i id="apBar" style="width:0"></i></div>
      <div class="ap-fsbar"><button class="btn ghost sm" data-fs="prev" aria-label="Câu trước">‹</button><button class="btn sm" data-fs="play" aria-label="Chạy hoặc dừng">▶</button><button class="btn ghost sm" data-fs="next" aria-label="Câu sau">›</button><button class="btn ghost sm" data-fs="exit" aria-label="Thoát toàn màn hình">✕ Thoát</button></div>
    </div>
    <div class="ap-list ${opt.py ? '' : 'no-py'} ${opt.vi ? '' : 'no-vi'}" id="apList"></div>
  </section>
  <section class="card"><h2>📖 Từ mới & ngữ pháp trong đoạn <small class="muted">(bấm vào từng từ)</small></h2><div id="tpWords"></div></section>
  <section class="card ty-sec" id="tpTrain" hidden><h2>⌨️ Luyện gõ</h2><div id="tpTy"></div></section>`;
  const ta = $('#tpText', root), words = $('#tpWords', root), stage = $('#apStage', root), list = $('#apList', root);
  let rows = [], cur = 0, tm = 0, run = null;
  const pyOf = r => r.py || sentencePinyin(r.zh);
  // tách từng chữ trong mỗi từ thành <span class="ch"> để làm sáng đúng chữ đang đọc
  // chữ Hán kèm pinyin ngay trên đầu từng chữ – pinyin do máy tự tạo theo từ điển (có biến điệu 一, 不)
  const zhChars = (zh, py) => {
    const hanIdx = [...zh].map((c, i) => isHan(c) ? i : -1).filter(i => i >= 0);
    const dict = charPinyins(hanIdx.map(i => [...zh][i]).join('')) || [];
    const pyAt = {}; hanIdx.forEach((ci, k) => { pyAt[ci] = dict[k] || ''; });
    return zhTokens(zh, { gloss: false }).replace(/data-i="(\d+)"([^>]*)><ruby><span class="hz">([^<]*)<\/span><rt>[^<]*<\/rt><\/ruby>/g,
      (_, st, rest, t) => `data-i="${st}"${rest}><span class="hz">${[...t].map((c, j) => `<ruby class="ch">${c}<rt>${esc(pyAt[+st + j] || '')}</rt></ruby>`).join('')}</span>`);
  };
  const charMap = el => { const out = []; $$('.tk', el).forEach(t => { const st = +t.dataset.i; $$('.ch', t).forEach((c, j) => out.push([st + j, c])); }); return out; };
  let litT = null;
  // đọc câu hiện tại; chữ đang đọc sáng lên (dùng mốc thời gian trình duyệt báo, không có thì ước lượng theo tốc độ đọc)
  function sayCur(force = false) {
    const r = rows[cur]; if (!r) return Promise.resolve();
    const silent = !opt.voice && !force;
    const maps = [charMap($('#apZh', root)), charMap($$('.ap-row', list)[cur] || document.createElement('i'))];
    const lit = (a, b) => maps.forEach(m => m.forEach(([k, c]) => c.classList.toggle('lit', k >= a && k < b)));
    const han = [...r.zh].map((c, i) => isHan(c) ? i : -1).filter(i => i >= 0);
    let got = false; const t0 = performance.now(), per = 0.24 / (+opt.rate || 1);
    clearInterval(litT);
    const timer = litT = setInterval(() => { if (got) return; const k = Math.floor(((performance.now() - t0) / 1000 - 0.25) / per); if (k >= 0 && k < han.length) lit(han[k], han[k] + 1); }, 50);
    // tắt máy đọc: chỉ cho chữ sáng lần lượt theo tốc độ đã chọn rồi chuyển câu
    const done = silent ? new Promise(res => { const tok = run; const end = performance.now() + (0.25 + han.length * per + 0.3) * 1000; const iv = setInterval(() => { if (performance.now() >= end || (tok && tok.stop) || !opt.voice === false) { clearInterval(iv); res(); } }, 50); })
      : speak(r.zh, { rate: +opt.rate, onBoundary: (i, len) => { got = true; lit(i, i + Math.max(1, len)); } });
    return done.finally(() => { clearInterval(timer); lit(-1, -1); });
  }
  const draw = () => {
    rows = parseRows(ta.value);
    if (cur >= rows.length) cur = 0;
    $('#tpCnt', root).textContent = rows.length ? `${rows.length} câu · ${[...rows.map(r => r.zh).join('')].filter(isHan).length} chữ Hán` : '';
    words.innerHTML = rows.length ? analyzeHtml(rows.map(r => [r.zh, r.vi])) : '<p class="muted">Nhập nội dung tiếng Trung ở ô phía trên – các từ sẽ hiện ra ở đây để bạn bấm xem.</p>';
    list.innerHTML = rows.map((r, i) => `<div class="ap-row" data-i="${i}"><span class="ap-no">${i + 1}</span><div class="ap-rz zh" lang="zh-CN">${zhChars(r.zh, r.py)}</div><div class="ap-rv">${esc(r.vi)}</div></div>`).join('');
    show();
  };
  function show() {
    const r = rows[cur];
    if (!r) { $('#apN', root).textContent = ''; $('#apZh', root).innerHTML = '<span class="muted" style="font-size:1rem">Nhập nội dung ở ô phía trên để máy chạy.</span>'; $('#apPyT', root).textContent = ''; $('#apViT', root).textContent = ''; $('#apBar', root).style.width = '0'; return; }
    $('#apN', root).textContent = `Câu ${cur + 1}/${rows.length}`;
    $('#apPyT', root).textContent = pyOf(r);
    $('#apZh', root).innerHTML = zhChars(r.zh, r.py);
    $('#apViT', root).textContent = r.vi || (opt.vi ? '' : '');
    $('#apViT', root).classList.toggle('empty', !r.vi);
    $('#apBar', root).style.width = ((cur + 1) / rows.length * 100) + '%';
    $$('.ap-row', list).forEach((el, i) => el.classList.toggle('now', i === cur));
  }
  const scrollRow = () => { const el = $$('.ap-row', list)[cur]; if (el && !isFs()) el.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); };
  const wait = (ms, tok) => new Promise(res => { const t0 = Date.now(); const iv = setInterval(() => { if (tok.stop || Date.now() - t0 >= ms) { clearInterval(iv); res(); } }, 100); });
  const setBtn = on => { $('#apPlay', root).textContent = on ? '⏸ Dừng' : '▶ Chạy'; $('#apPlay', root).classList.toggle('rec', on); const b = $('[data-fs=play]', root); if (b) b.textContent = on ? '⏸' : '▶'; };
  function stopRun() { if (run) { run.stop = true; run = null; } stopSeq(); setBtn(false); }
  async function startRun() {
    if (!rows.length) { toast('Hãy nhập nội dung trước.', 'bad'); return; }
    stopRun(); const tok = run = { stop: false }; setBtn(true); logActivity();
    while (!tok.stop) {
      show(); scrollRow();
      for (let k = 0; k < opt.rep && !tok.stop; k++) { await sayCur(); if (k + 1 < opt.rep) await wait(700, tok); }
      if (tok.stop) break;
      await wait(opt.gap * 1000, tok); if (tok.stop) break;
      if (cur + 1 < rows.length) cur++;
      else if (opt.loop) cur = 0;
      else { show(); break; }
    }
    if (run === tok) { run = null; setBtn(false); }
  }
  const go = d => { const was = !!run; stopRun(); cur = Math.min(rows.length - 1, Math.max(0, cur + d)); show(); scrollRow(); if (was) startRun(); };
  $('#apPlay', root).onclick = () => run ? stopRun() : startRun();
  $('#tpRun', root).onclick = () => { $('#ap', root).scrollIntoView({ behavior: 'smooth', block: 'start' }); startRun(); };
  $('#apPrev', root).onclick = () => go(-1); $('#apNext', root).onclick = () => go(1);
  $('#apSay', root).onclick = () => { if (rows[cur]) { stopRun(); sayCur(true); } };
  $('#apVoice', root).onchange = e => { opt.voice = e.target.checked; saveOpt(); if (!opt.voice) stopSeq(); };
  const tog = () => { [stage, list].forEach(el => { el.classList.toggle('no-py', !opt.py); el.classList.toggle('no-vi', !opt.vi); }); saveOpt(); };
  $('#apPy', root).onchange = e => { opt.py = e.target.checked; tog(); };
  $('#apVi', root).onchange = e => { opt.vi = e.target.checked; tog(); };
  $('#apRate', root).onchange = e => { opt.rate = +e.target.value; saveOpt(); };
  $('#apGap', root).onchange = e => { opt.gap = +e.target.value; saveOpt(); };
  $('#apRep', root).onchange = e => { opt.rep = +e.target.value; saveOpt(); };
  $('#apLoop', root).onchange = e => { opt.loop = e.target.checked; saveOpt(); };
  // Toàn màn hình: dùng chế độ toàn màn hình của trình duyệt; iPhone không hỗ trợ → phóng khung đọc phủ kín màn hình
  const realFs = () => document.fullscreenElement || document.webkitFullscreenElement;
  function isFs() { return !!realFs() || stage.classList.contains('ap-fs'); }
  const pseudoFs = on => { stage.classList.toggle('ap-fs', on); document.documentElement.classList.toggle('ap-lock', on); if (!on) closePop(); };
  // các nút ở chế độ toàn màn hình: ẩn đi cho gọn, chạm vào màn hình thì hiện lại 4 giây
  let uiT = 0;
  function showUi() { stage.classList.add('ui-on'); clearTimeout(uiT); uiT = setTimeout(() => stage.classList.remove('ui-on'), 4000); }
  document.addEventListener('fullscreenchange', () => { if (realFs() === stage) showUi(); });
  async function enterFs() {
    showUi();
    const req = stage.requestFullscreen || stage.webkitRequestFullscreen;
    if (req && !isIOS) { try { await req.call(stage); return; } catch {} }
    pseudoFs(true);
  }
  function exitFs() { if (realFs()) (document.exitFullscreen || document.webkitExitFullscreen)?.call(document); pseudoFs(false); }
  $('#apFull', root).onclick = () => isFs() ? exitFs() : enterFs();
  const syncFsBtn = () => { const b = $('[data-fs=play]', stage); if (b) b.textContent = run ? '⏸' : '▶'; };
  stage.addEventListener('click', e => { const b = e.target.closest('[data-fs]'); if (!b) return; e.stopPropagation(); const a = b.dataset.fs; if (a === 'exit') exitFs(); else if (a === 'prev') go(-1); else if (a === 'next') go(1); else { run ? stopRun() : startRun(); } setTimeout(syncFsBtn, 50); showUi(); }, true);
  window.addEventListener('hashchange', () => pseudoFs(false), { once: true });
  list.addEventListener('click', e => { if (e.target.closest('.tk')) return; const r = e.target.closest('.ap-row'); if (!r) return; const was = !!run; stopRun(); cur = +r.dataset.i; show(); if (was) startRun(); else sayCur(); });
  stage.addEventListener('click', e => {
    if (e.target.closest('.pop')) return;
    if (e.target.closest('.tk')) { stopRun(); return; }          // bấm vào từ: dừng lại để xem nghĩa (bảng nghĩa hiện ngay trên màn hình)
    if (isFs()) showUi();     // chạm vào màn hình: hiện các nút (tự ẩn sau vài giây)
  });
  const onKey = e => {
    if (!root.isConnected) { document.removeEventListener('keydown', onKey); stopRun(); return; }
    if (/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName || '')) return;
    if (e.key === 'Escape' && stage.classList.contains('ap-fs')) { pseudoFs(false); return; }
    if (e.key === ' ') { e.preventDefault(); run ? stopRun() : startRun(); }
    else if (e.key === 'ArrowRight') go(1); else if (e.key === 'ArrowLeft') go(-1);
  };
  document.addEventListener('keydown', onKey);
  window.addEventListener('hashchange', stopRun, { once: true });

  ta.oninput = () => { store.update(s => { s.typeCustom = ta.value; }); clearTimeout(tm); tm = setTimeout(draw, 350); };
  words.addEventListener('change', e => { if (e.target.classList.contains('ty-qs')) setQuickSave(e.target.checked); });
  $('#tpClear', root).onclick = () => { if (ta.value && !confirm('Xóa nội dung đã nhập?')) return; stopRun(); ta.value = ''; store.update(s => { s.typeCustom = ''; }); draw(); $('#tpTrain', root).hidden = true; ta.focus(); };
  $('#tpLink', root).onclick = async () => {
    if (!rows.length) { toast('Hãy nhập nội dung trước.', 'bad'); return; }
    const t = (prompt('Đặt tên cho bài (không bắt buộc):', fromLink?.t || '') || '').trim();
    const d = b64e(JSON.stringify({ t, r: rows.map(r => r.py ? [r.zh, r.vi, r.py] : r.vi ? [r.zh, r.vi] : [r.zh]) }));
    const url = location.href.split('#')[0] + '#/typing?d=' + d;
    try { await navigator.clipboard.writeText(url); toast('Đã sao chép link – gửi cho người khác, mở ra sẽ thấy đúng nội dung này.'); }
    catch { prompt('Sao chép link này:', url); }
  };
  $('#tpStart', root).onclick = () => {
    if (!rows.length) { toast('Nội dung cần có chữ Hán.', 'bad'); return; }
    stopRun();
    const box = $('#tpTrain', root); box.hidden = false;
    typingTrainer($('#tpTy', root), { key: 'custom', sentences: rows.map(r => [r.zh, r.vi]) });
    $('.ty-an', box)?.remove(); // phần tra từ đã có ở trên
    box.scrollIntoView({ behavior: 'smooth', block: 'start' }); $('.ty-inp', box)?.focus();
  };
  draw();
  return 'Đánh máy';
}
