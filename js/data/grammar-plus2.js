// Ví dụ mở rộng cho ngữ pháp HSK 2. Định dạng: xem cuối js/data/grammar.js
export const GP2 = `
@g2-bi
#So sánh tính chất|A 比 B + Adj
哥哥比我高。|Anh trai cao hơn tôi.
今天比昨天冷。|Hôm nay lạnh hơn hôm qua.
坐飞机比坐火车快。|Đi máy bay nhanh hơn đi tàu hỏa.
这本书比那本书有意思。|Quyển sách này thú vị hơn quyển kia.
#Hơn nhiều / hơn một chút|A 比 B + Adj + 得多/多了/一点儿/一些
北京比上海冷得多。|Bắc Kinh lạnh hơn Thượng Hải nhiều.
这件衣服比那件贵一点儿。|Bộ quần áo này đắt hơn bộ kia một chút.
他的汉语比我好多了。|Tiếng Trung của anh ấy giỏi hơn tôi nhiều.
#Hơn bao nhiêu (số lượng cụ thể)|A 比 B + Adj + số lượng
我比妹妹大三岁。|Tôi lớn hơn em gái ba tuổi.
他比我高五厘米。|Anh ấy cao hơn tôi năm xăng-ti-mét.
这个比那个便宜十块钱。|Cái này rẻ hơn cái kia mười tệ.
#Càng… hơn|A 比 B + 更/还 + Adj
今天比昨天更热。|Hôm nay còn nóng hơn hôm qua.
妹妹比姐姐还漂亮。|Em gái còn xinh hơn chị gái.
#So sánh động tác (bổ ngữ trình độ)|A + V得 + 比 B + Adj / A 比 B + V得 + Adj
他跑得比我快。|Anh ấy chạy nhanh hơn tôi.
她说汉语说得比我流利。|Cô ấy nói tiếng Trung lưu loát hơn tôi.
#Động từ tâm lý|A 比 B + 喜欢/了解…
我比他更喜欢运动。|Tôi thích thể thao hơn anh ấy.
#Phủ định: 没有|A 没有 B + Adj (không dùng 不比 để nói “kém hơn”)
我没有哥哥高。|Tôi không cao bằng anh trai.
今天没有昨天热。|Hôm nay không nóng bằng hôm qua.
#Câu hỏi|A 比 B + Adj + 吗？/ 谁/哪个 + Adj？
你比他大吗？|Bạn lớn hơn anh ấy à?
你和你哥哥，谁高？|Bạn và anh trai bạn, ai cao hơn?

@g2-guo
#Đã từng (kinh nghiệm)|V + 过
我去过中国。|Tôi đã từng đi Trung Quốc.
我吃过北京烤鸭。|Tôi đã từng ăn vịt quay Bắc Kinh.
他学过两年汉语。|Anh ấy đã từng học tiếng Trung hai năm.
我见过她一次。|Tôi đã gặp cô ấy một lần.
#Chưa từng|没(有) + V + 过
我没去过上海。|Tôi chưa từng đi Thượng Hải.
他从来没坐过飞机。|Anh ấy chưa bao giờ đi máy bay.
我还没看过这个电影。|Tôi vẫn chưa xem bộ phim này.
#Câu hỏi|V + 过 + O + 吗？/ V + 过 + O + 没有？
你去过长城吗？|Bạn đã từng đến Vạn Lý Trường Thành chưa?
你看过这本书没有？|Bạn đã đọc quyển sách này chưa?
你学过什么外语？|Bạn từng học ngoại ngữ nào?
#Số lần + 过|V + 过 + số lần
我去过三次北京。|Tôi đã đi Bắc Kinh ba lần.
这个电影我看过两遍。|Bộ phim này tôi đã xem hai lượt.
#Từng có trạng thái|Adj + 过
我小时候胖过。|Hồi nhỏ tôi từng béo.
他从来没这么高兴过。|Anh ấy chưa từng vui như thế này.
#过 (xong rồi – hoàn thành, không phải kinh nghiệm)|V + 过 + 了
我吃过饭了，你吃吧。|Tôi ăn cơm rồi, bạn ăn đi.
#Phân biệt 过 / 了|过: từng trải; 了: hoàn thành
我去过北京。/ 我去北京了。|Tôi từng đi Bắc Kinh. / Tôi đi Bắc Kinh rồi (đang ở đó).
#Mở rộng|曾经…过
我曾经在那家公司工作过。|Tôi từng làm việc ở công ty đó.

@g2-zhengzai
#Đang làm|正在 + V (+ 呢)
我正在吃饭呢。|Tôi đang ăn cơm.
他们正在开会。|Họ đang họp.
妈妈正在打电话。|Mẹ đang gọi điện thoại.
外面正在下雨。|Bên ngoài đang mưa.
#在 + V / 正 + V|Các dạng tương tự
你在干什么？|Bạn đang làm gì vậy?
我正想给你打电话呢。|Tôi đang định gọi điện cho bạn đây.
#V + 呢 (chỉ dùng 呢)|Khẩu ngữ
他睡觉呢，别叫他。|Anh ấy đang ngủ, đừng gọi.
我看电视呢。|Tôi đang xem ti vi.
#Đang làm vào lúc nào đó (quá khứ / tương lai)|Thời gian + 正在 + V
昨天晚上八点我正在看书。|Tám giờ tối qua tôi đang đọc sách.
你给我打电话的时候，我正在洗澡。|Lúc bạn gọi cho tôi, tôi đang tắm.
明天这个时候，我们正在飞机上呢。|Giờ này ngày mai, chúng tôi đang ở trên máy bay.
#Phủ định|没(有) + 在 + V
我没在看电视，我在学习。|Tôi không xem ti vi, tôi đang học.
#Câu hỏi|在 + V + 吗？/ 在 + V + 什么？
你在听音乐吗？|Bạn đang nghe nhạc à?
孩子们在做什么呢？|Bọn trẻ đang làm gì vậy?
#Kết hợp với 着|正 + V + 着 + 呢
他正看着书呢。|Anh ấy đang đọc sách.
#Lưu ý: không dùng với động từ kết thúc ngay|是、在 (ở)、知道、认识…
我认识他。（不说：我正在认识他）|Tôi quen anh ấy. (Không nói “đang quen”.)
#Hỏi tình huống hiện tại|现在 + 在 + V
你现在在哪儿工作？|Bây giờ bạn đang làm việc ở đâu?
大家都在等你呢。|Mọi người đều đang đợi bạn đấy.

@g2-zhe
#Trạng thái kéo dài|V + 着
门开着。|Cửa đang mở.
他穿着一件红衣服。|Anh ấy mặc một chiếc áo đỏ.
灯还亮着呢。|Đèn vẫn còn sáng.
她手里拿着一本书。|Trong tay cô ấy cầm một quyển sách.
#Câu tồn hiện: nơi + V着 + vật|Ở đâu có gì đang ở trạng thái…
墙上挂着一张地图。|Trên tường treo một tấm bản đồ.
桌子上放着很多书。|Trên bàn để rất nhiều sách.
门口站着一个人。|Ở cửa có một người đang đứng.
#Cách thức của hành động sau|V1 + 着 + V2
他笑着说："你好！"|Anh ấy cười nói: "Xin chào!"
我们走着去吧。|Chúng ta đi bộ đi.
她常常听着音乐写作业。|Cô ấy thường vừa nghe nhạc vừa làm bài tập.
别躺着看书。|Đừng nằm đọc sách.
#Phủ định|没 + V + 着
门没开着。|Cửa không mở.
#Câu hỏi|V着…吗？/ V着…没有？
窗户开着吗？|Cửa sổ có đang mở không?
#Nhấn mạnh đang tiếp diễn|正 + V + 着 + 呢
外面下着雨呢。|Bên ngoài đang mưa đấy.
他们正聊着天呢。|Họ đang trò chuyện.
#Mệnh lệnh: giữ trạng thái|V + 着！
你拿着，这是给你的。|Bạn cầm lấy, cái này cho bạn.
你坐着，我去开门。|Bạn cứ ngồi đi, tôi ra mở cửa.
#V着V着 (đang… thì…)|V着V着 + 就…
他看着看着就睡着了。|Anh ấy xem mãi rồi ngủ thiếp đi.

@g2-de
#Mức độ của hành động|V + 得 + (很) + Adj
他跑得很快。|Anh ấy chạy rất nhanh.
你说得很好。|Bạn nói rất hay.
她唱得非常好听。|Cô ấy hát cực kỳ hay.
我昨天睡得很晚。|Hôm qua tôi ngủ rất muộn.
#Có tân ngữ: lặp động từ|V + O + V + 得 + Adj
他说汉语说得很流利。|Anh ấy nói tiếng Trung rất lưu loát.
她做饭做得很好吃。|Cô ấy nấu ăn rất ngon.
我写汉字写得不太好。|Tôi viết chữ Hán không đẹp lắm.
#Có tân ngữ: đưa tân ngữ lên trước|(主) + O + V + 得 + Adj
他汉语说得很好。|Tiếng Trung anh ấy nói rất tốt.
你字写得真漂亮！|Chữ bạn viết đẹp thật!
#Phủ định|V + 得 + 不 + Adj
他跑得不快。|Anh ấy chạy không nhanh.
我考得不好。|Tôi thi không tốt.
#Câu hỏi|V得 + Adj + 吗？/ V得 + Adj不Adj？/ V得怎么样？
你睡得好吗？|Bạn ngủ ngon không?
他说得快不快？|Anh ấy nói có nhanh không?
你考得怎么样？|Bạn thi thế nào?
#So sánh với bổ ngữ trình độ|A + V得 + 比 B + Adj
她走得比我慢。|Cô ấy đi chậm hơn tôi.
#Bổ ngữ trạng thái (kết quả là một tình trạng)|Adj/V + 得 + cụm từ
我累得不想说话。|Tôi mệt đến mức không muốn nói.
他高兴得跳了起来。|Anh ấy vui đến mức nhảy cẫng lên.
今天热得要命。|Hôm nay nóng kinh khủng.
#Khen ngợi|V得不错 / V得真好
你今天表演得不错！|Hôm nay bạn biểu diễn khá lắm!

@g2-yao
#Sắp…|要…了 / 快要…了 / 就要…了
要下雨了。|Sắp mưa rồi.
火车快要开了。|Tàu sắp chạy rồi.
我们下个月就要毕业了。|Tháng sau chúng tôi sắp tốt nghiệp rồi.
电影快开始了，快进去吧。|Phim sắp bắt đầu rồi, mau vào đi.
#Có thời gian cụ thể dùng 就要 (không dùng 快要)|Thời gian + 就要…了
明天就要考试了。|Ngày mai là thi rồi.
他八点就要走了。|Tám giờ anh ấy sẽ đi rồi.
#要: muốn (ý chí)|要 + V / 要 + danh từ
我要喝咖啡。|Tôi muốn uống cà phê.
我要一杯茶。|Tôi muốn một cốc trà.
你要买什么？|Bạn muốn mua gì?
#要: cần, phải|要 + V
明天你要早点儿来。|Ngày mai bạn phải đến sớm một chút.
过马路要小心。|Qua đường phải cẩn thận.
学汉语要多说多练。|Học tiếng Trung phải nói nhiều luyện nhiều.
#要: mất (thời gian, tiền)|要 + thời gian/tiền
从这儿到机场要一个小时。|Từ đây đến sân bay mất một tiếng.
这件衣服要三百块钱。|Bộ quần áo này mất ba trăm tệ.
#Phủ định|不想 (không muốn) / 不用 (không cần) / 不要 (đừng)
你不用来了。|Bạn không cần đến nữa.
我不想去。|Tôi không muốn đi.
#要 + 是 (nếu)|要是…就…
要是明天下雨，我们就不去了。|Nếu mai trời mưa thì chúng ta không đi nữa.
#Câu hỏi|要不要…？
你要不要一起去？|Bạn có muốn đi cùng không?

@g2-yinwei
#Vì… nên…|因为…，所以…
因为下雨，所以我没去。|Vì trời mưa nên tôi không đi.
因为他病了，所以没来上课。|Vì anh ấy bị ốm nên không đến lớp.
因为我喜欢中国文化，所以学汉语。|Vì tôi thích văn hóa Trung Quốc nên học tiếng Trung.
#Chỉ dùng 因为|…，因为… (nêu lý do sau)
我今天很累，因为昨天睡得很晚。|Hôm nay tôi rất mệt, vì hôm qua ngủ rất muộn.
他没来，因为他有事。|Anh ấy không đến vì có việc.
#Chỉ dùng 所以|…，所以… (nêu kết quả)
我感冒了，所以今天没去学校。|Tôi bị cảm nên hôm nay không đến trường.
这件衣服太贵了，所以我没买。|Bộ quần áo này đắt quá nên tôi không mua.
天太晚了，所以我们坐出租车回家。|Trời muộn quá nên chúng tôi đi taxi về nhà.
#Hỏi nguyên nhân|为什么…？——因为…
你为什么不吃饭？——因为我不饿。|Sao bạn không ăn cơm? — Vì tôi không đói.
你为什么学汉语？——因为我想去中国工作。|Sao bạn học tiếng Trung? — Vì tôi muốn sang Trung Quốc làm việc.
#因为 + danh từ / cụm danh từ|因为 + 这件事 / 天气…
因为天气不好，比赛推迟了。|Vì thời tiết xấu, trận đấu bị hoãn.
因为工作，他常常去上海。|Vì công việc, anh ấy thường đi Thượng Hải.
#Chủ ngữ đặt trước hoặc sau 因为|Chủ ngữ + 因为… / 因为 + chủ ngữ…
他因为太累了，所以很早就睡了。|Vì quá mệt nên anh ấy ngủ rất sớm.
#之所以…是因为… (mở rộng)|Sở dĩ… là vì…
我之所以迟到，是因为路上堵车。|Sở dĩ tôi đến muộn là vì đường kẹt xe.
#Phân biệt 所以 / 因此|因此 trang trọng hơn
他学习很努力，因此成绩很好。|Anh ấy học rất chăm chỉ, do đó thành tích rất tốt.
#Nói tắt trong hội thoại|——为什么？——因为…呀！
为什么不去？——因为太远了呀！|Sao không đi? — Vì xa quá mà!

@g2-suiran
#Tuy… nhưng…|虽然…，但是/可是…
虽然很累，但是我很高兴。|Tuy rất mệt nhưng tôi rất vui.
虽然汉语很难，但是很有意思。|Tuy tiếng Trung khó nhưng rất thú vị.
虽然下雨了，可是他还是来了。|Tuy trời mưa nhưng anh ấy vẫn đến.
这家饭店虽然不大，但是菜很好吃。|Nhà hàng này tuy không lớn nhưng đồ ăn rất ngon.
#Chủ ngữ đặt trước 虽然|Chủ ngữ + 虽然…，但是…
他虽然很忙，但是每天都运动。|Anh ấy tuy rất bận nhưng ngày nào cũng tập thể dục.
我虽然学了三年汉语，可是说得还不太好。|Tôi tuy học tiếng Trung ba năm rồi nhưng nói vẫn chưa giỏi lắm.
#Có thể bỏ 虽然|…，但是/可是…
我想去，可是没有时间。|Tôi muốn đi nhưng không có thời gian.
这件衣服很漂亮，但是太贵了。|Bộ quần áo này rất đẹp nhưng đắt quá.
#但是 + 还是/也 (vẫn, cũng)|Nhấn mạnh kết quả không đổi
虽然他病了，但是还是去上班了。|Tuy bị ốm nhưng anh ấy vẫn đi làm.
虽然很冷，但是他也不穿外套。|Tuy rất lạnh nhưng anh ấy cũng không mặc áo khoác.
#Ý ngược với dự đoán|虽然 + sự thật, 但是 + ý trái ngược
虽然他是中国人，但是他不会说上海话。|Tuy là người Trung Quốc nhưng anh ấy không biết nói tiếng Thượng Hải.
虽然价格不便宜，但是买的人很多。|Tuy giá không rẻ nhưng người mua rất đông.
#Biến thể khẩu ngữ / văn viết|不过 / 却
我很喜欢这个工作，不过工资不太高。|Tôi rất thích công việc này, có điều lương không cao lắm.
虽然他很努力，却没有通过考试。|Tuy rất cố gắng nhưng anh ấy lại không qua kỳ thi.
#Lỗi thường gặp|Không dùng 虽然…所以
虽然天气不好，但是我们还是出去玩儿了。|Tuy thời tiết không đẹp nhưng chúng tôi vẫn ra ngoài chơi.
#Trong hội thoại|是…，可是…
好是好，可是太贵了。|Tốt thì tốt thật, nhưng đắt quá.

@g2-bie
#Đừng (khuyên, ngăn)|别 + V
别说话！|Đừng nói chuyện!
别担心，没问题。|Đừng lo, không vấn đề gì.
别忘了带护照。|Đừng quên mang hộ chiếu.
你别生气了。|Bạn đừng giận nữa.
#不要 (trang trọng hơn)|不要 + V
上课的时候不要玩手机。|Trong giờ học đừng chơi điện thoại.
这里不要抽烟。|Ở đây không được hút thuốc.
请不要在这儿停车。|Xin đừng đỗ xe ở đây.
#Đừng… nữa|别 + V + 了
别哭了。|Đừng khóc nữa.
别看电视了，快睡觉吧。|Đừng xem ti vi nữa, mau đi ngủ đi.
别等了，他不会来了。|Đừng đợi nữa, anh ấy sẽ không đến đâu.
#Đừng quá…|别太 + Adj
别太累了。|Đừng làm việc quá mệt.
别太晚回来。|Đừng về muộn quá.
#Khỏi cần|不用 + V
不用谢。|Không cần cảm ơn.
你不用来接我。|Bạn không cần đến đón tôi.
#Lời khuyên lịch sự|最好别 / 还是别
你最好别吃太多甜的。|Bạn tốt nhất đừng ăn quá nhiều đồ ngọt.
下雨了，你还是别去了。|Trời mưa rồi, bạn vẫn đừng đi thì hơn.
#Nhắc nhở|别 + V + 错/晚…
别走错路。|Đừng đi nhầm đường.
#Kết hợp 千万 (nhất định đừng)|千万别 + V
你千万别告诉他。|Bạn nhất định đừng nói với anh ấy.

@g2-ba
#Đề nghị, rủ rê|…吧！
我们走吧。|Chúng ta đi thôi.
一起吃饭吧。|Cùng ăn cơm đi.
你休息一下吧。|Bạn nghỉ một chút đi.
我们明天再说吧。|Mai chúng ta nói tiếp nhé.
#Phỏng đoán, hỏi xác nhận|…吧？ = chắc là… phải không?
你是中国人吧？|Bạn là người Trung Quốc phải không?
他已经走了吧？|Chắc anh ấy đi rồi nhỉ?
这个很贵吧？|Cái này chắc đắt lắm nhỉ?
你累了吧？|Bạn mệt rồi phải không?
#Đồng ý, chấp nhận|好吧 / 行吧 / 那…吧
好吧，我去。|Thôi được, tôi đi.
那就这样吧。|Vậy cứ thế đi.
#Ra lệnh nhẹ nhàng|V + 吧
你说吧，我听着呢。|Bạn nói đi, tôi đang nghe đây.
快点儿吧，要迟到了。|Nhanh lên đi, sắp muộn rồi.
#Ngập ngừng, giả định|…吧，…；…吧，…
去吧，太远；不去吧，又不好意思。|Đi thì xa quá; không đi thì lại ngại.
#Phân biệt 吗 / 吧|吗: hỏi thật; 吧: đoán và cần xác nhận
你是老师吗？/ 你是老师吧？|Bạn là giáo viên à? / Chắc bạn là giáo viên nhỉ?
#Gợi ý với 我们 / 咱们|咱们 + V + 吧
咱们打车去吧。|Chúng mình bắt taxi đi nhé.
咱们休息一会儿吧。|Chúng mình nghỉ một lát nhé.
#Đề nghị cho bản thân|我来 + V + 吧
我来帮你吧。|Để tôi giúp bạn nhé.
我来介绍一下吧。|Để tôi giới thiệu một chút nhé.

@g2-congdao
#Từ thời gian… đến thời gian…|从 + T1 + 到 + T2
我从八点到十二点上课。|Tôi học từ tám giờ đến mười hai giờ.
商店从早上九点到晚上十点开门。|Cửa hàng mở cửa từ chín giờ sáng đến mười giờ tối.
从星期一到星期五我都很忙。|Từ thứ hai đến thứ sáu tôi đều rất bận.
#Từ nơi… đến nơi…|从 + nơi A + 到 + nơi B
从我家到学校很近。|Từ nhà tôi đến trường rất gần.
从北京到上海坐高铁要五个小时。|Từ Bắc Kinh đến Thượng Hải đi tàu cao tốc mất năm tiếng.
从这儿到那儿怎么走？|Từ đây đến đó đi thế nào?
#从 + nơi + 来/去/出发|Xuất phát từ
我是从越南来的。|Tôi đến từ Việt Nam.
我们从学校出发。|Chúng tôi xuất phát từ trường.
他刚从中国回来。|Anh ấy vừa từ Trung Quốc về.
#从 + thời điểm + 开始/起|Bắt đầu từ
从明天开始，我每天跑步。|Bắt đầu từ ngày mai, ngày nào tôi cũng chạy bộ.
从下个月起，我去上海工作。|Từ tháng sau, tôi đi Thượng Hải làm việc.
#Phạm vi: từ… đến… (người, vật)|从 A 到 B 都…
从老人到孩子都喜欢这个节目。|Từ người già đến trẻ em đều thích chương trình này.
#从…以后 / 从…以来|Kể từ… về sau
从那天以后，他再也没来过。|Kể từ hôm đó, anh ấy không bao giờ đến nữa.
#Qua nơi nào (đi qua)|从 + nơi + 走/过
你从这条路走，比较近。|Bạn đi theo con đường này thì gần hơn.
#从…到… làm định ngữ|从…到…的 + danh từ
从河内到胡志明市的飞机票多少钱？|Vé máy bay từ Hà Nội đến TP Hồ Chí Minh bao nhiêu tiền?
#Hỏi|从哪儿 / 从什么时候
你从什么时候开始学汉语的？|Bạn bắt đầu học tiếng Trung từ khi nào?

@g2-li
#Khoảng cách không gian|A 离 B + 远/近
我家离学校很近。|Nhà tôi cách trường rất gần.
机场离这儿很远。|Sân bay cách đây rất xa.
银行离超市不远。|Ngân hàng cách siêu thị không xa.
#Khoảng cách có số liệu|A 离 B + 有 + số km/m
我家离公司有五公里。|Nhà tôi cách công ty năm cây số.
这儿离火车站大概两百米。|Đây cách ga tàu khoảng hai trăm mét.
#Câu hỏi|A 离 B 远吗？/ 有多远？
你家离这儿远吗？|Nhà bạn cách đây có xa không?
学校离地铁站有多远？|Trường cách ga tàu điện bao xa?
#Khoảng cách thời gian|离 + sự kiện + 还有 + thời gian
离春节还有一个月。|Còn một tháng nữa là đến Tết.
离考试只有三天了。|Chỉ còn ba ngày nữa là thi.
离上课还有十分钟。|Còn mười phút nữa là vào học.
#Lựa chọn chỗ ở theo khoảng cách|离…近一点儿
我想找一个离公司近一点儿的房子。|Tôi muốn tìm một căn nhà gần công ty hơn một chút.
#Phân biệt 离 / 从|离: khoảng cách; 从: điểm xuất phát
我家离学校很近，我从家走到学校只要五分钟。|Nhà tôi cách trường rất gần, tôi đi bộ từ nhà đến trường chỉ mất năm phút.
#Mở rộng: 离开 (rời khỏi)|离开 + nơi
他明天离开北京。|Ngày mai anh ấy rời Bắc Kinh.
离开家以前，记得关灯。|Trước khi rời nhà, nhớ tắt đèn.
#So sánh khoảng cách|A 离 B 比 C 离 B + 近/远
我家离学校比他家近。|Nhà tôi gần trường hơn nhà anh ấy.
#Không xa lắm|离…不太远
医院离这儿不太远，走路十分钟。|Bệnh viện cách đây không xa lắm, đi bộ mười phút.

@g2-yixia
#Làm một chút, làm thử|V + 一下
请等一下。|Xin chờ một chút.
你看一下这个。|Bạn xem cái này một chút.
我想休息一下。|Tôi muốn nghỉ một chút.
我们讨论一下吧。|Chúng ta thảo luận một chút nhé.
#Lời nhờ vả lịch sự|请/帮我 + V + 一下
请你帮我一下。|Xin bạn giúp tôi một chút.
麻烦你开一下门。|Phiền bạn mở cửa giúp.
你能介绍一下你自己吗？|Bạn có thể giới thiệu một chút về bản thân không?
#V + 一下 + tân ngữ|Tân ngữ đứng sau 一下
我去问一下老师。|Tôi đi hỏi thầy giáo một chút.
我想试一下这件衣服。|Tôi muốn thử bộ quần áo này.
#Tân ngữ là người: có thể đứng trước 一下|V + người + 一下
你等我一下。|Bạn đợi tôi một chút.
#So sánh với lặp động từ|看一下 = 看看 = 看一看
你尝一下。/ 你尝尝。|Bạn nếm thử xem.
我们听一听。|Chúng ta nghe thử xem.
#一下 + động tác ngắn (số lượng)|V + 了 + 一下
他敲了一下门。|Anh ấy gõ cửa một cái.
她笑了一下。|Cô ấy cười một cái.
#一下子 (bỗng chốc, một lúc)|一下子 + V
他一下子就明白了。|Anh ấy hiểu ngay lập tức.
#Phép lịch sự khi giới thiệu|我介绍一下，这是…
我介绍一下，这是我的朋友小李。|Tôi giới thiệu một chút, đây là bạn tôi Tiểu Lý.
#Mời ăn uống|尝一下 / 喝一下
你尝一下我做的菜。|Bạn nếm thử món tôi nấu nhé.

@g2-ci
#Số lần (động lượng từ 次)|V + số + 次
我去过两次北京。|Tôi đã đi Bắc Kinh hai lần.
这个药一天吃三次。|Thuốc này một ngày uống ba lần.
我们见过一次。|Chúng tôi đã gặp nhau một lần.
#遍: từ đầu đến cuối một lượt|V + số + 遍
请再说一遍。|Xin nói lại một lần nữa.
这本书我看了三遍。|Quyển sách này tôi đã đọc ba lượt.
课文我读了两遍。|Bài khóa tôi đã đọc hai lượt.
#下: động tác ngắn (gõ, đánh…)|V + 了 + số + 下
他敲了三下门。|Anh ấy gõ cửa ba cái.
钟响了十二下。|Đồng hồ điểm mười hai tiếng.
#趟: chuyến đi (đi rồi về)|V + số + 趟
我去了一趟超市。|Tôi đã đi siêu thị một chuyến.
这个周末我要回一趟老家。|Cuối tuần này tôi phải về quê một chuyến.
#顿: bữa, trận (ăn, mắng)|V + 了 + 一顿
我们一天吃三顿饭。|Chúng tôi ăn ba bữa một ngày.
他被爸爸骂了一顿。|Anh ấy bị bố mắng một trận.
#Vị trí tân ngữ thường|V + số lần + O
我看过一次那个电影。|Tôi đã xem bộ phim đó một lần.
#Tân ngữ là người/đại từ|V + O(người) + số lần
我找过他两次。|Tôi đã tìm anh ấy hai lần.
我见过她一次。|Tôi đã gặp cô ấy một lần.
#Tân ngữ là địa danh: đứng trước hoặc sau|去过北京两次 = 去过两次北京
我来过上海三次。|Tôi đã đến Thượng Hải ba lần.
#Hỏi|V + 了/过 + 几次？
你去过几次中国？|Bạn đã đi Trung Quốc mấy lần?

@g2-shiliang
#Làm trong bao lâu|V + (了) + khoảng thời gian
我每天睡八个小时。|Mỗi ngày tôi ngủ tám tiếng.
我们休息十分钟吧。|Chúng ta nghỉ mười phút nhé.
他在北京住了三年。|Anh ấy đã sống ở Bắc Kinh ba năm.
#Có tân ngữ: lặp động từ|V + O + V + (了) + thời gian
我学汉语学了两年。|Tôi đã học tiếng Trung hai năm.
他看电视看了一个晚上。|Anh ấy xem ti vi cả buổi tối.
#Có tân ngữ: thời gian + (的) + tân ngữ|V + 了 + thời gian + (的) + O
我学了两年(的)汉语。|Tôi đã học hai năm tiếng Trung.
她打了一个小时(的)电话。|Cô ấy gọi điện một tiếng đồng hồ.
#Tân ngữ là người: đứng trước thời gian|V + người + thời gian
我等了你半个小时。|Tôi đã đợi bạn nửa tiếng.
#Đến bây giờ vẫn tiếp tục|V + 了 + thời gian + 了
我学汉语学了一年了。|Tôi học tiếng Trung được một năm rồi (vẫn đang học).
我们等了二十分钟了，他还没来。|Chúng tôi đợi hai mươi phút rồi mà anh ấy vẫn chưa đến.
#Thời gian kể từ khi một việc xảy ra|V + 了 + thời gian + 了 (động từ không kéo dài)
他来中国三年了。|Anh ấy đến Trung Quốc được ba năm rồi.
我大学毕业两年了。|Tôi tốt nghiệp đại học được hai năm rồi.
他走了半个小时了。|Anh ấy đi được nửa tiếng rồi.
#Bao lâu không làm|thời gian + 没 + V
我三天没看见他了。|Ba ngày rồi tôi không gặp anh ấy.
#Câu hỏi|V + 了 + 多长时间 / 多久？
你学汉语学了多长时间了？|Bạn học tiếng Trung bao lâu rồi?
你每天睡几个小时？|Mỗi ngày bạn ngủ mấy tiếng?
#Phân biệt với thời điểm|Thời điểm đứng trước V, thời lượng đứng sau V
我八点学习，学两个小时。|Tôi học lúc tám giờ, học hai tiếng.

@g2-zui
#Nhất (tính từ)|最 + Adj
他是我们班最高的学生。|Anh ấy là học sinh cao nhất lớp chúng tôi.
这是最便宜的一个。|Đây là cái rẻ nhất.
我觉得秋天最舒服。|Tôi thấy mùa thu dễ chịu nhất.
#Nhất (động từ tâm lý)|最 + 喜欢/爱/想/怕…
我最喜欢吃饺子。|Tôi thích ăn sủi cảo nhất.
她最怕考试。|Cô ấy sợ thi nhất.
我最想去的地方是北京。|Nơi tôi muốn đến nhất là Bắc Kinh.
#Trong phạm vi|在…中/里，…最…
在所有的水果里，我最喜欢苹果。|Trong tất cả các loại hoa quả, tôi thích táo nhất.
我们家我最小。|Nhà tôi tôi nhỏ nhất.
#Câu hỏi|谁/哪个/什么 + 最…？
你们班谁最高？|Lớp bạn ai cao nhất?
你最喜欢什么颜色？|Bạn thích màu gì nhất?
哪个季节最冷？|Mùa nào lạnh nhất?
#最 + phương vị / thời gian|最前边 / 最后 / 最近 / 最早
他坐在最前边。|Anh ấy ngồi ở hàng đầu tiên.
最近我很忙。|Dạo này tôi rất bận.
我最后一个到。|Tôi đến cuối cùng.
#最好 (tốt nhất là nên)|最好 + V
你最好早点儿去。|Bạn tốt nhất nên đi sớm một chút.
下雨了，最好带伞。|Trời mưa rồi, tốt nhất nên mang ô.
#最 + 不 + Adj|Kém nhất
这是最不好吃的菜。|Đây là món dở nhất.
#Kết hợp 之一|最…的…之一
这是中国最有名的城市之一。|Đây là một trong những thành phố nổi tiếng nhất Trung Quốc.

@g2-gei
#给 + người + V (làm gì cho ai)|Giới từ
我给妈妈打电话。|Tôi gọi điện cho mẹ.
他给我写了一封信。|Anh ấy đã viết cho tôi một bức thư.
我给你介绍一下。|Tôi giới thiệu cho bạn một chút.
老师给我们上课。|Thầy giáo dạy chúng tôi.
#给 (động từ: đưa, cho)|给 + người + vật
妈妈给我一百块钱。|Mẹ cho tôi một trăm tệ.
请给我一杯水。|Xin cho tôi một cốc nước.
你给他什么礼物？|Bạn tặng anh ấy quà gì?
#V + 给 + người (bổ ngữ)|送给 / 借给 / 交给 / 寄给
这本书送给你。|Quyển sách này tặng bạn.
我把钱借给他了。|Tôi đã cho anh ấy mượn tiền.
请把作业交给老师。|Hãy nộp bài tập cho thầy giáo.
#Làm giúp ai|给 + người + V (thay ai làm)
你给我拿一下书包。|Bạn cầm giúp tôi cái cặp.
我给你做饭吧。|Để tôi nấu cơm cho bạn nhé.
#给 + người + 看/听|Cho ai xem/nghe
给我看看你的照片。|Cho tôi xem ảnh của bạn đi.
#Phủ định|不/没 + 给 + người + V
他没给我打电话。|Anh ấy không gọi điện cho tôi.
#Câu hỏi|给谁 + V？
你给谁买的礼物？|Bạn mua quà cho ai vậy?
#给 trong câu bị động (khẩu ngữ)|给 = 被
我的自行车给人骑走了。|Xe đạp của tôi bị người ta đạp đi mất rồi.
#Phân biệt 给 / 对|对: hướng tới (nói, cười với); 给: làm cho
他对我笑了笑，给我倒了一杯茶。|Anh ấy cười với tôi rồi rót cho tôi một cốc trà.

@g2-rang
#让: bảo, để cho ai làm|A 让 B + V
妈妈让我早点儿回家。|Mẹ bảo tôi về nhà sớm một chút.
老师让我们读课文。|Thầy giáo bảo chúng tôi đọc bài khóa.
让我想一想。|Để tôi nghĩ một chút.
#叫: bảo, gọi ai làm|A 叫 B + V
爸爸叫我去买菜。|Bố bảo tôi đi mua rau.
经理叫你去他办公室。|Giám đốc gọi bạn đến văn phòng.
#请: mời ai làm|A 请 B + V
我请你吃饭。|Tôi mời bạn ăn cơm.
他请我去他家玩儿。|Anh ấy mời tôi đến nhà chơi.
请您坐这儿。|Mời ông ngồi đây.
#让 + người + cảm xúc|Làm cho ai…
这件事让我很高兴。|Chuyện này khiến tôi rất vui.
他的话让大家都笑了。|Lời anh ấy khiến mọi người đều cười.
这个消息让她很难过。|Tin này khiến cô ấy rất buồn.
#Phủ định|不让 / 没让
妈妈不让我玩手机。|Mẹ không cho tôi chơi điện thoại.
老师没让我们写作业。|Thầy giáo không bảo chúng tôi làm bài tập.
#Câu hỏi|让谁…？/ 谁让你…？
谁让你来的？|Ai bảo bạn đến?
#Xin phép|让我 + V + 吧
让我试试吧。|Để tôi thử nhé.
#Mở rộng: 使 (trang trọng)|使 + người + Adj/V
运动使人健康。|Vận động khiến con người khỏe mạnh.

@g2-jiu
#Sớm, nhanh hơn dự kiến|Thời gian + 就 + V
我六点就起床了。|Sáu giờ tôi đã dậy rồi.
他十八岁就大学毕业了。|Mới mười tám tuổi anh ấy đã tốt nghiệp đại học.
电影七点开始，他六点半就到了。|Phim bắt đầu lúc bảy giờ, anh ấy sáu rưỡi đã đến rồi.
#Ngay lập tức|就 + V / 马上就
我就来！|Tôi đến ngay!
你等一下，他马上就到。|Bạn đợi một chút, anh ấy đến ngay đây.
#一… 就… (vừa… liền…)|一 + V1 + 就 + V2
他一回家就睡觉了。|Anh ấy vừa về nhà là đi ngủ.
我一看就明白了。|Tôi vừa nhìn là hiểu ngay.
#Điều kiện → kết quả|如果/要是…就… / V了…就…
如果你有问题，就问我。|Nếu bạn có câu hỏi thì hỏi tôi.
下了课我就去找你。|Tan học tôi sẽ đi tìm bạn.
#Chỉ, chỉ có (= 只)|就 + số lượng / danh từ
我就有一百块钱。|Tôi chỉ có một trăm tệ.
我们班就他一个人会说日语。|Lớp chúng tôi chỉ có mình anh ấy biết nói tiếng Nhật.
#Chính là (nhấn mạnh)|就 + 是 / 就 + 在
这就是我的家。|Đây chính là nhà tôi.
银行就在前边。|Ngân hàng ở ngay phía trước.
我要的就是这个。|Cái tôi muốn chính là cái này.
#Ít, sớm hơn so với 才|就 (sớm, dễ) ↔ 才 (muộn, khó)
他八点就来了，我九点才来。|Anh ấy tám giờ đã đến, tôi chín giờ mới đến.
#就要…了 (sắp)|
我们就要放假了。|Chúng tôi sắp được nghỉ rồi.
#Đồng ý, quyết định|那就… / 就这样
那就这么办吧。|Vậy cứ làm như thế đi.

@g2-ye-hai
#也: cũng|Chủ ngữ + 也 + V/Adj
我也是学生。|Tôi cũng là học sinh.
他喜欢喝茶，我也喜欢。|Anh ấy thích uống trà, tôi cũng thích.
这儿的菜好吃，也不贵。|Đồ ăn ở đây ngon, cũng không đắt.
#也 phủ định|也不 / 也没
我也不知道。|Tôi cũng không biết.
他没去，我也没去。|Anh ấy không đi, tôi cũng không đi.
#还: vẫn, vẫn còn|还 + V/Adj
他还在睡觉。|Anh ấy vẫn đang ngủ.
都十点了，他还没起床。|Đã mười giờ rồi mà anh ấy vẫn chưa dậy.
雨还下着呢。|Mưa vẫn đang rơi.
#还: còn, thêm nữa|还 + V / 还有…
我还想喝一杯。|Tôi còn muốn uống thêm một cốc.
你还要别的吗？|Bạn còn muốn gì khác không?
我会说汉语，还会说英语。|Tôi biết nói tiếng Trung, còn biết nói tiếng Anh nữa.
#还: tạm được|还 + 可以/行/不错
我的汉语还可以。|Tiếng Trung của tôi tạm được.
这个菜味道还不错。|Món này vị cũng khá.
#还是: vẫn là, hay là, tốt hơn là|
他还是那么年轻。|Anh ấy vẫn trẻ như thế.
我们还是坐地铁吧。|Chúng ta đi tàu điện ngầm thì hơn.
#还 trong so sánh|A 比 B 还 + Adj
他比我还高。|Anh ấy còn cao hơn tôi.
#也 + 都 kết hợp|…也都…
他们也都来了。|Họ cũng đều đến cả rồi.

@g2-guo
#Đã từng (kinh nghiệm)
她以前当过老师。|Trước đây cô ấy từng làm giáo viên.
@g2-zhe
#Trạng thái kéo dài
他戴着一顶帽子。|Anh ấy đội một chiếc mũ.
@g2-yinwei
#Vì… nên…
因为路上堵车，所以我迟到了。|Vì đường kẹt xe nên tôi đến muộn.
@g2-suiran
#Tuy… nhưng…
虽然天气很冷，但是街上人很多。|Tuy trời rất lạnh nhưng ngoài phố rất đông người.
虽然我们是第一次见面，但是好像老朋友一样。|Tuy là lần đầu gặp nhau nhưng chúng tôi như bạn cũ.
#Chủ ngữ đặt trước 虽然
这个手机虽然旧了，但是还很好用。|Chiếc điện thoại này tuy cũ rồi nhưng vẫn rất dễ dùng.
@g2-congdao
#Từ thời gian… đến thời gian…
我们从九月到一月上课。|Chúng tôi học từ tháng chín đến tháng một.
#Từ nơi… đến nơi…
从学校到图书馆走路只要五分钟。|Từ trường đến thư viện đi bộ chỉ mất năm phút.
#从 + nơi + 来/去/出发
飞机从上海起飞。|Máy bay cất cánh từ Thượng Hải.
@g2-li
#Khoảng cách thời gian
离我的生日还有两个星期。|Còn hai tuần nữa là đến sinh nhật tôi.
@g2-yixia
#Làm một chút, làm thử
你听一下，这是什么声音？|Bạn nghe thử xem, đây là tiếng gì?
@g2-shiliang
#Làm trong bao lâu
昨天我跑了一个小时步。|Hôm qua tôi chạy bộ một tiếng.
@g2-gei
#给 + người + V (làm gì cho ai)
姐姐给我买了一件新衣服。|Chị gái mua cho tôi một bộ quần áo mới.
@g2-rang
#让: bảo, để cho ai làm
医生让他多休息。|Bác sĩ bảo anh ấy nghỉ ngơi nhiều.
@g2-ye-hai
#还: còn, thêm nữa
除了米饭，还要一个汤。|Ngoài cơm ra, còn muốn thêm một bát canh.
`;
