# Báo cáo hướng thiết kế lại website Emma Pilates

Gửi: Emma Pilates
Nội dung: hướng thiết kế trang chủ mới, phạm vi triển khai và những thông tin cần anh/chị cung cấp

## 1. Mục tiêu

Làm cho website trông cao cấp, gọn và hiện đại hơn, tạo cảm giác tin cậy ngay khi khách hàng mở trang, đồng thời giữ nguyên nhận diện thương hiệu (logo, tông xanh teal, hình ảnh không gian Santorini) và toàn bộ nội dung đang có.

Thiết kế lấy ý tưởng từ website thương hiệu máy Pilates cao cấp fonv.co.kr (Hàn Quốc), không sao chép nguyên trang.

## 2. Hiện trạng website

Website hiện tại chạy WordPress với giao diện Flatsome. Những điểm có thể cải thiện:

- Đầu trang có hai tầng thông tin (email, giờ mở cửa, mạng xã hội, menu), nhìn hơi rối.
- Nhiều khối chữ và biểu tượng đặt sát nhau, khách khó nhận ra điều quan trọng.
- Phần học viên đang có **6 ảnh bị lỗi không hiển thị**.
- Chưa có hiệu ứng chuyển động khi cuộn trang.

## 3. Hướng thiết kế mới

- **Đầu trang:** một tầng, logo bên trái, menu gọn, số hotline.
- **Ảnh lớn tràn màn hình** ở đầu trang, tạo ấn tượng đầu tiên.
- **Dịch vụ trình bày thành từng khối lớn**: một bên là màu và chữ, một bên là ảnh. Mỗi dịch vụ một khối (Cải thiện vóc dáng, Pilates Bầu, Pilates Kid), các dịch vụ còn lại xếp thành danh sách bên dưới.
- **Nhiều khoảng trắng**, ít khung viền, chữ gọn.
- **Phần học viên (feedback)** là dải ảnh chạy ngang khi cuộn trang.
- **Tin tức** trình bày dạng danh sách chữ kèm ảnh nhỏ.
- **Dải đăng ký** tập thử miễn phí, thiết kế dạng thẻ trắng giữa nền màu.

Các phương án để anh/chị chọn (đều là bản xem thử trang chủ, riêng bản F có đủ các trang):

| Phương án | Màu và cảm giác | Cấu trúc nổi bật | Link xem |
|---|---|---|---|
| **F. Sát website mẫu** | Trắng, xanh ngọc nhạt, xanh thẫm, be, hồng phấn. Tiết chế, thanh lịch | Bám sát website mẫu fonv: khối chia đôi 40/60 cho 4 dịch vụ, trang Máy tập dạng lưới ô xám có giỏ hàng, tin tức dạng danh sách, form đặt lịch, liên hệ 3 cơ sở. **Có 9 trang bấm chuyển được** | https://claude.ai/artifact/3Q4PYE1mzxZh4ouRxjS6gq |
| **A** | Trắng, xanh teal | Phong cách fonv ở trang chủ, dùng ảnh thật của Emma | https://claude.ai/artifact/KdLHneoYVW1iWyrfXRP2wL |
| **B** | Teal đậm, gradient | Thiết kế ban đầu, hero có thẻ chữ, ảnh là khung giữ chỗ | https://claude.ai/artifact/AHReTSsKCoRPoW1VLhPwrR |
| **C. Sand** | Be ấm, đất nung | Tiêu đề chữ khổng lồ, dịch vụ là thẻ xếp chồng khi cuộn, phần giới thiệu sáng dần theo chữ | https://claude.ai/artifact/3y6nEcgCGotQ1VR1knScvZ |
| **D. Sage** | Xanh sage, ngà, đồng thau | Phong cách spa cao cấp: thẻ đặt lịch nhanh ngay đầu trang, dịch vụ là 4 dải mở rộng khi rê chuột, máy tập dạng thẻ cuộn ngang có giá, 3 cơ sở, feedback hai hàng chạy ngược chiều | https://claude.ai/artifact/RZ6XZZ1KUKWYkaUu3opzJL |
| **E. Blush** | Hồng phấn, san hô, tím mận | Phong cách tươi trẻ: hero bo góc kèm thanh số liệu, dịch vụ dạng bảng chuyển tab, máy tập dạng bento, cơ sở dạng tab, feedback kéo ngang khi cuộn | https://claude.ai/artifact/MKpyonuz92sMizULfG4cfB |

Lưu ý: website mẫu thực tế **rất tiết chế về chuyển động** (ảnh đứng yên, chỉ chữ hiện dần và chuyển trang mờ). Bản F bám đúng điều đó. Các bản C, D, E, A, B có thêm nhiều hiệu ứng cuộn hơn mẫu.

