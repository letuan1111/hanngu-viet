// Luyện nói theo chủ đề: 32 câu hỏi thường gặp, mỗi câu một bài nói mẫu khoảng 300 chữ (câu Trung – nghĩa Việt).
export const SPEAK_GROUPS = [["ban-than", "Bản thân & người thân yêu", "👤"], ["ban-be", "Bạn bè & tiếp khách", "🤝"], ["du-lich", "Du lịch & Trung Quốc", "🧳"], ["hoc-tap", "Học tập & sách vở", "📚"], ["uoc-mo", "Ước mơ & công việc", "🌟"], ["gia-dinh", "Gia đình & quê hương", "🏡"], ["suc-khoe", "Sức khỏe & thể thao", "🏃"], ["cuoc-song", "Cuộc sống & sở thích", "☕"]];
export const SPEAK_ITEMS = [
{
"id": 1,
"g": "ban-than",
"q": "请介绍一下自己。",
"qvi": "Hãy giới thiệu về bản thân.",
"s": [
[
"大家好！我来介绍一下自己。",
"Chào mọi người! Tôi xin giới thiệu về bản thân."
],
[
"我叫阮明安，今年二十岁，是越南人。",
"Tôi tên là Nguyễn Minh An, năm nay hai mươi tuổi, là người Việt Nam."
],
[
"我家在越南北部的一个小城市，那里的人很热情。",
"Nhà tôi ở một thành phố nhỏ ở miền Bắc Việt Nam, người ở đó rất nhiệt tình."
],
[
"我家有四口人：爸爸、妈妈、妹妹和我。",
"Nhà tôi có bốn người: bố, mẹ, em gái và tôi."
],
[
"我爸爸是老师，我妈妈是医生，妹妹还在上中学。",
"Bố tôi là giáo viên, mẹ tôi là bác sĩ, em gái vẫn đang học trung học."
],
[
"现在我是大学二年级的学生，我的专业是汉语。",
"Hiện tại tôi là sinh viên năm hai đại học, chuyên ngành của tôi là tiếng Trung."
],
[
"我学习汉语已经两年了。",
"Tôi học tiếng Trung đã được hai năm rồi."
],
[
"我觉得汉语虽然很难，但是非常有意思。",
"Tôi thấy tiếng Trung tuy rất khó nhưng vô cùng thú vị."
],
[
"我的性格比较开朗，喜欢交朋友。",
"Tính cách tôi khá cởi mở, thích kết bạn."
],
[
"我的爱好是看书、听音乐和打篮球。",
"Sở thích của tôi là đọc sách, nghe nhạc và chơi bóng rổ."
],
[
"周末的时候，我常常和朋友一起去公园跑步。",
"Cuối tuần, tôi thường cùng bạn bè đi công viên chạy bộ."
],
[
"我的优点是认真、努力，做事有计划。",
"Ưu điểm của tôi là chăm chỉ, nỗ lực, làm việc có kế hoạch."
],
[
"我的缺点是有时候太着急。",
"Nhược điểm của tôi là đôi khi quá nóng vội."
],
[
"我希望以后能去中国留学，提高我的汉语水平。",
"Tôi hy vọng sau này có thể đi du học Trung Quốc, nâng cao trình độ tiếng Trung."
],
[
"毕业以后，我想找一个和汉语有关系的工作。",
"Sau khi tốt nghiệp, tôi muốn tìm một công việc liên quan đến tiếng Trung."
],
[
"在学校里，我还参加了汉语俱乐部，常常和同学们一起练习口语。",
"Ở trường, tôi còn tham gia câu lạc bộ tiếng Trung, thường cùng các bạn luyện khẩu ngữ."
],
[
"去年我第一次参加了学校的汉语比赛，得了第三名。",
"Năm ngoái tôi lần đầu tham gia cuộc thi tiếng Trung của trường và đạt giải ba."
],
[
"这让我对学习汉语更有信心了。",
"Điều này khiến tôi tự tin hơn với việc học tiếng Trung."
],
[
"这就是我，很高兴认识大家，谢谢！",
"Đó là tôi, rất vui được làm quen với mọi người, cảm ơn!"
]
]
},
{
"id": 2,
"g": "ban-than",
"q": "请介绍你最爱的人。",
"qvi": "Hãy giới thiệu người bạn yêu quý nhất.",
"s": [
[
"我最爱的人是我的妈妈。",
"Người tôi yêu quý nhất là mẹ tôi."
],
[
"我妈妈今年四十八岁，是一名小学老师。",
"Mẹ tôi năm nay bốn mươi tám tuổi, là một giáo viên tiểu học."
],
[
"她个子不高，头发很长，总是笑着跟别人说话。",
"Mẹ không cao, tóc rất dài, lúc nào cũng mỉm cười khi nói chuyện với người khác."
],
[
"我妈妈每天都很忙。",
"Mẹ tôi ngày nào cũng rất bận."
],
[
"早上她六点就起床，给我们做早饭。",
"Buổi sáng sáu giờ mẹ đã dậy, nấu bữa sáng cho chúng tôi."
],
[
"白天她去学校上课，晚上回家还要做饭、打扫房间。",
"Ban ngày mẹ đến trường dạy học, buổi tối về nhà còn phải nấu cơm, dọn dẹp nhà cửa."
],
[
"虽然她很累，但是她从来不说累。",
"Tuy mẹ rất mệt nhưng chưa bao giờ kêu mệt."
],
[
"小时候，我生病了，妈妈一晚上都没有睡觉，一直在照顾我。",
"Hồi nhỏ, khi tôi bị ốm, mẹ thức cả đêm không ngủ, chăm sóc tôi suốt."
],
[
"我考试考得不好的时候，她也不生气，总是鼓励我再努力。",
"Khi tôi thi không tốt, mẹ cũng không giận, luôn động viên tôi cố gắng thêm."
],
[
"妈妈教会了我很多东西，比如要诚实，要关心别人。",
"Mẹ đã dạy tôi nhiều điều, ví dụ phải trung thực, phải quan tâm người khác."
],
[
"她做的菜是世界上最好吃的菜。",
"Món mẹ nấu là món ngon nhất trên đời."
],
[
"现在我在外地上大学，不能常常回家。",
"Bây giờ tôi học đại học ở nơi khác, không thể thường xuyên về nhà."
],
[
"所以我每个周末都给她打电话，告诉她我的生活。",
"Vì vậy cuối tuần nào tôi cũng gọi điện cho mẹ, kể cho mẹ nghe về cuộc sống của tôi."
],
[
"我希望妈妈身体健康，每天都快快乐乐的。",
"Tôi mong mẹ khỏe mạnh, ngày nào cũng vui vẻ."
],
[
"每次回家，妈妈都会提前准备好我最爱吃的菜。",
"Mỗi lần về nhà, mẹ đều chuẩn bị sẵn món tôi thích ăn nhất."
],
[
"她常说，只要我健康快乐，她就满足了。",
"Mẹ thường nói, chỉ cần tôi khỏe mạnh vui vẻ là mẹ mãn nguyện rồi."
],
[
"我觉得自己是世界上最幸福的孩子。",
"Tôi thấy mình là đứa con hạnh phúc nhất trên đời."
],
[
"以后我工作了，一定要好好照顾她。",
"Sau này khi đi làm, tôi nhất định sẽ chăm sóc mẹ thật tốt."
]
]
},
{
"id": 3,
"g": "ban-than",
"q": "请介绍一下你的老师。",
"qvi": "Hãy giới thiệu về thầy/cô giáo của bạn.",
"s": [
[
"我想介绍一下我的汉语老师，她姓王，我们都叫她王老师。",
"Tôi muốn giới thiệu cô giáo tiếng Trung của tôi, cô họ Vương, chúng tôi đều gọi cô là cô Vương."
],
[
"王老师是中国人，今年三十多岁，来越南工作已经五年了。",
"Cô Vương là người Trung Quốc, năm nay hơn ba mươi tuổi, đã sang Việt Nam làm việc được năm năm."
],
[
"她长得很漂亮，戴着一副眼镜，看起来很温柔。",
"Cô rất xinh, đeo một cặp kính, trông rất dịu dàng."
],
[
"王老师上课非常认真，也很有意思。",
"Cô Vương dạy rất nghiêm túc và cũng rất thú vị."
],
[
"她常常给我们讲中国的文化和历史，还教我们唱中文歌。",
"Cô thường kể cho chúng tôi về văn hóa và lịch sử Trung Quốc, còn dạy chúng tôi hát bài hát tiếng Trung."
],
[
"我们说错的时候，她从来不生气，总是耐心地帮我们改。",
"Khi chúng tôi nói sai, cô chưa bao giờ giận, luôn kiên nhẫn sửa giúp."
],
[
"下课以后，她也很愿意回答我们的问题。",
"Sau giờ học, cô cũng rất sẵn lòng trả lời câu hỏi của chúng tôi."
],
[
"有一次我感冒了，没去上课，王老师给我打电话，问我身体怎么样。",
"Có lần tôi bị cảm không đến lớp, cô Vương gọi điện hỏi tôi sức khỏe thế nào."
],
[
"第二天，她还把上课的内容发给我，让我在家复习。",
"Ngày hôm sau, cô còn gửi nội dung bài học cho tôi để ôn ở nhà."
],
[
"我觉得她不但是一位好老师，而且像我们的朋友一样。",
"Tôi thấy cô không những là một giáo viên giỏi mà còn giống như bạn của chúng tôi."
],
[
"因为有王老师，我越来越喜欢学习汉语了。",
"Nhờ có cô Vương, tôi càng ngày càng thích học tiếng Trung."
],
[
"王老师还常常组织我们参加中文活动，比如中国电影节和春节晚会。",
"Cô Vương còn thường tổ chức cho chúng tôi tham gia các hoạt động tiếng Trung như liên hoan phim Trung Quốc và đêm hội mừng xuân."
],
[
"在这些活动里，我们不但练习了汉语，而且交到了很多朋友。",
"Trong các hoạt động đó, chúng tôi không những luyện tiếng Trung mà còn kết được nhiều bạn."
],
[
"同学们都说，王老师的课是我们最喜欢的课。",
"Các bạn đều nói tiết học của cô Vương là tiết học chúng tôi thích nhất."
],
[
"我非常感谢她，也希望以后能成为像她一样的人。",
"Tôi vô cùng biết ơn cô và hy vọng sau này có thể trở thành người giống như cô."
]
]
},
{
"id": 4,
"g": "ban-than",
"q": "请介绍一下你的朋友。",
"qvi": "Hãy giới thiệu về bạn của bạn.",
"s": [
[
"我有很多朋友，但是我最好的朋友叫小兰。",
"Tôi có nhiều bạn, nhưng bạn thân nhất của tôi tên là Lan."
],
[
"我们是中学同学，认识已经八年了。",
"Chúng tôi là bạn học trung học, quen nhau đã tám năm rồi."
],
[
"小兰个子不高，眼睛大大的，很爱笑。",
"Lan không cao, mắt to tròn, rất hay cười."
],
[
"她是一个很热情的人，大家都喜欢跟她在一起。",
"Bạn ấy là người rất nhiệt tình, ai cũng thích ở cạnh bạn ấy."
],
[
"小兰学习很好，特别是英语和数学。",
"Lan học rất giỏi, đặc biệt là tiếng Anh và toán."
],
[
"以前我数学不好，她常常帮我复习，给我讲题。",
"Trước đây tôi học toán không tốt, bạn ấy thường giúp tôi ôn tập, giảng bài cho tôi."
],
[
"我们有很多一样的爱好，比如看电影、听音乐和做饭。",
"Chúng tôi có nhiều sở thích giống nhau, như xem phim, nghe nhạc và nấu ăn."
],
[
"周末的时候，我们常常一起去咖啡馆聊天，或者去书店看书。",
"Cuối tuần, chúng tôi thường cùng đi quán cà phê trò chuyện, hoặc đến hiệu sách đọc sách."
],
[
"我不高兴的时候，第一个想到的人就是她。",
"Khi tôi buồn, người đầu tiên tôi nghĩ đến chính là bạn ấy."
],
[
"她总是认真地听我说话，然后告诉我应该怎么做。",
"Bạn ấy luôn chăm chú nghe tôi nói, sau đó nói cho tôi nên làm thế nào."
],
[
"现在我们在不同的大学学习，见面的时间少了。",
"Bây giờ chúng tôi học ở hai trường đại học khác nhau, thời gian gặp nhau ít đi."
],
[
"可是我们每天都会在网上聊天，关系还是那么好。",
"Nhưng ngày nào chúng tôi cũng nhắn tin trên mạng, quan hệ vẫn thân thiết như vậy."
],
[
"小兰还是一个很有爱心的人。",
"Lan còn là một người rất giàu lòng nhân ái."
],
[
"她常常去孤儿院当志愿者，教那里的孩子们唱歌、画画。",
"Bạn ấy thường đến trại trẻ mồ côi làm tình nguyện viên, dạy các em hát và vẽ."
],
[
"有时候我也跟她一起去，我觉得这样的周末很有意义。",
"Có khi tôi cũng đi cùng bạn ấy, tôi thấy những ngày cuối tuần như vậy rất ý nghĩa."
],
[
"我从她身上学到了很多东西。",
"Tôi đã học được rất nhiều điều từ bạn ấy."
],
[
"我希望我们永远是好朋友。",
"Tôi hy vọng chúng tôi mãi mãi là bạn tốt."
]
]
},
{
"id": 5,
"g": "ban-be",
"q": "你觉得什么样的朋友是一个好朋友？",
"qvi": "Bạn thấy người bạn như thế nào là một người bạn tốt?",
"s": [
[
"每个人都需要朋友，那什么样的朋友才是好朋友呢？",
"Ai cũng cần bạn bè, vậy người bạn như thế nào mới là bạn tốt?"
],
[
"我觉得，第一，好朋友应该真心对你。",
"Tôi cho rằng, thứ nhất, bạn tốt phải đối xử chân thành với bạn."
],
[
"他不会在你面前说好话，在你后边说坏话。",
"Họ sẽ không nói tốt trước mặt bạn, rồi nói xấu sau lưng bạn."
],
[
"第二，好朋友会在你需要帮助的时候出现。",
"Thứ hai, bạn tốt sẽ xuất hiện khi bạn cần giúp đỡ."
],
[
"比如你生病了，他会来看你；你遇到问题了，他会想办法帮你。",
"Ví dụ bạn bị ốm, họ sẽ đến thăm; bạn gặp vấn đề, họ sẽ nghĩ cách giúp bạn."
],
[
"第三，好朋友敢说真话。",
"Thứ ba, bạn tốt dám nói thật."
],
[
"你做错了事情，他不会只说你好，而是会告诉你哪里不对。",
"Khi bạn làm sai, họ không chỉ khen bạn mà sẽ nói cho bạn biết sai ở đâu."
],
[
"这样的话可能不好听，但是对你很有用。",
"Những lời như vậy có thể không dễ nghe, nhưng rất có ích cho bạn."
],
[
"第四，好朋友会为你的成功高兴。",
"Thứ tư, bạn tốt sẽ vui mừng vì thành công của bạn."
],
[
"当你考了好成绩或者找到好工作的时候，他是真心为你开心的。",
"Khi bạn thi được điểm cao hoặc tìm được việc tốt, họ thật lòng vui cho bạn."
],
[
"我觉得好朋友不需要很多，有一两个就够了。",
"Tôi nghĩ bạn tốt không cần nhiều, có một hai người là đủ."
],
[
"有一句话说：“在家靠父母，出门靠朋友。”",
"Có câu nói: “Ở nhà nhờ cha mẹ, ra ngoài nhờ bạn bè.”"
],
[
"这说明朋友在我们的生活中非常重要。",
"Điều này cho thấy bạn bè vô cùng quan trọng trong cuộc sống của chúng ta."
],
[
"真正的好朋友，不管过了多少年，不管离得多远，关系都不会变。",
"Bạn tốt thực sự, dù bao nhiêu năm trôi qua, dù cách xa thế nào, tình bạn cũng không thay đổi."
],
[
"我很幸运，因为我有这样的朋友。",
"Tôi rất may mắn vì có những người bạn như vậy."
],
[
"同时，我们也要做一个好朋友，用真心去对待别人。",
"Đồng thời, chúng ta cũng phải làm một người bạn tốt, đối xử với người khác bằng sự chân thành."
]
]
},
{
"id": 6,
"g": "ban-be",
"q": "你常跟朋友一起做什么？请说一下。",
"qvi": "Bạn thường làm gì cùng bạn bè? Hãy kể một chút.",
"s": [
[
"我有几个好朋友，我们常常在一起做很多事情。",
"Tôi có vài người bạn thân, chúng tôi thường cùng nhau làm nhiều việc."
],
[
"平时我们都要上课，所以最常做的事情是一起学习。",
"Bình thường chúng tôi đều phải đi học, nên việc hay làm nhất là cùng học."
],
[
"我们常常在图书馆一起复习，有不懂的问题就互相帮助。",
"Chúng tôi hay cùng ôn bài ở thư viện, có chỗ không hiểu thì giúp đỡ nhau."
],
[
"下课以后，我们喜欢一起去学校旁边的小饭馆吃饭。",
"Sau giờ học, chúng tôi thích cùng đến quán ăn nhỏ cạnh trường ăn cơm."
],
[
"那里的菜又便宜又好吃，我们一边吃一边聊天，非常开心。",
"Đồ ăn ở đó vừa rẻ vừa ngon, chúng tôi vừa ăn vừa trò chuyện, rất vui."
],
[
"周末的时候，我们有时候去看电影，有时候去公园散步。",
"Cuối tuần, có lúc chúng tôi đi xem phim, có lúc đi dạo công viên."
],
[
"天气好的时候，我们还会一起去爬山或者骑自行车。",
"Khi trời đẹp, chúng tôi còn cùng đi leo núi hoặc đạp xe."
],
[
"我们也喜欢一起做饭。",
"Chúng tôi cũng thích cùng nhau nấu ăn."
],
[
"每个人做一个自己家乡的菜，然后大家一起吃。",
"Mỗi người nấu một món quê mình, rồi cả nhóm cùng ăn."
],
[
"放假的时候，我们会一起去旅游。",
"Vào kỳ nghỉ, chúng tôi sẽ cùng đi du lịch."
],
[
"去年夏天，我们去了海边，在那里玩了三天，拍了很多照片。",
"Mùa hè năm ngoái, chúng tôi đi biển, chơi ở đó ba ngày, chụp rất nhiều ảnh."
],
[
"有时候我们也会一起去做志愿者，帮助需要帮助的人。",
"Có khi chúng tôi cũng cùng nhau đi làm tình nguyện, giúp đỡ những người cần giúp."
],
[
"考试以前，我们会互相鼓励，一起加油。",
"Trước kỳ thi, chúng tôi động viên nhau, cùng cố gắng."
],
[
"不管做什么，只要和好朋友在一起，就会觉得很有意思。",
"Dù làm gì, chỉ cần ở bên bạn thân là thấy rất thú vị."
],
[
"我觉得跟朋友在一起的时间是最快乐的时间。",
"Tôi thấy thời gian ở bên bạn bè là khoảng thời gian vui nhất."
]
]
},
{
"id": 21,
"g": "ban-be",
"q": "如果朋友来你家做客，你会怎么欢迎他？",
"qvi": "Nếu bạn đến nhà bạn chơi, bạn sẽ đón tiếp thế nào?",
"s": [
[
"如果朋友来我家做客，我会非常高兴，也会好好准备。",
"Nếu bạn đến nhà tôi chơi, tôi sẽ rất vui và cũng sẽ chuẩn bị chu đáo."
],
[
"在朋友来之前，我会先把房间打扫干净。",
"Trước khi bạn đến, tôi sẽ dọn dẹp phòng sạch sẽ."
],
[
"然后我会去超市买一些水果、饮料和点心。",
"Sau đó tôi sẽ đi siêu thị mua ít hoa quả, đồ uống và bánh kẹo."
],
[
"我还会问问朋友喜欢吃什么，不喜欢吃什么。",
"Tôi còn hỏi xem bạn thích ăn gì, không thích ăn gì."
],
[
"朋友到的时候，我会去门口接他，对他说：“欢迎欢迎，快请进！”",
"Khi bạn đến, tôi sẽ ra cửa đón và nói: “Hoan nghênh, mời vào!”"
],
[
"进门以后，我请他坐下，给他倒一杯热茶。",
"Vào nhà, tôi mời bạn ngồi và rót cho bạn một cốc trà nóng."
],
[
"然后我会给他介绍我的家人，大家一起聊聊天。",
"Sau đó tôi sẽ giới thiệu bạn với gia đình, mọi người cùng trò chuyện."
],
[
"中午或者晚上，我会做几个越南菜请他吃。",
"Buổi trưa hoặc buổi tối, tôi sẽ nấu vài món Việt mời bạn ăn."
],
[
"比如越南春卷、牛肉粉，这些都是很有名的菜。",
"Ví dụ nem rán, phở bò, đều là những món rất nổi tiếng."
],
[
"吃完饭，我们可以一起看电影或者玩游戏。",
"Ăn xong, chúng tôi có thể cùng xem phim hoặc chơi trò chơi."
],
[
"如果朋友是第一次来我的城市，我还会带他去附近有名的地方走走。",
"Nếu bạn lần đầu đến thành phố của tôi, tôi còn dẫn bạn đi dạo những nơi nổi tiếng gần đó."
],
[
"朋友走的时候，我会送他到车站，欢迎他下次再来。",
"Khi bạn về, tôi sẽ tiễn bạn ra bến xe và mời bạn lần sau lại đến."
],
[
"如果朋友喜欢喝咖啡，我还会请他尝一尝越南的滴滤咖啡。",
"Nếu bạn thích cà phê, tôi còn mời bạn nếm thử cà phê phin Việt Nam."
],
[
"很多外国朋友喝了以后都说，越南咖啡又香又浓，非常特别。",
"Nhiều bạn nước ngoài uống xong đều nói cà phê Việt Nam vừa thơm vừa đậm, rất đặc biệt."
],
[
"我还会给他准备一个小礼物，让他记住这次愉快的做客。",
"Tôi còn chuẩn bị cho bạn một món quà nhỏ để bạn nhớ mãi lần đến chơi vui vẻ này."
],
[
"我觉得让朋友觉得舒服、开心，是最好的欢迎。",
"Tôi nghĩ để bạn cảm thấy thoải mái, vui vẻ là cách đón tiếp tốt nhất."
]
]
},
{
"id": 7,
"g": "du-lich",
"q": "你喜欢去哪里旅游？为什么？",
"qvi": "Bạn thích đi du lịch ở đâu? Tại sao?",
"s": [
[
"我很喜欢旅游，去过越南很多地方。",
"Tôi rất thích du lịch, đã đi nhiều nơi ở Việt Nam."
],
[
"如果让我选，我最喜欢去海边旅游。",
"Nếu để tôi chọn, tôi thích đi du lịch biển nhất."
],
[
"第一个原因是海边的风景特别美。",
"Lý do đầu tiên là phong cảnh biển đặc biệt đẹp."
],
[
"蓝蓝的天，白白的云，还有一望无际的大海，看着就让人心情很好。",
"Trời xanh, mây trắng, cùng biển cả mênh mông, nhìn thôi đã thấy tâm trạng rất tốt."
],
[
"第二个原因是在海边可以做很多事情。",
"Lý do thứ hai là ở biển có thể làm rất nhiều việc."
],
[
"白天可以游泳、晒太阳，晚上可以在沙滩上散步、聊天。",
"Ban ngày có thể bơi, tắm nắng, buổi tối có thể đi dạo, trò chuyện trên bãi cát."
],
[
"第三个原因是海边的东西很好吃。",
"Lý do thứ ba là đồ ăn ở biển rất ngon."
],
[
"那里的海鲜又新鲜又便宜，我每次去都吃得很饱。",
"Hải sản ở đó vừa tươi vừa rẻ, lần nào đi tôi cũng ăn rất no."
],
[
"我最喜欢的海边城市是岘港。",
"Thành phố biển tôi thích nhất là Đà Nẵng."
],
[
"那里不但有漂亮的海滩，而且城市很干净，人也很友好。",
"Ở đó không những có bãi biển đẹp mà thành phố còn rất sạch, người dân cũng rất thân thiện."
],
[
"平时学习和工作压力很大，去海边旅游可以让我好好休息。",
"Bình thường học tập và làm việc rất áp lực, đi biển giúp tôi nghỉ ngơi thật tốt."
],
[
"回来以后，我又有力气继续努力了。",
"Trở về, tôi lại có sức để tiếp tục cố gắng."
],
[
"我还喜欢一大早起来，在海边看日出。",
"Tôi còn thích dậy thật sớm ngắm bình minh trên biển."
],
[
"太阳慢慢地从海上升起来，天空变成了红色和金色，非常漂亮。",
"Mặt trời từ từ nhô lên khỏi mặt biển, bầu trời chuyển sang màu đỏ và vàng, vô cùng đẹp."
],
[
"每次看到这样的风景，我都会拍很多照片发给家人和朋友。",
"Mỗi lần thấy cảnh như vậy, tôi đều chụp nhiều ảnh gửi cho gia đình và bạn bè."
],
[
"以后有机会，我还想去中国的海南看看。",
"Sau này có cơ hội, tôi còn muốn đến Hải Nam của Trung Quốc xem thử."
]
]
},
{
"id": 8,
"g": "du-lich",
"q": "你喜欢坐飞机还是火车去旅游？为什么？",
"qvi": "Bạn thích đi du lịch bằng máy bay hay tàu hỏa? Tại sao?",
"s": [
[
"去旅游的时候，坐飞机和坐火车都有自己的好处。",
"Khi đi du lịch, đi máy bay và đi tàu hỏa đều có ưu điểm riêng."
],
[
"坐飞机最大的好处是快。",
"Ưu điểm lớn nhất của đi máy bay là nhanh."
],
[
"比如从河内到胡志明市，坐飞机只要两个小时，坐火车要三十多个小时。",
"Ví dụ từ Hà Nội đến TP. Hồ Chí Minh, đi máy bay chỉ mất hai tiếng, đi tàu mất hơn ba mươi tiếng."
],
[
"可是机票比较贵，而且去机场、等飞机也要花很多时间。",
"Nhưng vé máy bay khá đắt, hơn nữa ra sân bay, chờ máy bay cũng mất nhiều thời gian."
],
[
"坐火车虽然慢，但是很便宜，也比较舒服。",
"Đi tàu tuy chậm nhưng rẻ, cũng khá thoải mái."
],
[
"在火车上，你可以站起来走走，可以看书、睡觉，还可以跟别人聊天。",
"Trên tàu, bạn có thể đứng dậy đi lại, có thể đọc sách, ngủ, còn có thể trò chuyện với người khác."
],
[
"最重要的是，你可以从窗外看到很多美丽的风景。",
"Quan trọng nhất là bạn có thể ngắm nhiều phong cảnh đẹp qua cửa sổ."
],
[
"我觉得这也是旅游的一部分。",
"Tôi thấy đó cũng là một phần của chuyến du lịch."
],
[
"所以，如果时间多，路不太远，我更喜欢坐火车。",
"Vì vậy, nếu có nhiều thời gian và đường không quá xa, tôi thích đi tàu hơn."
],
[
"如果时间少，或者要去很远的地方，比如去国外，我就会坐飞机。",
"Nếu ít thời gian hoặc phải đi rất xa, ví dụ ra nước ngoài, tôi sẽ đi máy bay."
],
[
"我还记得第一次坐火车从河内去岘港的经历。",
"Tôi vẫn nhớ trải nghiệm lần đầu đi tàu từ Hà Nội vào Đà Nẵng."
],
[
"火车经过海云岭的时候，一边是高高的山，一边是蓝蓝的大海，美极了。",
"Khi tàu đi qua đèo Hải Vân, một bên là núi cao, một bên là biển xanh, đẹp tuyệt vời."
],
[
"车上的人都站起来拍照，大家都很兴奋。",
"Mọi người trên tàu đều đứng dậy chụp ảnh, ai cũng rất phấn khích."
],
[
"那次旅行让我更喜欢坐火车了。",
"Chuyến đi đó khiến tôi càng thích đi tàu hơn."
],
[
"总的来说，我更喜欢坐火车，因为我觉得旅游不只是为了到一个地方，路上的感受也很重要。",
"Nói chung, tôi thích đi tàu hơn, vì tôi thấy du lịch không chỉ để đến một nơi, cảm nhận trên đường đi cũng rất quan trọng."
]
]
},
{
"id": 9,
"g": "du-lich",
"q": "去旅游的时候，你要准备什么东西？",
"qvi": "Khi đi du lịch, bạn cần chuẩn bị những gì?",
"s": [
[
"去旅游以前，我一般会好好准备，这样旅游的时候才会轻松。",
"Trước khi đi du lịch, tôi thường chuẩn bị kỹ, như vậy lúc đi mới thoải mái."
],
[
"首先，我要查一下目的地的天气。",
"Trước tiên, tôi xem thời tiết ở nơi đến."
],
[
"如果那里很冷，就要带厚衣服；如果很热，就带短裤、帽子和太阳镜。",
"Nếu ở đó lạnh thì phải mang áo dày; nếu nóng thì mang quần short, mũ và kính râm."
],
[
"如果可能下雨，还要带一把伞。",
"Nếu có thể mưa thì còn phải mang theo một chiếc ô."
],
[
"其次，要准备重要的东西，比如护照、身份证、钱包和手机。",
"Tiếp theo, phải chuẩn bị đồ quan trọng như hộ chiếu, căn cước, ví và điện thoại."
],
[
"出国旅游的话，护照和机票是最重要的，一定不能忘。",
"Nếu đi nước ngoài, hộ chiếu và vé máy bay là quan trọng nhất, nhất định không được quên."
],
[
"我还会带充电器和充电宝，因为旅游的时候常常要用手机拍照、看地图。",
"Tôi còn mang sạc và sạc dự phòng, vì khi đi du lịch thường dùng điện thoại chụp ảnh, xem bản đồ."
],
[
"另外，我会准备一些常用的药，比如感冒药和肚子疼的药。",
"Ngoài ra, tôi chuẩn bị một số thuốc thông dụng, như thuốc cảm và thuốc đau bụng."
],
[
"在路上生病的话，有药就方便多了。",
"Nếu bị ốm trên đường, có thuốc sẽ tiện hơn nhiều."
],
[
"最后，我会提前订好酒店，查好想去的地方和好吃的饭馆。",
"Cuối cùng, tôi đặt khách sạn trước, tìm hiểu những nơi muốn đến và quán ăn ngon."
],
[
"我还会提前学几句当地的话，比如“你好”“谢谢”“多少钱”。",
"Tôi còn học trước vài câu tiếng địa phương như “xin chào”, “cảm ơn”, “bao nhiêu tiền”."
],
[
"这样跟当地人交流的时候会方便很多，他们也会觉得很亲切。",
"Như vậy khi giao tiếp với người dân địa phương sẽ tiện hơn nhiều, họ cũng thấy thân thiện."
],
[
"另外，我会带一个小本子，把旅游中有意思的事情记下来。",
"Ngoài ra, tôi mang một cuốn sổ nhỏ ghi lại những chuyện thú vị trong chuyến đi."
],
[
"东西准备好了，心情也准备好了，旅游就会非常开心。",
"Đồ đạc chuẩn bị xong, tâm trạng cũng sẵn sàng, chuyến du lịch sẽ rất vui."
]
]
},
{
"id": 12,
"g": "du-lich",
"q": "在中国有哪里好玩？你想去中国哪里？请说一下。",
"qvi": "Ở Trung Quốc có nơi nào vui? Bạn muốn đi đâu ở Trung Quốc?",
"s": [
[
"中国很大，好玩的地方也非常多。",
"Trung Quốc rất rộng lớn, nơi thú vị cũng vô cùng nhiều."
],
[
"首先是北京，北京是中国的首都，有长城、故宫和天安门。",
"Đầu tiên là Bắc Kinh, thủ đô của Trung Quốc, có Vạn Lý Trường Thành, Cố Cung và Thiên An Môn."
],
[
"大家都说：“不到长城非好汉。”",
"Mọi người đều nói: “Chưa đến Trường Thành chưa phải là hảo hán.”"
],
[
"其次是上海，上海是一个很现代的城市，晚上的外滩特别漂亮。",
"Tiếp theo là Thượng Hải, một thành phố rất hiện đại, Bến Thượng Hải về đêm đặc biệt đẹp."
],
[
"还有西安，西安的历史很长，有有名的兵马俑。",
"Còn có Tây An, lịch sử rất lâu đời, có tượng binh mã nổi tiếng."
],
[
"如果喜欢自然风景，可以去桂林，那里的山水像画一样美。",
"Nếu thích cảnh thiên nhiên, có thể đến Quế Lâm, núi non sông nước đẹp như tranh."
],
[
"我最想去的地方是成都。",
"Nơi tôi muốn đến nhất là Thành Đô."
],
[
"第一，成都有可爱的大熊猫，我从小就很喜欢熊猫。",
"Thứ nhất, Thành Đô có gấu trúc lớn đáng yêu, từ nhỏ tôi đã rất thích gấu trúc."
],
[
"第二，成都的菜非常有名，比如火锅和麻婆豆腐，虽然很辣，但是我很想试一试。",
"Thứ hai, món ăn Thành Đô rất nổi tiếng, như lẩu và đậu phụ Ma Bà, tuy rất cay nhưng tôi rất muốn thử."
],
[
"第三，听说成都人的生活很慢，很舒服，大家喜欢在茶馆里喝茶聊天。",
"Thứ ba, nghe nói người Thành Đô sống rất chậm rãi, thoải mái, mọi người thích uống trà trò chuyện trong quán trà."
],
[
"另外，云南也是一个很美的地方，那里有很多少数民族，文化非常丰富。",
"Ngoài ra, Vân Nam cũng là một nơi rất đẹp, ở đó có nhiều dân tộc thiểu số, văn hóa vô cùng phong phú."
],
[
"听说那里四季如春，一年四季都不冷也不热。",
"Nghe nói ở đó bốn mùa như mùa xuân, quanh năm không lạnh cũng không nóng."
],
[
"如果有时间，我也想去那里看看。",
"Nếu có thời gian, tôi cũng muốn đến đó xem thử."
],
[
"我希望明年能去成都旅游，好好感受一下那里的生活。",
"Tôi hy vọng năm sau có thể đi du lịch Thành Đô, cảm nhận thật kỹ cuộc sống ở đó."
]
]
},
{
"id": 13,
"g": "du-lich",
"q": "你为什么想去中国留学？",
"qvi": "Tại sao bạn muốn đi du học Trung Quốc?",
"s": [
[
"我想去中国留学，主要有以下几个原因。",
"Tôi muốn đi du học Trung Quốc, chủ yếu có mấy lý do sau."
],
[
"第一，我想提高我的汉语水平。",
"Thứ nhất, tôi muốn nâng cao trình độ tiếng Trung."
],
[
"在越南学汉语，每天只能在课上说一点儿汉语。",
"Học tiếng Trung ở Việt Nam, mỗi ngày chỉ được nói một chút tiếng Trung trên lớp."
],
[
"如果在中国，我每天都可以听汉语、说汉语，进步一定会很快。",
"Nếu ở Trung Quốc, ngày nào tôi cũng được nghe, nói tiếng Trung, chắc chắn sẽ tiến bộ rất nhanh."
],
[
"第二，我想了解中国的文化。",
"Thứ hai, tôi muốn tìm hiểu văn hóa Trung Quốc."
],
[
"中国有五千年的历史，有很多有意思的节日、美食和传统。",
"Trung Quốc có năm nghìn năm lịch sử, có nhiều lễ hội, món ngon và truyền thống thú vị."
],
[
"只有自己去那里生活，才能真正了解它。",
"Chỉ khi tự mình đến đó sống mới thực sự hiểu được."
],
[
"第三，中国的大学很好，有很多专业可以选择，学习环境也很不错。",
"Thứ ba, các trường đại học Trung Quốc rất tốt, có nhiều chuyên ngành để lựa chọn, môi trường học tập cũng rất tốt."
],
[
"第四，现在越南和中国的关系很密切，很多中国公司在越南工作。",
"Thứ tư, hiện nay quan hệ Việt Nam – Trung Quốc rất gắn bó, nhiều công ty Trung Quốc đang làm việc tại Việt Nam."
],
[
"会说汉语、了解中国的人，找工作的机会更多。",
"Người biết tiếng Trung, hiểu Trung Quốc sẽ có nhiều cơ hội tìm việc hơn."
],
[
"最后，去国外留学可以让我更独立，学会自己照顾自己。",
"Cuối cùng, du học nước ngoài giúp tôi tự lập hơn, học cách tự chăm sóc bản thân."
],
[
"我也想认识来自世界各地的留学生，跟他们交朋友。",
"Tôi cũng muốn quen các du học sinh đến từ khắp nơi trên thế giới, kết bạn với họ."
],
[
"这样我不但能了解中国，还能了解很多其他国家的文化。",
"Như vậy tôi không chỉ hiểu Trung Quốc mà còn hiểu văn hóa của nhiều nước khác."
],
[
"这对我以后的学习和工作都会有很大的帮助。",
"Điều này sẽ giúp ích rất nhiều cho việc học và làm việc của tôi sau này."
],
[
"所以我现在正在努力学习，希望早一天实现留学的梦想。",
"Vì vậy bây giờ tôi đang nỗ lực học tập, mong sớm thực hiện được ước mơ du học."
]
]
},
{
"id": 16,
"g": "hoc-tap",
"q": "每天你学习汉语多长时间？学习方法是什么？",
"qvi": "Mỗi ngày bạn học tiếng Trung bao lâu? Phương pháp học là gì?",
"s": [
[
"我每天学习汉语大概三个小时。",
"Mỗi ngày tôi học tiếng Trung khoảng ba tiếng."
],
[
"上午在学校上两个小时的课，晚上在家自己学习一个小时。",
"Buổi sáng học trên lớp hai tiếng, buổi tối tự học ở nhà một tiếng."
],
[
"我觉得学汉语，方法比时间更重要。",
"Tôi thấy học tiếng Trung, phương pháp quan trọng hơn thời gian."
],
[
"我的第一个方法是每天记十个新词。",
"Phương pháp đầu tiên của tôi là mỗi ngày nhớ mười từ mới."
],
[
"我把生词写在小本子上，坐车的时候、排队的时候就拿出来看看。",
"Tôi ghi từ mới vào sổ nhỏ, lúc đi xe hay xếp hàng lại lấy ra xem."
],
[
"第二个方法是多听多说。",
"Phương pháp thứ hai là nghe nhiều nói nhiều."
],
[
"我常常听中文歌，看中国电影和电视剧。",
"Tôi thường nghe nhạc Trung, xem phim và phim truyền hình Trung Quốc."
],
[
"看的时候，我会跟着里面的人一起说，练习发音和声调。",
"Khi xem, tôi nói theo các nhân vật để luyện phát âm và thanh điệu."
],
[
"第三个方法是多跟中国人聊天。",
"Phương pháp thứ ba là trò chuyện nhiều với người Trung Quốc."
],
[
"我在网上认识了几个中国朋友，我们常常用汉语聊天。",
"Tôi quen vài người bạn Trung Quốc trên mạng, chúng tôi thường trò chuyện bằng tiếng Trung."
],
[
"他们会告诉我哪里说错了，我也教他们说越南语。",
"Họ chỉ cho tôi chỗ nói sai, tôi cũng dạy họ nói tiếng Việt."
],
[
"第四个方法是每天写日记。",
"Phương pháp thứ tư là viết nhật ký mỗi ngày."
],
[
"虽然只写几句话，但是可以复习学过的词语和语法。",
"Tuy chỉ viết vài câu nhưng có thể ôn lại từ vựng và ngữ pháp đã học."
],
[
"另外，我每个星期都会复习一次，把忘了的生词再记一遍。",
"Ngoài ra, mỗi tuần tôi ôn lại một lần, học lại những từ mới đã quên."
],
[
"我还会用手机上的学习软件做练习，听写和发音都可以练习。",
"Tôi còn dùng ứng dụng học trên điện thoại để làm bài tập, luyện được cả nghe viết và phát âm."
],
[
"学习汉语就像爬山，虽然很累，但是每走一步，都离山顶更近了。",
"Học tiếng Trung giống như leo núi, tuy mệt nhưng mỗi bước đi lại gần đỉnh núi hơn."
],
[
"我相信，只要每天坚持，我的汉语一定会越来越好。",
"Tôi tin rằng chỉ cần kiên trì mỗi ngày, tiếng Trung của tôi nhất định sẽ ngày càng giỏi."
]
]
},
{
"id": 17,
"g": "hoc-tap",
"q": "你喜欢早上学习还是晚上学习？为什么？",
"qvi": "Bạn thích học buổi sáng hay buổi tối? Tại sao?",
"s": [
[
"每个人的学习习惯不一样，有的人喜欢早上学习，有的人喜欢晚上学习。",
"Thói quen học của mỗi người khác nhau, có người thích học buổi sáng, có người thích học buổi tối."
],
[
"我比较喜欢早上学习。",
"Tôi khá thích học buổi sáng hơn."
],
[
"我一般早上六点起床，洗脸刷牙以后，就开始学习一个小时。",
"Tôi thường dậy lúc sáu giờ sáng, rửa mặt đánh răng xong là bắt đầu học một tiếng."
],
[
"我喜欢早上学习，有三个原因。",
"Tôi thích học buổi sáng vì ba lý do."
],
[
"第一，早上空气新鲜，周围很安静，没有人打扰我。",
"Thứ nhất, buổi sáng không khí trong lành, xung quanh yên tĩnh, không ai làm phiền."
],
[
"第二，睡了一个晚上，我的头脑很清楚，记东西特别快。",
"Thứ hai, sau một đêm ngủ, đầu óc tôi rất minh mẫn, ghi nhớ đặc biệt nhanh."
],
[
"所以我常常在早上记生词、读课文。",
"Vì vậy tôi thường học từ mới, đọc bài khóa vào buổi sáng."
],
[
"第三，早上学完了，白天就会觉得很轻松，晚上也可以早点儿休息。",
"Thứ ba, học xong buổi sáng thì cả ngày thấy nhẹ nhõm, buổi tối cũng có thể nghỉ sớm."
],
[
"以前我常常晚上学习到十二点，第二天上课总是很累，没有精神。",
"Trước đây tôi hay học đến mười hai giờ đêm, hôm sau lên lớp lúc nào cũng mệt, không có tinh thần."
],
[
"后来我改成早上学习，学习效果好了很多，身体也更健康了。",
"Sau đó tôi đổi sang học buổi sáng, hiệu quả học tốt hơn nhiều, sức khỏe cũng tốt hơn."
],
[
"当然，晚上我也会花一点儿时间复习当天学过的内容。",
"Tất nhiên buổi tối tôi cũng dành chút thời gian ôn lại nội dung đã học trong ngày."
],
[
"周末的时候，我也会在早上去公园读课文。",
"Cuối tuần, tôi cũng ra công viên đọc bài khóa vào buổi sáng."
],
[
"那里空气好，人也不多，大声读也不会打扰别人。",
"Ở đó không khí trong lành, người cũng không đông, đọc to cũng không làm phiền ai."
],
[
"读完以后去吃一碗热热的早饭，一天的心情都很好。",
"Đọc xong đi ăn một bữa sáng nóng hổi, cả ngày tâm trạng đều tốt."
],
[
"我觉得找到适合自己的时间最重要。",
"Tôi thấy tìm được khung giờ phù hợp với bản thân là quan trọng nhất."
]
]
},
{
"id": 18,
"g": "hoc-tap",
"q": "你喜欢学汉语吗？你学汉语多久了？为什么学习汉语？",
"qvi": "Bạn có thích học tiếng Trung không? Học bao lâu rồi? Vì sao học?",
"s": [
[
"我非常喜欢学汉语。",
"Tôi rất thích học tiếng Trung."
],
[
"我从高中开始学汉语，到现在已经三年了。",
"Tôi bắt đầu học tiếng Trung từ cấp ba, đến nay đã được ba năm."
],
[
"刚开始学的时候，我觉得汉语特别难。",
"Lúc mới học, tôi thấy tiếng Trung đặc biệt khó."
],
[
"汉字很复杂，声调也很难，我常常把第二声和第三声说错。",
"Chữ Hán rất phức tạp, thanh điệu cũng khó, tôi hay nói nhầm thanh hai và thanh ba."
],
[
"但是学了一段时间以后，我发现汉语越来越有意思。",
"Nhưng học một thời gian, tôi thấy tiếng Trung càng ngày càng thú vị."
],
[
"每个汉字都有自己的故事，很多词和越南语的发音也很像。",
"Mỗi chữ Hán đều có câu chuyện riêng, nhiều từ phát âm cũng rất giống tiếng Việt."
],
[
"比如“学生”“注意”“准备”，越南人学起来比较容易。",
"Ví dụ “học sinh”, “chú ý”, “chuẩn bị”, người Việt học khá dễ."
],
[
"我学汉语有几个原因。",
"Tôi học tiếng Trung vì mấy lý do."
],
[
"第一，我喜欢中国的电影和音乐，我想不看字幕也能听懂。",
"Thứ nhất, tôi thích phim và nhạc Trung Quốc, tôi muốn hiểu mà không cần xem phụ đề."
],
[
"第二，越南和中国是邻居，两国的经济、文化交流越来越多。",
"Thứ hai, Việt Nam và Trung Quốc là láng giềng, giao lưu kinh tế, văn hóa giữa hai nước ngày càng nhiều."
],
[
"会说汉语，以后找工作会容易很多。",
"Biết tiếng Trung, sau này tìm việc sẽ dễ hơn nhiều."
],
[
"第三，我想去中国留学，看看外面的世界。",
"Thứ ba, tôi muốn đi du học Trung Quốc, ngắm nhìn thế giới bên ngoài."
],
[
"现在我每天都会花时间学汉语，已经能看懂简单的中文新闻了。",
"Bây giờ ngày nào tôi cũng dành thời gian học tiếng Trung, đã đọc hiểu được tin tức tiếng Trung đơn giản."
],
[
"我还在网上认识了几个中国朋友，常常跟他们聊天。",
"Tôi còn quen vài người bạn Trung Quốc trên mạng, thường trò chuyện với họ."
],
[
"他们说我的汉语进步很快，我听了特别高兴。",
"Họ nói tiếng Trung của tôi tiến bộ rất nhanh, tôi nghe mà đặc biệt vui."
],
[
"我会一直努力学下去。",
"Tôi sẽ luôn cố gắng học tiếp."
]
]
},
{
"id": 19,
"g": "hoc-tap",
"q": "考试前要准备什么？",
"qvi": "Trước khi thi cần chuẩn bị những gì?",
"s": [
[
"考试前，好好准备是非常重要的。",
"Trước kỳ thi, chuẩn bị kỹ là điều vô cùng quan trọng."
],
[
"我一般在考试前两个星期就开始复习。",
"Tôi thường bắt đầu ôn tập trước kỳ thi hai tuần."
],
[
"首先，我会做一个复习计划，把要复习的内容分成几个部分，每天复习一部分。",
"Trước tiên, tôi lập kế hoạch ôn tập, chia nội dung cần ôn thành vài phần, mỗi ngày ôn một phần."
],
[
"其次，我会把课本和笔记再看一遍，特别是老师说的重点。",
"Tiếp theo, tôi đọc lại sách giáo khoa và ghi chép một lượt, đặc biệt là trọng tâm thầy cô nói."
],
[
"不懂的地方，我会问老师或者同学。",
"Chỗ nào không hiểu, tôi sẽ hỏi thầy cô hoặc bạn học."
],
[
"然后，我会做很多练习题和以前的考试题。",
"Sau đó, tôi làm nhiều bài tập và đề thi cũ."
],
[
"这样可以了解考试的题型，也可以知道自己哪里还不够好。",
"Như vậy có thể biết dạng đề, cũng biết mình còn yếu ở đâu."
],
[
"考试的前一天，我不会学习到很晚。",
"Ngày trước khi thi, tôi không học đến quá khuya."
],
[
"我会早点儿睡觉，保证第二天精神好。",
"Tôi sẽ đi ngủ sớm để hôm sau tinh thần tốt."
],
[
"我还会准备好考试要用的东西，比如准考证、身份证、铅笔和橡皮。",
"Tôi còn chuẩn bị sẵn đồ dùng đi thi như giấy báo dự thi, căn cước, bút chì và tẩy."
],
[
"考试那天，我会早点儿出门，吃一顿好的早饭。",
"Hôm thi, tôi ra khỏi nhà sớm và ăn một bữa sáng đầy đủ."
],
[
"另外，复习的时候要注意休息，每学习一个小时就休息十分钟。",
"Ngoài ra, khi ôn tập phải chú ý nghỉ ngơi, cứ học một tiếng thì nghỉ mười phút."
],
[
"还要多喝水，多吃水果，不要只吃方便面。",
"Còn phải uống nhiều nước, ăn nhiều hoa quả, đừng chỉ ăn mì tôm."
],
[
"身体好了，考试的时候才能发挥出自己真正的水平。",
"Có sức khỏe tốt, lúc thi mới phát huy được đúng trình độ của mình."
],
[
"最后，最重要的是不要太紧张，要相信自己。",
"Cuối cùng, quan trọng nhất là đừng quá căng thẳng, phải tin vào bản thân."
]
]
},
{
"id": 30,
"g": "hoc-tap",
"q": "你喜欢看书吗？你喜欢看什么书？",
"qvi": "Bạn có thích đọc sách không? Bạn thích đọc sách gì?",
"s": [
[
"我非常喜欢看书，看书是我最大的爱好之一。",
"Tôi rất thích đọc sách, đọc sách là một trong những sở thích lớn nhất của tôi."
],
[
"我每天睡觉以前都会看半个小时的书。",
"Mỗi ngày trước khi ngủ tôi đều đọc sách nửa tiếng."
],
[
"我喜欢看的书有很多种。",
"Những loại sách tôi thích đọc có rất nhiều."
],
[
"我最喜欢看小说，特别是关于爱情和家庭的小说。",
"Tôi thích đọc tiểu thuyết nhất, đặc biệt là tiểu thuyết về tình yêu và gia đình."
],
[
"看小说的时候，我好像变成了书里的人，跟他们一起哭、一起笑。",
"Khi đọc tiểu thuyết, tôi như trở thành nhân vật trong sách, cùng họ khóc, cùng họ cười."
],
[
"我也喜欢看历史书。",
"Tôi cũng thích đọc sách lịch sử."
],
[
"历史书可以让我了解以前的人是怎么生活的，发生过什么重要的事情。",
"Sách lịch sử giúp tôi hiểu người xưa sống thế nào, đã xảy ra những sự kiện quan trọng gì."
],
[
"最近我开始看一些简单的中文书。",
"Gần đây tôi bắt đầu đọc một số sách tiếng Trung đơn giản."
],
[
"虽然有很多字不认识，要常常查词典，但是我觉得很有意思。",
"Tuy có nhiều chữ không biết, phải thường xuyên tra từ điển, nhưng tôi thấy rất thú vị."
],
[
"看中文书不但可以学到新词，还可以了解中国人的想法。",
"Đọc sách tiếng Trung không những học được từ mới mà còn hiểu được suy nghĩ của người Trung Quốc."
],
[
"我觉得书是我们最好的朋友。",
"Tôi thấy sách là người bạn tốt nhất của chúng ta."
],
[
"我的房间里有一个小书架，上面放着一百多本书。",
"Trong phòng tôi có một giá sách nhỏ, trên đó đặt hơn một trăm cuốn sách."
],
[
"每个月我都会去书店买一两本新书。",
"Mỗi tháng tôi đều đến hiệu sách mua một hai cuốn sách mới."
],
[
"看完以后，我还会跟朋友交换着看，大家一起讨论书里的故事。",
"Đọc xong, tôi còn đổi sách với bạn bè, cùng nhau bàn về câu chuyện trong sách."
],
[
"多看书可以让人变得更聪明，也可以让生活更丰富。",
"Đọc nhiều sách giúp con người thông minh hơn, cũng làm cuộc sống phong phú hơn."
]
]
},
{
"id": 10,
"g": "uoc-mo",
"q": "你的梦想是什么？请说一说。",
"qvi": "Ước mơ của bạn là gì? Hãy nói một chút.",
"s": [
[
"每个人都有自己的梦想，我的梦想是成为一名汉语翻译。",
"Ai cũng có ước mơ của riêng mình, ước mơ của tôi là trở thành một phiên dịch tiếng Trung."
],
[
"我从小就对外语很感兴趣。",
"Từ nhỏ tôi đã rất hứng thú với ngoại ngữ."
],
[
"上中学的时候，我第一次看中国电视剧，就被汉语吸引了。",
"Hồi trung học, lần đầu xem phim truyền hình Trung Quốc, tôi đã bị tiếng Trung cuốn hút."
],
[
"那时候我就想，如果有一天我能听懂、说好汉语，那该多好啊！",
"Khi đó tôi nghĩ, nếu một ngày nào đó tôi có thể nghe hiểu, nói giỏi tiếng Trung thì tốt biết mấy!"
],
[
"后来我上了大学，选了汉语专业。",
"Sau đó tôi vào đại học và chọn chuyên ngành tiếng Trung."
],
[
"我觉得翻译是一个很有意义的工作。",
"Tôi thấy phiên dịch là một công việc rất có ý nghĩa."
],
[
"翻译像一座桥，可以帮助两个国家的人互相了解。",
"Phiên dịch như một cây cầu, giúp người hai nước hiểu nhau."
],
[
"越南和中国的合作越来越多，需要很多好的翻译。",
"Hợp tác Việt – Trung ngày càng nhiều, cần rất nhiều phiên dịch giỏi."
],
[
"为了实现这个梦想，我每天都在努力。",
"Để thực hiện ước mơ này, ngày nào tôi cũng nỗ lực."
],
[
"我认真上课，多听多说，还常常练习翻译文章。",
"Tôi chăm chỉ học trên lớp, nghe nhiều nói nhiều, còn thường xuyên luyện dịch bài viết."
],
[
"我知道实现梦想不容易，可能会遇到很多困难。",
"Tôi biết thực hiện ước mơ không dễ, có thể gặp nhiều khó khăn."
],
[
"我的计划是先通过HSK五级考试，然后去中国留学一年。",
"Kế hoạch của tôi là thi đỗ HSK cấp 5 trước, sau đó đi du học Trung Quốc một năm."
],
[
"在中国，我想多参加实习，积累翻译的经验。",
"Ở Trung Quốc, tôi muốn tham gia thực tập nhiều, tích lũy kinh nghiệm phiên dịch."
],
[
"回国以后，我希望能在一家大公司当翻译，帮助两国的人更好地合作。",
"Về nước, tôi mong làm phiên dịch ở một công ty lớn, giúp người hai nước hợp tác tốt hơn."
],
[
"但是我相信，只要不放弃，总有一天我的梦想会实现。",
"Nhưng tôi tin, chỉ cần không bỏ cuộc, rồi sẽ có ngày ước mơ của tôi thành hiện thực."
]
]
},
{
"id": 11,
"g": "uoc-mo",
"q": "为什么想进FIT公司工作？",
"qvi": "Tại sao bạn muốn vào làm việc ở công ty FIT?",
"s": [
[
"我想进FIT公司工作，主要有以下几个原因。",
"Tôi muốn vào làm việc ở công ty FIT, chủ yếu vì mấy lý do sau."
],
[
"第一，FIT是一家发展很快的公司，在这个行业里很有名。",
"Thứ nhất, FIT là công ty phát triển rất nhanh, rất có tiếng trong ngành."
],
[
"我在网上看了很多关于公司的介绍，也听在这里工作的朋友说过。",
"Tôi đã đọc nhiều giới thiệu về công ty trên mạng, cũng nghe bạn bè làm ở đây kể."
],
[
"大家都说公司的工作环境很好，同事之间关系也很好。",
"Mọi người đều nói môi trường làm việc ở công ty rất tốt, quan hệ đồng nghiệp cũng tốt."
],
[
"第二，公司和中国有很多合作，需要会说汉语的员工。",
"Thứ hai, công ty có nhiều hợp tác với Trung Quốc, cần nhân viên biết tiếng Trung."
],
[
"我学了几年汉语，可以用汉语跟客户交流，也可以帮公司翻译文件。",
"Tôi đã học tiếng Trung vài năm, có thể giao tiếp với khách hàng bằng tiếng Trung, cũng có thể giúp công ty dịch tài liệu."
],
[
"我觉得在这里可以发挥我的优点。",
"Tôi nghĩ ở đây tôi có thể phát huy điểm mạnh của mình."
],
[
"第三，公司很重视年轻人，有很多学习和培训的机会。",
"Thứ ba, công ty rất coi trọng người trẻ, có nhiều cơ hội học tập và đào tạo."
],
[
"我是一个喜欢学习新东西的人，我希望在工作中不断进步。",
"Tôi là người thích học điều mới, tôi mong tiến bộ không ngừng trong công việc."
],
[
"如果我有机会进入FIT公司，我一定会认真工作，努力完成每一个任务。",
"Nếu có cơ hội vào công ty FIT, tôi nhất định sẽ làm việc chăm chỉ, cố gắng hoàn thành mọi nhiệm vụ."
],
[
"我也希望能和公司一起成长，一起发展。",
"Tôi cũng mong được cùng công ty trưởng thành và phát triển."
],
[
"在大学的时候，我参加过很多社团活动，也在公司实习过。",
"Hồi đại học, tôi tham gia nhiều hoạt động câu lạc bộ, cũng từng thực tập ở công ty."
],
[
"这些经历让我学会了怎么跟别人合作，怎么解决问题。",
"Những trải nghiệm đó giúp tôi học được cách hợp tác với người khác và giải quyết vấn đề."
],
[
"我相信这些经验对以后的工作会很有帮助。",
"Tôi tin những kinh nghiệm này sẽ rất có ích cho công việc sau này."
],
[
"谢谢！",
"Xin cảm ơn!"
]
]
},
{
"id": 20,
"g": "uoc-mo",
"q": "你最大的希望是什么？",
"qvi": "Hy vọng lớn nhất của bạn là gì?",
"s": [
[
"我最大的希望是我的家人都身体健康，生活幸福。",
"Hy vọng lớn nhất của tôi là cả gia đình đều khỏe mạnh, sống hạnh phúc."
],
[
"我觉得健康和家人是世界上最重要的东西。",
"Tôi thấy sức khỏe và gia đình là những thứ quan trọng nhất trên đời."
],
[
"有钱、有好工作当然很好，但是如果没有健康，这些都没有意义。",
"Có tiền, có việc tốt đương nhiên tốt, nhưng nếu không có sức khỏe thì những thứ đó đều vô nghĩa."
],
[
"我的爸爸妈妈为了我们，每天都工作得很辛苦。",
"Bố mẹ tôi vì chúng tôi mà ngày nào cũng làm việc vất vả."
],
[
"他们年纪越来越大了，身体也不像以前那么好了。",
"Bố mẹ tuổi càng ngày càng cao, sức khỏe cũng không còn tốt như trước."
],
[
"所以我希望他们能多休息，少生病。",
"Vì vậy tôi mong bố mẹ nghỉ ngơi nhiều hơn, ít ốm đau hơn."
],
[
"除了家人，我还有一个希望，就是能找到一个自己喜欢的工作。",
"Ngoài gia đình, tôi còn một hy vọng nữa là tìm được một công việc mình yêu thích."
],
[
"我希望每天上班的时候都很开心，觉得自己的工作有意义。",
"Tôi mong mỗi ngày đi làm đều vui vẻ, thấy công việc của mình có ý nghĩa."
],
[
"这样我就可以用自己挣的钱照顾爸爸妈妈，带他们去旅游。",
"Như vậy tôi có thể dùng tiền mình kiếm được chăm sóc bố mẹ, đưa bố mẹ đi du lịch."
],
[
"我知道这些希望不是一天就能实现的。",
"Tôi biết những hy vọng này không thể thực hiện trong một ngày."
],
[
"所以现在我要好好学习，以后好好工作。",
"Vì vậy bây giờ tôi phải học thật tốt, sau này làm việc thật tốt."
],
[
"我还希望世界上没有战争，每个人都能过上和平、安定的生活。",
"Tôi còn mong thế giới không có chiến tranh, ai cũng được sống cuộc sống hòa bình, ổn định."
],
[
"我知道我一个人的力量很小，但是我可以从身边的小事做起。",
"Tôi biết sức một người rất nhỏ, nhưng tôi có thể bắt đầu từ những việc nhỏ quanh mình."
],
[
"比如帮助有困难的同学，关心身边的老人。",
"Ví dụ giúp đỡ bạn học gặp khó khăn, quan tâm người già quanh mình."
],
[
"我相信，只要努力，希望就会变成现实。",
"Tôi tin chỉ cần cố gắng, hy vọng sẽ trở thành hiện thực."
]
]
},
{
"id": 28,
"g": "uoc-mo",
"q": "给你三天时间，你会做什么？",
"qvi": "Nếu có ba ngày, bạn sẽ làm gì?",
"s": [
[
"如果给我三天时间，我想好好安排一下，让每一天都过得有意义。",
"Nếu có ba ngày, tôi muốn sắp xếp thật tốt để ngày nào cũng có ý nghĩa."
],
[
"第一天，我会回家陪我的家人。",
"Ngày đầu tiên, tôi sẽ về nhà ở bên gia đình."
],
[
"平时我在外地学习，很少回家。",
"Bình thường tôi học ở nơi khác, rất ít khi về nhà."
],
[
"我会和妈妈一起去市场买菜，给全家做一顿好吃的饭。",
"Tôi sẽ cùng mẹ đi chợ, nấu cho cả nhà một bữa thật ngon."
],
[
"晚上，我们一家人坐在一起，一边喝茶一边聊天。",
"Buổi tối, cả nhà ngồi bên nhau, vừa uống trà vừa trò chuyện."
],
[
"第二天，我会和好朋友们一起出去玩儿。",
"Ngày thứ hai, tôi sẽ cùng các bạn thân đi chơi."
],
[
"我们可以去爬山，看看美丽的风景，拍很多照片。",
"Chúng tôi có thể đi leo núi, ngắm cảnh đẹp, chụp thật nhiều ảnh."
],
[
"晚上再去吃我们最喜欢的火锅。",
"Buổi tối lại đi ăn món lẩu chúng tôi thích nhất."
],
[
"第三天，我想留给自己。",
"Ngày thứ ba, tôi muốn dành cho bản thân."
],
[
"上午我会去图书馆看一本一直想看的书。",
"Buổi sáng tôi sẽ đến thư viện đọc quyển sách mình luôn muốn đọc."
],
[
"下午我会在家听音乐、写日记，想一想以后的计划。",
"Buổi chiều tôi ở nhà nghe nhạc, viết nhật ký, nghĩ về kế hoạch sau này."
],
[
"如果还有一点儿时间，我想给我的老师写一封信。",
"Nếu còn chút thời gian, tôi muốn viết một lá thư cho thầy cô của mình."
],
[
"谢谢他们这些年对我的帮助和鼓励。",
"Cảm ơn thầy cô những năm qua đã giúp đỡ và động viên tôi."
],
[
"我觉得生活中最重要的，就是珍惜身边的人。",
"Tôi thấy điều quan trọng nhất trong cuộc sống là trân trọng những người bên cạnh."
],
[
"多花时间陪伴他们，才不会后悔。",
"Dành nhiều thời gian ở bên họ thì mới không hối tiếc."
],
[
"我觉得三天时间虽然不长，但是如果用心安排，就能过得很快乐。",
"Tôi thấy ba ngày tuy không dài, nhưng nếu sắp xếp chu đáo thì sẽ rất vui."
]
]
},
{
"id": 29,
"g": "uoc-mo",
"q": "你以后想做什么工作？为什么？",
"qvi": "Sau này bạn muốn làm công việc gì? Tại sao?",
"s": [
[
"以后我想做一名汉语老师。",
"Sau này tôi muốn trở thành một giáo viên tiếng Trung."
],
[
"我选择这个工作，有几个原因。",
"Tôi chọn công việc này vì mấy lý do."
],
[
"第一，我非常喜欢汉语。",
"Thứ nhất, tôi rất thích tiếng Trung."
],
[
"学汉语让我认识了很多朋友，也让我了解了一个新的世界。",
"Học tiếng Trung giúp tôi quen nhiều bạn bè, cũng cho tôi biết thêm một thế giới mới."
],
[
"我希望把这种快乐分享给更多的人。",
"Tôi mong chia sẻ niềm vui này với nhiều người hơn."
],
[
"第二，我的中学汉语老师对我的影响很大。",
"Thứ hai, cô giáo tiếng Trung thời trung học có ảnh hưởng rất lớn đến tôi."
],
[
"她上课很有意思，对学生也很关心。",
"Cô dạy rất thú vị, cũng rất quan tâm học sinh."
],
[
"因为她，我才开始喜欢汉语，我也想成为像她那样的老师。",
"Nhờ cô, tôi mới bắt đầu thích tiếng Trung, tôi cũng muốn trở thành giáo viên như cô."
],
[
"第三，现在越南学汉语的人越来越多，需要很多好老师。",
"Thứ ba, hiện nay người Việt học tiếng Trung ngày càng nhiều, cần rất nhiều giáo viên giỏi."
],
[
"我觉得当老师是一件很有意义的事情。",
"Tôi thấy làm giáo viên là một việc rất có ý nghĩa."
],
[
"当然，当一名好老师不容易。",
"Tất nhiên làm một giáo viên giỏi không dễ."
],
[
"不但要有很高的汉语水平，还要有耐心，要知道怎么教学生。",
"Không những phải có trình độ tiếng Trung cao, còn phải kiên nhẫn, biết cách dạy học sinh."
],
[
"现在我已经开始做家教，教几个小学生说简单的汉语。",
"Bây giờ tôi đã bắt đầu làm gia sư, dạy vài em tiểu học nói tiếng Trung đơn giản."
],
[
"看到他们一点一点进步，我觉得特别有成就感。",
"Nhìn các em tiến bộ từng chút một, tôi thấy đặc biệt có cảm giác thành tựu."
],
[
"这让我更加确定，老师就是我最想做的工作。",
"Điều đó khiến tôi càng chắc chắn rằng giáo viên chính là nghề tôi muốn làm nhất."
],
[
"所以现在我会努力学习，多积累经验，为以后的工作做好准备。",
"Vì vậy bây giờ tôi sẽ nỗ lực học tập, tích lũy kinh nghiệm, chuẩn bị tốt cho công việc sau này."
]
]
},
{
"id": 14,
"g": "gia-dinh",
"q": "请介绍你的老家/家乡。",
"qvi": "Hãy giới thiệu quê hương của bạn.",
"s": [
[
"我的家乡是越南中部的一个小城市。",
"Quê tôi là một thành phố nhỏ ở miền Trung Việt Nam."
],
[
"它不大，人也不太多，但是非常美丽。",
"Thành phố không lớn, người cũng không đông lắm, nhưng vô cùng đẹp."
],
[
"我的家乡有山也有水。",
"Quê tôi có núi cũng có sông."
],
[
"城市旁边有一条长长的河，河的两边种着很多树。",
"Cạnh thành phố có một con sông dài, hai bên bờ trồng rất nhiều cây."
],
[
"每天早上，很多人在河边散步、跑步、打太极拳。",
"Mỗi sáng, nhiều người đi dạo, chạy bộ, tập thái cực quyền bên bờ sông."
],
[
"离城市不远的地方还有海，夏天的时候，大家都喜欢去海边游泳。",
"Cách thành phố không xa còn có biển, mùa hè mọi người đều thích ra biển bơi."
],
[
"我家乡的天气比较热，夏天很长，冬天不太冷。",
"Thời tiết quê tôi khá nóng, mùa hè dài, mùa đông không lạnh lắm."
],
[
"这里的人非常热情，也很朴实。",
"Người ở đây rất nhiệt tình, cũng rất chất phác."
],
[
"如果你问路，他们会很认真地告诉你，有时候还会带你去。",
"Nếu bạn hỏi đường, họ sẽ chỉ rất tận tình, có khi còn dẫn bạn đi."
],
[
"我家乡的小吃也很有名，比如牛肉粉、米饼和各种海鲜。",
"Đồ ăn vặt quê tôi cũng rất nổi tiếng, như phở bò, bánh đa và đủ loại hải sản."
],
[
"很多外地人来这里，都会说：“太好吃了！”",
"Nhiều người nơi khác đến đây đều nói: “Ngon quá!”"
],
[
"现在我在外地上大学，常常想起我的家乡。",
"Bây giờ tôi học đại học ở nơi khác, thường nhớ về quê hương."
],
[
"每年春节，家家户户都会打扫房子，挂上红红的灯笼。",
"Mỗi dịp Tết, nhà nhà đều dọn dẹp nhà cửa, treo những chiếc đèn lồng đỏ."
],
[
"大家一起包粽子，走亲戚，街上非常热闹。",
"Mọi người cùng gói bánh chưng, đi thăm họ hàng, đường phố vô cùng náo nhiệt."
],
[
"不管我走到哪里，家乡永远是我心里最美的地方。",
"Dù đi đến đâu, quê hương mãi là nơi đẹp nhất trong lòng tôi."
],
[
"欢迎大家有机会来我的家乡玩儿！",
"Chào mừng mọi người có dịp đến quê tôi chơi!"
]
]
},
{
"id": 22,
"g": "gia-dinh",
"q": "你觉得什么样的孩子是一个好孩子？",
"qvi": "Bạn thấy đứa trẻ như thế nào là một đứa trẻ ngoan?",
"s": [
[
"很多父母都希望自己的孩子是一个好孩子。",
"Nhiều bậc cha mẹ đều mong con mình là một đứa trẻ ngoan."
],
[
"那什么样的孩子是好孩子呢？",
"Vậy đứa trẻ như thế nào là đứa trẻ ngoan?"
],
[
"我觉得，好孩子不一定是学习成绩最好的孩子。",
"Tôi cho rằng đứa trẻ ngoan không nhất thiết là đứa học giỏi nhất."
],
[
"第一，好孩子应该有礼貌。",
"Thứ nhất, trẻ ngoan phải lễ phép."
],
[
"见到老师和长辈要问好，别人帮助了自己要说“谢谢”，做错了事要说“对不起”。",
"Gặp thầy cô và người lớn phải chào hỏi, được người khác giúp phải nói “cảm ơn”, làm sai phải nói “xin lỗi”."
],
[
"第二，好孩子应该诚实，不说假话。",
"Thứ hai, trẻ ngoan phải trung thực, không nói dối."
],
[
"即使做错了事，也要敢承认。",
"Cho dù làm sai cũng phải dám thừa nhận."
],
[
"第三，好孩子应该关心别人，特别是关心自己的家人。",
"Thứ ba, trẻ ngoan phải quan tâm người khác, đặc biệt là gia đình mình."
],
[
"比如爸爸妈妈累了，可以帮他们做一些家务；爷爷奶奶生病了，可以陪在他们身边。",
"Ví dụ bố mẹ mệt thì giúp làm việc nhà; ông bà ốm thì ở bên chăm sóc."
],
[
"第四，好孩子应该努力学习，有自己的爱好和梦想。",
"Thứ tư, trẻ ngoan phải chăm học, có sở thích và ước mơ của riêng mình."
],
[
"成绩不是最重要的，重要的是认真对待每一件事。",
"Thành tích không phải quan trọng nhất, quan trọng là nghiêm túc với mọi việc."
],
[
"另外，好孩子还应该爱护环境，不乱扔垃圾，节约用水用电。",
"Ngoài ra, trẻ ngoan còn nên bảo vệ môi trường, không vứt rác bừa bãi, tiết kiệm điện nước."
],
[
"这些都是很小的事情，但是可以看出一个孩子的教养。",
"Đó đều là những việc rất nhỏ nhưng có thể thấy được sự giáo dục của một đứa trẻ."
],
[
"父母也应该多陪孩子，给孩子做一个好榜样。",
"Cha mẹ cũng nên dành nhiều thời gian bên con, làm tấm gương tốt cho con."
],
[
"我觉得每个孩子都可以成为好孩子，只要父母和老师好好教育他们。",
"Tôi thấy đứa trẻ nào cũng có thể trở thành trẻ ngoan, miễn là cha mẹ và thầy cô dạy dỗ tốt."
]
]
},
{
"id": 25,
"g": "gia-dinh",
"q": "妈妈有时候会让你帮她做什么？",
"qvi": "Mẹ thỉnh thoảng nhờ bạn giúp làm những gì?",
"s": [
[
"我的妈妈每天都很忙，所以有时候会让我帮她做一些家务。",
"Mẹ tôi ngày nào cũng rất bận, nên thỉnh thoảng nhờ tôi giúp một số việc nhà."
],
[
"最常做的事情是帮妈妈做饭。",
"Việc hay làm nhất là giúp mẹ nấu cơm."
],
[
"妈妈做菜的时候，我帮她洗菜、切菜，有时候还帮她看着火。",
"Khi mẹ nấu ăn, tôi giúp mẹ rửa rau, thái rau, có khi còn trông bếp giúp mẹ."
],
[
"吃完饭以后，我会洗碗、擦桌子。",
"Ăn xong, tôi rửa bát, lau bàn."
],
[
"周末的时候，妈妈会让我帮她打扫房间。",
"Cuối tuần, mẹ nhờ tôi giúp dọn dẹp nhà cửa."
],
[
"我负责扫地、拖地，还要把自己的房间收拾干净。",
"Tôi phụ trách quét nhà, lau nhà, còn phải dọn phòng mình cho sạch."
],
[
"有时候妈妈没有时间，会让我去超市或者市场买东西。",
"Có khi mẹ không có thời gian, sẽ nhờ tôi đi siêu thị hoặc chợ mua đồ."
],
[
"她给我写一张单子，上面有鸡蛋、牛奶、水果和蔬菜。",
"Mẹ viết cho tôi một tờ danh sách, trên đó có trứng, sữa, hoa quả và rau."
],
[
"我还会帮妈妈洗衣服、晒衣服。",
"Tôi còn giúp mẹ giặt quần áo, phơi quần áo."
],
[
"另外，妈妈不太会用手机，有时候会让我教她怎么上网、怎么发信息。",
"Ngoài ra, mẹ không rành dùng điện thoại, có khi nhờ tôi dạy cách lên mạng, cách gửi tin nhắn."
],
[
"刚开始的时候，我觉得做家务很累。",
"Lúc đầu, tôi thấy làm việc nhà rất mệt."
],
[
"但是现在我觉得帮妈妈做事是应该的，也让我学会了很多生活的本领。",
"Nhưng bây giờ tôi thấy giúp mẹ là việc nên làm, cũng giúp tôi học được nhiều kỹ năng sống."
],
[
"有一次，妈妈生病了，我一个人做了一顿晚饭。",
"Có lần mẹ bị ốm, tôi một mình nấu bữa tối."
],
[
"虽然菜做得不太好吃，但是妈妈吃得很开心，还说我长大了。",
"Tuy món ăn không ngon lắm nhưng mẹ ăn rất vui, còn nói tôi đã lớn rồi."
],
[
"从那以后，我更愿意帮妈妈做事了。",
"Từ đó, tôi càng sẵn lòng giúp mẹ hơn."
],
[
"看到妈妈高兴的样子，我也很开心。",
"Nhìn thấy mẹ vui, tôi cũng rất vui."
]
]
},
{
"id": 24,
"g": "suc-khoe",
"q": "你喜欢什么运动？为什么？",
"qvi": "Bạn thích môn thể thao nào? Tại sao?",
"s": [
[
"我喜欢很多运动，比如跑步、游泳和打篮球。",
"Tôi thích nhiều môn thể thao, như chạy bộ, bơi lội và bóng rổ."
],
[
"但是我最喜欢的运动是打羽毛球。",
"Nhưng môn tôi thích nhất là cầu lông."
],
[
"我从小学就开始打羽毛球，到现在已经十年了。",
"Tôi bắt đầu chơi cầu lông từ tiểu học, đến nay đã mười năm."
],
[
"我喜欢羽毛球，有几个原因。",
"Tôi thích cầu lông vì mấy lý do."
],
[
"第一，打羽毛球很方便。",
"Thứ nhất, chơi cầu lông rất tiện."
],
[
"只要有两个球拍、一个球，在学校、公园都可以打，也不需要很多钱。",
"Chỉ cần hai cây vợt, một quả cầu, ở trường hay công viên đều chơi được, cũng không tốn nhiều tiền."
],
[
"第二，打羽毛球对身体很好。",
"Thứ hai, chơi cầu lông rất tốt cho sức khỏe."
],
[
"打羽毛球的时候要跑、要跳，全身都在运动。",
"Khi chơi cầu lông phải chạy, phải nhảy, toàn thân đều vận động."
],
[
"打完一个小时，出一身汗，觉得特别舒服。",
"Chơi xong một tiếng, đổ mồ hôi khắp người, thấy đặc biệt dễ chịu."
],
[
"第三，打羽毛球可以交朋友。",
"Thứ ba, chơi cầu lông có thể kết bạn."
],
[
"我常常和同学、朋友一起打，有时候还参加学校的比赛。",
"Tôi thường chơi cùng bạn học, bạn bè, có khi còn tham gia thi đấu ở trường."
],
[
"大家一起运动，一起聊天，关系越来越好。",
"Mọi người cùng chơi, cùng trò chuyện, quan hệ ngày càng thân."
],
[
"学习累了的时候，打一会儿羽毛球，心情马上就好了。",
"Học mệt thì chơi cầu lông một lát, tâm trạng tốt lên ngay."
],
[
"现在我们班组织了一个羽毛球小组，每个星期六下午一起练习。",
"Bây giờ lớp tôi lập một nhóm cầu lông, chiều thứ bảy hằng tuần cùng nhau tập luyện."
],
[
"有一位体育老师会来教我们，我们的水平提高了很多。",
"Có một thầy giáo thể dục đến dạy, trình độ của chúng tôi tiến bộ rất nhiều."
],
[
"所以我会一直坚持下去。",
"Vì vậy tôi sẽ luôn kiên trì chơi tiếp."
]
]
},
{
"id": 26,
"g": "suc-khoe",
"q": "你每天锻炼身体吗？",
"qvi": "Bạn có rèn luyện sức khỏe mỗi ngày không?",
"s": [
[
"是的，我每天都锻炼身体。",
"Có, ngày nào tôi cũng rèn luyện sức khỏe."
],
[
"以前我不太喜欢运动，常常坐在电脑前，一坐就是几个小时。",
"Trước đây tôi không thích vận động lắm, hay ngồi trước máy tính, ngồi một lèo mấy tiếng."
],
[
"后来我的身体越来越差，常常感冒，还总是觉得很累。",
"Sau đó sức khỏe tôi ngày càng kém, hay bị cảm, lúc nào cũng thấy mệt."
],
[
"医生告诉我，应该多运动。",
"Bác sĩ khuyên tôi nên vận động nhiều hơn."
],
[
"从那以后，我就开始每天锻炼身体了。",
"Từ đó, tôi bắt đầu rèn luyện sức khỏe mỗi ngày."
],
[
"每天早上，我六点起床，去家附近的公园跑步三十分钟。",
"Mỗi sáng sáu giờ tôi dậy, ra công viên gần nhà chạy bộ ba mươi phút."
],
[
"下午下课以后，我有时候去打篮球，有时候去游泳。",
"Chiều tan học, có lúc tôi đi chơi bóng rổ, có lúc đi bơi."
],
[
"如果下雨不能出去，我就在房间里做一些简单的运动。",
"Nếu trời mưa không ra ngoài được, tôi tập vài động tác đơn giản trong phòng."
],
[
"坚持了半年，我发现自己的变化很大。",
"Kiên trì được nửa năm, tôi thấy mình thay đổi rất nhiều."
],
[
"我很少生病了，晚上睡得更好，学习的时候也更有精神。",
"Tôi ít ốm hơn, buổi tối ngủ ngon hơn, khi học cũng có tinh thần hơn."
],
[
"我觉得锻炼身体最重要的是坚持。",
"Tôi thấy rèn luyện sức khỏe quan trọng nhất là kiên trì."
],
[
"每天运动一点儿，比一个星期运动一次好得多。",
"Mỗi ngày vận động một chút tốt hơn nhiều so với mỗi tuần vận động một lần."
],
[
"现在我的爸爸妈妈也跟我一起锻炼了。",
"Bây giờ bố mẹ tôi cũng tập luyện cùng tôi."
],
[
"每天晚饭以后，我们一家人会去公园散步半个小时。",
"Mỗi tối sau bữa cơm, cả nhà tôi đi dạo công viên nửa tiếng."
],
[
"一边走一边聊天，身体好了，家里的气氛也更好了。",
"Vừa đi vừa trò chuyện, sức khỏe tốt lên, không khí gia đình cũng vui hơn."
],
[
"希望大家都能找到自己喜欢的运动，有一个健康的身体。",
"Mong mọi người đều tìm được môn thể thao mình thích, có một cơ thể khỏe mạnh."
]
]
},
{
"id": 27,
"g": "suc-khoe",
"q": "你觉得早睡早起对身体好吗？为什么？",
"qvi": "Bạn có thấy ngủ sớm dậy sớm tốt cho sức khỏe không? Tại sao?",
"s": [
[
"我觉得早睡早起对身体非常好。",
"Tôi thấy ngủ sớm dậy sớm vô cùng tốt cho sức khỏe."
],
[
"第一，早睡可以让身体好好休息。",
"Thứ nhất, ngủ sớm giúp cơ thể được nghỉ ngơi đầy đủ."
],
[
"晚上是身体休息的时间，如果常常睡得很晚，身体就会越来越差。",
"Buổi tối là lúc cơ thể nghỉ ngơi, nếu thường xuyên ngủ muộn, sức khỏe sẽ ngày càng kém."
],
[
"很多年轻人晚上玩手机玩到一两点，第二天起床的时候头疼，没有精神。",
"Nhiều bạn trẻ chơi điện thoại đến một hai giờ sáng, hôm sau dậy thì đau đầu, không có tinh thần."
],
[
"第二，早起可以让我们有更多的时间。",
"Thứ hai, dậy sớm giúp chúng ta có thêm thời gian."
],
[
"早上起来，可以去外面跑跑步，呼吸新鲜的空气。",
"Buổi sáng dậy có thể ra ngoài chạy bộ, hít thở không khí trong lành."
],
[
"还可以安安静静地吃一顿早饭，不用着急。",
"Còn có thể thong thả ăn một bữa sáng, không phải vội vàng."
],
[
"第三，早睡早起可以让我们学习和工作的效率更高。",
"Thứ ba, ngủ sớm dậy sớm giúp hiệu quả học tập và làm việc cao hơn."
],
[
"早上头脑最清楚，这个时候学习，记得又快又牢。",
"Buổi sáng đầu óc minh mẫn nhất, học lúc này nhớ vừa nhanh vừa lâu."
],
[
"以前我也常常熬夜，后来我改成每天晚上十一点以前睡觉，早上六点起床。",
"Trước đây tôi cũng hay thức khuya, sau đó tôi đổi thành ngủ trước mười một giờ, sáu giờ sáng dậy."
],
[
"现在我觉得身体好多了，心情也更好了。",
"Bây giờ tôi thấy sức khỏe tốt hơn nhiều, tâm trạng cũng tốt hơn."
],
[
"当然，要做到早睡早起并不容易，特别是一开始的时候。",
"Tất nhiên làm được việc ngủ sớm dậy sớm không dễ, nhất là lúc ban đầu."
],
[
"我的方法是睡觉前一个小时不玩手机，看一会儿书或者听听音乐。",
"Cách của tôi là một tiếng trước khi ngủ không chơi điện thoại, đọc sách một lát hoặc nghe nhạc."
],
[
"这样很快就能睡着，第二天早上起床也不难了。",
"Như vậy sẽ nhanh ngủ, sáng hôm sau dậy cũng không khó nữa."
],
[
"所以我建议大家都养成早睡早起的好习惯。",
"Vì vậy tôi khuyên mọi người nên tập thói quen tốt ngủ sớm dậy sớm."
]
]
},
{
"id": 15,
"g": "cuoc-song",
"q": "你最喜欢哪一种菜？请说一说。",
"qvi": "Bạn thích món ăn nào nhất? Hãy nói một chút.",
"s": [
[
"我最喜欢的菜是越南的牛肉粉。",
"Món tôi thích nhất là phở bò Việt Nam."
],
[
"牛肉粉是越南最有名的菜之一，很多外国人来越南都一定要吃。",
"Phở bò là một trong những món nổi tiếng nhất Việt Nam, nhiều người nước ngoài đến Việt Nam đều nhất định phải ăn."
],
[
"一碗好吃的牛肉粉，最重要的是汤。",
"Một bát phở ngon, quan trọng nhất là nước dùng."
],
[
"做汤要用牛骨头，加上很多香料，要煮七八个小时。",
"Nấu nước dùng phải dùng xương bò, thêm nhiều gia vị, phải ninh bảy tám tiếng."
],
[
"所以汤的味道又香又甜。",
"Vì vậy nước dùng vừa thơm vừa ngọt."
],
[
"碗里有白白的米粉、薄薄的牛肉，还有葱和香菜。",
"Trong bát có bánh phở trắng, thịt bò thái mỏng, còn có hành và rau thơm."
],
[
"吃的时候，可以加一点儿柠檬和辣椒，味道更好。",
"Khi ăn có thể thêm chút chanh và ớt, vị càng ngon."
],
[
"在越南，人们常常早上吃牛肉粉。",
"Ở Việt Nam, người ta thường ăn phở vào buổi sáng."
],
[
"我家旁边有一个小饭馆，他们的牛肉粉特别好吃。",
"Cạnh nhà tôi có một quán nhỏ, phở bò của họ đặc biệt ngon."
],
[
"我每个星期都会去吃两三次，老板都认识我了。",
"Mỗi tuần tôi đến ăn hai ba lần, ông chủ quen mặt tôi luôn rồi."
],
[
"冬天的早上，吃一碗热热的牛肉粉，全身都暖和了。",
"Sáng mùa đông, ăn một bát phở nóng hổi, cả người ấm lên."
],
[
"我还跟妈妈学会了做牛肉粉，有时候做给朋友们吃。",
"Tôi còn học mẹ cách nấu phở, có khi nấu cho bạn bè ăn."
],
[
"越南还有很多好吃的菜，比如春卷、法棍面包和米线。",
"Việt Nam còn nhiều món ngon khác như nem rán, bánh mì và bún."
],
[
"但是对我来说，牛肉粉是最特别的，因为它有家的味道。",
"Nhưng với tôi, phở bò là đặc biệt nhất vì nó có hương vị của gia đình."
],
[
"每次在外地吃到牛肉粉，我都会想起妈妈。",
"Mỗi lần ăn phở ở nơi khác, tôi lại nhớ đến mẹ."
],
[
"如果你来越南，一定要试一试！",
"Nếu bạn đến Việt Nam, nhất định phải thử nhé!"
]
]
},
{
"id": 23,
"g": "cuoc-song",
"q": "请说一下让你高兴的一件事。",
"qvi": "Hãy kể một chuyện khiến bạn vui.",
"s": [
[
"让我最高兴的一件事，是去年我通过了HSK四级考试。",
"Chuyện khiến tôi vui nhất là năm ngoái tôi đã thi đỗ HSK cấp 4."
],
[
"为了这个考试，我准备了差不多半年。",
"Để chuẩn bị cho kỳ thi này, tôi đã ôn gần nửa năm."
],
[
"那段时间，我每天早上六点起床背生词，晚上做练习题到很晚。",
"Thời gian đó, sáng nào tôi cũng dậy lúc sáu giờ học thuộc từ mới, buổi tối làm bài tập đến khuya."
],
[
"周末朋友们出去玩儿，我还在图书馆学习。",
"Cuối tuần bạn bè đi chơi, tôi vẫn ở thư viện học bài."
],
[
"有时候我也觉得很累，想放弃。",
"Có lúc tôi cũng thấy rất mệt, muốn bỏ cuộc."
],
[
"但是我的老师和家人一直鼓励我，让我坚持下去。",
"Nhưng thầy cô và gia đình luôn động viên tôi kiên trì."
],
[
"考试那天，我有点儿紧张，但是很多题我都会做。",
"Hôm thi, tôi hơi căng thẳng nhưng nhiều câu tôi đều làm được."
],
[
"一个月以后，我在网上查成绩，看到自己考了二百五十分。",
"Một tháng sau, tôi tra điểm trên mạng, thấy mình được hai trăm năm mươi điểm."
],
[
"那一刻，我高兴得跳了起来，马上给妈妈打电话。",
"Khoảnh khắc đó, tôi vui đến nhảy cẫng lên, gọi điện ngay cho mẹ."
],
[
"妈妈听了也非常高兴，晚上做了很多好吃的菜为我庆祝。",
"Mẹ nghe xong cũng rất vui, buổi tối nấu nhiều món ngon để chúc mừng tôi."
],
[
"这件事让我明白了，只要努力，就一定会有收获。",
"Chuyện này giúp tôi hiểu rằng chỉ cần nỗ lực thì nhất định sẽ có thành quả."
],
[
"那天晚上，我还给王老师发了一条信息，谢谢她的帮助。",
"Tối hôm đó, tôi còn gửi tin nhắn cảm ơn cô Vương đã giúp đỡ."
],
[
"王老师回复说：“你真棒！继续加油！”",
"Cô Vương trả lời: “Em giỏi lắm! Tiếp tục cố gắng nhé!”"
],
[
"看到老师的话，我心里暖暖的。",
"Đọc lời cô, lòng tôi thấy ấm áp."
],
[
"现在我正在准备HSK五级，我相信我也能成功。",
"Bây giờ tôi đang chuẩn bị thi HSK cấp 5, tôi tin mình cũng sẽ thành công."
]
]
},
{
"id": 31,
"g": "cuoc-song",
"q": "你最喜欢的颜色是什么？",
"qvi": "Màu sắc bạn thích nhất là gì?",
"s": [
[
"我最喜欢的颜色是蓝色。",
"Màu tôi thích nhất là màu xanh lam."
],
[
"我从小就喜欢蓝色，我的衣服、书包、杯子很多都是蓝色的。",
"Từ nhỏ tôi đã thích màu xanh lam, quần áo, cặp sách, cốc của tôi nhiều cái màu xanh lam."
],
[
"我喜欢蓝色，因为它让我想到天空和大海。",
"Tôi thích màu xanh lam vì nó khiến tôi nghĩ đến bầu trời và biển cả."
],
[
"天空和大海都很大、很美，看着它们，心情就会变得很平静。",
"Bầu trời và biển cả đều rộng lớn, xinh đẹp, nhìn chúng tâm trạng trở nên rất bình yên."
],
[
"学习累了或者不开心的时候，我喜欢看看蓝色的天空。",
"Khi học mệt hoặc không vui, tôi thích ngắm bầu trời xanh."
],
[
"我觉得蓝色是一种很干净、很舒服的颜色。",
"Tôi thấy màu xanh lam là màu rất sạch sẽ, dễ chịu."
],
[
"它不像红色那么热情，也不像黑色那么严肃。",
"Nó không nồng nhiệt như màu đỏ, cũng không nghiêm nghị như màu đen."
],
[
"很多人说，喜欢蓝色的人性格比较安静，做事也比较认真。",
"Nhiều người nói người thích màu xanh lam tính cách khá trầm lặng, làm việc cũng khá chăm chỉ."
],
[
"我觉得这说得有点儿对。",
"Tôi thấy câu đó cũng đúng một phần."
],
[
"我的房间也是蓝色的，墙是浅蓝色，窗帘是深蓝色。",
"Phòng tôi cũng màu xanh lam, tường màu xanh nhạt, rèm màu xanh đậm."
],
[
"每天在这样的房间里学习和休息，我觉得特别舒服。",
"Mỗi ngày học tập và nghỉ ngơi trong căn phòng như vậy, tôi thấy đặc biệt dễ chịu."
],
[
"当然，别的颜色我也喜欢，比如绿色和白色。",
"Tất nhiên tôi cũng thích các màu khác, như xanh lá và trắng."
],
[
"每种颜色都有自己的意思。",
"Mỗi màu sắc đều có ý nghĩa riêng."
],
[
"在中国，红色代表快乐和好运，所以春节的时候到处都是红色。",
"Ở Trung Quốc, màu đỏ tượng trưng cho niềm vui và may mắn, nên dịp Tết đâu đâu cũng là màu đỏ."
],
[
"在越南，很多人也喜欢黄色和红色。",
"Ở Việt Nam, nhiều người cũng thích màu vàng và màu đỏ."
],
[
"但是蓝色永远是我的第一选择。",
"Nhưng màu xanh lam mãi là lựa chọn số một của tôi."
]
]
},
{
"id": 32,
"g": "cuoc-song",
"q": "你觉得快乐的生活是什么样的？",
"qvi": "Bạn thấy cuộc sống hạnh phúc là như thế nào?",
"s": [
[
"每个人对快乐生活的看法都不一样。",
"Quan niệm về cuộc sống vui vẻ của mỗi người đều khác nhau."
],
[
"有的人觉得有很多钱就是快乐，有的人觉得有名就是快乐。",
"Có người thấy có nhiều tiền là vui, có người thấy nổi tiếng là vui."
],
[
"我觉得快乐的生活其实很简单。",
"Tôi thấy cuộc sống vui vẻ thực ra rất đơn giản."
],
[
"第一，要有健康的身体。",
"Thứ nhất, phải có sức khỏe tốt."
],
[
"身体好了，才能做自己想做的事情，去自己想去的地方。",
"Có sức khỏe mới làm được việc mình muốn, đến được nơi mình muốn."
],
[
"第二，要有爱自己的家人和真心的朋友。",
"Thứ hai, phải có gia đình yêu thương và bạn bè chân thành."
],
[
"高兴的时候，有人跟你一起笑；难过的时候，有人在你身边。",
"Khi vui có người cùng cười; khi buồn có người bên cạnh."
],
[
"第三，要有一份自己喜欢的工作。",
"Thứ ba, phải có một công việc mình yêu thích."
],
[
"每天做喜欢的事情，就不会觉得累。",
"Mỗi ngày làm việc mình thích sẽ không thấy mệt."
],
[
"第四，要学会满足。",
"Thứ tư, phải biết đủ."
],
[
"如果总是跟别人比，总是想要更多，就很难快乐。",
"Nếu cứ so sánh với người khác, lúc nào cũng muốn nhiều hơn thì rất khó vui."
],
[
"对我来说，周末和家人一起吃一顿饭，跟朋友去喝杯咖啡，看一本好书，这就是快乐。",
"Với tôi, cuối tuần ăn bữa cơm cùng gia đình, đi uống cà phê với bạn, đọc một quyển sách hay, đó chính là niềm vui."
],
[
"我也希望自己每天都能保持好心情，遇到困难的时候不放弃。",
"Tôi cũng mong mình ngày nào cũng giữ được tâm trạng tốt, gặp khó khăn không bỏ cuộc."
],
[
"多笑一笑，多感谢身边的人，生活就会变得更美好。",
"Cười nhiều hơn, biết ơn người bên cạnh nhiều hơn, cuộc sống sẽ trở nên tươi đẹp hơn."
],
[
"快乐不在很远的地方，就在我们每天的生活里。",
"Niềm vui không ở đâu xa, mà ở ngay trong cuộc sống hằng ngày của chúng ta."
]
]
}
];

