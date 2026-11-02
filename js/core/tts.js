// Giọng đọc tiếng Trung phổ thông qua Web Speech API (giọng có sẵn trong trình duyệt / hệ điều hành)
import { store } from './store.js';

const synth = window.speechSynthesis;
let voices = [];

// Chỉ nhận giọng phổ thông Đại lục; loại giọng phương ngữ (Đông Bắc, Thiểm Tây, Tứ Xuyên…), Quảng Đông, Đài Loan, Hồng Kông
const DIALECT = /liaoning|shaanxi|sichuan|henan|shandong|guangxi|cantonese|粤|台|港|hong ?kong|taiwan|wu|xiaobei|xiaoni|yunxia/i;
function isMandarin(v) {
  const lang = (v.lang || '').replace('_', '-').toLowerCase();
  if (!/^(zh|cmn)/.test(lang)) return false;
  if (/hk|tw|mo|yue|hant/.test(lang)) return false;
  if (/^zh-cn-./.test(lang)) return false;          // zh-CN-liaoning, zh-CN-shaanxi…
  return !DIALECT.test(v.name);
}
// Giọng "vui" của Apple (Eddy, Flo, Grandma, Rocko…) cũng có bản tiếng Trung nhưng đọc rất kém → bỏ qua
const NOVELTY = /^(eddy|flo|grandma|grandpa|reed|rocko|sandy|shelley|albert|bad news|bahh|bells|boing|bubbles|cellos|good news|jester|organ|superstar|trinoids|whisper|wobble|zarvox|junior|kathy|fred|ralph)\b/i;
export const isIOS = typeof navigator !== 'undefined' && (/iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));
const vid = v => v.voiceURI || v.name;
// Bản giọng Apple: compact (mặc định, kém) < enhanced "Nâng cao" < premium "Cao cấp"
const appleTier = v => /premium/i.test(vid(v) + v.name) ? 2 : /enhanced/i.test(vid(v) + v.name) ? 1 : 0;
// Xếp hạng: giọng thần kinh tự nhiên trước, giọng máy cũ sau
function score(v) {
  const n = v.name, u = vid(v); let s = 0;
  if (NOVELTY.test(n)) return -50;
  if (/premium/i.test(n + u)) s += 14; else if (/natural|neural|enhanced/i.test(n + u)) s += 10;
  if (/compact/i.test(u)) s -= 2;
  if (/online/i.test(n)) s += 3;
  if (/google/i.test(n)) s += 6;
  if (/xiaoxiao/i.test(n)) s += 5; if (/yunxi|xiaoyi|yunjian|yunyang/i.test(n)) s += 3;
  if (/tingting|lili|meijia/i.test(n)) s += 4;           // Apple
  if (/huihui|kangkang|yaoyao/i.test(n)) s -= 3;          // giọng Windows cũ, khá "máy"
  if (v.localService === false) s += 1;
  return s;
}
function loadVoices() {
  if (!synth) return;
  const all = synth.getVoices().filter(isMandarin).sort((a, b) => score(b) - score(a));
  const good = all.filter(v => !NOVELTY.test(v.name));
  voices = good.length ? good : all;
}
loadVoices();
if (synth) synth.addEventListener?.('voiceschanged', loadVoices);
// Chờ danh sách giọng (Chrome tải không đồng bộ)
function voicesReady() {
  if (voices.length || !synth) return Promise.resolve();
  return new Promise(res => {
    const t = setTimeout(res, 1500);
    synth.addEventListener?.('voiceschanged', () => { loadVoices(); if (voices.length) { clearTimeout(t); res(); } });
    loadVoices(); if (voices.length) { clearTimeout(t); res(); }
  });
}

export const ttsSupported = () => !!synth;
export const zhVoices = () => voices;
export const voiceId = vid;
export const voiceLabel = v => { const n = v.name.replace(/Microsoft |Online |\(Natural\)|- Chinese \(Mainland\)|- Chinese \(Simplified, PRC\)/g, '').trim(); const t = appleTier(v), tag = t === 2 && !/premium|cao cấp/i.test(n) ? ' (Cao cấp)' : t === 1 && !/enhanced|nâng cao/i.test(n) ? ' (Nâng cao)' : ''; return `${n}${tag}${score(v) >= 9 ? ' ★ tự nhiên' : ''}`; };
// Giọng tốt nhất hiện có đã là giọng tự nhiên chưa (trên iPhone: đã tải bản Nâng cao/Cao cấp chưa)
export const hasGoodVoice = () => !!voices[0] && score(voices[0]) >= 9;
const MALE = /yunxi|yunjian|yunyang|kangkang|male|男/i;
export function voiceFor(role = 0) {
  const s = store.s.settings;
  const want = role === 1 ? s.voice2 : s.voice;
  let v = want && (voices.find(x => vid(x) === want) || voices.find(x => x.name === want));
  if (v) return v;
  const female = voices.filter(x => !MALE.test(x.name)), male = voices.filter(x => MALE.test(x.name));
  if (role === 1) return male[0] || voices.find(x => x !== voiceFor(0)) || voices[0] || null;
  return female[0] || voices[0] || null;
}

// Chữ đơn đa âm: trình duyệt hay đọc sai khi đứng một mình → đọc bằng chữ đồng âm có cách đọc cố định
const SPEAK_AS = { '教': '交', '都': '兜', '只': '指', '为': '位', '差': '岔', '种': '肿', '还': '孩' };
const fixText = t => (SPEAK_AS[t] || t).replace(/[A-Z甲乙][：:]\s*/g, '');

