// Nội dung phần Luyện phát âm (pinyin) cho người Việt.
// Ví dụ: [chữ Hán, pinyin, nghĩa]

export const TONES = [
  { n: 1, mark: 'ˉ', name: 'Thanh 1', pitch: [5, 5], how: 'Cao và đều, giữ nguyên độ cao từ đầu đến cuối, hơi kéo dài.', vn: 'Giống thanh ngang (không dấu) của tiếng Việt nhưng cao hơn hẳn – như khi ngân một nốt nhạc cao.', tip: 'Người Việt hay đọc thanh 1 quá thấp, nghe như thanh ngang bình thường. Hãy nâng giọng lên cao.',
    ex: [['妈', 'mā', 'mẹ'], ['飞', 'fēi', 'bay'], ['书', 'shū', 'sách'], ['喝', 'hē', 'uống'], ['天', 'tiān', 'trời'], ['开车', 'kāichē', 'lái xe']] },
  { n: 2, mark: 'ˊ', name: 'Thanh 2', pitch: [3, 5], how: 'Từ giữa đi lên cao, như giọng hỏi lại ngạc nhiên.', vn: 'Gần thanh sắc nhưng lên từ từ và kéo dài hơn, như khi hỏi lại “Hả?”.', tip: 'Đừng đọc ngắn và gắt như thanh sắc; hãy để giọng trượt lên.',
    ex: [['麻', 'má', 'tê, cây gai'], ['来', 'lái', 'đến'], ['茶', 'chá', 'trà'], ['学', 'xué', 'học'], ['人', 'rén', 'người'], ['同学', 'tóngxué', 'bạn học']] },
  { n: 3, mark: 'ˇ', name: 'Thanh 3', pitch: [2, 1, 4], how: 'Xuống thấp rồi lên. Khi đứng trước âm tiết khác thường chỉ đọc nửa đầu: thấp và trầm.', vn: 'Đọc riêng thì gần thanh hỏi; trong câu thì gần thanh nặng nhưng kéo dài, giọng trầm xuống.', tip: 'Điều quan trọng nhất của thanh 3 là độ THẤP. Hạ giọng xuống thật trầm, đừng cố lên cao ở cuối khi nói nhanh.',
    ex: [['马', 'mǎ', 'ngựa'], ['我', 'wǒ', 'tôi'], ['好', 'hǎo', 'tốt'], ['你', 'nǐ', 'bạn'], ['水', 'shuǐ', 'nước'], ['老师', 'lǎoshī', 'giáo viên']] },
  { n: 4, mark: 'ˋ', name: 'Thanh 4', pitch: [5, 1], how: 'Từ cao rơi xuống thấp thật nhanh, dứt khoát.', vn: 'Như khi ra lệnh “Đi!” hoặc nói “Không!” dứt khoát. Gần thanh huyền nhưng bắt đầu rất cao và rơi mạnh, ngắn.', tip: 'Người Việt hay đọc thanh 4 thành thanh huyền (thấp, đều). Hãy bắt đầu ở độ cao của thanh 1 rồi rơi xuống.',
    ex: [['骂', 'mà', 'mắng'], ['是', 'shì', 'là'], ['去', 'qù', 'đi'], ['大', 'dà', 'to'], ['谢谢', 'xièxie', 'cảm ơn'], ['再见', 'zàijiàn', 'tạm biệt']] },
  { n: 0, mark: '', name: 'Thanh nhẹ', pitch: [3, 3], how: 'Nhẹ, ngắn, không đánh dấu. Độ cao phụ thuộc vào âm tiết đứng trước.', vn: 'Đọc lướt nhanh như âm phụ, giống tiếng thứ hai trong “ba ba” khi gọi nhanh.', tip: 'Thường gặp ở chữ lặp (妈妈, 爸爸), trợ từ (的, 了, 吗, 呢) và hậu tố (子, 们).',
    ex: [['妈妈', 'māma', 'mẹ'], ['爸爸', 'bàba', 'bố'], ['吗', 'ma', '(trợ từ hỏi)'], ['的', 'de', 'của'], ['桌子', 'zhuōzi', 'cái bàn'], ['我们', 'wǒmen', 'chúng tôi']] },
];
// Bộ luyện 4 thanh trên cùng một âm tiết
export const TONE_SETS = [
  [['妈', 'mā'], ['麻', 'má'], ['马', 'mǎ'], ['骂', 'mà']],
  [['八', 'bā'], ['拔', 'bá'], ['把', 'bǎ'], ['爸', 'bà']],
  [['衣', 'yī'], ['姨', 'yí'], ['椅', 'yǐ'], ['意', 'yì']],
  [['汤', 'tāng'], ['糖', 'táng'], ['躺', 'tǎng'], ['烫', 'tàng']],
  [['书', 'shū'], ['熟', 'shú'], ['鼠', 'shǔ'], ['树', 'shù']],
  [['通', 'tōng'], ['同', 'tóng'], ['桶', 'tǒng'], ['痛', 'tòng']],
];
// Kết hợp hai thanh (luyện theo từ hai âm tiết)
export const TONE_PAIRS = [
  ['1+1', [['今天', 'jīntiān', 'hôm nay'], ['飞机', 'fēijī', 'máy bay'], ['咖啡', 'kāfēi', 'cà phê']]],
  ['1+2', [['中国', 'Zhōngguó', 'Trung Quốc'], ['欢迎', 'huānyíng', 'hoan nghênh'], ['新闻', 'xīnwén', 'tin tức']]],
  ['1+3', [['铅笔', 'qiānbǐ', 'bút chì'], ['开始', 'kāishǐ', 'bắt đầu'], ['身体', 'shēntǐ', 'cơ thể']]],
  ['1+4', [['商店', 'shāngdiàn', 'cửa hàng'], ['音乐', 'yīnyuè', 'âm nhạc'], ['工作', 'gōngzuò', 'công việc']]],
  ['2+1', [['昨天', 'zuótiān', 'hôm qua'], ['明天', 'míngtiān', 'ngày mai'], ['时间', 'shíjiān', 'thời gian']]],
  ['2+2', [['同学', 'tóngxué', 'bạn học'], ['银行', 'yínháng', 'ngân hàng'], ['学习', 'xuéxí', 'học tập']]],
  ['2+3', [['苹果', 'píngguǒ', 'quả táo'], ['游泳', 'yóuyǒng', 'bơi'], ['词典', 'cídiǎn', 'từ điển']]],
  ['2+4', [['学校', 'xuéxiào', 'trường học'], ['离开', 'líkāi', 'rời đi'], ['人类', 'rénlèi', 'loài người']]],
  ['3+1', [['老师', 'lǎoshī', 'giáo viên'], ['北京', 'Běijīng', 'Bắc Kinh'], ['手机', 'shǒujī', 'điện thoại']]],
  ['3+2', [['旅游', 'lǚyóu', 'du lịch'], ['以前', 'yǐqián', 'trước đây'], ['水平', 'shuǐpíng', 'trình độ']]],
  ['3+3', [['你好', 'nǐ hǎo', 'xin chào'], ['水果', 'shuǐguǒ', 'hoa quả'], ['可以', 'kěyǐ', 'có thể']]],
  ['3+4', [['考试', 'kǎoshì', 'thi'], ['礼物', 'lǐwù', 'quà'], ['米饭', 'mǐfàn', 'cơm']]],
  ['4+1', [['汽车', 'qìchē', 'ô tô'], ['面包', 'miànbāo', 'bánh mì'], ['上班', 'shàngbān', 'đi làm']]],
  ['4+2', [['问题', 'wèntí', 'vấn đề'], ['练习', 'liànxí', 'luyện tập'], ['大学', 'dàxué', 'đại học']]],
  ['4+3', [['电脑', 'diànnǎo', 'máy tính'], ['跳舞', 'tiàowǔ', 'nhảy múa'], ['汉语', 'Hànyǔ', 'tiếng Hán']]],
  ['4+4', [['再见', 'zàijiàn', 'tạm biệt'], ['睡觉', 'shuìjiào', 'ngủ'], ['电视', 'diànshì', 'tivi']]],
];

