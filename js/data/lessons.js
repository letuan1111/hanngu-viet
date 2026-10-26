// Giáo trình HSK 1–3 (khung HSK 2.0). Mỗi bài: tiêu đề, chủ đề, từ mới, điểm ngữ pháp, hội thoại,
// nhiệm vụ nói và viết theo chủ đề. Từ vựng HSK chưa được gán sẽ tự thêm làm "từ mở rộng" theo chủ đề.
export const CURRICULUM = {
  version: 'HSK 2.0 (6 cấp) – khung HSK 1–3',
  note: 'Từ vựng và ngữ pháp bắt buộc bám theo danh sách HSK 2.0. Nội dung đánh dấu "Mở rộng" là phần luyện tập thêm.'
};

const L = (level, chapter, t, topic, words, g, d, speak, write) => ({ level, chapter, t, topic, words: words.split(' '), g, d, speak, write });

export const CHAPTERS = {
  1: ['Làm quen với tiếng Trung', 'Cuộc sống hằng ngày', 'Kết nối và chia sẻ'],
  2: ['Vận động và sinh hoạt', 'Học tập và công việc', 'Bạn bè và thành phố'],
  3: ['Cuộc sống quanh ta', 'Học tập và công việc', 'Đi lại và du lịch', 'Cảm xúc và lựa chọn'],
};

