# Đặc tả kỹ thuật triển khai Emma Pilates lên WordPress

Đối tượng: người code. Nguồn tham chiếu: `index.html` (bản A, phong cách fonv) và `index-original-design.html` (bản B).

## 1. Môi trường nhận diện được

Nhận diện từ mã nguồn công khai của https://emmapilates.vn/. Chưa vào quản trị, cần xác nhận lại.

| Hạng mục | Giá trị |
|---|---|
| CMS | WordPress 6.4.14 |
| Theme | Flatsome + `flatsome-child` |
| Plugin thấy được | WooCommerce, Contact Form 7, Button Contact VR (nút chat nổi), PixelYourSite (Facebook Pixel) |
| Không dùng | Elementor, WPBakery |
| Trang chủ | page id 942 |
| Lazy load | Flatsome `lazy-load` (`data-src`) |

## 2. Quy tắc làm

- Làm trên **staging**, sao lưu trước khi sửa.
- Hiệu ứng và bố cục để trong **child theme**: `assets/emma.css`, `assets/emma.js`, nạp bằng `wp_enqueue_style/script` trong `functions.php`. Không sửa theme gốc.
- Nội dung (chữ, ảnh, tin tức) để khách sửa trong UX Builder / Bài viết, không viết cứng vào code.
- Không nhúng thư viện lớn. Toàn bộ JS hiện tại là thuần, không phụ thuộc.

## 3. Design tokens

### Bản A (fonv)

```css
--bg:#fff; --grey:#f1f1ef; --ink:#111; --ink-soft:#6b6f70; --line:#e3e3e0; --accent:#12838d;
--serif:'Trirong',serif; --sans:'Be Vietnam Pro',sans-serif;
/* panel dịch vụ */
.p1: linear-gradient(165deg,#1f7f89,#0e4d55)   /* chữ trắng */
.p2: linear-gradient(165deg,#e6f4f4,#bfe0e2)   /* chữ tối, class .light */
.p3: linear-gradient(165deg,#17555d,#0a2d33)   /* chữ trắng */
/* dải đăng ký */ background:#dcecec
/* hạt nhám panel */ SVG feTurbulence, mix-blend-mode:overlay, opacity .45
```

### Bản B

```css
--bg:#fff; --bg-soft:#eef4f4; --ink:#10282c; --ink-soft:#5a6f73; --line:#d9e4e5; --accent:#1a8791;
--serif:'Cormorant Garamond',serif; --sans:'Be Vietnam Pro',sans-serif;
/* có thêm bộ màu chế độ tối theo prefers-color-scheme */
```

Font nạp từ Google Fonts. Cả Trirong, Cormorant Garamond, Be Vietnam Pro đều có tiếng Việt. Cân nhắc tự host font để tránh phụ thuộc bên thứ ba.

Màu logo Emma đo được: `#63C7C8` (teal nhạt, chỉ dùng trang trí). Màu chữ và nút dùng `#12838D` / `#1A8791` để đủ tương phản trên nền trắng.

## 4. Ánh xạ khối → Flatsome

| Khối trong mockup | Dựng bằng | Ghi chú |
|---|---|---|
| Header | Flatsome Header Builder: 1 hàng, sticky, shrink | Logo cũ, menu 6–7 mục, hotline. Mockup còn ẩn header khi cuộn xuống (cần JS) |
| Hero | UX Builder Section (full width, ảnh nền, parallax) | Bản A: không thẻ chữ; bản B: thẻ chữ trái. Chiều cao ≈ `100vh − header` |
| Dải chữ chạy | Element "Text/HTML" | Cần JS gán `transform` theo scroll |
| Giới thiệu | Section + Row 5/12 + 7/12 (bản B) / Row 1 cột chữ lớn + 2 cột đoạn (bản A) | Số đếm cần JS |
| Dịch vụ x3 | 3 Section full width, mỗi Section Row 2/5 + 3/5, đảo vị trí xen kẽ | Panel màu dùng class `.p1/.p2/.p3`. Cột ảnh là ảnh nền hoặc `<img>` |
| Danh sách dịch vụ phụ | Row 4 cột | 4 link đến trang dịch vụ |
| Vì sao chọn Emma | Row 4 cột (ảnh + tiêu đề + mô tả) | |
| Đội ngũ | Row 5/12 + 7/12, 2 ảnh so le | |
| Feedback rail | Section cao `280vh` chứa khối `position:sticky;top:0;height:100vh` | **Cần JS.** Dưới 900px chuyển về vuốt ngang bình thường |
| Dải đăng ký | Section + **Contact Form 7** | Style lại CF7 bằng CSS. Cần cấu hình mail nhận |
| Tin tức | Element "Blog posts" của Flatsome hoặc HTML tùy biến | Bản A là danh sách chữ 3 cột (nhãn / tiêu đề + mô tả / ảnh), cần override template |
| Footer | Flatsome Footer Builder | |
| Nút chat nổi | Giữ plugin Button Contact VR | Chỉ chỉnh style |

