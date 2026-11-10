/* =========================================================================
   Emma Pilates & Fitness — bản thiết kế giao diện
   Mỗi mục menu là một trang riêng (định tuyến theo hash, ví dụ #/pilates).
   Toàn bộ nội dung nằm trong object DATA: khi dựng WordPress chỉ việc thay
   bằng custom post type / ACF mà không phải sửa giao diện.
   ========================================================================= */
(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  var YT = 'https://www.youtube.com/results?search_query=emma+pilates';
  var ARROW = '<span class="arrow"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h12M9 3l5 5-5 5"/></svg></span>';
  var li = function (x) { return '<li>' + esc(x) + '</li>'; };

  /* ==================================================================== DATA */
  var DATA = {
    machines: [
      { id: 'reformer', name: 'Pilates Reformer', img: 'assets/reformer.jpg',
        price: '39.000.000₫', was: '54.000.000₫', off: '-28%',
        size: '245 × 68 × 40 cm', weight: '78 kg', mat: 'Gỗ phong Bắc Mỹ, khung thép sơn tĩnh điện',
        spring: '5 lò xo (2 nặng · 2 vừa · 1 nhẹ)', cap: '120 kg',
        w: 830, h: 607, sku: 'EM-REF-01', origin: 'Care Pilates · Hàn Quốc', lead: 'Giao 7 – 10 ngày làm việc',
        stock: 'Còn hàng tại kho Hà Nội', space: 'Phòng rộng tối thiểu 3,2 × 1,6 m cho mỗi máy',
        note: 'Máy chủ lực của mọi buổi Pilates: giàn lò xo nhiều mức lực cho phép cùng một động tác được điều chỉnh từ dễ đến khó, dùng được cho cả người mới lẫn bài tập phục hồi sau chấn thương.',
        use: 'Lớp 1:1, 1:2, nhóm 1:3 và toàn bộ khoá đào tạo HLV',
        feat: ['Thanh chân (footbar) 4 nấc điều chỉnh', 'Ray trượt đôi chạy êm, chống ồn',
               'Dây đai da thật, khoá kim loại không gỉ', 'Đệm đầu và vai tháo rời để vệ sinh'] },
      { id: 'cadillac', name: 'Cadillac', img: 'assets/cadillac.jpg',
        price: '32.000.000₫', was: '46.000.000₫', off: '-31%',
        size: '240 × 100 × 215 cm', weight: '120 kg', mat: 'Khung thép, mặt đệm da PU',
        spring: '8 điểm treo lò xo, 6 lò xo kèm theo', cap: '150 kg',
        w: 600, h: 600, sku: 'EM-CAD-01', origin: 'Care Pilates · Hàn Quốc', lead: 'Giao 10 – 14 ngày làm việc',
        stock: 'Đặt trước 3 ngày', space: 'Trần cao tối thiểu 2,4 m, nền phẳng chịu lực',
        note: 'Khung giàn trên cho phép treo lò xo theo mọi hướng, nên đây là thiết bị dùng nhiều nhất trong lớp cải thiện bệnh lý cột sống và lớp cho người cao tuổi.',
        use: 'Lớp cải thiện bệnh lý, phục hồi sau chấn thương, Pilates bầu',
        feat: ['Thanh đẩy (push-through bar) hai chiều', 'Thanh xoay trapeze và dây treo chân',
               'Mặt nằm rộng, có lỗ luồn dây đai', 'Khung chịu lực treo toàn bộ trọng lượng cơ thể'] },
      { id: 'ladder-barrel', name: 'Ladder Barrel', img: 'assets/ladder-barrel.jpg',
        price: '14.500.000₫', was: '19.300.000₫', off: '-25%',
        size: '135 × 60 × 90 cm', weight: '38 kg', mat: 'Gỗ phong, đệm da PU',
        spring: 'Không dùng lò xo', cap: '120 kg',
        w: 900, h: 600, sku: 'EM-LAD-01', origin: 'Care Pilates · Hàn Quốc', lead: 'Giao 7 – 10 ngày làm việc',
        stock: 'Còn hàng tại kho Hà Nội', space: 'Chừa 60 cm quanh máy để xoay thân thoải mái',
        note: 'Mở ngực, kéo giãn cột sống và tăng biên độ xoay thân. Gần như bắt buộc với học viên ngồi bàn giấy nhiều giờ mỗi ngày.',
        use: 'Lớp cải thiện tư thế, giãn cơ, Pilates nâng cao',
        feat: ['Khoảng cách thang – vòm điều chỉnh 5 nấc', 'Vòm bọc đệm dày, chịu lực tì bụng',
               'Chân đế rộng chống lật', 'Không cần bảo trì lò xo'] },
      { id: 'wunda-chair', name: 'Wunda Chair', img: 'assets/wunda-chair.jpg',
        price: '14.500.000₫', was: '19.300.000₫', off: '-25%',
        size: '60 × 55 × 65 cm', weight: '32 kg', mat: 'Gỗ phong, bàn đạp thép, 4 lò xo',
        spring: '4 lò xo, 8 nấc lực', cap: '120 kg',
        w: 830, h: 607, sku: 'EM-WUN-01', origin: 'Care Pilates · Hàn Quốc', lead: 'Giao 7 – 10 ngày làm việc',
        stock: 'Còn hàng tại kho Hà Nội', space: 'Chỉ cần 1,2 × 1,2 m, hợp phòng nhỏ',
        note: 'Chiếm chỗ nhỏ nhất nhưng bài tập nặng nhất. Thường dùng cho nhóm cơ mông, đùi sau và các bài thăng bằng một chân.',
        use: 'Lớp 1:1 nâng cao, bài tập sức mạnh và thăng bằng',
        feat: ['Bàn đạp tách đôi, tập được từng chân', 'Tám nấc lực đổi nhanh bằng chốt',
               'Mặt ngồi bọc đệm chống trượt', 'Gọn, kê được ở góc phòng 1 m²'] },
      { id: 'spine-corrector', name: 'Spine Corrector', img: 'assets/spine-corrector.jpg',
        price: '2.210.300₫', was: '2.870.000₫', off: '-23%',
        size: '90 × 50 × 40 cm', weight: '9 kg', mat: 'Khung gỗ bọc đệm da PU',
        spring: 'Không dùng lò xo', cap: '120 kg',
        w: 830, h: 607, sku: 'EM-SPC-01', origin: 'Care Pilates · Hàn Quốc', lead: 'Giao 5 – 7 ngày làm việc',
        stock: 'Còn hàng tại kho Hà Nội', space: 'Cất gọn được, không cần chỗ cố định',
        note: 'Dụng cụ hỗ trợ nhỏ gọn cho bài tập cột sống và cơ bụng sâu. Đây cũng là món Emma hay bán kèm cho học viên muốn tập thêm tại nhà.',
        use: 'Bài tập bổ trợ tại lớp và tại nhà',
        feat: ['Độ cong theo đúng đường cong sinh lý cột sống', 'Nhẹ, một người bê được',
               'Bề mặt da PU lau sạch nhanh', 'Dùng kèm vòng Pilates và bóng nhỏ'] }
    ],

    branches: [
      { cs: 'CS1', name: 'Hà Đông', addr: 'HM01B-3, Hoàng Thành Villas, Khu đô thị mới, Hà Đông, Hà Nội',
        rooms: '4 phòng Pilates private · 1 sàn Barre', open: '06:00 – 21:00, Thứ 2 – Thứ 7' },
      { cs: 'CS2', name: 'Tây Hồ Tây', addr: 'LK B21 Embassy Garden, KĐT Tây Hồ Tây, phường Xuân Tảo, Bắc Từ Liêm, Hà Nội',
        rooms: '5 phòng Pilates private · khu Gym · phòng Boxing', open: '06:00 – 21:00, Thứ 2 – Thứ 7' },
      { cs: 'CS3', name: 'Hải Phòng', addr: '10 Manhattan 6, Khu đô thị Paris Imperia, Hồng Bàng, Hải Phòng',
        rooms: '3 phòng Pilates private · 1 sàn Barre', open: '06:00 – 21:00, Thứ 2 – Thứ 7' }
    ],

    coaches: [
      { id: 'c1', mono: 'A', name: 'Nguyễn T. A', role: 'Founder · Educator',
        certs: ['PMA', 'Comprehensive', 'Pre/Postnatal'], branch: 'CS1 Hà Đông', years: '9 năm',
        bio: 'Người sáng lập Emma, giữ chứng chỉ Educator của PMA và trực tiếp xây dựng giáo trình cho toàn bộ khoá đào tạo huấn luyện viên của hệ thống.',
        focus: 'Pilates bầu và sau sinh, cải thiện bệnh lý cột sống, đào tạo HLV.' },
      { id: 'c2', mono: 'B', name: 'Nguyễn T. B', role: 'Head Coach Pilates',
        certs: ['Comprehensive', 'Rehab'], branch: 'CS2 Tây Hồ Tây', years: '6 năm',
        bio: 'Phụ trách chuyên môn Pilates tại cơ sở Tây Hồ Tây, người duyệt giáo án cho toàn bộ HLV mới trước khi nhận lớp.',
        focus: 'Reformer nâng cao, phục hồi sau chấn thương, điều chỉnh tư thế.' },
      { id: 'c3', mono: 'K', name: 'HLV 03', role: 'Barre K Trainer',
        certs: ['Barre K', 'Mat'], branch: 'CS1 Hà Đông', years: '4 năm',
        bio: 'Huấn luyện viên chính của chương trình Barre K, đứng lớp nhóm buổi tối và các lớp 1:1 theo yêu cầu.',
        focus: 'Barre lớp nhóm, thăng bằng và sức bền nhóm cơ chân.' },
      { id: 'c4', mono: 'G', name: 'HLV 04', role: 'Gym & Boxing PT',
        certs: ['NASM-CPT', 'Boxing L2'], branch: 'CS2 Tây Hồ Tây', years: '5 năm',
        bio: 'Phụ trách nhóm Fitness: giáo án tăng cơ, giảm mỡ và các buổi Boxing 1:1.',
        focus: 'Gym PT 1:1 và 1:2, Boxing, giáo án giảm mỡ cho người bận rộn.' },
      { id: 'c5', mono: 'S', name: 'HLV 05', role: 'Stretching Coach',
        certs: ['Stretch Therapy'], branch: 'CS3 Hải Phòng', years: '3 năm',
        bio: 'Chuyên các buổi giãn cơ trị liệu cho học viên văn phòng và vận động viên nghiệp dư.',
        focus: 'Stretching 1:1, giãn cơ sau chấn thương nhẹ, phục hồi vai gáy.' },
      { id: 'c6', mono: 'M', name: 'HLV 06', role: 'Pilates Coach',
        certs: ['Comprehensive'], branch: 'CS3 Hải Phòng', years: '2 năm',
        bio: 'Tốt nghiệp khoá HLV Pilates toàn diện K04 của Emma Academy, hiện đứng lớp nhóm 1:3 tại Hải Phòng.',
        focus: 'Lớp nhóm 1:3, Pilates cơ bản cho người mới.' }
    ],

    videos: [
      { t: '10 phút Pilates buổi sáng cho người ngồi nhiều', m: '10:24', k: 'Bài tập' },
      { t: 'Reformer cho người mới: 5 động tác đầu tiên', m: '14:08', k: 'Hướng dẫn' },
      { t: 'Học viên sau 12 tuần: thay đổi tư thế lưng trên', m: '06:52', k: 'Học viên' },
      { t: 'Barre K — bài tập chân 20 phút tại nhà', m: '20:11', k: 'Bài tập' },
      { t: 'Giãn cơ vai gáy sau 8 tiếng làm việc', m: '08:40', k: 'Hướng dẫn' }
    ],

    posts: [
      { d: '18.09', k: 'Pilates', t: 'Pilates giúp tăng hệ miễn dịch như thế nào?',
        s: 'Hô hấp sâu và vận động biên độ lớn tác động trực tiếp đến tuần hoàn bạch huyết — cơ chế đằng sau cảm giác “nhẹ người” sau mỗi buổi tập.' },
      { d: '02.09', k: 'Bài tập', t: 'Khắc phục chân vòng kiềng bằng 5 bài tập chân',
        s: 'Năm động tác Health Coach của Emma dùng trong 4 tuần đầu cho học viên có chân vòng kiềng nhẹ.' },
      { d: '21.08', k: 'Bài tập', t: 'Pilates original Matwork — Corkscrew',
        s: 'Động tác Corkscrew nguyên bản trong Return to Life through Contrology, kèm hai biến thể dễ hơn cho người mới.' },
      { d: '09.08', k: 'Sức khoẻ', t: 'Đau lưng dưới khi ngồi lâu: tập gì và tránh gì',
        s: 'Vì sao gập bụng truyền thống làm cơn đau nặng thêm, và nhóm cơ nào mới thực sự cần khoẻ lên.' },
      { d: '28.07', k: 'Dinh dưỡng', t: 'Ăn gì trước và sau buổi Pilates 55 phút',
        s: 'Khung giờ ăn và lượng đạm tối thiểu cho buổi tập sáng sớm, theo tư vấn của Health Coach.' },
      { d: '15.07', k: 'Sức khoẻ', t: 'Pilates sau sinh: bắt đầu từ tuần thứ mấy?',
        s: 'Mốc thời gian an toàn với sinh thường và sinh mổ, cùng các dấu hiệu cần dừng tập ngay.' },
      { d: '30.06', k: 'Pilates', t: 'Reformer khác Mat ở điểm nào?',
        s: 'So sánh lực kháng, độ an toàn và tốc độ tiến bộ giữa hai hình thức tập phổ biến nhất.' }
    ],

    pilates: [
      { t: 'HLV 1:1', sub: 'Một học viên — một huấn luyện viên', price: '750.000₫ / buổi',
        tags: ['55 phút', 'Giáo án riêng', 'Giờ tập linh hoạt'],
        d: 'Hình thức sát sao nhất: HLV chỉnh từng động tác và đổi lực lò xo theo trạng thái của bạn trong từng buổi.' },
      { t: 'HLV 1:2', sub: 'Hai học viên — một huấn luyện viên', price: '550.000₫ / buổi',
        tags: ['55 phút', 'Tập cùng bạn', 'Chung giáo án'],
        d: 'Dành cho hai người có thể trạng gần nhau, thường là hai mẹ con hoặc hai người bạn tập cùng khung giờ.' },
      { t: 'Lớp nhóm 1:3', sub: 'Tối đa ba học viên', price: '450.000₫ / buổi',
        tags: ['55 phút', 'Lịch cố định', 'Chi phí hợp lý nhất'],
        d: 'Lớp theo lịch cố định hàng tuần, vẫn đủ nhỏ để HLV chỉnh tư thế cho từng người.' }
    ],

    pilatesGoals: [
      { no: '01', t: 'Cải thiện vóc dáng', tags: ['Thu gọn vòng eo', 'Giảm mỡ, giữ dáng', 'Tăng dẻo dai'],
        d: 'Lộ trình phổ biến nhất: 12 tuần tập trung vào cơ bụng sâu, cơ lưng dưới và nhóm cơ mông để kéo thẳng dáng người và thu gọn vòng eo.' },
      { no: '02', t: 'Pilates bầu', tags: ['Theo từng tam cá nguyệt', 'HLV có chứng chỉ Pre/Postnatal'],
        d: 'Chuỗi bài thiết kế riêng cho phụ nữ mang thai: giữ sức bền, giảm đau lưng và tập thở chuẩn bị cho lúc sinh. Có giấy đồng ý của bác sĩ là tập được.' },
      { no: '03', t: 'Pilates sau sinh', tags: ['Phục hồi cơ sàn chậu', 'Đóng cơ bụng thẳng'],
        d: 'Bắt đầu từ tuần thứ 6 với sinh thường và tuần thứ 12 với sinh mổ, ưu tiên phục hồi cơ sàn chậu trước khi tập nặng.' },
      { no: '04', t: 'Pilates Kid', tags: ['Độ tuổi 8 – 16', 'Hỗ trợ tăng chiều cao'],
        d: 'Ở tuổi dậy thì, bài tập tạo áp lực vừa phải lên xương giúp hỗ trợ tăng chiều cao, đồng thời sửa tư thế ngồi học.' },
      { no: '05', t: 'Cải thiện bệnh lý', tags: ['Cong vẹo cột sống', 'Thoát vị đĩa đệm nhẹ', 'Đau vai gáy'],
        d: 'Lớp do HLV có chứng chỉ nâng cao đứng, giáo án viết sau khi xem phim chụp và trao đổi với bác sĩ điều trị của học viên.' }
    ],

    fitness: [
      { t: 'Barre', sub: 'HLV 1:1 · Lớp nhóm', price: 'Từ 350.000₫', tags: ['50 phút', 'Barre K'],
        d: 'Kết hợp ballet, Pilates và yoga ở biên độ nhỏ, lặp nhiều — đốt mỡ chân và tăng sức bền cơ sâu.' },
      { t: 'Gym', sub: 'PT 1:1 · PT 1:2', price: 'Từ 450.000₫', tags: ['60 phút', 'Có đo InBody'],
        d: 'Giáo án tăng cơ hoặc giảm mỡ, bám theo chỉ số InBody đo lại mỗi 4 tuần.' },
      { t: 'Boxing', sub: 'PT 1:1', price: '600.000₫ / buổi', tags: ['60 phút', 'Bao cát & đích'],
        d: 'Buổi tập cường độ cao cho tim mạch và phản xạ, kỹ thuật đấm được sửa từng buổi.' },
      { t: 'Stretching', sub: 'PT 1:1', price: '500.000₫ / buổi', tags: ['45 phút', 'Giãn cơ trị liệu'],
        d: 'Giãn cơ có hỗ trợ cho người ngồi lâu, đau vai gáy hoặc vừa qua giai đoạn tập nặng.' }
    ],

    packs: [
      { n: '10 buổi', off: '—', note: 'Giữ nguyên giá buổi lẻ', exp: 'Dùng trong 3 tháng' },
      { n: '20 buổi', off: '-8%', note: 'Tặng 1 buổi đo InBody', exp: 'Dùng trong 6 tháng' },
      { n: '40 buổi', off: '-15%', note: 'Tặng 2 buổi Stretching 1:1', exp: 'Dùng trong 9 tháng' },
      { n: '80 buổi', off: '-22%', note: 'Tặng 4 buổi và 1 lần bảo lưu', exp: 'Dùng trong 12 tháng' }
    ],

    courses: [
      { id: 'k1', no: '01', t: 'Khoá HLV Pilates toàn diện', dur: '6 tháng · 500 giờ', lv: 'Nền tảng → hành nghề',
        d: 'Khoá xương sống của Emma Academy: học đủ Mat, Reformer, Cadillac, Wunda Chair và Ladder Barrel, thi thực hành trên học viên thật.',
        mods: ['Giải phẫu ứng dụng và nguyên lý Contrology', 'Mat work: 34 động tác nguyên bản',
               'Reformer cơ bản đến nâng cao', 'Cadillac, Wunda Chair, Ladder Barrel',
               'Thiết kế giáo án theo thể trạng', '100 giờ trợ giảng có giám sát'],
        out: 'Chứng chỉ HLV Pilates toàn diện Emma Academy, đủ điều kiện nhận lớp tại hệ thống.' },
      { id: 'k2', no: '02', t: 'Khoá HLV nâng cao', dur: '3 tháng · 180 giờ', lv: 'Cho HLV đã hành nghề',
        d: 'Chuyên đề sâu cho huấn luyện viên đã có chứng chỉ cơ bản: nhóm học viên đặc thù và các ca cần thận trọng.',
        mods: ['Pilates cho phụ nữ mang thai', 'Phục hồi sau sinh và cơ sàn chậu',
               'Cải thiện bệnh lý cột sống', 'Người cao tuổi và loãng xương', 'Xử lý tình huống trong lớp'],
        out: 'Chứng chỉ nâng cao, đủ điều kiện nhận lớp bầu — sau sinh — bệnh lý.' },
      { id: 'k3', no: '03', t: 'Khoá học ngắn hạn', dur: '4 – 8 tuần', lv: 'Học từng học phần',
        d: 'Tách từng học phần của khoá toàn diện cho người muốn học thử hoặc bổ sung đúng phần còn thiếu.',
        mods: ['Mat work (4 tuần)', 'Reformer (6 tuần)', 'Chair & Barrel (4 tuần)', 'Giải phẫu ứng dụng (4 tuần)'],
        out: 'Chứng nhận hoàn thành học phần, được bảo lưu để ghép vào khoá toàn diện.' },
      { id: 'k4', no: '04', t: 'Khoá HLV Barre K', dur: '2 tháng · 120 giờ', lv: 'Độc lập với Pilates',
        d: 'Chương trình đào tạo riêng cho thương hiệu Barre K: dạy lớp nhóm đông người, nhạc và nhịp lớp.',
        mods: ['Kỹ thuật barre và tư thế chuẩn', 'Thiết kế playlist và nhịp lớp',
               'Điều phối lớp 8 – 12 người', 'Thực hành đứng lớp'],
        out: 'Chứng chỉ HLV Barre K, được dạy tại mọi cơ sở nhượng quyền Barre K.' }
    ],

    certs: [
      { t: 'PMA Educator', by: 'Pilates Method Alliance',
        c: 'Chứng chỉ quốc tế do Educator của Emma nắm giữ, là cơ sở để chương trình của Emma Academy được công nhận.',
        cond: 'Thi tại tổ chức PMA, yêu cầu tối thiểu 450 giờ đào tạo và kinh nghiệm đứng lớp.',
        val: 'Giá trị quốc tế, được nhiều hệ thống Pilates nước ngoài công nhận.' },
      { t: 'HLV Pilates toàn diện', by: 'Emma Academy',
        c: 'Chứng chỉ chính của hệ thống, cấp sau khoá 6 tháng.',
        cond: 'Hoàn thành 500 giờ học, 100 giờ trợ giảng và vượt bài thi thực hành trên học viên thật.',
        val: 'Đủ điều kiện nhận lớp 1:1, 1:2 và nhóm 1:3 tại mọi cơ sở Emma.' },
      { t: 'HLV Pilates nâng cao', by: 'Emma Academy',
        c: 'Chứng chỉ chuyên đề cho nhóm học viên đặc thù.',
        cond: 'Đã có chứng chỉ toàn diện và tối thiểu 6 tháng đứng lớp.',
        val: 'Điều kiện bắt buộc để nhận lớp bầu, sau sinh và lớp cải thiện bệnh lý.' },
      { t: 'HLV Barre K', by: 'Barre K',
        c: 'Chứng chỉ riêng cho giáo trình Barre K.',
        cond: 'Hoàn thành khoá 120 giờ và dạy thử một lớp nhóm đầy đủ.',
        val: 'Được đứng lớp tại toàn bộ cơ sở nhượng quyền Barre K.' }
    ],

    trainers: [
      { mono: 'A', name: 'Nguyễn T. A', role: 'Giảng viên trưởng', sub: 'Giải phẫu · Reformer · Chấm thi tốt nghiệp' },
      { mono: 'B', name: 'Nguyễn T. B', role: 'Giảng viên', sub: 'Mat work · Thiết kế giáo án' },
      { mono: 'K', name: 'HLV 03', role: 'Giảng viên Barre K', sub: 'Kỹ thuật barre · Điều phối lớp nhóm' },
      { mono: 'T', name: 'HLV 07', role: 'Trợ giảng chính', sub: 'Giám sát 100 giờ trợ giảng' }
    ],

    grads: [
      { n: 'Tô Thu Hà', k: 'K01', w: 'HLV tại CS1 Hà Đông' },
      { n: 'Nguyễn Thị Trang', k: 'K01', w: 'HLV tại CS2 Tây Hồ Tây' },
      { n: 'Hà Thanh', k: 'K02', w: 'Studio riêng tại Nam Định' },
      { n: 'Lê Linh Chi', k: 'K03', w: 'HLV tại CS3 Hải Phòng' },
      { n: 'Tống Linh Chi', k: 'K03', w: 'HLV tự do tại Hà Nội' },
      { n: 'Nguyễn Thị Mai Anh', k: 'K04', w: 'HLV tại CS1 Hà Đông' },
      { n: 'Khánh Linh', k: 'K05', w: 'Trợ giảng tại Emma Academy' },
      { n: 'Thảo Giang', k: 'K05', w: 'HLV tại cơ sở nhượng quyền Vinh' },
      { n: 'Đỗ Thảo Chi', k: 'K06', w: 'Đang trợ giảng tại CS2' }
    ],

    franchises: [
      { id: 'f1', route: 'nq-emma-pilates', t: 'Emma Pilates', sub: 'Studio Pilates private',
        area: '180 – 250 m²', inv: '1,6 – 2,0 tỷ', roi: '18 – 24 tháng', fee: '350.000.000₫',
        d: 'Mô hình gốc của hệ thống: phòng private riêng cho từng loại máy, tập trung vào Pilates 1:1 và nhóm nhỏ.',
        who: 'Phù hợp với chủ đầu tư muốn một studio cao cấp, ít khách nhưng giá trị thẻ cao.',
        inc: ['Thương hiệu Emma Pilates và bộ nhận diện', 'Trọn bộ máy Care Pilates nhập khẩu',
              'Giáo án và phần mềm quản lý lớp', 'Đào tạo HLV và lễ tân tại chỗ',
              'Hỗ trợ marketing 90 ngày khai trương'],
        space: ['Mặt bằng tầng 1 hoặc tầng 2 có thang máy', 'Trần cao tối thiểu 3,0 m cho Cadillac',
                'Chỗ để xe cho 15 – 20 khách', 'Khu dân cư có thu nhập khá trở lên'],
        staff: '1 quản lý · 4 – 6 HLV · 2 lễ tân',
        rev: [['Số phòng private', '4 – 5'], ['Công suất buổi/ngày', '28 – 36'],
              ['Giá trị thẻ trung bình', '18.000.000₫'], ['Doanh thu tháng tham khảo', '320 – 420 triệu']] },
      { id: 'f2', route: 'nq-offites-hub', t: 'OFFITES HUB', sub: 'Hub đa bộ môn',
        area: '400 – 600 m²', inv: '3,2 – 4,0 tỷ', roi: '24 – 30 tháng', fee: '550.000.000₫',
        d: 'Mô hình lớn nhất: gộp Pilates, Gym, Barre và Boxing trong cùng một địa điểm, phục vụ cả khách lẻ lẫn hợp đồng doanh nghiệp.',
        who: 'Phù hợp với mặt bằng lớn trong khu văn phòng hoặc khu đô thị đông dân.',
        inc: ['Thương hiệu OFFITES HUB', 'Thiết bị Pilates và toàn bộ khu Gym',
              'Quy trình vận hành đa bộ môn một thẻ tập', 'Đào tạo HLV cả hai nhóm dịch vụ',
              'Gói bán thẻ cho khách doanh nghiệp'],
        space: ['Sàn liền khối, không cột chia nhỏ', 'Trần cao tối thiểu 3,5 m',
                'Hệ thống thông gió và phòng tắm cho 2 khu', 'Gần toà văn phòng hoặc khu đô thị lớn'],
        staff: '1 quản lý · 8 – 12 HLV · 3 lễ tân · 2 tạp vụ',
        rev: [['Số khu chức năng', '4'], ['Công suất buổi/ngày', '70 – 90'],
              ['Giá trị thẻ trung bình', '14.000.000₫'], ['Doanh thu tháng tham khảo', '650 – 820 triệu']] },
      { id: 'f3', route: 'nq-barre-k', t: 'Barre K', sub: 'Chuỗi lớp Barre',
        area: '120 – 160 m²', inv: '0,9 – 1,2 tỷ', roi: '14 – 18 tháng', fee: '220.000.000₫',
        d: 'Mô hình gọn nhất, vốn thấp nhất: một sàn Barre cho lớp nhóm 8 – 12 người, xoay vòng lớp nhanh.',
        who: 'Phù hợp với người mới bắt đầu kinh doanh phòng tập hoặc muốn mở thêm điểm thứ hai.',
        inc: ['Thương hiệu Barre K', 'Thiết kế sàn barre, gương và hệ đèn',
              'Giáo trình Barre K đầy đủ', 'Đào tạo HLV Barre K', 'Playlist và kịch bản từng lớp'],
        space: ['Một sàn trống tối thiểu 90 m²', 'Trần cao tối thiểu 2,8 m',
                'Tường chịu lực để gắn thanh barre', 'Ưu tiên gần trường học hoặc chung cư'],
        staff: '1 quản lý kiêm lễ tân · 3 – 4 HLV',
        rev: [['Số lớp mỗi ngày', '6 – 8'], ['Học viên trung bình/lớp', '9'],
              ['Giá trị thẻ trung bình', '7.500.000₫'], ['Doanh thu tháng tham khảo', '180 – 240 triệu']] }
    ],

    benefits: [
      { t: 'Thương hiệu & nhận diện', d: 'Bộ nhận diện đầy đủ, bản vẽ mẫu và tiêu chuẩn thi công cho từng mô hình.' },
      { t: 'Thiết bị nhập khẩu', d: 'Máy Care Pilates nhập trực tiếp, giá nội bộ dành cho đối tác nhượng quyền.' },
      { t: 'Giáo án & quy trình', d: 'Toàn bộ giáo án, quy trình đo body đầu vào và kịch bản tư vấn bán thẻ.' },
      { t: 'Đào tạo nhân sự', d: 'Emma Academy đào tạo HLV và lễ tân tại chỗ trước ngày khai trương.' },
      { t: 'Marketing khai trương', d: 'Kế hoạch 90 ngày, bộ ảnh và nội dung mạng xã hội cho cơ sở mới.' },
      { t: 'Đồng hành vận hành', d: 'Giảng viên hệ thống kiểm tra chuyên môn định kỳ trong năm đầu tiên.' }
    ],

    jobs: [
      { no: '01', t: 'Huấn luyện viên Pilates', loc: 'CS1 Hà Đông · CS2 Tây Hồ Tây', type: 'Toàn thời gian', pay: '12 – 25 triệu',
        req: ['Có chứng chỉ Pilates hoặc sẵn sàng học khoá đào tạo nội bộ', 'Sức khoẻ tốt, hình thể cân đối', 'Giao tiếp tốt với học viên nữ'],
        job: ['Đứng lớp 1:1, 1:2 và nhóm 1:3', 'Đo body và thiết kế giáo án cho học viên mới', 'Theo dõi tiến độ và báo cáo hàng tháng'] },
      { no: '02', t: 'PT Gym & Boxing', loc: 'CS2 Tây Hồ Tây', type: 'Toàn thời gian', pay: '12 – 22 triệu',
        req: ['Chứng chỉ PT hoặc kinh nghiệm tối thiểu 1 năm', 'Ưu tiên có nền Boxing', 'Biết đọc chỉ số InBody'],
        job: ['Buổi PT 1:1 và 1:2', 'Xây giáo án tăng cơ / giảm mỡ', 'Phối hợp với HLV Pilates cho học viên dùng chung thẻ'] },
      { no: '03', t: 'Lễ tân — Chăm sóc khách hàng', loc: 'Cả ba cơ sở', type: 'Toàn thời gian / ca', pay: '8 – 12 triệu',
        req: ['Ngoại hình ưa nhìn, giọng nói dễ nghe', 'Thành thạo máy tính văn phòng', 'Ưu tiên có kinh nghiệm spa / phòng tập'],
        job: ['Đón khách, xếp lịch tập và nhắc lịch', 'Tư vấn gói tập cho khách mới', 'Quản lý thẻ tập và công nợ cơ sở'] },
      { no: '04', t: 'Thực tập sinh trợ giảng', loc: 'CS1 Hà Đông', type: 'Thực tập có lương', pay: '4 – 6 triệu',
        req: ['Chưa cần chứng chỉ — Emma đào tạo từ đầu', 'Cam kết đủ 100 giờ trợ giảng', 'Yêu thích vận động'],
        job: ['Trợ giảng cùng HLV chính', 'Chuẩn bị máy và dụng cụ trước giờ lớp', 'Học khoá HLV Pilates toàn diện'] }
    ]
  };

  var byId = function (list, id) {
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  };

  /* ================================================================ MẢNH HTML */
  function machineCard(m) {
    return '<a class="machine" href="#/san-pham/' + m.id + '" data-route>' +
      '<span class="shot"><img src="' + m.img + '" alt="Máy tập ' + esc(m.name) + '" loading="lazy" width="' + m.w + '" height="' + m.h + '"></span>' +
      '<span><span class="ttl">' + esc(m.name) + '</span>' +
      '<span class="pr"><span class="num">' + esc(m.price) + '</span><i aria-hidden="true">→</i></span></span></a>';
  }

  function coachCard(c) {
    return '<button class="coach rv" type="button" data-info="coach" data-id="' + c.id + '">' +
      '<span class="portrait"><span class="mono" aria-hidden="true">' + esc(c.mono) + '</span>' +
      '<span class="ph">Ảnh chân dung</span></span>' +
      '<span class="info"><span class="label">' + esc(c.role) + '</span>' +
      '<span class="ttl">' + esc(c.name) + '</span>' +
      '<span class="small">' + esc(c.branch) + ' · ' + esc(c.years) + ' kinh nghiệm</span>' +
      '<span class="certs">' + c.certs.map(function (x) { return '<span>' + esc(x) + '</span>'; }).join('') + '</span>' +
      '</span></button>';
  }

  function videoCard(v) {
    return '<a class="vid rv" href="' + YT + '" target="_blank" rel="noopener">' +
      '<span class="frame"><span class="play"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 1.5v13l11-6.5z"/></svg></span></span>' +
      '<span class="cap"><span class="tag">' + esc(v.k) + '</span><b>' + esc(v.t) + '</b>' +
      '<span class="small num">' + esc(v.m) + ' · Mở trên YouTube ↗</span></span></a>';
  }

  function postRow(p) {
    return '<a class="post rv" href="#/tin-tuc" data-topic="' + esc(p.k) + '">' +
      '<span class="date">' + esc(p.d) + '</span><span class="tag">' + esc(p.k) + '</span>' +
      '<div><h3>' + esc(p.t) + '</h3><p class="body">' + esc(p.s) + '</p></div>' + ARROW + '</a>';
  }

  function svcCard(s) {
    return '<article class="card rv">' +
      '<span class="label">' + esc(s.sub) + '</span><h3 class="d3">' + esc(s.t) + '</h3>' +
      '<p class="body">' + esc(s.d) + '</p>' +
      '<div class="tags">' + s.tags.map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('') + '</div>' +
      '<div class="foot"><span class="price num">' + esc(s.price) + '</span>' +
      '<button class="btn sm" type="button" data-form="tap-thu">Đăng ký</button></div></article>';
  }

  function pillarCards() {
    return '<article class="card rv">' +
      '<span class="tag">Trụ cột 1</span><h3 class="d3">Pilates</h3>' +
      '<p class="body">Reformer, Cadillac, Wunda Chair, Ladder Barrel và Mat. Giáo án cá nhân hoá theo kết quả đo body đầu vào.</p>' +
      '<div class="tags"><span class="chip">HLV 1:1</span><span class="chip">HLV 1:2</span><span class="chip">Nhóm 1:3</span>' +
      '<span class="chip">Bầu &amp; sau sinh</span><span class="chip">Cải thiện bệnh lý</span></div>' +
      '<div class="foot"><span class="price num">Từ 450.000₫ / buổi</span>' +
      '<a class="btn sm" href="#/pilates" data-route>Xem Pilates</a></div></article>' +
      '<article class="card rv">' +
      '<span class="tag sand">Trụ cột 2 · Gym &amp; Barre gộp chung</span><h3 class="d3">Fitness</h3>' +
      '<p class="body">Barre, Gym, Boxing và Stretching nằm chung một nhóm dịch vụ, dùng chung thẻ tập và chung HLV theo dõi lộ trình.</p>' +
      '<div class="tags"><span class="chip">Barre 1:1 &amp; lớp nhóm</span><span class="chip">Gym PT 1:1</span>' +
      '<span class="chip">Gym PT 1:2</span><span class="chip">Boxing PT 1:1</span><span class="chip">Stretching PT 1:1</span></div>' +
      '<div class="foot"><span class="price num">Từ 350.000₫ / buổi</span>' +
      '<a class="btn sm" href="#/fitness" data-route>Xem Fitness</a></div></article>';
  }

  /* ============================================================= DỰNG NỘI DUNG */
  function fill(id, html) { var el = document.getElementById(id); if (el) el.innerHTML = html; }

  function buildStatic() {
    var m = DATA.machines.map(machineCard).join('');
    fill('machine-home', m);
    fill('machine-all', m);
    fill('machine-pilates', DATA.machines.slice(0, 4).map(machineCard).join(''));

    fill('home-pillars', pillarCards());
    fill('svc-pillars', pillarCards());

    fill('branch-home', DATA.branches.map(function (b) {
      return '<a class="branch rv" href="#/chi-nhanh" data-route>' +
        '<span class="cs">' + esc(b.cs) + '</span><h3>' + esc(b.name) + '</h3>' +
        '<p class="body">' + esc(b.addr) + '</p>' +
        '<span class="meta"><span>' + esc(b.open) + '</span><span>Hotline 0938 831 661</span></span></a>';
    }).join(''));

    fill('branch-detail', DATA.branches.map(function (b) {
      return '<article class="card rv"><span class="label">' + esc(b.cs) + '</span>' +
        '<h3 class="d3">' + esc(b.name) + '</h3><p class="body">' + esc(b.addr) + '</p>' +
        '<dl class="dl"><div><dt>Phòng tập</dt><dd>' + esc(b.rooms) + '</dd></div>' +
        '<div><dt>Giờ mở cửa</dt><dd>' + esc(b.open) + '</dd></div>' +
        '<div><dt>Hotline</dt><dd><a class="link" href="tel:0938831661">0938 831 661</a></dd></div></dl>' +
        '<div class="foot"><span class="small">Bản đồ nhúng khi lên web thật</span>' +
        '<button class="btn sm" type="button" data-form="tham-quan">Đặt lịch</button></div></article>';
    }).join(''));

    fill('coach-home', DATA.coaches.slice(0, 4).map(coachCard).join(''));
    fill('coach-all', DATA.coaches.map(coachCard).join(''));
    fill('video-home', DATA.videos.slice(0, 3).map(videoCard).join(''));
    fill('video-rail', DATA.videos.map(videoCard).join(''));
    fill('post-home', DATA.posts.slice(0, 3).map(postRow).join(''));
    fill('post-all', DATA.posts.map(postRow).join(''));

    fill('svc-pilates', DATA.pilates.map(svcCard).join(''));
    fill('svc-fitness', DATA.fitness.map(svcCard).join(''));

    fill('pilates-goals', DATA.pilatesGoals.map(function (g, i) {
      var id = 'goal-' + g.no;
      return '<div class="row-item rv' + (i === 0 ? ' open' : '') + '">' +
        '<button class="hd" type="button" aria-expanded="' + (i === 0) + '" aria-controls="' + id + '">' +
        '<span class="no">' + esc(g.no) + '</span><span class="ttl">' + esc(g.t) + '</span>' + ARROW + '</button>' +
        '<div class="bd" id="' + id + '"><div class="bd-in">' +
        '<p class="body">' + esc(g.d) + '</p>' +
        '<div class="side"><div class="tags">' +
        g.tags.map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('') + '</div>' +
        '<button class="btn sm" type="button" data-form="tap-thu">Đăng ký tập thử</button></div>' +
        '</div></div></div>';
    }).join(''));

    fill('price-packs', DATA.packs.map(function (p) {
      return '<article class="card rv"><span class="label">Gói</span>' +
        '<h3 class="d3">' + esc(p.n) + '</h3>' +
        '<p class="price num" style="font-size:22px">' + esc(p.off === '—' ? 'Giá gốc' : 'Giảm ' + p.off) + '</p>' +
        '<p class="body">' + esc(p.note) + '</p>' +
        '<div class="foot"><span class="small">' + esc(p.exp) + '</span>' +
        '<button class="btn sm" type="button" data-form="bang-gia">Chọn gói</button></div></article>';
    }).join(''));

    fill('edu-index', [
      ['Các khoá đào tạo', 'khoa-hoc', '4 khoá từ nền tảng đến chuyên sâu, kèm giáo trình đầy đủ.'],
      ['Hệ thống chứng chỉ', 'chung-chi', 'Chứng chỉ nào, do ai cấp, điều kiện xét duyệt ra sao.'],
      ['HLV hệ thống', 'hlv-he-thong', 'Đội ngũ giảng viên đứng lớp và chấm thi tốt nghiệp.'],
      ['Học viên tốt nghiệp', 'tot-nghiep', 'Danh sách theo từng khoá và nơi công tác hiện tại.']
    ].map(function (x) {
      return '<a class="card rv" href="#/' + x[1] + '" data-route>' +
        '<span class="label">Thư mục con</span><h3 class="d4">' + esc(x[0]) + '</h3>' +
        '<p class="body">' + esc(x[2]) + '</p>' +
        '<div class="foot"><span class="small">Xem trang</span>' + ARROW + '</div></a>';
    }).join(''));

    fill('course-rows', DATA.courses.map(function (c, i) {
      var id = 'course-' + c.id;
      return '<div class="row-item rv' + (i === 0 ? ' open' : '') + '">' +
        '<button class="hd" type="button" aria-expanded="' + (i === 0) + '" aria-controls="' + id + '">' +
        '<span class="no">' + esc(c.no) + '</span>' +
        '<span><span class="ttl">' + esc(c.t) + '</span>' +
        '<span class="small">' + esc(c.dur) + ' · ' + esc(c.lv) + '</span></span>' + ARROW + '</button>' +
        '<div class="bd" id="' + id + '"><div class="bd-in">' +
        '<div><p class="body">' + esc(c.d) + '</p>' +
        '<p class="label" style="margin:18px 0 10px">Giáo trình</p>' +
        '<ol class="numlist">' + c.mods.map(li).join('') + '</ol></div>' +
        '<div class="side"><dl class="dl"><div><dt>Bằng cấp</dt><dd>' + esc(c.out) + '</dd></div>' +
        '<div><dt>Thời lượng</dt><dd class="num">' + esc(c.dur) + '</dd></div></dl>' +
        '<button class="btn sm" type="button" data-form="dao-tao">Tư vấn khoá này</button></div>' +
        '</div></div></div>';
    }).join(''));

    fill('cert-grid', DATA.certs.map(function (c) {
      return '<article class="card rv"><span class="label">' + esc(c.by) + '</span>' +
        '<h3 class="d3">' + esc(c.t) + '</h3><p class="body">' + esc(c.c) + '</p>' +
        '<dl class="dl"><div><dt>Điều kiện</dt><dd>' + esc(c.cond) + '</dd></div>' +
        '<div><dt>Giá trị</dt><dd>' + esc(c.val) + '</dd></div></dl></article>';
    }).join(''));

    fill('trainer-grid', DATA.trainers.map(function (t) {
      return '<article class="card rv" style="padding:0">' +
        '<span class="portrait" style="aspect-ratio:4/3"><span class="mono" aria-hidden="true">' + esc(t.mono) + '</span>' +
        '<span class="ph">Ảnh chân dung</span></span>' +
        '<span class="info" style="padding:18px 20px 22px;display:grid;gap:7px">' +
        '<span class="label">' + esc(t.role) + '</span><span class="ttl d4">' + esc(t.name) + '</span>' +
        '<span class="small">' + esc(t.sub) + '</span></span></article>';
    }).join(''));

    fill('franchise-grid', DATA.franchises.map(function (f) {
      return '<article class="card rv"><span class="label">' + esc(f.sub) + '</span>' +
        '<h3 class="d3">' + esc(f.t) + '</h3><p class="body">' + esc(f.d) + '</p>' +
        '<dl class="dl"><div><dt>Diện tích</dt><dd class="num">' + esc(f.area) + '</dd></div>' +
        '<div><dt>Tổng đầu tư</dt><dd class="num">' + esc(f.inv) + '</dd></div>' +
        '<div><dt>Hoàn vốn</dt><dd class="num">' + esc(f.roi) + '</dd></div></dl>' +
        '<div class="foot"><a class="btn ghost sm" href="#/' + f.route + '" data-route>Xem mô hình</a>' +
        '<button class="btn sm" type="button" data-form="nhuong-quyen">Nhận hồ sơ</button></div></article>';
    }).join(''));

    fill('benefit-grid', DATA.benefits.map(function (b) {
      return '<article class="card rv"><h3 class="d4">' + esc(b.t) + '</h3>' +
        '<p class="body">' + esc(b.d) + '</p></article>';
    }).join(''));

    fill('job-list', DATA.jobs.map(function (j) {
      var id = 'job-' + j.no;
      return '<div class="row-item rv">' +
        '<button class="hd" type="button" aria-expanded="false" aria-controls="' + id + '">' +
        '<span class="no">' + esc(j.no) + '</span>' +
        '<span><span class="ttl">' + esc(j.t) + '</span>' +
        '<span class="small">' + esc(j.loc) + ' · ' + esc(j.type) + ' · ' + esc(j.pay) + '</span></span>' +
        ARROW + '</button>' +
        '<div class="bd" id="' + id + '"><div class="bd-in">' +
        '<div><p class="label" style="margin-bottom:10px">Mô tả công việc</p>' +
        '<ul class="dashlist">' + j.job.map(li).join('') + '</ul></div>' +
        '<div><p class="label" style="margin-bottom:10px">Yêu cầu</p>' +
        '<ul class="dashlist">' + j.req.map(li).join('') + '</ul>' +
        '<button class="btn sm" type="button" style="margin-top:18px" data-form="tuyen-dung" data-job="' + esc(j.t) + '">Ứng tuyển vị trí này</button></div>' +
        '</div></div></div>';
    }).join(''));

    buildFranchisePages();
    buildGrads('Tất cả');
  }

  /* --- trang thương hiệu nhượng quyền ------------------------------------- */
  function buildFranchisePages() {
    DATA.franchises.forEach(function (f) {
      var el = document.getElementById('p-' + f.route);
      if (!el) return;
      var hid = 'h-' + f.route;
      el.setAttribute('aria-labelledby', hid);
      el.innerHTML =
        '<div class="pagehead"><div class="wrap">' +
        '<nav class="crumb" aria-label="Đường dẫn"><a href="#/trang-chu" data-route>Trang chủ</a><i>›</i>' +
        '<a href="#/nhuong-quyen" data-route>Nhượng quyền</a><i>›</i><span>' + esc(f.t) + '</span></nav>' +
        '<h1 class="d2" id="' + hid + '">' + esc(f.t) + '</h1>' +
        '<p class="body">' + esc(f.d) + '</p>' +
        '<div class="stats" style="margin-top:28px;grid-template-columns:repeat(4,1fr)">' +
        '<div><b class="num">' + esc(f.area) + '</b><small>Diện tích mặt bằng</small></div>' +
        '<div><b class="num">' + esc(f.fee) + '</b><small>Phí nhượng quyền</small></div>' +
        '<div><b class="num">' + esc(f.inv) + '</b><small>Tổng vốn đầu tư</small></div>' +
        '<div><b class="num">' + esc(f.roi) + '</b><small>Hoàn vốn dự kiến</small></div>' +
        '</div>' +
        '<div class="anchors" style="margin-top:26px">' +
        '<a href="#' + f.route + '-mo-hinh">Mô hình</a>' +
        '<a href="#' + f.route + '-chi-so">Chỉ số vận hành</a>' +
        '<a href="#' + f.route + '-lo-trinh">Lộ trình mở</a>' +
        '<a href="#' + f.route + '-hoi-dap">Hỏi đáp</a>' +
        '</div></div></div>' +

        /* --- mô hình --- */
        '<section class="sec" id="' + f.route + '-mo-hinh"><div class="wrap split">' +
        '<div class="rv"><span class="eyebrow">Mô hình</span>' +
        '<h2 class="d3" style="margin-top:16px">Dành cho ai</h2>' +
        '<p class="standfirst" style="margin-top:18px">' + esc(f.who) + '</p>' +
        '<dl class="spec" style="margin-top:24px">' +
        row('Nhân sự tối thiểu', esc(f.staff)) +
        row('Diện tích', esc(f.area)) +
        row('Phí nhượng quyền', esc(f.fee)) +
        row('Thời hạn hợp đồng', '5 năm, ưu tiên gia hạn cho đối tác đang vận hành tốt') +
        '</dl></div>' +
        '<div class="rv"><p class="label" style="margin-bottom:12px">Emma chuyển giao</p>' +
        '<ul class="dashlist">' + f.inc.map(li).join('') + '</ul>' +
        '<p class="label" style="margin:26px 0 12px">Yêu cầu mặt bằng</p>' +
        '<ul class="dashlist">' + f.space.map(li).join('') + '</ul>' +
        '<p class="kicker-note">' + INFO_ICON +
        '<span><b>Bảo vệ khu vực.</b> Trong thời hạn hợp đồng, Emma không mở cơ sở khác ' +
        'hay ký đối tác mới trong bán kính đã thoả thuận.</span></p>' +
        '</div></div></section>' +

        /* --- chỉ số vận hành --- */
        '<section class="sec band-soft" id="' + f.route + '-chi-so"><div class="wrap">' +
        '<div class="sec-head rv"><div><span class="eyebrow">Vận hành tham khảo</span>' +
        '<h2 class="d2">Con số của một cơ sở ' + esc(f.t) + '</h2>' +
        '<p class="body">Lấy từ cơ sở Emma đang vận hành có quy mô tương đương. ' +
        '<span class="hl">Số liệu mẫu dựng giao diện</span>, chờ bảng tài chính chính thức.</p></div></div>' +
        '<div class="metrics rv" data-cms="Chỉ số vận hành">' +
        f.rev.map(function (r, i) {
          return '<div><span class="lb">0' + (i + 1) + '</span><b>' + esc(r[1]) + '</b>' +
            '<small>' + esc(r[0]) + '</small></div>';
        }).join('') +
        '</div>' +
        '<p class="small rv" style="margin-top:16px">Con số thực tế thay đổi theo vị trí mặt bằng, ' +
        'mức giá vùng và năng lực đội ngũ. Emma tính riêng cho từng mặt bằng trong buổi khảo sát.</p>' +
        '</div></section>' +

        /* --- lộ trình mở --- */
        '<section class="sec" id="' + f.route + '-lo-trinh"><div class="wrap">' +
        '<div class="sec-head rv"><div><span class="eyebrow">Lộ trình</span>' +
        '<h2 class="d2">Từ lúc ký đến ngày khai trương</h2>' +
        '<p class="body">Mốc thời gian dưới đây tính cho mặt bằng đã bàn giao và không vướng cải tạo kết cấu.</p>' +
        '</div></div>' +
        '<div class="steps rv" data-cms="Lộ trình setup">' +
        '<div><h3 class="d4">Khảo sát &amp; chốt mặt bằng</h3><p class="body">Emma đo đạc, đánh giá lưu lượng khu vực và dựng dự toán riêng cho vị trí của bạn.</p></div>' +
        '<div><h3 class="d4">Ký hợp đồng</h3><p class="body">Thống nhất phạm vi độc quyền, phí nhượng quyền và các mốc thanh toán.</p></div>' +
        '<div><h3 class="d4">Thiết kế &amp; thi công</h3><p class="body">Bản vẽ theo bộ nhận diện, Emma giám sát và nghiệm thu từng hạng mục.</p></div>' +
        '<div><h3 class="d4">Lắp máy &amp; tuyển nhân sự</h3><p class="body">Thiết bị về cùng lúc với đợt đào tạo huấn luyện viên và lễ tân.</p></div>' +
        '<div><h3 class="d4">Chạy thử &amp; khai trương</h3><p class="body">Hai tuần bán thẻ sớm và dạy thử trước ngày mở chính thức.</p></div>' +
        '</div></div></section>' +

        /* --- hỏi đáp --- */
        '<section class="sec band-sand" id="' + f.route + '-hoi-dap"><div class="wrap">' +
        '<div class="sec-head rv"><div><span class="eyebrow">Hỏi nhanh</span>' +
        '<h2 class="d2">Đối tác hay hỏi</h2></div></div>' +
        '<div class="faq rv" data-cms="Câu hỏi thường gặp">' +
        faqRow('Tôi chưa từng làm ngành thể hình thì sao?',
               'Phần lớn đối tác hiện tại đến từ ngành khác. Emma chuyển giao quy trình vận hành, tuyển và đào tạo nhân sự, cử người phụ trách khu vực theo sát ba tháng đầu sau khai trương.') +
        faqRow('Phí nhượng quyền ' + f.fee + ' gồm những gì?',
               'Gồm quyền sử dụng thương hiệu, bộ nhận diện, giáo án, phần mềm quản lý và đào tạo nhân sự ban đầu. Thiết bị và chi phí thi công tính riêng theo mặt bằng thực tế.') +
        faqRow('Tôi có phải mua máy của Emma không?',
               'Thiết bị phải đạt chuẩn kỹ thuật của hệ thống để giáo án chạy được. Bạn mua qua Emma hoặc tự nhập dòng máy tương đương đã được Emma duyệt.') +
        faqRow('Sau khai trương Emma hỗ trợ tiếp thế nào?',
               'Họp vận hành hàng tháng, cập nhật giáo án hai lần mỗi năm, đào tạo lại khi có nhân sự mới, và hỗ trợ chiến dịch bán thẻ vào các mùa cao điểm.') +
        '</div></div></section>' +

        '<section class="sec cta"><div class="wrap cta-row">' +
        '<div><span class="eyebrow">Bước tiếp theo</span>' +
        '<h2 class="d3" style="margin-block:14px 12px">Nhận hồ sơ ' + esc(f.t) + '</h2>' +
        '<p class="body">Gồm mô hình tài chính chi tiết, danh mục thiết bị, bản vẽ mẫu và lộ trình setup.</p></div>' +
        '<button class="btn" type="button" data-form="nhuong-quyen">Gửi yêu cầu <span class="ar">→</span></button>' +
        '</div></section>';
    });
  }

  var INFO_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/>' +
    '<path d="M12 11v5M12 7.6v.4"/></svg>';

  function buildProduct(id) {
    var el = document.getElementById('p-san-pham');
    var m = byId(DATA.machines, id) || DATA.machines[0];
    var related = DATA.machines.filter(function (x) { return x.id !== m.id; }).slice(0, 4);
    var views = ['Góc nghiêng', 'Chi tiết lò xo', 'Khi đang tập'];
    el.setAttribute('aria-labelledby', 'h-product');
    el.innerHTML =
      '<div class="crumbbar"><div class="wrap">' +
      '<nav class="crumb" aria-label="Đường dẫn"><a href="#/trang-chu" data-route>Trang chủ</a><i>›</i>' +
      '<a href="#/may-tap" data-route>Máy tập</a><i>›</i><span>' + esc(m.name) + '</span></nav>' +
      '</div></div>' +

      /* --- khối mua hàng --- */
      '<section class="sec"><div class="wrap product">' +
      '<div class="gallery rv" data-cms="Thư viện ảnh sản phẩm">' +
        '<div class="main"><span class="badge">' + esc(m.off) + '</span>' +
        '<img id="prod-img" src="' + m.img + '" alt="Máy tập ' + esc(m.name) + '" width="' + m.w + '" height="' + m.h + '"></div>' +
        '<div class="thumbs">' +
          '<button type="button" aria-current="true" aria-label="Ảnh chính"><img src="' + m.img + '" alt="" width="' + m.w + '" height="' + m.h + '"></button>' +
          views.map(function (v) {
            return '<button type="button" aria-label="' + esc(v) + '"><span class="ph">' + esc(v) + '</span></button>';
          }).join('') +
        '</div>' +
      '</div>' +

      '<div class="rv">' +
        '<span class="eyebrow">' + esc(m.origin) + '</span>' +
        '<h1 class="d2" id="h-product" style="margin:14px 0 12px">' + esc(m.name) + '</h1>' +
        '<p class="body">' + esc(m.note) + '</p>' +

        '<div class="buybox" style="margin-top:24px" data-cms="Giá &amp; tồn kho">' +
          '<div>' +
            '<div class="pricerow"><span class="now">' + esc(m.price) + '</span>' +
            '<span class="was">' + esc(m.was) + '</span><span class="tag">' + esc(m.off) + '</span></div>' +
            '<p class="vat" style="margin:8px 0 0">Giá đã gồm VAT · chưa gồm phí vận chuyển ngoài Hà Nội và Hải Phòng.</p>' +
          '</div>' +
          '<div class="qty"><span class="stock"><i aria-hidden="true"></i>' + esc(m.stock) + '</span>' +
          '<span>·</span><span>Mã máy ' + esc(m.sku) + '</span></div>' +
          '<hr>' +
          '<p class="small" style="margin:0"><b style="color:var(--ink)">Mua từ 3 máy</b> có mức giá riêng cho studio mở mới, kèm khảo sát mặt bằng trước khi giao.</p>' +
          '<div class="hero-acts" style="margin-top:0">' +
            '<button class="btn" type="button" data-form="may-tap">Yêu cầu báo giá <span class="ar">→</span></button>' +
            '<a class="btn ghost" href="tel:0938831661">Gọi 0938 831 661</a>' +
          '</div>' +
        '</div>' +

        '<dl class="spec" style="margin-top:26px">' +
          row('Kích thước', esc(m.size)) + row('Trọng lượng', esc(m.weight)) +
          row('Tải trọng', esc(m.cap)) + row('Thời gian giao', esc(m.lead)) +
        '</dl>' +
      '</div></div></section>' +

      /* --- tab thông tin --- */
      '<section class="sec band-soft"><div class="wrap">' +
        '<div class="prodnav rv" role="tablist" aria-label="Thông tin sản phẩm">' +
          '<button type="button" role="tab" aria-selected="true" aria-controls="pp-spec" id="pt-spec">Thông số kỹ thuật</button>' +
          '<button type="button" role="tab" aria-selected="false" aria-controls="pp-feat" id="pt-feat">Điểm nổi bật</button>' +
          '<button type="button" role="tab" aria-selected="false" aria-controls="pp-ship" id="pt-ship">Bảo hành &amp; lắp đặt</button>' +
        '</div>' +

        '<div class="panel" id="pp-spec" role="tabpanel" aria-labelledby="pt-spec">' +
          '<div class="lede-grid">' +
            '<dl class="spec" data-cms="Thông số kỹ thuật">' +
              row('Mã máy', esc(m.sku)) + row('Xuất xứ', esc(m.origin)) +
              row('Kích thước', esc(m.size)) + row('Trọng lượng', esc(m.weight)) +
              row('Chất liệu', esc(m.mat)) + row('Lò xo', esc(m.spring)) +
              row('Tải trọng tối đa', esc(m.cap)) + row('Dùng cho', esc(m.use)) +
            '</dl>' +
            '<div>' +
              '<h3 class="d4" style="margin-bottom:14px">Cần bao nhiêu diện tích?</h3>' +
              '<p class="body">' + esc(m.space) + '</p>' +
              '<ul class="checklist" style="margin-top:18px">' +
                '<li>' + TICK + '<span><b>Khảo sát trước khi giao</b> — kỹ thuật đo lối vào, thang máy và mặt sàn.</span></li>' +
                '<li>' + TICK + '<span><b>Hướng dẫn sử dụng tại chỗ</b> — cân chỉnh lực lò xo theo nhóm học viên của bạn.</span></li>' +
                '<li>' + TICK + '<span><b>Linh kiện có sẵn trong nước</b> — lò xo, dây đai, đệm thay thế không phải đặt từ Hàn.</span></li>' +
              '</ul>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div class="panel" id="pp-feat" role="tabpanel" aria-labelledby="pt-feat" hidden>' +
          '<div class="grid g4" data-cms="Điểm nổi bật">' +
            m.feat.map(function (x, i) {
              return '<article class="card"><span class="label">0' + (i + 1) + '</span>' +
                '<p class="body" style="color:var(--ink)">' + esc(x) + '</p></article>';
            }).join('') +
          '</div>' +
        '</div>' +

        '<div class="panel" id="pp-ship" role="tabpanel" aria-labelledby="pt-ship" hidden>' +
          '<div class="trust" data-cms="Chính sách bán hàng">' +
            '<div><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l8 3v6c0 4.4-3.4 7.6-8 9-4.6-1.4-8-4.6-8-9V6z"/></svg>' +
            '<div><b>Bảo hành 24 tháng</b><small>Khung máy 24 tháng, lò xo và dây đai 12 tháng.</small></div></div>' +
            '<div><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>' +
            '<div><b>Vận chuyển toàn quốc</b><small>Miễn phí nội thành Hà Nội và Hải Phòng.</small></div></div>' +
            '<div><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 7l3 3M3 21l4-1 11-11-3-3L4 17z"/></svg>' +
            '<div><b>Lắp đặt tận nơi</b><small>Lắp, cân chỉnh và bàn giao trong cùng một buổi.</small></div></div>' +
            '<div><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="9"/></svg>' +
            '<div><b>' + esc(m.lead) + '</b><small>Báo trước lịch giao để bạn sắp xếp mặt bằng.</small></div></div>' +
          '</div>' +
          '<div class="faq" style="margin-top:clamp(28px,3vw,42px)" data-cms="Câu hỏi thường gặp">' +
            faqRow('Máy có dùng được cho studio mới mở không?',
                   'Có. Emma bán kèm gói tư vấn bố trí phòng tập: số máy phù hợp với diện tích, khoảng cách an toàn giữa các máy và thứ tự ưu tiên mua khi ngân sách còn giới hạn.') +
            faqRow('Bảo trì định kỳ thế nào?',
                   'Lò xo nên kiểm tra mỗi 6 tháng, ray trượt lau và tra dầu mỗi tháng. Emma gửi lịch nhắc và có gói bảo trì tận nơi cho khách ở Hà Nội và Hải Phòng.') +
            faqRow('Có xem máy trực tiếp trước khi mua được không?',
                   'Được. Ba cơ sở của Emma đều đang dùng chính dòng máy này, bạn đặt lịch tới tập thử một buổi rồi quyết định.') +
          '</div>' +
        '</div>' +
      '</div></section>' +

      /* --- sản phẩm liên quan --- */
      '<section class="sec"><div class="wrap">' +
      '<div class="sec-head rv"><div><span class="eyebrow">Sản phẩm liên quan</span>' +
      '<h2 class="d2">Thường mua cùng</h2>' +
      '<p class="body">Bộ bốn máy dưới đây là cấu hình tối thiểu cho một studio Pilates mở mới.</p></div>' +
      '<a class="btn ghost" href="#/may-tap" data-route>Tất cả máy tập</a></div>' +
      '<div class="machines cols-4 rv">' + related.map(machineCard).join('') + '</div>' +
      '</div></section>' +

      '<section class="sec tint"><div class="wrap cta-row rv">' +
      '<div><span class="eyebrow">Mở studio</span>' +
      '<h2 class="d3" style="margin-block:14px 12px">Cần tư vấn cấu hình cho cả phòng tập?</h2>' +
      '<p class="body">Gửi diện tích và số học viên dự kiến, Emma đề xuất danh mục máy kèm tổng chi phí.</p></div>' +
      '<button class="btn" type="button" data-form="may-tap">Nhận tư vấn cấu hình <span class="ar">→</span></button>' +
      '</div></section>';

    tabs(el);
  }

  /* Tab thông tin sản phẩm: bấm để đổi bảng, bàn phím trái/phải để chuyển. */
  function tabs(scope) {
    var nav = $('.prodnav', scope);
    if (!nav) return;
    var btns = $$('button', nav);
    function select(b) {
      btns.forEach(function (x) {
        var on = x === b;
        x.setAttribute('aria-selected', String(on));
        var panel = document.getElementById(x.getAttribute('aria-controls'));
        if (panel) panel.hidden = !on;
      });
      FX.scan();
    }
    nav.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (b) select(b);
    });
    nav.addEventListener('keydown', function (e) {
      var i = btns.indexOf(document.activeElement);
      if (i < 0) return;
      var n = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : -1;
      if (n < 0 || n >= btns.length) return;
      e.preventDefault();
      btns[n].focus();
      select(btns[n]);
    });
  }

  function faqRow(q, a) {
    return '<details><summary>' + esc(q) + '<span class="pm" aria-hidden="true"></span></summary>' +
      '<p class="body ans">' + esc(a) + '</p></details>';
  }

  /* --- học viên tốt nghiệp ------------------------------------------------ */
  function buildGrads(ks) {
    var bar = document.getElementById('grad-filter');
    if (bar && !bar.children.length) {
      var keys = ['Tất cả'];
      DATA.grads.forEach(function (g) { if (keys.indexOf(g.k) < 0) keys.push(g.k); });
      bar.innerHTML = keys.map(function (k, i) {
        return '<button class="chip" type="button" aria-pressed="' + (i === 0) + '" data-grad="' + esc(k) + '">' + esc(k) + '</button>';
      }).join('');
    }
    fill('grad-grid', DATA.grads.filter(function (g) { return ks === 'Tất cả' || g.k === ks; }).map(function (g) {
      return '<article class="card rv"><span class="tag">' + esc(g.k) + '</span>' +
        '<h3 class="d4">' + esc(g.n) + '</h3><p class="small">' + esc(g.w) + '</p></article>';
    }).join(''));
  }

  buildStatic();

  /* --- bộ lọc tin tức ----------------------------------------------------- */
  (function newsFilter() {
    var bar = $('#news-filter'), list = $('#post-all'), empty = $('#post-empty');
    if (!bar || !list) return;
    var topics = ['Tất cả'];
    DATA.posts.forEach(function (p) { if (topics.indexOf(p.k) < 0) topics.push(p.k); });
    bar.innerHTML = topics.map(function (t, i) {
      return '<button class="chip" type="button" aria-pressed="' + (i === 0) + '" data-topic="' + esc(t) + '">' + esc(t) + '</button>';
    }).join('');
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('[data-topic]');
      if (!b) return;
      $$('[data-topic]', bar).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      var t = b.dataset.topic, shown = 0;
      $$('.post', list).forEach(function (row) {
        var ok = t === 'Tất cả' || row.dataset.topic === t;
        row.hidden = !ok;
        if (ok) shown++;
      });
      if (empty) empty.hidden = shown > 0;
    });
  })();

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-grad]');
    if (!b) return;
    $$('[data-grad]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
    buildGrads(b.dataset.grad);
    FX.scan();
  });

  /* ==================================================== HIỆU ỨNG HIỆN KHI CUỘN */
  var FX = (function () {
    var root = document.documentElement;
    var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    function showAll() { $$('.rv').forEach(function (el) { el.classList.add('in'); }); }

    if (reduce) { root.classList.remove('fx'); return { scan: showAll, init: showAll }; }
    root.classList.add('fx');

    /* Mọi thứ đã nằm trong tầm nhìn thì hiện ngay, phần dưới hiện dần khi cuộn.
       Dùng vị trí thực của phần tử thay vì IntersectionObserver để chắc chắn
       khung đầu tiên của trang không bao giờ trống. */
    function check() {
      var vh = innerHeight || 800;
      $$('.rv').forEach(function (el) {
        if (el.classList.contains('in')) return;
        if (el.closest('.page[hidden]')) return;
        var r = el.getBoundingClientRect();
        if (r.top < vh * 0.9 && r.bottom > -40) el.classList.add('in');
      });
    }

    /* Hẹn giờ thay cho requestAnimationFrame: khung hình có thể bị bỏ qua khi tab
       ẩn hoặc trình duyệt tiết kiệm pin, còn setTimeout thì luôn chạy. */
    var pending = 0;
    function onScroll() {
      if (pending) return;
      pending = setTimeout(function () { pending = 0; check(); }, 90);
    }
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    addEventListener('load', check);
    /* phòng hờ cuối: sau 2,5 giây mọi thứ trong trang đang mở đều phải hiện ra */
    setTimeout(function () {
      if (document.documentElement.scrollHeight <= innerHeight + 40) showAll();
    }, 2500);

    return { scan: check, init: check };
  })();

  /* ==================================================================== ROUTER */
  var PAGES = {
    'trang-chu': 'trang-chu', 'gioi-thieu': 'trang-chu', 'chi-nhanh': 'trang-chu',
    'huan-luyen-vien': 'trang-chu', 'tin-tuc': 'trang-chu', 'tuyen-dung': 'trang-chu',
    'dich-vu': 'dich-vu', 'pilates': 'dich-vu', 'fitness': 'dich-vu', 'bang-gia': 'dich-vu',
    'dao-tao': 'dao-tao', 'khoa-hoc': 'dao-tao', 'chung-chi': 'dao-tao',
    'hlv-he-thong': 'dao-tao', 'tot-nghiep': 'dao-tao',
    'nhuong-quyen': 'nhuong-quyen', 'nq-emma-pilates': 'nhuong-quyen',
    'nq-offites-hub': 'nhuong-quyen', 'nq-barre-k': 'nhuong-quyen',
    'may-tap': 'nhuong-quyen', 'san-pham': 'nhuong-quyen'
  };
  var IDS = Object.keys(PAGES);
  var nav = $('#mainnav'), burger = $('#burger');

  function parse() {
    var parts = (location.hash || '').replace(/^#\/?/, '').split('/');
    var page = PAGES[parts[0]] ? parts[0] : 'trang-chu';
    return { page: page, arg: parts[1] || '' };
  }

  function paint(r) {
    if (r.page === 'san-pham') buildProduct(r.arg);
    IDS.forEach(function (p) {
      var el = document.getElementById('p-' + p);
      if (el) el.hidden = p !== r.page;
    });
    $$('[data-nav]').forEach(function (a) {
      if (a.dataset.nav === PAGES[r.page]) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }

  function go(first) {
    var r = parse();
    if (nav) nav.classList.remove('open');
    if (burger) burger.setAttribute('aria-expanded', 'false');

    var done = function () {
      FX.scan();
      var page = document.getElementById('p-' + r.page);
      if (page && !first) page.focus({ preventScroll: true });
    };
    var apply = function () {
      paint(r);
      window.scrollTo({ top: 0, behavior: 'auto' });
      FX.scan();   /* phần đầu trang mới hiện sẵn, không chớp một nhịp trống */
    };

    if (first || !document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      apply(); done(); return;
    }
    document.startViewTransition(apply).finished.finally(done);
  }

  addEventListener('hashchange', function () { go(false); });
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[data-route]');
    if (a && a.getAttribute('href') === location.hash) { e.preventDefault(); go(false); }
  });

  /* ================================================================ MENU MOBILE */
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
    });
  }
  document.addEventListener('click', function (e) {
    if (!nav || !nav.classList.contains('open')) return;
    if (e.target.closest('#mainnav') || e.target.closest('#burger')) return;
    nav.classList.remove('open');
    if (burger) burger.setAttribute('aria-expanded', 'false');
  });

  /* =================================================================== ACCORDION */
  document.addEventListener('click', function (e) {
    var hd = e.target.closest('.row-item .hd');
    if (!hd) return;
    var item = hd.closest('.row-item');
    var open = item.classList.toggle('open');
    hd.setAttribute('aria-expanded', String(open));
  });

  /* =================================================================== HỘP THOẠI */
  var formDlg = $('#formDialog'), infoDlg = $('#infoDialog');
  var leadForm = $('#leadForm'), formFields = $('#form-fields'), formDone = $('#form-done');
  var formFoot = $('.dlg-foot', leadForm);

  /* Mỗi biến thể form đổi cả tiêu đề lẫn cột ưu đãi bên trái, để người xem
     thấy ngay lý do nên để lại số điện thoại. */
  var PERK = {
    thu: ['Đo body miễn phí', 'Chỉ số mỡ, cơ, mất cân bằng tư thế'],
    one: ['Huấn luyện viên 1:1', 'Một buổi tập riêng, không ghép nhóm'],
    giu: ['Giữ ưu đãi 7 ngày', 'Chưa cần quyết định ngay trong buổi đầu'],
    gia: ['Bảng giá đầy đủ', 'Cả Pilates, Fitness và gói kết hợp'],
    uud: ['Ưu đãi đang chạy', 'Mức giảm theo từng gói, cập nhật trong tháng'],
    tuv: ['Tư vấn không ép mua', 'Chọn gói hợp ngân sách, không gọi làm phiền'],
    hos: ['Hồ sơ nhượng quyền', 'Mô hình tài chính và danh mục thiết bị'],
    kha: ['Khảo sát mặt bằng', 'Đánh giá vị trí bạn đang cân nhắc'],
    set: ['Lộ trình setup', 'Từ thiết kế, lắp máy đến khai trương'],
    bao: ['Báo giá trọn gói', 'Gồm vận chuyển và lắp đặt tận nơi'],
    xem: ['Xem máy trực tiếp', 'Đặt lịch tới showroom dùng thử'],
    bah: ['Bảo hành 24 tháng', 'Có sẵn linh kiện thay thế trong nước'],
    gia2: ['Lộ trình học rõ ràng', 'Số buổi, học phí và lịch khai giảng'],
    chc: ['Chứng chỉ được công nhận', 'Dùng để đi dạy tại hệ thống studio'],
    vie: ['Giới thiệu việc làm', 'Ưu tiên học viên tốt nghiệp loại khá trở lên'],
    luo: ['Lương trong lúc học việc', 'Trả lương ngay từ giai đoạn trợ giảng'],
    dtz: ['Đào tạo từ đầu', 'Nhận cả ứng viên chưa có chứng chỉ'],
    mtr: ['Môi trường ổn định', 'Ba cơ sở, lịch dạy chia theo nguyện vọng']
  };

  var FORMS = {
    'tu-van':       { t: 'Đăng ký tư vấn', s: 'Để lại thông tin, Emma gọi lại trong giờ làm việc.', topic: 'tu-van',
                      k: 'Tư vấn miễn phí', at: 'Chọn đúng gói ngay từ đầu', as: 'Tư vấn viên hỏi mục tiêu và lịch rảnh của bạn trước khi gợi ý gói tập, không chào bán máy móc.',
                      pk: ['tuv', 'gia', 'giu'] },
    'tap-thu':      { t: 'Đặt lịch tập thử', s: 'Buổi đầu tiên miễn phí: đo body và tư vấn lộ trình cùng Health Coach.', topic: 'tap-thu',
                      k: 'Ưu đãi tháng này', at: 'Buổi tập thử 1:1 miễn phí', as: 'Kèm đo chỉ số cơ thể và tư vấn lộ trình riêng. Số suất mỗi tuần có hạn theo từng cơ sở.',
                      pk: ['thu', 'one', 'giu'] },
    'tham-quan':    { t: 'Đặt lịch tham quan', s: 'Có huấn luyện viên dẫn đi xem phòng tập và giải thích từng loại máy.', topic: 'tham-quan',
                      k: 'Tham quan cơ sở', at: 'Xem tận nơi trước khi quyết định', as: 'Huấn luyện viên dẫn đi một vòng, giải thích từng loại máy và cách buổi tập diễn ra.',
                      pk: ['xem', 'tuv', 'giu'] },
    'bang-gia':     { t: 'Nhận bảng giá chi tiết', s: 'Emma gửi bảng giá đầy đủ của cả Pilates và Fitness qua Zalo.', topic: 'bang-gia',
                      k: 'Bảng giá đầy đủ', at: 'Nhận bảng giá qua Zalo', as: 'Gồm toàn bộ gói buổi, gói tháng, PT 1:1 và các ưu đãi đang áp dụng trong tháng.',
                      pk: ['gia', 'uud', 'tuv'] },
    'dao-tao':      { t: 'Tư vấn khoá đào tạo', s: 'Giảng viên Emma Academy gọi lại tư vấn lộ trình phù hợp với bạn.', topic: 'dao-tao',
                      k: 'Emma Academy', at: 'Học để đi dạy, không học cho biết', as: 'Giảng viên trao đổi trực tiếp về nền tảng hiện tại của bạn rồi mới gợi ý khoá phù hợp.',
                      pk: ['gia2', 'chc', 'vie'] },
    'nhuong-quyen': { t: 'Nhận hồ sơ nhượng quyền', s: 'Hồ sơ gồm mô hình tài chính, danh mục thiết bị và lộ trình setup.', topic: 'nhuong-quyen',
                      k: 'Hợp tác nhượng quyền', at: 'Nhận hồ sơ nhượng quyền', as: 'Bộ hồ sơ gửi qua email trong 24 giờ làm việc, kèm lịch hẹn trao đổi với bộ phận phát triển.',
                      pk: ['hos', 'kha', 'set'] },
    'may-tap':      { t: 'Báo giá máy tập', s: 'Báo giá thiết bị Care Pilates kèm chi phí vận chuyển và lắp đặt.', topic: 'may-tap',
                      k: 'Thiết bị Care Pilates', at: 'Báo giá theo số lượng bạn cần', as: 'Mua từ 3 máy trở lên có mức giá riêng, kèm khảo sát mặt bằng trước khi giao.',
                      pk: ['bao', 'bah', 'xem'] },
    'tuyen-dung':   { t: 'Ứng tuyển', s: 'Emma nhận cả ứng viên chưa có chứng chỉ và đào tạo từ đầu.', topic: 'tuyen-dung',
                      k: 'Gia nhập Emma', at: 'Chưa có chứng chỉ vẫn nộp được', as: 'Emma đào tạo từ đầu và trả lương ngay trong thời gian trợ giảng.',
                      pk: ['dtz', 'luo', 'mtr'] },
    'auto':         { t: 'Đăng ký nhận ưu đãi', s: 'Để lại số điện thoại, Emma giữ cho bạn 01 buổi đo body và tập thử 1:1 trong tuần này.', topic: 'tap-thu',
                      k: 'Ưu đãi dành cho bạn', at: 'Buổi tập thử 1:1 miễn phí', as: 'Kèm đo chỉ số cơ thể và tư vấn lộ trình riêng. Số suất mỗi tuần có hạn theo từng cơ sở.',
                      pk: ['thu', 'one', 'giu'] }
  };

  var leadSeen = false;
  function remember() {
    leadSeen = true;
    try { sessionStorage.setItem('emma-lead', '1'); } catch (err) { /* chế độ riêng tư */ }
  }
  try { leadSeen = sessionStorage.getItem('emma-lead') === '1'; } catch (err) { leadSeen = false; }

  var TICK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 13 5 5L20 7"/></svg>';

  function openForm(kind, job) {
    var cfg = FORMS[kind] || FORMS['tu-van'];
    $('#form-kicker').textContent = cfg.k;
    $('#form-aside-title').textContent = cfg.at;
    $('#form-aside-sub').textContent = cfg.as;
    $('#form-perks').innerHTML = cfg.pk.map(function (key) {
      var x = PERK[key];
      return '<li>' + TICK + '<span><b>' + esc(x[0]) + '</b>' + esc(x[1]) + '</span></li>';
    }).join('');
    $('#form-title').textContent = cfg.t;
    $('#form-sub').textContent = cfg.s;
    $('#f-topic').value = cfg.topic;
    $('#f-note').value = job ? 'Ứng tuyển vị trí: ' + job : '';
    formFields.hidden = false;
    formFoot.hidden = false;
    formDone.hidden = true;
    if (!formDlg.open) formDlg.showModal();
    remember();
    setTimeout(function () { $('#f-name').focus(); }, 60);
  }

  /* form tự hiện sau 15 giây cho khách chưa để lại thông tin */
  setTimeout(function () {
    if (leadSeen || formDlg.open || infoDlg.open) return;
    if (document.visibilityState === 'hidden') return;
    openForm('auto', '');
  }, 15000);

  function row(dt, dd) { return '<div><dt>' + dt + '</dt><dd>' + dd + '</dd></div>'; }

  var INFO = {
    coach: function (id) {
      var c = byId(DATA.coaches, id);
      if (!c) return null;
      return {
        kicker: c.role, title: c.name, sub: c.branch + ' · ' + c.years + ' kinh nghiệm',
        foot: 'Tên, ảnh và chứng chỉ là nội dung mẫu, chờ khách cập nhật.',
        cta: 'tap-thu', ctaText: 'Đặt lịch với huấn luyện viên này',
        body:
          '<div class="profile">' +
            '<span class="portrait"><span class="mono" aria-hidden="true">' + esc(c.mono) + '</span>' +
            '<span class="ph">Ảnh chân dung</span></span>' +
            '<div>' +
              '<div class="meta">' + c.certs.map(function (x) {
                return '<span class="tag">' + esc(x) + '</span>';
              }).join('') + '</div>' +
              '<p class="body">' + esc(c.bio) + '</p>' +
              '<dl class="spec" style="margin-top:18px">' +
                row('Thế mạnh', esc(c.focus)) +
                row('Cơ sở đang dạy', esc(c.branch)) +
                row('Kinh nghiệm', esc(c.years)) +
              '</dl>' +
            '</div>' +
          '</div>'
      };
    }
  };

  function openInfo(kind, id) {
    var make = INFO[kind];
    if (!make) return;
    var d = make(id);
    if (!d) return;
    $('#info-kicker').textContent = d.kicker;
    $('#info-title').textContent = d.title;
    $('#info-sub').textContent = d.sub;
    $('#info-body').innerHTML = d.body;
    $('#info-foot').textContent = d.foot;
    var cta = $('#info-cta');
    cta.innerHTML = esc(d.ctaText) + ' <span class="ar">\u2192</span>';
    cta.dataset.form = d.cta;
    if (!infoDlg.open) infoDlg.showModal();
  }

  document.addEventListener('click', function (e) {
    var f = e.target.closest('[data-form]');
    if (f) {
      if (infoDlg.open) infoDlg.close();
      openForm(f.dataset.form, f.dataset.job || '');
      return;
    }
    var i = e.target.closest('[data-info]');
    if (i) { openInfo(i.dataset.info, i.dataset.id); return; }
    var c = e.target.closest('[data-close]');
    if (c) { var dlg = c.closest('dialog'); if (dlg) dlg.close(); }
  });

  $('#form-x').addEventListener('click', function () { formDlg.close(); });
  $('#info-x').addEventListener('click', function () { infoDlg.close(); });
  formDlg.addEventListener('close', remember);

  leadForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = $('#f-name').value.trim();
    $('#form-done-text').textContent = name
      ? 'Cảm ơn ' + name + '. Emma sẽ gọi lại trong giờ làm việc 06:00 – 21:00, Thứ 2 – Thứ 7.'
      : 'Emma sẽ gọi lại trong giờ làm việc 06:00 – 21:00, Thứ 2 – Thứ 7.';
    formFields.hidden = true;
    formFoot.hidden = true;
    formDone.hidden = false;
    leadForm.reset();
    remember();
  });

  /* đóng khi bấm ra ngoài, cho trình duyệt chưa hỗ trợ thuộc tính closedby */
  if (!('closedBy' in HTMLDialogElement.prototype)) {
    $$('dialog[closedby="any"]').forEach(function (dlg) {
      var downOutside = false;
      var outside = function (ev) {
        var r = dlg.getBoundingClientRect();
        return ev.clientX < r.left || ev.clientX > r.right || ev.clientY < r.top || ev.clientY > r.bottom;
      };
      dlg.addEventListener('pointerdown', function (ev) { downOutside = outside(ev); });
      dlg.addEventListener('pointerup', function (ev) { if (downOutside && outside(ev)) dlg.close(); });
    });
  }

  var sync = function (el) {
    if (!el || !el.matches || !el.matches('input,select,textarea')) return;
    try { el.setAttribute('aria-invalid', el.matches(':user-invalid') ? 'true' : 'false'); } catch (err) { /* bỏ qua */ }
  };
  document.addEventListener('blur', function (e) { sync(e.target); }, true);
  document.addEventListener('input', function (e) {
    if (e.target.hasAttribute && e.target.hasAttribute('aria-invalid')) sync(e.target);
  });

  /* Bật nhãn tên trường quản trị trên từng khối, phục vụ bước dựng WordPress. */
  (function cmsLabels() {
    var btn = $('#cms-toggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var on = btn.getAttribute('aria-pressed') !== 'true';
      btn.setAttribute('aria-pressed', String(on));
      document.documentElement.classList.toggle('cms', on);
      btn.lastChild.nodeValue = on ? 'Ẩn trường quản trị' : 'Hiện trường quản trị';
    });
  })();

  /* ================================================================= KHỞI ĐỘNG */
  go(true);
  FX.init();
})();
