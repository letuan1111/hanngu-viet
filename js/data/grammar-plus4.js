// Điểm ngữ pháp mới (phần 1): hư từ HSK 1–2 và câu hỏi chính phản. Định dạng: xem cuối js/data/grammar.js
export const GP4 = `
@@g1-he|1|Liên từ 和 (và)|A + 和 + B|和|hu
=和 nối hai danh từ, đại từ hoặc cụm danh từ ngang hàng: "A và B". Còn làm giới từ "với" (= 跟).
?Liệt kê người, vật; nói làm việc gì với ai: 和 + người + 一起 + V.
~和 thường không nối hai câu hoặc hai động từ: không nói "我吃饭和看电视"; nối câu dùng 也/还/而且.
!我吃饭和看电视。|我吃饭，也看电视。|和 không nối hai cụm động từ / hai câu.
!我有哥哥和我有姐姐。|我有哥哥和姐姐。|和 nối danh từ, không nối cả câu.
>g2-gen|跟 dùng nhiều trong khẩu ngữ, 和 dùng cả khẩu ngữ lẫn văn viết.
^Gia đình, bạn bè
#Nối hai danh từ|A 和 B
我和你都是学生。|Tôi và bạn đều là học sinh.
我家有爸爸、妈妈和我。|Nhà tôi có bố, mẹ và tôi.
我喜欢苹果和香蕉。|Tôi thích táo và chuối.
桌子上有书和笔。|Trên bàn có sách và bút.
#Liệt kê nhiều thứ: 和 đứng trước cái cuối|A、B 和 C
我会说汉语、英语和越南语。|Tôi biết nói tiếng Trung, tiếng Anh và tiếng Việt.
她买了面包、牛奶和鸡蛋。|Cô ấy mua bánh mì, sữa và trứng.
#Giới từ: cùng với ai|和 + người + (一起) + V
我和朋友一起去看电影。|Tôi cùng bạn đi xem phim.
我想和你说几句话。|Tôi muốn nói với bạn vài câu.
周末我常常和家人一起吃饭。|Cuối tuần tôi thường ăn cơm cùng gia đình.
#和 + người + 结婚/见面/聊天|Động từ cần người cùng làm
她下个月和男朋友结婚。|Tháng sau cô ấy kết hôn với bạn trai.
我明天和他见面。|Ngày mai tôi gặp anh ấy.
#Quan hệ, so sánh|A 和 B 一样 / 不一样 / 有关系
我的想法和你一样。|Suy nghĩ của tôi giống bạn.
这件事和你没关系。|Chuyện này không liên quan đến bạn.
#Nối tính từ (văn viết)|Adj 和 Adj
这里的人很热情和友好。|Người ở đây rất nhiệt tình và thân thiện.
#Phủ định|不/没 + 和 + người + V
我没和他说话。|Tôi không nói chuyện với anh ấy.
我不想和他一起去。|Tôi không muốn đi cùng anh ấy.
#Câu hỏi|和谁 + V？
你和谁一起来的？|Bạn đến cùng với ai?
你周末和谁去爬山？|Cuối tuần bạn đi leo núi với ai?
#Phân biệt 和 / 也|也 nối hai câu
我喜欢喝茶，也喜欢喝咖啡。|Tôi thích uống trà, cũng thích uống cà phê.

@@g1-vbuv|1|Câu hỏi chính phản V不V / Adj不Adj|V + 不 + V？/ Adj + 不 + Adj？|不|
=Đặt khẳng định và phủ định cạnh nhau để hỏi "có… không?". Nghĩa giống câu hỏi 吗 nhưng tự nhiên hơn trong khẩu ngữ; cuối câu không dùng 吗.
?Hỏi ý muốn, tình trạng, sự thật: 你去不去？今天冷不冷？你是不是中国人？
~Cuối câu chính phản không thêm 吗. Không dùng 很 trước tính từ: không nói 很好不好.
!你去不去吗？|你去不去？|Câu chính phản không thêm 吗.
!这个很贵不贵？|这个贵不贵？|Không dùng 很 trong câu hỏi chính phản.
>g1-ma|吗 đặt cuối câu; V不V đặt ở vị ngữ.
#Động từ|V + 不 + V
你去不去？|Bạn có đi không?
你喝不喝咖啡？|Bạn có uống cà phê không?
你认识不认识他？|Bạn có quen anh ấy không?
#Tính từ|Adj + 不 + Adj
今天冷不冷？|Hôm nay có lạnh không?
这个菜辣不辣？|Món này có cay không?
你忙不忙？|Bạn có bận không?
#是不是|是不是 + … / …，是不是？
你是不是中国人？|Bạn có phải là người Trung Quốc không?
你是不是不舒服？|Có phải bạn không khỏe không?
他明天来，是不是？|Mai anh ấy đến, phải không?
#有没有|有没有 + danh từ / V + 没有
你有没有时间？|Bạn có thời gian không?
你吃饭了没有？|Bạn ăn cơm chưa?
你去过中国没有？|Bạn đã từng đi Trung Quốc chưa?
#Động từ năng nguyện|会不会 / 能不能 / 想不想 / 要不要 / 可(以)不可以
你会不会说汉语？|Bạn có biết nói tiếng Trung không?
你能不能帮我一下？|Bạn có thể giúp tôi một chút không?
你想不想去旅游？|Bạn có muốn đi du lịch không?
我可以不可以进去？|Tôi có thể vào không?
#Động từ hai âm tiết|AB不AB / A不AB
你喜欢不喜欢这本书？|Bạn có thích quyển sách này không?
你喜不喜欢吃饺子？|Bạn có thích ăn sủi cảo không?
#Có tân ngữ|V不V + O / V + O + 不 + V
你去不去北京？/ 你去北京不去？|Bạn có đi Bắc Kinh không?
#Với bổ ngữ trình độ|V得 + Adj不Adj
他说得快不快？|Anh ấy nói có nhanh không?
#Trả lời|Dùng khẳng định hoặc phủ định
你累不累？——不累。|Bạn có mệt không? — Không mệt.

@@g2-dui|2|Giới từ 对 (đối với, với)|对 + người/vật + V/Adj|对|hu
=对 giới thiệu đối tượng của hành động hoặc thái độ: "đối với, với". Còn có nghĩa "đúng" (tính từ).
?对 + người + 说/笑/好；对…感兴趣；对…来说；对…有好处.
~对 + người + 说 (nói với ai) khác 给 + người + 打电话 (gọi cho ai).
!我对他打电话。|我给他打电话。|"Gọi điện cho ai" dùng 给, không dùng 对.
!我感兴趣对中国文化。|我对中国文化感兴趣。|Cụm 对… phải đứng trước 感兴趣.
>g2-gei|对: hướng tới đối tượng; 给: làm cho ai.
#Hướng hành động tới ai|对 + người + 说/笑/点头
他对我说："谢谢你。"|Anh ấy nói với tôi: "Cảm ơn bạn."
她对我笑了笑。|Cô ấy mỉm cười với tôi.
老师对我们很好。|Thầy giáo đối xử với chúng tôi rất tốt.
#Thái độ, cảm xúc đối với|对 + O + 感兴趣 / 满意 / 熟悉 / 了解
我对中国文化很感兴趣。|Tôi rất hứng thú với văn hóa Trung Quốc.
经理对我的工作很满意。|Giám đốc rất hài lòng với công việc của tôi.
我对这个城市不太熟悉。|Tôi không quen thuộc thành phố này lắm.
#Có lợi / có hại cho|对 + O + 有好处 / 不好
多运动对身体有好处。|Vận động nhiều có lợi cho sức khỏe.
抽烟对身体不好。|Hút thuốc không tốt cho sức khỏe.
多看书对学习有帮助。|Đọc nhiều sách có ích cho việc học.
#Đối với ai mà nói|对 + người + 来说
对我来说，汉语不太难。|Đối với tôi mà nói, tiếng Trung không khó lắm.
对孩子来说，玩儿很重要。|Đối với trẻ con, chơi đùa rất quan trọng.
#对 (tính từ): đúng|
你说得对。|Bạn nói đúng.
对不起，我来晚了。|Xin lỗi, tôi đến muộn.
这个答案对不对？|Đáp án này có đúng không?
#对 + vấn đề + có ý kiến|对…有意见 / 有看法
你对这件事有什么看法？|Bạn có suy nghĩ gì về chuyện này?
#Phủ định|对 + O + 不感兴趣 / 不满意
他对足球不感兴趣。|Anh ấy không hứng thú với bóng đá.
#对面 / 对了 (từ ghép)|
银行在学校对面。|Ngân hàng ở đối diện trường học.
对了，明天你来吗？|À đúng rồi, mai bạn có đến không?

@@g2-gen|2|Giới từ 跟 (với, cùng với)|跟 + người + (一起) + V|跟|hu
=跟 giới thiệu người cùng làm hoặc đối tượng của hành động: "với, cùng với". Dùng nhiều trong khẩu ngữ.
?跟…一起；跟…说/学/借；跟…一样；跟…没关系.
~跟 + người + 学 (học từ ai). Không nói 跟 + người + 打电话 khi nghĩa là "gọi cho ai" (dùng 给).
!我跟他打电话。|我给他打电话。|"Gọi điện cho ai" dùng 给.
!我一起跟他去。|我跟他一起去。|跟 + người đứng trước 一起.
>g1-he|和 và 跟 đều nghĩa "với"; 跟 thiên khẩu ngữ.
#Cùng làm|跟 + người + 一起 + V
我跟妈妈一起去超市。|Tôi cùng mẹ đi siêu thị.
你跟我一起去吧。|Bạn đi cùng tôi đi.
他每天跟朋友一起跑步。|Ngày nào anh ấy cũng chạy bộ cùng bạn.
#Nói với ai|跟 + người + 说/聊/商量
我跟你说一件事。|Tôi nói với bạn một chuyện.
你跟老师说了吗？|Bạn đã nói với thầy giáo chưa?
这件事我要跟家人商量一下。|Chuyện này tôi phải bàn với gia đình một chút.
#Học, mượn từ ai|跟 + người + 学/借
我跟中国朋友学汉语。|Tôi học tiếng Trung với bạn người Trung Quốc.
我跟他借了一本书。|Tôi mượn của anh ấy một quyển sách.
#So sánh|跟 + B + 一样 / 不一样 / 差不多
我的手机跟你的一样。|Điện thoại của tôi giống của bạn.
他的爱好跟我不一样。|Sở thích của anh ấy khác tôi.
#Quan hệ|跟 + O + 有关系 / 没关系
这件事跟我没关系。|Chuyện này không liên quan đến tôi.
#Gặp gỡ, kết hôn|跟 + người + 见面/结婚/分手
我明天跟她见面。|Ngày mai tôi gặp cô ấy.
#Phủ định|不/没 + 跟 + người + V
我没跟他说过这件事。|Tôi chưa từng nói chuyện này với anh ấy.
他不想跟我们一起去。|Anh ấy không muốn đi cùng chúng tôi.
#Câu hỏi|跟谁 + V？
你跟谁学的汉语？|Bạn học tiếng Trung với ai?
你周末跟谁一起玩儿？|Cuối tuần bạn chơi với ai?
#跟 (động từ): theo|跟 + người
请跟我来。|Xin hãy đi theo tôi.
你跟着我读。|Bạn đọc theo tôi.

@@g2-zai-you|2|再 và 又 (lại, nữa)|再 + V (tương lai) / 又 + V + 了 (đã xảy ra)|再|hu
=Cả hai đều chỉ sự lặp lại. 再 dùng cho việc chưa xảy ra (sẽ lại…, rồi hãy…); 又 dùng cho việc đã xảy ra (lại… rồi).
?再说一遍；明天再来；先…再…；又迟到了；又…又…
~Với động từ năng nguyện, 又 có thể nói về tương lai có quy luật: 明天又是星期一了.
!昨天他再来了。|昨天他又来了。|Việc đã xảy ra dùng 又.
!明天你又来吧。|明天你再来吧。|Việc chưa xảy ra dùng 再.
>g3-xian|先…再…: làm cái này trước rồi mới làm cái kia.
#再: lặp lại trong tương lai|再 + V
请再说一遍。|Xin nói lại một lần nữa.
欢迎你明天再来。|Hoan nghênh bạn ngày mai lại đến.
我想再吃一碗饭。|Tôi muốn ăn thêm một bát cơm.
再见！|Tạm biệt! (hẹn gặp lại)
#再: rồi hãy, sau đó mới|V1 + 再 + V2
吃了饭再走吧。|Ăn cơm xong rồi hãy đi.
等他来了再说。|Đợi anh ấy đến rồi hãy nói.
你先休息一下，再做作业。|Bạn nghỉ một chút rồi hãy làm bài tập.
#再 + Adj: hơn nữa|再 + Adj + 一点儿
你说得再慢一点儿。|Bạn nói chậm hơn nữa một chút.
有没有再便宜一点儿的？|Có cái nào rẻ hơn nữa không?
#不再 / 再也不|Không… nữa
我再也不迟到了。|Tôi sẽ không bao giờ đến muộn nữa.
#又: đã lặp lại|又 + V + 了
他今天又迟到了。|Hôm nay anh ấy lại đến muộn.
你怎么又忘了带书？|Sao bạn lại quên mang sách nữa?
昨天下雨，今天又下雨了。|Hôm qua mưa, hôm nay lại mưa.
#又: tương lai có quy luật|又 + 是 / 要 + … + 了
明天又是星期一了。|Ngày mai lại là thứ hai rồi.
又要考试了。|Lại sắp thi rồi.
#又: còn, thêm (bổ sung)|又 + V
他吃了一个苹果，又吃了一个香蕉。|Anh ấy ăn một quả táo, rồi lại ăn một quả chuối.
#又…又…|Vừa… vừa…
这个西瓜又大又甜。|Quả dưa hấu này vừa to vừa ngọt.
#So sánh trực tiếp|
他昨天来了，今天又来了，说明天还要再来。|Hôm qua anh ấy đến, hôm nay lại đến, nói ngày mai còn đến nữa.

@@g2-yijing|2|已经…了 (đã… rồi)|已经 + V/Adj/thời gian + 了|已经|hu
=已经 nhấn mạnh việc đã xảy ra hoặc đã đạt đến một mức độ, thường kết hợp với 了 cuối câu.
?Hành động đã hoàn thành, thời gian đã qua, trạng thái đã thay đổi.
~Phủ định không dùng 已经 + 没: thường dùng 还没…呢 (vẫn chưa).
!我已经没吃饭。|我还没吃饭呢。|Phủ định "chưa" dùng 还没…呢.
>g2-haimei|还没…呢 là dạng phủ định tương ứng.
#Hành động đã hoàn thành|已经 + V + 了
我已经吃饭了。|Tôi đã ăn cơm rồi.
他已经走了。|Anh ấy đã đi rồi.
作业我已经做完了。|Bài tập tôi đã làm xong rồi.
电影已经开始了。|Phim đã bắt đầu rồi.
#Thời gian, tuổi|已经 + thời gian/tuổi + 了
已经十二点了。|Đã mười hai giờ rồi.
他已经三十岁了。|Anh ấy đã ba mươi tuổi rồi.
已经十一月了，天气越来越冷。|Đã tháng mười một rồi, thời tiết ngày càng lạnh.
#Trạng thái đã thay đổi|已经 + Adj + 了
天已经黑了。|Trời đã tối rồi.
我的病已经好了。|Bệnh của tôi đã khỏi rồi.
#Thời lượng|已经 + V + 了 + thời gian + 了
我已经学了两年汉语了。|Tôi đã học tiếng Trung được hai năm rồi.
我们已经等了半个小时了。|Chúng tôi đã đợi nửa tiếng rồi.
#Kinh nghiệm|已经 + V + 过 + 了
这本书我已经看过了。|Quyển sách này tôi đã đọc rồi.
#Câu hỏi|已经…了吗？
你已经买票了吗？|Bạn đã mua vé rồi à?
他已经到了吗？|Anh ấy đã đến rồi à?
#已经…了，还…|Đã… mà vẫn còn…
已经很晚了，你还不睡觉？|Đã rất muộn rồi mà bạn vẫn chưa ngủ?
#已经 + 不/没 + V + 了 (không còn nữa)|
他已经不在这儿工作了。|Anh ấy đã không còn làm việc ở đây nữa.
#Kết hợp 早就|早就…了 (từ lâu rồi)
我早就知道了。|Tôi biết từ lâu rồi.

@@g2-haimei|2|还没…呢 (vẫn chưa…)|还没(有) + V + 呢|还没|hu
=还没…呢 cho biết việc gì đó đến lúc nói vẫn chưa xảy ra (nhưng có thể sẽ xảy ra).
?Trả lời câu hỏi "…了吗？" khi việc chưa xảy ra.
~Câu có 还没 không dùng 了 ở cuối.
!我还没吃饭了。|我还没吃饭呢。|Câu 还没 không dùng 了.
>g2-yijing|已经…了 (đã… rồi) là dạng khẳng định.
#Vẫn chưa làm|还没 + V + 呢
我还没吃饭呢。|Tôi vẫn chưa ăn cơm.
他还没起床呢。|Anh ấy vẫn chưa dậy.
作业我还没写完呢。|Bài tập tôi vẫn chưa viết xong.
电影还没开始呢。|Phim vẫn chưa bắt đầu.
#Trả lời câu hỏi “…了吗？”|——…了吗？——还没呢。
你吃饭了吗？——还没呢。|Bạn ăn cơm chưa? — Vẫn chưa.
他回来了吗？——还没回来呢。|Anh ấy về chưa? — Vẫn chưa về.
你买票了吗？——还没买呢。|Bạn mua vé chưa? — Vẫn chưa mua.
#Chưa từng|还没 + V + 过
我还没去过长城。|Tôi vẫn chưa từng đến Vạn Lý Trường Thành.
这个菜我还没吃过。|Món này tôi vẫn chưa ăn bao giờ.
#Vẫn chưa + thời gian|都…了，还没…
都十点了，他还没来。|Đã mười giờ rồi mà anh ấy vẫn chưa đến.
都一个月了，我还没收到信。|Đã một tháng rồi mà tôi vẫn chưa nhận được thư.
#Chưa quyết định|还没 + 想好/决定
我还没想好去哪儿。|Tôi vẫn chưa nghĩ ra đi đâu.
#Trạng thái chưa thay đổi|还没 + Adj
天还没黑呢。|Trời vẫn chưa tối.
我的病还没好呢。|Bệnh của tôi vẫn chưa khỏi.
#Chưa… đã…|还没…就…
我还没说完，他就走了。|Tôi chưa nói xong thì anh ấy đã đi rồi.
#Câu hỏi|还没…吗？
你还没睡觉吗？|Bạn vẫn chưa ngủ à?
#Phân biệt 不 / 没 / 还没|还没: đến giờ vẫn chưa
我不去。/ 我没去。/ 我还没去。|Tôi không đi. / Tôi đã không đi. / Tôi vẫn chưa đi.

@@g2-changchang|2|Phó từ tần suất 常常 / 经常 / 总是 / 有时候|Chủ ngữ + 常常/经常 + V|常常|hu
=Phó từ tần suất đứng trước động từ để nói mức độ thường xuyên: 总是 (luôn luôn) > 经常/常常 (thường xuyên) > 有时候 (đôi khi) > 很少 (ít khi) > 从来不 (không bao giờ).
?Nói về thói quen, hoạt động lặp lại.
~Phủ định của 常常 thường dùng 不常; 经常 phủ định là 不经常.
!我常常不去。|我不常去。|Phủ định "không thường" dùng 不常.
#常常 / 经常 (thường xuyên)|
我常常去图书馆看书。|Tôi thường đến thư viện đọc sách.
他经常加班。|Anh ấy thường xuyên tăng ca.
周末我们常常一起吃饭。|Cuối tuần chúng tôi thường ăn cơm cùng nhau.
#总是 (luôn luôn)|
他总是第一个到学校。|Anh ấy luôn là người đến trường đầu tiên.
她总是笑着说话。|Cô ấy luôn vừa cười vừa nói.
#有时候 (đôi khi)|
有时候我坐公共汽车，有时候骑自行车。|Đôi khi tôi đi xe buýt, đôi khi đi xe đạp.
我有时候在家做饭。|Đôi khi tôi nấu cơm ở nhà.
#很少 (ít khi)|
我很少喝咖啡。|Tôi ít khi uống cà phê.
他很少生病。|Anh ấy ít khi bị ốm.
#从来不 / 从来没 (không bao giờ / chưa bao giờ)|
我从来不抽烟。|Tôi không bao giờ hút thuốc.
他从来没迟到过。|Anh ấy chưa bao giờ đến muộn.
#Phủ định|不常 / 不经常
我不常看电视。|Tôi không thường xem ti vi.
#Hỏi tần suất|常常…吗？/ 多长时间…一次？
你常常运动吗？|Bạn có thường tập thể dục không?
你多长时间回一次家？|Bao lâu bạn về nhà một lần?
#Tần suất cụ thể|每天 / 每个星期 + số lần
我每个星期去两次健身房。|Mỗi tuần tôi đến phòng gym hai lần.
#Kết hợp thời gian|晚上常常 / 小时候常常
小时候我常常去奶奶家。|Hồi nhỏ tôi thường đến nhà bà nội.
#Vị trí|Phó từ tần suất đứng sau chủ ngữ, trước động từ
我们经常在这家饭店吃饭。|Chúng tôi thường ăn ở nhà hàng này.

@@g2-keyi|2|Năng nguyện động từ 可以 (có thể, được phép)|可以 + V|可以|hu
=可以 chỉ sự cho phép (được phép), khả năng có điều kiện, hoặc lời đề nghị nhẹ nhàng.
?Xin phép: 我可以…吗？; Gợi ý: 你可以…; Đánh giá "tạm được": 还可以.
~Phủ định khi từ chối cho phép thường dùng 不能 / 不可以; trả lời "không cần" dùng 不用.
!你可以不可以帮我？|你可以帮我吗？/ 你能不能帮我？|Dạng 可不可以 hoặc 可以…吗 đều được; tránh lặp đầy đủ "可以不可以" trong văn viết.
>g1-neng|能 thiên về năng lực/điều kiện; 可以 thiên về sự cho phép.
#Xin phép|我可以…吗？
我可以进来吗？|Tôi có thể vào được không?
我可以用一下你的电脑吗？|Tôi dùng máy tính của bạn một chút được không?
这儿可以拍照吗？|Ở đây có được chụp ảnh không?
#Cho phép|可以 + V
你可以走了。|Bạn có thể đi rồi.
学生可以免费参观博物馆。|Học sinh có thể tham quan bảo tàng miễn phí.
#Không được phép|不可以 / 不能
这里不可以抽烟。|Ở đây không được hút thuốc.
考试的时候不可以看书。|Khi thi không được xem sách.
#Có khả năng (có điều kiện)|可以 + V
从这儿可以看到大海。|Từ đây có thể nhìn thấy biển.
这个房间可以住四个人。|Căn phòng này có thể ở bốn người.
我明天可以来。|Ngày mai tôi có thể đến.
#Gợi ý, khuyên|你可以…
你可以问问老师。|Bạn có thể hỏi thầy giáo xem.
如果你累了，可以休息一下。|Nếu bạn mệt có thể nghỉ một chút.
#Tạm được|还可以 / 可以
我的汉语还可以。|Tiếng Trung của tôi tạm được.
这家饭店的菜还可以。|Món ở nhà hàng này cũng tạm được.
#Câu hỏi chính phản|可(以)不可以…？
我可不可以坐这儿？|Tôi có thể ngồi đây không?
#Trả lời|可以。/ 不行。/ 当然可以。
——我能看看吗？——当然可以。|Tôi xem một chút được không? — Đương nhiên được.

@@g2-keneng|2|可能 (có lẽ, có khả năng)|可能 + V / 可能 + câu|可能|hu
=可能 diễn tả sự phỏng đoán "có lẽ, có thể". Còn là danh từ/tính từ "khả năng".
?Đoán về thời tiết, việc sắp xảy ra, lý do.
~可能 đứng trước động từ hoặc đầu câu; phủ định: 可能不 / 不可能.
!他不可能可能来。|他可能不来。|Phủ định đặt sau 可能: 可能不…
>g1-hui|会 cũng dùng để dự đoán (sẽ); 可能 nhấn mạnh sự không chắc.
#Phỏng đoán|可能 + V
明天可能下雨。|Ngày mai có lẽ trời mưa.
他可能还在睡觉。|Có lẽ anh ấy vẫn đang ngủ.
我可能晚一点儿到。|Có lẽ tôi đến muộn một chút.
#Đầu câu|可能 + chủ ngữ + V
可能他不知道这件事。|Có lẽ anh ấy không biết chuyện này.
可能你记错了。|Có lẽ bạn nhớ nhầm rồi.
#Phủ định|可能不 / 可能没
他今天可能不来了。|Hôm nay có lẽ anh ấy không đến nữa.
她可能没听见。|Có lẽ cô ấy không nghe thấy.
#不可能 (không thể nào)|
这不可能！|Chuyện này không thể nào!
他不可能说这样的话。|Anh ấy không thể nào nói những lời như vậy.
#很可能 / 有可能|Khả năng lớn / có khả năng
他很可能已经走了。|Rất có thể anh ấy đã đi rồi.
明天有可能下雪。|Ngày mai có khả năng có tuyết.
#Danh từ: khả năng|可能性 / 有…的可能
这件事有成功的可能。|Việc này có khả năng thành công.
#Câu hỏi|可能吗？/ 有没有可能…？
有没有可能明天再见面？|Có thể mai gặp lại không?
#Phỏng đoán lý do|可能是因为…
他没来，可能是因为生病了。|Anh ấy không đến, có lẽ là vì bị ốm.
#Kết hợp|可能会 + V
他可能会生气。|Có lẽ anh ấy sẽ giận.
#Trả lời ngắn|可能吧。
他会来吗？——可能吧。|Anh ấy có đến không? — Có lẽ.

@@g2-feichang|2|Phó từ mức độ 非常 / 特别 / 比较 / 真 / 挺…的|Phó từ mức độ + Adj/động từ tâm lý|非常|hu
=Các phó từ đứng trước tính từ hoặc động từ tâm lý để chỉ mức độ: 有点儿 (hơi) < 比较 (khá) < 很 (rất) < 挺…的 (khá là) < 非常 / 特别 (vô cùng, đặc biệt) < 太…了 (quá).
?Miêu tả, đánh giá, khen chê.
~Chỉ dùng một phó từ mức độ: không nói "很非常好".
!他很非常高。|他非常高。|Không ghép hai phó từ mức độ.
>g1-hen|很 là mức độ trung tính nhất.
#非常 (vô cùng)|
这个电影非常好看。|Bộ phim này vô cùng hay.
我非常感谢你的帮助。|Tôi vô cùng cảm ơn sự giúp đỡ của bạn.
今天非常热。|Hôm nay vô cùng nóng.
#特别 (đặc biệt)|
她特别喜欢唱歌。|Cô ấy đặc biệt thích hát.
这里的冬天特别冷。|Mùa đông ở đây đặc biệt lạnh.
#比较 (khá, tương đối)|
今天比较暖和。|Hôm nay khá ấm.
这个问题比较难。|Câu hỏi này khá khó.
我比较喜欢安静的地方。|Tôi khá thích những nơi yên tĩnh.
#真 (thật là – cảm thán)|
你的字写得真漂亮！|Chữ bạn viết đẹp thật!
今天真冷啊！|Hôm nay lạnh thật!
#挺…的 (khá là – khẩu ngữ)|
这个菜挺好吃的。|Món này khá ngon.
他人挺好的。|Anh ấy khá tốt bụng.
#有点儿 (hơi – không vừa ý)|
这件衣服有点儿大。|Bộ quần áo này hơi rộng.
#十分 / 相当 (văn viết)|
这次比赛十分重要。|Trận đấu này vô cùng quan trọng.
#Phủ định|不太 / 不怎么 / 不是很
这个地方不太远。|Nơi này không xa lắm.
我不是很明白。|Tôi không hiểu lắm.
#So sánh mức độ|比较 vs 非常
这家店比较便宜，那家店非常贵。|Cửa hàng này khá rẻ, cửa hàng kia rất đắt.

@@g2-deshihou|2|…的时候 (khi…, lúc…)|Sự việc + 的时候，…|的时候|hu
=…的时候 chỉ thời điểm một việc khác xảy ra: "khi…, lúc…". Đứng đầu câu hoặc sau chủ ngữ.
?Kể chuyện quá khứ, thói quen, lời dặn: 吃饭的时候…, 小时候…
~Không đặt 的时候 sau động từ trần trụi trong văn viết dài; nên có chủ ngữ hoặc tân ngữ rõ ràng.
!当我到了的时候，他走了。|我到的时候，他已经走了。|Không dùng 了 trước 的时候; vế sau dùng 已经.
>g2-yiqian|以前/以后: trước khi / sau khi.
#Khi làm gì|V + (O) + 的时候
吃饭的时候不要看手机。|Khi ăn cơm đừng xem điện thoại.
我睡觉的时候，他还在工作。|Khi tôi ngủ, anh ấy vẫn đang làm việc.
上课的时候请关上手机。|Trong giờ học hãy tắt điện thoại.
#Khi còn nhỏ, khi còn trẻ|小时候 / 年轻的时候
我小时候住在农村。|Hồi nhỏ tôi sống ở nông thôn.
年轻的时候，他是一名老师。|Hồi trẻ, ông ấy là một giáo viên.
#Khi đang ở đâu|在 + nơi + 的时候
在中国的时候，我常常吃饺子。|Hồi ở Trung Quốc, tôi thường ăn sủi cảo.
#Tính từ + 的时候|忙/累/有空 + 的时候
有空的时候来我家玩儿。|Lúc nào rảnh thì đến nhà tôi chơi.
不舒服的时候要多休息。|Khi không khỏe phải nghỉ ngơi nhiều.
#Thời điểm + 的时候|…点的时候 / 春节的时候
春节的时候，我们全家都回老家。|Dịp Tết, cả nhà chúng tôi đều về quê.
#Câu hỏi|什么时候…？
你什么时候有空？|Khi nào bạn rảnh?
#Kể chuyện|…的时候，突然…
我回家的时候，突然下雨了。|Lúc tôi về nhà, trời đột nhiên mưa.
#Trong lời dặn|…的时候，别忘了…
出门的时候别忘了关灯。|Lúc ra khỏi nhà đừng quên tắt đèn.
#Có lúc|有的时候 = 有时候
有的时候我也觉得汉语很难。|Có lúc tôi cũng thấy tiếng Trung rất khó.
#Mở rộng|当…的时候 (văn viết)
当我听到这个消息的时候，我非常高兴。|Khi tôi nghe được tin này, tôi vô cùng vui mừng.

@@g2-yiqian|2|以前 / 以后 (trước khi / sau khi)|Sự việc/thời gian + 以前/以后|以后|hu
=以前 "trước (khi)", 以后 "sau (khi)". Đứng sau động từ, cụm từ hoặc từ chỉ thời gian; đứng một mình nghĩa là "trước đây" / "sau này".
?Sắp xếp trình tự sự việc, nói về quá khứ (以前) và tương lai (以后).
~Không dùng 了 trong vế …以前: nói 睡觉以前, không nói 睡了觉以前.
!我吃了饭以前洗手。|我吃饭以前洗手。|Trước 以前 không dùng 了.
>g2-deshihou|的时候: đúng lúc đó.
#Trước khi|V + 以前
睡觉以前，我常常看书。|Trước khi ngủ, tôi thường đọc sách.
吃饭以前要洗手。|Trước khi ăn cơm phải rửa tay.
来中国以前，我学过一点儿汉语。|Trước khi đến Trung Quốc, tôi đã học một chút tiếng Trung.
#Sau khi|V + 以后
下课以后，我们去打篮球吧。|Sau khi tan học, chúng ta đi chơi bóng rổ nhé.
吃了饭以后，他就去上班了。|Ăn cơm xong anh ấy đi làm luôn.
毕业以后你想做什么？|Sau khi tốt nghiệp bạn muốn làm gì?
#Thời gian + 以前/以后|
三年以前我来到这个城市。|Ba năm trước tôi đến thành phố này.
十点以后不要给我打电话。|Sau mười giờ đừng gọi điện cho tôi.
#以前 một mình: trước đây|
以前我不喜欢吃辣的，现在很喜欢。|Trước đây tôi không thích ăn cay, bây giờ rất thích.
这里以前是一个小村子。|Nơi này trước đây là một ngôi làng nhỏ.
#以后 một mình: sau này|
以后我想当医生。|Sau này tôi muốn làm bác sĩ.
以后别再迟到了。|Sau này đừng đến muộn nữa.
#之前 / 之后 (văn viết)|
出发之前，请检查一下行李。|Trước khi xuất phát, hãy kiểm tra hành lý.
#Phân biệt 以后 / 后来|后来: sau đó (chỉ quá khứ)
我们见过一次，后来就没联系了。|Chúng tôi gặp nhau một lần, sau đó không liên lạc nữa.
#Câu hỏi|…以前/以后 + 做什么？
你下班以后一般做什么？|Sau khi tan làm bạn thường làm gì?

@@g2-duo|2|多 + tính từ (bao + …?)|多 + 大/高/长/远/重/久…？|多|hu
=多 + tính từ một âm tiết dùng để hỏi mức độ, số lượng: 多大 (bao nhiêu tuổi, to cỡ nào), 多高, 多远, 多长时间…
?Hỏi tuổi, chiều cao, khoảng cách, thời gian, cân nặng.
~Trước 多 có thể thêm 有: 他有多高？
!你几大？|你多大？|Hỏi tuổi người lớn dùng 多大, không nói 几大.
#多大: bao nhiêu tuổi / to cỡ nào|
你今年多大？|Năm nay bạn bao nhiêu tuổi?
你的房间有多大？|Phòng của bạn rộng cỡ nào?
#多高|
你有多高？|Bạn cao bao nhiêu?
那座山有多高？|Ngọn núi kia cao bao nhiêu?
#多远|
你家离学校有多远？|Nhà bạn cách trường bao xa?
从这儿到机场有多远？|Từ đây đến sân bay bao xa?
#多长 / 多长时间 / 多久|
这条河有多长？|Con sông này dài bao nhiêu?
你学汉语学了多长时间？|Bạn học tiếng Trung bao lâu rồi?
你要在北京住多久？|Bạn sẽ ở Bắc Kinh bao lâu?
#多重|
这个箱子有多重？|Cái va li này nặng bao nhiêu?
#多少: số lượng|
这件衣服多少钱？|Bộ quần áo này bao nhiêu tiền?
#多 + Adj (cảm thán): biết bao, thật là|多 + Adj + 啊！
这儿的风景多美啊！|Phong cảnh ở đây đẹp biết bao!
他的汉语说得多好啊！|Tiếng Trung anh ấy nói giỏi biết bao!
#多 + V (nhiều hơn)|多 + V + 一点儿
你多吃一点儿。|Bạn ăn nhiều thêm một chút.
#Số + 多 (hơn, lẻ)|三十多岁 / 一个多小时
他三十多岁了。|Anh ấy ngoài ba mươi tuổi rồi.
我等了一个多小时。|Tôi đã đợi hơn một tiếng.
`;