Các link trên là bản xem thử, chưa phải website thật. Nếu link chưa mở được, cần cấp quyền xem cho tài khoản của anh/chị.

## 4. Các hiệu ứng chuyển động

| Hiệu ứng | Khách nhìn thấy gì |
|---|---|
| Tiêu đề trượt từng chữ | Tiêu đề hiện ra từng chữ khi cuộn tới |
| Chữ sáng dần theo cuộn *(bản B)* | Đoạn giới thiệu sáng dần từng từ theo con lăn chuột |
| Ảnh mở như tấm màn | Ảnh được vén lên từ trên xuống khi cuộn tới |
| Khối dịch vụ trượt từ hai bên | Chữ trượt từ một bên, ảnh từ bên còn lại |
| Ảnh chuyển động nhẹ khi cuộn | Tạo cảm giác chiều sâu |
| Ảnh đầu trang thu nhỏ và mờ dần | Khi cuộn xuống |
| Dải chữ chạy ngang theo cuộn | Tên thương hiệu và slogan |
| Dải feedback chạy ngang | Cuộn dọc thì ảnh học viên chạy ngang |
| Số đếm tăng dần | Ví dụ "100h", "1.000+" |
| Thanh tiến độ cuộn trang | Thanh mảnh ở trên cùng |
| Menu tự ẩn khi cuộn xuống | Hiện lại khi cuộn lên |
| Bấm ảnh để xem lớn | Áp dụng ảnh học viên |

Người dùng đã bật chế độ "giảm chuyển động" trên thiết bị sẽ thấy trang tĩnh, không bị chóng mặt.

## 5. Phạm vi đề xuất

| Trang | Tình trạng |
|---|---|
| Trang chủ | Đã có bản xem thử |
| Giới thiệu | Chưa làm |
| Dịch vụ (một mẫu dùng chung cho Pilates Kid, Bầu, Sau sinh, Cải thiện vóc dáng) | Chưa làm |
| Liên hệ & đặt lịch | Chưa làm |
| Máy tập, Đào tạo, Tin tức, Tuyển dụng, Giỏ hàng | Giữ nguyên chức năng hiện có, đổi giao diện sau nếu anh/chị đồng ý |

## 6. Anh/chị tự quản lý nội dung như thế nào

Website vẫn nằm trên WordPress. Anh/chị tự đăng nhập quản trị để:

- đổi chữ, thay ảnh trên trang chủ;
- đăng bài tin tức mới;
- xem số điện thoại khách để lại;
- quản lý sản phẩm và đơn hàng (nếu dùng).

Bố cục và hiệu ứng nằm trong phần mã giao diện nên khi đổi chữ, đổi ảnh sẽ không làm hỏng thiết kế. Muốn đổi bố cục hoặc thêm hiệu ứng mới, nhờ bên kỹ thuật chỉnh.

## 7. Cần anh/chị cung cấp

1. **Chọn phương án** A hoặc B (hoặc kết hợp).
2. **Logo gốc** dạng PNG nền trong suốt hoặc SVG. Logo hiện có trên web nhỏ (176×51 px).
3. **Ảnh chất lượng cao**, nền sáng, càng lớn càng tốt:
   - ảnh người tập trên từng loại máy (Reformer, Cadillac, Chair);
   - ảnh không gian phòng tập;
   - ảnh Health Coach từng người (kèm tên, chức danh nếu muốn hiển thị);
   - ảnh feedback học viên bản gốc.
   Ảnh dịch vụ hiện chỉ có kích thước 230 px nên bị mềm khi phóng to.
4. **Video giới thiệu** (nếu muốn hiện ở trang chủ).
5. **Xác nhận nội dung:** các số liệu đang hiển thị ("100 giờ trợ giảng", "hàng nghìn học viên", chứng chỉ PMA), hotline, email, giờ mở cửa.
6. **Có giữ nút liên hệ nổi** (Zalo, Messenger, gọi điện) không.
7. **Quyền truy cập** (khi bắt đầu làm thật): tài khoản quản trị WordPress và quyền sửa giao diện, ưu tiên làm trên bản sao thử trước khi áp dụng lên website đang chạy. Nên sao lưu website trước.

## 8. Các bước tiếp theo

| Bước | Nội dung | Thời gian |
|---|---|---|
| 1 | Khách chọn phương án và góp ý | [điền] |
| 2 | Hoàn thiện các trang còn lại của bản xem thử | [điền] |
| 3 | Dựng trên bản sao WordPress, kiểm tra điện thoại và máy tính | [điền] |
| 4 | Khách duyệt, đưa lên website chính thức | [điền] |
| 5 | Bàn giao kèm hướng dẫn tự đổi chữ, ảnh, đăng bài | [điền] |

Chi phí: [điền]