// Biến điệu
export const SANDHI = [
  { t: 'Hai thanh 3 đi liền nhau', rule: 'Thanh 3 + thanh 3 → âm tiết đầu đọc thành thanh 2. Pinyin vẫn viết dấu thanh 3.', ex: [['你好', 'nǐ hǎo', 'đọc: ní hǎo'], ['很好', 'hěn hǎo', 'đọc: hén hǎo'], ['水果', 'shuǐguǒ', 'đọc: shuíguǒ'], ['可以', 'kěyǐ', 'đọc: kéyǐ'], ['洗澡', 'xǐzǎo', 'đọc: xízǎo']] },
  { t: 'Nửa thanh 3', rule: 'Thanh 3 đứng trước thanh 1, 2, 4 hoặc thanh nhẹ chỉ đọc phần thấp (xuống rồi không lên).', ex: [['好吃', 'hǎochī', 'ngon'], ['很忙', 'hěn máng', 'rất bận'], ['老师', 'lǎoshī', 'giáo viên'], ['我们', 'wǒmen', 'chúng tôi'], ['你是', 'nǐ shì', 'bạn là']] },
  { t: '不 bù', rule: '不 đứng trước thanh 4 → đọc bú (thanh 2). Các trường hợp khác giữ bù.', ex: [['不是', 'bú shì', 'không phải'], ['不对', 'bú duì', 'không đúng'], ['不去', 'bú qù', 'không đi'], ['不好', 'bù hǎo', 'không tốt'], ['不来', 'bù lái', 'không đến']] },
  { t: '一 yī', rule: '一 trước thanh 4 → yí; trước thanh 1, 2, 3 → yì; khi đếm số, số thứ tự hoặc đứng cuối → yī.', ex: [['一个', 'yí ge', 'một cái'], ['一样', 'yíyàng', 'giống nhau'], ['一天', 'yì tiān', 'một ngày'], ['一起', 'yìqǐ', 'cùng nhau'], ['第一', 'dì yī', 'thứ nhất']] },
  { t: 'Âm cuốn lưỡi 儿', rule: '儿 gắn vào sau âm tiết trước, đọc liền thành một âm có cuốn lưỡi: thêm “r” vào pinyin.', ex: [['哪儿', 'nǎr', 'ở đâu'], ['这儿', 'zhèr', 'ở đây'], ['一点儿', 'yìdiǎnr', 'một chút'], ['玩儿', 'wánr', 'chơi'], ['一会儿', 'yíhuìr', 'một lát']] },
];