Class hiển thị và hiệu ứng nên gắn qua trường "Class" của từng element trong UX Builder.

## 5. Hiệu ứng: đặc tả

Tất cả nằm trong một IIFE. Một listener `scroll` (passive) gọi `requestAnimationFrame` → `onScroll()`. Dùng `translate` / `scale` (thuộc tính riêng) cho parallax và `transform` cho reveal để hai thứ không đè nhau.

| Hiệu ứng | Cách làm | Thông số |
|---|---|---|
| Tiêu đề trượt từng chữ (`.sp`) | JS tách chữ → `<span class="w"><span>`. Mặt nạ `overflow:hidden`, chữ `translateY(110%)→0` khi thêm `.go` | 1.1s `cubic-bezier(.22,1,.36,1)`, trễ `i × 0.07s`. Mặt nạ cần padding dư cho dấu tiếng Việt (`.2em` trên, `.14em` dưới) |
| Reveal (`.rv`) | IntersectionObserver thêm `.in` | Bắt đầu `opacity:.18`, lệch `34px`, 1s cùng easing. Ngưỡng 0.12, `rootMargin:0 0 -6% 0` |
| Ảnh mở tấm màn (`.cur`) | `clip-path:inset(0 0 100% 0)→inset(0)` | 1.3s `cubic-bezier(.77,0,.18,1)` |
| Panel/ảnh trượt từ hai bên | `--tx` ±56px trên `.copy`, `.pic` (đảo ở `.flip`) | Dùng chung `.rv` |
| Parallax trong ảnh | `img.zoom` / `.zoom` phóng 124%, dịch theo vị trí so với giữa màn hình | hệ số 0.07 (A) / 0.12 (B), giới hạn ±10% chiều cao khung để không lộ mép |
| Cột/ô so le | `translate` theo tâm của phần tử cha | `.tile:nth-child(even)` −0.07, `odd` +0.035; `.pair .ph` +0.05 / −0.06; `.pic .pimg` +0.06 |
| Hero | Ảnh `translateY(y×0.22)` + scale tăng nhẹ; khối chữ `translate y×0.3` và mờ dần | Mờ hết ở ≈ 0.6–0.65 chiều cao màn hình. Chỉ chạy khi `y < 1.3×vh` |
| Dải chữ chạy | `translateX(-((y×0.6) mod half))`. Nội dung nhân đôi nên lặp liền mạch | `half = scrollWidth/2`, đo lại khi load, resize, font tải xong |
| Feedback rail | Section cao 280vh, `progress = clamp(-rect.top / (height − vh))`, track `translateX(-progress × (scrollWidth − innerWidth + 32))` | Chỉ bật khi `innerWidth > 900` và không giảm chuyển động. Có thanh tiến độ |
| Số đếm | `[data-count]`, IntersectionObserver ngưỡng 0.6 | 1.6s, ease-out cubic, định dạng `vi-VN`. Giá trị cuối có sẵn trong HTML |
| Chữ sáng dần *(bản B)* | Tách từng từ `.sw`, opacity từ 0.14 → 1 theo tiến độ | Tiến độ = `(0.92×vh − rect.top) / (0.5×vh)`. Áp dụng `.intro p, .sec-head p, .split .copy p, .cta p` |
| Thanh tiến độ cuộn | `.prog` cố định trên cùng, `scaleX` | 2–3px |
| Header | Thêm `.scrolled` khi `y > 10` (viền, thu nhỏ); `.hide` khi cuộn xuống quá 240px | Không ẩn khi menu mobile đang mở |
| Chuyển trang kiểu mờ | Nhấn link nội bộ: màn trắng mờ vào 0.35s, cuộn, mờ ra | Chỉ cho link neo trong trang. Chuyển giữa các trang WordPress cần cách khác (View Transitions API hoặc fade khi `beforeunload`) |
| Lightbox | Bấm `[data-lb]` → hiện ảnh trong overlay, `Esc` hoặc bấm để đóng | Dùng lại `src` của ảnh đã tải |
| Nút bấm / link hover | CSS thuần | |

