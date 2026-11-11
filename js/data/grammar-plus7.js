// Điểm ngữ pháp mới (phần 3): các điểm còn thiếu của HSK 1–3. Định dạng: xem cuối js/data/grammar.js
export const GP7 = `
@@g1-fangwei|1|Phương vị từ 上 / 下 / 里 / 外 / 前 / 后 / 旁边 / 对面|Danh từ + 上/里/下… ; 在 + nơi + phương vị từ|里|
=Phương vị từ chỉ vị trí: 上 (trên), 下 (dưới), 里 (trong), 外 (ngoài), 前 (trước), 后 (sau), 左 (trái), 右 (phải), 旁边 (bên cạnh), 对面 (đối diện), 中间 (ở giữa). Thường đứng sau danh từ: 桌子上, 房间里.
?Nói vị trí đồ vật, người; chỉ đường; kết hợp với 在, 有, 是.
~Tên nước, tên thành phố không thêm 里: nói 在中国, không nói 在中国里. Danh từ chỉ đồ vật phải thêm phương vị từ: nói 在桌子上, không nói 在桌子.
!书在桌子。|书在桌子上。|Danh từ chỉ đồ vật cần thêm phương vị từ để thành nơi chốn.
!我在北京里。|我在北京。|Tên địa danh không thêm 里.
>g1-zai|在 + nơi chốn.
#Danh từ + 上 (trên)|桌子上 / 墙上 / 床上 / 路上
手机在桌子上。|Điện thoại ở trên bàn.
墙上有一张地图。|Trên tường có một tấm bản đồ.
路上车很多。|Trên đường rất nhiều xe.
#Danh từ + 里 (trong)|房间里 / 教室里 / 包里 / 家里
房间里有两张床。|Trong phòng có hai cái giường.
我的钱包在包里。|Ví của tôi ở trong túi.
他今天在家里休息。|Hôm nay anh ấy nghỉ ở nhà.
#Danh từ + 下 (dưới)|桌子下 / 树下 / 楼下
小狗在桌子下边。|Con chó con ở dưới bàn.
我在楼下等你。|Tôi đợi bạn ở dưới lầu.
#前边 / 后边 (trước / sau)|
学校前边有一个公园。|Phía trước trường có một công viên.
他坐在我后边。|Anh ấy ngồi phía sau tôi.
#左边 / 右边 (trái / phải)|
银行在超市的左边。|Ngân hàng ở bên trái siêu thị.
右边那个人是我哥哥。|Người bên phải là anh trai tôi.
#旁边 / 对面 / 中间|bên cạnh / đối diện / ở giữa
医院旁边是一个饭馆。|Bên cạnh bệnh viện là một nhà hàng.
我家对面有一个商店。|Đối diện nhà tôi có một cửa hàng.
照片中间的人是我。|Người ở giữa bức ảnh là tôi.
#外边 / 里边 (ngoài / trong)|
外边下雨了。|Bên ngoài mưa rồi.
请到里边坐。|Mời vào trong ngồi.
#Câu hỏi vị trí|…在哪儿？/ …上有什么？
你的书在哪儿？——在桌子上。|Sách của bạn ở đâu? — Ở trên bàn.
冰箱里有什么？|Trong tủ lạnh có gì?
#Phương vị từ chỉ thời gian|…以前 / …以后 / 上午 / 下个月
上个星期我很忙。|Tuần trước tôi rất bận.
下个月我们去旅游。|Tháng sau chúng tôi đi du lịch.

@@g1-zenmeyang|1|Câu hỏi 怎么样？/ 是不是？/ …好吗？/ …对吗？|Câu + 怎么样/好吗/对吗/是不是？|怎么样|
=Thêm 怎么样 (thế nào), 好吗 / 行吗 / 可以吗 (được không), 对吗 / 是吗 (đúng không), 是不是 (có phải… không) vào câu để hỏi ý kiến, đề nghị hoặc xác nhận.
?Hỏi ý kiến về sự vật; rủ rê đề nghị; hỏi lại để xác nhận điều mình đoán.
~Đã có 怎么样 / 是不是 thì không thêm 吗.
!你身体怎么样吗？|你身体怎么样？|怎么样 đã là từ hỏi, không thêm 吗.
>g1-ma|Câu hỏi với 吗.
#怎么样: hỏi tình hình, đánh giá|A + 怎么样？
你最近怎么样？|Dạo này bạn thế nào?
这件衣服怎么样？|Bộ quần áo này thế nào?
昨天的考试怎么样？|Kỳ thi hôm qua thế nào?
北京的天气怎么样？|Thời tiết Bắc Kinh thế nào?
#怎么样: đề nghị (…thì sao?)|đề nghị + 怎么样？
我们明天去爬山，怎么样？|Ngày mai chúng ta đi leo núi, thế nào?
晚上吃火锅怎么样？|Tối nay ăn lẩu thì sao?
#V得怎么样？ (làm có tốt không)|
你汉语说得怎么样？|Bạn nói tiếng Trung thế nào?
#好吗 / 行吗 / 可以吗: rủ, xin phép|
我们一起去吃饭，好吗？|Chúng ta cùng đi ăn cơm nhé, được không?
你帮我一下，行吗？|Bạn giúp tôi một chút, được không?
我用一下你的电脑，可以吗？|Tôi dùng máy tính của bạn một chút được không?
#对吗 / 是吗: xác nhận|
你是越南人，对吗？|Bạn là người Việt Nam, đúng không?
——他明天结婚。——是吗？|— Ngày mai anh ấy kết hôn. — Thật à?
#是不是: hỏi để xác nhận điều đoán|是不是 + V / Câu, 是不是？
你是不是不舒服？|Có phải bạn không khỏe không?
他是不是已经走了？|Có phải anh ấy đã đi rồi không?
明天放假，是不是？|Ngày mai được nghỉ, phải không?
#Trả lời|好的 / 行 / 没问题 / 对 / 不是
——我们走吧，好吗？——好的。|— Chúng ta đi nhé, được không? — Được.
#怎么了 (sao vậy)|
你怎么了？为什么不高兴？|Bạn sao vậy? Sao không vui?
#…呢 / 怎么样 hỏi ngược lại|
我很好，你怎么样？|Tôi khỏe, còn bạn thế nào?

@@g2-a|2|Trợ từ ngữ khí 啊 / 呀 / 嘛|Câu + 啊/呀/嘛|啊|hu
=啊 đứng cuối câu làm câu nói mềm mại, thân mật hoặc thể hiện cảm thán, thúc giục. 呀 là biến âm của 啊 khi chữ trước kết thúc bằng a, e, i, o, ü. 嘛 nhấn mạnh điều hiển nhiên ("mà", "thì…").
?Cảm thán (真好啊), nhắc nhở thúc giục (快走啊), hỏi thân mật (你去哪儿啊), nói điều hiển nhiên (他是孩子嘛).
~Văn viết trang trọng ít dùng; khẩu ngữ dùng rất nhiều.
!他是孩子嘛吗？|他是孩子嘛。|嘛 không dùng trong câu hỏi.
>g2-ba|吧: đề nghị, phỏng đoán.
#Cảm thán|真/多/好 + Adj + 啊！
今天天气真好啊！|Hôm nay thời tiết đẹp quá!
这里的风景多美啊！|Phong cảnh ở đây đẹp biết bao!
好漂亮的花啊！|Hoa đẹp quá!
#Thúc giục, nhắc nhở|V + 啊！
快走啊，要迟到了！|Đi nhanh lên, sắp muộn rồi!
你说啊，怎么不说话？|Nói đi chứ, sao không nói?
大家吃啊，别客气！|Mọi người ăn đi, đừng khách sáo!
#Câu hỏi thân mật|câu hỏi + 啊？
你去哪儿啊？|Bạn đi đâu đấy?
这是谁啊？|Đây là ai thế?
你怎么还没睡啊？|Sao bạn vẫn chưa ngủ thế?
#Đồng ý, khẳng định|是啊 / 对啊 / 好啊
——明天去吗？——好啊！|— Mai đi không? — Được đấy!
是啊，我也这么想。|Đúng vậy, tôi cũng nghĩ thế.
#呀 (biến âm của 啊)|
你也来了呀！|Bạn cũng đến rồi à!
快来呀！|Mau đến đi!
这个菜真好吃呀！|Món này ngon quá!
#Gọi người, liệt kê|A 啊、B 啊…
苹果啊、香蕉啊、西瓜啊，我都喜欢。|Nào táo, nào chuối, nào dưa hấu, tôi đều thích.
#嘛: nói điều hiển nhiên|
他还是个孩子嘛，别生气了。|Nó vẫn còn là trẻ con mà, đừng giận nữa.
有问题就问嘛。|Có vấn đề thì hỏi thôi mà.
不会就学嘛！|Không biết thì học chứ sao!
#Ngạc nhiên|啊？
啊？你明天就走？|Hả? Mai bạn đi luôn à?

@@g2-mei|2|每…都… (mỗi… đều…) và 各|每 + (số) + lượng từ + danh từ + 都 + V|每|hu
=每 nghĩa là "mỗi", đứng trước lượng từ hoặc danh từ thời gian, nhấn mạnh không có ngoại lệ, thường đi với 都 ở vế sau. 各 "các, mỗi" (văn viết hơn).
?Nói thói quen (每天都…), quy luật, tần suất (每…一次).
~Sau 每 thường có lượng từ: 每个人, 每本书; danh từ thời gian như 天, 年 dùng thẳng: 每天, 每年.
!每人都来了。（khẩu ngữ nên thêm 个）|每个人都来了。|Sau 每 thường cần lượng từ.
>g1-dou|都: đều.
#每天 / 每年 / 每周 (thói quen)|每 + thời gian + 都
我每天都六点起床。|Ngày nào tôi cũng dậy lúc sáu giờ.
他每年都回国看父母。|Năm nào anh ấy cũng về nước thăm bố mẹ.
我们每个星期都开一次会。|Tuần nào chúng tôi cũng họp một lần.
每天晚上我都看一个小时书。|Tối nào tôi cũng đọc sách một tiếng.
#每 + lượng từ + danh từ + 都|每个人 / 每本书 / 每件事
每个人都有自己的爱好。|Mỗi người đều có sở thích riêng.
每本书都很有意思。|Quyển sách nào cũng rất thú vị.
这个班每个学生都会说汉语。|Học sinh nào trong lớp này cũng biết nói tiếng Trung.
每次见到他，他都很高兴。|Mỗi lần gặp anh ấy, anh ấy đều rất vui.
#每 + số + lượng từ (tần suất)|每…一次 / 每隔…
这种药每四个小时吃一次。|Thuốc này cứ bốn tiếng uống một lần.
公共汽车每十分钟来一趟。|Xe buýt cứ mười phút có một chuyến.
#Giá cho mỗi đơn vị|每 + lượng từ + giá
苹果每斤五块钱。|Táo năm tệ một cân.
#每 không có 都 (tỉnh lược)|
他每天跑步。|Ngày nào anh ấy cũng chạy bộ.
#各 (các, mỗi)|各 + danh từ / 各种 / 各位
各位老师，大家好！|Kính chào các thầy cô!
这里有各种各样的水果。|Ở đây có đủ các loại hoa quả.
各个国家的文化都不一样。|Văn hóa của mỗi nước đều không giống nhau.
#Phân biệt 每 / 都|都 bắt buộc khi 每 làm chủ ngữ nhấn mạnh toàn bộ
每个房间都很干净。|Phòng nào cũng rất sạch.
#Câu hỏi|每天都…吗？
你每天都学汉语吗？|Ngày nào bạn cũng học tiếng Trung à?
#Phủ định|每…都不/没…
他每次都不准时。|Lần nào anh ấy cũng không đúng giờ.

@@g3-yihuir|3|一会儿 (một lát, một lúc)|V + 一会儿 / 一会儿 + V|一会儿|hu
=一会儿 chỉ khoảng thời gian ngắn. Sau động từ: làm việc gì trong một lúc (休息一会儿). Trước động từ: lát nữa sẽ làm (一会儿见). 一会儿…一会儿… : lúc thì… lúc thì….
?Đề nghị nghỉ, đợi; hẹn lát nữa; mô tả thay đổi liên tục.
~Có tân ngữ thì 一会儿 đứng giữa động từ và tân ngữ: 看一会儿书.
!我看书一会儿。|我看一会儿书。|一会儿 đứng trước tân ngữ.
>g2-shiliang|Bổ ngữ thời lượng.
#V + 一会儿 (làm một lúc)|
我们休息一会儿吧。|Chúng ta nghỉ một lát đi.
请等一会儿。|Xin đợi một lát.
我想睡一会儿。|Tôi muốn ngủ một lát.
#V + 一会儿 + tân ngữ|
我每天晚上看一会儿电视。|Tối nào tôi cũng xem ti vi một lúc.
我们聊一会儿天吧。|Chúng ta nói chuyện một lúc đi.
他弹了一会儿钢琴。|Anh ấy chơi đàn piano một lúc.
#V + 了 + 一会儿|đã làm một lúc
我等了一会儿，他就来了。|Tôi đợi một lát thì anh ấy đến.
她哭了一会儿，又笑了。|Cô ấy khóc một lúc rồi lại cười.
#一会儿 + V (lát nữa)|
一会儿见！|Lát nữa gặp nhé!
我一会儿给你打电话。|Lát nữa tôi gọi cho bạn.
一会儿我们去吃饭。|Lát nữa chúng ta đi ăn cơm.
#过一会儿 / 不一会儿|một lúc sau / chẳng mấy chốc
过一会儿再说吧。|Để một lúc nữa hãy nói.
不一会儿，天就黑了。|Chẳng mấy chốc trời đã tối.
#一会儿…一会儿… (lúc thì… lúc thì…)|
天气一会儿冷一会儿热。|Thời tiết lúc thì lạnh lúc thì nóng.
孩子一会儿哭一会儿笑。|Đứa trẻ lúc khóc lúc cười.
他一会儿看书，一会儿玩手机。|Anh ấy lúc thì đọc sách, lúc thì chơi điện thoại.
#Câu hỏi|…一会儿吗？
你能等我一会儿吗？|Bạn có thể đợi tôi một lát không?
#Phân biệt 一会儿 / 一下|一下: động tác nhanh, nhẹ; 一会儿: khoảng thời gian
你看一下。/ 你坐一会儿。|Bạn xem qua một chút. / Bạn ngồi một lát.
#一会儿就… (lát là… ngay)|
别着急，他一会儿就到。|Đừng sốt ruột, lát nữa anh ấy đến ngay.
这个作业一会儿就能做完。|Bài tập này một lát là làm xong.

@@g3-zhuwei|3|Câu chủ vị làm vị ngữ (他个子很高)|Chủ ngữ lớn + (chủ ngữ nhỏ + vị ngữ)|很|
=Vị ngữ của câu là cả một cụm chủ–vị nhỏ. Chủ ngữ lớn thường là người/vật, chủ ngữ nhỏ là một bộ phận hay một mặt của nó: 他 + 个子很高 ("anh ấy – vóc dáng cao").
?Miêu tả ngoại hình, sức khỏe, đặc điểm; nói đánh giá về một mặt của sự vật.
~Không dùng 的 nối chủ ngữ lớn và nhỏ khi muốn nhấn mạnh chủ đề (他个子很高 tự nhiên hơn 他的个子很高 trong khẩu ngữ, cả hai đều đúng).
!我是头很疼。|我头很疼。|Không thêm 是 trước vị ngữ tính từ.
>g1-hen|Câu vị ngữ tính từ.
#Ngoại hình|người + bộ phận + Adj
他个子很高。|Anh ấy vóc dáng cao.
她眼睛很大。|Cô ấy mắt rất to.
我妹妹头发很长。|Em gái tôi tóc rất dài.
#Sức khỏe, cảm giác|người + bộ phận + 疼/不舒服
我头很疼。|Tôi đau đầu lắm.
他肚子不舒服。|Anh ấy bị khó chịu bụng.
奶奶身体很好。|Bà nội sức khỏe rất tốt.
#Năng lực, tính cách|người + mặt + Adj
他汉语很好。|Anh ấy tiếng Trung rất giỏi.
她学习很努力。|Cô ấy học hành rất chăm chỉ.
我弟弟性格很好。|Em trai tôi tính tình rất tốt.
#Đặc điểm sự vật|vật + mặt + Adj
这个房间面积不大。|Căn phòng này diện tích không lớn.
这家饭馆菜很好吃，价格也便宜。|Nhà hàng này món ăn ngon, giá cũng rẻ.
北京冬天很冷。|Bắc Kinh mùa đông rất lạnh.
这件衣服颜色很好看。|Bộ quần áo này màu rất đẹp.
#Nơi chốn|nơi + mặt + Adj
这个城市交通很方便。|Thành phố này giao thông rất thuận tiện.
我们学校环境很美。|Trường chúng tôi môi trường rất đẹp.
#Công việc, đời sống|người + công việc/工作 + Adj
我爸爸工作很忙。|Bố tôi công việc rất bận.
他最近心情不太好。|Dạo này anh ấy tâm trạng không tốt lắm.
#Câu hỏi|…怎么样？ / …好不好？
你身体怎么样？|Sức khỏe bạn thế nào?
你哥哥个子高不高？|Anh trai bạn có cao không?
#Chủ đề + 我 + V (tân ngữ lên đầu)|
这本书我看过。|Quyển sách này tôi đọc rồi.
这件事我不知道。|Chuyện này tôi không biết.

@@g3-fanwen|3|Câu phản vấn 不是…吗？/ 难道…吗？/ 哪儿…|不是 + … + 吗？/ 难道 + … + 吗？|难道|
=Câu phản vấn có hình thức câu hỏi nhưng không cần trả lời, dùng để khẳng định mạnh: 不是…吗？ = "chẳng phải… sao?" (ý: là có), 难道…吗？ = "lẽ nào… sao?" (ý ngược lại), 哪儿/怎么…呢？ = phủ định.
?Nhắc lại điều người kia đã biết, tỏ ý ngạc nhiên, trách móc, khẳng định mạnh.
~Câu khẳng định trong phản vấn mang ý phủ định và ngược lại: 难道你不知道吗？= Bạn biết rồi mà.
!难道你不知道。|难道你不知道吗？|难道 thường đi với 吗 cuối câu.
>g1-ma|Câu hỏi thường với 吗.
#不是…吗？ (chẳng phải… sao?)|
你不是说今天来吗？|Chẳng phải bạn nói hôm nay đến sao?
这不是你的书吗？|Đây chẳng phải là sách của bạn sao?
你不是会说汉语吗？怎么不说？|Chẳng phải bạn biết nói tiếng Trung sao? Sao không nói?
他不是已经回国了吗？|Chẳng phải anh ấy đã về nước rồi sao?
#不是…吗？ nhắc điều người kia quên|
我不是告诉过你了吗？|Chẳng phải tôi đã nói với bạn rồi sao?
#难道…吗？ (lẽ nào… sao?)|
难道你不认识我了吗？|Lẽ nào bạn không nhận ra tôi nữa sao?
难道这是真的吗？|Lẽ nào đây là thật sao?
难道你忘了吗？|Lẽ nào bạn quên rồi sao?
难道他不知道这件事吗？|Lẽ nào anh ấy không biết chuyện này sao?
#难道 + 还 + V|ý: không cần nữa
难道你还不明白吗？|Lẽ nào bạn vẫn chưa hiểu sao?
#哪儿 / 哪里 (phủ định: đâu có)|
我哪儿有钱啊？|Tôi làm gì có tiền?
——你汉语真好！——哪里哪里。|— Tiếng Trung của bạn giỏi thật! — Đâu có đâu.
这么多菜，我哪儿吃得完？|Nhiều món thế này, tôi ăn sao hết được?
#怎么…呢？ (sao lại… được?)|
他怎么会不知道呢？|Sao anh ấy lại không biết được chứ?
我怎么能不去呢？|Sao tôi có thể không đi được?
#谁…？ (ai mà… = không ai)|
谁不想去旅游呢？|Ai mà không muốn đi du lịch chứ?
谁知道他去哪儿了？|Ai biết anh ấy đi đâu rồi?
#还…吗？ / 还用说吗？|
这还用说吗？|Chuyện này còn phải nói sao?
#有什么…的？ (có gì mà…)|
这有什么难的？|Cái này có gì khó đâu?
有什么好看的？|Có gì hay mà xem?

@@g3-lihe|3|Động từ ly hợp (见面 / 帮忙 / 睡觉 / 结婚…)|V + (了/过/số lượng/定语) + O|见面|
=Động từ ly hợp gồm động từ + tân ngữ (见+面, 帮+忙, 睡+觉, 结+婚, 游+泳, 唱+歌, 跳+舞, 洗+澡, 生+气, 毕+业). Khi thêm 了, 过, số lượng, thời lượng hay định ngữ, phải chèn vào giữa.
?见过一次面、帮我的忙、睡了八个小时觉、结过婚; không mang thêm tân ngữ phía sau.
~Không nói 见面他, 帮忙我, 结婚她: đối tượng phải đưa lên trước bằng 跟/和/给 hoặc chèn vào giữa (帮我的忙).
!我昨天见面他了。|我昨天跟他见面了。|Đối tượng đưa ra trước bằng 跟.
!你能帮忙我吗？|你能帮我的忙吗？/ 你能帮帮我吗？|帮忙 không mang tân ngữ phía sau.
!我睡觉了八个小时。|我睡了八个小时觉。|了 và thời lượng chèn vào giữa.
>g3-chongdie|Lặp lại động từ ly hợp: AAB (帮帮忙).
#跟/和 + người + 见面|
我明天跟朋友见面。|Ngày mai tôi gặp bạn.
我们在咖啡馆见了面。|Chúng tôi đã gặp nhau ở quán cà phê.
我们只见过一次面。|Chúng tôi mới gặp nhau một lần.
#帮忙 → 帮 + người + 的忙|
你能帮我一个忙吗？|Bạn có thể giúp tôi một việc không?
他帮了我很大的忙。|Anh ấy đã giúp tôi rất nhiều.
谢谢你帮忙！|Cảm ơn bạn đã giúp đỡ!
#睡觉 → 睡 + 了 + thời lượng + 觉|
我昨天只睡了五个小时觉。|Hôm qua tôi chỉ ngủ năm tiếng.
你睡午觉吗？|Bạn có ngủ trưa không?
#结婚 → 跟 + người + 结婚 / 结过婚|
他跟一个中国女孩结婚了。|Anh ấy đã kết hôn với một cô gái Trung Quốc.
他结过两次婚。|Anh ấy đã kết hôn hai lần.
#游泳 / 唱歌 / 跳舞 + chèn số lượng|
我游了一个小时泳。|Tôi bơi một tiếng.
我们唱了一晚上歌。|Chúng tôi hát cả một tối.
她跳舞跳得很好。|Cô ấy nhảy rất đẹp.
#生气 → 生 + người + 的气|
你别生我的气了。|Bạn đừng giận tôi nữa.
#毕业 / 洗澡 / 请假|
他去年大学毕业了。|Anh ấy tốt nghiệp đại học năm ngoái.
我先洗个澡再吃饭。|Tôi tắm cái đã rồi mới ăn cơm.
我想请两天假。|Tôi muốn xin nghỉ hai ngày.
#Lặp lại: AAB|散散步 / 帮帮忙 / 聊聊天
周末我们去公园散散步吧。|Cuối tuần chúng ta ra công viên đi dạo nhé.
#Câu hỏi|V没V过 + O？/ V + O + 了吗？
你们见过面吗？|Các bạn đã gặp nhau chưa?

@@g3-yaoshi|3|要是…(的话)，就… (nếu… thì…)|要是 + điều kiện + (的话)，(主) + 就 + kết quả|要是|hu
=要是 nghĩa như 如果 ("nếu") nhưng thiên về khẩu ngữ. Có thể thêm 的话 cuối vế điều kiện; 的话 cũng có thể dùng một mình.
?Giả thiết trong hội thoại thường ngày, lời khuyên, kế hoạch dự phòng.
~Vế sau thường có 就; nếu có chủ ngữ thì 就 đứng sau chủ ngữ.
!要是下雨，就我们不去。|要是下雨，我们就不去。|就 đứng sau chủ ngữ vế sau.
>g3-ruguo|如果…就…: văn viết hơn.
#要是…就…|
要是明天下雨，我们就不去了。|Nếu mai trời mưa thì chúng ta không đi nữa.
要是你喜欢，就送给你。|Nếu bạn thích thì tặng bạn.
要是有时间，我就去看你。|Nếu có thời gian, tôi sẽ đến thăm bạn.
#要是…的话，…|
要是你累的话，就休息一下吧。|Nếu bạn mệt thì nghỉ một chút đi.
要是他不来的话，我们怎么办？|Nếu anh ấy không đến thì chúng ta làm thế nào?
#…的话 (dùng một mình)|
明天有空的话，一起吃饭吧。|Ngày mai rảnh thì cùng đi ăn nhé.
你不想去的话，就别去了。|Bạn không muốn đi thì đừng đi nữa.
#Lời khuyên|要是我是你，我就…
要是我是你，我就不买这个。|Nếu tôi là bạn, tôi sẽ không mua cái này.
#Giả thiết trái thực tế|要是…就好了
要是我会说汉语就好了。|Giá mà tôi biết nói tiếng Trung thì tốt.
要是早点儿知道就好了。|Giá mà biết sớm hơn thì tốt rồi.
#要是 + phủ định|要是不…，就…
要是不快点儿，我们就要迟到了。|Nếu không nhanh lên, chúng ta sẽ muộn mất.
要是你不告诉我，我就不知道。|Nếu bạn không nói với tôi, tôi sẽ không biết.
#Câu hỏi|要是…，你会…吗？
要是你有很多钱，你想做什么？|Nếu bạn có thật nhiều tiền, bạn muốn làm gì?
#Không có 就|要是…，主 + V
要是你有问题，可以问我。|Nếu bạn có vấn đề, có thể hỏi tôi.
#Hai vế đảo|…，要是…的话
我们去公园吧，要是不下雨的话。|Chúng ta đi công viên nhé, nếu trời không mưa.
#Nhắc nhở|要是…，记得…
要是你到了，记得给我发短信。|Nếu bạn đến nơi, nhớ nhắn tin cho tôi.
#要是 vs 如果|cùng nghĩa
如果明天有空，我就去。/ 要是明天有空，我就去。|Nếu mai rảnh, tôi sẽ đi.
#要不是… (nếu không phải vì…)|
要不是你帮我，我早就放弃了。|Nếu không nhờ bạn giúp, tôi đã bỏ cuộc từ lâu.
#要是…，就算了|thì thôi
要是太贵，就算了。|Nếu đắt quá thì thôi.

@@g2-buleba|2|不…了 (không… nữa) và 别…了 (đừng… nữa)|不 + V + 了 / 别 + V + 了|了|
=了 cuối câu cho thấy tình hình đã thay đổi: 不…了 = trước đây làm/định làm, nay "không… nữa"; 别…了 = khuyên ngăn người khác "đừng… nữa"; 没有…了 = "hết… rồi".
?Thay đổi kế hoạch, bỏ thói quen, khuyên can, báo hết hàng.
~不…了 khác 没…: 我不去了 (đổi ý, không đi nữa) ≠ 我没去 (đã không đi).
!我没去了。（ý muốn nói đổi ý không đi nữa）|我不去了。|Đổi ý dùng 不…了.
>g1-le|了 cuối câu: thay đổi trạng thái.
#不…了: đổi ý, không làm nữa|
今天太累了，我不去了。|Hôm nay mệt quá, tôi không đi nữa.
下雨了，我们不出去了。|Trời mưa rồi, chúng ta không ra ngoài nữa.
我吃饱了，不吃了。|Tôi no rồi, không ăn nữa.
#不…了: bỏ thói quen|
他现在不抽烟了。|Bây giờ anh ấy không hút thuốc nữa.
我已经不喝咖啡了。|Tôi đã không uống cà phê nữa.
她不在那儿工作了。|Cô ấy không làm việc ở đó nữa.
#不 + Adj + 了: trạng thái thay đổi|
我的头不疼了。|Đầu tôi hết đau rồi.
现在不冷了。|Bây giờ không lạnh nữa.
他不生气了。|Anh ấy hết giận rồi.
#别…了: khuyên đừng… nữa|
别哭了，没事儿。|Đừng khóc nữa, không sao đâu.
别玩手机了，快睡觉吧。|Đừng chơi điện thoại nữa, mau đi ngủ đi.
别说了，我都知道了。|Đừng nói nữa, tôi biết cả rồi.
别等了，他不会来了。|Đừng đợi nữa, anh ấy sẽ không đến đâu.
#没有…了: hết… rồi|
冰箱里没有牛奶了。|Trong tủ lạnh hết sữa rồi.
没有时间了，快走吧！|Hết thời gian rồi, mau đi thôi!
#不能…了 / 不想…了|
我不能再喝了。|Tôi không thể uống thêm nữa.
我不想学钢琴了。|Tôi không muốn học piano nữa.
#Câu hỏi|不…了吗？
你不去了吗？|Bạn không đi nữa à?
#Phân biệt 不…了 / 没…|
我不去了。/ 我没去。|Tôi không đi nữa. / Tôi đã không đi.

@g1-zenmeyang
#Ví dụ thêm|Câu thường gặp
这个电影怎么样？好看吗？|Bộ phim này thế nào? Hay không?
你的新工作怎么样？|Công việc mới của bạn thế nào?
我们周六见面，好吗？|Thứ bảy chúng ta gặp nhau nhé, được không?
@g2-a
#Ví dụ thêm|Câu thường gặp
你的汉语说得真好啊！|Bạn nói tiếng Trung giỏi thật đấy!
小心啊，路很滑！|Cẩn thận nhé, đường trơn lắm!
@g2-mei
#Ví dụ thêm|Câu thường gặp
每个周末他都去打球。|Cuối tuần nào anh ấy cũng đi chơi bóng.
每道题都要认真做。|Câu nào cũng phải làm cẩn thận.
他每个月都给妈妈寄钱。|Tháng nào anh ấy cũng gửi tiền cho mẹ.
@g2-buleba
#Ví dụ thêm|Câu thường gặp
别担心了，一切都会好的。|Đừng lo nữa, mọi chuyện sẽ ổn thôi.
这个手机我不用了，送给你吧。|Điện thoại này tôi không dùng nữa, tặng bạn đấy.
@g3-lihe
#Ví dụ thêm|Câu thường gặp
我每天早上跑半个小时步。|Sáng nào tôi cũng chạy bộ nửa tiếng.
上课的时候别说话。|Trong giờ học đừng nói chuyện.
@g3-yaoshi
#Ví dụ thêm|Câu thường gặp
要是你迷路了，就给我打电话。|Nếu bạn bị lạc đường thì gọi cho tôi.
要是明天天气好，我们就去海边。|Nếu mai trời đẹp, chúng ta đi biển.
`;