// Thanh mẫu (phụ âm đầu)
export const INITIALS = [
  { g: 'Âm môi', d: 'Dùng hai môi hoặc môi dưới với răng trên.', items: [
    { s: 'b', ipa: 'p', how: 'Hai môi khép rồi bật ra nhẹ, không bật hơi, không rung dây thanh.', vn: 'Gần “b” tiếng Việt nhưng “cứng” và nhẹ hơn, giống “p” trong “sp” của tiếng Anh.', err: 'Đừng đọc thành “b” nặng có rung họng của tiếng Việt.', ex: [['爸爸', 'bàba', 'bố'], ['八', 'bā', 'tám'], ['不', 'bù', 'không'], ['北京', 'Běijīng', 'Bắc Kinh'], ['本', 'běn', 'quyển']] },
    { s: 'p', ipa: 'pʰ', how: 'Giống b nhưng bật mạnh luồng hơi ra. Đặt tờ giấy trước miệng, giấy phải rung.', vn: 'Tiếng Việt không có âm này; giống “p” đầu từ trong tiếng Anh (park).', err: 'Người Việt hay đọc p thành “b” hoặc “ph”. Nhớ: p là bật hơi, không phải f.', ex: [['朋友', 'péngyou', 'bạn bè'], ['跑', 'pǎo', 'chạy'], ['苹果', 'píngguǒ', 'quả táo'], ['漂亮', 'piàoliang', 'đẹp'], ['便宜', 'piányi', 'rẻ']] },
    { s: 'm', ipa: 'm', how: 'Hai môi khép, hơi ra đường mũi.', vn: 'Giống hệt “m” tiếng Việt.', err: '', ex: [['妈妈', 'māma', 'mẹ'], ['买', 'mǎi', 'mua'], ['没有', 'méiyǒu', 'không có'], ['米饭', 'mǐfàn', 'cơm'], ['猫', 'māo', 'mèo']] },
    { s: 'f', ipa: 'f', how: 'Răng trên chạm môi dưới, thổi hơi ra.', vn: 'Giống “ph” tiếng Việt.', err: '', ex: [['饭', 'fàn', 'cơm'], ['飞机', 'fēijī', 'máy bay'], ['房子', 'fángzi', 'nhà'], ['分钟', 'fēnzhōng', 'phút'], ['服务员', 'fúwùyuán', 'phục vụ']] },
  ] },
  { g: 'Âm đầu lưỡi', d: 'Đầu lưỡi chạm vào lợi (chân răng) trên.', items: [
    { s: 'd', ipa: 't', how: 'Đầu lưỡi chạm chân răng trên rồi bật ra nhẹ, không bật hơi.', vn: 'Giống “t” tiếng Việt (tôi, tám) – không phải “đ”.', err: 'Người Việt hay đọc d thành “đ” hoặc “d/z”. 大 dà đọc gần “tà” chứ không phải “đà” hay “da”.', ex: [['大', 'dà', 'to'], ['的', 'de', 'của'], ['电视', 'diànshì', 'tivi'], ['对', 'duì', 'đúng'], ['弟弟', 'dìdi', 'em trai']] },
    { s: 't', ipa: 'tʰ', how: 'Giống d nhưng bật mạnh hơi ra.', vn: 'Giống “th” tiếng Việt (thầy, thương).', err: '', ex: [['他', 'tā', 'anh ấy'], ['天气', 'tiānqì', 'thời tiết'], ['太', 'tài', 'quá'], ['听', 'tīng', 'nghe'], ['同学', 'tóngxué', 'bạn học']] },
    { s: 'n', ipa: 'n', how: 'Đầu lưỡi chạm chân răng trên, hơi ra đường mũi.', vn: 'Giống “n” tiếng Việt.', err: 'Đừng lẫn n với l (lỗi của một số vùng ở Việt Nam).', ex: [['你', 'nǐ', 'bạn'], ['呢', 'ne', '(trợ từ)'], ['女儿', 'nǚ’ér', 'con gái'], ['年', 'nián', 'năm'], ['能', 'néng', 'có thể']] },
    { s: 'l', ipa: 'l', how: 'Đầu lưỡi chạm chân răng trên, hơi đi ra hai bên lưỡi.', vn: 'Giống “l” tiếng Việt.', err: 'Đừng lẫn l với n.', ex: [['来', 'lái', 'đến'], ['老师', 'lǎoshī', 'giáo viên'], ['冷', 'lěng', 'lạnh'], ['六', 'liù', 'sáu'], ['绿', 'lǜ', 'xanh lá']] },
  ] },
  { g: 'Âm cuống lưỡi', d: 'Cuống lưỡi nâng lên chạm hoặc gần chạm ngạc mềm.', items: [
    { s: 'g', ipa: 'k', how: 'Cuống lưỡi chạm ngạc mềm rồi bật ra nhẹ, không bật hơi.', vn: 'Giống “c/k” tiếng Việt (cá, kém) – không phải “g”.', err: '哥哥 gēge đọc gần “cơ cơ”, không phải “gơ gơ”.', ex: [['哥哥', 'gēge', 'anh trai'], ['个', 'gè', 'cái'], ['高兴', 'gāoxìng', 'vui'], ['工作', 'gōngzuò', 'làm việc'], ['贵', 'guì', 'đắt']] },
    { s: 'k', ipa: 'kʰ', how: 'Giống g nhưng bật mạnh hơi ra.', vn: 'Như “c” tiếng Việt nhưng bật hơi; không phải “kh” (kh là âm xát).', err: 'Đừng đọc k thành “kh”: 看 kàn không phải “khan”.', ex: [['看', 'kàn', 'xem'], ['咖啡', 'kāfēi', 'cà phê'], ['开', 'kāi', 'mở'], ['块', 'kuài', 'đồng (tiền)'], ['考试', 'kǎoshì', 'thi']] },
    { s: 'h', ipa: 'x', how: 'Cuống lưỡi nâng gần ngạc mềm, hơi cọ xát đi ra.', vn: 'Giống “kh” tiếng Việt (khá, không), không phải “h” nhẹ.', err: '好 hǎo đọc gần “khảo” chứ không phải “hảo” nhẹ.', ex: [['好', 'hǎo', 'tốt'], ['喝', 'hē', 'uống'], ['很', 'hěn', 'rất'], ['回', 'huí', 'về'], ['汉语', 'Hànyǔ', 'tiếng Hán']] },
  ] },
  { g: 'Âm mặt lưỡi', d: 'Mặt lưỡi áp vào ngạc cứng, đầu lưỡi tựa sau răng dưới. Chỉ đi với i và ü.', items: [
    { s: 'j', ipa: 'tɕ', how: 'Mặt lưỡi áp ngạc cứng rồi bật ra nhẹ, không bật hơi, môi dẹt như cười.', vn: 'Gần “ch” tiếng Việt (chị, chim) nhưng mềm hơn.', err: 'Đừng đọc j thành “gi/d”: 家 jiā gần “chia”, không phải “gia”.', ex: [['家', 'jiā', 'nhà'], ['几', 'jǐ', 'mấy'], ['今天', 'jīntiān', 'hôm nay'], ['觉得', 'juéde', 'cảm thấy'], ['九', 'jiǔ', 'chín']] },
    { s: 'q', ipa: 'tɕʰ', how: 'Giống j nhưng bật mạnh hơi ra.', vn: 'Như “ch” tiếng Việt có bật hơi. Không phải “k” hay “q” tiếng Việt.', err: 'Lỗi rất phổ biến: đọc q thành “qu/k”. 去 qù đọc gần “chuy” (bật hơi), 七 qī gần “chi”.', ex: [['去', 'qù', 'đi'], ['钱', 'qián', 'tiền'], ['七', 'qī', 'bảy'], ['请', 'qǐng', 'mời'], ['汽车', 'qìchē', 'ô tô']] },
    { s: 'x', ipa: 'ɕ', how: 'Mặt lưỡi gần ngạc cứng, hơi cọ xát qua khe hẹp, môi dẹt.', vn: 'Gần “x” tiếng Việt nhưng mặt lưỡi nâng cao hơn, nghe “mềm” như nửa x nửa s.', err: 'Đừng đọc x thành “s” uốn lưỡi.', ex: [['谢谢', 'xièxie', 'cảm ơn'], ['喜欢', 'xǐhuan', 'thích'], ['小', 'xiǎo', 'nhỏ'], ['学习', 'xuéxí', 'học tập'], ['下午', 'xiàwǔ', 'buổi chiều']] },
  ] },
  { g: 'Âm uốn lưỡi', d: 'Đầu lưỡi cong lên chạm hoặc gần chạm phần ngạc cứng phía trước.', items: [
    { s: 'zh', ipa: 'ʈʂ', how: 'Đầu lưỡi cong lên chạm ngạc cứng rồi bật ra, không bật hơi.', vn: 'Gần “tr” tiếng Việt (giọng phân biệt tr/ch rõ).', err: 'Người miền Bắc hay đọc zh thành “ch” – cần cong lưỡi.', ex: [['这', 'zhè', 'này'], ['中国', 'Zhōngguó', 'Trung Quốc'], ['桌子', 'zhuōzi', 'cái bàn'], ['住', 'zhù', 'sống, ở'], ['知道', 'zhīdào', 'biết']] },
    { s: 'ch', ipa: 'ʈʂʰ', how: 'Giống zh nhưng bật mạnh hơi ra.', vn: 'Như “tr” tiếng Việt có bật hơi mạnh.', err: 'Đừng đọc ch của pinyin thành “ch” tiếng Việt – phải cong lưỡi và bật hơi.', ex: [['吃', 'chī', 'ăn'], ['茶', 'chá', 'trà'], ['出租车', 'chūzūchē', 'taxi'], ['唱歌', 'chànggē', 'hát'], ['长', 'cháng', 'dài']] },
    { s: 'sh', ipa: 'ʂ', how: 'Đầu lưỡi cong lên gần ngạc cứng, hơi cọ xát đi ra.', vn: 'Gần “s” tiếng Việt khi đọc chuẩn có uốn lưỡi (sông, sách).', err: 'Đừng đọc sh thành “x”: 是 shì khác 四 sì.', ex: [['是', 'shì', 'là'], ['书', 'shū', 'sách'], ['谁', 'shéi', 'ai'], ['水', 'shuǐ', 'nước'], ['商店', 'shāngdiàn', 'cửa hàng']] },
    { s: 'r', ipa: 'ʐ', how: 'Lưỡi cong như sh nhưng rung dây thanh.', vn: 'Gần “r” đọc nhẹ kiểu “gi” cong lưỡi; không rung đầu lưỡi như r tiếng Việt.', err: 'Đừng đọc r thành “d/z” hay “l”: 热 rè khác 乐 lè.', ex: [['人', 'rén', 'người'], ['热', 'rè', 'nóng'], ['日', 'rì', 'ngày'], ['认识', 'rènshi', 'quen biết'], ['让', 'ràng', 'để, bảo']] },
  ] },
  { g: 'Âm đầu lưỡi trước', d: 'Đầu lưỡi thẳng, chạm hoặc gần chạm mặt sau răng trên.', items: [
    { s: 'z', ipa: 'ts', how: 'Đầu lưỡi chạm sau răng trên rồi bật ra kèm tiếng xì nhẹ, không bật hơi.', vn: 'Như đọc liền “t” với “x”: “tx”. Tiếng Việt không có âm này.', err: 'Đừng đọc z thành “d/gi”: 在 zài gần “tsai”, không phải “dai”.', ex: [['在', 'zài', 'ở'], ['再见', 'zàijiàn', 'tạm biệt'], ['坐', 'zuò', 'ngồi'], ['字', 'zì', 'chữ'], ['走', 'zǒu', 'đi bộ']] },
    { s: 'c', ipa: 'tsʰ', how: 'Giống z nhưng bật mạnh hơi ra.', vn: 'Như “ts” bật hơi. Tiếng Việt không có âm này.', err: 'Lỗi rất phổ biến: đọc c thành “x” hoặc “c/k”. 菜 cài gần “tshai”.', ex: [['菜', 'cài', 'món ăn'], ['次', 'cì', 'lần'], ['从', 'cóng', 'từ'], ['错', 'cuò', 'sai'], ['草', 'cǎo', 'cỏ']] },
    { s: 's', ipa: 's', how: 'Đầu lưỡi gần sau răng trên, hơi cọ xát đi ra, không cong lưỡi.', vn: 'Giống “x” tiếng Việt (xa, xinh).', err: 'Đừng cong lưỡi – s khác sh.', ex: [['三', 'sān', 'ba'], ['四', 'sì', 'bốn'], ['岁', 'suì', 'tuổi'], ['送', 'sòng', 'tặng'], ['所以', 'suǒyǐ', 'cho nên']] },
  ] },
  { g: 'Bán nguyên âm', d: 'y và w không phải phụ âm thật: là cách viết khi âm tiết bắt đầu bằng i, ü hoặc u.', items: [
    { s: 'y', ipa: 'j', how: 'Viết thay cho i (hoặc ü) khi đứng đầu âm tiết: yi, ya, ye, yao, you, yan, yin, yang, ying, yong; yu = ü.', vn: 'Đọc như “d” nhẹ miền Nam / “i” lướt.', err: 'yu, yue, yuan, yun đọc với ü (chu môi), không phải u.', ex: [['一', 'yī', 'một'], ['有', 'yǒu', 'có'], ['也', 'yě', 'cũng'], ['要', 'yào', 'muốn'], ['鱼', 'yú', 'cá']] },
    { s: 'w', ipa: 'w', how: 'Viết thay cho u khi đứng đầu âm tiết: wu, wa, wo, wai, wei, wan, wen, wang, weng.', vn: 'Đọc như “u/o” lướt: wo ≈ “uô”, wa ≈ “oa”.', err: '', ex: [['我', 'wǒ', 'tôi'], ['五', 'wǔ', 'năm'], ['晚上', 'wǎnshang', 'buổi tối'], ['问', 'wèn', 'hỏi'], ['王', 'Wáng', 'họ Vương']] },
  ] },
];

