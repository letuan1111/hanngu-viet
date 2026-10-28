// AI nhận dạng giọng nói Whisper chạy ngay trên trình duyệt (dùng chung cho Luyện nói, Bài nói của bạn…)
// - recordVoice: ghi âm đến khi im lặng / bấm dừng / hết giờ
// - toPcm16k: đổi file ghi âm sang âm thanh mono 16 kHz
// - aiClip: nhận dạng đoạn ngắn (≤ 30 giây) ; aiLong: nhận dạng đoạn dài (tự cắt đoạn)
import { charPinyins, isHan } from './dict.js';
const strip = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ü/g, 'v');
// So khớp chữ người học đọc với câu mẫu: ok = đúng chữ/đúng âm, tone = đúng âm sai thanh, miss = thiếu/sai
export function alignZh(target, said) {
  const T = [...target].filter(isHan), S = [...said].filter(isHan);
  if (!T.length) return { marks: [], score: 0, ok: 0, tone: 0 };
  const tp = charPinyins(T.join('')) || T, sp = charPinyins(S.join('')) || S;
  const sim = (i, j) => T[i] === S[j] || tp[i] === sp[j] ? 2 : strip(tp[i]) === strip(sp[j]) ? 1 : 0;
  const n = T.length, m = S.length, dp = Array.from({ length: n + 1 }, () => new Int16Array(m + 1));
  for (let i = 1; i <= n; i++) for (let j = 1; j <= m; j++) { const x = sim(i - 1, j - 1); dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1], x ? dp[i - 1][j - 1] + x : 0); }
  const marks = Array(n).fill('miss'); let i = n, j = m;
  while (i > 0 && j > 0) { const x = sim(i - 1, j - 1); if (x && dp[i][j] === dp[i - 1][j - 1] + x) { marks[i - 1] = x === 2 ? 'ok' : 'tone'; i--; j--; } else if (dp[i - 1][j] >= dp[i][j - 1]) i--; else j--; }
  const ok = marks.filter(v => v === 'ok').length, tone = marks.filter(v => v === 'tone').length;
  return { marks, score: Math.round((ok + tone * 0.5) / n * 100), ok, tone };
}
const HAS_GPU = typeof navigator !== 'undefined' && !!navigator.gpu;
export const AI_MODELS = [
  ['onnx-community/whisper-large-v3-turbo', `⭐ Chuẩn nhất – Whisper large-v3-turbo (~1 GB${HAS_GPU ? ', chạy bằng card đồ họa' : ', máy này không có WebGPU nên sẽ rất chậm'})`],
  ['Xenova/whisper-small', 'Chuẩn – Whisper small (~250 MB)'],
  ['Xenova/whisper-base', 'Nhanh – Whisper base (~80 MB)'],
  ['Xenova/whisper-tiny', 'Rất nhanh, kém chính xác – Whisper tiny (~40 MB)'],
];
// Mô hình mặc định: máy có WebGPU (Chrome/Edge máy tính) dùng bản chuẩn nhất, còn lại dùng small
export const AI_DEFAULT = HAS_GPU ? AI_MODELS[0][0] : AI_MODELS[1][0];
export const aiModelOptions = sel => AI_MODELS.map(([v, n]) => `<option value="${v}" ${v === sel ? 'selected' : ''}>${n}</option>`).join('');
const fmtSize = b => b > 1048576 ? (b / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB';
let W = null; const waiting = new Map(); let seq = 0, longJob = null;
const listeners = new Set(); // nhận thông báo trạng thái (đang tải mô hình…)
export const onAIStatus = fn => { listeners.add(fn); return () => listeners.delete(fn); };
const emit = h => listeners.forEach(f => { try { f(h); } catch {} });
function worker() {
  if (W) return W;
  W = new Worker(new URL('../workers/asr.js', import.meta.url), { type: 'module' });
  const files = {};
  W.onmessage = ev => {
    const m = ev.data;
    if (m.type === 'load') { files[m.file] = [m.loaded || 0, m.total || 0]; const L = Object.values(files).reduce((a, x) => a + x[0], 0), T = Object.values(files).reduce((a, x) => a + x[1], 0); emit(`🤖 Đang tải AI: ${fmtSize(L)}${T ? ' / ' + fmtSize(T) : ''} (chỉ lần đầu)…`); }
    else if (m.type === 'ready') emit('<span class="ok-t">🤖 AI đã sẵn sàng.</span>');
    else if (m.type === 'stage' && longJob) longJob.onStage && longJob.onStage(m.msg);
    else if (m.type === 'error') { emit(`<span class="bad-t">Không tải được AI (${m.msg}). Hãy kiểm tra mạng – lần đầu cần tải mô hình.</span>`); if (longJob) { longJob.rej(new Error(m.msg)); longJob = null; } }
    else if (m.type === 'clip') { const w = waiting.get(m.id); if (w) { waiting.delete(m.id); w(m.text || ''); } }
    else if (m.type === 'part' && longJob) { longJob.lines.push(...m.lines); longJob.onPart && longJob.onPart(m.k + 1, m.n, longJob.lines); }
    else if (m.type === 'done' && longJob) { longJob.res(longJob.lines); longJob = null; }
  };
  W.onerror = ev => emit(`<span class="bad-t">Không chạy được AI (${ev.message || 'lỗi'}).</span>`);
  return W;
}
export const aiPreload = model => worker().postMessage({ type: 'preload', model });
export const aiClip = (pcm, model) => new Promise(res => { const id = ++seq; waiting.set(id, res); worker().postMessage({ type: 'clip', id, audio: pcm, model }, [pcm.buffer]); });
export function aiLong(pcm, model, { onPart, onStage } = {}) {
  if (pcm.length <= 16000 * 28) return aiClip(pcm, model).then(t => t ? [{ t: 0, zh: t }] : []);
  return new Promise((res, rej) => {
    const go = () => { longJob = { res, rej, onPart, onStage, lines: [] }; worker().postMessage({ type: 'run', audio: pcm, model }, [pcm.buffer]); };
    if (longJob) { const iv = setInterval(() => { if (!longJob) { clearInterval(iv); go(); } }, 300); } else go();
  });
}
export async function toPcm16k(buf) {
  const AC = window.AudioContext || window.webkitAudioContext, ctx = new AC();
  const ab = await new Promise((res, rej) => { const p = ctx.decodeAudioData(buf, res, rej); if (p && p.then) p.then(res, rej); });
  ctx.close && ctx.close();
  const off = new OfflineAudioContext(1, Math.max(1, Math.ceil(ab.duration * 16000)), 16000);
  const src = off.createBufferSource(); src.buffer = ab; src.connect(off.destination); src.start();
  return new Float32Array((await off.startRendering()).getChannelData(0));
}
// Ghi âm: dừng khi bấm stop(), khi im lặng silenceSec giây sau khi đã nói (0 = không tự dừng), hoặc hết maxSec
export async function recordVoice({ maxSec = 60, silenceSec = 1.2, onLevel, onTime } = {}) {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
  const mr = new MediaRecorder(stream), chunks = []; mr.ondataavailable = e => e.data.size && chunks.push(e.data);
  const ac = new (window.AudioContext || window.webkitAudioContext)(), an = ac.createAnalyser(); an.fftSize = 1024;
  ac.createMediaStreamSource(stream).connect(an); const buf = new Float32Array(an.fftSize);
  let stop = false; const ctl = { stop: () => { stop = true; } };
  const done = (async () => {
    mr.start();
    const t0 = performance.now(); let voiced = 0, lastVoice = 0, noise = 0.01, n = 0;
    await new Promise(res => {
      const tick = () => {
        const el = (performance.now() - t0) / 1000;
        an.getFloatTimeDomainData(buf); let e = 0; for (const v of buf) e += v * v; const rm = Math.sqrt(e / buf.length);
        if (el < 0.3) noise = (noise * n + rm) / ++n;
        if (rm > Math.max(0.015, noise * 3)) { voiced++; lastVoice = el; }
        onLevel && onLevel(rm); onTime && onTime(el);
        if (stop || el >= maxSec || (silenceSec && voiced > 6 && el - lastVoice > silenceSec && el > 1.2)) return res();
        requestAnimationFrame(tick);
      };
      tick();
    });
    await new Promise(res => { mr.onstop = res; mr.stop(); });
    ac.close(); stream.getTracks().forEach(t => t.stop());
    return { blob: new Blob(chunks, { type: chunks[0]?.type || 'audio/webm' }), voiced: voiced > 3 };
  })();
  ctl.done = done;
  return ctl;
}
