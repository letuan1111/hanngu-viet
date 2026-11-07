// Tô màu ảnh đen trắng (trang sách quét) bằng AI DDColor-tiny chạy ngay trên trình duyệt (onnxruntime-web).
// Mô hình chỉ đoán phần màu (kênh a, b của không gian Lab); độ sáng L giữ nguyên ảnh gốc nên chữ vẫn sắc nét.
// Nền trắng và chữ đen được giữ trung tính, chỉ tranh ảnh được tô màu. Màu do AI đoán, không phải màu gốc.
const ORT = 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.20.1/dist/';
const MODEL = 'https://huggingface.co/edgetools/ddcolor/resolve/main/ddcolor-tiny-fp16.onnx';
const S = 512;                       // mô hình nhận ảnh 512×512
let ortP = null, sessP = null;

function loadOrt() {
  if (window.ort) return Promise.resolve(window.ort);
  return ortP || (ortP = new Promise((res, rej) => {
    const sc = document.createElement('script'); sc.src = ORT + 'ort.min.js';
    sc.onload = () => res(window.ort); sc.onerror = () => { ortP = null; rej(new Error('không tải được thư viện AI')); };
    document.head.appendChild(sc);
  }));
}
// tải mô hình (lưu vào bộ nhớ đệm của trình duyệt – chỉ tải lần đầu)
async function modelBytes(onProgress) {
  let cache = null; try { cache = await caches.open('hv-color-model-v1'); const hit = await cache.match(MODEL); if (hit) return new Uint8Array(await hit.arrayBuffer()); } catch {}
  const r = await fetch(MODEL); if (!r.ok) throw new Error('không tải được mô hình tô màu (' + r.status + ')');
  const total = +r.headers.get('content-length') || 0, rd = r.body.getReader(), parts = []; let got = 0;
  for (;;) { const { done, value } = await rd.read(); if (done) break; parts.push(value); got += value.length; onProgress && onProgress(got, total); }
  const buf = new Uint8Array(got); let o = 0; for (const p of parts) { buf.set(p, o); o += p.length; }
  try { cache && await cache.put(MODEL, new Response(buf, { headers: { 'content-type': 'application/octet-stream' } })); } catch {}
  return buf;
}
export function colorReady(onProgress) {
  return sessP || (sessP = (async () => {
    const ort = await loadOrt();
    ort.env.wasm.wasmPaths = ORT;
    const bytes = await modelBytes(onProgress);
    const eps = navigator.gpu ? [['webgpu'], ['wasm']] : [['wasm']];
    let err;
    for (const ep of eps) { try { return await ort.InferenceSession.create(bytes, { executionProviders: ep, graphOptimizationLevel: 'all' }); } catch (e) { err = e; } }
    throw err;
  })().catch(e => { sessP = null; throw e; }));
}
export async function colorCached() { try { const c = await caches.open('hv-color-model-v1'); return !!(await c.match(MODEL)); } catch { return false; } }

// ── chuyển đổi màu sRGB ↔ Lab (D65, theo quy ước OpenCV dạng số thực) ──
const lin = v => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
const gam = v => (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055);
const Xn = 0.950456, Zn = 1.088754;
const f = t => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
const fi = t => (t > 0.206893 ? t * t * t : (t - 16 / 116) / 7.787);
function lab2rgb(L, a, bb, out, o) {
  const fy = (L + 16) / 116, fx = fy + a / 500, fz = fy - bb / 200;
  const X = Xn * fi(fx), Y = fi(fy), Z = Zn * fi(fz);
  const r = 3.240479 * X - 1.53715 * Y - 0.498535 * Z, g = -0.969256 * X + 1.875991 * Y + 0.041556 * Z, b = 0.055648 * X - 0.204043 * Y + 1.057311 * Z;
  out[o] = Math.max(0, Math.min(255, gam(Math.max(0, r)) * 255 + 0.5)); out[o + 1] = Math.max(0, Math.min(255, gam(Math.max(0, g)) * 255 + 0.5)); out[o + 2] = Math.max(0, Math.min(255, gam(Math.max(0, b)) * 255 + 0.5));
}
// độ sáng → ảnh xám RGB (a = b = 0): tra bảng cho nhanh
const GRAY = (() => { const t = new Float32Array(1001), o = new Uint8ClampedArray(3); for (let i = 0; i <= 1000; i++) { lab2rgb(i / 10, 0, 0, o, 0); t[i] = o[0] / 255; } return t; })();
const LIN = (() => { const t = new Float32Array(256); for (let i = 0; i < 256; i++) t[i] = lin(i / 255); return t; })();
const Lfast = (r, g, b) => { const y = 0.212671 * LIN[r] + 0.71516 * LIN[g] + 0.072169 * LIN[b]; return y > 0.008856 ? 116 * Math.cbrt(y) - 16 : 903.3 * y; };