// Vận mẫu (phần vần)
export const FINALS = [
  { g: 'Nguyên âm đơn', d: 'Sáu nguyên âm cơ bản và âm er.', items: [
    { s: 'a', how: 'Mở miệng to, lưỡi hạ thấp.', vn: 'Giống “a” tiếng Việt.', ex: [['八', 'bā', 'tám'], ['大', 'dà', 'to'], ['他', 'tā', 'anh ấy'], ['妈', 'mā', 'mẹ'], ['茶', 'chá', 'trà']] },
    { s: 'o', how: 'Môi tròn, hơi trượt từ “u” sang “ô”.', vn: 'Đứng sau b p m f đọc gần “ua/uô”: bo ≈ “bua”, mo ≈ “mua”.', err: 'Đừng đọc o thành “o” tiếng Việt mở rộng.', ex: [['婆婆', 'pópo', 'mẹ chồng'], ['波', 'bō', 'sóng'], ['破', 'pò', 'rách'], ['摸', 'mō', 'sờ'], ['佛', 'fó', 'Phật']] },
    { s: 'e', how: 'Lưỡi lùi về sau, môi không tròn, miệng hé vừa.', vn: 'Gần “ơ” tiếng Việt nhưng lưỡi lùi sau, nghe như giữa “ơ” và “ưa”. Không phải “e” tiếng Việt.', err: 'Lỗi rất phổ biến: đọc e thành “e”. 喝 hē đọc gần “khơ”.', ex: [['喝', 'hē', 'uống'], ['饿', 'è', 'đói'], ['车', 'chē', 'xe'], ['哥哥', 'gēge', 'anh trai'], ['热', 'rè', 'nóng']] },
    { s: 'i', how: 'Môi dẹt, lưỡi nâng cao về trước.', vn: 'Giống “i” tiếng Việt. Riêng sau z c s và zh ch sh r, i đọc thành “ư” (xem nhóm “-i đặc biệt”).', ex: [['你', 'nǐ', 'bạn'], ['七', 'qī', 'bảy'], ['米', 'mǐ', 'gạo'], ['弟弟', 'dìdi', 'em trai'], ['一', 'yī', 'một']] },
    { s: 'u', how: 'Môi tròn, chu ra, lưỡi lùi sau.', vn: 'Giống “u” tiếng Việt.', ex: [['五', 'wǔ', 'năm'], ['不', 'bù', 'không'], ['书', 'shū', 'sách'], ['路', 'lù', 'đường'], ['父母', 'fùmǔ', 'bố mẹ']] },
    { s: 'ü', how: 'Đặt lưỡi như đọc i rồi chu tròn môi, giữ nguyên lưỡi.', vn: 'Gần “uy” đọc liền một âm, môi tròn từ đầu đến cuối. Tiếng Việt không có âm này.', err: 'Sau j q x y viết là u (ju, qu, xu, yu) nhưng vẫn đọc ü. Sau n l viết ü (nü, lü).', ex: [['女', 'nǚ', 'nữ'], ['绿', 'lǜ', 'xanh lá'], ['去', 'qù', 'đi'], ['鱼', 'yú', 'cá'], ['雨', 'yǔ', 'mưa']] },
    { s: 'er', how: 'Đọc “e” rồi cong đầu lưỡi lên.', vn: 'Như “ơ” cuốn lưỡi (giống “er” tiếng Anh Mỹ).', ex: [['二', 'èr', 'hai'], ['儿子', 'érzi', 'con trai'], ['耳朵', 'ěrduo', 'tai'], ['女儿', 'nǚ’ér', 'con gái'], ['而且', 'érqiě', 'hơn nữa']] },
  ] },
  { g: 'Nguyên âm kép', d: 'Hai nguyên âm trượt liền nhau, âm đầu rõ, âm sau nhẹ.', items: [
    { s: 'ai', how: 'Từ a trượt nhẹ sang i.', vn: 'Giống “ai” tiếng Việt.', ex: [['爱', 'ài', 'yêu'], ['买', 'mǎi', 'mua'], ['来', 'lái', 'đến'], ['开', 'kāi', 'mở'], ['菜', 'cài', 'món ăn']] },
    { s: 'ei', how: 'Từ e (giống ê) trượt sang i.', vn: 'Giống “ây” tiếng Việt.', ex: [['美', 'měi', 'đẹp'], ['给', 'gěi', 'cho'], ['黑', 'hēi', 'đen'], ['北', 'běi', 'bắc'], ['谁', 'shéi', 'ai']] },
    { s: 'ao', how: 'Từ a trượt sang o/u, môi tròn dần.', vn: 'Giống “ao” tiếng Việt.', ex: [['好', 'hǎo', 'tốt'], ['老', 'lǎo', 'già'], ['早', 'zǎo', 'sớm'], ['猫', 'māo', 'mèo'], ['高', 'gāo', 'cao']] },
    { s: 'ou', how: 'Từ o trượt sang u.', vn: 'Giống “âu” tiếng Việt.', err: 'Không đọc thành “ô” hay “ou” kiểu tiếng Anh.', ex: [['有', 'yǒu', 'có'], ['狗', 'gǒu', 'chó'], ['走', 'zǒu', 'đi'], ['手', 'shǒu', 'tay'], ['肉', 'ròu', 'thịt']] },
  ] },
  { g: 'Vần mũi', d: '-n: đầu lưỡi chạm chân răng trên khi kết thúc; -ng: cuống lưỡi nâng lên, miệng mở.', items: [
    { s: 'an', how: 'Đọc a rồi đầu lưỡi chạm chân răng trên.', vn: 'Giống “an” tiếng Việt.', ex: [['看', 'kàn', 'xem'], ['饭', 'fàn', 'cơm'], ['三', 'sān', 'ba'], ['难', 'nán', 'khó'], ['山', 'shān', 'núi']] },
    { s: 'en', how: 'Đọc e (gần ơ) rồi kết thúc bằng n.', vn: 'Giống “ân/ơn” tiếng Việt.', err: 'Không đọc thành “en” tiếng Việt.', ex: [['很', 'hěn', 'rất'], ['人', 'rén', 'người'], ['们', 'men', '(số nhiều)'], ['本', 'běn', 'quyển'], ['门', 'mén', 'cửa']] },
    { s: 'ang', how: 'Đọc a, kết thúc bằng ng (miệng vẫn mở).', vn: 'Giống “ang” tiếng Việt.', ex: [['忙', 'máng', 'bận'], ['长', 'cháng', 'dài'], ['上', 'shàng', 'trên'], ['房', 'fáng', 'nhà'], ['帮', 'bāng', 'giúp']] },
    { s: 'eng', how: 'Đọc e (gần ơ), kết thúc bằng ng.', vn: 'Giống “âng” tiếng Việt.', err: 'Phân biệt en (ân) và eng (âng).', ex: [['冷', 'lěng', 'lạnh'], ['能', 'néng', 'có thể'], ['朋友', 'péngyou', 'bạn'], ['等', 'děng', 'đợi'], ['风', 'fēng', 'gió']] },
    { s: 'ong', how: 'Môi tròn, đọc gần u rồi kết thúc bằng ng.', vn: 'Giống “ung” tiếng Việt (môi tròn hơn), không phải “ông”.', ex: [['东', 'dōng', 'đông'], ['中', 'zhōng', 'giữa'], ['红', 'hóng', 'đỏ'], ['同', 'tóng', 'cùng'], ['空', 'kōng', 'trống']] },
  ] },
  { g: 'Vần bắt đầu bằng i', d: 'i đọc lướt nhanh, nhấn vào phần sau. Đứng đầu âm tiết viết bằng y.', items: [
    { s: 'ia', how: 'i lướt sang a.', vn: 'Giống “ia” nhưng a rõ (i-a).', ex: [['家', 'jiā', 'nhà'], ['下', 'xià', 'dưới'], ['牙', 'yá', 'răng'], ['鸭', 'yā', 'vịt'], ['夏天', 'xiàtiān', 'mùa hè']] },
    { s: 'ie', how: 'i lướt sang ê.', vn: 'Giống “iê” tiếng Việt.', ex: [['谢谢', 'xièxie', 'cảm ơn'], ['姐姐', 'jiějie', 'chị'], ['也', 'yě', 'cũng'], ['写', 'xiě', 'viết'], ['爷爷', 'yéye', 'ông nội']] },
    { s: 'iao', how: 'i lướt sang ao.', vn: 'Giống “i-ao” đọc liền, gần “eo/iêu”.', ex: [['小', 'xiǎo', 'nhỏ'], ['要', 'yào', 'muốn'], ['叫', 'jiào', 'gọi'], ['票', 'piào', 'vé'], ['鸟', 'niǎo', 'chim']] },
    { s: 'iou · iu', how: 'i lướt sang ou. Khi có phụ âm đầu viết gọn là iu, nhưng vẫn đọc nhẹ “âu”.', vn: 'Gần “iu/iêu” với âm “âu” nhẹ ở giữa.', err: '六 liù không đọc là “liu” bẹt; có âm “âu” mờ ở giữa.', ex: [['六', 'liù', 'sáu'], ['九', 'jiǔ', 'chín'], ['有', 'yǒu', 'có'], ['休息', 'xiūxi', 'nghỉ'], ['牛奶', 'niúnǎi', 'sữa bò']] },
    { s: 'ian', how: 'i lướt sang an, nhưng a bị kéo hẹp thành “e”.', vn: 'Đọc như “iên” tiếng Việt, KHÔNG đọc là “i-an”.', err: 'Lỗi phổ biến: 钱 qián đọc gần “chiên” (bật hơi), không phải “chian”.', ex: [['钱', 'qián', 'tiền'], ['天', 'tiān', 'trời'], ['点', 'diǎn', 'giờ'], ['见', 'jiàn', 'gặp'], ['年', 'nián', 'năm']] },
    { s: 'in', how: 'Đọc i rồi kết thúc bằng n.', vn: 'Giống “in” tiếng Việt.', ex: [['今天', 'jīntiān', 'hôm nay'], ['新', 'xīn', 'mới'], ['您', 'nín', 'ngài'], ['音乐', 'yīnyuè', 'âm nhạc'], ['进', 'jìn', 'vào']] },
    { s: 'iang', how: 'i lướt sang ang.', vn: 'Giống “i-ang” đọc liền (gần “iêng” nhưng a rõ).', ex: [['两', 'liǎng', 'hai'], ['想', 'xiǎng', 'muốn, nhớ'], ['样', 'yàng', 'kiểu'], ['讲', 'jiǎng', 'giảng'], ['墙', 'qiáng', 'tường']] },
    { s: 'ing', how: 'Đọc i rồi kết thúc bằng ng.', vn: 'Giống “inh” tiếng Việt.', err: 'Phân biệt in (in) và ing (inh): 新 xīn – 星 xīng.', ex: [['听', 'tīng', 'nghe'], ['请', 'qǐng', 'mời'], ['明天', 'míngtiān', 'ngày mai'], ['星期', 'xīngqī', 'tuần'], ['冰', 'bīng', 'băng']] },
    { s: 'iong', how: 'i lướt sang ong.', vn: 'Giống “i-ung” (iung) môi tròn.', ex: [['用', 'yòng', 'dùng'], ['熊猫', 'xióngmāo', 'gấu trúc'], ['穷', 'qióng', 'nghèo'], ['兄弟', 'xiōngdì', 'anh em'], ['游泳', 'yóuyǒng', 'bơi']] },
  ] },
  { g: 'Vần bắt đầu bằng u', d: 'u đọc lướt nhanh, môi tròn rồi mở ra. Đứng đầu âm tiết viết bằng w.', items: [
    { s: 'ua', how: 'u lướt sang a.', vn: 'Giống “oa” tiếng Việt.', ex: [['花', 'huā', 'hoa'], ['话', 'huà', 'lời nói'], ['挂', 'guà', 'treo'], ['西瓜', 'xīguā', 'dưa hấu'], ['刷牙', 'shuāyá', 'đánh răng']] },
    { s: 'uo', how: 'u lướt sang o.', vn: 'Giống “uô” tiếng Việt.', ex: [['我', 'wǒ', 'tôi'], ['多', 'duō', 'nhiều'], ['说', 'shuō', 'nói'], ['国', 'guó', 'nước'], ['错', 'cuò', 'sai']] },
    { s: 'uai', how: 'u lướt sang ai.', vn: 'Giống “oai” tiếng Việt.', ex: [['快', 'kuài', 'nhanh'], ['块', 'kuài', 'đồng'], ['外', 'wài', 'ngoài'], ['坏', 'huài', 'hỏng'], ['帅', 'shuài', 'đẹp trai']] },
    { s: 'uei · ui', how: 'u lướt sang ei. Có phụ âm đầu viết gọn là ui.', vn: 'Giống “uây” tiếng Việt; khi viết ui vẫn đọc có “ê” nhẹ.', ex: [['对', 'duì', 'đúng'], ['贵', 'guì', 'đắt'], ['水', 'shuǐ', 'nước'], ['回', 'huí', 'về'], ['为什么', 'wèishénme', 'tại sao']] },
    { s: 'uan', how: 'u lướt sang an.', vn: 'Giống “oan” tiếng Việt.', ex: [['晚', 'wǎn', 'muộn'], ['欢迎', 'huānyíng', 'chào mừng'], ['短', 'duǎn', 'ngắn'], ['关', 'guān', 'đóng'], ['穿', 'chuān', 'mặc']] },
    { s: 'uen · un', how: 'u lướt sang en. Có phụ âm đầu viết gọn là un.', vn: 'Giống “uân” tiếng Việt.', ex: [['问', 'wèn', 'hỏi'], ['春天', 'chūntiān', 'mùa xuân'], ['困', 'kùn', 'buồn ngủ'], ['准备', 'zhǔnbèi', 'chuẩn bị'], ['顺利', 'shùnlì', 'thuận lợi']] },
    { s: 'uang', how: 'u lướt sang ang.', vn: 'Giống “oang” tiếng Việt.', ex: [['黄', 'huáng', 'vàng'], ['王', 'Wáng', 'họ Vương'], ['床', 'chuáng', 'giường'], ['光', 'guāng', 'ánh sáng'], ['双', 'shuāng', 'đôi']] },
    { s: 'ueng', how: 'Chỉ có một âm tiết: weng.', vn: 'Giống “uâng”.', ex: [['翁', 'wēng', 'ông lão'], ['嗡', 'wēng', '(tiếng vo ve)'], ['瓮', 'wèng', 'cái vò']] },
  ] },
  { g: 'Vần bắt đầu bằng ü', d: 'Môi tròn ngay từ đầu. Sau j q x y viết là u.', items: [
    { s: 'üe', how: 'ü lướt sang ê.', vn: 'Giống “uy-ê” đọc liền, môi tròn ở đầu.', ex: [['学', 'xué', 'học'], ['月', 'yuè', 'tháng'], ['觉得', 'juéde', 'cảm thấy'], ['雪', 'xuě', 'tuyết'], ['略', 'lüè', 'lược']] },
    { s: 'üan', how: 'ü lướt sang an, a bị kéo hẹp gần “e”.', vn: 'Giống “uy-en” (uyên) đọc liền.', ex: [['远', 'yuǎn', 'xa'], ['选', 'xuǎn', 'chọn'], ['圆', 'yuán', 'tròn'], ['全', 'quán', 'toàn bộ'], ['元', 'yuán', 'đồng']] },
    { s: 'ün', how: 'ü rồi kết thúc bằng n.', vn: 'Giống “uyn” đọc liền.', ex: [['云', 'yún', 'mây'], ['裙子', 'qúnzi', 'váy'], ['军', 'jūn', 'quân'], ['运动', 'yùndòng', 'vận động'], ['群', 'qún', 'nhóm']] },
  ] },
  { g: '-i đặc biệt', d: 'Chữ i sau z c s và zh ch sh r không đọc là “i”.', items: [
    { s: '-i (z c s)', how: 'Sau z c s: giữ nguyên lưỡi như lúc đọc phụ âm, đọc kéo dài thành “ư”.', vn: 'zi ≈ “tư” (ts), ci ≈ “tsư” bật hơi, si ≈ “xư”.', err: 'Không đọc 四 sì là “xi”.', ex: [['字', 'zì', 'chữ'], ['次', 'cì', 'lần'], ['四', 'sì', 'bốn'], ['自己', 'zìjǐ', 'bản thân'], ['词典', 'cídiǎn', 'từ điển']] },
    { s: '-i (zh ch sh r)', how: 'Sau zh ch sh r: giữ lưỡi cong, đọc kéo dài thành “ư” cong lưỡi.', vn: 'zhi ≈ “trư”, chi ≈ “trư” bật hơi, shi ≈ “sư”, ri ≈ “rư”.', err: 'Không đọc 是 shì là “si”.', ex: [['是', 'shì', 'là'], ['吃', 'chī', 'ăn'], ['知道', 'zhīdào', 'biết'], ['日', 'rì', 'ngày'], ['老师', 'lǎoshī', 'giáo viên']] },
  ] },
];

