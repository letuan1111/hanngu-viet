# HànNgữ Việt 汉语

Website học tiếng Trung phổ thông (普通话, chữ giản thể) cho người Việt, từ con số 0 đến **HSK 3**.
Giao diện tiếng Việt, chạy trên máy tính, điện thoại và máy tính bảng. Không cần máy chủ – toàn bộ chạy trên GitHub Pages.

**Mục tiêu:** sau mỗi bài, người học tự nói và viết được về một chủ đề cụ thể, không chỉ học thuộc từ.

## Tính năng

- **Khóa học HSK 1–3** (khung HSK 2.0): 10 chương, 50 bài. Mỗi bài: Từ vựng → Hội thoại → Ngữ pháp → Bài tập → Kiểm tra (≥ 70%) → Thực hành nói/viết theo chủ đề → Hoàn thành. Có kiểm tra cuối chương và đánh giá cuối cấp.
- **Từ vựng ~650 từ** (HSK 1: 155, HSK 2: 150, HSK 3: 315 + từ mở rộng): pinyin, nghĩa, từ loại, cấp độ, phát âm, ví dụ tự tìm từ kho câu, từ kết hợp, đồng/trái nghĩa, từ dễ nhầm, lỗi thường gặp, bài học có chứa từ.
- **Bấm vào mọi chữ Hán**: tách từ theo từ điển (ưu tiên từ ghép), xem riêng từng chữ, pinyin theo ngữ cảnh (chữ đa âm, biến điệu 不/一).
- **Chế độ hiển thị**: bật/tắt chữ Hán, pinyin (trên chữ / dòng riêng / bấm để hiện / tắt), nghĩa tiếng Việt, tách từng từ kèm nghĩa, cỡ chữ, giao diện sáng/tối.
- **Ghi nhớ thông minh**: thứ tự nét (Hanzi Writer) và tự viết bằng chuột/ngón tay, bộ thủ, thành phần, loại chữ (tượng hình/hội ý/hình thanh). Phân biệt rõ *cấu tạo có căn cứ* với *mẹo liên tưởng*.
- **Thư viện ~60 cấu trúc ngữ pháp**: công thức, giải thích, ví dụ tăng dần, lỗi sai, so sánh hai cấu trúc, bài tập điền từ/sắp xếp/biến đổi khẳng định–phủ định–nghi vấn, công cụ kiểm tra và phân tích câu theo quy tắc.
- **Giọng đọc tiếng Trung** (Web Speech API): từ, câu, hội thoại hai giọng A/B, tốc độ 0.75x/1x/1.25x, lặp lại, tô sáng chữ đang đọc, đánh dấu câu khó nghe.
- **Luyện tập**: nghe, chép chính tả, phát âm có chấm điểm (Chrome/Edge), nhập vai hội thoại, đọc hiểu, viết chữ, viết đoạn văn, sắp xếp câu, phản xạ có tính giờ.
- **Ôn tập lặp lại ngắt quãng** (SM-2) với 3 kiểu thẻ; **thi thử HSK** có tính giờ; **kiểm tra đầu vào**; **theo dõi tiến độ** theo cấp, kỹ năng, ngày học liên tiếp.
- **Góc đóng góp**: thêm từ mới (có nút tự động bổ sung), ví dụ, mẹo, hội thoại, câu hỏi giao tiếp, chủ đề viết. Có kiểm tra định dạng, trùng lặp, spam. Nội dung **chỉ lưu trên trình duyệt của người đóng góp**, có thể xuất/nhập tệp để chia sẻ, và không bao giờ thay thế nội dung HSK.

## Lưu trữ dữ liệu

Tiến độ, cài đặt và đóng góp lưu trong `localStorage` của trình duyệt. Sao lưu/khôi phục bằng tệp JSON ở trang **Tiến độ**.

## Chạy thử trên máy

```bash
python3 -m http.server 8000
# mở http://localhost:8000
```

## Cấu trúc

```
index.html            khung trang
css/style.css         giao diện
js/app.js             định tuyến
js/core/              lưu trữ, từ điển & tách từ, giọng đọc, bài tập, kiểm tra câu
js/views/             các màn hình
js/data/vocab.js      từ vựng (sửa/thêm từ tại đây)
js/data/lessons.js    chương và bài học
js/data/grammar.js    ngữ pháp
js/data/chars.js      cấu tạo chữ (Make Me a Hanzi)
strokes/              dữ liệu nét chữ (Hanzi Writer)
vendor/               pinyin-pro, hanzi-writer
```

Quản trị nội dung: thêm/sửa/sắp xếp chương, bài, từ và ngữ pháp bằng cách chỉnh các tệp trong `js/data/` rồi đẩy lên GitHub.

## Ghi công

- [Hanzi Writer](https://hanziwriter.org) và dữ liệu nét `hanzi-writer-data` (Arphic Public License)
- [Make Me a Hanzi](https://github.com/skishore/makemeahanzi) – cấu tạo chữ (LGPL / Arphic)
- [pinyin-pro](https://github.com/zh-lx/pinyin-pro) – chuyển pinyin theo ngữ cảnh (MIT)
