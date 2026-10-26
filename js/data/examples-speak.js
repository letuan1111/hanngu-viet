// 5 câu ví dụ cho mỗi từ mới trong phần Luyện nói (các từ chưa có trong bộ 5 câu HSK 1).
// Định dạng: "#từ" rồi 5 dòng "câu Trung|nghĩa Việt".
const RAW = `
#自己
我想介绍一下自己。|Tôi muốn giới thiệu về bản thân.
这件事我自己做。|Việc này tôi tự làm.
你要相信自己。|Bạn phải tin vào bản thân.
他自己一个人去了北京。|Anh ấy tự mình đi Bắc Kinh.
要学会照顾自己。|Phải học cách tự chăm sóc bản thân.
#城市
我住在一个小城市。|Tôi sống ở một thành phố nhỏ.
北京是一个很大的城市。|Bắc Kinh là một thành phố rất lớn.
你最喜欢哪个城市？|Bạn thích thành phố nào nhất?
这个城市很干净。|Thành phố này rất sạch.
城市里的人很多，车也很多。|Trong thành phố người đông, xe cũng nhiều.
#热情
这里的人很热情。|Người ở đây rất nhiệt tình.
她热情地欢迎我们。|Cô ấy nhiệt tình chào đón chúng tôi.
服务员对客人很热情。|Nhân viên phục vụ rất nhiệt tình với khách.
他对工作非常热情。|Anh ấy rất nhiệt huyết với công việc.
谢谢你的热情帮助。|Cảm ơn sự giúp đỡ nhiệt tình của bạn.
#年级
我是大学二年级的学生。|Tôi là sinh viên năm hai đại học.
你上几年级了？|Bạn học lớp mấy rồi?
我妹妹上三年级。|Em gái tôi học lớp ba.
我们年级有两百个学生。|Khối chúng tôi có hai trăm học sinh.
他比我高一个年级。|Anh ấy học trên tôi một lớp.
#专业
你的专业是什么？|Chuyên ngành của bạn là gì?
我的专业是汉语。|Chuyên ngành của tôi là tiếng Trung.
他学的是电脑专业。|Anh ấy học chuyên ngành máy tính.
这个专业很难找工作吗？|Chuyên ngành này có khó tìm việc không?
我很喜欢我的专业。|Tôi rất thích chuyên ngành của mình.
#性格
她的性格很好。|Tính cách cô ấy rất tốt.
我的性格比较安静。|Tính cách tôi khá trầm lặng.
你喜欢什么性格的人？|Bạn thích người có tính cách thế nào?
我们两个人的性格不一样。|Tính cách hai chúng tôi khác nhau.
他性格开朗，朋友很多。|Anh ấy tính cách cởi mở, có nhiều bạn.
#开朗
她是一个开朗的女孩。|Cô ấy là một cô gái vui vẻ cởi mở.
我的性格很开朗。|Tính cách tôi rất cởi mở.
他越来越开朗了。|Anh ấy ngày càng cởi mở hơn.
开朗的人容易交朋友。|Người cởi mở dễ kết bạn.
听了他的话，我心里开朗了。|Nghe anh ấy nói, lòng tôi nhẹ nhõm hẳn.
#交朋友
我喜欢交朋友。|Tôi thích kết bạn.
在学校我交了很多朋友。|Ở trường tôi kết được nhiều bạn.
你想跟我交朋友吗？|Bạn muốn kết bạn với tôi không?
学汉语可以交很多中国朋友。|Học tiếng Trung có thể kết nhiều bạn Trung Quốc.
他不太会交朋友。|Anh ấy không giỏi kết bạn lắm.
#优点
你的优点是什么？|Ưu điểm của bạn là gì?
他的优点是很认真。|Ưu điểm của anh ấy là rất chăm chỉ.
这个手机的优点是便宜。|Ưu điểm của chiếc điện thoại này là rẻ.
每个人都有自己的优点。|Ai cũng có ưu điểm riêng.
坐火车的优点很多。|Đi tàu có nhiều ưu điểm.
#缺点
我的缺点是太着急。|Nhược điểm của tôi là quá nóng vội.
每个人都有缺点。|Ai cũng có nhược điểm.
这个房子的缺点是离学校远。|Nhược điểm của ngôi nhà này là xa trường.
你知道自己的缺点吗？|Bạn có biết nhược điểm của mình không?
他正在改自己的缺点。|Anh ấy đang sửa nhược điểm của mình.
#计划
你有什么计划？|Bạn có kế hoạch gì?
我做了一个学习计划。|Tôi lập một kế hoạch học tập.
我们计划明年去中国。|Chúng tôi dự định năm sau đi Trung Quốc.
计划有了变化。|Kế hoạch có thay đổi.
做事要有计划。|Làm việc phải có kế hoạch.
#留学
我想去中国留学。|Tôi muốn đi du học Trung Quốc.
他在北京留学了两年。|Anh ấy du học ở Bắc Kinh hai năm.
留学的生活怎么样？|Cuộc sống du học thế nào?
很多越南学生去国外留学。|Nhiều sinh viên Việt Nam đi du học nước ngoài.
我正在准备留学的材料。|Tôi đang chuẩn bị hồ sơ du học.
#提高
我想提高我的汉语水平。|Tôi muốn nâng cao trình độ tiếng Trung.
多练习可以提高口语。|Luyện tập nhiều có thể nâng cao khẩu ngữ.
他的成绩提高了很多。|Thành tích của cậu ấy tăng lên nhiều.
怎么提高学习效果？|Làm sao nâng cao hiệu quả học tập?
今年东西的价钱提高了。|Năm nay giá cả tăng lên rồi.
#水平
你的汉语水平很高。|Trình độ tiếng Trung của bạn rất cao.
我想提高我的英语水平。|Tôi muốn nâng cao trình độ tiếng Anh.
他的水平比我高。|Trình độ của anh ấy cao hơn tôi.
这个考试可以看出你的水平。|Kỳ thi này có thể thấy trình độ của bạn.
我们的生活水平越来越高了。|Mức sống của chúng ta ngày càng cao.
#毕业
我明年大学毕业。|Năm sau tôi tốt nghiệp đại học.
毕业以后你想做什么？|Tốt nghiệp xong bạn muốn làm gì?
他去年毕业了。|Anh ấy tốt nghiệp năm ngoái.
我们是毕业十年的老同学。|Chúng tôi là bạn học cũ đã tốt nghiệp mười năm.
毕业的时候，大家都很难过。|Lúc tốt nghiệp, mọi người đều rất buồn.
#俱乐部
我参加了学校的汉语俱乐部。|Tôi tham gia câu lạc bộ tiếng Trung của trường.
这个俱乐部每周活动一次。|Câu lạc bộ này mỗi tuần sinh hoạt một lần.
他是足球俱乐部的。|Anh ấy ở câu lạc bộ bóng đá.
你想参加什么俱乐部？|Bạn muốn tham gia câu lạc bộ nào?
俱乐部里有很多新朋友。|Trong câu lạc bộ có nhiều bạn mới.
#信心
我对考试很有信心。|Tôi rất tự tin vào kỳ thi.
你要对自己有信心。|Bạn phải tin vào bản thân.
老师给了我很多信心。|Thầy cô cho tôi nhiều tự tin.
他没有信心了。|Anh ấy mất tự tin rồi.
有信心就能成功。|Có lòng tin thì sẽ thành công.
#个子
他个子很高。|Anh ấy dáng người rất cao.
我个子不高。|Tôi không cao.
那个高个子的人是谁？|Người cao kia là ai?
弟弟的个子比我高了。|Em trai cao hơn tôi rồi.
她个子小，但是很有力气。|Cô ấy nhỏ người nhưng rất khỏe.
#总是
他总是很早来学校。|Cậu ấy luôn đến trường rất sớm.
妈妈总是笑着说话。|Mẹ lúc nào cũng cười khi nói chuyện.
你为什么总是迟到？|Tại sao bạn luôn đến muộn?
这里的冬天总是很冷。|Mùa đông ở đây luôn rất lạnh.
我总是忘记带钥匙。|Tôi luôn quên mang chìa khóa.
#打扫
我每天打扫房间。|Ngày nào tôi cũng dọn phòng.
请把教室打扫干净。|Hãy quét dọn lớp học sạch sẽ.
周末我帮妈妈打扫家里。|Cuối tuần tôi giúp mẹ dọn nhà.
今天谁打扫？|Hôm nay ai quét dọn?
打扫完了，我们休息吧。|Dọn xong rồi, chúng ta nghỉ thôi.
#从来
我从来不喝酒。|Tôi chưa bao giờ uống rượu.
他从来没去过中国。|Anh ấy chưa từng đến Trung Quốc.
妈妈从来不生气。|Mẹ chưa bao giờ giận.
我从来没见过这么大的雪。|Tôi chưa từng thấy tuyết lớn như vậy.
她从来不迟到。|Cô ấy chưa bao giờ đến muộn.
#照顾
妈妈照顾我很辛苦。|Mẹ chăm sóc tôi rất vất vả.
你要好好照顾自己。|Bạn phải tự chăm sóc bản thân thật tốt.
我在医院照顾奶奶。|Tôi chăm sóc bà ở bệnh viện.
谢谢你照顾我的猫。|Cảm ơn bạn đã chăm sóc con mèo của tôi.
姐姐常常照顾弟弟。|Chị gái thường chăm sóc em trai.
#鼓励
老师常常鼓励我们。|Thầy cô thường động viên chúng tôi.
谢谢你的鼓励！|Cảm ơn sự động viên của bạn!
妈妈鼓励我再试一次。|Mẹ động viên tôi thử lại lần nữa.
朋友的鼓励让我很感动。|Sự động viên của bạn bè khiến tôi rất cảm động.
我们应该多鼓励孩子。|Chúng ta nên động viên trẻ nhiều hơn.
#诚实
他是一个诚实的人。|Anh ấy là một người trung thực.
做人要诚实。|Làm người phải trung thực.
诚实的孩子不说假话。|Trẻ trung thực không nói dối.
请诚实地回答。|Hãy trả lời thật lòng.
我喜欢诚实的朋友。|Tôi thích những người bạn trung thực.
#关心
谢谢你的关心。|Cảm ơn sự quan tâm của bạn.
妈妈很关心我的身体。|Mẹ rất quan tâm sức khỏe của tôi.
老师关心每一个学生。|Thầy cô quan tâm từng học sinh.
你要多关心家人。|Bạn nên quan tâm gia đình nhiều hơn.
他不太关心新闻。|Anh ấy không quan tâm tin tức lắm.
#世界
世界很大，我想去看看。|Thế giới rộng lớn, tôi muốn đi xem.
这是世界上最高的山。|Đây là ngọn núi cao nhất thế giới.
妈妈做的菜是世界上最好吃的。|Món mẹ nấu ngon nhất trên đời.
他去过世界很多地方。|Anh ấy đã đi nhiều nơi trên thế giới.
我们只有一个世界。|Chúng ta chỉ có một thế giới.
#外地
我在外地上大学。|Tôi học đại học ở nơi khác.
他是外地人。|Anh ấy là người nơi khác.
春节的时候，外地人都回家了。|Dịp Tết, người nơi khác đều về quê.
我爸爸常常去外地工作。|Bố tôi thường đi công tác nơi khác.
在外地生活要照顾好自己。|Sống ở nơi khác phải tự chăm sóc tốt bản thân.
#健康
祝你身体健康！|Chúc bạn sức khỏe!
健康是最重要的。|Sức khỏe là quan trọng nhất.
多运动对健康好。|Vận động nhiều tốt cho sức khỏe.
我奶奶的身体很健康。|Bà tôi rất khỏe mạnh.
我们要吃健康的东西。|Chúng ta phải ăn đồ ăn lành mạnh.
#提前
我们提前十分钟到了。|Chúng tôi đến sớm mười phút.
请提前告诉我。|Hãy báo trước cho tôi.
考试提前了一天。|Kỳ thi được dời sớm một ngày.
我提前买好了车票。|Tôi đã mua vé xe trước rồi.
旅游要提前做好准备。|Đi du lịch phải chuẩn bị trước.
#满足
他对现在的生活很满足。|Anh ấy rất hài lòng với cuộc sống hiện tại.
我们会满足你的要求。|Chúng tôi sẽ đáp ứng yêu cầu của bạn.
只要你开心，我就满足了。|Chỉ cần bạn vui là tôi mãn nguyện rồi.
人要学会满足。|Con người phải biết đủ.
这个答案不能让我满足。|Câu trả lời này không làm tôi thỏa mãn.
#幸福
我有一个幸福的家。|Tôi có một gia đình hạnh phúc.
祝你们幸福！|Chúc các bạn hạnh phúc!
幸福其实很简单。|Hạnh phúc thực ra rất đơn giản.
和家人在一起很幸福。|Ở bên gia đình rất hạnh phúc.
他们生活得很幸福。|Họ sống rất hạnh phúc.
#姓
您贵姓？|Ông/bà họ gì ạ?
我姓王。|Tôi họ Vương.
他姓什么？|Anh ấy họ gì?
我们的老师姓李。|Thầy giáo chúng tôi họ Lý.
在越南，很多人姓阮。|Ở Việt Nam, nhiều người họ Nguyễn.
#戴
她戴着一副眼镜。|Cô ấy đeo một cặp kính.
外边很冷，戴上帽子吧。|Bên ngoài lạnh, đội mũ vào đi.
我不喜欢戴手表。|Tôi không thích đeo đồng hồ.
那个戴红帽子的人是我哥哥。|Người đội mũ đỏ kia là anh tôi.
骑车要戴好头盔。|Đi xe phải đội mũ bảo hiểm cẩn thận.
#眼镜
我的眼镜呢？|Kính của tôi đâu?
他戴眼镜。|Anh ấy đeo kính.
我想买一副新眼镜。|Tôi muốn mua một cặp kính mới.
不戴眼镜我看不清楚。|Không đeo kính tôi nhìn không rõ.
你的眼镜很好看。|Kính của bạn rất đẹp.
#温柔
她说话很温柔。|Cô ấy nói chuyện rất dịu dàng.
妈妈是一个温柔的人。|Mẹ là một người dịu dàng.
他对孩子很温柔。|Anh ấy rất dịu dàng với trẻ con.
她温柔地笑了。|Cô ấy mỉm cười dịu dàng.
我喜欢温柔的声音。|Tôi thích giọng nói dịu dàng.
#文化
我对中国文化很感兴趣。|Tôi rất hứng thú với văn hóa Trung Quốc.
每个国家都有自己的文化。|Mỗi nước đều có văn hóa riêng.
学语言也要了解文化。|Học ngôn ngữ cũng phải hiểu văn hóa.
越南和中国的文化有很多相同的地方。|Văn hóa Việt Nam và Trung Quốc có nhiều điểm giống nhau.
这是一个有文化的城市。|Đây là một thành phố giàu văn hóa.
#历史
中国的历史很长。|Lịch sử Trung Quốc rất lâu đời.
我喜欢看历史书。|Tôi thích đọc sách lịch sử.
这个城市有一千年的历史。|Thành phố này có lịch sử một nghìn năm.
历史课很有意思。|Tiết lịch sử rất thú vị.
我们要记住历史。|Chúng ta phải ghi nhớ lịch sử.
#耐心
老师很有耐心。|Thầy giáo rất kiên nhẫn.
请耐心等一下。|Xin kiên nhẫn đợi một chút.
学语言要有耐心。|Học ngôn ngữ phải kiên nhẫn.
他没有耐心听我说话。|Anh ấy không kiên nhẫn nghe tôi nói.
她耐心地回答了我的问题。|Cô ấy kiên nhẫn trả lời câu hỏi của tôi.
#愿意
你愿意帮我吗？|Bạn có sẵn lòng giúp tôi không?
我愿意跟你一起去。|Tôi sẵn lòng đi cùng bạn.
他不愿意说。|Anh ấy không muốn nói.
你愿意做我的朋友吗？|Bạn có muốn làm bạn của tôi không?
只要你愿意，我们就开始吧。|Chỉ cần bạn đồng ý, chúng ta bắt đầu thôi.
#感冒
我感冒了。|Tôi bị cảm rồi.
天冷了，小心感冒。|Trời lạnh rồi, cẩn thận bị cảm.
你感冒好了吗？|Bạn khỏi cảm chưa?
感冒的时候要多喝水。|Khi bị cảm phải uống nhiều nước.
他得了感冒，没来上课。|Cậu ấy bị cảm, không đến lớp.
#内容
这本书的内容很有意思。|Nội dung cuốn sách này rất thú vị.
今天上课的内容是什么？|Nội dung bài học hôm nay là gì?
请复习昨天的内容。|Hãy ôn lại nội dung hôm qua.
考试内容很多。|Nội dung thi rất nhiều.
我没听懂他说话的内容。|Tôi không nghe hiểu nội dung anh ấy nói.
#复习
今天我要复习汉语。|Hôm nay tôi phải ôn tiếng Trung.
你复习好了吗？|Bạn ôn xong chưa?
我们一起复习吧。|Chúng ta cùng ôn bài nhé.
考试前要好好复习。|Trước kỳ thi phải ôn tập kỹ.
每天复习一点儿，效果很好。|Mỗi ngày ôn một chút, hiệu quả rất tốt.
#组织
学校组织我们去参观。|Trường tổ chức cho chúng tôi đi tham quan.
这次活动是谁组织的？|Hoạt động lần này do ai tổ chức?
他很会组织活动。|Anh ấy rất giỏi tổ chức hoạt động.
我们组织了一个晚会。|Chúng tôi đã tổ chức một buổi tiệc tối.
老师组织大家讨论。|Thầy tổ chức cho mọi người thảo luận.
#参加
我参加了汉语比赛。|Tôi đã tham gia cuộc thi tiếng Trung.
你参加明天的会吗？|Bạn có tham gia cuộc họp ngày mai không?
很多人参加了这个活动。|Nhiều người đã tham gia hoạt động này.
我想参加学校的足球队。|Tôi muốn tham gia đội bóng của trường.
他没有参加考试。|Anh ấy không tham gia kỳ thi.
#活动
学校有很多活动。|Trường có nhiều hoạt động.
这个周末有什么活动？|Cuối tuần này có hoạt động gì?
我喜欢参加户外活动。|Tôi thích tham gia hoạt động ngoài trời.
活动八点开始。|Hoạt động bắt đầu lúc tám giờ.
坐久了要活动活动身体。|Ngồi lâu phải vận động cơ thể một chút.
#成为
我想成为一名老师。|Tôi muốn trở thành một giáo viên.
他成为了我最好的朋友。|Anh ấy đã trở thành bạn thân nhất của tôi.
努力学习，成为有用的人。|Học tập chăm chỉ, trở thành người có ích.
这里成为了有名的旅游地方。|Nơi này đã trở thành điểm du lịch nổi tiếng.
她的梦想是成为医生。|Ước mơ của cô ấy là trở thành bác sĩ.
#感谢
感谢你的帮助！|Cảm ơn sự giúp đỡ của bạn!
我很感谢我的老师。|Tôi rất biết ơn thầy cô của tôi.
非常感谢大家！|Vô cùng cảm ơn mọi người!
我不知道怎么感谢你。|Tôi không biết cảm ơn bạn thế nào.
他写信感谢医生。|Anh ấy viết thư cảm ơn bác sĩ.
#眼睛
她的眼睛很大。|Mắt cô ấy rất to.
我的眼睛有点儿疼。|Mắt tôi hơi đau.
别看太久手机，对眼睛不好。|Đừng xem điện thoại quá lâu, không tốt cho mắt.
请闭上眼睛。|Hãy nhắm mắt lại.
小猫的眼睛是蓝色的。|Mắt con mèo con màu xanh lam.
#特别
今天特别冷。|Hôm nay đặc biệt lạnh.
我特别喜欢吃包子。|Tôi đặc biệt thích ăn bánh bao.
这个礼物很特别。|Món quà này rất đặc biệt.
他学习很好，特别是数学。|Cậu ấy học rất giỏi, đặc biệt là toán.
今天是一个特别的日子。|Hôm nay là một ngày đặc biệt.
#数学
我数学不太好。|Tôi học toán không giỏi lắm.
他是数学老师。|Anh ấy là giáo viên toán.
今天有数学考试。|Hôm nay có bài kiểm tra toán.
你喜欢数学吗？|Bạn có thích toán không?
这道数学题很难。|Bài toán này rất khó.
#咖啡馆
我们在咖啡馆见面吧。|Chúng ta gặp nhau ở quán cà phê nhé.
学校旁边有一个咖啡馆。|Cạnh trường có một quán cà phê.
我喜欢在咖啡馆看书。|Tôi thích đọc sách ở quán cà phê.
这个咖啡馆的咖啡很好喝。|Cà phê ở quán này rất ngon.
周末咖啡馆里人很多。|Cuối tuần quán cà phê rất đông người.
#聊天
我们一边喝茶一边聊天。|Chúng tôi vừa uống trà vừa trò chuyện.
我常常跟朋友在网上聊天。|Tôi thường nhắn tin với bạn bè trên mạng.
上课的时候别聊天。|Trong giờ học đừng nói chuyện riêng.
我们聊了很长时间。|Chúng tôi nói chuyện rất lâu.
跟你聊天很开心。|Nói chuyện với bạn rất vui.
#不同
我们的爱好不同。|Sở thích của chúng tôi khác nhau.
每个人的想法都不同。|Suy nghĩ của mỗi người đều khác nhau.
这两个字有什么不同？|Hai chữ này có gì khác nhau?
我们在不同的学校学习。|Chúng tôi học ở các trường khác nhau.
不同的国家有不同的文化。|Các nước khác nhau có văn hóa khác nhau.
#关系
我们的关系很好。|Quan hệ của chúng tôi rất tốt.
没关系。|Không sao.
你和他是什么关系？|Bạn và anh ấy có quan hệ gì?
两国的关系越来越好。|Quan hệ hai nước ngày càng tốt.
这件事跟我没有关系。|Việc này không liên quan đến tôi.
#永远
我永远不会忘记你。|Tôi sẽ mãi mãi không quên bạn.
我们永远是好朋友。|Chúng ta mãi là bạn tốt.
家永远是最温暖的地方。|Nhà mãi là nơi ấm áp nhất.
他永远那么开心。|Anh ấy lúc nào cũng vui vẻ như vậy.
没有人能永远年轻。|Không ai có thể trẻ mãi.
#爱心
她是一个很有爱心的人。|Cô ấy là một người rất giàu lòng nhân ái.
我们要有爱心，帮助别人。|Chúng ta phải có lòng nhân ái, giúp đỡ người khác.
谢谢大家的爱心！|Cảm ơn tấm lòng của mọi người!
小朋友很有爱心，喜欢小动物。|Bạn nhỏ rất giàu tình yêu thương, thích động vật nhỏ.
这是一家爱心饭馆。|Đây là một quán ăn từ thiện.
#志愿者
我想当志愿者。|Tôi muốn làm tình nguyện viên.
很多大学生是志愿者。|Nhiều sinh viên là tình nguyện viên.
志愿者帮老人打扫房间。|Tình nguyện viên giúp người già dọn phòng.
这次活动需要二十个志愿者。|Hoạt động lần này cần hai mươi tình nguyện viên.
做志愿者很有意义。|Làm tình nguyện viên rất ý nghĩa.
#意义
这个工作很有意义。|Công việc này rất ý nghĩa.
这个词有两个意义。|Từ này có hai nghĩa.
今天对我来说很有意义。|Hôm nay rất có ý nghĩa với tôi.
没有健康，钱也没有意义。|Không có sức khỏe thì tiền cũng vô nghĩa.
我想过有意义的生活。|Tôi muốn sống một cuộc sống ý nghĩa.
#需要
你需要帮忙吗？|Bạn có cần giúp không?
我需要一点儿时间。|Tôi cần một chút thời gian.
学汉语需要多练习。|Học tiếng Trung cần luyện tập nhiều.
你还需要什么？|Bạn còn cần gì nữa?
这里需要会说汉语的人。|Ở đây cần người biết nói tiếng Trung.
#应该
你应该多休息。|Bạn nên nghỉ ngơi nhiều hơn.
我们应该早点儿出发。|Chúng ta nên xuất phát sớm một chút.
不应该说假话。|Không nên nói dối.
他现在应该到家了。|Bây giờ chắc anh ấy về đến nhà rồi.
这是我应该做的。|Đây là việc tôi nên làm.
#真心
我真心谢谢你。|Tôi thật lòng cảm ơn bạn.
他是真心对我好。|Anh ấy thật lòng tốt với tôi.
真心的朋友很少。|Bạn chân thành rất hiếm.
我真心希望你成功。|Tôi thật lòng mong bạn thành công.
这是我的真心话。|Đây là lời thật lòng của tôi.
#面前
他站在我面前。|Anh ấy đứng trước mặt tôi.
别在别人面前说他的坏话。|Đừng nói xấu anh ấy trước mặt người khác.
在困难面前不要放弃。|Trước khó khăn đừng bỏ cuộc.
我在老师面前很紧张。|Trước mặt thầy tôi rất căng thẳng.
你的书就在你面前。|Sách của bạn ở ngay trước mặt bạn.
#出现
他突然出现在门口。|Anh ấy đột nhiên xuất hiện ở cửa.
天上出现了一条彩虹。|Trên trời xuất hiện một cầu vồng.
这个问题常常出现。|Vấn đề này thường xuất hiện.
你需要的时候，我会出现。|Khi bạn cần, tôi sẽ xuất hiện.
考试中出现了很多新词。|Trong bài thi xuất hiện nhiều từ mới.
#遇到
我在路上遇到了老师。|Tôi gặp thầy giáo trên đường.
遇到问题就问我。|Gặp vấn đề thì hỏi tôi.
很高兴遇到你。|Rất vui được gặp bạn.
他遇到了很多困难。|Anh ấy gặp rất nhiều khó khăn.
你在中国遇到过什么有意思的事？|Bạn đã gặp chuyện gì thú vị ở Trung Quốc?
#办法
你有什么好办法？|Bạn có cách gì hay không?
我没有办法。|Tôi hết cách rồi.
我们一起想办法吧。|Chúng ta cùng nghĩ cách nhé.
这是最好的办法。|Đây là cách tốt nhất.
学汉语有很多办法。|Học tiếng Trung có nhiều cách.
#敢
我不敢一个人去。|Tôi không dám đi một mình.
你敢吃这个吗？|Bạn dám ăn cái này không?
他敢说真话。|Anh ấy dám nói thật.
我不敢告诉妈妈。|Tôi không dám nói với mẹ.
上课的时候我不敢说汉语。|Trong giờ học tôi không dám nói tiếng Trung.
#成功
祝你成功！|Chúc bạn thành công!
他终于成功了。|Cuối cùng anh ấy đã thành công.
这次活动很成功。|Hoạt động lần này rất thành công.
成功需要努力。|Thành công cần nỗ lực.
我成功地通过了考试。|Tôi đã thi đỗ thành công.
#成绩
他的成绩很好。|Thành tích của cậu ấy rất tốt.
考试成绩出来了。|Điểm thi có rồi.
我的成绩比上次高。|Điểm của tôi cao hơn lần trước.
你的数学成绩怎么样？|Điểm toán của bạn thế nào?
好成绩是努力的结果。|Thành tích tốt là kết quả của nỗ lực.
#开心
今天我很开心。|Hôm nay tôi rất vui.
祝你每天开心！|Chúc bạn ngày nào cũng vui!
我们玩得很开心。|Chúng tôi chơi rất vui.
他不开心的时候喜欢听歌。|Khi không vui anh ấy thích nghe nhạc.
看到你，我真开心。|Gặp bạn, tôi vui thật.
#同时
他同时学汉语和英语。|Anh ấy học tiếng Trung và tiếng Anh cùng lúc.
我们同时到了。|Chúng tôi đến cùng lúc.
这本书很有意思，同时也很有用。|Cuốn sách này rất thú vị, đồng thời cũng rất có ích.
不要同时做两件事。|Đừng làm hai việc cùng một lúc.
同时，我们也要注意身体。|Đồng thời, chúng ta cũng phải chú ý sức khỏe.
#对待
我们要好好对待别人。|Chúng ta phải đối xử tốt với người khác.
他对待工作很认真。|Anh ấy làm việc rất nghiêm túc.
老师对待每个学生都一样。|Thầy đối xử với mọi học sinh như nhau.
你怎么能这样对待朋友？|Sao bạn có thể đối xử với bạn bè như vậy?
要用真心对待家人。|Phải đối xử với gia đình bằng tấm lòng chân thành.
#不管
不管多忙，我都每天学汉语。|Dù bận đến đâu, ngày nào tôi cũng học tiếng Trung.
不管你去哪儿，我都跟你去。|Bạn đi đâu tôi cũng đi theo.
不管下不下雨，我们都去。|Dù mưa hay không, chúng ta vẫn đi.
不管多难，我都不放弃。|Dù khó thế nào, tôi cũng không bỏ cuộc.
不管谁来，都要说“你好”。|Dù ai đến cũng phải nói “xin chào”.
#幸运
我很幸运有你这样的朋友。|Tôi thật may mắn có người bạn như bạn.
今天真幸运！|Hôm nay may mắn thật!
他很幸运地找到了工作。|Anh ấy may mắn tìm được việc.
祝你好运，希望你幸运。|Chúc bạn may mắn.
能来中国留学，我觉得很幸运。|Được sang Trung Quốc du học, tôi thấy rất may mắn.
#平时
我平时七点起床。|Bình thường tôi dậy lúc bảy giờ.
你平时喜欢做什么？|Bình thường bạn thích làm gì?
平时我很忙，周末才有时间。|Bình thường tôi rất bận, cuối tuần mới có thời gian.
他平时不爱说话。|Thường ngày anh ấy ít nói.
平时多练习，考试就不难。|Bình thường luyện tập nhiều thì thi sẽ không khó.
#互相
我们互相帮助。|Chúng tôi giúp đỡ lẫn nhau.
同学之间要互相学习。|Bạn học phải học hỏi lẫn nhau.
他们互相看了一眼。|Họ nhìn nhau một cái.
朋友要互相关心。|Bạn bè phải quan tâm lẫn nhau.
我们互相介绍了自己。|Chúng tôi tự giới thiệu với nhau.
#饭馆
我们去饭馆吃饭吧。|Chúng ta đi quán ăn ăn cơm nhé.
这个饭馆的菜很好吃。|Món ở quán này rất ngon.
学校旁边有很多小饭馆。|Cạnh trường có nhiều quán ăn nhỏ.
饭馆里人很多。|Trong quán rất đông người.
他在饭馆工作。|Anh ấy làm việc ở quán ăn.
#便宜
这个很便宜。|Cái này rất rẻ.
能便宜一点儿吗？|Có thể rẻ hơn chút không?
这儿的东西又便宜又好。|Đồ ở đây vừa rẻ vừa tốt.
坐火车比坐飞机便宜。|Đi tàu rẻ hơn đi máy bay.
便宜的东西不一定好。|Đồ rẻ chưa chắc đã tốt.
#散步
晚饭以后我们去散步吧。|Ăn tối xong chúng ta đi dạo nhé.
爷爷每天早上在公园散步。|Sáng nào ông cũng đi dạo ở công viên.
散步对身体很好。|Đi dạo rất tốt cho sức khỏe.
我们一边散步一边聊天。|Chúng tôi vừa đi dạo vừa trò chuyện.
天气好的时候我喜欢散步。|Khi trời đẹp tôi thích đi dạo.
#爬山
周末我们去爬山吧。|Cuối tuần chúng ta đi leo núi nhé.
我很喜欢爬山。|Tôi rất thích leo núi.
爬山很累，但是很有意思。|Leo núi rất mệt nhưng rất thú vị.
他们早上六点就去爬山了。|Sáu giờ sáng họ đã đi leo núi rồi.
爬山的时候要穿运动鞋。|Khi leo núi phải đi giày thể thao.
#骑
我骑自行车去学校。|Tôi đạp xe đến trường.
你会骑马吗？|Bạn biết cưỡi ngựa không?
他骑摩托车上班。|Anh ấy đi xe máy đi làm.
骑车的时候要小心。|Khi đi xe phải cẩn thận.
我骑了一个小时的车。|Tôi đã đạp xe một tiếng.
#家乡
我的家乡在越南中部。|Quê tôi ở miền Trung Việt Nam.
你的家乡在哪儿？|Quê bạn ở đâu?
我很想念家乡。|Tôi rất nhớ quê hương.
家乡的菜最好吃。|Món ăn quê nhà ngon nhất.
春节我要回家乡。|Tết tôi sẽ về quê.
#旅游
我喜欢旅游。|Tôi thích du lịch.
暑假你去哪儿旅游？|Nghỉ hè bạn đi du lịch ở đâu?
我们一家人去中国旅游了。|Cả nhà tôi đã đi du lịch Trung Quốc.
旅游可以让人放松。|Du lịch giúp con người thư giãn.
这里是有名的旅游城市。|Đây là thành phố du lịch nổi tiếng.
#海边
我们去海边玩儿吧。|Chúng ta đi biển chơi nhé.
我家就在海边。|Nhà tôi ở ngay cạnh biển.
海边的空气很好。|Không khí ở biển rất trong lành.
夏天海边人很多。|Mùa hè bãi biển rất đông người.
我们在海边看日出。|Chúng tôi ngắm bình minh trên biển.
#照片
这是我小时候的照片。|Đây là ảnh hồi nhỏ của tôi.
我们拍张照片吧。|Chúng ta chụp một tấm ảnh nhé.
你的照片很漂亮。|Ảnh của bạn rất đẹp.
他给我发了很多照片。|Anh ấy gửi cho tôi nhiều ảnh.
墙上有一张全家的照片。|Trên tường có một tấm ảnh cả gia đình.
#加油
加油！你一定能行！|Cố lên! Bạn nhất định làm được!
大家一起加油！|Mọi người cùng cố gắng nào!
考试加油！|Thi tốt nhé!
我们给他加油吧。|Chúng ta cổ vũ anh ấy đi.
车没油了，要去加油。|Xe hết xăng rồi, phải đi đổ xăng.
#选
你选哪个？|Bạn chọn cái nào?
我选了汉语专业。|Tôi đã chọn chuyên ngành tiếng Trung.
请选一个你喜欢的。|Hãy chọn một cái bạn thích.
他被选为班长。|Cậu ấy được chọn làm lớp trưởng.
这两个都很好，我不知道选哪个。|Cả hai đều tốt, tôi không biết chọn cái nào.
#原因
你迟到的原因是什么？|Lý do bạn đến muộn là gì?
我学汉语有三个原因。|Tôi học tiếng Trung vì ba lý do.
他没说原因就走了。|Anh ấy đi mà không nói lý do.
这就是我喜欢他的原因。|Đó chính là lý do tôi thích anh ấy.
我们要找到问题的原因。|Chúng ta phải tìm ra nguyên nhân của vấn đề.
#风景
这里的风景很美。|Phong cảnh ở đây rất đẹp.
我喜欢看风景。|Tôi thích ngắm cảnh.
从山上看，风景特别漂亮。|Nhìn từ trên núi, phong cảnh đặc biệt đẹp.
坐火车可以看风景。|Đi tàu có thể ngắm cảnh.
桂林的风景很有名。|Phong cảnh Quế Lâm rất nổi tiếng.
#心情
今天我的心情很好。|Hôm nay tâm trạng tôi rất tốt.
你心情不好吗？|Bạn tâm trạng không tốt à?
听音乐可以让心情变好。|Nghe nhạc giúp tâm trạng tốt hơn.
下雨天我的心情不太好。|Ngày mưa tâm trạng tôi không tốt lắm.
我理解你的心情。|Tôi hiểu tâm trạng của bạn.
#游泳
我会游泳。|Tôi biết bơi.
夏天我常常去游泳。|Mùa hè tôi thường đi bơi.
游泳对身体很好。|Bơi rất tốt cho sức khỏe.
他游泳游得很快。|Anh ấy bơi rất nhanh.
这里能游泳吗？|Ở đây có được bơi không?
#晒太阳
猫喜欢晒太阳。|Mèo thích phơi nắng.
冬天晒太阳很舒服。|Mùa đông tắm nắng rất dễ chịu.
奶奶在门口晒太阳。|Bà đang sưởi nắng ở trước cửa.
我们在海边晒太阳。|Chúng tôi tắm nắng ở bãi biển.
别晒太阳太久。|Đừng phơi nắng quá lâu.
#沙滩
沙滩上有很多人。|Trên bãi cát có rất nhiều người.
孩子们在沙滩上玩儿。|Bọn trẻ chơi trên bãi cát.
这个沙滩很干净。|Bãi cát này rất sạch.
我们在沙滩上散步。|Chúng tôi đi dạo trên bãi cát.
沙滩很热，要穿鞋。|Bãi cát rất nóng, phải đi giày.
#海鲜
我喜欢吃海鲜。|Tôi thích ăn hải sản.
这里的海鲜很新鲜。|Hải sản ở đây rất tươi.
海鲜贵不贵？|Hải sản có đắt không?
我对海鲜过敏。|Tôi bị dị ứng hải sản.
我们去海边吃海鲜吧。|Chúng ta ra biển ăn hải sản nhé.
#新鲜
这些水果很新鲜。|Những hoa quả này rất tươi.
早上的空气很新鲜。|Không khí buổi sáng rất trong lành.
我只买新鲜的菜。|Tôi chỉ mua rau tươi.
这条鱼不新鲜了。|Con cá này không còn tươi nữa.
到了新地方，什么都觉得很新鲜。|Đến nơi mới, cái gì cũng thấy mới lạ.
#友好
这里的人很友好。|Người ở đây rất thân thiện.
他对我很友好。|Anh ấy rất thân thiện với tôi.
两国是友好的邻居。|Hai nước là láng giềng hữu nghị.
我们友好地聊了一会儿。|Chúng tôi trò chuyện thân thiện một lúc.
她是一个友好的人。|Cô ấy là một người thân thiện.
#压力
最近我的压力很大。|Gần đây áp lực của tôi rất lớn.
考试前压力很大。|Trước kỳ thi áp lực rất lớn.
运动可以减少压力。|Vận động có thể giảm áp lực.
工作的压力让他很累。|Áp lực công việc khiến anh ấy rất mệt.
别给自己太大的压力。|Đừng tạo áp lực quá lớn cho bản thân.
#继续
我们继续上课吧。|Chúng ta tiếp tục học nhé.
请继续说。|Xin hãy nói tiếp.
休息一下再继续工作。|Nghỉ một lát rồi làm tiếp.
明年我还想继续学汉语。|Năm sau tôi còn muốn tiếp tục học tiếng Trung.
雨还在继续下。|Mưa vẫn tiếp tục rơi.
#日出
我们早上五点起床看日出。|Chúng tôi dậy lúc năm giờ sáng ngắm bình minh.
山上的日出很美。|Bình minh trên núi rất đẹp.
你看过海上的日出吗？|Bạn đã từng ngắm bình minh trên biển chưa?
日出的时候天空是红色的。|Lúc mặt trời mọc bầu trời màu đỏ.
我拍了很多日出的照片。|Tôi chụp nhiều ảnh bình minh.
#机会
这是一个好机会。|Đây là một cơ hội tốt.
我希望有机会去中国。|Tôi mong có cơ hội đến Trung Quốc.
请给我一个机会。|Xin cho tôi một cơ hội.
别错过这个机会。|Đừng bỏ lỡ cơ hội này.
有机会我们再见面。|Có dịp chúng ta lại gặp nhau.
#好处
运动有很多好处。|Vận động có nhiều lợi ích.
早睡早起的好处是什么？|Ngủ sớm dậy sớm có lợi ích gì?
学外语对找工作有好处。|Học ngoại ngữ có lợi cho việc tìm việc.
住在学校旁边的好处是很方便。|Lợi ích của việc ở cạnh trường là rất tiện.
吃水果对身体有好处。|Ăn hoa quả tốt cho sức khỏe.
#比较
今天比较冷。|Hôm nay khá lạnh.
这个问题比较难。|Câu hỏi này khá khó.
我比较喜欢喝茶。|Tôi khá thích uống trà.
你比较一下这两个手机。|Bạn so sánh hai chiếc điện thoại này xem.
他的汉语比较好。|Tiếng Trung của anh ấy khá tốt.
#舒服
这张床很舒服。|Chiếc giường này rất êm.
我今天不太舒服。|Hôm nay tôi hơi khó chịu trong người.
洗完澡很舒服。|Tắm xong rất dễ chịu.
这件衣服穿着很舒服。|Bộ quần áo này mặc rất thoải mái.
你哪儿不舒服？|Bạn khó chịu ở đâu?
#窗外
窗外下雨了。|Ngoài cửa sổ trời mưa rồi.
我喜欢看窗外的风景。|Tôi thích ngắm cảnh ngoài cửa sổ.
窗外有一棵大树。|Ngoài cửa sổ có một cây to.
他一直看着窗外。|Anh ấy cứ nhìn ra ngoài cửa sổ.
窗外的鸟在唱歌。|Chim ngoài cửa sổ đang hót.
#美丽
这里的风景很美丽。|Phong cảnh ở đây rất đẹp.
她是一个美丽的女孩。|Cô ấy là một cô gái xinh đẹp.
越南是一个美丽的国家。|Việt Nam là một đất nước xinh đẹp.
秋天的山特别美丽。|Núi mùa thu đặc biệt đẹp.
美丽的花开了。|Những bông hoa đẹp đã nở.
#部分
这是我生活的一部分。|Đây là một phần cuộc sống của tôi.
大部分学生都来了。|Phần lớn học sinh đều đến rồi.
这本书分成三个部分。|Cuốn sách này chia làm ba phần.
第一部分很容易。|Phần thứ nhất rất dễ.
我只看了一部分。|Tôi chỉ xem một phần.
#感受
说说你的感受。|Hãy nói cảm nhận của bạn.
我感受到了大家的热情。|Tôi cảm nhận được sự nhiệt tình của mọi người.
旅游让我有了很多新感受。|Du lịch cho tôi nhiều cảm nhận mới.
我想感受一下中国的生活。|Tôi muốn cảm nhận cuộc sống ở Trung Quốc.
每个人的感受都不一样。|Cảm nhận của mỗi người đều khác nhau.
#经历
这是一次难忘的经历。|Đây là một trải nghiệm khó quên.
他的经历很丰富。|Trải nghiệm của anh ấy rất phong phú.
我经历了很多困难。|Tôi đã trải qua nhiều khó khăn.
说说你的留学经历吧。|Kể về trải nghiệm du học của bạn đi.
这样的经历让我长大了。|Trải nghiệm như vậy khiến tôi trưởng thành.
#经过
我每天经过这个商店。|Ngày nào tôi cũng đi qua cửa hàng này.
经过一年的学习，我会说汉语了。|Sau một năm học, tôi đã biết nói tiếng Trung.
火车经过很多城市。|Tàu hỏa đi qua nhiều thành phố.
他把经过告诉了我。|Anh ấy kể lại diễn biến cho tôi.
经过努力，他成功了。|Nhờ nỗ lực, anh ấy đã thành công.
#兴奋
明天要去旅游，我很兴奋。|Mai đi du lịch, tôi rất phấn khích.
孩子们兴奋地跑过来。|Bọn trẻ phấn khởi chạy lại.
听到这个消息，他兴奋极了。|Nghe tin này, anh ấy vui mừng cực kỳ.
别太兴奋，早点儿睡吧。|Đừng quá phấn khích, ngủ sớm đi.
第一次坐飞机，我很兴奋。|Lần đầu đi máy bay, tôi rất háo hức.
#旅行
这次旅行很开心。|Chuyến đi lần này rất vui.
我喜欢一个人旅行。|Tôi thích đi du lịch một mình.
祝你旅行愉快！|Chúc bạn chuyến đi vui vẻ!
我们计划去中国旅行。|Chúng tôi dự định đi du lịch Trung Quốc.
旅行可以让人学到很多东西。|Du lịch giúp người ta học được nhiều điều.
#一般
我一般七点起床。|Tôi thường dậy lúc bảy giờ.
这个菜味道一般。|Món này vị bình thường.
一般来说，学生都很忙。|Nói chung học sinh đều rất bận.
他的汉语水平一般。|Trình độ tiếng Trung của anh ấy bình thường.
周末你一般做什么？|Cuối tuần bạn thường làm gì?
#轻松
考完试，我很轻松。|Thi xong, tôi thấy nhẹ nhõm.
这个工作很轻松。|Công việc này rất nhẹ nhàng.
周末我想轻松一下。|Cuối tuần tôi muốn thư giãn một chút.
他轻松地回答了问题。|Anh ấy trả lời câu hỏi một cách dễ dàng.
学汉语可以很轻松。|Học tiếng Trung có thể rất nhẹ nhàng.
#首先
首先，我介绍一下自己。|Trước tiên, tôi giới thiệu về bản thân.
首先要洗手。|Trước tiên phải rửa tay.
首先，我们来复习一下。|Đầu tiên, chúng ta ôn lại một chút.
首先要有信心。|Trước hết phải có lòng tin.
首先，谢谢大家来参加。|Trước tiên, cảm ơn mọi người đã đến tham dự.
#查
我去查一下词典。|Tôi đi tra từ điển một chút.
你查一下明天的天气。|Bạn xem thời tiết ngày mai đi.
我在网上查到了地址。|Tôi tra được địa chỉ trên mạng.
请查一下我的成绩。|Làm ơn kiểm tra điểm của tôi.
不会的字可以查一查。|Chữ nào không biết thì tra thử.
#目的地
我们的目的地是北京。|Điểm đến của chúng ta là Bắc Kinh.
还有多久到目的地？|Còn bao lâu nữa đến nơi?
到了目的地给我打电话。|Đến nơi thì gọi cho tôi.
这次旅行的目的地很远。|Điểm đến chuyến đi lần này rất xa.
司机把我们送到了目的地。|Tài xế đưa chúng tôi đến nơi.
#厚
冬天要穿厚衣服。|Mùa đông phải mặc áo dày.
这本书很厚。|Cuốn sách này rất dày.
外边的雪很厚。|Tuyết bên ngoài rất dày.
你带一件厚一点儿的衣服吧。|Bạn mang một chiếc áo dày hơn chút nhé.
这个面包太厚了。|Lát bánh mì này dày quá.
#伞
下雨了，带伞吧。|Mưa rồi, mang ô đi.
我忘了带伞。|Tôi quên mang ô.
这把伞是谁的？|Chiếc ô này của ai?
我可以借你的伞吗？|Tôi mượn ô của bạn được không?
我们一起打一把伞吧。|Chúng ta che chung một chiếc ô nhé.
#护照
出国要带护照。|Ra nước ngoài phải mang hộ chiếu.
我的护照在包里。|Hộ chiếu của tôi ở trong túi.
请给我看一下你的护照。|Cho tôi xem hộ chiếu của bạn.
我去办护照。|Tôi đi làm hộ chiếu.
他的护照找不到了。|Hộ chiếu của anh ấy không tìm thấy nữa.
#充电器
我的充电器在哪儿？|Cục sạc của tôi đâu?
你可以借我充电器吗？|Bạn cho tôi mượn cục sạc được không?
我忘了带充电器。|Tôi quên mang cục sạc.
这个充电器很快。|Cục sạc này sạc rất nhanh.
旅游一定要带充电器。|Đi du lịch nhất định phải mang cục sạc.
#药
你吃药了吗？|Bạn uống thuốc chưa?
这个药一天吃三次。|Thuốc này một ngày uống ba lần.
我去药店买药。|Tôi đi hiệu thuốc mua thuốc.
吃完药要多休息。|Uống thuốc xong phải nghỉ ngơi nhiều.
这个药很苦。|Thuốc này rất đắng.
#方便
住在这里很方便。|Sống ở đây rất tiện.
你明天方便吗？|Ngày mai bạn có tiện không?
坐地铁很方便。|Đi tàu điện ngầm rất tiện.
有手机，生活方便多了。|Có điện thoại, cuộc sống tiện hơn nhiều.
不方便的话就算了。|Nếu không tiện thì thôi.
#酒店
我们住在一家酒店。|Chúng tôi ở một khách sạn.
这家酒店很干净。|Khách sạn này rất sạch.
我在网上订了酒店。|Tôi đã đặt khách sạn trên mạng.
酒店离机场不远。|Khách sạn cách sân bay không xa.
酒店的早饭很好吃。|Bữa sáng ở khách sạn rất ngon.
#当地
我们吃了当地的小吃。|Chúng tôi đã ăn món vặt địa phương.
当地人很热情。|Người địa phương rất nhiệt tình.
你可以问问当地人。|Bạn có thể hỏi người địa phương.
当地的天气比较热。|Thời tiết ở đó khá nóng.
我想了解当地的文化。|Tôi muốn tìm hiểu văn hóa địa phương.
#交流
我们用汉语交流。|Chúng tôi giao tiếp bằng tiếng Trung.
多交流可以提高口语。|Giao lưu nhiều giúp nâng cao khẩu ngữ.
两国的文化交流很多。|Giao lưu văn hóa giữa hai nước rất nhiều.
我常常跟老师交流。|Tôi thường trao đổi với thầy cô.
交流的时候要有礼貌。|Khi giao tiếp phải lịch sự.
#梦想
你的梦想是什么？|Ước mơ của bạn là gì?
我的梦想是当老师。|Ước mơ của tôi là làm giáo viên.
每个人都有梦想。|Ai cũng có ước mơ.
他终于实现了梦想。|Cuối cùng anh ấy đã thực hiện được ước mơ.
不要放弃你的梦想。|Đừng từ bỏ ước mơ của bạn.
#翻译
我想当翻译。|Tôi muốn làm phiên dịch.
请帮我翻译这句话。|Làm ơn dịch giúp tôi câu này.
他把书翻译成了越南语。|Anh ấy đã dịch cuốn sách sang tiếng Việt.
这个词怎么翻译？|Từ này dịch thế nào?
翻译工作很有意思。|Công việc phiên dịch rất thú vị.
#感兴趣
我对中国文化感兴趣。|Tôi hứng thú với văn hóa Trung Quốc.
你对什么感兴趣？|Bạn hứng thú với điều gì?
他对数学不感兴趣。|Cậu ấy không hứng thú với toán.
我对这个工作很感兴趣。|Tôi rất quan tâm đến công việc này.
孩子们对动物很感兴趣。|Bọn trẻ rất thích động vật.
#吸引
这本书吸引了我。|Cuốn sách này đã thu hút tôi.
这里的风景吸引了很多游客。|Phong cảnh ở đây thu hút nhiều du khách.
我被他的歌声吸引了。|Tôi bị giọng hát của anh ấy cuốn hút.
什么吸引你学汉语？|Điều gì thu hút bạn học tiếng Trung?
这个电影很吸引人。|Bộ phim này rất cuốn hút.
#桥
河上有一座桥。|Trên sông có một cây cầu.
我们走过这座桥吧。|Chúng ta đi qua cây cầu này nhé.
这座桥很长。|Cây cầu này rất dài.
桥下边有很多船。|Dưới cầu có nhiều thuyền.
语言是交流的桥。|Ngôn ngữ là cây cầu giao tiếp.
#合作
我们合作得很好。|Chúng tôi hợp tác rất tốt.
希望以后能继续合作。|Mong sau này tiếp tục hợp tác.
两家公司开始合作了。|Hai công ty đã bắt đầu hợp tác.
这个工作需要大家合作。|Công việc này cần mọi người hợp tác.
谢谢你的合作！|Cảm ơn sự hợp tác của bạn!
#实现
我的梦想实现了。|Ước mơ của tôi đã thành hiện thực.
为了实现计划，我很努力。|Để thực hiện kế hoạch, tôi rất cố gắng.
这个想法很难实现。|Ý tưởng này rất khó thực hiện.
只要努力，就能实现。|Chỉ cần nỗ lực là có thể thực hiện được.
希望你的愿望都能实现。|Mong mọi điều ước của bạn đều thành hiện thực.
#困难
遇到困难不要怕。|Gặp khó khăn đừng sợ.
学汉语有很多困难。|Học tiếng Trung có nhiều khó khăn.
他帮我解决了困难。|Anh ấy giúp tôi giải quyết khó khăn.
现在的困难是没有时间。|Khó khăn hiện tại là không có thời gian.
有困难就告诉我。|Có khó khăn thì nói với tôi.
#放弃
不要放弃！|Đừng bỏ cuộc!
他放弃了这个机会。|Anh ấy đã từ bỏ cơ hội này.
我从来没想过放弃。|Tôi chưa bao giờ nghĩ đến việc bỏ cuộc.
太难了，我想放弃。|Khó quá, tôi muốn bỏ cuộc.
只要不放弃，就有希望。|Chỉ cần không bỏ cuộc thì còn hy vọng.
#实习
我在一家公司实习。|Tôi đang thực tập ở một công ty.
实习的时候我学到了很多。|Khi thực tập tôi đã học được nhiều điều.
大四学生要去实习。|Sinh viên năm tư phải đi thực tập.
你实习了几个月？|Bạn thực tập mấy tháng rồi?
这次实习很有用。|Đợt thực tập này rất có ích.
#积累
学语言要慢慢积累。|Học ngôn ngữ phải tích lũy từ từ.
我积累了很多经验。|Tôi đã tích lũy nhiều kinh nghiệm.
每天积累十个生词。|Mỗi ngày tích lũy mười từ mới.
知识是一点一点积累的。|Kiến thức được tích lũy từng chút một.
他积累了一些钱。|Anh ấy đã tích góp được một ít tiền.
#经验
他的工作经验很多。|Anh ấy có nhiều kinh nghiệm làm việc.
我没有经验。|Tôi không có kinh nghiệm.
请给我们介绍一下你的经验。|Hãy chia sẻ kinh nghiệm của bạn với chúng tôi.
这次失败也是一种经验。|Lần thất bại này cũng là một kinh nghiệm.
有经验的老师教得很好。|Giáo viên có kinh nghiệm dạy rất giỏi.
#公司
我在一家公司工作。|Tôi làm việc ở một công ty.
你们公司在哪儿？|Công ty các bạn ở đâu?
这是一家中国公司。|Đây là một công ty Trung Quốc.
我八点到公司。|Tám giờ tôi đến công ty.
公司里有很多年轻人。|Trong công ty có nhiều người trẻ.
#发展
这个城市发展得很快。|Thành phố này phát triển rất nhanh.
公司的发展很好。|Công ty phát triển rất tốt.
越南的经济发展很快。|Kinh tế Việt Nam phát triển rất nhanh.
我想在这里发展。|Tôi muốn phát triển ở đây.
孩子的发展需要父母的关心。|Sự phát triển của trẻ cần cha mẹ quan tâm.
#行业
你在什么行业工作？|Bạn làm trong ngành nào?
旅游行业很有前途。|Ngành du lịch rất có tương lai.
这个行业需要会外语的人。|Ngành này cần người biết ngoại ngữ.
他在这个行业工作了十年。|Anh ấy làm trong ngành này mười năm.
每个行业都不容易。|Ngành nào cũng không dễ.
#环境
这里的环境很好。|Môi trường ở đây rất tốt.
我们要保护环境。|Chúng ta phải bảo vệ môi trường.
学习环境很重要。|Môi trường học tập rất quan trọng.
我很快就习惯了新环境。|Tôi nhanh chóng quen với môi trường mới.
公司的工作环境很舒服。|Môi trường làm việc ở công ty rất thoải mái.
#同事
他是我的同事。|Anh ấy là đồng nghiệp của tôi.
我和同事一起吃午饭。|Tôi ăn trưa cùng đồng nghiệp.
同事们都很友好。|Các đồng nghiệp đều rất thân thiện.
新同事今天来了。|Đồng nghiệp mới hôm nay đến rồi.
有问题可以问同事。|Có vấn đề có thể hỏi đồng nghiệp.
#员工
公司有一百多个员工。|Công ty có hơn một trăm nhân viên.
我是新员工。|Tôi là nhân viên mới.
公司很关心员工。|Công ty rất quan tâm nhân viên.
员工们都很努力。|Các nhân viên đều rất chăm chỉ.
这家公司需要会汉语的员工。|Công ty này cần nhân viên biết tiếng Trung.
#客户
今天我要见客户。|Hôm nay tôi phải gặp khách hàng.
客户很满意。|Khách hàng rất hài lòng.
他的客户大部分是中国人。|Khách hàng của anh ấy phần lớn là người Trung Quốc.
我给客户打了电话。|Tôi đã gọi điện cho khách hàng.
我们要认真对待每一个客户。|Chúng ta phải phục vụ chu đáo từng khách hàng.
#文件
请把文件发给我。|Làm ơn gửi tài liệu cho tôi.
这个文件很重要。|Tài liệu này rất quan trọng.
我在看文件。|Tôi đang xem tài liệu.
文件在桌子上。|Tài liệu ở trên bàn.
我帮你翻译这个文件。|Tôi dịch tài liệu này giúp bạn.
#发挥
考试的时候他发挥得很好。|Lúc thi cậu ấy phát huy rất tốt.
我想发挥自己的优点。|Tôi muốn phát huy ưu điểm của mình.
今天我没有发挥好。|Hôm nay tôi không thể hiện tốt.
在这里你可以发挥你的能力。|Ở đây bạn có thể phát huy năng lực của mình.
别紧张，正常发挥就好。|Đừng căng thẳng, thể hiện bình thường là được.
#重视
公司很重视年轻人。|Công ty rất coi trọng người trẻ.
我们要重视健康。|Chúng ta phải coi trọng sức khỏe.
老师很重视我们的发音。|Thầy rất coi trọng phát âm của chúng tôi.
这个问题要引起重视。|Vấn đề này cần được chú trọng.
父母很重视孩子的学习。|Cha mẹ rất coi trọng việc học của con.
#培训
新员工要参加培训。|Nhân viên mới phải tham gia đào tạo.
公司给我们培训了一个月。|Công ty đào tạo chúng tôi một tháng.
这次培训很有用。|Đợt đào tạo lần này rất có ích.
我在培训班学汉语。|Tôi học tiếng Trung ở lớp đào tạo.
培训以后我就开始工作了。|Sau khi đào tạo tôi bắt đầu làm việc.
#不断
他不断地努力。|Anh ấy không ngừng nỗ lực.
我们要不断学习。|Chúng ta phải không ngừng học hỏi.
城市在不断变化。|Thành phố đang thay đổi không ngừng.
电话响个不断。|Điện thoại reo liên tục.
他的汉语在不断进步。|Tiếng Trung của anh ấy không ngừng tiến bộ.
#任务
这是我的任务。|Đây là nhiệm vụ của tôi.
今天的任务完成了。|Nhiệm vụ hôm nay đã hoàn thành.
老师给我们一个任务。|Thầy giao cho chúng tôi một nhiệm vụ.
这个任务很难。|Nhiệm vụ này rất khó.
学习是学生的任务。|Học tập là nhiệm vụ của học sinh.
#成长
孩子成长得很快。|Đứa trẻ lớn rất nhanh.
困难让我成长。|Khó khăn khiến tôi trưởng thành.
我在这个城市成长。|Tôi lớn lên ở thành phố này.
我想和公司一起成长。|Tôi muốn cùng công ty trưởng thành.
父母陪着孩子成长。|Cha mẹ đồng hành cùng con lớn lên.
#解决
这个问题怎么解决？|Vấn đề này giải quyết thế nào?
我们一起解决吧。|Chúng ta cùng giải quyết nhé.
问题已经解决了。|Vấn đề đã được giải quyết rồi.
他很快解决了这个困难。|Anh ấy nhanh chóng giải quyết khó khăn này.
有问题要及时解决。|Có vấn đề phải giải quyết kịp thời.
#首都
北京是中国的首都。|Bắc Kinh là thủ đô Trung Quốc.
河内是越南的首都。|Hà Nội là thủ đô Việt Nam.
你去过首都吗？|Bạn đã từng đến thủ đô chưa?
首都有很多名胜古迹。|Thủ đô có nhiều danh lam thắng cảnh.
我在首都上大学。|Tôi học đại học ở thủ đô.
#长城
我想去长城。|Tôi muốn đi Vạn Lý Trường Thành.
长城很长，也很有名。|Trường Thành rất dài, cũng rất nổi tiếng.
你爬过长城吗？|Bạn đã từng leo Trường Thành chưa?
长城在北京的北边。|Trường Thành ở phía bắc Bắc Kinh.
很多外国人来中国参观长城。|Nhiều người nước ngoài đến Trung Quốc tham quan Trường Thành.
#现代
上海是一个现代的城市。|Thượng Hải là một thành phố hiện đại.
现代人很忙。|Người hiện đại rất bận.
我喜欢现代音乐。|Tôi thích nhạc hiện đại.
这个房子很现代。|Ngôi nhà này rất hiện đại.
现代生活离不开手机。|Cuộc sống hiện đại không thể thiếu điện thoại.
#自然
我喜欢自然风景。|Tôi thích phong cảnh thiên nhiên.
我们要保护自然。|Chúng ta phải bảo vệ thiên nhiên.
他说汉语说得很自然。|Anh ấy nói tiếng Trung rất tự nhiên.
多练习，自然就会了。|Luyện nhiều thì tự nhiên sẽ biết.
你笑得很自然。|Bạn cười rất tự nhiên.
#熊猫
熊猫很可爱。|Gấu trúc rất đáng yêu.
我想去成都看熊猫。|Tôi muốn đến Thành Đô xem gấu trúc.
熊猫喜欢吃竹子。|Gấu trúc thích ăn tre.
动物园里有两只熊猫。|Trong vườn bách thú có hai con gấu trúc.
熊猫是中国的国宝。|Gấu trúc là quốc bảo của Trung Quốc.
#从小
我从小就喜欢唱歌。|Từ nhỏ tôi đã thích hát.
他从小在北京长大。|Anh ấy lớn lên ở Bắc Kinh từ nhỏ.
我们从小就是好朋友。|Chúng tôi là bạn tốt từ nhỏ.
她从小就很聪明。|Từ nhỏ cô ấy đã rất thông minh.
我从小跟奶奶一起住。|Từ nhỏ tôi sống cùng bà.
#辣
这个菜太辣了。|Món này cay quá.
你能吃辣吗？|Bạn ăn cay được không?
我不吃辣的。|Tôi không ăn cay.
四川菜很辣。|Món Tứ Xuyên rất cay.
少放一点儿辣椒，别太辣。|Cho ít ớt thôi, đừng cay quá.
#听说
听说你要去中国了？|Nghe nói bạn sắp đi Trung Quốc à?
我听说这个电影很好看。|Tôi nghe nói phim này rất hay.
听说明天会下雨。|Nghe nói mai trời mưa.
你听说了吗？|Bạn nghe tin chưa?
我听说过这个地方。|Tôi từng nghe nói về nơi này.
#茶馆
我们去茶馆喝茶吧。|Chúng ta đi quán trà uống trà nhé.
这个茶馆很有名。|Quán trà này rất nổi tiếng.
老人们喜欢在茶馆聊天。|Người già thích trò chuyện ở quán trà.
茶馆里很安静。|Trong quán trà rất yên tĩnh.
成都有很多茶馆。|Thành Đô có rất nhiều quán trà.
#少数民族
中国有五十五个少数民族。|Trung Quốc có năm mươi lăm dân tộc thiểu số.
越南也有很多少数民族。|Việt Nam cũng có nhiều dân tộc thiểu số.
少数民族的衣服很漂亮。|Trang phục dân tộc thiểu số rất đẹp.
我想了解少数民族的文化。|Tôi muốn tìm hiểu văn hóa dân tộc thiểu số.
这里住着很多少数民族。|Ở đây có nhiều dân tộc thiểu số sinh sống.
#丰富
这里的文化很丰富。|Văn hóa ở đây rất phong phú.
他的经验很丰富。|Kinh nghiệm của anh ấy rất phong phú.
读书让生活更丰富。|Đọc sách làm cuộc sống phong phú hơn.
这个饭馆的菜很丰富。|Món ăn ở quán này rất phong phú.
学校的活动很丰富。|Hoạt động ở trường rất phong phú.
#主要
我来这里主要是学习汉语。|Tôi đến đây chủ yếu để học tiếng Trung.
这是主要的问题。|Đây là vấn đề chính.
他主要负责翻译工作。|Anh ấy chủ yếu phụ trách công việc phiên dịch.
这里主要卖水果。|Ở đây chủ yếu bán hoa quả.
主要原因是太忙了。|Lý do chủ yếu là quá bận.
#进步
你的汉语进步了很多。|Tiếng Trung của bạn tiến bộ nhiều rồi.
多练习就会进步。|Luyện nhiều thì sẽ tiến bộ.
这次考试他进步很大。|Kỳ thi này cậu ấy tiến bộ rất nhiều.
祝你学习进步！|Chúc bạn học tập tiến bộ!
我每天都在进步。|Ngày nào tôi cũng tiến bộ.
#了解
我想了解中国文化。|Tôi muốn tìm hiểu văn hóa Trung Quốc.
你了解他吗？|Bạn có hiểu anh ấy không?
我对这个城市不太了解。|Tôi không hiểu rõ lắm về thành phố này.
通过旅游可以了解很多东西。|Qua du lịch có thể hiểu được nhiều điều.
我们需要互相了解。|Chúng ta cần hiểu nhau.
#节日
春节是中国最重要的节日。|Tết là ngày lễ quan trọng nhất của Trung Quốc.
你最喜欢什么节日？|Bạn thích ngày lễ nào nhất?
节日的时候街上很热闹。|Dịp lễ đường phố rất náo nhiệt.
祝你节日快乐！|Chúc bạn ngày lễ vui vẻ!
中秋节也是一个传统节日。|Trung thu cũng là một ngày lễ truyền thống.
#传统
这是越南的传统文化。|Đây là văn hóa truyền thống Việt Nam.
春节是传统节日。|Tết là ngày lễ truyền thống.
我喜欢传统音乐。|Tôi thích âm nhạc truyền thống.
我们要保护传统。|Chúng ta phải gìn giữ truyền thống.
奶奶穿着传统的衣服。|Bà mặc trang phục truyền thống.
#真正
我真正喜欢的是音乐。|Điều tôi thực sự thích là âm nhạc.
他是我真正的朋友。|Anh ấy là người bạn thực sự của tôi.
真正的快乐很简单。|Niềm vui thực sự rất đơn giản.
到了中国，我才真正了解中国。|Đến Trung Quốc, tôi mới thực sự hiểu Trung Quốc.
这才是真正的问题。|Đây mới là vấn đề thực sự.
#密切
两国关系很密切。|Quan hệ hai nước rất mật thiết.
我们的联系很密切。|Chúng tôi liên lạc rất thường xuyên.
学习和生活关系密切。|Học tập và cuộc sống có quan hệ mật thiết.
医生密切注意他的情况。|Bác sĩ theo dõi sát tình trạng của anh ấy.
他跟家人的关系很密切。|Anh ấy rất gắn bó với gia đình.
#独立
留学让我变得更独立。|Du học khiến tôi trở nên tự lập hơn.
孩子要学会独立。|Trẻ em phải học cách tự lập.
他很独立，什么都自己做。|Anh ấy rất tự lập, việc gì cũng tự làm.
我想独立生活。|Tôi muốn sống tự lập.
她是一个独立的女人。|Cô ấy là một người phụ nữ độc lập.
#帮助
谢谢你的帮助。|Cảm ơn sự giúp đỡ của bạn.
我们要互相帮助。|Chúng ta phải giúp đỡ lẫn nhau.
老师帮助我学习。|Thầy cô giúp tôi học tập.
需要帮助就告诉我。|Cần giúp thì nói với tôi.
这本书对我帮助很大。|Cuốn sách này giúp tôi rất nhiều.
#种
我们在院子里种了很多花。|Chúng tôi trồng nhiều hoa trong sân.
爷爷喜欢种菜。|Ông thích trồng rau.
路两边种着很多树。|Hai bên đường trồng nhiều cây.
这棵树是我小时候种的。|Cây này tôi trồng hồi nhỏ.
春天是种树的好时候。|Mùa xuân là lúc thích hợp để trồng cây.
#太极拳
爷爷每天早上打太极拳。|Sáng nào ông cũng tập thái cực quyền.
公园里很多人在打太极拳。|Trong công viên nhiều người đang tập thái cực quyền.
我想学太极拳。|Tôi muốn học thái cực quyền.
打太极拳对身体很好。|Tập thái cực quyền rất tốt cho sức khỏe.
太极拳的动作很慢。|Động tác thái cực quyền rất chậm.
#朴实
这里的人很朴实。|Người ở đây rất chất phác.
他是一个朴实的农民。|Ông ấy là một người nông dân chất phác.
她穿得很朴实。|Cô ấy ăn mặc giản dị.
我喜欢朴实的生活。|Tôi thích cuộc sống giản dị.
他说话很朴实。|Anh ấy nói chuyện rất mộc mạc.
#问路
我迷路了，要问路。|Tôi lạc đường rồi, phải hỏi đường.
他向警察问路。|Anh ấy hỏi đường cảnh sát.
问路的时候要有礼貌。|Khi hỏi đường phải lịch sự.
我用汉语问路。|Tôi hỏi đường bằng tiếng Trung.
有个外国人向我问路。|Có một người nước ngoài hỏi đường tôi.
#小吃
北京的小吃很有名。|Đồ ăn vặt Bắc Kinh rất nổi tiếng.
我喜欢吃越南小吃。|Tôi thích ăn đồ ăn vặt Việt Nam.
这条街上有很多小吃。|Con phố này có rất nhiều đồ ăn vặt.
我们去吃小吃吧。|Chúng ta đi ăn vặt nhé.
旅游的时候我一定会吃当地小吃。|Khi đi du lịch tôi nhất định ăn đồ ăn vặt địa phương.
#想起
看到这张照片，我想起了小时候。|Nhìn tấm ảnh này, tôi nhớ lại hồi nhỏ.
我想起来了，他叫小王。|Tôi nhớ ra rồi, anh ấy tên Tiểu Vương.
我常常想起我的家乡。|Tôi thường nhớ về quê hương.
我想不起他的名字了。|Tôi không nhớ ra tên anh ấy nữa.
听到这首歌，我就想起你。|Nghe bài hát này, tôi lại nhớ đến bạn.
#灯笼
春节的时候到处都挂着灯笼。|Dịp Tết khắp nơi treo đèn lồng.
会安的灯笼很有名。|Đèn lồng Hội An rất nổi tiếng.
孩子们拿着灯笼玩儿。|Bọn trẻ cầm đèn lồng đi chơi.
红灯笼很漂亮。|Đèn lồng đỏ rất đẹp.
中秋节我们做灯笼。|Tết Trung thu chúng tôi làm đèn lồng.
#亲戚
春节我们去看亲戚。|Tết chúng tôi đi thăm họ hàng.
我在北京有很多亲戚。|Tôi có nhiều họ hàng ở Bắc Kinh.
他是我的一个亲戚。|Anh ấy là họ hàng của tôi.
亲戚们都来了。|Họ hàng đều đến rồi.
我很久没见亲戚了。|Lâu lắm rồi tôi không gặp họ hàng.
#热闹
春节的时候很热闹。|Dịp Tết rất náo nhiệt.
这条街很热闹。|Con phố này rất náo nhiệt.
我喜欢热闹的地方。|Tôi thích nơi náo nhiệt.
晚上的夜市非常热闹。|Chợ đêm buổi tối vô cùng náo nhiệt.
家里来了很多客人，很热闹。|Nhà có nhiều khách đến, rất vui vẻ náo nhiệt.
#牛肉粉
我早上吃了一碗牛肉粉。|Buổi sáng tôi ăn một bát phở bò.
越南的牛肉粉很有名。|Phở bò Việt Nam rất nổi tiếng.
这家的牛肉粉最好吃。|Phở bò quán này ngon nhất.
你吃过牛肉粉吗？|Bạn đã từng ăn phở bò chưa?
牛肉粉多少钱一碗？|Phở bò bao nhiêu tiền một bát?
#之一
这是我最喜欢的书之一。|Đây là một trong những cuốn sách tôi thích nhất.
他是我最好的朋友之一。|Anh ấy là một trong những người bạn thân nhất của tôi.
北京是中国最大的城市之一。|Bắc Kinh là một trong những thành phố lớn nhất Trung Quốc.
看书是我的爱好之一。|Đọc sách là một trong những sở thích của tôi.
这是学汉语的方法之一。|Đây là một trong những cách học tiếng Trung.
#外国人
他是外国人。|Anh ấy là người nước ngoài.
很多外国人来越南旅游。|Nhiều người nước ngoài đến Việt Nam du lịch.
外国人学汉语很难吗？|Người nước ngoài học tiếng Trung có khó không?
我们学校有很多外国人。|Trường chúng tôi có nhiều người nước ngoài.
这个外国人会说越南语。|Người nước ngoài này biết nói tiếng Việt.
#汤
我想喝一碗汤。|Tôi muốn uống một bát canh.
这个汤很好喝。|Canh này rất ngon.
妈妈做的汤最好喝。|Canh mẹ nấu ngon nhất.
汤太热了，慢点儿喝。|Canh nóng quá, uống từ từ thôi.
这碗汤里有鸡肉。|Bát canh này có thịt gà.
#骨头
狗喜欢吃骨头。|Chó thích ăn xương.
这个汤是用骨头做的。|Canh này nấu bằng xương.
他摔倒了，骨头断了。|Anh ấy ngã, gãy xương rồi.
多喝牛奶对骨头好。|Uống nhiều sữa tốt cho xương.
鱼的骨头很多。|Cá có rất nhiều xương.
#香料
做菜要放一些香料。|Nấu ăn phải cho một ít gia vị.
越南菜的香料很多。|Món Việt dùng nhiều gia vị.
这种香料很香。|Loại gia vị này rất thơm.
我不喜欢太多香料。|Tôi không thích quá nhiều gia vị.
妈妈买了很多香料。|Mẹ mua rất nhiều gia vị.
#煮
妈妈在煮饭。|Mẹ đang nấu cơm.
鸡蛋要煮十分钟。|Trứng phải luộc mười phút.
我给你煮一碗面吧。|Để tôi nấu cho bạn một bát mì.
水煮开了。|Nước sôi rồi.
这个汤要煮很长时间。|Canh này phải ninh rất lâu.
#味道
这个菜的味道很好。|Món này vị rất ngon.
我喜欢家乡的味道。|Tôi thích hương vị quê nhà.
这是什么味道？|Đây là mùi gì vậy?
味道有点儿咸。|Vị hơi mặn.
你尝尝味道怎么样。|Bạn nếm thử xem vị thế nào.
#香
这个花很香。|Bông hoa này rất thơm.
妈妈做的饭真香！|Cơm mẹ nấu thơm thật!
咖啡的味道很香。|Cà phê có mùi rất thơm.
我睡得很香。|Tôi ngủ rất ngon.
厨房里好香啊！|Trong bếp thơm quá!
#薄
这本书很薄。|Cuốn sách này rất mỏng.
今天很冷，别穿太薄。|Hôm nay lạnh, đừng mặc mỏng quá.
牛肉切得很薄。|Thịt bò thái rất mỏng.
这件衣服太薄了。|Chiếc áo này mỏng quá.
这块面包又薄又软。|Lát bánh mì này vừa mỏng vừa mềm.
#香菜
我不吃香菜。|Tôi không ăn rau mùi.
请不要放香菜。|Làm ơn đừng cho rau mùi.
越南菜里常常有香菜。|Món Việt thường có rau mùi.
有的人很喜欢香菜。|Có người rất thích rau mùi.
我在汤里放了一点儿香菜。|Tôi cho một ít rau mùi vào canh.
#柠檬
我想喝柠檬水。|Tôi muốn uống nước chanh.
柠檬很酸。|Chanh rất chua.
在牛肉粉里放一点儿柠檬。|Cho một chút chanh vào phở bò.
我买了三个柠檬。|Tôi mua ba quả chanh.
柠檬茶很好喝。|Trà chanh rất ngon.
#辣椒
我不能吃辣椒。|Tôi không ăn được ớt.
这个辣椒很辣。|Quả ớt này rất cay.
请少放辣椒。|Làm ơn cho ít ớt.
妈妈在菜里放了辣椒。|Mẹ cho ớt vào món ăn.
红辣椒和绿辣椒都有。|Có cả ớt đỏ và ớt xanh.
#老板
老板，这个多少钱？|Ông chủ ơi, cái này bao nhiêu tiền?
他是这家饭馆的老板。|Anh ấy là chủ quán ăn này.
我的老板对我很好。|Sếp tôi đối xử với tôi rất tốt.
老板今天不在。|Hôm nay ông chủ không có ở đây.
我想以后自己当老板。|Sau này tôi muốn tự làm chủ.
#暖和
今天很暖和。|Hôm nay trời rất ấm.
房间里很暖和。|Trong phòng rất ấm áp.
春天来了，天气暖和了。|Mùa xuân đến, trời ấm lên rồi.
穿上这件衣服就暖和了。|Mặc chiếc áo này vào sẽ ấm.
喝杯热茶暖和一下。|Uống cốc trà nóng cho ấm người.
#大概
大概要三个小时。|Khoảng ba tiếng.
他大概二十岁。|Anh ấy khoảng hai mươi tuổi.
我大概明白了。|Tôi đại khái hiểu rồi.
明天大概会下雨。|Mai có lẽ sẽ mưa.
你大概什么时候到？|Khoảng mấy giờ bạn đến?
#方法
你的学习方法是什么？|Phương pháp học của bạn là gì?
这个方法很好。|Cách này rất hay.
我们换一个方法吧。|Chúng ta đổi cách khác nhé.
学汉语有很多方法。|Học tiếng Trung có nhiều phương pháp.
用这个方法可以记得很快。|Dùng cách này có thể nhớ rất nhanh.
#生词
今天我们学十个生词。|Hôm nay chúng ta học mười từ mới.
这课的生词很多。|Bài này nhiều từ mới.
我把生词写在本子上。|Tôi ghi từ mới vào vở.
你记住生词了吗？|Bạn nhớ từ mới chưa?
请读一下生词。|Hãy đọc từ mới một lượt.
#排队
请大家排队。|Mời mọi người xếp hàng.
买票的人在排队。|Người mua vé đang xếp hàng.
我排了半个小时队。|Tôi xếp hàng nửa tiếng.
别插队，请排队。|Đừng chen hàng, xin xếp hàng.
这家饭馆总是要排队。|Quán này lúc nào cũng phải xếp hàng.
#跟着
请跟着我读。|Hãy đọc theo tôi.
小狗跟着我走。|Con chó nhỏ đi theo tôi.
跟着老师学，进步很快。|Học theo thầy, tiến bộ rất nhanh.
我跟着他来到了一个小饭馆。|Tôi đi theo anh ấy đến một quán ăn nhỏ.
孩子跟着妈妈去商店。|Đứa bé theo mẹ đi cửa hàng.
#发音
你的发音很标准。|Phát âm của bạn rất chuẩn.
这个字的发音很难。|Phát âm của chữ này rất khó.
我要练习发音。|Tôi phải luyện phát âm.
老师帮我改发音。|Thầy giúp tôi sửa phát âm.
他的发音越来越好了。|Phát âm của anh ấy ngày càng tốt.
#声调
汉语有四个声调。|Tiếng Trung có bốn thanh điệu.
你的声调不对。|Thanh điệu của bạn chưa đúng.
声调对外国人很难。|Thanh điệu rất khó với người nước ngoài.
请注意这个字的声调。|Hãy chú ý thanh điệu của chữ này.
越南语也有声调。|Tiếng Việt cũng có thanh điệu.
#练习
我每天练习写汉字。|Ngày nào tôi cũng luyện viết chữ Hán.
多练习才能说得好。|Luyện nhiều mới nói giỏi được.
今天的练习很简单。|Bài tập hôm nay rất đơn giản.
我们一起练习口语吧。|Chúng ta cùng luyện khẩu ngữ nhé.
做完练习再休息。|Làm xong bài tập rồi hẵng nghỉ.
#日记
我每天写日记。|Ngày nào tôi cũng viết nhật ký.
我用汉语写日记。|Tôi viết nhật ký bằng tiếng Trung.
这是我的日记本。|Đây là cuốn nhật ký của tôi.
别看我的日记！|Đừng đọc nhật ký của tôi!
写日记可以练习写作。|Viết nhật ký có thể luyện viết văn.
#语法
汉语语法不太难。|Ngữ pháp tiếng Trung không khó lắm.
这个语法我不懂。|Ngữ pháp này tôi không hiểu.
老师给我们讲语法。|Thầy giảng ngữ pháp cho chúng tôi.
请注意语法问题。|Hãy chú ý vấn đề ngữ pháp.
我每天学一个新语法。|Mỗi ngày tôi học một điểm ngữ pháp mới.
#坚持
我坚持每天跑步。|Tôi kiên trì chạy bộ mỗi ngày.
坚持就是胜利。|Kiên trì là chiến thắng.
学汉语要坚持。|Học tiếng Trung phải kiên trì.
他坚持自己的想法。|Anh ấy giữ vững quan điểm của mình.
再坚持一下，马上就到了！|Cố thêm chút nữa, sắp đến rồi!
#软件
这个软件很好用。|Phần mềm này rất dễ dùng.
我用手机软件学汉语。|Tôi học tiếng Trung bằng ứng dụng điện thoại.
你下载了这个软件吗？|Bạn đã tải ứng dụng này chưa?
电脑上要装什么软件？|Máy tính cần cài phần mềm gì?
这个软件是免费的。|Phần mềm này miễn phí.
#山顶
我们终于到了山顶。|Cuối cùng chúng tôi đã lên đến đỉnh núi.
山顶上很冷。|Trên đỉnh núi rất lạnh.
从山顶可以看到整个城市。|Từ đỉnh núi có thể nhìn thấy toàn bộ thành phố.
到山顶要走两个小时。|Lên đến đỉnh núi phải đi hai tiếng.
我们在山顶拍了照片。|Chúng tôi chụp ảnh trên đỉnh núi.
#习惯
我习惯早上喝咖啡。|Tôi có thói quen uống cà phê buổi sáng.
你习惯这里的生活了吗？|Bạn đã quen cuộc sống ở đây chưa?
这是一个好习惯。|Đây là một thói quen tốt.
我还不习惯吃辣的。|Tôi vẫn chưa quen ăn cay.
要养成每天读书的习惯。|Phải hình thành thói quen đọc sách mỗi ngày.
#刷牙
每天要刷两次牙。|Mỗi ngày phải đánh răng hai lần.
睡觉前别忘了刷牙。|Trước khi ngủ đừng quên đánh răng.
我起床以后先刷牙。|Dậy xong tôi đánh răng trước.
孩子不喜欢刷牙。|Trẻ con không thích đánh răng.
刷牙洗脸以后吃早饭。|Đánh răng rửa mặt xong rồi ăn sáng.
#空气
这里的空气很新鲜。|Không khí ở đây rất trong lành.
城市的空气不太好。|Không khí thành phố không tốt lắm.
早上空气很好，我们去跑步吧。|Buổi sáng không khí tốt, chúng ta đi chạy bộ nhé.
打开窗户换换空气。|Mở cửa sổ cho thoáng khí.
山上的空气特别好。|Không khí trên núi đặc biệt trong lành.
#周围
我家周围有很多树。|Xung quanh nhà tôi có nhiều cây.
学校周围很安静。|Xung quanh trường rất yên tĩnh.
你看看周围。|Bạn nhìn xung quanh xem.
周围的人都很友好。|Những người xung quanh đều rất thân thiện.
酒店周围有很多饭馆。|Xung quanh khách sạn có nhiều quán ăn.
#安静
图书馆里很安静。|Trong thư viện rất yên tĩnh.
请安静！|Xin giữ trật tự!
我喜欢安静的地方。|Tôi thích nơi yên tĩnh.
晚上这里很安静。|Buổi tối ở đây rất yên tĩnh.
他是一个安静的孩子。|Cậu ấy là một đứa trẻ trầm lặng.
#打扰
对不起，打扰一下。|Xin lỗi, làm phiền một chút.
他在学习，别打扰他。|Anh ấy đang học, đừng làm phiền anh ấy.
不好意思，打扰你了。|Ngại quá, làm phiền bạn rồi.
我不想打扰别人。|Tôi không muốn làm phiền người khác.
太晚了，不打扰了。|Muộn rồi, không làm phiền nữa.
#头脑
他的头脑很聪明。|Đầu óc anh ấy rất thông minh.
早上头脑最清楚。|Buổi sáng đầu óc minh mẫn nhất.
你要用头脑想一想。|Bạn phải dùng đầu óc suy nghĩ đi.
睡好了，头脑才清楚。|Ngủ đủ thì đầu óc mới minh mẫn.
他很有经济头脑。|Anh ấy rất có đầu óc kinh doanh.
#清楚
你说得很清楚。|Bạn nói rất rõ ràng.
我看不清楚。|Tôi nhìn không rõ.
这件事我不太清楚。|Việc này tôi không rõ lắm.
请写清楚你的名字。|Hãy viết rõ tên của bạn.
你想清楚了吗？|Bạn đã nghĩ kỹ chưa?
#精神
今天你很有精神。|Hôm nay bạn trông rất có tinh thần.
我没睡好，没有精神。|Tôi ngủ không ngon, không có tinh thần.
他学习的精神很好。|Tinh thần học tập của anh ấy rất tốt.
喝杯咖啡提提精神。|Uống cốc cà phê cho tỉnh táo.
爷爷八十岁了，还很有精神。|Ông tám mươi tuổi rồi mà vẫn rất minh mẫn.
#效果
这个药效果很好。|Thuốc này hiệu quả rất tốt.
这样学习效果不好。|Học như vậy hiệu quả không tốt.
运动的效果很明显。|Hiệu quả của việc vận động rất rõ ràng.
你试试，看看效果怎么样。|Bạn thử xem hiệu quả thế nào.
早上学习效果最好。|Học buổi sáng hiệu quả nhất.
#适合
这件衣服很适合你。|Bộ quần áo này rất hợp với bạn.
这个工作不适合我。|Công việc này không phù hợp với tôi.
什么时候最适合去北京？|Khi nào thích hợp nhất để đi Bắc Kinh?
这本书适合初学者。|Cuốn sách này phù hợp cho người mới học.
找到适合自己的方法最重要。|Tìm được cách phù hợp với bản thân là quan trọng nhất.
#大声
请大声读。|Hãy đọc to lên.
别大声说话。|Đừng nói to.
他大声地笑了。|Anh ấy cười to.
我在公园里大声读课文。|Tôi đọc to bài khóa trong công viên.
你说话太大声了。|Bạn nói to quá.
#高中
我是高中生。|Tôi là học sinh cấp ba.
我从高中开始学汉语。|Tôi học tiếng Trung từ cấp ba.
我们是高中同学。|Chúng tôi là bạn học cấp ba.
高中的学习很紧张。|Học cấp ba rất căng thẳng.
高中毕业以后我上了大学。|Tốt nghiệp cấp ba xong tôi vào đại học.
#刚
我刚到家。|Tôi vừa về đến nhà.
他刚走。|Anh ấy vừa đi.
我刚开始学汉语。|Tôi mới bắt đầu học tiếng Trung.
电影刚开始。|Phim vừa mới bắt đầu.
这件衣服刚好合适。|Bộ quần áo này vừa khít.
#复杂
这个问题很复杂。|Vấn đề này rất phức tạp.
汉字很复杂。|Chữ Hán rất phức tạp.
别想得太复杂。|Đừng nghĩ quá phức tạp.
这条路很复杂，很容易迷路。|Con đường này rất phức tạp, dễ lạc.
他的心情很复杂。|Tâm trạng anh ấy rất phức tạp.
#发现
我发现汉语很有意思。|Tôi nhận ra tiếng Trung rất thú vị.
你发现了什么？|Bạn phát hiện ra điều gì?
我发现我的钱包不见了。|Tôi phát hiện ví của mình mất rồi.
他发现了一个好方法。|Anh ấy tìm ra một cách hay.
医生发现他生病了。|Bác sĩ phát hiện anh ấy bị bệnh.
#故事
妈妈给我讲故事。|Mẹ kể chuyện cho tôi nghe.
这个故事很有意思。|Câu chuyện này rất thú vị.
每个汉字都有自己的故事。|Mỗi chữ Hán đều có câu chuyện riêng.
你喜欢听什么故事？|Bạn thích nghe chuyện gì?
这是一个真实的故事。|Đây là một câu chuyện có thật.
#容易
这个题很容易。|Câu này rất dễ.
学汉语不容易。|Học tiếng Trung không dễ.
这个字很容易写错。|Chữ này rất dễ viết sai.
天冷了，容易感冒。|Trời lạnh rồi, dễ bị cảm.
找工作容易吗？|Tìm việc có dễ không?
#字幕
我看电影要看字幕。|Tôi xem phim phải xem phụ đề.
这个电影有越南语字幕吗？|Phim này có phụ đề tiếng Việt không?
我想不看字幕也能听懂。|Tôi muốn hiểu mà không cần xem phụ đề.
字幕太小了，看不清楚。|Phụ đề nhỏ quá, nhìn không rõ.
看中文字幕可以学汉字。|Xem phụ đề tiếng Trung có thể học chữ Hán.
#邻居
他是我的邻居。|Anh ấy là hàng xóm của tôi.
我们和邻居关系很好。|Chúng tôi có quan hệ tốt với hàng xóm.
越南和中国是邻居。|Việt Nam và Trung Quốc là láng giềng.
邻居家的狗很可爱。|Con chó nhà hàng xóm rất đáng yêu.
新邻居今天搬来了。|Hàng xóm mới hôm nay chuyển đến.
#经济
中国的经济发展很快。|Kinh tế Trung Quốc phát triển rất nhanh.
我的专业是经济。|Chuyên ngành của tôi là kinh tế.
现在经济不太好。|Hiện nay kinh tế không tốt lắm.
两国的经济合作越来越多。|Hợp tác kinh tế giữa hai nước ngày càng nhiều.
这个城市的经济很发达。|Kinh tế thành phố này rất phát triển.
#新闻
我每天看新闻。|Ngày nào tôi cũng xem tin tức.
今天有什么新闻？|Hôm nay có tin gì mới?
我在网上看到了这个新闻。|Tôi thấy tin này trên mạng.
我能看懂简单的中文新闻。|Tôi đọc hiểu được tin tức tiếng Trung đơn giản.
爸爸喜欢听新闻。|Bố thích nghe tin tức.
#笔记
上课要记笔记。|Lên lớp phải ghi chép.
我可以借你的笔记吗？|Tôi mượn vở ghi của bạn được không?
他的笔记写得很清楚。|Vở ghi của anh ấy viết rất rõ ràng.
考试前我看了一遍笔记。|Trước kỳ thi tôi xem lại vở ghi một lượt.
我在手机上记笔记。|Tôi ghi chép trên điện thoại.
#重点
这是这课的重点。|Đây là trọng điểm của bài này.
老师说的重点要记住。|Trọng điểm thầy nói phải nhớ.
你说话要说重点。|Bạn nói phải vào trọng tâm.
考试的重点是语法。|Trọng tâm của kỳ thi là ngữ pháp.
我把重点写在本子上了。|Tôi ghi trọng điểm vào vở rồi.
#练习题
今天的练习题很多。|Bài tập hôm nay rất nhiều.
我做完练习题了。|Tôi làm xong bài tập rồi.
这本书有很多练习题。|Cuốn sách này có nhiều bài tập.
多做练习题对考试有帮助。|Làm nhiều bài tập giúp ích cho kỳ thi.
这道练习题怎么做？|Bài tập này làm thế nào?
#保证
我保证明天不迟到。|Tôi đảm bảo mai không đến muộn.
睡好才能保证健康。|Ngủ đủ mới đảm bảo sức khỏe.
你能保证吗？|Bạn có thể đảm bảo không?
我们保证质量。|Chúng tôi đảm bảo chất lượng.
我保证完成任务。|Tôi đảm bảo hoàn thành nhiệm vụ.
#准考证
考试要带准考证。|Đi thi phải mang giấy báo dự thi.
我的准考证呢？|Giấy báo dự thi của tôi đâu?
请在网上打印准考证。|Hãy in giấy báo dự thi trên mạng.
没有准考证不能进考场。|Không có giấy báo dự thi không được vào phòng thi.
准考证上有考试的时间和地点。|Trên giấy báo dự thi có thời gian và địa điểm thi.
#橡皮
你有橡皮吗？|Bạn có tẩy không?
我借一下你的橡皮。|Cho tôi mượn cục tẩy của bạn.
写错了，用橡皮擦一下。|Viết sai rồi, dùng tẩy xóa đi.
我的橡皮丢了。|Cục tẩy của tôi mất rồi.
考试要带铅笔和橡皮。|Đi thi phải mang bút chì và tẩy.
#紧张
考试前我很紧张。|Trước kỳ thi tôi rất căng thẳng.
别紧张，慢慢说。|Đừng căng thẳng, nói từ từ.
他一紧张就说不出话。|Anh ấy hễ căng thẳng là không nói nên lời.
最近工作很紧张。|Gần đây công việc rất căng thẳng.
第一次上台，我有点儿紧张。|Lần đầu lên sân khấu, tôi hơi hồi hộp.
#相信
我相信你。|Tôi tin bạn.
你要相信自己。|Bạn phải tin vào bản thân.
我不相信他的话。|Tôi không tin lời anh ấy.
我相信明天会更好。|Tôi tin ngày mai sẽ tốt đẹp hơn.
大家都相信他会成功。|Mọi người đều tin anh ấy sẽ thành công.
#希望
我希望你能来。|Tôi hy vọng bạn có thể đến.
希望明天是晴天。|Mong ngày mai trời nắng.
他是我们的希望。|Anh ấy là niềm hy vọng của chúng tôi.
我希望去中国留学。|Tôi hy vọng được đi du học Trung Quốc.
不要失去希望。|Đừng mất hy vọng.
#辛苦
你辛苦了！|Bạn vất vả rồi!
妈妈工作很辛苦。|Mẹ làm việc rất vất vả.
学汉语虽然辛苦，但是很开心。|Học tiếng Trung tuy vất vả nhưng rất vui.
辛苦你了，谢谢！|Làm phiền bạn vất vả rồi, cảm ơn!
农民种地很辛苦。|Nông dân làm ruộng rất vất vả.
#年纪
您多大年纪了？|Bác bao nhiêu tuổi rồi ạ?
爷爷年纪大了。|Ông tuổi đã cao.
他年纪很小，可是很懂事。|Cậu ấy tuổi còn nhỏ nhưng rất hiểu chuyện.
我们年纪差不多。|Chúng tôi tuổi xấp xỉ nhau.
年纪大了要多注意身体。|Lớn tuổi rồi phải chú ý sức khỏe hơn.
#除了
除了他，大家都来了。|Ngoài anh ấy ra, mọi người đều đến rồi.
除了汉语，我还学英语。|Ngoài tiếng Trung, tôi còn học tiếng Anh.
除了星期天，我每天都上班。|Trừ chủ nhật, ngày nào tôi cũng đi làm.
除了看书，你还喜欢做什么？|Ngoài đọc sách, bạn còn thích làm gì?
除了这个，还有别的吗？|Ngoài cái này, còn gì khác không?
#挣
他一个月挣多少钱？|Một tháng anh ấy kiếm bao nhiêu tiền?
我想自己挣钱。|Tôi muốn tự kiếm tiền.
挣钱不容易。|Kiếm tiền không dễ.
他挣的钱都给了父母。|Tiền anh ấy kiếm được đều đưa cho bố mẹ.
大学生可以做家教挣钱。|Sinh viên có thể làm gia sư kiếm tiền.
#现实
梦想会变成现实。|Ước mơ sẽ trở thành hiện thực.
这个想法不太现实。|Ý tưởng này không thực tế lắm.
我们要面对现实。|Chúng ta phải đối mặt với hiện thực.
现实和电影不一样。|Thực tế khác với phim.
他是一个很现实的人。|Anh ấy là người rất thực tế.
#战争
我们不希望有战争。|Chúng ta không mong có chiến tranh.
这是一部关于战争的电影。|Đây là một bộ phim về chiến tranh.
战争让很多人失去了家。|Chiến tranh khiến nhiều người mất nhà.
爷爷经历过战争。|Ông đã trải qua chiến tranh.
战争结束了。|Chiến tranh đã kết thúc.
#和平
我们都希望世界和平。|Chúng ta đều mong thế giới hòa bình.
和平很重要。|Hòa bình rất quan trọng.
我们生活在和平的时代。|Chúng ta sống trong thời đại hòa bình.
白鸽代表和平。|Bồ câu trắng tượng trưng cho hòa bình.
两国和平地解决了问题。|Hai nước đã giải quyết vấn đề một cách hòa bình.
#力量
团结就是力量。|Đoàn kết là sức mạnh.
你的鼓励给了我力量。|Sự động viên của bạn cho tôi sức mạnh.
一个人的力量很小。|Sức một người rất nhỏ.
他很有力量。|Anh ấy rất khỏe.
音乐有很大的力量。|Âm nhạc có sức mạnh to lớn.
#做客
欢迎来我家做客！|Mời bạn đến nhà tôi chơi!
周末我去朋友家做客。|Cuối tuần tôi đến nhà bạn chơi.
去别人家做客要带礼物吗？|Đến nhà người khác chơi có cần mang quà không?
谢谢你请我来做客。|Cảm ơn bạn đã mời tôi đến chơi.
下次再来做客吧。|Lần sau lại đến chơi nhé.
#超市
我去超市买东西。|Tôi đi siêu thị mua đồ.
超市里什么都有。|Trong siêu thị cái gì cũng có.
附近有超市吗？|Gần đây có siêu thị không?
超市晚上十点关门。|Siêu thị đóng cửa lúc mười giờ tối.
超市的水果很新鲜。|Hoa quả ở siêu thị rất tươi.
#饮料
你想喝什么饮料？|Bạn muốn uống gì?
冰箱里有很多饮料。|Trong tủ lạnh có nhiều đồ uống.
小孩子别喝太多饮料。|Trẻ con đừng uống quá nhiều nước ngọt.
我买了两瓶饮料。|Tôi mua hai chai đồ uống.
这种饮料很甜。|Loại đồ uống này rất ngọt.
#点心
我们吃点儿点心吧。|Chúng ta ăn chút bánh nhé.
这些点心是妈妈做的。|Những chiếc bánh này là mẹ làm.
广东的点心很有名。|Điểm tâm Quảng Đông rất nổi tiếng.
请喝茶，吃点心。|Mời uống trà, ăn bánh.
我给朋友买了一盒点心。|Tôi mua cho bạn một hộp bánh.
#欢迎
欢迎你来越南！|Chào mừng bạn đến Việt Nam!
欢迎欢迎，快请进！|Hoan nghênh, mời vào nhanh!
他很受欢迎。|Anh ấy rất được yêu thích.
欢迎大家来参加。|Chào mừng mọi người đến tham gia.
这个菜很受欢迎。|Món này rất được ưa chuộng.
#倒
我给你倒杯水。|Để tôi rót cho bạn cốc nước.
请倒一杯茶。|Làm ơn rót một cốc trà.
他把垃圾倒了。|Anh ấy đã đổ rác.
妈妈给客人倒咖啡。|Mẹ rót cà phê cho khách.
别倒太满。|Đừng rót đầy quá.
#春卷
越南春卷很好吃。|Nem rán Việt Nam rất ngon.
我会做春卷。|Tôi biết làm nem rán.
春节的时候我们吃春卷。|Dịp Tết chúng tôi ăn nem rán.
你吃过越南春卷吗？|Bạn đã ăn nem rán Việt Nam chưa?
一盘春卷多少钱？|Một đĩa nem rán bao nhiêu tiền?
#游戏
我们来玩儿个游戏吧。|Chúng ta chơi một trò chơi nhé.
他喜欢玩儿电脑游戏。|Anh ấy thích chơi game máy tính.
别玩儿游戏了，去学习！|Đừng chơi game nữa, đi học đi!
这个游戏很有意思。|Trò chơi này rất thú vị.
孩子们在做游戏。|Bọn trẻ đang chơi trò chơi.
#附近
附近有银行吗？|Gần đây có ngân hàng không?
我家附近有一个公园。|Gần nhà tôi có một công viên.
学校附近的饭馆很便宜。|Quán ăn gần trường rất rẻ.
他住在这附近。|Anh ấy sống gần đây.
附近没有地铁站。|Gần đây không có ga tàu điện ngầm.
#尝
你尝尝这个菜。|Bạn nếm thử món này đi.
我想尝一尝中国菜。|Tôi muốn nếm thử món Trung Quốc.
尝一下，好吃吗？|Nếm thử xem, có ngon không?
我尝过这种水果。|Tôi đã nếm thử loại quả này.
妈妈让我尝尝汤的味道。|Mẹ bảo tôi nếm thử vị canh.
#礼物
这是送你的礼物。|Đây là quà tặng bạn.
谢谢你的礼物！|Cảm ơn món quà của bạn!
我给妈妈买了生日礼物。|Tôi mua quà sinh nhật cho mẹ.
你想要什么礼物？|Bạn muốn quà gì?
这个礼物很特别。|Món quà này rất đặc biệt.
#愉快
祝你周末愉快！|Chúc bạn cuối tuần vui vẻ!
我们度过了一个愉快的晚上。|Chúng tôi đã có một buổi tối vui vẻ.
旅行很愉快。|Chuyến đi rất vui vẻ.
和你一起工作很愉快。|Làm việc cùng bạn rất vui.
祝你生日愉快！|Chúc bạn sinh nhật vui vẻ!
#父母
我很爱我的父母。|Tôi rất yêu bố mẹ tôi.
你的父母做什么工作？|Bố mẹ bạn làm nghề gì?
父母是孩子的第一个老师。|Cha mẹ là người thầy đầu tiên của con cái.
我常常给父母打电话。|Tôi thường gọi điện cho bố mẹ.
我们要孝顺父母。|Chúng ta phải hiếu thảo với cha mẹ.
#礼貌
他是一个很有礼貌的孩子。|Cậu bé ấy rất lễ phép.
说话要有礼貌。|Nói chuyện phải lịch sự.
这样做很不礼貌。|Làm như vậy rất bất lịch sự.
见到老师要礼貌地问好。|Gặp thầy cô phải lễ phép chào hỏi.
礼貌是很重要的。|Lễ phép rất quan trọng.
#长辈
我们要尊重长辈。|Chúng ta phải kính trọng người lớn tuổi.
春节的时候给长辈拜年。|Dịp Tết đi chúc Tết người lớn.
在长辈面前要有礼貌。|Trước mặt người lớn phải lễ phép.
长辈说的话要认真听。|Lời người lớn nói phải nghe cẩn thận.
家里的长辈都很关心我。|Người lớn trong nhà đều rất quan tâm tôi.
#即使
即使下雨，我也要去。|Cho dù mưa tôi cũng phải đi.
即使很累，他也不休息。|Dù rất mệt anh ấy cũng không nghỉ.
即使失败了，也不要放弃。|Dù thất bại cũng đừng bỏ cuộc.
即使你不说，我也知道。|Dù bạn không nói tôi cũng biết.
即使很难，我也要学好汉语。|Dù khó tôi cũng phải học giỏi tiếng Trung.
#承认
他承认了自己的错。|Anh ấy đã thừa nhận lỗi của mình.
我承认我错了。|Tôi thừa nhận tôi sai rồi.
他不承认是他做的。|Anh ấy không thừa nhận là anh ấy làm.
做错了事要敢承认。|Làm sai phải dám thừa nhận.
我不得不承认，他说得对。|Tôi phải thừa nhận anh ấy nói đúng.
#教育
父母很重视孩子的教育。|Cha mẹ rất coi trọng việc giáo dục con cái.
他在教育行业工作。|Anh ấy làm trong ngành giáo dục.
老师教育我们要诚实。|Thầy cô dạy chúng tôi phải trung thực.
教育对一个国家很重要。|Giáo dục rất quan trọng đối với một quốc gia.
他受过很好的教育。|Anh ấy đã được giáo dục rất tốt.
#爱护
我们要爱护环境。|Chúng ta phải bảo vệ môi trường.
请爱护花草。|Xin hãy bảo vệ hoa cỏ.
爱护动物。|Hãy yêu thương động vật.
哥哥很爱护妹妹。|Anh trai rất yêu thương em gái.
要爱护公共的东西。|Phải giữ gìn tài sản công.
#垃圾
别乱扔垃圾。|Đừng vứt rác bừa bãi.
请把垃圾扔进垃圾桶。|Hãy bỏ rác vào thùng rác.
我去倒垃圾。|Tôi đi đổ rác.
地上有很多垃圾。|Dưới đất có rất nhiều rác.
垃圾要分类。|Rác phải được phân loại.
#节约
我们要节约用水。|Chúng ta phải tiết kiệm nước.
出门的时候关灯，节约用电。|Khi ra ngoài tắt đèn để tiết kiệm điện.
节约时间很重要。|Tiết kiệm thời gian rất quan trọng.
妈妈很节约。|Mẹ rất tiết kiệm.
吃多少点多少，不要浪费，要节约。|Ăn bao nhiêu gọi bấy nhiêu, đừng lãng phí, phải tiết kiệm.
#榜样
他是我学习的榜样。|Anh ấy là tấm gương học tập của tôi.
父母是孩子的榜样。|Cha mẹ là tấm gương của con cái.
哥哥要给弟弟做个好榜样。|Anh trai phải làm gương tốt cho em.
她是我们班的榜样。|Cô ấy là tấm gương của lớp chúng tôi.
我们要向榜样学习。|Chúng ta phải học tập theo tấm gương.
#通过
我通过了HSK考试。|Tôi đã thi đỗ HSK.
我通过朋友认识了他。|Tôi quen anh ấy qua bạn bè.
通过学习，我了解了中国文化。|Thông qua việc học, tôi hiểu được văn hóa Trung Quốc.
火车通过了大桥。|Tàu hỏa đã đi qua cây cầu lớn.
他的计划没有通过。|Kế hoạch của anh ấy không được thông qua.
#差不多
我们差不多高。|Chúng tôi cao xấp xỉ nhau.
作业差不多写完了。|Bài tập gần làm xong rồi.
差不多八点了，我们走吧。|Gần tám giờ rồi, chúng ta đi thôi.
这两个手机差不多。|Hai chiếc điện thoại này gần giống nhau.
我等了差不多一个小时。|Tôi đợi gần một tiếng.
#背
我每天背十个生词。|Mỗi ngày tôi học thuộc mười từ mới.
你背会课文了吗？|Bạn thuộc bài khóa chưa?
他背了很多古诗。|Anh ấy thuộc rất nhiều thơ cổ.
背生词要多复习。|Học thuộc từ mới phải ôn nhiều.
我背不下来。|Tôi học mãi không thuộc.
#庆祝
我们一起庆祝生日吧。|Chúng ta cùng mừng sinh nhật nhé.
为了庆祝你成功，我请你吃饭。|Để mừng bạn thành công, tôi mời bạn ăn cơm.
春节大家都在庆祝。|Dịp Tết mọi người đều ăn mừng.
我们开了一个晚会庆祝。|Chúng tôi tổ chức một buổi tiệc để ăn mừng.
考试通过了，要好好庆祝一下。|Thi đỗ rồi, phải ăn mừng một chút.
#收获
这次旅行收获很大。|Chuyến đi này thu hoạch được nhiều điều.
努力就会有收获。|Nỗ lực thì sẽ có thành quả.
你今天有什么收获？|Hôm nay bạn học được gì?
秋天是收获的季节。|Mùa thu là mùa thu hoạch.
学汉语让我收获了很多朋友。|Học tiếng Trung giúp tôi có thêm nhiều bạn bè.
#回复
请尽快回复我。|Hãy trả lời tôi sớm nhất có thể.
他还没回复我的信息。|Anh ấy vẫn chưa trả lời tin nhắn của tôi.
我马上回复你。|Tôi sẽ trả lời bạn ngay.
谢谢你的回复。|Cảm ơn bạn đã trả lời.
老师回复了我的邮件。|Thầy đã trả lời email của tôi.
#运动
我喜欢运动。|Tôi thích thể thao.
你最喜欢什么运动？|Bạn thích môn thể thao nào nhất?
每天运动半个小时。|Mỗi ngày vận động nửa tiếng.
运动对身体很好。|Vận động rất tốt cho cơ thể.
他运动以后出了很多汗。|Sau khi vận động anh ấy ra nhiều mồ hôi.
#羽毛球
我们去打羽毛球吧。|Chúng ta đi đánh cầu lông nhé.
他羽毛球打得很好。|Anh ấy đánh cầu lông rất giỏi.
我每个周末都打羽毛球。|Cuối tuần nào tôi cũng đánh cầu lông.
羽毛球在中国很受欢迎。|Cầu lông rất được ưa chuộng ở Trung Quốc.
我买了一个新的羽毛球。|Tôi mua một quả cầu lông mới.
#球拍
这是我的新球拍。|Đây là cây vợt mới của tôi.
我忘了带球拍。|Tôi quên mang vợt.
这个球拍很轻。|Cây vợt này rất nhẹ.
你的球拍多少钱？|Vợt của bạn bao nhiêu tiền?
我可以借你的球拍吗？|Tôi mượn vợt của bạn được không?
#全身
运动以后全身都很舒服。|Sau khi vận động toàn thân rất dễ chịu.
我全身都湿了。|Tôi ướt sũng cả người.
跑完步，我全身没有力气。|Chạy xong, tôi mệt rã rời cả người.
游泳是全身运动。|Bơi là môn vận động toàn thân.
他感冒了，全身都疼。|Anh ấy bị cảm, đau khắp người.
#汗
我出了很多汗。|Tôi ra rất nhiều mồ hôi.
天太热了，满头大汗。|Trời nóng quá, mồ hôi đầy đầu.
擦擦汗吧。|Lau mồ hôi đi.
运动出汗对身体好。|Vận động ra mồ hôi tốt cho cơ thể.
他紧张得出汗了。|Anh ấy căng thẳng đến toát mồ hôi.
#比赛
明天有足球比赛。|Ngày mai có trận bóng đá.
我们赢了比赛。|Chúng tôi thắng trận rồi.
他参加了汉语比赛。|Anh ấy tham gia cuộc thi tiếng Trung.
比赛几点开始？|Trận đấu mấy giờ bắt đầu?
我们比赛谁跑得快。|Chúng ta thi xem ai chạy nhanh hơn.
#体育
我喜欢上体育课。|Tôi thích học giờ thể dục.
他是体育老师。|Anh ấy là giáo viên thể dục.
你喜欢看体育节目吗？|Bạn có thích xem chương trình thể thao không?
学校有很多体育活动。|Trường có nhiều hoạt động thể thao.
体育对学生很重要。|Thể dục rất quan trọng đối với học sinh.
#家务
我常常帮妈妈做家务。|Tôi thường giúp mẹ làm việc nhà.
你在家做家务吗？|Bạn có làm việc nhà ở nhà không?
做家务也是一种运动。|Làm việc nhà cũng là một kiểu vận động.
周末我们一起做家务。|Cuối tuần chúng tôi cùng làm việc nhà.
他不喜欢做家务。|Anh ấy không thích làm việc nhà.
#切
我来切菜。|Để tôi thái rau.
请把苹果切成小块。|Hãy cắt táo thành miếng nhỏ.
小心，别切到手。|Cẩn thận, đừng cắt vào tay.
妈妈在厨房切肉。|Mẹ đang thái thịt trong bếp.
我们切蛋糕吧。|Chúng ta cắt bánh kem nhé.
#洗碗
吃完饭我洗碗。|Ăn xong tôi rửa bát.
今天轮到你洗碗了。|Hôm nay đến lượt bạn rửa bát.
我不喜欢洗碗。|Tôi không thích rửa bát.
爸爸做饭，我洗碗。|Bố nấu cơm, tôi rửa bát.
我们家有洗碗机。|Nhà tôi có máy rửa bát.
#擦
我每天擦桌子。|Ngày nào tôi cũng lau bàn.
请把黑板擦干净。|Hãy lau sạch bảng.
他擦了擦眼睛。|Anh ấy dụi dụi mắt.
周末我擦窗户。|Cuối tuần tôi lau cửa sổ.
用这块布擦一下。|Dùng miếng vải này lau một chút.
#负责
我负责做饭。|Tôi phụ trách nấu cơm.
这件事谁负责？|Việc này ai phụ trách?
他是一个很负责的人。|Anh ấy là người rất có trách nhiệm.
我负责打扫教室。|Tôi phụ trách dọn lớp.
你要对自己负责。|Bạn phải chịu trách nhiệm với bản thân.
#扫地
我在扫地。|Tôi đang quét nhà.
每天早上我都扫地。|Sáng nào tôi cũng quét nhà.
你扫地，我擦桌子。|Bạn quét nhà, tôi lau bàn.
扫地以后房间干净多了。|Quét nhà xong phòng sạch hơn nhiều.
小时候我常常帮奶奶扫地。|Hồi nhỏ tôi hay giúp bà quét nhà.
#收拾
我要收拾房间。|Tôi phải dọn phòng.
你的东西收拾好了吗？|Đồ của bạn dọn xong chưa?
吃完饭我收拾桌子。|Ăn xong tôi dọn bàn.
明天出发，今天收拾行李。|Mai xuất phát, hôm nay thu dọn hành lý.
房间太乱了，快收拾一下。|Phòng bừa quá, dọn nhanh đi.
#单子
这是买东西的单子。|Đây là danh sách đồ cần mua.
我把要做的事写在单子上。|Tôi ghi việc cần làm vào tờ giấy.
单子在桌子上。|Tờ danh sách ở trên bàn.
服务员，请给我菜单子。|Phục vụ ơi, cho tôi tờ thực đơn.
别忘了带单子。|Đừng quên mang theo tờ danh sách.
#蔬菜
多吃蔬菜对身体好。|Ăn nhiều rau tốt cho cơ thể.
我去市场买蔬菜。|Tôi đi chợ mua rau.
这些蔬菜很新鲜。|Những rau này rất tươi.
孩子不喜欢吃蔬菜。|Trẻ con không thích ăn rau.
奶奶在家里种蔬菜。|Bà trồng rau ở nhà.
#晒
我在外面晒衣服。|Tôi phơi quần áo ở ngoài.
今天太阳很好，可以晒被子。|Hôm nay nắng đẹp, có thể phơi chăn.
别在太阳下晒太久。|Đừng phơi nắng quá lâu.
他晒黑了。|Anh ấy bị cháy nắng đen rồi.
衣服晒干了。|Quần áo phơi khô rồi.
#信息
我给你发了一条信息。|Tôi đã gửi bạn một tin nhắn.
你收到我的信息了吗？|Bạn nhận được tin nhắn của tôi chưa?
网上有很多信息。|Trên mạng có rất nhiều thông tin.
请留下你的联系信息。|Hãy để lại thông tin liên lạc của bạn.
这个信息很重要。|Thông tin này rất quan trọng.
#本领
学好汉语是一种本领。|Học giỏi tiếng Trung là một kỹ năng.
他的本领很大。|Bản lĩnh của anh ấy rất lớn.
我想多学一些本领。|Tôi muốn học thêm một số kỹ năng.
做饭是生活的本领。|Nấu ăn là kỹ năng sống.
年轻人要学好本领。|Người trẻ phải học tốt kỹ năng.
#样子
他的样子很像爸爸。|Dáng vẻ cậu ấy rất giống bố.
看样子要下雨了。|Xem chừng sắp mưa rồi.
你怎么累成这个样子？|Sao bạn mệt đến thế này?
我喜欢这个包的样子。|Tôi thích kiểu dáng chiếc túi này.
他装出很高兴的样子。|Anh ấy làm ra vẻ rất vui.
#锻炼
我每天早上锻炼身体。|Sáng nào tôi cũng rèn luyện thân thể.
多锻炼身体才会健康。|Rèn luyện nhiều mới khỏe mạnh.
这份工作很锻炼人。|Công việc này rất rèn luyện con người.
你常常锻炼吗？|Bạn có thường tập thể dục không?
爷爷每天去公园锻炼。|Ông ngày nào cũng đi công viên tập thể dục.
#以前
以前我不会说汉语。|Trước đây tôi không biết nói tiếng Trung.
睡觉以前要刷牙。|Trước khi ngủ phải đánh răng.
他以前是老师。|Trước đây anh ấy là giáo viên.
三年以前我来到这里。|Ba năm trước tôi đến đây.
这里和以前不一样了。|Ở đây đã khác trước rồi.
#简单
这个问题很简单。|Câu hỏi này rất đơn giản.
我们吃得很简单。|Chúng tôi ăn rất đơn giản.
说起来简单，做起来难。|Nói thì dễ, làm mới khó.
请简单地介绍一下自己。|Hãy giới thiệu ngắn gọn về bản thân.
他是一个简单的人。|Anh ấy là người đơn giản.
#变化
这几年变化很大。|Mấy năm nay thay đổi rất nhiều.
天气变化很快。|Thời tiết thay đổi rất nhanh.
你没什么变化。|Bạn không thay đổi mấy.
我的家乡有了很大的变化。|Quê tôi đã có thay đổi lớn.
学汉语以后，我的生活有了变化。|Sau khi học tiếng Trung, cuộc sống của tôi đã thay đổi.
#气氛
晚会的气氛很好。|Bầu không khí buổi tiệc rất tốt.
春节的气氛很热闹。|Không khí Tết rất náo nhiệt.
教室里的气氛很紧张。|Không khí trong lớp rất căng thẳng.
我喜欢这家咖啡馆的气氛。|Tôi thích không khí của quán cà phê này.
他一来，气氛就轻松了。|Anh ấy vừa đến, không khí liền thoải mái hơn.
#早睡早起
早睡早起身体好。|Ngủ sớm dậy sớm thì khỏe.
我想养成早睡早起的习惯。|Tôi muốn tạo thói quen ngủ sớm dậy sớm.
爷爷每天早睡早起。|Ông ngày nào cũng ngủ sớm dậy sớm.
早睡早起很难做到。|Ngủ sớm dậy sớm rất khó làm được.
你应该早睡早起。|Bạn nên ngủ sớm dậy sớm.
#年轻人
现在的年轻人喜欢玩手机。|Giới trẻ bây giờ thích chơi điện thoại.
年轻人要多学习。|Người trẻ phải học nhiều hơn.
很多年轻人喜欢喝奶茶。|Nhiều bạn trẻ thích uống trà sữa.
这个地方年轻人很多。|Chỗ này có nhiều người trẻ.
他是一个很努力的年轻人。|Anh ấy là một người trẻ rất chăm chỉ.
#头疼
我有点儿头疼。|Tôi hơi đau đầu.
没睡好，所以头疼。|Ngủ không ngon nên đau đầu.
这件事真让人头疼。|Việc này thật khiến người ta đau đầu.
你头疼的话就休息吧。|Nếu bạn đau đầu thì nghỉ đi.
他头疼得很厉害。|Anh ấy đau đầu rất dữ dội.
#呼吸
深呼吸，别紧张。|Hít thở sâu, đừng căng thẳng.
我想出去呼吸新鲜空气。|Tôi muốn ra ngoài hít thở không khí trong lành.
跑步的时候要注意呼吸。|Khi chạy phải chú ý hơi thở.
房间里太热，呼吸不舒服。|Trong phòng nóng quá, thở không dễ chịu.
他慢慢地呼吸。|Anh ấy hít thở chậm rãi.
#效率
早上工作效率很高。|Buổi sáng làm việc hiệu suất rất cao.
这样做效率太低了。|Làm như vậy hiệu suất thấp quá.
怎么提高学习效率？|Làm sao nâng cao hiệu quả học tập?
睡好了，效率才高。|Ngủ đủ thì hiệu suất mới cao.
他做事很有效率。|Anh ấy làm việc rất hiệu quả.
#牢
这个字我记得很牢。|Chữ này tôi nhớ rất chắc.
请把门关牢。|Hãy đóng chặt cửa.
多复习，才能记牢。|Ôn nhiều mới nhớ chắc được.
绳子绑得很牢。|Sợi dây buộc rất chắc.
老师的话要牢牢记住。|Lời thầy phải ghi nhớ thật kỹ.
#熬夜
别熬夜了，早点儿睡。|Đừng thức khuya nữa, ngủ sớm đi.
昨天我熬夜了，今天很累。|Hôm qua tôi thức khuya, hôm nay rất mệt.
熬夜对身体不好。|Thức khuya không tốt cho cơ thể.
考试前很多学生熬夜学习。|Trước kỳ thi nhiều học sinh thức khuya học bài.
我不习惯熬夜。|Tôi không quen thức khuya.
#建议
我建议你多听多说。|Tôi khuyên bạn nghe nhiều nói nhiều.
你有什么建议？|Bạn có đề xuất gì không?
谢谢你的建议。|Cảm ơn lời khuyên của bạn.
医生建议我多休息。|Bác sĩ khuyên tôi nghỉ ngơi nhiều.
我接受了他的建议。|Tôi đã chấp nhận lời đề nghị của anh ấy.
#养成
要养成好习惯。|Phải hình thành thói quen tốt.
我养成了每天看书的习惯。|Tôi đã có thói quen đọc sách mỗi ngày.
坏习惯很容易养成。|Thói quen xấu rất dễ hình thành.
从小养成早睡的习惯。|Từ nhỏ đã tạo thói quen ngủ sớm.
养成一个习惯需要时间。|Hình thành một thói quen cần thời gian.
#睡着
我昨天很快就睡着了。|Hôm qua tôi ngủ thiếp đi rất nhanh.
孩子睡着了，小声点儿。|Đứa bé ngủ rồi, nói nhỏ thôi.
我太紧张，睡不着。|Tôi căng thẳng quá, không ngủ được.
他看电视看着看着就睡着了。|Anh ấy xem tivi một lúc rồi ngủ thiếp đi.
你睡着了吗？|Bạn ngủ chưa?
#安排
周末你有什么安排？|Cuối tuần bạn có kế hoạch gì?
我来安排时间。|Để tôi sắp xếp thời gian.
公司安排我去北京。|Công ty sắp xếp cho tôi đi Bắc Kinh.
你要合理安排时间。|Bạn phải sắp xếp thời gian hợp lý.
今天的安排很满。|Lịch hôm nay kín cả.
#陪
我陪你去医院。|Tôi đi cùng bạn đến bệnh viện.
周末我陪父母吃饭。|Cuối tuần tôi ăn cơm cùng bố mẹ.
谢谢你陪我。|Cảm ơn bạn đã ở bên tôi.
我想多陪陪孩子。|Tôi muốn dành nhiều thời gian bên con hơn.
他陪朋友去买东西了。|Anh ấy đi cùng bạn đi mua đồ rồi.
#市场
我去市场买菜。|Tôi đi chợ mua thức ăn.
这个市场的水果很便宜。|Hoa quả ở chợ này rất rẻ.
早上市场很热闹。|Buổi sáng chợ rất đông vui.
市场上有很多人。|Trong chợ có rất nhiều người.
妈妈每天都去市场。|Mẹ ngày nào cũng đi chợ.
#顿
我一天吃三顿饭。|Một ngày tôi ăn ba bữa.
我请你吃一顿饭。|Tôi mời bạn một bữa cơm.
这顿饭很好吃。|Bữa cơm này rất ngon.
我们吃了一顿火锅。|Chúng tôi đã ăn một bữa lẩu.
他被妈妈说了一顿。|Cậu ấy bị mẹ mắng cho một trận.
#火锅
我们去吃火锅吧。|Chúng ta đi ăn lẩu nhé.
冬天吃火锅最舒服。|Mùa đông ăn lẩu là dễ chịu nhất.
四川火锅很辣。|Lẩu Tứ Xuyên rất cay.
你喜欢吃火锅吗？|Bạn có thích ăn lẩu không?
一家人一起吃火锅很热闹。|Cả nhà cùng ăn lẩu rất vui vẻ.
#留
请给我留一个座位。|Hãy giữ cho tôi một chỗ ngồi.
他留在家里了。|Anh ấy ở lại nhà.
我给你留了一点儿饭。|Tôi để phần cho bạn một ít cơm.
请留下你的电话号码。|Hãy để lại số điện thoại của bạn.
这次旅行给我留下了很深的印象。|Chuyến đi này để lại cho tôi ấn tượng sâu sắc.
#用心
他学习很用心。|Anh ấy học rất chú tâm.
只要用心，就能学好。|Chỉ cần chú tâm là học giỏi được.
这个礼物是我用心准备的。|Món quà này là tôi chuẩn bị rất chu đáo.
做事要用心。|Làm việc phải dụng tâm.
老师教得很用心。|Thầy dạy rất tận tâm.
#珍惜
要珍惜时间。|Phải trân trọng thời gian.
我很珍惜我们的友谊。|Tôi rất trân trọng tình bạn của chúng ta.
珍惜和家人在一起的时间。|Trân trọng thời gian bên gia đình.
这个机会很难得，要珍惜。|Cơ hội này hiếm có, phải trân trọng.
我们要珍惜粮食。|Chúng ta phải quý trọng lương thực.
#陪伴
谢谢你一直陪伴我。|Cảm ơn bạn luôn ở bên tôi.
父母需要孩子的陪伴。|Cha mẹ cần con cái ở bên.
有你陪伴，我很幸福。|Có bạn bên cạnh, tôi rất hạnh phúc.
小狗陪伴了我十年。|Con chó nhỏ đã ở bên tôi mười năm.
最好的礼物是陪伴。|Món quà tuyệt nhất là sự đồng hành.
#后悔
我很后悔没有好好学习。|Tôi rất hối hận vì đã không học hành chăm chỉ.
做了就不要后悔。|Đã làm thì đừng hối hận.
你会后悔的。|Bạn sẽ hối hận đấy.
我不后悔我的选择。|Tôi không hối hận về lựa chọn của mình.
他后悔说了那句话。|Anh ấy hối hận vì đã nói câu đó.
#选择
你选择哪一个？|Bạn chọn cái nào?
这是我自己的选择。|Đây là lựa chọn của chính tôi.
我选择学汉语。|Tôi chọn học tiếng Trung.
我们没有别的选择。|Chúng ta không có lựa chọn nào khác.
选择比努力更重要吗？|Lựa chọn có quan trọng hơn nỗ lực không?
#分享
谢谢你和我分享。|Cảm ơn bạn đã chia sẻ với tôi.
我想分享一个故事。|Tôi muốn chia sẻ một câu chuyện.
他喜欢分享学习方法。|Anh ấy thích chia sẻ phương pháp học.
我把照片分享给朋友。|Tôi chia sẻ ảnh cho bạn bè.
快乐要和大家分享。|Niềm vui phải chia sẻ cùng mọi người.
#影响
天气影响我的心情。|Thời tiết ảnh hưởng đến tâm trạng tôi.
熬夜会影响健康。|Thức khuya sẽ ảnh hưởng đến sức khỏe.
父母对孩子影响很大。|Cha mẹ có ảnh hưởng rất lớn đến con cái.
别影响别人休息。|Đừng ảnh hưởng đến người khác nghỉ ngơi.
这本书对我影响很大。|Cuốn sách này ảnh hưởng tôi rất nhiều.
#当
我想当老师。|Tôi muốn làm giáo viên.
他当了班长。|Cậu ấy làm lớp trưởng.
你长大以后想当什么？|Lớn lên bạn muốn làm gì?
我当过导游。|Tôi từng làm hướng dẫn viên.
她当医生已经十年了。|Cô ấy làm bác sĩ đã mười năm rồi.
#家教
我在做家教。|Tôi đang làm gia sư.
我给一个孩子当家教。|Tôi làm gia sư cho một đứa trẻ.
做家教可以挣钱。|Làm gia sư có thể kiếm tiền.
我想找一个汉语家教。|Tôi muốn tìm một gia sư tiếng Trung.
他每周做三次家教。|Mỗi tuần anh ấy dạy gia sư ba lần.
#成就感
教孩子学习很有成就感。|Dạy trẻ học rất có cảm giác thành tựu.
完成工作以后，我很有成就感。|Hoàn thành công việc, tôi thấy rất có thành tựu.
这份工作没有成就感。|Công việc này không có cảm giác thành tựu.
听懂中文电影让我很有成就感。|Nghe hiểu phim Trung Quốc khiến tôi thấy rất thành tựu.
成就感让我更努力。|Cảm giác thành tựu khiến tôi nỗ lực hơn.
#确定
你确定吗？|Bạn chắc chứ?
我不确定他会不会来。|Tôi không chắc anh ấy có đến không.
时间还没确定。|Thời gian vẫn chưa xác định.
我确定我没错。|Tôi chắc chắn mình không sai.
请确定一下地址。|Hãy xác nhận lại địa chỉ.
#小说
我喜欢看小说。|Tôi thích đọc tiểu thuyết.
这本小说很有意思。|Cuốn tiểu thuyết này rất thú vị.
他在写一本小说。|Anh ấy đang viết một cuốn tiểu thuyết.
我想看中文小说。|Tôi muốn đọc tiểu thuyết tiếng Trung.
这部电影是根据小说改编的。|Bộ phim này được chuyển thể từ tiểu thuyết.
#爱情
这是一个爱情故事。|Đây là một câu chuyện tình yêu.
她喜欢看爱情电影。|Cô ấy thích xem phim tình cảm.
爱情需要时间。|Tình yêu cần thời gian.
很多歌都是关于爱情的。|Nhiều bài hát đều về tình yêu.
他们的爱情很美好。|Tình yêu của họ rất đẹp.
#家庭
我有一个幸福的家庭。|Tôi có một gia đình hạnh phúc.
家庭对我很重要。|Gia đình rất quan trọng với tôi.
你的家庭有几口人？|Gia đình bạn có mấy người?
他来自一个普通的家庭。|Anh ấy xuất thân từ một gia đình bình thường.
工作和家庭都很重要。|Công việc và gia đình đều quan trọng.
#好像
好像要下雨了。|Hình như sắp mưa rồi.
他好像不高兴。|Anh ấy hình như không vui.
我好像在哪儿见过你。|Hình như tôi đã gặp bạn ở đâu đó.
她笑得好像一个孩子。|Cô ấy cười như một đứa trẻ.
这件事好像很复杂。|Việc này có vẻ rất phức tạp.
#发生
发生了什么事？|Đã xảy ra chuyện gì?
这件事发生在去年。|Chuyện này xảy ra vào năm ngoái.
路上发生了一件有意思的事。|Trên đường xảy ra một chuyện thú vị.
这种事不会再发生了。|Chuyện như vậy sẽ không xảy ra nữa.
昨天这里发生了交通事故。|Hôm qua ở đây xảy ra tai nạn giao thông.
#词典
我常常查词典。|Tôi thường tra từ điển.
这本词典很好用。|Cuốn từ điển này rất dễ dùng.
不认识的字可以查词典。|Chữ không biết có thể tra từ điển.
我用手机词典。|Tôi dùng từ điển trên điện thoại.
你有汉越词典吗？|Bạn có từ điển Trung–Việt không?
#想法
你有什么想法？|Bạn có suy nghĩ gì?
这个想法很好。|Ý tưởng này rất hay.
我的想法和你不一样。|Suy nghĩ của tôi khác bạn.
他改变了想法。|Anh ấy đã thay đổi suy nghĩ.
说说你的想法吧。|Nói suy nghĩ của bạn đi.
#聪明
他很聪明。|Cậu ấy rất thông minh.
这是一个聪明的办法。|Đây là một cách thông minh.
聪明的人也要努力。|Người thông minh cũng phải nỗ lực.
这只小狗很聪明。|Con chó nhỏ này rất thông minh.
你真聪明！|Bạn thật thông minh!
#书架
书架上有很多书。|Trên giá sách có rất nhiều sách.
请把书放回书架。|Hãy để sách lại lên giá.
我买了一个新书架。|Tôi mua một giá sách mới.
书架在床旁边。|Giá sách ở cạnh giường.
我的书架放满了小说。|Giá sách của tôi đầy tiểu thuyết.
#交换
我们交换一下电话号码吧。|Chúng ta trao đổi số điện thoại nhé.
我们交换了礼物。|Chúng tôi đã trao đổi quà.
他是交换学生。|Anh ấy là sinh viên trao đổi.
我们交换一下意见。|Chúng ta trao đổi ý kiến một chút.
我用中文和他交换越南语。|Tôi trao đổi học tiếng Trung với anh ấy để đổi lấy tiếng Việt.
#讨论
我们一起讨论这个问题。|Chúng ta cùng thảo luận vấn đề này.
老师让我们分组讨论。|Thầy bảo chúng tôi thảo luận theo nhóm.
他们在讨论周末的计划。|Họ đang bàn kế hoạch cuối tuần.
讨论了很久，还没有结果。|Thảo luận rất lâu mà vẫn chưa có kết quả.
这个问题值得讨论。|Vấn đề này đáng để thảo luận.
#颜色
你喜欢什么颜色？|Bạn thích màu gì?
这件衣服的颜色很好看。|Màu của chiếc áo này rất đẹp.
有别的颜色吗？|Có màu khác không?
秋天树叶的颜色变了。|Mùa thu màu lá cây thay đổi.
这个颜色太深了。|Màu này đậm quá.
#蓝色
我最喜欢蓝色。|Tôi thích màu xanh lam nhất.
他穿着一件蓝色的衣服。|Anh ấy mặc một chiếc áo màu xanh lam.
大海是蓝色的。|Biển màu xanh lam.
我的书包是蓝色的。|Cặp sách của tôi màu xanh lam.
蓝色让人觉得很平静。|Màu xanh lam khiến người ta thấy bình yên.
#天空
今天的天空很蓝。|Bầu trời hôm nay rất xanh.
天空中有很多星星。|Trên bầu trời có nhiều sao.
鸟在天空中飞。|Chim bay trên bầu trời.
下雨以后，天空很干净。|Sau mưa bầu trời rất trong.
我喜欢看晚上的天空。|Tôi thích ngắm bầu trời ban đêm.
#平静
他的心情很平静。|Tâm trạng anh ấy rất bình yên.
湖水很平静。|Mặt hồ rất phẳng lặng.
听音乐让我平静下来。|Nghe nhạc giúp tôi bình tĩnh lại.
乡下的生活很平静。|Cuộc sống ở quê rất yên bình.
请你平静一点儿。|Bạn bình tĩnh một chút.
#严肃
老师的样子很严肃。|Vẻ mặt thầy rất nghiêm nghị.
这是一个严肃的问题。|Đây là một vấn đề nghiêm túc.
别那么严肃，笑一笑。|Đừng nghiêm thế, cười lên nào.
他说话很严肃。|Anh ấy nói chuyện rất nghiêm túc.
开会的时候气氛很严肃。|Khi họp không khí rất nghiêm túc.
#墙
墙上有一张地图。|Trên tường có một tấm bản đồ.
我想把墙刷成白色。|Tôi muốn sơn tường màu trắng.
别在墙上写字。|Đừng viết lên tường.
房间的墙是浅蓝色的。|Tường phòng màu xanh nhạt.
他把照片挂在墙上。|Anh ấy treo ảnh lên tường.
#浅
我喜欢浅颜色。|Tôi thích màu nhạt.
这条河很浅。|Con sông này rất nông.
她穿了一件浅绿色的裙子。|Cô ấy mặc một chiếc váy màu xanh lá nhạt.
这本书很浅，适合初学者。|Cuốn sách này dễ, hợp cho người mới học.
我们认识的时间还很浅。|Chúng ta quen nhau còn chưa lâu.
#深
这个颜色有点儿深。|Màu này hơi đậm.
这里的水很深，别下去。|Nước ở đây rất sâu, đừng xuống.
他给我留下了很深的印象。|Anh ấy để lại cho tôi ấn tượng sâu sắc.
夜深了，快睡吧。|Đêm khuya rồi, ngủ nhanh đi.
我喜欢深蓝色。|Tôi thích màu xanh đậm.
#窗帘
请把窗帘拉上。|Hãy kéo rèm cửa lại.
早上我打开窗帘。|Buổi sáng tôi mở rèm cửa.
我买了新的窗帘。|Tôi mua rèm cửa mới.
窗帘是蓝色的。|Rèm cửa màu xanh lam.
窗帘太薄了，光进来了。|Rèm mỏng quá, ánh sáng lọt vào.
#代表
红色代表好运。|Màu đỏ tượng trưng cho may mắn.
他代表我们班去比赛。|Cậu ấy đại diện lớp chúng tôi đi thi.
这个花代表什么？|Loài hoa này tượng trưng cho điều gì?
我代表公司欢迎大家。|Tôi thay mặt công ty chào mừng mọi người.
白色在中国代表什么？|Màu trắng ở Trung Quốc tượng trưng cho gì?
#好运
祝你好运！|Chúc bạn may mắn!
今天我的好运来了。|Hôm nay vận may của tôi đến rồi.
红色给人带来好运。|Màu đỏ mang lại may mắn cho người ta.
希望新的一年有好运。|Mong năm mới gặp nhiều may mắn.
考试前大家都说祝我好运。|Trước kỳ thi mọi người đều chúc tôi may mắn.
#生活
我喜欢这里的生活。|Tôi thích cuộc sống ở đây.
大学生活很有意思。|Cuộc sống đại học rất thú vị.
他一个人生活。|Anh ấy sống một mình.
生活中有很多快乐。|Trong cuộc sống có nhiều niềm vui.
我在中国生活了两年。|Tôi đã sống ở Trung Quốc hai năm.
#看法
你对这件事有什么看法？|Bạn có quan điểm gì về việc này?
我的看法和你一样。|Quan điểm của tôi giống bạn.
每个人的看法都不同。|Quan điểm của mỗi người đều khác nhau.
他改变了对我的看法。|Anh ấy đã thay đổi cách nhìn về tôi.
说说你的看法吧。|Hãy nói quan điểm của bạn đi.
#其实
其实我也不知道。|Thực ra tôi cũng không biết.
汉语其实不太难。|Thực ra tiếng Trung không khó lắm.
他看起来很严肃，其实很好。|Anh ấy trông nghiêm nghị, thực ra rất tốt.
其实我早就想告诉你了。|Thực ra tôi muốn nói với bạn từ lâu rồi.
其实这个问题很简单。|Thực ra vấn đề này rất đơn giản.
#难过
听到这个消息，我很难过。|Nghe tin này, tôi rất buồn.
别难过了。|Đừng buồn nữa.
他考得不好，心里很难过。|Cậu ấy thi không tốt, trong lòng rất buồn.
朋友走了，我很难过。|Bạn đi rồi, tôi rất buồn.
看到你难过，我也不开心。|Thấy bạn buồn, tôi cũng không vui.
#保持
我们要保持联系。|Chúng ta phải giữ liên lạc.
请保持安静。|Xin giữ yên lặng.
运动可以保持健康。|Vận động có thể giữ gìn sức khỏe.
房间要保持干净。|Phòng phải giữ sạch sẽ.
他一直保持着好习惯。|Anh ấy luôn giữ được thói quen tốt.
#美好
祝你有一个美好的未来。|Chúc bạn có một tương lai tươi đẹp.
生活很美好。|Cuộc sống rất tươi đẹp.
我有很多美好的回忆。|Tôi có nhiều kỷ niệm đẹp.
美好的一天从早饭开始。|Một ngày tươi đẹp bắt đầu từ bữa sáng.
我们一起创造美好的明天。|Chúng ta cùng tạo nên ngày mai tươi đẹp.
`;
export const EXAMPLES_SP = {};
let cur = null;
for (const line of RAW.split('\n')) {
  if (!line.trim()) continue;
  if (line[0] === '#') { cur = line.slice(1).trim(); EXAMPLES_SP[cur] = []; continue; }
  const i = line.indexOf('|');
  EXAMPLES_SP[cur].push([line.slice(0, i), line.slice(i + 1)]);
}
