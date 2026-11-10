# Phân tích website mẫu fonv.co.kr (bản kiểm tra lại)

Kiểm tra ngày 2026-11-03 bằng Chrome thật (cuộn từng bước, đo kích thước, đo vị trí ảnh nền ở 5 mức cuộn, bấm tab, rê chuột, chụp màn hình), ở độ rộng 1440px. Bản này thay thế bản phân tích 2026-11-02 vốn chỉ đọc mã nguồn.

Chú thích: **[đo]** = đo được bằng trình duyệt, **[thấy]** = quan sát bằng mắt trên ảnh chụp, **[chưa chắc]** = chưa kiểm chứng.

## 1. Kết luận quan trọng

1. **fonv gần như không có hiệu ứng cuộn.** Ảnh nền đứng yên khi cuộn (đo vị trí ở cuộn 0/800/1600/2400/3200, không lệch), không có animation nào chạy khi cuộn, không có marquee, không có chữ chạy. Cảm giác "sang" đến từ **ảnh lớn, nhiều khoảng trắng, chữ nhỏ, bố cục tiết chế**, không đến từ chuyển động.
2. Chuyển động có thật chỉ gồm: **chữ và khối nhỏ hiện dần khi cuộn tới** (Wix `data-motion-enter`, đo thấy trên 4 khối chữ ở trang chủ, danh sách tin tức, khối liên hệ), **chuyển trang mờ dần**, **tab đổi nội dung**, **vòng chữ trên thẻ catalog**.
3. Các bản mockup trước (A đến E) thêm nhiều hiệu ứng hơn fonv (parallax, marquee, ghim ngang, chữ sáng dần). Đó là lựa chọn thiết kế của mình, không phải sao chép fonv. Bản F là bản bám sát fonv thật.

## 2. Sơ đồ trang và chức năng

Menu: STORY, SHOP, NEWS, QUOTATION, ASSOCIATION (link ngoài fonvassociation.com), CONTACT, chọn ngôn ngữ KO / EN / JA **[đo]**.

| Trang | URL | Nội dung và chức năng [đo] |
|---|---|---|
| Trang chủ | `/` | Cao 6390px. Ảnh hero, **4 khối chia đôi 40/60**, thẻ catalog (2 nút EN / KR mở file Google Drive), chân trang |
| Story | `/story` | Cao 10898px. 2 video, 6 slider. Câu tuyên bố ở giữa, các khối chữ kèm ảnh nhỏ lệch bên, "Making process" (ảnh/video lớn), dải nền be với logo, 3 bài "Brand story" liên kết tới `/magazine-1`, `/magazine-2`, `/magazine-3` |
| Shop | `/shop` | Cao 7834px. **7 tab**: SAND BEIGE, BLACK, CORAL, BOTTOMS, OTHERS, SMALL EQUIPMENT, STRAP. Mỗi nhóm có dải chữ dọc bên trái và lưới ô xám 2 cột. 20+ trang sản phẩm |
| Trang sản phẩm | `/shop-reformer-pro`... | Cao khoảng 24000px. Cột giữa, ảnh lớn xen đoạn chữ canh giữa, nút đen "mua hàng (hỏi báo giá)" |
| News | `/news` | Cao 9237px. Tiêu đề NEWS giữa trang kèm đường kẻ, tab INSTALLATION / MEDIA / PATENT, danh sách khoảng 40 bài (ảnh trái, tiêu đề đậm viết hoa, mô tả, ngày), mỗi dòng hiện dần |
| Installation | `/installation` | Cao 24597px. Menu phụ (STORY, SHOP, NEWS, INSTALLATION, SUPPORT, QUOTATION), ảnh rộng, bộ lọc ALL / CORAL / BLACK / WHITE, **lưới ảnh 2 cột khe 4px**. Bấm ảnh **không** mở lightbox (đã thử) |
| Quotation | `/quotation` | Cao 2278px. 1 form: Tên, Điện thoại, Email, Địa chỉ/ngày mở cửa, Order (Equipment, Others), Funnels (4 ô tick + ô nhập khác), tick đồng ý dữ liệu, nút đen "gửi yêu cầu báo giá". Nền khối xám, mỗi hàng ngăn bằng đường kẻ đen |
| Contact | `/contact` | Cao 4503px. Giờ mở cửa, văn phòng, kênh liên hệ, bản đồ Google, mục SHOWROOM với tab SEOUL (KOREA) / GLOBAL, danh sách showroom theo nước |

