// Từ vựng HSK 1–3 (dựa theo danh sách HSK 2.0). Định dạng mỗi dòng:
// chữ Hán | pinyin | nghĩa tiếng Việt | từ loại | chủ đề (cách nhau bởi dấu phẩy)
// Từ loại: d=danh từ, đg=động từ, t=tính từ, p=phó từ, s=số từ, l=lượng từ, đt=đại từ,
// tr=trợ từ, gi=giới từ, lt=liên từ, n=năng nguyện động từ, c=cụm từ/thán từ
// Chủ đề: giadinh, truonghoc, congviec, anuong, dulich, thoigian, ngaythang, thoitiet, suckhoe,
// muasam, giaothong, diadiem, camxuc, sothich, giaotiep, so, mausac, coban
const RAW = {
1: `
爱|ài|yêu, thích|đg|camxuc
八|bā|số tám|s|so
爸爸|bàba|bố, ba|d|giadinh
杯子|bēizi|cái cốc, cái ly|d|anuong
北京|Běijīng|Bắc Kinh|d|diadiem,dulich
本|běn|quyển, cuốn (lượng từ cho sách)|l|coban
不|bù|không|p|coban
不客气|bú kèqi|không có gì, đừng khách sáo|c|giaotiep
菜|cài|món ăn; rau|d|anuong
茶|chá|trà|d|anuong
吃|chī|ăn|đg|anuong
出租车|chūzūchē|xe taxi|d|giaothong
打电话|dǎ diànhuà|gọi điện thoại|đg|giaotiep
大|dà|to, lớn|t|coban
的|de|của (trợ từ kết cấu)|tr|coban
点|diǎn|giờ; điểm, chút|l|thoigian
电脑|diànnǎo|máy tính|d|congviec,truonghoc
电视|diànshì|ti vi|d|sothich
电影|diànyǐng|phim, điện ảnh|d|sothich
东西|dōngxi|đồ vật, đồ đạc|d|muasam
都|dōu|đều, tất cả|p|coban
读|dú|đọc|đg|truonghoc
对不起|duìbuqǐ|xin lỗi|c|giaotiep
多|duō|nhiều|t|coban
多少|duōshao|bao nhiêu|đt|muasam,so
儿子|érzi|con trai|d|giadinh
二|èr|số hai|s|so
饭店|fàndiàn|nhà hàng; khách sạn|d|anuong,diadiem
飞机|fēijī|máy bay|d|giaothong,dulich
分钟|fēnzhōng|phút|d|thoigian
高兴|gāoxìng|vui, vui mừng|t|camxuc
个|gè|cái, chiếc (lượng từ chung)|l|coban
工作|gōngzuò|công việc; làm việc|đg|congviec
狗|gǒu|con chó|d|sothich
汉语|Hànyǔ|tiếng Hán, tiếng Trung|d|truonghoc
好|hǎo|tốt, hay, khỏe|t|coban,giaotiep
号|hào|ngày (trong tháng); số|d|ngaythang
喝|hē|uống|đg|anuong
和|hé|và, với|lt|coban
很|hěn|rất|p|coban
后面|hòumiàn|phía sau|d|diadiem
回|huí|về, trở về|đg|giaothong
会|huì|biết (làm gì); sẽ|n|coban
火车站|huǒchēzhàn|ga tàu hỏa|d|giaothong,diadiem
几|jǐ|mấy|đt|so
家|jiā|nhà, gia đình|d|giadinh,diadiem
叫|jiào|gọi, tên là|đg|giaotiep
今天|jīntiān|hôm nay|d|thoigian
九|jiǔ|số chín|s|so
开|kāi|mở; lái (xe)|đg|giaothong
看|kàn|xem, nhìn|đg|sothich
看见|kànjiàn|nhìn thấy|đg|coban
块|kuài|đồng (đơn vị tiền); miếng|l|muasam
来|lái|đến, tới|đg|coban
老师|lǎoshī|giáo viên, thầy cô|d|truonghoc
了|le|rồi (trợ từ hoàn thành/biến đổi)|tr|coban
冷|lěng|lạnh|t|thoitiet
里|lǐ|bên trong|d|diadiem
零|líng|số không|s|so
六|liù|số sáu|s|so
妈妈|māma|mẹ|d|giadinh
吗|ma|không? (trợ từ nghi vấn)|tr|coban
买|mǎi|mua|đg|muasam
猫|māo|con mèo|d|sothich
没|méi|không, chưa (có)|p|coban
没关系|méi guānxi|không sao|c|giaotiep
米饭|mǐfàn|cơm|d|anuong
明天|míngtiān|ngày mai|d|thoigian
名字|míngzi|tên|d|giaotiep
哪|nǎ|nào|đt|coban
哪儿|nǎr|ở đâu|đt|diadiem
那|nà|kia, đó|đt|coban
那儿|nàr|chỗ đó, ở đó|đt|diadiem
呢|ne|thì sao? (trợ từ nghi vấn)|tr|coban
能|néng|có thể|n|coban
你|nǐ|bạn, anh, chị (ngôi thứ hai)|đt|coban
年|nián|năm|d|ngaythang
女儿|nǚ'ér|con gái|d|giadinh
朋友|péngyou|bạn bè|d|giaotiep
漂亮|piàoliang|đẹp, xinh|t|camxuc
苹果|píngguǒ|quả táo|d|anuong
七|qī|số bảy|s|so
前面|qiánmiàn|phía trước|d|diadiem
钱|qián|tiền|d|muasam
请|qǐng|mời; xin, vui lòng|đg|giaotiep
去|qù|đi|đg|giaothong
热|rè|nóng|t|thoitiet
人|rén|người|d|coban
认识|rènshi|quen biết|đg|giaotiep
日|rì|ngày; mặt trời|d|ngaythang
三|sān|số ba|s|so
商店|shāngdiàn|cửa hàng|d|muasam,diadiem
上|shàng|trên; lên|d|diadiem
上午|shàngwǔ|buổi sáng (trước trưa)|d|thoigian
少|shǎo|ít|t|coban
谁|shéi|ai|đt|coban
什么|shénme|cái gì|đt|coban
十|shí|số mười|s|so
时候|shíhou|lúc, khi|d|thoigian
是|shì|là|đg|coban
书|shū|sách|d|truonghoc
水|shuǐ|nước|d|anuong
水果|shuǐguǒ|hoa quả, trái cây|d|anuong
睡觉|shuìjiào|ngủ|đg|suckhoe
说|shuō|nói|đg|giaotiep
四|sì|số bốn|s|so
岁|suì|tuổi|l|giadinh
他|tā|anh ấy, ông ấy|đt|coban
她|tā|cô ấy, bà ấy|đt|coban
太|tài|quá, lắm|p|coban
天气|tiānqì|thời tiết|d|thoitiet
听|tīng|nghe|đg|sothich
同学|tóngxué|bạn học|d|truonghoc
喂|wéi|alô|c|giaotiep
我|wǒ|tôi|đt|coban
我们|wǒmen|chúng tôi, chúng ta|đt|coban
五|wǔ|số năm|s|so
喜欢|xǐhuan|thích|đg|camxuc,sothich
下|xià|dưới; xuống; sau|d|diadiem
下午|xiàwǔ|buổi chiều|d|thoigian
下雨|xià yǔ|mưa|đg|thoitiet
先生|xiānsheng|ông, ngài; chồng|d|giaotiep
现在|xiànzài|bây giờ|d|thoigian
想|xiǎng|muốn; nghĩ; nhớ|n|camxuc
小|xiǎo|nhỏ, bé|t|coban
小姐|xiǎojiě|cô (cách gọi phụ nữ trẻ)|d|giaotiep
些|xiē|một vài, những|l|coban
写|xiě|viết|đg|truonghoc
谢谢|xièxie|cảm ơn|c|giaotiep
星期|xīngqī|tuần; thứ|d|ngaythang
学生|xuésheng|học sinh|d|truonghoc
学习|xuéxí|học, học tập|đg|truonghoc
学校|xuéxiào|trường học|d|truonghoc,diadiem
一|yī|số một|s|so
一点儿|yìdiǎnr|một chút|l|coban
衣服|yīfu|quần áo|d|muasam
医生|yīshēng|bác sĩ|d|suckhoe,congviec
医院|yīyuàn|bệnh viện|d|suckhoe,diadiem
椅子|yǐzi|cái ghế|d|coban
有|yǒu|có|đg|coban
月|yuè|tháng; mặt trăng|d|ngaythang
在|zài|ở, tại; đang|gi|diadiem
再见|zàijiàn|tạm biệt|c|giaotiep
怎么|zěnme|thế nào, sao|đt|coban
怎么样|zěnmeyàng|như thế nào|đt|giaotiep
这|zhè|này, đây|đt|coban
这儿|zhèr|ở đây|đt|diadiem
中国|Zhōngguó|Trung Quốc|d|diadiem,dulich
中午|zhōngwǔ|buổi trưa|d|thoigian
住|zhù|ở, sống|đg|diadiem
桌子|zhuōzi|cái bàn|d|coban
字|zì|chữ|d|truonghoc
昨天|zuótiān|hôm qua|d|thoigian
坐|zuò|ngồi; đi (xe, tàu)|đg|giaothong
做|zuò|làm|đg|congviec
`,
2: `
吧|ba|nhé, đi (trợ từ đề nghị)|tr|coban
白|bái|màu trắng|t|mausac
百|bǎi|trăm|s|so
帮助|bāngzhù|giúp đỡ|đg|giaotiep
报纸|bàozhǐ|báo, tờ báo|d|sothich
比|bǐ|so với, hơn|gi|coban
别|bié|đừng|p|coban
宾馆|bīnguǎn|khách sạn|d|dulich,diadiem
长|cháng|dài|t|coban
唱歌|chàng gē|hát|đg|sothich
出|chū|ra|đg|coban
穿|chuān|mặc, đi (giày)|đg|muasam
次|cì|lần|l|coban
从|cóng|từ|gi|coban
错|cuò|sai|t|truonghoc
打篮球|dǎ lánqiú|chơi bóng rổ|đg|sothich
大家|dàjiā|mọi người|đt|giaotiep
到|dào|đến|đg|giaothong
得|de|(trợ từ bổ ngữ trình độ)|tr|coban
等|děng|đợi, chờ|đg|coban
弟弟|dìdi|em trai|d|giadinh
第一|dì-yī|thứ nhất|s|so
懂|dǒng|hiểu|đg|truonghoc
对|duì|đúng; đối với|t|coban
房间|fángjiān|căn phòng|d|diadiem,dulich
非常|fēicháng|vô cùng, rất|p|coban
服务员|fúwùyuán|nhân viên phục vụ|d|congviec,anuong
高|gāo|cao|t|coban
告诉|gàosu|nói cho biết|đg|giaotiep
哥哥|gēge|anh trai|d|giadinh
给|gěi|cho, đưa; cho (ai)|đg|coban
公共汽车|gōnggòng qìchē|xe buýt|d|giaothong
公司|gōngsī|công ty|d|congviec
贵|guì|đắt|t|muasam
过|guo|đã từng (trợ từ kinh nghiệm)|tr|coban
还|hái|còn, vẫn|p|coban
孩子|háizi|đứa trẻ, con|d|giadinh
好吃|hǎochī|ngon|t|anuong
黑|hēi|màu đen; tối|t|mausac
红|hóng|màu đỏ|t|mausac
欢迎|huānyíng|hoan nghênh, chào mừng|đg|giaotiep
回答|huídá|trả lời|đg|truonghoc
机场|jīchǎng|sân bay|d|giaothong,dulich
鸡蛋|jīdàn|trứng gà|d|anuong
件|jiàn|chiếc, việc (lượng từ)|l|muasam
教室|jiàoshì|phòng học|d|truonghoc
姐姐|jiějie|chị gái|d|giadinh
介绍|jièshào|giới thiệu|đg|giaotiep
进|jìn|vào|đg|coban
近|jìn|gần|t|diadiem
就|jiù|thì, liền, ngay|p|coban
觉得|juéde|cảm thấy, thấy rằng|đg|camxuc
咖啡|kāfēi|cà phê|d|anuong
开始|kāishǐ|bắt đầu|đg|coban
考试|kǎoshì|thi, kỳ thi|đg|truonghoc
可能|kěnéng|có thể, có lẽ|n|coban
可以|kěyǐ|có thể, được phép|n|coban
课|kè|bài học, tiết học|d|truonghoc
快|kuài|nhanh|t|coban
快乐|kuàilè|vui vẻ|t|camxuc
累|lèi|mệt|t|suckhoe
离|lí|cách (khoảng cách)|gi|diadiem
两|liǎng|hai (dùng trước lượng từ)|s|so
路|lù|đường|d|giaothong
旅游|lǚyóu|du lịch|đg|dulich
卖|mài|bán|đg|muasam
慢|màn|chậm|t|coban
忙|máng|bận|t|congviec
每|měi|mỗi|đt|coban
妹妹|mèimei|em gái|d|giadinh
门|mén|cửa|d|coban
面条|miàntiáo|mì sợi|d|anuong
男|nán|nam, con trai|t|giadinh
您|nín|ngài, ông, bà (kính trọng)|đt|giaotiep
牛奶|niúnǎi|sữa bò|d|anuong
女|nǚ|nữ, con gái|t|giadinh
旁边|pángbiān|bên cạnh|d|diadiem
跑步|pǎobù|chạy bộ|đg|sothich,suckhoe
便宜|piányi|rẻ|t|muasam
票|piào|vé|d|dulich,giaothong
妻子|qīzi|vợ|d|giadinh
起床|qǐchuáng|thức dậy|đg|thoigian
千|qiān|nghìn|s|so
铅笔|qiānbǐ|bút chì|d|truonghoc
晴|qíng|nắng, trời quang|t|thoitiet
去年|qùnián|năm ngoái|d|ngaythang
让|ràng|để, cho phép, bảo|đg|coban
上班|shàngbān|đi làm|đg|congviec
身体|shēntǐ|cơ thể, sức khỏe|d|suckhoe
生病|shēngbìng|bị ốm|đg|suckhoe
生日|shēngrì|sinh nhật|d|ngaythang
时间|shíjiān|thời gian|d|thoigian
事情|shìqing|sự việc, chuyện|d|coban
手表|shǒubiǎo|đồng hồ đeo tay|d|muasam
手机|shǒujī|điện thoại di động|d|congviec
说话|shuōhuà|nói chuyện|đg|giaotiep
送|sòng|tặng; tiễn; giao|đg|coban
虽然|suīrán|tuy, mặc dù|lt|coban
但是|dànshì|nhưng|lt|coban
它|tā|nó (đồ vật, con vật)|đt|coban
踢足球|tī zúqiú|đá bóng|đg|sothich
题|tí|đề bài, câu hỏi|d|truonghoc
跳舞|tiàowǔ|nhảy múa|đg|sothich
外|wài|ngoài|d|diadiem
完|wán|xong, hết|đg|coban
玩|wán|chơi|đg|sothich
晚上|wǎnshang|buổi tối|d|thoigian
往|wǎng|hướng về, về phía|gi|giaothong
为什么|wèishénme|tại sao|đt|coban
问|wèn|hỏi|đg|giaotiep
问题|wèntí|câu hỏi, vấn đề|d|truonghoc
西瓜|xīguā|dưa hấu|d|anuong
希望|xīwàng|hy vọng|đg|camxuc
洗|xǐ|rửa, giặt|đg|coban
小时|xiǎoshí|giờ, tiếng đồng hồ|d|thoigian
笑|xiào|cười|đg|camxuc
新|xīn|mới|t|coban
姓|xìng|họ; mang họ|đg|giaotiep
休息|xiūxi|nghỉ ngơi|đg|suckhoe
雪|xuě|tuyết|d|thoitiet
颜色|yánsè|màu sắc|d|mausac
眼睛|yǎnjing|mắt|d|suckhoe
羊肉|yángròu|thịt cừu|d|anuong
药|yào|thuốc|d|suckhoe
要|yào|muốn, cần, sắp|n|coban
也|yě|cũng|p|coban
一起|yìqǐ|cùng nhau|p|coban
一下|yíxià|một chút, thử (làm gì)|l|coban
已经|yǐjīng|đã|p|coban
意思|yìsi|ý nghĩa|d|truonghoc
因为|yīnwèi|bởi vì|lt|coban
所以|suǒyǐ|cho nên|lt|coban
阴|yīn|âm u, nhiều mây|t|thoitiet
游泳|yóuyǒng|bơi|đg|sothich
右边|yòubian|bên phải|d|diadiem
鱼|yú|cá|d|anuong
远|yuǎn|xa|t|diadiem
运动|yùndòng|vận động, thể thao|đg|sothich,suckhoe
再|zài|lại, nữa|p|coban
早上|zǎoshang|buổi sáng sớm|d|thoigian
丈夫|zhàngfu|chồng|d|giadinh
找|zhǎo|tìm|đg|coban
着|zhe|(trợ từ trạng thái tiếp diễn)|tr|coban
真|zhēn|thật, thật là|p|coban
正在|zhèngzài|đang|p|coban
知道|zhīdào|biết|đg|coban
准备|zhǔnbèi|chuẩn bị|đg|coban
走|zǒu|đi bộ; rời đi|đg|giaothong
最|zuì|nhất|p|coban
左边|zuǒbian|bên trái|d|diadiem
`,
3: `
阿姨|āyí|cô, dì|d|giadinh
啊|a|a, à (trợ từ cảm thán)|tr|coban
矮|ǎi|thấp|t|coban
爱好|àihào|sở thích|d|sothich
安静|ānjìng|yên tĩnh|t|coban
把|bǎ|(giới từ đưa tân ngữ lên trước)|gi|coban
班|bān|lớp|d|truonghoc
搬|bān|chuyển, dọn|đg|coban
办法|bànfǎ|cách, biện pháp|d|coban
办公室|bàngōngshì|văn phòng|d|congviec,diadiem
半|bàn|một nửa, rưỡi|s|thoigian
帮忙|bāngmáng|giúp đỡ|đg|giaotiep
包|bāo|cái túi; gói|d|muasam
饱|bǎo|no|t|anuong
北方|běifāng|phương bắc|d|diadiem
被|bèi|bị, được (câu bị động)|gi|coban
鼻子|bízi|mũi|d|suckhoe
比较|bǐjiào|tương đối, khá; so sánh|p|coban
比赛|bǐsài|trận đấu, cuộc thi|d|sothich
笔记本|bǐjìběn|quyển vở; máy tính xách tay|d|truonghoc
必须|bìxū|phải, nhất định phải|p|coban
变化|biànhuà|thay đổi, biến đổi|d|coban
表示|biǎoshì|biểu thị, tỏ ý|đg|giaotiep
表演|biǎoyǎn|biểu diễn|đg|sothich
别人|biérén|người khác|đt|coban
冰箱|bīngxiāng|tủ lạnh|d|anuong
不但|búdàn|không những|lt|coban
而且|érqiě|mà còn|lt|coban
才|cái|mới (muộn, khó khăn)|p|coban
菜单|càidān|thực đơn|d|anuong
参加|cānjiā|tham gia|đg|coban
草|cǎo|cỏ|d|coban
层|céng|tầng|l|diadiem
差|chà|kém, thiếu|t|coban
超市|chāoshì|siêu thị|d|muasam,diadiem
衬衫|chènshān|áo sơ mi|d|muasam
成绩|chéngjì|thành tích, điểm số|d|truonghoc
城市|chéngshì|thành phố|d|diadiem
迟到|chídào|đến muộn|đg|truonghoc,congviec
出现|chūxiàn|xuất hiện|đg|coban
除了|chúle|ngoài ra, trừ|gi|coban
厨房|chúfáng|nhà bếp|d|anuong,giadinh
春|chūn|mùa xuân|d|thoitiet
词语|cíyǔ|từ ngữ|d|truonghoc
聪明|cōngming|thông minh|t|coban
打扫|dǎsǎo|quét dọn|đg|giadinh
打算|dǎsuàn|dự định|đg|coban
带|dài|mang, đem; dẫn|đg|coban
担心|dānxīn|lo lắng|đg|camxuc
蛋糕|dàngāo|bánh ngọt, bánh kem|d|anuong
当然|dāngrán|đương nhiên|p|coban
地|de|(trợ từ trạng ngữ)|tr|coban
灯|dēng|đèn|d|coban
低|dī|thấp|t|coban
地方|dìfang|nơi, chỗ|d|diadiem
地铁|dìtiě|tàu điện ngầm|d|giaothong
地图|dìtú|bản đồ|d|dulich
电梯|diàntī|thang máy|d|diadiem
电子邮件|diànzǐ yóujiàn|thư điện tử, email|d|congviec
东|dōng|phía đông|d|diadiem
冬|dōng|mùa đông|d|thoitiet
动物|dòngwù|động vật|d|coban
短|duǎn|ngắn|t|coban
段|duàn|đoạn|l|coban
锻炼|duànliàn|rèn luyện|đg|suckhoe,sothich
多么|duōme|biết bao, thật là|p|camxuc
饿|è|đói|t|anuong
耳朵|ěrduo|tai|d|suckhoe
发|fā|gửi; phát|đg|congviec
发烧|fāshāo|sốt|đg|suckhoe
发现|fāxiàn|phát hiện|đg|coban
方便|fāngbiàn|tiện lợi|t|coban
放|fàng|đặt, để; thả|đg|coban
放心|fàngxīn|yên tâm|đg|camxuc
分|fēn|phút; điểm; xu|l|thoigian
附近|fùjìn|gần đây, lân cận|d|diadiem
复习|fùxí|ôn tập|đg|truonghoc
干净|gānjìng|sạch sẽ|t|coban
感冒|gǎnmào|cảm cúm|đg|suckhoe
感兴趣|gǎn xìngqù|cảm thấy hứng thú|đg|sothich
刚才|gāngcái|vừa nãy|d|thoigian
个子|gèzi|vóc dáng, chiều cao|d|coban
根据|gēnjù|căn cứ vào|gi|coban
跟|gēn|với, cùng|gi|coban
更|gèng|càng, hơn|p|coban
公斤|gōngjīn|ki-lô-gam|l|muasam
公园|gōngyuán|công viên|d|diadiem
故事|gùshi|câu chuyện|d|sothich
刮风|guā fēng|nổi gió|đg|thoitiet
关|guān|đóng; tắt|đg|coban
关系|guānxi|quan hệ|d|giaotiep
关心|guānxīn|quan tâm|đg|camxuc
关于|guānyú|về (vấn đề gì)|gi|coban
国家|guójiā|quốc gia, đất nước|d|diadiem
过|guò|qua, trải qua|đg|coban
过去|guòqù|quá khứ; đi qua|d|thoigian
果汁|guǒzhī|nước ép trái cây|d|anuong
还是|háishi|hay là; vẫn|lt|coban
害怕|hàipà|sợ hãi|đg|camxuc
河|hé|sông|d|diadiem
黑板|hēibǎn|bảng đen|d|truonghoc
后来|hòulái|sau đó, về sau|d|thoigian
护照|hùzhào|hộ chiếu|d|dulich
花|huā|hoa; tiêu (tiền, thời gian)|d|muasam
画|huà|vẽ; bức tranh|đg|sothich
坏|huài|hỏng, xấu|t|coban
环境|huánjìng|môi trường|d|coban
换|huàn|đổi, thay|đg|muasam
黄河|Huáng Hé|sông Hoàng Hà|d|diadiem
会议|huìyì|cuộc họp, hội nghị|d|congviec
或者|huòzhě|hoặc (trong câu kể)|lt|coban
几乎|jīhū|hầu như, gần như|p|coban
机会|jīhuì|cơ hội|d|congviec
极|jí|cực kỳ|p|camxuc
记得|jìde|nhớ, còn nhớ|đg|coban
季节|jìjié|mùa|d|thoitiet
检查|jiǎnchá|kiểm tra|đg|suckhoe
简单|jiǎndān|đơn giản|t|coban
健康|jiànkāng|khỏe mạnh, sức khỏe|t|suckhoe
见面|jiànmiàn|gặp mặt|đg|giaotiep
讲|jiǎng|nói, giảng|đg|truonghoc
教|jiāo|dạy|đg|truonghoc
角|jiǎo|hào (1/10 tệ); góc|l|muasam
脚|jiǎo|bàn chân|d|suckhoe
接|jiē|đón; nhận|đg|giaothong
街道|jiēdào|đường phố|d|diadiem
节目|jiémù|tiết mục, chương trình|d|sothich
节日|jiérì|ngày lễ|d|ngaythang
结婚|jiéhūn|kết hôn|đg|giadinh
结束|jiéshù|kết thúc|đg|coban
解决|jiějué|giải quyết|đg|congviec
借|jiè|mượn; cho mượn|đg|coban
经常|jīngcháng|thường xuyên|p|coban
经过|jīngguò|đi qua; trải qua|đg|coban
经理|jīnglǐ|giám đốc, quản lý|d|congviec
久|jiǔ|lâu|t|thoigian
旧|jiù|cũ|t|coban
句子|jùzi|câu|d|truonghoc
决定|juédìng|quyết định|đg|coban
可爱|kě'ài|đáng yêu|t|camxuc
渴|kě|khát|t|anuong
刻|kè|15 phút, khắc|l|thoigian
客人|kèrén|khách|d|giaotiep
空调|kōngtiáo|điều hòa|d|coban
口|kǒu|miệng; (lượng từ cho người trong nhà)|d|suckhoe
哭|kū|khóc|đg|camxuc
裤子|kùzi|quần|d|muasam
筷子|kuàizi|đũa|d|anuong
蓝|lán|màu xanh lam|t|mausac
老|lǎo|già, cũ|t|coban
离开|líkāi|rời khỏi|đg|coban
礼物|lǐwù|quà tặng|d|muasam
历史|lìshǐ|lịch sử|d|truonghoc
脸|liǎn|mặt|d|suckhoe
练习|liànxí|luyện tập; bài tập|đg|truonghoc
辆|liàng|chiếc (lượng từ cho xe)|l|giaothong
聊天|liáotiān|tán gẫu, nói chuyện|đg|giaotiep
了解|liǎojiě|hiểu rõ, tìm hiểu|đg|coban
邻居|línjū|hàng xóm|d|giadinh
留学|liúxué|du học|đg|truonghoc
楼|lóu|tòa nhà; tầng|d|diadiem
绿|lǜ|màu xanh lá|t|mausac
马|mǎ|con ngựa|d|coban
马上|mǎshàng|ngay lập tức|p|thoigian
满意|mǎnyì|hài lòng|t|camxuc
帽子|màozi|cái mũ|d|muasam
米|mǐ|mét; gạo|l|coban
面包|miànbāo|bánh mì|d|anuong
明白|míngbai|hiểu, rõ ràng|đg|coban
拿|ná|cầm, lấy|đg|coban
奶奶|nǎinai|bà nội|d|giadinh
南|nán|phía nam|d|diadiem
难|nán|khó|t|truonghoc
难过|nánguò|buồn|t|camxuc
年级|niánjí|lớp, khối (năm học)|d|truonghoc
年轻|niánqīng|trẻ|t|coban
鸟|niǎo|con chim|d|coban
努力|nǔlì|cố gắng|t|truonghoc
爬山|pá shān|leo núi|đg|sothich,dulich
盘子|pánzi|cái đĩa|d|anuong
胖|pàng|béo|t|suckhoe
皮鞋|píxié|giày da|d|muasam
啤酒|píjiǔ|bia|d|anuong
葡萄|pútao|nho|d|anuong
普通话|pǔtōnghuà|tiếng phổ thông|d|truonghoc
其实|qíshí|thực ra|p|coban
其他|qítā|khác, còn lại|đt|coban
奇怪|qíguài|kỳ lạ|t|camxuc
骑|qí|cưỡi, đi (xe đạp, xe máy)|đg|giaothong
起飞|qǐfēi|cất cánh|đg|giaothong
起来|qǐlái|dậy; lên|đg|coban
清楚|qīngchu|rõ ràng|t|coban
请假|qǐngjià|xin nghỉ phép|đg|congviec
秋|qiū|mùa thu|d|thoitiet
裙子|qúnzi|váy|d|muasam
然后|ránhòu|sau đó|lt|coban
热情|rèqíng|nhiệt tình|t|camxuc
认为|rènwéi|cho rằng|đg|coban
认真|rènzhēn|chăm chỉ, nghiêm túc|t|truonghoc
容易|róngyì|dễ|t|coban
如果|rúguǒ|nếu|lt|coban
伞|sǎn|cái ô, dù|d|thoitiet
上网|shàngwǎng|lên mạng|đg|sothich
生气|shēngqì|tức giận|đg|camxuc
声音|shēngyīn|âm thanh, giọng nói|d|coban
使|shǐ|khiến, làm cho|đg|coban
世界|shìjiè|thế giới|d|diadiem
试|shì|thử|đg|muasam
瘦|shòu|gầy|t|suckhoe
叔叔|shūshu|chú|d|giadinh
舒服|shūfu|dễ chịu, thoải mái|t|suckhoe
树|shù|cây|d|coban
数学|shùxué|toán học|d|truonghoc
刷牙|shuāyá|đánh răng|đg|suckhoe
双|shuāng|đôi (lượng từ)|l|muasam
水平|shuǐpíng|trình độ|d|truonghoc
司机|sījī|tài xế|d|giaothong,congviec
太阳|tàiyáng|mặt trời|d|thoitiet
糖|táng|đường; kẹo|d|anuong
特别|tèbié|đặc biệt|p|coban
疼|téng|đau|t|suckhoe
提高|tígāo|nâng cao|đg|truonghoc
体育|tǐyù|thể dục, thể thao|d|sothich
甜|tián|ngọt|t|anuong
条|tiáo|(lượng từ cho vật dài)|l|coban
同事|tóngshì|đồng nghiệp|d|congviec
同意|tóngyì|đồng ý|đg|giaotiep
头发|tóufa|tóc|d|suckhoe
突然|tūrán|đột nhiên|p|coban
图书馆|túshūguǎn|thư viện|d|truonghoc,diadiem
腿|tuǐ|chân, cẳng chân|d|suckhoe
完成|wánchéng|hoàn thành|đg|congviec
碗|wǎn|cái bát|d|anuong
万|wàn|vạn, mười nghìn|s|so
忘记|wàngjì|quên|đg|coban
为|wèi|vì, cho|gi|coban
为了|wèile|để, vì|gi|coban
位|wèi|vị (lượng từ lịch sự cho người)|l|giaotiep
文化|wénhuà|văn hóa|d|dulich
西|xī|phía tây|d|diadiem
习惯|xíguàn|thói quen; quen|d|coban
洗手间|xǐshǒujiān|nhà vệ sinh|d|diadiem
洗澡|xǐzǎo|tắm|đg|suckhoe
夏|xià|mùa hè|d|thoitiet
先|xiān|trước tiên|p|coban
相同|xiāngtóng|giống nhau|t|coban
相信|xiāngxìn|tin tưởng|đg|camxuc
香蕉|xiāngjiāo|quả chuối|d|anuong
向|xiàng|hướng về, về phía|gi|giaothong
像|xiàng|giống|đg|coban
小心|xiǎoxīn|cẩn thận|t|coban
校长|xiàozhǎng|hiệu trưởng|d|truonghoc
鞋|xié|giày|d|muasam
新闻|xīnwén|tin tức|d|sothich
信用卡|xìnyòngkǎ|thẻ tín dụng|d|muasam
新鲜|xīnxiān|tươi, mới|t|anuong
信|xìn|thư|d|giaotiep
行李箱|xínglixiāng|va li|d|dulich
兴趣|xìngqù|hứng thú|d|sothich
熊猫|xióngmāo|gấu trúc|d|dulich
需要|xūyào|cần|đg|coban
选择|xuǎnzé|lựa chọn|đg|coban
眼镜|yǎnjìng|kính mắt|d|suckhoe
要求|yāoqiú|yêu cầu|đg|congviec
爷爷|yéye|ông nội|d|giadinh
一般|yìbān|thông thường|t|coban
一边|yìbiān|vừa... vừa...|p|coban
一定|yídìng|nhất định|p|coban
一共|yígòng|tổng cộng|p|muasam
一会儿|yíhuìr|một lát|d|thoigian
一样|yíyàng|giống nhau|t|coban
一直|yìzhí|luôn luôn; thẳng|p|coban
以后|yǐhòu|sau này, sau khi|d|thoigian
以前|yǐqián|trước đây|d|thoigian
以为|yǐwéi|tưởng rằng|đg|coban
音乐|yīnyuè|âm nhạc|d|sothich
银行|yínháng|ngân hàng|d|diadiem,congviec
饮料|yǐnliào|đồ uống|d|anuong
应该|yīnggāi|nên, cần phải|n|coban
影响|yǐngxiǎng|ảnh hưởng|đg|coban
用|yòng|dùng, sử dụng|đg|coban
游戏|yóuxì|trò chơi|d|sothich
有名|yǒumíng|nổi tiếng|t|coban
又|yòu|lại (đã xảy ra)|p|coban
遇到|yùdào|gặp phải|đg|coban
元|yuán|đồng (đơn vị tiền tệ)|l|muasam
愿意|yuànyì|bằng lòng, sẵn lòng|n|camxuc
月亮|yuèliang|mặt trăng|d|coban
越|yuè|càng|p|coban
云|yún|mây|d|thoitiet
站|zhàn|đứng; trạm, ga|đg|giaothong
张|zhāng|tờ, tấm (lượng từ vật phẳng)|l|coban
长|zhǎng|mọc, lớn lên|đg|coban
着急|zháojí|sốt ruột, lo lắng|t|camxuc
照顾|zhàogù|chăm sóc|đg|giadinh
照片|zhàopiàn|ảnh, bức ảnh|d|dulich
照相机|zhàoxiàngjī|máy ảnh|d|dulich
只|zhǐ|chỉ|p|coban
中间|zhōngjiān|ở giữa|d|diadiem
中文|Zhōngwén|tiếng Trung|d|truonghoc
终于|zhōngyú|cuối cùng|p|coban
种|zhǒng|loại, kiểu|l|coban
重要|zhòngyào|quan trọng|t|coban
周末|zhōumò|cuối tuần|d|ngaythang
主要|zhǔyào|chủ yếu|t|coban
注意|zhùyì|chú ý|đg|coban
自己|zìjǐ|bản thân, tự mình|đt|coban
自行车|zìxíngchē|xe đạp|d|giaothong
字典|zìdiǎn|từ điển (chữ)|d|truonghoc
总是|zǒngshì|luôn luôn|p|coban
嘴|zuǐ|miệng|d|suckhoe
最后|zuìhòu|cuối cùng|d|coban
最近|zuìjìn|gần đây|d|thoigian
作业|zuòyè|bài tập về nhà|d|truonghoc
作用|zuòyòng|tác dụng|d|coban
`};


