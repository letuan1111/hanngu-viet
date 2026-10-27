// Nhận dạng lời nói trong file nghe ngay trên máy (Whisper, transformers.js) – chạy trong Web Worker để trang không bị đứng.
// Mô hình được tải một lần từ Hugging Face rồi lưu trong bộ nhớ đệm của trình duyệt.
const TF = 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.7.6/dist/transformers.min.js';
const SR = 16000;
// Câu Whisper hay "bịa" ra khi gặp đoạn im lặng/nhạc
const JUNK = /字幕|订阅|訂閱|谢谢观看|謝謝觀看|点赞|點贊|Amara|明镜|明鏡|请不吝|請不吝|中文字幕|感谢收看|感謝收看|by\s|www\.|\.com/i;

let tf = null, asr = null, cur = '', conv = s => s;

// Chia âm thanh thành các đoạn ≤ 28 giây, cắt ở chỗ nhỏ tiếng nhất để không cắt ngang câu
function cuts(a) {
  const out = [], win = 0.1 * SR, maxL = 28 * SR, minL = 18 * SR;
  let s = 0;
  while (s < a.length) {
    if (a.length - s <= maxL) { out.push([s, a.length]); break; }
    let best = s + maxL, bestE = Infinity;
    for (let p = s + minL; p + win <= s + maxL; p += win) {
      let e = 0; for (let i = p; i < p + win; i++) e += a[i] * a[i];
      if (e < bestE) { bestE = e; best = p + win / 2; }
    }
    out.push([s, Math.floor(best)]); s = Math.floor(best);
  }
  return out;
}
const rms = x => { let e = 0; for (let i = 0; i < x.length; i += 4) e += x[i] * x[i]; return Math.sqrt(e / (x.length / 4 || 1)); };

self.onmessage = async e => {
  const { type, audio, model } = e.data || {};
  if (type !== 'run') return;
  try {
    if (!tf) { self.postMessage({ type: 'stage', msg: 'Đang tải thư viện nhận dạng…' }); tf = await import(TF); tf.env.allowLocalModels = false; }
    if (!asr || cur !== model) {
      self.postMessage({ type: 'stage', msg: 'Đang tải mô hình (chỉ lần đầu)…' });
      asr = await tf.pipeline('automatic-speech-recognition', model, {
        dtype: 'q8', device: 'wasm',
        progress_callback: p => { if (p.status === 'progress') self.postMessage({ type: 'load', file: p.file, loaded: p.loaded, total: p.total }); },
      });
      cur = model;
    }
    try { const m = await import('../../vendor/opencc-t2cn.js'); conv = m.Converter({ from: 'hk', to: 'cn' }); } catch {}
    const cs = cuts(audio);
    self.postMessage({ type: 'stage', msg: `Đang nhận dạng ${cs.length} đoạn…`, n: cs.length });
    for (let k = 0; k < cs.length; k++) {
      const [a, b] = cs[k], piece = audio.subarray(a, b);
      let lines = [];
      if (rms(piece) > 0.004) {
        const out = await asr(piece, { language: 'chinese', task: 'transcribe', return_timestamps: true });
        const chunks = out.chunks && out.chunks.length ? out.chunks : [{ timestamp: [0, null], text: out.text || '' }];
        lines = chunks.map(c => ({ t: +(a / SR + (c.timestamp && c.timestamp[0] != null ? c.timestamp[0] : 0)).toFixed(2), zh: conv(String(c.text || '').trim()) }))
          .filter(l => l.zh && /\p{Script=Han}/u.test(l.zh) && !JUNK.test(l.zh));
      }
      self.postMessage({ type: 'part', k, n: cs.length, lines });
    }
    self.postMessage({ type: 'done' });
  } catch (err) {
    self.postMessage({ type: 'error', msg: String((err && err.message) || err) });
  }
};
