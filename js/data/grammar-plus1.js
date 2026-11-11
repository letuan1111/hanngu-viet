// Ví dụ mở rộng cho ngữ pháp HSK 1 (mỗi điểm ≥ 20 ví dụ, chia theo cách dùng). Định dạng: xem cuối js/data/grammar.js
export const GP1 = `
@g1-shi
#Giới thiệu tên, quốc tịch, nghề nghiệp|A 是 B
我是越南人。|Tôi là người Việt Nam.
她是医生。|Cô ấy là bác sĩ.
我们是大学生。|Chúng tôi là sinh viên đại học.
王老师是北京人。|Thầy Vương là người Bắc Kinh.
#Chỉ người, chỉ vật: 这/那 + 是|Đây là…, kia là…
这是我妈妈。|Đây là mẹ tôi.
那是我们的学校。|Kia là trường của chúng tôi.
这是什么？这是茶。|Đây là cái gì? Đây là trà.
那是谁的书？|Kia là sách của ai?
#Quan hệ, sở hữu|A 是 B 的…
他是我哥哥。|Anh ấy là anh trai tôi.
她是我的好朋友。|Cô ấy là bạn thân của tôi.
这本书是我的。|Quyển sách này là của tôi.
#Phủ định 不是|A 不是 B
我不是老师，我是学生。|Tôi không phải giáo viên, tôi là học sinh.
这不是我的手机。|Đây không phải điện thoại của tôi.
今天不是星期一。|Hôm nay không phải thứ hai.
#Câu hỏi với 是|是…吗？ / 是不是…？ / 是谁…？
你是中国人吗？|Bạn là người Trung Quốc à?
他是不是你的老师？|Anh ấy có phải thầy giáo của bạn không?
谁是你们的汉语老师？|Ai là giáo viên tiếng Trung của các bạn?
#Thời gian, ngày tháng (có thể bỏ 是)|今天(是)…
今天是我的生日。|Hôm nay là sinh nhật tôi.
明天是星期六。|Ngày mai là thứ bảy.

@g1-ma
#Câu hỏi có/không với 吗|Câu trần thuật + 吗？
你好吗？|Bạn khỏe không?
你是学生吗？|Bạn là học sinh à?
你有哥哥吗？|Bạn có anh trai không?
他在家吗？|Anh ấy có ở nhà không?
#Với tính từ, động từ|Adj/V + 吗？
今天冷吗？|Hôm nay có lạnh không?
你喜欢喝茶吗？|Bạn có thích uống trà không?
你会说汉语吗？|Bạn biết nói tiếng Trung không?
你想去北京吗？|Bạn có muốn đi Bắc Kinh không?
#Câu phủ định + 吗|不/没 … 吗？ (hỏi lại, ngạc nhiên)
你不认识他吗？|Bạn không quen anh ấy à?
你没吃饭吗？|Bạn chưa ăn cơm à?
他今天不来吗？|Hôm nay anh ấy không đến à?
#Hỏi về hành động đã làm|V + 了 + 吗？
你买票了吗？|Bạn đã mua vé chưa?
作业做完了吗？|Bài tập làm xong chưa?
你看见我的书了吗？|Bạn có thấy sách của tôi không?
#Trả lời câu hỏi 吗|Dùng lại động từ / tính từ để trả lời
你忙吗？——很忙。|Bạn bận không? — Rất bận.
你去吗？——去。/ 不去。|Bạn đi không? — Đi. / Không đi.
你吃过饺子吗？——吃过。|Bạn đã ăn sủi cảo chưa? — Ăn rồi.
#Câu đề nghị, hỏi ý kiến|…，好吗？ / …，可以吗？
我们一起去，好吗？|Chúng ta cùng đi nhé, được không?
我用一下你的笔，可以吗？|Tôi dùng bút của bạn một chút, được không?

@g1-ne
#Hỏi ngược lại người kia|…，你呢？
我是越南人，你呢？|Tôi là người Việt Nam, còn bạn?
我很好，你呢？|Tôi rất khỏe, còn bạn?
我喜欢喝茶，你呢？|Tôi thích uống trà, còn bạn?
我明天去，他呢？|Mai tôi đi, còn anh ấy?
#Hỏi vị trí người/vật|Danh từ + 呢？ = … đâu rồi?
我的手机呢？|Điện thoại của tôi đâu rồi?
妈妈呢？|Mẹ đâu rồi?
你的书包呢？|Cặp sách của bạn đâu?
小王呢？他怎么还没来？|Tiểu Vương đâu? Sao cậu ấy vẫn chưa đến?
#Dùng trong câu hỏi có từ để hỏi|Làm giọng hỏi mềm hơn
你在做什么呢？|Bạn đang làm gì thế?
这个字怎么读呢？|Chữ này đọc thế nào nhỉ?
我们去哪儿吃饭呢？|Chúng ta đi đâu ăn cơm nhỉ?
你为什么不高兴呢？|Sao bạn không vui vậy?
#Hành động đang tiếp diễn|(正)在 + V + 呢
他在看书呢。|Anh ấy đang đọc sách đấy.
外面下雨呢。|Bên ngoài đang mưa đấy.
妈妈在做饭呢。|Mẹ đang nấu cơm đấy.
#Giả định “nếu… thì sao”|如果… + 呢？
如果明天下雨呢？|Nếu mai trời mưa thì sao?
如果他不来呢？|Nếu anh ấy không đến thì sao?
#Câu hỏi lựa chọn|A 还是 B 呢？
你喝茶还是喝咖啡呢？|Bạn uống trà hay cà phê?

@g1-hen
#Miêu tả tính chất|Chủ ngữ + 很 + tính từ
我很忙。|Tôi rất bận.
今天很冷。|Hôm nay rất lạnh.
这个苹果很大。|Quả táo này rất to.
他的汉语很好。|Tiếng Trung của anh ấy rất tốt.
#很 nhiều khi chỉ để câu tròn ý|Không mang nghĩa “rất” mạnh
我很好，谢谢。|Tôi khỏe, cảm ơn.
北京很大。|Bắc Kinh lớn.
她很漂亮。|Cô ấy đẹp.
#Phủ định|不 + tính từ / 不太 + tính từ / 不很 (ít dùng)
今天不冷。|Hôm nay không lạnh.
这个菜不太辣。|Món này không cay lắm.
我最近不太忙。|Dạo này tôi không bận lắm.
#Câu hỏi|Adj + 吗？ / Adj不Adj？
你累吗？|Bạn mệt không?
这件衣服贵不贵？|Bộ quần áo này có đắt không?
#Phó từ mức độ khác thay 很|非常 / 太…了 / 真 / 有点儿
这里的菜非常好吃。|Đồ ăn ở đây cực kỳ ngon.
今天真热！|Hôm nay nóng thật!
我有点儿饿。|Tôi hơi đói.
#很 + động từ tâm lý|很 + 喜欢/想/爱/怕…
我很喜欢学汉语。|Tôi rất thích học tiếng Trung.
我很想我妈妈。|Tôi rất nhớ mẹ tôi.
她很怕狗。|Cô ấy rất sợ chó.
#Hai tính từ|又…又… / 很…也很…
这个房间很大，也很干净。|Căn phòng này rất rộng, cũng rất sạch.

@g1-bu
#不: phủ định thói quen, ý muốn, hiện tại, tương lai|不 + V/Adj
我不喝咖啡。|Tôi không uống cà phê.
他不是老师。|Anh ấy không phải giáo viên.
明天我不去学校。|Ngày mai tôi không đến trường.
我不想看电视。|Tôi không muốn xem ti vi.
这个不贵。|Cái này không đắt.
#没(有): phủ định việc đã xảy ra / chưa xảy ra|没 + V (bỏ 了)
我昨天没去学校。|Hôm qua tôi không đến trường.
他还没吃饭。|Anh ấy vẫn chưa ăn cơm.
我没看见你的书。|Tôi không thấy sách của bạn.
今天早上我没喝牛奶。|Sáng nay tôi không uống sữa.
#没有: phủ định của 有|没有 + danh từ
我没有哥哥。|Tôi không có anh trai.
教室里没有人。|Trong lớp học không có ai.
我今天没有时间。|Hôm nay tôi không có thời gian.
#不 với 是、在、会、能、想…|Luôn dùng 不, không dùng 没
他不在家。|Anh ấy không có ở nhà.
我不会开车。|Tôi không biết lái xe.
我明天不能来。|Ngày mai tôi không đến được.
#没 với 过 (chưa từng)|没 + V + 过
我没去过中国。|Tôi chưa từng đi Trung Quốc.
他没吃过越南菜。|Anh ấy chưa từng ăn món Việt Nam.
#Biến điệu của 不|不 đọc bú trước thanh 4
不是（bú shì）、不去（bú qù）、不对（bú duì）|Không phải, không đi, không đúng (不 đổi thành thanh 2).

@g1-de
#Sở hữu|Người + 的 + vật
这是我的书。|Đây là sách của tôi.
那是老师的电脑。|Kia là máy tính của thầy giáo.
你的手机在哪儿？|Điện thoại của bạn ở đâu?
#Bỏ 的 khi nói người thân, nơi thân thuộc|我妈妈、我家、我们学校
我妈妈是医生。|Mẹ tôi là bác sĩ.
我家有五口人。|Nhà tôi có năm người.
我们学校很大。|Trường chúng tôi rất rộng.
#Tính từ (cụm) + 的 + danh từ|Định ngữ miêu tả
这是一件很漂亮的衣服。|Đây là một bộ quần áo rất đẹp.
她是一个很好的老师。|Cô ấy là một giáo viên rất tốt.
我想买一个新的手机。|Tôi muốn mua một chiếc điện thoại mới.
#Tính từ đơn âm tiết thường bỏ 的|好人、红花、大房子
他是好人。|Anh ấy là người tốt.
我想要一个大房子。|Tôi muốn có một ngôi nhà to.
#Động từ / cụm chủ vị + 的 + danh từ|Mệnh đề định ngữ
我昨天买的书很有意思。|Quyển sách tôi mua hôm qua rất thú vị.
在那儿看书的人是我哥哥。|Người đang đọc sách ở đằng kia là anh trai tôi.
妈妈做的菜很好吃。|Món mẹ nấu rất ngon.
#Cụm 的 thay cho danh từ|…的 = cái/người …
这本书是我的。|Quyển sách này là của tôi.
红的好看还是白的好看？|Cái màu đỏ đẹp hay cái màu trắng đẹp?
卖水果的来了。|Người bán hoa quả đến rồi.
#Chất liệu, nơi chốn, thời gian|…的 + danh từ
北京的冬天很冷。|Mùa đông ở Bắc Kinh rất lạnh.
昨天的作业你做完了吗？|Bài tập hôm qua bạn làm xong chưa?

@g1-qw
#什么 (cái gì)|什么 + danh từ / V + 什么
你叫什么名字？|Bạn tên là gì?
你想吃什么？|Bạn muốn ăn gì?
这是什么书？|Đây là sách gì?
#谁 (ai)|谁 làm chủ ngữ / tân ngữ / 谁的
他是谁？|Anh ấy là ai?
谁是你的汉语老师？|Ai là giáo viên tiếng Trung của bạn?
这是谁的手机？|Đây là điện thoại của ai?
#哪儿 / 哪里 (ở đâu)|在哪儿 / 去哪儿
你家在哪儿？|Nhà bạn ở đâu?
你明天去哪儿？|Ngày mai bạn đi đâu?
你是在哪儿学的汉语？|Bạn học tiếng Trung ở đâu?
#哪 + lượng từ (nào)|哪 + 个/本/国…
你是哪国人？|Bạn là người nước nào?
你喜欢哪本书？|Bạn thích quyển sách nào?
#几 (mấy – số nhỏ, dưới 10)|几 + lượng từ
你家有几口人？|Nhà bạn có mấy người?
现在几点？|Bây giờ là mấy giờ?
今天几月几号？|Hôm nay là ngày mấy tháng mấy?
#多少 (bao nhiêu – số lớn hoặc không rõ)|多少 (+ lượng từ) + danh từ
你们班有多少个学生？|Lớp bạn có bao nhiêu học sinh?
这个苹果多少钱？|Quả táo này bao nhiêu tiền?
你的电话号码是多少？|Số điện thoại của bạn là bao nhiêu?
#Từ để hỏi khác|什么时候 / 怎么样 / 为什么
你什么时候回家？|Khi nào bạn về nhà?
你觉得这个电影怎么样？|Bạn thấy bộ phim này thế nào?

@g1-you
#Sở hữu: có|Người + 有 + vật
我有一个妹妹。|Tôi có một em gái.
他有很多中国朋友。|Anh ấy có rất nhiều bạn Trung Quốc.
你有时间吗？|Bạn có thời gian không?
#Tồn tại: ở đâu có gì|Nơi chốn + 有 + người/vật
桌子上有一本书。|Trên bàn có một quyển sách.
学校旁边有一个商店。|Cạnh trường có một cửa hàng.
教室里有很多学生。|Trong lớp học có rất nhiều học sinh.
#Phủ định: 没有|Không dùng 不有
我没有车。|Tôi không có xe.
冰箱里没有水果了。|Trong tủ lạnh hết hoa quả rồi.
#Câu hỏi|有…吗？ / 有没有…？
你有哥哥吗？|Bạn có anh trai không?
这儿有没有洗手间？|Ở đây có nhà vệ sinh không?
你们家有几口人？|Nhà các bạn có mấy người?
#有 + số lượng (ước lượng)|有 + số + đơn vị
他有一米八。|Anh ấy cao khoảng một mét tám.
从这儿到学校有两公里。|Từ đây đến trường khoảng hai cây số.
#Cụm cố định với 有|有意思、有名、有用、有空、有事
这本书很有意思。|Quyển sách này rất thú vị.
他是一个很有名的歌手。|Anh ấy là một ca sĩ rất nổi tiếng.
今天晚上你有空吗？|Tối nay bạn có rảnh không?
对不起，我有事，不能去。|Xin lỗi, tôi có việc, không đi được.
#有的…有的…|Có người/cái… có người/cái…
有的人喜欢喝茶，有的人喜欢喝咖啡。|Có người thích uống trà, có người thích uống cà phê.

@g1-zai
#在 + nơi chốn (động từ: ở)|Ai/cái gì + 在 + đâu
我在家。|Tôi ở nhà.
你的书在桌子上。|Sách của bạn ở trên bàn.
我们学校在北京。|Trường của chúng tôi ở Bắc Kinh.
洗手间在哪儿？|Nhà vệ sinh ở đâu?
#在 + nơi chốn + động từ (giới từ: làm gì ở đâu)|Nơi chốn đứng trước động từ
我在学校学习汉语。|Tôi học tiếng Trung ở trường.
他在医院工作。|Anh ấy làm việc ở bệnh viện.
我们在饭店吃饭吧。|Chúng ta ăn cơm ở nhà hàng nhé.
她在商店买东西。|Cô ấy mua đồ ở cửa hàng.
#Phủ định|不在 / 没在
妈妈不在家。|Mẹ không có ở nhà.
我昨天没在家吃饭。|Hôm qua tôi không ăn cơm ở nhà.
#Từ phương vị sau nơi chốn|上 / 里 / 下 / 旁边 / 前边 / 后边
猫在椅子下边。|Con mèo ở dưới ghế.
手机在书包里。|Điện thoại ở trong cặp.
银行在超市旁边。|Ngân hàng ở bên cạnh siêu thị.
他家在学校后边。|Nhà anh ấy ở phía sau trường.
#在 (phó từ: đang)|在 + V
他在打电话。|Anh ấy đang gọi điện thoại.
你在做什么？|Bạn đang làm gì?
#V + 在 + nơi chốn (bổ ngữ)|住在、坐在、放在
我住在河内。|Tôi sống ở Hà Nội.
请把书放在桌子上。|Hãy đặt sách lên bàn.

@g1-num
#Số + lượng từ + danh từ|Không đếm trực tiếp danh từ
一个人|Một người
三本书|Ba quyển sách
五杯水|Năm cốc nước
我买了两张票。|Tôi đã mua hai vé.
#两 và 二|Trước lượng từ dùng 两
两个苹果|Hai quả táo
我有两个哥哥。|Tôi có hai anh trai.
二十二个学生|Hai mươi hai học sinh (hàng đơn vị vẫn dùng 二)
#这/那/哪 + (số) + lượng từ + danh từ|Chỉ định
这个人是谁？|Người này là ai?
那本书很有意思。|Quyển sách kia rất thú vị.
你要哪件衣服？|Bạn muốn bộ quần áo nào?
这三个苹果多少钱？|Ba quả táo này bao nhiêu tiền?
#几 / 多少 + lượng từ (hỏi số lượng)|
你要几个包子？|Bạn muốn mấy cái bánh bao?
你家有几口人？|Nhà bạn có mấy người?
#Lượng từ thường gặp|个、本、杯、张、件、只、条、口、块
我家有一只小狗。|Nhà tôi có một con chó nhỏ.
这条裤子很长。|Chiếc quần này rất dài.
这件衣服一百块钱。|Bộ quần áo này một trăm tệ.
#Số lớn|十、百、千、万
一百二十个人|Một trăm hai mươi người
三千五百块钱|Ba nghìn năm trăm tệ
#Thứ tự: 第 + số|第一、第二…
这是我第一次来中国。|Đây là lần đầu tiên tôi đến Trung Quốc.

@g1-time
#Năm, tháng, ngày, thứ|Lớn → nhỏ: năm → tháng → ngày → thứ
今天是2026年11月11号，星期三。|Hôm nay là thứ tư, ngày 11 tháng 11 năm 2026.
我的生日是五月三号。|Sinh nhật tôi là ngày 3 tháng 5.
明天星期几？|Ngày mai là thứ mấy?
#Giờ, phút|点 / 分 / 半 / 刻 / 差
现在八点半。|Bây giờ là tám giờ rưỡi.
我七点一刻起床。|Tôi dậy lúc bảy giờ mười lăm.
现在差五分十点。|Bây giờ là mười giờ kém năm.
#Buổi trong ngày|早上 / 上午 / 中午 / 下午 / 晚上
我每天早上六点起床。|Sáng nào tôi cũng dậy lúc sáu giờ.
下午三点我们去游泳。|Ba giờ chiều chúng ta đi bơi.
#Vị trí: thời gian đứng trước động từ|Chủ ngữ + thời gian + V hoặc thời gian + chủ ngữ + V
我明天去北京。|Ngày mai tôi đi Bắc Kinh.
晚上九点我在家看书。|Chín giờ tối tôi ở nhà đọc sách.
他每天八点上班。|Anh ấy đi làm lúc tám giờ hằng ngày.
#Hỏi thời gian|几点 / 几号 / 什么时候
你几点下班？|Mấy giờ bạn tan làm?
你什么时候去中国？|Khi nào bạn đi Trung Quốc?
#Thời gian tương đối|昨天 / 今天 / 明天 / 去年 / 今年 / 明年 / 上个月 / 下个星期
我去年去过上海。|Năm ngoái tôi đã đi Thượng Hải.
下个星期我们考试。|Tuần sau chúng tôi thi.
上个月我很忙。|Tháng trước tôi rất bận.
#Khoảng thời gian (đứng sau động từ)|V + 了 + khoảng thời gian
我学了一年汉语。|Tôi đã học tiếng Trung một năm.

@g1-hui
#Biết làm (do học mà có)|会 + V
我会说汉语。|Tôi biết nói tiếng Trung.
她会做中国菜。|Cô ấy biết nấu món Trung Quốc.
你会游泳吗？|Bạn biết bơi không?
我妹妹会写一百个汉字。|Em gái tôi biết viết một trăm chữ Hán.
#Phủ định|不会 + V
我不会开车。|Tôi không biết lái xe.
他不会喝酒。|Anh ấy không biết uống rượu.
#Câu hỏi|会…吗？ / 会不会…？
你会不会打篮球？|Bạn có biết chơi bóng rổ không?
你会用电脑吗？|Bạn biết dùng máy tính không?
#Khả năng xảy ra (sẽ)|会 + V (dự đoán)
明天会下雨。|Ngày mai trời sẽ mưa.
他今天会来吗？|Hôm nay anh ấy có đến không?
别担心，你会考好的。|Đừng lo, bạn sẽ thi tốt thôi.
我想她不会生气的。|Tôi nghĩ cô ấy sẽ không giận đâu.
#Giỏi một việc|很会 / 真会 + V
他很会说话。|Anh ấy rất khéo ăn nói.
妈妈很会做饭。|Mẹ rất giỏi nấu ăn.
#会 làm động từ chính|会 + danh từ ngôn ngữ / môn
她会英语和汉语。|Cô ấy biết tiếng Anh và tiếng Trung.
#Phân biệt 会 / 能|会: đã học được; 能: có điều kiện làm
我会游泳，但是今天感冒了，不能游。|Tôi biết bơi, nhưng hôm nay bị cảm nên không bơi được.
他会开车，可是喝了酒，不能开车。|Anh ấy biết lái xe nhưng đã uống rượu nên không được lái.
#Trả lời ngắn|会。/ 不会。
你会说英语吗？——会一点儿。|Bạn biết nói tiếng Anh không? — Biết một chút.

@g1-neng
#Có khả năng, có điều kiện làm|能 + V
我能看懂中文报纸。|Tôi đọc hiểu được báo tiếng Trung.
你明天能来吗？|Ngày mai bạn đến được không?
他一分钟能写三十个字。|Một phút anh ấy viết được ba mươi chữ.
#Xin phép, cho phép|能…吗？
我能进来吗？|Tôi vào được không?
我能用一下你的电话吗？|Tôi dùng điện thoại của bạn một chút được không?
这儿能抽烟吗？——不能。|Ở đây được hút thuốc không? — Không được.
#Phủ định: không thể|不能 + V
我今天不能去上课。|Hôm nay tôi không đi học được.
这个东西不能吃。|Thứ này không ăn được.
你不能在这儿停车。|Bạn không được đỗ xe ở đây.
#Năng lực đạt mức độ|能 + V (nhiều/xa/nhanh…)
他能吃三碗饭。|Anh ấy ăn được ba bát cơm.
我能跑五公里。|Tôi chạy được năm cây số.
#Hồi phục khả năng|能 + V + 了
我的病好了，能上班了。|Tôi khỏi bệnh rồi, có thể đi làm rồi.
宝宝能走路了。|Em bé đã đi được rồi.
#能不能 (hỏi lịch sự)|能不能 + V？
你能不能说慢一点儿？|Bạn nói chậm một chút được không?
你能不能帮我一下？|Bạn giúp tôi một chút được không?
#能 + 不 + V (không thể không)|Nhấn mạnh
这么重要的会，我能不去吗？|Cuộc họp quan trọng thế này, tôi có thể không đi sao?
#Phân biệt 能 / 可以|可以 thiên về được phép
你可以走了。|Bạn có thể đi rồi.

@g1-xiang
#Muốn làm gì|想 + V
我想喝水。|Tôi muốn uống nước.
我想去中国学习。|Tôi muốn sang Trung Quốc học.
你想吃什么？|Bạn muốn ăn gì?
周末我想在家休息。|Cuối tuần tôi muốn nghỉ ở nhà.
#Phủ định|不想 + V
我不想去。|Tôi không muốn đi.
今天我不想做饭。|Hôm nay tôi không muốn nấu cơm.
#Câu hỏi|想…吗？ / 想不想…？
你想不想看电影？|Bạn có muốn xem phim không?
你想去哪儿玩儿？|Bạn muốn đi đâu chơi?
#Rất muốn|很想 / 特别想 + V
我很想见你。|Tôi rất muốn gặp bạn.
她特别想当老师。|Cô ấy rất muốn làm giáo viên.
#想 (nhớ ai đó)|想 + người
我很想我的妈妈。|Tôi rất nhớ mẹ tôi.
你想家吗？|Bạn có nhớ nhà không?
#想 (nghĩ)|想 + 一想 / 我想… (tôi nghĩ là)
我想他今天不会来了。|Tôi nghĩ hôm nay anh ấy sẽ không đến nữa.
让我想一想。|Để tôi nghĩ một chút.
你在想什么？|Bạn đang nghĩ gì vậy?
#想 + 好 / 起来 (bổ ngữ)|想好了、想起来了
我想好了，明天去。|Tôi nghĩ kỹ rồi, mai đi.
我想起来了，他叫李明。|Tôi nhớ ra rồi, anh ấy tên là Lý Minh.
#想 và 要|要: ý chí mạnh hơn
我想买，可是太贵了。|Tôi muốn mua, nhưng đắt quá.

@g1-le
#Hành động đã hoàn thành|V + 了 (+ tân ngữ có số lượng/định ngữ)
我买了一本书。|Tôi đã mua một quyển sách.
他喝了两杯咖啡。|Anh ấy đã uống hai cốc cà phê.
我昨天看了一个电影。|Hôm qua tôi đã xem một bộ phim.
#了 cuối câu: việc đã xảy ra|Câu + 了
我吃饭了。|Tôi ăn cơm rồi.
他去北京了。|Anh ấy đi Bắc Kinh rồi.
妈妈回来了。|Mẹ về rồi.
#了 cuối câu: thay đổi trạng thái|Adj/Danh từ/不… + 了
天黑了。|Trời tối rồi.
我二十岁了。|Tôi hai mươi tuổi rồi.
我不想去了。|Tôi không muốn đi nữa.
下雨了！|Trời mưa rồi!
#Phủ định: 没 + V (bỏ 了)|没(有) + V
我没买那本书。|Tôi không mua quyển sách đó.
他还没回来。|Anh ấy vẫn chưa về.
#Câu hỏi|…了吗？ / …了没有？
你吃饭了没有？|Bạn ăn cơm chưa?
作业你写完了吗？|Bài tập bạn viết xong chưa?
#V + 了 + V tiếp theo (làm xong… rồi…)|V1 + 了 + O + 就/再 + V2
我下了课就去找你。|Tan học tôi sẽ đi tìm bạn ngay.
吃了饭再走吧。|Ăn cơm xong rồi hãy đi.
#Thời lượng + 了|V + 了 + thời gian + 了 (vẫn đang tiếp tục)
我学汉语学了一年了。|Tôi học tiếng Trung được một năm rồi (và vẫn đang học).
#太…了 / 快…了 / 要…了|Cấu trúc cố định
太好了！|Tốt quá!
快到了。|Sắp đến rồi.

@g1-dou
#Tất cả đều|Chủ ngữ số nhiều + 都 + V/Adj
我们都是学生。|Chúng tôi đều là học sinh.
他们都喜欢踢足球。|Họ đều thích đá bóng.
这些苹果都很甜。|Những quả táo này đều rất ngọt.
我和我妹妹都会说汉语。|Tôi và em gái tôi đều biết nói tiếng Trung.
#Phủ định|都不 (tất cả đều không) / 不都 (không phải tất cả)
我们都不去。|Chúng tôi đều không đi.
我们不都是越南人。|Chúng tôi không phải ai cũng là người Việt Nam.
#Tân ngữ đưa lên trước|Tân ngữ + 主 + 都 + V
这些菜我都喜欢。|Những món này tôi đều thích.
汉语、英语他都会说。|Tiếng Trung, tiếng Anh anh ấy đều biết nói.
#Mỗi… đều|每 + … + 都
我每天都喝牛奶。|Ngày nào tôi cũng uống sữa.
每个人都有自己的爱好。|Mỗi người đều có sở thích riêng.
#Từ để hỏi + 都 (ai cũng / gì cũng)|谁都 / 什么都 / 哪儿都
谁都认识他。|Ai cũng biết anh ấy.
我什么都不想吃。|Tôi chẳng muốn ăn gì cả.
周末我哪儿都不去。|Cuối tuần tôi không đi đâu cả.
#都…了 (đã… rồi, nhấn mạnh)|都 + thời gian/tuổi + 了
都十二点了，快睡觉吧。|Đã mười hai giờ rồi, mau ngủ đi.
他都三十岁了，还没结婚。|Anh ấy đã ba mươi tuổi rồi mà vẫn chưa kết hôn.
#一点儿也不 / 一…都不|Hoàn toàn không
我一点儿都不累。|Tôi chẳng mệt chút nào.
他一个字都不认识。|Anh ấy không biết một chữ nào.
#Hỏi 都|都 + 什么/谁…？ (liệt kê)
你都去过哪些国家？|Bạn đã đi những nước nào?

@g1-taile
#Quá… (khen, cảm thán)|太 + Adj + 了
太好了！|Tốt quá!
这儿的风景太美了！|Phong cảnh ở đây đẹp quá!
你说得太对了。|Bạn nói đúng quá.
#Quá mức (phàn nàn)|太 + Adj + 了
这件衣服太贵了。|Bộ quần áo này đắt quá.
今天太热了。|Hôm nay nóng quá.
这个菜太辣了，我不能吃。|Món này cay quá, tôi không ăn được.
你走得太快了。|Bạn đi nhanh quá.
#太 + động từ tâm lý + 了|太喜欢 / 太想 / 太感谢
我太喜欢这本书了！|Tôi thích quyển sách này quá!
太谢谢你了！|Cảm ơn bạn nhiều lắm!
我太想回家了。|Tôi nhớ nhà quá.
#Phủ định nhẹ: 不太 + Adj|Không… lắm (không có 了)
我不太忙。|Tôi không bận lắm.
这个电影不太好看。|Bộ phim này không hay lắm.
他的汉语不太好。|Tiếng Trung của anh ấy không giỏi lắm.
#太 + 不 + Adj + 了|Thật là không…
你太不小心了。|Bạn bất cẩn quá.
#Phân biệt 太…了 / 很|很 trung tính; 太…了 cảm thán, quá mức
房间很大。/ 房间太大了。|Căn phòng rất rộng. / Căn phòng rộng quá.
#Trong lời từ chối|太…了，…
太晚了，我们明天再去吧。|Muộn quá rồi, mai chúng ta hãy đi.
太远了，我们坐出租车吧。|Xa quá, chúng ta đi taxi đi.

@g1-shide
#Nhấn mạnh thời gian|是 + thời gian + V + 的
我是去年来北京的。|Tôi đến Bắc Kinh từ năm ngoái.
你是什么时候到的？|Bạn đến lúc nào vậy?
他是昨天晚上回来的。|Anh ấy về vào tối hôm qua.
#Nhấn mạnh nơi chốn|是 + 在/从 + nơi + V + 的
这本书是在北京买的。|Quyển sách này mua ở Bắc Kinh.
你是从哪儿来的？|Bạn từ đâu đến?
我们是在大学认识的。|Chúng tôi quen nhau ở trường đại học.
#Nhấn mạnh phương tiện, cách thức|是 + 坐/怎么… + V + 的
我是坐飞机来的。|Tôi đến bằng máy bay.
你是怎么来的？——我是走路来的。|Bạn đến bằng cách nào? — Tôi đi bộ đến.
#Nhấn mạnh người làm|是 + ai + V + 的
这个菜是妈妈做的。|Món này là mẹ nấu.
这件事是谁告诉你的？|Chuyện này là ai nói với bạn?
#Nhấn mạnh mục đích|是 + 来/去 + V + 的
我是来学习汉语的。|Tôi đến để học tiếng Trung.
他是来找你的。|Anh ấy đến để tìm bạn.
#Phủ định|不是…的
我不是坐飞机来的，是坐火车来的。|Tôi không đến bằng máy bay, mà bằng tàu hỏa.
#Có thể bỏ 是 trong câu khẳng định|(是)…的
我昨天到的。|Tôi đến hôm qua.
#Tân ngữ đặt trước hoặc sau 的|V + 的 + O
我是在北京学的汉语。|Tôi học tiếng Trung ở Bắc Kinh.

@g1-liandong
#Đi đâu để làm gì|去/来 + nơi chốn + V
我去商店买东西。|Tôi đi cửa hàng mua đồ.
他来中国学习汉语。|Anh ấy đến Trung Quốc học tiếng Trung.
我们去饭店吃饭吧。|Chúng ta đi nhà hàng ăn cơm đi.
明天我去医院看朋友。|Ngày mai tôi đi bệnh viện thăm bạn.
#Phương tiện / cách thức + hành động|坐/骑/用 + … + V
我坐公共汽车去学校。|Tôi đi xe buýt đến trường.
他骑自行车上班。|Anh ấy đi xe đạp đi làm.
我们用汉语说话吧。|Chúng ta nói chuyện bằng tiếng Trung đi.
她每天坐地铁回家。|Ngày nào cô ấy cũng đi tàu điện ngầm về nhà.
#去/来 + V (không có nơi chốn)|去看看、来玩儿
我们去看看吧。|Chúng ta đi xem thử đi.
有空来我家玩儿。|Có rảnh thì đến nhà tôi chơi.
#Hành động nối tiếp|V1 + O1 + V2 + O2
他打电话叫出租车。|Anh ấy gọi điện gọi taxi.
我上网买机票。|Tôi lên mạng mua vé máy bay.
#有/没有 + danh từ + V|Có/không có… để làm
我有时间去旅游。|Tôi có thời gian đi du lịch.
我没有钱买新手机。|Tôi không có tiền mua điện thoại mới.
他没有时间吃早饭。|Anh ấy không có thời gian ăn sáng.
#Phủ định đặt trước động từ thứ nhất|不/没 + V1 + … + V2
我今天不去超市买东西。|Hôm nay tôi không đi siêu thị mua đồ.
#了/过 thường đặt sau động từ thứ hai|V1 + O + V2 + 了
我去商店买了一件衣服。|Tôi đã đi cửa hàng mua một bộ quần áo.

@g1-zenme
#Hỏi cách làm|怎么 + V？
这个字怎么写？|Chữ này viết thế nào?
去火车站怎么走？|Đến ga tàu đi thế nào?
这个菜怎么做？|Món này nấu thế nào?
"谢谢"用汉语怎么说？|"Cảm ơn" tiếng Trung nói thế nào?
#Hỏi phương tiện|怎么 + 去/来？
你每天怎么去学校？|Hằng ngày bạn đến trường bằng gì?
我们怎么去机场？|Chúng ta đến sân bay bằng cách nào?
#Hỏi nguyên nhân (ngạc nhiên)|怎么 + (不/没) + V？ = sao lại…
你怎么不吃饭？|Sao bạn không ăn cơm?
他怎么还没来？|Sao anh ấy vẫn chưa đến?
你怎么来了？|Sao bạn lại đến đây?
今天怎么这么冷？|Sao hôm nay lạnh thế?
#怎么了 (sao vậy, có chuyện gì)|
你怎么了？不舒服吗？|Bạn sao vậy? Không khỏe à?
电脑怎么了？|Máy tính bị làm sao vậy?
#怎么样 (thế nào – hỏi ý kiến, tình trạng)|
你觉得这本书怎么样？|Bạn thấy quyển sách này thế nào?
我们明天去公园，怎么样？|Mai chúng ta đi công viên, thế nào?
你最近身体怎么样？|Dạo này sức khỏe bạn thế nào?
#不怎么 + Adj/V (không… lắm)|
我不怎么喜欢吃甜的。|Tôi không thích đồ ngọt lắm.
#怎么办 (làm sao bây giờ)|
钱包丢了，怎么办？|Mất ví rồi, làm sao bây giờ?
#怎么 + cũng/都 (dù thế nào)|怎么…也/都…
我怎么也找不到我的钥匙。|Tôi tìm mãi cũng không thấy chìa khóa.

@g1-ne
#Hỏi ngược lại người kia
我叫李明，你呢？|Tôi tên là Lý Minh, còn bạn?
#Hỏi vị trí người/vật
我的钥匙呢？|Chìa khóa của tôi đâu rồi?
@g1-taile
#Quá mức (phàn nàn)
这个房间太小了。|Căn phòng này nhỏ quá.
@g1-shide
#Nhấn mạnh thời gian
我们是上个星期认识的。|Chúng tôi quen nhau từ tuần trước.
@g1-liandong
#Đi đâu để làm gì
下午我去图书馆借书。|Buổi chiều tôi đi thư viện mượn sách.
#Phương tiện / cách thức + hành động
我们坐火车去上海旅游。|Chúng tôi đi tàu hỏa đến Thượng Hải du lịch.
@g1-zenme
#Hỏi cách làm
这个电脑怎么开？|Máy tính này bật thế nào?
`;