**Giảm chuyển động (`prefers-reduced-motion`):** mọi hiệu ứng tắt, nội dung hiện đầy đủ, rail feedback quay về dải vuốt ngang với hai nút mũi tên.

**Mobile (≤ 900px):** các khối chia đôi xếp dọc; lưới còn 2 hoặc 1 cột; rail feedback không ghim; menu thành dạng burger.

## 6. Việc cần lưu ý khi chuyển sang WordPress

1. **Chuỗi tiêu đề tách chữ**: JS thay `textContent` của tiêu đề. Giữ `aria-label` với nội dung gốc (đã làm). Không áp dụng cho tiêu đề chứa thẻ HTML lồng nhau.
2. **Hiệu quả**: parallax và rail dùng `getBoundingClientRect` mỗi frame. Với trang dài, nên giới hạn vùng tính (đã bỏ qua phần tử cách màn hình > 200–300px).
3. **Ảnh**:
   - dùng ảnh gốc độ phân giải cao, xuất WebP/JPEG, `loading="lazy"` trừ ảnh hero;
   - ảnh sản phẩm nền trắng dùng `mix-blend-mode:multiply` để hòa vào nền xám của khung; nếu khách đổi ảnh có nền màu thì bỏ thuộc tính này.
4. **Flatsome lazy load** đổi `src` thành `data-src`; kiểm tra tương thích với `.cur` / `.zoom`.
5. **Sticky + overflow**: rail feedback dùng `position:sticky`. Không để thẻ cha nào có `overflow:hidden/auto` (Flatsome có thể đặt trên `#wrapper`). Bản mockup dùng `overflow-x:hidden` ở `body`, kiểm tra lại khi gắn vào theme.
6. **Biểu mẫu**: `form` hiện chỉ là giao diện. Thay bằng Contact Form 7 và cấu hình email nhận.
7. **Số liệu hiển thị** ("100h", "1.000+", "PMA"): chưa có xác nhận từ khách. Lấy từ nội dung hiện trên web ("100 giờ trợ giảng", "hàng nghìn phụ nữ", "chứng chỉ PMA"); cần khách duyệt.
8. **Ảnh học viên** chứa tên và tình trạng cơ thể. Cần chắc khách đã có sự đồng ý của học viên khi đăng.

## 7. Nguồn ảnh (từ https://emmapilates.vn/wp-content/uploads/)

| File trong `img/` | Nguồn gốc | Dùng ở | Ghi chú |
|---|---|---|---|
| `logo.png` | `2024/03/logo-Emma.png` | Header, footer | 176×51, nền trắng |
| `hero.jpg` | `2024/03/Thiết-kế-chưa-có-tên-5.png` | Hero | 1600×668 |
| `intro.jpg` | `2021/11/AdobeStock_218582523_Preview-1.jpeg` | Dải ảnh giữa trang | 1000×667, ảnh stock có watermark Adobe |
| `svc-shape.jpg` | `2024/03/Thiết-kế-chưa-có-tên-7.jpg` | Cải thiện vóc dáng | **230px**, đã phóng 2.2 lần |
| `svc-bau.jpg` | `…-5.jpg` | Pilates Bầu | 230px |
| `svc-kid.jpg` | `…-2.jpg` | Pilates Kid | 230px |
| `svc-chair.jpg`, `chair2.jpg`, `shelf.jpg` | `…-8.jpg`, `…-6.jpg`, `…-10.jpg` | Chưa dùng | 230px |
| `why-private.jpg` | `…-11.jpg` | Không gian Private | 230px |
| `why-safe.jpg` | `…-1.jpg` | Sản phẩm an toàn | 230px |
| `why-luxury.jpg` | `…-9.jpg` | Không gian sang trọng | 230px |
| `why-coach.jpg` | `…-4.jpg` | HLV chuẩn quốc tế | 230px |
| `coach-1.jpg`, `coach-2.jpg` | `…-3.jpg`, `…-12.jpg` | Đội ngũ | 230px, chưa biết tên người |
| `fb-1…9.jpg` | `2024/03/fb-1,10,2,3,4,5,6,7,8.jpg` | Feedback | gốc 1080–2400px, nén còn 640px |
| `news-1…3.jpg` | `2021/11/…he-mien-dich…jpg`, `Perfect-plank-1.jpg`, `chan-vong-kieng-1-min-1.jpg` | Tin tức | 600–680px |