export const LESSONS = [
// ─────────── HSK 1 ───────────
L(1,0,'Xin chào','giaotiep','你 好 您 再见 谢谢 不客气 对不起 没关系 老师 我们',['g1-ma'],[
 ['A','你好！','Xin chào!'],['B','你好！','Xin chào!'],['A','谢谢你！','Cảm ơn bạn!'],['B','不客气。','Không có gì.'],['A','对不起！','Xin lỗi!'],['B','没关系。','Không sao.'],['A','老师，再见！','Tạm biệt thầy!'],['B','再见！','Tạm biệt!']],
 'Chào hỏi, cảm ơn và xin lỗi một bạn học mới.','Viết 3 câu: chào hỏi, cảm ơn, tạm biệt.'),
L(1,0,'Giới thiệu tên','giaotiep','叫 什么 名字 我 你 是 学生 吗 不 人',['g1-shi','g1-qw','g1-ma'],[
 ['A','你好！你叫什么名字？','Chào bạn! Bạn tên là gì?'],['B','我叫阿兰。你呢？','Mình tên là Lan. Còn bạn?'],['A','我叫小明。你是学生吗？','Mình tên là Tiểu Minh. Bạn là học sinh à?'],['B','是，我是学生。你是老师吗？','Đúng, mình là học sinh. Bạn là giáo viên à?'],['A','我不是老师，我也是学生。','Mình không phải giáo viên, mình cũng là học sinh.']],
 'Tự giới thiệu tên và hỏi tên một người bạn.','Viết đoạn 3 câu giới thiệu tên và nghề của bạn.'),
L(1,0,'Quốc tịch','diadiem','中国 哪 呢 他 她 汉语 会 说 北京 哪儿',['g1-ne','g1-hui'],[
 ['A','你是哪国人？','Bạn là người nước nào?'],['B','我是越南人。你呢？','Mình là người Việt Nam. Còn bạn?'],['A','我是中国人，我家在北京。','Mình là người Trung Quốc, nhà mình ở Bắc Kinh.'],['B','她是谁？','Cô ấy là ai?'],['A','她是我的老师。她会说汉语，也会说越南语。','Cô ấy là cô giáo của mình. Cô ấy biết nói tiếng Trung, cũng biết nói tiếng Việt.']],
 'Hỏi và trả lời về quốc tịch, ngôn ngữ bạn biết nói.','Viết 3 câu: bạn là người nước nào, nhà ở đâu, biết nói tiếng gì.'),
L(1,0,'Gia đình','giadinh','家 有 没 爸爸 妈妈 儿子 女儿 的 都 和 几 个',['g1-you','g1-de','g1-dou'],[
 ['A','你家有几个人？','Nhà bạn có mấy người?'],['B','我家有四个人：爸爸、妈妈、姐姐和我。','Nhà mình có bốn người: bố, mẹ, chị và mình.'],['A','你爸爸妈妈做什么工作？','Bố mẹ bạn làm nghề gì?'],['B','他们都是老师。','Họ đều là giáo viên.'],['A','你有狗吗？','Bạn có chó không?'],['B','没有，我有一个猫。','Không, mình có một con mèo.']],
 'Giới thiệu các thành viên trong gia đình bạn.','Viết 4 câu về gia đình bạn có những ai, họ làm gì.'),
L(1,0,'Tuổi tác và số đếm','so','一 二 三 四 五 六 七 八 九 十 零 岁 多 大 了 年 多少',['g1-num','g1-le'],[
 ['A','你今年多大了？','Năm nay bạn bao nhiêu tuổi?'],['B','我今年二十岁。','Năm nay mình hai mươi tuổi.'],['A','你女儿几岁了？','Con gái anh mấy tuổi rồi?'],['B','她五岁了。','Cháu năm tuổi rồi.'],['A','你们学校有多少学生？','Trường các bạn có bao nhiêu học sinh?'],['B','我们学校有八百多个学生。','Trường mình có hơn tám trăm học sinh.']],
 'Hỏi tuổi các thành viên trong gia đình.','Viết tuổi của bạn và 2 người thân.'),
L(1,1,'Hôm nay ngày bao nhiêu?','ngaythang','今天 明天 昨天 月 日 号 星期 去 学校 看 书',['g1-time'],[
 ['A','今天几月几号？','Hôm nay ngày mấy tháng mấy?'],['B','今天九月一号，星期三。','Hôm nay ngày 1 tháng 9, thứ tư.'],['A','明天你去学校吗？','Ngày mai bạn đến trường không?'],['B','明天星期四，我去学校看书。','Mai thứ năm, mình đến trường đọc sách.'],['A','昨天你做什么了？','Hôm qua bạn làm gì?'],['B','昨天我在家。','Hôm qua mình ở nhà.']],
 'Hỏi ngày tháng và kế hoạch ngày mai.','Viết ngày sinh nhật của bạn và hôm nay là thứ mấy.'),
L(1,1,'Mấy giờ rồi?','thoigian','现在 点 分钟 上午 下午 中午 时候 回 睡觉 工作 做',['g1-time','g1-qw'],[
 ['A','现在几点？','Bây giờ mấy giờ?'],['B','现在十点十分。','Bây giờ là 10 giờ 10 phút.'],['A','你什么时候回家？','Khi nào bạn về nhà?'],['B','我下午五点回家。','Năm giờ chiều mình về nhà.'],['A','你中午睡觉吗？','Buổi trưa bạn có ngủ không?'],['B','中午我睡四十分钟。','Buổi trưa mình ngủ bốn mươi phút.']],
 'Kể thời gian biểu một ngày của bạn.','Viết 4 câu về giờ bạn đi làm/đi học, về nhà, đi ngủ.'),
L(1,1,'Ăn uống','anuong','吃 喝 茶 水 米饭 菜 想 苹果 水果 杯子 饭店 些',['g1-xiang'],[
 ['A','你想吃什么？','Bạn muốn ăn gì?'],['B','我想吃米饭和中国菜。','Mình muốn ăn cơm và món Trung Quốc.'],['A','你想喝什么？','Bạn muốn uống gì?'],['B','我想喝一杯茶。','Mình muốn uống một cốc trà.'],['A','我们去饭店吃吧？','Chúng ta đi nhà hàng ăn nhé?'],['B','好，我还想买一些水果。','Được, mình còn muốn mua ít hoa quả.']],
 'Gọi món và nói bạn muốn ăn, uống gì.','Viết 3 câu về món ăn, đồ uống bạn thích.'),
L(1,1,'Mua sắm','muasam','买 钱 块 东西 商店 衣服 少 本 太 很 这 那 漂亮',['g1-taile','g1-hen','g1-num'],[
 ['A','你好，这个杯子多少钱？','Chào chị, cái cốc này bao nhiêu tiền?'],['B','二十八块。','Hai mươi tám tệ.'],['A','太贵了！那个呢？','Đắt quá! Còn cái kia?'],['B','那个十五块。','Cái kia mười lăm tệ.'],['A','这件衣服很漂亮，我想买。','Bộ quần áo này rất đẹp, tôi muốn mua.'],['B','好的，一共一百块。','Vâng, tổng cộng một trăm tệ.']],
 'Đóng vai mua đồ: hỏi giá, mặc cả.','Viết đoạn hội thoại ngắn mua một quyển sách.'),
L(1,1,'Ở đâu?','diadiem','在 这儿 那儿 前面 后面 里 上 下 桌子 椅子 电脑 医院 医生 住',['g1-zai'],[
 ['A','你住在哪儿？','Bạn sống ở đâu?'],['B','我住在学校后面。','Mình sống ở phía sau trường.'],['A','你妈妈在哪儿工作？','Mẹ bạn làm việc ở đâu?'],['B','她在医院工作，她是医生。','Mẹ mình làm ở bệnh viện, mẹ là bác sĩ.'],['A','我的电脑呢？','Máy tính của mình đâu?'],['B','在桌子上。','Ở trên bàn.']],
 'Miêu tả vị trí đồ vật trong phòng bạn.','Viết 4 câu: nhà bạn ở đâu, đồ vật nào ở đâu.'),
L(1,2,'Thời tiết','thoitiet','天气 怎么样 热 冷 下雨 小 能',['g1-hen','g1-neng'],[
 ['A','今天天气怎么样？','Hôm nay thời tiết thế nào?'],['B','今天很热。','Hôm nay rất nóng.'],['A','明天呢？','Còn ngày mai?'],['B','明天下雨，有点儿冷。','Ngày mai mưa, hơi lạnh.'],['A','明天下雨，我不能去商店了。','Mai mưa, mình không đi cửa hàng được rồi.']],
 'Nói về thời tiết hôm nay ở nơi bạn sống.','Viết 3 câu về thời tiết hôm nay và ngày mai.'),
L(1,2,'Đi lại','giaothong','坐 飞机 出租车 火车站 开 来 怎么',['g1-shide','g1-liandong','g1-zenme'],[
 ['A','你是怎么来北京的？','Bạn đến Bắc Kinh bằng cách nào?'],['B','我是坐飞机来的。','Mình đi máy bay đến.'],['A','你什么时候来的？','Bạn đến khi nào?'],['B','我是昨天来的。','Mình đến hôm qua.'],['A','我们怎么去火车站？','Chúng ta đi ga tàu thế nào?'],['B','我们坐出租车去吧。','Chúng ta đi taxi nhé.']],
 'Kể bạn đến trường/công ty bằng phương tiện gì.','Viết 3 câu dùng 是…的 về chuyến đi gần nhất.'),
L(1,2,'Gọi điện thoại','giaotiep','打电话 喂 认识 朋友 同学 先生 小姐 请 谁',['g1-qw'],[
 ['A','喂，你好！请问，王先生在吗？','Alô, xin chào! Cho hỏi anh Vương có ở đó không?'],['B','他不在。你是谁？','Anh ấy không có ở đây. Bạn là ai?'],['A','我是他的朋友，我叫小明。','Tôi là bạn anh ấy, tôi tên Tiểu Minh.'],['B','好，他回来，我请他给你打电话。','Được, anh ấy về tôi sẽ bảo gọi lại cho bạn.'],['A','谢谢！很高兴认识你。','Cảm ơn! Rất vui được làm quen với bạn.']],
 'Đóng vai gọi điện tìm một người bạn.','Viết lời nhắn điện thoại 3 câu.'),
L(1,2,'Sở thích','sothich','喜欢 电影 电视 听 读 写 字 爱 学习',['g1-de'],[
 ['A','你喜欢做什么？','Bạn thích làm gì?'],['B','我喜欢看电影，也喜欢听中国歌。','Mình thích xem phim, cũng thích nghe nhạc Trung.'],['A','你爱学习汉语吗？','Bạn có thích học tiếng Trung không?'],['B','很爱！我每天读书、写汉字。','Rất thích! Ngày nào mình cũng đọc sách, viết chữ Hán.']],
 'Nói về 2–3 sở thích của bạn.','Viết đoạn 4 câu về sở thích.'),
L(1,2,'Hôm qua bạn làm gì?','giaotiep','看见 高兴 下午 了',['g1-le','g1-bu'],[
 ['A','昨天下午你去哪儿了？','Chiều qua bạn đi đâu?'],['B','我去商店买东西了。','Mình đi cửa hàng mua đồ.'],['A','你看见小王了吗？','Bạn có thấy Tiểu Vương không?'],['B','看见了，他和朋友在饭店吃饭。','Có thấy, cậu ấy ăn cơm với bạn ở nhà hàng.'],['A','你买什么了？','Bạn đã mua gì?'],['B','我买了一本书，很高兴！','Mình mua một quyển sách, vui lắm!']],
 'Kể lại 3 việc bạn đã làm hôm qua.','Viết nhật ký ngắn về ngày hôm qua (4–5 câu).'),
// ─────────── HSK 2 ───────────
L(2,0,'Thể thao yêu thích','sothich','运动 跑步 游泳 打篮球 踢足球 最 每',['g2-zui','g2-ye-hai'],[
 ['A','你最喜欢什么运动？','Bạn thích môn thể thao nào nhất?'],['B','我最喜欢游泳。你呢？','Mình thích bơi nhất. Còn bạn?'],['A','我喜欢踢足球，也喜欢打篮球。','Mình thích đá bóng, cũng thích chơi bóng rổ.'],['B','你每天都运动吗？','Ngày nào bạn cũng tập thể thao à?'],['A','是啊，我每天早上跑步。','Đúng vậy, sáng nào mình cũng chạy bộ.']],
 'Giới thiệu môn thể thao bạn thích và tần suất tập.','Viết 4 câu về thói quen vận động của bạn.'),
L(2,0,'Hỏi đường','giaothong','离 远 近 路 往 右边 左边 旁边 走 到 从',['g2-li','g2-congdao'],[
 ['A','请问，火车站离这儿远吗？','Cho hỏi, ga tàu cách đây có xa không?'],['B','不远，走路十分钟就到。','Không xa, đi bộ mười phút là đến.'],['A','怎么走？','Đi thế nào ạ?'],['B','往前走，到了商店往右走，火车站就在商店旁边。','Đi thẳng, đến cửa hàng thì rẽ phải, ga tàu ngay cạnh cửa hàng.'],['A','从这儿到机场呢？','Còn từ đây đến sân bay?'],['B','机场很远，你坐出租车去吧。','Sân bay rất xa, bạn đi taxi nhé.']],
 'Chỉ đường từ nhà bạn đến trường hoặc công ty.','Viết đoạn chỉ đường 4 câu.'),
L(2,0,'Bị ốm','suckhoe','生病 身体 药 休息 累 眼睛 别 吧',['g2-bie','g2-ba'],[
 ['A','你怎么了？身体不舒服吗？','Bạn sao thế? Không khỏe à?'],['B','我生病了，很累，眼睛也不舒服。','Mình bị ốm, rất mệt, mắt cũng khó chịu.'],['A','你吃药了吗？','Bạn uống thuốc chưa?'],['B','吃了。','Uống rồi.'],['A','别去上班了，在家好好休息吧。','Đừng đi làm nữa, ở nhà nghỉ ngơi cho tốt nhé.']],
 'Khuyên một người bạn đang bị ốm.','Viết tin nhắn xin phép nghỉ vì ốm.'),
L(2,0,'Mua quần áo','muasam','颜色 红 白 黑 穿 件 贵 便宜 比 一下',['g2-bi','g2-yixia'],[
 ['A','这件衣服有别的颜色吗？','Bộ này có màu khác không?'],['B','有红的、白的和黑的。','Có màu đỏ, trắng và đen.'],['A','我可以穿一下吗？','Tôi mặc thử được không?'],['B','可以。','Được ạ.'],['A','红的比白的贵吗？','Màu đỏ đắt hơn màu trắng à?'],['B','不，红的比白的便宜二十块。','Không, màu đỏ rẻ hơn màu trắng hai mươi tệ.']],
 'So sánh hai món đồ khi mua sắm.','Viết 3 câu so sánh dùng 比.'),
L(2,0,'Sinh nhật','ngaythang','生日 快乐 送 欢迎 介绍 给 手表 妹妹 弟弟 哥哥 姐姐',['g2-gei'],[
 ['A','欢迎！欢迎！快进来。','Hoan nghênh! Mau vào đi.'],['B','祝你生日快乐！这是我送给你的手表。','Chúc bạn sinh nhật vui vẻ! Đây là đồng hồ mình tặng bạn.'],['A','谢谢！我来介绍一下，这是我妹妹，那是我弟弟。','Cảm ơn! Để mình giới thiệu, đây là em gái mình, kia là em trai mình.'],['B','你们好！你哥哥姐姐呢？','Chào các bạn! Còn anh chị của bạn?'],['A','他们在路上，马上就到。','Họ đang trên đường, sắp đến rồi.']],
 'Chúc mừng sinh nhật và giới thiệu người nhà.','Viết lời chúc sinh nhật 3 câu.'),
L(2,1,'Kinh nghiệm du lịch','dulich','旅游 过 次 机场 票 宾馆 房间 去年',['g2-guo','g2-ci'],[
 ['A','你去过中国吗？','Bạn đã từng đến Trung Quốc chưa?'],['B','去过两次。去年我去北京旅游了。','Đến hai lần rồi. Năm ngoái mình đi du lịch Bắc Kinh.'],['A','你住在哪儿？','Bạn ở đâu?'],['B','我住在一个宾馆，房间很大。','Mình ở một khách sạn, phòng rất rộng.'],['A','飞机票贵吗？','Vé máy bay có đắt không?'],['B','不太贵。','Không đắt lắm.']],
 'Kể về một chuyến du lịch bạn đã từng đi.','Viết 4 câu dùng 过 về những nơi bạn đã đến.'),
L(2,1,'Một ngày làm việc','congviec','上班 公司 忙 早上 晚上 起床 小时 已经 就 时间',['g2-jiu','g2-shiliang'],[
 ['A','你每天几点起床？','Mỗi ngày bạn dậy lúc mấy giờ?'],['B','我早上六点就起床了。','Sáu giờ sáng mình đã dậy rồi.'],['A','你在公司工作几个小时？','Bạn làm ở công ty mấy tiếng?'],['B','八个小时。我很忙，晚上七点才回家。','Tám tiếng. Mình rất bận, bảy giờ tối mới về.'],['A','你已经工作几年了？','Bạn đi làm được mấy năm rồi?'],['B','我工作三年了。','Mình đi làm ba năm rồi.']],
 'Mô tả một ngày làm việc/học tập điển hình.','Viết đoạn 5 câu về lịch trình một ngày.'),
L(2,1,'Bạn đang làm gì?','giaotiep','正在 着 门 报纸 手机 等 洗 笑',['g2-zhengzai','g2-zhe'],[
 ['A','喂，你在做什么呢？','Alô, bạn đang làm gì đấy?'],['B','我正在洗衣服呢。','Mình đang giặt quần áo.'],['A','你爸爸呢？','Còn bố bạn?'],['B','他坐着看报纸呢。','Bố đang ngồi đọc báo.'],['A','我在你家门外，等着你呢。','Mình đang ở ngoài cửa nhà bạn, đang đợi bạn đây.'],['B','哈哈，我马上来开门！','Haha, mình ra mở cửa ngay!']],
 'Mô tả mọi người trong nhà đang làm gì.','Viết 4 câu dùng 正在 / 着.'),
L(2,1,'Học tiếng Trung','truonghoc','考试 课 教室 题 问题 回答 懂 意思 错 对 得 说话',['g2-de'],[
 ['A','这个字是什么意思？','Chữ này nghĩa là gì?'],['B','我也不懂，我们问问老师吧。','Mình cũng không hiểu, chúng ta hỏi thầy đi.'],['A','老师，这个题我做得对吗？','Thưa thầy, câu này em làm đúng không ạ?'],['C','你做得很好，没有错。','Em làm rất tốt, không sai.'],['A','明天考试，我有点儿担心。','Mai thi, em hơi lo.'],['C','别担心，你说汉语说得很好！','Đừng lo, em nói tiếng Trung rất giỏi!']],
 'Hỏi thầy cô về một bài tập khó.','Viết 3 câu dùng 得 đánh giá việc học của bạn.'),
L(2,1,'Bốn mùa','thoitiet','晴 阴 雪 因为 所以 希望 觉得 可能',['g2-yinwei'],[
 ['A','你觉得北京的天气怎么样？','Bạn thấy thời tiết Bắc Kinh thế nào?'],['B','冬天很冷，可能会下雪。','Mùa đông rất lạnh, có thể có tuyết.'],['A','今天是晴天还是阴天？','Hôm nay trời nắng hay âm u?'],['B','阴天。因为要下雨了，所以你带伞吧。','Âm u. Vì sắp mưa nên bạn mang ô đi.'],['A','我希望明天是晴天。','Mình hy vọng mai trời nắng.']],
 'Nói về mùa bạn thích và giải thích lý do.','Viết 3 câu dùng 因为…所以.'),
L(2,2,'Ở nhà hàng','anuong','服务员 面条 羊肉 鱼 鸡蛋 牛奶 咖啡 西瓜 好吃 要',['g2-yao'],[
 ['A','服务员，我们要点菜。','Phục vụ ơi, chúng tôi muốn gọi món.'],['B','好的，你们要什么？','Vâng, quý khách dùng gì ạ?'],['A','我要一个羊肉面条，他要鱼和米饭。','Tôi lấy một bát mì thịt cừu, anh ấy lấy cá và cơm.'],['B','要喝什么？','Uống gì ạ?'],['A','一杯咖啡，一杯牛奶。','Một cà phê, một sữa.'],['B','好。我们的西瓜很好吃，要吗？','Vâng. Dưa hấu của quán rất ngon, quý khách dùng không?']],
 'Đóng vai gọi món ở nhà hàng.','Viết thực đơn mơ ước của bạn kèm 3 câu mô tả.'),
L(2,2,'Gia đình tôi','giadinh','丈夫 妻子 孩子 男 女 高 长 姓 大家',['g2-bi'],[
 ['A','您贵姓？','Quý danh của ông/bà?'],['B','我姓李。这是我丈夫，那是我们的孩子。','Tôi họ Lý. Đây là chồng tôi, kia là con chúng tôi.'],['A','您的孩子是男孩子还是女孩子？','Con bà là con trai hay con gái?'],['B','一个男孩子，一个女孩子。哥哥比妹妹高。','Một trai, một gái. Anh cao hơn em.'],['A','大家好！','Chào mọi người!']],
 'Giới thiệu vợ/chồng, con cái hoặc anh chị em.','Viết 4 câu miêu tả người thân, có so sánh.'),
L(2,2,'Hẹn bạn đi chơi','sothich','一起 可以 唱歌 跳舞 玩 让 告诉 帮助 知道 找',['g2-rang','g2-ba'],[
 ['A','晚上我们一起去唱歌吧！','Tối nay chúng ta cùng đi hát nhé!'],['B','好啊！可以叫小王一起去吗？','Hay đấy! Có thể gọi Tiểu Vương đi cùng không?'],['A','可以，你告诉他吧。','Được, bạn báo cậu ấy nhé.'],['B','我不知道他的手机号，你帮助我找一下吧。','Mình không biết số điện thoại của cậu ấy, bạn giúp mình tìm nhé.'],['A','没问题。他还让我们一起去跳舞呢！','Không vấn đề. Cậu ấy còn rủ chúng ta đi nhảy nữa!']],
 'Rủ bạn đi chơi cuối tuần, hẹn giờ và địa điểm.','Viết tin nhắn rủ bạn đi chơi (4 câu).'),
L(2,2,'Đi xe buýt','giaothong','公共汽车 快 慢 出 进 外 完 再 开始 准备',['g2-yao'],[
 ['A','公共汽车快要开了，快点儿！','Xe buýt sắp chạy rồi, nhanh lên!'],['B','等一下，我还没准备完。','Đợi chút, mình chưa chuẩn bị xong.'],['A','你太慢了！电影七点开始。','Bạn chậm quá! Phim bảy giờ bắt đầu.'],['B','好了好了，我们出门吧。','Được rồi được rồi, chúng ta ra khỏi nhà thôi.'],['A','下次再这么慢，我就不等你了。','Lần sau còn chậm thế này, mình không đợi bạn nữa đâu.']],
 'Kể về một lần bạn suýt bị muộn.','Viết 3 câu dùng 要…了.'),
L(2,2,'Ôn tập HSK 2','coban','虽然 但是 新 真 还 也 它 卖 千 百 两 第一 非常 问',['g2-suiran','g2-ye-hai'],[
 ['A','你的新手机真漂亮！多少钱？','Điện thoại mới của bạn đẹp thật! Bao nhiêu tiền?'],['B','两千多块。虽然有点儿贵，但是非常好用。','Hơn hai nghìn tệ. Tuy hơi đắt nhưng dùng rất tốt.'],['A','在哪儿买的？','Mua ở đâu thế?'],['B','学校旁边的商店卖。我是第一个买的！','Cửa hàng cạnh trường có bán. Mình là người đầu tiên mua đấy!'],['A','我也想买一个，我去问问。','Mình cũng muốn mua một cái, mình đi hỏi thử.']],
 'Nói về một món đồ mới bạn vừa mua.','Viết đoạn 5 câu dùng 虽然…但是 và 比.'),
// ─────────── HSK 3 ───────────
L(3,0,'Chuyển nhà','giadinh','搬 楼 层 电梯 邻居 附近 厨房 冰箱 空调 打扫 干净 把',['g3-ba','g3-kq'],[
 ['A','听说你搬家了？新家怎么样？','Nghe nói bạn chuyển nhà rồi? Nhà mới thế nào?'],['B','很好！在十二层，有电梯。','Rất tốt! Ở tầng 12, có thang máy.'],['A','附近方便吗？','Xung quanh có tiện không?'],['B','很方便，楼下就有超市。邻居们也很热情。','Rất tiện, dưới tòa nhà có siêu thị. Hàng xóm cũng rất nhiệt tình.'],['A','厨房大吗？','Bếp có rộng không?'],['B','不太大。我已经把厨房打扫干净了，冰箱和空调也买好了。','Không rộng lắm. Mình đã dọn sạch bếp rồi, tủ lạnh và điều hòa cũng mua xong.']],
 'Miêu tả nhà bạn và khu vực xung quanh.','Viết 5 câu dùng 把 về việc dọn dẹp nhà cửa.'),
L(3,0,'Cuối tuần','sothich','周末 打算 爬山 公园 一边 聊天 照片 照相机',['g3-yibian'],[
 ['A','这个周末你打算做什么？','Cuối tuần này bạn định làm gì?'],['B','我打算和朋友去爬山。你呢？','Mình định đi leo núi với bạn. Còn bạn?'],['A','我想去公园，一边喝咖啡一边聊天。','Mình muốn đi công viên, vừa uống cà phê vừa nói chuyện.'],['B','别忘了带照相机，多照几张照片！','Đừng quên mang máy ảnh, chụp thêm vài tấm ảnh nhé!']],
 'Kể kế hoạch cuối tuần của bạn.','Viết 4 câu dùng 打算 và 一边…一边.'),
L(3,0,'Đi siêu thị mua quần áo','muasam','超市 衬衫 裙子 裤子 鞋 帽子 试 一共 元 角 双 换 信用卡',['g3-youyidian','g3-chongdie'],[
 ['A','这条裙子有一点儿长，我可以试试那条吗？','Chiếc váy này hơi dài, tôi thử chiếc kia được không?'],['B','当然可以。','Đương nhiên được.'],['A','这双鞋也不错。一共多少钱？','Đôi giày này cũng được. Tổng cộng bao nhiêu tiền?'],['B','一共三百八十五元五角。','Tổng cộng 385 tệ 5 hào.'],['A','能便宜一点儿吗？我可以用信用卡吗？','Có thể rẻ hơn chút không? Tôi dùng thẻ tín dụng được không?'],['B','可以用。如果不合适，七天内可以换。','Được ạ. Nếu không vừa, trong bảy ngày có thể đổi.']],
 'Đóng vai mua đồ, thử đồ, hỏi đổi trả.','Viết 4 câu phân biệt 有一点儿 và 一点儿.'),
L(3,0,'Bữa tối','anuong','菜单 饿 饱 渴 碗 筷子 盘子 面包 蛋糕 果汁 啤酒 甜',['g3-youyou','g3-jile'],[
 ['A','我又饿又渴，我们快点菜吧。','Mình vừa đói vừa khát, mau gọi món thôi.'],['B','服务员，请给我们菜单。','Phục vụ ơi, cho chúng tôi xin thực đơn.'],['A','我要一碗面条和一杯果汁。','Mình lấy một bát mì và một cốc nước ép.'],['B','我要一盘鱼和一瓶啤酒。','Mình lấy một đĩa cá và một chai bia.'],['A','这个蛋糕甜极了，太好吃了！','Bánh này ngọt cực, ngon quá!'],['B','我吃饱了。','Mình no rồi.']],
 'Miêu tả bữa ăn yêu thích của bạn.','Viết 4 câu dùng 又…又 và 极了.'),
L(3,0,'Bị cảm','suckhoe','感冒 发烧 疼 检查 舒服 健康 锻炼 鼻子 耳朵 嘴 脸',['g3-cai'],[
 ['A','医生，我感冒了，头很疼，还发烧。','Bác sĩ, tôi bị cảm, đầu rất đau, còn sốt nữa.'],['B','我给你检查一下。嘴张开……你鼻子也不舒服吧？','Để tôi kiểm tra. Há miệng ra… Mũi cũng khó chịu đúng không?'],['A','是的。昨天晚上十二点我才睡觉。','Vâng. Tối qua 12 giờ tôi mới ngủ.'],['B','你要多喝水，多休息。为了身体健康，以后要经常锻炼。','Anh phải uống nhiều nước, nghỉ ngơi nhiều. Để khỏe mạnh, sau này phải thường xuyên rèn luyện.']],
 'Đóng vai đi khám bệnh, mô tả triệu chứng.','Viết lời khuyên giữ sức khỏe (5 câu).'),
L(3,1,'Lớp học của tôi','truonghoc','班 年级 黑板 作业 复习 练习 句子 词语 成绩 认真 努力 提高 水平',['g3-dev'],[
 ['A','你们班有多少学生？','Lớp bạn có bao nhiêu học sinh?'],['B','三十个。我们三年级的学生都很努力。','Ba mươi bạn. Học sinh năm ba bọn mình đều rất chăm.'],['A','你怎么提高汉语水平？','Bạn nâng cao trình độ tiếng Trung thế nào?'],['B','我每天认真地复习词语，练习写句子。','Mỗi ngày mình chăm chỉ ôn từ ngữ, luyện viết câu.'],['A','难怪你的成绩那么好！','Thảo nào thành tích của bạn tốt thế!']],
 'Chia sẻ phương pháp học tiếng Trung của bạn.','Viết 5 câu về lớp học và cách bạn ôn tập.'),
L(3,1,'Ở văn phòng','congviec','办公室 经理 同事 会议 电子邮件 发 完成 请假 迟到 要求',['g3-kq','g2-rang'],[
 ['A','经理，我明天想请假。','Giám đốc, ngày mai tôi muốn xin nghỉ.'],['B','明天上午有会议，你的工作完成了吗？','Sáng mai có họp, công việc của anh hoàn thành chưa?'],['A','完成了，我已经发电子邮件给同事了。','Xong rồi, tôi đã gửi email cho đồng nghiệp rồi.'],['B','好，可以。但是公司要求大家开会别迟到。','Được. Nhưng công ty yêu cầu mọi người họp đừng đến muộn.']],
 'Đóng vai xin nghỉ phép với quản lý.','Viết email xin nghỉ 4–5 câu.'),
L(3,1,'Trước kỳ thi','truonghoc','难 容易 简单 担心 放心 着急 一定',['g3-zhiyou','g3-kn'],[
 ['A','下个星期就考试了，我很着急。','Tuần sau thi rồi, mình rất sốt ruột.'],['B','别担心，考试不难，题很简单。','Đừng lo, thi không khó, đề rất đơn giản.'],['A','可是我听不懂听力。','Nhưng mình nghe không hiểu phần nghe.'],['B','只有多听多练习，才能听得懂。','Chỉ có nghe nhiều luyện nhiều mới nghe hiểu được.'],['A','好，我放心了。我一定会努力的！','Được, mình yên tâm rồi. Mình nhất định sẽ cố gắng!']],
 'Động viên một người bạn sắp thi.','Viết 4 câu dùng 只有…才 và bổ ngữ khả năng.'),
L(3,1,'Đi du học','dulich','留学 护照 行李箱 起飞 地图 国家 世界 文化 历史 普通话 中文',['g3-weile','g3-xian'],[
 ['A','你为什么去中国留学？','Tại sao bạn đi du học Trung Quốc?'],['B','为了了解中国的文化和历史，也为了学好普通话。','Để tìm hiểu văn hóa và lịch sử Trung Quốc, cũng để học tốt tiếng phổ thông.'],['A','护照和行李箱都准备好了吗？','Hộ chiếu và vali chuẩn bị xong chưa?'],['B','准备好了。飞机明天早上八点起飞。','Xong rồi. Máy bay cất cánh 8 giờ sáng mai.'],['A','到了先给家里打电话，然后再去学校。','Đến nơi gọi điện về nhà trước, sau đó hẵng đến trường.']],
 'Nói về đất nước bạn muốn đến và lý do.','Viết 5 câu dùng 为了 và 先…然后.'),
L(3,1,'Ở thư viện','truonghoc','图书馆 借 字典 安静 笔记本 故事 关于 兴趣 感兴趣 了解',['g3-guanyu'],[
 ['A','请问，我可以借这本字典吗？','Cho hỏi, tôi có thể mượn cuốn từ điển này không?'],['B','可以。请在图书馆里安静一点儿。','Được. Xin giữ yên lặng trong thư viện.'],['A','对不起。还有关于熊猫的书吗？','Xin lỗi. Còn sách về gấu trúc không?'],['B','有。你对动物感兴趣吗？','Có. Bạn hứng thú với động vật à?'],['A','对，我想多了解一下熊猫的故事。','Vâng, tôi muốn tìm hiểu thêm câu chuyện về gấu trúc.']],
 'Giới thiệu một cuốn sách bạn thích.','Viết 4 câu dùng 关于 và 对…感兴趣.'),
L(3,2,'Hỏi đường bằng tàu điện','giaothong','地铁 街道 东 西 南 北方 经过 一直 向 站 司机 自行车 骑',['g3-xh'],[
 ['A','请问，地铁站怎么走？','Cho hỏi ga tàu điện ngầm đi thế nào?'],['B','一直往前走，经过两条街道，再向东走就到了。','Cứ đi thẳng, qua hai con phố, rồi đi về phía đông là đến.'],['A','远吗？我可以骑自行车去吗？','Có xa không? Tôi đạp xe đi được không?'],['B','不远，骑车五分钟。你也可以坐公共汽车，三站就到。','Không xa, đạp xe năm phút. Bạn cũng có thể đi xe buýt, ba bến là đến.'],['A','谢谢！','Cảm ơn!']],
 'Chỉ đường bằng các hướng đông, tây, nam, bắc.','Viết chỉ dẫn đường đi từ nhà bạn ra bến xe.'),
L(3,2,'Du lịch Trung Quốc','dulich','熊猫 有名 黄河 河 城市 环境 季节 春 夏 秋 冬',['g3-budan'],[
 ['A','中国哪个城市最有名？','Thành phố nào của Trung Quốc nổi tiếng nhất?'],['B','北京不但很有名，而且历史很长。','Bắc Kinh không những nổi tiếng mà lịch sử còn rất lâu đời.'],['A','我想去看熊猫和黄河。','Mình muốn đi xem gấu trúc và sông Hoàng Hà.'],['B','好啊！秋天是去中国旅游最好的季节。','Hay đấy! Mùa thu là mùa du lịch Trung Quốc tốt nhất.'],['A','为什么？','Tại sao?'],['B','因为秋天不冷也不热，环境也很美。','Vì mùa thu không lạnh không nóng, cảnh quan cũng đẹp.']],
 'Giới thiệu một thành phố nổi tiếng ở Việt Nam bằng tiếng Trung.','Viết 5 câu dùng 不但…而且 giới thiệu quê bạn.'),
L(3,2,'Thời tiết thay đổi','thoitiet','刮风 云 太阳 月亮 伞 越来越 变化 突然 影响',['g3-yue'],[
 ['A','天气越来越冷了。','Trời ngày càng lạnh.'],['B','是啊，早上还有太阳，下午突然刮风了。','Đúng vậy, sáng còn nắng, chiều đột nhiên nổi gió.'],['A','云越来越多，可能要下雨，带伞吧。','Mây càng lúc càng nhiều, có thể sắp mưa, mang ô đi.'],['B','天气变化太大，影响我的心情。','Thời tiết thay đổi thất thường quá, ảnh hưởng tâm trạng mình.']],
 'Miêu tả sự thay đổi thời tiết ở quê bạn.','Viết 4 câu dùng 越来越.'),
L(3,2,'Mất đồ','giaotiep','被 包 发现 记得 忘记 奇怪 拿 放 刚才 终于',['g3-bei'],[
 ['A','奇怪，我的包呢？刚才还在这儿！','Lạ thật, túi của mình đâu? Vừa nãy còn ở đây mà!'],['B','你记得放在哪儿了吗？','Bạn có nhớ để ở đâu không?'],['A','我忘记了。是不是被别人拿走了？','Mình quên rồi. Có phải bị người khác lấy mất không?'],['B','别着急，我们再找找。','Đừng sốt ruột, chúng ta tìm lại xem.'],['A','啊！我发现了，在椅子下面！终于找到了。','A! Thấy rồi, ở dưới ghế! Cuối cùng cũng tìm được.']],
 'Kể lại một lần bạn làm mất đồ.','Viết 4 câu dùng 被.'),
L(3,2,'Gặp lại bạn cũ','giaotiep','见面 以前 久 旧 胖 瘦 个子 矮 年轻 老 像 一样',['g3-yiyang','g3-meiyou'],[
 ['A','好久不见！你一点儿也没变。','Lâu rồi không gặp! Bạn chẳng thay đổi gì cả.'],['B','哪里，我比以前胖了。你瘦了，也更年轻了！','Đâu có, mình béo hơn trước rồi. Bạn gầy đi, trẻ ra nữa!'],['A','你还住在那个旧楼里吗？','Bạn vẫn sống ở tòa nhà cũ đó à?'],['B','对。你个子跟你哥哥一样高了！','Ừ. Bạn cao bằng anh trai bạn rồi!'],['A','哪里，我没有他那么高。','Đâu, mình không cao bằng anh ấy.']],
 'Miêu tả một người bạn cũ đã thay đổi thế nào.','Viết 5 câu so sánh dùng 跟…一样 và 没有.'),
L(3,3,'Sở thích và âm nhạc','sothich','爱好 音乐 表演 节目 比赛 体育 游戏 上网 除了',['g3-chule'],[
 ['A','你有什么爱好？','Bạn có sở thích gì?'],['B','除了音乐，我还喜欢体育。','Ngoài âm nhạc, mình còn thích thể thao.'],['A','你看今天晚上的比赛吗？','Bạn xem trận đấu tối nay không?'],['B','不看，我要去看一个表演节目。','Không, mình đi xem một tiết mục biểu diễn.'],['A','我除了上网玩游戏，没有别的爱好。','Ngoài lên mạng chơi game, mình chẳng có sở thích nào khác.']],
 'Giới thiệu sở thích dùng 除了…还.','Viết 4 câu dùng 除了…以外 với cả 都 và 还.'),
L(3,3,'Ngày lễ và gia đình','giadinh','节日 礼物 结婚 客人 热情 照顾 爷爷 奶奶 叔叔 阿姨',['g3-xian'],[
 ['A','春节你回家吗？','Tết bạn có về nhà không?'],['B','回。我先去看爷爷奶奶，然后去叔叔家。','Có. Mình đi thăm ông bà trước, sau đó đến nhà chú.'],['A','你给他们买礼物了吗？','Bạn mua quà cho họ chưa?'],['B','买了。我阿姨下个月结婚，家里会有很多客人。','Mua rồi. Tháng sau dì mình cưới, nhà sẽ có nhiều khách.'],['A','你家人真热情。','Gia đình bạn thật nhiệt tình.'],['B','是啊，我也要好好照顾爷爷奶奶。','Đúng vậy, mình cũng phải chăm sóc ông bà thật tốt.']],
 'Kể về một ngày lễ quan trọng của gia đình bạn.','Viết 5 câu về Tết ở nhà bạn.'),
L(3,3,'Cảm xúc','camxuc','生气 难过 哭 害怕 满意 相信 关心 愿意 可爱',['g3-youyou'],[
 ['A','你怎么哭了？谁让你生气了？','Sao bạn khóc? Ai làm bạn giận?'],['B','没有人。我的小狗生病了，我很难过。','Không ai cả. Con chó nhỏ của mình bị ốm, mình rất buồn.'],['A','别害怕，我陪你去医院。','Đừng sợ, mình đi bệnh viện với bạn.'],['B','谢谢你这么关心我。','Cảm ơn bạn quan tâm mình thế.'],['A','我相信它很快会好起来，它那么可爱！','Mình tin nó sẽ nhanh khỏe lại, nó đáng yêu thế mà!']],
 'Kể về một lúc bạn rất vui hoặc rất buồn.','Viết 4 câu miêu tả cảm xúc.'),
L(3,3,'Lựa chọn quan trọng','congviec','选择 还是 或者 决定 如果 需要 应该 重要 主要 其实 认为',['g3-haishi','g3-ruguo'],[
 ['A','你毕业以后想工作还是继续学习？','Tốt nghiệp xong bạn muốn đi làm hay học tiếp?'],['B','我还没决定。其实我想去中国留学。','Mình chưa quyết định. Thực ra mình muốn đi du học Trung Quốc.'],['A','我认为这是一个重要的选择。','Mình cho rằng đây là một lựa chọn quan trọng.'],['B','如果能拿到机会，我就去。','Nếu nhận được cơ hội, mình sẽ đi.'],['A','你需要什么帮助，或者有问题，都可以找我。','Bạn cần giúp gì, hoặc có vấn đề gì, đều có thể tìm mình.']],
 'Nói về một lựa chọn lớn bạn đang cân nhắc.','Viết 5 câu dùng 还是, 或者, 如果…就.'),
L(3,3,'Ôn tập HSK 3','coban','越 才 极 总是 经常 一般 几乎 终于 必须',['g3-yue','g3-cai','g3-budan'],[
 ['A','你学汉语多久了？','Bạn học tiếng Trung bao lâu rồi?'],['B','两年了。开始我总是听不懂，后来越学越喜欢。','Hai năm rồi. Lúc đầu mình toàn nghe không hiểu, về sau càng học càng thích.'],['A','你一般怎么学习？','Bạn thường học thế nào?'],['B','我经常看中国电影，几乎每天都练习。','Mình hay xem phim Trung Quốc, gần như ngày nào cũng luyện.'],['A','你终于要考HSK三级了！','Cuối cùng bạn cũng sắp thi HSK 3 rồi!'],['B','对，我必须好好准备。','Đúng, mình phải chuẩn bị thật tốt.']],
 'Tổng kết quá trình học tiếng Trung của bạn.','Viết đoạn văn 80–100 chữ về việc học tiếng Trung của bạn.'),
];