// Cặp âm dễ nhầm với người Việt (luyện nghe phân biệt)
export const PAIRS = [
  { t: 'b – p (bật hơi)', p: [[['爸', 'bà'], ['怕', 'pà']], [['饱', 'bǎo'], ['跑', 'pǎo']], [['白', 'bái'], ['牌', 'pái']]] },
  { t: 'd – t (bật hơi)', p: [[['到', 'dào'], ['套', 'tào']], [['弟', 'dì'], ['替', 'tì']], [['读', 'dú'], ['图', 'tú']]] },
  { t: 'g – k (bật hơi)', p: [[['哥', 'gē'], ['科', 'kē']], [['怪', 'guài'], ['快', 'kuài']], [['古', 'gǔ'], ['苦', 'kǔ']]] },
  { t: 'z – c – s', p: [[['在', 'zài'], ['菜', 'cài'], ['赛', 'sài']], [['字', 'zì'], ['次', 'cì'], ['四', 'sì']], [['早', 'zǎo'], ['草', 'cǎo'], ['扫', 'sǎo']]] },
  { t: 'zh – ch – sh', p: [[['知', 'zhī'], ['吃', 'chī'], ['诗', 'shī']], [['找', 'zhǎo'], ['吵', 'chǎo'], ['少', 'shǎo']], [['住', 'zhù'], ['处', 'chù'], ['树', 'shù']]] },
  { t: 'z c s – zh ch sh (uốn lưỡi)', p: [[['早', 'zǎo'], ['找', 'zhǎo']], [['四', 'sì'], ['是', 'shì']], [['词', 'cí'], ['迟', 'chí']]] },
  { t: 'j – q – x', p: [[['鸡', 'jī'], ['七', 'qī'], ['西', 'xī']], [['见', 'jiàn'], ['欠', 'qiàn'], ['线', 'xiàn']], [['九', 'jiǔ'], ['球', 'qiú'], ['休', 'xiū']]] },
  { t: 'r – l', p: [[['热', 'rè'], ['乐', 'lè']], [['日', 'rì'], ['力', 'lì']], [['肉', 'ròu'], ['漏', 'lòu']]] },
  { t: 'u – ü', p: [[['路', 'lù'], ['绿', 'lǜ']], [['努', 'nǔ'], ['女', 'nǚ']], [['出', 'chū'], ['区', 'qū']]] },
  { t: 'an – ang', p: [[['饭', 'fàn'], ['放', 'fàng']], [['三', 'sān'], ['桑', 'sāng']], [['烂', 'làn'], ['浪', 'làng']]] },
  { t: 'en – eng', p: [[['根', 'gēn'], ['耕', 'gēng']], [['真', 'zhēn'], ['争', 'zhēng']], [['分', 'fēn'], ['风', 'fēng']]] },
  { t: 'in – ing', p: [[['新', 'xīn'], ['星', 'xīng']], [['今', 'jīn'], ['京', 'jīng']], [['您', 'nín'], ['宁', 'níng']]] },
  { t: 'Thanh điệu', p: [[['买', 'mǎi'], ['卖', 'mài']], [['汤', 'tāng'], ['糖', 'táng']], [['请', 'qǐng'], ['情', 'qíng']], [['水饺', 'shuǐjiǎo'], ['睡觉', 'shuìjiào']]] },
];