Ảnh `…-N` ở trên là viết tắt của `Thiết-kế-chưa-có-tên-N.jpg`.

**Bản quyền:** một số ảnh tin tức và ảnh `intro.jpg` là ảnh stock trên web hiện tại. Khi làm thật, chỉ dùng ảnh khách có quyền sử dụng.

## 8. Checklist triển khai

- [ ] Xác nhận phiên bản Flatsome, danh sách plugin, có staging
- [ ] Sao lưu website
- [ ] Nhận logo gốc, ảnh độ phân giải cao, nội dung đã duyệt từ khách
- [ ] Chọn phương án A hoặc B
- [ ] Tạo `assets/emma.css`, `assets/emma.js`, nạp trong child theme
- [ ] Dựng Header / Footer bằng Flatsome builder
- [ ] Dựng trang chủ theo bảng ánh xạ mục 4
- [ ] Gắn hiệu ứng (mục 5), kiểm tra `prefers-reduced-motion`
- [ ] Contact Form 7: tạo form, style, cấu hình email nhận
- [ ] Kiểm tra: Chrome, Safari, Firefox; iPhone, Android; rail feedback, sticky header, parallax
- [ ] Kiểm tra tốc độ (Lighthouse), kích thước ảnh
- [ ] Dựng trang Giới thiệu, Dịch vụ (template dùng chung), Liên hệ
- [ ] Khách duyệt, đưa lên website chính thức
- [ ] Bàn giao hướng dẫn: đổi chữ, thay ảnh, đăng bài, xem form

## 9. Quyền truy cập cần xin

1. Tài khoản WordPress quyền Administrator (hoặc Editor + quyền sửa child theme) trên **staging**
2. FTP/SFTP hoặc quyền sửa file theme (nếu không dùng trình chỉnh sửa trong WordPress)
3. Phiên bản Flatsome, phiên bản WooCommerce, danh sách plugin
4. Email nhận biểu mẫu
5. Truy cập hosting để sao lưu và tạo bản staging


---

## Bổ sung 2026-11-03: Bản F (sát fonv, nhiều trang)

Nếu khách chọn bản F, dùng phần này thay cho phần hiệu ứng ở trên. Nguồn: `variant-f-fonv.html`. Cơ sở đo đạc: `03-phan-tich-fonv.md`.

### Khác biệt so với các bản trước

- **Không parallax, không marquee, không ghim ngang.** Chỉ có: chữ hiện dần (opacity, 1200ms, `cubic-bezier(.445,.05,.55,.95)`), chuyển trang mờ (350ms, `cubic-bezier(.22,1,.36,1)`), tab đổi nội dung (fade 600ms), vòng chữ xoay (22s), hover ô sản phẩm.
- Vì ít chuyển động nên phần lớn bản F làm được bằng **Flatsome thuần** (UX Builder), chỉ cần rất ít JS.

### Ánh xạ trang sang WordPress

