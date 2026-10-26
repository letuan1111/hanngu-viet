// Trình kiểm tra câu dựa trên quy tắc (không phải AI): phát hiện các lỗi ngữ pháp phổ biến của người Việt ở trình độ HSK 1–3
import { segment, POS } from './dict.js';

const RULES = [
  [/是(很|非常|太|真)/, 'Trước tính từ không dùng 是. Ví dụ: 我很忙 (không nói 我是很忙).', 'g1-hen'],
  [/不有/, '有 phủ định bằng 没: dùng 没有, không dùng 不有.', 'g1-you'],
  [/没是/, '是 phủ định bằng 不: dùng 不是.', 'g1-shi'],
  [/(^|[^十百千万零一二三四五六七八九第])二(个|本|件|口|杯|张|条|辆|位|双|种|块|只|天|年)/, 'Trước lượng từ dùng 两, không dùng 二: 两个人, 两本书.', 'g1-num'],
  [/比[^，。！？]{1,8}(很|非常|太|真)/, 'Câu so sánh với 比 không dùng 很/非常/太 trước tính từ. Có thể thêm 一点儿 hoặc 多了 sau tính từ.', 'g2-bi'],
  [/没[^，。！？]*了[。！]?$/, 'Câu phủ định với 没 thường không dùng 了: 我没去 (không nói 我没去了).', 'g1-le'],
  [/才[^，。！？]*了[。！]?$/, 'Câu dùng 才 (muộn, mới) không thêm 了 ở cuối.', 'g3-cai'],
  [/越来越(很|非常|太)/, 'Sau 越来越 không dùng phó từ mức độ: 越来越好.', 'g3-yue'],
  [/(什么|谁|哪儿|哪里|几|多少|怎么|为什么)[^，。]*吗[？?]?$/, 'Câu đã có đại từ nghi vấn (什么, 谁, 哪儿…) thì không thêm 吗.', 'g1-qw'],
  [/(工作|学习|吃饭|上课|看书)在/, 'Cụm “在 + nơi chốn” đặt TRƯỚC động từ: 我在医院工作.', 'g1-zai'],
  [/(^|[^有])一点儿(贵|大|小|冷|热|累|难|远|忙|长|短|胖)/, '“Hơi…” (không hài lòng) dùng 有一点儿 + tính từ: 有一点儿贵. 一点儿 đứng SAU tính từ khi so sánh: 便宜一点儿.', 'g3-youyidian'],
  [/(认真|高兴|慢慢|快快|努力|大声)的(学习|说|走|写|唱|跑|做|工作)/, 'Trạng ngữ đứng trước động từ dùng 地: 认真地学习.', 'g3-dev'],
  [/(说|跑|写|做|来|起|唱|学|吃|睡)的(很|非常|太|真|不)/, 'Bổ ngữ trình độ sau động từ dùng 得: 说得很好.', 'g2-de'],
  [/或者[^，。]*[？?]$/, 'Câu hỏi lựa chọn dùng 还是, không dùng 或者.', 'g3-haishi'],
  [/^都/, '都 phải đứng sau chủ ngữ: 我们都是学生.', 'g1-dou'],
  [/^也/, '也 phải đứng sau chủ ngữ: 我也喜欢.', 'g2-ye-hai'],
  [/(明天|昨天)[^，。]*(快要)[^，。]*了/, 'Khi có thời gian cụ thể dùng 就要…了 thay cho 快要…了.', 'g2-yao'],
  [/(喜欢|知道|是|有)[^，。]*$/, null], // giữ chỗ (không báo)
  [/把[^，。！？]{1,6}(写|吃|看|做|买|拿|放|关|开)[。！]?$/, 'Trong câu 把, sau động từ cần thêm thành phần khác (了, bổ ngữ kết quả…): 我把作业写完了.', 'g3-ba'],
  [/(去|来|回)[^，。！？]{0,6}(明天|今天|昨天|下午|上午|晚上)[。！]?$/, 'Từ chỉ thời gian thường đặt trước động từ: 我明天去北京 (không đặt cuối câu như tiếng Việt).', 'g1-time'],
  [/书我的|朋友我的|老师我的/, 'Định ngữ đứng trước danh từ: 我的书 (sách của tôi).', 'g1-de'],
];

export function checkSentence(text) {
  const s = text.trim();
  const issues = [];
  if (!s) return { issues, tokens: [] };
  if (!/\p{Script=Han}/u.test(s)) issues.push({ msg: 'Câu chưa có chữ Hán. Hãy gõ bằng bộ gõ tiếng Trung (pinyin).' });
  for (const [re, msg, g] of RULES) if (msg && re.test(s)) issues.push({ msg, g });
  const tokens = segment(s);
  const unknown = tokens.filter(t => t.han && !t.w).map(t => t.t);
  if (unknown.length) issues.push({ msg: `Có chữ ngoài từ điển HSK 1–3: ${[...new Set(unknown)].join('、')} – hãy kiểm tra lại cách viết.`, info: true });
  if (!/[。！？?!.]$/.test(s)) issues.push({ msg: 'Nhớ kết thúc câu bằng dấu câu tiếng Trung: 。！？', info: true });
  return { issues, tokens };
}

// Phân tích thành phần câu đơn giản theo từ loại (mức HSK 1–3)
const ROLE = { 'đt': 'Đại từ', d: 'Danh từ', 'đg': 'Động từ', n: 'Năng nguyện', t: 'Tính từ', p: 'Phó từ', gi: 'Giới từ', lt: 'Liên từ', tr: 'Trợ từ', s: 'Số từ', l: 'Lượng từ', c: 'Cụm từ' };
export function analyse(text) {
  return segment(text).filter(t => t.t.trim()).map(t => ({ t: t.t, pos: t.w?.pos || (t.han ? '?' : 'pn'), label: t.w ? (ROLE[t.w.pos] || POS[t.w.pos]) : t.han ? 'Chưa rõ' : 'Dấu câu', vi: t.w?.vi || '' }));
}
