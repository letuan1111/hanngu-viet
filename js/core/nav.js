// Giữ trạng thái trang khi rời đi để khi bấm “Quay lại” mở lại đúng chỗ cũ
// (trang số mấy, ô tìm kiếm, bộ lọc, dòng ví dụ đang mở, từ vừa bấm…)
let getter = null, pending = null;
// Trang đăng ký hàm trả về trạng thái hiện tại (gọi khi trang được vẽ)
export const keepState = fn => { getter = fn; };
// Trang lấy trạng thái cũ (chỉ có khi người dùng quay lại trang này)
export const takeState = () => { const p = pending; pending = null; return p; };
export function _capture() { let st = null; try { st = getter ? getter() : null; } catch {} getter = null; return st; }
export function _setPending(st) { pending = st || null; }
