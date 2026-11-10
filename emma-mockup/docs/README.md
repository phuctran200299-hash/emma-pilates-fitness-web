# Emma Pilates – Thiết kế lại website: bộ tài liệu

Cập nhật: 2026-11-03

## Danh sách tài liệu

| File | Dùng để làm gì | Ai đọc |
|---|---|---|
| [01-bao-cao-khach.md](01-bao-cao-khach.md) | Báo cáo hướng thiết kế, các phương án, phạm vi, những gì cần khách cung cấp | Khách hàng |
| [02-ky-thuat-trien-khai.md](02-ky-thuat-trien-khai.md) | Đặc tả để code lên WordPress (Flatsome): tokens, ánh xạ khối, hiệu ứng, checklist. Cuối file có phần bổ sung cho bản F | Người code |
| [03-phan-tich-fonv.md](03-phan-tich-fonv.md) | Phân tích website mẫu fonv.co.kr **đã kiểm tra lại bằng trình duyệt thật** (thay bản cũ) | Nội bộ |

## Link xem mockup (riêng tư, cần bấm Share để khách mở được)

| Bản | Mô tả | Link |
|---|---|---|
| **F. Sát fonv, đủ trang** | 9 trang: Trang chủ, Giới thiệu, Dịch vụ (tab), Máy tập (giỏ hàng), Đào tạo, Tin tức, Tuyển dụng, Liên hệ (tab 3 cơ sở), Đặt lịch | https://claude.ai/artifact/3Q4PYE1mzxZh4ouRxjS6gq |
| A. fonv, trang chủ | Header trắng, ảnh tràn, panel màu + ảnh | https://claude.ai/artifact/KdLHneoYVW1iWyrfXRP2wL |
| B. Thiết kế ban đầu | Teal, khung giữ chỗ, chữ hiện dần. **Giữ nguyên theo yêu cầu** | https://claude.ai/artifact/AHReTSsKCoRPoW1VLhPwrR |
| C. Sand | Be, đất nung, thẻ xếp chồng | https://claude.ai/artifact/3y6nEcgCGotQ1VR1knScvZ |
| D. Sage (thiết kế lại 2026-11-03) | Spa cao cấp: xanh sage, đồng thau, thẻ đặt lịch kính mờ, dịch vụ là dải mở rộng khi rê chuột, máy tập dạng thẻ cuộn ngang, 3 cơ sở | https://claude.ai/artifact/RZ6XZZ1KUKWYkaUu3opzJL |
| E. Blush (thiết kế lại 2026-11-03) | Tươi hiện đại: hồng phấn, san hô, tím mận, hero bo góc có thanh số liệu, dịch vụ dạng tab, máy tập dạng bento, cơ sở dạng tab | https://claude.ai/artifact/MKpyonuz92sMizULfG4cfB |

Website hiện tại của khách: https://emmapilates.vn/
Website mẫu: https://www.fonv.co.kr/

## File nguồn trong thư mục `emma-mockup/`

| File / thư mục | Nội dung |
|---|---|
| `variant-f-fonv.html` | Bản F, nhiều trang, JS và CSS nằm trong file |
| `index.html` | Bản A |
| `index-original-design.html` | Bản B |
| `variant-c-sand.html`, `variant-d-sage.html`, `variant-e-blush.html` | Bản C, D, E. Dùng chung `shared/fx.css` và `shared/fx.js` |
| `img/` | Ảnh đã nén lấy từ emmapilates.vn. Bản F dùng thêm `logo-t.png` (logo nền trong suốt), `p-*.jpg` (5 ảnh sản phẩm thật), `nx-*.jpg` (6 ảnh tin tức) |
| `build.py` | Gộp bản A với `img/` thành một file đăng được |
| `build2.py` | Gộp bản C, D, E, F với `img/` và `shared/`: `python build2.py <variant.html> <đầu-ra.html>` |
| `docs/` | Bộ tài liệu này |

## Nội dung hai nguồn của khách đang mâu thuẫn, cần hỏi lại

| Mục | Trang A | Trang B |
|---|---|---|
| Email | emmapilatesvietnam@gmail.com (đầu trang) | emmapilates22@gmail.com (trang Liên hệ) |
| Giờ làm việc | 06:00 – 21:00 (đầu trang, không ghi thứ) | 6h00 – 21h00 từ Thứ 2 đến Thứ 7 (trang Liên hệ, chân trang) |

Các bản mockup đang dùng email thứ nhất và giờ Thứ 2 – Thứ 7. Bản B vẫn ghi "hằng ngày" ở chân trang (do giữ nguyên theo yêu cầu), cần sửa khi dùng.

## Việc chưa làm / chưa kiểm chứng

- Hiệu ứng cuộn của các bản C, D, E, A, B đã viết nhưng **chưa được xem chạy trực tiếp**. Bản F đã được chạy thử bằng trình duyệt thật: chuyển trang, tab, giỏ hàng, form, đổi màu menu, bố cục 1440px và 390px, không lỗi script. Chưa thử trên điện thoại thật.
- **Đã bỏ toàn bộ ảnh vỡ** (ảnh dịch vụ, ảnh Vì sao chọn, ảnh HLV, ảnh máy: nguồn gốc chỉ 230px) khỏi bản A, C, D, E, F; thay bằng khối màu và số/chữ. Khi khách gửi ảnh lớn thì thêm lại. Ảnh còn dùng: hero, intro, feedback, tin tức, ảnh 5 sản phẩm. Nội dung trang Dịch vụ cho Bầu, Kid, Sau Sinh mới có một câu tóm tắt. Trang Đào tạo, Tuyển dụng mới có phần đầu của trang hiện tại. Bản đồ là khung giữ chỗ. Link mạng xã hội ở chân trang là giữ chỗ.
- Bản F: khi menu nằm trên vùng ảnh có tóc tối, chữ menu có thể khó đọc (phụ thuộc ảnh).
- Chưa vào trang quản trị WordPress. Thông tin theme/plugin chỉ nhận diện từ mã nguồn công khai.
- Thời gian và chi phí trong báo cáo khách còn `[điền]`.