let current = null, keep = null;
export function stop() {
  clearInterval(keep);
  if (synth) synth.cancel();
  current = null;
  document.querySelectorAll('.speaking').forEach(e => e.classList.remove('speaking'));
}

let warned = false;
export async function speak(text, { rate, role = 0, onBoundary, onEnd, el } = {}) {
  if (!synth) { alert('Trình duyệt của bạn không hỗ trợ đọc giọng nói. Hãy dùng Chrome, Edge hoặc Safari bản mới.'); return; }
  stop();
  await voicesReady();
  if (!voices.length && !warned) { warned = true; noVoiceNotice(); }
  else if (isIOS && !warned && !hasGoodVoice()) { warned = true; iosNotice(); }
  await new Promise(r => setTimeout(r, 60));              // Chrome đôi khi bỏ câu nếu speak() ngay sau cancel()
  return new Promise(res => {
    const u = new SpeechSynthesisUtterance(fixText(text));
    u.lang = 'zh-CN';
    const v = voiceFor(role); if (v) u.voice = v;
    u.rate = Math.min(1.6, Math.max(0.5, rate ?? store.s.settings.rate ?? 1));
    u.pitch = 1;
    if (el) el.classList.add('speaking');
    if (onBoundary) u.onboundary = e => onBoundary(e.charIndex, e.charLength || 1);
    let done = false;
    const end = () => { if (done) return; done = true; clearInterval(keep); if (el) el.classList.remove('speaking'); onEnd && onEnd(); res(); };
    u.onend = end; u.onerror = end;
    current = u;                                            // giữ tham chiếu để không bị thu gom bộ nhớ giữa chừng
    synth.speak(u);
    // Giọng Google trên Chrome tự dừng sau ~15 giây: tạm dừng/tiếp tục định kỳ để giữ giọng đọc
    if (v && /google/i.test(v.name)) keep = setInterval(() => { if (!synth.speaking) return clearInterval(keep); synth.pause(); synth.resume(); }, 10000);
    // phòng trường hợp trình duyệt không gọi onend
    setTimeout(() => { if (!synth.speaking) end(); }, Math.max(4000, text.length * 900 / u.rate));
  });
}

// iPhone/iPad: giọng mặc định (bản rút gọn) nghe "máy" – hướng dẫn tải giọng Nâng cao/Cao cấp miễn phí của Apple
function iosNotice() {
  let seen = 0; try { seen = +localStorage.getItem('hv-ios-voice') || 0; } catch {}
  if (Date.now() - seen < 3 * 864e5) return;           // nhắc lại sau 3 ngày nếu chưa tải
  try { localStorage.setItem('hv-ios-voice', Date.now()); } catch {}
  const d = document.createElement('div');
  d.className = 'toast in'; d.style.bottom = '90px';
  d.innerHTML = '🔊 iPhone đang dùng giọng tiếng Trung bản rút gọn nên nghe chưa hay. Tải miễn phí giọng <b>Cao cấp</b> của Apple để nghe chuẩn hơn – <a href="#/settings" style="color:#fff;text-decoration:underline">xem hướng dẫn</a>.';
  document.body.appendChild(d); setTimeout(() => d.remove(), 9000);
}
function noVoiceNotice() {
  const d = document.createElement('div');
  d.className = 'toast in bad'; d.style.bottom = '90px';
  d.innerHTML = 'Thiết bị chưa có giọng đọc tiếng Trung nên âm thanh có thể sai. Hãy dùng <b>Edge</b> hoặc <b>Chrome</b>, hoặc xem hướng dẫn trong <a href="#/settings" style="color:#fff;text-decoration:underline">Cài đặt</a>.';
  document.body.appendChild(d); setTimeout(() => d.remove(), 7000);
}

// Đọc lần lượt nhiều câu (hội thoại) – A/B dùng hai giọng khác nhau nếu có
let seqToken = null;
export async function speakSeq(items, { rate, onItem } = {}) {
  const token = {}; seqToken = token;
  for (let i = 0; i < items.length; i++) {
    if (seqToken !== token) return;
    onItem && onItem(i);
    await speak(items[i].text, { rate, role: items[i].role || 0, el: items[i].el, onBoundary: items[i].onBoundary });
    if (seqToken !== token) return;
    await new Promise(r => setTimeout(r, 450));
  }
  onItem && onItem(-1);
}
export function stopSeq() { seqToken = null; stop(); }

// ── Nhận dạng giọng nói (luyện phát âm) ──
export const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
export function listen() {
  return new Promise((res, rej) => {
    if (!SR) return rej(new Error('Trình duyệt không hỗ trợ nhận dạng giọng nói (hãy dùng Chrome hoặc Edge).'));
    stop();
    const r = new SR(); r.lang = 'zh-CN'; r.interimResults = false; r.maxAlternatives = 3;
    r.onresult = e => res([...e.results[0]].map(x => x.transcript));
    r.onerror = e => rej(new Error(e.error === 'not-allowed' ? 'Bạn chưa cho phép dùng micro.' : e.error === 'no-speech' ? 'Không nghe thấy giọng nói, hãy thử lại.' : 'Lỗi nhận dạng: ' + e.error));
    r.onend = () => res([]);
    r.start();
  });
}