// Từ mới và cấu trúc ngữ pháp của từng bài nói: w = [chữ Hán, pinyin, nghĩa], g = [cấu trúc, giải thích, câu trong bài, id ngữ pháp]
export const SPEAK_VOCAB = {"1": {"w": [["介绍", "jièshào", "giới thiệu"], ["自己", "zìjǐ", "bản thân, tự mình"], ["城市", "chéngshì", "thành phố"], ["热情", "rèqíng", "nhiệt tình"], ["年级", "niánjí", "năm (học), khối lớp"], ["专业", "zhuānyè", "chuyên ngành"], ["性格", "xìnggé", "tính cách"], ["开朗", "kāilǎng", "cởi mở, vui vẻ"], ["交朋友", "jiāo péngyou", "kết bạn"], ["优点", "yōudiǎn", "ưu điểm"], ["缺点", "quēdiǎn", "nhược điểm"], ["计划", "jìhuà", "kế hoạch"], ["留学", "liúxué", "du học"], ["提高", "tígāo", "nâng cao"], ["水平", "shuǐpíng", "trình độ"], ["毕业", "bìyè", "tốt nghiệp"], ["俱乐部", "jùlèbù", "câu lạc bộ"], ["信心", "xìnxīn", "lòng tin, sự tự tin"]], "g": [["虽然……但是……", "Tuy… nhưng… (nhượng bộ)", "我觉得汉语虽然很难，但是非常有意思。", "g2-suiran"], ["已经……了", "Đã… rồi (hoàn thành, kéo dài đến hiện tại)", "我学习汉语已经两年了。", ""], ["和……有关系", "Có liên quan đến…", "我想找一个和汉语有关系的工作。", ""], ["让 + người + tính từ/động từ", "Khiến ai đó…", "这让我对学习汉语更有信心了。", "g2-rang"]]}, "2": {"w": [["小学", "xiǎoxué", "trường tiểu học"], ["个子", "gèzi", "vóc dáng, chiều cao"], ["总是", "zǒngshì", "luôn luôn"], ["起床", "qǐchuáng", "thức dậy"], ["打扫", "dǎsǎo", "quét dọn"], ["从来", "cónglái", "từ trước đến nay"], ["照顾", "zhàogù", "chăm sóc"], ["生气", "shēngqì", "tức giận"], ["鼓励", "gǔlì", "khích lệ, động viên"], ["诚实", "chéngshí", "trung thực"], ["关心", "guānxīn", "quan tâm"], ["世界", "shìjiè", "thế giới"], ["外地", "wàidì", "nơi khác, tỉnh khác"], ["健康", "jiànkāng", "khỏe mạnh"], ["提前", "tíqián", "trước, sớm hơn"], ["满足", "mǎnzú", "thỏa mãn, mãn nguyện"], ["幸福", "xìngfú", "hạnh phúc"]], "g": [["虽然……但是……", "Tuy… nhưng…", "虽然她很累，但是她从来不说累。", "g2-suiran"], ["从来不/没……", "Chưa bao giờ…", "她从来不说累。", ""], ["……的时候", "Khi…, lúc…", "我考试考得不好的时候，她也不生气。", ""], ["只要……就……", "Chỉ cần… thì…", "只要我健康快乐，她就满足了。", ""]]}, "3": {"w": [["姓", "xìng", "mang họ"], ["戴", "dài", "đeo (kính, mũ)"], ["眼镜", "yǎnjìng", "kính mắt"], ["温柔", "wēnróu", "dịu dàng"], ["认真", "rènzhēn", "nghiêm túc, chăm chỉ"], ["文化", "wénhuà", "văn hóa"], ["历史", "lìshǐ", "lịch sử"], ["耐心", "nàixīn", "kiên nhẫn"], ["愿意", "yuànyì", "sẵn lòng"], ["感冒", "gǎnmào", "bị cảm"], ["内容", "nèiróng", "nội dung"], ["复习", "fùxí", "ôn tập"], ["组织", "zǔzhī", "tổ chức"], ["参加", "cānjiā", "tham gia"], ["活动", "huódòng", "hoạt động"], ["成为", "chéngwéi", "trở thành"], ["感谢", "gǎnxiè", "biết ơn, cảm ơn"]], "g": [["不但……而且……", "Không những… mà còn…", "她不但是一位好老师，而且像我们的朋友一样。", "g3-budan"], ["像……一样", "Giống như…", "她像我们的朋友一样。", "g3-yiyang"], ["越来越……", "Càng ngày càng…", "我越来越喜欢学习汉语了。", "g3-yue"], ["把……发给……", "Đưa/gửi cái gì cho ai (câu chữ 把)", "她还把上课的内容发给我。", "g3-ba"]]}, "4": {"w": [["同学", "tóngxué", "bạn học"], ["认识", "rènshi", "quen biết"], ["眼睛", "yǎnjing", "mắt"], ["特别", "tèbié", "đặc biệt"], ["数学", "shùxué", "toán học"], ["爱好", "àihào", "sở thích"], ["咖啡馆", "kāfēiguǎn", "quán cà phê"], ["聊天", "liáotiān", "tán gẫu, trò chuyện"], ["不同", "bùtóng", "khác nhau"], ["关系", "guānxi", "quan hệ"], ["永远", "yǒngyuǎn", "mãi mãi"], ["爱心", "àixīn", "lòng nhân ái"], ["志愿者", "zhìyuànzhě", "tình nguyện viên"], ["意义", "yìyì", "ý nghĩa"]], "g": [["比如……", "Ví dụ như…", "我们有很多一样的爱好，比如看电影、听音乐和做饭。", ""], ["……或者……", "… hoặc …", "我们常常一起去咖啡馆聊天，或者去书店看书。", "g3-haishi"], ["第一个……就是……", "Người/điều đầu tiên… chính là…", "第一个想到的人就是她。", ""], ["从……身上学到", "Học được từ ai đó", "我从她身上学到了很多东西。", ""]]}, "5": {"w": [["需要", "xūyào", "cần"], ["应该", "yīnggāi", "nên, phải"], ["真心", "zhēnxīn", "thật lòng"], ["面前", "miànqián", "trước mặt"], ["出现", "chūxiàn", "xuất hiện"], ["遇到", "yùdào", "gặp phải"], ["办法", "bànfǎ", "cách, biện pháp"], ["敢", "gǎn", "dám"], ["成功", "chénggōng", "thành công"], ["成绩", "chéngjì", "thành tích, điểm số"], ["开心", "kāixīn", "vui vẻ"], ["同时", "tóngshí", "đồng thời"], ["对待", "duìdài", "đối xử"], ["不管", "bùguǎn", "bất kể, dù"], ["幸运", "xìngyùn", "may mắn"]], "g": [["什么样的……", "… như thế nào", "什么样的朋友才是好朋友呢？", ""], ["第一……第二……第三……", "Thứ nhất… thứ hai… thứ ba…", "第一，好朋友应该真心对你。", ""], ["不是……而是……", "Không phải… mà là…", "他不会只说你好，而是会告诉你哪里不对。", ""], ["不管……都……", "Bất kể… đều…", "不管过了多少年，不管离得多远，关系都不会变。", ""]]}, "6": {"w": [["平时", "píngshí", "bình thường, thường ngày"], ["复习", "fùxí", "ôn tập"], ["互相", "hùxiāng", "lẫn nhau"], ["饭馆", "fànguǎn", "quán ăn"], ["便宜", "piányi", "rẻ"], ["散步", "sànbù", "đi dạo"], ["爬山", "pá shān", "leo núi"], ["骑", "qí", "cưỡi, đạp (xe)"], ["家乡", "jiāxiāng", "quê hương"], ["旅游", "lǚyóu", "du lịch"], ["海边", "hǎibiān", "bờ biển"], ["照片", "zhàopiàn", "ảnh"], ["鼓励", "gǔlì", "động viên"], ["加油", "jiāyóu", "cố lên"]], "g": [["又……又……", "Vừa… vừa…", "那里的菜又便宜又好吃。", "g3-youyou"], ["一边……一边……", "Vừa… vừa… (hai hành động)", "我们一边吃一边聊天。", "g3-yibian"], ["有时候……有时候……", "Lúc thì… lúc thì…", "我们有时候去看电影，有时候去公园散步。", ""], ["不管……只要……就……", "Dù… chỉ cần… thì…", "不管做什么，只要和好朋友在一起，就会觉得很有意思。", ""]]}, "7": {"w": [["旅游", "lǚyóu", "du lịch"], ["选", "xuǎn", "chọn"], ["原因", "yuányīn", "nguyên nhân, lý do"], ["风景", "fēngjǐng", "phong cảnh"], ["心情", "xīnqíng", "tâm trạng"], ["游泳", "yóuyǒng", "bơi"], ["晒太阳", "shài tàiyáng", "tắm nắng"], ["沙滩", "shātān", "bãi cát"], ["海鲜", "hǎixiān", "hải sản"], ["新鲜", "xīnxiān", "tươi"], ["友好", "yǒuhǎo", "thân thiện"], ["压力", "yālì", "áp lực"], ["继续", "jìxù", "tiếp tục"], ["日出", "rìchū", "bình minh, mặt trời mọc"], ["机会", "jīhuì", "cơ hội"]], "g": [["如果……就……", "Nếu… thì…", "如果让我选，我最喜欢去海边旅游。", "g3-ruguo"], ["让 + người + V", "Khiến/làm cho ai…", "看着就让人心情很好。", "g2-rang"], ["不但……而且……", "Không những… mà còn…", "那里不但有漂亮的海滩，而且城市很干净。", "g3-budan"], ["又……又……", "Vừa… vừa…", "那里的海鲜又新鲜又便宜。", "g3-youyou"]]}, "8": {"w": [["好处", "hǎochu", "lợi ích, điểm tốt"], ["机票", "jīpiào", "vé máy bay"], ["比较", "bǐjiào", "khá, tương đối"], ["舒服", "shūfu", "thoải mái"], ["窗外", "chuāng wài", "ngoài cửa sổ"], ["美丽", "měilì", "xinh đẹp"], ["部分", "bùfen", "phần"], ["国外", "guówài", "nước ngoài"], ["感受", "gǎnshòu", "cảm nhận"], ["经历", "jīnglì", "trải nghiệm"], ["经过", "jīngguò", "đi qua"], ["兴奋", "xīngfèn", "phấn khích"], ["旅行", "lǚxíng", "chuyến đi, du lịch"]], "g": [["比……贵/快", "So sánh với 比", "飞机比火车快。", "g2-bi"], ["虽然……但是……", "Tuy… nhưng…", "坐火车虽然慢，但是很便宜。", "g2-suiran"], ["一边……一边……", "Một bên… một bên…", "一边是高高的山，一边是蓝蓝的大海。", "g3-yibian"], ["总的来说", "Nói chung, tóm lại", "总的来说，我更喜欢坐火车。", ""]]}, "9": {"w": [["一般", "yìbān", "thường, thông thường"], ["轻松", "qīngsōng", "nhẹ nhàng, thoải mái"], ["首先", "shǒuxiān", "trước tiên"], ["查", "chá", "tra, kiểm tra"], ["目的地", "mùdìdì", "nơi đến, điểm đến"], ["厚", "hòu", "dày"], ["伞", "sǎn", "cái ô"], ["护照", "hùzhào", "hộ chiếu"], ["重要", "zhòngyào", "quan trọng"], ["充电器", "chōngdiànqì", "cục sạc"], ["药", "yào", "thuốc"], ["方便", "fāngbiàn", "tiện lợi"], ["酒店", "jiǔdiàn", "khách sạn"], ["当地", "dāngdì", "địa phương"], ["交流", "jiāoliú", "giao lưu, giao tiếp"]], "g": [["首先……其次……最后……", "Trước tiên… tiếp theo… cuối cùng…", "首先，我要查一下目的地的天气。", ""], ["如果……就……", "Nếu… thì…", "如果那里很冷，就要带厚衣服。", "g3-ruguo"], ["……的话", "Nếu… (khẩu ngữ)", "出国旅游的话，护照和机票是最重要的。", ""], ["这样……才……", "Như vậy… mới…", "这样旅游的时候才会轻松。", ""]]}, "10": {"w": [["梦想", "mèngxiǎng", "ước mơ"], ["成为", "chéngwéi", "trở thành"], ["翻译", "fānyì", "phiên dịch"], ["外语", "wàiyǔ", "ngoại ngữ"], ["感兴趣", "gǎn xìngqù", "hứng thú"], ["吸引", "xīyǐn", "thu hút"], ["意义", "yìyì", "ý nghĩa"], ["桥", "qiáo", "cây cầu"], ["合作", "hézuò", "hợp tác"], ["实现", "shíxiàn", "thực hiện"], ["困难", "kùnnan", "khó khăn"], ["放弃", "fàngqì", "từ bỏ"], ["实习", "shíxí", "thực tập"], ["积累", "jīlěi", "tích lũy"], ["经验", "jīngyàn", "kinh nghiệm"]], "g": [["对……感兴趣", "Hứng thú với…", "我从小就对外语很感兴趣。", ""], ["被", "Câu bị động", "我就被汉语吸引了。", "g3-bei"], ["为了……", "Để…", "为了实现这个梦想，我每天都在努力。", "g3-weile"], ["只要……就……", "Chỉ cần… thì…", "只要不放弃，总有一天我的梦想会实现。", ""]]}, "11": {"w": [["公司", "gōngsī", "công ty"], ["发展", "fāzhǎn", "phát triển"], ["行业", "hángyè", "ngành nghề"], ["环境", "huánjìng", "môi trường"], ["同事", "tóngshì", "đồng nghiệp"], ["合作", "hézuò", "hợp tác"], ["员工", "yuángōng", "nhân viên"], ["客户", "kèhù", "khách hàng"], ["文件", "wénjiàn", "tài liệu"], ["发挥", "fāhuī", "phát huy"], ["重视", "zhòngshì", "coi trọng"], ["培训", "péixùn", "đào tạo"], ["不断", "búduàn", "không ngừng"], ["任务", "rènwu", "nhiệm vụ"], ["成长", "chéngzhǎng", "trưởng thành"], ["经历", "jīnglì", "trải nghiệm"], ["解决", "jiějué", "giải quyết"]], "g": [["主要有以下几个原因", "Chủ yếu có mấy lý do sau", "我想进FIT公司工作，主要有以下几个原因。", ""], ["关于……", "Về…", "我在网上看了很多关于公司的介绍。", "g3-guanyu"], ["如果……一定……", "Nếu… nhất định…", "如果我有机会进入FIT公司，我一定会认真工作。", "g3-ruguo"], ["和……一起……", "Cùng với… làm gì", "我也希望能和公司一起成长。", ""]]}, "12": {"w": [["首都", "shǒudū", "thủ đô"], ["长城", "Chángchéng", "Vạn Lý Trường Thành"], ["现代", "xiàndài", "hiện đại"], ["历史", "lìshǐ", "lịch sử"], ["自然", "zìrán", "tự nhiên"], ["熊猫", "xióngmāo", "gấu trúc"], ["从小", "cóngxiǎo", "từ nhỏ"], ["有名", "yǒumíng", "nổi tiếng"], ["辣", "là", "cay"], ["听说", "tīngshuō", "nghe nói"], ["茶馆", "cháguǎn", "quán trà"], ["感受", "gǎnshòu", "cảm nhận"], ["少数民族", "shǎoshù mínzú", "dân tộc thiểu số"], ["丰富", "fēngfù", "phong phú"]], "g": [["首先……其次……", "Trước tiên… tiếp theo…", "首先是北京……其次是上海。", ""], ["像……一样", "Giống như…", "那里的山水像画一样美。", "g3-yiyang"], ["虽然……但是……", "Tuy… nhưng…", "虽然很辣，但是我很想试一试。", "g2-suiran"], ["V一V", "Lặp động từ (làm thử)", "我很想试一试。", "g3-chongdie"]]}, "13": {"w": [["留学", "liúxué", "du học"], ["主要", "zhǔyào", "chủ yếu"], ["原因", "yuányīn", "lý do"], ["进步", "jìnbù", "tiến bộ"], ["了解", "liǎojiě", "tìm hiểu, hiểu rõ"], ["节日", "jiérì", "ngày lễ"], ["传统", "chuántǒng", "truyền thống"], ["真正", "zhēnzhèng", "thực sự"], ["环境", "huánjìng", "môi trường"], ["关系", "guānxi", "quan hệ"], ["密切", "mìqiè", "mật thiết"], ["独立", "dúlì", "tự lập"], ["实现", "shíxiàn", "thực hiện"], ["梦想", "mèngxiǎng", "ước mơ"], ["帮助", "bāngzhù", "giúp đỡ"]], "g": [["只有……才……", "Chỉ có… mới…", "只有自己去那里生活，才能真正了解它。", "g3-zhiyou"], ["如果……一定……", "Nếu… nhất định…", "如果在中国，我的进步一定会很快。", "g3-ruguo"], ["不但……还……", "Không chỉ… còn…", "我不但能了解中国，还能了解很多其他国家的文化。", "g3-budan"], ["让 + người + 更……", "Khiến ai đó… hơn", "去国外留学可以让我更独立。", "g2-rang"]]}, "14": {"w": [["家乡", "jiāxiāng", "quê hương"], ["美丽", "měilì", "xinh đẹp"], ["种", "zhòng", "trồng"], ["散步", "sànbù", "đi dạo"], ["太极拳", "tàijíquán", "thái cực quyền"], ["朴实", "pǔshí", "chất phác"], ["问路", "wèn lù", "hỏi đường"], ["小吃", "xiǎochī", "món ăn vặt"], ["有名", "yǒumíng", "nổi tiếng"], ["海鲜", "hǎixiān", "hải sản"], ["想起", "xiǎngqǐ", "nhớ lại, nhớ đến"], ["灯笼", "dēnglong", "đèn lồng"], ["亲戚", "qīnqi", "họ hàng"], ["热闹", "rènao", "náo nhiệt"]], "g": [["有……也有……", "Có… cũng có…", "我的家乡有山也有水。", ""], ["V着", "Trạng thái kéo dài", "河的两边种着很多树。", "g2-zhe"], ["离……不远", "Cách… không xa", "离城市不远的地方还有海。", "g2-li"], ["不管……都……", "Dù… đều…", "不管我走到哪里，家乡永远是我心里最美的地方。", ""]]}, "15": {"w": [["牛肉粉", "niúròufěn", "phở bò"], ["之一", "zhī yī", "một trong những"], ["外国人", "wàiguórén", "người nước ngoài"], ["汤", "tāng", "nước dùng, canh"], ["骨头", "gǔtou", "xương"], ["香料", "xiāngliào", "gia vị"], ["煮", "zhǔ", "nấu, ninh"], ["味道", "wèidao", "mùi vị"], ["香", "xiāng", "thơm"], ["薄", "báo", "mỏng"], ["香菜", "xiāngcài", "rau mùi"], ["柠檬", "níngméng", "chanh"], ["辣椒", "làjiāo", "ớt"], ["老板", "lǎobǎn", "ông chủ"], ["暖和", "nuǎnhuo", "ấm áp"]], "g": [["又……又……", "Vừa… vừa…", "汤的味道又香又甜。", "g3-youyou"], ["……之一", "Một trong những…", "牛肉粉是越南最有名的菜之一。", ""], ["跟……学会", "Học được từ ai", "我还跟妈妈学会了做牛肉粉。", ""], ["V一V", "Thử làm gì", "如果你来越南，一定要试一试！", "g3-chongdie"]]}, "16": {"w": [["大概", "dàgài", "khoảng, đại khái"], ["方法", "fāngfǎ", "phương pháp"], ["生词", "shēngcí", "từ mới"], ["排队", "páiduì", "xếp hàng"], ["跟着", "gēnzhe", "theo, đi theo"], ["发音", "fāyīn", "phát âm"], ["声调", "shēngdiào", "thanh điệu"], ["练习", "liànxí", "luyện tập"], ["日记", "rìjì", "nhật ký"], ["语法", "yǔfǎ", "ngữ pháp"], ["坚持", "jiānchí", "kiên trì"], ["软件", "ruǎnjiàn", "phần mềm, ứng dụng"], ["山顶", "shāndǐng", "đỉnh núi"]], "g": [["比……更……", "So sánh hơn với 更", "方法比时间更重要。", "g2-bi"], ["把……写在……", "Câu chữ 把 chỉ vị trí", "我把生词写在小本子上。", "g3-ba"], ["只要……就……", "Chỉ cần… thì…", "只要每天坚持，我的汉语一定会越来越好。", ""], ["越来越……", "Càng ngày càng…", "我的汉语一定会越来越好。", "g3-yue"]]}, "17": {"w": [["习惯", "xíguàn", "thói quen"], ["比较", "bǐjiào", "khá"], ["刷牙", "shuāyá", "đánh răng"], ["空气", "kōngqì", "không khí"], ["新鲜", "xīnxiān", "trong lành, tươi"], ["周围", "zhōuwéi", "xung quanh"], ["安静", "ānjìng", "yên tĩnh"], ["打扰", "dǎrǎo", "làm phiền"], ["头脑", "tóunǎo", "đầu óc"], ["清楚", "qīngchu", "rõ ràng, minh mẫn"], ["精神", "jīngshen", "tinh thần, sức sống"], ["效果", "xiàoguǒ", "hiệu quả"], ["适合", "shìhé", "phù hợp"], ["大声", "dàshēng", "to tiếng"]], "g": [["有的人……有的人……", "Có người… có người…", "有的人喜欢早上学习，有的人喜欢晚上学习。", ""], ["以后，就……", "Sau khi… thì…", "洗脸刷牙以后，就开始学习一个小时。", ""], ["后来……", "Sau đó, về sau…", "后来我改成早上学习。", ""], ["当然", "Đương nhiên", "当然，晚上我也会花一点儿时间复习。", ""]]}, "18": {"w": [["高中", "gāozhōng", "cấp ba"], ["刚", "gāng", "vừa mới"], ["复杂", "fùzá", "phức tạp"], ["声调", "shēngdiào", "thanh điệu"], ["发现", "fāxiàn", "phát hiện, nhận ra"], ["故事", "gùshi", "câu chuyện"], ["发音", "fāyīn", "phát âm"], ["容易", "róngyì", "dễ"], ["字幕", "zìmù", "phụ đề"], ["邻居", "línjū", "láng giềng"], ["经济", "jīngjì", "kinh tế"], ["交流", "jiāoliú", "giao lưu"], ["新闻", "xīnwén", "tin tức"], ["进步", "jìnbù", "tiến bộ"]], "g": [["从……开始", "Bắt đầu từ…", "我从高中开始学汉语。", "g2-congdao"], ["越来越……", "Càng ngày càng…", "我发现汉语越来越有意思。", "g3-yue"], ["把……说错", "Câu chữ 把 + bổ ngữ kết quả", "我常常把第二声和第三声说错。", "g3-ba"], ["V下去", "Tiếp tục làm", "我会一直努力学下去。", "g3-xh"]]}, "19": {"w": [["考试", "kǎoshì", "thi"], ["复习", "fùxí", "ôn tập"], ["计划", "jìhuà", "kế hoạch"], ["内容", "nèiróng", "nội dung"], ["部分", "bùfen", "phần"], ["笔记", "bǐjì", "ghi chép"], ["重点", "zhòngdiǎn", "trọng điểm"], ["练习题", "liànxítí", "bài tập"], ["保证", "bǎozhèng", "bảo đảm"], ["准考证", "zhǔnkǎozhèng", "giấy báo dự thi"], ["橡皮", "xiàngpí", "cục tẩy"], ["紧张", "jǐnzhāng", "căng thẳng"], ["相信", "xiāngxìn", "tin tưởng"], ["发挥", "fāhuī", "phát huy"]], "g": [["首先……其次……然后……最后……", "Trước tiên… tiếp theo… sau đó… cuối cùng…", "首先，我会做一个复习计划。", "g3-xian"], ["把……分成……", "Chia cái gì thành…", "把要复习的内容分成几个部分。", "g3-ba"], ["不要……", "Đừng…", "最重要的是不要太紧张。", "g2-bie"], ["每……就……", "Cứ mỗi… thì…", "每学习一个小时就休息十分钟。", ""]]}, "20": {"w": [["希望", "xīwàng", "hy vọng"], ["幸福", "xìngfú", "hạnh phúc"], ["意义", "yìyì", "ý nghĩa"], ["辛苦", "xīnkǔ", "vất vả"], ["年纪", "niánjì", "tuổi tác"], ["除了", "chúle", "ngoài… ra"], ["挣", "zhèng", "kiếm (tiền)"], ["现实", "xiànshí", "hiện thực"], ["战争", "zhànzhēng", "chiến tranh"], ["和平", "hépíng", "hòa bình"], ["力量", "lìliang", "sức mạnh"], ["困难", "kùnnan", "khó khăn"], ["老人", "lǎorén", "người già"]], "g": [["如果没有……都……", "Nếu không có… thì đều…", "如果没有健康，这些都没有意义。", "g3-ruguo"], ["为了……", "Vì…", "爸爸妈妈为了我们，每天都工作得很辛苦。", "g3-weile"], ["越来越……", "Càng ngày càng…", "他们年纪越来越大了。", "g3-yue"], ["除了……还……", "Ngoài… còn…", "除了家人，我还有一个希望。", "g3-chule"]]}, "21": {"w": [["做客", "zuòkè", "làm khách, đến chơi"], ["准备", "zhǔnbèi", "chuẩn bị"], ["打扫", "dǎsǎo", "quét dọn"], ["超市", "chāoshì", "siêu thị"], ["饮料", "yǐnliào", "đồ uống"], ["点心", "diǎnxin", "bánh trái, điểm tâm"], ["欢迎", "huānyíng", "hoan nghênh"], ["倒", "dào", "rót"], ["春卷", "chūnjuǎn", "nem rán"], ["游戏", "yóuxì", "trò chơi"], ["附近", "fùjìn", "gần đây, lân cận"], ["送", "sòng", "tiễn; tặng"], ["舒服", "shūfu", "thoải mái, dễ chịu"], ["尝", "cháng", "nếm thử"], ["礼物", "lǐwù", "quà"], ["愉快", "yúkuài", "vui vẻ"]], "g": [["如果……会……", "Nếu… sẽ…", "如果朋友来我家做客，我会非常高兴。", "g3-ruguo"], ["在……之前", "Trước khi…", "在朋友来之前，我会先把房间打扫干净。", ""], ["先……然后……", "Trước… sau đó…", "我会先把房间打扫干净，然后去超市买东西。", "g3-xian"], ["把……打扫干净", "Câu chữ 把 + bổ ngữ kết quả", "我会先把房间打扫干净。", "g3-ba"]]}, "22": {"w": [["父母", "fùmǔ", "cha mẹ"], ["礼貌", "lǐmào", "lễ phép"], ["长辈", "zhǎngbèi", "bề trên, người lớn tuổi"], ["诚实", "chéngshí", "trung thực"], ["即使", "jíshǐ", "cho dù"], ["承认", "chéngrèn", "thừa nhận"], ["关心", "guānxīn", "quan tâm"], ["对待", "duìdài", "đối xử, đối đãi"], ["教育", "jiàoyù", "giáo dục"], ["爱护", "àihù", "bảo vệ, yêu quý"], ["环境", "huánjìng", "môi trường"], ["垃圾", "lājī", "rác"], ["节约", "jiéyuē", "tiết kiệm"], ["榜样", "bǎngyàng", "tấm gương"]], "g": [["不一定", "Không nhất thiết", "好孩子不一定是学习成绩最好的孩子。", ""], ["即使……也……", "Cho dù… cũng…", "即使做错了事，也要敢承认。", ""], ["只要……", "Chỉ cần…", "只要父母和老师好好教育他们。", ""], ["比如……", "Ví dụ…", "比如爸爸妈妈累了，可以帮他们做一些家务。", ""]]}, "23": {"w": [["通过", "tōngguò", "thông qua, thi đỗ"], ["差不多", "chàbuduō", "gần như, xấp xỉ"], ["背", "bèi", "học thuộc"], ["生词", "shēngcí", "từ mới"], ["放弃", "fàngqì", "bỏ cuộc"], ["鼓励", "gǔlì", "động viên"], ["坚持", "jiānchí", "kiên trì"], ["紧张", "jǐnzhāng", "căng thẳng"], ["成绩", "chéngjì", "điểm số"], ["庆祝", "qìngzhù", "chúc mừng"], ["明白", "míngbai", "hiểu"], ["收获", "shōuhuò", "thành quả"], ["成功", "chénggōng", "thành công"], ["回复", "huífù", "trả lời"]], "g": [["为了……", "Để…", "为了这个考试，我准备了差不多半年。", "g3-weile"], ["得 + bổ ngữ trình độ", "… đến mức…", "我高兴得跳了起来。", "g2-de"], ["只要……就……", "Chỉ cần… thì…", "只要努力，就一定会有收获。", ""], ["让 + người + 明白", "Khiến ai hiểu ra", "这件事让我明白了……", "g2-rang"]]}, "24": {"w": [["运动", "yùndòng", "thể thao, vận động"], ["羽毛球", "yǔmáoqiú", "cầu lông"], ["方便", "fāngbiàn", "tiện lợi"], ["球拍", "qiúpāi", "vợt"], ["全身", "quánshēn", "toàn thân"], ["汗", "hàn", "mồ hôi"], ["参加", "cānjiā", "tham gia"], ["比赛", "bǐsài", "thi đấu"], ["关系", "guānxi", "quan hệ"], ["心情", "xīnqíng", "tâm trạng"], ["坚持", "jiānchí", "kiên trì"], ["组织", "zǔzhī", "tổ chức"], ["体育", "tǐyù", "thể dục"]], "g": [["从……开始", "Bắt đầu từ…", "我从小学就开始打羽毛球。", "g2-congdao"], ["只要……就……", "Chỉ cần… là…", "只要有两个球拍、一个球，就可以打。", ""], ["越来越……", "Càng ngày càng…", "大家关系越来越好。", "g3-yue"], ["V下去", "Tiếp tục làm", "我会一直坚持下去。", "g3-xh"]]}, "25": {"w": [["家务", "jiāwù", "việc nhà"], ["切", "qiē", "thái, cắt"], ["洗碗", "xǐ wǎn", "rửa bát"], ["擦", "cā", "lau"], ["负责", "fùzé", "phụ trách"], ["扫地", "sǎo dì", "quét nhà"], ["收拾", "shōushi", "dọn dẹp"], ["单子", "dānzi", "tờ danh sách"], ["蔬菜", "shūcài", "rau"], ["晒", "shài", "phơi"], ["信息", "xìnxī", "tin nhắn, thông tin"], ["本领", "běnlǐng", "kỹ năng, bản lĩnh"], ["样子", "yàngzi", "dáng vẻ"]], "g": [["让 + người + V", "Nhờ/bảo ai làm gì", "妈妈有时候会让我帮她做一些家务。", "g2-rang"], ["把……收拾干净", "Câu chữ 把 + kết quả", "还要把自己的房间收拾干净。", "g3-ba"], ["从那以后", "Từ đó trở đi", "从那以后，我更愿意帮妈妈做事了。", ""], ["虽然……但是……", "Tuy… nhưng…", "虽然菜做得不太好吃，但是妈妈吃得很开心。", "g2-suiran"]]}, "26": {"w": [["锻炼", "duànliàn", "rèn luyện"], ["身体", "shēntǐ", "cơ thể, sức khỏe"], ["以前", "yǐqián", "trước đây"], ["差", "chà", "kém"], ["感冒", "gǎnmào", "cảm"], ["医生", "yīshēng", "bác sĩ"], ["附近", "fùjìn", "gần đây"], ["简单", "jiǎndān", "đơn giản"], ["坚持", "jiānchí", "kiên trì"], ["变化", "biànhuà", "thay đổi"], ["精神", "jīngshen", "tinh thần"], ["气氛", "qìfēn", "bầu không khí"], ["健康", "jiànkāng", "khỏe mạnh"]], "g": [["一……就是……", "Hễ… là… (nhấn mạnh lâu)", "常常坐在电脑前，一坐就是几个小时。", ""], ["从那以后", "Từ đó trở đi", "从那以后，我就开始每天锻炼身体了。", ""], ["比……好得多", "Tốt hơn nhiều so với…", "每天运动一点儿，比一个星期运动一次好得多。", "g2-bi"], ["如果……就……", "Nếu… thì…", "如果下雨不能出去，我就在房间里做一些简单的运动。", "g3-ruguo"]]}, "27": {"w": [["早睡早起", "zǎo shuì zǎo qǐ", "ngủ sớm dậy sớm"], ["休息", "xiūxi", "nghỉ ngơi"], ["年轻人", "niánqīngrén", "người trẻ"], ["头疼", "tóuténg", "đau đầu"], ["呼吸", "hūxī", "hít thở"], ["空气", "kōngqì", "không khí"], ["效率", "xiàolǜ", "hiệu suất"], ["牢", "láo", "chắc, bền"], ["熬夜", "áoyè", "thức khuya"], ["建议", "jiànyì", "đề nghị, khuyên"], ["养成", "yǎngchéng", "hình thành (thói quen)"], ["习惯", "xíguàn", "thói quen"], ["容易", "róngyì", "dễ"], ["睡着", "shuìzháo", "ngủ thiếp đi"]], "g": [["如果……就……", "Nếu… thì…", "如果常常睡得很晚，身体就会越来越差。", "g3-ruguo"], ["又……又……", "Vừa… vừa…", "学习，记得又快又牢。", "g3-youyou"], ["V到……", "Làm đến (thời điểm)", "很多年轻人晚上玩手机玩到一两点。", ""], ["并不……", "Hoàn toàn không…", "要做到早睡早起并不容易。", ""]]}, "28": {"w": [["安排", "ānpái", "sắp xếp"], ["意义", "yìyì", "ý nghĩa"], ["陪", "péi", "ở bên, đi cùng"], ["市场", "shìchǎng", "chợ"], ["顿", "dùn", "bữa (lượng từ)"], ["风景", "fēngjǐng", "phong cảnh"], ["火锅", "huǒguō", "lẩu"], ["留", "liú", "để lại, dành"], ["日记", "rìjì", "nhật ký"], ["用心", "yòngxīn", "chú tâm"], ["珍惜", "zhēnxī", "trân trọng"], ["陪伴", "péibàn", "ở bên, đồng hành"], ["后悔", "hòuhuǐ", "hối hận"]], "g": [["如果给我……我会……", "Nếu cho tôi… tôi sẽ…", "如果给我三天时间，我想好好安排一下。", "g3-ruguo"], ["一边……一边……", "Vừa… vừa…", "我们一家人坐在一起，一边喝茶一边聊天。", "g3-yibian"], ["虽然……但是……", "Tuy… nhưng…", "三天时间虽然不长，但是如果用心安排，就能过得很快乐。", "g2-suiran"], ["才不会……", "Mới không…", "多花时间陪伴他们，才不会后悔。", "g3-cai"]]}, "29": {"w": [["选择", "xuǎnzé", "lựa chọn"], ["分享", "fēnxiǎng", "chia sẻ"], ["影响", "yǐngxiǎng", "ảnh hưởng"], ["关心", "guānxīn", "quan tâm"], ["当", "dāng", "làm, trở thành"], ["耐心", "nàixīn", "kiên nhẫn"], ["积累", "jīlěi", "tích lũy"], ["经验", "jīngyàn", "kinh nghiệm"], ["家教", "jiājiào", "gia sư"], ["成就感", "chéngjiùgǎn", "cảm giác thành tựu"], ["确定", "quèdìng", "chắc chắn"], ["需要", "xūyào", "cần"]], "g": [["对……的影响很大", "Có ảnh hưởng lớn đến…", "我的中学汉语老师对我的影响很大。", ""], ["因为……才……", "Vì… mới…", "因为她，我才开始喜欢汉语。", "g3-cai"], ["不但……还……", "Không những… còn…", "不但要有很高的汉语水平，还要有耐心。", "g3-budan"], ["为……做好准备", "Chuẩn bị tốt cho…", "为以后的工作做好准备。", ""]]}, "30": {"w": [["之一", "zhī yī", "một trong những"], ["小说", "xiǎoshuō", "tiểu thuyết"], ["爱情", "àiqíng", "tình yêu"], ["家庭", "jiātíng", "gia đình"], ["好像", "hǎoxiàng", "hình như, giống như"], ["历史", "lìshǐ", "lịch sử"], ["发生", "fāshēng", "xảy ra"], ["简单", "jiǎndān", "đơn giản"], ["词典", "cídiǎn", "từ điển"], ["想法", "xiǎngfǎ", "suy nghĩ"], ["聪明", "cōngming", "thông minh"], ["丰富", "fēngfù", "phong phú"], ["书架", "shūjià", "giá sách"], ["交换", "jiāohuàn", "trao đổi"], ["讨论", "tǎolùn", "thảo luận"]], "g": [["……之一", "Một trong những…", "看书是我最大的爱好之一。", ""], ["关于……的", "Về…", "特别是关于爱情和家庭的小说。", "g3-guanyu"], ["不但……还……", "Không những… còn…", "看中文书不但可以学到新词，还可以了解中国人的想法。", "g3-budan"], ["让 + người + 变得……", "Khiến ai trở nên…", "多看书可以让人变得更聪明。", "g2-rang"]]}, "31": {"w": [["颜色", "yánsè", "màu sắc"], ["蓝色", "lánsè", "màu xanh lam"], ["天空", "tiānkōng", "bầu trời"], ["平静", "píngjìng", "bình yên"], ["舒服", "shūfu", "dễ chịu"], ["严肃", "yánsù", "nghiêm nghị"], ["性格", "xìnggé", "tính cách"], ["墙", "qiáng", "bức tường"], ["浅", "qiǎn", "nhạt"], ["深", "shēn", "đậm, sâu"], ["窗帘", "chuānglián", "rèm cửa"], ["选择", "xuǎnzé", "lựa chọn"], ["代表", "dàibiǎo", "tượng trưng"], ["好运", "hǎoyùn", "may mắn"]], "g": [["不像……那么……", "Không… như…", "它不像红色那么热情。", "g3-meiyou"], ["让 + người + 想到", "Khiến ai nghĩ đến", "因为它让我想到天空和大海。", "g2-rang"], ["变得……", "Trở nên…", "心情就会变得很平静。", ""], ["……的时候", "Khi…", "学习累了或者不开心的时候，我喜欢看看蓝色的天空。", ""]]}, "32": {"w": [["生活", "shēnghuó", "cuộc sống"], ["看法", "kànfǎ", "quan điểm"], ["其实", "qíshí", "thực ra"], ["简单", "jiǎndān", "đơn giản"], ["健康", "jiànkāng", "khỏe mạnh"], ["真心", "zhēnxīn", "chân thành"], ["难过", "nánguò", "buồn"], ["满足", "mǎnzú", "bằng lòng, biết đủ"], ["比", "bǐ", "so sánh"], ["保持", "bǎochí", "giữ gìn"], ["困难", "kùnnan", "khó khăn"], ["感谢", "gǎnxiè", "biết ơn"], ["美好", "měihǎo", "tươi đẹp"]], "g": [["有的人……有的人……", "Có người… có người…", "有的人觉得有很多钱就是快乐，有的人觉得有名就是快乐。", ""], ["……才能……", "… mới có thể…", "身体好了，才能做自己想做的事情。", "g3-cai"], ["如果总是……就……", "Nếu cứ… thì…", "如果总是跟别人比，就很难快乐。", "g3-ruguo"], ["对我来说", "Đối với tôi", "对我来说，……这就是快乐。", ""]]}};
// Từ trong bài nói chưa có trong từ điển HSK của website (bổ sung để tra được)
export const SPEAK_DICT = [["专业", "zhuānyè", "chuyên ngành"], ["性格", "xìnggé", "tính cách"], ["开朗", "kāilǎng", "cởi mở, vui vẻ"], ["交朋友", "jiāo péngyou", "kết bạn"], ["优点", "yōudiǎn", "ưu điểm"], ["缺点", "quēdiǎn", "nhược điểm"], ["计划", "jìhuà", "kế hoạch"], ["俱乐部", "jùlèbù", "câu lạc bộ"], ["信心", "xìnxīn", "lòng tin, sự tự tin"], ["从来", "cónglái", "từ trước đến nay"], ["鼓励", "gǔlì", "khích lệ, động viên"], ["诚实", "chéngshí", "trung thực"], ["外地", "wàidì", "nơi khác, tỉnh khác"], ["提前", "tíqián", "trước, sớm hơn"], ["满足", "mǎnzú", "thỏa mãn, mãn nguyện"], ["幸福", "xìngfú", "hạnh phúc"], ["戴", "dài", "đeo (kính, mũ)"], ["温柔", "wēnróu", "dịu dàng"], ["耐心", "nàixīn", "kiên nhẫn"], ["内容", "nèiróng", "nội dung"], ["组织", "zǔzhī", "tổ chức"], ["活动", "huódòng", "hoạt động"], ["成为", "chéngwéi", "trở thành"], ["咖啡馆", "kāfēiguǎn", "quán cà phê"], ["不同", "bùtóng", "khác nhau"], ["爱心", "àixīn", "lòng nhân ái"], ["志愿者", "zhìyuànzhě", "tình nguyện viên"], ["意义", "yìyì", "ý nghĩa"], ["真心", "zhēnxīn", "thật lòng"], ["敢", "gǎn", "dám"], ["成功", "chénggōng", "thành công"], ["开心", "kāixīn", "vui vẻ"], ["同时", "tóngshí", "đồng thời"], ["对待", "duìdài", "đối xử"], ["不管", "bùguǎn", "bất kể, dù"], ["幸运", "xìngyùn", "may mắn"], ["平时", "píngshí", "bình thường, thường ngày"], ["互相", "hùxiāng", "lẫn nhau"], ["饭馆", "fànguǎn", "quán ăn"], ["家乡", "jiāxiāng", "quê hương"], ["海边", "hǎibiān", "bờ biển"], ["鼓励", "gǔlì", "động viên"], ["加油", "jiāyóu", "cố lên"], ["做客", "zuòkè", "làm khách, đến chơi"], ["点心", "diǎnxin", "bánh trái, điểm tâm"], ["倒", "dào", "rót"], ["春卷", "chūnjuǎn", "nem rán"], ["尝", "cháng", "nếm thử"], ["愉快", "yúkuài", "vui vẻ"], ["选", "xuǎn", "chọn"], ["原因", "yuányīn", "nguyên nhân, lý do"], ["风景", "fēngjǐng", "phong cảnh"], ["晒太阳", "shài tàiyáng", "tắm nắng"], ["沙滩", "shātān", "bãi cát"], ["海鲜", "hǎixiān", "hải sản"], ["友好", "yǒuhǎo", "thân thiện"], ["压力", "yālì", "áp lực"], ["日出", "rìchū", "bình minh, mặt trời mọc"], ["好处", "hǎochu", "lợi ích, điểm tốt"], ["窗外", "chuāng wài", "ngoài cửa sổ"], ["美丽", "měilì", "xinh đẹp"], ["部分", "bùfen", "phần"], ["感受", "gǎnshòu", "cảm nhận"], ["经历", "jīnglì", "trải nghiệm"], ["兴奋", "xīngfèn", "phấn khích"], ["旅行", "lǚxíng", "chuyến đi, du lịch"], ["轻松", "qīngsōng", "nhẹ nhàng, thoải mái"], ["首先", "shǒuxiān", "trước tiên"], ["查", "chá", "tra, kiểm tra"], ["目的地", "mùdìdì", "nơi đến, điểm đến"], ["厚", "hòu", "dày"], ["充电器", "chōngdiànqì", "cục sạc"], ["酒店", "jiǔdiàn", "khách sạn"], ["当地", "dāngdì", "địa phương"], ["交流", "jiāoliú", "giao lưu, giao tiếp"], ["首都", "shǒudū", "thủ đô"], ["长城", "Chángchéng", "Vạn Lý Trường Thành"], ["现代", "xiàndài", "hiện đại"], ["自然", "zìrán", "tự nhiên"], ["从小", "cóngxiǎo", "từ nhỏ"], ["听说", "tīngshuō", "nghe nói"], ["茶馆", "cháguǎn", "quán trà"], ["少数民族", "shǎoshù mínzú", "dân tộc thiểu số"], ["丰富", "fēngfù", "phong phú"], ["原因", "yuányīn", "lý do"], ["进步", "jìnbù", "tiến bộ"], ["传统", "chuántǒng", "truyền thống"], ["真正", "zhēnzhèng", "thực sự"], ["密切", "mìqiè", "mật thiết"], ["独立", "dúlì", "tự lập"], ["实现", "shíxiàn", "thực hiện"], ["梦想", "mèngxiǎng", "ước mơ"], ["大概", "dàgài", "khoảng, đại khái"], ["方法", "fāngfǎ", "phương pháp"], ["生词", "shēngcí", "từ mới"], ["排队", "páiduì", "xếp hàng"], ["跟着", "gēnzhe", "theo, đi theo"], ["发音", "fāyīn", "phát âm"], ["声调", "shēngdiào", "thanh điệu"], ["日记", "rìjì", "nhật ký"], ["语法", "yǔfǎ", "ngữ pháp"], ["坚持", "jiānchí", "kiên trì"], ["软件", "ruǎnjiàn", "phần mềm, ứng dụng"], ["山顶", "shāndǐng", "đỉnh núi"], ["周围", "zhōuwéi", "xung quanh"], ["打扰", "dǎrǎo", "làm phiền"], ["头脑", "tóunǎo", "đầu óc"], ["精神", "jīngshen", "tinh thần, sức sống"], ["效果", "xiàoguǒ", "hiệu quả"], ["适合", "shìhé", "phù hợp"], ["高中", "gāozhōng", "cấp ba"], ["复杂", "fùzá", "phức tạp"], ["字幕", "zìmù", "phụ đề"], ["经济", "jīngjì", "kinh tế"], ["交流", "jiāoliú", "giao lưu"], ["笔记", "bǐjì", "ghi chép"], ["重点", "zhòngdiǎn", "trọng điểm"], ["练习题", "liànxítí", "bài tập"], ["保证", "bǎozhèng", "bảo đảm"], ["准考证", "zhǔnkǎozhèng", "giấy báo dự thi"], ["橡皮", "xiàngpí", "cục tẩy"], ["紧张", "jǐnzhāng", "căng thẳng"], ["发挥", "fāhuī", "phát huy"], ["之一", "zhī yī", "một trong những"], ["小说", "xiǎoshuō", "tiểu thuyết"], ["爱情", "àiqíng", "tình yêu"], ["家庭", "jiātíng", "gia đình"], ["好像", "hǎoxiàng", "hình như, giống như"], ["发生", "fāshēng", "xảy ra"], ["词典", "cídiǎn", "từ điển"], ["书架", "shūjià", "giá sách"], ["交换", "jiāohuàn", "trao đổi"], ["讨论", "tǎolùn", "thảo luận"], ["翻译", "fānyì", "phiên dịch"], ["吸引", "xīyǐn", "thu hút"], ["桥", "qiáo", "cây cầu"], ["合作", "hézuò", "hợp tác"], ["困难", "kùnnan", "khó khăn"], ["放弃", "fàngqì", "từ bỏ"], ["实习", "shíxí", "thực tập"], ["积累", "jīlěi", "tích lũy"], ["经验", "jīngyàn", "kinh nghiệm"], ["发展", "fāzhǎn", "phát triển"], ["行业", "hángyè", "ngành nghề"], ["员工", "yuángōng", "nhân viên"], ["客户", "kèhù", "khách hàng"], ["文件", "wénjiàn", "tài liệu"], ["重视", "zhòngshì", "coi trọng"], ["培训", "péixùn", "đào tạo"], ["不断", "búduàn", "không ngừng"], ["任务", "rènwu", "nhiệm vụ"], ["成长", "chéngzhǎng", "trưởng thành"], ["辛苦", "xīnkǔ", "vất vả"], ["年纪", "niánjì", "tuổi tác"], ["挣", "zhèng", "kiếm (tiền)"], ["现实", "xiànshí", "hiện thực"], ["战争", "zhànzhēng", "chiến tranh"], ["和平", "hépíng", "hòa bình"], ["力量", "lìliang", "sức mạnh"], ["安排", "ānpái", "sắp xếp"], ["市场", "shìchǎng", "chợ"], ["顿", "dùn", "bữa (lượng từ)"], ["火锅", "huǒguō", "lẩu"], ["留", "liú", "để lại, dành"], ["用心", "yòngxīn", "chú tâm"], ["珍惜", "zhēnxī", "trân trọng"], ["陪伴", "péibàn", "ở bên, đồng hành"], ["后悔", "hòuhuǐ", "hối hận"], ["分享", "fēnxiǎng", "chia sẻ"], ["家教", "jiājiào", "gia sư"], ["成就感", "chéngjiùgǎn", "cảm giác thành tựu"], ["确定", "quèdìng", "chắc chắn"], ["太极拳", "tàijíquán", "thái cực quyền"], ["朴实", "pǔshí", "chất phác"], ["问路", "wèn lù", "hỏi đường"], ["小吃", "xiǎochī", "món ăn vặt"], ["想起", "xiǎngqǐ", "nhớ lại, nhớ đến"], ["灯笼", "dēnglong", "đèn lồng"], ["亲戚", "qīnqi", "họ hàng"], ["父母", "fùmǔ", "cha mẹ"], ["礼貌", "lǐmào", "lễ phép"], ["长辈", "zhǎngbèi", "bề trên, người lớn tuổi"], ["即使", "jíshǐ", "cho dù"], ["承认", "chéngrèn", "thừa nhận"], ["对待", "duìdài", "đối xử, đối đãi"], ["教育", "jiàoyù", "giáo dục"], ["爱护", "àihù", "bảo vệ, yêu quý"], ["垃圾", "lājī", "rác"], ["节约", "jiéyuē", "tiết kiệm"], ["榜样", "bǎngyàng", "tấm gương"], ["家务", "jiāwù", "việc nhà"], ["切", "qiē", "thái, cắt"], ["洗碗", "xǐ wǎn", "rửa bát"], ["擦", "cā", "lau"], ["负责", "fùzé", "phụ trách"], ["扫地", "sǎo dì", "quét nhà"], ["收拾", "shōushi", "dọn dẹp"], ["单子", "dānzi", "tờ danh sách"], ["蔬菜", "shūcài", "rau"], ["晒", "shài", "phơi"], ["信息", "xìnxī", "tin nhắn, thông tin"], ["本领", "běnlǐng", "kỹ năng, bản lĩnh"], ["样子", "yàngzi", "dáng vẻ"], ["羽毛球", "yǔmáoqiú", "cầu lông"], ["球拍", "qiúpāi", "vợt"], ["全身", "quánshēn", "toàn thân"], ["汗", "hàn", "mồ hôi"], ["精神", "jīngshen", "tinh thần"], ["气氛", "qìfēn", "bầu không khí"], ["早睡早起", "zǎo shuì zǎo qǐ", "ngủ sớm dậy sớm"], ["年轻人", "niánqīngrén", "người trẻ"], ["头疼", "tóuténg", "đau đầu"], ["呼吸", "hūxī", "hít thở"], ["效率", "xiàolǜ", "hiệu suất"], ["牢", "láo", "chắc, bền"], ["熬夜", "áoyè", "thức khuya"], ["建议", "jiànyì", "đề nghị, khuyên"], ["养成", "yǎngchéng", "hình thành (thói quen)"], ["睡着", "shuìzháo", "ngủ thiếp đi"], ["牛肉粉", "niúròufěn", "phở bò"], ["外国人", "wàiguórén", "người nước ngoài"], ["汤", "tāng", "nước dùng, canh"], ["骨头", "gǔtou", "xương"], ["香料", "xiāngliào", "gia vị"], ["煮", "zhǔ", "nấu, ninh"], ["味道", "wèidao", "mùi vị"], ["香", "xiāng", "thơm"], ["薄", "báo", "mỏng"], ["香菜", "xiāngcài", "rau mùi"], ["柠檬", "níngméng", "chanh"], ["辣椒", "làjiāo", "ớt"], ["老板", "lǎobǎn", "ông chủ"], ["暖和", "nuǎnhuo", "ấm áp"], ["通过", "tōngguò", "thông qua, thi đỗ"], ["差不多", "chàbuduō", "gần như, xấp xỉ"], ["背", "bèi", "học thuộc"], ["放弃", "fàngqì", "bỏ cuộc"], ["庆祝", "qìngzhù", "chúc mừng"], ["收获", "shōuhuò", "thành quả"], ["回复", "huífù", "trả lời"], ["蓝色", "lánsè", "màu xanh lam"], ["天空", "tiānkōng", "bầu trời"], ["平静", "píngjìng", "bình yên"], ["严肃", "yánsù", "nghiêm nghị"], ["墙", "qiáng", "bức tường"], ["浅", "qiǎn", "nhạt"], ["深", "shēn", "đậm, sâu"], ["窗帘", "chuānglián", "rèm cửa"], ["代表", "dàibiǎo", "tượng trưng"], ["好运", "hǎoyùn", "may mắn"], ["生活", "shēnghuó", "cuộc sống"], ["看法", "kànfǎ", "quan điểm"], ["真心", "zhēnxīn", "chân thành"], ["满足", "mǎnzú", "bằng lòng, biết đủ"], ["保持", "bǎochí", "giữ gìn"], ["美好", "měihǎo", "tươi đẹp"]];