| Trang bản F | Trang hiện có | Cách làm |
|---|---|---|
| Trang chủ | `/` | UX Builder: Section hero (ảnh nền) + 4 Section "chia đôi" (Row 2/5 + 3/5, cao `85vw`) + Section feedback + tin tức + thẻ đặt lịch |
| Giới thiệu | `/gioi-thieu/` | Section + Row, ảnh lệch bên bằng `margin` |
| Dịch vụ (tab) | 4 trang `/cai-thien-voc-dang/`, `/pilates-bau/`, `/pilates-kid/`, `/pilates-sau-sinh/` | Giữ 4 trang riêng (tốt cho SEO), thanh tab là menu phụ link giữa 4 trang. Không cần gộp 1 trang |
| Máy tập | `/san-pham/` (WooCommerce) | Template lưu trữ sản phẩm: lưới 2 cột, ô xám, hover hiện thông tin bằng CSS. **Giữ nguyên Woo** (giá, giảm giá, giỏ, yêu thích, đăng nhập) |
| Đào tạo | `/dao-tao-huan-luyen-vien-pilates/` | Giữ nội dung, đổi kiểu theo token |
| Tin tức | `/tin-tuc/` | Danh sách bài viết, 6 bài/trang, phân trang giữ nguyên |
| Tuyển dụng | `/tuyen-dung/` | Giữ nội dung, đổi kiểu |
| Liên hệ | `/lien-he/` | Tab 3 cơ sở (Flatsome Tabs hoặc shortcode), bản đồ Google theo cơ sở, form CF7 giữ nguyên |
| Đặt lịch | (trang mới) | Form Contact Form 7 mới, nền xám, nút đen. Các trường: họ tên, điện thoại, dịch vụ (select), cơ sở (select), ghi chú, đồng ý. Trường `danh-sach-menu` của form hiện tại có thể tái dùng |

Bản F dùng router `#/` trong một file chỉ để xem thử. Trên WordPress mỗi trang là một URL riêng, không dùng hash.

### Header

- Mockup: header trong suốt, dính trên cùng, **màu từng mục menu đổi theo nền bên dưới** (JS lấy `elementsFromPoint` tại y = 40 của từng mục, tìm `[data-tone]` gần nhất). Cần gắn `data-tone="dark|light"` vào từng Section có nền cố định.
- Điện thoại (≤ 1100px): header nền trắng đặc, menu dạng ngăn kéo. Không dùng header trong suốt trên điện thoại.
- Phương án an toàn hơn nếu khó gắn `data-tone`: header nền trắng đặc trên mọi trang.

### Tokens bản F

```
--bg:#fff; --tile:#f2f2f1; --ink:#2e2e2e; --ink2:#6f7374; --line:#dcdcd8; --teal:#12838d;
Font tiêu đề/menu: Trirong (nav 16px, tracking .05em, viết hoa). Nội dung: Be Vietnam Pro 300, 15px, line-height 1.8
Khối chia đôi: grid 2fr 3fr, cao min(85vw,1180px), tối thiểu 560px
Màu khối: #b6d8d7 (xanh ngọc nhạt, chữ #16373a), #12363a (xanh thẫm, chữ trắng), #e8dccb (be, chữ #3a2f25), #e9c7bb (hồng phấn, chữ #43261f)
Chân trang: #d3e2df, chữ #233b3d. Thẻ catalog nền: #e3eeec
```

Texture khối trái hiện tạo bằng CSS (gradient + nhiễu SVG). fonv dùng **ảnh chụp cát thật**. Muốn giống hơn, cần ảnh texture (chụp hoặc mua ảnh nền) và thay `--dunes` bằng `background-image`.

### Ảnh bản F

| Ảnh | Nguồn | Ghi chú |
|---|---|---|
| `p-cadillac/barrel/reformer/spine/chair.jpg` | emmapilates.vn, thư mục `uploads/2024/03/` (ảnh gốc, bỏ hậu tố kích thước) | Nền trắng, dùng `mix-blend-mode:multiply` trên ô xám. Ảnh gốc 600 đến 2560px |
| `nx-1..6.jpg` | `uploads/2021/10` và `2021/11` | 600 đến 1280px |
| `logo-t.png` | Tạo từ logo hiện tại: tách nền trắng thành trong suốt, giữ màu `#63C7C8` | Cần file logo gốc từ khách để thay |
| Ảnh dịch vụ, HLV, "Vì sao chọn" | (đã bỏ) | Nguồn gốc 230px, bị vỡ khi phóng to. Khối chia đôi bên phải đang là số lớn màu xám, thay bằng ảnh studio khi có |

### Việc kiểm thử trước khi giao

- Cuộn qua 4 khối chia đôi trên máy tính và điện thoại thật, xem menu có còn đọc được.
- Bấm đủ 9 trang, tab Dịch vụ, tab cơ sở, form đặt lịch, giỏ hàng.
- Với WordPress: kiểm tra `elementsFromPoint` khi header của Flatsome có lớp riêng; kiểm tra giỏ hàng Woo thật thay cho bộ đếm mô phỏng.
