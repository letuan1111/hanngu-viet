# Luyện nói · HànNgữ Việt

Web luyện phản xạ nói tiếng Trung HSK 1–3 cho người Việt, có AI.

- **⚡ Phản xạ hỏi – đáp**: 265 câu, 33 chủ đề HSK 1–3. AI đọc câu hỏi, bạn trả lời bằng giọng nói, AI đoán chữ Hán bạn nói, chấm điểm, sửa lỗi và đo thời gian phản xạ.
- **🔁 Nghe & nhại câu**: so từng chữ, chỉ ra thanh điệu và âm đọc sai.
- **💬 Trò chuyện**: nói chuyện tự do với AI 小雨 theo 120 chủ đề hoặc chủ đề tự nhập.
- **✨ AI tự soạn câu**: AI soạn bộ câu hỏi – đáp mới theo chủ đề và cấp HSK, dựa trên danh sách từ HSK 3.0.
- **❓ Hỏi gì đáp nấy**: hỏi bằng tiếng Trung hoặc tiếng Việt. Trang tra trong kho HSK 1–3 của dự án (khoảng 2.300 từ, 11.600 câu mẫu, 26 đề nói), rồi nhờ AI trả lời dựa trên kho đó.
- **📝 26 đề nói**: luyện phản xạ và nhại câu với 390 câu của bài nói mẫu.

## Chạy
Mở `index.html` bằng Chrome hoặc Edge. Edge có giọng 晓晓 Xiaoxiao Neural, đọc tự nhiên nhất.
Nhận dạng giọng nói dùng Web Speech API (zh-CN). Phần AI cần **Gemini API key** (lấy miễn phí tại https://aistudio.google.com/apikey) hoặc Claude API key, nhập trong ⚙︎ Cài đặt. Key chỉ lưu trong trình duyệt của bạn. Không có key thì trang vẫn trả lời bằng kho dữ liệu offline.
Dữ liệu được nạp từ `../js/data/` của HànNgữ Việt.