// Từ mở rộng / tên riêng xuất hiện trong bài (ngoài danh sách HSK 1–3) — có giải thích riêng
const EXTRA = `
越南|Yuènán|Việt Nam|d|diadiem
越南人|Yuènánrén|người Việt Nam|d|diadiem
越南语|Yuènányǔ|tiếng Việt|d|truonghoc
河内|Hénèi|Hà Nội|d|diadiem
阿兰|Ā Lán|Lan (tên riêng)|d|giaotiep
小明|Xiǎomíng|Tiểu Minh (tên riêng)|d|giaotiep
小王|Xiǎo Wáng|Tiểu Vương (cách gọi thân mật)|d|giaotiep
王|Wáng|họ Vương|d|giaotiep
李|Lǐ|họ Lý|d|giaotiep
祝|zhù|chúc|đg|giaotiep
哈哈|hāha|ha ha (tiếng cười)|c|camxuc
合适|héshì|vừa, phù hợp|t|muasam
内|nèi|trong, bên trong (thời hạn)|d|coban
瓶|píng|chai, bình (lượng từ)|l|anuong
美|měi|đẹp|t|coban
陪|péi|đi cùng, ở bên|đg|giaotiep
毕业|bìyè|tốt nghiệp|đg|truonghoc
继续|jìxù|tiếp tục|đg|coban
难怪|nánguài|thảo nào|p|coban
春节|Chūnjié|Tết Nguyên đán|d|ngaythang
头|tóu|đầu|d|suckhoe
心情|xīnqíng|tâm trạng|d|camxuc
好久不见|hǎojiǔ bú jiàn|lâu rồi không gặp|c|giaotiep
请问|qǐngwèn|xin hỏi|c|giaotiep
哪国|nǎ guó|nước nào|c|diadiem
越来越|yuèláiyuè|càng ngày càng|p|coban
张开|zhāngkāi|mở ra, há ra|đg|suckhoe
手机号|shǒujīhào|số điện thoại di động|d|giaotiep
有点儿|yǒudiǎnr|hơi, có chút|p|coban
有一点儿|yǒu yìdiǎnr|hơi, có chút|p|coban
没有|méiyǒu|không có; chưa|p|coban
不是|bú shì|không phải|c|coban
一点儿也|yìdiǎnr yě|một chút cũng (không)|c|coban
他们|tāmen|họ, các anh ấy|đt|coban
她们|tāmen|các cô ấy|đt|coban
你们|nǐmen|các bạn|đt|coban
那么|nàme|như thế, vậy thì|đt|coban
这么|zhème|như thế này|đt|coban
吃饭|chīfàn|ăn cơm|đg|anuong
做饭|zuòfàn|nấu cơm|đg|anuong
学|xué|học|đg|truonghoc
睡|shuì|ngủ|đg|suckhoe
车|chē|xe|d|giaothong
开车|kāichē|lái xe|đg|giaothong
火车|huǒchē|tàu hỏa|d|giaothong
杯|bēi|cốc, ly (lượng từ)|l|anuong
天|tiān|ngày; trời|d|thoigian
今年|jīnnián|năm nay|d|ngaythang
晚|wǎn|muộn, tối|t|thoigian
早|zǎo|sớm|t|thoigian
歌|gē|bài hát|d|sothich
汉字|Hànzì|chữ Hán|d|truonghoc
前|qián|trước|d|diadiem
起|qǐ|dậy; lên|đg|coban
雨|yǔ|mưa|d|thoitiet
考|kǎo|thi|đg|truonghoc
三级|sān jí|cấp 3|c|truonghoc
可是|kěshì|nhưng|lt|coban
跑|pǎo|chạy|đg|sothich
变|biàn|thay đổi|đg|coban
照|zhào|chụp (ảnh); chiếu|đg|dulich
盘|pán|đĩa (lượng từ)|l|anuong
忘|wàng|quên|đg|coban
孩子们|háizimen|bọn trẻ|d|giadinh
男孩子|nánháizi|bé trai|d|giadinh
女孩子|nǚháizi|bé gái|d|giadinh
上课|shàngkè|lên lớp, học|đg|truonghoc
面前|miànqián|trước mặt|d|diadiem
右|yòu|phải (bên phải)|d|diadiem
点儿|diǎnr|một chút|l|coban
听力|tīnglì|kỹ năng nghe|d|truonghoc
下面|xiàmiàn|bên dưới|d|diadiem
上面|shàngmiàn|bên trên|d|diadiem
想法|xiǎngfǎ|suy nghĩ, ý kiến|d|coban
人们|rénmen|mọi người|d|coban
春天|chūntiān|mùa xuân|d|thoitiet
夏天|xiàtiān|mùa hè|d|thoitiet
秋天|qiūtiān|mùa thu|d|thoitiet
冬天|dōngtiān|mùa đông|d|thoitiet
晴天|qíngtiān|trời nắng|d|thoitiet
阴天|yīntiān|trời âm u|d|thoitiet
点菜|diǎn cài|gọi món|đg|anuong
走路|zǒulù|đi bộ|đg|giaothong
`;

