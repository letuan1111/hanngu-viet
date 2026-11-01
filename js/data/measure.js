// Danh sách lượng từ (量词) thường gặp. Mỗi dòng:
// lượng từ | pinyin | cấp (1,2,3 hoặc 4 = mở rộng) | loại (d = danh lượng từ, v = động lượng từ) | dùng cho | danh từ đi kèm (cách nhau bởi dấu cách) | câu ví dụ | nghĩa câu
const RAW = `
个|gè|1|d|người và hầu hết sự vật (lượng từ chung nhất)|人 朋友 苹果 问题 星期|我有三个好朋友。|Tôi có ba người bạn thân.
本|běn|1|d|sách, vở, tạp chí (vật đóng thành quyển)|书 词典 杂志 本子|这本书很有意思。|Quyển sách này rất thú vị.
口|kǒu|1|d|số người trong gia đình|人|我家有四口人。|Nhà tôi có bốn người.
块|kuài|1|d|đồng (tiền, khẩu ngữ); miếng, cục, mảnh|钱 蛋糕 手表 面包|这个苹果三块钱。|Quả táo này ba đồng.
杯|bēi|1|d|cốc, ly (đồ uống)|水 茶 咖啡 牛奶|我想喝一杯茶。|Tôi muốn uống một cốc trà.
些|xiē|1|d|một vài, một ít (số lượng không xác định)|东西 人 水果 问题|我想买一些水果。|Tôi muốn mua một ít hoa quả.
岁|suì|1|d|tuổi||我今年二十岁。|Năm nay tôi hai mươi tuổi.
张|zhāng|2|d|vật mỏng, phẳng hoặc có mặt phẳng|纸 票 桌子 床 照片 地图|请给我两张票。|Cho tôi hai vé.
件|jiàn|2|d|quần áo (phần trên), sự việc, hành lý|衣服 事 礼物 行李|这件衣服很漂亮。|Chiếc áo này rất đẹp.
只|zhī|2|d|con vật nhỏ; một chiếc (trong một đôi)|猫 狗 鸟 手 脚|我家有一只小猫。|Nhà tôi có một con mèo nhỏ.
条|tiáo|2|d|vật dài, mảnh; tin tức|鱼 裤子 河 路 裙子 新闻|这条裤子有点儿长。|Chiếc quần này hơi dài.
双|shuāng|2|d|đôi (vật đi thành cặp)|鞋 筷子 手 袜子|我买了一双新鞋。|Tôi đã mua một đôi giày mới.
辆|liàng|2|d|xe cộ|车 自行车 汽车 出租车|他有一辆新车。|Anh ấy có một chiếc xe mới.
位|wèi|2|d|người (cách nói lịch sự, tôn trọng)|老师 客人 先生 女士|这位老师姓王。|Thầy giáo này họ Vương.
家|jiā|2|d|cửa hàng, công ty, nhà hàng, bệnh viện|饭店 商店 公司 医院 银行|这家饭店的菜很好吃。|Món ăn của nhà hàng này rất ngon.
瓶|píng|2|d|chai, lọ|水 啤酒 牛奶 果汁|给我两瓶啤酒。|Cho tôi hai chai bia.
碗|wǎn|2|d|bát|米饭 面条 汤|我吃了一碗米饭。|Tôi đã ăn một bát cơm.
斤|jīn|2|d|cân (= 0,5 kg)|苹果 肉 鸡蛋 米|苹果多少钱一斤？|Táo bao nhiêu tiền một cân?
种|zhǒng|2|d|loại, kiểu|水果 颜色 人 方法|这种水果叫什么？|Loại quả này gọi là gì?
次|cì|2|v|lần (số lần làm việc gì)|去 看 来|我去过两次北京。|Tôi đã đến Bắc Kinh hai lần.
间|jiān|2|d|phòng, gian|房间 教室 屋子 办公室|这间教室很大。|Phòng học này rất rộng.
元|yuán|2|d|đồng (tiền, dạng viết)|钱|一共五十元。|Tổng cộng năm mươi đồng.
分|fēn|2|d|xu (1/100 đồng); phút; điểm|钱|我考了九十分。|Tôi thi được chín mươi điểm.
层|céng|3|d|tầng, lớp|楼 楼梯|我家住在五层。|Nhà tôi ở tầng năm.
节|jié|3|d|tiết học; đốt, đoạn|课 车厢|今天上午有四节课。|Sáng nay có bốn tiết học.
份|fèn|3|d|phần, suất; bản (giấy tờ, báo); công việc|工作 报纸 礼物 早餐|他找到了一份新工作。|Anh ấy đã tìm được một công việc mới.
封|fēng|3|d|lá thư, bức thư|信 邮件|我给妈妈写了一封信。|Tôi đã viết cho mẹ một lá thư.
把|bǎ|3|d|vật có tay cầm, cán; ghế|伞 椅子 刀 钥匙 雨伞|这把椅子很舒服。|Chiếc ghế này rất thoải mái.
台|tái|3|d|máy móc, thiết bị|电脑 电视 冰箱 空调|我买了一台新电脑。|Tôi đã mua một chiếc máy tính mới.
部|bù|3|d|bộ phim, điện thoại, tác phẩm|电影 手机 小说|这部电影很好看。|Bộ phim này rất hay.
首|shǒu|3|d|bài hát, bài thơ|歌 诗|我很喜欢这首歌。|Tôi rất thích bài hát này.
篇|piān|3|d|bài văn, bài báo|文章 作文 日记|这篇文章不太长。|Bài văn này không dài lắm.
道|dào|3|d|câu hỏi, bài tập; món ăn; cánh cửa|题 菜 门|这道题有点儿难。|Câu hỏi này hơi khó.
场|chǎng|3|d|trận đấu, buổi biểu diễn, cơn mưa|比赛 电影 雨 雪|昨天下了一场大雨。|Hôm qua có một trận mưa to.
座|zuò|3|d|núi, cầu, tòa nhà lớn, thành phố|山 桥 楼 城市|那座山非常高。|Ngọn núi kia rất cao.
棵|kē|3|d|cây|树 草|门口有一棵大树。|Trước cửa có một cái cây to.
朵|duǒ|3|d|bông hoa, đám mây|花 云|她买了一朵红花。|Cô ấy đã mua một bông hoa đỏ.
片|piàn|3|d|lát, miếng mỏng; viên (thuốc); vùng|面包 叶子 药 肉|我早上吃了两片面包。|Buổi sáng tôi ăn hai lát bánh mì.
支|zhī|3|d|bút, vật dài cứng; đội ngũ|笔 铅笔 队伍|你能借我一支笔吗？|Bạn cho tôi mượn một cây bút được không?
门|mén|3|d|môn học; ngôn ngữ|课 语言|这个学期我有五门课。|Học kỳ này tôi có năm môn học.
所|suǒ|3|d|trường học, bệnh viện, ngôi nhà|学校 大学 医院 房子|这是一所有名的大学。|Đây là một trường đại học nổi tiếng.
段|duàn|3|d|đoạn (đường, thời gian, lời nói)|路 时间 话 音乐|这段时间我很忙。|Khoảng thời gian này tôi rất bận.
句|jù|3|d|câu (lời nói)|话|我想说几句话。|Tôi muốn nói vài câu.
遍|biàn|3|v|lượt, lần (làm trọn từ đầu đến cuối)|说 读 看 听|请再说一遍。|Xin hãy nói lại một lần nữa.
趟|tàng|3|v|chuyến (đi rồi về)|去 跑|我去了一趟超市。|Tôi đã đi siêu thị một chuyến.
下|xià|3|v|cái, chút (động tác ngắn)|等 看 敲|请等一下。|Xin chờ một chút.
群|qún|3|d|đàn, nhóm, bầy|人 学生 羊 鸟|一群学生在打篮球。|Một nhóm học sinh đang chơi bóng rổ.
套|tào|3|d|bộ (quần áo, đồ đạc); căn (nhà)|衣服 房子 家具 书|他在北京买了一套房子。|Anh ấy đã mua một căn nhà ở Bắc Kinh.
盒|hé|3|d|hộp|饼干 巧克力 牛奶|我买了一盒巧克力。|Tôi đã mua một hộp sô-cô-la.
包|bāo|3|d|gói, bao|饼干 茶 烟 纸巾|他买了一包饼干。|Anh ấy đã mua một gói bánh quy.
米|mǐ|3|d|mét|路 布|这条路长五百米。|Con đường này dài năm trăm mét.
公里|gōnglǐ|3|d|ki-lô-mét|路|学校离我家三公里。|Trường cách nhà tôi ba ki-lô-mét.
对|duì|4|d|cặp, đôi (người hoặc vật thành đôi)|夫妻 朋友 耳环|他们是一对好朋友。|Họ là một đôi bạn thân.
架|jià|4|d|máy bay; đàn piano; máy ảnh|飞机 钢琴 照相机|天上有一架飞机。|Trên trời có một chiếc máy bay.
头|tóu|4|d|con (gia súc lớn); củ (tỏi)|牛 猪 大象 蒜|农民养了十头牛。|Người nông dân nuôi mười con bò.
匹|pǐ|4|d|con ngựa; tấm (vải)|马 布|草地上有一匹白马。|Trên bãi cỏ có một con ngựa trắng.
颗|kē|4|d|viên, hạt, vật nhỏ tròn|星星 牙 心 糖|天上有很多颗星星。|Trên trời có rất nhiều ngôi sao.
粒|lì|4|d|hạt (rất nhỏ)|米 沙子 药|一粒米也不要浪费。|Đến một hạt gạo cũng đừng lãng phí.
滴|dī|4|d|giọt|水 眼泪 血|杯子里只剩一滴水。|Trong cốc chỉ còn một giọt nước.
排|pái|4|d|hàng, dãy|座位 树 房子|我们坐在第一排。|Chúng tôi ngồi ở hàng đầu tiên.
顶|dǐng|4|d|mũ, nón; lều; màn|帽子 帐篷|这顶帽子很好看。|Chiếc mũ này rất đẹp.
袋|dài|4|d|túi, bao|米 垃圾 面粉|妈妈买了一袋米。|Mẹ đã mua một bao gạo.
幅|fú|4|d|bức (tranh, ảnh treo)|画 照片 地图|墙上挂着一幅画。|Trên tường treo một bức tranh.
扇|shàn|4|d|cánh (cửa, cửa sổ)|门 窗户|请关上那扇窗户。|Hãy đóng cánh cửa sổ kia lại.
串|chuàn|4|d|chùm, xâu|葡萄 钥匙 香蕉|桌子上有一串葡萄。|Trên bàn có một chùm nho.
批|pī|4|d|lô, đợt, nhóm (hàng hóa, người)|货 学生 客人|公司来了一批新员工。|Công ty có một đợt nhân viên mới.
顿|dùn|4|v|bữa (ăn); trận (mắng, đánh)|饭 骂|我们一天吃三顿饭。|Chúng tôi ăn ba bữa một ngày.
回|huí|4|v|lần, hồi (khẩu ngữ, gần giống 次)|去 来 事|这是怎么一回事？|Đây là chuyện gì vậy?
声|shēng|4|v|tiếng (âm thanh, lời gọi)|叫 喊|他大喊了一声。|Anh ấy hét lên một tiếng.
眼|yǎn|4|v|cái nhìn, lần nhìn|看|她看了我一眼。|Cô ấy liếc nhìn tôi một cái.
`;
export const MEASURES = RAW.trim().split('\n').map(l => { const [h, p, lv, k, use, nouns, ex, exVi] = l.split('|'); return { h, p, lv: +lv, k, use, nouns: nouns.split(' ').filter(Boolean), ex, exVi }; });