// tô màu một vùng (ô) của ảnh
async function colorTile(sess, src, sx, sy, w, h) {
  const c = document.createElement('canvas'); c.width = S; c.height = S;
  const g = c.getContext('2d', { willReadFrequently: true }); g.drawImage(src, sx, sy, w, h, 0, 0, S, S);
  const px = g.getImageData(0, 0, S, S).data, n = S * S, inp = new Float32Array(3 * n);
  for (let i = 0; i < n; i++) { const v = GRAY[Math.round(Lfast(px[i * 4], px[i * 4 + 1], px[i * 4 + 2]) * 10)] || 0; inp[i] = inp[n + i] = inp[2 * n + i] = v; }
  const ort = window.ort, feeds = { [sess.inputNames[0]]: new ort.Tensor('float32', inp, [1, 3, S, S]) };
  const out = (await sess.run(feeds))[sess.outputNames[0]].data;   // (1, 2, 512, 512): a, b
  return out instanceof Float32Array ? out : Float32Array.from(out);
}

// Tô màu cả trang: chia thành các ô gần vuông để tranh nhỏ trong trang cũng được tô đủ chi tiết
export async function colorizeBlob(blob, onStep) {
  const sess = await colorReady();
  const img = await createImageBitmap(blob), W = img.width, H = img.height;
  const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const g = cv.getContext('2d', { willReadFrequently: true }); g.drawImage(img, 0, 0);
  const id = g.getImageData(0, 0, W, H), d = id.data;
  // độ sáng từng điểm
  const Lm = new Float32Array(W * H);
  for (let i = 0, o = 0; i < W * H; i++, o += 4) Lm[i] = Lfast(d[o], d[o + 1], d[o + 2]);
  // tìm vùng tranh ảnh: chia lưới ô 6px, ô "đậm" = trung bình tối; vùng đậm lớn, dày đặc = tranh (chữ và đường kẻ thì nhỏ / mảnh)
  const C = 6, gw = Math.ceil(W / C), gh = Math.ceil(H / C), ink = new Uint8Array(gw * gh);
  for (let cy = 0; cy < gh; cy++) for (let cx = 0; cx < gw; cx++) {
    let sum = 0, cnt = 0;
    for (let y = cy * C; y < Math.min(H, cy * C + C); y++) for (let x = cx * C; x < Math.min(W, cx * C + C); x++) { sum += Lm[y * W + x]; cnt++; }
    ink[cy * gw + cx] = sum / cnt < 80 ? 1 : 0;
  }
  const dil = new Uint8Array(gw * gh);
  for (let cy = 0; cy < gh; cy++) for (let cx = 0; cx < gw; cx++) { let v = 0; for (let dy = -1; dy <= 1 && !v; dy++) for (let dx = -1; dx <= 1; dx++) { const yy = cy + dy, xx = cx + dx; if (yy >= 0 && yy < gh && xx >= 0 && xx < gw && ink[yy * gw + xx]) { v = 1; break; } } dil[cy * gw + cx] = v; }
  const lab = new Int32Array(gw * gh), boxes = [];
  for (let st = 0; st < gw * gh; st++) {
    if (!dil[st] || lab[st]) continue;
    const id2 = boxes.length + 1, q = [st]; lab[st] = id2; let x0 = gw, y0 = gh, x1 = 0, y1 = 0, n = 0, nInk = 0;
    while (q.length) { const c = q.pop(), cx = c % gw, cy = (c / gw) | 0; n++; nInk += ink[c]; if (cx < x0) x0 = cx; if (cx > x1) x1 = cx; if (cy < y0) y0 = cy; if (cy > y1) y1 = cy;
      for (const nb of [c - 1, c + 1, c - gw, c + gw]) { if (nb < 0 || nb >= gw * gh || (nb === c - 1 && cx === 0) || (nb === c + 1 && cx === gw - 1)) continue; if (dil[nb] && !lab[nb]) { lab[nb] = id2; q.push(nb); } } }
    boxes.push({ x0, y0, x1, y1, n, nInk });
  }
  const photos = boxes.filter(b => { const bw = b.x1 - b.x0 + 1, bh = b.y1 - b.y0 + 1; return bw * C >= 60 && bh * C >= 60 && b.nInk / (bw * bh) > 0.28; })
    .map(b => ({ x0: Math.max(0, (b.x0 - 1) * C), y0: Math.max(0, (b.y0 - 1) * C), x1: Math.min(W, (b.x1 + 2) * C), y1: Math.min(H, (b.y1 + 2) * C) }));
  const inPhoto = (x, y) => photos.some(p => x >= p.x0 && x < p.x1 && y >= p.y0 && y < p.y1);
  // tô màu theo từng ô ~640px, chỉ những ô có tranh
  const nx = Math.max(1, Math.round(W / 640)), ny = Math.max(1, Math.round(H / 640)), tw = Math.ceil(W / nx), th = Math.ceil(H / ny);
  const tiles = [];
  for (let ty = 0; ty < ny; ty++) for (let tx = 0; tx < nx; tx++) { const x0 = tx * tw, y0 = ty * th, w = Math.min(tw, W - x0), h = Math.min(th, H - y0); if (photos.some(p => p.x0 < x0 + w && p.x1 > x0 && p.y0 < y0 + h && p.y1 > y0)) tiles.push([x0, y0, w, h]); }
  let k = 0;
  for (const [x0, y0, w, h] of tiles) {
    const ab = await colorTile(sess, img, x0, y0, w, h), n = S * S;
    for (let y = 0; y < h; y++) {
      const fy = Math.min(S - 1, (y + 0.5) * S / h - 0.5), y1 = Math.max(0, Math.floor(fy)), y2 = Math.min(S - 1, y1 + 1), wy = Math.max(0, fy - y1);
      for (let x = 0; x < w; x++) {
        if (!inPhoto(x0 + x, y0 + y)) continue;
        const fx = Math.min(S - 1, (x + 0.5) * S / w - 0.5), x1 = Math.max(0, Math.floor(fx)), x2 = Math.min(S - 1, x1 + 1), wx = Math.max(0, fx - x1);
        const bil = off => { const p = ab[off + y1 * S + x1], q = ab[off + y1 * S + x2], r = ab[off + y2 * S + x1], s2 = ab[off + y2 * S + x2]; return (p * (1 - wx) + q * wx) * (1 - wy) + (r * (1 - wx) + s2 * wx) * wy; };
        const o = ((y0 + y) * W + x0 + x) * 4, L = Lm[(y0 + y) * W + x0 + x];
        const keep = Math.min(1, Math.max(0, (97 - L) / 8));     // nền trắng quanh tranh giữ trắng
        if (keep <= 0) continue;
        lab2rgb(L, bil(0) * keep, bil(n) * keep, d, o);
      }
    }
    onStep && onStep(++k, tiles.length);
  }
  g.putImageData(id, 0, 0);
  img.close && img.close();
  return new Promise(r => cv.toBlob(r, 'image/jpeg', 0.86));
}