export const POS = { d:'Danh từ', 'đg':'Động từ', t:'Tính từ', p:'Phó từ', s:'Số từ', l:'Lượng từ', 'đt':'Đại từ', tr:'Trợ từ', gi:'Giới từ', lt:'Liên từ', n:'Năng nguyện động từ', c:'Cụm từ / câu giao tiếp' };

export const TOPICS = {
  giadinh:['Gia đình','👨‍👩‍👧'], truonghoc:['Trường học','🏫'], congviec:['Công việc','💼'], anuong:['Đồ ăn & đồ uống','🍜'],
  dulich:['Du lịch','🧳'], thoigian:['Thời gian','⏰'], ngaythang:['Ngày tháng','📅'], thoitiet:['Thời tiết','⛅'],
  suckhoe:['Sức khỏe','🩺'], muasam:['Mua sắm','🛍️'], giaothong:['Giao thông','🚌'], diadiem:['Địa điểm','📍'],
  camxuc:['Cảm xúc','😊'], sothich:['Sở thích','🎨'], giaotiep:['Giao tiếp hằng ngày','💬'], so:['Số đếm','🔢'],
  mausac:['Màu sắc','🎨'], coban:['Từ cơ bản','🧩']
};

export const VOCAB = [];
for (const lv of [1,2,3]) {
  RAW[lv].trim().split('\n').forEach((line, i) => {
    const [h, p, vi, pos, topics] = line.split('|');
    VOCAB.push({ id: `${lv}-${i}`, h, p, vi, pos, topics: topics.split(','), level: lv, source: 'hsk' });
  });
}
EXTRA.trim().split('\n').forEach((line, i) => {
  const [h, p, vi, pos, topics] = line.split('|');
  VOCAB.push({ id: `x-${i}`, h, p, vi, pos, topics: topics.split(','), level: 0, source: 'extra' });
});
