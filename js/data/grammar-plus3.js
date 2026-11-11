// Ví dụ mở rộng cho ngữ pháp HSK 3. Định dạng: xem cuối js/data/grammar.js
export const GP3 = `
@g2-rang
#让 + người + cảm xúc
他的进步让老师很满意。|Sự tiến bộ của anh ấy khiến thầy giáo rất hài lòng.

@g3-ba
#Xử lý một vật (đã xác định)|主 + 把 + O + V + thành phần khác
我把作业做完了。|Tôi đã làm xong bài tập.
请把门关上。|Hãy đóng cửa lại.
他把钱包丢了。|Anh ấy làm mất ví rồi.
妈妈把衣服洗干净了。|Mẹ đã giặt sạch quần áo.
#Di chuyển vật đến đâu|把 + O + V + 在/到 + nơi
把书放在桌子上。|Đặt sách lên bàn.
我把车停在门口了。|Tôi đã đỗ xe ở cửa.
请把这些东西搬到楼上。|Hãy chuyển những đồ này lên tầng trên.
#Đưa vật cho ai|把 + O + V + 给 + người
我把照片发给你。|Tôi gửi ảnh cho bạn.
请把盐递给我。|Làm ơn đưa muối cho tôi.
#Biến thành cái khác|把 + A + V + 成 + B
请把这句话翻译成汉语。|Hãy dịch câu này sang tiếng Trung.
我把美元换成了人民币。|Tôi đã đổi đô la sang nhân dân tệ.
#Với bổ ngữ xu hướng|把 + O + V + 来/去/回来/出去…
你把雨伞带去吧。|Bạn mang ô đi đi.
他把书还回来了。|Anh ấy đã trả sách lại rồi.
#Phủ định và năng nguyện đặt trước 把|没/不/别/要/能 + 把…
我没把这件事告诉他。|Tôi không nói chuyện này với anh ấy.
别把手机忘在家里。|Đừng để quên điện thoại ở nhà.
你要把房间打扫干净。|Bạn phải dọn phòng cho sạch.
#Câu mệnh lệnh|(请) + 把 + O + V + …
把手机给我。|Đưa điện thoại cho tôi.
把空调打开吧。|Bật điều hòa lên đi.
#Lưu ý: động từ phải có thành phần khác đi kèm|Không nói 我把饭吃
我把饭吃完了。（不说：我把饭吃）|Tôi đã ăn hết cơm. (Không nói “我把饭吃”.)

@g3-bei
#Bị động có người làm|A + 被 + B + V + thành phần khác
我的自行车被小偷偷走了。|Xe đạp của tôi bị trộm lấy mất.
蛋糕被弟弟吃完了。|Bánh kem bị em trai ăn hết rồi.
他被老师批评了。|Anh ấy bị thầy giáo phê bình.
窗户被风吹开了。|Cửa sổ bị gió thổi mở ra.
#Bị động không nói người làm|A + 被 + V + …
我的手机被偷了。|Điện thoại của tôi bị trộm rồi.
他被选为班长。|Anh ấy được chọn làm lớp trưởng.
#叫 / 让 (khẩu ngữ, phải có người làm)|A + 叫/让 + B + V + …
我的书叫他借走了。|Sách của tôi bị anh ấy mượn đi rồi.
衣服让雨淋湿了。|Quần áo bị mưa làm ướt rồi.
#Phủ định|没(有) + 被 + …
他没被老师发现。|Anh ấy không bị thầy giáo phát hiện.
我的钱包没被偷。|Ví của tôi không bị trộm.
#Năng nguyện đặt trước 被|会/可能/不能 + 被…
你这样做会被别人笑话的。|Bạn làm thế này sẽ bị người khác cười đấy.
#Bị động mang nghĩa tích cực|被 + 表扬/选/邀请…
她被公司派到上海工作。|Cô ấy được công ty cử đến Thượng Hải làm việc.
我被邀请参加他们的婚礼。|Tôi được mời dự đám cưới của họ.
#Câu bị động ý nghĩa (không có 被)|Vật + V + 了
作业写完了。|Bài tập viết xong rồi.
信已经寄出去了。|Thư đã gửi đi rồi.
#Phân biệt 把 / 被|把: ai làm gì với vật; 被: vật bị ai làm gì
弟弟把杯子打破了。/ 杯子被弟弟打破了。|Em trai làm vỡ cái cốc. / Cái cốc bị em trai làm vỡ.
#Mở rộng: 被…所…|Văn viết
他被这个故事所感动。|Anh ấy bị câu chuyện này làm cảm động.

@g3-kq
#完: xong, hết|V + 完
我吃完饭就去。|Tôi ăn cơm xong sẽ đi ngay.
这本书我看完了。|Quyển sách này tôi đọc xong rồi.
#好: xong xuôi, tốt|V + 好
饭做好了，来吃吧。|Cơm nấu xong rồi, đến ăn đi.
你准备好了吗？|Bạn chuẩn bị xong chưa?
#到: đạt được, tới|V + 到
我找到我的钥匙了。|Tôi tìm thấy chìa khóa rồi.
我们八点到学校。|Chúng tôi đến trường lúc tám giờ.
我买到票了。|Tôi mua được vé rồi.
#见: thấy (qua giác quan)|看见 / 听见
你看见我的手机了吗？|Bạn có thấy điện thoại của tôi không?
我听见有人敲门。|Tôi nghe thấy có người gõ cửa.
#懂: hiểu|看懂 / 听懂
老师的话你听懂了吗？|Lời thầy giáo bạn nghe hiểu không?
这封信我看不懂。|Bức thư này tôi đọc không hiểu.
#错 / 对: sai / đúng|V + 错/对
对不起，我打错电话了。|Xin lỗi, tôi gọi nhầm số.
这个问题你回答对了。|Câu hỏi này bạn trả lời đúng rồi.
#会: biết (học xong biết làm)|学会
我学会游泳了。|Tôi học biết bơi rồi.
#住: giữ chắc, ghi nhớ|记住 / 站住 / 拿住
请记住我的电话号码。|Hãy nhớ số điện thoại của tôi.
#走 / 掉: rời đi, mất đi|拿走 / 吃掉 / 忘掉
谁把我的书拿走了？|Ai lấy mất sách của tôi rồi?
#干净 / 清楚 (tính từ làm bổ ngữ)|洗干净 / 说清楚 / 写清楚
你说清楚一点儿。|Bạn nói rõ hơn một chút.
#Phủ định|没 + V + KQ
我没听懂。|Tôi nghe không hiểu.
#Câu hỏi|V + KQ + 了吗？/ V + 没 + V + KQ？
作业做完了没有？|Bài tập làm xong chưa?

@g3-xh
#Xu hướng đơn: 来 (về phía người nói) / 去 (rời xa người nói)|V + 来/去
你过来！|Bạn lại đây!
他上楼去了。|Anh ấy lên lầu rồi.
妈妈买来了很多水果。|Mẹ mua về rất nhiều hoa quả.
#Vị trí tân ngữ nơi chốn|V + nơi chốn + 来/去
他回家去了。|Anh ấy về nhà rồi.
老师进教室来了。|Thầy giáo vào lớp rồi.
#Xu hướng kép: 上来/下去/进来/出去/回来/过去/起来|V + 上/下/进/出/回/过/起 + 来/去
他从楼上走下来了。|Anh ấy từ trên lầu đi xuống.
小狗跑出去了。|Con chó nhỏ chạy ra ngoài rồi.
你快进来吧。|Bạn mau vào đi.
他把书拿回来了。|Anh ấy cầm sách về rồi.
大家都站起来了。|Mọi người đều đứng dậy.
#Tân ngữ nơi chốn đứng giữa|V + 上/下… + nơi + 来/去
他跑上楼去了。|Anh ấy chạy lên lầu rồi.
同学们走进教室来了。|Các bạn học sinh đi vào lớp rồi.
#Tân ngữ là vật: đứng giữa hoặc sau|V + 出 + 一本书 + 来 / V + 出来 + 一本书
他从书包里拿出一本书来。|Anh ấy lấy từ cặp ra một quyển sách.
他从书包里拿出来一本书。|Anh ấy lấy từ cặp ra một quyển sách.
#Nghĩa mở rộng: 起来 (bắt đầu; nhớ ra; xét về)|
大家笑起来了。|Mọi người bắt đầu cười.
我想起来了，他姓王。|Tôi nhớ ra rồi, anh ấy họ Vương.
这件衣服看起来很贵。|Bộ quần áo này trông có vẻ đắt.
#Nghĩa mở rộng: 下去 (tiếp tục) / 下来 (cố định, dừng lại)|
你说下去，我在听。|Bạn nói tiếp đi, tôi đang nghe.
请把这句话写下来。|Hãy viết câu này lại.
车慢慢停下来了。|Xe từ từ dừng lại.
#Nghĩa mở rộng: 出来 (nhận ra, tạo ra)|
我听出来了，是你的声音。|Tôi nghe ra rồi, là giọng của bạn.
#Phủ định|没 + V + 来/去
他还没回来。|Anh ấy vẫn chưa về.

@g3-kn
#Có thể / không thể đạt kết quả|V + 得/不 + bổ ngữ kết quả
我听得懂。/ 我听不懂。|Tôi nghe hiểu được. / Tôi nghe không hiểu.
字太小了，我看不清楚。|Chữ nhỏ quá, tôi nhìn không rõ.
这么多菜，我们吃不完。|Nhiều món thế này, chúng tôi ăn không hết.
今天的作业你做得完吗？|Bài tập hôm nay bạn làm có xong không?
#Có thể / không thể theo hướng|V + 得/不 + bổ ngữ xu hướng
门太小，桌子搬不进去。|Cửa nhỏ quá, cái bàn không chuyển vào được.
山太高了，我爬不上去。|Núi cao quá, tôi leo không lên được.
他今天回得来吗？|Hôm nay anh ấy có về được không?
#V得了 / V不了 (liǎo): có thể / không thể làm được|
我明天有事，去不了。|Ngày mai tôi có việc, không đi được.
这么多，你吃得了吗？|Nhiều thế này, bạn ăn hết được không?
他病了，来不了了。|Anh ấy ốm rồi, không đến được nữa.
#V不动: không đủ sức làm|搬不动 / 走不动 / 拿不动
箱子太重了，我拿不动。|Cái va li nặng quá, tôi xách không nổi.
我太累了，走不动了。|Tôi mệt quá, không đi nổi nữa.
#V不下: không đủ chỗ chứa|放不下 / 坐不下 / 吃不下
车里坐不下这么多人。|Trong xe không ngồi đủ nhiều người thế này.
我吃饱了，吃不下了。|Tôi no rồi, ăn không nổi nữa.
#来得及 / 来不及: còn kịp / không kịp|
快走吧，还来得及。|Đi nhanh lên, vẫn còn kịp.
来不及吃早饭了。|Không kịp ăn sáng nữa rồi.
#Câu hỏi|V得…V不…？
你听得懂听不懂？|Bạn nghe có hiểu không?
#Phân biệt 不能 / V不…|不能: không được phép; V不…: không có khả năng
这个字我写不好。|Chữ này tôi viết không đẹp được (khả năng).
#Mở rộng: 买不起 / 对不起|起: đủ khả năng (tiền bạc)
这么贵的车，我买不起。|Xe đắt thế này, tôi không mua nổi.

@g3-yue
#Ngày càng…|越来越 + Adj/V tâm lý
天气越来越冷了。|Thời tiết ngày càng lạnh.
他的汉语越来越好。|Tiếng Trung của anh ấy ngày càng giỏi.
我越来越喜欢这个城市了。|Tôi ngày càng thích thành phố này.
城市里的车越来越多。|Xe trong thành phố ngày càng nhiều.
你越来越漂亮了！|Bạn ngày càng xinh đẹp!
#Càng… càng…|越 + A + 越 + B
雨越下越大。|Mưa càng lúc càng to.
他越说越快。|Anh ấy càng nói càng nhanh.
这个歌我越听越喜欢。|Bài hát này tôi càng nghe càng thích.
汉字越写越好看。|Chữ Hán càng viết càng đẹp.
#Hai chủ ngữ khác nhau|A 越…，B 越…
你越着急，就越做不好。|Bạn càng sốt ruột thì càng làm không tốt.
天越热，喝水的人越多。|Trời càng nóng, người uống nước càng nhiều.
#越…越好|Càng… càng tốt
你来得越早越好。|Bạn đến càng sớm càng tốt.
水果越新鲜越好吃。|Hoa quả càng tươi càng ngon.
#Lưu ý|Sau 越来越 không dùng 很/非常
他越来越高了。（不说：越来越很高）|Anh ấy ngày càng cao. (Không nói “越来越很高”.)
#Kết hợp động từ|越来越 + 喜欢/想/了解/习惯
我越来越习惯这里的生活了。|Tôi ngày càng quen với cuộc sống ở đây.
我越来越了解他了。|Tôi ngày càng hiểu anh ấy.
#越 + V + 越 + V不…|Càng… càng không…
这道题我越想越不明白。|Bài này tôi càng nghĩ càng không hiểu.

@g3-yibian
#Vừa… vừa… (cùng một người)|一边 + V1，一边 + V2
他一边吃饭，一边看电视。|Anh ấy vừa ăn cơm vừa xem ti vi.
我喜欢一边听音乐一边写作业。|Tôi thích vừa nghe nhạc vừa làm bài tập.
我们一边走一边聊吧。|Chúng ta vừa đi vừa nói chuyện nhé.
她一边唱歌一边跳舞。|Cô ấy vừa hát vừa nhảy.
妈妈一边做饭一边打电话。|Mẹ vừa nấu cơm vừa gọi điện thoại.
#Khẩu ngữ rút gọn|边…边…
我们边吃边说。|Chúng ta vừa ăn vừa nói.
孩子们边唱边跳。|Bọn trẻ vừa hát vừa nhảy.
#Hai người làm hai việc cùng lúc|A 一边 V1，B 一边 V2
我一边洗碗，他一边扫地。|Tôi rửa bát, còn anh ấy quét nhà cùng lúc.
#Khuyên không nên|别一边…一边…
别一边开车一边打电话。|Đừng vừa lái xe vừa gọi điện thoại.
不要一边吃饭一边看手机。|Đừng vừa ăn cơm vừa xem điện thoại.
#Trong quá khứ|…一边…一边… + 了
昨天晚上我一边看书一边等你。|Tối qua tôi vừa đọc sách vừa đợi bạn.
#Học tập, làm việc|一边工作一边学习
他一边工作一边学习汉语。|Anh ấy vừa làm việc vừa học tiếng Trung.
很多学生一边上学一边打工。|Nhiều sinh viên vừa đi học vừa đi làm thêm.
#Phân biệt 一边…一边… / 又…又…|一边: hai hành động; 又: hai tính chất
她又聪明又漂亮。/ 她一边听一边记。|Cô ấy vừa thông minh vừa xinh. / Cô ấy vừa nghe vừa ghi.
#Câu hỏi|你喜欢一边…一边…吗？
你喜欢一边跑步一边听音乐吗？|Bạn có thích vừa chạy bộ vừa nghe nhạc không?
#Mở rộng: 同时|…的同时，还…
他在学习的同时，还在一家公司实习。|Trong khi học, anh ấy còn thực tập ở một công ty.

@g3-youyou
#Hai tính chất cùng tốt|又 + Adj1 + 又 + Adj2
这个苹果又大又甜。|Quả táo này vừa to vừa ngọt.
她又聪明又漂亮。|Cô ấy vừa thông minh vừa xinh đẹp.
这家饭店的菜又便宜又好吃。|Món ăn ở nhà hàng này vừa rẻ vừa ngon.
#Hai tính chất cùng xấu|又 + Adj1 + 又 + Adj2
今天又冷又下雨。|Hôm nay vừa lạnh vừa mưa.
我又累又饿。|Tôi vừa mệt vừa đói.
这条路又长又窄。|Con đường này vừa dài vừa hẹp.
#Hai hành động|又 + V1 + 又 + V2
孩子们又唱又跳。|Bọn trẻ vừa hát vừa nhảy.
她高兴得又哭又笑。|Cô ấy vui đến mức vừa khóc vừa cười.
#Lưu ý: hai tính chất phải cùng chiều|Cùng tốt hoặc cùng xấu
这个房间又大又干净。（不说：又大又脏）|Căn phòng này vừa rộng vừa sạch. (Không ghép tốt với xấu.)
#Sau 又 không dùng 很|又好又快 (không nói 又很好又很快)
他做事又好又快。|Anh ấy làm việc vừa tốt vừa nhanh.
#又 một mình: lại (lặp lại, đã xảy ra)|又 + V + 了
他又迟到了。|Anh ấy lại đến muộn rồi.
今天又下雨了。|Hôm nay lại mưa rồi.
#又…又… mô tả người|
我的老师又年轻又热情。|Thầy giáo của tôi vừa trẻ vừa nhiệt tình.
#又…又… mô tả đồ vật mua sắm|
这件衣服又舒服又好看，我买了。|Bộ quần áo này vừa thoải mái vừa đẹp, tôi mua rồi.
#Phân biệt 又…又… / 也…也…|也…也…: hai chủ ngữ/vế song song
我喜欢唱歌，也喜欢跳舞。|Tôi thích hát, cũng thích nhảy.

@g3-budan
#Không những… mà còn…|不但…，而且…
他不但会说汉语，而且会说日语。|Anh ấy không những biết nói tiếng Trung mà còn biết nói tiếng Nhật.
这家店的东西不但便宜，而且质量很好。|Đồ ở cửa hàng này không những rẻ mà chất lượng còn rất tốt.
她不但漂亮，而且很聪明。|Cô ấy không những xinh mà còn rất thông minh.
#Cùng chủ ngữ: chủ ngữ đứng trước 不但|主 + 不但…，而且…
我不但喜欢看足球，而且喜欢踢足球。|Tôi không những thích xem bóng đá mà còn thích đá bóng.
#Hai chủ ngữ khác nhau: chủ ngữ đứng sau 不但|不但 + 主1…，而且 + 主2 + 也…
不但我喜欢他，而且我的家人也喜欢他。|Không những tôi thích anh ấy mà gia đình tôi cũng thích anh ấy.
不但学生来了，而且老师也来了。|Không những học sinh đến mà thầy cô cũng đến.
#而且 + 还/也|Nhấn mạnh thêm
他不但请我吃饭，而且还送我回家。|Anh ấy không những mời tôi ăn cơm mà còn đưa tôi về nhà.
#Dùng 而且 một mình|…，而且…
这个房间很大，而且很安静。|Căn phòng này rất rộng, hơn nữa rất yên tĩnh.
天黑了，而且下雨了，我们回家吧。|Trời tối rồi, lại còn mưa, chúng ta về nhà thôi.
#Phủ định tăng tiến|不但不…，反而…
他不但没生气，反而笑了。|Anh ấy không những không giận mà ngược lại còn cười.
#Biến thể|不仅…，还/也… (văn viết)
他不仅学习好，还很会打篮球。|Anh ấy không chỉ học giỏi mà còn chơi bóng rổ rất giỏi.
#Trong giới thiệu, quảng cáo|
这个手机不但轻，而且电池很好。|Chiếc điện thoại này không những nhẹ mà pin còn rất tốt.
#Hai việc làm|不但 + V1，而且 + V2
她不但做了晚饭，而且洗了碗。|Cô ấy không những nấu bữa tối mà còn rửa bát.
#Mức độ tăng dần|不但…而且…更…
这个方法不但简单，而且更有效。|Cách này không những đơn giản mà còn hiệu quả hơn.
#Hỏi đáp|
那个地方怎么样？——不但风景美，而且吃的东西也很多。|Nơi đó thế nào? — Không những cảnh đẹp mà đồ ăn cũng nhiều.

@g3-ruguo
#Nếu… thì…|如果…，(主) + 就…
如果明天下雨，我们就不去了。|Nếu mai trời mưa thì chúng ta không đi nữa.
如果你有时间，就来我家玩儿吧。|Nếu bạn có thời gian thì đến nhà tôi chơi nhé.
如果你不舒服，就早点儿休息。|Nếu bạn không khỏe thì nghỉ sớm đi.
#Giả định với …的话|如果…的话，就…
如果你不喜欢的话，就别买了。|Nếu bạn không thích thì đừng mua.
如果有问题的话，给我打电话。|Nếu có vấn đề gì thì gọi cho tôi.
#Khẩu ngữ: 要是|要是…就…
要是我有钱，就去环游世界。|Nếu tôi có tiền thì sẽ đi du lịch vòng quanh thế giới.
要是你早点儿来就好了。|Giá mà bạn đến sớm hơn thì tốt rồi.
#Câu hỏi|如果…，怎么办？/ …呢？
如果他不同意，怎么办？|Nếu anh ấy không đồng ý thì làm thế nào?
#Chủ ngữ đứng trước 如果|主 + 如果…，就…
我如果是你，就不会这么做。|Nếu tôi là bạn thì tôi sẽ không làm thế.
#Bỏ 就 khi vế sau có chủ ngữ hoặc là câu hỏi|如果…，主 + V
如果你去，我也去。|Nếu bạn đi thì tôi cũng đi.
如果明天天气好，你想做什么？|Nếu mai thời tiết đẹp thì bạn muốn làm gì?
#Giả định trái với thực tế|如果…就好了 / 早知道…
如果我会说汉语就好了。|Giá mà tôi biết nói tiếng Trung thì tốt.
#Điều kiện phủ định|如果不…，就…
如果不努力，就考不上大学。|Nếu không cố gắng thì sẽ không thi đỗ đại học.
如果你不快点儿，就要迟到了。|Nếu bạn không nhanh lên thì sẽ muộn đấy.
#Mở rộng: 假如 / 万一|万一: lỡ như (khả năng nhỏ)
万一下雨，我们就在家看电影。|Lỡ như trời mưa, chúng ta ở nhà xem phim.
#Lời khuyên|如果我是你，我会…
如果我是你，我会先问问老师。|Nếu tôi là bạn, tôi sẽ hỏi thầy giáo trước.

@g3-chule
#Loại trừ: ngoài… ra, đều…|除了…(以外)，都…
除了他，我们都去了。|Ngoài anh ấy ra, chúng tôi đều đi cả.
除了星期天，我每天都工作。|Ngoài chủ nhật ra, ngày nào tôi cũng làm việc.
除了鱼以外，我什么都吃。|Ngoài cá ra, tôi ăn gì cũng được.
#Bổ sung: ngoài… ra, còn…|除了…(以外)，还/也…
除了汉语，我还会说英语。|Ngoài tiếng Trung, tôi còn biết nói tiếng Anh.
除了北京，我还去过上海和西安。|Ngoài Bắc Kinh, tôi còn từng đến Thượng Hải và Tây An.
除了我以外，小王也去了。|Ngoài tôi ra, Tiểu Vương cũng đi.
#除了 + động từ|除了 + V…，还/就是…
他除了睡觉，就是玩游戏。|Anh ấy ngoài ngủ ra thì chỉ chơi game.
周末除了看书，我还喜欢去爬山。|Cuối tuần ngoài đọc sách, tôi còn thích đi leo núi.
#Phủ định: ngoài… ra không ai/không gì|除了…，都不/没…
除了他，没有人知道这件事。|Ngoài anh ấy ra, không ai biết chuyện này.
除了水，我什么也没喝。|Ngoài nước ra, tôi không uống gì cả.
#Câu hỏi|除了…，你还…？
除了汉语，你还学过什么外语？|Ngoài tiếng Trung, bạn còn học ngoại ngữ gì khác?
除了米饭，你们还有什么？|Ngoài cơm ra, các bạn còn có gì nữa?
#Vị trí: đầu câu hoặc sau chủ ngữ|主 + 除了…，还…
我除了喜欢游泳，还喜欢跑步。|Tôi ngoài thích bơi còn thích chạy bộ.
#Liệt kê nhiều thứ|除了 A 和 B 以外，还…
除了苹果和香蕉以外，我们还买了西瓜。|Ngoài táo và chuối, chúng tôi còn mua dưa hấu.
#Phân biệt 都 / 还|都: loại trừ; 还/也: thêm vào
除了他，我们都喜欢。/ 除了他，我们还喜欢她。|Trừ anh ấy ra, chúng tôi đều thích. / Ngoài anh ấy, chúng tôi còn thích cô ấy.
#Dùng với thời gian|除了…的时候
除了下雨的时候，他每天都骑车上班。|Trừ lúc trời mưa, ngày nào anh ấy cũng đạp xe đi làm.

@g3-zhiyou
#Chỉ có… mới…|只有 + điều kiện duy nhất，才 + kết quả
只有努力学习，才能考上好大学。|Chỉ có học tập chăm chỉ mới thi đỗ trường đại học tốt.
只有多说，才能说好汉语。|Chỉ có nói nhiều mới nói giỏi tiếng Trung được.
只有你才能帮我。|Chỉ có bạn mới giúp được tôi.
#只有 + người/vật + 才…|Duy nhất
只有他才知道这件事。|Chỉ có anh ấy mới biết chuyện này.
这种药只有医院才有。|Loại thuốc này chỉ bệnh viện mới có.
#只有 + thời gian + 才…|Chỉ vào lúc… mới…
只有周末我才有时间。|Chỉ cuối tuần tôi mới có thời gian.
只有到了冬天，这里才会下雪。|Chỉ khi đến mùa đông, ở đây mới có tuyết.
#Phân biệt 只要…就… (chỉ cần… là…)|只要: điều kiện đủ; 只有: điều kiện cần
只要你努力，就能学好。|Chỉ cần bạn cố gắng là sẽ học tốt.
只要有时间，我就去看你。|Chỉ cần có thời gian là tôi sẽ đến thăm bạn.
只要不下雨，我们就去爬山。|Chỉ cần trời không mưa là chúng ta đi leo núi.
#Phủ định ở vế sau|只有…才不…
只有多穿点儿衣服，才不会感冒。|Chỉ có mặc thêm quần áo mới không bị cảm.
#只有 (động từ: chỉ có)|只有 + số lượng
我只有一个哥哥。|Tôi chỉ có một anh trai.
教室里只有三个人。|Trong lớp học chỉ có ba người.
#才 không thể thay bằng 就|只有…才… cố định
只有坚持，才会成功。|Chỉ có kiên trì mới thành công.
#Câu hỏi|只有…才…吗？
只有你会说汉语吗？|Chỉ có bạn biết nói tiếng Trung thôi à?
#Lời khuyên|只有…，才…
只有早睡早起，身体才会好。|Chỉ có ngủ sớm dậy sớm thì sức khỏe mới tốt.

@g3-xian
#Trước… sau đó…|先 + V1，然后 + V2
我们先吃饭，然后去看电影。|Chúng ta ăn cơm trước, sau đó đi xem phim.
你先洗手，然后再吃饭。|Bạn rửa tay trước rồi hãy ăn cơm.
他先去了北京，然后去了上海。|Anh ấy đi Bắc Kinh trước, sau đó đi Thượng Hải.
#先…再…|Làm cái này trước rồi mới làm cái kia
先想好再说。|Nghĩ kỹ rồi hãy nói.
我先回家，再去找你。|Tôi về nhà trước rồi mới đi tìm bạn.
你先休息一下，再做作业吧。|Bạn nghỉ một chút trước rồi hãy làm bài tập.
#Nhiều bước|首先…，然后…，最后…
首先打开电脑，然后输入密码，最后点"确定"。|Đầu tiên mở máy tính, sau đó nhập mật khẩu, cuối cùng nhấn "Xác nhận".
#先…，接着…|Tiếp theo
他先洗了澡，接着就睡觉了。|Anh ấy tắm trước, tiếp đó đi ngủ luôn.
#Chỉ dùng 先|先 + V (làm trước)
你先走吧，我马上来。|Bạn đi trước đi, tôi đến ngay.
我先说两句。|Để tôi nói vài câu trước.
#Chỉ dùng 然后|…，然后…
下了课，然后我们去图书馆吧。|Tan học rồi chúng ta đi thư viện nhé.
#再 (rồi mới; lại một lần nữa – tương lai)|再 + V
明天再说吧。|Mai hãy nói tiếp.
请再说一遍。|Xin nói lại một lần nữa.
#Phân biệt 再 / 又|再: tương lai; 又: đã xảy ra
他昨天来了，今天又来了，明天还要再来。|Hôm qua anh ấy đến, hôm nay lại đến, ngày mai còn đến nữa.
#Hướng dẫn nấu ăn|先…，然后…，再…
先把鸡蛋打好，然后放油，再放西红柿。|Đánh trứng trước, sau đó cho dầu, rồi cho cà chua.
#Câu hỏi|先…还是先…？
你先洗澡还是先吃饭？|Bạn tắm trước hay ăn cơm trước?

@g3-yiyang
#Giống nhau|A 跟/和 B 一样
我的手机跟你的一样。|Điện thoại của tôi giống của bạn.
他的爱好和我一样。|Sở thích của anh ấy giống tôi.
这两个字一样吗？|Hai chữ này giống nhau không?
#Giống nhau về mức độ|A 跟 B 一样 + Adj
我跟哥哥一样高。|Tôi cao bằng anh trai.
今天跟昨天一样热。|Hôm nay nóng như hôm qua.
这本书跟那本一样有意思。|Quyển sách này thú vị như quyển kia.
#Phủ định|A 跟 B 不一样
中国菜跟越南菜不一样。|Món Trung Quốc khác món Việt Nam.
我的想法跟你不一样。|Suy nghĩ của tôi khác bạn.
他跟我不一样大。|Anh ấy không bằng tuổi tôi.
#Câu hỏi|A 跟 B 一样吗？/ 一样不一样？
你的书跟我的一样不一样？|Sách của bạn có giống của tôi không?
#像…一样 (giống như)|A 像 B 一样 (+ Adj)
她像妈妈一样漂亮。|Cô ấy xinh đẹp như mẹ.
他跑得像风一样快。|Anh ấy chạy nhanh như gió.
#一样 làm định ngữ|一样的 + danh từ
我们买了一样的衣服。|Chúng tôi mua quần áo giống nhau.
#Động từ|跟…一样 + V
我跟你一样喜欢运动。|Tôi thích thể thao giống như bạn.
#差不多 (gần giống)|A 跟 B 差不多
我的汉语跟他差不多。|Tiếng Trung của tôi cũng ngang ngang anh ấy.
这两个价格差不多。|Hai mức giá này xấp xỉ nhau.
#Hoàn toàn giống|完全一样
这两张照片完全一样。|Hai tấm ảnh này giống hệt nhau.

@g3-meiyou
#Không bằng|A 没有 B + Adj
我没有他高。|Tôi không cao bằng anh ấy.
今天没有昨天冷。|Hôm nay không lạnh bằng hôm qua.
坐公共汽车没有坐地铁快。|Đi xe buýt không nhanh bằng đi tàu điện ngầm.
这个没有那个贵。|Cái này không đắt bằng cái kia.
#Thêm 那么/这么 (đến mức đó)|A 没有 B 那么/这么 + Adj
我的汉语没有你那么好。|Tiếng Trung của tôi không giỏi bằng bạn.
上海没有北京这么冷。|Thượng Hải không lạnh bằng Bắc Kinh thế này.
#Với bổ ngữ trình độ|A + V得 + 没有 B + Adj
我跑得没有他快。|Tôi chạy không nhanh bằng anh ấy.
她说得没有你流利。|Cô ấy nói không lưu loát bằng bạn.
#Câu hỏi|A 有 B + Adj + 吗？/ A 有没有 B + Adj？
你有你哥哥高吗？|Bạn có cao bằng anh trai bạn không?
这儿的冬天有北京冷吗？|Mùa đông ở đây có lạnh bằng Bắc Kinh không?
#A 有 B + Adj (bằng)|Khẳng định
弟弟已经有我这么高了。|Em trai đã cao bằng tôi rồi.
#不如 (không bằng – văn viết)|A 不如 B (+ Adj)
我做饭不如妈妈做得好。|Tôi nấu ăn không ngon bằng mẹ.
坐车不如走路快。|Đi xe không nhanh bằng đi bộ.
#Phân biệt 没有 / 不比|不比: không hơn (có thể bằng)
我不比他高。|Tôi không cao hơn anh ấy (có thể bằng).
#Động từ tâm lý|A 没有 B 那么 + 喜欢…
我没有你那么喜欢吃辣的。|Tôi không thích ăn cay bằng bạn.
#Trong lời khuyên|…没有…好
在家吃没有在外面吃贵。|Ăn ở nhà không đắt bằng ăn ngoài.

@g3-cai
#Muộn, chậm hơn mong đợi|Thời gian + 才 + V
他十点才起床。|Mười giờ anh ấy mới dậy.
我等了一个小时他才来。|Tôi đợi một tiếng anh ấy mới đến.
我三十岁才结婚。|Ba mươi tuổi tôi mới kết hôn.
#Mới (vừa mới)|才 + V
我才到家。|Tôi vừa mới về đến nhà.
他才走，你快去追他。|Anh ấy vừa đi, bạn mau đuổi theo.
#Chỉ có (số lượng ít)|才 + số lượng
我才学了一个月汉语。|Tôi mới học tiếng Trung được một tháng.
这件衣服才五十块钱。|Bộ quần áo này mới có năm mươi tệ.
他才十岁。|Cậu ấy mới mười tuổi.
#Điều kiện → mới|只有/因为/要… 才…
只有多练习，才能说得好。|Chỉ có luyện nhiều mới nói giỏi được.
因为下雨，我们才没去。|Vì trời mưa nên chúng tôi mới không đi.
你要早点儿出发，才不会迟到。|Bạn phải xuất phát sớm thì mới không muộn.
#Nhấn mạnh|才 + 是 / 才 + 不…呢
这才是我要的。|Cái này mới là cái tôi muốn.
我才不去呢！|Tôi mới không thèm đi!
#Phân biệt 就 / 才|就: sớm, dễ; 才: muộn, khó
他七点就到了，我八点才到。|Anh ấy bảy giờ đã đến, tôi tám giờ mới đến.
他看一遍就懂了，我看了三遍才懂。|Anh ấy xem một lần đã hiểu, tôi xem ba lần mới hiểu.
#Lưu ý: câu có 才 không dùng 了 ở cuối|
他昨天晚上十二点才睡。（不说：才睡了）|Tối qua mười hai giờ anh ấy mới ngủ.
#刚才 (lúc nãy) khác 才|刚才 là danh từ chỉ thời gian
刚才你去哪儿了？|Lúc nãy bạn đi đâu vậy?

@g3-dev
#Tính từ hai âm tiết + 地 + động từ|Miêu tả cách làm
他高兴地说："我考上了！"|Anh ấy vui vẻ nói: "Tôi đỗ rồi!"
孩子们快乐地玩儿。|Bọn trẻ vui vẻ chơi đùa.
请大家认真地听。|Mọi người hãy chăm chú lắng nghe.
她慢慢地走进来。|Cô ấy chầm chậm đi vào.
#Tính từ lặp lại + 地|AA地 / AABB地
你好好地休息吧。|Bạn nghỉ ngơi cho tốt nhé.
他高高兴兴地回家了。|Anh ấy vui vẻ về nhà.
大家安安静静地坐着。|Mọi người ngồi yên lặng.
#Phó từ / cụm từ + 地|很 + Adj + 地 / 非常 + Adj + 地
他很努力地学习汉语。|Anh ấy học tiếng Trung rất chăm chỉ.
她非常热情地欢迎我们。|Cô ấy chào đón chúng tôi vô cùng nhiệt tình.
#Tính từ đơn âm tiết thường không cần 地|快走 / 慢说 / 多吃
多吃点儿水果。|Ăn nhiều hoa quả một chút.
你慢走。|Bạn đi thong thả nhé.
#Một số từ ghép cố định|一个一个地 / 一天一天地 / 不停地
孩子一天一天地长大了。|Đứa trẻ lớn lên từng ngày.
他不停地说话。|Anh ấy nói không ngừng.
#Phân biệt 的 / 地 / 得|的 + danh từ; 地 + động từ; 动词 + 得
他认真地做作业。/ 他是认真的学生。/ 他做得很认真。|Anh ấy làm bài tập một cách chăm chỉ. / Anh ấy là học sinh chăm chỉ. / Anh ấy làm rất chăm chỉ.
#Câu khuyên|好好儿地 + V
你要好好儿地学习。|Bạn phải học hành cho đàng hoàng.
#Cảm xúc + 地|高兴地 / 难过地 / 生气地
妈妈生气地说："你怎么又回来晚了？"|Mẹ tức giận nói: "Sao con lại về muộn nữa?"
#Mô tả hành động liên tiếp|
他轻轻地关上了门。|Anh ấy nhẹ nhàng đóng cửa lại.
她小心地打开了盒子。|Cô ấy cẩn thận mở chiếc hộp.

@g3-haishi
#还是: hay là (câu hỏi lựa chọn)|A 还是 B？
你喝茶还是喝咖啡？|Bạn uống trà hay cà phê?
你是中国人还是日本人？|Bạn là người Trung Quốc hay người Nhật?
我们今天去还是明天去？|Chúng ta đi hôm nay hay ngày mai?
你坐飞机去还是坐火车去？|Bạn đi máy bay hay đi tàu hỏa?
#或者: hoặc (câu trần thuật)|A 或者 B
周末我常常看书或者看电影。|Cuối tuần tôi thường đọc sách hoặc xem phim.
你可以坐地铁或者坐出租车去。|Bạn có thể đi tàu điện ngầm hoặc taxi.
明天或者后天我给你打电话。|Ngày mai hoặc ngày kia tôi sẽ gọi cho bạn.
#还是 trong câu trần thuật “không biết… hay…”|不知道 / 没决定 + A 还是 B
我不知道他去还是不去。|Tôi không biết anh ấy đi hay không đi.
我还没决定买红的还是买白的。|Tôi vẫn chưa quyết định mua cái đỏ hay cái trắng.
#还是: tốt hơn là (lời khuyên)|还是 + V + 吧
太晚了，你还是别走了。|Muộn quá rồi, bạn đừng về thì hơn.
我们还是坐出租车吧。|Chúng ta đi taxi thì hơn.
#还是: vẫn (như cũ)|还是 + V/Adj
十年了，他还是那么年轻。|Mười năm rồi, anh ấy vẫn trẻ như vậy.
虽然下雨了，他还是来了。|Tuy trời mưa nhưng anh ấy vẫn đến.
#或者…或者… (liệt kê)|或者 A，或者 B
或者你来，或者我去，都可以。|Hoặc bạn đến, hoặc tôi đi, đều được.
#Phân biệt|还是: hỏi lựa chọn; 或者: nêu khả năng
你要这个还是那个？——这个或者那个都行。|Bạn muốn cái này hay cái kia? — Cái này hoặc cái kia đều được.
#还是 + 吗 không dùng chung|Không nói “A还是B吗？”
你去还是我去？|Bạn đi hay tôi đi?

@g3-weile
#Để, nhằm mục đích|为了 + mục đích，(主) + V
为了学好汉语，他每天练习口语。|Để học tốt tiếng Trung, ngày nào anh ấy cũng luyện nói.
为了身体健康，我每天跑步。|Vì sức khỏe, ngày nào tôi cũng chạy bộ.
为了买到票，他很早就去排队了。|Để mua được vé, anh ấy đi xếp hàng từ rất sớm.
#Vì ai|为了 + người
妈妈为了我们，每天工作到很晚。|Vì chúng tôi, ngày nào mẹ cũng làm việc đến rất khuya.
#是为了… (là để)|主 + V…，是为了…
我来中国是为了学习汉语。|Tôi đến Trung Quốc là để học tiếng Trung.
他每天锻炼是为了减肥。|Anh ấy tập luyện hằng ngày là để giảm cân.
#为了…的 + danh từ|Định ngữ
这是为了孩子们准备的礼物。|Đây là quà chuẩn bị cho bọn trẻ.
#Phân biệt 为了 / 因为|为了: mục đích; 因为: nguyên nhân
为了不迟到，我坐出租车来的。/ 因为迟到了，我坐出租车来的。|Để không muộn, tôi đi taxi đến. / Vì muộn rồi nên tôi đi taxi đến.
#为 (vì, cho)|为 + người + V
我们为你高兴。|Chúng tôi vui cho bạn.
为我们的友谊干杯！|Cạn ly vì tình bạn của chúng ta!
#为什么 (tại sao)|
你为什么不高兴？|Tại sao bạn không vui?
#Mục đích ở vế sau|…，为的是…
他每天早起，为的是能多看一会儿书。|Ngày nào anh ấy cũng dậy sớm, là để đọc sách thêm được một lúc.
#Câu hỏi|为了什么…？
你这么努力是为了什么？|Bạn cố gắng như vậy là vì điều gì?
#Mục đích công việc|为了…，公司…
为了让顾客满意，我们提供最好的服务。|Để khách hàng hài lòng, chúng tôi cung cấp dịch vụ tốt nhất.
#Mục đích học tập|为了考HSK…
为了考HSK三级，我每天学习两个小时。|Để thi HSK cấp 3, mỗi ngày tôi học hai tiếng.

@g3-chongdie
#Động từ một âm tiết: AA / A一A|Làm thử, làm một chút
你看看这本书。|Bạn xem thử quyển sách này.
我想想。|Để tôi nghĩ đã.
你尝一尝这个菜。|Bạn nếm thử món này.
让我听听。|Để tôi nghe thử.
#Động từ hai âm tiết: ABAB|
我们休息休息吧。|Chúng ta nghỉ ngơi một chút đi.
你给我介绍介绍吧。|Bạn giới thiệu cho tôi một chút đi.
我们讨论讨论这个问题。|Chúng ta thảo luận vấn đề này một chút.
#Đã làm (thêm 了)|A了A
他看了看手表。|Anh ấy nhìn đồng hồ một cái.
她想了想，说："好吧。"|Cô ấy nghĩ một lúc rồi nói: "Được thôi."
#Động từ ly hợp: AAB|散散步 / 聊聊天 / 跳跳舞
晚饭后我们去散散步吧。|Sau bữa tối chúng ta đi dạo một chút nhé.
周末我喜欢和朋友聊聊天。|Cuối tuần tôi thích trò chuyện với bạn bè.
#Hoạt động thư giãn thường ngày|AA + O
周末我常常看看书，听听音乐。|Cuối tuần tôi thường đọc sách, nghe nhạc.
#Lời đề nghị lịch sự|请 + AA
请您等等。|Xin ngài đợi một chút.
#Tính từ lặp lại (mô tả sinh động)|AA / AABB
她有一双大大的眼睛。|Cô ấy có đôi mắt to tròn.
房间打扫得干干净净的。|Căn phòng được dọn sạch sẽ tinh tươm.
#Lưu ý: không lặp động từ đang diễn ra|Không nói 正在看看
我正在看书。（不说：正在看看书）|Tôi đang đọc sách. (Không nói “正在看看书”.)

@g3-jile
#Cực kỳ (khen)|Adj + 极了
这个菜好吃极了！|Món này ngon cực kỳ!
今天天气好极了。|Hôm nay thời tiết đẹp cực kỳ.
她的汉语流利极了。|Tiếng Trung của cô ấy lưu loát vô cùng.
这儿的风景美极了。|Phong cảnh ở đây đẹp tuyệt vời.
#Cực kỳ (phàn nàn)|Adj + 极了
我累极了。|Tôi mệt cực kỳ.
今天热极了。|Hôm nay nóng cực kỳ.
#Động từ tâm lý + 极了|高兴/喜欢/担心 + 极了
听到这个消息，他高兴极了。|Nghe tin này, anh ấy vui cực kỳ.
我担心极了。|Tôi lo lắng vô cùng.
#Mức độ: Adj + 死了 (khẩu ngữ, mạnh)|
我饿死了！|Tôi đói chết mất!
今天累死了。|Hôm nay mệt chết đi được.
#Adj + 得很 / 得不得了|
他高兴得很。|Anh ấy vui lắm.
这个孩子聪明得不得了。|Đứa trẻ này thông minh không chịu nổi.
#Adj + 坏了 (cảm xúc mạnh)|
妈妈急坏了。|Mẹ lo cuống lên.
#Lưu ý|Trước Adj + 极了 không dùng 很/非常
好极了（不说：很好极了）|Tốt cực kỳ (không nói “很好极了”).
#Trong hội thoại|——怎么样？——好极了！
考试怎么样？——好极了！|Thi thế nào? — Tuyệt vời!
#So sánh các mức độ|很 < 非常 < 极了 / 死了
这个电影很好看，那个电影好看极了。|Phim này rất hay, phim kia hay cực kỳ.
#Phân biệt 极了 / 太…了|太…了 có thể chỉ quá mức không mong muốn
这件衣服贵极了。/ 这件衣服太贵了。|Bộ quần áo này đắt cực kỳ. / Bộ quần áo này đắt quá.

@g3-youyidian
#有一点儿 + Adj (hơi… – thường không vừa ý)|有(一)点儿 + Adj
今天有点儿冷。|Hôm nay hơi lạnh.
这个菜有点儿辣。|Món này hơi cay.
我有点儿累了。|Tôi hơi mệt rồi.
他今天有点儿不高兴。|Hôm nay anh ấy hơi không vui.
#Adj + 一点儿 (hơn một chút – so sánh, yêu cầu)|
有没有便宜一点儿的？|Có cái nào rẻ hơn một chút không?
请说慢一点儿。|Xin nói chậm hơn một chút.
今天比昨天暖和一点儿。|Hôm nay ấm hơn hôm qua một chút.
#V + 一点儿 + O (một ít)|
我想喝一点儿水。|Tôi muốn uống một chút nước.
我会说一点儿汉语。|Tôi biết nói một chút tiếng Trung.
多吃一点儿吧。|Ăn thêm một chút nhé.
#一点儿也/都不 (không… chút nào)|一点儿 + 也/都 + 不/没
我一点儿也不累。|Tôi không mệt chút nào.
这个电影一点儿都不好看。|Bộ phim này chẳng hay chút nào.
他一点儿饭都没吃。|Anh ấy không ăn một chút cơm nào.
#Lưu ý vị trí|有一点儿 trước Adj; 一点儿 sau Adj
这件衣服有点儿大，有没有小一点儿的？|Bộ quần áo này hơi rộng, có cái nào nhỏ hơn một chút không?
#有点儿 + động từ tâm lý|有点儿 + 想/怕/担心
我有点儿想家。|Tôi hơi nhớ nhà.
我有点儿担心他。|Tôi hơi lo cho anh ấy.
#Lỗi thường gặp|Không nói 一点儿贵 để chỉ “hơi đắt”
这个有点儿贵。（不说：这个一点儿贵）|Cái này hơi đắt. (Không nói “一点儿贵”.)

@g3-guanyu
#Về (chủ đề)|关于 + chủ đề + 的 + danh từ
这是一本关于中国历史的书。|Đây là một quyển sách về lịch sử Trung Quốc.
我想看关于熊猫的电影。|Tôi muốn xem phim về gấu trúc.
老师给我们讲了一个关于春节的故事。|Thầy giáo kể cho chúng tôi một câu chuyện về Tết.
#Đầu câu: về vấn đề…|关于 + chủ đề，…
关于这个问题，我们下次再讨论。|Về vấn đề này, lần sau chúng ta thảo luận tiếp.
关于考试的时间，老师还没通知。|Về thời gian thi, thầy giáo vẫn chưa thông báo.
关于旅游的事，你决定吧。|Chuyện du lịch, bạn quyết định đi.
#Bài viết, báo cáo|关于…的报告/文章/新闻
我写了一篇关于环境保护的文章。|Tôi đã viết một bài về bảo vệ môi trường.
你看了关于天气的新闻吗？|Bạn đã xem tin tức về thời tiết chưa?
#Câu hỏi|有没有关于…的…？
你有没有关于学汉语的书？|Bạn có sách nào về học tiếng Trung không?
#Phân biệt 关于 / 对|关于: phạm vi nội dung; 对: đối tượng tác động
关于这件事，我不太了解。/ 这件事对我很重要。|Về chuyện này tôi không rõ lắm. / Chuyện này rất quan trọng với tôi.
#Văn viết|关于…，…如下
关于明天的活动安排如下。|Về lịch hoạt động ngày mai như sau.
#Tên sách/bài|关于…
《关于我的家乡》|"Về quê hương tôi"
#Hội thoại|关于…，你怎么看？
关于网上购物，你怎么看？|Về việc mua sắm trên mạng, bạn nghĩ sao?
#关于 + 人|关于他的事
关于他的事，我知道的不多。|Về chuyện của anh ấy, tôi biết không nhiều.
#Thông báo|关于…的通知
这是关于放假的通知。|Đây là thông báo về việc nghỉ lễ.

@g3-yue
#Ngày càng…
来这儿旅游的人越来越多。|Người đến đây du lịch ngày càng đông.
#Càng… càng…
他越跑越快。|Anh ấy càng chạy càng nhanh.
@g3-yibian
#Vừa… vừa… (cùng một người)
爸爸一边喝茶一边看报纸。|Bố vừa uống trà vừa đọc báo.
老师一边说一边在黑板上写。|Thầy giáo vừa nói vừa viết lên bảng.
我们一边吃饭一边聊天。|Chúng tôi vừa ăn cơm vừa trò chuyện.
@g3-youyou
#Hai tính chất cùng tốt
他的房间又大又亮。|Phòng của anh ấy vừa rộng vừa sáng.
这个手机又轻又薄。|Chiếc điện thoại này vừa nhẹ vừa mỏng.
#Hai tính chất cùng xấu
那家饭店的菜又贵又不好吃。|Món ở nhà hàng đó vừa đắt vừa không ngon.
#又 một mình: lại (lặp lại, đã xảy ra)
你怎么又忘了？|Sao bạn lại quên nữa rồi?
@g3-budan
#Không những… mà còn…
这本书不但内容好，而且很便宜。|Quyển sách này không những nội dung hay mà còn rất rẻ.
他不但是我的老师，而且是我的朋友。|Anh ấy không những là thầy giáo mà còn là bạn của tôi.
#Hai chủ ngữ khác nhau: chủ ngữ đứng sau 不但
不但我去过北京，而且我妹妹也去过。|Không những tôi đã đi Bắc Kinh mà em gái tôi cũng đã đi.
@g3-ruguo
#Nếu… thì…
如果你累了，就休息一下吧。|Nếu bạn mệt thì nghỉ một chút đi.
如果明天天气好，我们就去爬山。|Nếu mai thời tiết đẹp thì chúng ta đi leo núi.
@g3-chule
#Loại trừ: ngoài… ra, đều…
除了数学，别的课我都喜欢。|Ngoài môn toán ra, các môn khác tôi đều thích.
#Bổ sung: ngoài… ra, còn…
除了唱歌，她还会弹钢琴。|Ngoài hát ra, cô ấy còn biết chơi đàn piano.
@g3-zhiyou
#Chỉ có… mới…
只有认真复习，才能考好。|Chỉ có ôn tập nghiêm túc mới thi tốt được.
#Phân biệt 只要…就… (chỉ cần… là…)
只要你喜欢，就买吧。|Chỉ cần bạn thích thì mua đi.
@g3-xian
#Trước… sau đó…
我们先买票，然后进去参观。|Chúng ta mua vé trước, sau đó vào tham quan.
#先…再…
先做完作业再玩儿。|Làm xong bài tập rồi hãy chơi.
你先别急，听我说完再决定。|Bạn đừng vội, nghe tôi nói xong rồi hãy quyết định.
@g3-yiyang
#Giống nhau về mức độ
弟弟跟爸爸一样喜欢足球。|Em trai thích bóng đá giống như bố.
#Phủ định
这两件衣服的颜色不一样。|Màu của hai bộ quần áo này khác nhau.
@g3-meiyou
#Không bằng
这个城市没有北京大。|Thành phố này không lớn bằng Bắc Kinh.
#Thêm 那么/这么 (đến mức đó)
今年夏天没有去年那么热。|Mùa hè năm nay không nóng bằng năm ngoái.
@g3-cai
#Chỉ có (số lượng ít)
我们班才有十个学生。|Lớp chúng tôi chỉ có mười học sinh.
@g3-haishi
#还是: hay là (câu hỏi lựa chọn)
你想吃米饭还是面条？|Bạn muốn ăn cơm hay mì?
#或者: hoặc (câu trần thuật)
你可以发短信或者打电话给我。|Bạn có thể nhắn tin hoặc gọi điện cho tôi.
@g3-weile
#Để, nhằm mục đích
为了准备考试，他每天学习到很晚。|Để chuẩn bị cho kỳ thi, ngày nào anh ấy cũng học đến khuya.
为了省钱，她每天自己做饭。|Để tiết kiệm tiền, ngày nào cô ấy cũng tự nấu cơm.
#是为了… (là để)
我学开车是为了周末带家人出去玩儿。|Tôi học lái xe là để cuối tuần đưa gia đình đi chơi.
为了不让妈妈担心，他每天都给家里打电话。|Để mẹ không lo, ngày nào anh ấy cũng gọi điện về nhà.
@g3-chongdie
#Động từ một âm tiết: AA / A一A
你试试这件衣服。|Bạn thử bộ quần áo này xem.
#Động từ hai âm tiết: ABAB
你帮我检查检查作业吧。|Bạn kiểm tra bài tập giúp tôi một chút nhé.
#Động từ ly hợp: AAB
星期天我们去游游泳吧。|Chủ nhật chúng ta đi bơi một chút nhé.
@g3-jile
#Cực kỳ (khen)
这个地方安静极了。|Nơi này yên tĩnh cực kỳ.
#Động từ tâm lý + 极了
收到你的礼物，我开心极了。|Nhận được quà của bạn, tôi vui vô cùng.
@g3-guanyu
#Về (chủ đề)
他问了我很多关于越南的问题。|Anh ấy hỏi tôi rất nhiều câu hỏi về Việt Nam.
#Đầu câu: về vấn đề…
关于这次旅行，大家有什么意见？|Về chuyến du lịch lần này, mọi người có ý kiến gì không?
关于学费的问题，请问办公室。|Về vấn đề học phí, xin hỏi văn phòng.
`;
