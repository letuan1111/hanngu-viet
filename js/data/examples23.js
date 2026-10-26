// 5 câu ví dụ cho mỗi từ HSK 3.0 cấp 2–3 chưa có đủ ví dụ (1389 từ). Định dạng: "#từ" rồi 5 dòng "câu Trung|nghĩa Việt".
const RAW = `
#爱人
这是我爱人。|Đây là vợ (chồng) tôi.
我爱人是医生。|Vợ tôi là bác sĩ.
你爱人在哪儿工作？|Vợ (chồng) bạn làm việc ở đâu?
我和爱人一起去旅游。|Tôi đi du lịch cùng vợ.
他爱人做饭做得很好。|Vợ anh ấy nấu ăn rất ngon.
#安全
路上注意安全。|Trên đường chú ý an toàn.
这里很安全。|Ở đây rất an toàn.
晚上一个人出去不安全。|Buổi tối ra ngoài một mình không an toàn.
安全是最重要的。|An toàn là quan trọng nhất.
到家以后告诉我你安全到了。|Về đến nhà báo tôi biết bạn đã về an toàn.
#白色
我喜欢白色。|Tôi thích màu trắng.
她穿着一件白色的衣服。|Cô ấy mặc một bộ quần áo màu trắng.
白色的车很好看。|Xe màu trắng rất đẹp.
墙是白色的。|Tường màu trắng.
你有白色的吗？|Bạn có màu trắng không?
#班长
他是我们的班长。|Cậu ấy là lớp trưởng của chúng tôi.
班长让大家安静。|Lớp trưởng bảo mọi người giữ trật tự.
你想当班长吗？|Bạn có muốn làm lớp trưởng không?
有问题可以找班长。|Có vấn đề có thể tìm lớp trưởng.
我们选她当班长。|Chúng tôi chọn cô ấy làm lớp trưởng.
#办
这件事我来办。|Việc này để tôi làm.
你去办护照了吗？|Bạn đi làm hộ chiếu chưa?
事情办好了。|Việc làm xong rồi.
怎么办？|Làm sao bây giờ?
他办事很认真。|Anh ấy làm việc rất cẩn thận.
#办公室
我在办公室。|Tôi đang ở văn phòng.
老师的办公室在二楼。|Văn phòng của thầy ở tầng hai.
请到我办公室来一下。|Mời đến văn phòng tôi một chút.
办公室里有五个人。|Trong văn phòng có năm người.
办公室很干净。|Văn phòng rất sạch sẽ.
#半夜
他半夜才回家。|Nửa đêm anh ấy mới về nhà.
半夜别打电话。|Đừng gọi điện lúc nửa đêm.
我半夜醒了。|Tôi tỉnh dậy lúc nửa đêm.
半夜外面很安静。|Nửa đêm bên ngoài rất yên tĩnh.
孩子半夜哭了。|Đứa bé khóc lúc nửa đêm.
#饱
我吃饱了。|Tôi ăn no rồi.
你吃饱了吗？|Bạn ăn no chưa?
我还没吃饱。|Tôi vẫn chưa no.
吃得太饱了。|Ăn no quá.
喝了很多水，现在很饱。|Uống nhiều nước, giờ no lắm.
#报名
你报名了吗？|Bạn đăng ký chưa?
我报名参加比赛。|Tôi đăng ký tham gia cuộc thi.
在网上就可以报名。|Có thể đăng ký trên mạng.
报名的人很多。|Người đăng ký rất đông.
明天是最后一天报名。|Mai là ngày đăng ký cuối cùng.
#报纸
爸爸每天看报纸。|Bố ngày nào cũng đọc báo.
今天的报纸在桌子上。|Báo hôm nay ở trên bàn.
现在看报纸的人少了。|Bây giờ người đọc báo ít đi.
我在报纸上看到了这个消息。|Tôi thấy tin này trên báo.
这份报纸多少钱？|Tờ báo này bao nhiêu tiền?
#北方
我是北方人。|Tôi là người miền Bắc.
北方的冬天很冷。|Mùa đông miền Bắc rất lạnh.
北方人喜欢吃面条。|Người miền Bắc thích ăn mì.
你去过中国北方吗？|Bạn đã đến miền Bắc Trung Quốc chưa?
北方很少下雨。|Miền Bắc ít mưa.
#比如
我喜欢水果，比如苹果和香蕉。|Tôi thích hoa quả, ví dụ táo và chuối.
很多运动，比如游泳，都对身体好。|Nhiều môn thể thao, ví dụ bơi, đều tốt cho cơ thể.
比如你，你每天几点起床？|Ví dụ bạn, mỗi ngày bạn dậy lúc mấy giờ?
有很多城市很漂亮，比如杭州。|Có nhiều thành phố rất đẹp, ví dụ Hàng Châu.
你可以说一些例子，比如……|Bạn có thể nói vài ví dụ, như là…
#比如说
比如说，你可以每天听中文歌。|Ví dụ, bạn có thể nghe nhạc Trung mỗi ngày.
学汉语有很多方法，比如说看电影。|Học tiếng Trung có nhiều cách, ví dụ xem phim.
比如说今天，我很早就起床了。|Ví dụ hôm nay, tôi dậy rất sớm.
有些菜很辣，比如说四川菜。|Có món rất cay, ví dụ món Tứ Xuyên.
比如说他，就很喜欢运动。|Ví dụ cậu ấy, rất thích thể thao.
#笔
你有笔吗？|Bạn có bút không?
我借一下你的笔。|Cho tôi mượn bút của bạn.
这支笔很好写。|Cây bút này viết rất trơn.
请用笔写名字。|Hãy dùng bút viết tên.
我的笔没有水了。|Bút của tôi hết mực rồi.
#笔记本
我买了一个新笔记本。|Tôi mua một quyển vở mới.
他在笔记本上写字。|Anh ấy viết chữ vào vở.
我的笔记本电脑很轻。|Máy tính xách tay của tôi rất nhẹ.
笔记本放在书包里。|Quyển vở để trong cặp.
上课要带笔记本。|Đi học phải mang vở.
#必须
你必须早点儿睡觉。|Bạn phải ngủ sớm.
我们必须八点以前到。|Chúng ta phải đến trước tám giờ.
学生必须穿校服。|Học sinh phải mặc đồng phục.
这件事必须今天做完。|Việc này phải làm xong hôm nay.
考试时必须带身份证。|Khi thi phải mang chứng minh thư.
#边
你坐我这边吧。|Bạn ngồi bên này với tôi nhé.
路边有很多树。|Bên đường có nhiều cây.
他一边吃饭一边看手机。|Anh ấy vừa ăn cơm vừa xem điện thoại.
河边很漂亮。|Bờ sông rất đẹp.
那边有一个商店。|Bên kia có một cửa hàng.
#变
天气变冷了。|Thời tiết trở lạnh rồi.
你变漂亮了。|Bạn đẹp ra rồi.
这里变化很大，什么都变了。|Ở đây thay đổi nhiều, cái gì cũng khác.
他的想法变了。|Suy nghĩ của anh ấy thay đổi rồi.
红灯变绿了。|Đèn đỏ chuyển xanh rồi.
#变成
水变成了冰。|Nước biến thành băng.
小孩子变成了大人。|Đứa trẻ đã thành người lớn.
这里变成了一个公园。|Chỗ này trở thành một công viên.
她的梦想变成了现实。|Ước mơ của cô ấy thành hiện thực.
天变成了黑色。|Trời chuyển sang màu đen.
#遍
请再说一遍。|Xin nói lại một lần nữa.
这本书我看了三遍。|Cuốn sách này tôi đọc ba lần.
你读一遍课文。|Bạn đọc bài khóa một lượt.
这个电影我看过两遍。|Phim này tôi xem hai lần rồi.
我听了一遍就懂了。|Tôi nghe một lượt là hiểu.
#表
我的表停了。|Đồng hồ của tôi dừng rồi.
现在几点？我没带表。|Bây giờ mấy giờ? Tôi không mang đồng hồ.
请填一下这张表。|Hãy điền vào tờ bảng này.
这块表是我生日礼物。|Chiếc đồng hồ này là quà sinh nhật của tôi.
他看了看表，说："走吧。"|Anh ấy nhìn đồng hồ rồi nói: "Đi thôi."
#不错
这个菜不错。|Món này khá ngon.
你的汉语说得不错。|Bạn nói tiếng Trung khá tốt.
今天天气不错。|Hôm nay thời tiết khá đẹp.
这个想法不错。|Ý tưởng này hay đấy.
他是个不错的人。|Anh ấy là người tốt.
#不但
他不但会说汉语，而且会说英语。|Anh ấy không những biết tiếng Trung mà còn biết tiếng Anh.
这个菜不但好吃，而且便宜。|Món này không những ngon mà còn rẻ.
她不但漂亮，还很聪明。|Cô ấy không chỉ xinh mà còn thông minh.
不但我去，我朋友也去。|Không chỉ tôi đi, bạn tôi cũng đi.
这里不但冷，而且常常下雪。|Ở đây không những lạnh mà còn hay có tuyết.
#不够
钱不够了。|Không đủ tiền rồi.
时间不够，我们快点儿吧。|Không đủ thời gian, chúng ta nhanh lên.
这些菜不够吃。|Chỗ đồ ăn này không đủ ăn.
你的努力还不够。|Sự cố gắng của bạn vẫn chưa đủ.
椅子不够，再拿两把来。|Ghế không đủ, lấy thêm hai cái.
#不过
这件衣服很好看，不过有点儿贵。|Bộ quần áo này rất đẹp, có điều hơi đắt.
我想去，不过没有时间。|Tôi muốn đi nhưng không có thời gian.
汉语很难，不过很有意思。|Tiếng Trung khó nhưng rất thú vị.
他不过是个孩子。|Nó chỉ là một đứa trẻ thôi.
不过你说得也对。|Có điều bạn nói cũng đúng.
#不好意思
不好意思，我来晚了。|Ngại quá, tôi đến muộn.
不好意思，请问厕所在哪儿？|Xin lỗi, cho hỏi nhà vệ sinh ở đâu?
不好意思，打扰你了。|Ngại quá, làm phiền bạn rồi.
他被大家看得不好意思了。|Bị mọi người nhìn, anh ấy ngượng ngùng.
真不好意思，我忘了。|Thật ngại quá, tôi quên mất.
#不久
不久以后他就回来了。|Không lâu sau anh ấy đã về.
我们不久前见过面。|Chúng tôi gặp nhau cách đây không lâu.
他来中国不久。|Anh ấy đến Trung Quốc chưa lâu.
不久就要考试了。|Sắp đến kỳ thi rồi.
下了车不久就到了。|Xuống xe không lâu là đến.
#不满
他对工作很不满。|Anh ấy rất không hài lòng với công việc.
大家对这个结果不满。|Mọi người bất mãn với kết quả này.
你有什么不满可以说。|Bạn có gì không hài lòng thì cứ nói.
顾客对服务不满。|Khách hàng không hài lòng với dịch vụ.
他脸上有一点儿不满。|Trên mặt anh ấy có chút không vui.
#不如
坐车不如走路快。|Đi xe không nhanh bằng đi bộ.
我的汉语不如他好。|Tiếng Trung của tôi không bằng anh ấy.
今天不如昨天热。|Hôm nay không nóng bằng hôm qua.
我们不如明天再去吧。|Hay là mai chúng ta hãy đi.
在家看电影不如去电影院。|Xem phim ở nhà không bằng đi rạp.
#不少
来了不少人。|Có khá nhiều người đến.
我学了不少汉字。|Tôi học được khá nhiều chữ Hán.
他帮了我不少忙。|Anh ấy giúp tôi không ít.
这里有不少好吃的。|Ở đây có nhiều món ngon.
我花了不少钱。|Tôi tiêu khá nhiều tiền.
#不行
这样做不行。|Làm thế này không được.
明天不行，后天可以吗？|Mai không được, ngày kia được không?
我的电脑不行了。|Máy tính của tôi hỏng rồi.
不行，你不能去。|Không được, bạn không thể đi.
他累得不行。|Anh ấy mệt lắm rồi.
#不一定
他不一定来。|Anh ấy chưa chắc đến.
贵的不一定好。|Đắt chưa chắc đã tốt.
明天不一定下雨。|Mai chưa chắc mưa.
我不一定有时间。|Tôi chưa chắc có thời gian.
你说的不一定对。|Bạn nói chưa chắc đã đúng.
#不一会儿
不一会儿，他就回来了。|Chẳng mấy chốc anh ấy đã về.
下了雨，不一会儿天就晴了。|Mưa xong, chẳng bao lâu trời lại nắng.
孩子不一会儿就睡着了。|Đứa bé chẳng mấy chốc đã ngủ.
不一会儿，菜就做好了。|Chẳng mấy chốc món ăn đã nấu xong.
他喝了药，不一会儿就好多了。|Uống thuốc chẳng bao lâu anh ấy đỡ nhiều.
#菜单
服务员，请给我菜单。|Phục vụ ơi, cho tôi thực đơn.
菜单上有很多菜。|Thực đơn có nhiều món.
你看看菜单，想吃什么？|Bạn xem thực đơn, muốn ăn gì?
这个菜单有英文吗？|Thực đơn này có tiếng Anh không?
菜单上的菜都很贵。|Món trên thực đơn đều đắt.
#参观
我们去参观博物馆吧。|Chúng ta đi tham quan bảo tàng nhé.
欢迎来我们学校参观。|Chào mừng đến tham quan trường chúng tôi.
参观的人很多。|Người tham quan rất đông.
明天我们参观工厂。|Ngày mai chúng ta tham quan nhà máy.
这里不能参观。|Ở đây không được tham quan.
#草
地上有很多草。|Dưới đất có nhiều cỏ.
春天草绿了。|Mùa xuân cỏ xanh rồi.
请不要走在草上。|Xin đừng đi lên cỏ.
牛在吃草。|Bò đang ăn cỏ.
院子里长了很多草。|Trong sân mọc nhiều cỏ.
#草地
孩子们在草地上玩儿。|Bọn trẻ chơi trên bãi cỏ.
我们坐在草地上吃饭。|Chúng tôi ngồi trên bãi cỏ ăn cơm.
公园里有一大片草地。|Trong công viên có một bãi cỏ lớn.
草地上不能踢球。|Không được đá bóng trên bãi cỏ.
小狗在草地上跑。|Con chó con chạy trên bãi cỏ.
#层
我住在五层。|Tôi ở tầng năm.
这个楼有二十层。|Tòa nhà này có hai mươi tầng.
桌子上有一层土。|Trên bàn có một lớp bụi.
你家在几层？|Nhà bạn ở tầng mấy?
商店在一层。|Cửa hàng ở tầng một.
#常见
这是一个常见的问题。|Đây là một vấn đề thường gặp.
这种花在这里很常见。|Loài hoa này rất thường gặp ở đây.
感冒是常见的病。|Cảm cúm là bệnh thường gặp.
这个字很常见。|Chữ này rất thường gặp.
这种错误很常见。|Lỗi này rất hay gặp.
#常用
这是常用的汉字。|Đây là chữ Hán thường dùng.
请学会这些常用的句子。|Hãy học những câu thường dùng này.
我常用手机买东西。|Tôi hay dùng điện thoại mua đồ.
这个词很常用。|Từ này rất thường dùng.
常用的东西放在这里。|Đồ thường dùng để ở đây.
#场
昨天下了一场大雨。|Hôm qua có một trận mưa lớn.
我们去看一场电影吧。|Chúng ta đi xem một suất phim nhé.
这场比赛很精彩。|Trận đấu này rất đặc sắc.
停车场在哪儿？|Bãi đỗ xe ở đâu?
今天有两场考试。|Hôm nay có hai buổi thi.
#超过
气温超过三十度了。|Nhiệt độ vượt quá ba mươi độ rồi.
来的人超过了一百个。|Người đến hơn một trăm.
他跑得很快，超过了我。|Anh ấy chạy rất nhanh, vượt qua tôi.
不能超过十分钟。|Không được quá mười phút.
这个月花的钱超过了一千块。|Tháng này tiêu hơn một nghìn đồng.
#车辆
路上的车辆很多。|Xe cộ trên đường rất nhiều.
这里禁止车辆进入。|Ở đây cấm xe cộ đi vào.
车辆要慢行。|Xe cộ phải đi chậm.
晚上车辆少一些。|Buổi tối xe cộ ít hơn.
停车场里有很多车辆。|Trong bãi đỗ xe có nhiều xe.
#称
大家都称他王老师。|Mọi người đều gọi ông ấy là thầy Vương.
请称一下这些苹果。|Cân giúp chỗ táo này.
这个地方被称为"花城"。|Nơi này được gọi là "Thành phố hoa".
我称了一下，五公斤。|Tôi cân thử, năm cân.
你怎么称呼？|Xưng hô với bạn thế nào?
#出发
我们几点出发？|Mấy giờ chúng ta xuất phát?
他早上六点就出发了。|Sáu giờ sáng anh ấy đã xuất phát.
准备好了就出发吧。|Chuẩn bị xong thì xuất phát thôi.
火车马上就要出发了。|Tàu sắp xuất phát rồi.
出发以前要检查一下。|Trước khi xuất phát phải kiểm tra.
#出国
他明年要出国留学。|Năm sau anh ấy sẽ ra nước ngoài du học.
你出过国吗？|Bạn đã ra nước ngoài chưa?
出国要带护照。|Ra nước ngoài phải mang hộ chiếu.
这是我第一次出国。|Đây là lần đầu tôi ra nước ngoài.
现在出国旅游的人很多。|Bây giờ nhiều người đi du lịch nước ngoài.
#出口
出口在哪儿？|Lối ra ở đâu?
请从这个出口出去。|Hãy đi ra từ lối ra này.
地铁站有四个出口。|Ga tàu điện có bốn lối ra.
这个公司出口水果。|Công ty này xuất khẩu hoa quả.
我在B出口等你。|Tôi đợi bạn ở lối ra B.
#出门
我出门了。|Tôi ra ngoài đây.
出门别忘了带钥匙。|Ra ngoài đừng quên mang chìa khóa.
今天下雨，我不想出门。|Hôm nay mưa, tôi không muốn ra ngoài.
他每天七点出门。|Ngày nào anh ấy cũng ra khỏi nhà lúc bảy giờ.
出门的时候关好门。|Khi ra ngoài nhớ đóng cửa cẩn thận.
#出生
我出生在河内。|Tôi sinh ra ở Hà Nội.
你是哪年出生的？|Bạn sinh năm nào?
她的孩子上个月出生了。|Con cô ấy sinh tháng trước.
我出生的时候很小。|Lúc tôi sinh ra rất nhỏ.
他出生在一个大家庭。|Anh ấy sinh ra trong một gia đình lớn.
#出院
他明天出院。|Mai anh ấy xuất viện.
奶奶已经出院了。|Bà đã xuất viện rồi.
什么时候可以出院？|Khi nào có thể xuất viện?
出院以后要好好休息。|Xuất viện rồi phải nghỉ ngơi cho tốt.
医生说还不能出院。|Bác sĩ nói vẫn chưa thể xuất viện.
#出租
这个房子出租。|Căn nhà này cho thuê.
他把房间出租给学生。|Anh ấy cho sinh viên thuê phòng.
这里有自行车出租。|Ở đây có cho thuê xe đạp.
出租房子要多少钱？|Cho thuê nhà bao nhiêu tiền?
我想找出租的房子。|Tôi muốn tìm nhà cho thuê.
#出租车
我们坐出租车去吧。|Chúng ta đi taxi nhé.
出租车来了。|Taxi đến rồi.
这里很难打到出租车。|Ở đây rất khó bắt taxi.
坐出租车要二十分钟。|Đi taxi mất hai mươi phút.
他是出租车司机。|Anh ấy là tài xế taxi.
#船
我们坐船去吧。|Chúng ta đi thuyền nhé.
河上有很多船。|Trên sông có nhiều thuyền.
这条船很大。|Con tàu này rất lớn.
我第一次坐船。|Lần đầu tôi đi thuyền.
船开得很慢。|Thuyền đi rất chậm.
#吹
风吹得很大。|Gió thổi rất mạnh.
请吹一下蜡烛。|Hãy thổi nến đi.
外面吹着冷风。|Bên ngoài gió lạnh đang thổi.
他会吹笛子。|Anh ấy biết thổi sáo.
我用吹风机吹头发。|Tôi dùng máy sấy sấy tóc.
#春天
春天来了。|Mùa xuân đến rồi.
春天的花很漂亮。|Hoa mùa xuân rất đẹp.
我最喜欢春天。|Tôi thích mùa xuân nhất.
春天天气很暖和。|Mùa xuân thời tiết ấm áp.
春天我们去公园看花。|Mùa xuân chúng tôi đi công viên ngắm hoa.
#词
这个词是什么意思？|Từ này nghĩa là gì?
今天学了十个新词。|Hôm nay học mười từ mới.
请用这个词造句。|Hãy đặt câu với từ này.
我不认识这个词。|Tôi không biết từ này.
这个词怎么读？|Từ này đọc thế nào?
#词语
请写出这些词语的意思。|Hãy viết nghĩa của những từ ngữ này.
这些词语很常用。|Những từ ngữ này rất thường dùng.
我在本子上写词语。|Tôi viết từ ngữ vào vở.
用下面的词语回答问题。|Dùng các từ ngữ dưới đây trả lời câu hỏi.
这个词语我听过。|Từ ngữ này tôi đã nghe qua.
#答应
他答应了我的请求。|Anh ấy đồng ý yêu cầu của tôi.
妈妈答应给我买手机。|Mẹ đồng ý mua điện thoại cho tôi.
我叫了他几次，他都没答应。|Tôi gọi mấy lần mà anh ấy không thưa.
你答应过我的。|Bạn đã hứa với tôi rồi.
这件事我不能答应。|Việc này tôi không thể nhận lời.
#打工
我在饭馆打工。|Tôi làm thêm ở quán ăn.
很多大学生周末打工。|Nhiều sinh viên làm thêm cuối tuần.
打工可以挣一点儿钱。|Làm thêm có thể kiếm chút tiền.
他暑假去打工了。|Kỳ nghỉ hè cậu ấy đi làm thêm.
你在哪儿打工？|Bạn làm thêm ở đâu?
#打算
你周末有什么打算？|Cuối tuần bạn có dự định gì?
我打算明年去中国。|Tôi dự định sang năm đi Trung Quốc.
他打算学开车。|Anh ấy định học lái xe.
你打算什么时候回家？|Bạn định khi nào về nhà?
我还没有打算。|Tôi vẫn chưa có dự định.
#打印
请帮我打印这份文件。|Giúp tôi in tài liệu này.
打印机坏了。|Máy in hỏng rồi.
我要打印两张照片。|Tôi muốn in hai tấm ảnh.
图书馆可以打印。|Thư viện có thể in.
打印一张多少钱？|In một trang bao nhiêu tiền?
#大部分
大部分学生都来了。|Phần lớn học sinh đã đến.
我大部分时间在家。|Phần lớn thời gian tôi ở nhà.
大部分人喜欢周末。|Đa số mọi người thích cuối tuần.
作业我做完了大部分。|Bài tập tôi làm xong phần lớn rồi.
大部分商店九点开门。|Phần lớn cửa hàng chín giờ mở cửa.
#大大
他的汉语大大提高了。|Tiếng Trung của anh ấy tiến bộ rất nhiều.
这样做可以大大节约时间。|Làm vậy có thể tiết kiệm rất nhiều thời gian.
他有一双大大的眼睛。|Cậu bé có đôi mắt to tròn.
天气大大变冷了。|Thời tiết lạnh đi rất nhiều.
价格大大降低了。|Giá giảm đi rất nhiều.
#大多数
大多数人同意了。|Đại đa số người đồng ý.
大多数学生住在学校。|Phần lớn học sinh ở trong trường.
这里大多数是年轻人。|Ở đây đa số là người trẻ.
大多数时间我很忙。|Phần lớn thời gian tôi rất bận.
大多数商店周末也开门。|Đa số cửa hàng cuối tuần cũng mở cửa.
#大海
我喜欢看大海。|Tôi thích ngắm biển.
大海是蓝色的。|Biển cả màu xanh.
孩子第一次看到大海。|Đứa trẻ lần đầu thấy biển.
我们去大海边玩儿吧。|Chúng ta ra bờ biển chơi nhé.
大海很大，也很美。|Biển rất rộng, cũng rất đẹp.
#大量
他看了大量的书。|Anh ấy đọc rất nhiều sách.
这里有大量的游客。|Ở đây có lượng lớn du khách.
运动时要喝大量的水。|Khi vận động phải uống nhiều nước.
我们需要大量的时间。|Chúng ta cần rất nhiều thời gian.
商店里有大量的水果。|Trong cửa hàng có rất nhiều hoa quả.
#大门
学校大门在东边。|Cổng chính trường ở phía đông.
我在大门口等你。|Tôi đợi bạn ở cổng chính.
大门晚上十点关。|Cổng chính đóng lúc mười giờ tối.
请从大门进来。|Mời đi vào từ cổng chính.
公园的大门很大。|Cổng công viên rất lớn.
#大人
这是大人的事。|Đây là chuyện của người lớn.
大人和孩子都喜欢这个电影。|Người lớn và trẻ con đều thích phim này.
大人票多少钱？|Vé người lớn bao nhiêu tiền?
孩子要听大人的话。|Trẻ con phải nghe lời người lớn.
你已经是大人了。|Bạn đã là người lớn rồi.
#大小
这双鞋大小正好。|Đôi giày này cỡ vừa khít.
你穿多大小的衣服？|Bạn mặc quần áo cỡ nào?
这两个房间大小一样。|Hai phòng này rộng như nhau.
大小不合适可以换。|Cỡ không vừa có thể đổi.
家里大小事都是妈妈做。|Việc lớn nhỏ trong nhà đều do mẹ làm.
#大衣
冬天要穿大衣。|Mùa đông phải mặc áo khoác dài.
这件大衣很暖和。|Chiếc áo khoác này rất ấm.
我买了一件黑色的大衣。|Tôi mua một chiếc áo khoác màu đen.
外面冷，穿上大衣吧。|Bên ngoài lạnh, mặc áo khoác vào.
你的大衣真好看。|Áo khoác của bạn đẹp thật.
#大自然
我喜欢大自然。|Tôi thích thiên nhiên.
我们要保护大自然。|Chúng ta phải bảo vệ thiên nhiên.
周末去山里感受大自然吧。|Cuối tuần lên núi cảm nhận thiên nhiên nhé.
大自然非常美。|Thiên nhiên vô cùng đẹp.
孩子们在大自然中学习。|Bọn trẻ học trong thiên nhiên.
#带来
谢谢你带来的礼物。|Cảm ơn món quà bạn mang đến.
他给我们带来了好消息。|Anh ấy mang đến cho chúng tôi tin vui.
下雨给我们带来很多麻烦。|Trời mưa gây cho chúng tôi nhiều phiền phức.
请把书带来。|Hãy mang sách đến.
旅游能给人带来快乐。|Du lịch có thể đem lại niềm vui.
#单位
你在哪个单位工作？|Bạn làm ở cơ quan nào?
我们单位有一百个人。|Cơ quan chúng tôi có một trăm người.
单位离我家很近。|Cơ quan cách nhà tôi rất gần.
公斤是重量单位。|Ki-lô-gam là đơn vị khối lượng.
明天单位放假。|Ngày mai cơ quan nghỉ.
#但
我很累，但很高兴。|Tôi rất mệt nhưng rất vui.
他很年轻，但很有经验。|Anh ấy trẻ nhưng rất có kinh nghiệm.
我想去，但没时间。|Tôi muốn đi nhưng không có thời gian.
天气很冷，但没下雪。|Trời rất lạnh nhưng không có tuyết.
这个菜不贵，但很好吃。|Món này không đắt nhưng rất ngon.
#蛋
我早上吃了一个蛋。|Sáng nay tôi ăn một quả trứng.
冰箱里还有几个蛋？|Trong tủ lạnh còn mấy quả trứng?
妈妈做了蛋汤。|Mẹ nấu canh trứng.
这个蛋坏了。|Quả trứng này hỏng rồi.
我想吃蛋炒饭。|Tôi muốn ăn cơm rang trứng.
#当时
当时我只有十岁。|Lúc đó tôi mới mười tuổi.
当时我不在家。|Lúc đó tôi không ở nhà.
当时的情况很复杂。|Tình hình lúc đó rất phức tạp.
我当时太紧张了。|Lúc đó tôi căng thẳng quá.
当时谁也不知道。|Lúc đó không ai biết.
#到处
到处都是人。|Khắp nơi toàn là người.
我到处找你。|Tôi tìm bạn khắp nơi.
春天到处是花。|Mùa xuân khắp nơi đều có hoa.
别到处乱跑。|Đừng chạy lung tung khắp nơi.
他到处旅游。|Anh ấy đi du lịch khắp nơi.
#道
这道题很难。|Câu này rất khó.
这道菜叫什么？|Món này tên là gì?
门口有一道光。|Ở cửa có một tia sáng.
这是一条小道。|Đây là một con đường nhỏ.
我做了三道题。|Tôi làm được ba câu.
#道理
你说的很有道理。|Bạn nói rất có lý.
他明白了这个道理。|Anh ấy đã hiểu đạo lý này.
没有道理的事我不做。|Việc vô lý tôi không làm.
妈妈给我讲道理。|Mẹ giảng giải lý lẽ cho tôi.
这个道理很简单。|Đạo lý này rất đơn giản.
#道路
这条道路很宽。|Con đường này rất rộng.
下雪以后道路很滑。|Sau khi tuyết rơi đường rất trơn.
城市的道路越来越好。|Đường sá thành phố ngày càng tốt.
他选择了自己的道路。|Anh ấy chọn con đường của riêng mình.
道路上车很多。|Trên đường rất nhiều xe.
#地球
地球是圆的。|Trái đất hình tròn.
我们只有一个地球。|Chúng ta chỉ có một trái đất.
要保护地球。|Phải bảo vệ trái đất.
地球上有很多国家。|Trên trái đất có nhiều quốc gia.
地球绕着太阳转。|Trái đất quay quanh mặt trời.
#地铁
我每天坐地铁上班。|Ngày nào tôi cũng đi tàu điện ngầm đi làm.
坐地铁很方便。|Đi tàu điện ngầm rất tiện.
地铁里人很多。|Trong tàu điện ngầm rất đông.
这个城市有地铁吗？|Thành phố này có tàu điện ngầm không?
坐地铁要三十分钟。|Đi tàu điện ngầm mất ba mươi phút.
#地铁站
地铁站在哪儿？|Ga tàu điện ngầm ở đâu?
我在地铁站等你。|Tôi đợi bạn ở ga tàu điện ngầm.
我家旁边有一个地铁站。|Cạnh nhà tôi có một ga tàu điện ngầm.
从这儿到地铁站要走五分钟。|Từ đây đến ga tàu điện đi bộ năm phút.
地铁站里有很多商店。|Trong ga tàu điện có nhiều cửa hàng.
#得出
我们得出了一个结论。|Chúng tôi rút ra một kết luận.
他得出的结果是对的。|Kết quả anh ấy tìm ra là đúng.
从这件事可以得出什么？|Từ việc này có thể rút ra điều gì?
你是怎么得出这个答案的？|Bạn làm sao ra được đáp án này?
大家得出了相同的看法。|Mọi người đi đến cùng một quan điểm.
#灯
请开灯。|Hãy bật đèn.
出门的时候要关灯。|Khi ra ngoài phải tắt đèn.
房间里的灯坏了。|Đèn trong phòng hỏng rồi.
红灯停，绿灯行。|Đèn đỏ dừng, đèn xanh đi.
街上的灯都亮了。|Đèn trên phố đều sáng rồi.
#等到
等到明天再说吧。|Đợi đến mai rồi nói.
等到他来，我们就出发。|Đợi anh ấy đến, chúng ta xuất phát.
我等到十点他才回来。|Tôi đợi đến mười giờ anh ấy mới về.
等到春天，花就开了。|Đợi đến mùa xuân hoa sẽ nở.
等到我明白，已经晚了。|Đến khi tôi hiểu thì đã muộn.
#等于
一加一等于二。|Một cộng một bằng hai.
一公斤等于一千克。|Một ki-lô-gam bằng một nghìn gam.
不说话等于同意。|Không nói gì nghĩa là đồng ý.
三乘三等于几？|Ba nhân ba bằng mấy?
他的话等于没说。|Lời anh ấy nói cũng như không.
#低
这张桌子太低了。|Cái bàn này thấp quá.
今天气温很低。|Hôm nay nhiệt độ rất thấp.
请说话声音低一点儿。|Xin nói nhỏ một chút.
价格比以前低了。|Giá thấp hơn trước rồi.
他低着头不说话。|Anh ấy cúi đầu không nói.
#点头
他点了点头。|Anh ấy gật gật đầu.
老师点头说好。|Thầy gật đầu nói được.
她听了以后点头同意。|Cô ấy nghe xong gật đầu đồng ý.
如果你同意就点头。|Nếu bạn đồng ý thì gật đầu.
他笑着点头。|Anh ấy cười gật đầu.
#店
这家店的东西很便宜。|Đồ ở cửa hàng này rất rẻ.
我在一家店打工。|Tôi làm thêm ở một cửa hàng.
店里人很多。|Trong quán rất đông người.
这家店几点关门？|Cửa hàng này mấy giờ đóng cửa?
学校旁边新开了一家店。|Cạnh trường mới mở một cửa hàng.
#掉
我的手机掉了。|Điện thoại của tôi rơi mất rồi.
杯子掉在地上了。|Cái cốc rơi xuống đất rồi.
树叶掉下来了。|Lá cây rơi xuống rồi.
请把灯关掉。|Hãy tắt đèn đi.
我把作业忘掉了。|Tôi quên mất bài tập rồi.
#东北
我朋友是东北人。|Bạn tôi là người Đông Bắc.
东北的冬天特别冷。|Mùa đông ở Đông Bắc đặc biệt lạnh.
学校在城市的东北边。|Trường ở phía đông bắc thành phố.
东北菜很好吃。|Món Đông Bắc rất ngon.
我想去东北看雪。|Tôi muốn đi Đông Bắc ngắm tuyết.
#东方
太阳从东方出来。|Mặt trời mọc ở phương đông.
我很喜欢东方文化。|Tôi rất thích văn hóa phương Đông.
东方的天空红了。|Bầu trời phía đông đỏ rực.
这是一座东方城市。|Đây là một thành phố phương Đông.
东方人和西方人的习惯不一样。|Thói quen người phương Đông và phương Tây khác nhau.
#东南
我家在城市的东南边。|Nhà tôi ở phía đông nam thành phố.
越南在中国的东南边。|Việt Nam ở phía đông nam Trung Quốc.
东南亚很热。|Đông Nam Á rất nóng.
风从东南方向吹来。|Gió thổi từ hướng đông nam.
我去过东南亚很多国家。|Tôi đã đến nhiều nước Đông Nam Á.
#懂得
他懂得很多道理。|Anh ấy hiểu nhiều đạo lý.
你要懂得照顾自己。|Bạn phải biết chăm sóc bản thân.
孩子还不懂得这些。|Trẻ con chưa hiểu những điều này.
懂得感恩的人很快乐。|Người biết ơn rất hạnh phúc.
他懂得怎么跟人交流。|Anh ấy biết cách giao tiếp với người khác.
#动物园
我们去动物园看熊猫。|Chúng ta đi vườn thú xem gấu trúc.
动物园里有很多动物。|Trong vườn thú có nhiều động vật.
孩子们很喜欢去动物园。|Bọn trẻ rất thích đi vườn thú.
动物园几点开门？|Vườn thú mấy giờ mở cửa?
动物园离这儿远吗？|Vườn thú cách đây xa không?
#读音
这个字的读音是什么？|Âm đọc của chữ này là gì?
请注意这个词的读音。|Hãy chú ý cách đọc của từ này.
这两个字读音一样。|Hai chữ này đọc giống nhau.
你的读音很准。|Phát âm của bạn rất chuẩn.
查词典可以知道读音。|Tra từ điển có thể biết cách đọc.
#度
今天三十度。|Hôm nay ba mươi độ.
他发烧三十九度。|Anh ấy sốt ba mươi chín độ.
外面零下五度。|Bên ngoài âm năm độ.
水一百度就开了。|Nước sôi ở một trăm độ.
今天比昨天高五度。|Hôm nay cao hơn hôm qua năm độ.
#短
我的头发很短。|Tóc tôi rất ngắn.
这条裤子太短了。|Chiếc quần này ngắn quá.
时间很短。|Thời gian rất ngắn.
冬天白天短。|Mùa đông ban ngày ngắn.
请写一篇短文。|Hãy viết một bài văn ngắn.
#短信
我给你发了一条短信。|Tôi đã gửi cho bạn một tin nhắn.
你收到短信了吗？|Bạn nhận được tin nhắn chưa?
他不常发短信。|Anh ấy không hay nhắn tin.
请用短信告诉我。|Hãy nhắn tin báo tôi.
我的手机有很多短信。|Điện thoại tôi có nhiều tin nhắn.
#段
这段话是什么意思？|Đoạn này có nghĩa là gì?
请读第一段。|Hãy đọc đoạn thứ nhất.
这段路不好走。|Đoạn đường này khó đi.
那段时间我很忙。|Khoảng thời gian đó tôi rất bận.
我们一起走了一段路。|Chúng tôi cùng đi một đoạn đường.
#队
我们排队买票吧。|Chúng ta xếp hàng mua vé nhé.
他是我们队的。|Anh ấy là người đội chúng tôi.
我们队赢了。|Đội chúng tôi thắng rồi.
请站成一队。|Hãy đứng thành một hàng.
你想参加哪个队？|Bạn muốn tham gia đội nào?
#队长
他是我们的队长。|Anh ấy là đội trưởng của chúng tôi.
队长说明天训练。|Đội trưởng nói mai tập luyện.
大家都听队长的。|Mọi người đều nghe đội trưởng.
新队长很年轻。|Đội trưởng mới rất trẻ.
你去问一下队长。|Bạn đi hỏi đội trưởng xem.
#对话
请读一下这段对话。|Hãy đọc đoạn hội thoại này.
我们用汉语对话。|Chúng tôi đối thoại bằng tiếng Trung.
这个对话很简单。|Đoạn hội thoại này rất đơn giản.
两国开始对话了。|Hai nước bắt đầu đối thoại.
听对话，回答问题。|Nghe hội thoại, trả lời câu hỏi.
#对面
银行在超市对面。|Ngân hàng ở đối diện siêu thị.
他坐在我对面。|Anh ấy ngồi đối diện tôi.
马路对面有一个公园。|Bên kia đường có một công viên.
学校对面是医院。|Đối diện trường học là bệnh viện.
我住在你家对面。|Tôi ở đối diện nhà bạn.
#多久
你学汉语多久了？|Bạn học tiếng Trung bao lâu rồi?
从这儿到机场要多久？|Từ đây đến sân bay mất bao lâu?
你要等多久？|Bạn phải đợi bao lâu?
他走了多久了？|Anh ấy đi bao lâu rồi?
你在中国住了多久？|Bạn sống ở Trung Quốc bao lâu?
#多么
今天的天气多么好啊！|Hôm nay thời tiết đẹp biết bao!
这里多么安静！|Ở đây yên tĩnh biết bao!
你知道我多么想你吗？|Bạn có biết tôi nhớ bạn nhiều thế nào không?
她唱得多么好听啊！|Cô ấy hát hay biết bao!
不管多么难，我都要学。|Dù khó đến đâu tôi cũng phải học.
#多数
多数人喜欢吃甜的。|Đa số người thích ăn ngọt.
多数同学同意这个看法。|Đa số bạn học đồng ý quan điểm này.
这里多数是学生。|Ở đây đa số là học sinh.
多数时候我在家吃饭。|Đa số thời gian tôi ăn cơm ở nhà.
我们听多数人的意见。|Chúng ta nghe theo ý kiến số đông.
#多云
今天多云。|Hôm nay nhiều mây.
明天多云转晴。|Ngày mai nhiều mây chuyển nắng.
多云的天气不太热。|Thời tiết nhiều mây không nóng lắm.
上午多云，下午有雨。|Buổi sáng nhiều mây, buổi chiều có mưa.
天气预报说明天多云。|Dự báo thời tiết nói mai nhiều mây.
#而且
他很聪明，而且很努力。|Anh ấy thông minh mà còn chăm chỉ.
这家饭馆很便宜，而且很好吃。|Quán này rẻ mà còn ngon.
今天很冷，而且下雨。|Hôm nay lạnh mà còn mưa.
她会唱歌，而且唱得很好。|Cô ấy biết hát, mà còn hát rất hay.
不但我喜欢，而且我妈妈也喜欢。|Không chỉ tôi thích mà mẹ tôi cũng thích.
#发
我给你发邮件。|Tôi gửi email cho bạn.
他发烧了。|Anh ấy bị sốt.
请把照片发给我。|Gửi ảnh cho tôi nhé.
老师发了新书。|Thầy phát sách mới.
发生了什么事？|Đã xảy ra chuyện gì?
#方便面
我晚上吃了一包方便面。|Tối qua tôi ăn một gói mì ăn liền.
方便面不太健康。|Mì ăn liền không tốt cho sức khỏe lắm.
没时间做饭就吃方便面。|Không có thời gian nấu thì ăn mì gói.
这种方便面很辣。|Loại mì ăn liền này rất cay.
宿舍里有很多方便面。|Trong ký túc xá có nhiều mì ăn liền.
#方面
在学习方面他很努力。|Về mặt học tập anh ấy rất chăm chỉ.
这方面我不太懂。|Mặt này tôi không hiểu lắm.
各方面都很好。|Mọi mặt đều tốt.
一方面……另一方面……|Một mặt… mặt khác…
我们要从多方面考虑。|Chúng ta phải xem xét từ nhiều phương diện.
#方向
你走错方向了。|Bạn đi nhầm hướng rồi.
学校在哪个方向？|Trường ở hướng nào?
我们的方向是对的。|Hướng đi của chúng ta là đúng.
他找不到方向。|Anh ấy không tìm được phương hướng.
往这个方向走五分钟。|Đi theo hướng này năm phút.
#放下
请把东西放下。|Hãy đặt đồ xuống.
他放下手机开始学习。|Anh ấy bỏ điện thoại xuống bắt đầu học.
把书包放下，休息一会儿。|Đặt cặp xuống nghỉ một lát.
我放不下这件事。|Tôi không bỏ được chuyện này.
妈妈放下电话就出门了。|Mẹ đặt điện thoại xuống là ra ngoài.
#放心
你放心吧，我能做好。|Bạn yên tâm, tôi làm được.
妈妈不放心我一个人出去。|Mẹ không yên tâm để tôi đi một mình.
到了给我打电话，我才放心。|Đến nơi gọi cho tôi, tôi mới yên tâm.
这件事交给他，我很放心。|Giao việc này cho anh ấy tôi rất yên tâm.
请放心，我不会说的。|Xin yên tâm, tôi sẽ không nói.
#分开
我们分开走吧。|Chúng ta chia ra đi nhé.
把这两个东西分开放。|Để riêng hai thứ này ra.
他们分开很久了。|Họ chia tay lâu rồi.
请把苹果分开。|Hãy chia táo ra.
我们从来没有分开过。|Chúng tôi chưa bao giờ xa nhau.
#分数
这次考试的分数出来了。|Điểm kỳ thi này có rồi.
他的分数很高。|Điểm của cậu ấy rất cao.
分数不是最重要的。|Điểm số không phải quan trọng nhất.
你考了多少分数？|Bạn thi được bao nhiêu điểm?
我对这个分数很满意。|Tôi rất hài lòng với điểm này.
#份
我要一份炒饭。|Tôi muốn một suất cơm rang.
请给我一份报纸。|Cho tôi một tờ báo.
这份工作很有意思。|Công việc này rất thú vị.
我准备了一份礼物。|Tôi chuẩn bị một món quà.
这份作业很难。|Bài tập này rất khó.
#封
我给妈妈写了一封信。|Tôi viết cho mẹ một lá thư.
你收到那封信了吗？|Bạn nhận được lá thư đó chưa?
他每周写一封信。|Mỗi tuần anh ấy viết một lá thư.
这封邮件很重要。|Bức email này rất quan trọng.
桌子上有两封信。|Trên bàn có hai lá thư.
#服务
这家饭馆的服务很好。|Phục vụ của quán này rất tốt.
有什么可以为您服务？|Tôi có thể giúp gì cho ngài?
他在一家服务公司工作。|Anh ấy làm ở một công ty dịch vụ.
我们要为人民服务。|Chúng ta phải phục vụ nhân dân.
这里提供免费服务。|Ở đây cung cấp dịch vụ miễn phí.
#该
现在该你了。|Bây giờ đến lượt bạn.
我该走了。|Tôi phải đi rồi.
你不该这么说。|Bạn không nên nói thế.
该吃饭了。|Đến giờ ăn cơm rồi.
这件事该怎么办？|Việc này nên làm thế nào?
#改
这个字写错了，请改一下。|Chữ này viết sai, hãy sửa lại.
会议改到明天了。|Cuộc họp đổi sang ngày mai rồi.
他改了很多坏习惯。|Anh ấy bỏ được nhiều thói quen xấu.
老师在改作业。|Thầy đang chấm bài tập.
我想改个时间。|Tôi muốn đổi thời gian.
#改变
他改变了主意。|Anh ấy thay đổi ý định.
这里改变了很多。|Ở đây thay đổi rất nhiều.
我们要改变自己。|Chúng ta phải thay đổi bản thân.
计划改变了。|Kế hoạch thay đổi rồi.
一本书改变了他的生活。|Một cuốn sách đã thay đổi cuộc đời anh ấy.
#感到
我感到很高兴。|Tôi cảm thấy rất vui.
他感到有点儿累。|Anh ấy thấy hơi mệt.
听到这个消息，大家都感到很吃惊。|Nghe tin này mọi người đều thấy ngạc nhiên.
你感到冷吗？|Bạn có thấy lạnh không?
我对这件事感到很抱歉。|Tôi rất lấy làm tiếc về việc này.
#感动
这个故事让我很感动。|Câu chuyện này khiến tôi rất cảm động.
他感动得哭了。|Anh ấy cảm động đến phát khóc.
你的话让我很感动。|Lời của bạn làm tôi rất cảm động.
这是一部很感动人的电影。|Đây là một bộ phim rất cảm động.
大家都被他感动了。|Mọi người đều bị anh ấy làm cảm động.
#感觉
你感觉怎么样？|Bạn cảm thấy thế nào?
我感觉有点儿冷。|Tôi thấy hơi lạnh.
这种感觉很好。|Cảm giác này rất tốt.
我感觉他不太高兴。|Tôi cảm thấy anh ấy không vui lắm.
第一次来中国是什么感觉？|Lần đầu đến Trung Quốc cảm giác thế nào?
#干杯
来，大家干杯！|Nào, mọi người cạn ly!
为我们的友谊干杯！|Cạn ly vì tình bạn của chúng ta!
我不能喝酒，用茶干杯吧。|Tôi không uống được rượu, cạn ly bằng trà nhé.
干杯以后大家都笑了。|Cạn ly xong mọi người đều cười.
为新年干杯！|Cạn ly mừng năm mới!
#干活儿
爸爸在院子里干活儿。|Bố đang làm việc ngoài sân.
他干活儿很认真。|Anh ấy làm việc rất chăm chỉ.
别玩儿了，快去干活儿。|Đừng chơi nữa, mau đi làm việc.
今天干活儿干得很累。|Hôm nay làm việc rất mệt.
我们一起干活儿吧。|Chúng ta cùng làm việc nhé.
#刚才
刚才你去哪儿了？|Vừa nãy bạn đi đâu?
刚才有人找你。|Vừa nãy có người tìm bạn.
刚才的电影很好看。|Bộ phim vừa nãy rất hay.
我刚才说的话你听到了吗？|Lời tôi vừa nói bạn nghe thấy không?
刚才下了一场雨。|Vừa nãy có một trận mưa.
#刚刚
我刚刚到家。|Tôi vừa mới về đến nhà.
电影刚刚开始。|Phim vừa mới bắt đầu.
他刚刚离开。|Anh ấy vừa mới rời đi.
这双鞋刚刚好。|Đôi giày này vừa khít.
我刚刚吃过饭。|Tôi vừa mới ăn cơm xong.
#高级
这是一家高级饭店。|Đây là một khách sạn cao cấp.
他在学高级汉语。|Anh ấy đang học tiếng Trung cao cấp.
这个手机很高级。|Chiếc điện thoại này rất cao cấp.
高级班的学生很少。|Học viên lớp cao cấp rất ít.
他是一名高级工程师。|Ông ấy là kỹ sư cao cấp.
#公共汽车
我坐公共汽车上学。|Tôi đi xe buýt đi học.
公共汽车来了。|Xe buýt đến rồi.
这路公共汽车去火车站吗？|Tuyến xe buýt này có đến ga tàu không?
公共汽车上人很多。|Trên xe buýt rất đông người.
坐公共汽车很便宜。|Đi xe buýt rất rẻ.
#公交车
我在等公交车。|Tôi đang đợi xe buýt.
坐公交车要四十分钟。|Đi xe buýt mất bốn mươi phút.
公交车站在前面。|Bến xe buýt ở phía trước.
晚上十点以后没有公交车了。|Sau mười giờ tối không còn xe buýt.
我们坐公交车去吧。|Chúng ta đi xe buýt nhé.
#公斤
我有五十公斤。|Tôi nặng năm mươi cân.
请给我两公斤苹果。|Cho tôi hai cân táo.
这个箱子有二十公斤。|Cái va li này nặng hai mươi cân.
我胖了三公斤。|Tôi béo lên ba cân.
一公斤多少钱？|Một cân bao nhiêu tiền?
#公里
学校离这儿两公里。|Trường cách đây hai ki-lô-mét.
我每天跑五公里。|Mỗi ngày tôi chạy năm ki-lô-mét.
这条路有十公里长。|Con đường này dài mười ki-lô-mét.
从这儿到机场多少公里？|Từ đây đến sân bay bao nhiêu ki-lô-mét?
车开得很快，一小时一百公里。|Xe chạy rất nhanh, một trăm cây số một giờ.
#公路
这条公路很长。|Con đường cái này rất dài.
公路上车很多。|Trên quốc lộ rất nhiều xe.
公路两边有很多树。|Hai bên đường cái có nhiều cây.
新公路修好了。|Con đường mới đã làm xong.
在公路上开车要小心。|Lái xe trên quốc lộ phải cẩn thận.
#公平
这样做不公平。|Làm như vậy không công bằng.
比赛要公平。|Thi đấu phải công bằng.
老师对每个学生都很公平。|Thầy rất công bằng với mỗi học sinh.
我觉得很公平。|Tôi thấy rất công bằng.
生活不总是公平的。|Cuộc sống không phải lúc nào cũng công bằng.
#够
钱够了吗？|Đủ tiền chưa?
我们的时间够了。|Thời gian của chúng ta đủ rồi.
这些菜够吃吗？|Chỗ đồ ăn này đủ ăn không?
我已经睡够了。|Tôi ngủ đủ rồi.
我玩儿够了，要学习了。|Tôi chơi đủ rồi, phải học thôi.
#故意
对不起，我不是故意的。|Xin lỗi, tôi không cố ý.
他故意不说话。|Anh ấy cố ý không nói gì.
你是故意的吧？|Bạn cố tình đúng không?
她故意来晚了。|Cô ấy cố tình đến muộn.
他故意让我等他。|Anh ấy cố ý bắt tôi đợi.
#顾客
顾客是上帝。|Khách hàng là thượng đế.
今天的顾客很多。|Hôm nay khách hàng rất đông.
这家店的顾客都是年轻人。|Khách của cửa hàng này đều là người trẻ.
服务员对顾客很热情。|Nhân viên phục vụ rất nhiệt tình với khách.
我们要听顾客的意见。|Chúng ta phải lắng nghe ý kiến khách hàng.
#关机
上课的时候请关机。|Trong giờ học xin tắt máy.
我的手机没电关机了。|Điện thoại tôi hết pin tắt máy rồi.
你怎么关机了？|Sao bạn tắt máy vậy?
睡觉前我会关机。|Trước khi ngủ tôi sẽ tắt máy.
电脑关机了吗？|Máy tính tắt chưa?
#观点
我同意你的观点。|Tôi đồng ý quan điểm của bạn.
他的观点很有意思。|Quan điểm của anh ấy rất thú vị.
每个人的观点不一样。|Quan điểm của mỗi người khác nhau.
请说说你的观点。|Hãy nói quan điểm của bạn.
这个观点我不太明白。|Quan điểm này tôi không hiểu lắm.
#广场
广场上有很多人。|Trên quảng trường có rất nhiều người.
晚上老人们在广场跳舞。|Buổi tối người già nhảy múa ở quảng trường.
我们在广场见面吧。|Chúng ta gặp nhau ở quảng trường nhé.
这个广场很大。|Quảng trường này rất lớn.
广场旁边有一个商场。|Cạnh quảng trường có một trung tâm thương mại.
#广告
电视上的广告太多了。|Quảng cáo trên tivi nhiều quá.
这个广告很有意思。|Quảng cáo này rất thú vị.
他在广告公司工作。|Anh ấy làm ở công ty quảng cáo.
我是看了广告才买的。|Tôi xem quảng cáo mới mua.
街上有很多广告。|Trên phố có nhiều quảng cáo.
#国际
这是一家国际公司。|Đây là một công ty quốc tế.
他在国际学校上学。|Cậu ấy học ở trường quốc tế.
我们去国际机场。|Chúng ta đi sân bay quốc tế.
汉语变得越来越国际化。|Tiếng Trung ngày càng quốc tế hóa.
这是国际比赛。|Đây là cuộc thi quốc tế.
#过来
你过来一下。|Bạn qua đây một chút.
他向我走过来。|Anh ấy đi về phía tôi.
快过来吃饭！|Mau qua đây ăn cơm!
你什么时候过来？|Khi nào bạn qua?
一辆车开过来了。|Một chiếc xe chạy tới.
#过年
过年的时候我们回老家。|Tết chúng tôi về quê.
过年要吃饺子。|Tết phải ăn sủi cảo.
你怎么过年？|Bạn ăn Tết thế nào?
过年了，大家都很高兴。|Tết rồi, mọi người đều rất vui.
孩子们最喜欢过年。|Trẻ con thích Tết nhất.
#过去
过去的事就别想了。|Chuyện quá khứ thì đừng nghĩ nữa.
我过去不喜欢吃辣的。|Trước đây tôi không thích ăn cay.
时间过去得很快。|Thời gian trôi qua rất nhanh.
你过去看看吧。|Bạn qua đó xem đi.
三年过去了。|Ba năm đã trôi qua.
#海
我想去海边。|Tôi muốn ra bờ biển.
海水很蓝。|Nước biển rất xanh.
夏天我们去海里游泳。|Mùa hè chúng tôi xuống biển bơi.
这个城市在海边。|Thành phố này ở cạnh biển.
海上有很多船。|Trên biển có nhiều tàu.
#喊
他大声喊我的名字。|Anh ấy gọi to tên tôi.
别喊了，大家在休息。|Đừng hét nữa, mọi người đang nghỉ.
妈妈喊我回家吃饭。|Mẹ gọi tôi về nhà ăn cơm.
我喊了好几次他都没听到。|Tôi gọi mấy lần anh ấy không nghe thấy.
他高兴得喊了起来。|Anh ấy vui quá hét lên.
#好多
公园里有好多人。|Trong công viên có rất nhiều người.
我有好多话想说。|Tôi có rất nhiều điều muốn nói.
他买了好多书。|Anh ấy mua rất nhiều sách.
好多年没见了。|Lâu lắm rồi không gặp.
我的病好多了。|Bệnh của tôi đỡ nhiều rồi.
#好久
好久不见！|Lâu rồi không gặp!
我等了你好久。|Tôi đợi bạn lâu lắm rồi.
好久没有下雨了。|Lâu lắm rồi không mưa.
他好久才回来。|Rất lâu anh ấy mới về.
我好久没吃饺子了。|Lâu lắm rồi tôi không ăn sủi cảo.
#好人
他是个好人。|Anh ấy là người tốt.
好人有好报。|Ở hiền gặp lành.
这里的人都是好人。|Người ở đây đều là người tốt.
你真是个好人。|Bạn thật là người tốt.
好人也会做错事。|Người tốt cũng có lúc làm sai.
#好事
这是一件好事。|Đây là một chuyện tốt.
你今天做了什么好事？|Hôm nay bạn làm được việc tốt gì?
多做好事。|Làm nhiều việc tốt.
有好事要告诉你。|Có chuyện tốt muốn nói với bạn.
下雨对农民来说是好事。|Trời mưa là chuyện tốt với nông dân.
#合适
这件衣服很合适。|Bộ quần áo này rất vừa.
现在说不太合适。|Bây giờ nói không hợp lắm.
你觉得什么时候合适？|Bạn thấy khi nào thì thích hợp?
他是最合适的人。|Anh ấy là người phù hợp nhất.
这双鞋大小合适吗？|Đôi giày này cỡ có vừa không?
#河
河里有很多鱼。|Dưới sông có nhiều cá.
我家门前有一条河。|Trước nhà tôi có một con sông.
别在河里游泳。|Đừng bơi dưới sông.
河水很干净。|Nước sông rất sạch.
我们在河边散步。|Chúng tôi đi dạo bên bờ sông.
#黑
天黑了。|Trời tối rồi.
房间里很黑。|Trong phòng rất tối.
他的头发很黑。|Tóc anh ấy rất đen.
夏天我晒黑了。|Mùa hè tôi bị đen đi.
天黑以前要回家。|Phải về nhà trước khi trời tối.
#黑板
请看黑板。|Hãy nhìn lên bảng.
老师在黑板上写字。|Thầy viết chữ lên bảng.
请把黑板擦干净。|Hãy lau sạch bảng.
黑板上的字我看不清楚。|Chữ trên bảng tôi nhìn không rõ.
他走到黑板前面。|Cậu ấy đi lên trước bảng.
#黑色
我喜欢黑色的衣服。|Tôi thích quần áo màu đen.
他的车是黑色的。|Xe của anh ấy màu đen.
这只猫是黑色的。|Con mèo này màu đen.
黑色很好看。|Màu đen rất đẹp.
有黑色的吗？|Có màu đen không?
#红色
红色在中国代表好运。|Màu đỏ ở Trung Quốc tượng trưng cho may mắn.
她穿了一条红色的裙子。|Cô ấy mặc một chiếc váy đỏ.
我最喜欢红色。|Tôi thích màu đỏ nhất.
春节到处都是红色。|Tết khắp nơi đều là màu đỏ.
红色的苹果很甜。|Táo đỏ rất ngọt.
#后来
后来我们成了好朋友。|Sau đó chúng tôi trở thành bạn tốt.
后来怎么样了？|Sau đó thế nào?
他开始不喜欢，后来喜欢上了。|Lúc đầu anh ấy không thích, về sau lại thích.
后来我再也没见过他。|Về sau tôi không gặp lại anh ấy nữa.
后来天就晴了。|Sau đó trời nắng.
#忽然
忽然下起了大雨。|Bỗng nhiên trời mưa to.
他忽然笑了。|Anh ấy bỗng nhiên cười.
灯忽然灭了。|Đèn bỗng nhiên tắt.
我忽然想起一件事。|Tôi bỗng nhớ ra một chuyện.
电话忽然响了。|Điện thoại bỗng reo.
#湖
湖边很漂亮。|Bờ hồ rất đẹp.
我们在湖上划船。|Chúng tôi chèo thuyền trên hồ.
河内有很多湖。|Hà Nội có nhiều hồ.
湖水很清。|Nước hồ rất trong.
每天早上我在湖边跑步。|Sáng nào tôi cũng chạy bộ quanh hồ.
#花园
我家有一个小花园。|Nhà tôi có một vườn hoa nhỏ.
花园里有很多花。|Trong vườn có nhiều hoa.
我们在花园里喝茶。|Chúng tôi uống trà trong vườn.
奶奶每天在花园里干活儿。|Bà ngày nào cũng làm việc trong vườn.
这个花园很美。|Vườn hoa này rất đẹp.
#画
她很会画画儿。|Cô ấy vẽ rất giỏi.
你画的是什么？|Bạn vẽ gì vậy?
墙上有一张画。|Trên tường có một bức tranh.
我想学画画儿。|Tôi muốn học vẽ.
他画了一只猫。|Anh ấy vẽ một con mèo.
#画儿
这张画儿很好看。|Bức tranh này rất đẹp.
孩子在纸上画画儿。|Đứa trẻ vẽ tranh trên giấy.
墙上挂着一张画儿。|Trên tường treo một bức tranh.
这是谁的画儿？|Đây là tranh của ai?
我送你一张画儿。|Tôi tặng bạn một bức tranh.
#画家
他是一位有名的画家。|Ông ấy là một họa sĩ nổi tiếng.
我想当画家。|Tôi muốn làm họa sĩ.
画家在画山。|Họa sĩ đang vẽ núi.
这是画家的家。|Đây là nhà của họa sĩ.
她爸爸是画家。|Bố cô ấy là họa sĩ.
#坏处
抽烟有很多坏处。|Hút thuốc có nhiều tác hại.
熬夜的坏处很多。|Thức khuya có nhiều tác hại.
这样做有什么坏处？|Làm vậy có hại gì?
每件事都有好处和坏处。|Việc gì cũng có mặt tốt và mặt xấu.
玩儿手机太多有坏处。|Chơi điện thoại quá nhiều có hại.
#坏人
警察抓住了坏人。|Cảnh sát bắt được kẻ xấu.
别跟坏人说话。|Đừng nói chuyện với kẻ xấu.
电影里的坏人很可怕。|Kẻ xấu trong phim rất đáng sợ.
他不是坏人。|Anh ấy không phải người xấu.
坏人最后被发现了。|Kẻ xấu cuối cùng bị phát hiện.
#换
我想换一件衣服。|Tôi muốn đổi bộ quần áo.
我们换个地方吧。|Chúng ta đổi chỗ khác nhé.
他换了新工作。|Anh ấy đổi công việc mới.
在这里换车。|Đổi xe ở đây.
这个可以换吗？|Cái này có đổi được không?
#黄
树叶黄了。|Lá cây vàng rồi.
香蕉是黄的。|Chuối màu vàng.
他的脸有点儿黄。|Mặt anh ấy hơi vàng.
秋天到了，叶子变黄了。|Mùa thu đến, lá chuyển vàng.
那辆黄车是我的。|Chiếc xe vàng kia là của tôi.
#黄色
我喜欢黄色。|Tôi thích màu vàng.
她穿着黄色的衣服。|Cô ấy mặc quần áo màu vàng.
黄色的花很漂亮。|Hoa màu vàng rất đẹp.
出租车是黄色的。|Xe taxi màu vàng.
有黄色的吗？|Có màu vàng không?
#回国
他下个月回国。|Tháng sau anh ấy về nước.
你什么时候回国？|Khi nào bạn về nước?
毕业以后我要回国工作。|Tốt nghiệp xong tôi sẽ về nước làm việc.
回国以前我想买点儿礼物。|Trước khi về nước tôi muốn mua ít quà.
他回国两年了。|Anh ấy về nước hai năm rồi.
#或
你可以坐车或走路去。|Bạn có thể đi xe hoặc đi bộ.
周末我在家看书或看电影。|Cuối tuần tôi ở nhà đọc sách hoặc xem phim.
请用汉语或英语回答。|Hãy trả lời bằng tiếng Trung hoặc tiếng Anh.
今天或明天都可以。|Hôm nay hoặc mai đều được.
喝茶或喝咖啡都行。|Uống trà hoặc cà phê đều được.
#或者
我们明天或者后天去。|Chúng ta đi ngày mai hoặc ngày kia.
你可以打电话或者发短信。|Bạn có thể gọi điện hoặc nhắn tin.
周末我去爬山或者游泳。|Cuối tuần tôi đi leo núi hoặc bơi.
你来或者我去都行。|Bạn đến hoặc tôi đi đều được.
吃米饭或者面条都可以。|Ăn cơm hoặc mì đều được.
#鸡
我家养了几只鸡。|Nhà tôi nuôi mấy con gà.
今天吃鸡肉。|Hôm nay ăn thịt gà.
鸡在院子里跑。|Gà chạy trong sân.
这只鸡很大。|Con gà này rất to.
我不吃鸡。|Tôi không ăn gà.
#级
你是几年级的学生？|Bạn là học sinh lớp mấy?
他通过了HSK三级。|Anh ấy đã đỗ HSK cấp ba.
我们是同一级的。|Chúng tôi cùng khóa.
今天有五级大风。|Hôm nay có gió cấp năm.
我的汉语水平是初级。|Trình độ tiếng Trung của tôi là sơ cấp.
#急
别急，慢慢说。|Đừng vội, nói từ từ.
我有急事要先走。|Tôi có việc gấp phải đi trước.
他急着回家。|Anh ấy vội về nhà.
找不到孩子，妈妈很急。|Không tìm thấy con, mẹ rất sốt ruột.
这件事不急。|Việc này không gấp.
#计算机
我的专业是计算机。|Chuyên ngành của tôi là máy tính.
他会用计算机。|Anh ấy biết dùng máy tính.
计算机改变了我们的生活。|Máy tính đã thay đổi cuộc sống chúng ta.
学校有一个计算机教室。|Trường có một phòng máy tính.
我在学计算机。|Tôi đang học máy tính.
#加
二加三等于五。|Hai cộng ba bằng năm.
咖啡里加点儿糖吧。|Cho thêm chút đường vào cà phê.
你加我的微信吧。|Bạn kết bạn WeChat với tôi nhé.
再加一个菜。|Gọi thêm một món.
他最近常常加班。|Dạo này anh ấy hay tăng ca.
#家长
明天学校开家长会。|Ngày mai trường họp phụ huynh.
家长们都很关心孩子。|Các phụ huynh đều rất quan tâm con cái.
请家长签字。|Xin phụ huynh ký tên.
老师给家长打电话。|Thầy giáo gọi điện cho phụ huynh.
他是我们班的家长代表。|Ông ấy là đại diện phụ huynh lớp chúng tôi.
#假期
假期你打算做什么？|Kỳ nghỉ bạn định làm gì?
假期我去旅游了。|Kỳ nghỉ tôi đi du lịch.
假期过得很快。|Kỳ nghỉ trôi qua rất nhanh.
这个假期很长。|Kỳ nghỉ này rất dài.
假期快结束了。|Kỳ nghỉ sắp kết thúc rồi.
#检查
请检查一下作业。|Hãy kiểm tra lại bài tập.
医生给我检查身体。|Bác sĩ khám sức khỏe cho tôi.
出门前检查一下门窗。|Trước khi ra ngoài kiểm tra cửa.
你检查过了吗？|Bạn kiểm tra chưa?
明天去医院检查。|Ngày mai đi bệnh viện kiểm tra.
#见到
很高兴见到你。|Rất vui được gặp bạn.
我昨天见到了老同学。|Hôm qua tôi gặp bạn học cũ.
你见到我的手机了吗？|Bạn có thấy điện thoại của tôi không?
好久没见到他了。|Lâu lắm không gặp anh ấy.
希望早点儿见到你。|Mong sớm gặp bạn.
#见过
我见过他一次。|Tôi đã gặp anh ấy một lần.
你见过熊猫吗？|Bạn đã thấy gấu trúc chưa?
我从来没见过雪。|Tôi chưa bao giờ thấy tuyết.
我们好像见过。|Hình như chúng ta đã gặp nhau.
这么漂亮的地方我第一次见过。|Lần đầu tôi thấy nơi đẹp như vậy.
#讲
老师讲得很清楚。|Thầy giảng rất rõ ràng.
请你讲一个故事。|Bạn kể một câu chuyện đi.
他讲汉语讲得很好。|Anh ấy nói tiếng Trung rất giỏi.
你讲慢一点儿。|Bạn nói chậm một chút.
今天讲第五课。|Hôm nay giảng bài năm.
#讲话
校长在讲话。|Hiệu trưởng đang phát biểu.
上课不要讲话。|Trong giờ học đừng nói chuyện.
他讲话很快。|Anh ấy nói rất nhanh.
请大家听他讲话。|Mọi người hãy nghe anh ấy nói.
他第一次在大家面前讲话。|Lần đầu anh ấy nói trước mọi người.
#交
请把作业交给老师。|Hãy nộp bài tập cho thầy.
我在中国交了很多朋友。|Tôi kết được nhiều bạn ở Trung Quốc.
你交钱了吗？|Bạn nộp tiền chưa?
明天要交报告。|Mai phải nộp báo cáo.
这件事交给我吧。|Việc này giao cho tôi nhé.
#交给
请把这本书交给他。|Hãy đưa cuốn sách này cho anh ấy.
这件事交给你了。|Việc này giao cho bạn đó.
我把钥匙交给了妈妈。|Tôi đưa chìa khóa cho mẹ.
作业交给班长。|Bài tập nộp cho lớp trưởng.
你可以把孩子交给我。|Bạn có thể giao đứa trẻ cho tôi.
#交通
这里的交通很方便。|Giao thông ở đây rất thuận tiện.
早上交通很拥挤。|Buổi sáng giao thông rất đông đúc.
要遵守交通规则。|Phải tuân thủ luật giao thông.
城市的交通越来越好了。|Giao thông thành phố ngày càng tốt.
地铁是最快的交通工具。|Tàu điện ngầm là phương tiện nhanh nhất.
#角
一块等于十角。|Một đồng bằng mười hào.
这个三块五角。|Cái này ba đồng năm hào.
房间的角里有一张桌子。|Ở góc phòng có một cái bàn.
桌子有四个角。|Cái bàn có bốn góc.
我在街角等你。|Tôi đợi bạn ở góc phố.
#角度
从这个角度看很漂亮。|Nhìn từ góc này rất đẹp.
换个角度想一想。|Thử nghĩ từ góc độ khác.
每个人看问题的角度不同。|Góc nhìn vấn đề của mỗi người khác nhau.
这张照片的角度不错。|Góc chụp của tấm ảnh này khá đẹp.
从学生的角度来说，这很难。|Từ góc độ học sinh mà nói, việc này rất khó.
#饺子
我们一起包饺子吧。|Chúng ta cùng gói sủi cảo nhé.
过年要吃饺子。|Tết phải ăn sủi cảo.
妈妈包的饺子很好吃。|Sủi cảo mẹ gói rất ngon.
我想吃二十个饺子。|Tôi muốn ăn hai mươi cái sủi cảo.
你会包饺子吗？|Bạn biết gói sủi cảo không?
#脚
我的脚很疼。|Chân tôi rất đau.
他的脚很大。|Chân anh ấy rất to.
走了一天，脚累了。|Đi cả ngày, chân mỏi rồi.
请把脚放下来。|Hãy bỏ chân xuống.
我的脚受伤了。|Chân tôi bị thương.
#叫作
这种花叫作玫瑰。|Loại hoa này gọi là hoa hồng.
大家都把他叫作"小王"。|Mọi người đều gọi anh ấy là "Tiểu Vương".
这个地方叫作什么？|Nơi này gọi là gì?
这种菜叫作火锅。|Món này gọi là lẩu.
我们把这一天叫作春节。|Chúng tôi gọi ngày này là Tết Xuân.
#教师
她是一名中学教师。|Cô ấy là giáo viên trung học.
我想当一名教师。|Tôi muốn làm giáo viên.
教师的工作很辛苦。|Công việc giáo viên rất vất vả.
学校有一百名教师。|Trường có một trăm giáo viên.
今天是教师节。|Hôm nay là ngày Nhà giáo.
#接
我去机场接你。|Tôi ra sân bay đón bạn.
妈妈去学校接孩子。|Mẹ đến trường đón con.
你接电话吧。|Bạn nghe điện thoại đi.
他接过我的书包。|Anh ấy đỡ lấy cặp sách của tôi.
明天谁来接我？|Mai ai đến đón tôi?
#接到
我接到了你的电话。|Tôi đã nhận được cuộc gọi của bạn.
他接到了大学的通知。|Anh ấy nhận được giấy báo của trường đại học.
你接到我的邮件了吗？|Bạn nhận được email của tôi chưa?
我在机场接到了朋友。|Tôi đón được bạn ở sân bay.
昨天接到一个好消息。|Hôm qua nhận được một tin vui.
#接受
我接受你的意见。|Tôi tiếp nhận ý kiến của bạn.
他接受了这份工作。|Anh ấy nhận công việc này.
我不能接受这个礼物。|Tôi không thể nhận món quà này.
大家都接受了这个计划。|Mọi người đều chấp nhận kế hoạch này.
你要学会接受失败。|Bạn phải học cách chấp nhận thất bại.
#接下来
接下来我们做什么？|Tiếp theo chúng ta làm gì?
接下来请大家听录音。|Tiếp theo mời mọi người nghe ghi âm.
接下来的几天会下雨。|Mấy ngày tới sẽ có mưa.
接下来轮到你了。|Tiếp theo đến lượt bạn.
接下来我们学第二课。|Tiếp theo chúng ta học bài hai.
#接着
你接着说吧。|Bạn nói tiếp đi.
他吃完饭接着工作。|Ăn cơm xong anh ấy tiếp tục làm việc.
雨停了，接着出了太阳。|Mưa tạnh, tiếp đó mặt trời ló ra.
请接着读下去。|Hãy đọc tiếp.
我们明天接着学。|Mai chúng ta học tiếp.
#街
这条街很热闹。|Con phố này rất náo nhiệt.
我们去街上走走吧。|Chúng ta ra phố đi dạo nhé.
街上有很多商店。|Trên phố có nhiều cửa hàng.
过街的时候要小心。|Khi qua đường phải cẩn thận.
他住在这条街上。|Anh ấy sống trên con phố này.
#节
今天有四节课。|Hôm nay có bốn tiết học.
第一节课八点开始。|Tiết đầu bắt đầu lúc tám giờ.
中秋节快乐！|Chúc Trung thu vui vẻ!
这节课很有意思。|Tiết học này rất thú vị.
下节课是汉语课。|Tiết sau là tiết tiếng Trung.
#节目
今天晚上有什么节目？|Tối nay có chương trình gì?
我喜欢看这个节目。|Tôi thích xem chương trình này.
晚会的节目很精彩。|Các tiết mục dạ hội rất đặc sắc.
我们班准备了一个节目。|Lớp chúng tôi chuẩn bị một tiết mục.
这个电视节目很有名。|Chương trình tivi này rất nổi tiếng.
#结果
考试结果出来了。|Kết quả thi có rồi.
结果怎么样？|Kết quả thế nào?
我们等了很久，结果他没来。|Chúng tôi đợi rất lâu, kết quả anh ấy không đến.
这个结果我很满意。|Tôi rất hài lòng với kết quả này.
努力就会有好结果。|Cố gắng sẽ có kết quả tốt.
#今后
今后我会更努力。|Từ nay về sau tôi sẽ cố gắng hơn.
今后请多关照。|Từ nay mong được giúp đỡ nhiều.
今后的路还很长。|Con đường phía trước còn dài.
今后我们常联系。|Sau này chúng ta liên lạc thường xuyên nhé.
今后不要再迟到了。|Từ nay đừng đến muộn nữa.
#斤
一斤苹果多少钱？|Một cân táo bao nhiêu tiền?
我买了两斤肉。|Tôi mua hai cân thịt.
这个西瓜有十斤。|Quả dưa hấu này nặng mười cân.
三块钱一斤。|Ba đồng một cân.
我胖了五斤。|Tôi béo lên năm cân.
#近
我家离学校很近。|Nhà tôi cách trường rất gần.
最近你忙吗？|Dạo này bạn có bận không?
走近一点儿。|Lại gần thêm chút.
附近有超市吗？|Gần đây có siêu thị không?
新年越来越近了。|Năm mới ngày càng gần.
#进入
请从这里进入。|Xin đi vào từ đây.
他进入了一家大公司。|Anh ấy vào làm ở một công ty lớn.
我们进入了第二轮比赛。|Chúng tôi vào vòng thi thứ hai.
天气进入了冬天。|Thời tiết đã vào đông.
没有票不能进入。|Không có vé không được vào.
#进行
会议正在进行。|Cuộc họp đang diễn ra.
比赛进行得很顺利。|Trận đấu diễn ra rất thuận lợi.
我们要对这件事进行调查。|Chúng ta phải tiến hành điều tra việc này.
考试下午两点进行。|Kỳ thi tiến hành lúc hai giờ chiều.
工作进行得怎么样了？|Công việc tiến triển thế nào rồi?
#经常
我经常去图书馆。|Tôi thường xuyên đến thư viện.
他经常迟到。|Anh ấy hay đến muộn.
我们经常一起吃饭。|Chúng tôi thường ăn cơm cùng nhau.
这里经常下雨。|Ở đây hay mưa.
你经常运动吗？|Bạn có thường vận động không?
#经理
他是我们公司的经理。|Ông ấy là giám đốc công ty chúng tôi.
经理今天不在。|Hôm nay giám đốc không có ở đây.
我要见你们经理。|Tôi muốn gặp giám đốc của các bạn.
经理让我写报告。|Giám đốc bảo tôi viết báo cáo.
新经理很年轻。|Giám đốc mới rất trẻ.
#酒
我不喝酒。|Tôi không uống rượu.
开车不能喝酒。|Lái xe không được uống rượu.
这瓶酒很贵。|Chai rượu này rất đắt.
他喝了一点儿酒。|Anh ấy uống chút rượu.
中国的白酒很有名。|Rượu trắng Trung Quốc rất nổi tiếng.
#就要
火车就要开了。|Tàu sắp chạy rồi.
我们就要毕业了。|Chúng tôi sắp tốt nghiệp rồi.
春节就要到了。|Tết sắp đến rồi.
电影就要开始了。|Phim sắp bắt đầu rồi.
他下个月就要结婚了。|Tháng sau anh ấy sẽ kết hôn.
#举
请举一个例子。|Hãy nêu một ví dụ.
他举起了手。|Anh ấy giơ tay lên.
这个箱子太重，我举不起来。|Cái hòm này nặng quá, tôi không nhấc lên được.
同意的请举手。|Ai đồng ý xin giơ tay.
他把孩子举得高高的。|Anh ấy nhấc đứa bé lên thật cao.
#举手
有问题请举手。|Có câu hỏi xin giơ tay.
他第一个举手回答。|Cậu ấy giơ tay trả lời đầu tiên.
同意的人请举手。|Ai đồng ý xin giơ tay.
上课说话前要举手。|Trong giờ học phải giơ tay trước khi nói.
大家都举手了。|Mọi người đều giơ tay.
#举行
运动会明天举行。|Đại hội thể thao tổ chức vào ngày mai.
晚会在学校举行。|Dạ hội tổ chức ở trường.
他们下个月举行婚礼。|Tháng sau họ tổ chức đám cưới.
比赛在北京举行。|Cuộc thi được tổ chức ở Bắc Kinh.
会议什么时候举行？|Khi nào cuộc họp diễn ra?
#句
这句话是什么意思？|Câu này có nghĩa là gì?
请再说一句。|Xin nói thêm một câu.
我一句也听不懂。|Tôi không hiểu một câu nào.
他只说了一句"谢谢"。|Anh ấy chỉ nói một câu "Cảm ơn".
这句很难翻译。|Câu này rất khó dịch.
#句子
请用这个词造句子。|Hãy dùng từ này đặt câu.
这个句子太长了。|Câu này dài quá.
请读一下这个句子。|Hãy đọc câu này.
句子里有一个错字。|Trong câu có một chữ sai.
我会写简单的句子。|Tôi biết viết câu đơn giản.
#卡
我用卡付钱。|Tôi trả tiền bằng thẻ.
你有银行卡吗？|Bạn có thẻ ngân hàng không?
我的学生卡丢了。|Thẻ học sinh của tôi mất rồi.
门卡在桌子上。|Thẻ cửa ở trên bàn.
可以刷卡吗？|Có quẹt thẻ được không?
#开机
请开机。|Hãy bật máy.
我的手机开不了机。|Điện thoại tôi không bật lên được.
电脑开机很慢。|Máy tính khởi động rất chậm.
下飞机以后再开机。|Xuống máy bay rồi hẵng bật máy.
你开机了吗？|Bạn mở máy chưa?
#开学
九月一号开学。|Mùng một tháng chín khai giảng.
快开学了。|Sắp vào học rồi.
开学以后我很忙。|Vào học rồi tôi rất bận.
开学第一天我认识了新朋友。|Ngày đầu vào học tôi quen bạn mới.
你们什么时候开学？|Khi nào các bạn vào học?
#考生
考生请进考场。|Mời thí sinh vào phòng thi.
今年考生很多。|Năm nay thí sinh rất đông.
每个考生都很紧张。|Thí sinh nào cũng căng thẳng.
考生要带准考证。|Thí sinh phải mang giấy báo dự thi.
这个考生考了第一名。|Thí sinh này đứng thứ nhất.
#靠
他靠在墙上。|Anh ấy dựa vào tường.
我想坐靠窗的位子。|Tôi muốn ngồi chỗ gần cửa sổ.
学习要靠自己。|Học tập phải dựa vào bản thân.
他靠打工挣钱。|Anh ấy kiếm tiền nhờ làm thêm.
车靠边停一下。|Xe tấp vào lề dừng một chút.
#科
你最喜欢哪一科？|Bạn thích môn nào nhất?
我数学这一科考得最好。|Môn toán tôi thi tốt nhất.
他去外科看病。|Anh ấy đi khám khoa ngoại.
这次考试有五科。|Kỳ thi này có năm môn.
她在儿科工作。|Cô ấy làm ở khoa nhi.
#科学
我喜欢科学。|Tôi thích khoa học.
科学让生活更方便。|Khoa học giúp cuộc sống tiện lợi hơn.
这种方法很科学。|Phương pháp này rất khoa học.
他在读科学书。|Cậu ấy đang đọc sách khoa học.
我们要相信科学。|Chúng ta phải tin vào khoa học.
#科学家
我想当科学家。|Tôi muốn làm nhà khoa học.
他是一位有名的科学家。|Ông ấy là nhà khoa học nổi tiếng.
科学家发现了新东西。|Các nhà khoa học phát hiện điều mới.
科学家每天都在做实验。|Nhà khoa học ngày nào cũng làm thí nghiệm.
这位科学家很年轻。|Nhà khoa học này rất trẻ.
#可能
明天可能下雨。|Ngày mai có thể mưa.
他可能不来了。|Có lẽ anh ấy không đến nữa.
这不可能！|Không thể nào!
你可能听错了。|Có lẽ bạn nghe nhầm.
有没有可能早一点儿？|Có thể sớm hơn chút không?
#可怕
这个电影很可怕。|Bộ phim này rất đáng sợ.
晚上一个人走路有点儿可怕。|Buổi tối đi một mình hơi đáng sợ.
那只狗很可怕。|Con chó kia rất đáng sợ.
失败并不可怕。|Thất bại không có gì đáng sợ.
昨天的雨可怕极了。|Trận mưa hôm qua đáng sợ quá.
#可是
我想去，可是没有钱。|Tôi muốn đi nhưng không có tiền.
他很努力，可是成绩不好。|Anh ấy rất cố gắng nhưng kết quả không tốt.
这个房子很大，可是很贵。|Căn nhà này rộng nhưng rất đắt.
我等了他很久，可是他没来。|Tôi đợi anh ấy lâu nhưng anh ấy không đến.
今天天气很好，可是我要上班。|Hôm nay trời đẹp nhưng tôi phải đi làm.
#克
这个苹果大概两百克。|Quả táo này khoảng hai trăm gam.
请给我五百克肉。|Cho tôi năm trăm gam thịt.
一公斤是一千克。|Một ki-lô-gam là một nghìn gam.
这块巧克力一百克。|Thanh sô-cô-la này một trăm gam.
每天吃几克盐比较好？|Mỗi ngày ăn mấy gam muối thì tốt?
#刻
现在是三点一刻。|Bây giờ là ba giờ mười lăm.
我们七点三刻见。|Chúng ta gặp lúc bảy giờ bốn mươi lăm.
他立刻就来。|Anh ấy đến ngay lập tức.
差一刻九点。|Chín giờ kém mười lăm.
我等了一刻钟。|Tôi đợi mười lăm phút.
#客人
今天家里有客人。|Hôm nay nhà có khách.
客人来了，快开门。|Khách đến rồi, mau mở cửa.
请客人喝茶。|Mời khách uống trà.
饭馆里客人很多。|Trong quán có rất nhiều khách.
他是我们的客人。|Anh ấy là khách của chúng tôi.
#课堂
课堂上要认真听讲。|Trong giờ học phải chăm chú nghe giảng.
课堂气氛很好。|Không khí lớp học rất tốt.
他在课堂上睡着了。|Cậu ấy ngủ gật trong giờ học.
这是课堂练习。|Đây là bài tập trên lớp.
课堂上大家都很积极。|Trong lớp mọi người đều rất tích cực.
#哭
孩子哭了。|Đứa bé khóc rồi.
别哭了。|Đừng khóc nữa.
她高兴得哭了。|Cô ấy vui đến phát khóc.
你为什么哭？|Sao bạn khóc?
他从来不哭。|Anh ấy chưa bao giờ khóc.
#快餐
我们吃快餐吧。|Chúng ta ăn đồ ăn nhanh nhé.
快餐很方便，但不太健康。|Đồ ăn nhanh tiện nhưng không tốt cho sức khỏe lắm.
附近有一家快餐店。|Gần đây có một quán đồ ăn nhanh.
中午我常吃快餐。|Buổi trưa tôi hay ăn đồ ăn nhanh.
孩子们喜欢吃快餐。|Trẻ con thích ăn đồ ăn nhanh.
#快点儿
快点儿，要迟到了！|Nhanh lên, sắp muộn rồi!
你快点儿说吧。|Bạn nói nhanh lên.
请快点儿回来。|Hãy về nhanh nhé.
快点儿吃饭。|Ăn cơm nhanh lên.
我们走快点儿。|Chúng ta đi nhanh lên chút.
#快要
快要考试了。|Sắp thi rồi.
天快要黑了。|Trời sắp tối rồi.
我快要到了。|Tôi sắp đến rồi.
电影快要开始了。|Phim sắp bắt đầu rồi.
冬天快要过去了。|Mùa đông sắp qua rồi.
#筷子
你会用筷子吗？|Bạn biết dùng đũa không?
请给我一双筷子。|Cho tôi một đôi đũa.
中国人吃饭用筷子。|Người Trung Quốc ăn cơm bằng đũa.
筷子掉了。|Đũa rơi rồi.
这双筷子很漂亮。|Đôi đũa này rất đẹp.
#拉
请拉开门。|Hãy kéo cửa ra.
他拉着我的手。|Anh ấy kéo tay tôi.
她会拉小提琴。|Cô ấy biết kéo vĩ cầm.
请把窗帘拉上。|Hãy kéo rèm lại.
孩子拉着妈妈不让她走。|Đứa bé níu mẹ không cho đi.
#来自
我来自越南。|Tôi đến từ Việt Nam.
他来自一个小城市。|Anh ấy đến từ một thành phố nhỏ.
你来自哪里？|Bạn đến từ đâu?
同学们来自不同的国家。|Các bạn học đến từ nhiều nước khác nhau.
这些水果来自南方。|Chỗ hoa quả này đến từ miền Nam.
#蓝
天很蓝。|Trời rất xanh.
我喜欢蓝衣服。|Tôi thích quần áo màu xanh lam.
大海又蓝又美。|Biển vừa xanh vừa đẹp.
他的眼睛是蓝的。|Mắt anh ấy màu xanh.
这支笔是蓝的。|Cây bút này màu xanh lam.
#篮球
我们去打篮球吧。|Chúng ta đi chơi bóng rổ nhé.
他篮球打得很好。|Anh ấy chơi bóng rổ rất giỏi.
我买了一个新篮球。|Tôi mua một quả bóng rổ mới.
学校有篮球场。|Trường có sân bóng rổ.
你喜欢看篮球比赛吗？|Bạn có thích xem bóng rổ không?
#老年
老年人要多运动。|Người già phải vận động nhiều.
这是老年大学。|Đây là trường đại học dành cho người cao tuổi.
老年生活很幸福。|Cuộc sống tuổi già rất hạnh phúc.
公园里老年人很多。|Trong công viên có nhiều người già.
老年人坐车不用钱。|Người cao tuổi đi xe không mất tiền.
#老朋友
他是我的老朋友。|Anh ấy là bạn cũ của tôi.
昨天见了几个老朋友。|Hôm qua gặp mấy người bạn cũ.
我们是二十年的老朋友了。|Chúng tôi là bạn bè hai mươi năm rồi.
老朋友见面很高兴。|Bạn cũ gặp lại rất vui.
欢迎老朋友来我家。|Chào mừng bạn cũ đến nhà tôi.
#老是
他老是迟到。|Anh ấy cứ hay đến muộn.
你老是看手机。|Bạn cứ suốt ngày xem điện thoại.
最近老是下雨。|Dạo này cứ mưa suốt.
我老是忘记带钥匙。|Tôi cứ hay quên mang chìa khóa.
他老是问同一个问题。|Anh ấy cứ hỏi đi hỏi lại một câu.
#离开
他已经离开了。|Anh ấy đã rời đi rồi.
我明天离开北京。|Mai tôi rời Bắc Kinh.
离开房间要关灯。|Rời phòng phải tắt đèn.
我不想离开这里。|Tôi không muốn rời khỏi đây.
他离开家已经三年了。|Anh ấy xa nhà đã ba năm.
#里头
里头有什么？|Bên trong có gì?
请到里头坐。|Mời vào trong ngồi.
箱子里头都是书。|Trong thùng toàn là sách.
外头冷，里头暖和。|Bên ngoài lạnh, bên trong ấm.
他在里头等你。|Anh ấy đợi bạn ở bên trong.
#理想
我的理想是当医生。|Ước mơ của tôi là làm bác sĩ.
这个结果很理想。|Kết quả này rất lý tưởng.
你有什么理想？|Bạn có lý tưởng gì?
年轻人要有理想。|Người trẻ phải có lý tưởng.
这里是理想的旅游地方。|Đây là nơi du lịch lý tưởng.
#例如
我喜欢运动，例如游泳和跑步。|Tôi thích thể thao, ví dụ bơi và chạy bộ.
有些水果很甜，例如西瓜。|Có loại quả rất ngọt, ví dụ dưa hấu.
很多国家，例如越南，都过春节。|Nhiều nước, ví dụ Việt Nam, đều ăn Tết.
例如这个字，有两个读音。|Ví dụ chữ này có hai cách đọc.
你可以学一些乐器，例如吉他。|Bạn có thể học nhạc cụ, ví dụ ghi-ta.
#例子
请举一个例子。|Hãy nêu một ví dụ.
这个例子很好。|Ví dụ này rất hay.
老师给我们讲了几个例子。|Thầy giảng cho chúng tôi mấy ví dụ.
看了例子就明白了。|Xem ví dụ là hiểu.
每个词有五个例子。|Mỗi từ có năm ví dụ.
#脸
他的脸红了。|Mặt anh ấy đỏ lên.
我去洗脸。|Tôi đi rửa mặt.
她有一张圆圆的脸。|Cô ấy có khuôn mặt tròn.
你的脸怎么了？|Mặt bạn sao thế?
他笑得满脸都是汗。|Anh ấy cười mồ hôi đầy mặt.
#练
我每天练汉字。|Ngày nào tôi cũng luyện chữ Hán.
你练了多长时间？|Bạn luyện bao lâu rồi?
他在练跑步。|Anh ấy đang luyện chạy.
多练就会了。|Luyện nhiều là biết.
我想练一练口语。|Tôi muốn luyện khẩu ngữ.
#凉
水有点儿凉。|Nước hơi lạnh.
菜凉了，热一下吧。|Đồ ăn nguội rồi, hâm lại đi.
晚上风很凉。|Buổi tối gió rất mát.
天凉了，多穿点儿。|Trời trở lạnh, mặc thêm áo.
我想喝凉的。|Tôi muốn uống đồ lạnh.
#凉快
今天很凉快。|Hôm nay rất mát mẻ.
树下很凉快。|Dưới gốc cây rất mát.
秋天的天气很凉快。|Thời tiết mùa thu rất mát mẻ.
开窗户凉快一点儿。|Mở cửa sổ cho mát một chút.
山上比山下凉快。|Trên núi mát hơn dưới núi.
#亮
天亮了。|Trời sáng rồi.
房间里很亮。|Trong phòng rất sáng.
灯亮了。|Đèn sáng rồi.
月亮很亮。|Mặt trăng rất sáng.
她的眼睛很亮。|Đôi mắt cô ấy rất sáng.
#辆
门口停着一辆车。|Trước cửa đỗ một chiếc xe.
我买了一辆自行车。|Tôi mua một chiếc xe đạp.
这辆车是谁的？|Chiếc xe này của ai?
路上有很多辆车。|Trên đường có nhiều xe.
那辆公共汽车去哪儿？|Chiếc xe buýt kia đi đâu?
#零下
今天零下五度。|Hôm nay âm năm độ.
冬天这里常常零下。|Mùa đông ở đây thường dưới không độ.
零下的天气很冷。|Thời tiết dưới không độ rất lạnh.
晚上会到零下十度。|Buổi tối sẽ xuống âm mười độ.
我没去过零下的地方。|Tôi chưa từng đến nơi dưới không độ.
#流
河水向东流。|Nước sông chảy về phía đông.
他流了很多汗。|Anh ấy chảy rất nhiều mồ hôi.
她感动得流下了眼泪。|Cô ấy cảm động rơi nước mắt.
时间像水一样流走了。|Thời gian trôi đi như nước.
水从这里流出来。|Nước chảy ra từ đây.
#流利
他的汉语说得很流利。|Anh ấy nói tiếng Trung rất lưu loát.
我想说一口流利的汉语。|Tôi muốn nói tiếng Trung lưu loát.
她英语很流利。|Tiếng Anh của cô ấy rất lưu loát.
多练习就能说得流利。|Luyện nhiều là nói được lưu loát.
他回答得很流利。|Anh ấy trả lời rất trôi chảy.
#流行
这首歌现在很流行。|Bài hát này đang rất thịnh hành.
今年流行什么颜色？|Năm nay thịnh hành màu gì?
最近感冒很流行。|Dạo này bệnh cảm đang lây lan.
这种衣服在年轻人中很流行。|Kiểu quần áo này rất phổ biến trong giới trẻ.
流行的东西变得很快。|Đồ thời thượng thay đổi rất nhanh.
#留下
请留下你的电话。|Hãy để lại số điện thoại của bạn.
他留下来帮忙。|Anh ấy ở lại giúp.
这里给我留下了很深的印象。|Nơi này để lại ấn tượng sâu sắc cho tôi.
你可以留下吃饭吗？|Bạn ở lại ăn cơm được không?
他什么也没留下就走了。|Anh ấy đi mà không để lại gì.
#留学生
我是越南留学生。|Tôi là du học sinh Việt Nam.
学校里有很多留学生。|Trong trường có nhiều du học sinh.
留学生宿舍在那边。|Ký túc xá du học sinh ở bên kia.
他在中国当留学生。|Anh ấy là du học sinh ở Trung Quốc.
留学生要学汉语。|Du học sinh phải học tiếng Trung.
#路边
路边有很多小吃。|Bên đường có nhiều món ăn vặt.
车停在路边。|Xe đỗ bên lề đường.
路边的花开了。|Hoa ven đường nở rồi.
我在路边等你。|Tôi đợi bạn bên đường.
路边有一个小商店。|Bên đường có một cửa hàng nhỏ.
#旅客
各位旅客请注意。|Quý hành khách xin chú ý.
火车站里旅客很多。|Trong ga tàu rất đông hành khách.
旅客们上车了。|Các hành khách lên xe rồi.
请旅客们拿好东西。|Xin hành khách giữ đồ cẩn thận.
这个酒店的旅客大多是外国人。|Khách của khách sạn này phần lớn là người nước ngoài.
#绿
树叶绿了。|Lá cây xanh rồi.
春天到处都是绿的。|Mùa xuân khắp nơi xanh tươi.
绿灯亮了，可以走了。|Đèn xanh sáng, đi được rồi.
这件衣服是绿的。|Bộ quần áo này màu xanh lá.
山上很绿。|Trên núi rất xanh.
#绿色
我喜欢绿色。|Tôi thích màu xanh lá.
绿色的树很漂亮。|Cây xanh rất đẹp.
我们要过绿色的生活。|Chúng ta phải sống xanh.
他穿着绿色的衣服。|Anh ấy mặc quần áo màu xanh lá.
绿色食品对身体好。|Thực phẩm sạch tốt cho cơ thể.
#卖
这里卖什么？|Ở đây bán gì?
票卖完了。|Vé bán hết rồi.
他在市场卖水果。|Anh ấy bán hoa quả ở chợ.
这个怎么卖？|Cái này bán thế nào?
我想把旧车卖了。|Tôi muốn bán chiếc xe cũ.
#满
杯子里的水满了。|Cốc nước đầy rồi.
教室里坐满了学生。|Lớp học ngồi kín học sinh.
停车场满了。|Bãi đỗ xe đầy rồi.
他今年满十八岁了。|Năm nay cậu ấy tròn mười tám tuổi.
不要倒得太满。|Đừng rót đầy quá.
#满意
你对这个房间满意吗？|Bạn hài lòng với căn phòng này không?
我很满意。|Tôi rất hài lòng.
老师对我的作业很满意。|Thầy rất hài lòng với bài tập của tôi.
顾客不满意怎么办？|Khách không hài lòng thì làm sao?
这个结果让大家都很满意。|Kết quả này khiến mọi người đều hài lòng.
#米
他身高一米八。|Anh ấy cao một mét tám.
这条路宽十米。|Con đường này rộng mười mét.
我们家每个月吃二十斤米。|Nhà tôi mỗi tháng ăn hai mươi cân gạo.
我跑了一百米。|Tôi chạy một trăm mét.
这里离车站五百米。|Chỗ này cách bến xe năm trăm mét.
#面
我们见过一面。|Chúng tôi từng gặp một lần.
我想吃一碗面。|Tôi muốn ăn một bát mì.
桌面很干净。|Mặt bàn rất sạch.
外面下雨了。|Bên ngoài mưa rồi.
请看前面。|Hãy nhìn phía trước.
#名
我们班有三十名学生。|Lớp chúng tôi có ba mươi học sinh.
他考了第一名。|Cậu ấy thi được hạng nhất.
他是一名老师。|Anh ấy là một giáo viên.
这是一家有名的饭馆。|Đây là một quán ăn nổi tiếng.
请在这里签名。|Hãy ký tên ở đây.
#名称
这个地方的名称是什么？|Tên gọi của nơi này là gì?
请写出公司的名称。|Hãy viết tên công ty.
这两个名称不一样。|Hai tên gọi này khác nhau.
这种水果有很多名称。|Loại quả này có nhiều tên gọi.
名称写错了。|Tên viết sai rồi.
#名单
你的名字在名单上。|Tên bạn có trong danh sách.
请看一下名单。|Hãy xem danh sách.
名单上有二十个人。|Danh sách có hai mươi người.
我没在名单上找到他的名字。|Tôi không thấy tên anh ấy trong danh sách.
明天公布名单。|Ngày mai công bố danh sách.
#明星
她是一个电影明星。|Cô ấy là một ngôi sao điện ảnh.
你喜欢哪个明星？|Bạn thích ngôi sao nào?
很多年轻人喜欢明星。|Nhiều người trẻ thích ngôi sao.
他成了篮球明星。|Anh ấy trở thành ngôi sao bóng rổ.
明星也是普通人。|Ngôi sao cũng là người bình thường.
#拿出
请拿出你的书。|Hãy lấy sách của bạn ra.
他从包里拿出手机。|Anh ấy lấy điện thoại từ trong túi ra.
拿出你的护照。|Lấy hộ chiếu của bạn ra.
妈妈从冰箱里拿出水果。|Mẹ lấy hoa quả từ tủ lạnh ra.
你要拿出勇气来。|Bạn phải lấy hết can đảm.
#拿到
我拿到了驾照。|Tôi đã lấy được bằng lái.
你拿到票了吗？|Bạn lấy được vé chưa?
他拿到了第一名。|Anh ấy giành được hạng nhất.
我拿到工资就请你吃饭。|Nhận lương tôi sẽ mời bạn ăn cơm.
东西拿到了，谢谢！|Đồ nhận được rồi, cảm ơn!
#那会儿
那会儿我还是学生。|Lúc đó tôi vẫn là học sinh.
你来的那会儿我不在家。|Lúc bạn đến tôi không có nhà.
那会儿我们很穷。|Hồi đó chúng tôi rất nghèo.
那会儿天已经黑了。|Lúc đó trời đã tối rồi.
那会儿你在做什么？|Lúc đó bạn đang làm gì?
#那时
那时我只有五岁。|Lúc đó tôi mới năm tuổi.
那时这里没有高楼。|Hồi đó ở đây không có nhà cao tầng.
那时我们常常一起玩儿。|Hồi đó chúng tôi hay chơi với nhau.
到了那时你就明白了。|Đến lúc đó bạn sẽ hiểu.
那时我刚来中国。|Lúc đó tôi vừa đến Trung Quốc.
#那时候
那时候我在上大学。|Lúc đó tôi đang học đại học.
那时候的生活很简单。|Cuộc sống hồi đó rất đơn giản.
那时候你几岁？|Lúc đó bạn mấy tuổi?
那时候没有手机。|Hồi đó không có điện thoại di động.
那时候我们住在农村。|Hồi đó chúng tôi sống ở nông thôn.
#那样
别那样做。|Đừng làm như thế.
我也想像他那样。|Tôi cũng muốn được như anh ấy.
那样太累了。|Như thế mệt quá.
你那样说不对。|Bạn nói như thế là không đúng.
没有你想的那样难。|Không khó như bạn nghĩ.
#南方
我是南方人。|Tôi là người miền Nam.
南方的冬天不太冷。|Mùa đông miền Nam không lạnh lắm.
南方人喜欢吃米饭。|Người miền Nam thích ăn cơm.
我想去南方旅游。|Tôi muốn đi du lịch miền Nam.
南方常常下雨。|Miền Nam hay mưa.
#难看
这件衣服很难看。|Bộ quần áo này rất xấu.
他的脸色很难看。|Sắc mặt anh ấy rất khó coi.
我的字写得很难看。|Chữ tôi viết rất xấu.
这个颜色不难看。|Màu này không xấu.
这样做太难看了。|Làm vậy khó coi lắm.
#难受
我肚子很难受。|Bụng tôi rất khó chịu.
感冒了，很难受。|Bị cảm, rất khó chịu.
听到这个消息我很难受。|Nghe tin này tôi rất buồn.
天太热了，真难受。|Trời nóng quá, khó chịu thật.
你哪儿难受？|Bạn khó chịu ở đâu?
#难题
这是一道难题。|Đây là một câu hỏi khó.
他帮我解决了难题。|Anh ấy giúp tôi giải quyết vấn đề khó.
我遇到了一个难题。|Tôi gặp phải một vấn đề nan giải.
这道难题谁会做？|Câu khó này ai làm được?
找工作是个难题。|Tìm việc là một bài toán khó.
#难听
这首歌很难听。|Bài hát này rất khó nghe.
别说难听的话。|Đừng nói lời khó nghe.
他唱歌很难听。|Anh ấy hát rất dở.
这个声音太难听了。|Âm thanh này khó nghe quá.
他说的话很难听。|Lời anh ấy nói rất khó nghe.
#能够
我能够自己做。|Tôi có thể tự làm.
他能够说三种语言。|Anh ấy nói được ba thứ tiếng.
希望你能够来。|Hy vọng bạn có thể đến.
我们能够完成任务。|Chúng ta có thể hoàn thành nhiệm vụ.
只要努力就能够成功。|Chỉ cần cố gắng là có thể thành công.
#鸟
树上有一只鸟。|Trên cây có một con chim.
鸟在天上飞。|Chim bay trên trời.
早上我听到鸟叫。|Buổi sáng tôi nghe tiếng chim hót.
他养了两只鸟。|Anh ấy nuôi hai con chim.
这只鸟很漂亮。|Con chim này rất đẹp.
#弄
你在弄什么？|Bạn đang làm gì vậy?
我把电脑弄坏了。|Tôi làm hỏng máy tính rồi.
别弄脏衣服。|Đừng làm bẩn quần áo.
这个问题我弄明白了。|Vấn đề này tôi hiểu rõ rồi.
我来弄饭吧。|Để tôi làm cơm nhé.
#爬
我们去爬山吧。|Chúng ta đi leo núi nhé.
孩子在地上爬。|Đứa bé bò dưới đất.
猫爬到树上了。|Con mèo trèo lên cây rồi.
爬楼梯对身体好。|Leo cầu thang tốt cho cơ thể.
他爬得很快。|Anh ấy leo rất nhanh.
#怕
我怕狗。|Tôi sợ chó.
别怕，我在这儿。|Đừng sợ, có tôi ở đây.
我怕他不来。|Tôi sợ anh ấy không đến.
她最怕冷。|Cô ấy sợ lạnh nhất.
你怕什么？|Bạn sợ gì?
#排
我们排在最后。|Chúng tôi xếp ở cuối.
他坐在第一排。|Anh ấy ngồi hàng thứ nhất.
请大家排好队。|Mời mọi người xếp hàng ngay ngắn.
这里有一排树。|Ở đây có một hàng cây.
我排了很长时间的队。|Tôi xếp hàng rất lâu.
#排球
她喜欢打排球。|Cô ấy thích chơi bóng chuyền.
我们学校的排球队很强。|Đội bóng chuyền trường chúng tôi rất mạnh.
今天下午有排球比赛。|Chiều nay có trận bóng chuyền.
排球比篮球难吗？|Bóng chuyền có khó hơn bóng rổ không?
我们一起打排球吧。|Chúng ta cùng chơi bóng chuyền nhé.
#碰
别碰我的东西。|Đừng chạm vào đồ của tôi.
他的头碰到了门。|Đầu anh ấy đụng vào cửa.
两辆车碰在一起了。|Hai chiếc xe va vào nhau.
这个不能碰水。|Cái này không được dính nước.
我们明天碰个面吧。|Mai chúng ta gặp mặt nhé.
#碰到
我在路上碰到了老师。|Tôi gặp thầy trên đường.
碰到问题可以问我。|Gặp vấn đề có thể hỏi tôi.
他碰到了很多困难。|Anh ấy gặp nhiều khó khăn.
我的手碰到了热水。|Tay tôi chạm phải nước nóng.
真巧，在这里碰到你。|Thật trùng hợp, gặp bạn ở đây.
#碰见
我昨天碰见了小王。|Hôm qua tôi tình cờ gặp Tiểu Vương.
在超市碰见了老同学。|Gặp bạn học cũ ở siêu thị.
没想到会碰见你。|Không ngờ lại gặp bạn.
我们在门口碰见了。|Chúng tôi gặp nhau ở cổng.
你碰见他了吗？|Bạn có gặp anh ấy không?
#篇
我写了一篇文章。|Tôi viết một bài văn.
这篇课文很长。|Bài khóa này rất dài.
请读一下这篇文章。|Hãy đọc bài viết này.
他每天写一篇日记。|Mỗi ngày anh ấy viết một trang nhật ký.
这篇作文写得很好。|Bài văn này viết rất hay.
#片
我吃了两片面包。|Tôi ăn hai lát bánh mì.
树上的叶片都黄了。|Lá trên cây đều vàng rồi.
这是一部新影片。|Đây là một bộ phim mới.
医生让我吃两片药。|Bác sĩ bảo tôi uống hai viên thuốc.
前面是一片大海。|Phía trước là một vùng biển rộng.
#平
这条路很平。|Con đường này rất bằng phẳng.
把纸放平。|Đặt tờ giấy cho phẳng.
比赛打平了。|Trận đấu hòa rồi.
他的成绩很平常。|Thành tích của anh ấy bình thường.
这里地很平，适合骑车。|Ở đây đất bằng, hợp đạp xe.
#平安
祝你一路平安。|Chúc bạn thượng lộ bình an.
到了给我报个平安。|Đến nơi báo bình an cho tôi.
全家人都平安。|Cả nhà đều bình an.
平安就是福。|Bình an là phúc.
希望你平平安安。|Mong bạn luôn bình an.
#平常
我平常七点起床。|Bình thường tôi dậy lúc bảy giờ.
今天跟平常不一样。|Hôm nay khác với mọi khi.
这是很平常的事。|Đây là chuyện rất bình thường.
他平常不喝酒。|Bình thường anh ấy không uống rượu.
平常你做什么运动？|Bình thường bạn tập môn thể thao gì?
#平等
男女平等。|Nam nữ bình đẳng.
每个人都是平等的。|Mỗi người đều bình đẳng.
我们要平等对待每个人。|Chúng ta phải đối xử bình đẳng với mọi người.
他们之间的关系很平等。|Quan hệ giữa họ rất bình đẳng.
大家都有平等的机会。|Mọi người đều có cơ hội bình đẳng.
#瓶
我要一瓶水。|Tôi muốn một chai nước.
他喝了两瓶啤酒。|Anh ấy uống hai chai bia.
桌子上有一瓶花。|Trên bàn có một bình hoa.
这瓶牛奶多少钱？|Chai sữa này bao nhiêu tiền?
请再给我一瓶。|Cho tôi thêm một chai.
#瓶子
这个瓶子是空的。|Cái chai này rỗng.
请把瓶子扔了。|Hãy vứt cái chai đi.
瓶子里有什么？|Trong chai có gì?
我把水倒进瓶子里。|Tôi đổ nước vào chai.
这个瓶子很漂亮。|Cái chai này rất đẹp.
#普通
我是一个普通人。|Tôi là một người bình thường.
这是普通的衣服。|Đây là quần áo bình thường.
他住在一个普通的房子里。|Anh ấy sống trong một căn nhà bình thường.
普通票多少钱？|Vé thường bao nhiêu tiền?
这个问题很普通。|Vấn đề này rất phổ biến.
#普通话
你会说普通话吗？|Bạn biết nói tiếng phổ thông không?
他的普通话很标准。|Tiếng phổ thông của anh ấy rất chuẩn.
我在学普通话。|Tôi đang học tiếng phổ thông.
请说普通话。|Xin nói tiếng phổ thông.
中国人都会说普通话吗？|Người Trung Quốc ai cũng biết tiếng phổ thông à?
#其他
其他人都走了。|Những người khác đều đi rồi.
你还有其他问题吗？|Bạn còn câu hỏi nào khác không?
其他的东西放这里。|Đồ khác để ở đây.
我不知道其他的办法。|Tôi không biết cách nào khác.
除了汉语，我还学其他语言。|Ngoài tiếng Trung tôi còn học ngôn ngữ khác.
#其中
我们班有二十人，其中十个是女生。|Lớp chúng tôi có hai mươi người, trong đó mười bạn nữ.
我买了很多水果，其中有苹果。|Tôi mua nhiều hoa quả, trong đó có táo.
他去过很多国家，其中最喜欢中国。|Anh ấy đến nhiều nước, trong đó thích Trung Quốc nhất.
这些书其中两本是我的。|Trong số sách này có hai quyển là của tôi.
其中的道理很简单。|Đạo lý trong đó rất đơn giản.
#骑车
我每天骑车上学。|Ngày nào tôi cũng đạp xe đi học.
骑车要注意安全。|Đạp xe phải chú ý an toàn.
你会骑车吗？|Bạn biết đi xe đạp không?
周末我们骑车去公园。|Cuối tuần chúng tôi đạp xe đi công viên.
骑车比走路快。|Đạp xe nhanh hơn đi bộ.
#起飞
飞机马上就要起飞了。|Máy bay sắp cất cánh rồi.
飞机几点起飞？|Máy bay mấy giờ cất cánh?
飞机起飞晚了一个小时。|Máy bay cất cánh muộn một tiếng.
起飞的时候请关手机。|Khi cất cánh xin tắt điện thoại.
飞机已经起飞了。|Máy bay đã cất cánh rồi.
#气
房间里的空气不好，开窗户换换气。|Không khí trong phòng không tốt, mở cửa cho thoáng.
他气得说不出话。|Anh ấy giận đến không nói nên lời.
别生气了。|Đừng giận nữa.
今天天气不错。|Hôm nay thời tiết khá đẹp.
自行车没气了。|Xe đạp hết hơi rồi.
#气温
今天气温很高。|Hôm nay nhiệt độ rất cao.
晚上气温会降低。|Buổi tối nhiệt độ sẽ giảm.
明天气温多少度？|Ngày mai nhiệt độ bao nhiêu độ?
这里一年的气温变化不大。|Nhiệt độ ở đây cả năm thay đổi không nhiều.
气温下降了十度。|Nhiệt độ giảm mười độ.
#千
这本书三千字。|Cuốn sách này ba nghìn chữ.
这个手机两千块。|Chiếc điện thoại này hai nghìn đồng.
学校有五千个学生。|Trường có năm nghìn học sinh.
一千米就是一公里。|Một nghìn mét chính là một ki-lô-mét.
我走了几千步。|Tôi đi mấy nghìn bước.
#千克
这个箱子十五千克。|Cái thùng này mười lăm ki-lô-gam.
一千克等于两斤。|Một ki-lô-gam bằng hai cân (Trung Quốc).
我买了一千克苹果。|Tôi mua một ki-lô-gam táo.
行李不能超过二十千克。|Hành lý không được quá hai mươi ki-lô-gam.
这个孩子三千克重。|Đứa bé nặng ba ki-lô-gam.
#前年
前年我去了北京。|Năm kia tôi đi Bắc Kinh.
我们是前年认识的。|Chúng tôi quen nhau năm kia.
前年他大学毕业。|Năm kia anh ấy tốt nghiệp đại học.
前年这里还没有地铁。|Năm kia ở đây chưa có tàu điện ngầm.
我前年开始学汉语。|Tôi bắt đầu học tiếng Trung từ năm kia.
#青年
他是一个有理想的青年。|Anh ấy là một thanh niên có lý tưởng.
青年人要多学习。|Thanh niên phải học hỏi nhiều.
今天是青年节。|Hôm nay là ngày Thanh niên.
这里住着很多青年。|Ở đây có nhiều thanh niên sống.
青年时期很重要。|Thời thanh niên rất quan trọng.
#青少年
青少年要多运动。|Thanh thiếu niên nên vận động nhiều.
这本书适合青少年看。|Cuốn sách này phù hợp cho thanh thiếu niên.
很多青少年喜欢玩游戏。|Nhiều thanh thiếu niên thích chơi game.
这是一个青少年活动中心。|Đây là trung tâm hoạt động thanh thiếu niên.
我们要关心青少年的健康。|Chúng ta phải quan tâm sức khỏe thanh thiếu niên.
#轻
这个箱子很轻。|Cái thùng này rất nhẹ.
请轻一点儿说话。|Xin nói khẽ một chút.
她走路很轻。|Cô ấy đi rất nhẹ nhàng.
他年纪轻轻就当了经理。|Anh ấy còn rất trẻ đã làm giám đốc.
我的病很轻。|Bệnh của tôi rất nhẹ.
#晴
今天天晴了。|Hôm nay trời nắng rồi.
明天是晴还是阴？|Mai nắng hay âm u?
雨停了，天也晴了。|Mưa tạnh, trời cũng quang rồi.
晴的时候我们去爬山。|Khi trời nắng chúng ta đi leo núi.
多云转晴。|Nhiều mây chuyển nắng.
#晴天
今天是晴天。|Hôm nay trời nắng.
晴天我喜欢出去走走。|Trời nắng tôi thích ra ngoài đi dạo.
希望明天是晴天。|Mong mai trời nắng.
这个月晴天很少。|Tháng này ít ngày nắng.
晴天的时候可以洗衣服。|Trời nắng có thể giặt quần áo.
#请客
今天我请客。|Hôm nay tôi mời.
他请客吃饭。|Anh ấy mời mọi người ăn cơm.
谁请客？|Ai khao?
下次我请客吧。|Lần sau tôi mời nhé.
考试通过了要请客。|Thi đỗ phải khao.
#请求
我有一个请求。|Tôi có một yêu cầu.
他请求老师帮助他。|Anh ấy nhờ thầy giúp đỡ.
你的请求我同意了。|Tôi đồng ý yêu cầu của bạn.
请求大家安静一下。|Xin mọi người giữ yên lặng.
他的请求被拒绝了。|Yêu cầu của anh ấy bị từ chối.
#求
我求你帮帮我。|Tôi xin bạn giúp tôi.
他从来不求别人。|Anh ấy chưa bao giờ nhờ vả ai.
他求我帮他一个忙。|Anh ấy nhờ tôi giúp một việc.
我不求别的，只求平安。|Tôi không mong gì khác, chỉ mong bình an.
求你别走。|Xin bạn đừng đi.
#球场
球场上有很多人。|Trên sân bóng có rất nhiều người.
我们去球场踢球吧。|Chúng ta ra sân đá bóng nhé.
学校有一个大球场。|Trường có một sân bóng lớn.
球场离这儿不远。|Sân bóng cách đây không xa.
下雨了，球场关了。|Trời mưa, sân bóng đóng cửa.
#球队
他是我们球队的。|Anh ấy là người đội bóng chúng tôi.
你喜欢哪个球队？|Bạn thích đội bóng nào?
我们的球队赢了。|Đội bóng của chúng tôi thắng rồi.
这个球队很有名。|Đội bóng này rất nổi tiếng.
他想参加学校的球队。|Cậu ấy muốn tham gia đội bóng của trường.
#球鞋
我买了一双新球鞋。|Tôi mua một đôi giày thể thao mới.
打球要穿球鞋。|Chơi bóng phải đi giày thể thao.
你的球鞋真好看。|Giày thể thao của bạn đẹp thật.
这双球鞋很舒服。|Đôi giày thể thao này rất thoải mái.
我的球鞋脏了。|Giày thể thao của tôi bẩn rồi.
#取
我去银行取钱。|Tôi đi ngân hàng rút tiền.
请到那边取票。|Mời ra bên kia lấy vé.
我来取我的衣服。|Tôi đến lấy quần áo của mình.
你取行李了吗？|Bạn lấy hành lý chưa?
他给孩子取了个名字。|Anh ấy đặt tên cho con.
#取得
他取得了好成绩。|Anh ấy đạt thành tích tốt.
我们取得了很大的进步。|Chúng tôi đã có tiến bộ lớn.
比赛取得了胜利。|Trận đấu giành thắng lợi.
怎么才能取得成功？|Làm sao mới có thể thành công?
他取得了老师的同意。|Anh ấy được thầy đồng ý.
#全
全班同学都来了。|Cả lớp đều đến.
我全忘了。|Tôi quên hết rồi.
这里的东西很全。|Đồ ở đây rất đầy đủ.
他全身都湿了。|Toàn thân anh ấy ướt sũng.
人到全了吗？|Mọi người đến đủ chưa?
#全部
全部的钱都在这里。|Toàn bộ tiền đều ở đây.
作业我全部做完了。|Bài tập tôi làm xong hết rồi.
他把全部时间都用在学习上。|Anh ấy dành toàn bộ thời gian cho việc học.
全部人都同意。|Tất cả mọi người đều đồng ý.
这是我全部的东西。|Đây là toàn bộ đồ của tôi.
#全国
他是全国第一。|Anh ấy đứng nhất toàn quốc.
全国都在下雪。|Cả nước đều có tuyết.
这个节目全国都能看到。|Chương trình này cả nước đều xem được.
春节全国放假。|Tết cả nước được nghỉ.
他在全国比赛中得了奖。|Anh ấy đoạt giải trong cuộc thi toàn quốc.
#全家
我们全家去旅游。|Cả nhà chúng tôi đi du lịch.
这是我们的全家照。|Đây là ảnh cả gia đình chúng tôi.
全家人一起吃饭。|Cả nhà cùng ăn cơm.
祝你全家快乐！|Chúc cả nhà bạn vui vẻ!
全家都很喜欢这只猫。|Cả nhà đều rất thích con mèo này.
#全年
这里全年都很热。|Ở đây quanh năm đều nóng.
全年的工作都完成了。|Công việc cả năm đã hoàn thành.
这家店全年不休息。|Cửa hàng này mở cửa quanh năm.
全年下雨不多。|Cả năm không mưa nhiều.
我全年都在学习汉语。|Cả năm tôi đều học tiếng Trung.
#全体
全体同学请站起来。|Toàn thể học sinh xin đứng dậy.
全体人员八点开会。|Toàn thể nhân viên họp lúc tám giờ.
我代表全体同学感谢老师。|Tôi thay mặt toàn thể học sinh cảm ơn thầy.
全体都同意了。|Toàn thể đều đồng ý.
这是全体人员的照片。|Đây là ảnh toàn thể nhân viên.
#然后
我先吃饭，然后写作业。|Tôi ăn cơm trước rồi làm bài tập.
我们先去北京，然后去上海。|Chúng ta đi Bắc Kinh trước, sau đó đi Thượng Hải.
你先洗手，然后吃饭。|Con rửa tay trước rồi ăn cơm.
他看了看我，然后笑了。|Anh ấy nhìn tôi rồi cười.
先往前走，然后往左拐。|Đi thẳng trước, sau đó rẽ trái.
#人口
中国人口很多。|Dân số Trung Quốc rất đông.
这个城市有多少人口？|Thành phố này có bao nhiêu dân?
越南人口将近一亿。|Dân số Việt Nam gần một trăm triệu.
农村人口越来越少。|Dân số nông thôn ngày càng ít.
这里人口不多。|Ở đây dân cư không đông.
#人们
人们都很高兴。|Mọi người đều rất vui.
春节的时候人们都回家。|Dịp Tết mọi người đều về nhà.
人们喜欢在这里散步。|Mọi người thích đi dạo ở đây.
现在人们都用手机。|Bây giờ mọi người đều dùng điện thoại.
人们的生活越来越好。|Cuộc sống của người dân ngày càng tốt.
#人数
今天来的人数很多。|Số người đến hôm nay rất đông.
请统计一下人数。|Hãy thống kê số người.
我们班的人数不多。|Sĩ số lớp chúng tôi không đông.
参加比赛的人数超过了一百。|Số người tham gia cuộc thi hơn một trăm.
人数够了，我们走吧。|Đủ người rồi, chúng ta đi thôi.
#认为
我认为你说得对。|Tôi cho rằng bạn nói đúng.
你认为怎么样？|Bạn cho là thế nào?
大家都认为他是个好老师。|Mọi người đều cho rằng ông ấy là thầy giáo tốt.
我不认为这是个好办法。|Tôi không cho rằng đây là cách hay.
他认为学习很重要。|Anh ấy cho rằng học tập rất quan trọng.
#日报
爸爸每天看日报。|Bố ngày nào cũng đọc nhật báo.
这条新闻在日报上。|Tin này có trên nhật báo.
今天的日报来了吗？|Nhật báo hôm nay đến chưa?
他在一家日报工作。|Anh ấy làm ở một tờ nhật báo.
《人民日报》很有名。|"Nhân Dân Nhật Báo" rất nổi tiếng.
#日子
今天是个好日子。|Hôm nay là ngày đẹp.
他们的日子过得很好。|Cuộc sống của họ rất tốt.
结婚的日子定了吗？|Ngày cưới định chưa?
那段日子我很开心。|Quãng thời gian đó tôi rất vui.
日子一天天过去了。|Ngày tháng trôi qua từng ngày.
#如果
如果明天下雨，我们就不去了。|Nếu mai mưa thì chúng ta không đi.
如果你有时间，来我家玩儿吧。|Nếu bạn có thời gian thì đến nhà tôi chơi nhé.
如果我是你，我会去。|Nếu tôi là bạn, tôi sẽ đi.
如果有问题，请告诉我。|Nếu có vấn đề hãy báo tôi.
如果不努力，就不会成功。|Nếu không cố gắng sẽ không thành công.
#入口
入口在哪儿？|Lối vào ở đâu?
请从入口进。|Mời đi vào từ lối vào.
我在入口等你。|Tôi đợi bạn ở lối vào.
公园的入口在南边。|Lối vào công viên ở phía nam.
入口处有很多人。|Ở lối vào rất đông người.
#商量
我们商量一下吧。|Chúng ta bàn bạc một chút nhé.
这件事要跟家人商量。|Việc này phải bàn với gia đình.
我们商量好了明天去。|Chúng tôi bàn xong mai sẽ đi.
有事可以和我商量。|Có việc có thể bàn với tôi.
他没跟我商量就决定了。|Anh ấy không bàn với tôi đã quyết định rồi.
#商人
他是一个商人。|Anh ấy là một thương nhân.
很多商人来这里做生意。|Nhiều thương nhân đến đây buôn bán.
商人很会说话。|Thương nhân rất khéo ăn nói.
他爸爸是一个成功的商人。|Bố anh ấy là một thương nhân thành đạt.
这个商人很有钱。|Thương nhân này rất giàu.
#上周
上周我去了上海。|Tuần trước tôi đi Thượng Hải.
上周的考试很难。|Kỳ thi tuần trước rất khó.
我们上周见过面。|Chúng ta gặp nhau tuần trước.
上周天气很冷。|Tuần trước thời tiết rất lạnh.
上周我很忙。|Tuần trước tôi rất bận.
#少年
他是一个聪明的少年。|Cậu ấy là một thiếu niên thông minh.
少年时代很快乐。|Thời niên thiếu rất vui vẻ.
这个少年跑得很快。|Thiếu niên này chạy rất nhanh.
少年们在踢球。|Các thiếu niên đang đá bóng.
他十五岁，还是个少年。|Cậu ấy mười lăm tuổi, vẫn còn là thiếu niên.
#身边
我的朋友都在我身边。|Bạn bè đều ở bên cạnh tôi.
他身边没有钱。|Anh ấy không mang tiền theo người.
妈妈坐在我身边。|Mẹ ngồi bên cạnh tôi.
谢谢你一直在我身边。|Cảm ơn bạn luôn ở bên tôi.
身边的人对我都很好。|Người xung quanh đều đối tốt với tôi.
#什么样
你喜欢什么样的人？|Bạn thích kiểu người như thế nào?
你想买什么样的手机？|Bạn muốn mua điện thoại kiểu gì?
他是什么样的人？|Anh ấy là người như thế nào?
你想要什么样的生活？|Bạn muốn cuộc sống như thế nào?
这是什么样的房子？|Đây là căn nhà như thế nào?
#生
她生了一个女儿。|Cô ấy sinh một bé gái.
我生在河内。|Tôi sinh ra ở Hà Nội.
这个肉还是生的。|Miếng thịt này vẫn còn sống.
他生病了。|Anh ấy bị ốm.
别生我的气。|Đừng giận tôi.
#声音
你的声音很好听。|Giọng của bạn rất hay.
请把声音开大一点儿。|Hãy vặn to tiếng lên chút.
外面有什么声音？|Bên ngoài có tiếng gì vậy?
我听不到你的声音。|Tôi không nghe thấy tiếng bạn.
他说话声音很小。|Anh ấy nói rất nhỏ.
#省
这样做可以省很多钱。|Làm vậy có thể tiết kiệm nhiều tiền.
坐地铁省时间。|Đi tàu điện ngầm tiết kiệm thời gian.
广东省很大。|Tỉnh Quảng Đông rất lớn.
他是哪个省的人？|Anh ấy là người tỉnh nào?
我们要省着用水。|Chúng ta phải dùng nước tiết kiệm.
#实际
这个计划不太实际。|Kế hoạch này không thực tế lắm.
实际情况和想的不一样。|Tình hình thực tế khác với tưởng tượng.
他实际上已经三十岁了。|Thực ra anh ấy đã ba mươi tuổi rồi.
我们要从实际出发。|Chúng ta phải xuất phát từ thực tế.
实际的价格比较低。|Giá thực tế tương đối thấp.
#实在
这个菜实在太好吃了。|Món này thật sự rất ngon.
我实在没有时间。|Tôi thật sự không có thời gian.
他是个很实在的人。|Anh ấy là người rất thật thà.
实在对不起。|Thật sự xin lỗi.
我实在走不动了。|Tôi thật sự không đi nổi nữa.
#食物
冰箱里有很多食物。|Trong tủ lạnh có nhiều thức ăn.
这种食物对身体好。|Loại thức ăn này tốt cho cơ thể.
我们要节约食物。|Chúng ta phải tiết kiệm thức ăn.
这里的食物很有特色。|Đồ ăn ở đây rất đặc sắc.
不要浪费食物。|Đừng lãng phí thức ăn.
#使用
这个东西怎么使用？|Thứ này sử dụng thế nào?
请正确使用电脑。|Hãy sử dụng máy tính đúng cách.
这里不能使用手机。|Ở đây không được dùng điện thoại.
我会使用这个软件。|Tôi biết sử dụng phần mềm này.
使用以前请看说明。|Trước khi dùng hãy đọc hướng dẫn.
#市
我住在河内市。|Tôi sống ở thành phố Hà Nội.
这个市的人口很多。|Thành phố này dân số rất đông.
早上去市场买菜。|Buổi sáng đi chợ mua thức ăn.
我们市有很多公园。|Thành phố chúng tôi có nhiều công viên.
他在市中心工作。|Anh ấy làm việc ở trung tâm thành phố.
#市长
市长来我们学校参观。|Thị trưởng đến thăm trường chúng tôi.
新市长很年轻。|Thị trưởng mới rất trẻ.
市长在讲话。|Thị trưởng đang phát biểu.
他想当市长。|Anh ấy muốn làm thị trưởng.
市长关心大家的生活。|Thị trưởng quan tâm đời sống mọi người.
#事情
我有一件事情要告诉你。|Tôi có một chuyện muốn nói với bạn.
事情已经解决了。|Sự việc đã giải quyết rồi.
这件事情很重要。|Việc này rất quan trọng.
今天的事情太多了。|Hôm nay nhiều việc quá.
发生了什么事情？|Đã xảy ra chuyện gì?
#收
请收下这个礼物。|Xin nhận món quà này.
这里收美元吗？|Ở đây có nhận đô la Mỹ không?
天要下雨了，快收衣服。|Trời sắp mưa, mau thu quần áo.
他每个月收房租。|Mỗi tháng anh ấy thu tiền nhà.
我收到你的信了。|Tôi nhận được thư của bạn rồi.
#收到
我收到了你的礼物。|Tôi nhận được quà của bạn rồi.
你收到我的邮件了吗？|Bạn nhận được email của tôi chưa?
他收到了大学的通知。|Anh ấy nhận được thông báo của trường đại học.
收到请回复。|Nhận được xin hồi âm.
我还没收到钱。|Tôi vẫn chưa nhận được tiền.
#收入
他的收入很高。|Thu nhập của anh ấy rất cao.
你每个月收入多少？|Mỗi tháng bạn thu nhập bao nhiêu?
农民的收入提高了。|Thu nhập của nông dân tăng lên.
这份工作收入不高。|Công việc này thu nhập không cao.
我们家的收入不多。|Thu nhập gia đình tôi không nhiều.
#手表
这块手表很贵。|Chiếc đồng hồ này rất đắt.
我的手表慢了五分钟。|Đồng hồ của tôi chậm năm phút.
他送给我一块手表。|Anh ấy tặng tôi một chiếc đồng hồ.
你的手表几点了？|Đồng hồ bạn mấy giờ rồi?
我每天都戴手表。|Ngày nào tôi cũng đeo đồng hồ.
#受到
他受到了老师的表扬。|Cậu ấy được thầy khen.
我们受到了热情的欢迎。|Chúng tôi được chào đón nhiệt tình.
他受到了很大的影响。|Anh ấy chịu ảnh hưởng rất lớn.
这本书受到大家的喜欢。|Cuốn sách này được mọi người yêu thích.
小孩子不能受到伤害。|Trẻ em không được bị tổn hại.
#熟
苹果熟了。|Táo chín rồi.
肉还没熟。|Thịt vẫn chưa chín.
我跟他很熟。|Tôi rất thân với anh ấy.
这条路我很熟。|Con đường này tôi rất quen.
他睡得很熟。|Anh ấy ngủ rất say.
#数
请数一数有多少人。|Hãy đếm xem có bao nhiêu người.
孩子会数到一百了。|Đứa bé đếm được đến một trăm rồi.
我数了三遍。|Tôi đếm ba lần.
他数钱数得很快。|Anh ấy đếm tiền rất nhanh.
你数错了。|Bạn đếm sai rồi.
#数字
请写下这些数字。|Hãy viết những con số này.
我不喜欢数字。|Tôi không thích con số.
这个数字很大。|Con số này rất lớn.
八是中国人喜欢的数字。|Tám là con số người Trung Quốc thích.
你记得这个数字吗？|Bạn nhớ con số này không?
#顺利
祝你考试顺利！|Chúc bạn thi tốt!
一切都很顺利。|Mọi thứ đều thuận lợi.
工作顺利吗？|Công việc thuận lợi chứ?
我们顺利到达了。|Chúng tôi đến nơi thuận lợi.
希望明天一切顺利。|Mong mai mọi việc suôn sẻ.
#说明
请说明一下原因。|Hãy giải thích nguyên nhân.
使用前请看说明。|Trước khi dùng hãy đọc hướng dẫn.
这说明你很努力。|Điều này chứng tỏ bạn rất cố gắng.
他向大家说明了情况。|Anh ấy trình bày tình hình với mọi người.
说明书在盒子里。|Sách hướng dẫn ở trong hộp.
#司机
他是出租车司机。|Anh ấy là tài xế taxi.
司机开得很慢。|Tài xế lái rất chậm.
请问司机，到火车站了吗？|Xin hỏi bác tài, đến ga tàu chưa?
我想当司机。|Tôi muốn làm tài xế.
公共汽车司机很辛苦。|Tài xế xe buýt rất vất vả.
#送到
请把这个送到三楼。|Hãy đưa cái này lên tầng ba.
我把他送到了医院。|Tôi đưa anh ấy đến bệnh viện.
外卖半个小时送到。|Đồ ăn nửa tiếng giao đến.
信送到了吗？|Thư đã đưa đến chưa?
我送你到门口。|Tôi tiễn bạn ra cửa.
#送给
这是送给你的。|Cái này tặng bạn.
我把书送给了朋友。|Tôi tặng sách cho bạn.
妈妈送给我一块手表。|Mẹ tặng tôi một chiếc đồng hồ.
你想送给他什么？|Bạn muốn tặng anh ấy gì?
这束花送给老师。|Bó hoa này tặng thầy cô.
#算
请算一下多少钱。|Hãy tính xem bao nhiêu tiền.
我算错了。|Tôi tính sai rồi.
这个不算贵。|Cái này không tính là đắt.
算了，别说了。|Thôi bỏ đi, đừng nói nữa.
他算是我的老师。|Ông ấy coi như là thầy tôi.
#虽然
虽然很累，但是很开心。|Tuy mệt nhưng rất vui.
虽然他很忙，还是来了。|Tuy anh ấy bận nhưng vẫn đến.
虽然下雨，我们还是去了。|Tuy mưa nhưng chúng tôi vẫn đi.
虽然汉语很难，但很有意思。|Tuy tiếng Trung khó nhưng rất thú vị.
虽然贵，但是质量很好。|Tuy đắt nhưng chất lượng tốt.
#随便
你随便坐。|Bạn ngồi tự nhiên.
吃什么都行，随便。|Ăn gì cũng được, tùy.
他说话很随便。|Anh ấy nói năng rất tùy tiện.
随便看看。|Xem thoải mái đi.
不能随便扔垃圾。|Không được tùy tiện vứt rác.
#随时
有问题随时问我。|Có vấn đề cứ hỏi tôi bất cứ lúc nào.
你随时可以来。|Bạn có thể đến bất cứ lúc nào.
天随时可能下雨。|Trời có thể mưa bất cứ lúc nào.
我们随时联系。|Chúng ta liên lạc bất cứ lúc nào.
他随时准备帮助别人。|Anh ấy luôn sẵn sàng giúp người khác.
#所以
今天下雨，所以我没去。|Hôm nay mưa nên tôi không đi.
因为他病了，所以没来上课。|Vì cậu ấy ốm nên không đi học.
我很累，所以想早点儿睡。|Tôi mệt nên muốn ngủ sớm.
所以你要多练习。|Cho nên bạn phải luyện nhiều.
这里很近，所以我们走路去。|Chỗ này gần nên chúng ta đi bộ.
#所有
所有人都来了。|Tất cả mọi người đều đến.
我把所有的钱都花了。|Tôi tiêu hết toàn bộ tiền.
所有的问题都解决了。|Mọi vấn đề đều giải quyết rồi.
他认识所有的学生。|Anh ấy quen tất cả học sinh.
所有的商店都关门了。|Tất cả cửa hàng đều đóng cửa.
#它
这是我的猫，它很可爱。|Đây là con mèo của tôi, nó rất đáng yêu.
这本书很好，我很喜欢它。|Cuốn sách này hay, tôi rất thích nó.
它在哪儿？|Nó ở đâu?
别碰它。|Đừng chạm vào nó.
这个手机很旧，可是它还能用。|Điện thoại này cũ nhưng vẫn dùng được.
#它们
这些花很漂亮，它们是我种的。|Những bông hoa này đẹp, chúng do tôi trồng.
小狗们饿了，给它们吃东西吧。|Mấy con chó con đói rồi, cho chúng ăn đi.
这些书很旧，把它们放好。|Chỗ sách này cũ, cất chúng cẩn thận.
它们是一家。|Chúng là một nhà.
鸟儿飞走了，它们去哪儿了？|Chim bay đi rồi, chúng đi đâu nhỉ?
#太太
这是我太太。|Đây là vợ tôi.
王太太是我的邻居。|Bà Vương là hàng xóm của tôi.
你太太在哪儿工作？|Vợ anh làm việc ở đâu?
他太太很会做饭。|Vợ anh ấy nấu ăn rất giỏi.
张太太，您好！|Chào bà Trương!
#态度
他的态度很好。|Thái độ của anh ấy rất tốt.
服务员态度不太好。|Thái độ của nhân viên phục vụ không tốt lắm.
学习态度很重要。|Thái độ học tập rất quan trọng.
你这是什么态度？|Thái độ của bạn thế là sao?
他对工作的态度很认真。|Thái độ làm việc của anh ấy rất nghiêm túc.
#套
我买了一套新衣服。|Tôi mua một bộ quần áo mới.
他家有一套房子。|Nhà anh ấy có một căn hộ.
这套书一共五本。|Bộ sách này tổng cộng năm quyển.
这套家具很漂亮。|Bộ đồ nội thất này rất đẹp.
请把手套戴上。|Hãy đeo găng tay vào.
#特点
这个城市有什么特点？|Thành phố này có đặc điểm gì?
每个人都有自己的特点。|Mỗi người đều có đặc điểm riêng.
他的特点是很认真。|Đặc điểm của anh ấy là rất chăm chỉ.
这种水果的特点是很甜。|Đặc điểm của loại quả này là rất ngọt.
请说说汉字的特点。|Hãy nói về đặc điểm của chữ Hán.
#提
我帮你提箱子。|Để tôi xách va li giúp bạn.
他提了很多问题。|Anh ấy nêu nhiều câu hỏi.
别再提那件事了。|Đừng nhắc đến chuyện đó nữa.
你提的意见很好。|Ý kiến bạn nêu rất hay.
她手里提着一个包。|Tay cô ấy xách một chiếc túi.
#提出
他提出了一个好办法。|Anh ấy đưa ra một cách hay.
有问题可以提出来。|Có vấn đề có thể nêu ra.
我提出了自己的看法。|Tôi nêu ra quan điểm của mình.
他提出要早点儿走。|Anh ấy đề nghị đi sớm.
大家提出了很多意见。|Mọi người đưa ra nhiều ý kiến.
#提到
他在信里提到了你。|Trong thư anh ấy có nhắc đến bạn.
老师提到了这个问题。|Thầy có nhắc đến vấn đề này.
我们刚才提到的那个人来了。|Người chúng ta vừa nhắc đến đã đến rồi.
他从来没提到过他的家人。|Anh ấy chưa bao giờ nhắc đến gia đình.
一提到考试，他就紧张。|Hễ nhắc đến thi là anh ấy căng thẳng.
#体育场
我们去体育场看比赛。|Chúng ta đi sân vận động xem thi đấu.
体育场里有很多人。|Trong sân vận động có rất nhiều người.
新体育场很大。|Sân vận động mới rất lớn.
体育场离这儿远吗？|Sân vận động cách đây xa không?
早上很多人在体育场跑步。|Buổi sáng nhiều người chạy bộ ở sân vận động.
#体育馆
我们在体育馆打篮球。|Chúng tôi chơi bóng rổ ở nhà thi đấu.
学校有一个新体育馆。|Trường có một nhà thi đấu mới.
体育馆几点开门？|Nhà thi đấu mấy giờ mở cửa?
比赛在体育馆举行。|Trận đấu tổ chức ở nhà thi đấu.
体育馆里很凉快。|Trong nhà thi đấu rất mát.
#条件
这里的条件很好。|Điều kiện ở đây rất tốt.
你有什么条件？|Bạn có điều kiện gì?
他的家庭条件不太好。|Điều kiện gia đình anh ấy không tốt lắm.
学习条件越来越好了。|Điều kiện học tập ngày càng tốt.
我同意，但是有一个条件。|Tôi đồng ý nhưng có một điều kiện.
#听讲
上课要认真听讲。|Trong giờ học phải chăm chú nghe giảng.
他听讲的时候很专心。|Khi nghe giảng anh ấy rất tập trung.
大家都在听讲。|Mọi người đều đang nghe giảng.
没听讲就不会做题。|Không nghe giảng thì không làm được bài.
请大家安静听讲。|Mời mọi người yên lặng nghe giảng.
#停
雨停了。|Mưa tạnh rồi.
车停在门口。|Xe dừng ở cửa.
请停一下。|Xin dừng lại một chút.
他说个不停。|Anh ấy nói không ngừng.
电停了。|Mất điện rồi.
#停车
这里不能停车。|Ở đây không được đỗ xe.
你把车停在哪儿了？|Bạn đỗ xe ở đâu rồi?
停车要多少钱？|Đỗ xe bao nhiêu tiền?
请在这里停车。|Xin dừng xe ở đây.
找停车的地方很难。|Tìm chỗ đỗ xe rất khó.
#停车场
停车场在地下。|Bãi đỗ xe ở dưới tầng hầm.
停车场满了。|Bãi đỗ xe đầy rồi.
我在停车场等你。|Tôi đợi bạn ở bãi đỗ xe.
这个停车场很大。|Bãi đỗ xe này rất lớn.
停车场离门口很近。|Bãi đỗ xe rất gần cửa.
#挺
这个菜挺好吃的。|Món này khá ngon.
他人挺好的。|Anh ấy khá tốt.
今天挺冷的。|Hôm nay khá lạnh.
我挺喜欢这本书的。|Tôi khá thích cuốn sách này.
你的汉语挺不错的。|Tiếng Trung của bạn khá tốt.
#挺好
我最近挺好的。|Dạo này tôi khá ổn.
这个主意挺好。|Ý này khá hay.
天气挺好，出去走走吧。|Thời tiết khá đẹp, ra ngoài đi dạo đi.
你穿这件挺好看。|Bạn mặc cái này khá đẹp.
他对我挺好的。|Anh ấy đối xử với tôi khá tốt.
#通
电话打不通。|Điện thoại không gọi được.
这条路通到火车站。|Con đường này thông đến ga tàu.
我想通了。|Tôi nghĩ thông rồi.
他精通三种语言。|Anh ấy thông thạo ba thứ tiếng.
这里通地铁了。|Ở đây đã có tàu điện ngầm.
#通知
明天开会的通知来了。|Thông báo họp ngày mai đến rồi.
请通知大家八点到。|Hãy thông báo mọi người tám giờ đến.
我收到了学校的通知。|Tôi nhận được thông báo của trường.
有什么事我会通知你。|Có việc gì tôi sẽ báo bạn.
他没有通知我。|Anh ấy không báo cho tôi.
#同样
我也有同样的问题。|Tôi cũng có vấn đề tương tự.
我们穿着同样的衣服。|Chúng tôi mặc quần áo giống nhau.
同样的错误不要犯两次。|Đừng mắc cùng một lỗi hai lần.
他同样喜欢运动。|Anh ấy cũng thích thể thao như vậy.
这两个字同样重要。|Hai chữ này quan trọng như nhau.
#头
我头疼。|Tôi đau đầu.
他点了点头。|Anh ấy gật gật đầu.
请抬起头来。|Hãy ngẩng đầu lên.
我们从头开始学吧。|Chúng ta học lại từ đầu nhé.
我们家养了一头牛。|Nhà tôi nuôi một con bò.
#头发
她的头发很长。|Tóc cô ấy rất dài.
我想剪头发。|Tôi muốn cắt tóc.
他的头发白了。|Tóc ông ấy bạc rồi.
你每天洗头发吗？|Bạn gội đầu mỗi ngày không?
我喜欢短头发。|Tôi thích tóc ngắn.
#图片
请看这张图片。|Hãy xem bức ảnh này.
这本书里有很多图片。|Cuốn sách này có nhiều hình ảnh.
我在网上找了一些图片。|Tôi tìm vài hình ảnh trên mạng.
图片很清楚。|Hình ảnh rất rõ.
把图片发给我。|Gửi ảnh cho tôi nhé.
#推
请推门。|Hãy đẩy cửa.
他推着自行车走。|Anh ấy dắt xe đạp đi.
别推我！|Đừng đẩy tôi!
会议推到下周了。|Cuộc họp lùi sang tuần sau rồi.
他把我推开了。|Anh ấy đẩy tôi ra.
#腿
我的腿很疼。|Chân tôi rất đau.
走了一天，腿都累了。|Đi cả ngày, chân mỏi nhừ.
他的腿很长。|Chân anh ấy rất dài.
小狗的腿受伤了。|Chân con chó con bị thương.
桌子有四条腿。|Cái bàn có bốn chân.
#外卖
我们叫外卖吧。|Chúng ta gọi đồ ăn ngoài nhé.
外卖到了。|Đồ ăn giao đến rồi.
现在很多人吃外卖。|Bây giờ nhiều người ăn đồ đặt ngoài.
这家饭馆有外卖吗？|Quán này có giao đồ ăn không?
我不想做饭，点个外卖吧。|Tôi không muốn nấu, đặt đồ ăn đi.
#完全
我完全同意。|Tôi hoàn toàn đồng ý.
他完全忘了。|Anh ấy quên sạch.
这两个完全不一样。|Hai cái này hoàn toàn khác nhau.
病完全好了。|Bệnh khỏi hẳn rồi.
我完全听不懂。|Tôi hoàn toàn không hiểu.
#晚安
晚安，明天见。|Chúc ngủ ngon, mai gặp.
妈妈，晚安！|Mẹ ơi, chúc mẹ ngủ ngon!
他给我发了一个"晚安"。|Anh ấy nhắn cho tôi "chúc ngủ ngon".
说完晚安我就睡了。|Nói chúc ngủ ngon xong tôi đi ngủ.
晚安，做个好梦。|Chúc ngủ ngon, mơ đẹp nhé.
#晚报
爸爸喜欢看晚报。|Bố thích đọc báo buổi tối.
今天的晚报来了。|Báo tối nay đến rồi.
这条新闻在晚报上。|Tin này có trên báo buổi tối.
晚报几点出来？|Báo tối mấy giờ ra?
我在晚报上看到了广告。|Tôi thấy quảng cáo trên báo tối.
#晚餐
晚餐吃什么？|Bữa tối ăn gì?
我们一起吃晚餐吧。|Chúng ta cùng ăn tối nhé.
晚餐准备好了。|Bữa tối chuẩn bị xong rồi.
晚餐不要吃太多。|Bữa tối đừng ăn quá nhiều.
这家饭店的晚餐很好吃。|Bữa tối ở nhà hàng này rất ngon.
#晚会
今天晚上有一个晚会。|Tối nay có một buổi dạ hội.
晚会八点开始。|Dạ hội bắt đầu lúc tám giờ.
我在晚会上唱了一首歌。|Tôi hát một bài trong buổi liên hoan.
新年晚会很热闹。|Dạ hội năm mới rất náo nhiệt.
你去参加晚会吗？|Bạn có đi dự liên hoan không?
#万
这辆车十万块。|Chiếc xe này một trăm nghìn đồng.
北京有两千多万人。|Bắc Kinh có hơn hai mươi triệu người.
一万等于十个一千。|Một vạn bằng mười nghìn.
我每个月挣一万块。|Mỗi tháng tôi kiếm mười nghìn đồng.
来了几万人。|Mấy vạn người đã đến.
#网
上网查一下吧。|Lên mạng tra thử đi.
这里没有网。|Ở đây không có mạng.
网太慢了。|Mạng chậm quá.
他在河里撒网打鱼。|Anh ấy quăng lưới bắt cá dưới sông.
我在网上买了一本书。|Tôi mua một cuốn sách trên mạng.
#网球
我喜欢打网球。|Tôi thích chơi quần vợt.
他是网球老师。|Anh ấy là thầy dạy quần vợt.
我们周末去打网球吧。|Cuối tuần chúng ta đi đánh quần vợt nhé.
你看过网球比赛吗？|Bạn đã xem thi đấu quần vợt chưa?
网球场在哪儿？|Sân quần vợt ở đâu?
#网站
这个网站很有用。|Trang web này rất hữu ích.
请在网站上报名。|Hãy đăng ký trên trang web.
学校有自己的网站。|Trường có trang web riêng.
你知道这个网站吗？|Bạn biết trang web này không?
我常常上这个网站学汉语。|Tôi hay vào trang web này học tiếng Trung.
#为
我为你高兴。|Tôi mừng cho bạn.
他为大家做了很多事。|Anh ấy làm nhiều việc vì mọi người.
为了健康，我每天跑步。|Vì sức khỏe, ngày nào tôi cũng chạy bộ.
别为这件事难过。|Đừng buồn vì chuyện này.
我们为人民服务。|Chúng ta phục vụ nhân dân.
#位
这位是王老师。|Vị này là thầy Vương.
请问几位？|Xin hỏi mấy vị ạ?
那位先生是谁？|Vị kia là ai?
我们班有三位老师。|Lớp chúng tôi có ba thầy cô.
各位，早上好！|Chào buổi sáng mọi người!
#喂
喂，你好！|A lô, xin chào!
喂，请问是小李吗？|A lô, xin hỏi có phải Tiểu Lý không?
喂，你听得到吗？|A lô, bạn nghe thấy không?
喂，我是王明。|A lô, tôi là Vương Minh.
喂，你在哪儿？|A lô, bạn đang ở đâu?
#温度
今天温度很高。|Hôm nay nhiệt độ rất cao.
房间的温度正好。|Nhiệt độ phòng vừa phải.
水的温度是多少？|Nhiệt độ của nước là bao nhiêu?
晚上温度会下降。|Buổi tối nhiệt độ sẽ giảm.
请把温度调低一点儿。|Hãy chỉnh nhiệt độ thấp xuống chút.
#闻
你闻，这是什么味道？|Bạn ngửi xem, mùi gì đây?
这朵花闻起来很香。|Bông hoa này ngửi rất thơm.
我闻到了饭菜的香味。|Tôi ngửi thấy mùi thơm của cơm canh.
狗的鼻子很会闻。|Mũi chó đánh hơi rất giỏi.
这个菜闻着就好吃。|Món này ngửi đã thấy ngon.
#午餐
午餐吃什么？|Bữa trưa ăn gì?
我们十二点吃午餐。|Chúng tôi ăn trưa lúc mười hai giờ.
公司提供午餐。|Công ty có cung cấp bữa trưa.
我的午餐很简单。|Bữa trưa của tôi rất đơn giản.
我们一起吃午餐吧。|Chúng ta cùng ăn trưa nhé.
#午睡
我每天都午睡。|Ngày nào tôi cũng ngủ trưa.
午睡对身体好。|Ngủ trưa tốt cho cơ thể.
孩子在午睡。|Đứa bé đang ngủ trưa.
午睡半个小时就够了。|Ngủ trưa nửa tiếng là đủ.
今天没时间午睡。|Hôm nay không có thời gian ngủ trưa.
#洗衣机
洗衣机坏了。|Máy giặt hỏng rồi.
我买了一台新洗衣机。|Tôi mua một chiếc máy giặt mới.
衣服在洗衣机里。|Quần áo trong máy giặt.
用洗衣机洗衣服很方便。|Dùng máy giặt giặt đồ rất tiện.
这个洗衣机怎么用？|Máy giặt này dùng thế nào?
#洗澡
我每天晚上洗澡。|Tối nào tôi cũng tắm.
我先去洗个澡。|Tôi đi tắm trước đã.
运动以后要洗澡。|Vận động xong phải tắm.
孩子不喜欢洗澡。|Trẻ con không thích tắm.
洗澡水太热了。|Nước tắm nóng quá.
#西北
新疆在中国的西北。|Tân Cương ở tây bắc Trung Quốc.
西北的冬天很冷。|Mùa đông vùng Tây Bắc rất lạnh.
风从西北吹来。|Gió thổi từ hướng tây bắc.
我去过西北旅游。|Tôi từng đi du lịch Tây Bắc.
越南西北的山很美。|Núi vùng Tây Bắc Việt Nam rất đẹp.
#西餐
我们去吃西餐吧。|Chúng ta đi ăn đồ Tây nhé.
你喜欢中餐还是西餐？|Bạn thích đồ Trung hay đồ Tây?
这家西餐厅很有名。|Nhà hàng Tây này rất nổi tiếng.
吃西餐用刀和叉。|Ăn đồ Tây dùng dao và nĩa.
我不太习惯吃西餐。|Tôi không quen ăn đồ Tây lắm.
#西方
太阳从西方落下。|Mặt trời lặn ở phương tây.
西方人喜欢喝咖啡。|Người phương Tây thích uống cà phê.
我对西方文化感兴趣。|Tôi hứng thú với văn hóa phương Tây.
西方的节日也很多。|Ngày lễ phương Tây cũng nhiều.
东方和西方的习惯不同。|Thói quen phương Đông và phương Tây khác nhau.
#西南
四川在中国西南。|Tứ Xuyên ở tây nam Trung Quốc.
学校在城市的西南边。|Trường ở phía tây nam thành phố.
西南的菜很辣。|Món ăn vùng tây nam rất cay.
我们往西南方向走。|Chúng ta đi về hướng tây nam.
西南地区山很多。|Vùng tây nam có nhiều núi.
#西医
我去看西医。|Tôi đi khám Tây y.
他是西医大夫。|Ông ấy là bác sĩ Tây y.
中医和西医都有用。|Đông y và Tây y đều có ích.
西医看病很快。|Khám Tây y rất nhanh.
你相信西医还是中医？|Bạn tin Tây y hay Đông y?
#下雪
外面下雪了。|Bên ngoài tuyết rơi rồi.
北京冬天常常下雪。|Mùa đông Bắc Kinh hay có tuyết.
我第一次看到下雪。|Lần đầu tôi thấy tuyết rơi.
下雪了，路很滑。|Tuyết rơi, đường rất trơn.
明天可能下雪。|Ngày mai có thể có tuyết.
#下周
下周我要考试。|Tuần sau tôi phải thi.
我们下周见。|Tuần sau gặp nhé.
下周天气会变冷。|Tuần sau trời sẽ lạnh hơn.
下周一开会。|Thứ hai tuần sau họp.
下周你有空吗？|Tuần sau bạn rảnh không?
#夏天
夏天很热。|Mùa hè rất nóng.
我喜欢夏天去游泳。|Tôi thích đi bơi vào mùa hè.
夏天的水果很多。|Mùa hè có nhiều hoa quả.
今年夏天我去中国。|Hè năm nay tôi đi Trung Quốc.
夏天要多喝水。|Mùa hè phải uống nhiều nước.
#相机
这是我的新相机。|Đây là máy ảnh mới của tôi.
我忘了带相机。|Tôi quên mang máy ảnh.
用相机拍照很清楚。|Chụp ảnh bằng máy ảnh rất nét.
这个相机多少钱？|Máy ảnh này bao nhiêu tiền?
现在很多人用手机，不用相机。|Bây giờ nhiều người dùng điện thoại, không dùng máy ảnh.
#相同
我们的想法相同。|Suy nghĩ của chúng tôi giống nhau.
这两个字读音相同。|Hai chữ này đọc giống nhau.
他们穿着相同的衣服。|Họ mặc quần áo giống nhau.
我们有相同的爱好。|Chúng tôi có cùng sở thích.
答案不相同。|Đáp án không giống nhau.
#响
电话响了。|Điện thoại reo rồi.
门铃响了。|Chuông cửa reo rồi.
外面的声音很响。|Tiếng bên ngoài rất to.
手机响了半天没人接。|Điện thoại reo mãi không ai nghe.
音乐响起来了。|Nhạc vang lên rồi.
#想到
我没想到你会来。|Tôi không ngờ bạn lại đến.
我想到了一个好办法。|Tôi nghĩ ra một cách hay.
一想到明天考试我就紧张。|Hễ nghĩ đến thi ngày mai là tôi căng thẳng.
你想到哪儿去了？|Bạn nghĩ đi đâu vậy?
他想到什么就说什么。|Anh ấy nghĩ gì nói nấy.
#向
请向左走。|Hãy đi về bên trái.
我们要向他学习。|Chúng ta phải học tập anh ấy.
他向我笑了笑。|Anh ấy mỉm cười với tôi.
向前走五百米。|Đi thẳng năm trăm mét.
请向大家介绍一下自己。|Hãy giới thiệu bản thân với mọi người.
#像
你很像你妈妈。|Bạn rất giống mẹ bạn.
她笑得像个孩子。|Cô ấy cười như một đứa trẻ.
这里像春天一样暖和。|Ở đây ấm áp như mùa xuân.
好像要下雨了。|Hình như sắp mưa rồi.
我也想像他那样说汉语。|Tôi cũng muốn nói tiếng Trung giống anh ấy.
#小声
请小声说话。|Xin nói nhỏ thôi.
他小声地告诉我。|Anh ấy nói nhỏ với tôi.
图书馆里要小声。|Trong thư viện phải nói khẽ.
孩子在睡觉，小声点儿。|Đứa bé đang ngủ, nhỏ tiếng chút.
她小声唱着歌。|Cô ấy khe khẽ hát.
#小时候
小时候我住在农村。|Hồi nhỏ tôi sống ở nông thôn.
小时候我很喜欢画画儿。|Hồi nhỏ tôi rất thích vẽ.
这是我小时候的照片。|Đây là ảnh hồi nhỏ của tôi.
你小时候想做什么？|Hồi nhỏ bạn muốn làm gì?
小时候妈妈常给我讲故事。|Hồi nhỏ mẹ hay kể chuyện cho tôi.
#小组
我们分成四个小组。|Chúng ta chia thành bốn nhóm.
我们小组有五个人。|Nhóm chúng tôi có năm người.
小组讨论开始了。|Thảo luận nhóm bắt đầu rồi.
你在哪个小组？|Bạn ở nhóm nào?
我们小组得了第一名。|Nhóm chúng tôi đứng thứ nhất.
#校园
我们的校园很漂亮。|Khuôn viên trường chúng tôi rất đẹp.
校园里有很多树。|Trong trường có rất nhiều cây.
晚上我在校园里散步。|Buổi tối tôi đi dạo trong trường.
大学校园很大。|Khuôn viên đại học rất rộng.
校园生活很有意思。|Cuộc sống học đường rất thú vị.
#校长
校长在讲话。|Hiệu trưởng đang phát biểu.
我们的校长很年轻。|Hiệu trưởng của chúng tôi rất trẻ.
校长办公室在三楼。|Phòng hiệu trưởng ở tầng ba.
校长认识每个学生。|Hiệu trưởng biết từng học sinh.
新校长下个月来。|Tháng sau hiệu trưởng mới đến.
#笑话
他给我们讲了一个笑话。|Anh ấy kể cho chúng tôi một truyện cười.
这个笑话很好笑。|Truyện cười này rất buồn cười.
别笑话我。|Đừng cười nhạo tôi.
我不会讲笑话。|Tôi không biết kể chuyện cười.
大家听了笑话都笑了。|Mọi người nghe truyện cười đều cười.
#笑话儿
你会说笑话儿吗？|Bạn biết kể chuyện cười không?
爷爷爱讲笑话儿。|Ông thích kể chuyện cười.
这个笑话儿我听过。|Truyện cười này tôi nghe rồi.
他说了一个笑话儿，大家都乐了。|Anh ấy kể một chuyện cười, mọi người đều vui.
看笑话儿可以学汉语。|Đọc truyện cười có thể học tiếng Trung.
#鞋
我买了一双新鞋。|Tôi mua một đôi giày mới.
这双鞋太小了。|Đôi giày này nhỏ quá.
进门请换鞋。|Vào nhà xin thay giày.
你穿多大的鞋？|Bạn đi giày cỡ bao nhiêu?
我的鞋脏了。|Giày của tôi bẩn rồi.
#心里
我心里很高兴。|Trong lòng tôi rất vui.
他心里有事。|Trong lòng anh ấy có chuyện.
你心里怎么想？|Trong lòng bạn nghĩ gì?
我心里很难过。|Trong lòng tôi rất buồn.
有话就说，别放在心里。|Có gì thì nói, đừng giữ trong lòng.
#心中
他是我心中的英雄。|Anh ấy là anh hùng trong lòng tôi.
我心中有一个梦想。|Trong lòng tôi có một ước mơ.
家永远在我心中。|Gia đình mãi trong tim tôi.
她心中很不安。|Trong lòng cô ấy rất bất an.
心中的话说出来就好了。|Nói ra điều trong lòng là thấy nhẹ nhõm.
#信
我给朋友写了一封信。|Tôi viết một lá thư cho bạn.
我收到了你的信。|Tôi nhận được thư của bạn.
你相信我吗？信我吧。|Bạn tin tôi không? Hãy tin tôi.
现在很少有人写信了。|Bây giờ ít người viết thư.
他的话我不信。|Lời anh ấy tôi không tin.
#信号
这里手机没有信号。|Ở đây điện thoại không có sóng.
信号很差。|Tín hiệu rất kém.
他给我一个信号。|Anh ấy ra hiệu cho tôi.
地下的信号不好。|Dưới tầng hầm sóng không tốt.
红灯是停车的信号。|Đèn đỏ là tín hiệu dừng xe.
#信用卡
我可以用信用卡吗？|Tôi dùng thẻ tín dụng được không?
他有很多信用卡。|Anh ấy có nhiều thẻ tín dụng.
我的信用卡丢了。|Thẻ tín dụng của tôi mất rồi.
这家店不能用信用卡。|Cửa hàng này không dùng được thẻ tín dụng.
用信用卡买东西很方便。|Mua đồ bằng thẻ tín dụng rất tiện.
#星星
天上有很多星星。|Trên trời có rất nhiều sao.
晚上我们看星星。|Buổi tối chúng tôi ngắm sao.
城市里看不到星星。|Trong thành phố không thấy sao.
星星很亮。|Ngôi sao rất sáng.
孩子在纸上画了几颗星星。|Đứa trẻ vẽ mấy ngôi sao trên giấy.
#行动
我们马上行动吧。|Chúng ta hành động ngay thôi.
光说不行动不行。|Chỉ nói không làm thì không được.
他行动很快。|Anh ấy hành động rất nhanh.
老人行动不方便。|Người già đi lại không tiện.
大家一起行动。|Mọi người cùng hành động.
#行人
路上行人很多。|Trên đường rất đông người đi bộ.
开车要注意行人。|Lái xe phải chú ý người đi đường.
晚上行人很少。|Buổi tối ít người qua lại.
行人请走这边。|Người đi bộ xin đi bên này.
一个行人问我路。|Một người đi đường hỏi tôi đường.
#行为
这种行为是不对的。|Hành vi này là không đúng.
他的行为让人很生气。|Hành vi của anh ấy khiến người ta rất tức giận.
我们要注意自己的行为。|Chúng ta phải chú ý hành vi của mình.
这是一种好行为。|Đây là một hành vi tốt.
孩子的行为像大人。|Hành vi của đứa trẻ giống người lớn.
#姓名
请写上你的姓名。|Hãy ghi họ tên của bạn.
你的姓名是什么？|Họ tên của bạn là gì?
表上要填姓名和电话。|Trên mẫu phải điền họ tên và số điện thoại.
他的姓名很好记。|Họ tên anh ấy rất dễ nhớ.
请说一下你的姓名。|Hãy nói họ tên của bạn.
#休假
我下个月休假。|Tháng sau tôi nghỉ phép.
他休假去旅游了。|Anh ấy nghỉ phép đi du lịch.
你一年有几天休假？|Một năm bạn được nghỉ phép mấy ngày?
经理在休假。|Giám đốc đang nghỉ phép.
休假的时候我在家休息。|Khi nghỉ phép tôi ở nhà nghỉ ngơi.
#许多
这里有许多人。|Ở đây có rất nhiều người.
我学到了许多东西。|Tôi học được rất nhiều điều.
许多年过去了。|Nhiều năm đã trôi qua.
他有许多朋友。|Anh ấy có rất nhiều bạn.
许多学生喜欢这个老师。|Nhiều học sinh thích thầy giáo này.
#学期
这个学期我很忙。|Học kỳ này tôi rất bận.
新学期开始了。|Học kỳ mới bắt đầu rồi.
一个学期有四个月。|Một học kỳ có bốn tháng.
下学期我想学书法。|Học kỳ sau tôi muốn học thư pháp.
学期结束有考试。|Cuối học kỳ có thi.
#雪
下雪了。|Tuyết rơi rồi.
雪很白。|Tuyết rất trắng.
孩子们在雪里玩儿。|Bọn trẻ chơi trong tuyết.
昨天的雪很大。|Tuyết hôm qua rất dày.
我从来没见过雪。|Tôi chưa bao giờ thấy tuyết.
#眼
她有一双大眼睛。|Cô ấy có đôi mắt to.
请看我一眼。|Hãy nhìn tôi một cái.
我一眼就认出了你。|Tôi nhận ra bạn ngay từ cái nhìn đầu tiên.
他眼不好，要戴眼镜。|Mắt anh ấy kém, phải đeo kính.
我累得眼都睁不开了。|Tôi mệt đến không mở nổi mắt.
#养
我家养了一只狗。|Nhà tôi nuôi một con chó.
你养过鱼吗？|Bạn từng nuôi cá chưa?
父母养大了我们。|Cha mẹ nuôi chúng tôi lớn khôn.
他养成了早起的习惯。|Anh ấy hình thành thói quen dậy sớm.
养花很有意思。|Trồng hoa rất thú vị.
#药店
附近有药店吗？|Gần đây có hiệu thuốc không?
我去药店买药。|Tôi đi hiệu thuốc mua thuốc.
药店晚上十点关门。|Hiệu thuốc đóng cửa lúc mười giờ tối.
这家药店很大。|Hiệu thuốc này rất lớn.
药店的人很热情。|Người ở hiệu thuốc rất nhiệt tình.
#药片
一次吃两个药片。|Mỗi lần uống hai viên thuốc.
药片很小。|Viên thuốc rất nhỏ.
这个药片很苦。|Viên thuốc này rất đắng.
孩子不喜欢吃药片。|Trẻ con không thích uống thuốc viên.
药片吃完了。|Thuốc viên uống hết rồi.
#药水
这个药水一天喝三次。|Thuốc nước này mỗi ngày uống ba lần.
药水很甜。|Thuốc nước rất ngọt.
医生给了我一瓶药水。|Bác sĩ cho tôi một chai thuốc nước.
药水要放在冰箱里。|Thuốc nước phải để trong tủ lạnh.
孩子喝了药水就好了。|Đứa bé uống thuốc nước là khỏi.
#要求
老师对我们要求很高。|Thầy yêu cầu chúng tôi rất cao.
你有什么要求？|Bạn có yêu cầu gì?
他要求我早点儿到。|Anh ấy yêu cầu tôi đến sớm.
这个要求不高。|Yêu cầu này không cao.
我们满足了顾客的要求。|Chúng tôi đáp ứng yêu cầu của khách hàng.
#也许
也许他不来了。|Có lẽ anh ấy không đến nữa.
也许明天会下雨。|Có lẽ mai sẽ mưa.
你也许是对的。|Có lẽ bạn đúng.
也许我们见过面。|Có lẽ chúng ta đã gặp nhau.
也许是我听错了。|Có lẽ là tôi nghe nhầm.
#夜
夜深了，快睡吧。|Khuya rồi, ngủ nhanh đi.
他工作到深夜。|Anh ấy làm việc đến tận đêm khuya.
今夜很冷。|Đêm nay rất lạnh.
我一夜没睡。|Tôi thức trắng cả đêm.
夜里很安静。|Ban đêm rất yên tĩnh.
#夜里
夜里下了一场雨。|Đêm qua có một trận mưa.
他夜里常常醒。|Ban đêm anh ấy hay tỉnh giấc.
夜里不要一个人出去。|Ban đêm đừng ra ngoài một mình.
夜里十二点他才回来。|Mười hai giờ đêm anh ấy mới về.
夜里外面很黑。|Ban đêm bên ngoài rất tối.
#一部分
我只看了一部分。|Tôi chỉ xem một phần.
一部分学生已经回家了。|Một số học sinh đã về nhà.
这是工作的一部分。|Đây là một phần công việc.
钱用了一部分。|Tiền đã dùng một phần.
一部分人同意，一部分人不同意。|Một phần người đồng ý, một phần không.
#一点点
我会说一点点汉语。|Tôi biết nói một chút xíu tiếng Trung.
请给我一点点水。|Cho tôi một chút nước.
他一点点地进步了。|Anh ấy tiến bộ từng chút một.
只差一点点。|Chỉ thiếu một chút xíu.
我一点点都不累。|Tôi không mệt chút nào.
#一路平安
祝你一路平安！|Chúc bạn thượng lộ bình an!
一路平安，到了给我打电话。|Đi đường bình an, đến nơi gọi cho tôi.
希望你们一路平安。|Mong các bạn đi đường bình an.
他一路平安地回到了家。|Anh ấy về nhà bình an.
一路平安，下次再见！|Thượng lộ bình an, hẹn gặp lại!
#一路顺风
祝你一路顺风！|Chúc bạn thuận buồm xuôi gió!
一路顺风，常联系。|Thuận buồm xuôi gió, giữ liên lạc nhé.
朋友们祝他一路顺风。|Bạn bè chúc anh ấy thượng lộ bình an.
这次旅行一路顺风。|Chuyến đi này suôn sẻ.
祝大家一路顺风！|Chúc mọi người lên đường thuận lợi!
#一生
他一生都在教书。|Cả đời ông ấy dạy học.
这是我一生中最快乐的一天。|Đây là ngày vui nhất trong đời tôi.
一生只有一次。|Cả đời chỉ có một lần.
我会一生记住你。|Tôi sẽ nhớ bạn suốt đời.
他的一生很不容易。|Cuộc đời ông ấy rất không dễ dàng.
#一直
一直往前走。|Cứ đi thẳng về phía trước.
我一直在等你。|Tôi luôn đợi bạn.
雨一直下。|Mưa cứ rơi mãi.
他一直很努力。|Anh ấy luôn rất chăm chỉ.
我一直想去中国。|Tôi luôn muốn đi Trung Quốc.
#以上
十八岁以上才可以开车。|Từ mười tám tuổi trở lên mới được lái xe.
以上是我的看法。|Trên đây là quan điểm của tôi.
气温在三十度以上。|Nhiệt độ trên ba mươi độ.
一百人以上参加了比赛。|Hơn một trăm người tham gia cuộc thi.
以上的问题都很重要。|Các vấn đề trên đều rất quan trọng.
#以外
除了他以外，大家都来了。|Ngoài anh ấy ra, mọi người đều đến.
学习以外，我也喜欢运动。|Ngoài học tập, tôi cũng thích thể thao.
除此以外，还有别的问题吗？|Ngoài ra, còn vấn đề nào khác không?
学校以外的地方不安全。|Những nơi ngoài trường không an toàn.
上课以外，我还打工。|Ngoài đi học, tôi còn làm thêm.
#以为
我以为你不来了。|Tôi tưởng bạn không đến nữa.
我以为他是老师。|Tôi tưởng anh ấy là giáo viên.
你以为我不知道吗？|Bạn tưởng tôi không biết à?
我以为今天是星期天。|Tôi tưởng hôm nay là chủ nhật.
他以为考试很容易。|Anh ấy tưởng kỳ thi rất dễ.
#以下
十岁以下的孩子不要钱。|Trẻ em dưới mười tuổi miễn phí.
请回答以下问题。|Hãy trả lời các câu hỏi sau.
气温在零度以下。|Nhiệt độ dưới không độ.
以下是我的建议。|Dưới đây là đề xuất của tôi.
一百块以下的东西都很便宜。|Đồ dưới một trăm đồng đều rẻ.
#椅子
请坐这把椅子。|Mời ngồi chiếc ghế này.
教室里有三十把椅子。|Trong lớp có ba mươi cái ghế.
这把椅子坏了。|Cái ghế này hỏng rồi.
椅子上有一本书。|Trên ghế có một quyển sách.
我买了两把新椅子。|Tôi mua hai cái ghế mới.
#亿
中国有十四亿人。|Trung Quốc có một tỷ bốn trăm triệu người.
这个公司挣了一亿块。|Công ty này kiếm được một trăm triệu đồng.
越南有一亿人左右。|Việt Nam có khoảng một trăm triệu người.
地球有几十亿年了。|Trái đất đã có mấy tỷ năm.
一亿是一万个一万。|Một trăm triệu là một vạn lần một vạn.
#意见
你有什么意见？|Bạn có ý kiến gì?
我同意你的意见。|Tôi đồng ý với ý kiến của bạn.
大家的意见不一样。|Ý kiến mọi người không giống nhau.
请给我一些意见。|Hãy cho tôi vài ý kiến.
他对我有意见。|Anh ấy có ý không hài lòng với tôi.
#阴
今天天阴了。|Hôm nay trời âm u.
天阴得很厉害，快下雨了。|Trời âm u lắm, sắp mưa rồi.
明天是阴还是晴？|Mai âm u hay nắng?
他的脸很阴。|Mặt anh ấy sa sầm lại.
阴转晴。|Âm u chuyển nắng.
#阴天
今天是阴天。|Hôm nay trời âm u.
阴天的时候我不想出去。|Trời âm u tôi không muốn ra ngoài.
最近一直是阴天。|Dạo này cứ âm u suốt.
阴天也要带伞。|Trời âm u cũng phải mang ô.
阴天拍照不好看。|Trời âm u chụp ảnh không đẹp.
#音节
"你好"有两个音节。|"Nǐ hǎo" có hai âm tiết.
汉语一个字一个音节。|Tiếng Trung mỗi chữ một âm tiết.
这个音节怎么读？|Âm tiết này đọc thế nào?
请注意每个音节的声调。|Hãy chú ý thanh điệu của mỗi âm tiết.
这个词有三个音节。|Từ này có ba âm tiết.
#音乐会
我们去听音乐会吧。|Chúng ta đi nghe hòa nhạc nhé.
音乐会八点开始。|Buổi hòa nhạc bắt đầu lúc tám giờ.
这场音乐会很精彩。|Buổi hòa nhạc này rất đặc sắc.
音乐会的票卖完了。|Vé hòa nhạc bán hết rồi.
学校举办了一场音乐会。|Trường tổ chức một buổi hòa nhạc.
#银行卡
我办了一张银行卡。|Tôi làm một chiếc thẻ ngân hàng.
你带银行卡了吗？|Bạn có mang thẻ ngân hàng không?
我的银行卡里没钱了。|Thẻ ngân hàng của tôi hết tiền rồi.
用银行卡付钱很方便。|Trả tiền bằng thẻ ngân hàng rất tiện.
银行卡丢了要马上打电话。|Mất thẻ ngân hàng phải gọi điện ngay.
#英文
你会说英文吗？|Bạn biết nói tiếng Anh không?
这本书是英文的。|Cuốn sách này bằng tiếng Anh.
请用英文写名字。|Hãy viết tên bằng tiếng Anh.
他的英文很好。|Tiếng Anh của anh ấy rất tốt.
这个词英文怎么说？|Từ này tiếng Anh nói thế nào?
#英语
我会说一点儿英语。|Tôi biết nói một chút tiếng Anh.
英语和汉语哪个难？|Tiếng Anh và tiếng Trung cái nào khó?
他是英语老师。|Anh ấy là giáo viên tiếng Anh.
我从小学英语。|Tôi học tiếng Anh từ nhỏ.
你英语说得真好。|Bạn nói tiếng Anh giỏi thật.
#影片
这部影片很好看。|Bộ phim này rất hay.
今天放什么影片？|Hôm nay chiếu phim gì?
这是一部老影片。|Đây là một bộ phim cũ.
这部影片得了很多奖。|Bộ phim này đoạt nhiều giải.
我喜欢看外国影片。|Tôi thích xem phim nước ngoài.
#油
做菜要放点儿油。|Nấu ăn phải cho chút dầu.
这个菜太油了。|Món này nhiều dầu mỡ quá.
车没油了。|Xe hết xăng rồi.
油价又涨了。|Giá xăng lại tăng rồi.
加油！|Cố lên!
#游客
这里游客很多。|Ở đây rất đông du khách.
很多外国游客来越南。|Nhiều du khách nước ngoài đến Việt Nam.
游客们在照相。|Các du khách đang chụp ảnh.
游客请走这边。|Du khách xin đi bên này.
春节的时候游客特别多。|Dịp Tết du khách đặc biệt đông.
#有空儿
你今天有空儿吗？|Hôm nay bạn rảnh không?
有空儿来我家玩儿。|Rảnh thì đến nhà tôi chơi.
我明天有空儿。|Ngày mai tôi rảnh.
他忙得没有空儿吃饭。|Anh ấy bận đến không có thời gian ăn cơm.
有空儿我们一起去看电影吧。|Rảnh thì chúng ta cùng đi xem phim nhé.
#有一点儿
我有一点儿累。|Tôi hơi mệt.
今天有一点儿冷。|Hôm nay hơi lạnh.
这个菜有一点儿辣。|Món này hơi cay.
我有一点儿不明白。|Tôi hơi chưa hiểu.
他有一点儿不高兴。|Anh ấy hơi không vui.
#鱼
我喜欢吃鱼。|Tôi thích ăn cá.
河里有很多鱼。|Dưới sông có nhiều cá.
妈妈做的鱼很好吃。|Cá mẹ làm rất ngon.
他去河边钓鱼了。|Anh ấy ra bờ sông câu cá.
这条鱼很大。|Con cá này rất to.
#语言
你会几种语言？|Bạn biết mấy ngôn ngữ?
学语言要多说。|Học ngôn ngữ phải nói nhiều.
汉语是一种很有意思的语言。|Tiếng Trung là một ngôn ngữ rất thú vị.
他喜欢学外国语言。|Anh ấy thích học ngoại ngữ.
语言不同，但我们是朋友。|Ngôn ngữ khác nhau nhưng chúng ta là bạn.
#原来
原来是你啊！|Hóa ra là bạn!
我原来住在河内。|Tôi vốn sống ở Hà Nội.
原来他是老师。|Hóa ra anh ấy là giáo viên.
这里和原来不一样了。|Ở đây khác trước rồi.
原来你早就知道了。|Hóa ra bạn biết từ lâu rồi.
#院
我家的院里有一棵树。|Trong sân nhà tôi có một cái cây.
他住在医院里。|Anh ấy nằm trong bệnh viện.
我们去电影院吧。|Chúng ta đi rạp chiếu phim nhé.
他在外语学院学习。|Anh ấy học ở học viện ngoại ngữ.
院里很安静。|Trong sân rất yên tĩnh.
#院长
院长在开会。|Viện trưởng đang họp.
他是医院的院长。|Ông ấy là giám đốc bệnh viện.
新院长很有经验。|Viện trưởng mới rất có kinh nghiệm.
我想见院长。|Tôi muốn gặp viện trưởng.
院长给我们讲话。|Viện trưởng phát biểu với chúng tôi.
#院子
院子里有很多花。|Trong sân có nhiều hoa.
孩子们在院子里玩儿。|Bọn trẻ chơi trong sân.
我家院子很大。|Sân nhà tôi rất rộng.
爷爷在院子里喝茶。|Ông uống trà trong sân.
请把车停在院子里。|Hãy đỗ xe trong sân.
#月份
你是几月份生的？|Bạn sinh tháng mấy?
这个月份天气很好。|Tháng này thời tiết rất đẹp.
哪个月份去旅游最好？|Đi du lịch tháng nào là tốt nhất?
十二月份是最后一个月。|Tháng mười hai là tháng cuối cùng.
三月份我要考试。|Tháng ba tôi phải thi.
#月亮
今天的月亮很圆。|Trăng hôm nay rất tròn.
月亮出来了。|Mặt trăng lên rồi.
中秋节我们看月亮。|Trung thu chúng tôi ngắm trăng.
月亮很亮。|Mặt trăng rất sáng.
孩子问月亮上有什么。|Đứa bé hỏi trên mặt trăng có gì.
#越
雨越下越大。|Mưa càng lúc càng to.
他越来越胖了。|Anh ấy càng ngày càng béo.
我越想越生气。|Tôi càng nghĩ càng tức.
汉语越学越有意思。|Tiếng Trung càng học càng thú vị.
天气越来越冷了。|Thời tiết càng ngày càng lạnh.
#云
天上有很多云。|Trên trời có nhiều mây.
云是白色的。|Mây màu trắng.
今天没有云。|Hôm nay không có mây.
山上的云很美。|Mây trên núi rất đẹp.
乌云来了，要下雨了。|Mây đen kéo đến, sắp mưa rồi.
#咱
咱俩一起去吧。|Hai chúng ta cùng đi nhé.
咱家有客人来了。|Nhà mình có khách đến.
咱是好朋友。|Chúng ta là bạn tốt.
咱们走吧，咱不等了。|Chúng ta đi thôi, mình không đợi nữa.
这是咱自己的事。|Đây là việc của chính chúng ta.
#咱们
咱们一起吃饭吧。|Chúng ta cùng ăn cơm nhé.
咱们明天见。|Mai chúng ta gặp nhau.
咱们是老朋友了。|Chúng ta là bạn cũ rồi.
咱们走吧。|Chúng ta đi thôi.
咱们班的同学都很好。|Bạn học lớp mình đều rất tốt.
#脏
你的衣服脏了。|Quần áo của bạn bẩn rồi.
房间太脏了，快打扫一下。|Phòng bẩn quá, mau dọn dẹp đi.
手很脏，去洗手吧。|Tay bẩn lắm, đi rửa tay đi.
别把书弄脏了。|Đừng làm bẩn sách.
这条河的水很脏。|Nước con sông này rất bẩn.
#早餐
早餐吃什么？|Bữa sáng ăn gì?
早餐很重要。|Bữa sáng rất quan trọng.
我早餐喝牛奶。|Bữa sáng tôi uống sữa.
酒店有免费早餐。|Khách sạn có bữa sáng miễn phí.
我今天没吃早餐。|Hôm nay tôi không ăn sáng.
#早晨
早晨的空气很好。|Không khí buổi sáng sớm rất tốt.
我每天早晨跑步。|Sáng sớm nào tôi cũng chạy bộ.
早晨六点天就亮了。|Sáu giờ sáng trời đã sáng.
早晨的公园很安静。|Công viên buổi sáng sớm rất yên tĩnh.
他早晨很早起床。|Anh ấy dậy rất sớm vào buổi sáng.
#早就
我早就知道了。|Tôi biết từ lâu rồi.
他早就走了。|Anh ấy đi từ lâu rồi.
我早就想来这里了。|Tôi muốn đến đây từ lâu rồi.
饭早就做好了。|Cơm đã nấu xong từ lâu.
我们早就认识了。|Chúng tôi quen nhau từ lâu rồi.
#怎么办
钱丢了，怎么办？|Mất tiền rồi, làm sao bây giờ?
下雨了，我们怎么办？|Mưa rồi, chúng ta làm thế nào?
你说怎么办就怎么办。|Bạn nói sao thì làm vậy.
我不知道怎么办。|Tôi không biết làm thế nào.
如果他不来怎么办？|Nếu anh ấy không đến thì làm sao?
#怎样
你觉得怎样？|Bạn thấy thế nào?
怎样才能学好汉语？|Làm thế nào mới học giỏi tiếng Trung?
他是怎样的一个人？|Anh ấy là người như thế nào?
这个菜怎样做？|Món này làm thế nào?
最近过得怎样？|Dạo này sống thế nào?
#占
这张桌子占地方太大。|Cái bàn này chiếm nhiều chỗ quá.
请帮我占个座位。|Hãy giữ giúp tôi một chỗ ngồi.
女生占全班的一半。|Nữ chiếm một nửa cả lớp.
学习占了我很多时间。|Học tập chiếm nhiều thời gian của tôi.
别占别人的便宜。|Đừng lợi dụng người khác.
#站住
站住！别跑！|Đứng lại! Đừng chạy!
他突然站住了。|Anh ấy bỗng đứng lại.
听到声音，他站住了脚。|Nghe tiếng động, anh ấy dừng chân.
站住，你去哪儿？|Đứng lại, bạn đi đâu?
孩子站住看了一会儿。|Đứa trẻ đứng lại nhìn một lúc.
#长大
我在河内长大。|Tôi lớn lên ở Hà Nội.
你长大想做什么？|Lớn lên bạn muốn làm gì?
孩子们都长大了。|Bọn trẻ đều lớn cả rồi.
他长大以后当了医生。|Lớn lên anh ấy trở thành bác sĩ.
时间过得真快，你都长大了。|Thời gian trôi nhanh thật, con lớn rồi.
#找出
请找出不同的地方。|Hãy tìm ra chỗ khác nhau.
我们找出了问题。|Chúng tôi đã tìm ra vấn đề.
他找出一张老照片。|Anh ấy lục ra một tấm ảnh cũ.
找出正确的答案。|Tìm ra đáp án đúng.
医生找出了生病的原因。|Bác sĩ tìm ra nguyên nhân bị bệnh.
#照相
我们在这儿照相吧。|Chúng ta chụp ảnh ở đây nhé.
这里不能照相。|Ở đây không được chụp ảnh.
他很喜欢照相。|Anh ấy rất thích chụp ảnh.
请帮我们照张相。|Xin chụp giúp chúng tôi một tấm ảnh.
照相的时候要笑一笑。|Khi chụp ảnh phải cười lên.
#这么
今天这么冷！|Hôm nay lạnh thế!
你怎么来得这么早？|Sao bạn đến sớm vậy?
这么多菜，吃不完。|Nhiều món thế này, ăn không hết.
我没想到他这么高。|Tôi không ngờ anh ấy cao thế.
这个字这么写。|Chữ này viết như thế này.
#这时
这时，门开了。|Đúng lúc này, cửa mở ra.
这时他才明白。|Lúc này anh ấy mới hiểu.
这时外面下起了雨。|Lúc này bên ngoài đổ mưa.
这时电话响了。|Lúc này điện thoại reo.
这时大家都笑了。|Lúc này mọi người đều cười.
#这时候
这时候你去哪儿？|Giờ này bạn đi đâu?
这时候商店都关门了。|Giờ này cửa hàng đều đóng cửa rồi.
每年这时候都很热。|Mỗi năm vào lúc này đều rất nóng.
这时候他应该到家了。|Giờ này chắc anh ấy về đến nhà rồi.
这时候不要给他打电话。|Lúc này đừng gọi điện cho anh ấy.
#正常
他的体温正常。|Nhiệt độ cơ thể anh ấy bình thường.
这很正常，别担心。|Chuyện này bình thường, đừng lo.
飞机正常起飞。|Máy bay cất cánh bình thường.
电脑不能正常工作了。|Máy tính không hoạt động bình thường nữa.
生活又正常了。|Cuộc sống lại bình thường rồi.
#正好
你来得正好。|Bạn đến đúng lúc.
这双鞋我穿正好。|Đôi giày này tôi đi vừa vặn.
我正好也要去那儿。|Tôi cũng vừa hay muốn đến đó.
正好十块钱。|Vừa đúng mười đồng.
今天正好是星期天。|Hôm nay vừa đúng chủ nhật.
#正确
你的答案是正确的。|Đáp án của bạn đúng.
请选出正确的意思。|Hãy chọn nghĩa đúng.
这个方法很正确。|Phương pháp này rất đúng đắn.
他的发音不太正确。|Phát âm của anh ấy không chuẩn lắm.
我们做了正确的选择。|Chúng tôi đã đưa ra lựa chọn đúng đắn.
#正是
这正是我想要的。|Đây chính là thứ tôi muốn.
他正是我们的新老师。|Anh ấy chính là giáo viên mới của chúng tôi.
现在正是吃饭的时候。|Bây giờ đúng là lúc ăn cơm.
正是因为你，我才来的。|Chính vì bạn, tôi mới đến.
秋天正是旅游的好季节。|Mùa thu chính là mùa đẹp để du lịch.
#直接
你直接来我家吧。|Bạn đến thẳng nhà tôi nhé.
有问题直接问我。|Có vấn đề cứ hỏi thẳng tôi.
他说话很直接。|Anh ấy nói chuyện rất thẳng thắn.
这趟车直接到机场。|Chuyến xe này đi thẳng ra sân bay.
下班后我直接回家。|Tan làm tôi về thẳng nhà.
#只能
我只能等他。|Tôi chỉ có thể đợi anh ấy.
这里只能坐四个人。|Ở đây chỉ ngồi được bốn người.
没有车，只能走路去。|Không có xe, chỉ có thể đi bộ.
我只能说一点儿汉语。|Tôi chỉ nói được một chút tiếng Trung.
钱不够，只能买一个。|Không đủ tiền, chỉ mua được một cái.
#纸
请给我一张纸。|Cho tôi một tờ giấy.
把名字写在纸上。|Viết tên lên giấy.
纸用完了。|Giấy dùng hết rồi.
这种纸很薄。|Loại giấy này rất mỏng.
中国人发明了纸。|Người Trung Quốc phát minh ra giấy.
#中餐
你喜欢吃中餐吗？|Bạn thích ăn đồ Trung Quốc không?
附近有一家中餐馆。|Gần đây có một nhà hàng Trung Quốc.
我会做几个中餐。|Tôi biết nấu vài món Trung Quốc.
中餐和西餐不一样。|Món Trung và món Tây khác nhau.
今天中午我们吃中餐。|Trưa nay chúng ta ăn món Trung.
#中级
我在学中级汉语。|Tôi đang học tiếng Trung trung cấp.
这本书是中级的。|Cuốn sách này là trình độ trung cấp.
他的汉语已经到中级了。|Tiếng Trung của anh ấy đã lên trung cấp.
中级班有二十个学生。|Lớp trung cấp có hai mươi học sinh.
中级考试比初级难。|Thi trung cấp khó hơn sơ cấp.
#中年
他是一个中年人。|Ông ấy là một người trung niên.
中年人工作压力很大。|Người trung niên áp lực công việc rất lớn.
一位中年女人走了进来。|Một người phụ nữ trung niên bước vào.
人到中年要注意身体。|Đến tuổi trung niên phải chú ý sức khỏe.
很多中年人喜欢跑步。|Nhiều người trung niên thích chạy bộ.
#中小学
这里有很多中小学。|Ở đây có nhiều trường tiểu học và trung học.
中小学九月开学。|Các trường phổ thông khai giảng tháng chín.
她是中小学老师。|Cô ấy là giáo viên phổ thông.
中小学生要多运动。|Học sinh phổ thông cần vận động nhiều.
中小学的假期很长。|Kỳ nghỉ của học sinh phổ thông rất dài.
#中心
我住在城市中心。|Tôi sống ở trung tâm thành phố.
学生中心在哪儿？|Trung tâm sinh viên ở đâu?
他是大家的中心。|Anh ấy là trung tâm của mọi người.
这里是购物中心。|Đây là trung tâm mua sắm.
请站在中心。|Hãy đứng ở chính giữa.
#中医
我想看中医。|Tôi muốn khám Đông y.
他是一个有名的中医。|Ông ấy là một thầy thuốc Đông y nổi tiếng.
中医很有意思。|Đông y rất thú vị.
她在大学学中医。|Cô ấy học Đông y ở đại học.
吃中药是中医的方法。|Uống thuốc bắc là phương pháp của Đông y.
#重复
请重复一遍。|Xin nhắc lại một lần.
这个词重复了很多次。|Từ này lặp lại nhiều lần.
不要重复同样的错误。|Đừng lặp lại cùng một lỗi.
请跟我重复。|Hãy lặp lại theo tôi.
他把问题重复了一下。|Anh ấy nhắc lại câu hỏi.
#重新
请重新写一遍。|Hãy viết lại một lần.
我们重新开始吧。|Chúng ta bắt đầu lại nhé.
电脑要重新打开。|Máy tính phải khởi động lại.
他重新找了一个工作。|Anh ấy tìm lại một công việc mới.
请重新说一遍。|Hãy nói lại một lần nữa.
#周
我下周去北京。|Tuần sau tôi đi Bắc Kinh.
一周有七天。|Một tuần có bảy ngày.
这周我很忙。|Tuần này tôi rất bận.
我们每周上三次课。|Mỗi tuần chúng tôi học ba buổi.
周末你做什么？|Cuối tuần bạn làm gì?
#周年
今天是我们结婚十周年。|Hôm nay là kỷ niệm mười năm ngày cưới của chúng tôi.
学校成立五十周年了。|Trường thành lập được năm mươi năm rồi.
公司要庆祝一周年。|Công ty muốn mừng kỷ niệm một năm.
这是第二十周年。|Đây là năm kỷ niệm thứ hai mươi.
周年那天大家都来了。|Hôm kỷ niệm mọi người đều đến.
#主人
这只狗的主人是谁？|Chủ của con chó này là ai?
主人请我们吃饭。|Chủ nhà mời chúng tôi ăn cơm.
我是这个房子的主人。|Tôi là chủ căn nhà này.
主人很热情。|Chủ nhà rất nhiệt tình.
猫在等主人回家。|Con mèo đang đợi chủ về nhà.
#住房
大城市住房很贵。|Nhà ở thành phố lớn rất đắt.
公司给员工提供住房。|Công ty cung cấp nhà ở cho nhân viên.
他们的住房很小。|Nhà ở của họ rất nhỏ.
住房问题很重要。|Vấn đề nhà ở rất quan trọng.
我在找住房。|Tôi đang tìm nhà ở.
#住院
他病了，要住院。|Anh ấy ốm, phải nằm viện.
奶奶住院一个星期了。|Bà nằm viện một tuần rồi.
我去医院看住院的朋友。|Tôi đến bệnh viện thăm bạn đang nằm viện.
他明天可以出院，不用住院了。|Mai anh ấy được ra viện, không phải nằm viện nữa.
住院的时候要多休息。|Khi nằm viện phải nghỉ ngơi nhiều.
#装
把书装进包里。|Cho sách vào túi.
这个箱子装不下了。|Cái thùng này không chứa nổi nữa.
他在装睡。|Anh ấy đang giả vờ ngủ.
别装不知道。|Đừng giả vờ không biết.
瓶子里装满了水。|Chai đựng đầy nước.
#准确
请说出准确的时间。|Hãy nói thời gian chính xác.
他的发音很准确。|Phát âm của anh ấy rất chuẩn.
这个数字不太准确。|Con số này không chính xác lắm.
天气预报很准确。|Dự báo thời tiết rất chính xác.
回答要准确。|Câu trả lời phải chính xác.
#字典
这个字查字典吧。|Chữ này tra từ điển đi.
我买了一本汉语字典。|Tôi mua một quyển từ điển tiếng Trung.
你会用字典吗？|Bạn biết dùng từ điển không?
字典在桌子上。|Từ điển ở trên bàn.
手机里也有字典。|Trong điện thoại cũng có từ điển.
#自行车
我骑自行车上学。|Tôi đi xe đạp đến trường.
这辆自行车是新的。|Chiếc xe đạp này là mới.
我的自行车坏了。|Xe đạp của tôi hỏng rồi.
骑自行车对身体好。|Đi xe đạp tốt cho sức khỏe.
他在学骑自行车。|Anh ấy đang học đi xe đạp.
#自由
我想要自由。|Tôi muốn tự do.
周末时间很自由。|Thời gian cuối tuần rất tự do.
你可以自由选择。|Bạn có thể tự do lựa chọn.
鸟在天上自由地飞。|Chim bay tự do trên trời.
大学生活比较自由。|Cuộc sống đại học khá tự do.
#走过
他从我身边走过。|Anh ấy đi ngang qua bên cạnh tôi.
我们走过一座桥。|Chúng tôi đi qua một cây cầu.
这条路我走过很多次。|Con đường này tôi đi qua nhiều lần.
走过这个路口就到了。|Đi qua ngã tư này là đến.
他走过来跟我说话。|Anh ấy đi tới nói chuyện với tôi.
#走进
老师走进教室。|Thầy giáo bước vào lớp.
她走进了商店。|Cô ấy bước vào cửa hàng.
我们走进了一家饭馆。|Chúng tôi bước vào một quán ăn.
他慢慢走进房间。|Anh ấy chầm chậm bước vào phòng.
走进大门就是花园。|Bước qua cổng lớn là vườn hoa.
#走开
请你走开。|Mời bạn tránh ra.
他生气地走开了。|Anh ấy tức giận bỏ đi.
你别走开，我马上回来。|Bạn đừng đi đâu, tôi về ngay.
走开！别看我。|Tránh ra! Đừng nhìn tôi.
小狗走开了。|Con chó con bỏ đi rồi.
#租
我想租一个房子。|Tôi muốn thuê một căn nhà.
这个房子一个月租多少钱？|Căn nhà này thuê mỗi tháng bao nhiêu tiền?
我们租了一辆车。|Chúng tôi thuê một chiếc xe.
他在学校旁边租房子。|Anh ấy thuê nhà cạnh trường.
这里可以租自行车。|Ở đây có thể thuê xe đạp.
#组
我们三个人一组。|Ba người chúng ta một nhóm.
你在第几组？|Bạn ở nhóm thứ mấy?
请大家组成两组。|Mọi người hãy chia thành hai nhóm.
这组词很难。|Nhóm từ này rất khó.
我们组今天值日。|Hôm nay nhóm chúng tôi trực nhật.
#组成
这个班由二十个人组成。|Lớp này gồm hai mươi người.
我们组成了一个小组。|Chúng tôi lập thành một nhóm.
一个词由两个字组成。|Một từ gồm hai chữ.
家庭由父母和孩子组成。|Gia đình gồm cha mẹ và con cái.
他们组成了一个乐队。|Họ lập thành một ban nhạc.
#组长
他是我们的组长。|Anh ấy là nhóm trưởng của chúng tôi.
组长让我们开会。|Nhóm trưởng bảo chúng tôi họp.
谁想当组长？|Ai muốn làm nhóm trưởng?
有问题问组长。|Có vấn đề thì hỏi nhóm trưởng.
新组长很认真。|Nhóm trưởng mới rất nghiêm túc.
#嘴
张开嘴。|Há miệng ra.
他嘴里有东西。|Trong miệng anh ấy có đồ.
她的嘴很小。|Miệng cô ấy rất nhỏ.
吃饭的时候别张嘴说话。|Khi ăn đừng mở miệng nói chuyện.
小孩的嘴很甜。|Đứa bé ăn nói rất ngọt ngào.
#最近
最近你忙吗？|Dạo này bạn bận không?
最近天气很好。|Gần đây thời tiết rất đẹp.
最近的银行在哪儿？|Ngân hàng gần nhất ở đâu?
我最近在学汉语。|Dạo này tôi đang học tiếng Trung.
他最近身体不太好。|Gần đây sức khỏe anh ấy không tốt lắm.
#作家
他是一个有名的作家。|Ông ấy là một nhà văn nổi tiếng.
我想当作家。|Tôi muốn làm nhà văn.
这位作家写了很多书。|Nhà văn này viết rất nhiều sách.
你喜欢哪个作家？|Bạn thích nhà văn nào?
作家每天都写作。|Nhà văn ngày nào cũng viết.
#作文
今天的作业是写作文。|Bài tập hôm nay là viết bài văn.
他的作文写得很好。|Bài văn của em ấy viết rất hay.
作文要写三百字。|Bài văn phải viết ba trăm chữ.
老师在看我们的作文。|Thầy giáo đang xem bài văn của chúng tôi.
这篇作文题目是"我的家"。|Bài văn này có đề là "Gia đình tôi".
#作用
这个药有什么作用？|Thuốc này có tác dụng gì?
运动对身体有很大作用。|Vận động có tác dụng lớn đối với cơ thể.
他在公司起了重要作用。|Anh ấy đóng vai trò quan trọng trong công ty.
我说的话没有作用。|Lời tôi nói không có tác dụng.
这个方法很有作用。|Phương pháp này rất hiệu quả.
#座
前面有一座山。|Phía trước có một ngọn núi.
这座楼很高。|Tòa nhà này rất cao.
河上有一座桥。|Trên sông có một cây cầu.
这是一座老城。|Đây là một thành phố cổ.
请问这里有座吗？|Xin hỏi ở đây còn chỗ ngồi không?
#座位
这个座位有人吗？|Chỗ ngồi này có người chưa?
请回到你的座位。|Hãy về chỗ ngồi của bạn.
车上没有座位了。|Trên xe hết chỗ ngồi rồi.
我的座位在窗边。|Chỗ ngồi của tôi cạnh cửa sổ.
他给老人让座位。|Anh ấy nhường chỗ ngồi cho người già.
#做到
我一定能做到。|Tôi nhất định làm được.
说到就要做到。|Đã nói là phải làm được.
这件事很难做到。|Việc này rất khó làm được.
你是怎么做到的？|Bạn đã làm được bằng cách nào?
只要努力就能做到。|Chỉ cần cố gắng là làm được.
#做法
这个菜的做法很简单。|Cách làm món này rất đơn giản.
我不同意你的做法。|Tôi không đồng ý cách làm của bạn.
每个人的做法不一样。|Cách làm của mỗi người khác nhau.
这种做法不对。|Cách làm này không đúng.
请教我饺子的做法。|Hãy dạy tôi cách làm sủi cảo.
#安装
我在安装空调。|Tôi đang lắp điều hòa.
手机要安装这个软件。|Điện thoại cần cài phần mềm này.
安装好了吗？|Lắp xong chưa?
师傅来安装电视。|Thợ đến lắp tivi.
安装很简单。|Lắp đặt rất đơn giản.
#按
请按这个按钮。|Hãy ấn nút này.
按一下门铃。|Bấm chuông cửa một cái.
请按时到。|Hãy đến đúng giờ.
按老师说的做。|Làm theo lời thầy nói.
他按了好几次。|Anh ấy ấn mấy lần liền.
#按照
请按照要求写。|Hãy viết theo yêu cầu.
按照计划，我们明天出发。|Theo kế hoạch, mai chúng ta xuất phát.
按照这个方法做。|Làm theo phương pháp này.
按照规定，这里不能吸烟。|Theo quy định, ở đây không được hút thuốc.
他按照地图找到了酒店。|Anh ấy tìm được khách sạn theo bản đồ.
#把握
这次考试我有把握。|Kỳ thi này tôi chắc chắn.
你要把握机会。|Bạn phải nắm lấy cơ hội.
我没有把握能赢。|Tôi không chắc thắng được.
他很会把握时间。|Anh ấy rất biết nắm bắt thời gian.
你有多大把握？|Bạn chắc chắn được bao nhiêu?
#白菜
我买了一棵白菜。|Tôi mua một cây cải thảo.
白菜很便宜。|Cải thảo rất rẻ.
妈妈做了白菜汤。|Mẹ nấu canh cải thảo.
冬天北方人常吃白菜。|Mùa đông người miền Bắc hay ăn cải thảo.
白菜饺子很好吃。|Sủi cảo nhân cải thảo rất ngon.
#班级
我们班级有三十个人。|Lớp chúng tôi có ba mươi người.
他是班级第一名。|Em ấy đứng nhất lớp.
每个班级都参加了比赛。|Lớp nào cũng tham gia cuộc thi.
我们班级很团结。|Lớp chúng tôi rất đoàn kết.
新班级的同学很友好。|Bạn học lớp mới rất thân thiện.
#搬
帮我搬一下桌子。|Giúp tôi khiêng cái bàn một chút.
这个箱子太重了，搬不动。|Cái thùng này nặng quá, không khiêng nổi.
他们搬到上海了。|Họ chuyển đến Thượng Hải rồi.
请把椅子搬过来。|Hãy khiêng cái ghế qua đây.
我们搬了一下午东西。|Chúng tôi khuân đồ cả buổi chiều.
#搬家
我们下个月搬家。|Tháng sau chúng tôi chuyển nhà.
搬家很累。|Chuyển nhà rất mệt.
你搬家了吗？|Bạn chuyển nhà chưa?
朋友帮我搬家。|Bạn bè giúp tôi chuyển nhà.
他一年搬了三次家。|Một năm anh ấy chuyển nhà ba lần.
#板
老师在黑板上写字。|Thầy viết chữ lên bảng đen.
这块板很结实。|Tấm ván này rất chắc.
地板很干净。|Sàn nhà rất sạch.
请把板子放在那儿。|Hãy đặt tấm ván ở đó.
老板今天不在。|Hôm nay ông chủ không có mặt.
#办理
我去银行办理手续。|Tôi đến ngân hàng làm thủ tục.
在哪儿办理签证？|Làm thị thực ở đâu?
这件事很快就办理好了。|Việc này làm xong rất nhanh.
请到二号窗口办理。|Mời đến cửa số hai làm thủ tục.
办理入住要带护照。|Làm thủ tục nhận phòng phải mang hộ chiếu.
#保
我们要保住这个工作。|Chúng ta phải giữ được công việc này.
我保你没问题。|Tôi đảm bảo bạn không có vấn đề gì.
这件衣服能保暖。|Chiếc áo này giữ ấm được.
这个东西保不了多久。|Thứ này không giữ được lâu.
你能保我的安全吗？|Bạn có thể đảm bảo an toàn cho tôi không?
#保安
门口有保安。|Ở cửa có bảo vệ.
保安让我登记。|Bảo vệ bảo tôi đăng ký.
他在学校当保安。|Anh ấy làm bảo vệ ở trường.
保安晚上也工作。|Bảo vệ ban đêm cũng làm việc.
有事可以找保安。|Có việc gì có thể tìm bảo vệ.
#保存
请保存好你的票。|Hãy giữ kỹ vé của bạn.
文件保存了吗？|Tài liệu đã lưu chưa?
这些照片我一直保存着。|Những bức ảnh này tôi vẫn luôn giữ.
牛奶要保存在冰箱里。|Sữa phải bảo quản trong tủ lạnh.
别忘了保存。|Đừng quên lưu lại.
#保护
我们要保护环境。|Chúng ta phải bảo vệ môi trường.
妈妈保护孩子。|Mẹ bảo vệ con.
保护好你的眼睛。|Hãy bảo vệ tốt đôi mắt của bạn.
这些动物需要保护。|Những loài động vật này cần được bảo vệ.
警察保护大家的安全。|Cảnh sát bảo vệ an toàn cho mọi người.
#保留
这个座位给你保留着。|Chỗ ngồi này giữ lại cho bạn.
他保留了很多老照片。|Ông ấy giữ lại nhiều ảnh cũ.
我保留我的意见。|Tôi bảo lưu ý kiến của mình.
这个城市保留了很多老房子。|Thành phố này giữ lại nhiều ngôi nhà cổ.
请保留好发票。|Hãy giữ kỹ hóa đơn.
#保险
我买了旅游保险。|Tôi mua bảo hiểm du lịch.
这样做比较保险。|Làm thế này an toàn hơn.
公司给员工买保险。|Công ty mua bảo hiểm cho nhân viên.
保险一点儿，早点儿出发。|Cho chắc ăn, xuất phát sớm chút.
你的车有保险吗？|Xe bạn có bảo hiểm không?
#报
我每天看报。|Ngày nào tôi cũng đọc báo.
我报了一个汉语班。|Tôi đăng ký một lớp tiếng Trung.
今天的报来了吗？|Báo hôm nay đến chưa?
这件事报上有。|Việc này có đăng trên báo.
有问题马上报警。|Có chuyện thì báo cảnh sát ngay.
#报到
新生明天报到。|Tân sinh viên mai nhập học.
你去哪儿报到？|Bạn báo danh ở đâu?
我已经在公司报到了。|Tôi đã đến công ty nhận việc.
报到的时候要带照片。|Khi đến trình diện phải mang ảnh.
请九点前报到。|Hãy có mặt trước chín giờ.
#报道
电视报道了这件事。|Truyền hình đã đưa tin việc này.
这是一篇新闻报道。|Đây là một bài phóng sự tin tức.
报纸上有很多报道。|Trên báo có nhiều bài đưa tin.
记者在报道比赛。|Phóng viên đang đưa tin trận đấu.
这个报道很有意思。|Bài đưa tin này rất thú vị.
#报告
我在写报告。|Tôi đang viết báo cáo.
明天要交报告。|Mai phải nộp báo cáo.
他向经理报告了情况。|Anh ấy báo cáo tình hình với giám đốc.
这份报告很长。|Bản báo cáo này rất dài.
请把报告发给我。|Hãy gửi báo cáo cho tôi.
#北部
我住在越南北部。|Tôi sống ở miền Bắc Việt Nam.
北部冬天很冷。|Miền Bắc mùa đông rất lạnh.
城市北部有一个公园。|Phía bắc thành phố có một công viên.
北部的山很高。|Núi ở miền Bắc rất cao.
他去北部旅游了。|Anh ấy đi du lịch miền Bắc.
#背后
学校背后有一座山。|Phía sau trường có một ngọn núi.
别在背后说别人。|Đừng nói xấu sau lưng người khác.
他站在我背后。|Anh ấy đứng sau lưng tôi.
房子背后有个院子。|Phía sau nhà có một cái sân.
成功背后有很多努力。|Phía sau thành công là bao nỗ lực.
#被子
天冷了，多盖一条被子。|Trời lạnh rồi, đắp thêm một cái chăn.
这条被子很暖和。|Cái chăn này rất ấm.
起床后要叠被子。|Ngủ dậy phải gấp chăn.
被子在床上。|Chăn ở trên giường.
我买了一条新被子。|Tôi mua một cái chăn mới.
#本来
我本来想去，可是太忙了。|Tôi vốn định đi nhưng bận quá.
他本来是老师。|Anh ấy vốn là giáo viên.
这本来就是你的。|Cái này vốn là của bạn.
本来天气很好，后来下雨了。|Lúc đầu trời đẹp, sau đó mưa.
本来我不知道。|Lúc đầu tôi không biết.
#本事
他很有本事。|Anh ấy rất có bản lĩnh.
有本事你自己做。|Có giỏi thì bạn tự làm đi.
学一门本事很重要。|Học một nghề rất quan trọng.
他的本事真大。|Tài năng của anh ấy thật lớn.
我没有那个本事。|Tôi không có bản lĩnh đó.
#比例
男女比例是一比一。|Tỷ lệ nam nữ là một một.
这个比例太高了。|Tỷ lệ này cao quá.
学生的比例越来越大。|Tỷ lệ học sinh ngày càng lớn.
按比例放糖和水。|Cho đường và nước theo tỷ lệ.
老年人的比例在增加。|Tỷ lệ người già đang tăng.
#必然
努力必然会成功。|Cố gắng tất nhiên sẽ thành công.
这是必然的结果。|Đây là kết quả tất yếu.
他不来是必然的。|Anh ấy không đến là điều tất nhiên.
变化是必然的。|Thay đổi là tất yếu.
不学习必然会落后。|Không học tất sẽ tụt hậu.
#必要
没有必要担心。|Không cần thiết phải lo.
这是必要的准备。|Đây là sự chuẩn bị cần thiết.
有必要再说一遍吗？|Có cần nói lại lần nữa không?
必要的时候给我打电话。|Lúc cần thiết thì gọi cho tôi.
运动是必要的。|Vận động là cần thiết.
#变为
水变为冰了。|Nước biến thành băng rồi.
小村子变为了大城市。|Ngôi làng nhỏ trở thành thành phố lớn.
他的梦想变为了现实。|Ước mơ của anh ấy đã thành hiện thực.
晴天变为阴天。|Trời nắng chuyển thành âm u.
朋友变为了家人。|Bạn bè trở thành người nhà.
#标题
这篇文章的标题是什么？|Tiêu đề bài viết này là gì?
请写一个标题。|Hãy viết một tiêu đề.
标题很有意思。|Tiêu đề rất thú vị.
我只看了标题。|Tôi chỉ xem tiêu đề.
标题要短一点儿。|Tiêu đề nên ngắn một chút.
#标准
他的普通话很标准。|Tiếng phổ thông của anh ấy rất chuẩn.
这是新的标准。|Đây là tiêu chuẩn mới.
你的发音不太标准。|Phát âm của bạn không chuẩn lắm.
每个人的标准不一样。|Tiêu chuẩn của mỗi người khác nhau.
达到标准才能参加。|Đạt tiêu chuẩn mới được tham gia.
#表达
我不知道怎么表达。|Tôi không biết diễn đạt thế nào.
请用汉语表达你的想法。|Hãy diễn đạt suy nghĩ của bạn bằng tiếng Trung.
他很会表达。|Anh ấy rất biết cách diễn đạt.
我想表达我的感谢。|Tôi muốn bày tỏ lòng cảm ơn.
这个词表达什么意思？|Từ này diễn đạt ý gì?
#表格
请填这个表格。|Hãy điền bảng này.
表格在桌子上。|Bảng biểu ở trên bàn.
我做了一个表格。|Tôi làm một cái bảng.
这个表格很清楚。|Bảng này rất rõ ràng.
表格要用中文填。|Bảng phải điền bằng tiếng Trung.
#表面
桌子表面很干净。|Mặt bàn rất sạch.
表面上他很高兴。|Bề ngoài anh ấy rất vui.
不要只看表面。|Đừng chỉ nhìn bề ngoài.
水的表面很平。|Mặt nước rất phẳng.
这只是表面的问题。|Đây chỉ là vấn đề bề ngoài.
#表明
事实表明他是对的。|Sự thật cho thấy anh ấy đúng.
他表明了自己的态度。|Anh ấy bày tỏ rõ thái độ của mình.
调查表明，很多人喜欢运动。|Điều tra cho thấy nhiều người thích vận động.
结果表明这个方法有用。|Kết quả cho thấy phương pháp này hữu ích.
她表明不想参加。|Cô ấy nói rõ không muốn tham gia.
#表现
他今天表现很好。|Hôm nay cậu ấy thể hiện rất tốt.
你在公司的表现怎么样？|Biểu hiện của bạn ở công ty thế nào?
她想表现自己。|Cô ấy muốn thể hiện bản thân.
这次比赛他表现得不错。|Trận đấu này anh ấy thể hiện khá tốt.
老师表扬了他的表现。|Thầy giáo khen biểu hiện của cậu ấy.
#表演
我们去看表演吧。|Chúng ta đi xem biểu diễn nhé.
她在台上表演。|Cô ấy biểu diễn trên sân khấu.
这个表演很精彩。|Màn biểu diễn này rất đặc sắc.
孩子们表演了一个节目。|Bọn trẻ biểu diễn một tiết mục.
表演八点开始。|Buổi biểu diễn bắt đầu lúc tám giờ.
#并
我并不知道这件事。|Tôi hoàn toàn không biết chuyện này.
他并没有生气。|Anh ấy hoàn toàn không giận.
这个问题并不难。|Câu hỏi này không hề khó.
我们讨论并通过了计划。|Chúng tôi đã thảo luận và thông qua kế hoạch.
事情并不像你想的那样。|Sự việc không hề như bạn nghĩ.
#并且
他会说汉语，并且说得很好。|Anh ấy biết nói tiếng Trung, và còn nói rất giỏi.
这个房子很大，并且很便宜。|Căn nhà này rất rộng, hơn nữa còn rẻ.
她聪明并且努力。|Cô ấy thông minh và chăm chỉ.
我们讨论了问题，并且找到了办法。|Chúng tôi thảo luận vấn đề và đã tìm ra cách.
请填好表格，并且签上名字。|Hãy điền bảng và ký tên.
#播出
这个节目晚上八点播出。|Chương trình này phát sóng lúc tám giờ tối.
新闻已经播出了。|Bản tin đã phát sóng rồi.
电视剧下个月播出。|Phim truyền hình tháng sau phát sóng.
比赛会直接播出。|Trận đấu sẽ được truyền hình trực tiếp.
这个广告每天播出三次。|Quảng cáo này phát sóng ba lần mỗi ngày.
#播放
请播放这段音乐。|Hãy phát đoạn nhạc này.
电视在播放新闻。|Tivi đang phát tin tức.
这首歌播放了很多次。|Bài hát này được phát nhiều lần.
怎么播放这个视频？|Phát video này thế nào?
飞机上播放电影。|Trên máy bay có chiếu phim.
#补
我要补一下作业。|Tôi phải làm bù bài tập.
衣服破了，补一补吧。|Áo rách rồi, vá lại đi.
请补上你的名字。|Hãy ghi bổ sung tên của bạn.
明天补课。|Mai học bù.
多吃水果补身体。|Ăn nhiều trái cây bồi bổ cơ thể.
#补充
我补充一点。|Tôi bổ sung một điểm.
你还有什么要补充的吗？|Bạn còn gì cần bổ sung không?
运动后要补充水。|Sau khi vận động phải bổ sung nước.
请补充一下你的意见。|Hãy bổ sung ý kiến của bạn.
老师补充了几个例子。|Thầy bổ sung vài ví dụ.
#不安
我心里很不安。|Trong lòng tôi rất bất an.
他看起来有点儿不安。|Anh ấy trông có vẻ hơi bất an.
等结果的时候很不安。|Lúc đợi kết quả rất thấp thỏm.
这件事让我不安。|Việc này khiến tôi bất an.
她不安地看着门口。|Cô ấy bồn chồn nhìn ra cửa.
#不必
你不必担心。|Bạn không cần lo lắng.
不必客气。|Không cần khách sáo.
明天不必来了。|Mai không cần đến nữa.
你不必说了，我都知道。|Bạn không cần nói nữa, tôi biết cả rồi.
不必买那么多。|Không cần mua nhiều thế.
#不得不
我不得不走了。|Tôi buộc phải đi rồi.
下雨了，我们不得不回家。|Trời mưa, chúng tôi đành phải về nhà.
他病了，不得不住院。|Anh ấy ốm, buộc phải nằm viện.
我不得不同意。|Tôi đành phải đồng ý.
没有车，不得不走路。|Không có xe, đành phải đi bộ.
#不光
不光我，大家都知道。|Không chỉ tôi, mọi người đều biết.
他不光会唱歌，还会跳舞。|Anh ấy không chỉ biết hát mà còn biết nhảy.
这里不光便宜，还很干净。|Ở đây không chỉ rẻ mà còn sạch.
不光是学生，老师也来了。|Không chỉ học sinh, thầy giáo cũng đến.
她不光漂亮，还很聪明。|Cô ấy không chỉ xinh mà còn thông minh.
#不仅
他不仅会说汉语，还会说英语。|Anh ấy không những nói được tiếng Trung mà còn nói được tiếng Anh.
这个菜不仅好吃，而且便宜。|Món này không những ngon mà còn rẻ.
不仅我喜欢，我妈妈也喜欢。|Không chỉ tôi thích, mẹ tôi cũng thích.
运动不仅对身体好，还能让人快乐。|Vận động không chỉ tốt cho cơ thể mà còn khiến người ta vui.
她不仅是我的老师，也是我的朋友。|Cô ấy không chỉ là giáo viên mà còn là bạn tôi.
#不论
不论多忙，他都运动。|Dù bận đến đâu anh ấy cũng tập thể dục.
不论你去哪儿，我都跟着你。|Dù bạn đi đâu tôi cũng theo bạn.
不论是谁，都要排队。|Bất kể là ai cũng phải xếp hàng.
不论下不下雨，我们都去。|Dù mưa hay không, chúng ta đều đi.
不论结果怎么样，我都很高兴。|Dù kết quả thế nào tôi cũng rất vui.
#布
这块布很漂亮。|Tấm vải này rất đẹp.
我买了两米布。|Tôi mua hai mét vải.
桌子上铺着一块布。|Trên bàn trải một tấm vải.
这是用布做的包。|Đây là túi làm bằng vải.
布的颜色很好看。|Màu vải rất đẹp.
#步
往前走两步。|Đi lên phía trước hai bước.
他每天走一万步。|Mỗi ngày anh ấy đi mười nghìn bước.
第一步最难。|Bước đầu tiên khó nhất.
下一步怎么办？|Bước tiếp theo làm gì?
他的汉语进步了一大步。|Tiếng Trung của anh ấy tiến bộ một bước lớn.
#部
这部电影很好看。|Bộ phim này rất hay.
他买了一部新手机。|Anh ấy mua một chiếc điện thoại mới.
他在销售部工作。|Anh ấy làm ở phòng kinh doanh.
这部小说很长。|Bộ tiểu thuyết này rất dài.
越南北部很冷。|Miền Bắc Việt Nam rất lạnh.
#部门
你在哪个部门工作？|Bạn làm ở bộ phận nào?
我们部门有十个人。|Bộ phận chúng tôi có mười người.
这个部门很忙。|Bộ phận này rất bận.
有问题去找有关部门。|Có vấn đề thì tìm cơ quan liên quan.
他换了一个部门。|Anh ấy chuyển sang một bộ phận khác.
#部长
部长明天来学校。|Mai bộ trưởng đến trường.
他是教育部长。|Ông ấy là bộ trưởng giáo dục.
部长在开会。|Bộ trưởng đang họp.
我们的部长很年轻。|Trưởng ban của chúng tôi rất trẻ.
部长给我们讲了话。|Bộ trưởng nói chuyện với chúng tôi.
#采取
我们要采取行动。|Chúng ta phải hành động.
学校采取了新的方法。|Nhà trường áp dụng phương pháp mới.
你打算采取什么办法？|Bạn định dùng biện pháp gì?
政府采取了很多措施。|Chính phủ đã thực hiện nhiều biện pháp.
必须马上采取行动。|Phải hành động ngay lập tức.
#采用
我们采用了新技术。|Chúng tôi áp dụng công nghệ mới.
这本书采用了很多图片。|Cuốn sách này sử dụng nhiều hình ảnh.
公司采用了他的意见。|Công ty tiếp thu ý kiến của anh ấy.
老师采用游戏的方法上课。|Thầy dùng phương pháp trò chơi để dạy.
这种方法已经被很多人采用。|Phương pháp này đã được nhiều người áp dụng.
#彩色
我喜欢彩色的衣服。|Tôi thích quần áo nhiều màu.
这是一张彩色照片。|Đây là một bức ảnh màu.
孩子用彩色的笔画画儿。|Đứa trẻ vẽ tranh bằng bút màu.
彩色电视很早就有了。|Tivi màu có từ lâu rồi.
天上出现了彩色的云。|Trên trời xuất hiện mây nhiều màu.
#曾经
我曾经去过中国。|Tôi từng đến Trung Quốc.
他曾经是老师。|Anh ấy từng là giáo viên.
我们曾经住在一起。|Chúng tôi từng sống cùng nhau.
她曾经学过日语。|Cô ấy từng học tiếng Nhật.
这里曾经是一个小村子。|Nơi đây từng là một ngôi làng nhỏ.
#产生
你对汉语产生兴趣了吗？|Bạn đã có hứng thú với tiếng Trung chưa?
这件事产生了很大的影响。|Việc này gây ra ảnh hưởng lớn.
他们之间产生了问题。|Giữa họ nảy sinh vấn đề.
怎么会产生这种结果？|Sao lại sinh ra kết quả như vậy?
运动的时候身体会产生热量。|Khi vận động cơ thể sẽ sinh nhiệt.
#厂
他在工厂工作。|Anh ấy làm việc ở nhà máy.
这个厂有五百个工人。|Nhà máy này có năm trăm công nhân.
厂里很忙。|Trong xưởng rất bận.
这是一个汽车厂。|Đây là một nhà máy ô tô.
我爸爸是厂长。|Bố tôi là giám đốc nhà máy.
#场合
在这种场合要穿正式一点儿。|Ở dịp như thế này phải ăn mặc trang trọng chút.
说话要注意场合。|Nói chuyện phải chú ý hoàn cảnh.
公共场合不要大声说话。|Ở nơi công cộng đừng nói to.
这句话可以在什么场合用？|Câu này dùng trong trường hợp nào?
这种场合我不太习惯。|Tôi không quen dịp như thế này lắm.
#场所
这里是公共场所。|Đây là nơi công cộng.
公共场所不能吸烟。|Nơi công cộng không được hút thuốc.
这是一个休息的场所。|Đây là một nơi nghỉ ngơi.
学校是学习的场所。|Trường học là nơi học tập.
娱乐场所晚上很热闹。|Các nơi vui chơi buổi tối rất náo nhiệt.
#超级
这个电影超级好看。|Bộ phim này siêu hay.
我们去超级市场买东西。|Chúng ta đi siêu thị mua đồ.
今天超级热。|Hôm nay siêu nóng.
他是一个超级球迷。|Anh ấy là một fan bóng đá cuồng nhiệt.
这个蛋糕超级好吃。|Cái bánh này siêu ngon.
#朝
我的房间朝南。|Phòng tôi quay về hướng nam.
他朝我笑了笑。|Anh ấy cười với tôi.
一直朝前走。|Cứ đi thẳng về phía trước.
窗户朝着大海。|Cửa sổ hướng ra biển.
他朝门口走去。|Anh ấy đi về phía cửa.
#吵
外面太吵了。|Bên ngoài ồn quá.
别吵，孩子在睡觉。|Đừng làm ồn, con đang ngủ.
他们又吵起来了。|Họ lại cãi nhau rồi.
这里吵得我睡不着。|Ở đây ồn đến mức tôi không ngủ được.
教室里很吵。|Trong lớp rất ồn.
#吵架
他们昨天吵架了。|Hôm qua họ cãi nhau.
别吵架了。|Đừng cãi nhau nữa.
我从来不跟他吵架。|Tôi chưa bao giờ cãi nhau với anh ấy.
他们为了钱吵架。|Họ cãi nhau vì tiền.
吵架不能解决问题。|Cãi nhau không giải quyết được vấn đề.
#衬衫
他穿着一件白衬衫。|Anh ấy mặc một chiếc sơ mi trắng.
这件衬衫多少钱？|Chiếc sơ mi này bao nhiêu tiền?
我要买一件衬衫。|Tôi muốn mua một chiếc sơ mi.
衬衫要洗了。|Sơ mi phải giặt rồi.
这件衬衫太大了。|Chiếc sơ mi này rộng quá.
#衬衣
这件衬衣很好看。|Chiếc áo sơ mi này rất đẹp.
上班要穿衬衣。|Đi làm phải mặc sơ mi.
他的衬衣脏了。|Áo sơ mi của anh ấy bẩn rồi.
妈妈给我买了一件衬衣。|Mẹ mua cho tôi một chiếc sơ mi.
蓝色的衬衣很适合你。|Áo sơ mi xanh rất hợp với bạn.
#称为
人们把他称为"老师"。|Mọi người gọi ông ấy là "thầy".
北京被称为中国的首都。|Bắc Kinh được gọi là thủ đô Trung Quốc.
这种花被称为"国花"。|Loài hoa này được gọi là "quốc hoa".
他被称为天才。|Anh ấy được gọi là thiên tài.
这个地方称为老城区。|Nơi này được gọi là khu phố cổ.
#成果
这是大家努力的成果。|Đây là thành quả nỗ lực của mọi người.
我们的研究有了成果。|Nghiên cứu của chúng tôi đã có thành quả.
学习成果很好。|Kết quả học tập rất tốt.
他展示了自己的成果。|Anh ấy giới thiệu thành quả của mình.
这个成果来得不容易。|Thành quả này không dễ có được.
#成立
公司成立十年了。|Công ty thành lập được mười năm.
我们成立了一个汉语俱乐部。|Chúng tôi thành lập một câu lạc bộ tiếng Trung.
学校是哪年成立的？|Trường được thành lập năm nào?
这个说法不成立。|Cách nói này không đứng vững.
新的小组成立了。|Nhóm mới đã được thành lập.
#成熟
苹果成熟了。|Táo chín rồi.
他比以前成熟多了。|Anh ấy chín chắn hơn trước nhiều.
这个计划还不成熟。|Kế hoạch này chưa hoàn thiện.
她是一个成熟的人。|Cô ấy là người chín chắn.
技术已经很成熟了。|Công nghệ đã rất hoàn thiện.
#成员
我们家有五个成员。|Gia đình tôi có năm thành viên.
他是我们小组的成员。|Anh ấy là thành viên nhóm chúng tôi.
每个成员都很重要。|Mỗi thành viên đều quan trọng.
新成员来了。|Thành viên mới đến rồi.
俱乐部有一百个成员。|Câu lạc bộ có một trăm thành viên.
#城
我住在城里。|Tôi sống trong thành phố.
这座城很古老。|Tòa thành này rất cổ.
周末我们进城买东西。|Cuối tuần chúng tôi vào thành phố mua đồ.
长城很有名。|Vạn Lý Trường Thành rất nổi tiếng.
城外有一条河。|Ngoài thành có một con sông.
#程度
你的汉语是什么程度？|Tiếng Trung của bạn trình độ nào?
他的病不太严重，程度很轻。|Bệnh của anh ấy không nặng, mức độ nhẹ.
这个程度的题我会做。|Bài ở mức độ này tôi làm được.
学生的程度不一样。|Trình độ học sinh không giống nhau.
在一定程度上你是对的。|Ở một mức độ nào đó bạn đúng.
#持续
大雨持续了三天。|Mưa to kéo dài ba ngày.
会议持续了两个小时。|Cuộc họp kéo dài hai tiếng.
天气会持续热下去。|Thời tiết sẽ tiếp tục nóng.
学习要持续进行。|Học tập phải liên tục.
他的进步一直在持续。|Sự tiến bộ của anh ấy vẫn liên tục.
#充满
房间里充满了花香。|Căn phòng tràn ngập hương hoa.
他对未来充满希望。|Anh ấy tràn đầy hy vọng vào tương lai.
孩子们充满了好奇。|Bọn trẻ đầy tò mò.
这本书充满了故事。|Cuốn sách này đầy những câu chuyện.
她的眼里充满了泪水。|Mắt cô ấy đầy nước mắt.
#初
今天是五月初一。|Hôm nay là mùng một tháng năm.
年初我去了上海。|Đầu năm tôi đi Thượng Hải.
他是初学者。|Anh ấy là người mới học.
月初发工资。|Đầu tháng phát lương.
初次见面，请多关照。|Lần đầu gặp mặt, mong được giúp đỡ.
#初步
这是初步的计划。|Đây là kế hoạch sơ bộ.
我们初步了解了情况。|Chúng tôi đã bước đầu nắm được tình hình.
初步结果出来了。|Kết quả sơ bộ đã có.
他的汉语有了初步的进步。|Tiếng Trung của anh ấy có tiến bộ bước đầu.
我们初步决定下个月去。|Chúng tôi tạm quyết định tháng sau đi.
#初级
我在学初级汉语。|Tôi đang học tiếng Trung sơ cấp.
初级班的学生很多。|Lớp sơ cấp có rất nhiều học sinh.
这本书是初级的。|Cuốn sách này là trình độ sơ cấp.
HSK一级是初级水平。|HSK 1 là trình độ sơ cấp.
初级考试不太难。|Bài thi sơ cấp không khó lắm.
#初一
大年初一我们去拜年。|Mùng một Tết chúng tôi đi chúc Tết.
我弟弟上初一了。|Em trai tôi lên lớp bảy rồi.
初一那天下了雨。|Hôm mùng một trời mưa.
初一的学生刚上中学。|Học sinh lớp bảy vừa lên trung học.
每月初一他都回家。|Mùng một hằng tháng anh ấy đều về nhà.
#初中
我上初中的时候很喜欢数学。|Hồi học cấp hai tôi rất thích toán.
她是初中老师。|Cô ấy là giáo viên cấp hai.
初中有三年。|Cấp hai có ba năm.
他今年初中毕业。|Năm nay em ấy tốt nghiệp cấp hai.
我们是初中同学。|Chúng tôi là bạn học cấp hai.
#处理
这件事我来处理。|Việc này để tôi xử lý.
问题处理好了吗？|Vấn đề đã xử lý xong chưa?
他很会处理问题。|Anh ấy rất giỏi xử lý vấn đề.
我有很多事情要处理。|Tôi có nhiều việc phải xử lý.
这些旧东西怎么处理？|Mấy đồ cũ này xử lý thế nào?
#传
请把球传给我。|Hãy chuyền bóng cho tôi.
这个消息传得很快。|Tin này lan truyền rất nhanh.
他把照片传到网上了。|Anh ấy đăng ảnh lên mạng.
这是爷爷传下来的。|Đây là thứ ông truyền lại.
请帮我传个话。|Hãy nhắn lời giúp tôi.
#传播
网络让消息传播得很快。|Mạng internet khiến tin tức lan truyền nhanh.
我们要传播中国文化。|Chúng ta phải truyền bá văn hóa Trung Quốc.
这种病会传播。|Bệnh này có thể lây lan.
音乐的传播很广。|Âm nhạc lan truyền rất rộng.
他喜欢传播知识。|Anh ấy thích truyền bá tri thức.
#传来
远处传来了歌声。|Từ xa vọng lại tiếng hát.
门外传来了脚步声。|Ngoài cửa vang lên tiếng bước chân.
传来了一个好消息。|Có một tin vui truyền đến.
楼上传来音乐声。|Trên lầu vọng xuống tiếng nhạc.
电话里传来他的声音。|Trong điện thoại vang lên giọng anh ấy.
#传说
这是一个古老的传说。|Đây là một truyền thuyết cổ.
传说这里以前有一条龙。|Tương truyền nơi đây xưa có một con rồng.
我听过这个传说。|Tôi từng nghe truyền thuyết này.
每个地方都有自己的传说。|Mỗi nơi đều có truyền thuyết riêng.
传说是真的吗？|Lời đồn có thật không?
#创新
公司需要创新。|Công ty cần đổi mới.
这是一个创新的想法。|Đây là một ý tưởng sáng tạo.
年轻人喜欢创新。|Người trẻ thích đổi mới.
我们要不断创新。|Chúng ta phải không ngừng đổi mới.
创新让生活更方便。|Đổi mới khiến cuộc sống tiện lợi hơn.
#创业
他大学毕业后开始创业。|Tốt nghiệp đại học anh ấy bắt đầu khởi nghiệp.
创业很不容易。|Khởi nghiệp không hề dễ.
很多年轻人想创业。|Nhiều người trẻ muốn khởi nghiệp.
他创业成功了。|Anh ấy khởi nghiệp thành công.
创业需要勇气。|Khởi nghiệp cần dũng khí.
#创造
我们要创造好的环境。|Chúng ta phải tạo ra môi trường tốt.
人可以创造奇迹。|Con người có thể tạo nên kỳ tích.
他创造了新的纪录。|Anh ấy lập kỷ lục mới.
劳动创造财富。|Lao động tạo ra của cải.
这是谁创造的？|Cái này do ai tạo ra?
#创作
他在创作一首新歌。|Anh ấy đang sáng tác một bài hát mới.
这幅画是他创作的。|Bức tranh này do anh ấy sáng tác.
创作需要时间。|Sáng tác cần thời gian.
她喜欢音乐创作。|Cô ấy thích sáng tác âm nhạc.
这本书他创作了三年。|Cuốn sách này anh ấy viết mất ba năm.
#从前
从前有一座山。|Ngày xưa có một ngọn núi.
他比从前胖了。|Anh ấy béo hơn trước.
从前我不喜欢吃鱼。|Trước đây tôi không thích ăn cá.
这里和从前不一样了。|Ở đây khác trước rồi.
从前的事别再想了。|Chuyện trước kia đừng nghĩ nữa.
#从事
你从事什么工作？|Bạn làm công việc gì?
他从事教育工作。|Anh ấy làm trong ngành giáo dục.
她从事这个工作十年了。|Cô ấy làm công việc này mười năm rồi.
我想从事翻译工作。|Tôi muốn làm công việc phiên dịch.
很多人从事农业。|Nhiều người làm nông nghiệp.
#村
我家在一个小村里。|Nhà tôi ở một ngôi làng nhỏ.
村里有一条河。|Trong làng có một con sông.
这个村有两百户人家。|Làng này có hai trăm hộ.
村里的人都很热情。|Người trong làng đều rất nhiệt tình.
我每年都回村看爷爷。|Năm nào tôi cũng về làng thăm ông.
#存
我去银行存钱。|Tôi đi ngân hàng gửi tiền.
行李可以存在这儿。|Hành lý có thể gửi ở đây.
请把文件存好。|Hãy lưu tài liệu cẩn thận.
我存了一些钱。|Tôi đã để dành được ít tiền.
这些照片都存在电脑里。|Những bức ảnh này đều lưu trong máy tính.
#存在
这个问题一直存在。|Vấn đề này vẫn luôn tồn tại.
你觉得有没有外星人存在？|Bạn nghĩ có người ngoài hành tinh tồn tại không?
我们之间存在很多误会。|Giữa chúng ta tồn tại nhiều hiểu lầm.
这种动物已经不存在了。|Loài động vật này không còn tồn tại nữa.
计划还存在一些问题。|Kế hoạch vẫn còn tồn tại một số vấn đề.
#错误
这是我的错误。|Đây là lỗi của tôi.
请改正错误。|Hãy sửa lỗi.
你的作业有几个错误。|Bài tập của bạn có vài lỗi.
不要犯同样的错误。|Đừng mắc cùng một lỗi.
这个想法是错误的。|Suy nghĩ này là sai lầm.
#达到
他的汉语达到了三级水平。|Tiếng Trung của anh ấy đạt trình độ cấp ba.
我们达到了目标。|Chúng tôi đã đạt mục tiêu.
气温达到了四十度。|Nhiệt độ lên tới bốn mươi độ.
要达到这个要求不容易。|Đạt được yêu cầu này không dễ.
人数达到了一千。|Số người lên tới một nghìn.
#打破
他打破了纪录。|Anh ấy đã phá kỷ lục.
杯子被打破了。|Cái cốc bị vỡ rồi.
谁打破了窗户？|Ai làm vỡ cửa sổ?
我们要打破旧的习惯。|Chúng ta phải phá bỏ thói quen cũ.
他的话打破了安静。|Lời anh ấy phá tan sự yên tĩnh.
#打听
我向他打听了一下。|Tôi đã hỏi thăm anh ấy một chút.
你帮我打听一下价格。|Bạn hỏi giúp tôi giá cả nhé.
我去打听打听消息。|Tôi đi dò hỏi tin tức xem.
他到处打听你的事。|Anh ấy đi khắp nơi hỏi chuyện của bạn.
跟您打听一下，银行在哪儿？|Cho tôi hỏi thăm, ngân hàng ở đâu ạ?
#大夫
大夫，我头疼。|Bác sĩ ơi, tôi đau đầu.
王大夫很有经验。|Bác sĩ Vương rất có kinh nghiệm.
你应该去看大夫。|Bạn nên đi khám bác sĩ.
大夫让我多休息。|Bác sĩ bảo tôi nghỉ ngơi nhiều.
这位大夫很热情。|Vị bác sĩ này rất nhiệt tình.
#大使馆
中国大使馆在哪儿？|Đại sứ quán Trung Quốc ở đâu?
我去大使馆办签证。|Tôi đến đại sứ quán làm thị thực.
大使馆周末不开门。|Đại sứ quán cuối tuần không mở cửa.
他在大使馆工作。|Anh ấy làm việc ở đại sứ quán.
大使馆门口有很多人。|Trước cổng đại sứ quán có nhiều người.
#大约
大约有一百个人。|Có khoảng một trăm người.
从这儿到机场大约要一个小时。|Từ đây ra sân bay mất khoảng một tiếng.
他大约三十岁。|Anh ấy khoảng ba mươi tuổi.
我大约八点到。|Tôi khoảng tám giờ đến.
这本书大约五十块。|Cuốn sách này khoảng năm mươi đồng.
#代
请代我问好。|Hãy gửi lời hỏi thăm giúp tôi.
年轻一代很喜欢上网。|Thế hệ trẻ rất thích lên mạng.
今天我代他上课。|Hôm nay tôi dạy thay anh ấy.
我们家三代人住在一起。|Nhà chúng tôi ba thế hệ sống cùng nhau.
这是唐代的诗。|Đây là thơ đời Đường.
#代表团
代表团明天到北京。|Đoàn đại biểu mai đến Bắc Kinh.
他是代表团的成员。|Anh ấy là thành viên đoàn đại biểu.
越南代表团参加了会议。|Đoàn đại biểu Việt Nam tham dự hội nghị.
代表团有二十个人。|Đoàn đại biểu có hai mươi người.
我们欢迎代表团来访。|Chúng tôi hoan nghênh đoàn đại biểu đến thăm.
#带动
旅游带动了经济发展。|Du lịch thúc đẩy phát triển kinh tế.
他带动大家一起运动。|Anh ấy lôi kéo mọi người cùng vận động.
好学生能带动全班。|Học sinh giỏi có thể kéo cả lớp đi lên.
这个公司带动了很多人就业。|Công ty này tạo việc làm cho nhiều người.
一个人带动一群人。|Một người dẫn dắt cả nhóm người.
#带领
老师带领我们去参观。|Thầy dẫn chúng tôi đi tham quan.
他带领小组完成了任务。|Anh ấy dẫn dắt nhóm hoàn thành nhiệm vụ.
在他的带领下，公司发展得很好。|Dưới sự dẫn dắt của anh ấy, công ty phát triển tốt.
导游带领游客上山。|Hướng dẫn viên dẫn du khách lên núi.
她带领大家唱歌。|Cô ấy dẫn mọi người hát.
#单元
我们学到第五单元了。|Chúng ta học đến bài năm rồi.
这个单元的生词很多。|Bài này có nhiều từ mới.
明天考第三单元。|Mai thi bài ba.
我住在二单元三楼。|Tôi ở tầng ba đơn nguyên hai.
每个单元后面有练习。|Sau mỗi bài có bài tập.
#当初
当初我不同意。|Lúc đầu tôi không đồng ý.
早知今日，何必当初。|Biết trước thế này thì lúc đầu đã chẳng làm.
当初我们是同学。|Hồi đó chúng tôi là bạn học.
你当初为什么学汉语？|Lúc đầu sao bạn học tiếng Trung?
当初的想法很简单。|Suy nghĩ lúc đầu rất đơn giản.
#当然
我当然记得你。|Tất nhiên tôi nhớ bạn.
当然可以。|Đương nhiên được.
他是中国人，当然会说汉语。|Anh ấy là người Trung Quốc, tất nhiên biết nói tiếng Trung.
你当然要去。|Bạn đương nhiên phải đi.
当然，这只是我的看法。|Tất nhiên, đây chỉ là quan điểm của tôi.
#当中
我们当中谁最高？|Trong chúng ta ai cao nhất?
在这些书当中，我最喜欢这本。|Trong những cuốn sách này, tôi thích cuốn này nhất.
他站在人群当中。|Anh ấy đứng giữa đám đông.
学习当中有很多困难。|Trong quá trình học có nhiều khó khăn.
房间当中有一张桌子。|Giữa phòng có một cái bàn.
#刀
请给我一把刀。|Cho tôi một con dao.
这把刀很快。|Con dao này rất sắc.
小心刀！|Cẩn thận dao!
妈妈用刀切菜。|Mẹ dùng dao thái rau.
中国人吃饭不用刀叉。|Người Trung Quốc ăn cơm không dùng dao nĩa.
#导演
他是一个有名的导演。|Anh ấy là một đạo diễn nổi tiếng.
这部电影的导演是谁？|Đạo diễn của bộ phim này là ai?
她想当导演。|Cô ấy muốn làm đạo diễn.
导演让演员再来一次。|Đạo diễn bảo diễn viên làm lại.
他导演了很多好电影。|Ông ấy đạo diễn nhiều bộ phim hay.
#到达
飞机几点到达？|Máy bay mấy giờ hạ cánh?
我们终于到达了山顶。|Cuối cùng chúng tôi đã lên tới đỉnh núi.
火车已经到达北京。|Tàu đã đến Bắc Kinh.
到达以后给我打电话。|Đến nơi thì gọi cho tôi.
包裹明天到达。|Bưu kiện mai đến.
#到底
你到底去不去？|Rốt cuộc bạn có đi không?
到底发生了什么？|Rốt cuộc đã xảy ra chuyện gì?
我们要坚持到底。|Chúng ta phải kiên trì đến cùng.
你到底想要什么？|Rốt cuộc bạn muốn gì?
这到底是谁的？|Rốt cuộc cái này của ai?
#地区
这个地区很热。|Khu vực này rất nóng.
这个地区交通不方便。|Khu vực này giao thông không thuận tiện.
他来自南方地区。|Anh ấy đến từ khu vực phía Nam.
这个地区的人很多。|Khu vực này rất đông người.
不同地区有不同的习惯。|Các vùng khác nhau có tập quán khác nhau.
#得分
他得了十分。|Anh ấy được mười điểm.
这次考试你得分多少？|Kỳ thi này bạn được bao nhiêu điểm?
我们队得分最高。|Đội chúng tôi ghi điểm cao nhất.
他一个人得了二十分，得分最多。|Một mình anh ấy ghi hai mươi điểm, ghi nhiều nhất.
这道题不容易得分。|Câu này khó ghi điểm.
#等待
我在等待你的消息。|Tôi đang chờ tin của bạn.
请耐心等待。|Xin kiên nhẫn chờ đợi.
等待的时间很长。|Thời gian chờ đợi rất lâu.
大家在门口等待。|Mọi người chờ ở cửa.
我等待这一天很久了。|Tôi đã chờ ngày này rất lâu.
#底下
桌子底下有一只猫。|Dưới gầm bàn có một con mèo.
他坐在树底下看书。|Anh ấy ngồi dưới gốc cây đọc sách.
床底下有什么？|Dưới gầm giường có gì?
楼底下有一家超市。|Dưới chân tòa nhà có một siêu thị.
台底下坐满了人。|Dưới khán đài đầy người ngồi.
#电视剧
我在看一部电视剧。|Tôi đang xem một bộ phim truyền hình.
这部电视剧很好看。|Bộ phim truyền hình này rất hay.
她每天晚上看电视剧。|Tối nào cô ấy cũng xem phim truyền hình.
中国电视剧在越南很受欢迎。|Phim truyền hình Trung Quốc rất được ưa chuộng ở Việt Nam.
这部电视剧有四十集。|Bộ phim truyền hình này có bốn mươi tập.
#电视台
他在电视台工作。|Anh ấy làm việc ở đài truyền hình.
这个电视台有很多好节目。|Đài truyền hình này có nhiều chương trình hay.
电视台的记者来了。|Phóng viên đài truyền hình đến rồi.
你喜欢看哪个电视台？|Bạn thích xem đài nào?
电视台播出了这个新闻。|Đài truyền hình đã phát tin này.
#电台
我喜欢听电台节目。|Tôi thích nghe chương trình phát thanh.
他在电台当主持人。|Anh ấy làm người dẫn chương trình ở đài phát thanh.
开车的时候我听电台。|Khi lái xe tôi nghe đài.
这个电台播放音乐。|Đài này phát nhạc.
电台里在说天气。|Trên đài đang nói về thời tiết.
#电子邮件
我给你发了一封电子邮件。|Tôi đã gửi cho bạn một email.
你收到电子邮件了吗？|Bạn nhận được email chưa?
请用电子邮件联系我。|Hãy liên hệ với tôi qua email.
我每天看电子邮件。|Ngày nào tôi cũng xem email.
你的电子邮件地址是什么？|Địa chỉ email của bạn là gì?
#调
他被调到北京工作了。|Anh ấy được điều đến Bắc Kinh làm việc.
公司把我调到了新部门。|Công ty điều tôi sang bộ phận mới.
老师调走了。|Thầy giáo đã chuyển công tác.
他想调回老家。|Anh ấy muốn chuyển về quê.
经理调来了两个新人。|Giám đốc điều đến hai người mới.
#调查
我们做了一个调查。|Chúng tôi làm một cuộc điều tra.
警察在调查这件事。|Cảnh sát đang điều tra việc này.
调查结果出来了。|Kết quả điều tra đã có.
请填一下调查表。|Hãy điền phiếu khảo sát.
他调查了一百个学生。|Anh ấy khảo sát một trăm học sinh.
#调整
我要调整一下时间。|Tôi phải điều chỉnh lại thời gian.
计划需要调整。|Kế hoạch cần điều chỉnh.
请调整好座位。|Hãy chỉnh lại chỗ ngồi.
他调整了学习方法。|Anh ấy điều chỉnh phương pháp học.
价格调整了。|Giá cả đã điều chỉnh.
#订
我订了一张机票。|Tôi đặt một vé máy bay.
你订房间了吗？|Bạn đặt phòng chưa?
我们订了一张桌子。|Chúng tôi đặt một bàn.
在网上订票很方便。|Đặt vé trên mạng rất tiện.
我订了一个蛋糕。|Tôi đặt một chiếc bánh kem.
#定期
我定期去看医生。|Tôi đi khám bác sĩ định kỳ.
我们定期开会。|Chúng tôi họp định kỳ.
车要定期检查。|Xe phải kiểm tra định kỳ.
他定期给父母打电话。|Anh ấy gọi điện cho bố mẹ định kỳ.
房间要定期打扫。|Phòng phải dọn dẹp định kỳ.
#东部
我家在城市东部。|Nhà tôi ở phía đông thành phố.
中国东部人口很多。|Miền Đông Trung Quốc dân số rất đông.
东部有很多大城市。|Phía đông có nhiều thành phố lớn.
他去东部出差了。|Anh ấy đi công tác miền Đông.
东部的天气比较暖和。|Thời tiết phía đông khá ấm.
#动力
你学习的动力是什么？|Động lực học tập của bạn là gì?
家人是我的动力。|Gia đình là động lực của tôi.
这辆车动力很大。|Chiếc xe này động lực rất mạnh.
他工作没有动力。|Anh ấy làm việc không có động lực.
兴趣是最好的动力。|Hứng thú là động lực tốt nhất.
#动人
这个故事很动人。|Câu chuyện này rất cảm động.
她唱得很动人。|Cô ấy hát rất truyền cảm.
这是一首动人的歌。|Đây là một bài hát cảm động.
动人的音乐让人难忘。|Âm nhạc lay động lòng người khiến người ta khó quên.
她的眼睛很动人。|Đôi mắt cô ấy rất cuốn hút.
#读者
这本书有很多读者。|Cuốn sách này có nhiều độc giả.
读者很喜欢这篇文章。|Độc giả rất thích bài viết này.
作家给读者写信。|Nhà văn viết thư cho độc giả.
他是这本杂志的老读者。|Anh ấy là độc giả lâu năm của tạp chí này.
谢谢各位读者。|Cảm ơn các độc giả.
#短处
每个人都有短处。|Ai cũng có khuyết điểm.
不要只看别人的短处。|Đừng chỉ nhìn khuyết điểm của người khác.
我的短处是太着急。|Khuyết điểm của tôi là quá nóng vội.
他知道自己的短处。|Anh ấy biết khuyết điểm của mình.
用长处补短处。|Dùng ưu điểm bù khuyết điểm.
#短裤
夏天我穿短裤。|Mùa hè tôi mặc quần đùi.
这条短裤太小了。|Chiếc quần đùi này nhỏ quá.
他穿着短裤去跑步。|Anh ấy mặc quần đùi đi chạy bộ.
我买了两条短裤。|Tôi mua hai chiếc quần đùi.
上班不能穿短裤。|Đi làm không được mặc quần đùi.
#短期
我只是短期在这儿工作。|Tôi chỉ làm việc ở đây ngắn hạn.
这是一个短期汉语班。|Đây là một lớp tiếng Trung ngắn hạn.
短期内不会下雨。|Trong thời gian ngắn sẽ không mưa.
他找了一个短期工作。|Anh ấy tìm một công việc ngắn hạn.
短期旅游很方便。|Du lịch ngắn ngày rất tiện.
#断
绳子断了。|Sợi dây đứt rồi.
电话突然断了。|Điện thoại bỗng bị ngắt.
他的腿摔断了。|Chân anh ấy ngã gãy rồi.
停电了，网也断了。|Mất điện, mạng cũng mất rồi.
我们没有断过联系。|Chúng tôi chưa từng mất liên lạc.
#队员
他是我们队的队员。|Anh ấy là đội viên của đội chúng tôi.
每个队员都很努力。|Mỗi đội viên đều rất cố gắng.
新队员来了。|Đội viên mới đến rồi.
队员们在训练。|Các đội viên đang tập luyện.
这个队有十一个队员。|Đội này có mười một đội viên.
#对方
我们要听听对方的意见。|Chúng ta phải nghe ý kiến của bên kia.
对方没有接电话。|Bên kia không nghe máy.
他们很了解对方。|Họ rất hiểu nhau.
对方队很强。|Đội đối phương rất mạnh.
请问对方是谁？|Xin hỏi bên kia là ai?
#对手
他是我的对手。|Anh ấy là đối thủ của tôi.
这个对手很强。|Đối thủ này rất mạnh.
我不是他的对手。|Tôi không phải đối thủ của anh ấy.
我们打败了对手。|Chúng tôi đánh bại đối thủ.
好的对手让人进步。|Đối thủ tốt khiến người ta tiến bộ.
#对象
你有对象了吗？|Bạn có người yêu chưa?
这本书的对象是初学者。|Đối tượng của cuốn sách này là người mới học.
她在找对象。|Cô ấy đang tìm người yêu.
调查对象是大学生。|Đối tượng khảo sát là sinh viên.
他对象是老师。|Người yêu anh ấy là giáo viên.
#发表
他发表了一篇文章。|Anh ấy đăng một bài viết.
请发表你的看法。|Hãy phát biểu quan điểm của bạn.
这首诗发表在杂志上。|Bài thơ này đăng trên tạp chí.
校长发表了讲话。|Hiệu trưởng phát biểu.
她在网上发表了照片。|Cô ấy đăng ảnh lên mạng.
#发出
手机发出了声音。|Điện thoại phát ra âm thanh.
灯发出很亮的光。|Đèn phát ra ánh sáng rất sáng.
邀请已经发出了。|Lời mời đã được gửi đi.
他发出了笑声。|Anh ấy bật cười.
机器发出奇怪的声音。|Máy phát ra tiếng lạ.
#发达
这个国家很发达。|Đất nước này rất phát triển.
城市交通很发达。|Giao thông thành phố rất phát triển.
发达国家的生活水平高。|Mức sống ở các nước phát triển cao.
网络越来越发达了。|Mạng internet ngày càng phát triển.
他的肌肉很发达。|Cơ bắp anh ấy rất phát triển.
#发动
他发动了汽车。|Anh ấy khởi động xe.
车发动不了了。|Xe không nổ máy được.
学校发动大家参加活动。|Nhà trường vận động mọi người tham gia hoạt động.
请先发动机器。|Hãy khởi động máy trước.
他们发动了一场比赛。|Họ phát động một cuộc thi.
#发明
纸是中国人发明的。|Giấy do người Trung Quốc phát minh.
他发明了一种新机器。|Anh ấy phát minh một loại máy mới.
这是一个伟大的发明。|Đây là một phát minh vĩ đại.
电话是谁发明的？|Điện thoại do ai phát minh?
我想发明有用的东西。|Tôi muốn phát minh ra những thứ có ích.
#发送
我给你发送了文件。|Tôi đã gửi tài liệu cho bạn.
请点"发送"。|Hãy bấm "Gửi".
短信发送不出去。|Tin nhắn không gửi đi được.
邮件已经发送了。|Email đã được gửi đi.
你发送的照片我收到了。|Ảnh bạn gửi tôi nhận được rồi.
#发言
下面请王老师发言。|Sau đây xin mời thầy Vương phát biểu.
他在会上发言了。|Anh ấy đã phát biểu trong cuộc họp.
我想发言。|Tôi muốn phát biểu.
她的发言很精彩。|Bài phát biểu của cô ấy rất hay.
每人发言五分钟。|Mỗi người phát biểu năm phút.
#反对
我反对这个计划。|Tôi phản đối kế hoạch này.
父母反对我去。|Bố mẹ phản đối tôi đi.
有人反对吗？|Có ai phản đối không?
他没有反对。|Anh ấy không phản đối.
大家都反对他的意见。|Mọi người đều phản đối ý kiến của anh ấy.
#反复
他反复看了好几遍。|Anh ấy xem đi xem lại mấy lần.
老师反复说这个问题。|Thầy nhắc đi nhắc lại vấn đề này.
生词要反复练习。|Từ mới phải luyện tập nhiều lần.
天气反复变化。|Thời tiết thay đổi thất thường.
我反复想了很久。|Tôi nghĩ đi nghĩ lại rất lâu.
#反应
他的反应很快。|Phản ứng của anh ấy rất nhanh.
听了这个消息，你有什么反应？|Nghe tin này bạn phản ứng thế nào?
我叫他，他没有反应。|Tôi gọi, anh ấy không phản ứng gì.
大家的反应很好。|Phản hồi của mọi người rất tốt.
吃了药以后有反应吗？|Uống thuốc xong có phản ứng gì không?
#反正
反正我不去。|Dù sao tôi cũng không đi.
不着急，反正还有时间。|Không vội, dù sao vẫn còn thời gian.
你去不去都行，反正我去。|Bạn đi hay không cũng được, dù sao tôi đi.
反正是周末，多睡一会儿吧。|Dù sao cũng là cuối tuần, ngủ thêm chút đi.
反正你也不忙，帮帮我吧。|Dù sao bạn cũng không bận, giúp tôi đi.
#范围
考试范围是第一到第五课。|Phạm vi thi từ bài một đến bài năm.
这不在我的工作范围内。|Việc này không thuộc phạm vi công việc của tôi.
范围太大了。|Phạm vi quá rộng.
请在这个范围里选择。|Hãy chọn trong phạm vi này.
大范围下雨。|Mưa trên diện rộng.
#方式
你喜欢什么学习方式？|Bạn thích cách học nào?
联系方式是什么？|Phương thức liên lạc là gì?
每个人的生活方式不同。|Lối sống của mỗi người khác nhau.
用这种方式比较好。|Dùng cách này khá tốt.
付钱的方式有很多种。|Có nhiều cách thanh toán.
#防
出门要防晒。|Ra ngoài phải chống nắng.
这件衣服防水。|Chiếc áo này chống nước.
我们要防火。|Chúng ta phải phòng cháy.
多运动防感冒。|Vận động nhiều để phòng cảm.
晚上关好门防小偷。|Tối đóng cửa cẩn thận đề phòng trộm.
#防止
我们要防止生病。|Chúng ta phải phòng tránh bệnh tật.
关好窗户，防止下雨进水。|Đóng chặt cửa sổ để tránh mưa hắt vào.
多喝水可以防止上火。|Uống nhiều nước có thể tránh nóng trong.
要防止发生事故。|Phải ngăn ngừa xảy ra tai nạn.
防止孩子玩儿手机太久。|Ngăn trẻ chơi điện thoại quá lâu.
#房东
房东人很好。|Chủ nhà rất tốt.
我每个月给房东交房租。|Mỗi tháng tôi nộp tiền nhà cho chủ nhà.
房东住在楼下。|Chủ nhà sống ở tầng dưới.
有问题可以找房东。|Có vấn đề có thể tìm chủ nhà.
房东同意我养猫。|Chủ nhà đồng ý cho tôi nuôi mèo.
#房屋
这里的房屋很旧。|Nhà cửa ở đây rất cũ.
大雨把房屋冲坏了。|Mưa lớn làm hư hỏng nhà cửa.
房屋价格越来越高。|Giá nhà ngày càng cao.
这些房屋是新建的。|Những ngôi nhà này mới xây.
他们在修理房屋。|Họ đang sửa nhà.
#房租
这里房租很贵。|Tiền thuê nhà ở đây rất đắt.
房租一个月三千块。|Tiền nhà mỗi tháng ba nghìn đồng.
我该交房租了。|Tôi đến hạn đóng tiền nhà rồi.
房租包括水电吗？|Tiền thuê có bao gồm điện nước không?
房租又涨了。|Tiền thuê nhà lại tăng rồi.
#访问
总统访问了越南。|Tổng thống đã thăm Việt Nam.
欢迎访问我们的网站。|Chào mừng truy cập trang web của chúng tôi.
记者访问了他。|Phóng viên đã phỏng vấn anh ấy.
代表团来学校访问。|Đoàn đại biểu đến thăm trường.
这次访问很成功。|Chuyến thăm lần này rất thành công.
#放到
把书放到桌子上。|Đặt sách lên bàn.
请把牛奶放到冰箱里。|Hãy để sữa vào tủ lạnh.
衣服放到哪儿了？|Quần áo để đâu rồi?
把这个放到包里。|Cho cái này vào túi.
我把钥匙放到门口了。|Tôi để chìa khóa ở cửa rồi.
#飞行
飞行时间是三个小时。|Thời gian bay là ba tiếng.
鸟在天上飞行。|Chim bay trên trời.
他是飞行员。|Anh ấy là phi công.
飞行的时候请关手机。|Khi máy bay đang bay xin tắt điện thoại.
这次飞行很顺利。|Chuyến bay lần này rất suôn sẻ.
#费
电话费很贵。|Tiền điện thoại rất đắt.
这件事很费时间。|Việc này rất tốn thời gian.
学费交了吗？|Đã đóng học phí chưa?
别费力气了。|Đừng phí sức nữa.
这个月的水费是多少？|Tiền nước tháng này bao nhiêu?
#费用
旅游的费用是多少？|Chi phí du lịch là bao nhiêu?
费用由公司出。|Chi phí do công ty chi trả.
这些费用太高了。|Những chi phí này quá cao.
上学的费用不少。|Chi phí đi học không ít.
请先付一半费用。|Xin trả trước một nửa chi phí.
#分别
我们分别十年了。|Chúng tôi xa nhau mười năm rồi.
他们分别来自中国和越南。|Họ lần lượt đến từ Trung Quốc và Việt Nam.
你能分别这两个字吗？|Bạn có phân biệt được hai chữ này không?
分别的时候她哭了。|Lúc chia tay cô ấy khóc.
老师分别问了每个学生。|Thầy lần lượt hỏi từng học sinh.
#分配
工作分配好了。|Công việc đã phân công xong.
他被分配到上海。|Anh ấy được phân công đến Thượng Hải.
钱要分配好。|Tiền phải phân chia hợp lý.
老师给我们分配了任务。|Thầy phân công nhiệm vụ cho chúng tôi.
房间怎么分配？|Phòng chia thế nào?
#分组
我们先分组吧。|Chúng ta chia nhóm trước nhé.
老师给我们分组。|Thầy chia nhóm cho chúng tôi.
分组讨论十分钟。|Thảo luận nhóm mười phút.
怎么分组比较好？|Chia nhóm thế nào thì tốt?
分组以后开始比赛。|Chia nhóm xong thì bắt đầu thi.
#风险
做生意有风险。|Làm ăn có rủi ro.
这样做风险太大。|Làm thế này rủi ro quá lớn.
我不想冒风险。|Tôi không muốn mạo hiểm.
投资要注意风险。|Đầu tư phải chú ý rủi ro.
风险和机会同时存在。|Rủi ro và cơ hội tồn tại song song.
#否定
他否定了我的想法。|Anh ấy bác bỏ ý tưởng của tôi.
"不"是否定词。|"不" là từ phủ định.
不要否定自己。|Đừng phủ nhận bản thân.
他的回答是否定的。|Câu trả lời của anh ấy là phủ định.
这个计划被否定了。|Kế hoạch này bị bác bỏ.
#否认
他否认拿了钱。|Anh ấy phủ nhận đã lấy tiền.
这一点谁也不能否认。|Điểm này không ai có thể phủ nhận.
她否认自己说过这句话。|Cô ấy phủ nhận đã nói câu này.
我不否认我错了。|Tôi không phủ nhận mình sai.
他一直否认。|Anh ấy cứ phủ nhận mãi.
#服务员
服务员，请给我菜单。|Phục vụ ơi, cho tôi thực đơn.
这家饭馆的服务员很热情。|Nhân viên phục vụ quán này rất nhiệt tình.
她在酒店当服务员。|Cô ấy làm phục vụ ở khách sạn.
服务员，买单！|Phục vụ ơi, tính tiền!
服务员给我们倒了茶。|Nhân viên rót trà cho chúng tôi.
#服装
这家店卖服装。|Cửa hàng này bán quần áo.
她在服装公司工作。|Cô ấy làm ở công ty thời trang.
演员的服装很漂亮。|Trang phục của diễn viên rất đẹp.
这是传统服装。|Đây là trang phục truyền thống.
服装要整齐。|Trang phục phải gọn gàng.
#福
春节的时候门上贴"福"字。|Tết dán chữ "Phúc" lên cửa.
祝你多福多寿。|Chúc bạn phúc thọ dồi dào.
能有你这样的朋友是我的福。|Có người bạn như bạn là phúc của tôi.
他很有福。|Ông ấy rất có phúc.
福字倒着贴。|Chữ Phúc dán ngược.
#父亲
我父亲是医生。|Cha tôi là bác sĩ.
父亲每天很早起床。|Cha ngày nào cũng dậy sớm.
他长得像他父亲。|Anh ấy trông giống cha mình.
父亲节快乐！|Chúc mừng ngày của Cha!
我很想念父亲。|Tôi rất nhớ cha.
#付
我来付钱。|Để tôi trả tiền.
可以用手机付吗？|Có thể trả bằng điện thoại không?
房租付了吗？|Tiền nhà trả chưa?
请在这儿付款。|Xin thanh toán ở đây.
他付了一百块。|Anh ấy trả một trăm đồng.
#复印
请帮我复印一下。|Hãy photo giúp tôi một bản.
复印一张多少钱？|Photo một tờ bao nhiêu tiền?
我复印了护照。|Tôi đã photo hộ chiếu.
复印机坏了。|Máy photo hỏng rồi.
这份文件要复印三份。|Tài liệu này phải photo ba bản.
#富
他家很富。|Nhà anh ấy rất giàu.
这个地方越来越富了。|Nơi này ngày càng giàu lên.
水果富有营养。|Trái cây giàu dinh dưỡng.
他想变富。|Anh ấy muốn trở nên giàu có.
这个国家又富又强。|Đất nước này vừa giàu vừa mạnh.
#改进
我们的工作还要改进。|Công việc của chúng ta còn phải cải tiến.
这个方法需要改进。|Phương pháp này cần cải tiến.
公司改进了产品。|Công ty đã cải tiến sản phẩm.
请提出改进意见。|Hãy đưa ra ý kiến cải tiến.
他的学习方法改进了很多。|Phương pháp học của anh ấy cải tiến nhiều.
#改造
这条老街被改造了。|Con phố cũ này đã được cải tạo.
我们要改造这个房间。|Chúng ta phải cải tạo căn phòng này.
城市改造很快。|Việc cải tạo thành phố rất nhanh.
他们改造了一个旧工厂。|Họ cải tạo một nhà máy cũ.
改造以后，这里变漂亮了。|Sau khi cải tạo, nơi này đẹp hơn.
#概念
这个概念很难懂。|Khái niệm này rất khó hiểu.
我对这个没有概念。|Tôi không có khái niệm gì về việc này.
请解释一下这个概念。|Hãy giải thích khái niệm này.
这是一个新概念。|Đây là một khái niệm mới.
他的时间概念不强。|Anh ấy không có khái niệm về thời gian.
#赶
我要赶火车。|Tôi phải kịp chuyến tàu.
别赶了，时间够。|Đừng vội, thời gian đủ.
他赶走了小狗。|Anh ấy đuổi con chó đi.
我们得赶在下雨前回家。|Chúng ta phải về nhà trước khi mưa.
作业要赶完。|Bài tập phải gấp rút làm xong.
#赶到
我们八点前赶到了。|Chúng tôi kịp đến trước tám giờ.
医生马上赶到了。|Bác sĩ lập tức chạy đến.
他赶到的时候车已经走了。|Khi anh ấy đến kịp thì xe đã đi rồi.
你能赶到吗？|Bạn kịp đến không?
警察很快赶到了。|Cảnh sát nhanh chóng có mặt.
#赶紧
赶紧走吧，要迟到了。|Nhanh đi thôi, sắp muộn rồi.
你赶紧回家。|Bạn mau về nhà.
下雨了，赶紧收衣服。|Mưa rồi, mau thu quần áo.
他赶紧给妈妈打电话。|Anh ấy vội gọi điện cho mẹ.
赶紧吃饭吧。|Mau ăn cơm đi.
#赶快
赶快来！|Mau đến đây!
赶快去医院。|Mau đi bệnh viện.
你赶快决定吧。|Bạn mau quyết định đi.
赶快把门关上。|Mau đóng cửa lại.
车来了，赶快上车。|Xe đến rồi, mau lên xe.
#感情
他们的感情很好。|Tình cảm của họ rất tốt.
她是一个很有感情的人。|Cô ấy là người rất giàu tình cảm.
他唱得很有感情。|Anh ấy hát rất có cảm xúc.
我对这个城市有感情。|Tôi có tình cảm với thành phố này.
感情是需要时间的。|Tình cảm cần có thời gian.
#干吗
你干吗不去？|Sao bạn không đi?
你在干吗？|Bạn đang làm gì?
干吗这么生气？|Sao giận thế?
你找我干吗？|Bạn tìm tôi làm gì?
干吗买这么多？|Mua nhiều thế làm gì?
#高速
这是高速列车。|Đây là tàu cao tốc.
经济高速发展。|Kinh tế phát triển tốc độ cao.
我们走高速吧。|Chúng ta đi đường cao tốc nhé.
高速上不能停车。|Trên cao tốc không được dừng xe.
网络是高速的。|Mạng tốc độ cao.
#高速公路
我们走高速公路去。|Chúng ta đi đường cao tốc.
这条高速公路很长。|Đường cao tốc này rất dài.
高速公路上车很多。|Trên đường cao tốc rất nhiều xe.
新的高速公路明年开通。|Đường cao tốc mới năm sau thông xe.
在高速公路上开车要小心。|Lái xe trên cao tốc phải cẩn thận.
#告别
我们来告别了。|Chúng tôi đến để từ biệt.
他向大家告别。|Anh ấy chào tạm biệt mọi người.
告别的时候大家都哭了。|Lúc từ biệt mọi người đều khóc.
我要告别过去。|Tôi muốn từ biệt quá khứ.
晚上有一个告别会。|Tối nay có một buổi tiệc chia tay.
#歌迷
她有很多歌迷。|Cô ấy có rất nhiều người hâm mộ.
我是他的歌迷。|Tôi là fan của anh ấy.
歌迷们在等歌手。|Các fan đang đợi ca sĩ.
很多歌迷来听音乐会。|Nhiều fan đến nghe hòa nhạc.
歌迷给他送了花。|Người hâm mộ tặng hoa cho anh ấy.
#歌声
远处传来歌声。|Tiếng hát vọng lại từ xa.
她的歌声很美。|Giọng hát của cô ấy rất hay.
教室里充满了歌声。|Lớp học tràn ngập tiếng hát.
我听到了他的歌声。|Tôi nghe thấy tiếng hát của anh ấy.
歌声让人快乐。|Tiếng hát khiến người ta vui vẻ.
#歌手
她是一个有名的歌手。|Cô ấy là một ca sĩ nổi tiếng.
你喜欢哪个歌手？|Bạn thích ca sĩ nào?
我想当歌手。|Tôi muốn làm ca sĩ.
这个歌手唱得很好。|Ca sĩ này hát rất hay.
歌手在台上唱歌。|Ca sĩ hát trên sân khấu.
#个性
她很有个性。|Cô ấy rất có cá tính.
每个人的个性不一样。|Cá tính mỗi người khác nhau.
他的个性很强。|Cá tính anh ấy rất mạnh.
这件衣服很有个性。|Chiếc áo này rất cá tính.
我喜欢他的个性。|Tôi thích cá tính của anh ấy.
#各
各班的学生都来了。|Học sinh các lớp đều đến.
我们各买一个吧。|Mỗi người chúng ta mua một cái nhé.
各有各的看法。|Mỗi người có quan điểm riêng.
各国的人都来了。|Người các nước đều đến.
请各回各家。|Mọi người ai về nhà nấy.
#各地
他去过全国各地。|Anh ấy đã đi khắp mọi miền đất nước.
各地的天气不一样。|Thời tiết các nơi khác nhau.
学生来自各地。|Học sinh đến từ nhiều nơi.
各地都有好吃的。|Nơi nào cũng có đồ ăn ngon.
世界各地的人都喜欢这首歌。|Người khắp thế giới đều thích bài hát này.
#各位
各位好！|Xin chào các vị!
各位同学，请坐。|Các em, mời ngồi.
谢谢各位。|Cảm ơn mọi người.
各位请注意。|Xin mọi người chú ý.
欢迎各位来北京。|Chào mừng các vị đến Bắc Kinh.
#各种
商店里有各种水果。|Trong cửa hàng có đủ loại trái cây.
他会说各种语言。|Anh ấy biết nói nhiều ngôn ngữ.
我们遇到了各种问题。|Chúng tôi gặp đủ loại vấn đề.
这里有各种颜色的衣服。|Ở đây có quần áo đủ màu.
各种各样的人都有。|Có đủ loại người.
#各自
大家各自回家了。|Mọi người ai về nhà nấy.
我们各自付钱吧。|Chúng ta mỗi người tự trả nhé.
他们各自有自己的工作。|Họ mỗi người có công việc riêng.
请说说各自的想法。|Hãy nói suy nghĩ của mỗi người.
各自注意安全。|Mỗi người tự chú ý an toàn.
#根本
我根本不认识他。|Tôi hoàn toàn không quen anh ấy.
这根本不可能。|Việc này hoàn toàn không thể.
问题的根本在这里。|Gốc rễ của vấn đề nằm ở đây.
他根本没听。|Anh ấy căn bản không nghe.
我们要从根本上解决问题。|Chúng ta phải giải quyết vấn đề từ gốc.
#更加
天气更加冷了。|Thời tiết càng lạnh hơn.
我们要更加努力。|Chúng ta phải cố gắng hơn nữa.
她变得更加漂亮了。|Cô ấy càng xinh đẹp hơn.
问题更加复杂了。|Vấn đề càng phức tạp hơn.
这让我更加喜欢中国。|Điều này khiến tôi càng thích Trung Quốc hơn.
#工厂
这个工厂很大。|Nhà máy này rất lớn.
他在工厂上班。|Anh ấy làm ở nhà máy.
工厂里有很多机器。|Trong nhà máy có nhiều máy móc.
我们去参观工厂吧。|Chúng ta đi tham quan nhà máy nhé.
这家工厂生产汽车。|Nhà máy này sản xuất ô tô.
#工程师
我哥哥是工程师。|Anh trai tôi là kỹ sư.
工程师在检查机器。|Kỹ sư đang kiểm tra máy móc.
她想当工程师。|Cô ấy muốn làm kỹ sư.
这位工程师很有经验。|Vị kỹ sư này rất có kinh nghiệm.
公司需要两个工程师。|Công ty cần hai kỹ sư.
#工夫
我没有工夫玩儿。|Tôi không có thời gian chơi.
不一会儿工夫，他就回来了。|Chẳng mấy chốc anh ấy đã quay lại.
学汉语要下工夫。|Học tiếng Trung phải bỏ công sức.
你有工夫来我家吗？|Bạn có thời gian đến nhà tôi không?
他花了很多工夫写这本书。|Anh ấy bỏ nhiều công sức viết cuốn sách này.
#工具
你有什么工具？|Bạn có dụng cụ gì?
语言是交流的工具。|Ngôn ngữ là công cụ giao tiếp.
修车需要工具。|Sửa xe cần dụng cụ.
手机是很有用的工具。|Điện thoại là công cụ rất hữu ích.
请把工具放好。|Hãy cất dụng cụ cẩn thận.
#工业
这个城市工业很发达。|Công nghiệp thành phố này rất phát triển.
工业发展很快。|Công nghiệp phát triển rất nhanh.
这里是工业区。|Đây là khu công nghiệp.
工业给城市带来了污染。|Công nghiệp mang lại ô nhiễm cho thành phố.
他学的是工业设计。|Anh ấy học thiết kế công nghiệp.
#工资
你的工资高吗？|Lương của bạn cao không?
今天发工资。|Hôm nay phát lương.
他的工资不太高。|Lương anh ấy không cao lắm.
工资每个月发一次。|Lương mỗi tháng phát một lần.
老板给我们加工资了。|Ông chủ tăng lương cho chúng tôi.
#公布
考试成绩公布了。|Điểm thi đã công bố.
学校公布了新规定。|Nhà trường công bố quy định mới.
结果什么时候公布？|Khi nào công bố kết quả?
名单已经公布了。|Danh sách đã được công bố.
公司公布了新产品。|Công ty công bố sản phẩm mới.
#公共
这是公共场所。|Đây là nơi công cộng.
我坐公共汽车上班。|Tôi đi xe buýt đi làm.
请爱护公共财物。|Hãy giữ gìn tài sản công.
附近有公共厕所吗？|Gần đây có nhà vệ sinh công cộng không?
公共交通很方便。|Giao thông công cộng rất tiện.
#公开
这件事已经公开了。|Việc này đã công khai rồi.
他们公开了关系。|Họ đã công khai mối quan hệ.
这是一次公开的比赛。|Đây là một cuộc thi công khai.
信息要公开。|Thông tin phải công khai.
他公开说了自己的想法。|Anh ấy công khai nói suy nghĩ của mình.
#公民
每个公民都要遵守法律。|Mỗi công dân đều phải tuân thủ pháp luật.
他是越南公民。|Anh ấy là công dân Việt Nam.
公民有投票的权利。|Công dân có quyền bỏ phiếu.
做一个好公民。|Làm một công dân tốt.
保护公民的安全。|Bảo vệ an toàn công dân.
#公务员
她是公务员。|Cô ấy là công chức.
很多人想当公务员。|Nhiều người muốn làm công chức.
他考上了公务员。|Anh ấy thi đỗ công chức.
公务员的工作很稳定。|Công việc công chức rất ổn định.
公务员要为人民服务。|Công chức phải phục vụ nhân dân.
#功夫
他会中国功夫。|Anh ấy biết võ Trung Quốc.
我喜欢看功夫电影。|Tôi thích xem phim võ thuật.
练功夫要每天练习。|Luyện võ phải tập mỗi ngày.
他花了很多功夫学汉语。|Anh ấy bỏ nhiều công sức học tiếng Trung.
功夫不负有心人。|Có công mài sắt có ngày nên kim.
#功课
我的功课做完了。|Bài vở của tôi làm xong rồi.
今天功课很多。|Hôm nay bài tập rất nhiều.
他的功课很好。|Học lực của cậu ấy rất tốt.
做完功课才能玩儿。|Làm xong bài mới được chơi.
妈妈帮我检查功课。|Mẹ giúp tôi kiểm tra bài vở.
#功能
这个手机有很多功能。|Điện thoại này có nhiều chức năng.
这个功能怎么用？|Chức năng này dùng thế nào?
新功能很方便。|Chức năng mới rất tiện.
这台电脑功能很强。|Máy tính này chức năng rất mạnh.
这个按钮有什么功能？|Nút này có chức năng gì?
#共同
我们有共同的爱好。|Chúng tôi có sở thích chung.
这是我们共同的家。|Đây là ngôi nhà chung của chúng ta.
大家共同努力。|Mọi người cùng nhau cố gắng.
我们有很多共同点。|Chúng tôi có nhiều điểm chung.
共同完成这个任务吧。|Cùng nhau hoàn thành nhiệm vụ này nhé.
#共有
我们班共有三十个学生。|Lớp chúng tôi tổng cộng có ba mươi học sinh.
这本书共有十课。|Cuốn sách này tổng cộng có mười bài.
共有多少人参加？|Tổng cộng có bao nhiêu người tham gia?
这栋楼共有二十层。|Tòa nhà này tổng cộng có hai mươi tầng.
他们家共有五口人。|Nhà họ tổng cộng có năm người.
#姑娘
这个姑娘很漂亮。|Cô gái này rất xinh.
那个姑娘是谁？|Cô gái kia là ai?
她是一个好姑娘。|Cô ấy là một cô gái tốt.
小姑娘在唱歌。|Cô bé đang hát.
姑娘，你要买什么？|Cô gái ơi, cô muốn mua gì?
#古
这是一座古城。|Đây là một thành cổ.
这些都是古书。|Đây đều là sách cổ.
古时候没有电。|Thời xưa không có điện.
这个寺庙很古老。|Ngôi chùa này rất cổ.
我喜欢读古诗。|Tôi thích đọc thơ cổ.
#古代
古代的人怎么生活？|Người thời cổ đại sống thế nào?
这是古代的建筑。|Đây là kiến trúc cổ đại.
古代没有手机。|Thời cổ đại không có điện thoại.
他研究中国古代历史。|Anh ấy nghiên cứu lịch sử cổ đại Trung Quốc.
古代的诗很美。|Thơ cổ rất đẹp.
#故乡
我的故乡在越南北部。|Quê hương tôi ở miền Bắc Việt Nam.
我很想念故乡。|Tôi rất nhớ quê hương.
他二十年没回故乡了。|Hai mươi năm anh ấy chưa về quê.
故乡的变化很大。|Quê hương thay đổi rất nhiều.
故乡的菜最好吃。|Món ăn quê nhà ngon nhất.
#挂
请把衣服挂起来。|Hãy treo quần áo lên.
墙上挂着一张画儿。|Trên tường treo một bức tranh.
他把电话挂了。|Anh ấy cúp máy rồi.
先别挂，我还有话说。|Đừng cúp máy vội, tôi còn chuyện muốn nói.
门口挂着灯笼。|Trước cửa treo đèn lồng.
#关注
谢谢大家的关注。|Cảm ơn sự quan tâm của mọi người.
我关注了他的微博。|Tôi đã theo dõi Weibo của anh ấy.
大家都很关注这件事。|Mọi người đều rất quan tâm việc này.
父母很关注孩子的学习。|Cha mẹ rất quan tâm việc học của con.
这个问题引起了很多人的关注。|Vấn đề này thu hút sự quan tâm của nhiều người.
#观察
请仔细观察这张图。|Hãy quan sát kỹ bức hình này.
他在观察小鸟。|Anh ấy đang quan sát chim.
我观察了很久。|Tôi đã quan sát rất lâu.
医生要观察病人的情况。|Bác sĩ phải theo dõi tình trạng bệnh nhân.
观察天气变化。|Quan sát sự thay đổi thời tiết.
#观看
很多人来观看比赛。|Nhiều người đến xem trận đấu.
请大家观看这段视频。|Mời mọi người xem đoạn video này.
观看演出的人很多。|Người xem biểu diễn rất đông.
我们一起观看了电影。|Chúng tôi cùng xem phim.
观看的时候请不要说话。|Khi xem xin đừng nói chuyện.
#观念
他的观念很新。|Quan niệm của anh ấy rất mới.
老人的观念不一样。|Quan niệm của người già khác.
我们要改变旧观念。|Chúng ta phải thay đổi quan niệm cũ.
他没有时间观念。|Anh ấy không có ý thức về thời gian.
每个人的观念不同。|Quan niệm mỗi người khác nhau.
#观众
观众很多。|Khán giả rất đông.
观众都鼓掌了。|Khán giả đều vỗ tay.
这个节目很受观众欢迎。|Chương trình này rất được khán giả yêu thích.
谢谢各位观众。|Cảm ơn quý vị khán giả.
观众们在等演员出来。|Khán giả đang đợi diễn viên ra.
#管
这件事你别管。|Việc này bạn đừng quản.
谁管这个部门？|Ai quản lý bộ phận này?
妈妈管得很严。|Mẹ quản rất nghiêm.
水管坏了。|Ống nước hỏng rồi.
不管怎么样，我都去。|Dù thế nào tôi cũng đi.
#管理
他在公司做管理工作。|Anh ấy làm công tác quản lý ở công ty.
这个学校管理得很好。|Trường này quản lý rất tốt.
她学的是酒店管理。|Cô ấy học quản trị khách sạn.
时间管理很重要。|Quản lý thời gian rất quan trọng.
谁来管理这些钱？|Ai sẽ quản lý số tiền này?
#光
房间里光很暗。|Ánh sáng trong phòng rất tối.
钱都花光了。|Tiền tiêu hết sạch rồi.
饭吃光了。|Cơm ăn hết sạch rồi.
窗户外有一道光。|Ngoài cửa sổ có một tia sáng.
他光说不做。|Anh ấy chỉ nói mà không làm.
#光明
未来是光明的。|Tương lai là tươi sáng.
他看到了光明。|Anh ấy nhìn thấy ánh sáng.
我们的前途很光明。|Tiền đồ của chúng ta rất xán lạn.
希望给人带来光明。|Hy vọng mang lại ánh sáng cho con người.
他是一个光明的人。|Anh ấy là người ngay thẳng.
#广播
我每天早上听广播。|Sáng nào tôi cũng nghe đài.
广播里说明天下雨。|Trên đài nói mai mưa.
机场广播在叫你的名字。|Loa sân bay đang gọi tên bạn.
学校广播通知开会。|Loa trường thông báo họp.
他在广播电台工作。|Anh ấy làm ở đài phát thanh.
#广大
广大观众很喜欢这个节目。|Đông đảo khán giả rất thích chương trình này.
中国地方广大。|Trung Quốc đất đai rộng lớn.
感谢广大读者的支持。|Cảm ơn sự ủng hộ của đông đảo độc giả.
广大学生参加了活动。|Đông đảo học sinh tham gia hoạt động.
这里有广大的草原。|Ở đây có thảo nguyên rộng lớn.
#规定
学校规定八点上课。|Trường quy định tám giờ vào học.
这是新的规定。|Đây là quy định mới.
请遵守规定。|Hãy tuân thủ quy định.
规定不能带吃的进去。|Quy định không được mang đồ ăn vào.
按照规定办事。|Làm việc theo quy định.
#规范
你的写法不太规范。|Cách viết của bạn chưa chuẩn lắm.
要说规范的普通话。|Phải nói tiếng phổ thông chuẩn.
公司的管理很规范。|Quản lý của công ty rất bài bản.
这是行业规范。|Đây là quy chuẩn của ngành.
请按照规范填写。|Hãy điền theo quy chuẩn.
#国内
我在国内上大学。|Tôi học đại học trong nước.
国内的机票便宜吗？|Vé máy bay nội địa có rẻ không?
他在国内很有名。|Anh ấy rất nổi tiếng trong nước.
今年我在国内旅游。|Năm nay tôi du lịch trong nước.
国内外的朋友都来了。|Bạn bè trong và ngoài nước đều đến.
#国庆
国庆节放七天假。|Quốc khánh được nghỉ bảy ngày.
国庆的时候人很多。|Dịp Quốc khánh rất đông người.
越南国庆是九月二日。|Quốc khánh Việt Nam là ngày 2 tháng 9.
国庆我们去旅游吧。|Quốc khánh chúng ta đi du lịch nhé.
国庆晚上有烟花。|Tối Quốc khánh có pháo hoa.
#果然
天气预报说下雨，果然下雨了。|Dự báo nói mưa, quả nhiên mưa thật.
他果然来了。|Anh ấy quả nhiên đến.
这个菜果然很好吃。|Món này quả nhiên rất ngon.
我猜对了，果然是他。|Tôi đoán đúng, quả nhiên là anh ấy.
她果然考上了大学。|Cô ấy quả nhiên đỗ đại học.
#果汁
我要一杯果汁。|Tôi muốn một cốc nước ép.
你喜欢喝什么果汁？|Bạn thích uống nước ép gì?
这个果汁很甜。|Nước ép này rất ngọt.
妈妈每天给我做果汁。|Ngày nào mẹ cũng làm nước ép cho tôi.
苹果汁和橙子果汁都有。|Có cả nước táo lẫn nước cam ép.
#过程
学习是一个过程。|Học tập là một quá trình.
过程很难，但结果很好。|Quá trình rất khó nhưng kết quả rất tốt.
请说说事情的过程。|Hãy kể diễn biến sự việc.
我很享受这个过程。|Tôi rất tận hưởng quá trình này.
在这个过程中我学到了很多。|Trong quá trình này tôi học được nhiều điều.
#哈哈
哈哈，太好笑了！|Ha ha, buồn cười quá!
他哈哈大笑起来。|Anh ấy cười ha hả.
哈哈，我赢了！|Ha ha, tôi thắng rồi!
听了笑话，大家哈哈地笑。|Nghe chuyện cười, mọi người cười ha ha.
哈哈，你说得对。|Ha ha, bạn nói đúng.
#海关
过海关要带护照。|Qua hải quan phải mang hộ chiếu.
海关检查了我的行李。|Hải quan kiểm tra hành lý của tôi.
他在海关工作。|Anh ấy làm việc ở hải quan.
过海关花了一个小时。|Qua hải quan mất một tiếng.
这个东西不能带过海关。|Thứ này không mang qua hải quan được.
#害怕
我害怕狗。|Tôi sợ chó.
别害怕，有我呢。|Đừng sợ, có tôi đây.
她害怕一个人在家。|Cô ấy sợ ở nhà một mình.
孩子害怕打针。|Trẻ con sợ tiêm.
我害怕考试考不好。|Tôi sợ thi không tốt.
#好奇
孩子对什么都好奇。|Trẻ con tò mò mọi thứ.
我很好奇他是谁。|Tôi rất tò mò anh ấy là ai.
他好奇地看着我。|Anh ấy tò mò nhìn tôi.
别太好奇了。|Đừng tò mò quá.
我对中国文化很好奇。|Tôi rất tò mò về văn hóa Trung Quốc.
#合
请把书合上。|Hãy gấp sách lại.
我们俩合买一个吧。|Hai chúng ta góp mua một cái nhé.
这件衣服很合身。|Chiếc áo này rất vừa người.
他笑得合不上嘴。|Anh ấy cười không khép được miệng.
这个菜很合我的口味。|Món này rất hợp khẩu vị tôi.
#合法
这样做合法吗？|Làm thế này có hợp pháp không?
这是合法的生意。|Đây là việc kinh doanh hợp pháp.
他有合法的证件。|Anh ấy có giấy tờ hợp pháp.
我们要保护合法的权利。|Chúng ta phải bảo vệ quyền lợi hợp pháp.
在这里停车是合法的。|Đỗ xe ở đây là hợp pháp.
#合格
这次考试他合格了。|Kỳ thi này anh ấy đạt rồi.
产品质量合格。|Chất lượng sản phẩm đạt chuẩn.
他是一个合格的老师。|Anh ấy là một giáo viên đạt chuẩn.
六十分就合格。|Sáu mươi điểm là đạt.
不合格的东西不能卖。|Hàng không đạt chuẩn không được bán.
#合理
这个价格很合理。|Giá này rất hợp lý.
你的要求不合理。|Yêu cầu của bạn không hợp lý.
我们要合理安排时间。|Chúng ta phải sắp xếp thời gian hợp lý.
这个办法很合理。|Cách này rất hợp lý.
吃饭要合理。|Ăn uống phải hợp lý.
#红茶
我喜欢喝红茶。|Tôi thích uống hồng trà.
请给我一杯红茶。|Cho tôi một cốc hồng trà.
红茶加牛奶很好喝。|Hồng trà thêm sữa rất ngon.
这是有名的红茶。|Đây là loại hồng trà nổi tiếng.
你要绿茶还是红茶？|Bạn muốn trà xanh hay hồng trà?
#红酒
我们喝点儿红酒吧。|Chúng ta uống chút vang đỏ nhé.
这瓶红酒很贵。|Chai vang đỏ này rất đắt.
他送了我一瓶红酒。|Anh ấy tặng tôi một chai vang đỏ.
红酒配牛肉很好。|Vang đỏ ăn kèm thịt bò rất hợp.
我不太会喝红酒。|Tôi không biết uống vang đỏ lắm.
#后果
你想过后果吗？|Bạn đã nghĩ đến hậu quả chưa?
后果很严重。|Hậu quả rất nghiêm trọng.
后果由你自己负责。|Hậu quả do bạn tự chịu trách nhiệm.
不注意安全会有后果。|Không chú ý an toàn sẽ có hậu quả.
这件事的后果我不敢想。|Hậu quả của việc này tôi không dám nghĩ.
#后面
学校后面有一个公园。|Phía sau trường có một công viên.
他坐在我后面。|Anh ấy ngồi sau tôi.
后面的事我来做。|Việc phía sau để tôi làm.
请到后面排队。|Xin xếp hàng phía sau.
后面还有很多人。|Phía sau còn nhiều người.
#后年
后年我大学毕业。|Năm sau nữa tôi tốt nghiệp đại học.
我们后年去中国。|Năm sau nữa chúng tôi đi Trung Quốc.
后年他就十八岁了。|Năm sau nữa cậu ấy tròn mười tám tuổi.
这个楼后年建成。|Tòa nhà này năm sau nữa xây xong.
后年的计划还没定。|Kế hoạch năm sau nữa chưa định.
#互联网
互联网让生活更方便。|Internet khiến cuộc sống tiện hơn.
我在互联网上找到了答案。|Tôi tìm thấy câu trả lời trên Internet.
他在互联网公司工作。|Anh ấy làm ở công ty Internet.
现在人人都用互联网。|Bây giờ ai cũng dùng Internet.
互联网发展得很快。|Internet phát triển rất nhanh.
#华人
很多华人住在这里。|Nhiều người Hoa sống ở đây.
他是美国华人。|Anh ấy là người Mỹ gốc Hoa.
华人很重视春节。|Người Hoa rất coi trọng Tết.
这里有一条华人街。|Ở đây có một phố người Hoa.
世界各地都有华人。|Khắp nơi trên thế giới đều có người Hoa.
#化
雪化了。|Tuyết tan rồi.
冰慢慢化成了水。|Băng dần tan thành nước.
城市越来越现代化。|Thành phố ngày càng hiện đại hóa.
天热了，冰淇淋很快就化了。|Trời nóng, kem nhanh tan.
她化了妆。|Cô ấy trang điểm rồi.
#划船
我们去湖上划船吧。|Chúng ta đi chèo thuyền trên hồ nhé.
你会划船吗？|Bạn biết chèo thuyền không?
划船很累。|Chèo thuyền rất mệt.
周末很多人在公园划船。|Cuối tuần nhiều người chèo thuyền trong công viên.
他们划船比赛。|Họ thi chèo thuyền.
#话剧
我们去看话剧吧。|Chúng ta đi xem kịch nói nhé.
这部话剧很有名。|Vở kịch này rất nổi tiếng.
她在话剧里演妈妈。|Cô ấy đóng vai mẹ trong vở kịch.
学生们在排练话剧。|Học sinh đang tập kịch.
话剧七点开始。|Kịch bắt đầu lúc bảy giờ.
#话题
我们换个话题吧。|Chúng ta đổi chủ đề nhé.
今天的话题是旅游。|Chủ đề hôm nay là du lịch.
这个话题很有意思。|Chủ đề này rất thú vị.
他们找不到共同话题。|Họ không tìm được chủ đề chung.
这是最近的热门话题。|Đây là chủ đề nóng gần đây.
#环
她戴着一对耳环。|Cô ấy đeo một đôi khuyên tai.
这是一个铁环。|Đây là một vòng sắt.
每个环都很重要。|Mỗi khâu đều quan trọng.
孩子们在玩儿圆环。|Bọn trẻ chơi vòng tròn.
他送了我一个手环。|Anh ấy tặng tôi một chiếc vòng tay.
#环保
我们要注意环保。|Chúng ta phải chú ý bảo vệ môi trường.
这种包很环保。|Loại túi này rất thân thiện môi trường.
环保是每个人的事。|Bảo vệ môi trường là việc của mỗi người.
他在环保组织工作。|Anh ấy làm ở tổ chức môi trường.
骑自行车很环保。|Đi xe đạp rất bảo vệ môi trường.
#欢乐
节日里到处都是欢乐的笑声。|Ngày lễ khắp nơi rộn tiếng cười vui.
我们度过了一个欢乐的晚上。|Chúng tôi có một buổi tối vui vẻ.
孩子们带来了欢乐。|Bọn trẻ mang lại niềm vui.
欢乐的时间总是很短。|Thời gian vui vẻ luôn ngắn ngủi.
大家欢乐地唱歌。|Mọi người vui vẻ ca hát.
#会议
会议几点开始？|Cuộc họp mấy giờ bắt đầu?
经理在开会议。|Giám đốc đang chủ trì cuộc họp.
会议室在三楼。|Phòng họp ở tầng ba.
这次会议很重要。|Hội nghị lần này rất quan trọng.
我参加了一个国际会议。|Tôi tham dự một hội nghị quốc tế.
#会员
我是这个俱乐部的会员。|Tôi là hội viên câu lạc bộ này.
会员可以打折。|Hội viên được giảm giá.
你要办会员卡吗？|Bạn có muốn làm thẻ hội viên không?
新会员有礼物。|Hội viên mới có quà.
这里只有会员能进。|Ở đây chỉ hội viên mới được vào.
#活
这条鱼还活着。|Con cá này vẫn còn sống.
他活到了一百岁。|Ông ấy sống đến một trăm tuổi.
我今天活很多。|Hôm nay tôi nhiều việc lắm.
这孩子很活。|Đứa trẻ này rất hoạt bát.
活到老，学到老。|Sống đến già, học đến già.
#火
小心火！|Cẩn thận lửa!
冬天我们在火边坐着。|Mùa đông chúng tôi ngồi bên lửa.
他发火了。|Anh ấy nổi giận rồi.
这首歌现在很火。|Bài hát này đang rất nổi.
着火了，快打电话！|Cháy rồi, mau gọi điện!
#机器
这台机器坏了。|Cái máy này hỏng rồi.
工厂里有很多机器。|Trong nhà máy có nhiều máy móc.
机器在工作。|Máy đang chạy.
他会修机器。|Anh ấy biết sửa máy.
这台机器很新。|Cái máy này rất mới.
#积极
他学习很积极。|Anh ấy học tập rất tích cực.
大家积极参加活动。|Mọi người tích cực tham gia hoạt động.
她是一个很积极的人。|Cô ấy là người rất tích cực.
上课要积极回答问题。|Trong giờ học phải tích cực trả lời câu hỏi.
我们要有积极的态度。|Chúng ta phải có thái độ tích cực.
#积极性
学生的积极性很高。|Tính tích cực của học sinh rất cao.
怎样提高大家的积极性？|Làm sao nâng cao tính tích cực của mọi người?
他工作没有积极性。|Anh ấy làm việc thiếu nhiệt tình.
老师的表扬提高了我的积极性。|Lời khen của thầy làm tôi hăng hái hơn.
不要打击孩子的积极性。|Đừng làm nhụt tính tích cực của trẻ.
#基本
这是最基本的问题。|Đây là vấn đề cơ bản nhất.
我会说基本的汉语。|Tôi biết nói tiếng Trung cơ bản.
基本的规则很简单。|Quy tắc cơ bản rất đơn giản.
吃饭是基本的需要。|Ăn uống là nhu cầu cơ bản.
工作基本完成了。|Công việc cơ bản đã hoàn thành.
#基本上
我基本上听懂了。|Về cơ bản tôi đã nghe hiểu.
作业基本上做完了。|Bài tập về cơ bản đã làm xong.
基本上每天都下雨。|Gần như ngày nào cũng mưa.
他说的基本上是对的。|Những gì anh ấy nói về cơ bản là đúng.
大家基本上都同意。|Về cơ bản mọi người đều đồng ý.
#基础
他的汉语基础很好。|Nền tảng tiếng Trung của anh ấy rất tốt.
学好基础很重要。|Học tốt cơ bản rất quan trọng.
我是零基础。|Tôi bắt đầu từ con số không.
这是基础课。|Đây là môn cơ sở.
健康是幸福的基础。|Sức khỏe là nền tảng của hạnh phúc.
#及时
谢谢你及时来帮我。|Cảm ơn bạn đã kịp thời đến giúp tôi.
有问题要及时说。|Có vấn đề phải nói kịp thời.
医生来得很及时。|Bác sĩ đến rất kịp thời.
请及时回复邮件。|Hãy trả lời email kịp thời.
这场雨下得很及时。|Cơn mưa này đến thật đúng lúc.
#极了
这个菜好吃极了。|Món này ngon cực kỳ.
今天热极了。|Hôm nay nóng kinh khủng.
我高兴极了。|Tôi vui cực kỳ.
那儿的风景美极了。|Phong cảnh ở đó đẹp tuyệt vời.
他累极了。|Anh ấy mệt rã rời.
#集体
我们是一个集体。|Chúng ta là một tập thể.
集体活动很有意思。|Hoạt động tập thể rất thú vị.
他很关心集体。|Anh ấy rất quan tâm tập thể.
我们集体去旅游。|Chúng tôi đi du lịch tập thể.
这是集体的决定。|Đây là quyết định của tập thể.
#集中
上课要集中注意力。|Trong giờ học phải tập trung chú ý.
我们在门口集中。|Chúng ta tập trung ở cổng.
他学习不太集中。|Anh ấy học không tập trung lắm.
商店都集中在这条街上。|Các cửa hàng tập trung trên con phố này.
请大家集中精神。|Mọi người hãy tập trung tinh thần.
#计算
请计算一下多少钱。|Hãy tính xem bao nhiêu tiền.
他计算得很快。|Anh ấy tính rất nhanh.
这道题怎么计算？|Bài này tính thế nào?
我们要计算时间。|Chúng ta phải tính thời gian.
计算机就是电脑。|Máy tính chính là máy vi tính.
#记录
请记录一下会议内容。|Hãy ghi lại nội dung cuộc họp.
我每天记录花了多少钱。|Ngày nào tôi cũng ghi lại đã tiêu bao nhiêu tiền.
他打破了世界记录。|Anh ấy phá kỷ lục thế giới.
这是会议记录。|Đây là biên bản cuộc họp.
用照片记录生活。|Dùng ảnh ghi lại cuộc sống.
#记者
他是一名记者。|Anh ấy là một phóng viên.
记者在问问题。|Phóng viên đang đặt câu hỏi.
很多记者来了。|Nhiều phóng viên đã đến.
我想当记者。|Tôi muốn làm phóng viên.
记者写了一篇报道。|Phóng viên viết một bài phóng sự.
#纪录
他创造了新纪录。|Anh ấy lập kỷ lục mới.
这个纪录保持了十年。|Kỷ lục này được giữ mười năm.
她打破了世界纪录。|Cô ấy phá kỷ lục thế giới.
我在看一部纪录片。|Tôi đang xem một bộ phim tài liệu.
今天的气温打破了纪录。|Nhiệt độ hôm nay phá kỷ lục.
#纪念
这是给你的纪念品。|Đây là quà lưu niệm cho bạn.
我们照张相作纪念吧。|Chúng ta chụp ảnh làm kỷ niệm nhé.
今天是纪念日。|Hôm nay là ngày kỷ niệm.
这个公园是为了纪念他。|Công viên này để tưởng nhớ ông ấy.
我买了一些纪念品。|Tôi mua vài món quà lưu niệm.
#技术
这家公司技术很好。|Công ty này kỹ thuật rất tốt.
他学习电脑技术。|Anh ấy học kỹ thuật máy tính.
新技术让生活更方便。|Công nghệ mới khiến cuộc sống tiện hơn.
开车的技术要多练习。|Kỹ thuật lái xe phải luyện nhiều.
他的技术很高。|Tay nghề của anh ấy rất cao.
#加工
这些水果要加工成果汁。|Những trái cây này sẽ chế biến thành nước ép.
这个工厂加工衣服。|Nhà máy này gia công quần áo.
食品加工很重要。|Chế biến thực phẩm rất quan trọng.
木头加工以后做成了桌子。|Gỗ sau khi gia công làm thành bàn.
这里是加工厂。|Đây là xưởng gia công.
#加快
我们要加快速度。|Chúng ta phải tăng tốc độ.
请加快脚步。|Hãy rảo bước nhanh hơn.
城市发展加快了。|Sự phát triển thành phố đã nhanh hơn.
他的心跳加快了。|Tim anh ấy đập nhanh hơn.
加快工作进度。|Đẩy nhanh tiến độ công việc.
#加强
我们要加强练习。|Chúng ta phải tăng cường luyện tập.
加强锻炼身体。|Tăng cường rèn luyện thân thể.
两国要加强合作。|Hai nước cần tăng cường hợp tác.
学校加强了安全管理。|Nhà trường tăng cường quản lý an ninh.
口语需要加强。|Khẩu ngữ cần được tăng cường.
#家具
我买了新家具。|Tôi mua đồ nội thất mới.
这些家具很贵。|Những đồ nội thất này rất đắt.
房间里没有家具。|Trong phòng không có đồ đạc.
搬家要搬家具。|Chuyển nhà phải khiêng đồ đạc.
他在家具店工作。|Anh ấy làm ở cửa hàng nội thất.
#家属
病人家属请在外面等。|Người nhà bệnh nhân xin đợi bên ngoài.
家属可以来参观。|Người nhà có thể đến tham quan.
他带着家属来了。|Anh ấy dẫn người nhà đến.
公司给家属也买了保险。|Công ty mua bảo hiểm cho cả người nhà.
请通知他的家属。|Hãy báo cho người nhà anh ấy.
#价格
这个价格太贵了。|Giá này đắt quá.
价格可以便宜一点儿吗？|Giá có thể rẻ chút không?
最近菜的价格涨了。|Gần đây giá rau tăng.
这家店价格很合理。|Cửa hàng này giá cả hợp lý.
请问价格是多少？|Xin hỏi giá bao nhiêu?
#价钱
这件衣服价钱多少？|Chiếc áo này giá bao nhiêu?
价钱太高了。|Giá cao quá.
我们讲讲价钱吧。|Chúng ta mặc cả giá nhé.
价钱不贵，质量也好。|Giá không đắt, chất lượng cũng tốt.
这个价钱我可以接受。|Giá này tôi chấp nhận được.
#价值
这本书很有价值。|Cuốn sách này rất có giá trị.
这块手表价值一万块。|Chiếc đồng hồ này trị giá mười nghìn đồng.
人生的价值是什么？|Giá trị cuộc sống là gì?
这个经验很有价值。|Kinh nghiệm này rất có giá trị.
它的价值很高。|Giá trị của nó rất cao.
#架
一架飞机从头上飞过。|Một chiếc máy bay bay qua trên đầu.
书架上有很多书。|Trên giá sách có nhiều sách.
衣架在哪儿？|Móc áo ở đâu?
他们打了一架。|Họ đánh nhau một trận.
这是一架新钢琴。|Đây là một cây đàn piano mới.
#坚决
我坚决反对。|Tôi kiên quyết phản đối.
他的态度很坚决。|Thái độ của anh ấy rất kiên quyết.
她坚决不去。|Cô ấy nhất quyết không đi.
我们要坚决完成任务。|Chúng ta phải kiên quyết hoàn thành nhiệm vụ.
他坚决地说："不行！"|Anh ấy dứt khoát nói: "Không được!"
#坚强
她是一个坚强的人。|Cô ấy là một người kiên cường.
你要坚强一点儿。|Bạn phải mạnh mẽ lên.
孩子很坚强，没有哭。|Đứa bé rất kiên cường, không khóc.
困难让他变得坚强。|Khó khăn khiến anh ấy trở nên kiên cường.
坚强地活下去。|Kiên cường sống tiếp.
#简直
这简直太好了！|Điều này thật tuyệt quá!
他简直像个孩子。|Anh ấy đúng là như một đứa trẻ.
我简直不敢相信。|Tôi thật không dám tin.
今天简直热死了。|Hôm nay nóng muốn chết.
这里简直是天堂。|Nơi đây đúng là thiên đường.
#建
这里要建一个公园。|Ở đây sẽ xây một công viên.
这座楼建了两年。|Tòa nhà này xây mất hai năm.
他们在建新学校。|Họ đang xây trường mới.
这座桥是哪年建的？|Cây cầu này xây năm nào?
我们建了一个群。|Chúng tôi lập một nhóm chat.
#建成
新机场明年建成。|Sân bay mới năm sau xây xong.
这座大桥已经建成了。|Cây cầu lớn đã xây xong.
图书馆建成以后很漂亮。|Thư viện xây xong rất đẹp.
地铁什么时候建成？|Tàu điện ngầm khi nào xây xong?
这个城市建成了很多新楼。|Thành phố này đã xây xong nhiều tòa nhà mới.
#建立
我们建立了友谊。|Chúng tôi xây dựng tình bạn.
公司建立了新的部门。|Công ty thành lập bộ phận mới.
两国建立了关系。|Hai nước thiết lập quan hệ.
我们要建立好习惯。|Chúng ta phải xây dựng thói quen tốt.
这个学校是一百年前建立的。|Trường này được thành lập cách đây một trăm năm.
#建设
我们要建设美丽的城市。|Chúng ta phải xây dựng thành phố tươi đẹp.
这里正在建设地铁。|Ở đây đang xây dựng tàu điện ngầm.
国家建设需要人才。|Xây dựng đất nước cần nhân tài.
建设工作很辛苦。|Công việc xây dựng rất vất vả.
大家一起建设家乡。|Mọi người cùng xây dựng quê hương.
#将近
将近十点了。|Gần mười giờ rồi.
他学汉语将近三年了。|Anh ấy học tiếng Trung gần ba năm rồi.
将近一百人参加了。|Gần một trăm người tham gia.
我等了将近一个小时。|Tôi đợi gần một tiếng.
这里将近四十度。|Ở đây gần bốn mươi độ.
#将来
你将来想做什么？|Tương lai bạn muốn làm gì?
将来我想去中国工作。|Tương lai tôi muốn đi Trung Quốc làm việc.
为了将来要好好学习。|Vì tương lai phải học tập chăm chỉ.
将来的事谁知道呢？|Chuyện tương lai ai biết được?
不久的将来我们会再见。|Không lâu nữa chúng ta sẽ gặp lại.
#交费
请到一楼交费。|Xin xuống tầng một nộp phí.
我在网上交费。|Tôi nộp phí trên mạng.
交费以后可以上课。|Nộp phí xong là được học.
你交费了吗？|Bạn nộp phí chưa?
交费的人很多。|Người nộp phí rất đông.
#交警
交警在路口工作。|Cảnh sát giao thông làm việc ở ngã tư.
交警让他停车。|Cảnh sát giao thông bảo anh ấy dừng xe.
有问题可以问交警。|Có vấn đề có thể hỏi cảnh sát giao thông.
交警很辛苦。|Cảnh sát giao thông rất vất vả.
他爸爸是交警。|Bố cậu ấy là cảnh sát giao thông.
#交往
我和他交往很多年了。|Tôi qua lại với anh ấy nhiều năm rồi.
他不太会跟人交往。|Anh ấy không giỏi giao tiếp với người khác.
他们在交往。|Họ đang hẹn hò.
两国交往很多。|Hai nước giao lưu nhiều.
多和朋友交往。|Hãy giao lưu nhiều với bạn bè.
#交易
这是一笔大交易。|Đây là một vụ giao dịch lớn.
网上交易很方便。|Giao dịch trên mạng rất tiện.
交易成功了。|Giao dịch thành công.
他们在做交易。|Họ đang giao dịch.
交易要小心。|Giao dịch phải cẩn thận.
#较
今天天气较好。|Hôm nay thời tiết khá tốt.
这里人较多。|Ở đây người khá đông.
他的成绩较好。|Thành tích của cậu ấy tương đối tốt.
这个问题较难。|Vấn đề này khá khó.
北方冬天较冷。|Miền Bắc mùa đông khá lạnh.
#教材
这本教材很好。|Giáo trình này rất tốt.
我们用新教材。|Chúng tôi dùng giáo trình mới.
请打开教材第十页。|Hãy mở giáo trình trang mười.
这是汉语教材。|Đây là giáo trình tiếng Trung.
老师在编写教材。|Thầy đang biên soạn giáo trình.
#教练
他是我们的教练。|Anh ấy là huấn luyện viên của chúng tôi.
教练让我们跑十圈。|Huấn luyện viên bảo chúng tôi chạy mười vòng.
游泳教练很严格。|Huấn luyện viên bơi rất nghiêm khắc.
我在找一个开车教练。|Tôi đang tìm một thầy dạy lái xe.
教练很满意。|Huấn luyện viên rất hài lòng.
#接待
我负责接待客人。|Tôi phụ trách tiếp đón khách.
谢谢你们的热情接待。|Cảm ơn sự đón tiếp nhiệt tình của các bạn.
接待处在一楼。|Quầy lễ tân ở tầng một.
他们接待了代表团。|Họ tiếp đón đoàn đại biểu.
这家酒店每天接待很多游客。|Khách sạn này mỗi ngày đón nhiều du khách.
#接近
现在接近十二点了。|Bây giờ gần mười hai giờ rồi.
他的水平接近老师了。|Trình độ của anh ấy gần bằng thầy rồi.
小猫不让人接近。|Con mèo con không cho người lại gần.
我们接近目标了。|Chúng ta đã gần đạt mục tiêu.
答案很接近了。|Câu trả lời đã rất gần đúng.
#结合
学习要和练习结合。|Học phải kết hợp với luyện tập.
这是中西结合的菜。|Đây là món ăn kết hợp Đông Tây.
我们要结合实际情况。|Chúng ta phải kết hợp tình hình thực tế.
他们结合了两个想法。|Họ kết hợp hai ý tưởng.
理论要结合实践。|Lý thuyết phải kết hợp thực tiễn.
#结婚
他们去年结婚了。|Họ kết hôn năm ngoái.
你结婚了吗？|Bạn kết hôn chưa?
我姐姐下个月结婚。|Chị tôi tháng sau kết hôn.
他们结婚十年了。|Họ kết hôn được mười năm rồi.
结婚那天来了很多人。|Hôm cưới có rất nhiều người đến.
#结实
这张桌子很结实。|Cái bàn này rất chắc chắn.
他的身体很结实。|Cơ thể anh ấy rất rắn chắc.
这双鞋很结实。|Đôi giày này rất bền.
绳子要绑结实。|Dây phải buộc chặt.
这个箱子不结实。|Cái thùng này không chắc.
#结束
比赛结束了。|Trận đấu kết thúc rồi.
会议几点结束？|Cuộc họp mấy giờ kết thúc?
假期快结束了。|Kỳ nghỉ sắp kết thúc rồi.
考试结束以后我们去玩儿。|Thi xong chúng ta đi chơi.
电影结束的时候大家都哭了。|Lúc phim kết thúc mọi người đều khóc.
#解开
请帮我解开这个结。|Hãy giúp tôi gỡ cái nút này.
他解开了衬衫的扣子。|Anh ấy cởi cúc áo sơ mi.
这个问题终于解开了。|Vấn đề này cuối cùng đã được giải đáp.
我解不开这道题。|Tôi không giải được bài này.
解开鞋带再脱鞋。|Cởi dây giày rồi mới tháo giày.
#金
这是金的还是银的？|Cái này là vàng hay bạc?
她戴着金项链。|Cô ấy đeo dây chuyền vàng.
时间就是金钱。|Thời gian là vàng bạc.
金色的头发很漂亮。|Tóc màu vàng rất đẹp.
沉默是金。|Im lặng là vàng.
#金牌
他得了金牌。|Anh ấy giành huy chương vàng.
这是一块奥运金牌。|Đây là một huy chương vàng Olympic.
我们队拿了三块金牌。|Đội chúng tôi giành ba huy chương vàng.
她的梦想是得金牌。|Ước mơ của cô ấy là giành huy chương vàng.
金牌是最高的奖。|Huy chương vàng là giải cao nhất.
#仅
仅一天就卖完了。|Chỉ một ngày đã bán hết.
这里仅有两个人。|Ở đây chỉ có hai người.
不仅我，他也去了。|Không chỉ tôi, anh ấy cũng đi.
仅花了十块钱。|Chỉ tiêu mười đồng.
这仅是我的看法。|Đây chỉ là quan điểm của tôi.
#仅仅
仅仅一年，他就会说汉语了。|Chỉ một năm, anh ấy đã biết nói tiếng Trung.
这仅仅是开始。|Đây chỉ mới là bắt đầu.
我仅仅想帮你。|Tôi chỉ muốn giúp bạn.
仅仅五分钟就到了。|Chỉ năm phút là đến.
这不仅仅是钱的问题。|Đây không chỉ là vấn đề tiền.
#尽量
我会尽量早点儿来。|Tôi sẽ cố gắng đến sớm.
请尽量说汉语。|Hãy cố gắng nói tiếng Trung.
尽量少吃甜的。|Cố gắng ăn ít đồ ngọt.
我尽量帮你。|Tôi sẽ cố hết sức giúp bạn.
尽量不要迟到。|Cố gắng đừng đến muộn.
#紧
这双鞋太紧了。|Đôi giày này chật quá.
把门关紧。|Đóng chặt cửa lại.
时间很紧。|Thời gian rất gấp.
他紧紧地拉着我的手。|Anh ấy nắm chặt tay tôi.
这条裤子有点儿紧。|Chiếc quần này hơi chật.
#紧急
这是紧急情况。|Đây là tình huống khẩn cấp.
有紧急的事给我打电话。|Có việc gấp thì gọi cho tôi.
紧急出口在那边。|Lối thoát hiểm ở đằng kia.
医生在做紧急手术。|Bác sĩ đang làm phẫu thuật khẩn cấp.
会议很紧急。|Cuộc họp rất khẩn cấp.
#近期
近期天气很好。|Gần đây thời tiết rất đẹp.
我近期很忙。|Gần đây tôi rất bận.
近期有什么计划？|Sắp tới có kế hoạch gì?
近期会有考试。|Sắp tới sẽ có thi.
这是近期的照片。|Đây là ảnh gần đây.
#进一步
我们要进一步了解情况。|Chúng ta phải tìm hiểu thêm tình hình.
请进一步说明。|Hãy giải thích rõ thêm.
两国关系进一步发展。|Quan hệ hai nước tiến thêm một bước.
我想进一步学习汉语。|Tôi muốn học tiếng Trung sâu hơn.
问题需要进一步研究。|Vấn đề cần nghiên cứu thêm.
#进展
工作有什么进展？|Công việc có tiến triển gì?
进展很顺利。|Tiến triển rất thuận lợi.
研究有了新的进展。|Nghiên cứu có tiến triển mới.
这件事没有进展。|Việc này không có tiến triển.
请告诉我最新进展。|Hãy cho tôi biết tiến triển mới nhất.
#京剧
你看过京剧吗？|Bạn xem Kinh kịch bao giờ chưa?
京剧是中国的国粹。|Kinh kịch là tinh hoa quốc gia của Trung Quốc.
爷爷喜欢听京剧。|Ông thích nghe Kinh kịch.
她在学唱京剧。|Cô ấy đang học hát Kinh kịch.
京剧的服装很漂亮。|Trang phục Kinh kịch rất đẹp.
#经营
他经营一家饭馆。|Anh ấy kinh doanh một nhà hàng.
这家店经营得很好。|Cửa hàng này kinh doanh rất tốt.
公司经营了二十年。|Công ty hoạt động được hai mươi năm.
经营生意不容易。|Kinh doanh không dễ.
他们经营水果。|Họ kinh doanh trái cây.
#精彩
这场比赛很精彩。|Trận đấu này rất đặc sắc.
他的发言很精彩。|Bài phát biểu của anh ấy rất hay.
精彩的表演让人难忘。|Màn biểu diễn đặc sắc khiến người ta khó quên.
这部电影太精彩了！|Bộ phim này hay quá!
生活很精彩。|Cuộc sống rất muôn màu.
#景色
这里的景色很美。|Phong cảnh ở đây rất đẹp.
山上的景色真好。|Phong cảnh trên núi thật đẹp.
秋天的景色最漂亮。|Cảnh sắc mùa thu đẹp nhất.
我们一边走一边看景色。|Chúng tôi vừa đi vừa ngắm cảnh.
窗外的景色很好。|Cảnh ngoài cửa sổ rất đẹp.
#警察
有事找警察。|Có chuyện thì tìm cảnh sát.
警察来了。|Cảnh sát đến rồi.
他是一名警察。|Anh ấy là một cảnh sát.
警察帮我找到了钱包。|Cảnh sát giúp tôi tìm lại ví.
快叫警察！|Mau gọi cảnh sát!
#静
请安静，大家静一静。|Xin trật tự, mọi người im lặng một chút.
夜里很静。|Ban đêm rất yên tĩnh.
我想静下心来学习。|Tôi muốn tĩnh tâm học tập.
山里静得没有声音。|Trong núi yên tĩnh không một tiếng động.
你先静一下，别着急。|Bạn bình tĩnh lại đã, đừng vội.
#旧
这件衣服很旧了。|Chiếc áo này cũ lắm rồi.
我买了一辆旧车。|Tôi mua một chiếc xe cũ.
新的比旧的好。|Cái mới tốt hơn cái cũ.
这是我的旧手机。|Đây là điện thoại cũ của tôi.
旧书可以送人。|Sách cũ có thể tặng người khác.
#救
救命啊！|Cứu với!
医生救了他。|Bác sĩ đã cứu anh ấy.
他从水里救出了一个孩子。|Anh ấy cứu một đứa trẻ khỏi nước.
快叫救护车！|Mau gọi xe cứu thương!
谢谢你救了我。|Cảm ơn bạn đã cứu tôi.
#就业
毕业后就业很难。|Sau tốt nghiệp kiếm việc rất khó.
就业机会越来越多。|Cơ hội việc làm ngày càng nhiều.
学校帮助学生就业。|Nhà trường giúp sinh viên tìm việc.
这个专业就业很好。|Ngành này dễ có việc làm.
政府关心就业问题。|Chính phủ quan tâm vấn đề việc làm.
#举办
学校举办了运动会。|Trường tổ chức hội thao.
比赛在北京举办。|Cuộc thi được tổ chức tại Bắc Kinh.
我们要举办一个晚会。|Chúng tôi sẽ tổ chức một buổi dạ hội.
奥运会在哪儿举办？|Thế vận hội tổ chức ở đâu?
公司每年举办活动。|Công ty tổ chức hoạt động hằng năm.
#具体
请说得具体一点儿。|Hãy nói cụ thể hơn chút.
具体时间还没定。|Thời gian cụ thể chưa định.
你有具体的计划吗？|Bạn có kế hoạch cụ thể không?
具体情况我不清楚。|Tình hình cụ thể tôi không rõ.
请举一个具体的例子。|Hãy đưa ra một ví dụ cụ thể.
#具有
这个地方具有很长的历史。|Nơi này có lịch sử rất lâu đời.
他具有很强的能力。|Anh ấy có năng lực rất mạnh.
这件事具有重要的意义。|Việc này có ý nghĩa quan trọng.
这种药具有很好的效果。|Loại thuốc này có hiệu quả rất tốt.
她具有老师的经验。|Cô ấy có kinh nghiệm làm giáo viên.
#剧场
剧场里坐满了人。|Nhà hát chật kín người.
我们七点在剧场门口见。|Bảy giờ gặp ở cửa nhà hát nhé.
这个剧场很大。|Nhà hát này rất lớn.
剧场里不能拍照。|Trong nhà hát không được chụp ảnh.
新剧场明年开放。|Nhà hát mới năm sau mở cửa.
#据说
据说明天会下雨。|Nghe nói mai sẽ mưa.
据说他要结婚了。|Nghe nói anh ấy sắp kết hôn.
据说这家饭馆很好吃。|Nghe nói nhà hàng này rất ngon.
据说这里以前是一条河。|Nghe nói nơi này trước kia là một con sông.
据说她会五种语言。|Nghe nói cô ấy biết năm ngôn ngữ.
#决定
我决定学汉语。|Tôi quyết định học tiếng Trung.
这是我的决定。|Đây là quyết định của tôi.
你决定了吗？|Bạn quyết định chưa?
我们决定明天出发。|Chúng tôi quyết định mai xuất phát.
这件事由你决定。|Việc này do bạn quyết định.
#决赛
我们进了决赛。|Chúng tôi vào chung kết rồi.
决赛明天晚上举行。|Chung kết diễn ra tối mai.
决赛很精彩。|Trận chung kết rất hấp dẫn.
他在决赛中得了第一名。|Anh ấy đứng nhất trong trận chung kết.
你看决赛了吗？|Bạn xem trận chung kết chưa?
#决心
我下决心学好汉语。|Tôi quyết tâm học giỏi tiếng Trung.
他的决心很大。|Quyết tâm của anh ấy rất lớn.
只要有决心，就能成功。|Chỉ cần có quyết tâm là sẽ thành công.
她决心不再迟到。|Cô ấy quyết tâm không đến muộn nữa.
我们有决心完成任务。|Chúng tôi có quyết tâm hoàn thành nhiệm vụ.
#绝对
我绝对不会忘记你。|Tôi tuyệt đối sẽ không quên bạn.
这绝对是真的。|Điều này chắc chắn là thật.
你绝对不能告诉他。|Bạn tuyệt đối không được nói với anh ấy.
他绝对是最好的。|Anh ấy chắc chắn là giỏi nhất.
我绝对同意。|Tôi hoàn toàn đồng ý.
#开发
公司在开发新产品。|Công ty đang phát triển sản phẩm mới.
这个地区还没开发。|Khu vực này chưa được khai thác.
他在开发一个手机软件。|Anh ấy đang phát triển một ứng dụng điện thoại.
我们要开发新市场。|Chúng ta phải phát triển thị trường mới.
开发需要很多钱。|Khai thác cần rất nhiều tiền.
#开放
图书馆周末也开放。|Thư viện cuối tuần cũng mở cửa.
公园几点开放？|Công viên mấy giờ mở cửa?
这个国家很开放。|Đất nước này rất cởi mở.
他的思想很开放。|Tư tưởng của anh ấy rất cởi mở.
博物馆免费开放。|Bảo tàng mở cửa miễn phí.
#开业
新超市明天开业。|Siêu thị mới mai khai trương.
这家饭馆刚开业。|Nhà hàng này mới khai trương.
开业那天人很多。|Hôm khai trương rất đông người.
祝你开业大吉！|Chúc bạn khai trương hồng phát!
开业打八折。|Khai trương giảm hai mươi phần trăm.
#开展
学校开展了很多活动。|Trường triển khai nhiều hoạt động.
工作开展得很顺利。|Công việc triển khai rất thuận lợi.
我们要开展调查。|Chúng ta phải tiến hành điều tra.
这个活动开展了一个月。|Hoạt động này diễn ra một tháng.
公司开展了新业务。|Công ty triển khai nghiệp vụ mới.
#看起来
他看起来很累。|Anh ấy trông có vẻ rất mệt.
看起来要下雨了。|Xem ra sắp mưa rồi.
这个菜看起来很好吃。|Món này trông rất ngon.
你看起来很年轻。|Bạn trông rất trẻ.
看起来他不想来。|Xem ra anh ấy không muốn đến.
#看上去
她看上去很高兴。|Cô ấy trông có vẻ rất vui.
这件衣服看上去很贵。|Chiếc áo này trông rất đắt.
他看上去只有二十岁。|Anh ấy trông chỉ khoảng hai mươi tuổi.
看上去很简单，其实很难。|Trông thì đơn giản, thực ra rất khó.
那个人看上去很面熟。|Người kia trông rất quen.
#考验
这是对我们的考验。|Đây là thử thách đối với chúng ta.
困难是一种考验。|Khó khăn là một sự thử thách.
他经受住了考验。|Anh ấy đã vượt qua thử thách.
时间会考验我们的友谊。|Thời gian sẽ thử thách tình bạn của chúng ta.
这次比赛考验了大家。|Cuộc thi lần này đã thử thách mọi người.
#科技
科技发展很快。|Khoa học kỹ thuật phát triển rất nhanh.
他在科技公司工作。|Anh ấy làm ở công ty công nghệ.
科技改变生活。|Khoa học công nghệ thay đổi cuộc sống.
这是最新的科技。|Đây là công nghệ mới nhất.
我对科技很感兴趣。|Tôi rất hứng thú với khoa học công nghệ.
#可靠
他是一个可靠的人。|Anh ấy là người đáng tin cậy.
这个消息可靠吗？|Tin này có đáng tin không?
这辆车很可靠。|Chiếc xe này rất bền bỉ.
我们需要可靠的数据。|Chúng ta cần số liệu đáng tin cậy.
他做事很可靠。|Anh ấy làm việc rất đáng tin.
#可乐
我要一杯可乐。|Tôi muốn một cốc cô-ca.
可乐加冰。|Cô-ca thêm đá.
孩子不要喝太多可乐。|Trẻ con đừng uống quá nhiều cô-ca.
冰箱里有可乐。|Trong tủ lạnh có cô-ca.
他每天喝一瓶可乐。|Ngày nào anh ấy cũng uống một chai cô-ca.
#克服
我们要克服困难。|Chúng ta phải khắc phục khó khăn.
他克服了害怕。|Anh ấy đã vượt qua nỗi sợ.
这个问题很难克服。|Vấn đề này rất khó khắc phục.
我克服了很多问题才成功。|Tôi vượt qua nhiều vấn đề mới thành công.
你一定能克服。|Bạn nhất định vượt qua được.
#客观
请客观地看问题。|Hãy nhìn vấn đề một cách khách quan.
他的意见很客观。|Ý kiến của anh ấy rất khách quan.
这是客观事实。|Đây là sự thật khách quan.
我们要客观评价。|Chúng ta phải đánh giá khách quan.
她说得比较客观。|Cô ấy nói khá khách quan.
#课程
这学期有什么课程？|Học kỳ này có những môn gì?
汉语课程很有意思。|Chương trình học tiếng Trung rất thú vị.
我报了一个网上课程。|Tôi đăng ký một khóa học trực tuyến.
课程表在墙上。|Thời khóa biểu ở trên tường.
这个课程有十二周。|Khóa học này có mười hai tuần.
#空
这个房间是空的。|Căn phòng này trống.
瓶子空了。|Chai rỗng rồi.
我的钱包空了。|Ví của tôi rỗng rồi.
车上很空。|Trên xe rất vắng.
别空着手来。|Đừng đến tay không.
#空调
请打开空调。|Hãy bật điều hòa.
空调坏了。|Điều hòa hỏng rồi.
夏天没有空调很难受。|Mùa hè không có điều hòa rất khó chịu.
空调开得太冷了。|Điều hòa bật lạnh quá.
房间里有空调吗？|Trong phòng có điều hòa không?
#空儿
你有空儿吗？|Bạn có rảnh không?
我今天没空儿。|Hôm nay tôi không rảnh.
有空儿来玩儿。|Rảnh thì đến chơi.
抽空儿给妈妈打个电话。|Dành chút thời gian gọi điện cho mẹ.
他一有空儿就看书。|Hễ rảnh là anh ấy đọc sách.
#恐怕
恐怕要下雨了。|E rằng sắp mưa rồi.
我恐怕去不了了。|E rằng tôi không đi được.
恐怕他已经走了。|E rằng anh ấy đã đi rồi.
这件事恐怕不行。|Việc này e là không được.
恐怕来不及了。|E rằng không kịp rồi.
#裤子
这条裤子太长了。|Chiếc quần này dài quá.
我买了一条新裤子。|Tôi mua một chiếc quần mới.
他穿着黑裤子。|Anh ấy mặc quần đen.
裤子脏了，要洗。|Quần bẩn rồi, phải giặt.
这条裤子多少钱？|Chiếc quần này bao nhiêu tiền?
#快速
经济快速发展。|Kinh tế phát triển nhanh chóng.
他快速地跑了过去。|Anh ấy chạy vụt qua.
这是快速列车。|Đây là tàu nhanh.
请快速回答。|Hãy trả lời nhanh.
快速学汉语的方法有吗？|Có cách học tiếng Trung nhanh không?
#困
我困了，想睡觉。|Tôi buồn ngủ rồi, muốn đi ngủ.
你困吗？|Bạn buồn ngủ không?
昨天睡得晚，今天很困。|Hôm qua ngủ muộn, hôm nay rất buồn ngủ.
他被困在电梯里了。|Anh ấy bị kẹt trong thang máy.
上课的时候我很困。|Trong giờ học tôi rất buồn ngủ.
#浪费
不要浪费食物。|Đừng lãng phí thức ăn.
别浪费时间。|Đừng lãng phí thời gian.
浪费水是不对的。|Lãng phí nước là không đúng.
这样做太浪费了。|Làm thế này lãng phí quá.
他浪费了很多钱。|Anh ấy lãng phí rất nhiều tiền.
#老百姓
老百姓的生活越来越好。|Cuộc sống người dân ngày càng tốt.
我们都是普通老百姓。|Chúng tôi đều là dân thường.
政府要关心老百姓。|Chính phủ phải quan tâm người dân.
老百姓很喜欢这个节目。|Người dân rất thích chương trình này.
这件事关系到老百姓。|Việc này liên quan đến người dân.
#老太太
这位老太太八十岁了。|Bà cụ này tám mươi tuổi rồi.
我帮老太太拿东西。|Tôi giúp bà cụ xách đồ.
老太太每天去公园。|Bà cụ ngày nào cũng ra công viên.
请给老太太让座。|Hãy nhường chỗ cho bà cụ.
老太太很和气。|Bà cụ rất hiền hậu.
#老头儿
那个老头儿在下棋。|Ông cụ kia đang chơi cờ.
老头儿每天早上散步。|Ông cụ sáng nào cũng đi dạo.
这个老头儿很有意思。|Ông cụ này rất thú vị.
一个老头儿问我路。|Một ông cụ hỏi tôi đường.
老头儿笑得很开心。|Ông cụ cười rất vui.
#乐
他听了乐得不得了。|Anh ấy nghe xong vui không tả nổi.
你乐什么？|Bạn cười gì thế?
助人为乐。|Lấy việc giúp người làm niềm vui.
孩子们乐坏了。|Bọn trẻ vui sướng quá.
他一说话大家就乐了。|Anh ấy vừa nói mọi người đã cười.
#乐队
他在乐队里弹吉他。|Anh ấy chơi guitar trong ban nhạc.
这个乐队很有名。|Ban nhạc này rất nổi tiếng.
我们成立了一个乐队。|Chúng tôi lập một ban nhạc.
乐队开始演奏了。|Ban nhạc bắt đầu biểu diễn.
你喜欢哪个乐队？|Bạn thích ban nhạc nào?
#乐观
他是一个很乐观的人。|Anh ấy là người rất lạc quan.
要乐观地面对生活。|Phải lạc quan đối mặt cuộc sống.
情况不太乐观。|Tình hình không khả quan lắm.
她总是很乐观。|Cô ấy luôn rất lạc quan.
乐观的人更健康。|Người lạc quan khỏe mạnh hơn.
#类
这类问题很常见。|Loại vấn đề này rất thường gặp.
我喜欢这类电影。|Tôi thích loại phim này.
请把书按类放好。|Hãy xếp sách theo loại.
这两个字不是一类。|Hai chữ này không cùng loại.
人类需要水。|Loài người cần nước.
#类似
我也有类似的经历。|Tôi cũng có trải nghiệm tương tự.
这两个问题很类似。|Hai vấn đề này rất giống nhau.
类似的事情以前也发生过。|Chuyện tương tự trước đây cũng từng xảy ra.
这个字和那个字很类似。|Chữ này rất giống chữ kia.
请不要再犯类似的错误。|Đừng mắc lỗi tương tự nữa.
#离婚
他们离婚了。|Họ ly hôn rồi.
他们结婚三年就离婚了。|Họ cưới ba năm thì ly hôn.
离婚对孩子影响很大。|Ly hôn ảnh hưởng lớn đến con cái.
她不想离婚。|Cô ấy không muốn ly hôn.
现在离婚的人越来越多。|Bây giờ người ly hôn ngày càng nhiều.
#里面
房间里面有人吗？|Trong phòng có người không?
包里面有什么？|Trong túi có gì?
里面请！|Mời vào trong!
里面太热了。|Bên trong nóng quá.
盒子里面是一个礼物。|Trong hộp là một món quà.
#理发
我想去理发。|Tôi muốn đi cắt tóc.
你理发了？很好看。|Bạn cắt tóc à? Đẹp lắm.
理发店在哪儿？|Tiệm cắt tóc ở đâu?
我每个月理一次发。|Tôi cắt tóc mỗi tháng một lần.
他在理发店工作。|Anh ấy làm ở tiệm cắt tóc.
#理解
我理解你的意思。|Tôi hiểu ý bạn.
谢谢你的理解。|Cảm ơn sự thông cảm của bạn.
这篇文章很难理解。|Bài viết này rất khó hiểu.
父母不理解我。|Bố mẹ không hiểu tôi.
请大家理解。|Mong mọi người thông cảm.
#理论
他学的是理论。|Anh ấy học về lý luận.
理论和实际不一样。|Lý thuyết và thực tế khác nhau.
这个理论很有名。|Lý thuyết này rất nổi tiếng.
理论要联系实际。|Lý luận phải gắn với thực tế.
我去找他理论理论。|Tôi đi tìm anh ấy nói lý lẽ.
#理由
你有什么理由？|Bạn có lý do gì?
他迟到的理由是什么？|Lý do anh ấy đến muộn là gì?
没有理由不去。|Không có lý do gì để không đi.
这个理由不够。|Lý do này chưa đủ.
请说出你的理由。|Hãy nói ra lý do của bạn.
#力
他没有力了。|Anh ấy hết sức rồi.
用力推门。|Dùng sức đẩy cửa.
我会尽力的。|Tôi sẽ cố hết sức.
大家一起出力。|Mọi người cùng góp sức.
他的力很大。|Sức anh ấy rất khỏe.
#立刻
我立刻就来。|Tôi đến ngay lập tức.
听到消息，他立刻走了。|Nghe tin, anh ấy lập tức đi.
请立刻回家。|Hãy về nhà ngay.
医生立刻给他检查。|Bác sĩ lập tức khám cho anh ấy.
下课铃一响，学生们立刻跑出去了。|Chuông tan học vừa reo, học sinh lập tức chạy ra.
#利用
我们要利用好时间。|Chúng ta phải tận dụng tốt thời gian.
他利用周末学汉语。|Anh ấy tận dụng cuối tuần học tiếng Trung.
别被人利用了。|Đừng để người ta lợi dụng.
旧东西可以再利用。|Đồ cũ có thể tái sử dụng.
利用网络学习很方便。|Tận dụng mạng internet để học rất tiện.
#连
他连饭都没吃就走了。|Anh ấy cơm cũng chưa ăn đã đi.
连孩子都知道。|Ngay cả trẻ con cũng biết.
雨连下了三天。|Mưa liền ba ngày.
我连一个字都不认识。|Tôi đến một chữ cũng không biết.
这两个房间是连着的。|Hai phòng này thông nhau.
#连忙
他连忙站起来。|Anh ấy vội vàng đứng dậy.
听到电话，她连忙去接。|Nghe điện thoại, cô ấy vội đi nghe.
我连忙说对不起。|Tôi vội vàng xin lỗi.
看到老师，他连忙打招呼。|Thấy thầy, cậu ấy vội chào.
下雨了，我们连忙回家。|Mưa rồi, chúng tôi vội vàng về nhà.
#连续
他连续工作了十个小时。|Anh ấy làm việc liên tục mười tiếng.
连续三天下雨。|Mưa liên tục ba ngày.
我们队连续赢了五场。|Đội chúng tôi thắng liên tiếp năm trận.
她连续两年得了第一名。|Cô ấy đứng nhất hai năm liền.
连续看电脑对眼睛不好。|Nhìn máy tính liên tục không tốt cho mắt.
#连续剧
我在看一部连续剧。|Tôi đang xem một bộ phim dài tập.
这部连续剧有五十集。|Bộ phim dài tập này có năm mươi tập.
妈妈每天晚上看连续剧。|Tối nào mẹ cũng xem phim bộ.
这部连续剧很受欢迎。|Bộ phim này rất được yêu thích.
连续剧今晚大结局。|Tối nay phim bộ chiếu tập cuối.
#联合
两家公司联合起来了。|Hai công ty liên kết với nhau.
我们联合举办活动。|Chúng tôi phối hợp tổ chức hoạt động.
大家联合起来力量大。|Mọi người đoàn kết lại thì sức mạnh lớn.
这是两国联合的研究。|Đây là nghiên cứu chung của hai nước.
他们联合写了一本书。|Họ cùng nhau viết một cuốn sách.
#联合国
联合国在纽约。|Liên Hợp Quốc ở New York.
越南是联合国成员。|Việt Nam là thành viên Liên Hợp Quốc.
他在联合国工作。|Anh ấy làm việc ở Liên Hợp Quốc.
联合国有很多国家。|Liên Hợp Quốc có nhiều quốc gia.
联合国开了会议。|Liên Hợp Quốc đã tổ chức hội nghị.
#联系
我们常常联系。|Chúng tôi thường xuyên liên lạc.
有事联系我。|Có việc thì liên lạc với tôi.
我联系不上他。|Tôi không liên lạc được với anh ấy.
这两件事有联系吗？|Hai việc này có liên quan không?
请留下联系方式。|Hãy để lại thông tin liên lạc.
#凉水
我想喝一杯凉水。|Tôi muốn uống một cốc nước mát.
别喝凉水，喝热水。|Đừng uống nước lạnh, uống nước nóng.
用凉水洗脸很舒服。|Rửa mặt bằng nước lạnh rất dễ chịu.
夏天他喜欢洗凉水澡。|Mùa hè anh ấy thích tắm nước lạnh.
他的话像一盆凉水。|Lời anh ấy như một gáo nước lạnh.
#领
老师领我们去参观。|Thầy dẫn chúng tôi đi tham quan.
我去领工资。|Tôi đi lĩnh lương.
请到这里领书。|Hãy đến đây nhận sách.
他领着孩子过马路。|Anh ấy dắt con qua đường.
你领了奖吗？|Bạn đã nhận giải chưa?
#领导
他是我们的领导。|Ông ấy là lãnh đạo của chúng tôi.
领导在开会。|Lãnh đạo đang họp.
他领导这个部门。|Anh ấy lãnh đạo bộ phận này.
新领导很年轻。|Lãnh đạo mới rất trẻ.
在他的领导下，公司发展很快。|Dưới sự lãnh đạo của ông ấy, công ty phát triển nhanh.
#领先
我们队领先两分。|Đội chúng tôi dẫn trước hai điểm.
他一直领先。|Anh ấy luôn dẫn đầu.
这家公司技术领先。|Công ty này dẫn đầu về công nghệ.
她跑步领先别人。|Cô ấy chạy dẫn trước người khác.
我们要保持领先。|Chúng ta phải giữ vị trí dẫn đầu.
#另外
另外，我还有一个问题。|Ngoài ra, tôi còn một câu hỏi.
我们另外找一个时间吧。|Chúng ta tìm thời gian khác nhé.
另外两个人没来。|Hai người còn lại không đến.
这是另外一回事。|Đây là chuyện khác.
另外，别忘了带护照。|Ngoài ra, đừng quên mang hộ chiếu.
#另一方面
一方面工作忙，另一方面要照顾孩子。|Một mặt công việc bận, mặt khác phải chăm con.
另一方面，这样也很浪费。|Mặt khác, làm vậy cũng rất lãng phí.
这件事有好处，另一方面也有问题。|Việc này có lợi, mặt khác cũng có vấn đề.
另一方面，我们也要考虑价格。|Mặt khác, chúng ta cũng phải cân nhắc giá cả.
一方面我想去，另一方面我没时间。|Một mặt tôi muốn đi, mặt khác tôi không có thời gian.
#龙
龙是中国的象征。|Rồng là biểu tượng của Trung Quốc.
我属龙。|Tôi tuổi Thìn.
春节的时候有舞龙。|Tết có múa rồng.
这是一条龙。|Đây là một con rồng.
你看过龙舟比赛吗？|Bạn xem đua thuyền rồng bao giờ chưa?
#录
请把这段话录下来。|Hãy ghi lại đoạn nói này.
他被大学录取了。|Anh ấy được đại học tuyển chọn.
我录了一个视频。|Tôi quay một đoạn video.
这首歌是在哪儿录的？|Bài hát này thu ở đâu?
请帮我录一下名字。|Hãy ghi lại tên giúp tôi.
#录音
请听录音。|Hãy nghe đoạn ghi âm.
我把老师的话录音了。|Tôi ghi âm lời thầy rồi.
这段录音不太清楚。|Đoạn ghi âm này không rõ lắm.
跟着录音读。|Đọc theo băng ghi âm.
手机可以录音。|Điện thoại có thể ghi âm.
#路线
这条公共汽车路线到机场。|Tuyến xe buýt này đến sân bay.
我们选哪条路线？|Chúng ta chọn tuyến đường nào?
旅游路线已经定了。|Lộ trình du lịch đã định rồi.
这条路线比较近。|Tuyến đường này khá gần.
请看一下路线图。|Hãy xem bản đồ tuyến đường.
#旅馆
我们住在一家小旅馆。|Chúng tôi ở một nhà nghỉ nhỏ.
旅馆在火车站旁边。|Nhà nghỉ ở cạnh ga tàu.
这家旅馆很便宜。|Nhà nghỉ này rất rẻ.
你订旅馆了吗？|Bạn đặt nhà nghỉ chưa?
旅馆的服务很好。|Dịch vụ nhà nghỉ rất tốt.
#旅行社
我在旅行社工作。|Tôi làm ở công ty du lịch.
我们通过旅行社去旅游。|Chúng tôi đi du lịch qua công ty lữ hành.
这家旅行社很有名。|Công ty du lịch này rất nổi tiếng.
旅行社给我们订了酒店。|Công ty du lịch đặt khách sạn cho chúng tôi.
你可以问问旅行社。|Bạn có thể hỏi công ty du lịch.
#绿茶
我喜欢喝绿茶。|Tôi thích uống trà xanh.
绿茶对身体好。|Trà xanh tốt cho sức khỏe.
请来一杯绿茶。|Cho một cốc trà xanh.
这是越南的绿茶。|Đây là trà xanh Việt Nam.
晚上别喝绿茶，会睡不着。|Buổi tối đừng uống trà xanh, sẽ mất ngủ.
#乱
你的房间太乱了。|Phòng của bạn bừa bộn quá.
别乱说。|Đừng nói linh tinh.
东西不要乱放。|Đồ đạc đừng để lung tung.
我心里很乱。|Lòng tôi rối bời.
不要乱扔垃圾。|Đừng vứt rác bừa bãi.
#落后
我们不能落后。|Chúng ta không được tụt hậu.
这个地方很落后。|Nơi này rất lạc hậu.
他的成绩落后了。|Thành tích của cậu ấy bị tụt lại.
落后就要挨打。|Lạc hậu thì sẽ bị đánh.
我们队落后三分。|Đội chúng tôi bị dẫn ba điểm.
#麻烦
麻烦你帮我一下。|Phiền bạn giúp tôi một chút.
这件事很麻烦。|Việc này rất phiền phức.
不好意思，给你添麻烦了。|Xin lỗi, đã làm phiền bạn.
麻烦您再说一遍。|Phiền ngài nói lại một lần.
他遇到了麻烦。|Anh ấy gặp rắc rối rồi.
#马
他会骑马。|Anh ấy biết cưỡi ngựa.
草原上有很多马。|Trên thảo nguyên có nhiều ngựa.
这匹马跑得很快。|Con ngựa này chạy rất nhanh.
我属马。|Tôi tuổi Ngọ.
马上就到了。|Sắp đến ngay rồi.
#毛病
电脑出毛病了。|Máy tính bị trục trặc rồi.
他有一个坏毛病。|Anh ấy có một tật xấu.
这辆车有什么毛病？|Chiếc xe này bị hỏng gì?
我得改掉这个毛病。|Tôi phải bỏ tật này.
他的身体没有毛病。|Cơ thể anh ấy không có vấn đề gì.
#没用
哭也没用。|Khóc cũng vô ích.
这个东西没用了，扔了吧。|Thứ này vô dụng rồi, vứt đi.
说了也没用。|Nói cũng vô ích.
我真没用。|Tôi thật vô dụng.
这个药没用。|Thuốc này không có tác dụng.
#媒体
媒体报道了这件事。|Truyền thông đã đưa tin việc này.
他在媒体公司工作。|Anh ấy làm ở công ty truyền thông.
新媒体发展很快。|Truyền thông mới phát triển rất nhanh.
很多媒体来采访他。|Nhiều cơ quan báo chí đến phỏng vấn anh ấy.
媒体的影响很大。|Ảnh hưởng của truyền thông rất lớn.
#美
这里的风景很美。|Phong cảnh ở đây rất đẹp.
她长得很美。|Cô ấy rất xinh đẹp.
这首歌真美。|Bài hát này thật hay.
美的东西人人都喜欢。|Ai cũng thích cái đẹp.
你想得美！|Bạn mơ đẹp quá!
#美食
越南有很多美食。|Việt Nam có nhiều món ngon.
我喜欢吃美食。|Tôi thích ăn đồ ngon.
这条街有很多美食。|Con phố này có nhiều món ngon.
他是一个美食家。|Anh ấy là một người sành ăn.
中国美食很有名。|Ẩm thực Trung Quốc rất nổi tiếng.
#美术
她喜欢美术。|Cô ấy thích mỹ thuật.
我们去美术馆吧。|Chúng ta đi bảo tàng mỹ thuật nhé.
他是美术老师。|Anh ấy là giáo viên mỹ thuật.
今天有美术课。|Hôm nay có tiết mỹ thuật.
她在学美术。|Cô ấy đang học mỹ thuật.
#美元
这个多少美元？|Cái này bao nhiêu đô la Mỹ?
我想换美元。|Tôi muốn đổi đô la Mỹ.
一百美元可以买什么？|Một trăm đô la mua được gì?
这里可以用美元吗？|Ở đây dùng được đô la Mỹ không?
他有一些美元。|Anh ấy có một ít đô la Mỹ.
#迷
他是一个电影迷。|Anh ấy là người mê phim.
我迷上了中国菜。|Tôi mê món Trung Quốc rồi.
她迷路了。|Cô ấy bị lạc đường.
孩子们迷上了这个游戏。|Bọn trẻ mê trò chơi này.
他是个足球迷。|Anh ấy là fan bóng đá.
#面对
我们要面对困难。|Chúng ta phải đối mặt với khó khăn.
面对问题不要害怕。|Đối mặt với vấn đề đừng sợ.
他不敢面对现实。|Anh ấy không dám đối mặt hiện thực.
我的房间面对大海。|Phòng tôi hướng ra biển.
面对这么多人，她有点儿紧张。|Đứng trước nhiều người thế, cô ấy hơi hồi hộp.
#面积
这个房子面积多大？|Căn nhà này diện tích bao nhiêu?
房间面积有三十平方米。|Phòng có diện tích ba mươi mét vuông.
中国面积很大。|Diện tích Trung Quốc rất lớn.
这个公园面积不小。|Công viên này diện tích không nhỏ.
请计算一下面积。|Hãy tính diện tích.
#民间
这是一个民间故事。|Đây là một câu chuyện dân gian.
我喜欢民间音乐。|Tôi thích âm nhạc dân gian.
民间有很多传说。|Dân gian có nhiều truyền thuyết.
这是民间的习惯。|Đây là tập quán dân gian.
他研究民间文化。|Anh ấy nghiên cứu văn hóa dân gian.
#明确
目标要明确。|Mục tiêu phải rõ ràng.
他的态度很明确。|Thái độ của anh ấy rất rõ ràng.
请明确告诉我。|Hãy nói rõ với tôi.
我们要明确工作任务。|Chúng ta phải làm rõ nhiệm vụ công việc.
这个回答不太明确。|Câu trả lời này không rõ ràng lắm.
#明显
他明显瘦了。|Anh ấy gầy đi rõ rệt.
这个错误很明显。|Lỗi này rất rõ ràng.
天气明显变冷了。|Thời tiết lạnh đi rõ rệt.
他的汉语进步很明显。|Tiếng Trung của anh ấy tiến bộ rõ rệt.
两个字的区别不明显。|Sự khác biệt giữa hai chữ không rõ.
#命运
我相信命运。|Tôi tin vào số phận.
命运在自己手里。|Số phận nằm trong tay mình.
他的命运很不好。|Số phận anh ấy rất không may.
我们不能改变命运吗？|Chúng ta không thể thay đổi số phận sao?
这次考试决定了他的命运。|Kỳ thi này quyết định số phận anh ấy.
#某
某天我在路上遇到了他。|Một hôm nọ tôi gặp anh ấy trên đường.
某些人不同意。|Một số người không đồng ý.
他住在某个小城市。|Anh ấy sống ở một thành phố nhỏ nào đó.
王某是这家公司的经理。|Ông Vương nọ là giám đốc công ty này.
在某种程度上，你是对的。|Ở một mức độ nào đó bạn đúng.
#母亲
我母亲是老师。|Mẹ tôi là giáo viên.
母亲节快乐！|Chúc mừng Ngày của Mẹ!
他很爱他的母亲。|Anh ấy rất yêu mẹ.
母亲每天给我们做饭。|Mẹ ngày nào cũng nấu cơm cho chúng tôi.
我很想念母亲。|Tôi rất nhớ mẹ.
#木头
这张桌子是木头做的。|Cái bàn này làm bằng gỗ.
这块木头很重。|Khúc gỗ này rất nặng.
木头房子很漂亮。|Nhà gỗ rất đẹp.
他用木头做了一把椅子。|Anh ấy dùng gỗ làm một cái ghế.
他像木头一样不说话。|Anh ấy như khúc gỗ chẳng nói gì.
#目标
你的目标是什么？|Mục tiêu của bạn là gì?
我的目标是通过HSK三级。|Mục tiêu của tôi là đỗ HSK 3.
我们达到了目标。|Chúng tôi đã đạt mục tiêu.
要有明确的目标。|Phải có mục tiêu rõ ràng.
为了目标而努力。|Cố gắng vì mục tiêu.
#目前
目前我在学汉语。|Hiện nay tôi đang học tiếng Trung.
目前情况很好。|Tình hình hiện tại rất tốt.
目前还没有消息。|Hiện vẫn chưa có tin tức.
目前他住在北京。|Hiện tại anh ấy sống ở Bắc Kinh.
到目前为止，一切顺利。|Cho đến nay mọi việc thuận lợi.
#奶茶
我想喝奶茶。|Tôi muốn uống trà sữa.
这家奶茶很好喝。|Trà sữa quán này rất ngon.
一杯奶茶多少钱？|Một cốc trà sữa bao nhiêu tiền?
年轻人很喜欢喝奶茶。|Người trẻ rất thích uống trà sữa.
奶茶不要太甜。|Trà sữa đừng ngọt quá.
#男子
男子一百米比赛开始了。|Cuộc thi chạy một trăm mét nam bắt đầu.
一位男子在门口等你。|Một người đàn ông đang đợi bạn ở cửa.
他是男子足球队的。|Anh ấy thuộc đội bóng đá nam.
那名男子很高。|Người đàn ông đó rất cao.
男子组得了第一名。|Đội nam đứng nhất.
#南部
越南南部很热。|Miền Nam Việt Nam rất nóng.
我住在城市南部。|Tôi sống ở phía nam thành phố.
南部有很多水果。|Miền Nam có nhiều trái cây.
他去南部旅游了。|Anh ấy đi du lịch miền Nam.
中国南部常常下雨。|Miền Nam Trung Quốc thường mưa.
#难道
难道你不知道吗？|Lẽ nào bạn không biết sao?
难道他生气了？|Lẽ nào anh ấy giận rồi?
难道这是真的？|Chẳng lẽ đây là thật?
难道你忘了？|Lẽ nào bạn quên rồi?
难道我说错了吗？|Chẳng lẽ tôi nói sai sao?
#难度
这道题难度很大。|Bài này độ khó rất cao.
考试的难度增加了。|Độ khó bài thi đã tăng.
这个工作没有难度。|Công việc này không khó.
难度太高，我做不了。|Độ khó quá cao, tôi không làm được.
请降低一点儿难度。|Xin giảm độ khó một chút.
#内
三天内完成作业。|Hoàn thành bài tập trong vòng ba ngày.
请在一小时内回来。|Hãy quay lại trong vòng một tiếng.
室内不能吸烟。|Trong nhà không được hút thuốc.
国内外的游客都很多。|Du khách trong và ngoài nước đều đông.
我会在一周内给你回复。|Tôi sẽ trả lời bạn trong vòng một tuần.
#内心
我内心很感谢你。|Trong lòng tôi rất cảm ơn bạn.
她的内心很坚强。|Nội tâm cô ấy rất mạnh mẽ.
听听你内心的声音。|Hãy lắng nghe tiếng nói trong lòng bạn.
他内心很难过。|Trong lòng anh ấy rất buồn.
我从内心喜欢这个工作。|Tôi thật lòng yêu công việc này.
#能不能
你能不能帮我？|Bạn có thể giúp tôi không?
明天能不能来？|Mai có đến được không?
能不能便宜一点儿？|Có thể rẻ chút không?
你能不能说慢一点儿？|Bạn nói chậm chút được không?
我能不能进来？|Tôi vào được không?
#能力
他的工作能力很强。|Năng lực làm việc của anh ấy rất mạnh.
我有能力做好。|Tôi có năng lực làm tốt.
学习能力很重要。|Năng lực học tập rất quan trọng.
要提高汉语能力。|Phải nâng cao năng lực tiếng Trung.
这超出了我的能力。|Việc này vượt quá khả năng của tôi.
#年初
年初我去了中国。|Đầu năm tôi đi Trung Quốc.
年初的时候很冷。|Đầu năm trời rất lạnh.
我们年初定了计划。|Đầu năm chúng tôi đã lập kế hoạch.
他年初换了工作。|Đầu năm anh ấy đổi việc.
年初到现在，我学了五百个词。|Từ đầu năm đến nay tôi học được năm trăm từ.
#年代
这是八十年代的歌。|Đây là bài hát thập niên tám mươi.
那个年代没有手机。|Thời đó không có điện thoại.
这座楼是什么年代建的？|Tòa nhà này xây vào thời nào?
我父母是七十年代出生的。|Bố mẹ tôi sinh vào những năm bảy mươi.
不同年代的人想法不同。|Người ở các thời đại khác nhau có suy nghĩ khác nhau.
#年底
年底公司很忙。|Cuối năm công ty rất bận.
我们年底结婚。|Cuối năm chúng tôi cưới.
年底有奖金。|Cuối năm có thưởng.
这个工作年底能完成。|Công việc này cuối năm có thể hoàn thành.
年底我回老家。|Cuối năm tôi về quê.
#念
请念一下这个字。|Hãy đọc chữ này.
我很念着你。|Tôi rất nhớ bạn.
他在念课文。|Anh ấy đang đọc bài khóa.
她在大学念书。|Cô ấy đang học đại học.
老师念了学生的名字。|Thầy đọc tên học sinh.
#牛
我喜欢吃牛肉。|Tôi thích ăn thịt bò.
农民在养牛。|Nông dân đang nuôi bò.
这头牛很大。|Con bò này rất to.
我属牛。|Tôi tuổi Sửu.
你太牛了！|Bạn đỉnh quá!
#农村
我在农村长大。|Tôi lớn lên ở nông thôn.
农村的空气很好。|Không khí nông thôn rất trong lành.
很多年轻人离开了农村。|Nhiều người trẻ rời nông thôn.
农村的生活很安静。|Cuộc sống nông thôn rất yên tĩnh.
我爷爷住在农村。|Ông tôi sống ở nông thôn.
#农民
他爸爸是农民。|Bố anh ấy là nông dân.
农民很辛苦。|Nông dân rất vất vả.
农民在地里工作。|Nông dân làm việc ngoài đồng.
今年农民的收入增加了。|Năm nay thu nhập của nông dân tăng.
我们要感谢农民。|Chúng ta phải cảm ơn người nông dân.
#农业
越南是农业国家。|Việt Nam là nước nông nghiệp.
他在研究农业。|Anh ấy đang nghiên cứu nông nghiệp.
农业很重要。|Nông nghiệp rất quan trọng.
他上了农业大学。|Anh ấy học đại học nông nghiệp.
现代农业用很多机器。|Nông nghiệp hiện đại dùng nhiều máy móc.
#女子
女子一百米比赛很精彩。|Cuộc thi chạy một trăm mét nữ rất hấp dẫn.
一名女子在问路。|Một người phụ nữ đang hỏi đường.
她是女子足球队的队员。|Cô ấy là thành viên đội bóng đá nữ.
女子组比赛下午开始。|Thi đấu nhóm nữ bắt đầu buổi chiều.
这是一所女子学校。|Đây là một trường nữ sinh.
#拍
请帮我拍张照片。|Hãy chụp giúp tôi một tấm ảnh.
他拍了拍我的肩。|Anh ấy vỗ vỗ vai tôi.
大家拍手欢迎他。|Mọi người vỗ tay chào đón anh ấy.
这部电影在北京拍的。|Bộ phim này quay ở Bắc Kinh.
我拍了很多风景照。|Tôi chụp nhiều ảnh phong cảnh.
#排名
他排名第一。|Anh ấy xếp hạng nhất.
我们学校排名很高。|Trường chúng tôi xếp hạng rất cao.
排名出来了吗？|Có bảng xếp hạng chưa?
这次比赛的排名怎么样？|Thứ hạng cuộc thi lần này thế nào?
不要太在意排名。|Đừng quá để ý thứ hạng.
#牌子
门口有一个牌子。|Ở cửa có một tấm biển.
你喜欢什么牌子的手机？|Bạn thích điện thoại hãng nào?
这个牌子很有名。|Nhãn hiệu này rất nổi tiếng.
牌子上写着"禁止吸烟"。|Trên biển ghi "Cấm hút thuốc".
这是一个老牌子。|Đây là một thương hiệu lâu năm.
#派
公司派我去上海。|Công ty cử tôi đi Thượng Hải.
学校派了两个老师。|Trường cử hai giáo viên.
他被派到国外工作。|Anh ấy được cử ra nước ngoài làm việc.
请派人来帮忙。|Hãy cử người đến giúp.
他们是两个派别。|Họ là hai phe phái.
#判断
你判断得很对。|Bạn phán đoán rất đúng.
我很难判断。|Tôi rất khó phán đoán.
请判断对错。|Hãy phán đoán đúng sai.
他的判断错了。|Phán đoán của anh ấy sai rồi.
不能只看外表判断一个人。|Không thể chỉ nhìn bề ngoài mà đánh giá một người.
#胖
他比以前胖了。|Anh ấy béo hơn trước.
我太胖了，要减肥。|Tôi béo quá, phải giảm cân.
这只猫很胖。|Con mèo này rất béo.
吃太多会胖。|Ăn quá nhiều sẽ béo.
小孩儿胖胖的很可爱。|Đứa bé mũm mĩm rất đáng yêu.
#配
这件衣服配这条裤子很好看。|Áo này phối với quần này rất đẹp.
他配不上她。|Anh ấy không xứng với cô ấy.
我去配一把钥匙。|Tôi đi đánh thêm một chiếc chìa khóa.
这个菜配米饭吃。|Món này ăn với cơm.
红色配白色很漂亮。|Đỏ phối với trắng rất đẹp.
#配合
大家配合得很好。|Mọi người phối hợp rất tốt.
请配合我们的工作。|Xin hãy phối hợp với công việc của chúng tôi.
我们要互相配合。|Chúng ta phải phối hợp với nhau.
谢谢你的配合。|Cảm ơn sự phối hợp của bạn.
他们配合了十年。|Họ phối hợp với nhau mười năm.
#批评
老师批评了他。|Thầy phê bình cậu ấy.
我接受你的批评。|Tôi tiếp thu sự phê bình của bạn.
不要随便批评别人。|Đừng tùy tiện phê bình người khác.
他被经理批评了。|Anh ấy bị giám đốc phê bình.
批评也是一种帮助。|Phê bình cũng là một sự giúp đỡ.
#批准
经理批准了我的请假。|Giám đốc đã duyệt đơn nghỉ phép của tôi.
这个计划被批准了。|Kế hoạch này được phê duyệt.
没有批准不能进去。|Chưa được phép thì không được vào.
学校批准他出国。|Nhà trường cho phép anh ấy ra nước ngoài.
请等待批准。|Xin chờ phê duyệt.
#皮
苹果皮很有营养。|Vỏ táo rất bổ dưỡng.
这是真皮的。|Cái này là da thật.
他的皮肤很黑。|Da anh ấy rất đen.
吃香蕉要剥皮。|Ăn chuối phải bóc vỏ.
这个孩子太皮了。|Đứa trẻ này nghịch quá.
#皮包
这个皮包很贵。|Chiếc túi da này rất đắt.
她买了一个新皮包。|Cô ấy mua một chiếc túi da mới.
我的皮包丢了。|Túi da của tôi mất rồi.
皮包里有钱和手机。|Trong túi da có tiền và điện thoại.
这个皮包是真皮的。|Chiếc túi này là da thật.
#啤酒
我们喝点儿啤酒吧。|Chúng ta uống chút bia nhé.
来两瓶啤酒。|Cho hai chai bia.
夏天喝啤酒很舒服。|Mùa hè uống bia rất dễ chịu.
他不喝啤酒。|Anh ấy không uống bia.
这是越南的啤酒。|Đây là bia Việt Nam.
#票价
票价是多少？|Giá vé là bao nhiêu?
学生票价便宜一半。|Giá vé học sinh rẻ một nửa.
机票票价涨了。|Giá vé máy bay tăng rồi.
这里的票价不贵。|Giá vé ở đây không đắt.
票价包括午饭吗？|Giá vé có bao gồm bữa trưa không?
#评价
大家对他的评价很高。|Mọi người đánh giá anh ấy rất cao.
你怎么评价这部电影？|Bạn đánh giá bộ phim này thế nào?
请给我们一个评价。|Hãy cho chúng tôi một đánh giá.
这家饭馆的评价很好。|Nhà hàng này được đánh giá tốt.
老师评价了我们的作文。|Thầy nhận xét bài văn của chúng tôi.
#破
我的衣服破了。|Áo của tôi rách rồi.
杯子破了。|Cái cốc vỡ rồi.
他打破了纪录。|Anh ấy phá kỷ lục.
这双鞋破了个洞。|Đôi giày này thủng một lỗ.
手破了，流血了。|Tay bị trầy, chảy máu rồi.
#破坏
不要破坏环境。|Đừng phá hoại môi trường.
大风破坏了很多房子。|Gió lớn làm hư hại nhiều nhà.
他破坏了我们的计划。|Anh ấy phá hỏng kế hoạch của chúng tôi.
请不要破坏公共东西。|Xin đừng phá hoại của công.
这件事破坏了我们的关系。|Chuyện này làm rạn nứt quan hệ của chúng tôi.
#普遍
这种情况很普遍。|Tình trạng này rất phổ biến.
现在普遍用手机付钱。|Bây giờ phổ biến trả tiền bằng điện thoại.
大家普遍觉得很好。|Mọi người nhìn chung thấy rất tốt.
这是一个普遍的问题。|Đây là một vấn đề phổ biến.
年轻人普遍喜欢上网。|Người trẻ nhìn chung thích lên mạng.
#普及
手机已经普及了。|Điện thoại đã phổ cập rồi.
我们要普及科学知识。|Chúng ta phải phổ cập kiến thức khoa học.
网络在农村也普及了。|Internet cũng đã phổ biến ở nông thôn.
普及教育很重要。|Phổ cập giáo dục rất quan trọng.
汉语在越南越来越普及。|Tiếng Trung ở Việt Nam ngày càng phổ biến.
#期
这是第三期汉语班。|Đây là khóa tiếng Trung thứ ba.
杂志每月出一期。|Tạp chí mỗi tháng ra một số.
假期快结束了。|Kỳ nghỉ sắp hết rồi.
护照过期了。|Hộ chiếu hết hạn rồi.
这个学期我很忙。|Học kỳ này tôi rất bận.
#齐
人都到齐了吗？|Mọi người đến đủ chưa?
东西准备齐了。|Đồ đã chuẩn bị đủ rồi.
大家齐声说"谢谢"。|Mọi người đồng thanh nói "Cảm ơn".
书摆得很齐。|Sách xếp rất ngay ngắn.
我们齐心协力。|Chúng ta đồng lòng hiệp lực.
#其次
首先要有兴趣，其次要努力。|Trước tiên phải có hứng thú, thứ hai là phải cố gắng.
质量第一，价格其次。|Chất lượng là trên hết, giá cả xếp sau.
其次，我们要注意安全。|Tiếp theo, chúng ta phải chú ý an toàn.
钱是其次的。|Tiền là chuyện thứ yếu.
我最喜欢红色，其次是蓝色。|Tôi thích nhất màu đỏ, kế đến là xanh dương.
#奇怪
这个人很奇怪。|Người này rất lạ.
真奇怪，他怎么没来？|Lạ thật, sao anh ấy không đến?
我听到一个奇怪的声音。|Tôi nghe thấy một âm thanh lạ.
这件事一点儿也不奇怪。|Chuyện này chẳng có gì lạ.
大家都觉得很奇怪。|Mọi người đều thấy rất lạ.
#气候
这里的气候很好。|Khí hậu ở đây rất tốt.
越南是热带气候。|Việt Nam có khí hậu nhiệt đới.
我不习惯这里的气候。|Tôi không quen khí hậu ở đây.
气候变化很快。|Khí hậu thay đổi rất nhanh.
南方和北方的气候不同。|Khí hậu miền Nam và miền Bắc khác nhau.
#千万
你千万别忘了。|Bạn nhất định đừng quên.
千万要小心。|Nhất định phải cẩn thận.
千万不要告诉他。|Tuyệt đối đừng nói với anh ấy.
这个城市有一千万人。|Thành phố này có mười triệu người.
千万要记住我的话。|Nhất định phải nhớ lời tôi.
#前后
我前后去了三次。|Trước sau tôi đi ba lần.
春节前后人很多。|Trước và sau Tết rất đông người.
房子前后都有树。|Trước và sau nhà đều có cây.
他八点前后到。|Anh ấy đến khoảng tám giờ.
这件事前后用了一个月。|Việc này trước sau mất một tháng.
#前进
我们继续前进。|Chúng ta tiếp tục tiến lên.
向前进！|Tiến lên!
车慢慢地前进。|Xe chầm chậm tiến về phía trước.
不前进就会落后。|Không tiến thì sẽ lùi.
大家一起前进吧。|Mọi người cùng tiến lên nào.
#前面
前面有一家银行。|Phía trước có một ngân hàng.
请坐前面。|Mời ngồi phía trước.
他走在我前面。|Anh ấy đi trước tôi.
前面的路很长。|Con đường phía trước còn dài.
前面说的话你记住了吗？|Những gì nói lúc trước bạn nhớ chưa?
#前往
他明天前往北京。|Mai anh ấy đi Bắc Kinh.
请前往二号门登机。|Mời đến cửa số hai lên máy bay.
代表团前往越南访问。|Đoàn đại biểu đến thăm Việt Nam.
我们前往机场。|Chúng tôi đi ra sân bay.
前往上海的火车到了。|Chuyến tàu đi Thượng Hải đã đến.
#强
他的能力很强。|Năng lực của anh ấy rất mạnh.
今天风很强。|Hôm nay gió rất mạnh.
这个队很强。|Đội này rất mạnh.
他比我强。|Anh ấy giỏi hơn tôi.
她的个性很强。|Cá tính cô ấy rất mạnh.
#强大
这个国家很强大。|Đất nước này rất lớn mạnh.
我们的队越来越强大。|Đội chúng tôi ngày càng lớn mạnh.
他有强大的内心。|Anh ấy có nội tâm mạnh mẽ.
团结就是强大的力量。|Đoàn kết là sức mạnh lớn lao.
这台电脑功能很强大。|Máy tính này chức năng rất mạnh.
#强调
老师强调了这个问题。|Thầy nhấn mạnh vấn đề này.
我再强调一遍。|Tôi nhấn mạnh lại một lần nữa.
他强调安全最重要。|Anh ấy nhấn mạnh an toàn là quan trọng nhất.
医生强调要多休息。|Bác sĩ nhấn mạnh phải nghỉ ngơi nhiều.
这一点需要强调。|Điểm này cần nhấn mạnh.
#强烈
我强烈反对。|Tôi kịch liệt phản đối.
今天阳光很强烈。|Hôm nay nắng rất gắt.
他有强烈的愿望。|Anh ấy có mong muốn mãnh liệt.
大家反应很强烈。|Phản ứng của mọi người rất mạnh mẽ.
我强烈建议你去看看。|Tôi rất khuyên bạn nên đi xem.
#巧
真巧，我也在这儿。|Thật trùng hợp, tôi cũng ở đây.
她的手很巧。|Tay cô ấy rất khéo.
来得真巧！|Đến đúng lúc thật!
不巧，他刚走。|Không may, anh ấy vừa đi.
这件事太巧了。|Chuyện này trùng hợp quá.
#亲
他是我的亲哥哥。|Anh ấy là anh ruột của tôi.
孩子亲了妈妈一下。|Đứa bé hôn mẹ một cái.
我们像亲姐妹一样。|Chúng tôi như chị em ruột.
这是我亲手做的。|Cái này do tôi tự tay làm.
他们的关系很亲。|Quan hệ của họ rất thân.
#亲切
老师很亲切。|Thầy giáo rất thân thiện.
他亲切地跟我说话。|Anh ấy nói chuyện với tôi rất thân mật.
听到家乡话，我觉得很亲切。|Nghe giọng quê tôi thấy rất thân thương.
她的笑很亲切。|Nụ cười của cô ấy rất gần gũi.
这里让人感到亲切。|Nơi này khiến người ta thấy thân quen.
#亲人
春节要和亲人在一起。|Tết phải ở bên người thân.
他是我唯一的亲人。|Anh ấy là người thân duy nhất của tôi.
我很想念亲人。|Tôi rất nhớ người thân.
亲人们都来了。|Người thân đều đến cả.
朋友就像亲人一样。|Bạn bè như người thân vậy.
#亲自
经理亲自来了。|Giám đốc đích thân đến.
这件事我要亲自做。|Việc này tôi phải tự mình làm.
他亲自给我打了电话。|Anh ấy đích thân gọi điện cho tôi.
你应该亲自去看看。|Bạn nên tự mình đi xem.
老师亲自检查作业。|Thầy đích thân kiểm tra bài tập.
#情感
这首歌有很深的情感。|Bài hát này chứa đựng tình cảm sâu sắc.
他不会表达情感。|Anh ấy không biết bày tỏ tình cảm.
人有很多种情感。|Con người có nhiều loại cảm xúc.
她的情感很丰富。|Tình cảm của cô ấy rất phong phú.
情感比钱重要。|Tình cảm quan trọng hơn tiền.
#情况
现在情况怎么样？|Bây giờ tình hình thế nào?
请介绍一下情况。|Hãy giới thiệu tình hình.
情况越来越好了。|Tình hình ngày càng tốt.
如果有特殊情况，请告诉我。|Nếu có tình huống đặc biệt, hãy báo tôi.
我不了解情况。|Tôi không nắm tình hình.
#请教
我想请教您一个问题。|Tôi muốn thỉnh giáo ngài một câu hỏi.
有问题可以请教老师。|Có thắc mắc có thể hỏi thầy.
我向他请教了很多。|Tôi đã học hỏi anh ấy nhiều.
请教一下，这个字怎么读？|Cho tôi hỏi, chữ này đọc thế nào?
他常常向别人请教。|Anh ấy thường học hỏi người khác.
#球迷
他是一个老球迷。|Anh ấy là một cổ động viên lâu năm.
很多球迷来看比赛。|Nhiều cổ động viên đến xem trận đấu.
球迷们在大声叫。|Các cổ động viên đang hò hét.
我是这个队的球迷。|Tôi là fan của đội này.
球迷很失望。|Cổ động viên rất thất vọng.
#区
我住在海淀区。|Tôi sống ở quận Hải Điến.
这里是工业区。|Đây là khu công nghiệp.
请到吸烟区吸烟。|Hãy hút thuốc ở khu vực hút thuốc.
学校分东区和西区。|Trường chia khu đông và khu tây.
这个区很安静。|Khu này rất yên tĩnh.
#区别
这两个字有什么区别？|Hai chữ này có gì khác nhau?
我看不出区别。|Tôi không thấy sự khác biệt.
它们的区别很大。|Sự khác biệt giữa chúng rất lớn.
请区别对待。|Hãy đối xử phân biệt rõ ràng.
南北方的饮食有区别。|Ẩm thực miền Nam và miền Bắc có khác biệt.
#取消
会议取消了。|Cuộc họp bị hủy rồi.
因为下雨，比赛取消了。|Vì mưa, trận đấu bị hủy.
我想取消订单。|Tôi muốn hủy đơn hàng.
航班被取消了。|Chuyến bay bị hủy.
你可以免费取消。|Bạn có thể hủy miễn phí.
#去世
他爷爷去年去世了。|Ông của anh ấy mất năm ngoái.
这位作家已经去世了。|Nhà văn này đã qua đời.
听说他去世了，大家都很难过。|Nghe tin ông ấy mất, mọi người đều rất buồn.
她的父亲很早就去世了。|Cha cô ấy mất từ sớm.
他去世的时候九十岁。|Ông ấy qua đời lúc chín mươi tuổi.
#全场
全场观众都站起来了。|Toàn bộ khán giả đều đứng dậy.
全场打八折。|Toàn bộ cửa hàng giảm hai mươi phần trăm.
他是全场最高的人。|Anh ấy là người cao nhất cả khán phòng.
全场安静下来了。|Cả khán phòng im lặng.
全场响起了掌声。|Cả hội trường vang lên tiếng vỗ tay.
#全面
我们要全面了解情况。|Chúng ta phải nắm toàn diện tình hình.
他的发展很全面。|Anh ấy phát triển rất toàn diện.
这个计划很全面。|Kế hoạch này rất toàn diện.
请全面检查一下身体。|Hãy kiểm tra sức khỏe toàn diện.
学习要全面。|Học tập phải toàn diện.
#全球
全球有八十亿人。|Toàn cầu có tám tỷ người.
这个公司在全球都有。|Công ty này có mặt toàn cầu.
全球的天气越来越热。|Thời tiết toàn cầu ngày càng nóng.
这首歌全球有名。|Bài hát này nổi tiếng toàn cầu.
他去过全球很多地方。|Anh ấy đã đến nhiều nơi trên thế giới.
#缺
我们缺一个人。|Chúng ta thiếu một người.
这本书缺了一页。|Cuốn sách này thiếu một trang.
他什么都不缺。|Anh ấy không thiếu thứ gì.
这里缺水。|Ở đây thiếu nước.
缺什么就买什么。|Thiếu gì thì mua nấy.
#缺少
他缺少经验。|Anh ấy thiếu kinh nghiệm.
植物不能缺少水。|Cây không thể thiếu nước.
我们缺少时间。|Chúng ta thiếu thời gian.
这个菜缺少一点儿盐。|Món này thiếu chút muối.
朋友是生活中不可缺少的。|Bạn bè là không thể thiếu trong cuộc sống.
#确保
我们要确保安全。|Chúng ta phải đảm bảo an toàn.
请确保门关好了。|Hãy đảm bảo cửa đã đóng kỹ.
确保每个人都知道。|Đảm bảo mọi người đều biết.
我确保明天完成。|Tôi đảm bảo mai hoàn thành.
确保质量是第一位的。|Đảm bảo chất lượng là ưu tiên hàng đầu.
#确实
他确实很努力。|Anh ấy quả thật rất chăm chỉ.
这件事确实是真的。|Việc này đúng là thật.
我确实不知道。|Tôi thực sự không biết.
这个地方确实很美。|Nơi này quả thật rất đẹp.
你说得确实有道理。|Bạn nói quả thật có lý.
#裙子
她穿了一条红裙子。|Cô ấy mặc một chiếc váy đỏ.
这条裙子很漂亮。|Chiếc váy này rất đẹp.
我想买一条裙子。|Tôi muốn mua một chiếc váy.
夏天女孩子喜欢穿裙子。|Mùa hè con gái thích mặc váy.
这条裙子太长了。|Chiếc váy này dài quá.
#群
一群孩子在玩儿。|Một đám trẻ đang chơi.
天上飞过一群鸟。|Một đàn chim bay qua trên trời.
我们建了一个微信群。|Chúng tôi lập một nhóm WeChat.
羊群在山上吃草。|Đàn cừu ăn cỏ trên núi.
他在人群里找朋友。|Anh ấy tìm bạn trong đám đông.
#热爱
我热爱我的工作。|Tôi yêu công việc của mình.
他热爱运动。|Anh ấy rất yêu thể thao.
我们热爱和平。|Chúng ta yêu hòa bình.
她热爱音乐。|Cô ấy say mê âm nhạc.
热爱生活的人很快乐。|Người yêu cuộc sống rất vui vẻ.
#热烈
大家热烈欢迎他。|Mọi người nhiệt liệt chào đón anh ấy.
讨论很热烈。|Cuộc thảo luận rất sôi nổi.
观众热烈鼓掌。|Khán giả vỗ tay nhiệt liệt.
热烈欢迎新同学！|Nhiệt liệt chào mừng các bạn mới!
会上气氛很热烈。|Bầu không khí cuộc họp rất sôi nổi.
#人才
公司需要人才。|Công ty cần nhân tài.
他是一个难得的人才。|Anh ấy là một nhân tài hiếm có.
我们要培养人才。|Chúng ta phải đào tạo nhân tài.
这里人才很多。|Ở đây có nhiều nhân tài.
国家发展靠人才。|Phát triển đất nước dựa vào nhân tài.
#人工
这是人工湖。|Đây là hồ nhân tạo.
人工智能发展很快。|Trí tuệ nhân tạo phát triển rất nhanh.
这些花是人工的。|Những bông hoa này là hoa giả.
人工费很贵。|Tiền công rất đắt.
请转人工服务。|Xin chuyển sang nhân viên tư vấn.
#人类
人类需要保护地球。|Loài người cần bảo vệ trái đất.
人类的历史很长。|Lịch sử loài người rất dài.
水对人类很重要。|Nước rất quan trọng với loài người.
这是人类的伟大发明。|Đây là phát minh vĩ đại của loài người.
狗是人类的朋友。|Chó là bạn của con người.
#人民
人民的生活越来越好。|Đời sống nhân dân ngày càng tốt.
为人民服务。|Phục vụ nhân dân.
越南人民很友好。|Nhân dân Việt Nam rất thân thiện.
人民是国家的主人。|Nhân dân là chủ đất nước.
两国人民是好朋友。|Nhân dân hai nước là bạn tốt.
#人民币
这个多少人民币？|Cái này bao nhiêu nhân dân tệ?
我想换人民币。|Tôi muốn đổi nhân dân tệ.
一百块人民币可以换多少越南盾？|Một trăm tệ đổi được bao nhiêu đồng Việt Nam?
我带了一些人民币。|Tôi mang theo ít nhân dân tệ.
这里可以用人民币吗？|Ở đây dùng được nhân dân tệ không?
#人群
人群中有我的朋友。|Trong đám đông có bạn tôi.
人群慢慢散了。|Đám đông dần giải tán.
他不喜欢人群。|Anh ấy không thích chỗ đông người.
广场上人群很多。|Trên quảng trường rất đông người.
孩子在人群中走丢了。|Đứa bé bị lạc trong đám đông.
#人生
人生很短。|Đời người rất ngắn.
这是我人生中最重要的一天。|Đây là ngày quan trọng nhất trong đời tôi.
人生有很多选择。|Đời người có nhiều lựa chọn.
享受人生吧。|Hãy tận hưởng cuộc sống.
他的人生很精彩。|Cuộc đời anh ấy rất muôn màu.
#人员
工作人员在门口。|Nhân viên làm việc ở cửa.
公司需要更多人员。|Công ty cần thêm nhân sự.
所有人员请注意。|Toàn thể nhân viên xin chú ý.
他是管理人员。|Anh ấy là nhân viên quản lý.
无关人员不能进去。|Người không phận sự không được vào.
#认出
我一眼就认出了他。|Tôi nhận ra anh ấy ngay.
你认出我了吗？|Bạn nhận ra tôi chưa?
他变化太大，我没认出来。|Anh ấy thay đổi nhiều quá, tôi không nhận ra.
我认出了这个字。|Tôi nhận ra chữ này.
妈妈从声音认出了我。|Mẹ nhận ra tôi qua giọng nói.
#认得
你认得这个字吗？|Bạn có biết chữ này không?
我认得他，他是我的同学。|Tôi biết anh ấy, anh ấy là bạn học của tôi.
你还认得路吗？|Bạn còn nhớ đường không?
我不认得这个人。|Tôi không quen người này.
奶奶认得很多字。|Bà biết rất nhiều chữ.
#认可
他的能力得到了认可。|Năng lực của anh ấy được công nhận.
老板认可了我的计划。|Ông chủ đã chấp thuận kế hoạch của tôi.
这个证书大家都认可。|Chứng chỉ này ai cũng công nhận.
我希望得到父母的认可。|Tôi mong được bố mẹ công nhận.
这个方法被大家认可了。|Phương pháp này được mọi người công nhận.
#任
他任经理三年了。|Anh ấy làm giám đốc ba năm rồi.
他是新任校长。|Ông ấy là hiệu trưởng mới nhậm chức.
任你选。|Tùy bạn chọn.
任他怎么说，我都不信。|Mặc anh ấy nói gì, tôi cũng không tin.
任何人都可以参加。|Bất kỳ ai cũng có thể tham gia.
#任何
任何人都不能进去。|Bất kỳ ai cũng không được vào.
有任何问题请问我。|Có bất kỳ thắc mắc nào xin hỏi tôi.
我没有任何意见。|Tôi không có ý kiến gì.
任何时候都可以来。|Bất cứ lúc nào cũng có thể đến.
他不怕任何困难。|Anh ấy không sợ bất kỳ khó khăn nào.
#仍
他仍在学习。|Anh ấy vẫn đang học.
雨仍下个不停。|Mưa vẫn rơi không ngừng.
问题仍没有解决。|Vấn đề vẫn chưa giải quyết.
他仍住在老地方。|Anh ấy vẫn sống ở chỗ cũ.
我仍记得那一天。|Tôi vẫn nhớ ngày hôm đó.
#仍然
他仍然很年轻。|Anh ấy vẫn còn rất trẻ.
我仍然不明白。|Tôi vẫn không hiểu.
十年过去了，他仍然住在这里。|Mười năm trôi qua, anh ấy vẫn sống ở đây.
天黑了，他仍然在工作。|Trời tối rồi, anh ấy vẫn đang làm việc.
她仍然爱着他。|Cô ấy vẫn yêu anh ấy.
#日常
这是我的日常生活。|Đây là cuộc sống thường ngày của tôi.
学一些日常用语。|Học vài câu giao tiếp hằng ngày.
跑步是我的日常活动。|Chạy bộ là hoạt động hằng ngày của tôi.
日常用品在超市买。|Đồ dùng hằng ngày mua ở siêu thị.
他负责日常管理。|Anh ấy phụ trách quản lý thường nhật.
#如何
如何学好汉语？|Làm thế nào để học giỏi tiếng Trung?
你觉得如何？|Bạn thấy thế nào?
我不知道如何回答。|Tôi không biết trả lời thế nào.
最近工作如何？|Dạo này công việc thế nào?
如何去火车站？|Đi ga tàu thế nào?
#沙发
请坐沙发。|Mời ngồi ghế sofa.
沙发很舒服。|Ghế sofa rất êm.
我们买了一个新沙发。|Chúng tôi mua một bộ sofa mới.
他在沙发上睡着了。|Anh ấy ngủ quên trên sofa.
猫喜欢躺在沙发上。|Mèo thích nằm trên sofa.
#沙子
鞋里进沙子了。|Trong giày vào cát rồi.
孩子们在海边玩儿沙子。|Bọn trẻ chơi cát ở bờ biển.
这里的沙子很白。|Cát ở đây rất trắng.
风把沙子吹进了眼睛。|Gió thổi cát vào mắt.
盖房子要用沙子。|Xây nhà phải dùng cát.
#伤
他的伤好了吗？|Vết thương của anh ấy khỏi chưa?
他打球伤了腿。|Anh ấy chơi bóng bị thương ở chân.
这句话伤了她的心。|Câu nói này làm cô ấy đau lòng.
伤不重，别担心。|Vết thương không nặng, đừng lo.
手上有一个伤口。|Trên tay có một vết thương.
#伤心
她很伤心。|Cô ấy rất đau lòng.
别伤心了。|Đừng buồn nữa.
听到这个消息，他很伤心。|Nghe tin này anh ấy rất đau lòng.
我不想让你伤心。|Tôi không muốn làm bạn buồn.
她伤心地哭了。|Cô ấy khóc đau khổ.
#商品
这里的商品很多。|Hàng hóa ở đây rất nhiều.
商品价格上涨了。|Giá hàng hóa tăng rồi.
这些商品打折。|Những mặt hàng này giảm giá.
新商品到了。|Hàng mới về rồi.
网上的商品很便宜。|Hàng trên mạng rất rẻ.
#商业
这里是商业中心。|Đây là trung tâm thương mại.
他学的是商业管理。|Anh ấy học quản trị kinh doanh.
这条街商业很发达。|Thương mại trên phố này rất phát triển.
这是商业秘密。|Đây là bí mật kinh doanh.
商业活动很多。|Hoạt động thương mại rất nhiều.
#上面
书在桌子上面。|Sách ở trên bàn.
上面写着什么？|Trên đó viết gì?
请看上面的图。|Hãy xem hình phía trên.
他住在我上面。|Anh ấy sống ở tầng trên tôi.
上面的问题都很简单。|Các câu hỏi bên trên đều đơn giản.
#上去
你先上去吧。|Bạn lên trước đi.
山很高，我上不去。|Núi cao quá, tôi không lên được.
把箱子搬上去。|Khiêng cái thùng lên.
他走上去跟老师说话。|Anh ấy bước lên nói chuyện với thầy.
成绩提高上去了。|Thành tích đã nâng lên.
#上升
气温上升了。|Nhiệt độ tăng lên rồi.
价格不断上升。|Giá cả không ngừng tăng.
他的成绩上升得很快。|Thành tích của cậu ấy tăng rất nhanh.
飞机在上升。|Máy bay đang lên cao.
学生人数上升了。|Số học sinh đã tăng.
#上衣
这件上衣很漂亮。|Chiếc áo này rất đẹp.
他穿着蓝色的上衣。|Anh ấy mặc áo màu xanh.
我买了一件上衣。|Tôi mua một chiếc áo.
上衣和裤子颜色不配。|Áo và quần màu không hợp.
天冷了，多穿一件上衣。|Trời lạnh, mặc thêm một chiếc áo.
#设备
这些设备很新。|Những thiết bị này rất mới.
医院买了新设备。|Bệnh viện mua thiết bị mới.
设备坏了，要修理。|Thiết bị hỏng, phải sửa.
这个教室的设备很好。|Thiết bị phòng học này rất tốt.
请检查一下设备。|Hãy kiểm tra thiết bị.
#设计
这件衣服是她设计的。|Chiếc áo này do cô ấy thiết kế.
他是设计师。|Anh ấy là nhà thiết kế.
这个房子设计得很好。|Ngôi nhà này thiết kế rất đẹp.
我喜欢这个设计。|Tôi thích thiết kế này.
请帮我设计一个标志。|Hãy thiết kế giúp tôi một logo.
#设立
学校设立了奖学金。|Trường lập ra học bổng.
公司在越南设立了分公司。|Công ty thành lập chi nhánh ở Việt Nam.
这里设立了一个服务中心。|Ở đây lập một trung tâm dịch vụ.
他们设立了一个新部门。|Họ lập một bộ phận mới.
这个奖是去年设立的。|Giải thưởng này lập ra năm ngoái.
#社会
社会发展很快。|Xã hội phát triển rất nhanh.
他刚进入社会。|Anh ấy vừa bước vào xã hội.
这是一个社会问题。|Đây là một vấn đề xã hội.
我们要为社会做贡献。|Chúng ta phải cống hiến cho xã hội.
现代社会离不开手机。|Xã hội hiện đại không thể thiếu điện thoại.
#身份证
请出示身份证。|Xin xuất trình chứng minh thư.
我的身份证丢了。|Chứng minh thư của tôi mất rồi.
买火车票要用身份证。|Mua vé tàu phải dùng chứng minh thư.
办身份证要多长时间？|Làm chứng minh thư mất bao lâu?
别忘了带身份证。|Đừng quên mang chứng minh thư.
#深刻
这本书让我印象深刻。|Cuốn sách này để lại ấn tượng sâu sắc cho tôi.
他的话很深刻。|Lời anh ấy rất sâu sắc.
我深刻地认识到了错误。|Tôi nhận ra sai lầm một cách sâu sắc.
这件事给我很深刻的教训。|Việc này cho tôi bài học sâu sắc.
这部电影的意义很深刻。|Ý nghĩa bộ phim này rất sâu sắc.
#深入
我们要深入了解问题。|Chúng ta phải tìm hiểu sâu vấn đề.
他深入农村调查。|Anh ấy đi sâu xuống nông thôn điều tra.
这个话题需要深入讨论。|Chủ đề này cần thảo luận sâu.
他对历史研究得很深入。|Anh ấy nghiên cứu lịch sử rất sâu.
请深入思考一下。|Hãy suy nghĩ sâu hơn.
#升
太阳升起来了。|Mặt trời lên rồi.
他升经理了。|Anh ấy được lên giám đốc.
我升到三年级了。|Tôi lên lớp ba rồi.
气温升到三十五度。|Nhiệt độ lên tới ba mươi lăm độ.
飞机慢慢升高了。|Máy bay từ từ bay cao.
#生产
这个工厂生产手机。|Nhà máy này sản xuất điện thoại.
生产速度很快。|Tốc độ sản xuất rất nhanh.
这是越南生产的。|Cái này sản xuất ở Việt Nam.
今年生产了很多大米。|Năm nay sản xuất được nhiều gạo.
生产要注意安全。|Sản xuất phải chú ý an toàn.
#生存
动物需要水才能生存。|Động vật cần nước mới sinh tồn được.
在这里生存很难。|Sinh tồn ở đây rất khó.
人要学会生存。|Con người phải học cách sinh tồn.
这种鱼能在冷水里生存。|Loài cá này có thể sống trong nước lạnh.
公司为了生存要改变。|Công ty phải thay đổi để tồn tại.
#生动
他讲得很生动。|Anh ấy kể rất sinh động.
这个故事很生动。|Câu chuyện này rất sinh động.
老师的课很生动。|Giờ học của thầy rất sinh động.
这幅画很生动。|Bức tranh này rất sống động.
请举一个生动的例子。|Hãy đưa một ví dụ sinh động.
#生命
生命很宝贵。|Sinh mệnh rất quý giá.
医生救了他的生命。|Bác sĩ cứu sống anh ấy.
水是生命之源。|Nước là nguồn sống.
每个生命都很重要。|Mỗi sinh mệnh đều quan trọng.
生命在于运动。|Sự sống nằm ở vận động.
#生意
最近生意怎么样？|Dạo này làm ăn thế nào?
他在做生意。|Anh ấy đang kinh doanh.
这家店生意很好。|Cửa hàng này buôn bán rất đắt.
做生意要讲信用。|Làm ăn phải giữ chữ tín.
他和中国人做生意。|Anh ấy buôn bán với người Trung Quốc.
#生长
植物需要阳光生长。|Thực vật cần ánh nắng để sinh trưởng.
这里的树生长得很快。|Cây ở đây lớn rất nhanh.
孩子在健康地生长。|Đứa trẻ đang lớn lên khỏe mạnh.
我生长在农村。|Tôi sinh ra và lớn lên ở nông thôn.
这种花在南方生长。|Loài hoa này mọc ở phương Nam.
#声明
公司发表了声明。|Công ty đã ra tuyên bố.
他声明自己没有错。|Anh ấy tuyên bố mình không sai.
这是一份正式声明。|Đây là một bản tuyên bố chính thức.
我要声明一下。|Tôi xin nói rõ một chút.
政府发出了声明。|Chính phủ đưa ra tuyên bố.
#胜
我们队胜了。|Đội chúng tôi thắng rồi.
这场比赛谁胜了？|Trận này ai thắng?
他以三比一胜了对手。|Anh ấy thắng đối thủ ba một.
事实胜于雄辩。|Sự thật hơn mọi lời biện luận.
我们一定能胜。|Chúng ta nhất định thắng.
#胜利
我们取得了胜利。|Chúng tôi đã giành thắng lợi.
胜利属于我们。|Chiến thắng thuộc về chúng ta.
大家为胜利欢呼。|Mọi người reo hò mừng chiến thắng.
胜利来得很不容易。|Thắng lợi đến không hề dễ.
祝你们胜利！|Chúc các bạn thắng lợi!
#失去
他失去了工作。|Anh ấy mất việc.
我不想失去你。|Tôi không muốn mất bạn.
别失去信心。|Đừng mất niềm tin.
他失去了联系。|Anh ấy bị mất liên lạc.
失去了才知道珍惜。|Mất đi rồi mới biết trân trọng.
#石头
路上有一块大石头。|Trên đường có một tảng đá lớn.
这座桥是石头做的。|Cây cầu này làm bằng đá.
孩子往河里扔石头。|Đứa trẻ ném đá xuống sông.
这块石头很重。|Hòn đá này rất nặng.
他心里像压了一块石头。|Trong lòng anh ấy như đè một tảng đá.
#石油
这个国家有很多石油。|Đất nước này có nhiều dầu mỏ.
石油价格上涨了。|Giá dầu mỏ tăng rồi.
他在石油公司工作。|Anh ấy làm ở công ty dầu khí.
石油很重要。|Dầu mỏ rất quan trọng.
汽车需要石油。|Ô tô cần dầu mỏ.
#时
上课时不要说话。|Trong giờ học đừng nói chuyện.
他到时，我已经走了。|Khi anh ấy đến, tôi đã đi rồi.
小时候我很胖。|Hồi nhỏ tôi rất béo.
吃饭时别看手机。|Khi ăn cơm đừng xem điện thoại.
这时他才来。|Lúc này anh ấy mới đến.
#时代
时代变了。|Thời đại đã thay đổi.
这是一个新时代。|Đây là một thời đại mới.
我们要跟上时代。|Chúng ta phải theo kịp thời đại.
学生时代很快乐。|Thời học sinh rất vui.
网络时代信息很多。|Thời đại internet có nhiều thông tin.
#时刻
这是最重要的时刻。|Đây là thời khắc quan trọng nhất.
我时刻想着你。|Tôi luôn nghĩ về bạn.
要时刻注意安全。|Phải luôn chú ý an toàn.
请看火车时刻表。|Hãy xem lịch tàu chạy.
那个时刻我很紧张。|Lúc đó tôi rất hồi hộp.
#实际上
实际上我不喜欢他。|Thực tế là tôi không thích anh ấy.
看起来很难，实际上很简单。|Trông thì khó, thực ra rất đơn giản.
实际上他已经走了。|Thực tế là anh ấy đã đi rồi.
实际上价格不贵。|Thực ra giá không đắt.
他说没事，实际上很担心。|Anh ấy nói không sao, thực ra rất lo.
#实力
他的实力很强。|Thực lực của anh ấy rất mạnh.
我们要提高实力。|Chúng ta phải nâng cao thực lực.
这个队很有实力。|Đội này rất có thực lực.
用实力说话。|Dùng thực lực để chứng minh.
两个队实力差不多。|Thực lực hai đội ngang nhau.
#实行
学校实行新规定。|Trường thực hiện quy định mới.
这个计划已经实行了。|Kế hoạch này đã được thực hiện.
公司实行五天工作制。|Công ty áp dụng chế độ làm việc năm ngày.
这个办法很难实行。|Cách này rất khó thực hiện.
从下个月开始实行。|Bắt đầu thực hiện từ tháng sau.
#实验
我们在做实验。|Chúng tôi đang làm thí nghiệm.
实验成功了。|Thí nghiệm thành công rồi.
这个实验很危险。|Thí nghiệm này rất nguy hiểm.
实验结果怎么样？|Kết quả thí nghiệm thế nào?
他做了很多次实验。|Anh ấy làm thí nghiệm nhiều lần.
#实验室
他在实验室工作。|Anh ấy làm việc trong phòng thí nghiệm.
实验室在三楼。|Phòng thí nghiệm ở tầng ba.
实验室里不能吃东西。|Trong phòng thí nghiệm không được ăn uống.
这个实验室设备很好。|Phòng thí nghiệm này thiết bị rất tốt.
学生们去实验室上课。|Học sinh đến phòng thí nghiệm học.
#食品
这些食品很健康。|Những thực phẩm này rất lành mạnh.
食品安全很重要。|An toàn thực phẩm rất quan trọng.
超市里有很多食品。|Trong siêu thị có nhiều thực phẩm.
他在食品公司工作。|Anh ấy làm ở công ty thực phẩm.
少吃快餐食品。|Ăn ít đồ ăn nhanh.
#使
这件事使我很高兴。|Việc này khiến tôi rất vui.
运动使人健康。|Vận động làm con người khỏe mạnh.
他的话使大家都笑了。|Lời anh ấy khiến mọi người đều cười.
音乐使我放松。|Âm nhạc giúp tôi thư giãn.
这个消息使他很伤心。|Tin này làm anh ấy rất đau lòng.
#始终
他始终没有说话。|Anh ấy từ đầu đến cuối không nói gì.
我始终相信你。|Tôi luôn tin bạn.
她始终很努力。|Cô ấy trước sau vẫn rất chăm chỉ.
这个问题始终没有解决。|Vấn đề này mãi vẫn chưa giải quyết.
我们始终是好朋友。|Chúng ta mãi là bạn tốt.
#世纪
现在是二十一世纪。|Bây giờ là thế kỷ hai mươi mốt.
这座楼有一个世纪了。|Tòa nhà này đã có một thế kỷ.
上个世纪没有手机。|Thế kỷ trước không có điện thoại.
这是十九世纪的画儿。|Đây là bức tranh thế kỷ mười chín.
新世纪有新的挑战。|Thế kỷ mới có thử thách mới.
#世界杯
你看世界杯吗？|Bạn có xem World Cup không?
世界杯四年一次。|World Cup bốn năm một lần.
这次世界杯谁赢了？|World Cup lần này ai thắng?
世界杯的时候大家都很兴奋。|Mùa World Cup mọi người đều rất hào hứng.
他梦想参加世界杯。|Anh ấy mơ được tham dự World Cup.
#事故
路上发生了交通事故。|Trên đường xảy ra tai nạn giao thông.
事故的原因还不清楚。|Nguyên nhân tai nạn vẫn chưa rõ.
开车小心，别出事故。|Lái xe cẩn thận, đừng để gặp tai nạn.
这次事故很严重。|Vụ tai nạn này rất nghiêm trọng.
幸好事故中没有人受伤。|May là trong tai nạn không ai bị thương.
#事件
这是一个重要事件。|Đây là một sự kiện quan trọng.
这个事件引起了大家关注。|Sự kiện này thu hút sự chú ý của mọi người.
新闻报道了这个事件。|Tin tức đã đưa tin sự kiện này.
事件的经过是这样的。|Diễn biến sự kiện là như thế này.
历史上有很多大事件。|Lịch sử có nhiều sự kiện lớn.
#事实
这是事实。|Đây là sự thật.
请说出事实。|Hãy nói ra sự thật.
事实不是这样的。|Sự thật không phải như vậy.
我们要尊重事实。|Chúng ta phải tôn trọng sự thật.
事实证明他是对的。|Sự thật chứng minh anh ấy đúng.
#事实上
事实上他不知道。|Trên thực tế anh ấy không biết.
事实上这个问题很简单。|Thực ra vấn đề này rất đơn giản.
大家以为他很有钱，事实上他很穷。|Mọi người tưởng anh ấy giàu, thực tế anh ấy rất nghèo.
事实上我早就来了。|Thực ra tôi đến từ lâu rồi.
事实上，她是我的姐姐。|Thực ra cô ấy là chị gái tôi.
#事业
他的事业很成功。|Sự nghiệp của anh ấy rất thành công.
教育是我的事业。|Giáo dục là sự nghiệp của tôi.
她很重视事业。|Cô ấy rất coi trọng sự nghiệp.
家庭和事业都重要。|Gia đình và sự nghiệp đều quan trọng.
他为事业努力了很多年。|Anh ấy nỗ lực vì sự nghiệp nhiều năm.
#试题
这次的试题很难。|Đề thi lần này rất khó.
老师在出试题。|Thầy đang ra đề thi.
请认真看试题。|Hãy đọc kỹ đề thi.
这些试题我都做过。|Những đề thi này tôi đều làm rồi.
网上有很多HSK试题。|Trên mạng có nhiều đề thi HSK.
#试验
我们做了一个试验。|Chúng tôi làm một thử nghiệm.
新药在试验中。|Thuốc mới đang thử nghiệm.
试验成功了。|Thử nghiệm thành công.
先试验一下再说。|Thử nghiệm trước rồi tính.
这次试验很重要。|Cuộc thử nghiệm lần này rất quan trọng.
#室
我在办公室。|Tôi ở văn phòng.
会议室在哪儿？|Phòng họp ở đâu?
这是两室一厅的房子。|Đây là căn nhà hai phòng ngủ một phòng khách.
教室里有很多学生。|Trong lớp học có nhiều học sinh.
室内很暖和。|Trong nhà rất ấm.
#适应
我已经适应了这里的生活。|Tôi đã thích nghi với cuộc sống ở đây.
他不适应这里的天气。|Anh ấy không quen thời tiết ở đây.
适应新环境需要时间。|Thích nghi với môi trường mới cần thời gian.
孩子很快就适应了。|Đứa trẻ nhanh chóng thích nghi.
你适应新工作了吗？|Bạn đã quen công việc mới chưa?
#适用
这个方法适用于每个人。|Phương pháp này phù hợp với mọi người.
这本书适用于初学者。|Cuốn sách này dành cho người mới học.
这个规定不适用于你。|Quy định này không áp dụng cho bạn.
这种药适用于大人。|Loại thuốc này dùng cho người lớn.
这个软件很适用。|Phần mềm này rất thiết thực.
#收费
这里停车收费吗？|Đỗ xe ở đây có thu phí không?
博物馆不收费。|Bảo tàng không thu phí.
收费太高了。|Thu phí cao quá.
这个服务怎么收费？|Dịch vụ này thu phí thế nào?
高速公路收费站在前面。|Trạm thu phí đường cao tốc ở phía trước.
#收看
欢迎收看今天的节目。|Chào mừng quý vị theo dõi chương trình hôm nay.
很多人收看了比赛。|Nhiều người xem trận đấu.
我每天收看新闻。|Ngày nào tôi cũng xem tin tức.
谢谢大家的收看。|Cảm ơn mọi người đã theo dõi.
晚上八点请准时收看。|Mời đón xem đúng tám giờ tối.
#收听
欢迎收听我们的节目。|Chào mừng quý vị nghe chương trình của chúng tôi.
我每天早上收听广播。|Sáng nào tôi cũng nghe đài.
谢谢您的收听。|Cảm ơn quý vị đã lắng nghe.
在手机上也可以收听。|Trên điện thoại cũng có thể nghe.
收听的人很多。|Người nghe rất đông.
#收音机
爷爷每天听收音机。|Ông ngày nào cũng nghe radio.
这台收音机很老了。|Chiếc radio này rất cũ rồi.
收音机里在放音乐。|Trong radio đang phát nhạc.
请把收音机打开。|Hãy bật radio lên.
现在很少有人用收音机了。|Bây giờ ít người dùng radio.
#手续
办手续要带护照。|Làm thủ tục phải mang hộ chiếu.
手续很麻烦。|Thủ tục rất phiền phức.
我在办入学手续。|Tôi đang làm thủ tục nhập học.
手续办好了吗？|Thủ tục làm xong chưa?
请先办理登机手续。|Xin làm thủ tục lên máy bay trước.
#手指
我的手指受伤了。|Ngón tay tôi bị thương.
他的手指很长。|Ngón tay anh ấy rất dài.
请用手指一下。|Hãy dùng ngón tay chỉ một chút.
一只手有五个手指。|Một bàn tay có năm ngón.
弹钢琴要用十个手指。|Chơi piano phải dùng mười ngón tay.
#受
他受到了表扬。|Anh ấy được khen ngợi.
这个节目很受欢迎。|Chương trình này rất được yêu thích.
我受不了这么热的天气。|Tôi không chịu nổi thời tiết nóng như vậy.
他受了很多苦。|Anh ấy chịu nhiều khổ cực.
受他的影响，我也开始学汉语。|Chịu ảnh hưởng của anh ấy, tôi cũng bắt đầu học tiếng Trung.
#受伤
他踢球受伤了。|Anh ấy đá bóng bị thương.
你受伤了吗？|Bạn có bị thương không?
有两个人受伤。|Có hai người bị thương.
小心别受伤。|Cẩn thận đừng bị thương.
她的手受伤了。|Tay cô ấy bị thương.
#输
我们队输了。|Đội chúng tôi thua rồi.
他从来不认输。|Anh ấy chưa bao giờ chịu thua.
这场比赛我输了。|Trận này tôi thua.
输了也没关系。|Thua cũng không sao.
请输密码。|Hãy nhập mật khẩu.
#输入
请输入你的名字。|Hãy nhập tên của bạn.
密码输入错了。|Nhập sai mật khẩu rồi.
我用拼音输入汉字。|Tôi dùng pinyin để gõ chữ Hán.
输入以后按确定。|Nhập xong bấm xác nhận.
这个手机输入很方便。|Điện thoại này nhập liệu rất tiện.
#熟人
他是我的熟人。|Anh ấy là người quen của tôi.
在这里我没有熟人。|Ở đây tôi không có người quen.
遇到熟人要打招呼。|Gặp người quen phải chào hỏi.
找熟人帮忙比较方便。|Nhờ người quen giúp khá tiện.
我们是老熟人了。|Chúng tôi là người quen cũ rồi.
#属
你属什么？|Bạn tuổi con gì?
我属狗。|Tôi tuổi Tuất.
这些书属于学校。|Những cuốn sách này thuộc về trường.
他属于这个小组。|Anh ấy thuộc nhóm này.
这个城市属于广东省。|Thành phố này thuộc tỉnh Quảng Đông.
#属于
这本书属于我。|Cuốn sách này thuộc về tôi.
成功属于努力的人。|Thành công thuộc về người nỗ lực.
这个问题属于哪一类？|Vấn đề này thuộc loại nào?
未来属于年轻人。|Tương lai thuộc về người trẻ.
这里属于城市中心。|Nơi đây thuộc trung tâm thành phố.
#束
我送了她一束花。|Tôi tặng cô ấy một bó hoa.
这束花很香。|Bó hoa này rất thơm.
一束光照进了房间。|Một chùm ánh sáng chiếu vào phòng.
他手里拿着一束玫瑰。|Anh ấy cầm một bó hoa hồng.
请帮我包一束花。|Hãy gói giúp tôi một bó hoa.
#数量
学生的数量增加了。|Số lượng học sinh đã tăng.
数量不够。|Số lượng không đủ.
质量比数量重要。|Chất lượng quan trọng hơn số lượng.
请写出数量。|Hãy ghi số lượng.
游客的数量越来越多。|Số lượng du khách ngày càng nhiều.
#双
我买了一双鞋。|Tôi mua một đôi giày.
请给我一双筷子。|Cho tôi một đôi đũa.
她有一双大眼睛。|Cô ấy có đôi mắt to.
这是双人房间。|Đây là phòng đôi.
我想要一双手套。|Tôi muốn một đôi găng tay.
#双方
双方都同意了。|Hai bên đều đồng ý.
双方的意见不同。|Ý kiến hai bên khác nhau.
比赛双方都很强。|Hai đội thi đấu đều rất mạnh.
这对双方都有好处。|Việc này có lợi cho cả hai bên.
双方握了手。|Hai bên bắt tay nhau.
#思想
他的思想很新。|Tư tưởng của anh ấy rất mới.
每个人都有自己的思想。|Mỗi người đều có suy nghĩ riêng.
这本书的思想很深刻。|Tư tưởng cuốn sách này rất sâu sắc.
他思想很开放。|Tư tưởng anh ấy rất cởi mở.
我们要交流思想。|Chúng ta phải trao đổi tư tưởng.
#死
花死了。|Hoa chết rồi.
我饿死了。|Tôi đói chết đi được.
今天热死了。|Hôm nay nóng chết mất.
这条鱼已经死了。|Con cá này chết rồi.
笑死我了！|Cười chết mất!
#速度
他的速度很快。|Tốc độ của anh ấy rất nhanh.
请放慢速度。|Hãy giảm tốc độ.
网速度太慢了。|Tốc độ mạng chậm quá.
火车的速度是多少？|Tốc độ của tàu là bao nhiêu?
我们要加快速度。|Chúng ta phải tăng tốc độ.
#随
你随我来。|Bạn đi theo tôi.
随你的便。|Tùy bạn.
天气随时会变。|Thời tiết có thể thay đổi bất cứ lúc nào.
他随手关了灯。|Anh ấy tiện tay tắt đèn.
你随时可以来找我。|Bạn có thể đến tìm tôi bất cứ lúc nào.
#所
这是一所大学。|Đây là một trường đại học.
这所房子很大。|Ngôi nhà này rất lớn.
我所知道的就这些。|Những gì tôi biết chỉ có vậy.
他住的地方离派出所很近。|Chỗ anh ấy ở gần đồn công an.
我们城市有十所中学。|Thành phố chúng tôi có mười trường trung học.
#所长
每个人都有自己的所长。|Mỗi người đều có sở trường riêng.
要发挥你的所长。|Hãy phát huy sở trường của bạn.
唱歌是她的所长。|Ca hát là sở trường của cô ấy.
各有所长。|Mỗi người một sở trường.
这不是我的所长。|Đây không phải sở trường của tôi.
#台
我买了一台电脑。|Tôi mua một chiếc máy tính.
这台电视很大。|Chiếc tivi này rất to.
家里有两台空调。|Nhà có hai chiếc điều hòa.
她在台上唱歌。|Cô ấy hát trên sân khấu.
这台机器坏了。|Cái máy này hỏng rồi.
#谈
我们谈一谈吧。|Chúng ta nói chuyện một chút nhé.
他们谈了很久。|Họ nói chuyện rất lâu.
请谈谈你的看法。|Hãy nói về quan điểm của bạn.
这件事以后再谈。|Việc này để sau bàn.
他们在谈生意。|Họ đang bàn chuyện làm ăn.
#谈话
我和老师谈话了。|Tôi đã nói chuyện với thầy.
他们的谈话很愉快。|Cuộc trò chuyện của họ rất vui vẻ.
经理找我谈话。|Giám đốc tìm tôi nói chuyện.
谈话的时候别看手机。|Khi trò chuyện đừng xem điện thoại.
这次谈话很重要。|Cuộc trò chuyện lần này rất quan trọng.
#谈判
两家公司在谈判。|Hai công ty đang đàm phán.
谈判很成功。|Đàm phán rất thành công.
谈判进行了三天。|Đàm phán diễn ra ba ngày.
他很会谈判。|Anh ấy rất giỏi đàm phán.
价格还要谈判。|Giá cả còn phải đàm phán.
#糖
咖啡里要放糖吗？|Cà phê có cho đường không?
孩子喜欢吃糖。|Trẻ con thích ăn kẹo.
少吃糖对身体好。|Ăn ít đường tốt cho cơ thể.
这个菜放了很多糖。|Món này cho nhiều đường.
我给你一块糖。|Tôi cho bạn một viên kẹo.
#特色
这是本地的特色菜。|Đây là món đặc sản địa phương.
这家饭馆很有特色。|Nhà hàng này rất có nét riêng.
每个城市都有自己的特色。|Mỗi thành phố đều có nét đặc sắc riêng.
这里有什么特色？|Ở đây có gì đặc sắc?
我们要保持特色。|Chúng ta phải giữ được nét đặc sắc.
#提问
老师提问了我。|Thầy gọi tôi trả lời câu hỏi.
有问题可以提问。|Có thắc mắc có thể đặt câu hỏi.
请举手提问。|Xin giơ tay để đặt câu hỏi.
他提问了很多问题。|Anh ấy đặt rất nhiều câu hỏi.
提问时间到了。|Đến giờ đặt câu hỏi rồi.
#题目
这道题目很难。|Đề bài này rất khó.
作文的题目是什么？|Đề bài văn là gì?
请先看题目。|Hãy xem đề bài trước.
这个题目很有意思。|Đề tài này rất thú vị.
我没看懂题目。|Tôi không hiểu đề bài.
#体会
我体会到了学习的快乐。|Tôi cảm nhận được niềm vui học tập.
说说你的体会。|Hãy nói cảm nhận của bạn.
没有经历过很难体会。|Chưa trải qua thì khó mà hiểu.
我深深体会到父母的辛苦。|Tôi thấm thía nỗi vất vả của cha mẹ.
这次旅行让我有很多体会。|Chuyến đi này cho tôi nhiều cảm nhận.
#体现
这体现了他的能力。|Điều này thể hiện năng lực của anh ấy.
这件衣服体现了中国特色。|Chiếc áo này thể hiện nét đặc sắc Trung Quốc.
他的行动体现了他的态度。|Hành động của anh ấy thể hiện thái độ.
这本书体现了作者的思想。|Cuốn sách này thể hiện tư tưởng của tác giả.
爱要体现在行动上。|Yêu thương phải thể hiện qua hành động.
#体验
我想体验中国文化。|Tôi muốn trải nghiệm văn hóa Trung Quốc.
这是一次很好的体验。|Đây là một trải nghiệm rất tốt.
你可以免费体验。|Bạn có thể trải nghiệm miễn phí.
我体验了一下农村生活。|Tôi trải nghiệm cuộc sống nông thôn.
用户体验很重要。|Trải nghiệm người dùng rất quan trọng.
#甜
这个苹果很甜。|Quả táo này rất ngọt.
我不喜欢吃太甜的东西。|Tôi không thích ăn đồ quá ngọt.
她笑得很甜。|Cô ấy cười rất ngọt ngào.
这个蛋糕太甜了。|Cái bánh này ngọt quá.
西瓜又大又甜。|Dưa hấu vừa to vừa ngọt.
#跳
他跳得很高。|Anh ấy nhảy rất cao.
小狗跳上了沙发。|Con chó nhảy lên sofa.
我的心跳得很快。|Tim tôi đập rất nhanh.
孩子高兴得跳起来。|Đứa trẻ vui đến nhảy cẫng lên.
他从车上跳下来了。|Anh ấy nhảy từ trên xe xuống.
#跳高
他跳高得了第一名。|Anh ấy đứng nhất môn nhảy cao.
跳高比赛下午开始。|Thi nhảy cao bắt đầu buổi chiều.
我不会跳高。|Tôi không biết nhảy cao.
她跳高跳了一米六。|Cô ấy nhảy cao được một mét sáu.
跳高需要练习。|Nhảy cao cần luyện tập.
#跳舞
她很喜欢跳舞。|Cô ấy rất thích nhảy múa.
我们去跳舞吧。|Chúng ta đi nhảy nhé.
他跳舞跳得很好。|Anh ấy nhảy rất đẹp.
晚上公园里有很多人跳舞。|Buổi tối trong công viên có nhiều người nhảy múa.
你会跳舞吗？|Bạn biết nhảy không?
#跳远
他跳远跳了六米。|Anh ấy nhảy xa được sáu mét.
跳远是我最喜欢的运动。|Nhảy xa là môn tôi thích nhất.
她参加了跳远比赛。|Cô ấy tham gia thi nhảy xa.
跳远要先跑。|Nhảy xa phải chạy đà trước.
他跳远得了金牌。|Anh ấy giành huy chương vàng nhảy xa.
#铁
这个门是铁做的。|Cánh cửa này làm bằng sắt.
铁很重。|Sắt rất nặng.
我们坐地铁去吧。|Chúng ta đi tàu điện ngầm nhé.
他们是铁哥们儿。|Họ là anh em thân thiết.
趁热打铁。|Rèn sắt khi còn nóng.
#铁路
这条铁路很长。|Tuyến đường sắt này rất dài.
铁路连接了两个城市。|Đường sắt nối liền hai thành phố.
他在铁路上工作。|Anh ấy làm việc trong ngành đường sắt.
新铁路明年通车。|Đường sắt mới năm sau thông tuyến.
中国的铁路很发达。|Đường sắt Trung Quốc rất phát triển.
#听力
我的听力不太好。|Kỹ năng nghe của tôi không tốt lắm.
听力考试很难。|Thi nghe rất khó.
多听可以提高听力。|Nghe nhiều có thể nâng cao kỹ năng nghe.
今天我们练习听力。|Hôm nay chúng ta luyện nghe.
听力部分有四十个问题。|Phần nghe có bốn mươi câu hỏi.
#听众
听众朋友们，大家好！|Xin chào quý thính giả!
这个节目有很多听众。|Chương trình này có nhiều thính giả.
听众都很喜欢他的声音。|Thính giả đều rất thích giọng anh ấy.
听众给电台打电话。|Thính giả gọi điện cho đài.
谢谢各位听众。|Cảm ơn quý thính giả.
#停止
雨停止了。|Mưa đã tạnh.
请停止说话。|Xin ngừng nói chuyện.
他从来没有停止学习。|Anh ấy chưa bao giờ ngừng học.
机器停止工作了。|Máy ngừng hoạt động rồi.
停止吸烟对身体好。|Ngừng hút thuốc tốt cho sức khỏe.
#通常
我通常七点起床。|Tôi thường dậy lúc bảy giờ.
他通常坐地铁上班。|Anh ấy thường đi tàu điện ngầm đi làm.
周末我通常在家。|Cuối tuần tôi thường ở nhà.
通常情况下，他不会迟到。|Thông thường anh ấy không đến muộn.
我们通常吃米饭。|Chúng tôi thường ăn cơm.
#通信
现在通信很方便。|Bây giờ liên lạc rất tiện.
我们一直通信。|Chúng tôi vẫn luôn thư từ qua lại.
他在通信公司工作。|Anh ấy làm ở công ty viễn thông.
地震以后通信断了。|Sau động đất liên lạc bị cắt đứt.
手机让通信变得简单。|Điện thoại khiến liên lạc trở nên đơn giản.
#同意
我同意你的意见。|Tôi đồng ý với ý kiến của bạn.
父母同意我去中国。|Bố mẹ đồng ý cho tôi đi Trung Quốc.
大家都同意了。|Mọi người đều đồng ý rồi.
他不同意这个计划。|Anh ấy không đồng ý kế hoạch này.
你同意吗？|Bạn có đồng ý không?
#痛
我头很痛。|Tôi đau đầu lắm.
哪儿痛？|Đau ở đâu?
打针一点儿也不痛。|Tiêm chẳng đau chút nào.
他的腿还很痛。|Chân anh ấy vẫn còn rất đau.
心里很痛。|Trong lòng rất đau.
#痛苦
他看起来很痛苦。|Anh ấy trông rất đau khổ.
离开家让我很痛苦。|Rời xa nhà khiến tôi rất đau khổ.
我不想看到你痛苦。|Tôi không muốn thấy bạn đau khổ.
生病很痛苦。|Bị bệnh rất khổ sở.
这是一段痛苦的回忆。|Đây là một ký ức đau buồn.
#突出
他的成绩很突出。|Thành tích của anh ấy rất nổi bật.
这个问题很突出。|Vấn đề này rất nổi cộm.
请突出重点。|Hãy làm nổi bật trọng tâm.
她在班里表现突出。|Cô ấy thể hiện nổi bật trong lớp.
这种颜色很突出。|Màu này rất nổi bật.
#突然
突然下雨了。|Đột nhiên trời mưa.
他突然走了。|Anh ấy đột nhiên bỏ đi.
这件事太突然了。|Việc này quá đột ngột.
灯突然灭了。|Đèn bỗng tắt.
我突然想起来了。|Tôi chợt nhớ ra.
#图
请看这张图。|Hãy xem hình này.
我在网上找了一张地图。|Tôi tìm một tấm bản đồ trên mạng.
他画了一张图。|Anh ấy vẽ một bức hình.
图上写着什么？|Trên hình viết gì?
这本书有很多图。|Cuốn sách này có nhiều hình.
#图画
孩子画了一幅图画。|Đứa trẻ vẽ một bức tranh.
墙上挂着很多图画。|Trên tường treo nhiều tranh.
这本书的图画很漂亮。|Tranh trong cuốn sách này rất đẹp.
她喜欢看图画书。|Cô bé thích đọc sách tranh.
这幅图画是谁画的？|Bức tranh này ai vẽ?
#土
这里的土很好。|Đất ở đây rất tốt.
鞋上有很多土。|Trên giày có nhiều đất bụi.
他穿得有点儿土。|Anh ấy ăn mặc hơi quê.
树要种在土里。|Cây phải trồng trong đất.
这是本地的土特产。|Đây là đặc sản địa phương.
#团
我们参加了旅游团。|Chúng tôi tham gia đoàn du lịch.
代表团来了。|Đoàn đại biểu đến rồi.
他把纸揉成一团。|Anh ấy vo tờ giấy thành một cục.
全家人团在一起。|Cả nhà quây quần bên nhau.
这个团有三十个人。|Đoàn này có ba mươi người.
#团结
我们要团结。|Chúng ta phải đoàn kết.
团结就是力量。|Đoàn kết là sức mạnh.
我们班很团结。|Lớp chúng tôi rất đoàn kết.
大家团结起来。|Mọi người hãy đoàn kết lại.
团结才能成功。|Đoàn kết mới thành công.
#团体
这是一个学生团体。|Đây là một đoàn thể sinh viên.
团体票比较便宜。|Vé tập thể khá rẻ.
他参加了很多团体活动。|Anh ấy tham gia nhiều hoạt động đoàn thể.
我们团体有五十人。|Đoàn chúng tôi có năm mươi người.
团体比赛我们得了第二名。|Thi đồng đội chúng tôi được giải nhì.
#推动
科技推动社会发展。|Khoa học kỹ thuật thúc đẩy xã hội phát triển.
我们要推动合作。|Chúng ta phải thúc đẩy hợp tác.
他推动了这个计划。|Anh ấy thúc đẩy kế hoạch này.
旅游推动了经济发展。|Du lịch thúc đẩy kinh tế phát triển.
这件事推动了改革。|Việc này thúc đẩy cải cách.
#推广
我们要推广普通话。|Chúng ta phải phổ biến tiếng phổ thông.
这个方法值得推广。|Phương pháp này đáng được nhân rộng.
公司在推广新产品。|Công ty đang quảng bá sản phẩm mới.
推广中国文化很重要。|Quảng bá văn hóa Trung Quốc rất quan trọng.
这个活动已经推广到全国了。|Hoạt động này đã lan rộng ra cả nước.
#推进
工作推进得很顺利。|Công việc được đẩy mạnh thuận lợi.
我们要推进改革。|Chúng ta phải đẩy mạnh cải cách.
计划在慢慢推进。|Kế hoạch đang từ từ được triển khai.
推进合作对双方都好。|Đẩy mạnh hợp tác tốt cho cả hai bên.
项目推进到哪一步了？|Dự án đã tiến đến bước nào rồi?
#推开
他推开了门。|Anh ấy đẩy cửa ra.
请推开窗户。|Hãy đẩy cửa sổ ra.
她推开了我的手。|Cô ấy gạt tay tôi ra.
他把椅子推开了。|Anh ấy đẩy cái ghế ra.
推开门就看见了大海。|Mở cửa ra là thấy biển.
#退
请往后退一步。|Xin lùi lại một bước.
这件衣服可以退吗？|Chiếc áo này có trả lại được không?
我想退票。|Tôi muốn trả vé.
他退了房子。|Anh ấy trả lại căn nhà.
不进则退。|Không tiến thì lùi.
#退出
他退出了比赛。|Anh ấy rút khỏi cuộc thi.
我想退出这个群。|Tôi muốn rời nhóm này.
请先退出账号。|Hãy đăng xuất tài khoản trước.
他退出了足球队。|Anh ấy rời đội bóng đá.
退出以后不能再进。|Thoát ra rồi không vào lại được.
#退休
我爸爸退休了。|Bố tôi nghỉ hưu rồi.
他明年退休。|Năm sau ông ấy nghỉ hưu.
退休以后他每天钓鱼。|Nghỉ hưu xong ngày nào ông ấy cũng câu cá.
退休生活很轻松。|Cuộc sống nghỉ hưu rất thoải mái.
她是一位退休老师。|Bà ấy là giáo viên về hưu.
#外交
他在外交部工作。|Anh ấy làm ở Bộ Ngoại giao.
两国有外交关系。|Hai nước có quan hệ ngoại giao.
外交很重要。|Ngoại giao rất quan trọng.
他是一个外交官。|Ông ấy là một nhà ngoại giao.
这是外交问题。|Đây là vấn đề ngoại giao.
#外面
外面下雨了。|Bên ngoài mưa rồi.
我们去外面吃饭吧。|Chúng ta ra ngoài ăn nhé.
外面很冷。|Bên ngoài rất lạnh.
他在外面等你。|Anh ấy đang đợi bạn bên ngoài.
外面的世界很大。|Thế giới bên ngoài rất rộng lớn.
#外文
你会看外文书吗？|Bạn đọc được sách ngoại văn không?
图书馆有很多外文书。|Thư viện có nhiều sách ngoại văn.
他在外文书店买书。|Anh ấy mua sách ở hiệu sách ngoại văn.
学外文很有用。|Học ngoại ngữ rất hữu ích.
这是一本外文杂志。|Đây là một cuốn tạp chí tiếng nước ngoài.
#完美
没有人是完美的。|Không ai là hoàn hảo.
这次表演很完美。|Màn biểu diễn lần này rất hoàn hảo.
她想做一个完美的妈妈。|Cô ấy muốn làm một người mẹ hoàn hảo.
这真是完美的一天。|Đây đúng là một ngày hoàn hảo.
世界上没有完美的东西。|Trên đời không có gì hoàn mỹ.
#完善
我们要完善这个计划。|Chúng ta phải hoàn thiện kế hoạch này.
这里的设施很完善。|Cơ sở vật chất ở đây rất hoàn thiện.
制度还不完善。|Chế độ vẫn chưa hoàn thiện.
请帮我完善一下。|Hãy giúp tôi hoàn thiện thêm.
服务越来越完善了。|Dịch vụ ngày càng hoàn thiện.
#完整
请写出完整的句子。|Hãy viết câu hoàn chỉnh.
这本书很完整。|Cuốn sách này còn nguyên vẹn.
我听了完整的录音。|Tôi đã nghe toàn bộ đoạn ghi âm.
这个故事不完整。|Câu chuyện này không trọn vẹn.
资料要完整。|Tài liệu phải đầy đủ.
#玩具
孩子有很多玩具。|Đứa trẻ có nhiều đồ chơi.
我给他买了一个玩具。|Tôi mua cho bé một món đồ chơi.
这个玩具很好玩儿。|Món đồ chơi này rất vui.
请把玩具收好。|Hãy cất đồ chơi đi.
玩具店在二楼。|Cửa hàng đồ chơi ở tầng hai.
#往往
周末这里往往人很多。|Cuối tuần ở đây thường rất đông.
他往往工作到很晚。|Anh ấy thường làm việc đến rất khuya.
第一次往往很难。|Lần đầu thường rất khó.
越简单的事往往越难做好。|Việc càng đơn giản thường càng khó làm tốt.
冬天往往下雪。|Mùa đông thường có tuyết.
#危害
吸烟危害健康。|Hút thuốc gây hại cho sức khỏe.
这种东西有很大危害。|Thứ này rất có hại.
污染危害环境。|Ô nhiễm gây hại môi trường.
玩手机太多有危害。|Chơi điện thoại quá nhiều có hại.
我们要减少危害。|Chúng ta phải giảm thiểu tác hại.
#危险
这里很危险。|Ở đây rất nguy hiểm.
危险！别过去！|Nguy hiểm! Đừng qua đó!
晚上一个人走很危险。|Buổi tối đi một mình rất nguy hiểm.
病人已经没有危险了。|Bệnh nhân đã qua cơn nguy hiểm.
开快车很危险。|Lái xe nhanh rất nguy hiểm.
#围
大家围在一起聊天。|Mọi người quây quần trò chuyện.
很多人围着他。|Nhiều người vây quanh anh ấy.
她围着一条红围巾。|Cô ấy quàng một chiếc khăn đỏ.
房子周围有很多树。|Xung quanh nhà có nhiều cây.
孩子们围着老师唱歌。|Bọn trẻ vây quanh cô giáo hát.
#伟大
母亲是伟大的。|Người mẹ thật vĩ đại.
这是一个伟大的发明。|Đây là một phát minh vĩ đại.
长城很伟大。|Vạn Lý Trường Thành rất vĩ đại.
他是一位伟大的作家。|Ông ấy là một nhà văn vĩ đại.
伟大的梦想需要努力。|Ước mơ lớn lao cần sự nỗ lực.
#卫生
要注意个人卫生。|Phải chú ý vệ sinh cá nhân.
这家饭馆很卫生。|Nhà hàng này rất vệ sinh.
今天我们打扫卫生。|Hôm nay chúng ta dọn vệ sinh.
饭前洗手很卫生。|Rửa tay trước khi ăn là hợp vệ sinh.
这里的卫生条件不好。|Điều kiện vệ sinh ở đây không tốt.
#卫生间
卫生间在哪儿？|Nhà vệ sinh ở đâu?
我去一下卫生间。|Tôi đi vệ sinh một chút.
卫生间很干净。|Nhà vệ sinh rất sạch.
房间里有卫生间吗？|Trong phòng có nhà vệ sinh không?
卫生间在走廊的右边。|Nhà vệ sinh ở bên phải hành lang.
#温暖
春天很温暖。|Mùa xuân rất ấm áp.
家给我温暖。|Gia đình cho tôi sự ấm áp.
她的笑很温暖。|Nụ cười của cô ấy rất ấm áp.
谢谢你的温暖。|Cảm ơn sự ấm áp của bạn.
房间里很温暖。|Trong phòng rất ấm áp.
#文明
请文明用语。|Hãy dùng lời lẽ văn minh.
中国有五千年的文明。|Trung Quốc có nền văn minh năm nghìn năm.
我们要做文明人。|Chúng ta phải làm người văn minh.
这是一个文明城市。|Đây là một thành phố văn minh.
文明旅游，从我做起。|Du lịch văn minh, bắt đầu từ tôi.
#文学
我喜欢中国文学。|Tôi thích văn học Trung Quốc.
他在大学学文学。|Anh ấy học văn học ở đại học.
这是一部文学作品。|Đây là một tác phẩm văn học.
她对文学很感兴趣。|Cô ấy rất hứng thú với văn học.
文学让生活更美好。|Văn học khiến cuộc sống tươi đẹp hơn.
#文章
这篇文章写得很好。|Bài viết này viết rất hay.
我在写一篇文章。|Tôi đang viết một bài báo.
请读一下这篇文章。|Hãy đọc bài văn này.
他的文章发表了。|Bài viết của anh ấy đã được đăng.
这篇文章太长了。|Bài viết này dài quá.
#文字
汉字是一种文字。|Chữ Hán là một loại chữ viết.
请把文字写清楚。|Hãy viết chữ cho rõ ràng.
这本书文字很少，图很多。|Cuốn sách này ít chữ, nhiều hình.
他的文字很美。|Văn của anh ấy rất đẹp.
越南以前也用中国文字。|Việt Nam trước đây cũng dùng chữ Hán.
#握手
他们握手了。|Họ bắt tay nhau.
见面的时候要握手。|Khi gặp mặt phải bắt tay.
他跟我握了握手。|Anh ấy bắt tay tôi.
两个人握手说再见。|Hai người bắt tay chào tạm biệt.
握手是一种礼貌。|Bắt tay là một phép lịch sự.
#屋子
屋子里很暗。|Trong phòng rất tối.
这间屋子很大。|Căn phòng này rất rộng.
屋子里有人吗？|Trong phòng có người không?
快进屋子里来。|Mau vào trong nhà.
他把屋子打扫得很干净。|Anh ấy dọn phòng rất sạch.
#武器
警察有武器。|Cảnh sát có vũ khí.
知识是最好的武器。|Tri thức là vũ khí tốt nhất.
这里不能带武器。|Ở đây không được mang vũ khí.
博物馆里有古代武器。|Trong bảo tàng có vũ khí cổ.
笑是他的武器。|Nụ cười là vũ khí của anh ấy.
#武术
他会中国武术。|Anh ấy biết võ thuật Trung Quốc.
我在学武术。|Tôi đang học võ thuật.
武术表演很精彩。|Màn biểu diễn võ thuật rất đặc sắc.
练武术对身体好。|Luyện võ tốt cho sức khỏe.
这是一所武术学校。|Đây là một trường võ thuật.
#舞台
她站在舞台上唱歌。|Cô ấy đứng trên sân khấu hát.
舞台很大。|Sân khấu rất lớn.
他第一次上舞台。|Anh ấy lần đầu lên sân khấu.
舞台上的灯很亮。|Đèn trên sân khấu rất sáng.
这是他的人生舞台。|Đây là sân khấu cuộc đời anh ấy.
#系
你是哪个系的？|Bạn học khoa nào?
我是中文系的学生。|Tôi là sinh viên khoa tiếng Trung.
请系好安全带。|Xin thắt dây an toàn.
他们系有三百个学生。|Khoa của họ có ba trăm sinh viên.
他在外语系教书。|Anh ấy dạy ở khoa ngoại ngữ.
#西部
中国西部有很多山。|Miền Tây Trung Quốc có nhiều núi.
我们去西部旅游吧。|Chúng ta đi du lịch miền Tây nhé.
城市西部有一个大公园。|Phía tây thành phố có một công viên lớn.
西部的风景很美。|Phong cảnh miền Tây rất đẹp.
他在西部工作了五年。|Anh ấy làm việc ở miền Tây năm năm.
#下来
你快下来！|Bạn mau xuống đây!
他从楼上走下来了。|Anh ấy từ trên lầu đi xuống.
请把名字写下来。|Hãy viết tên xuống.
车停下来了。|Xe dừng lại rồi.
天黑下来了。|Trời tối dần.
#下面
下面请王老师讲话。|Sau đây xin mời thầy Vương phát biểu.
桌子下面有一只猫。|Dưới bàn có một con mèo.
请看下面的问题。|Hãy xem câu hỏi bên dưới.
下面我们学习第五课。|Tiếp theo chúng ta học bài năm.
他住在我下面。|Anh ấy ở tầng dưới tôi.
#下去
请继续说下去。|Xin tiếp tục nói đi.
我们下去吃饭吧。|Chúng ta xuống ăn cơm nhé.
这样下去不行。|Cứ thế này mãi không được.
他跳下去了。|Anh ấy nhảy xuống rồi.
你要坚持下去。|Bạn phải kiên trì tiếp.
#先进
这家医院设备很先进。|Bệnh viện này thiết bị rất tiên tiến.
我们要学习先进技术。|Chúng ta phải học kỹ thuật tiên tiến.
他是先进工作者。|Anh ấy là lao động tiên tiến.
这是最先进的手机。|Đây là chiếc điện thoại tiên tiến nhất.
这个国家很先进。|Đất nước này rất tiên tiến.
#显得
她今天显得很高兴。|Hôm nay cô ấy tỏ ra rất vui.
穿这件衣服显得年轻。|Mặc chiếc áo này trông trẻ hơn.
房间显得很小。|Căn phòng trông có vẻ nhỏ.
他显得有点儿紧张。|Anh ấy tỏ ra hơi hồi hộp.
这样显得不礼貌。|Như thế trông có vẻ bất lịch sự.
#显然
显然他不想去。|Rõ ràng anh ấy không muốn đi.
这显然是错的。|Điều này rõ ràng là sai.
他显然很累。|Anh ấy rõ ràng rất mệt.
显然，大家都知道了。|Rõ ràng mọi người đều biết rồi.
她显然没听懂。|Cô ấy rõ ràng chưa nghe hiểu.
#显示
手机显示没有信号。|Điện thoại hiển thị không có sóng.
调查显示，很多人喜欢运动。|Khảo sát cho thấy nhiều người thích vận động.
屏幕上显示了时间。|Trên màn hình hiển thị thời gian.
这显示了他的能力。|Điều này cho thấy năng lực của anh ấy.
电脑显示错误。|Máy tính báo lỗi.
#现场
记者在现场报道。|Phóng viên đưa tin tại hiện trường.
警察到了现场。|Cảnh sát đã đến hiện trường.
我在现场看了比赛。|Tôi xem trận đấu tại chỗ.
现场有很多观众。|Tại chỗ có rất nhiều khán giả.
这是现场直播。|Đây là truyền hình trực tiếp.
#现代化
城市越来越现代化。|Thành phố ngày càng hiện đại hóa.
这是一个现代化的工厂。|Đây là một nhà máy hiện đại.
国家在走向现代化。|Đất nước đang tiến tới hiện đại hóa.
农业也要现代化。|Nông nghiệp cũng phải hiện đại hóa.
学校的设备很现代化。|Thiết bị của trường rất hiện đại.
#现金
你带现金了吗？|Bạn có mang tiền mặt không?
这里只收现金。|Ở đây chỉ nhận tiền mặt.
现在很少用现金了。|Bây giờ ít dùng tiền mặt rồi.
我没有现金，可以刷卡吗？|Tôi không có tiền mặt, quẹt thẻ được không?
我去取一点儿现金。|Tôi đi rút ít tiền mặt.
#现象
这是一种普遍现象。|Đây là một hiện tượng phổ biến.
这种现象很奇怪。|Hiện tượng này rất lạ.
我们要注意这个现象。|Chúng ta phải chú ý hiện tượng này.
下雪是自然现象。|Tuyết rơi là hiện tượng tự nhiên.
这种现象越来越多。|Hiện tượng này ngày càng nhiều.
#线
请给我一根线。|Cho tôi một sợi chỉ.
地铁一号线到机场。|Tàu điện ngầm tuyến số một đi sân bay.
请在线上写名字。|Hãy viết tên trên đường kẻ.
电话线断了。|Dây điện thoại đứt rồi.
我们在线上上课。|Chúng tôi học trực tuyến.
#相比
和去年相比，今年更热。|So với năm ngoái, năm nay nóng hơn.
跟他相比，我还差得远。|So với anh ấy, tôi còn kém xa.
相比之下，这个更便宜。|So ra thì cái này rẻ hơn.
和城市相比，农村很安静。|So với thành phố, nông thôn rất yên tĩnh.
两个人相比，谁更高？|So hai người, ai cao hơn?
#相当
他的汉语相当好。|Tiếng Trung của anh ấy khá tốt.
今天相当冷。|Hôm nay khá lạnh.
两个人的水平相当。|Trình độ hai người tương đương.
这个工作相当难。|Công việc này khá khó.
一百块相当于多少越南盾？|Một trăm tệ tương đương bao nhiêu đồng Việt Nam?
#相关
请准备相关的材料。|Hãy chuẩn bị tài liệu liên quan.
这两件事相关吗？|Hai việc này có liên quan không?
他在相关部门工作。|Anh ấy làm ở bộ phận liên quan.
请看相关的新闻。|Hãy xem tin tức liên quan.
这和我不相关。|Việc này không liên quan đến tôi.
#相互
我们要相互帮助。|Chúng ta phải giúp đỡ lẫn nhau.
朋友之间要相互信任。|Giữa bạn bè phải tin tưởng lẫn nhau.
同学们相互学习。|Các bạn học hỏi lẫn nhau.
两个国家相互了解。|Hai nước hiểu biết lẫn nhau.
我们相互认识很多年了。|Chúng tôi quen nhau nhiều năm rồi.
#相似
这两个字很相似。|Hai chữ này rất giống nhau.
他和他爸爸长得很相似。|Anh ấy trông rất giống bố.
我们的想法很相似。|Suy nghĩ của chúng tôi rất giống nhau.
这两个地方有相似的地方。|Hai nơi này có điểm tương đồng.
相似的问题以前也有过。|Vấn đề tương tự trước đây cũng từng có.
#香蕉
我喜欢吃香蕉。|Tôi thích ăn chuối.
香蕉多少钱一斤？|Chuối bao nhiêu tiền một cân?
我买了一把香蕉。|Tôi mua một nải chuối.
越南的香蕉很好吃。|Chuối Việt Nam rất ngon.
猴子在吃香蕉。|Con khỉ đang ăn chuối.
#消费
年轻人的消费很高。|Mức tiêu dùng của người trẻ rất cao.
这个月消费太多了。|Tháng này tiêu xài nhiều quá.
网上消费越来越普遍。|Tiêu dùng trực tuyến ngày càng phổ biến.
这家店最低消费一百块。|Quán này chi tiêu tối thiểu một trăm đồng.
我们要合理消费。|Chúng ta phải tiêu dùng hợp lý.
#消失
他突然消失了。|Anh ấy đột nhiên biến mất.
太阳消失在山后。|Mặt trời khuất sau núi.
很多老房子消失了。|Nhiều ngôi nhà cổ đã biến mất.
我的担心消失了。|Nỗi lo của tôi tan biến.
这种动物快要消失了。|Loài vật này sắp tuyệt chủng.
#消息
有什么好消息吗？|Có tin vui gì không?
我还没有他的消息。|Tôi vẫn chưa có tin của anh ấy.
这个消息是真的吗？|Tin này có thật không?
我在手机上看到了这个消息。|Tôi xem được tin này trên điện thoại.
等你的消息。|Chờ tin của bạn.
#心
他的心很好。|Anh ấy rất tốt bụng.
我的心跳得很快。|Tim tôi đập rất nhanh.
请放心。|Xin yên tâm.
她很伤心。|Cô ấy rất đau lòng.
学习要用心。|Học phải để tâm.
#信封
请把信放进信封里。|Hãy cho thư vào phong bì.
信封上写着他的地址。|Trên phong bì ghi địa chỉ của anh ấy.
我买了一些信封。|Tôi mua vài cái phong bì.
红信封里有钱。|Trong phong bì đỏ có tiền.
信封上要贴邮票。|Trên phong bì phải dán tem.
#信任
我信任你。|Tôi tin tưởng bạn.
朋友之间要有信任。|Giữa bạn bè phải có sự tin tưởng.
他失去了大家的信任。|Anh ấy mất lòng tin của mọi người.
谢谢你的信任。|Cảm ơn sự tin tưởng của bạn.
老板很信任他。|Ông chủ rất tin tưởng anh ấy.
#行李
你的行李多吗？|Hành lý của bạn có nhiều không?
我帮你拿行李。|Tôi giúp bạn xách hành lý.
行李放在哪儿？|Hành lý để ở đâu?
我的行李丢了。|Hành lý của tôi bị mất.
一个人只能带一件行李。|Mỗi người chỉ được mang một kiện hành lý.
#形成
他形成了好习惯。|Anh ấy đã hình thành thói quen tốt.
这座山是怎么形成的？|Ngọn núi này hình thành thế nào?
大家形成了一个共同的看法。|Mọi người đã hình thành một quan điểm chung.
雨后形成了一条小河。|Sau mưa tạo thành một con suối nhỏ.
好习惯要从小形成。|Thói quen tốt phải hình thành từ nhỏ.
#形式
考试的形式变了。|Hình thức thi đã thay đổi.
学习有很多形式。|Học tập có nhiều hình thức.
这只是形式。|Đây chỉ là hình thức.
用游戏的形式学汉语。|Học tiếng Trung qua hình thức trò chơi.
会议的形式很简单。|Hình thức cuộc họp rất đơn giản.
#形象
他的形象很好。|Hình ảnh của anh ấy rất tốt.
我们要注意公司形象。|Chúng ta phải chú ý hình ảnh công ty.
这个比喻很形象。|Phép so sánh này rất hình tượng.
老师讲得很形象。|Thầy giảng rất sinh động.
她改变了自己的形象。|Cô ấy thay đổi hình ảnh của mình.
#形状
这个东西是什么形状？|Đồ vật này hình dạng gì?
云的形状很奇怪。|Hình dạng của mây rất lạ.
这块石头的形状像一只狗。|Hòn đá này hình dạng giống một con chó.
每片叶子的形状都不一样。|Hình dạng mỗi chiếc lá đều khác nhau.
蛋糕做成了心的形状。|Bánh được làm thành hình trái tim.
#性
这个问题很有重要性。|Vấn đề này có tính quan trọng cao.
他的积极性很高。|Tính tích cực của anh ấy rất cao.
这个游戏有危险性。|Trò chơi này có tính nguy hiểm.
女性和男性都可以参加。|Cả nữ giới và nam giới đều có thể tham gia.
这本书的可读性很强。|Cuốn sách này rất dễ đọc.
#性别
请写上你的性别。|Hãy ghi giới tính của bạn.
表格上有性别这一项。|Trong bảng có mục giới tính.
工作不分性别。|Công việc không phân biệt giới tính.
你的性别是男还是女？|Giới tính của bạn là nam hay nữ?
这个比赛分性别吗？|Cuộc thi này có chia theo giới tính không?
#修
我的电脑坏了，要修一下。|Máy tính của tôi hỏng, phải sửa.
他会修自行车。|Anh ấy biết sửa xe đạp.
这条路正在修。|Con đường này đang được sửa.
请帮我修一下手机。|Hãy sửa giúp tôi điện thoại.
房子修好了。|Ngôi nhà sửa xong rồi.
#修改
请修改一下作文。|Hãy sửa lại bài văn.
计划修改了几次。|Kế hoạch đã sửa đổi mấy lần.
老师帮我修改了文章。|Thầy giúp tôi sửa bài viết.
密码可以修改。|Mật khẩu có thể thay đổi.
这个地方需要修改。|Chỗ này cần sửa.
#需求
我们要了解顾客的需求。|Chúng ta phải hiểu nhu cầu của khách hàng.
市场需求很大。|Nhu cầu thị trường rất lớn.
每个人的需求不一样。|Nhu cầu mỗi người khác nhau.
这个产品满足了大家的需求。|Sản phẩm này đáp ứng nhu cầu của mọi người.
需求越来越多。|Nhu cầu ngày càng nhiều.
#宣布
校长宣布了考试结果。|Hiệu trưởng công bố kết quả thi.
他宣布明天放假。|Anh ấy thông báo mai được nghỉ.
比赛结果宣布了。|Kết quả cuộc thi đã được công bố.
公司宣布了新计划。|Công ty công bố kế hoạch mới.
他们宣布结婚了。|Họ tuyên bố kết hôn.
#宣传
我们要宣传环保。|Chúng ta phải tuyên truyền bảo vệ môi trường.
公司在宣传新产品。|Công ty đang quảng bá sản phẩm mới.
这个活动的宣传很好。|Việc quảng bá hoạt động này rất tốt.
他负责宣传工作。|Anh ấy phụ trách công tác tuyên truyền.
网上有很多宣传。|Trên mạng có nhiều quảng cáo.
#选手
他是一名优秀的选手。|Anh ấy là một tuyển thủ xuất sắc.
选手们准备好了。|Các tuyển thủ đã sẵn sàng.
这次比赛有一百个选手。|Cuộc thi lần này có một trăm thí sinh.
那位选手跑得最快。|Tuyển thủ kia chạy nhanh nhất.
选手们在等结果。|Các thí sinh đang chờ kết quả.
#学费
大学的学费很贵。|Học phí đại học rất đắt.
你交学费了吗？|Bạn đóng học phí chưa?
学费一年多少钱？|Học phí một năm bao nhiêu tiền?
他打工挣学费。|Anh ấy làm thêm kiếm học phí.
学校给他免了学费。|Trường miễn học phí cho cậu ấy.
#血
他的手流血了。|Tay anh ấy chảy máu rồi.
我去医院验血。|Tôi đi bệnh viện xét nghiệm máu.
他给病人献了血。|Anh ấy hiến máu cho bệnh nhân.
看到血我就害怕。|Thấy máu là tôi sợ.
这是他用心血写的书。|Đây là cuốn sách anh ấy viết bằng tâm huyết.
#训练
运动员每天训练。|Vận động viên tập luyện mỗi ngày.
训练很辛苦。|Huấn luyện rất vất vả.
他们在训练小狗。|Họ đang huấn luyện chó con.
我参加了一个训练班。|Tôi tham gia một lớp huấn luyện.
经过训练，他进步了很多。|Qua huấn luyện, anh ấy tiến bộ nhiều.
#压
别压着书。|Đừng đè lên sách.
他工作压力很大。|Áp lực công việc của anh ấy rất lớn.
箱子被压坏了。|Cái thùng bị đè hỏng rồi.
我心里压着很多事。|Trong lòng tôi đè nặng nhiều chuyện.
请用手压一下。|Hãy dùng tay ấn một chút.
#烟
这里不能抽烟。|Ở đây không được hút thuốc.
厨房里有很多烟。|Trong bếp có nhiều khói.
他每天抽一包烟。|Mỗi ngày anh ấy hút một bao thuốc.
烟对身体不好。|Thuốc lá không tốt cho sức khỏe.
远处有烟，是不是着火了？|Đằng xa có khói, có phải cháy không?
#眼前
眼前是一片大海。|Trước mắt là biển cả mênh mông.
他就站在我眼前。|Anh ấy đứng ngay trước mắt tôi.
不要只看眼前。|Đừng chỉ nhìn trước mắt.
眼前的问题要先解决。|Vấn đề trước mắt phải giải quyết trước.
考试就在眼前了。|Kỳ thi đã ở ngay trước mắt.
#演
她在电影里演妈妈。|Cô ấy đóng vai mẹ trong phim.
今天晚上演什么电影？|Tối nay chiếu phim gì?
他演得很好。|Anh ấy diễn rất hay.
你别演了，我知道是你。|Bạn đừng diễn nữa, tôi biết là bạn.
这个演员演过很多电影。|Diễn viên này đóng nhiều phim.
#演唱
她演唱了一首歌。|Cô ấy trình bày một bài hát.
下面请他演唱。|Sau đây mời anh ấy hát.
这首歌由她演唱。|Bài hát này do cô ấy trình bày.
他的演唱很精彩。|Phần trình diễn của anh ấy rất đặc sắc.
大家一起演唱吧。|Mọi người cùng hát nhé.
#演唱会
我们去听演唱会吧。|Chúng ta đi xem ca nhạc nhé.
演唱会的票卖完了。|Vé ca nhạc bán hết rồi.
她明年开演唱会。|Năm sau cô ấy tổ chức liveshow.
演唱会八点开始。|Buổi ca nhạc bắt đầu lúc tám giờ.
演唱会上人很多。|Buổi ca nhạc rất đông người.
#演出
今天晚上有演出。|Tối nay có biểu diễn.
演出很成功。|Buổi biểu diễn rất thành công.
他们在剧场演出。|Họ biểu diễn ở nhà hát.
演出几点结束？|Biểu diễn mấy giờ kết thúc?
孩子们演出了一个节目。|Bọn trẻ biểu diễn một tiết mục.
#演员
她是一个演员。|Cô ấy là một diễn viên.
这个演员很有名。|Diễn viên này rất nổi tiếng.
我想当演员。|Tôi muốn làm diễn viên.
你喜欢哪个演员？|Bạn thích diễn viên nào?
演员们在台上表演。|Các diễn viên biểu diễn trên sân khấu.
#羊
山上有很多羊。|Trên núi có nhiều cừu.
我喜欢吃羊肉。|Tôi thích ăn thịt cừu.
他养了二十只羊。|Anh ấy nuôi hai mươi con dê.
我属羊。|Tôi tuổi Mùi.
羊在吃草。|Con cừu đang ăn cỏ.
#阳光
今天阳光很好。|Hôm nay nắng rất đẹp.
阳光照进了房间。|Ánh nắng chiếu vào phòng.
植物需要阳光。|Cây cần ánh nắng.
他是一个阳光的男孩。|Cậu ấy là một chàng trai vui tươi.
在阳光下看书对眼睛不好。|Đọc sách dưới nắng không tốt cho mắt.
#要是
要是明天下雨，我就不去了。|Nếu mai mưa thì tôi không đi nữa.
要是你有时间，来我家吧。|Nếu bạn có thời gian thì đến nhà tôi nhé.
要是我是你，我就去。|Nếu tôi là bạn, tôi sẽ đi.
要是有问题，给我打电话。|Nếu có vấn đề thì gọi cho tôi.
要是早点儿知道就好了。|Giá mà biết sớm hơn thì tốt.
#一方面
一方面我想去，一方面又怕花钱。|Một mặt tôi muốn đi, mặt khác lại sợ tốn tiền.
一方面要学习，另一方面要运动。|Một mặt phải học, mặt khác phải vận động.
这一方面他做得很好。|Về mặt này anh ấy làm rất tốt.
一方面是时间问题，一方面是钱的问题。|Một mặt là vấn đề thời gian, mặt khác là vấn đề tiền.
我们一方面要工作，一方面要照顾家。|Chúng ta một mặt phải làm việc, một mặt phải lo cho gia đình.
#一切
一切都很好。|Mọi thứ đều tốt.
祝你一切顺利！|Chúc bạn mọi việc thuận lợi!
我会尽一切努力。|Tôi sẽ cố gắng hết sức.
一切都准备好了。|Mọi thứ đã chuẩn bị xong.
他为家人做了一切。|Anh ấy đã làm tất cả vì gia đình.
#衣架
请给我一个衣架。|Cho tôi một cái móc áo.
衣服挂在衣架上。|Quần áo treo trên móc.
我买了十个衣架。|Tôi mua mười cái móc áo.
衣架不够用了。|Móc áo không đủ dùng nữa.
衣架在柜子里。|Móc áo ở trong tủ.
#已
他已到家了。|Anh ấy đã về đến nhà.
时间已过了一半。|Thời gian đã qua một nửa.
他已不再生气了。|Anh ấy đã không còn giận nữa.
我已决定了。|Tôi đã quyết định rồi.
飞机已起飞。|Máy bay đã cất cánh.
#以来
三年以来，他一直学汉语。|Ba năm nay anh ấy luôn học tiếng Trung.
长期以来，这里很安静。|Lâu nay nơi đây rất yên tĩnh.
上学以来我从来没迟到。|Từ khi đi học tôi chưa từng đến muộn.
今年以来天气很热。|Từ đầu năm đến nay thời tiết rất nóng.
自古以来，人们就爱喝茶。|Từ xưa đến nay người ta đã thích uống trà.
#艺术
我喜欢艺术。|Tôi thích nghệ thuật.
这是一件艺术品。|Đây là một tác phẩm nghệ thuật.
她在艺术学院学习。|Cô ấy học ở học viện nghệ thuật.
说话也是一种艺术。|Nói chuyện cũng là một nghệ thuật.
这个城市很有艺术气氛。|Thành phố này rất có không khí nghệ thuật.
#意外
这真是一个意外。|Đây thật là một bất ngờ.
他出了意外。|Anh ấy gặp tai nạn.
听到这个消息我很意外。|Nghe tin này tôi rất bất ngờ.
这是一个意外的礼物。|Đây là một món quà bất ngờ.
为了防止意外，要小心。|Để tránh sự cố bất ngờ, phải cẩn thận.
#因此
下大雨了，因此比赛取消了。|Mưa to, vì vậy trận đấu bị hủy.
他很努力，因此成绩很好。|Anh ấy rất chăm chỉ, do đó thành tích rất tốt.
我病了，因此没去上课。|Tôi ốm, vì thế không đi học.
路上堵车，因此我迟到了。|Trên đường tắc xe, vì vậy tôi đến muộn.
她喜欢中国，因此学汉语。|Cô ấy thích Trung Quốc, vì vậy học tiếng Trung.
#银
这是银的。|Cái này là bạc.
她戴着一个银手环。|Cô ấy đeo một chiếc vòng tay bạc.
银比金便宜。|Bạc rẻ hơn vàng.
他的头发变成了银色。|Tóc ông ấy đã bạc trắng.
我们去银行取钱。|Chúng ta đi ngân hàng rút tiền.
#银牌
他得了一块银牌。|Anh ấy giành một huy chương bạc.
银牌也很不错。|Huy chương bạc cũng rất tốt.
我们队拿了两块银牌。|Đội chúng tôi giành hai huy chương bạc.
她第一次比赛就得了银牌。|Lần đầu thi đấu cô ấy đã giành huy chương bạc.
银牌是第二名的奖。|Huy chương bạc là giải dành cho hạng nhì.
#印象
你对北京的印象怎么样？|Ấn tượng của bạn về Bắc Kinh thế nào?
他给我留下了很好的印象。|Anh ấy để lại cho tôi ấn tượng rất tốt.
我对他没有印象。|Tôi không có ấn tượng gì về anh ấy.
第一印象很重要。|Ấn tượng đầu tiên rất quan trọng.
这次旅行给我很深的印象。|Chuyến đi này để lại ấn tượng sâu sắc.
#应当
我们应当互相帮助。|Chúng ta nên giúp đỡ lẫn nhau.
学生应当好好学习。|Học sinh nên học tập chăm chỉ.
你应当早点儿告诉我。|Bạn nên nói với tôi sớm hơn.
这是我应当做的。|Đây là việc tôi nên làm.
做错了应当道歉。|Làm sai thì nên xin lỗi.
#应用
这个技术应用很广。|Công nghệ này được ứng dụng rộng rãi.
学了要会应用。|Học rồi phải biết vận dụng.
手机上有很多应用。|Trên điện thoại có nhiều ứng dụng.
他学的是应用数学。|Anh ấy học toán ứng dụng.
新方法已经应用到工作中了。|Phương pháp mới đã được áp dụng vào công việc.
#迎接
我们去机场迎接客人。|Chúng tôi ra sân bay đón khách.
大家热烈迎接新同学。|Mọi người nhiệt liệt đón chào bạn mới.
迎接新年的到来。|Đón chào năm mới.
我们要迎接新的挑战。|Chúng ta phải đón nhận thử thách mới.
孩子们在门口迎接老师。|Bọn trẻ đón thầy ở cửa.
#营养
水果很有营养。|Trái cây rất bổ dưỡng.
孩子需要营养。|Trẻ em cần dinh dưỡng.
这个菜营养丰富。|Món này giàu dinh dưỡng.
吃饭要注意营养。|Ăn uống phải chú ý dinh dưỡng.
牛奶的营养很高。|Sữa có giá trị dinh dưỡng cao.
#赢
我们赢了！|Chúng ta thắng rồi!
谁赢了比赛？|Ai thắng trận đấu?
他赢了一百块钱。|Anh ấy thắng một trăm đồng.
这次我一定要赢。|Lần này tôi nhất định phải thắng.
输赢不重要。|Thắng thua không quan trọng.
#影视
他在影视公司工作。|Anh ấy làm ở công ty điện ảnh truyền hình.
她是影视演员。|Cô ấy là diễn viên điện ảnh truyền hình.
我喜欢看影视作品。|Tôi thích xem phim ảnh.
影视剧很受欢迎。|Phim truyền hình rất được yêu thích.
他学的是影视专业。|Anh ấy học chuyên ngành điện ảnh.
#优势
我们有很多优势。|Chúng ta có nhiều ưu thế.
年轻是你的优势。|Tuổi trẻ là ưu thế của bạn.
这个队占了优势。|Đội này chiếm ưu thế.
你的优势是什么？|Thế mạnh của bạn là gì?
价格是我们最大的优势。|Giá cả là ưu thế lớn nhất của chúng tôi.
#由
这件事由我负责。|Việc này do tôi phụ trách.
水由两种东西组成。|Nước do hai thành phần tạo nên.
晚饭由妈妈做。|Bữa tối do mẹ nấu.
由这儿往前走。|Từ đây đi thẳng về phía trước.
这本书由他写的。|Cuốn sách này do anh ấy viết.
#由于
由于下雨，比赛推迟了。|Do trời mưa, trận đấu bị hoãn.
由于工作忙，他很少回家。|Do công việc bận, anh ấy ít về nhà.
由于他的帮助，我成功了。|Nhờ sự giúp đỡ của anh ấy, tôi đã thành công.
由于身体不好，她没来上课。|Do sức khỏe không tốt, cô ấy không đến lớp.
由于时间关系，今天就说到这儿。|Do thời gian có hạn, hôm nay nói đến đây.
#邮件
我收到了你的邮件。|Tôi đã nhận được email của bạn.
请发邮件给我。|Hãy gửi email cho tôi.
我每天看很多邮件。|Mỗi ngày tôi xem rất nhiều email.
这封邮件很重要。|Email này rất quan trọng.
邮件里有一个文件。|Trong email có một tệp tài liệu.
#邮票
我喜欢收集邮票。|Tôi thích sưu tầm tem.
请在信封上贴邮票。|Hãy dán tem lên phong bì.
这张邮票很老。|Con tem này rất cũ.
一张邮票多少钱？|Một con tem bao nhiêu tiền?
他有很多外国邮票。|Anh ấy có nhiều tem nước ngoài.
#邮箱
你的邮箱地址是什么？|Địa chỉ email của bạn là gì?
请看一下邮箱。|Hãy xem hộp thư.
我的邮箱满了。|Hộp thư của tôi đầy rồi.
门口有一个邮箱。|Trước cửa có một hộp thư.
我把信放进了邮箱。|Tôi bỏ thư vào hòm thư.
#游
我会游泳。|Tôi biết bơi.
鱼在水里游。|Cá bơi trong nước.
他游得很快。|Anh ấy bơi rất nhanh.
我们去西湖游了一天。|Chúng tôi đi chơi Tây Hồ cả ngày.
他游过了这条河。|Anh ấy bơi qua con sông này.
#有的是
我有的是时间。|Tôi có thừa thời gian.
这种书图书馆有的是。|Loại sách này thư viện có đầy.
他有的是钱。|Anh ấy có khối tiền.
机会有的是，别着急。|Cơ hội còn nhiều, đừng vội.
这里好吃的有的是。|Ở đây đồ ngon có đầy.
#有利
这对我们很有利。|Điều này rất có lợi cho chúng ta.
运动有利于健康。|Vận động có lợi cho sức khỏe.
现在的情况对我们有利。|Tình hình hiện tại có lợi cho chúng ta.
这是一个有利的机会。|Đây là một cơ hội thuận lợi.
多读书有利于学习。|Đọc nhiều sách có lợi cho việc học.
#有效
这个方法很有效。|Phương pháp này rất hiệu quả.
这张票三天内有效。|Vé này có hiệu lực trong ba ngày.
护照还有效吗？|Hộ chiếu còn hiệu lực không?
这个药很有效。|Thuốc này rất hiệu quả.
我们要有效地利用时间。|Chúng ta phải sử dụng thời gian hiệu quả.
#预报
天气预报说明天下雨。|Dự báo thời tiết nói mai mưa.
你看天气预报了吗？|Bạn xem dự báo thời tiết chưa?
预报说今天很热。|Dự báo nói hôm nay rất nóng.
天气预报不太准。|Dự báo thời tiết không chính xác lắm.
我每天晚上看天气预报。|Tối nào tôi cũng xem dự báo thời tiết.
#预防
预防感冒要多运动。|Phòng cảm thì phải vận động nhiều.
预防比治疗更重要。|Phòng bệnh quan trọng hơn chữa bệnh.
孩子要打预防针。|Trẻ con phải tiêm phòng.
我们要预防事故。|Chúng ta phải phòng ngừa tai nạn.
洗手可以预防生病。|Rửa tay có thể phòng bệnh.
#预计
预计明天会下雨。|Dự tính mai sẽ mưa.
飞机预计十点到。|Máy bay dự kiến mười giờ đến.
预计有一千人参加。|Dự kiến có một nghìn người tham gia.
工作预计下个月完成。|Công việc dự kiến tháng sau hoàn thành.
比我们预计的快。|Nhanh hơn chúng tôi dự tính.
#预习
上课前要预习。|Trước giờ học phải xem trước bài.
请预习第五课。|Hãy chuẩn bị trước bài năm.
我每天预习生词。|Ngày nào tôi cũng xem trước từ mới.
预习可以帮助你听懂。|Xem trước bài giúp bạn nghe hiểu.
你预习了吗？|Bạn xem trước bài chưa?
#员
他是服务员。|Anh ấy là nhân viên phục vụ.
我们公司有一百个员工。|Công ty chúng tôi có một trăm nhân viên.
她是售货员。|Cô ấy là nhân viên bán hàng.
运动员在训练。|Vận động viên đang luyện tập.
他是我们队的队员。|Anh ấy là đội viên của đội chúng tôi.
#愿望
你的愿望是什么？|Nguyện vọng của bạn là gì?
我的愿望是去中国留学。|Nguyện vọng của tôi là đi du học Trung Quốc.
希望你的愿望能实现。|Mong nguyện vọng của bạn thành hiện thực.
生日的时候许个愿望吧。|Sinh nhật thì ước một điều nhé.
这是我多年的愿望。|Đây là nguyện vọng nhiều năm của tôi.
#约
我约了朋友吃饭。|Tôi hẹn bạn đi ăn cơm.
我们约好八点见面。|Chúng tôi hẹn gặp lúc tám giờ.
他约有三十岁。|Anh ấy khoảng ba mươi tuổi.
今天有约吗？|Hôm nay có hẹn không?
我们约在咖啡馆。|Chúng ta hẹn ở quán cà phê.
#运输
这些东西用火车运输。|Những thứ này vận chuyển bằng tàu hỏa.
运输费用很高。|Chi phí vận chuyển rất cao.
他在运输公司工作。|Anh ấy làm ở công ty vận tải.
运输要注意安全。|Vận chuyển phải chú ý an toàn.
水果运输要快。|Vận chuyển trái cây phải nhanh.
#杂志
我喜欢看杂志。|Tôi thích đọc tạp chí.
这本杂志每月一期。|Tạp chí này mỗi tháng một số.
桌子上有几本杂志。|Trên bàn có mấy cuốn tạp chí.
他的文章在杂志上发表了。|Bài viết của anh ấy đã đăng trên tạp chí.
这是一本汉语杂志。|Đây là một cuốn tạp chí tiếng Trung.
#早已
我早已知道了。|Tôi đã biết từ lâu rồi.
他早已离开了这里。|Anh ấy đã rời khỏi đây từ lâu.
饭早已做好了。|Cơm đã nấu xong từ lâu.
我们早已是好朋友了。|Chúng tôi đã là bạn tốt từ lâu.
火车早已开走了。|Tàu đã chạy đi từ lâu.
#造
这座桥是哪年造的？|Cây cầu này xây năm nào?
这个工厂造汽车。|Nhà máy này chế tạo ô tô.
请用这个词造句。|Hãy đặt câu với từ này.
他们造了一条船。|Họ đóng một chiếc thuyền.
这房子造得很好。|Ngôi nhà này xây rất tốt.
#造成
大雨造成了很多问题。|Mưa lớn gây ra nhiều vấn đề.
这是谁造成的？|Việc này do ai gây ra?
污染造成了很大的危害。|Ô nhiễm gây ra tác hại lớn.
他的错误造成了损失。|Lỗi của anh ấy gây ra tổn thất.
吸烟会造成很多疾病。|Hút thuốc sẽ gây ra nhiều bệnh.
#责任
这是我的责任。|Đây là trách nhiệm của tôi.
他很有责任心。|Anh ấy rất có tinh thần trách nhiệm.
谁来负这个责任？|Ai sẽ chịu trách nhiệm này?
保护环境是大家的责任。|Bảo vệ môi trường là trách nhiệm của mọi người.
父母有责任照顾孩子。|Cha mẹ có trách nhiệm chăm sóc con cái.
#增加
学生人数增加了。|Số học sinh đã tăng.
我想增加一点儿运动。|Tôi muốn tăng thêm chút vận động.
工作越来越多，压力也增加了。|Công việc ngày càng nhiều, áp lực cũng tăng.
今年收入增加了很多。|Năm nay thu nhập tăng nhiều.
请增加一个人。|Xin thêm một người.
#增长
经济增长很快。|Kinh tế tăng trưởng rất nhanh.
人口增长了百分之十。|Dân số tăng mười phần trăm.
读书可以增长知识。|Đọc sách giúp tăng thêm kiến thức.
年龄增长了，经验也多了。|Tuổi tăng lên, kinh nghiệm cũng nhiều hơn.
销售额在不断增长。|Doanh số không ngừng tăng trưởng.
#展开
他展开了地图。|Anh ấy mở tấm bản đồ ra.
讨论已经展开了。|Cuộc thảo luận đã bắt đầu.
比赛在下午展开。|Cuộc thi diễn ra vào buổi chiều.
我们展开了调查。|Chúng tôi đã tiến hành điều tra.
请展开说说。|Hãy nói chi tiết hơn.
#长处
每个人都有长处。|Ai cũng có ưu điểm.
他的长处是很认真。|Ưu điểm của anh ấy là rất nghiêm túc.
要学习别人的长处。|Phải học hỏi ưu điểm của người khác.
你的长处是什么？|Ưu điểm của bạn là gì?
发挥自己的长处。|Phát huy ưu điểm của mình.
#长期
他长期住在国外。|Anh ấy sống lâu dài ở nước ngoài.
这是一个长期计划。|Đây là một kế hoạch dài hạn.
学汉语是长期的事。|Học tiếng Trung là việc lâu dài.
我们长期合作吧。|Chúng ta hợp tác lâu dài nhé.
长期熬夜对身体不好。|Thức khuya lâu dài không tốt cho sức khỏe.
#照
请帮我照张相。|Hãy chụp giúp tôi một tấm ảnh.
阳光照在床上。|Ánh nắng chiếu lên giường.
她在照镜子。|Cô ấy đang soi gương.
照我说的做。|Làm theo lời tôi nói.
我们照了很多照片。|Chúng tôi chụp rất nhiều ảnh.
#者
他是一个记者。|Anh ấy là một phóng viên.
这本书的作者是谁？|Tác giả cuốn sách này là ai?
读者很喜欢这篇文章。|Độc giả rất thích bài viết này.
他是这次比赛的获胜者。|Anh ấy là người chiến thắng cuộc thi này.
初学者要多练习。|Người mới học phải luyện tập nhiều.
#真实
这是一个真实的故事。|Đây là một câu chuyện có thật.
请说出你真实的想法。|Hãy nói ra suy nghĩ thật của bạn.
这张照片很真实。|Bức ảnh này rất chân thực.
电影是根据真实事件拍的。|Phim được quay dựa trên sự kiện có thật.
他的感情很真实。|Tình cảm của anh ấy rất chân thật.
#争
孩子们在争玩具。|Bọn trẻ đang tranh đồ chơi.
别争了，一人一个。|Đừng tranh nữa, mỗi người một cái.
大家争着回答问题。|Mọi người tranh nhau trả lời câu hỏi.
他们为了小事争起来了。|Họ cãi nhau vì chuyện nhỏ.
我们要争第一。|Chúng ta phải giành vị trí thứ nhất.
#争取
我们要争取时间。|Chúng ta phải tranh thủ thời gian.
我争取明天完成。|Tôi cố gắng mai hoàn thành.
他争取到了这个机会。|Anh ấy đã giành được cơ hội này.
我们争取得第一名。|Chúng tôi cố gắng giành giải nhất.
争取早日回国。|Cố gắng sớm ngày về nước.
#整
现在是八点整。|Bây giờ là tám giờ đúng.
他整夜没睡。|Anh ấy thức trắng cả đêm.
请把房间整一整。|Hãy dọn dẹp lại phòng.
一百块整。|Tròn một trăm đồng.
他吃了整个西瓜。|Anh ấy ăn hết cả quả dưa hấu.
#整个
整个城市都下雪了。|Cả thành phố đều có tuyết.
我整个下午都在学习。|Cả buổi chiều tôi đều học.
整个过程很顺利。|Toàn bộ quá trình rất thuận lợi.
整个班都去了。|Cả lớp đều đi.
他把整个故事讲完了。|Anh ấy kể hết toàn bộ câu chuyện.
#整理
请整理一下房间。|Hãy dọn dẹp lại phòng.
我在整理笔记。|Tôi đang sắp xếp lại ghi chép.
书要整理好。|Sách phải sắp xếp gọn gàng.
他整理了一下衣服。|Anh ấy chỉnh lại quần áo.
请把文件整理一下。|Hãy sắp xếp lại tài liệu.
#整齐
他的房间很整齐。|Phòng của anh ấy rất ngăn nắp.
书放得很整齐。|Sách xếp rất ngay ngắn.
学生们站得很整齐。|Học sinh đứng rất thẳng hàng.
他的字写得很整齐。|Chữ anh ấy viết rất đều đặn.
衣服要叠整齐。|Quần áo phải gấp gọn gàng.
#整体
整体来说，这次考试不错。|Nhìn chung kỳ thi lần này khá tốt.
我们是一个整体。|Chúng ta là một khối thống nhất.
整体水平提高了。|Trình độ tổng thể đã nâng cao.
要从整体考虑问题。|Phải xem xét vấn đề một cách tổng thể.
这个设计整体很好看。|Tổng thể thiết kế này rất đẹp.
#整天
他整天玩儿手机。|Anh ấy cả ngày chơi điện thoại.
我整天都在家。|Tôi ở nhà cả ngày.
她整天很忙。|Cô ấy bận cả ngày.
别整天看电视。|Đừng xem tivi cả ngày.
下了一整天的雨。|Mưa suốt cả ngày.
#整整
我整整等了两个小时。|Tôi đợi tròn hai tiếng.
他整整一天没吃饭。|Anh ấy suốt một ngày không ăn cơm.
我们整整走了十公里。|Chúng tôi đi tròn mười cây số.
这本书我整整看了一个星期。|Cuốn sách này tôi đọc suốt một tuần.
他整整工作了三十年。|Ông ấy làm việc tròn ba mươi năm.
#正式
比赛正式开始了。|Cuộc thi chính thức bắt đầu.
他是正式员工。|Anh ấy là nhân viên chính thức.
今天要穿正式一点儿。|Hôm nay phải mặc trang trọng chút.
我们正式见面了。|Chúng tôi chính thức gặp mặt.
这是一封正式的信。|Đây là một lá thư trang trọng.
#证
你有学生证吗？|Bạn có thẻ sinh viên không?
请出示工作证。|Xin xuất trình thẻ làm việc.
他拿到了毕业证。|Anh ấy nhận được bằng tốt nghiệp.
我的驾驶证丢了。|Bằng lái của tôi mất rồi.
进门要看证。|Vào cửa phải xem giấy tờ.
#证件
请带好证件。|Hãy mang theo giấy tờ.
他的证件丢了。|Giấy tờ của anh ấy mất rồi.
办手续要什么证件？|Làm thủ tục cần giấy tờ gì?
请出示你的证件。|Xin xuất trình giấy tờ của bạn.
证件要放好。|Giấy tờ phải cất kỹ.
#证据
你有证据吗？|Bạn có bằng chứng không?
警察找到了证据。|Cảnh sát tìm được chứng cứ.
没有证据不能乱说。|Không có bằng chứng thì không được nói bừa.
这就是证据。|Đây chính là bằng chứng.
证据不够。|Chứng cứ không đủ.
#证明
请证明你说的是真的。|Hãy chứng minh điều bạn nói là thật.
事实证明他是对的。|Sự thật chứng minh anh ấy đúng.
我需要一份工作证明。|Tôi cần một giấy xác nhận công việc.
他用行动证明了自己。|Anh ấy dùng hành động chứng minh bản thân.
医生开了一个证明。|Bác sĩ cấp một giấy chứng nhận.
#支
我买了一支笔。|Tôi mua một cây bút.
这支队伍很强。|Đội này rất mạnh.
她唱了一支歌。|Cô ấy hát một bài.
请借我一支铅笔。|Cho tôi mượn một cây bút chì.
桌子上有三支笔。|Trên bàn có ba cây bút.
#支持
谢谢你的支持。|Cảm ơn sự ủng hộ của bạn.
父母很支持我。|Bố mẹ rất ủng hộ tôi.
我支持你的决定。|Tôi ủng hộ quyết định của bạn.
大家都支持这个计划。|Mọi người đều ủng hộ kế hoạch này.
你支持哪个队？|Bạn ủng hộ đội nào?
#支付
可以用手机支付吗？|Có thể thanh toán bằng điện thoại không?
请先支付费用。|Xin thanh toán chi phí trước.
支付成功了。|Thanh toán thành công.
我用银行卡支付。|Tôi thanh toán bằng thẻ ngân hàng.
费用由公司支付。|Chi phí do công ty chi trả.
#直
一直往前走。|Cứ đi thẳng về phía trước.
这条路很直。|Con đường này rất thẳng.
请坐直。|Hãy ngồi thẳng.
他说话很直。|Anh ấy nói chuyện rất thẳng.
画一条直线。|Vẽ một đường thẳng.
#直播
比赛现在直播。|Trận đấu đang phát trực tiếp.
他在网上直播。|Anh ấy livestream trên mạng.
我在看直播。|Tôi đang xem trực tiếp.
晚会会直播吗？|Dạ hội có phát trực tiếp không?
直播八点开始。|Phát trực tiếp bắt đầu lúc tám giờ.
#直到
我直到昨天才知道。|Mãi đến hôm qua tôi mới biết.
他工作直到晚上十点。|Anh ấy làm việc đến tận mười giờ tối.
直到现在我还记得。|Đến tận bây giờ tôi vẫn còn nhớ.
雨直到下午才停。|Mưa đến chiều mới tạnh.
直到毕业我们都是同学。|Chúng tôi là bạn học cho đến khi tốt nghiệp.
#值
这个包值多少钱？|Chiếc túi này đáng giá bao nhiêu?
这件衣服不值这么多钱。|Chiếc áo này không đáng nhiều tiền thế.
今天谁值班？|Hôm nay ai trực?
这本书很值。|Cuốn sách này rất đáng tiền.
这次旅行很值。|Chuyến đi này rất xứng đáng.
#值得
这本书值得看。|Cuốn sách này đáng đọc.
这个地方值得去。|Nơi này đáng để đi.
为了你，一切都值得。|Vì bạn, mọi thứ đều đáng.
这个问题值得注意。|Vấn đề này đáng chú ý.
他值得我们学习。|Anh ấy đáng để chúng ta học hỏi.
#职工
这个工厂有五百名职工。|Nhà máy này có năm trăm công nhân viên.
公司给职工发了奖金。|Công ty phát thưởng cho công nhân viên.
职工食堂在一楼。|Nhà ăn nhân viên ở tầng một.
他是一名老职工。|Ông ấy là một nhân viên lâu năm.
职工们都很努力。|Các công nhân viên đều rất chăm chỉ.
#职业
你的职业是什么？|Nghề nghiệp của bạn là gì?
老师是一个好职业。|Giáo viên là một nghề tốt.
他是职业运动员。|Anh ấy là vận động viên chuyên nghiệp.
选择职业很重要。|Chọn nghề rất quan trọng.
她换了职业。|Cô ấy đã đổi nghề.
#只好
没有车了，只好走路回家。|Hết xe rồi, đành đi bộ về nhà.
他不在，我只好明天再来。|Anh ấy không có ở đây, tôi đành mai quay lại.
下雨了，我们只好在家。|Mưa rồi, chúng tôi đành ở nhà.
没办法，只好这样了。|Hết cách, đành phải vậy.
票卖完了，只好看下一场。|Vé bán hết rồi, đành xem suất sau.
#只是
我只是问问。|Tôi chỉ hỏi thôi.
这只是开始。|Đây chỉ là sự khởi đầu.
他只是说说，不会做的。|Anh ấy chỉ nói thôi, sẽ không làm đâu.
我很想去，只是没时间。|Tôi rất muốn đi, chỉ là không có thời gian.
这只是一个小问题。|Đây chỉ là một vấn đề nhỏ.
#指
他用手指了指门口。|Anh ấy dùng tay chỉ ra cửa.
请指一下你家在哪儿。|Hãy chỉ xem nhà bạn ở đâu.
不要用手指别人。|Đừng lấy tay chỉ người khác.
我说的不是指你。|Điều tôi nói không phải ám chỉ bạn.
指南针指向北方。|Kim la bàn chỉ về hướng bắc.
#指出
老师指出了我的错误。|Thầy chỉ ra lỗi của tôi.
请指出问题在哪儿。|Hãy chỉ ra vấn đề ở đâu.
他指出这个方法不对。|Anh ấy chỉ ra phương pháp này không đúng.
专家指出，运动很重要。|Chuyên gia chỉ ra rằng vận động rất quan trọng.
谢谢你指出来。|Cảm ơn bạn đã chỉ ra.
#指导
谢谢老师的指导。|Cảm ơn sự hướng dẫn của thầy.
他指导我们做实验。|Anh ấy hướng dẫn chúng tôi làm thí nghiệm.
请多多指导。|Mong được chỉ bảo nhiều.
他是我们的指导老师。|Ông ấy là giáo viên hướng dẫn của chúng tôi.
在他的指导下，我进步很快。|Dưới sự hướng dẫn của anh ấy, tôi tiến bộ nhanh.
#至今
他至今还没结婚。|Đến nay anh ấy vẫn chưa kết hôn.
这件事我至今难忘。|Chuyện này đến giờ tôi vẫn khó quên.
至今没有消息。|Đến nay vẫn chưa có tin.
这座桥至今已有一百年。|Cây cầu này đến nay đã một trăm năm.
我至今还记得他的话。|Đến giờ tôi vẫn nhớ lời anh ấy.
#至少
至少要等一个小时。|Ít nhất phải đợi một tiếng.
我每天至少学十个生词。|Mỗi ngày tôi học ít nhất mười từ mới.
这里至少有一百人。|Ở đây có ít nhất một trăm người.
你至少应该告诉我。|Ít nhất bạn nên nói với tôi.
至少他很努力。|Ít ra anh ấy rất cố gắng.
#制定
我们制定了一个计划。|Chúng tôi đã lập một kế hoạch.
学校制定了新规定。|Trường đặt ra quy định mới.
请制定学习目标。|Hãy đặt mục tiêu học tập.
政府制定了新政策。|Chính phủ ban hành chính sách mới.
计划制定好了吗？|Kế hoạch đã lập xong chưa?
#制度
公司有严格的制度。|Công ty có chế độ nghiêm ngặt.
我们要遵守制度。|Chúng ta phải tuân thủ chế độ.
这个制度很合理。|Chế độ này rất hợp lý.
学校改变了考试制度。|Trường đã thay đổi chế độ thi.
每个国家的制度不同。|Chế độ mỗi nước khác nhau.
#制造
这辆车是越南制造的。|Chiếc xe này sản xuất ở Việt Nam.
他们制造飞机。|Họ chế tạo máy bay.
别制造麻烦。|Đừng gây rắc rối.
这个工厂制造手机。|Nhà máy này chế tạo điện thoại.
中国制造的东西很多。|Hàng sản xuất tại Trung Quốc rất nhiều.
#制作
这个蛋糕是我制作的。|Cái bánh này do tôi làm.
他在制作一个视频。|Anh ấy đang làm một video.
这部电影制作得很好。|Bộ phim này được dàn dựng rất tốt.
制作这个东西要三天。|Làm thứ này mất ba ngày.
我们一起制作贺卡吧。|Chúng ta cùng làm thiệp chúc mừng nhé.
#中部
越南中部常常有台风。|Miền Trung Việt Nam thường có bão.
他住在城市中部。|Anh ấy sống ở khu trung tâm thành phố.
中部的风景很美。|Phong cảnh miền Trung rất đẹp.
我去中部旅游了。|Tôi đi du lịch miền Trung.
中国中部有很多大城市。|Miền Trung Trung Quốc có nhiều thành phố lớn.
#中华民族
中华民族有五千年的历史。|Dân tộc Trung Hoa có lịch sử năm nghìn năm.
春节是中华民族的传统节日。|Tết là ngày lễ truyền thống của dân tộc Trung Hoa.
中华民族很重视家庭。|Dân tộc Trung Hoa rất coi trọng gia đình.
这是中华民族的文化。|Đây là văn hóa của dân tộc Trung Hoa.
中华民族有很多优秀传统。|Dân tộc Trung Hoa có nhiều truyền thống tốt đẹp.
#种子
春天要种种子。|Mùa xuân phải gieo hạt.
这是什么花的种子？|Đây là hạt giống của loài hoa gì?
种子发芽了。|Hạt giống nảy mầm rồi.
我买了一些种子。|Tôi mua một ít hạt giống.
希望的种子在心里。|Hạt giống hy vọng nằm trong lòng.
#重大
这是一个重大的决定。|Đây là một quyết định trọng đại.
今天有重大新闻。|Hôm nay có tin tức quan trọng.
他犯了重大错误。|Anh ấy mắc lỗi nghiêm trọng.
这件事意义重大。|Việc này có ý nghĩa trọng đại.
我们取得了重大进展。|Chúng tôi đạt được tiến triển lớn.
#猪
农民养了很多猪。|Nông dân nuôi nhiều lợn.
我喜欢吃猪肉。|Tôi thích ăn thịt lợn.
我属猪。|Tôi tuổi Hợi.
这只猪很胖。|Con lợn này rất béo.
他睡得像猪一样。|Anh ấy ngủ như heo.
#主持
今天的会议由他主持。|Cuộc họp hôm nay do anh ấy chủ trì.
她主持了一个电视节目。|Cô ấy dẫn một chương trình truyền hình.
谁来主持晚会？|Ai sẽ dẫn chương trình dạ hội?
他是节目主持人。|Anh ấy là người dẫn chương trình.
主持人请大家安静。|Người dẫn chương trình mời mọi người giữ trật tự.
#主动
他主动帮助我。|Anh ấy chủ động giúp tôi.
上课要主动回答问题。|Trong giờ học phải chủ động trả lời câu hỏi.
你要主动一点儿。|Bạn phải chủ động một chút.
她主动给我打电话。|Cô ấy chủ động gọi điện cho tôi.
主动学习效果更好。|Chủ động học tập hiệu quả hơn.
#主任
他是我们的班主任。|Thầy ấy là giáo viên chủ nhiệm của chúng tôi.
主任在办公室。|Chủ nhiệm đang ở văn phòng.
她是医院的主任。|Bà ấy là trưởng khoa bệnh viện.
主任让我们开会。|Chủ nhiệm bảo chúng tôi họp.
新主任很年轻。|Chủ nhiệm mới rất trẻ.
#主意
这是个好主意。|Đây là một ý hay.
你有什么主意？|Bạn có ý gì không?
我改变主意了。|Tôi đổi ý rồi.
他没有主意。|Anh ấy không có chủ kiến.
这是谁出的主意？|Đây là ý của ai vậy?
#主张
我主张早点儿出发。|Tôi chủ trương xuất phát sớm.
他的主张很合理。|Chủ trương của anh ấy rất hợp lý.
大家主张一起去。|Mọi người đề xuất cùng đi.
你有什么主张？|Bạn có chủ trương gì?
我不同意他的主张。|Tôi không đồng ý với chủ trương của anh ấy.
#抓
小猫抓住了一只老鼠。|Con mèo bắt được một con chuột.
警察抓了小偷。|Cảnh sát bắt kẻ trộm.
请抓紧时间。|Hãy tranh thủ thời gian.
他用手抓东西吃。|Anh ấy bốc đồ ăn bằng tay.
抓好学习。|Nắm chắc việc học.
#抓住
一定要抓住机会。|Nhất định phải nắm lấy cơ hội.
他抓住了我的手。|Anh ấy nắm lấy tay tôi.
警察抓住了小偷。|Cảnh sát bắt được kẻ trộm.
抓住重点学习。|Nắm lấy trọng tâm để học.
我没抓住他说的意思。|Tôi không nắm được ý anh ấy nói.
#专家
他是一位医学专家。|Ông ấy là một chuyên gia y học.
我们请了一位专家。|Chúng tôi mời một chuyên gia.
专家说要多喝水。|Chuyên gia nói phải uống nhiều nước.
他是电脑专家。|Anh ấy là chuyên gia máy tính.
专家的意见很重要。|Ý kiến chuyên gia rất quan trọng.
#专门
我是专门来看你的。|Tôi đến đây chuyên để thăm bạn.
这是专门给孩子的书。|Đây là sách dành riêng cho trẻ em.
他专门研究历史。|Anh ấy chuyên nghiên cứu lịch sử.
这家店专门卖茶。|Cửa hàng này chuyên bán trà.
我专门为你做了这个菜。|Tôi làm món này riêng cho bạn.
#专题
今天的专题是环保。|Chuyên đề hôm nay là bảo vệ môi trường.
电视台做了一个专题节目。|Đài truyền hình làm một chương trình chuyên đề.
我们讨论这个专题。|Chúng ta thảo luận chuyên đề này.
这是一篇专题报道。|Đây là một bài phóng sự chuyên đề.
他在做专题研究。|Anh ấy đang nghiên cứu chuyên đề.
#转
请向左转。|Hãy rẽ trái.
他转过身来。|Anh ấy quay người lại.
请把这个消息转给他。|Hãy chuyển tin này cho anh ấy.
我转到新学校了。|Tôi chuyển sang trường mới rồi.
明天阴转晴。|Mai âm u chuyển nắng.
#转变
他的态度转变了。|Thái độ của anh ấy đã chuyển biến.
我们要转变观念。|Chúng ta phải thay đổi quan niệm.
这是一个大的转变。|Đây là một chuyển biến lớn.
天气转变得很快。|Thời tiết thay đổi rất nhanh.
他转变成了一个好学生。|Cậu ấy đã trở thành một học sinh giỏi.
#状况
他的身体状况很好。|Tình trạng sức khỏe anh ấy rất tốt.
公司的经济状况不好。|Tình hình kinh tế công ty không tốt.
请说说你的学习状况。|Hãy nói về tình hình học tập của bạn.
路上的交通状况怎么样？|Tình trạng giao thông trên đường thế nào?
状况越来越好了。|Tình trạng ngày càng tốt hơn.
#状态
他今天状态很好。|Hôm nay anh ấy phong độ rất tốt.
我现在没有状态。|Bây giờ tôi không có tinh thần.
机器处于工作状态。|Máy đang ở trạng thái hoạt động.
保持好的状态。|Giữ trạng thái tốt.
考试前要调整状态。|Trước kỳ thi phải điều chỉnh trạng thái.
#追
狗在追猫。|Con chó đang đuổi con mèo.
快追上他！|Mau đuổi kịp anh ấy!
他在追一个女孩。|Anh ấy đang theo đuổi một cô gái.
我们要追上别人。|Chúng ta phải đuổi kịp người khác.
她在追一部电视剧。|Cô ấy đang cày một bộ phim truyền hình.
#准
这里不准吸烟。|Ở đây cấm hút thuốc.
你的发音很准。|Phát âm của bạn rất chuẩn.
天气预报不太准。|Dự báo thời tiết không chính xác lắm.
我的表很准。|Đồng hồ của tôi rất chuẩn.
老师不准我们迟到。|Thầy không cho phép chúng tôi đến muộn.
#资格
你有资格参加比赛。|Bạn có tư cách tham gia cuộc thi.
他没有资格说我。|Anh ấy không có tư cách nói tôi.
她获得了教师资格。|Cô ấy đạt chứng chỉ giáo viên.
要有资格证才能工作。|Phải có chứng chỉ mới được làm việc.
他是最有资格的人。|Anh ấy là người có đủ tư cách nhất.
#资金
我们需要很多资金。|Chúng tôi cần nhiều vốn.
资金不够。|Vốn không đủ.
开公司要有资金。|Mở công ty phải có vốn.
这笔资金用来买设备。|Khoản vốn này dùng để mua thiết bị.
资金问题解决了。|Vấn đề vốn đã được giải quyết.
#自从
自从来了越南，他爱上了越南菜。|Từ khi đến Việt Nam, anh ấy mê món Việt.
自从上大学，我就没回过家。|Từ khi lên đại học, tôi chưa về nhà lần nào.
自从他走了以后，我很想他。|Từ khi anh ấy đi, tôi rất nhớ anh ấy.
自从学了汉语，我交了很多中国朋友。|Từ khi học tiếng Trung, tôi kết bạn với nhiều người Trung Quốc.
自从那天以后，我们成了朋友。|Từ hôm đó, chúng tôi trở thành bạn.
#自动
门会自动打开。|Cửa sẽ tự động mở.
这是一台自动洗衣机。|Đây là một chiếc máy giặt tự động.
灯自动关了。|Đèn tự tắt.
电脑会自动保存文件。|Máy tính sẽ tự động lưu tài liệu.
他自动离开了。|Anh ấy tự rời đi.
#自觉
他学习很自觉。|Anh ấy học tập rất tự giác.
请大家自觉排队。|Mời mọi người tự giác xếp hàng.
孩子要自觉做作业。|Trẻ con phải tự giác làm bài tập.
我自觉没有做错。|Tôi tự thấy mình không làm sai.
自觉遵守规定。|Tự giác tuân thủ quy định.
#自身
要先了解自身的问题。|Phải hiểu vấn đề của bản thân trước.
我们要提高自身能力。|Chúng ta phải nâng cao năng lực bản thân.
他注意自身安全。|Anh ấy chú ý an toàn bản thân.
每个人要对自身负责。|Mỗi người phải chịu trách nhiệm với bản thân.
自身的努力最重要。|Sự nỗ lực của bản thân là quan trọng nhất.
#自主
孩子要学会自主学习。|Trẻ phải học cách tự học.
我们自主决定。|Chúng tôi tự quyết định.
这是自主研发的产品。|Đây là sản phẩm tự nghiên cứu phát triển.
他是一个很自主的人。|Anh ấy là người rất tự chủ.
大学生活要自主安排。|Cuộc sống đại học phải tự sắp xếp.
#子女
父母很爱子女。|Cha mẹ rất thương con cái.
他有两个子女。|Ông ấy có hai người con.
子女要孝顺父母。|Con cái phải hiếu thảo với cha mẹ.
子女的教育很重要。|Giáo dục con cái rất quan trọng.
她的子女都在国外。|Con cái bà ấy đều ở nước ngoài.
#总
他总是迟到。|Anh ấy luôn đến muộn.
总的来说，我很满意。|Nhìn chung tôi rất hài lòng.
总共多少钱？|Tổng cộng bao nhiêu tiền?
他是公司的总经理。|Ông ấy là tổng giám đốc công ty.
你总这么说。|Bạn lúc nào cũng nói vậy.
#总结
请总结一下今天的课。|Hãy tổng kết bài học hôm nay.
我们开了一个总结会。|Chúng tôi họp tổng kết.
年底要写工作总结。|Cuối năm phải viết tổng kết công việc.
他总结了很多经验。|Anh ấy đúc kết nhiều kinh nghiệm.
总结一下，有三个问题。|Tóm lại, có ba vấn đề.
#足够
时间足够了。|Thời gian đủ rồi.
我有足够的钱。|Tôi có đủ tiền.
这些菜足够我们吃。|Chỗ món này đủ cho chúng ta ăn.
你要有足够的耐心。|Bạn phải có đủ kiên nhẫn.
房间足够大。|Phòng đủ rộng.
#足球
他喜欢踢足球。|Anh ấy thích đá bóng.
今天晚上有足球比赛。|Tối nay có trận bóng đá.
足球是世界上最受欢迎的运动。|Bóng đá là môn thể thao được yêu thích nhất thế giới.
我们去看足球吧。|Chúng ta đi xem bóng đá nhé.
他是足球运动员。|Anh ấy là cầu thủ bóng đá.
#组合
这是一个很好的组合。|Đây là một sự kết hợp rất tốt.
他们是一个音乐组合。|Họ là một nhóm nhạc.
这两种颜色组合起来很漂亮。|Hai màu này kết hợp lại rất đẹp.
请把这些字组合成句子。|Hãy ghép những chữ này thành câu.
我们换个组合试试。|Chúng ta thử đổi cách kết hợp.
#左右
他三十岁左右。|Anh ấy khoảng ba mươi tuổi.
我八点左右到。|Tôi đến khoảng tám giờ.
过马路要看左右。|Qua đường phải nhìn trái phải.
这本书五十块左右。|Cuốn sách này khoảng năm mươi đồng.
房子左右都有树。|Hai bên nhà đều có cây.
#作品
这是他的新作品。|Đây là tác phẩm mới của anh ấy.
我很喜欢他的作品。|Tôi rất thích tác phẩm của ông ấy.
这些作品都很有名。|Những tác phẩm này đều rất nổi tiếng.
学生的作品在墙上。|Tác phẩm của học sinh ở trên tường.
这部作品写了十年。|Tác phẩm này viết mất mười năm.
#作者
这本书的作者是谁？|Tác giả cuốn sách này là ai?
作者是一个越南人。|Tác giả là một người Việt Nam.
我见过这本书的作者。|Tôi từng gặp tác giả cuốn sách này.
作者想告诉我们什么？|Tác giả muốn nói với chúng ta điều gì?
这位作者写了很多小说。|Tác giả này viết nhiều tiểu thuyết.
`;
export const EXAMPLES23 = {};
let cur = null;
for (const line of RAW.split('\n')) {
  if (!line.trim()) continue;
  if (line[0] === '#') { cur = line.slice(1).trim(); EXAMPLES23[cur] = []; continue; }
  const i = line.indexOf('|');
  EXAMPLES23[cur].push([line.slice(0, i), line.slice(i + 1)]);
}
