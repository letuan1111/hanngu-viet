// Giọng đọc tiếng Trung qua Web Speech API (giọng có sẵn trong trình duyệt / hệ điều hành)
import { store } from './store.js';

const synth = window.speechSynthesis;
let voices = [];
function loadVoices() {
  if (!synth) return;
  voices = synth.getVoices().filter(v => /^(zh|cmn)/i.test(v.lang) && !/hk|tw|yue|hant/i.test(v.lang));
  // ưu tiên giọng tự nhiên (Natural / Online / Google)
  voices.sort((a, b) => score(b) - score(a));
}
function score(v) { let s = 0; if (/natural|neural/i.test(v.name)) s += 4; if (/online|google/i.test(v.name)) s += 2; if (/xiaoxiao|yunxi|xiaoyi|yunjian|tingting/i.test(v.name)) s += 1; return s; }
loadVoices();
if (synth) synth.onvoiceschanged = loadVoices;

export const ttsSupported = () => !!synth;
export const zhVoices = () => voices;
const maleRe = /yunxi|yunjian|yunyang|kangkang|male|男/i;
export function voiceFor(role = 0) {
  const s = store.s.settings;
  const want = role === 1 ? s.voice2 : s.voice;
  let v = voices.find(x => x.name === want);
  if (!v && role === 1) v = voices.find(x => maleRe.test(x.name)) || voices[1] || voices[0];
  return v || voices.find(x => !maleRe.test(x.name)) || voices[0] || null;
}

let current = null;
export function stop() { if (synth) synth.cancel(); current = null; document.querySelectorAll('.speaking').forEach(e => e.classList.remove('speaking')); }

export function speak(text, { rate, role = 0, onBoundary, onEnd, el } = {}) {
  if (!synth) { alert('Trình duyệt của bạn không hỗ trợ đọc giọng nói. Hãy dùng Chrome, Edge hoặc Safari bản mới.'); return Promise.resolve(); }
  stop();
  return new Promise(res => {
    const u = new SpeechSynthesisUtterance(text.replace(/[A-Z]：/g, ''));
    u.lang = 'zh-CN';
    const v = voiceFor(role); if (v) u.voice = v;
    u.rate = (rate ?? store.s.settings.rate) * 0.95;
    if (el) el.classList.add('speaking');
    if (onBoundary) u.onboundary = e => onBoundary(e.charIndex, e.charLength || 1);
    u.onend = u.onerror = () => { if (el) el.classList.remove('speaking'); onEnd && onEnd(); res(); };
    current = u;
    synth.speak(u);
    // một số trình duyệt bị "ngủ" sau ~15s – giữ cho chạy tiếp
    const keep = setInterval(() => { if (!synth.speaking) clearInterval(keep); else if (synth.paused) synth.resume(); }, 5000);
  });
}

// Đọc lần lượt nhiều câu (hội thoại) – A/B dùng hai giọng khác nhau nếu có
export async function speakSeq(items, { rate, onItem } = {}) {
  const token = {}; seqToken = token;
  for (let i = 0; i < items.length; i++) {
    if (seqToken !== token) return;
    onItem && onItem(i);
    await speak(items[i].text, { rate, role: items[i].role || 0, el: items[i].el, onBoundary: items[i].onBoundary });
    await new Promise(r => setTimeout(r, 350));
  }
  onItem && onItem(-1);
}
let seqToken = null;
export function stopSeq() { seqToken = null; stop(); }

// ── Nhận dạng giọng nói (luyện phát âm) ──
export const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
export function listen() {
  return new Promise((res, rej) => {
    if (!SR) return rej(new Error('Trình duyệt không hỗ trợ nhận dạng giọng nói (hãy dùng Chrome hoặc Edge).'));
    const r = new SR(); r.lang = 'zh-CN'; r.interimResults = false; r.maxAlternatives = 3;
    r.onresult = e => res([...e.results[0]].map(x => x.transcript));
    r.onerror = e => rej(new Error(e.error === 'not-allowed' ? 'Bạn chưa cho phép dùng micro.' : e.error === 'no-speech' ? 'Không nghe thấy giọng nói, hãy thử lại.' : 'Lỗi nhận dạng: ' + e.error));
    r.onend = () => res([]);
    r.start();
  });
}