## 3. Bố cục và kích thước [đo]

| Thành phần | Giá trị |
|---|---|
| Header | Dính trên cùng (`sticky`), **nền trong suốt**, z-index 54. Hộp cao 219px nhưng phần nhìn thấy khoảng 80px. Logo trái, menu cách logo khoảng 190px |
| Menu | Serif (Trirong), **17px, tracking 0.85px, viết hoa**, đen, khoảng cách giữa các mục khoảng 32px. Không đổi màu khi rê chuột (đo được `transition` 0.08s nhưng màu giữ nguyên) |
| Logo | `.fonv`, sans hình học đậm, cao khoảng 36px |
| Hero | Ảnh tràn viền, **bắt đầu ở y = 139px**, cao 1019px (khoảng 0.71 × chiều rộng). Chữ ở **góc trái dưới ảnh**: nhãn 12px, tiêu đề serif 30px, mô tả sans 13px, link "Learn More" gạch chân |
| Khối chia đôi | Cột trái **576px (40%)**, cột phải **864px (60%)**, cao **1228px (0.85 × chiều rộng)**. Trái: ảnh texture (cát, đen, san hô) nguyên khối, chữ trắng nằm ở khoảng 55 đến 75% chiều cao: nhãn serif 14px, tiêu đề serif 28 đến 32px, mô tả sans 15 đến 16px, link gạch chân. Phải: ảnh người mẫu trên máy, nền studio có sọc đứng |
| Thẻ catalog | Nền be nhạt, thẻ trắng 846px có bóng, bên trong ảnh + chữ ".fonv" xoay dọc cỡ lớn + **vòng chữ tròn "HIGH-END PILATES EQUIPMENT BRAND"**. Dưới thẻ: tiêu đề serif đậm 30px, mô tả, 2 nút viên thuốc viền đen (EN trắng, KR đen) |
| Shop | Tab chữ 18px, tab đang chọn gạch chân. Dải chữ dọc rộng khoảng 395px (ảnh texture, chữ serif dọc). Ô sản phẩm xám nhạt khoảng 394×292, tên viết hoa 12px ở góc dưới, ô chọn màu nhỏ. **Rê chuột vào ô: hiện tên và mô tả ngắn ở góc trái trên** |
| News | Dòng: ảnh 3:2 bên trái, tiêu đề đậm viết hoa 14px, mô tả xám, ngày, ngăn cách bằng đường kẻ mảnh |
| Quotation | Nhãn bên trái, ô nhập xám nhạt bên phải, nút đen toàn chiều rộng |
| Chân trang | Nền phẳng màu taupe **[thấy]**, đường kẻ dọc trắng bên trái, 2 cột INFO (thông tin công ty đăng ký) và SNS (Instagram, Youtube, Blog, Twitter, Kakao) |

## 4. Font và màu

| Hạng mục | Giá trị |
|---|---|
| Tiêu đề, menu, nút | Trirong (serif) **[đo]**, kèm Times New Roman dự phòng |
| Nội dung | Font tùy chỉnh của Wix, dáng sans nhẹ giống Helvetica / DIN Light **[thấy]** |
| Màu chữ | Đen / xám than `rgb(46,46,46)`, chữ trên ảnh tối và ảnh texture: trắng |
| Nền | Trắng. Dải catalog be nhạt, chân trang taupe **[thấy, chưa đo mã màu]** |
| Ảnh texture | Cát be, cát đen có hạt sáng, cát hồng san hô: chụp thật, không phải gradient |

## 5. Hiệu ứng