// Quy tắc viết pinyin
export const RULES = [
  ['Âm tiết = thanh mẫu + vận mẫu + thanh điệu', 'Ví dụ: m + a + thanh 1 = mā (妈). Có âm tiết không có thanh mẫu: ài (爱), ān (安).'],
  ['Đặt dấu thanh', 'Dấu đặt trên nguyên âm theo thứ tự ưu tiên a > o, e > i, u, ü. Riêng iu và ui đặt dấu trên chữ đứng sau: liù, guì.'],
  ['y và w', 'i, u, ü đứng đầu âm tiết viết thành y, w, yu: i → yi, ia → ya, u → wu, uo → wo, ü → yu, üe → yue.'],
  ['ü sau j q x y', 'Viết bỏ hai chấm: ju, qu, xu, yu (vẫn đọc ü). Sau n và l phải giữ hai chấm để phân biệt: nü (女) khác nu (努), lü (绿) khác lu (路).'],
  ['Viết gọn iou, uei, uen', 'Khi có thanh mẫu: iou → iu (liù), uei → ui (duì), uen → un (chūn). Khi đọc vẫn có âm giữa nhẹ.'],
  ['Dấu cách âm', 'Khi âm tiết sau bắt đầu bằng a, o, e mà dễ đọc nhầm, dùng dấu ’: Xī’ān (西安, hai âm tiết) khác xiān (先).'],
  ['Viết hoa', 'Tên riêng và chữ đầu câu viết hoa: Běijīng, Zhōngguó. Pinyin của một từ viết liền: péngyou, không viết péng you.'],
];
