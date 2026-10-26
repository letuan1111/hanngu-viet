// 5 câu ví dụ cho mỗi từ trong danh sách HSK 1 (chuẩn HSK 3.0, 506 mục) – bao quát các nghĩa, dạng khẳng định,
// phủ định, nghi vấn và các kết hợp thường gặp. Định dạng: "#từ" rồi 5 dòng "câu Trung|nghĩa Việt".
const RAW = `
#爱
我爱我的爸爸妈妈。|Tôi yêu bố mẹ tôi.
妈妈很爱我。|Mẹ rất yêu tôi.
我爱吃中国菜。|Tôi rất thích ăn món Trung Quốc.
他不爱喝茶，爱喝咖啡。|Anh ấy không thích uống trà, thích uống cà phê.
你爱看电影吗？|Bạn có thích xem phim không?
#爱好
你有什么爱好？|Bạn có sở thích gì?
我的爱好是看书。|Sở thích của tôi là đọc sách.
唱歌是她的爱好。|Hát là sở thích của cô ấy.
我们的爱好一样。|Sở thích của chúng tôi giống nhau.
我爸爸的爱好是打球。|Sở thích của bố tôi là chơi bóng.
#八
我八岁。|Tôi tám tuổi.
现在八点。|Bây giờ là tám giờ.
我们班有八个男生。|Lớp chúng tôi có tám bạn nam.
今天是八月八号。|Hôm nay là ngày 8 tháng 8.
这个苹果八块钱。|Quả táo này tám tệ.
#爸
爸，你回来了！|Bố ơi, bố về rồi!
我爸是医生。|Bố tôi là bác sĩ.
爸，我们去吃饭吧。|Bố ơi, chúng ta đi ăn cơm đi.
我爸和我妈都在家。|Bố và mẹ tôi đều ở nhà.
爸，这个字怎么读？|Bố ơi, chữ này đọc thế nào?
#爸爸
这是我爸爸。|Đây là bố tôi.
我爸爸是老师。|Bố tôi là giáo viên.
爸爸每天开车去工作。|Bố ngày nào cũng lái xe đi làm.
你爸爸在家吗？|Bố bạn có ở nhà không?
爸爸给我买了一本书。|Bố mua cho tôi một quyển sách.
#吧
我们走吧。|Chúng ta đi thôi.
你是中国人吧？|Bạn là người Trung Quốc phải không?
你坐吧。|Bạn ngồi đi.
我们一起吃饭吧。|Chúng ta cùng ăn cơm nhé.
明天再说吧。|Mai rồi nói tiếp nhé.
#白
我的衣服是白的。|Quần áo của tôi màu trắng.
她喜欢白色。|Cô ấy thích màu trắng.
这只猫很白。|Con mèo này rất trắng.
我想买白杯子。|Tôi muốn mua cốc trắng.
他穿了一件白衣服。|Anh ấy mặc một bộ đồ trắng.
#白天
白天我去学校，晚上在家。|Ban ngày tôi đến trường, buổi tối ở nhà.
白天很热，晚上很冷。|Ban ngày rất nóng, buổi tối rất lạnh.
他白天工作，晚上学习。|Anh ấy ban ngày làm việc, buổi tối học bài.
白天我不在家。|Ban ngày tôi không ở nhà.
你白天睡觉吗？|Ban ngày bạn có ngủ không?
#百
一百块钱。|Một trăm tệ.
我们学校有五百个学生。|Trường chúng tôi có năm trăm học sinh.
这本书一百二十块。|Quyển sách này một trăm hai mươi tệ.
他写了一百个汉字。|Anh ấy viết một trăm chữ Hán.
这儿有几百个人。|Ở đây có mấy trăm người.
#班
我们班有三十个学生。|Lớp chúng tôi có ba mươi học sinh.
你是哪个班的？|Bạn học lớp nào?
我和他在一个班。|Tôi và cậu ấy học cùng một lớp.
我们班的老师很好。|Thầy cô lớp chúng tôi rất tốt.
他是我们班最高的。|Cậu ấy cao nhất lớp chúng tôi.
#半
现在八点半。|Bây giờ là tám giờ rưỡi.
我吃了半个苹果。|Tôi ăn nửa quả táo.
我学了一年半汉语。|Tôi học tiếng Trung một năm rưỡi.
半个小时以后见。|Nửa tiếng nữa gặp nhé.
我想喝半杯水。|Tôi muốn uống nửa cốc nước.
#半年
我在北京住了半年。|Tôi sống ở Bắc Kinh nửa năm.
我学汉语半年了。|Tôi học tiếng Trung được nửa năm rồi.
半年以后我回国。|Nửa năm nữa tôi về nước.
他半年没回家了。|Nửa năm rồi anh ấy chưa về nhà.
我想去中国学习半年。|Tôi muốn đến Trung Quốc học nửa năm.
#半天
我等了你半天！|Tôi đợi bạn mãi!
明天上午我工作半天。|Sáng mai tôi làm việc nửa ngày.
他看了半天也没看懂。|Anh ấy xem mãi vẫn không hiểu.
我们休息半天吧。|Chúng ta nghỉ nửa ngày nhé.
我找了半天，没找到。|Tôi tìm mãi mà không thấy.
#帮
你能帮我吗？|Bạn có thể giúp tôi không?
我帮妈妈做饭。|Tôi giúp mẹ nấu cơm.
请帮我开一下门。|Làm ơn mở cửa giúp tôi.
他帮我买了一张票。|Anh ấy mua giúp tôi một tấm vé.
谢谢你帮我！|Cảm ơn bạn đã giúp tôi!
#帮忙
请你帮个忙。|Nhờ bạn giúp một việc.
谢谢你的帮忙！|Cảm ơn sự giúp đỡ của bạn!
需要帮忙吗？|Có cần giúp không?
我来帮忙吧。|Để tôi giúp cho.
他常常来帮忙。|Anh ấy thường đến giúp.
#包
这是我的包。|Đây là túi của tôi.
你的包在桌子上。|Túi của bạn ở trên bàn.
我买了一个新包。|Tôi mua một cái túi mới.
包里有什么？|Trong túi có gì?
这个包很好看，也不贵。|Cái túi này rất đẹp, cũng không đắt.
#包子
我早上吃了两个包子。|Buổi sáng tôi ăn hai cái bánh bao.
这儿的包子很好吃。|Bánh bao ở đây rất ngon.
你想吃包子吗？|Bạn muốn ăn bánh bao không?
一个包子多少钱？|Một cái bánh bao bao nhiêu tiền?
妈妈会做包子。|Mẹ biết làm bánh bao.
#杯
请给我一杯水。|Cho tôi một cốc nước.
我每天喝两杯咖啡。|Mỗi ngày tôi uống hai cốc cà phê.
你要几杯茶？|Bạn muốn mấy cốc trà?
他喝了一杯牛奶。|Anh ấy uống một cốc sữa.
这杯茶是你的。|Cốc trà này là của bạn.
#杯子
这个杯子是我的。|Cái cốc này là của tôi.
杯子里有水。|Trong cốc có nước.
我的杯子在哪儿？|Cốc của tôi ở đâu?
桌子上有三个杯子。|Trên bàn có ba cái cốc.
这个杯子很漂亮。|Cái cốc này rất đẹp.
#北
北京在中国的北边。|Bắc Kinh ở phía bắc Trung Quốc.
学校往北走五分钟就到。|Đi về phía bắc năm phút là đến trường.
我家在学校北边。|Nhà tôi ở phía bắc trường học.
你往北走。|Bạn đi về phía bắc.
北面有一个商店。|Phía bắc có một cửa hàng.
#北边
医院在学校北边。|Bệnh viện ở phía bắc trường học.
北边很冷。|Phía bắc rất lạnh.
北边有一个大商场。|Phía bắc có một trung tâm thương mại lớn.
我家在火车站北边。|Nhà tôi ở phía bắc ga tàu.
你去北边还是南边？|Bạn đi phía bắc hay phía nam?
#北京
我在北京学习汉语。|Tôi học tiếng Trung ở Bắc Kinh.
北京很大。|Bắc Kinh rất lớn.
你去过北京吗？|Bạn đã từng đến Bắc Kinh chưa?
我的朋友住在北京。|Bạn tôi sống ở Bắc Kinh.
北京的冬天很冷。|Mùa đông Bắc Kinh rất lạnh.
#本
我有一本汉语书。|Tôi có một quyển sách tiếng Trung.
这本书是谁的？|Quyển sách này là của ai?
我想买两本书。|Tôi muốn mua hai quyển sách.
那本书很好看。|Quyển sách kia rất hay.
你看了几本书？|Bạn đã đọc mấy quyển sách?
#本子
我的本子在书包里。|Vở của tôi ở trong cặp sách.
请在本子上写你的名字。|Hãy viết tên bạn lên vở.
我买了三个本子。|Tôi mua ba quyển vở.
这是谁的本子？|Đây là vở của ai?
我把汉字写在本子上。|Tôi viết chữ Hán vào vở.
#比
今天比昨天冷。|Hôm nay lạnh hơn hôm qua.
他比我高。|Anh ấy cao hơn tôi.
哥哥比我大三岁。|Anh trai lớn hơn tôi ba tuổi.
这个比那个贵。|Cái này đắt hơn cái kia.
坐飞机比坐火车快。|Đi máy bay nhanh hơn đi tàu hỏa.
#别
别说话！|Đừng nói chuyện!
你别走。|Bạn đừng đi.
别忘了带书。|Đừng quên mang sách.
别看电视了，睡觉吧。|Đừng xem ti vi nữa, đi ngủ đi.
你别生气。|Bạn đừng giận.
#别的
你还要别的吗？|Bạn còn cần gì khác không?
我不想吃别的。|Tôi không muốn ăn món khác.
有别的颜色吗？|Có màu khác không?
别的同学都回家了。|Các bạn khác đều về nhà rồi.
我们说别的吧。|Chúng ta nói chuyện khác đi.
#别人
这是别人的书。|Đây là sách của người khác.
别人都走了。|Người khác đều đi rồi.
他常常帮别人。|Anh ấy thường giúp người khác.
别听别人的话。|Đừng nghe lời người khác.
我不想告诉别人。|Tôi không muốn nói cho người khác biết.
#病
我病了。|Tôi bị ốm rồi.
他的病好了。|Bệnh của anh ấy khỏi rồi.
你病了几天？|Bạn ốm mấy ngày rồi?
妈妈病了，我在家。|Mẹ bị ốm, tôi ở nhà.
医生说我的病不大。|Bác sĩ nói bệnh của tôi không nặng.
#病人
医院里有很多病人。|Trong bệnh viện có nhiều bệnh nhân.
医生在看病人。|Bác sĩ đang khám cho bệnh nhân.
病人要多休息。|Người bệnh cần nghỉ ngơi nhiều.
这个病人是我爸爸。|Bệnh nhân này là bố tôi.
病人今天好多了。|Hôm nay người bệnh đỡ nhiều rồi.
#不
我不是老师。|Tôi không phải giáo viên.
我不喝咖啡。|Tôi không uống cà phê.
今天不冷。|Hôm nay không lạnh.
他明天不来。|Ngày mai anh ấy không đến.
你去不去？|Bạn có đi không?
#不大
这个房间不大。|Căn phòng này không lớn.
我不大喜欢吃肉。|Tôi không thích ăn thịt lắm.
他不大说话。|Anh ấy không hay nói chuyện.
今天风不大。|Hôm nay gió không to.
我不大明白你的意思。|Tôi không hiểu ý bạn lắm.
#不对
你说得不对。|Bạn nói không đúng.
这个字写得不对。|Chữ này viết không đúng.
不对，他不是老师。|Không đúng, anh ấy không phải giáo viên.
我哪儿不对？|Tôi sai ở đâu?
这个题的答案不对。|Đáp án câu này không đúng.
#不客气
A：谢谢你！B：不客气。|A: Cảm ơn bạn! B: Không có gì.
不客气，这是我应该做的。|Không có gì, đây là việc tôi nên làm.
不客气，下次再来！|Không có gì, lần sau lại đến nhé!
你太客气了，不客气。|Bạn khách sáo quá, không có gì đâu.
老师说：“不客气。”|Thầy giáo nói: “Không có gì.”
#不用
不用谢。|Không cần cảm ơn.
你不用来了。|Bạn không cần đến nữa.
明天不用上学。|Ngày mai không cần đi học.
不用买，我家有。|Không cần mua, nhà tôi có.
你不用等我。|Bạn không cần đợi tôi.
#菜
我喜欢吃中国菜。|Tôi thích ăn món Trung Quốc.
妈妈做的菜很好吃。|Món mẹ nấu rất ngon.
你想吃什么菜？|Bạn muốn ăn món gì?
这个菜太贵了。|Món này đắt quá.
我们点了四个菜。|Chúng tôi gọi bốn món.
#茶
我喜欢喝茶。|Tôi thích uống trà.
请喝茶。|Mời uống trà.
这是中国茶。|Đây là trà Trung Quốc.
你要茶还是咖啡？|Bạn muốn trà hay cà phê?
爸爸每天早上喝茶。|Sáng nào bố cũng uống trà.
#差
我的汉语很差。|Tiếng Trung của tôi rất kém.
现在差五分八点。|Bây giờ là tám giờ kém năm phút.
还差十块钱。|Còn thiếu mười tệ.
今天天气很差。|Hôm nay thời tiết rất xấu.
他的成绩不差。|Thành tích của cậu ấy không tệ.
#常
我常去那个商店。|Tôi hay đến cửa hàng đó.
他不常回家。|Anh ấy không hay về nhà.
我们常在一起学习。|Chúng tôi hay học cùng nhau.
你常来这儿吗？|Bạn có hay đến đây không?
北京冬天常下雪。|Mùa đông Bắc Kinh hay có tuyết.
#常常
我常常给妈妈打电话。|Tôi thường gọi điện cho mẹ.
他常常迟到。|Anh ấy thường đến muộn.
我们常常一起吃饭。|Chúng tôi thường ăn cơm cùng nhau.
这儿常常下雨。|Ở đây thường mưa.
你常常运动吗？|Bạn có thường tập thể thao không?
#唱
她唱得很好。|Cô ấy hát rất hay.
你会唱这个歌吗？|Bạn biết hát bài này không?
我们一起唱吧！|Chúng ta cùng hát nhé!
他唱了一个中国歌。|Anh ấy hát một bài hát Trung Quốc.
请你再唱一次。|Mời bạn hát lại một lần nữa.
#唱歌
我喜欢唱歌。|Tôi thích hát.
她唱歌唱得很好听。|Cô ấy hát rất hay.
晚上我们去唱歌吧。|Tối nay chúng ta đi hát nhé.
你会唱歌吗？|Bạn biết hát không?
他一边唱歌一边跳舞。|Anh ấy vừa hát vừa nhảy.
#车
我坐车去学校。|Tôi đi xe đến trường.
这是我哥哥的车。|Đây là xe của anh trai tôi.
路上车很多。|Trên đường có rất nhiều xe.
车来了，快上车！|Xe đến rồi, mau lên xe!
你的车是什么颜色的？|Xe của bạn màu gì?
#车票
我买了两张车票。|Tôi mua hai vé xe.
车票多少钱？|Vé xe bao nhiêu tiền?
请给我看一下你的车票。|Cho tôi xem vé xe của bạn.
我的车票在包里。|Vé xe của tôi ở trong túi.
明天的车票还有吗？|Còn vé xe ngày mai không?
#车上
车上人很多。|Trên xe rất đông người.
我在车上看书。|Tôi đọc sách trên xe.
车上没有坐的地方。|Trên xe không còn chỗ ngồi.
我的包在车上。|Túi của tôi ở trên xe.
车上很热。|Trên xe rất nóng.
#车站
车站在哪儿？|Bến xe ở đâu?
我在车站等你。|Tôi đợi bạn ở bến xe.
学校旁边有一个车站。|Cạnh trường có một bến xe.
从这儿到车站很近。|Từ đây đến bến xe rất gần.
他去车站接朋友了。|Anh ấy ra bến xe đón bạn rồi.
#吃
你吃了吗？|Bạn ăn chưa?
我想吃米饭。|Tôi muốn ăn cơm.
他不吃肉。|Anh ấy không ăn thịt.
我们去吃中国菜吧。|Chúng ta đi ăn món Trung Quốc nhé.
你早上吃什么？|Buổi sáng bạn ăn gì?
#吃饭
我们去吃饭吧。|Chúng ta đi ăn cơm thôi.
你几点吃饭？|Mấy giờ bạn ăn cơm?
我在家吃饭。|Tôi ăn cơm ở nhà.
今天我请你吃饭。|Hôm nay tôi mời bạn ăn cơm.
吃饭的时候别看手机。|Lúc ăn cơm đừng xem điện thoại.
#出
他出门了。|Anh ấy ra ngoài rồi.
我们八点出家门。|Tám giờ chúng tôi ra khỏi nhà.
太阳出来了。|Mặt trời mọc rồi.
他从房间里走出来了。|Anh ấy từ trong phòng đi ra.
我说不出来。|Tôi không nói ra được.
#出来
你出来一下。|Bạn ra đây một chút.
他从学校出来了。|Anh ấy từ trường đi ra rồi.
太阳出来了。|Mặt trời ló ra rồi.
我在门口等你，你快出来吧。|Tôi đợi bạn ở cửa, bạn ra nhanh nhé.
你什么时候出来？|Khi nào bạn ra?
#出去
我出去一下。|Tôi ra ngoài một lát.
外边下雨，别出去了。|Bên ngoài mưa, đừng ra ngoài nữa.
他出去买东西了。|Anh ấy ra ngoài mua đồ rồi.
我们晚上出去吃饭吧。|Tối nay chúng ta ra ngoài ăn cơm nhé.
你出去的时候关上门。|Lúc ra ngoài bạn đóng cửa lại nhé.
#穿
今天很冷，多穿一点儿。|Hôm nay lạnh, mặc nhiều vào một chút.
她穿了一件红衣服。|Cô ấy mặc một chiếc áo đỏ.
我穿这件好看吗？|Tôi mặc cái này có đẹp không?
他穿得很漂亮。|Anh ấy mặc rất đẹp.
你穿多大的？|Bạn mặc cỡ bao nhiêu?
#床
我的床很大。|Giường của tôi rất to.
他还在床上睡觉。|Anh ấy vẫn đang ngủ trên giường.
房间里有一张床。|Trong phòng có một cái giường.
猫在床下边。|Con mèo ở dưới gầm giường.
我想买一张新床。|Tôi muốn mua một cái giường mới.
#次
我去过两次北京。|Tôi đã đến Bắc Kinh hai lần.
请再说一次。|Xin nói lại một lần nữa.
这是我第一次来中国。|Đây là lần đầu tiên tôi đến Trung Quốc.
我们一个星期上三次课。|Chúng tôi học ba buổi một tuần.
下次再见！|Lần sau gặp lại!
#从
我从越南来。|Tôi đến từ Việt Nam.
从这儿到学校很近。|Từ đây đến trường rất gần.
我从八点工作到五点。|Tôi làm việc từ tám giờ đến năm giờ.
他从北京回来了。|Anh ấy từ Bắc Kinh về rồi.
从明天开始，我每天跑步。|Từ ngày mai, ngày nào tôi cũng chạy bộ.
#错
你说错了。|Bạn nói sai rồi.
这个字我写错了。|Chữ này tôi viết sai rồi.
对不起，是我的错。|Xin lỗi, là lỗi của tôi.
他坐错车了。|Anh ấy đi nhầm xe rồi.
这个菜不错！|Món này không tệ!
#打
我们去打球吧。|Chúng ta đi chơi bóng nhé.
我给你打电话。|Tôi gọi điện cho bạn.
他不会打字。|Anh ấy không biết đánh máy.
别打他！|Đừng đánh nó!
我打车去机场。|Tôi bắt taxi ra sân bay.
#打车
我们打车去吧。|Chúng ta bắt taxi đi nhé.
下雨了，我打车回家。|Trời mưa rồi, tôi bắt taxi về nhà.
从这儿打车去机场要多少钱？|Từ đây bắt taxi ra sân bay hết bao nhiêu tiền?
这儿不好打车。|Ở đây khó bắt taxi.
你打车来的吗？|Bạn đi taxi đến à?
#打电话
晚上我给妈妈打电话。|Buổi tối tôi gọi điện cho mẹ.
他在打电话。|Anh ấy đang gọi điện thoại.
有事给我打电话。|Có việc gì thì gọi điện cho tôi.
你给谁打电话？|Bạn gọi điện cho ai?
我打了三次电话，他都没在。|Tôi gọi ba lần, anh ấy đều không có ở đó.
#打开
请打开书。|Hãy mở sách ra.
你打开门吧。|Bạn mở cửa đi.
我打开电视看新闻。|Tôi bật ti vi xem tin tức.
这个包打不开。|Cái túi này không mở được.
请打开电脑。|Hãy bật máy tính lên.
#打球
我喜欢打球。|Tôi thích chơi bóng.
下午我们去打球吧。|Chiều nay chúng ta đi chơi bóng nhé.
他每天打一个小时球。|Mỗi ngày anh ấy chơi bóng một tiếng.
你会打球吗？|Bạn biết chơi bóng không?
下雨了，不能打球了。|Mưa rồi, không chơi bóng được nữa.
#大
这个房间很大。|Căn phòng này rất to.
你今年多大？|Năm nay bạn bao nhiêu tuổi?
今天风很大。|Hôm nay gió rất to.
北京是一个大城市。|Bắc Kinh là một thành phố lớn.
我哥哥比我大两岁。|Anh trai tôi lớn hơn tôi hai tuổi.
#大学
我在大学学习汉语。|Tôi học tiếng Trung ở trường đại học.
他是北京大学的学生。|Anh ấy là sinh viên Đại học Bắc Kinh.
你在哪个大学？|Bạn học trường đại học nào?
我们大学很大。|Trường đại học của chúng tôi rất lớn.
明年我上大学。|Năm sau tôi vào đại học.
#大学生
我是大学生。|Tôi là sinh viên đại học.
他是一个大学生。|Anh ấy là một sinh viên đại học.
大学生们都很忙。|Các sinh viên đều rất bận.
我姐姐是大学生，我是中学生。|Chị tôi là sinh viên, tôi là học sinh trung học.
这个大学生会说汉语。|Sinh viên này biết nói tiếng Trung.
#到
我到家了。|Tôi về đến nhà rồi.
你几点到学校？|Mấy giờ bạn đến trường?
从八点到十点上课。|Học từ tám giờ đến mười giờ.
火车到北京了。|Tàu hỏa đến Bắc Kinh rồi.
我们到了，下车吧。|Chúng ta đến rồi, xuống xe thôi.
#地
他高兴地说：“谢谢！”|Anh ấy vui vẻ nói: “Cảm ơn!”
孩子们快快地跑过来了。|Bọn trẻ chạy nhanh lại đây.
请慢慢地说。|Xin hãy nói chậm thôi.
她认真地写汉字。|Cô ấy chăm chú viết chữ Hán.
我们好好地休息一下吧。|Chúng ta nghỉ ngơi cho thật tốt nhé.
#地点
见面的地点在哪儿？|Địa điểm gặp mặt ở đâu?
请写上时间和地点。|Hãy ghi thời gian và địa điểm.
考试地点在三楼。|Địa điểm thi ở tầng ba.
这个地点很好。|Địa điểm này rất tốt.
你知道地点吗？|Bạn biết địa điểm không?
#地方
这是什么地方？|Đây là nơi nào?
这个地方很漂亮。|Nơi này rất đẹp.
你住在什么地方？|Bạn sống ở chỗ nào?
车上没有坐的地方。|Trên xe không còn chỗ ngồi.
我想去一个人少的地方。|Tôi muốn đến một nơi ít người.
#地上
地上有一本书。|Dưới đất có một quyển sách.
别坐在地上。|Đừng ngồi dưới đất.
地上很干净。|Sàn nhà rất sạch.
你的笔在地上。|Bút của bạn ở dưới đất.
猫在地上睡觉。|Con mèo đang ngủ dưới sàn.
#地图
我有一张北京地图。|Tôi có một tấm bản đồ Bắc Kinh.
你看看地图吧。|Bạn xem bản đồ đi.
地图上有我们学校。|Trên bản đồ có trường chúng tôi.
我在手机上看地图。|Tôi xem bản đồ trên điện thoại.
请给我一张地图。|Làm ơn cho tôi một tấm bản đồ.
#的
这是我的书。|Đây là sách của tôi.
他是我的老师。|Anh ấy là thầy giáo của tôi.
我喜欢红的。|Tôi thích cái màu đỏ.
这是妈妈做的菜。|Đây là món mẹ nấu.
那个穿白衣服的人是谁？|Người mặc áo trắng kia là ai?
#得到
我得到了一个好工作。|Tôi có được một công việc tốt.
他得到了老师的帮助。|Cậu ấy nhận được sự giúp đỡ của thầy.
你得到他的电话了吗？|Bạn có được số điện thoại của anh ấy chưa?
我想得到这本书。|Tôi muốn có được quyển sách này.
努力学习就能得到好成绩。|Chăm chỉ học thì sẽ có thành tích tốt.
#等
请等一下。|Xin đợi một chút.
我在门口等你。|Tôi đợi bạn ở cửa.
你等了多长时间？|Bạn đợi bao lâu rồi?
别等我了，你们先吃吧。|Đừng đợi tôi nữa, các bạn ăn trước đi.
我们等车等了半天。|Chúng tôi đợi xe mãi.
#弟
我弟今年十岁。|Em trai tôi năm nay mười tuổi.
这是我弟。|Đây là em trai tôi.
我弟很喜欢打球。|Em trai tôi rất thích chơi bóng.
我弟在上小学。|Em trai tôi đang học tiểu học.
我和我弟都是学生。|Tôi và em trai đều là học sinh.
#弟弟
我有一个弟弟。|Tôi có một em trai.
弟弟比我小三岁。|Em trai nhỏ hơn tôi ba tuổi.
我弟弟喜欢看电视。|Em trai tôi thích xem ti vi.
你有弟弟吗？|Bạn có em trai không?
弟弟在房间里写作业。|Em trai đang làm bài tập trong phòng.
#第
这是我第一次来。|Đây là lần đầu tiên tôi đến.
他是第一个到的。|Anh ấy là người đến đầu tiên.
请看第十页。|Hãy xem trang thứ mười.
我住在第三楼。|Tôi sống ở tầng thứ ba.
今天是第几课？|Hôm nay là bài thứ mấy?
#第二
第二天，他回家了。|Ngày hôm sau, anh ấy về nhà.
我是第二个到的。|Tôi là người đến thứ hai.
这是第二次了。|Đây là lần thứ hai rồi.
请看第二页。|Hãy xem trang hai.
第二个问题很难。|Câu hỏi thứ hai rất khó.
#点
现在几点？|Bây giờ mấy giờ?
我七点起床。|Tôi dậy lúc bảy giờ.
请喝点儿水。|Mời uống chút nước.
我们点菜吧。|Chúng ta gọi món đi.
你快一点儿！|Bạn nhanh lên một chút!
#电
没电了。|Hết điện rồi.
我的手机没电了。|Điện thoại tôi hết pin rồi.
今天家里没有电。|Hôm nay nhà mất điện.
电来了！|Có điện rồi!
这个要用电吗？|Cái này có cần dùng điện không?
#电话
你的电话是多少？|Số điện thoại của bạn là bao nhiêu?
有你的电话。|Có điện thoại của bạn.
我在打电话。|Tôi đang gọi điện thoại.
他没接电话。|Anh ấy không nghe máy.
请告诉我你的电话。|Hãy cho tôi biết số điện thoại của bạn.
#电脑
我的电脑是新的。|Máy tính của tôi là máy mới.
他在用电脑工作。|Anh ấy đang làm việc bằng máy tính.
电脑在桌子上。|Máy tính ở trên bàn.
我想买一个电脑。|Tôi muốn mua một chiếc máy tính.
你会用电脑吗？|Bạn biết dùng máy tính không?
#电视
我喜欢看电视。|Tôi thích xem ti vi.
电视上有什么？|Trên ti vi có gì?
晚上我们一起看电视。|Buổi tối chúng tôi cùng xem ti vi.
别看电视了，去写作业。|Đừng xem ti vi nữa, đi làm bài tập.
今天的电视很好看。|Chương trình ti vi hôm nay rất hay.
#电视机
我家有两台电视机。|Nhà tôi có hai chiếc ti vi.
这台电视机很大。|Chiếc ti vi này rất to.
电视机在房间里。|Ti vi ở trong phòng.
我们买了一台新电视机。|Chúng tôi mua một chiếc ti vi mới.
电视机坏了。|Ti vi hỏng rồi.
#电影
我们去看电影吧。|Chúng ta đi xem phim nhé.
这个电影很好看。|Bộ phim này rất hay.
你喜欢什么电影？|Bạn thích phim gì?
电影几点开始？|Phim mấy giờ bắt đầu?
我看了一个中国电影。|Tôi đã xem một bộ phim Trung Quốc.
#电影院
电影院在商场里边。|Rạp chiếu phim ở trong trung tâm thương mại.
我们在电影院门口见。|Chúng ta gặp nhau ở cửa rạp chiếu phim.
这个电影院很大。|Rạp chiếu phim này rất lớn.
电影院里人很多。|Trong rạp chiếu phim rất đông người.
你家附近有电影院吗？|Gần nhà bạn có rạp chiếu phim không?
#东
太阳从东边出来。|Mặt trời mọc ở phía đông.
你往东走。|Bạn đi về phía đông.
学校在路东。|Trường ở phía đông con đường.
东门在哪儿？|Cổng đông ở đâu?
商店在医院的东面。|Cửa hàng ở phía đông bệnh viện.
#东边
我家在学校东边。|Nhà tôi ở phía đông trường học.
东边有一个公园。|Phía đông có một công viên.
银行在东边还是西边？|Ngân hàng ở phía đông hay phía tây?
火车站东边有很多饭店。|Phía đông ga tàu có nhiều nhà hàng.
你往东边走一点儿。|Bạn đi về phía đông một chút.
#东西
我去商店买东西。|Tôi đi cửa hàng mua đồ.
这是什么东西？|Đây là đồ gì?
你的东西在这儿。|Đồ của bạn ở đây.
我想吃点儿东西。|Tôi muốn ăn chút gì đó.
他的东西很多。|Đồ đạc của anh ấy rất nhiều.
#动
别动！|Đừng động đậy!
我累得不想动。|Tôi mệt đến mức không muốn động đậy.
车动了。|Xe chuyển bánh rồi.
你动一下手。|Bạn cử động tay một chút.
这个东西你别动。|Đồ này bạn đừng động vào.
#动作
这个动作很难。|Động tác này rất khó.
请看老师的动作。|Hãy xem động tác của thầy.
他的动作很快。|Động tác của anh ấy rất nhanh.
我们一起做这个动作。|Chúng ta cùng làm động tác này.
这个动作对不对？|Động tác này đúng không?
#都
我们都是学生。|Chúng tôi đều là học sinh.
他们都喜欢喝茶。|Họ đều thích uống trà.
我爸爸妈妈都是医生。|Bố mẹ tôi đều là bác sĩ.
大家都来了。|Mọi người đều đến rồi.
这些书你都看过吗？|Những quyển sách này bạn đều đã đọc chưa?
#读
请读一下课文。|Hãy đọc bài khóa một chút.
这个字怎么读？|Chữ này đọc thế nào?
我每天读书。|Ngày nào tôi cũng đọc sách.
他读得很好。|Anh ấy đọc rất hay.
你读了几遍？|Bạn đọc mấy lần rồi?
#读书
我喜欢读书。|Tôi thích đọc sách.
他在北京读书。|Anh ấy đi học ở Bắc Kinh.
晚上我在家读书。|Buổi tối tôi ở nhà đọc sách.
读书很有意思。|Đọc sách rất thú vị.
我弟弟在读书，不能出去玩儿。|Em trai tôi đang học, không đi chơi được.
#对
你说得对。|Bạn nói đúng.
对，我是中国人。|Đúng, tôi là người Trung Quốc.
这个答案对不对？|Đáp án này đúng không?
老师对我们很好。|Thầy đối với chúng tôi rất tốt.
运动对身体很好。|Thể thao rất tốt cho sức khỏe.
#对不起
对不起，我来晚了。|Xin lỗi, tôi đến muộn.
对不起，我不知道。|Xin lỗi, tôi không biết.
A：对不起！B：没关系。|A: Xin lỗi! B: Không sao.
对不起，你能再说一次吗？|Xin lỗi, bạn có thể nói lại lần nữa không?
对不起，这是我的错。|Xin lỗi, đây là lỗi của tôi.
#多
这儿人很多。|Ở đây rất đông người.
你要多喝水。|Bạn phải uống nhiều nước.
他比我大多了。|Anh ấy lớn hơn tôi nhiều.
你多大了？|Bạn bao nhiêu tuổi rồi?
我们班有三十多个学生。|Lớp chúng tôi có hơn ba mươi học sinh.
#多少
这个多少钱？|Cái này bao nhiêu tiền?
你们学校有多少学生？|Trường các bạn có bao nhiêu học sinh?
你的电话是多少？|Số điện thoại của bạn là bao nhiêu?
你认识多少个汉字？|Bạn biết bao nhiêu chữ Hán?
一共多少钱？|Tổng cộng bao nhiêu tiền?
#饿
我饿了。|Tôi đói rồi.
你饿不饿？|Bạn có đói không?
我不饿，我刚吃了饭。|Tôi không đói, tôi vừa ăn cơm.
孩子饿了，我们吃饭吧。|Bọn trẻ đói rồi, chúng ta ăn cơm thôi.
我很饿，想吃包子。|Tôi đói lắm, muốn ăn bánh bao.
#儿子
我有一个儿子。|Tôi có một con trai.
我儿子今年五岁。|Con trai tôi năm nay năm tuổi.
你儿子在哪儿上学？|Con trai bạn học ở đâu?
他儿子是医生。|Con trai ông ấy là bác sĩ.
儿子，快来吃饭！|Con trai, mau đến ăn cơm!
#二
二月是冬天。|Tháng hai là mùa đông.
我住在二楼。|Tôi sống ở tầng hai.
一加一是二。|Một cộng một bằng hai.
今天是十二号。|Hôm nay là ngày mười hai.
他是二班的学生。|Cậu ấy là học sinh lớp hai.
#饭
我做饭，你洗碗。|Tôi nấu cơm, bạn rửa bát.
你吃饭了吗？|Bạn ăn cơm chưa?
妈妈做的饭很好吃。|Cơm mẹ nấu rất ngon.
饭好了，来吃吧。|Cơm xong rồi, đến ăn đi.
我们在饭店吃饭。|Chúng tôi ăn cơm ở nhà hàng.
#饭店
这个饭店的菜很好吃。|Món ăn ở nhà hàng này rất ngon.
我们去饭店吃饭吧。|Chúng ta đi nhà hàng ăn cơm nhé.
饭店在学校旁边。|Nhà hàng ở cạnh trường.
这家饭店人很多。|Nhà hàng này rất đông khách.
我在饭店工作。|Tôi làm việc ở nhà hàng.
#房间
这是我的房间。|Đây là phòng của tôi.
我的房间不大。|Phòng của tôi không lớn.
房间里有一张床。|Trong phòng có một cái giường.
你的房间很干净。|Phòng của bạn rất sạch.
房间号是多少？|Số phòng là bao nhiêu?
#房子
我家的房子很大。|Nhà của tôi rất to.
他买了一个新房子。|Anh ấy mua một ngôi nhà mới.
这个房子有三个房间。|Ngôi nhà này có ba phòng.
北京的房子很贵。|Nhà ở Bắc Kinh rất đắt.
房子前边有一个小商店。|Phía trước ngôi nhà có một cửa hàng nhỏ.
#放
请把书放在桌子上。|Hãy đặt sách lên bàn.
我的包放在哪儿了？|Túi của tôi để ở đâu rồi?
你喝茶放糖吗？|Bạn uống trà có cho đường không?
别放在地上。|Đừng để dưới đất.
我们七月放假。|Tháng bảy chúng tôi được nghỉ.
#放假
明天放假。|Ngày mai được nghỉ.
放假的时候你去哪儿？|Lúc được nghỉ bạn đi đâu?
我们放三天假。|Chúng tôi được nghỉ ba ngày.
学校什么时候放假？|Khi nào trường cho nghỉ?
放假了，我想回家。|Được nghỉ rồi, tôi muốn về nhà.
#放学
我们下午四点放学。|Bốn giờ chiều chúng tôi tan học.
放学以后我去打球。|Tan học xong tôi đi chơi bóng.
放学了，快回家吧。|Tan học rồi, về nhà nhanh đi.
妈妈来学校接我放学。|Mẹ đến trường đón tôi tan học.
你几点放学？|Mấy giờ bạn tan học?
#飞
鸟在天上飞。|Chim bay trên trời.
飞机飞得很高。|Máy bay bay rất cao.
我明天飞北京。|Mai tôi bay đi Bắc Kinh.
从河内飞北京要几个小时？|Bay từ Hà Nội đến Bắc Kinh mất mấy tiếng?
它飞走了。|Nó bay đi mất rồi.
#飞机
我坐飞机去中国。|Tôi đi máy bay sang Trung Quốc.
飞机几点起飞？|Mấy giờ máy bay cất cánh?
坐飞机很快。|Đi máy bay rất nhanh.
我第一次坐飞机。|Lần đầu tiên tôi đi máy bay.
飞机上人不多。|Trên máy bay không đông người.
#非常
今天非常热。|Hôm nay cực kỳ nóng.
我非常喜欢这本书。|Tôi vô cùng thích quyển sách này.
他的汉语非常好。|Tiếng Trung của anh ấy rất giỏi.
非常感谢！|Vô cùng cảm ơn!
这个地方非常漂亮。|Nơi này vô cùng đẹp.
#分
现在八点十分。|Bây giờ là tám giờ mười phút.
我考了九十分。|Tôi thi được chín mươi điểm.
一块是十毛，一毛是十分。|Một tệ là mười hào, một hào là mười xu.
还有五分钟。|Còn năm phút nữa.
这次考试你得了多少分？|Kỳ thi này bạn được bao nhiêu điểm?
#风
今天风很大。|Hôm nay gió rất to.
外边刮风了。|Bên ngoài nổi gió rồi.
北京春天风很多。|Mùa xuân Bắc Kinh có nhiều gió.
风太大了，别出去了。|Gió to quá, đừng ra ngoài nữa.
没有风，很热。|Không có gió, rất nóng.
#干
你在干什么？|Bạn đang làm gì thế?
我们一起干吧。|Chúng ta cùng làm đi.
这个工作我干不了。|Công việc này tôi làm không nổi.
他干得很好。|Anh ấy làm rất tốt.
你明天干什么？|Ngày mai bạn làm gì?
#干净
这个房间很干净。|Căn phòng này rất sạch.
我的衣服洗干净了。|Quần áo của tôi giặt sạch rồi.
请把桌子打扫干净。|Hãy lau dọn bàn sạch sẽ.
这个杯子不干净。|Cái cốc này không sạch.
他家总是很干净。|Nhà anh ấy lúc nào cũng sạch sẽ.
#干什么
你在干什么？|Bạn đang làm gì đấy?
周末你干什么？|Cuối tuần bạn làm gì?
你来这儿干什么？|Bạn đến đây làm gì?
他明天干什么？|Ngày mai anh ấy làm gì?
你买这个干什么？|Bạn mua cái này làm gì?
#高
他很高。|Anh ấy rất cao.
我哥哥比我高。|Anh trai tôi cao hơn tôi.
你多高？|Bạn cao bao nhiêu?
这个楼很高。|Tòa nhà này rất cao.
飞机飞得很高。|Máy bay bay rất cao.
#高兴
我今天很高兴。|Hôm nay tôi rất vui.
认识你很高兴。|Rất vui được làm quen với bạn.
他高兴地笑了。|Anh ấy vui vẻ cười.
妈妈不高兴了。|Mẹ không vui rồi.
你为什么不高兴？|Tại sao bạn không vui?
#告诉
请告诉我你的名字。|Hãy cho tôi biết tên của bạn.
他告诉我明天不上课。|Anh ấy nói với tôi mai không học.
我不想告诉别人。|Tôi không muốn nói cho người khác.
谁告诉你的？|Ai nói cho bạn biết vậy?
你告诉老师了吗？|Bạn báo thầy chưa?
#哥
我哥是大学生。|Anh trai tôi là sinh viên.
哥，你等等我！|Anh ơi, đợi em với!
我哥会开车。|Anh tôi biết lái xe.
这是我哥的书。|Đây là sách của anh tôi.
我哥比我大五岁。|Anh tôi lớn hơn tôi năm tuổi.
#哥哥
我有两个哥哥。|Tôi có hai anh trai.
哥哥在北京工作。|Anh trai làm việc ở Bắc Kinh.
你哥哥多大了？|Anh trai bạn bao nhiêu tuổi rồi?
哥哥常常帮我学习。|Anh trai thường giúp tôi học bài.
我和哥哥都喜欢打球。|Tôi và anh trai đều thích chơi bóng.
#歌
这个歌很好听。|Bài hát này rất hay.
你会唱中国歌吗？|Bạn biết hát bài hát Trung Quốc không?
我喜欢听歌。|Tôi thích nghe nhạc.
她唱了一首歌。|Cô ấy hát một bài.
这是什么歌？|Đây là bài hát gì?
#个
我有一个哥哥。|Tôi có một anh trai.
这个人是谁？|Người này là ai?
我买了三个苹果。|Tôi mua ba quả táo.
那个地方很远。|Chỗ đó rất xa.
你要哪个？|Bạn muốn cái nào?
#给
请给我一杯水。|Cho tôi một cốc nước.
我给妈妈打电话。|Tôi gọi điện cho mẹ.
他给我买了一本书。|Anh ấy mua cho tôi một quyển sách.
这是给你的。|Cái này là cho bạn.
你给我看看。|Bạn cho tôi xem với.
#跟
我跟朋友去看电影。|Tôi đi xem phim với bạn.
你跟我来。|Bạn đi theo tôi.
我跟他一样高。|Tôi cao bằng anh ấy.
他跟我说了。|Anh ấy nói với tôi rồi.
你跟谁一起去？|Bạn đi cùng ai?
#工人
我爸爸是工人。|Bố tôi là công nhân.
这儿有很多工人。|Ở đây có nhiều công nhân.
工人们在工作。|Các công nhân đang làm việc.
他是一个好工人。|Anh ấy là một công nhân giỏi.
工人们下午五点下班。|Công nhân tan làm lúc năm giờ chiều.
#工作
你做什么工作？|Bạn làm công việc gì?
我在医院工作。|Tôi làm việc ở bệnh viện.
他的工作很忙。|Công việc của anh ấy rất bận.
我找到工作了。|Tôi tìm được việc rồi.
今天的工作做完了。|Công việc hôm nay làm xong rồi.
#关
请关门。|Làm ơn đóng cửa.
你关电视了吗？|Bạn tắt ti vi chưa?
商店九点关门。|Cửa hàng chín giờ đóng cửa.
别关灯。|Đừng tắt đèn.
我忘了关手机。|Tôi quên tắt điện thoại.
#关上
请关上门。|Làm ơn đóng cửa lại.
你出去的时候关上电视。|Lúc ra ngoài bạn tắt ti vi đi.
我关上了电脑。|Tôi đã tắt máy tính.
风很大，关上门吧。|Gió to quá, đóng cửa lại đi.
请关上书，听我说。|Hãy gấp sách lại, nghe tôi nói.
#贵
这个太贵了！|Cái này đắt quá!
北京的东西很贵。|Đồ ở Bắc Kinh rất đắt.
这件衣服不贵。|Bộ quần áo này không đắt.
飞机票比火车票贵。|Vé máy bay đắt hơn vé tàu.
您贵姓？|Ông/bà họ gì ạ?
#国
你是哪国人？|Bạn là người nước nào?
我回国了。|Tôi về nước rồi.
中国很大。|Trung Quốc rất rộng lớn.
他去过很多国家。|Anh ấy đã đến nhiều nước.
我们是一个国的人。|Chúng tôi là người cùng một nước.
#国家
中国是一个大国家。|Trung Quốc là một quốc gia lớn.
你去过几个国家？|Bạn đã đến mấy nước rồi?
我想去很多国家旅游。|Tôi muốn đi du lịch nhiều nước.
我们的国家很漂亮。|Đất nước chúng tôi rất đẹp.
你是哪个国家的人？|Bạn là người nước nào?
#国外
他在国外工作。|Anh ấy làm việc ở nước ngoài.
我没去过国外。|Tôi chưa từng ra nước ngoài.
我姐姐在国外学习。|Chị tôi học ở nước ngoài.
国外的东西很贵吗？|Đồ ở nước ngoài có đắt không?
明年我想去国外。|Năm sau tôi muốn ra nước ngoài.
#过
我去过北京。|Tôi đã từng đến Bắc Kinh.
你吃过包子吗？|Bạn đã từng ăn bánh bao chưa?
我没看过这个电影。|Tôi chưa từng xem bộ phim này.
他学过汉语。|Anh ấy đã từng học tiếng Trung.
我们见过面。|Chúng ta đã từng gặp nhau.
#还
他还在睡觉。|Anh ấy vẫn đang ngủ.
我还没吃饭。|Tôi vẫn chưa ăn cơm.
你还要什么？|Bạn còn cần gì nữa?
我买了苹果，还买了西瓜。|Tôi mua táo, còn mua cả dưa hấu.
现在还早。|Bây giờ vẫn còn sớm.
#还是
你喝茶还是喝咖啡？|Bạn uống trà hay cà phê?
你今天去还是明天去？|Bạn đi hôm nay hay ngày mai?
我还是想回家。|Tôi vẫn muốn về nhà.
他是老师还是学生？|Anh ấy là giáo viên hay học sinh?
下雨了，我们还是别去了。|Mưa rồi, chúng ta tốt hơn là đừng đi.
#还有
我有一个哥哥，还有一个妹妹。|Tôi có một anh trai, còn có một em gái.
还有别的吗？|Còn gì khác không?
还有十分钟上课。|Còn mười phút nữa vào học.
桌子上有书，还有杯子。|Trên bàn có sách, còn có cốc.
还有谁没来？|Còn ai chưa đến?
#孩子
这个孩子很可爱。|Đứa trẻ này rất đáng yêu.
你有几个孩子？|Bạn có mấy đứa con?
孩子们在外边玩儿。|Bọn trẻ đang chơi bên ngoài.
我的孩子上小学了。|Con tôi vào tiểu học rồi.
孩子饿了。|Đứa bé đói rồi.
#汉语
我学习汉语。|Tôi học tiếng Trung.
你会说汉语吗？|Bạn biết nói tiếng Trung không?
他的汉语很好。|Tiếng Trung của anh ấy rất tốt.
汉语难不难？|Tiếng Trung có khó không?
我们的汉语老师是中国人。|Giáo viên tiếng Trung của chúng tôi là người Trung Quốc.
#汉字
这个汉字怎么写？|Chữ Hán này viết thế nào?
我认识三百个汉字。|Tôi biết ba trăm chữ Hán.
汉字很有意思。|Chữ Hán rất thú vị.
请在本子上写汉字。|Hãy viết chữ Hán vào vở.
你会写多少汉字？|Bạn biết viết bao nhiêu chữ Hán?
#好
你好！|Xin chào!
今天天气很好。|Hôm nay thời tiết rất đẹp.
你身体好吗？|Bạn có khỏe không?
好，我们走吧。|Được, chúng ta đi thôi.
他是我的好朋友。|Anh ấy là bạn tốt của tôi.
#好吃
这个菜很好吃。|Món này rất ngon.
妈妈做的包子最好吃。|Bánh bao mẹ làm ngon nhất.
这儿的面条儿不好吃。|Mì ở đây không ngon.
中国菜好吃吗？|Món Trung Quốc có ngon không?
苹果又大又好吃。|Táo vừa to vừa ngon.
#好看
这件衣服很好看。|Bộ quần áo này rất đẹp.
这个电影很好看。|Bộ phim này rất hay.
她长得很好看。|Cô ấy rất xinh.
这本书好看吗？|Quyển sách này có hay không?
你穿红的更好看。|Bạn mặc màu đỏ đẹp hơn.
#好听
这个歌很好听。|Bài hát này rất hay.
她的声音很好听。|Giọng của cô ấy rất dễ nghe.
你唱得真好听！|Bạn hát hay thật!
这个名字很好听。|Cái tên này rất hay.
中国歌好听吗？|Nhạc Trung Quốc có hay không?
#好玩儿
北京很好玩儿。|Bắc Kinh chơi rất vui.
这个游戏很好玩儿。|Trò chơi này rất vui.
昨天的晚会好玩儿吗？|Bữa tiệc tối qua có vui không?
跟朋友一起玩儿很好玩儿。|Đi chơi với bạn bè rất vui.
这个地方不好玩儿。|Chỗ này chơi không vui.
#号
今天几号？|Hôm nay ngày mấy?
今天十月二十六号。|Hôm nay ngày 26 tháng 10.
你的房间是几号？|Phòng của bạn số mấy?
我坐五号车。|Tôi đi xe số năm.
你的生日是几月几号？|Sinh nhật bạn ngày mấy tháng mấy?
#喝
你想喝什么？|Bạn muốn uống gì?
我喝水。|Tôi uống nước.
他每天喝牛奶。|Ngày nào anh ấy cũng uống sữa.
请喝茶。|Mời uống trà.
我不喝咖啡。|Tôi không uống cà phê.
#和
我和妈妈去商店。|Tôi và mẹ đi cửa hàng.
我喜欢猫和狗。|Tôi thích mèo và chó.
他和我是同学。|Anh ấy và tôi là bạn học.
桌子上有书和杯子。|Trên bàn có sách và cốc.
你和谁一起去？|Bạn đi cùng ai?
#很
我很好。|Tôi khỏe.
今天很冷。|Hôm nay rất lạnh.
他很高。|Anh ấy rất cao.
这个菜很好吃。|Món này rất ngon.
我很喜欢你。|Tôi rất thích bạn.
#后
三天后我回来。|Ba ngày sau tôi về.
吃饭后我们去公园。|Ăn cơm xong chúng ta đi công viên.
我坐在他后面。|Tôi ngồi phía sau anh ấy.
你先走，我后走。|Bạn đi trước, tôi đi sau.
以后我想去中国。|Sau này tôi muốn đến Trung Quốc.
#后边
我家后边有一个公园。|Phía sau nhà tôi có một công viên.
请坐后边。|Mời ngồi phía sau.
他在我后边。|Anh ấy ở phía sau tôi.
商店后边是学校。|Phía sau cửa hàng là trường học.
后边的人请快一点儿。|Người phía sau làm ơn nhanh lên một chút.
#后天
后天是星期六。|Ngày kia là thứ bảy.
我后天去北京。|Ngày kia tôi đi Bắc Kinh.
后天你有时间吗？|Ngày kia bạn có thời gian không?
我们后天见。|Ngày kia gặp nhau nhé.
后天考试，我很忙。|Ngày kia thi, tôi rất bận.
#花
这些花很漂亮。|Những bông hoa này rất đẹp.
我给妈妈买了花。|Tôi mua hoa tặng mẹ.
我花了一百块钱。|Tôi tiêu hết một trăm tệ.
学汉语要花很多时间。|Học tiếng Trung phải tốn nhiều thời gian.
你喜欢什么花？|Bạn thích hoa gì?
#话
他的话很对。|Lời anh ấy nói rất đúng.
我听不懂他的话。|Tôi nghe không hiểu anh ấy nói gì.
你有话就说吧。|Có gì muốn nói thì bạn cứ nói đi.
妈妈的话我记住了。|Lời mẹ dặn tôi nhớ rồi.
他不爱说话。|Anh ấy không thích nói chuyện.
#坏
我的手机坏了。|Điện thoại của tôi hỏng rồi.
他不是坏人。|Anh ấy không phải người xấu.
今天天气很坏。|Hôm nay thời tiết rất xấu.
这个苹果坏了。|Quả táo này hỏng rồi.
电视机坏了，不能看了。|Ti vi hỏng rồi, không xem được nữa.
#回
我回家了。|Tôi về nhà rồi.
你什么时候回来？|Khi nào bạn về?
他回国了。|Anh ấy về nước rồi.
我们回学校吧。|Chúng ta về trường thôi.
我晚上十点回宿舍。|Mười giờ tối tôi về ký túc xá.
#回答
请回答我的问题。|Hãy trả lời câu hỏi của tôi.
他回答得很好。|Cậu ấy trả lời rất tốt.
这个问题我不会回答。|Câu hỏi này tôi không biết trả lời.
你回答对了。|Bạn trả lời đúng rồi.
谁能回答？|Ai có thể trả lời?
#回到
我晚上七点回到家。|Bảy giờ tối tôi về đến nhà.
他回到了北京。|Anh ấy đã trở về Bắc Kinh.
回到学校以后，我给你打电话。|Về đến trường tôi sẽ gọi cho bạn.
我们回到房间休息吧。|Chúng ta về phòng nghỉ ngơi đi.
你什么时候回到中国？|Khi nào bạn quay về Trung Quốc?
#回家
我要回家了。|Tôi phải về nhà rồi.
你几点回家？|Mấy giờ bạn về nhà?
放学以后我马上回家。|Tan học xong tôi về nhà ngay.
他今天不回家吃饭。|Hôm nay anh ấy không về nhà ăn cơm.
我们一起回家吧。|Chúng ta cùng về nhà nhé.
#回来
爸爸回来了！|Bố về rồi!
你几点回来？|Mấy giờ bạn về?
我明天回来。|Ngày mai tôi về.
他还没回来。|Anh ấy vẫn chưa về.
你快回来吧。|Bạn mau về đi.
#回去
我们回去吧。|Chúng ta về thôi.
太晚了，你回去吧。|Muộn quá rồi, bạn về đi.
他明天回去。|Ngày mai anh ấy về.
你什么时候回去？|Khi nào bạn về?
我不想回去。|Tôi không muốn về.
#会
我会说汉语。|Tôi biết nói tiếng Trung.
他不会开车。|Anh ấy không biết lái xe.
你会游泳吗？|Bạn biết bơi không?
明天会下雨。|Ngày mai sẽ mưa.
他会来的。|Anh ấy sẽ đến.
#火车
我坐火车去北京。|Tôi đi tàu hỏa đến Bắc Kinh.
火车几点开？|Tàu hỏa mấy giờ chạy?
火车上人很多。|Trên tàu hỏa rất đông người.
坐火车要十个小时。|Đi tàu hỏa mất mười tiếng.
火车来了。|Tàu hỏa đến rồi.
#机场
我去机场接朋友。|Tôi ra sân bay đón bạn.
机场离这儿很远。|Sân bay cách đây rất xa.
我们几点到机场？|Mấy giờ chúng ta đến sân bay?
怎么去机场？|Đi ra sân bay bằng cách nào?
他在机场等我。|Anh ấy đợi tôi ở sân bay.
#机票
我买了两张机票。|Tôi mua hai vé máy bay.
机票多少钱？|Vé máy bay bao nhiêu tiền?
我在网上买机票。|Tôi mua vé máy bay trên mạng.
明天的机票很贵。|Vé máy bay ngày mai rất đắt.
你的机票在哪儿？|Vé máy bay của bạn ở đâu?
#鸡蛋
我早上吃一个鸡蛋。|Buổi sáng tôi ăn một quả trứng gà.
鸡蛋多少钱一斤？|Trứng gà bao nhiêu tiền một cân?
妈妈买了十个鸡蛋。|Mẹ mua mười quả trứng gà.
你喜欢吃鸡蛋吗？|Bạn thích ăn trứng gà không?
我会做鸡蛋面。|Tôi biết nấu mì trứng.
#几
你家有几口人？|Nhà bạn có mấy người?
现在几点？|Bây giờ mấy giờ?
你几岁了？|Con mấy tuổi rồi?
今天星期几？|Hôm nay thứ mấy?
我买了几个苹果。|Tôi mua mấy quả táo.
#记
我记了老师的电话。|Tôi đã ghi lại số điện thoại của thầy.
请把这个记在本子上。|Hãy ghi cái này vào vở.
我记不清楚了。|Tôi không nhớ rõ nữa.
你记一下我的名字。|Bạn ghi lại tên tôi nhé.
他记得很快。|Anh ấy nhớ rất nhanh.
#记得
你还记得我吗？|Bạn còn nhớ tôi không?
我记得他的名字。|Tôi nhớ tên anh ấy.
我不记得了。|Tôi không nhớ nữa.
记得给我打电话。|Nhớ gọi điện cho tôi nhé.
你记得那天的事吗？|Bạn có nhớ chuyện hôm đó không?
#记住
请记住这些汉字。|Hãy nhớ kỹ những chữ Hán này.
我记住了。|Tôi nhớ rồi.
你记住我的电话了吗？|Bạn nhớ số điện thoại của tôi chưa?
这个字很难记住。|Chữ này rất khó nhớ.
记住，明天八点上课。|Nhớ nhé, mai tám giờ vào học.
#家
我家在北京。|Nhà tôi ở Bắc Kinh.
你家有几口人？|Nhà bạn có mấy người?
欢迎来我家！|Chào mừng đến nhà tôi!
我在家看书。|Tôi ở nhà đọc sách.
这家饭店很好。|Nhà hàng này rất tốt.
#家里
家里只有我一个人。|Trong nhà chỉ có mình tôi.
你家里有几个人？|Nhà bạn có mấy người?
我家里有一只猫。|Nhà tôi có một con mèo.
今天家里很热。|Hôm nay trong nhà rất nóng.
他不在家里。|Anh ấy không ở nhà.
#家人
我很想我的家人。|Tôi rất nhớ người nhà.
这是我的家人。|Đây là gia đình tôi.
我和家人一起吃饭。|Tôi ăn cơm cùng gia đình.
你的家人都好吗？|Gia đình bạn đều khỏe chứ?
他的家人都在越南。|Người nhà anh ấy đều ở Việt Nam.
#间
我家有三间房间。|Nhà tôi có ba phòng.
这间房间很大。|Căn phòng này rất rộng.
那间教室是我们的。|Phòng học kia là của chúng tôi.
我想要一间大一点儿的房间。|Tôi muốn một căn phòng rộng hơn chút.
楼上有两间房间。|Trên lầu có hai phòng.
#见
明天见！|Mai gặp nhé!
我昨天见了王老师。|Hôm qua tôi gặp thầy Vương.
很高兴见到你。|Rất vui được gặp bạn.
我们在门口见。|Chúng ta gặp nhau ở cửa.
好久不见！|Lâu rồi không gặp!
#见面
我们在哪儿见面？|Chúng ta gặp nhau ở đâu?
我们明天见面吧。|Mai chúng ta gặp nhau nhé.
我们是第一次见面。|Chúng ta gặp nhau lần đầu.
我跟他很久没见面了。|Lâu lắm rồi tôi không gặp anh ấy.
见面的时候说“你好”。|Lúc gặp mặt thì nói “xin chào”.
#叫
你叫什么名字？|Bạn tên là gì?
我叫小明。|Tôi tên là Tiểu Minh.
妈妈叫我回家吃饭。|Mẹ gọi tôi về nhà ăn cơm.
这个用汉语叫什么？|Cái này tiếng Trung gọi là gì?
他叫我等一下。|Anh ấy bảo tôi đợi một chút.
#教
王老师教我们汉语。|Thầy Vương dạy chúng tôi tiếng Trung.
你能教我写汉字吗？|Bạn có thể dạy tôi viết chữ Hán không?
妈妈教我做饭。|Mẹ dạy tôi nấu cơm.
他在大学教书。|Anh ấy dạy học ở trường đại học.
谁教你唱这个歌？|Ai dạy bạn hát bài này?
#教学楼
我们在教学楼上课。|Chúng tôi học ở tòa giảng đường.
教学楼在图书馆旁边。|Tòa giảng đường ở cạnh thư viện.
这个教学楼有五层。|Tòa giảng đường này có năm tầng.
我们在教学楼门口见。|Chúng ta gặp nhau ở cửa tòa giảng đường.
新教学楼很漂亮。|Tòa giảng đường mới rất đẹp.
#介绍
我来介绍一下。|Để tôi giới thiệu một chút.
请介绍一下你自己。|Hãy giới thiệu về bản thân bạn.
他给我介绍了一个朋友。|Anh ấy giới thiệu cho tôi một người bạn.
你能介绍一下北京吗？|Bạn có thể giới thiệu về Bắc Kinh không?
这是我介绍的饭店。|Đây là nhà hàng tôi giới thiệu.
#姐
我姐在医院工作。|Chị tôi làm việc ở bệnh viện.
姐，你去哪儿？|Chị ơi, chị đi đâu thế?
我姐比我大两岁。|Chị tôi lớn hơn tôi hai tuổi.
这是我姐的衣服。|Đây là quần áo của chị tôi.
我姐会说汉语。|Chị tôi biết nói tiếng Trung.
#姐姐
我有一个姐姐。|Tôi có một chị gái.
姐姐是大学生。|Chị gái là sinh viên.
你姐姐叫什么名字？|Chị gái bạn tên là gì?
姐姐给我买了一本书。|Chị gái mua cho tôi một quyển sách.
我和姐姐常常一起看电影。|Tôi và chị gái thường cùng xem phim.
#今年
我今年二十岁。|Năm nay tôi hai mươi tuổi.
今年我开始学汉语。|Năm nay tôi bắt đầu học tiếng Trung.
今年冬天很冷。|Mùa đông năm nay rất lạnh.
你今年多大？|Năm nay bạn bao nhiêu tuổi?
今年我想去中国。|Năm nay tôi muốn đến Trung Quốc.
#今天
今天星期几？|Hôm nay thứ mấy?
今天很热。|Hôm nay rất nóng.
今天我很忙。|Hôm nay tôi rất bận.
今天你去学校吗？|Hôm nay bạn có đến trường không?
今天是我的生日。|Hôm nay là sinh nhật tôi.
#进
请进！|Mời vào!
他进教室了。|Anh ấy vào lớp rồi.
可以进来吗？|Tôi vào được không?
我们进去看看吧。|Chúng ta vào xem thử đi.
进门的时候请小心。|Lúc vào cửa xin cẩn thận.
#进来
请进来。|Mời vào.
你进来吧，外边很冷。|Bạn vào đi, ngoài trời lạnh lắm.
老师进来了。|Thầy giáo vào rồi.
他从门口走进来。|Anh ấy từ cửa đi vào.
别让猫进来。|Đừng để con mèo vào.
#进去
我们进去吧。|Chúng ta đi vào thôi.
你先进去，我马上来。|Bạn vào trước, tôi đến ngay.
里边人很多，进不去了。|Bên trong đông người quá, không vào được.
他进去十分钟了。|Anh ấy vào được mười phút rồi.
我能进去看看吗？|Tôi có thể vào xem thử không?
#九
我九岁。|Tôi chín tuổi.
现在九点。|Bây giờ là chín giờ.
九月一号开学。|Ngày 1 tháng 9 khai giảng.
我们班有九个女生。|Lớp chúng tôi có chín bạn nữ.
这个九块钱。|Cái này chín tệ.
#就
我马上就来。|Tôi đến ngay đây.
他七点就起床了。|Bảy giờ anh ấy đã dậy rồi.
学校就在前边。|Trường ở ngay phía trước.
你想去就去吧。|Bạn muốn đi thì cứ đi đi.
我就要这个。|Tôi lấy đúng cái này.
#觉得
你觉得怎么样？|Bạn thấy thế nào?
我觉得汉语不难。|Tôi thấy tiếng Trung không khó.
我觉得有点儿冷。|Tôi thấy hơi lạnh.
他觉得这个电影很好看。|Anh ấy thấy bộ phim này rất hay.
你觉得他是谁？|Bạn nghĩ anh ấy là ai?
#开
请开门。|Làm ơn mở cửa.
我会开车。|Tôi biết lái xe.
商店八点开门。|Cửa hàng mở cửa lúc tám giờ.
火车开了。|Tàu chạy rồi.
请开一下电视。|Làm ơn bật ti vi lên.
#开车
我爸爸每天开车上班。|Bố tôi ngày nào cũng lái xe đi làm.
你会开车吗？|Bạn biết lái xe không?
开车的时候别打电话。|Lúc lái xe đừng gọi điện thoại.
他开车开得很好。|Anh ấy lái xe rất giỏi.
我开车送你回家。|Tôi lái xe đưa bạn về nhà.
#开会
我们下午开会。|Chiều nay chúng tôi họp.
老师在开会。|Thầy giáo đang họp.
明天几点开会？|Mai mấy giờ họp?
开会的时候别说话。|Lúc họp đừng nói chuyện.
今天不开会。|Hôm nay không họp.
#开玩笑
我是开玩笑的。|Tôi chỉ đùa thôi.
别开玩笑了！|Đừng đùa nữa!
他很爱开玩笑。|Anh ấy rất thích đùa.
你在开玩笑吧？|Bạn đang đùa đúng không?
我不是开玩笑，是真的。|Tôi không đùa đâu, là thật đấy.
#看
你看，下雪了！|Bạn xem kìa, tuyết rơi rồi!
我喜欢看书。|Tôi thích đọc sách.
我们去看电影吧。|Chúng ta đi xem phim nhé.
我明天去看朋友。|Ngày mai tôi đi thăm bạn.
你看这件衣服怎么样？|Bạn xem bộ quần áo này thế nào?
#看病
我去医院看病。|Tôi đi bệnh viện khám bệnh.
你看病了吗？|Bạn đi khám bệnh chưa?
医生在给病人看病。|Bác sĩ đang khám cho bệnh nhân.
我妈妈带我去看病。|Mẹ đưa tôi đi khám bệnh.
看病要多少钱？|Khám bệnh hết bao nhiêu tiền?
#看到
我看到他了。|Tôi nhìn thấy anh ấy rồi.
你看到我的手机了吗？|Bạn có thấy điện thoại của tôi không?
我在网上看到了这个新闻。|Tôi thấy tin này trên mạng.
很高兴看到你。|Rất vui được gặp bạn.
我没看到他。|Tôi không thấy anh ấy.
#看见
我看见他了。|Tôi nhìn thấy anh ấy rồi.
你看见我的书了吗？|Bạn có thấy sách của tôi không?
我没看见。|Tôi không thấy.
我看见他在门口。|Tôi thấy anh ấy ở cửa.
你看得见吗？|Bạn có nhìn thấy không?
#考
明天考汉语。|Ngày mai thi tiếng Trung.
你考得怎么样？|Bạn thi thế nào?
我考了一百分。|Tôi thi được một trăm điểm.
他想考北京大学。|Anh ấy muốn thi vào Đại học Bắc Kinh.
这次考得不好。|Lần này thi không tốt.
#考试
明天有考试。|Ngày mai có bài thi.
考试难不难？|Bài thi có khó không?
我在准备考试。|Tôi đang ôn thi.
考试的时候别说话。|Lúc thi đừng nói chuyện.
这次考试我考得很好。|Kỳ thi này tôi làm rất tốt.
#渴
我渴了。|Tôi khát rồi.
你渴吗？喝点儿水吧。|Bạn khát không? Uống chút nước đi.
天太热了，我很渴。|Trời nóng quá, tôi rất khát.
我不渴，谢谢。|Tôi không khát, cảm ơn.
跑步以后我非常渴。|Sau khi chạy bộ tôi rất khát.
#课
今天有汉语课。|Hôm nay có tiết tiếng Trung.
我们八点上课。|Tám giờ chúng tôi vào học.
今天我们学第三课。|Hôm nay chúng ta học bài thứ ba.
下课了！|Tan học rồi!
这节课很有意思。|Tiết học này rất thú vị.
#课本
请打开课本。|Hãy mở sách giáo khoa ra.
我的课本在书包里。|Sách giáo khoa của tôi ở trong cặp.
这是新课本。|Đây là sách giáo khoa mới.
你带课本了吗？|Bạn mang sách giáo khoa chưa?
我忘了带课本。|Tôi quên mang sách giáo khoa.
#课文
请读课文。|Hãy đọc bài khóa.
这篇课文很难。|Bài khóa này rất khó.
你听懂课文了吗？|Bạn nghe hiểu bài khóa chưa?
我们一起读一下课文。|Chúng ta cùng đọc bài khóa một lượt.
课文里有很多新字。|Trong bài khóa có nhiều chữ mới.
#口
我家有五口人。|Nhà tôi có năm người.
请张开口。|Hãy há miệng ra.
门口有很多人。|Ở cửa có rất nhiều người.
他喝了一口水。|Anh ấy uống một ngụm nước.
你家有几口人？|Nhà bạn có mấy người?
#块
这个苹果三块钱。|Quả táo này ba tệ.
一共二十块。|Tổng cộng hai mươi tệ.
我吃了一块面包。|Tôi ăn một miếng bánh mì.
这个多少块？|Cái này bao nhiêu tệ?
给你十块钱。|Đưa bạn mười tệ.
#快
他跑得很快。|Anh ấy chạy rất nhanh.
快来吃饭！|Mau đến ăn cơm!
你快一点儿！|Bạn nhanh lên một chút!
坐飞机很快。|Đi máy bay rất nhanh.
快到家了。|Sắp về đến nhà rồi.
#来
你来了！|Bạn đến rồi!
他是从越南来的。|Anh ấy đến từ Việt Nam.
明天你来我家吧。|Mai bạn đến nhà tôi nhé.
我来介绍一下。|Để tôi giới thiệu một chút.
请来一杯咖啡。|Cho một cốc cà phê.
#来到
欢迎来到北京！|Chào mừng đến với Bắc Kinh!
我来到中国三个月了。|Tôi đến Trung Quốc được ba tháng rồi.
他来到了学校门口。|Anh ấy đến cổng trường.
来到这儿，我很高兴。|Đến đây, tôi rất vui.
我们来到了一个很美的地方。|Chúng tôi đến một nơi rất đẹp.
#老
我的爷爷很老了。|Ông tôi rất già rồi.
这是一个老房子。|Đây là một ngôi nhà cũ.
他是我的老朋友。|Anh ấy là bạn cũ của tôi.
老王是我们的老师。|Lão Vương là thầy giáo của chúng tôi.
我的手机太老了。|Điện thoại của tôi cũ quá rồi.
#老人
那个老人是我爷爷。|Ông cụ kia là ông nội tôi.
我们要帮助老人。|Chúng ta phải giúp đỡ người già.
公园里有很多老人。|Trong công viên có nhiều người già.
请给老人坐。|Xin nhường chỗ cho người già.
这位老人八十岁了。|Cụ này tám mươi tuổi rồi.
#老师
王老师好！|Chào thầy Vương!
我妈妈是老师。|Mẹ tôi là giáo viên.
老师，这个字怎么读？|Thưa thầy, chữ này đọc thế nào?
我们的汉语老师是中国人。|Giáo viên tiếng Trung của chúng tôi là người Trung Quốc.
老师说明天考试。|Thầy nói mai thi.
#了
我吃饭了。|Tôi ăn cơm rồi.
下雨了。|Mưa rồi.
他去北京了。|Anh ấy đi Bắc Kinh rồi.
我买了一本书。|Tôi đã mua một quyển sách.
太好了！|Tốt quá!
#累
我今天很累。|Hôm nay tôi rất mệt.
你累了吧？休息一下。|Bạn mệt rồi phải không? Nghỉ một chút đi.
工作太累了。|Công việc mệt quá.
我不累。|Tôi không mệt.
走了一天，我累死了。|Đi cả ngày, tôi mệt chết đi được.
#冷
今天很冷。|Hôm nay rất lạnh.
北京的冬天非常冷。|Mùa đông Bắc Kinh rất lạnh.
你冷不冷？|Bạn có lạnh không?
我有点儿冷。|Tôi hơi lạnh.
冷的时候多穿衣服。|Khi trời lạnh hãy mặc nhiều áo.
#里
书在包里。|Sách ở trong túi.
房间里有人吗？|Trong phòng có người không?
学校里有很多树。|Trong trường có nhiều cây.
杯子里没有水了。|Trong cốc hết nước rồi.
他在家里看电视。|Anh ấy xem ti vi ở trong nhà.
#里边
里边有人吗？|Bên trong có người không?
请到里边坐。|Mời vào trong ngồi.
包里边有一本书。|Trong túi có một quyển sách.
商店里边人很多。|Trong cửa hàng rất đông người.
外边冷，里边热。|Bên ngoài lạnh, bên trong nóng.
#两
我有两个姐姐。|Tôi có hai chị gái.
我要两杯咖啡。|Tôi muốn hai cốc cà phê.
现在两点。|Bây giờ là hai giờ.
我学了两年汉语。|Tôi học tiếng Trung hai năm.
两个人一起去吧。|Hai người cùng đi nhé.
#零
我的电话是一三零……|Số điện thoại của tôi là 130…
今天零下五度。|Hôm nay âm năm độ.
二零二六年。|Năm 2026.
他考了零分。|Cậu ấy thi được không điểm.
一百零五块。|Một trăm lẻ năm tệ.
#六
我六岁上学。|Tôi đi học lúc sáu tuổi.
现在六点。|Bây giờ là sáu giờ.
六月很热。|Tháng sáu rất nóng.
我家有六口人。|Nhà tôi có sáu người.
这个六十块。|Cái này sáu mươi tệ.
#楼
我住在三楼。|Tôi sống ở tầng ba.
这个楼很高。|Tòa nhà này rất cao.
教室在二楼。|Phòng học ở tầng hai.
我们学校有十个楼。|Trường chúng tôi có mười tòa nhà.
你住几楼？|Bạn sống tầng mấy?
#楼上
我住在楼上。|Tôi sống ở trên lầu.
楼上很安静。|Trên lầu rất yên tĩnh.
你去楼上看看。|Bạn lên lầu xem thử.
楼上是我的房间。|Trên lầu là phòng tôi.
他在楼上睡觉。|Anh ấy đang ngủ trên lầu.
#楼下
我在楼下等你。|Tôi đợi bạn ở dưới lầu.
楼下有一个商店。|Dưới lầu có một cửa hàng.
你快下来，我在楼下。|Bạn xuống nhanh đi, tôi ở dưới lầu.
楼下的人是谁？|Người ở dưới lầu là ai?
楼下很热闹。|Dưới lầu rất náo nhiệt.
#路
这条路很长。|Con đường này rất dài.
我认识路。|Tôi biết đường.
路上车很多。|Trên đường rất nhiều xe.
我们走路去吧。|Chúng ta đi bộ đi.
他住在中山路。|Anh ấy sống ở đường Trung Sơn.
#路口
在前边的路口往左走。|Đến ngã tư phía trước thì rẽ trái.
我在路口等你。|Tôi đợi bạn ở ngã tư.
这个路口车很多。|Ngã tư này rất nhiều xe.
过了路口就是学校。|Qua ngã tư là đến trường.
第二个路口往右走。|Đến ngã tư thứ hai thì rẽ phải.
#路上
路上小心！|Đi đường cẩn thận nhé!
我在路上，马上到。|Tôi đang trên đường, sắp đến rồi.
路上人很多。|Trên đường rất đông người.
回家的路上我买了水果。|Trên đường về nhà tôi mua hoa quả.
路上下雨了。|Trên đường trời mưa.
#妈
妈，我回来了！|Mẹ ơi, con về rồi!
我妈是医生。|Mẹ tôi là bác sĩ.
妈，我饿了。|Mẹ ơi, con đói rồi.
这是我妈做的菜。|Đây là món mẹ tôi nấu.
我妈不让我出去。|Mẹ tôi không cho tôi ra ngoài.
#妈妈
我爱我的妈妈。|Tôi yêu mẹ tôi.
妈妈在做饭。|Mẹ đang nấu cơm.
你妈妈是老师吗？|Mẹ bạn là giáo viên à?
我常常给妈妈打电话。|Tôi thường gọi điện cho mẹ.
妈妈给我买了新衣服。|Mẹ mua cho tôi quần áo mới.
#马路
过马路要小心。|Qua đường phải cẩn thận.
马路上有很多车。|Trên đường có rất nhiều xe.
学校在马路对面。|Trường ở phía bên kia đường.
别在马路上玩儿。|Đừng chơi trên đường cái.
这条马路很宽。|Con đường này rất rộng.
#马上
我马上来。|Tôi đến ngay.
电影马上开始了。|Phim sắp bắt đầu rồi.
你马上回家！|Con về nhà ngay!
我马上给你打电话。|Tôi gọi cho bạn ngay.
他马上就到。|Anh ấy sắp đến rồi.
#吗
你好吗？|Bạn khỏe không?
你是学生吗？|Bạn là học sinh à?
你喜欢喝茶吗？|Bạn thích uống trà không?
他明天来吗？|Mai anh ấy đến không?
这是你的书吗？|Đây là sách của bạn à?
#买
我去商店买东西。|Tôi đi cửa hàng mua đồ.
你买了什么？|Bạn đã mua gì?
我想买一本书。|Tôi muốn mua một quyển sách.
这个太贵了，我不买。|Cái này đắt quá, tôi không mua.
妈妈给我买了一个包。|Mẹ mua cho tôi một cái túi.
#慢
请说慢一点儿。|Xin nói chậm một chút.
他走得很慢。|Anh ấy đi rất chậm.
慢慢吃。|Ăn từ từ thôi.
这个电脑太慢了。|Máy tính này chậm quá.
你慢一点儿，别跑。|Bạn chậm lại, đừng chạy.
#忙
我今天很忙。|Hôm nay tôi rất bận.
你忙吗？|Bạn có bận không?
他工作很忙。|Công việc của anh ấy rất bận.
我不忙，有时间。|Tôi không bận, có thời gian.
最近你忙什么？|Dạo này bạn bận gì?
#毛
这个苹果五块五毛。|Quả táo này năm tệ năm hào.
一块钱是十毛。|Một tệ là mười hào.
还差五毛钱。|Còn thiếu năm hào.
这个本子三块二毛。|Quyển vở này ba tệ hai hào.
一毛钱也没有了。|Một hào cũng không còn.
#没
我没去学校。|Tôi không đi học.
他没来。|Anh ấy không đến.
我还没吃饭。|Tôi vẫn chưa ăn cơm.
我没钱了。|Tôi hết tiền rồi.
你没看见他吗？|Bạn không thấy anh ấy à?
#没关系
A：对不起！B：没关系。|A: Xin lỗi! B: Không sao.
没关系，下次再来吧。|Không sao, lần sau lại đến nhé.
晚一点儿也没关系。|Muộn một chút cũng không sao.
没关系，我自己来。|Không sao, để tôi tự làm.
不会也没关系，我教你。|Không biết cũng không sao, tôi dạy bạn.
#没什么
A：谢谢！B：没什么。|A: Cảm ơn! B: Có gì đâu.
没什么，我很好。|Không có gì, tôi ổn.
家里没什么吃的了。|Trong nhà chẳng còn gì để ăn.
这没什么难的。|Cái này chẳng có gì khó.
你怎么了？——没什么。|Bạn sao thế? — Không có gì.
#没事儿
没事儿，别担心。|Không sao đâu, đừng lo.
我没事儿，谢谢。|Tôi không sao, cảm ơn.
明天你没事儿吧？来我家玩儿。|Mai bạn rảnh chứ? Đến nhà tôi chơi.
没事儿的时候我看书。|Lúc rảnh tôi đọc sách.
A：对不起！B：没事儿。|A: Xin lỗi! B: Không sao.
#没有
我没有哥哥。|Tôi không có anh trai.
他没有来。|Anh ấy không đến.
桌子上没有书。|Trên bàn không có sách.
你有没有时间？|Bạn có thời gian không?
我还没有去过中国。|Tôi vẫn chưa từng đến Trung Quốc.
#妹
我妹今年八岁。|Em gái tôi năm nay tám tuổi.
这是我妹。|Đây là em gái tôi.
我妹很爱唱歌。|Em gái tôi rất thích hát.
我和我妹在一个学校。|Tôi và em gái học cùng một trường.
我妹在看电视。|Em gái tôi đang xem ti vi.
#妹妹
我有一个妹妹。|Tôi có một em gái.
妹妹比我小三岁。|Em gái nhỏ hơn tôi ba tuổi.
你妹妹真可爱。|Em gái bạn thật đáng yêu.
妹妹在房间里睡觉。|Em gái đang ngủ trong phòng.
我给妹妹买了一个包。|Tôi mua cho em gái một cái túi.
#门
请开门。|Làm ơn mở cửa.
门开着。|Cửa đang mở.
别忘了关门。|Đừng quên đóng cửa.
商店几点关门？|Cửa hàng mấy giờ đóng cửa?
有人在门外。|Có người ở ngoài cửa.
#门口
我在门口等你。|Tôi đợi bạn ở cửa.
学校门口有一个书店。|Cổng trường có một hiệu sách.
门口有很多人。|Ở cửa có rất nhiều người.
我们在电影院门口见吧。|Chúng ta gặp nhau ở cửa rạp phim nhé.
他站在门口。|Anh ấy đứng ở cửa.
#门票
门票多少钱？|Vé vào cửa bao nhiêu tiền?
我买了两张门票。|Tôi mua hai vé vào cửa.
学生门票便宜一点儿。|Vé vào cửa cho học sinh rẻ hơn một chút.
小孩子不要门票。|Trẻ em không cần vé vào cửa.
门票在网上买。|Vé vào cửa mua trên mạng.
#们
我们是学生。|Chúng tôi là học sinh.
你们好！|Chào các bạn!
他们都来了。|Họ đều đến rồi.
同学们，上课了！|Các em, vào học rồi!
孩子们在外边玩儿。|Bọn trẻ đang chơi bên ngoài.
#米饭
我想吃米饭。|Tôi muốn ăn cơm.
请给我一碗米饭。|Cho tôi một bát cơm.
中国人常常吃米饭。|Người Trung Quốc thường ăn cơm.
米饭好了吗？|Cơm chín chưa?
我不吃米饭，吃面条儿。|Tôi không ăn cơm, ăn mì.
#面包
我早上吃面包。|Buổi sáng tôi ăn bánh mì.
这个面包很好吃。|Cái bánh mì này rất ngon.
我买了两个面包。|Tôi mua hai cái bánh mì.
面包多少钱？|Bánh mì bao nhiêu tiền?
你要面包还是包子？|Bạn muốn bánh mì hay bánh bao?
#面条儿
我喜欢吃面条儿。|Tôi thích ăn mì.
中午我们吃面条儿吧。|Buổi trưa chúng ta ăn mì nhé.
这儿的面条儿很好吃。|Mì ở đây rất ngon.
妈妈会做面条儿。|Mẹ biết nấu mì.
请给我一碗面条儿。|Cho tôi một bát mì.
#名字
你叫什么名字？|Bạn tên là gì?
我的名字叫阿兰。|Tên tôi là Lan.
请写你的名字。|Hãy viết tên của bạn.
他的名字很好听。|Tên của anh ấy rất hay.
我不知道他的名字。|Tôi không biết tên anh ấy.
#明白
我明白了。|Tôi hiểu rồi.
你明白我的意思吗？|Bạn hiểu ý tôi không?
我不明白这个字。|Tôi không hiểu chữ này.
老师说得很明白。|Thầy giảng rất rõ ràng.
现在明白了吗？|Bây giờ hiểu chưa?
#明年
明年我去中国。|Năm sau tôi đi Trung Quốc.
明年我二十岁。|Năm sau tôi hai mươi tuổi.
明年你还学汉语吗？|Năm sau bạn còn học tiếng Trung không?
我姐姐明年上大学。|Năm sau chị tôi vào đại học.
明年见！|Hẹn gặp năm sau!
#明天
明天见！|Mai gặp nhé!
明天是星期六。|Ngày mai là thứ bảy.
明天你有时间吗？|Mai bạn có thời gian không?
明天会下雨。|Ngày mai sẽ mưa.
我明天去北京。|Ngày mai tôi đi Bắc Kinh.
#拿
请拿一下我的包。|Làm ơn cầm giúp túi của tôi.
你拿的是什么？|Bạn đang cầm cái gì?
我去拿杯子。|Tôi đi lấy cốc.
别拿我的书。|Đừng lấy sách của tôi.
东西太多，我拿不了。|Đồ nhiều quá, tôi cầm không nổi.
#哪
你是哪国人？|Bạn là người nước nào?
你要哪个？|Bạn muốn cái nào?
哪本书是你的？|Quyển sách nào là của bạn?
你在哪个学校？|Bạn học trường nào?
哪天你有时间？|Hôm nào bạn có thời gian?
#哪儿
你去哪儿？|Bạn đi đâu?
你家在哪儿？|Nhà bạn ở đâu?
我的书在哪儿？|Sách của tôi ở đâu?
你在哪儿工作？|Bạn làm việc ở đâu?
洗手间在哪儿？|Nhà vệ sinh ở đâu?
#哪里
你住在哪里？|Bạn sống ở đâu?
你是哪里人？|Bạn là người ở đâu?
A：你的汉语很好！B：哪里哪里。|A: Tiếng Trung của bạn giỏi quá! B: Đâu có đâu có.
我们去哪里吃饭？|Chúng ta đi đâu ăn cơm?
你的手机在哪里买的？|Điện thoại của bạn mua ở đâu?
#哪些
你喜欢哪些菜？|Bạn thích những món nào?
哪些人去了？|Những ai đã đi?
你去过哪些地方？|Bạn đã đến những nơi nào?
哪些书是你的？|Những quyển sách nào là của bạn?
你会说哪些话？|Bạn biết nói những thứ tiếng nào?
#那
那是我的书。|Kia là sách của tôi.
那个人是谁？|Người kia là ai?
那天我很高兴。|Hôm đó tôi rất vui.
那我们走吧。|Vậy chúng ta đi thôi.
那本书很好看。|Quyển sách kia rất hay.
#那边
你看那边！|Bạn nhìn bên kia kìa!
商店在那边。|Cửa hàng ở bên kia.
那边人很多。|Bên kia rất đông người.
我们去那边坐吧。|Chúng ta qua bên kia ngồi đi.
那边的天气怎么样？|Thời tiết bên đó thế nào?
#那儿
我在那儿等你。|Tôi đợi bạn ở đó.
那儿很漂亮。|Ở đó rất đẹp.
你去过那儿吗？|Bạn đã từng đến đó chưa?
他在那儿工作。|Anh ấy làm việc ở đó.
那儿有一个商店。|Ở đó có một cửa hàng.
#那里
我在那里住了一年。|Tôi đã sống ở đó một năm.
那里的东西很便宜。|Đồ ở đó rất rẻ.
你那里天气怎么样？|Chỗ bạn thời tiết thế nào?
我们明天去那里吧。|Mai chúng ta đến đó nhé.
那里有很多人。|Ở đó có rất nhiều người.
#那些
那些书是我的。|Những quyển sách kia là của tôi.
那些人是谁？|Những người kia là ai?
那些苹果很好吃。|Những quả táo kia rất ngon.
我不喜欢那些衣服。|Tôi không thích những bộ quần áo kia.
那些学生都是越南人。|Những học sinh kia đều là người Việt Nam.
#奶
我每天早上喝奶。|Sáng nào tôi cũng uống sữa.
你喝茶放奶吗？|Bạn uống trà có cho sữa không?
孩子要多喝奶。|Trẻ con nên uống nhiều sữa.
家里没有奶了。|Trong nhà hết sữa rồi.
这个奶很好喝。|Sữa này rất ngon.
#奶奶
我奶奶七十岁了。|Bà nội tôi bảy mươi tuổi rồi.
奶奶做的饭最好吃。|Cơm bà nấu ngon nhất.
我周末去看奶奶。|Cuối tuần tôi đi thăm bà.
奶奶，您身体好吗？|Bà ơi, bà có khỏe không ạ?
奶奶在家看电视。|Bà đang ở nhà xem ti vi.
#男
他是男老师。|Thầy ấy là giáo viên nam.
我们班男生多，女生少。|Lớp chúng tôi nhiều nam, ít nữ.
男的叫小王。|Người nam tên là Tiểu Vương.
那个男孩子是我弟弟。|Cậu bé kia là em trai tôi.
男洗手间在哪儿？|Nhà vệ sinh nam ở đâu?
#男孩儿
那个男孩儿很高。|Cậu bé kia rất cao.
她有一个男孩儿。|Cô ấy có một bé trai.
男孩儿们在打球。|Các cậu bé đang chơi bóng.
这个男孩儿八岁。|Cậu bé này tám tuổi.
那个男孩儿是谁？|Cậu bé kia là ai?
#男朋友
她有男朋友。|Cô ấy có bạn trai rồi.
你有男朋友吗？|Bạn có bạn trai không?
我男朋友是中国人。|Bạn trai tôi là người Trung Quốc.
她和男朋友去看电影了。|Cô ấy đi xem phim với bạn trai rồi.
她的男朋友很高。|Bạn trai của cô ấy rất cao.
#男人
那个男人是医生。|Người đàn ông kia là bác sĩ.
门口有一个男人。|Ở cửa có một người đàn ông.
这个男人很高。|Người đàn ông này rất cao.
那个男人在打电话。|Người đàn ông kia đang gọi điện.
男人和女人都可以去。|Đàn ông và phụ nữ đều có thể đi.
#男生
我们班有十五个男生。|Lớp chúng tôi có mười lăm nam sinh.
男生在外边打球。|Các bạn nam đang chơi bóng bên ngoài.
那个男生是我同学。|Bạn nam kia là bạn học của tôi.
男生们都很喜欢运动。|Các bạn nam đều rất thích thể thao.
男生请坐这边。|Các bạn nam xin ngồi bên này.
#南
我家在学校南面。|Nhà tôi ở phía nam trường học.
往南走十分钟就到了。|Đi về phía nam mười phút là đến.
他是南方人。|Anh ấy là người miền nam.
南门在哪儿？|Cổng nam ở đâu?
这个城市的南面有一个山。|Phía nam thành phố này có một ngọn núi.
#南边
商店在医院南边。|Cửa hàng ở phía nam bệnh viện.
南边很热。|Phía nam rất nóng.
我们往南边走吧。|Chúng ta đi về phía nam nhé.
南边有一个大学。|Phía nam có một trường đại học.
火车站在南边还是北边？|Ga tàu ở phía nam hay phía bắc?
#难
汉语难吗？|Tiếng Trung có khó không?
这个题太难了。|Câu này khó quá.
汉字不难写。|Chữ Hán không khó viết.
今天的考试很难。|Bài thi hôm nay rất khó.
这个问题不难。|Câu hỏi này không khó.
#呢
我很好，你呢？|Tôi khỏe, còn bạn?
我的书呢？|Sách của tôi đâu rồi?
他在看书呢。|Anh ấy đang đọc sách đấy.
我是学生，你呢？|Tôi là học sinh, còn bạn?
你妈妈呢？|Mẹ bạn đâu?
#能
你能来吗？|Bạn đến được không?
我能看见你。|Tôi có thể nhìn thấy bạn.
明天我不能去。|Ngày mai tôi không đi được.
这儿能坐吗？|Ở đây ngồi được không?
你能帮我一下吗？|Bạn có thể giúp tôi một chút không?
#你
你好！|Xin chào bạn!
你叫什么名字？|Bạn tên là gì?
我喜欢你。|Tôi thích bạn.
这是给你的。|Cái này là cho bạn.
你是哪国人？|Bạn là người nước nào?
#你们
你们好！|Chào các bạn!
你们是学生吗？|Các bạn là học sinh à?
你们去哪儿？|Các bạn đi đâu?
我请你们吃饭。|Tôi mời các bạn ăn cơm.
你们班有多少人？|Lớp các bạn có bao nhiêu người?
#年
今年是二零二六年。|Năm nay là năm 2026.
我学了一年汉语。|Tôi học tiếng Trung một năm.
新年快乐！|Chúc mừng năm mới!
他每年回家两次。|Mỗi năm anh ấy về nhà hai lần.
你哪年出生？|Bạn sinh năm nào?
#您
您好！|Xin chào ông/bà!
您贵姓？|Ông/bà họ gì ạ?
请问您是王老师吗？|Xin hỏi, ông có phải là thầy Vương không ạ?
谢谢您！|Cảm ơn ông/bà!
您请坐。|Mời ông/bà ngồi.
#牛奶
我每天喝牛奶。|Ngày nào tôi cũng uống sữa bò.
请给我一杯牛奶。|Cho tôi một cốc sữa.
牛奶多少钱？|Sữa bò bao nhiêu tiền?
早上我喝牛奶，吃面包。|Buổi sáng tôi uống sữa, ăn bánh mì.
孩子喜欢喝牛奶。|Trẻ con thích uống sữa bò.
#女
她是女老师。|Cô ấy là giáo viên nữ.
女洗手间在那边。|Nhà vệ sinh nữ ở bên kia.
我有一个女同学是中国人。|Tôi có một bạn học nữ là người Trung Quốc.
女的叫什么名字？|Người nữ tên là gì?
我们班女生比男生多。|Lớp chúng tôi nữ nhiều hơn nam.
#女儿
我有一个女儿。|Tôi có một con gái.
我女儿今年六岁。|Con gái tôi năm nay sáu tuổi.
你女儿真漂亮。|Con gái bạn xinh thật.
女儿在学校学习。|Con gái đang học ở trường.
他女儿是医生。|Con gái ông ấy là bác sĩ.
#女孩儿
那个女孩儿很漂亮。|Cô bé kia rất xinh.
她是一个可爱的女孩儿。|Cô bé ấy rất đáng yêu.
女孩儿们在唱歌。|Các cô bé đang hát.
这个女孩儿是谁？|Cô bé này là ai?
我有一个男孩儿和一个女孩儿。|Tôi có một bé trai và một bé gái.
#女朋友
他有女朋友了。|Anh ấy có bạn gái rồi.
你女朋友是哪国人？|Bạn gái bạn là người nước nào?
我女朋友喜欢看电影。|Bạn gái tôi thích xem phim.
他给女朋友买了花。|Anh ấy mua hoa tặng bạn gái.
这是我女朋友。|Đây là bạn gái tôi.
#女人
那个女人是我的老师。|Người phụ nữ kia là cô giáo tôi.
商店里有很多女人。|Trong cửa hàng có nhiều phụ nữ.
这个女人很高。|Người phụ nữ này rất cao.
那个女人在等车。|Người phụ nữ kia đang đợi xe.
门口有一个女人找你。|Ở cửa có một người phụ nữ tìm bạn.
#女生
我们班女生很多。|Lớp chúng tôi có nhiều nữ sinh.
那个女生唱歌很好听。|Bạn nữ kia hát rất hay.
女生们在教室里。|Các bạn nữ đang ở trong lớp.
这个女生是新同学。|Bạn nữ này là học sinh mới.
女生请站这边。|Các bạn nữ xin đứng bên này.
#旁边
我家旁边有一个商店。|Cạnh nhà tôi có một cửa hàng.
请坐我旁边。|Mời ngồi cạnh tôi.
学校旁边是医院。|Bên cạnh trường là bệnh viện.
他旁边的人是谁？|Người bên cạnh anh ấy là ai?
书在电脑旁边。|Sách ở cạnh máy tính.
#跑
他跑得很快。|Anh ấy chạy rất nhanh.
别跑！|Đừng chạy!
我每天早上去跑步。|Sáng nào tôi cũng đi chạy bộ.
狗跑到外边去了。|Con chó chạy ra ngoài rồi.
他跑过来了。|Anh ấy chạy lại đây rồi.
#朋友
他是我的朋友。|Anh ấy là bạn của tôi.
我有很多朋友。|Tôi có nhiều bạn bè.
我们是好朋友。|Chúng tôi là bạn tốt.
我和朋友去看电影。|Tôi đi xem phim với bạn.
你在中国有朋友吗？|Bạn có bạn bè ở Trung Quốc không?
#票
我买了两张票。|Tôi mua hai vé.
票多少钱一张？|Vé bao nhiêu tiền một tấm?
你的票呢？|Vé của bạn đâu?
今天的票没有了。|Vé hôm nay hết rồi.
我在网上买票。|Tôi mua vé trên mạng.
#七
我七点起床。|Tôi dậy lúc bảy giờ.
一个星期有七天。|Một tuần có bảy ngày.
我弟弟七岁。|Em trai tôi bảy tuổi.
七月我们放假。|Tháng bảy chúng tôi được nghỉ.
这个七块钱。|Cái này bảy tệ.
#起
我们一起去吧。|Chúng ta cùng đi nhé.
你几点起？|Mấy giờ bạn dậy?
从今天起，我每天学汉语。|Từ hôm nay, ngày nào tôi cũng học tiếng Trung.
对不起。|Xin lỗi.
他起得很早。|Anh ấy dậy rất sớm.
#起床
你几点起床？|Mấy giờ bạn thức dậy?
我早上六点起床。|Sáu giờ sáng tôi thức dậy.
快起床！八点了。|Dậy nhanh! Tám giờ rồi.
星期天我起床很晚。|Chủ nhật tôi dậy rất muộn.
起床以后我先喝水。|Thức dậy xong tôi uống nước trước.
#起来
起来！上课了。|Dậy đi! Vào học rồi.
他站起来了。|Anh ấy đứng dậy rồi.
你几点起来的？|Bạn dậy lúc mấy giờ?
天气热起来了。|Trời bắt đầu nóng lên rồi.
请大家站起来。|Mời mọi người đứng dậy.
#汽车
我爸爸有一辆汽车。|Bố tôi có một chiếc ô tô.
路上汽车很多。|Trên đường có rất nhiều ô tô.
这辆汽车很贵。|Chiếc ô tô này rất đắt.
我们坐汽车去吧。|Chúng ta đi ô tô nhé.
他在汽车公司工作。|Anh ấy làm việc ở công ty ô tô.
#前
三天前我来到北京。|Ba ngày trước tôi đến Bắc Kinh.
睡觉前别喝咖啡。|Trước khi ngủ đừng uống cà phê.
请往前走。|Xin đi về phía trước.
他坐在我前面。|Anh ấy ngồi phía trước tôi.
吃饭前要洗手。|Trước khi ăn phải rửa tay.
#前边
学校前边有一个车站。|Phía trước trường có một bến xe.
请坐前边。|Mời ngồi phía trước.
前边是我家。|Phía trước là nhà tôi.
你往前边走。|Bạn đi về phía trước.
前边的人是谁？|Người ở phía trước là ai?
#前天
前天我去了北京。|Hôm kia tôi đi Bắc Kinh.
前天是星期一。|Hôm kia là thứ hai.
我前天见过他。|Hôm kia tôi đã gặp anh ấy.
前天很冷。|Hôm kia rất lạnh.
前天你在哪儿？|Hôm kia bạn ở đâu?
#钱
我没有钱了。|Tôi hết tiền rồi.
这个多少钱？|Cái này bao nhiêu tiền?
他有很多钱。|Anh ấy có rất nhiều tiền.
我给你钱。|Tôi đưa bạn tiền.
学汉语要花钱吗？|Học tiếng Trung có tốn tiền không?
#钱包
我的钱包在哪儿？|Ví của tôi ở đâu?
我的钱包里有一百块。|Trong ví tôi có một trăm tệ.
他买了一个新钱包。|Anh ấy mua một cái ví mới.
我找不到钱包了。|Tôi không tìm thấy ví nữa.
这个钱包是你的吗？|Cái ví này là của bạn à?
#请
请进！|Mời vào!
请坐。|Mời ngồi.
我请你吃饭。|Tôi mời bạn ăn cơm.
请说慢一点儿。|Xin nói chậm một chút.
请问，火车站在哪儿？|Xin hỏi, ga tàu ở đâu?
#请假
我明天想请假。|Ngày mai tôi muốn xin nghỉ.
他生病了，今天请假了。|Anh ấy bị ốm, hôm nay xin nghỉ rồi.
请假要告诉老师。|Xin nghỉ phải báo thầy cô.
我请了三天假。|Tôi xin nghỉ ba ngày.
你为什么请假？|Tại sao bạn xin nghỉ?
#请进
请进，请坐。|Mời vào, mời ngồi.
A：可以进来吗？B：请进！|A: Tôi vào được không? B: Mời vào!
老师说：“请进。”|Thầy nói: “Mời vào.”
欢迎欢迎，请进！|Hoan nghênh, mời vào!
请进，外边很冷。|Mời vào, ngoài trời lạnh lắm.
#请问
请问，你叫什么名字？|Xin hỏi, bạn tên là gì?
请问，现在几点？|Xin hỏi, bây giờ mấy giờ?
请问，洗手间在哪儿？|Xin hỏi, nhà vệ sinh ở đâu?
请问，这个多少钱？|Xin hỏi, cái này bao nhiêu tiền?
请问，王老师在吗？|Xin hỏi, thầy Vương có ở đây không?
#请坐
请坐，请喝茶。|Mời ngồi, mời uống trà.
您好，请坐！|Xin chào, mời ngồi!
请坐这儿。|Mời ngồi đây.
大家请坐。|Mời mọi người ngồi.
请坐，我马上来。|Mời ngồi, tôi đến ngay.
#球
我们去打球吧。|Chúng ta đi chơi bóng nhé.
这个球是谁的？|Quả bóng này là của ai?
他踢球踢得很好。|Anh ấy đá bóng rất giỏi.
我买了一个新球。|Tôi mua một quả bóng mới.
你喜欢看球吗？|Bạn thích xem bóng đá không?
#去
你去哪儿？|Bạn đi đâu?
我去学校。|Tôi đến trường.
我们去吃饭吧。|Chúng ta đi ăn cơm nhé.
他去北京了。|Anh ấy đi Bắc Kinh rồi.
明天你去不去？|Mai bạn có đi không?
#去年
去年我去了中国。|Năm ngoái tôi đã đến Trung Quốc.
我去年开始学汉语。|Tôi bắt đầu học tiếng Trung từ năm ngoái.
去年冬天很冷。|Mùa đông năm ngoái rất lạnh.
他去年大学毕业。|Năm ngoái anh ấy tốt nghiệp đại học.
去年你在哪儿工作？|Năm ngoái bạn làm việc ở đâu?
#热
今天很热。|Hôm nay rất nóng.
我不喜欢热天。|Tôi không thích trời nóng.
请喝杯热茶。|Mời uống cốc trà nóng.
房间里太热了。|Trong phòng nóng quá.
你热不热？|Bạn có nóng không?
#人
我是越南人。|Tôi là người Việt Nam.
这儿人很多。|Ở đây rất đông người.
你家有几个人？|Nhà bạn có mấy người?
那个人是谁？|Người kia là ai?
他是一个好人。|Anh ấy là một người tốt.
#认识
认识你很高兴。|Rất vui được làm quen với bạn.
你认识他吗？|Bạn có quen anh ấy không?
我不认识这个字。|Tôi không biết chữ này.
我们是去年认识的。|Chúng tôi quen nhau năm ngoái.
我认识很多中国朋友。|Tôi quen nhiều bạn Trung Quốc.
#认真
他学习很认真。|Cậu ấy học rất chăm chỉ.
请认真听。|Hãy nghe chăm chú.
她工作非常认真。|Cô ấy làm việc rất nghiêm túc.
你要认真写汉字。|Bạn phải viết chữ Hán cẩn thận.
他认真地回答了问题。|Cậu ấy trả lời câu hỏi một cách nghiêm túc.
#日
今天是十月一日。|Hôm nay là ngày 1 tháng 10.
生日快乐！|Chúc mừng sinh nhật!
星期日我在家。|Chủ nhật tôi ở nhà.
我们五月三日见。|Chúng ta gặp nhau ngày 3 tháng 5.
我的生日是五月一日。|Sinh nhật tôi là ngày 1 tháng 5.
#日期
今天的日期是几号？|Hôm nay là ngày mấy?
请写上今天的日期。|Hãy ghi ngày hôm nay.
考试日期是下个月三号。|Ngày thi là mùng 3 tháng sau.
机票上有日期。|Trên vé máy bay có ghi ngày.
我忘了日期。|Tôi quên ngày rồi.
#肉
我不吃肉。|Tôi không ăn thịt.
这个肉很好吃。|Thịt này rất ngon.
妈妈买了一些肉。|Mẹ mua một ít thịt.
你喜欢吃什么肉？|Bạn thích ăn thịt gì?
包子里有肉。|Trong bánh bao có thịt.
#三
我有三个朋友。|Tôi có ba người bạn.
现在三点。|Bây giờ là ba giờ.
我住在三楼。|Tôi sống ở tầng ba.
三月是春天。|Tháng ba là mùa xuân.
这个三十块。|Cái này ba mươi tệ.
#山
我们去爬山吧。|Chúng ta đi leo núi nhé.
这个山很高。|Ngọn núi này rất cao.
山上有很多树。|Trên núi có nhiều cây.
我家在山下边。|Nhà tôi ở dưới chân núi.
山上很冷。|Trên núi rất lạnh.
#商场
我们去商场买衣服吧。|Chúng ta đi trung tâm thương mại mua quần áo nhé.
商场里人很多。|Trong trung tâm thương mại rất đông người.
这个商场很大。|Trung tâm thương mại này rất lớn.
商场几点开门？|Trung tâm thương mại mấy giờ mở cửa?
电影院在商场五楼。|Rạp chiếu phim ở tầng năm trung tâm thương mại.
#商店
我去商店买水果。|Tôi đi cửa hàng mua hoa quả.
商店在哪儿？|Cửa hàng ở đâu?
这个商店的东西很便宜。|Đồ ở cửa hàng này rất rẻ.
学校旁边有一个商店。|Cạnh trường có một cửa hàng.
商店九点关门。|Cửa hàng đóng cửa lúc chín giờ.
#上
书在桌子上。|Sách ở trên bàn.
我上楼了。|Tôi lên lầu rồi.
上个星期我去了北京。|Tuần trước tôi đi Bắc Kinh.
他在网上买东西。|Anh ấy mua đồ trên mạng.
我们上车吧。|Chúng ta lên xe thôi.
#上班
我每天八点上班。|Ngày nào tôi cũng đi làm lúc tám giờ.
你在哪儿上班？|Bạn làm việc ở đâu?
今天不上班。|Hôm nay không đi làm.
爸爸开车去上班。|Bố lái xe đi làm.
上班的时候别看手机。|Lúc làm việc đừng xem điện thoại.
#上边
书在桌子上边。|Sách ở phía trên bàn.
上边写着什么？|Phía trên viết gì vậy?
我住在他上边。|Tôi sống ở tầng trên nhà anh ấy.
请看上边的字。|Hãy xem chữ ở phía trên.
上边那本书是我的。|Quyển sách ở trên kia là của tôi.
#上车
请上车！|Mời lên xe!
我们在这儿上车。|Chúng ta lên xe ở đây.
上车以后请买票。|Lên xe rồi xin mua vé.
你快上车吧。|Bạn mau lên xe đi.
他在火车站上车。|Anh ấy lên xe ở ga tàu.
#上次
上次我们在哪儿见面的？|Lần trước chúng ta gặp nhau ở đâu?
上次的考试很难。|Bài thi lần trước rất khó.
上次你说的书我买了。|Quyển sách lần trước bạn nói tôi mua rồi.
上次他没来。|Lần trước anh ấy không đến.
这次比上次好。|Lần này tốt hơn lần trước.
#上课
我们八点上课。|Tám giờ chúng tôi vào học.
上课了，别说话。|Vào học rồi, đừng nói chuyện.
今天上午不上课。|Sáng nay không có tiết.
上课的时候要认真听。|Trong giờ học phải nghe chăm chú.
你几点上课？|Mấy giờ bạn vào học?
#上网
我每天晚上上网。|Tối nào tôi cũng lên mạng.
你常常上网吗？|Bạn có hay lên mạng không?
这儿能上网吗？|Ở đây có lên mạng được không?
我上网买东西。|Tôi lên mạng mua đồ.
上网的时间别太长。|Đừng lên mạng quá lâu.
#上午
我上午去学校。|Buổi sáng tôi đến trường.
明天上午你有时间吗？|Sáng mai bạn có thời gian không?
上午九点开会。|Chín giờ sáng họp.
今天上午很冷。|Sáng nay rất lạnh.
我星期六上午在家。|Sáng thứ bảy tôi ở nhà.
#上学
我七岁上学。|Tôi đi học lúc bảy tuổi.
你每天怎么去上学？|Hằng ngày bạn đi học bằng gì?
今天不用上学。|Hôm nay không phải đi học.
我弟弟还没上学。|Em trai tôi chưa đi học.
上学的路上我买了包子。|Trên đường đi học tôi mua bánh bao.
#少
这儿人很少。|Ở đây rất ít người.
他吃得很少。|Anh ấy ăn rất ít.
你多吃一点儿，别吃太少。|Bạn ăn nhiều vào, đừng ăn ít quá.
我们班女生少。|Lớp chúng tôi ít nữ.
多少钱？|Bao nhiêu tiền?
#身上
我身上没有钱。|Trên người tôi không có tiền.
你身上的衣服很漂亮。|Bộ đồ bạn đang mặc rất đẹp.
他身上有很多水。|Trên người anh ấy ướt sũng nước.
我的手机不在身上。|Điện thoại không có trên người tôi.
猫跑到我身上来了。|Con mèo chạy lên người tôi.
#身体
你身体好吗？|Sức khỏe bạn tốt chứ?
多运动对身体好。|Tập thể dục nhiều tốt cho sức khỏe.
我奶奶身体很好。|Bà nội tôi rất khỏe.
他身体不太好。|Sức khỏe anh ấy không tốt lắm.
身体最重要。|Sức khỏe là quan trọng nhất.
#什么
你叫什么名字？|Bạn tên là gì?
这是什么？|Đây là cái gì?
你想吃什么？|Bạn muốn ăn gì?
你什么时候回家？|Khi nào bạn về nhà?
你说什么？|Bạn nói gì cơ?
#生病
我生病了。|Tôi bị ốm rồi.
他生病了，没来上课。|Anh ấy bị ốm, không đến lớp.
天冷了，别生病。|Trời lạnh rồi, đừng để bị ốm.
你生什么病了？|Bạn bị bệnh gì?
生病的时候要多休息。|Khi bị ốm phải nghỉ ngơi nhiều.
#生气
妈妈生气了。|Mẹ giận rồi.
你别生气。|Bạn đừng giận.
他为什么生气？|Tại sao anh ấy giận?
我没生气。|Tôi không giận.
老师很少生气。|Thầy rất ít khi giận.
#生日
今天是我的生日。|Hôm nay là sinh nhật tôi.
生日快乐！|Chúc mừng sinh nhật!
你的生日是几月几号？|Sinh nhật bạn ngày mấy tháng mấy?
我给他买了生日礼物。|Tôi mua quà sinh nhật cho anh ấy.
明天是妈妈的生日。|Ngày mai là sinh nhật mẹ.
#十
我十岁。|Tôi mười tuổi.
现在十点。|Bây giờ là mười giờ.
我们班有十个人。|Lớp chúng tôi có mười người.
这个十块钱。|Cái này mười tệ.
十月一号放假。|Ngày 1 tháng 10 được nghỉ.
#时候
你什么时候来？|Khi nào bạn đến?
我小的时候住在河内。|Lúc nhỏ tôi sống ở Hà Nội.
吃饭的时候别说话。|Lúc ăn cơm đừng nói chuyện.
我到的时候他已经走了。|Lúc tôi đến anh ấy đã đi rồi.
有时候我很忙。|Có lúc tôi rất bận.
#时间
你有时间吗？|Bạn có thời gian không?
现在没有时间了。|Bây giờ không còn thời gian nữa.
学汉语要花很多时间。|Học tiếng Trung phải mất nhiều thời gian.
时间到了。|Hết giờ rồi.
我们的时间不多。|Thời gian của chúng ta không nhiều.
#事
你有什么事？|Bạn có việc gì?
我今天有事，不能去。|Hôm nay tôi có việc, không đi được.
这是我的事。|Đây là việc của tôi.
没事，别担心。|Không sao, đừng lo.
他告诉我一件事。|Anh ấy kể cho tôi một chuyện.
#试
我可以试一下吗？|Tôi có thể thử một chút không?
你试试这件衣服。|Bạn thử bộ quần áo này xem.
我想试一试。|Tôi muốn thử xem.
这个菜你试过吗？|Món này bạn đã thử chưa?
试一下，不难。|Thử đi, không khó đâu.
#是
我是学生。|Tôi là học sinh.
他不是老师。|Anh ấy không phải giáo viên.
这是我的书。|Đây là sách của tôi.
你是中国人吗？|Bạn là người Trung Quốc à?
是，我是。|Vâng, đúng vậy.
#是不是
你是不是学生？|Bạn có phải học sinh không?
他是不是生病了？|Có phải anh ấy bị ốm rồi không?
这是不是你的书？|Đây có phải sách của bạn không?
明天是不是星期六？|Mai có phải thứ bảy không?
你是不是不想去？|Có phải bạn không muốn đi không?
#手
请洗手。|Hãy rửa tay.
我的手很冷。|Tay tôi rất lạnh.
他手里拿着一本书。|Trong tay anh ấy cầm một quyển sách.
举手回答问题。|Giơ tay trả lời câu hỏi.
我的手疼。|Tay tôi đau.
#手机
我的手机是新的。|Điện thoại của tôi là máy mới.
你的手机号是多少？|Số điện thoại của bạn là bao nhiêu?
我的手机没电了。|Điện thoại tôi hết pin rồi.
上课的时候别看手机。|Trong giờ học đừng xem điện thoại.
我用手机买东西。|Tôi mua đồ bằng điện thoại.
#书
这是我的书。|Đây là sách của tôi.
我喜欢看书。|Tôi thích đọc sách.
这本书很好看。|Quyển sách này rất hay.
我买了两本汉语书。|Tôi mua hai quyển sách tiếng Trung.
你的书在桌子上。|Sách của bạn ở trên bàn.
#书包
我的书包是红色的。|Cặp sách của tôi màu đỏ.
书包里有书和本子。|Trong cặp có sách và vở.
我买了一个新书包。|Tôi mua một cái cặp sách mới.
你的书包很重。|Cặp sách của bạn rất nặng.
别忘了你的书包。|Đừng quên cặp sách của bạn.
#书店
我去书店买书。|Tôi đi hiệu sách mua sách.
学校旁边有一个书店。|Cạnh trường có một hiệu sách.
这个书店很大。|Hiệu sách này rất lớn.
书店里有很多汉语书。|Trong hiệu sách có nhiều sách tiếng Trung.
书店几点关门？|Hiệu sách mấy giờ đóng cửa?
#树
学校里有很多树。|Trong trường có nhiều cây.
这棵树很高。|Cái cây này rất cao.
我家前边有一棵大树。|Trước nhà tôi có một cây to.
鸟在树上。|Con chim ở trên cây.
我们在树下休息吧。|Chúng ta nghỉ dưới gốc cây đi.
#谁
他是谁？|Anh ấy là ai?
这是谁的书？|Đây là sách của ai?
谁是你的老师？|Ai là giáo viên của bạn?
你和谁一起去？|Bạn đi cùng ai?
谁会说汉语？|Ai biết nói tiếng Trung?
#水
我想喝水。|Tôi muốn uống nước.
请给我一杯水。|Cho tôi một cốc nước.
多喝水对身体好。|Uống nhiều nước tốt cho sức khỏe.
杯子里没有水了。|Trong cốc hết nước rồi.
这儿的水能喝吗？|Nước ở đây uống được không?
#水果
我喜欢吃水果。|Tôi thích ăn hoa quả.
你想吃什么水果？|Bạn muốn ăn hoa quả gì?
我去商店买水果。|Tôi đi cửa hàng mua hoa quả.
这些水果很新鲜。|Những hoa quả này rất tươi.
多吃水果对身体好。|Ăn nhiều hoa quả tốt cho sức khỏe.
#睡
我睡了八个小时。|Tôi ngủ tám tiếng.
你睡得好吗？|Bạn ngủ ngon không?
孩子睡了。|Đứa bé ngủ rồi.
我昨天睡得很晚。|Hôm qua tôi ngủ rất muộn.
别睡了，起床吧！|Đừng ngủ nữa, dậy đi!
#睡觉
我十点睡觉。|Tôi đi ngủ lúc mười giờ.
你几点睡觉？|Mấy giờ bạn đi ngủ?
他在睡觉，别说话。|Anh ấy đang ngủ, đừng nói chuyện.
睡觉前别看手机。|Trước khi ngủ đừng xem điện thoại.
我想睡觉了。|Tôi muốn đi ngủ rồi.
#说
请再说一次。|Xin nói lại lần nữa.
你会说汉语吗？|Bạn biết nói tiếng Trung không?
他说明天不来。|Anh ấy nói mai không đến.
你说什么？|Bạn nói gì?
老师说得很慢。|Thầy nói rất chậm.
#说话
上课的时候别说话。|Trong giờ học đừng nói chuyện.
他不爱说话。|Anh ấy ít nói.
我在跟朋友说话。|Tôi đang nói chuyện với bạn.
请大声说话。|Xin nói to lên.
你说话太快了。|Bạn nói nhanh quá.
#四
我家有四口人。|Nhà tôi có bốn người.
现在四点。|Bây giờ là bốn giờ.
我住在四楼。|Tôi sống ở tầng bốn.
一年有四个季节。|Một năm có bốn mùa.
这个四块钱。|Cái này bốn tệ.
#送
我送你一本书。|Tôi tặng bạn một quyển sách.
我送你回家吧。|Để tôi đưa bạn về nhà nhé.
他送我去机场。|Anh ấy đưa tôi ra sân bay.
这是朋友送我的。|Cái này là bạn tặng tôi.
你送妈妈什么生日礼物？|Bạn tặng mẹ quà sinh nhật gì?
#岁
你几岁了？|Con mấy tuổi rồi?
我今年十八岁。|Năm nay tôi mười tám tuổi.
我比他大两岁。|Tôi lớn hơn anh ấy hai tuổi.
我奶奶八十岁了。|Bà nội tôi tám mươi tuổi rồi.
你多少岁？|Bạn bao nhiêu tuổi?
#他
他是我的朋友。|Anh ấy là bạn của tôi.
他叫什么名字？|Anh ấy tên là gì?
他不在家。|Anh ấy không có ở nhà.
我给他打电话。|Tôi gọi điện cho anh ấy.
他是医生。|Anh ấy là bác sĩ.
#他们
他们是我的同学。|Họ là bạn học của tôi.
他们都是中国人。|Họ đều là người Trung Quốc.
他们去哪儿了？|Họ đi đâu rồi?
我和他们一起吃饭。|Tôi ăn cơm cùng họ.
他们家有五口人。|Nhà họ có năm người.
#她
她是我妈妈。|Bà ấy là mẹ tôi.
她很漂亮。|Cô ấy rất xinh.
她叫什么名字？|Cô ấy tên là gì?
她在医院工作。|Cô ấy làm việc ở bệnh viện.
我很喜欢她。|Tôi rất thích cô ấy.
#她们
她们是我的姐姐。|Họ là các chị gái của tôi.
她们都会唱歌。|Các cô ấy đều biết hát.
她们在教室里。|Các cô ấy đang ở trong lớp.
她们是哪国人？|Các cô ấy là người nước nào?
我认识她们。|Tôi quen các cô ấy.
#太
太好了！|Tốt quá!
这个太贵了。|Cái này đắt quá.
今天不太冷。|Hôm nay không lạnh lắm.
你太客气了。|Bạn khách sáo quá.
我太累了。|Tôi mệt quá.
#天
今天天气很好。|Hôm nay thời tiết rất đẹp.
一个星期有七天。|Một tuần có bảy ngày.
我在北京住了三天。|Tôi ở Bắc Kinh ba ngày.
天黑了。|Trời tối rồi.
我每天学汉语。|Ngày nào tôi cũng học tiếng Trung.
#天气
今天天气怎么样？|Hôm nay thời tiết thế nào?
明天天气很好。|Thời tiết ngày mai rất đẹp.
北京的天气很冷。|Thời tiết Bắc Kinh rất lạnh.
天气热了。|Trời nóng lên rồi.
我喜欢这样的天气。|Tôi thích thời tiết như thế này.
#听
我喜欢听歌。|Tôi thích nghe nhạc.
请听我说。|Hãy nghe tôi nói.
你听懂了吗？|Bạn nghe hiểu chưa?
他在听老师说话。|Cậu ấy đang nghe thầy nói.
我听不清楚。|Tôi nghe không rõ.
#听到
你听到了吗？|Bạn nghe thấy chưa?
我听到有人叫我。|Tôi nghe thấy có người gọi tôi.
听到这个消息，我很高兴。|Nghe được tin này, tôi rất vui.
我没听到电话。|Tôi không nghe thấy điện thoại.
我在网上听到了这个歌。|Tôi nghe bài hát này trên mạng.
#听见
你听见了吗？|Bạn có nghe thấy không?
我听见有人在唱歌。|Tôi nghe thấy có người đang hát.
我没听见你说什么。|Tôi không nghe thấy bạn nói gì.
大声一点儿，我听不见。|To lên chút, tôi nghe không thấy.
他听见门开了。|Anh ấy nghe thấy cửa mở.
#听写
今天我们听写。|Hôm nay chúng ta nghe viết chính tả.
听写的时候请认真听。|Lúc nghe viết hãy nghe kỹ.
我听写写对了九个字。|Bài chính tả tôi viết đúng chín chữ.
明天有听写。|Ngày mai có bài chính tả.
老师说，我们来听写吧。|Thầy nói, chúng ta làm chính tả nhé.
#同学
他是我的同学。|Cậu ấy là bạn học của tôi.
同学们好！|Chào các em!
我们班的同学都很好。|Các bạn trong lớp đều rất tốt.
我和同学一起学习。|Tôi học cùng bạn học.
你有中国同学吗？|Bạn có bạn học người Trung Quốc không?
#图书馆
我去图书馆看书。|Tôi đến thư viện đọc sách.
图书馆在哪儿？|Thư viện ở đâu?
图书馆里很安静。|Trong thư viện rất yên tĩnh.
我在图书馆借了两本书。|Tôi mượn hai quyển sách ở thư viện.
图书馆几点开门？|Thư viện mấy giờ mở cửa?
#外
门外有人。|Ngoài cửa có người.
他在国外工作。|Anh ấy làm việc ở nước ngoài.
外面很冷。|Bên ngoài rất lạnh.
我在学校外等你。|Tôi đợi bạn ngoài trường.
除了他以外，大家都来了。|Ngoài anh ấy ra, mọi người đều đến rồi.
#外边
外边下雨了。|Bên ngoài mưa rồi.
外边很冷，多穿衣服。|Bên ngoài lạnh, mặc thêm áo vào.
孩子们在外边玩儿。|Bọn trẻ đang chơi bên ngoài.
我在外边等你。|Tôi đợi bạn ở ngoài.
外边有人找你。|Bên ngoài có người tìm bạn.
#外国
他是外国人。|Anh ấy là người nước ngoài.
我想去外国旅游。|Tôi muốn đi du lịch nước ngoài.
我们学校有很多外国学生。|Trường chúng tôi có nhiều học sinh nước ngoài.
你去过外国吗？|Bạn đã từng ra nước ngoài chưa?
这是外国电影。|Đây là phim nước ngoài.
#外语
你会说几种外语？|Bạn biết nói mấy ngoại ngữ?
汉语是我的第一外语。|Tiếng Trung là ngoại ngữ đầu tiên của tôi.
学外语很有意思。|Học ngoại ngữ rất thú vị.
他的外语很好。|Ngoại ngữ của anh ấy rất tốt.
我想学一门外语。|Tôi muốn học một ngoại ngữ.
#玩儿
我们去公园玩儿吧。|Chúng ta đi công viên chơi nhé.
孩子们在外边玩儿。|Bọn trẻ đang chơi bên ngoài.
你来我家玩儿吧。|Bạn đến nhà tôi chơi nhé.
我们玩儿得很高兴。|Chúng tôi chơi rất vui.
周末你去哪儿玩儿？|Cuối tuần bạn đi đâu chơi?
#晚
太晚了，我要回家了。|Muộn quá rồi, tôi phải về nhà.
对不起，我来晚了。|Xin lỗi, tôi đến muộn.
他昨天睡得很晚。|Hôm qua anh ấy ngủ rất muộn.
晚安！|Chúc ngủ ngon!
现在还不晚。|Bây giờ vẫn chưa muộn.
#晚饭
我们七点吃晚饭。|Bảy giờ chúng tôi ăn tối.
晚饭你想吃什么？|Bữa tối bạn muốn ăn gì?
妈妈在做晚饭。|Mẹ đang nấu bữa tối.
我请你吃晚饭。|Tôi mời bạn ăn tối.
晚饭以后我们去散步吧。|Ăn tối xong chúng ta đi dạo nhé.
#晚上
晚上我在家看书。|Buổi tối tôi ở nhà đọc sách.
今天晚上你有时间吗？|Tối nay bạn có thời gian không?
晚上很冷。|Buổi tối rất lạnh.
我们晚上去看电影吧。|Tối nay chúng ta đi xem phim nhé.
晚上好！|Chào buổi tối!
#网上
我在网上买东西。|Tôi mua đồ trên mạng.
网上有很多汉语课。|Trên mạng có nhiều khóa học tiếng Trung.
我在网上看到了这个新闻。|Tôi thấy tin này trên mạng.
你可以在网上买票。|Bạn có thể mua vé trên mạng.
网上的东西便宜吗？|Đồ trên mạng có rẻ không?
#网友
他是我的网友。|Anh ấy là bạn trên mạng của tôi.
我有很多中国网友。|Tôi có nhiều bạn mạng người Trung Quốc.
我和网友见面了。|Tôi đã gặp mặt bạn trên mạng.
网友们都说这个电影好看。|Cư dân mạng đều nói phim này hay.
你的网友是哪国人？|Bạn trên mạng của bạn là người nước nào?
#忘
我忘了他的名字。|Tôi quên tên anh ấy rồi.
别忘了带书。|Đừng quên mang sách.
我忘了关门。|Tôi quên đóng cửa.
你忘了什么？|Bạn quên gì vậy?
我不会忘的。|Tôi sẽ không quên đâu.
#忘记
我忘记了他的电话。|Tôi quên số điện thoại của anh ấy.
别忘记吃药。|Đừng quên uống thuốc.
我忘记带钱包了。|Tôi quên mang ví rồi.
你忘记了吗？|Bạn quên rồi à?
我永远不会忘记你。|Tôi sẽ mãi không quên bạn.
#问
我可以问一个问题吗？|Tôi có thể hỏi một câu không?
他问我叫什么名字。|Anh ấy hỏi tôi tên gì.
你去问老师吧。|Bạn đi hỏi thầy đi.
请问，现在几点？|Xin hỏi, bây giờ mấy giờ?
别问了，我不知道。|Đừng hỏi nữa, tôi không biết.
#我
我是学生。|Tôi là học sinh.
我叫阿兰。|Tôi tên là Lan.
我喜欢喝茶。|Tôi thích uống trà.
这是我的书。|Đây là sách của tôi.
请给我一杯水。|Cho tôi một cốc nước.
#我们
我们是同学。|Chúng tôi là bạn học.
我们一起去吧。|Chúng ta cùng đi nhé.
我们学校很大。|Trường chúng tôi rất lớn.
我们都喜欢汉语。|Chúng tôi đều thích tiếng Trung.
老师教我们汉语。|Thầy dạy chúng tôi tiếng Trung.
#五
我五岁。|Tôi năm tuổi.
现在五点。|Bây giờ là năm giờ.
我买了五个苹果。|Tôi mua năm quả táo.
五月很热。|Tháng năm rất nóng.
这个五十块。|Cái này năm mươi tệ.
#午饭
你吃午饭了吗？|Bạn ăn trưa chưa?
我们十二点吃午饭。|Mười hai giờ chúng tôi ăn trưa.
午饭我吃了面条儿。|Bữa trưa tôi ăn mì.
今天的午饭很好吃。|Bữa trưa hôm nay rất ngon.
我在学校吃午饭。|Tôi ăn trưa ở trường.
#洗
请洗手。|Hãy rửa tay.
我洗衣服。|Tôi giặt quần áo.
你洗好了吗？|Bạn rửa xong chưa?
吃饭前要洗手。|Trước khi ăn phải rửa tay.
妈妈在洗菜。|Mẹ đang rửa rau.
#洗手间
洗手间在哪儿？|Nhà vệ sinh ở đâu?
我去一下洗手间。|Tôi đi nhà vệ sinh một chút.
洗手间在二楼。|Nhà vệ sinh ở tầng hai.
这儿有洗手间吗？|Ở đây có nhà vệ sinh không?
洗手间很干净。|Nhà vệ sinh rất sạch.
#喜欢
我喜欢看书。|Tôi thích đọc sách.
你喜欢什么颜色？|Bạn thích màu gì?
我不喜欢喝咖啡。|Tôi không thích uống cà phê.
她很喜欢这个歌。|Cô ấy rất thích bài hát này.
你喜欢北京吗？|Bạn có thích Bắc Kinh không?
#西
太阳从西边下去。|Mặt trời lặn ở phía tây.
往西走十分钟就到。|Đi về phía tây mười phút là đến.
我家在学校西边。|Nhà tôi ở phía tây trường học.
西门在哪儿？|Cổng tây ở đâu?
学校在路西。|Trường ở phía tây con đường.
#西边
商店在学校西边。|Cửa hàng ở phía tây trường học.
西边有一个公园。|Phía tây có một công viên.
我家在火车站西边。|Nhà tôi ở phía tây ga tàu.
你往西边看。|Bạn nhìn về phía tây xem.
西边的房间很热。|Phòng phía tây rất nóng.
#下
书在桌子下。|Sách ở dưới gầm bàn.
我们下个星期考试。|Tuần sau chúng tôi thi.
下雨了。|Mưa rồi.
他下楼了。|Anh ấy xuống lầu rồi.
请坐下。|Mời ngồi xuống.
#下班
我五点下班。|Năm giờ tôi tan làm.
下班以后我们去吃饭吧。|Tan làm xong chúng ta đi ăn cơm nhé.
你几点下班？|Mấy giờ bạn tan làm?
爸爸还没下班。|Bố vẫn chưa tan làm.
下班的路上我买了水果。|Trên đường tan làm tôi mua hoa quả.
#下边
猫在桌子下边。|Con mèo ở dưới gầm bàn.
楼下边有一个商店。|Dưới tòa nhà có một cửa hàng.
请看下边的问题。|Hãy xem câu hỏi bên dưới.
下边是我的名字。|Phía dưới là tên của tôi.
树下边很凉快。|Dưới gốc cây rất mát.
#下车
我们在这儿下车。|Chúng ta xuống xe ở đây.
请在前边下车。|Xin xuống xe ở phía trước.
下车的时候小心。|Lúc xuống xe hãy cẩn thận.
你在哪儿下车？|Bạn xuống xe ở đâu?
到了，下车吧！|Đến rồi, xuống xe thôi!
#下次
下次见！|Lần sau gặp nhé!
下次我请你吃饭。|Lần sau tôi mời bạn ăn cơm.
下次别忘了。|Lần sau đừng quên nhé.
下次你什么时候来？|Lần sau khi nào bạn đến?
这次不行，下次吧。|Lần này không được, để lần sau nhé.
#下课
下课了！|Tan học rồi!
下课以后我们去打球。|Tan học xong chúng ta đi chơi bóng.
几点下课？|Mấy giờ tan học?
下课的时候老师给我们作业。|Lúc tan học thầy giao bài tập cho chúng tôi.
还有五分钟下课。|Còn năm phút nữa là tan học.
#下午
下午我去图书馆。|Buổi chiều tôi đến thư viện.
明天下午你有时间吗？|Chiều mai bạn có thời gian không?
下午三点开会。|Ba giờ chiều họp.
今天下午很热。|Chiều nay rất nóng.
我每天下午跑步。|Chiều nào tôi cũng chạy bộ.
#下雨
下雨了，别出去。|Mưa rồi, đừng ra ngoài.
明天会下雨吗？|Mai có mưa không?
外边在下雨。|Bên ngoài đang mưa.
下雨的时候我在家看书。|Khi trời mưa tôi ở nhà đọc sách.
昨天下了一天雨。|Hôm qua mưa cả ngày.
#先
你先走吧。|Bạn đi trước đi.
我先吃饭，然后写作业。|Tôi ăn cơm trước, sau đó làm bài tập.
先洗手再吃饭。|Rửa tay trước rồi mới ăn.
他先到了。|Anh ấy đến trước rồi.
我们先休息一下吧。|Chúng ta nghỉ một chút trước đã.
#先生
王先生，你好！|Chào anh Vương!
这位先生是我的老师。|Vị này là thầy giáo của tôi.
先生，您要喝什么？|Thưa ông, ông muốn uống gì?
她先生是医生。|Chồng cô ấy là bác sĩ.
李先生不在家。|Anh Lý không có ở nhà.
#现在
现在几点？|Bây giờ mấy giờ?
我现在很忙。|Bây giờ tôi rất bận.
你现在在哪儿？|Bây giờ bạn đang ở đâu?
现在开始上课。|Bây giờ bắt đầu vào học.
他现在是大学生了。|Bây giờ anh ấy là sinh viên rồi.
#想
我想喝水。|Tôi muốn uống nước.
你想去哪儿？|Bạn muốn đi đâu?
我很想妈妈。|Tôi rất nhớ mẹ.
让我想一想。|Để tôi nghĩ đã.
我想他明天会来。|Tôi nghĩ mai anh ấy sẽ đến.
#小
这个房间很小。|Căn phòng này rất nhỏ.
我妹妹比我小。|Em gái nhỏ hơn tôi.
小王是我的同学。|Tiểu Vương là bạn học của tôi.
我有一只小狗。|Tôi có một con chó nhỏ.
声音太小了。|Âm thanh nhỏ quá.
#小孩儿
那个小孩儿很可爱。|Đứa trẻ kia rất đáng yêu.
小孩儿们在外边玩儿。|Bọn trẻ đang chơi bên ngoài.
小孩儿不能喝咖啡。|Trẻ con không được uống cà phê.
你有小孩儿吗？|Bạn có con nhỏ không?
这个小孩儿几岁了？|Đứa trẻ này mấy tuổi rồi?
#小姐
小姐，请给我菜单。|Chị ơi, cho tôi xin thực đơn.
王小姐是我的同事。|Cô Vương là đồng nghiệp của tôi.
那位小姐是谁？|Cô kia là ai?
小姐，这个多少钱？|Chị ơi, cái này bao nhiêu tiền?
李小姐在吗？|Cô Lý có ở đây không?
#小朋友
小朋友，你几岁了？|Bé ơi, con mấy tuổi rồi?
小朋友们，你们好！|Chào các bạn nhỏ!
这个小朋友很聪明。|Bạn nhỏ này rất thông minh.
小朋友们在唱歌。|Các bạn nhỏ đang hát.
公园里有很多小朋友。|Trong công viên có nhiều trẻ em.
#小时
我每天睡八个小时。|Mỗi ngày tôi ngủ tám tiếng.
我等了你一个小时。|Tôi đã đợi bạn một tiếng.
从这儿到北京要两个小时。|Từ đây đến Bắc Kinh mất hai tiếng.
我每天学习三个小时汉语。|Mỗi ngày tôi học tiếng Trung ba tiếng.
半个小时以后见。|Nửa tiếng nữa gặp nhé.
#小学
我弟弟在上小学。|Em trai tôi đang học tiểu học.
我家旁边有一个小学。|Cạnh nhà tôi có một trường tiểu học.
我妈妈是小学老师。|Mẹ tôi là giáo viên tiểu học.
这个小学很大。|Trường tiểu học này rất lớn.
你在哪个小学上学？|Bạn học trường tiểu học nào?
#小学生
我妹妹是小学生。|Em gái tôi là học sinh tiểu học.
小学生八点上课。|Học sinh tiểu học vào học lúc tám giờ.
这些小学生很可爱。|Những học sinh tiểu học này rất đáng yêu.
小学生要早点儿睡觉。|Học sinh tiểu học phải ngủ sớm.
他还是一个小学生。|Cậu ấy vẫn còn là học sinh tiểu học.
#笑
她笑了。|Cô ấy cười rồi.
你笑什么？|Bạn cười gì vậy?
他很爱笑。|Anh ấy rất hay cười.
别笑我！|Đừng cười tôi!
看到妈妈，孩子笑了。|Thấy mẹ, đứa bé cười.
#写
请写你的名字。|Hãy viết tên của bạn.
这个字怎么写？|Chữ này viết thế nào?
我在写作业。|Tôi đang làm bài tập.
他写汉字写得很好。|Cậu ấy viết chữ Hán rất đẹp.
我给朋友写了一封信。|Tôi viết một lá thư cho bạn.
#谢谢
谢谢你！|Cảm ơn bạn!
谢谢，不用了。|Cảm ơn, không cần đâu.
谢谢你的帮助。|Cảm ơn sự giúp đỡ của bạn.
谢谢老师！|Cảm ơn thầy cô!
非常谢谢！|Vô cùng cảm ơn!
#新
这是我的新手机。|Đây là điện thoại mới của tôi.
他是新同学。|Cậu ấy là học sinh mới.
我买了一件新衣服。|Tôi mua một bộ quần áo mới.
新的一年开始了。|Một năm mới bắt đầu rồi.
这个房子很新。|Ngôi nhà này rất mới.
#新年
新年快乐！|Chúc mừng năm mới!
新年你回家吗？|Năm mới bạn có về nhà không?
新年的时候我们一起吃饭。|Dịp năm mới chúng tôi cùng ăn cơm.
新年我想去北京。|Năm mới tôi muốn đi Bắc Kinh.
祝你新年快乐！|Chúc bạn năm mới vui vẻ!
#星期
今天星期几？|Hôm nay thứ mấy?
一个星期有七天。|Một tuần có bảy ngày.
我下个星期去北京。|Tuần sau tôi đi Bắc Kinh.
今天星期一。|Hôm nay thứ hai.
我们每个星期上五天课。|Mỗi tuần chúng tôi học năm ngày.
#星期日
星期日我在家休息。|Chủ nhật tôi ở nhà nghỉ ngơi.
这个星期日你有时间吗？|Chủ nhật này bạn có thời gian không?
星期日商店人很多。|Chủ nhật cửa hàng rất đông người.
星期日我们去爬山吧。|Chủ nhật chúng ta đi leo núi nhé.
星期日不上课。|Chủ nhật không có tiết.
#星期天
星期天你干什么？|Chủ nhật bạn làm gì?
星期天我去看奶奶。|Chủ nhật tôi đi thăm bà.
今天是星期天。|Hôm nay là chủ nhật.
星期天我起床很晚。|Chủ nhật tôi dậy rất muộn.
我们星期天见吧。|Chủ nhật gặp nhau nhé.
#行
行，我们走吧。|Được, chúng ta đi thôi.
这样行吗？|Như thế này được không?
不行，太贵了。|Không được, đắt quá.
他汉语很行。|Tiếng Trung của anh ấy rất giỏi.
明天去也行。|Mai đi cũng được.
#休息
你累了，休息一下吧。|Bạn mệt rồi, nghỉ một chút đi.
星期天我在家休息。|Chủ nhật tôi ở nhà nghỉ ngơi.
医生让我多休息。|Bác sĩ bảo tôi nghỉ ngơi nhiều.
我们休息十分钟。|Chúng ta nghỉ mười phút.
他在房间里休息。|Anh ấy đang nghỉ trong phòng.
#学
我在学汉语。|Tôi đang học tiếng Trung.
你学了多长时间？|Bạn học bao lâu rồi?
我想学开车。|Tôi muốn học lái xe.
他学得很快。|Anh ấy học rất nhanh.
我跟妈妈学做饭。|Tôi học nấu ăn với mẹ.
#学生
我是学生。|Tôi là học sinh.
我们学校有很多学生。|Trường chúng tôi có rất nhiều học sinh.
他是我的学生。|Cậu ấy là học sinh của tôi.
学生们都来了。|Các học sinh đều đến rồi.
你是哪个学校的学生？|Bạn là học sinh trường nào?
#学习
我喜欢学习汉语。|Tôi thích học tiếng Trung.
他学习很认真。|Cậu ấy học rất chăm chỉ.
我们一起学习吧。|Chúng ta cùng học nhé.
你在哪儿学习？|Bạn học ở đâu?
学习很重要。|Học tập rất quan trọng.
#学校
我们学校很大。|Trường chúng tôi rất lớn.
我每天去学校。|Ngày nào tôi cũng đến trường.
学校在我家旁边。|Trường ở cạnh nhà tôi.
学校里有很多树。|Trong trường có nhiều cây.
你的学校叫什么名字？|Trường của bạn tên là gì?
#学院
我在外语学院学习。|Tôi học ở học viện ngoại ngữ.
这个学院有很多外国学生。|Học viện này có nhiều sinh viên nước ngoài.
学院的图书馆很大。|Thư viện của học viện rất lớn.
你是哪个学院的？|Bạn học ở học viện nào?
我哥哥在学院当老师。|Anh tôi làm giáo viên ở học viện.
#要
我要一杯咖啡。|Tôi muốn một cốc cà phê.
你要去哪儿？|Bạn định đi đâu?
要下雨了。|Sắp mưa rồi.
明天我要上班。|Mai tôi phải đi làm.
学汉语要多说。|Học tiếng Trung cần nói nhiều.
#也
我也是学生。|Tôi cũng là học sinh.
他也喜欢喝茶。|Anh ấy cũng thích uống trà.
我也想去。|Tôi cũng muốn đi.
今天不冷也不热。|Hôm nay không lạnh cũng không nóng.
你也来吧。|Bạn cũng đến đi.
#页
请看第十页。|Hãy xem trang mười.
这本书有三百页。|Quyển sách này có ba trăm trang.
今天我们学到第二十页。|Hôm nay chúng ta học đến trang hai mươi.
我看了五十页。|Tôi đã đọc năm mươi trang.
这一页很难。|Trang này rất khó.
#爷爷
我爷爷八十岁了。|Ông nội tôi tám mươi tuổi rồi.
爷爷每天早上跑步。|Sáng nào ông cũng chạy bộ.
爷爷，您喝茶吗？|Ông ơi, ông uống trà không ạ?
我很爱我的爷爷。|Tôi rất yêu ông nội.
爷爷和奶奶住在一起。|Ông và bà sống cùng nhau.
#一
我有一个哥哥。|Tôi có một anh trai.
一年有十二个月。|Một năm có mười hai tháng.
我们一起去吧。|Chúng ta cùng đi nhé.
今天是一月一号。|Hôm nay là ngày 1 tháng 1.
请等一下。|Xin đợi một chút.
#一半
我吃了一半。|Tôi ăn một nửa rồi.
我们班一半是女生。|Một nửa lớp chúng tôi là nữ.
这个苹果给你一半。|Quả táo này chia cho bạn một nửa.
作业我写了一半。|Bài tập tôi làm được một nửa.
一半的人去了。|Một nửa số người đã đi.
#一边
他一边吃饭一边看电视。|Anh ấy vừa ăn cơm vừa xem ti vi.
我喜欢一边听歌一边写作业。|Tôi thích vừa nghe nhạc vừa làm bài tập.
我们一边走一边说。|Chúng tôi vừa đi vừa nói chuyện.
她一边唱一边跳。|Cô ấy vừa hát vừa nhảy.
别一边开车一边打电话。|Đừng vừa lái xe vừa gọi điện.
#一点儿
请说慢一点儿。|Xin nói chậm một chút.
我会说一点儿汉语。|Tôi biết nói một chút tiếng Trung.
我想喝一点儿水。|Tôi muốn uống chút nước.
便宜一点儿吧。|Rẻ hơn chút đi.
今天好一点儿了吗？|Hôm nay đỡ hơn chút chưa?
#一会儿
请等一会儿。|Xin đợi một lát.
我一会儿就来。|Tôi đến ngay một lát nữa.
我们休息一会儿吧。|Chúng ta nghỉ một lát nhé.
他看了一会儿书。|Anh ấy đọc sách một lúc.
一会儿见！|Lát nữa gặp nhé!
#一块儿
我们一块儿去吧。|Chúng ta cùng đi nhé.
我和他一块儿吃饭。|Tôi ăn cơm cùng anh ấy.
他们一块儿学汉语。|Họ cùng nhau học tiếng Trung.
我们一块儿看电影吧。|Chúng ta cùng xem phim nhé.
你跟我们一块儿走吗？|Bạn đi cùng chúng tôi không?
#一起
我们一起去吧。|Chúng ta cùng đi nhé.
我和朋友一起学习。|Tôi học cùng bạn bè.
我们一起吃饭吧。|Chúng ta cùng ăn cơm nhé.
他们住在一起。|Họ sống cùng nhau.
你想跟我一起去吗？|Bạn muốn đi cùng tôi không?
#一下儿
请等一下儿。|Xin đợi một lát.
我看一下儿。|Để tôi xem một chút.
你来一下儿。|Bạn đến đây một chút.
我们休息一下儿吧。|Chúng ta nghỉ một lát nhé.
我介绍一下儿。|Để tôi giới thiệu một chút.
#一些
我买了一些水果。|Tôi mua một ít hoa quả.
他有一些中国朋友。|Anh ấy có vài người bạn Trung Quốc.
请喝一些水。|Mời uống chút nước.
我会写一些汉字。|Tôi biết viết một vài chữ Hán.
这些问题有一些难。|Những câu hỏi này hơi khó.
#一样
我跟他一样高。|Tôi cao bằng anh ấy.
这两个杯子一样。|Hai cái cốc này giống nhau.
我的书和你的不一样。|Sách của tôi khác của bạn.
今天跟昨天一样冷。|Hôm nay lạnh như hôm qua.
我们的爱好一样。|Sở thích của chúng ta giống nhau.
#衣服
我想买新衣服。|Tôi muốn mua quần áo mới.
这件衣服很漂亮。|Bộ quần áo này rất đẹp.
天冷了，多穿衣服。|Trời lạnh rồi, mặc thêm áo vào.
我在洗衣服。|Tôi đang giặt quần áo.
你的衣服是什么颜色的？|Quần áo của bạn màu gì?
#医生
我妈妈是医生。|Mẹ tôi là bác sĩ.
你应该去看医生。|Bạn nên đi khám bác sĩ.
医生说我没事儿。|Bác sĩ nói tôi không sao.
他想当医生。|Anh ấy muốn làm bác sĩ.
这位医生很好。|Vị bác sĩ này rất tốt.
#医院
我去医院看病。|Tôi đi bệnh viện khám bệnh.
医院在哪儿？|Bệnh viện ở đâu?
我妈妈在医院工作。|Mẹ tôi làm việc ở bệnh viện.
他生病了，在医院。|Anh ấy bị ốm, đang ở bệnh viện.
医院离这儿很近。|Bệnh viện cách đây rất gần.
#用
我可以用你的电脑吗？|Tôi có thể dùng máy tính của bạn không?
用汉语怎么说？|Nói bằng tiếng Trung thế nào?
我用手机买东西。|Tôi dùng điện thoại mua đồ.
不用谢。|Không cần cảm ơn.
这个东西怎么用？|Đồ này dùng thế nào?
#有
我有一个妹妹。|Tôi có một em gái.
你有时间吗？|Bạn có thời gian không?
桌子上有一本书。|Trên bàn có một quyển sách.
我们班有二十个学生。|Lớp chúng tôi có hai mươi học sinh.
这儿有洗手间吗？|Ở đây có nhà vệ sinh không?
#有的
有的同学去了，有的没去。|Có bạn đi, có bạn không đi.
有的人喜欢茶，有的人喜欢咖啡。|Có người thích trà, có người thích cà phê.
这些苹果有的大，有的小。|Những quả táo này có quả to, có quả nhỏ.
有的字很难写。|Có những chữ rất khó viết.
有的时候我很忙。|Có lúc tôi rất bận.
#有名
北京大学很有名。|Đại học Bắc Kinh rất nổi tiếng.
他是一个有名的医生。|Ông ấy là một bác sĩ nổi tiếng.
这个饭店很有名。|Nhà hàng này rất nổi tiếng.
这是一首有名的歌。|Đây là một bài hát nổi tiếng.
这儿最有名的菜是什么？|Món nổi tiếng nhất ở đây là gì?
#有时
我有时在家吃饭，有时在外边吃。|Có lúc tôi ăn ở nhà, có lúc ăn ở ngoài.
他有时来，有时不来。|Có lúc anh ấy đến, có lúc không.
有时我会忘记。|Có lúc tôi sẽ quên.
我有时坐车，有时走路。|Có lúc tôi đi xe, có lúc đi bộ.
这儿有时很热。|Ở đây có lúc rất nóng.
#有时候
有时候我很忙。|Có khi tôi rất bận.
有时候我们一起打球。|Đôi khi chúng tôi cùng chơi bóng.
有时候他不吃早饭。|Đôi khi anh ấy không ăn sáng.
我有时候会想家。|Có lúc tôi nhớ nhà.
有时候下雨，有时候晴天。|Lúc thì mưa, lúc thì nắng.
#有些
有些人不喜欢吃肉。|Một số người không thích ăn thịt.
有些字我不认识。|Có một số chữ tôi không biết.
我有些累了。|Tôi hơi mệt rồi.
今天有些冷。|Hôm nay hơi lạnh.
有些问题很难。|Có một số câu hỏi rất khó.
#有一些
我有一些问题。|Tôi có vài câu hỏi.
家里有一些水果。|Trong nhà có một ít hoa quả.
我有一些中国朋友。|Tôi có vài người bạn Trung Quốc.
这个菜有一些辣。|Món này hơi cay.
他有一些不高兴。|Anh ấy hơi không vui.
#有用
这本书很有用。|Quyển sách này rất có ích.
学汉语很有用。|Học tiếng Trung rất có ích.
你说的话对我很有用。|Lời bạn nói rất có ích với tôi.
这个东西没有用。|Đồ này không có tác dụng.
手机很有用。|Điện thoại rất hữu ích.
#右
请往右走。|Xin đi sang phải.
右手边是银行。|Bên tay phải là ngân hàng.
前边路口往右。|Đến ngã tư phía trước rẽ phải.
我的右手疼。|Tay phải tôi đau.
你左右看看再过马路。|Bạn nhìn trái nhìn phải rồi hãy qua đường.
#右边
书店在学校右边。|Hiệu sách ở bên phải trường.
请坐我右边。|Mời ngồi bên phải tôi.
右边那个人是我哥哥。|Người bên phải kia là anh trai tôi.
洗手间在右边。|Nhà vệ sinh ở bên phải.
你往右边走。|Bạn đi về bên phải.
#雨
外边下雨了。|Bên ngoài mưa rồi.
雨很大。|Mưa rất to.
昨天的雨下了一天。|Trận mưa hôm qua kéo dài cả ngày.
雨停了，我们走吧。|Mưa tạnh rồi, chúng ta đi thôi.
这儿夏天雨很多。|Ở đây mùa hè mưa nhiều.
#元
这本书三十元。|Quyển sách này ba mươi tệ.
一共一百元。|Tổng cộng một trăm tệ.
门票五十元一张。|Vé vào cửa năm mươi tệ một tấm.
这个手机两千元。|Chiếc điện thoại này hai nghìn tệ.
我有二十元钱。|Tôi có hai mươi tệ.
#远
我家离学校很远。|Nhà tôi cách trường rất xa.
机场远吗？|Sân bay có xa không?
不远，走路五分钟。|Không xa, đi bộ năm phút.
他住得很远。|Anh ấy sống rất xa.
北京离河内很远。|Bắc Kinh cách Hà Nội rất xa.
#月
今天是十月二十六号。|Hôm nay là ngày 26 tháng 10.
一年有十二个月。|Một năm có mười hai tháng.
我下个月去北京。|Tháng sau tôi đi Bắc Kinh.
我学了三个月汉语。|Tôi học tiếng Trung ba tháng.
今天的月亮很大。|Mặt trăng hôm nay rất to.
#再
请再说一次。|Xin nói lại lần nữa.
明天再来吧。|Mai lại đến nhé.
我想再喝一杯。|Tôi muốn uống thêm một cốc nữa.
吃了饭再走吧。|Ăn cơm xong rồi hãy đi.
再见！|Tạm biệt!
#再见
老师，再见！|Tạm biệt thầy!
再见，明天见！|Tạm biệt, mai gặp nhé!
我们说再见吧。|Chúng ta chào tạm biệt thôi.
再见，路上小心。|Tạm biệt, đi đường cẩn thận.
他没说再见就走了。|Anh ấy đi mà không chào tạm biệt.
#在
我在家。|Tôi ở nhà.
他在学校学习。|Anh ấy học ở trường.
你的书在桌子上。|Sách của bạn ở trên bàn.
妈妈在做饭。|Mẹ đang nấu cơm.
王老师在吗？|Thầy Vương có ở đây không?
#在家
我今天在家。|Hôm nay tôi ở nhà.
你在家吗？|Bạn có ở nhà không?
他不在家。|Anh ấy không có ở nhà.
星期天我在家休息。|Chủ nhật tôi ở nhà nghỉ ngơi.
在家吃饭比在外边吃便宜。|Ăn ở nhà rẻ hơn ăn ở ngoài.
#早
你早！|Chào buổi sáng!
今天我起得很早。|Hôm nay tôi dậy rất sớm.
现在还早。|Bây giờ vẫn còn sớm.
你早点儿睡觉吧。|Bạn ngủ sớm đi.
他早就走了。|Anh ấy đi từ lâu rồi.
#早饭
你吃早饭了吗？|Bạn ăn sáng chưa?
我早饭吃包子。|Bữa sáng tôi ăn bánh bao.
早饭很重要。|Bữa sáng rất quan trọng.
我七点吃早饭。|Bảy giờ tôi ăn sáng.
妈妈在做早饭。|Mẹ đang làm bữa sáng.
#早上
早上好！|Chào buổi sáng!
我早上六点起床。|Sáu giờ sáng tôi dậy.
早上我喝牛奶。|Buổi sáng tôi uống sữa.
明天早上我们去跑步吧。|Sáng mai chúng ta đi chạy bộ nhé.
早上的空气很好。|Không khí buổi sáng rất trong lành.
#怎么
这个字怎么读？|Chữ này đọc thế nào?
去火车站怎么走？|Đi ga tàu đi thế nào?
你怎么不去？|Sao bạn không đi?
你怎么了？|Bạn sao thế?
这个用汉语怎么说？|Cái này nói bằng tiếng Trung thế nào?
#站
请站起来。|Mời đứng dậy.
他站在门口。|Anh ấy đứng ở cửa.
下一站是北京站。|Ga tiếp theo là ga Bắc Kinh.
我在车站等你。|Tôi đợi bạn ở bến xe.
坐三站就到了。|Đi ba bến là đến.
#找
你找谁？|Bạn tìm ai?
我在找我的手机。|Tôi đang tìm điện thoại.
他找工作找了很久。|Anh ấy tìm việc rất lâu.
有人找你。|Có người tìm bạn.
我找你十块钱。|Tôi trả lại bạn mười tệ.
#找到
我找到我的书了。|Tôi tìm thấy sách rồi.
你找到工作了吗？|Bạn tìm được việc chưa?
我没找到他。|Tôi không tìm thấy anh ấy.
终于找到了！|Cuối cùng cũng tìm thấy rồi!
你在哪儿找到的？|Bạn tìm thấy ở đâu?
#这
这是我的书。|Đây là sách của tôi.
这个多少钱？|Cái này bao nhiêu tiền?
这是我妈妈。|Đây là mẹ tôi.
这本书很好看。|Quyển sách này rất hay.
这几天很冷。|Mấy hôm nay rất lạnh.
#这边
请到这边来。|Mời qua bên này.
这边人很少。|Bên này rất ít người.
我在这边等你。|Tôi đợi bạn ở bên này.
这边是男生，那边是女生。|Bên này là nam, bên kia là nữ.
你们这边天气怎么样？|Bên các bạn thời tiết thế nào?
#这儿
请坐这儿。|Mời ngồi đây.
这儿是我的家。|Đây là nhà tôi.
这儿的菜很好吃。|Món ăn ở đây rất ngon.
我在这儿等你。|Tôi đợi bạn ở đây.
你来过这儿吗？|Bạn từng đến đây chưa?
#这里
这里是北京。|Đây là Bắc Kinh.
这里的人很热情。|Người ở đây rất nhiệt tình.
我在这里住了三年。|Tôi sống ở đây ba năm.
这里能上网吗？|Ở đây lên mạng được không?
请把东西放在这里。|Hãy để đồ ở đây.
#这些
这些是我的书。|Đây là những quyển sách của tôi.
这些苹果很好吃。|Những quả táo này rất ngon.
这些人都是我的同学。|Những người này đều là bạn học của tôi.
这些字你都认识吗？|Những chữ này bạn đều biết à?
这些衣服多少钱？|Những bộ quần áo này bao nhiêu tiền?
#着
门开着。|Cửa đang mở.
他穿着一件白衣服。|Anh ấy đang mặc một bộ đồ trắng.
她笑着说：“你好！”|Cô ấy cười nói: “Xin chào!”
桌子上放着一本书。|Trên bàn đặt một quyển sách.
他坐着看书。|Anh ấy ngồi đọc sách.
#真
今天真冷！|Hôm nay lạnh thật!
你真好！|Bạn tốt thật!
这个菜真好吃。|Món này ngon thật.
她唱得真好听。|Cô ấy hát hay thật.
你说的是真话吗？|Bạn nói thật chứ?
#真的
真的吗？|Thật sao?
我真的不知道。|Tôi thật sự không biết.
这是真的。|Chuyện này là thật.
他真的来了。|Anh ấy thật sự đến rồi.
我真的很喜欢你。|Tôi thật sự rất thích bạn.
#正
他正在吃饭。|Anh ấy đang ăn cơm.
我正想给你打电话。|Tôi đang định gọi cho bạn.
现在正是八点。|Bây giờ đúng tám giờ.
他正看书呢。|Anh ấy đang đọc sách.
你来得正好！|Bạn đến đúng lúc lắm!
#正在
我正在写作业。|Tôi đang làm bài tập.
他正在打电话。|Anh ấy đang gọi điện thoại.
妈妈正在做饭。|Mẹ đang nấu cơm.
外边正在下雨。|Bên ngoài đang mưa.
你正在做什么？|Bạn đang làm gì?
#知道
我知道。|Tôi biết.
你知道他的名字吗？|Bạn biết tên anh ấy không?
我不知道怎么走。|Tôi không biết đi thế nào.
谁知道答案？|Ai biết đáp án?
我知道了，谢谢！|Tôi biết rồi, cảm ơn!
#知识
读书可以学到很多知识。|Đọc sách có thể học được nhiều kiến thức.
他的知识很多。|Anh ấy có rất nhiều kiến thức.
这本书里有很多有用的知识。|Quyển sách này có nhiều kiến thức hữu ích.
知识很重要。|Kiến thức rất quan trọng.
我想学习新知识。|Tôi muốn học kiến thức mới.
#中
我在中国学习。|Tôi học ở Trung Quốc.
他是中学老师。|Anh ấy là giáo viên trung học.
在学习中，我认识了很多朋友。|Trong quá trình học, tôi quen nhiều bạn.
房间中有一张桌子。|Trong phòng có một cái bàn.
这三个人中，他最高。|Trong ba người này, anh ấy cao nhất.
#中国
我想去中国。|Tôi muốn đi Trung Quốc.
中国很大。|Trung Quốc rất rộng lớn.
他是中国人。|Anh ấy là người Trung Quốc.
我喜欢中国菜。|Tôi thích món Trung Quốc.
你去过中国吗？|Bạn đã từng đến Trung Quốc chưa?
#中间
请坐中间。|Mời ngồi ở giữa.
学校在银行和医院中间。|Trường ở giữa ngân hàng và bệnh viện.
中间那个人是我爸爸。|Người ở giữa là bố tôi.
我坐在他们中间。|Tôi ngồi giữa họ.
桌子中间有一个杯子。|Giữa bàn có một cái cốc.
#中文
你会说中文吗？|Bạn biết nói tiếng Trung không?
这是中文书。|Đây là sách tiếng Trung.
我在学中文。|Tôi đang học tiếng Trung.
请用中文写你的名字。|Hãy viết tên bạn bằng tiếng Trung.
他的中文很好。|Tiếng Trung của anh ấy rất tốt.
#中午
中午我在学校吃饭。|Buổi trưa tôi ăn cơm ở trường.
中午你回家吗？|Buổi trưa bạn có về nhà không?
中午十二点见。|Mười hai giờ trưa gặp nhé.
中午很热。|Buổi trưa rất nóng.
我中午睡一会儿。|Buổi trưa tôi ngủ một lát.
#中学
我在中学学习。|Tôi học ở trường trung học.
我家旁边有一个中学。|Cạnh nhà tôi có một trường trung học.
他是中学老师。|Anh ấy là giáo viên trung học.
这个中学很有名。|Trường trung học này rất nổi tiếng.
你在哪个中学？|Bạn học trường trung học nào?
#中学生
我是中学生。|Tôi là học sinh trung học.
中学生每天都很忙。|Học sinh trung học ngày nào cũng rất bận.
我弟弟是中学生。|Em trai tôi là học sinh trung học.
这些中学生在打球。|Những học sinh trung học này đang chơi bóng.
中学生要多读书。|Học sinh trung học nên đọc sách nhiều.
#重
这个包很重。|Cái túi này rất nặng.
你多重？|Bạn nặng bao nhiêu?
这本书不重。|Quyển sách này không nặng.
太重了，我拿不了。|Nặng quá, tôi cầm không nổi.
他的病很重。|Bệnh của anh ấy rất nặng.
#重要
学习很重要。|Học tập rất quan trọng.
身体最重要。|Sức khỏe là quan trọng nhất.
这是一个重要的问题。|Đây là một vấn đề quan trọng.
今天的会很重要。|Cuộc họp hôm nay rất quan trọng.
这个不重要。|Cái này không quan trọng.
#住
你住在哪儿？|Bạn sống ở đâu?
我住在北京。|Tôi sống ở Bắc Kinh.
他住在三楼。|Anh ấy ở tầng ba.
我在这儿住了两年。|Tôi sống ở đây hai năm.
我们住在一起。|Chúng tôi sống cùng nhau.
#准备
我在准备考试。|Tôi đang ôn thi.
你准备好了吗？|Bạn chuẩn bị xong chưa?
妈妈在准备晚饭。|Mẹ đang chuẩn bị bữa tối.
我准备明天去北京。|Tôi định mai đi Bắc Kinh.
你准备什么时候回国？|Bạn định khi nào về nước?
#桌子
书在桌子上。|Sách ở trên bàn.
这张桌子很大。|Cái bàn này rất to.
我的桌子很干净。|Bàn của tôi rất sạch.
请把杯子放在桌子上。|Hãy đặt cốc lên bàn.
桌子下边有一只猫。|Dưới gầm bàn có một con mèo.
#字
这个字怎么读？|Chữ này đọc thế nào?
我认识这个字。|Tôi biết chữ này.
他的字写得很好。|Chữ của anh ấy viết rất đẹp.
请写大一点儿的字。|Hãy viết chữ to hơn chút.
今天我学了十个字。|Hôm nay tôi học mười chữ.
#子
孩子在家。|Đứa trẻ ở nhà.
我买了一个本子。|Tôi mua một quyển vở.
这个杯子很好看。|Cái cốc này rất đẹp.
桌子上有一个包子。|Trên bàn có một cái bánh bao.
他是我的儿子。|Nó là con trai tôi.
#走
我们走吧。|Chúng ta đi thôi.
他走了。|Anh ấy đi rồi.
你走得太快了。|Bạn đi nhanh quá.
往前走就是学校。|Đi thẳng phía trước là trường học.
去火车站怎么走？|Đi ga tàu đi thế nào?
#走路
我走路去学校。|Tôi đi bộ đến trường.
走路要十分钟。|Đi bộ mất mười phút.
我们走路去吧，不远。|Chúng ta đi bộ đi, không xa.
走路对身体好。|Đi bộ tốt cho sức khỏe.
他走路很快。|Anh ấy đi bộ rất nhanh.
#最
我最喜欢夏天。|Tôi thích mùa hè nhất.
他是我们班最高的。|Cậu ấy cao nhất lớp chúng tôi.
这个菜最好吃。|Món này ngon nhất.
你最喜欢什么颜色？|Bạn thích màu gì nhất?
我最近很忙。|Dạo này tôi rất bận.
#最好
你最好早点儿睡觉。|Tốt nhất là bạn ngủ sớm.
这是最好的饭店。|Đây là nhà hàng tốt nhất.
你最好别去。|Tốt nhất là bạn đừng đi.
他是我最好的朋友。|Anh ấy là bạn thân nhất của tôi.
下雨了，最好带伞。|Mưa rồi, tốt nhất nên mang ô.
#最后
最后一个问题。|Câu hỏi cuối cùng.
他是最后一个到的。|Anh ấy là người đến cuối cùng.
最后我们去了北京。|Cuối cùng chúng tôi đã đi Bắc Kinh.
这是最后一次。|Đây là lần cuối cùng.
最后，谢谢大家！|Cuối cùng, cảm ơn mọi người!
#昨天
昨天我去了商店。|Hôm qua tôi đi cửa hàng.
昨天是星期天。|Hôm qua là chủ nhật.
昨天很冷。|Hôm qua rất lạnh.
你昨天去哪儿了？|Hôm qua bạn đi đâu?
昨天我没去学校。|Hôm qua tôi không đi học.
#左
请往左走。|Xin đi sang trái.
左手边是书店。|Bên tay trái là hiệu sách.
前边路口往左。|Đến ngã tư phía trước rẽ trái.
我用左手写字。|Tôi viết bằng tay trái.
他坐在我左面。|Anh ấy ngồi bên trái tôi.
#左边
书店在银行左边。|Hiệu sách ở bên trái ngân hàng.
请坐我左边。|Mời ngồi bên trái tôi.
左边那个人是谁？|Người bên trái kia là ai?
洗手间在左边。|Nhà vệ sinh ở bên trái.
我家在学校左边。|Nhà tôi ở bên trái trường học.
#坐
请坐。|Mời ngồi.
我坐飞机去北京。|Tôi đi máy bay đến Bắc Kinh.
他坐在我旁边。|Anh ấy ngồi cạnh tôi.
我们坐出租车去吧。|Chúng ta đi taxi nhé.
你坐这儿吧。|Bạn ngồi đây đi.
#坐下
请坐下。|Mời ngồi xuống.
大家坐下吧。|Mọi người ngồi xuống đi.
他坐下看书。|Anh ấy ngồi xuống đọc sách.
坐下休息一会儿吧。|Ngồi xuống nghỉ một lát đi.
我刚坐下，电话就来了。|Tôi vừa ngồi xuống thì điện thoại reo.
#做
你在做什么？|Bạn đang làm gì?
妈妈在做饭。|Mẹ đang nấu cơm.
我做完作业了。|Tôi làm xong bài tập rồi.
你做什么工作？|Bạn làm nghề gì?
这个菜是我做的。|Món này là tôi nấu.
`;
export const EXAMPLES1 = {};
let cur = null;
for (const line of RAW.split('\n')) {
  if (!line.trim()) continue;
  if (line[0] === '#') { cur = line.slice(1).trim(); EXAMPLES1[cur] = []; continue; }
  const i = line.indexOf('|');
  EXAMPLES1[cur].push([line.slice(0, i), line.slice(i + 1)]);
}