| Hiệu ứng | Có không | Chi tiết |
|---|---|---|
| Parallax ảnh nền | **Không** [đo] | Vị trí ảnh trong khối không đổi khi cuộn |
| Animation CSS chạy khi cuộn | **Không** [đo] | `getAnimations()` trả về rỗng |
| Chữ hiện dần khi cuộn tới | Có [đo] | Đổi độ mờ 0 → 1, vài khối chữ; ở trang liên hệ thấy độ mờ chuyển 0.42 → 0.99 → 1. Thời lượng khai báo trong mã: 1200ms, easing `cubic-bezier(.445,.05,.55,.95)` |
| Chuyển trang | Có [đo] | Trang mờ rồi hiện (NEWS hiện tiêu đề và đường kẻ trước, danh sách hiện sau). Mã khai báo `out-in` 0.35s |
| Tab đổi nội dung | Có [đo] | Bấm tab: nội dung đổi tại chỗ, không cuộn |
| Hover ô sản phẩm | Có [thấy] | Hiện mô tả ở góc trái trên |
| Hover menu | Không đổi màu [đo] | |
| Header | Trong suốt, đè lên nội dung [đo] | **Lỗi của fonv:** trên khối nền đen, logo và menu chữ đen **biến mất** (đã chụp thấy). Bản F của Emma sửa lỗi này bằng cách đổi màu từng mục menu theo nền bên dưới |
| Vòng chữ xoay trên thẻ catalog | [thấy] | Tốc độ chưa đo |
| Marquee, chữ chạy, ghim ngang | **Không** | |

## 6. Điểm yếu của fonv (Emma nên làm tốt hơn)

- Header trong suốt khiến chữ chồng lên nội dung khi cuộn (thấy rõ ở khối đen và ở trang Story).
- Trên giả lập điện thoại 390px, menu bị cắt ("STORY SHOP N...") và chữ chồng lên header. **[chưa chắc]** Wix có thể phục vụ bố cục điện thoại riêng trên máy thật; cần thử trên điện thoại thật.
- Chữ trắng trên ảnh cát sáng có độ tương phản thấp.
- Bản mobile, trang cao hàng chục nghìn px (sản phẩm 24000px) không có điều hướng nhanh.

## 7. Điều rút ra áp dụng cho Emma

| Của fonv | Áp dụng cho Emma (bản F) |
|---|---|
| Hero ảnh tràn, chữ nhỏ góc trái dưới | Ảnh đội ngũ, chữ góc trái dưới |
| 4 khối 40/60 theo màu | 4 dịch vụ (Cải thiện vóc dáng, Pilates Bầu, Kid, Sau Sinh) trùng với 4 trang dịch vụ của Emma |
| Shop: tab + dải chữ dọc + ô xám + hover mô tả | Máy Tập: 5 sản phẩm WooCommerce có giá, giảm giá, thêm giỏ, yêu thích |
| News: danh sách có đường kẻ | Tin tức 6 bài, phân trang 1 2 3 4 |
| Quotation: form nền xám, nút đen | Đặt lịch tập thử (họ tên, điện thoại, dịch vụ, cơ sở, ghi chú) |
| Contact: tab SEOUL / GLOBAL, bản đồ | Liên hệ: tab 3 cơ sở (Hà Đông, Tây Hồ Tây, Hải Phòng), bản đồ |
| Story: câu tuyên bố giữa trang, ảnh nhỏ lệch bên | Giới thiệu |
| Thẻ catalog + vòng chữ | Thẻ "Đặt lịch tập thử" |
| Chân trang INFO / SNS | Chân trang thông tin 3 cơ sở / mạng xã hội |
| Chuyển trang mờ 0.35s, chữ hiện dần 1.2s | Giữ nguyên thông số |

Không có trong fonv, giữ lại từ website Emma: Đào tạo HLV, Tuyển dụng, feedback học viên, phần "Vì sao chọn Emma", giỏ hàng, đăng nhập.

Không sao chép: tên thương hiệu, logo, ảnh, chữ của fonv. Chỉ lấy ý tưởng bố cục.

## 8. Việc chưa kiểm chứng

- Mã màu chính xác của dải catalog và chân trang.
- Hành vi trên điện thoại thật.
- Hover chi tiết của ô sản phẩm (đã thấy hiện mô tả, chưa đo thời lượng).
- Các trang sản phẩm con và 3 trang magazine chỉ xem tổng quan, chưa đọc từng trang.
- Trang EN và JA (chỉ xác nhận có trong danh sách ngôn ngữ).
