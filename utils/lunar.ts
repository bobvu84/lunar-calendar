import { Solar } from 'lunar-javascript';

// ─── Vietnamese translation tables ──────────────────────────────────────────

const LUNAR_MONTHS_VI: Record<string, string> = {
  '正': 'Tháng Giêng',
  '二': 'Tháng Hai',
  '三': 'Tháng Ba',
  '四': 'Tháng Tư',
  '五': 'Tháng Năm',
  '六': 'Tháng Sáu',
  '七': 'Tháng Bảy',
  '八': 'Tháng Tám',
  '九': 'Tháng Chín',
  '十': 'Tháng Mười',
  '冬': 'Tháng Mười Một',
  '腊': 'Tháng Chạp',
};

const LUNAR_MONTHS_SHORT_VI: Record<string, string> = {
  '正': 'Th.Giêng',
  '二': 'Th.Hai',
  '三': 'Th.Ba',
  '四': 'Th.Tư',
  '五': 'Th.Năm',
  '六': 'Th.Sáu',
  '七': 'Th.Bảy',
  '八': 'Th.Tám',
  '九': 'Th.Chín',
  '十': 'Th.Mười',
  '冬': 'Th.11',
  '腊': 'Th.Chạp',
};

const LUNAR_DAYS_VI: Record<string, string> = {
  '初一': 'Mùng 1',  '初二': 'Mùng 2',  '初三': 'Mùng 3',
  '初四': 'Mùng 4',  '初五': 'Mùng 5',  '初六': 'Mùng 6',
  '初七': 'Mùng 7',  '初八': 'Mùng 8',  '初九': 'Mùng 9',
  '初十': 'Mùng 10', '十一': '11',       '十二': '12',
  '十三': '13',       '十四': '14',       '十五': 'Rằm',
  '十六': '16',       '十七': '17',       '十八': '18',
  '十九': '19',       '二十': '20',       '廿一': '21',
  '廿二': '22',       '廿三': '23',       '廿四': '24',
  '廿五': '25',       '廿六': '26',       '廿七': '27',
  '廿八': '28',       '廿九': '29',       '三十': '30',
};

const HEAVENLY_STEMS_VI: Record<string, string> = {
  '甲': 'Giáp', '乙': 'Ất',  '丙': 'Bính', '丁': 'Đinh',
  '戊': 'Mậu',  '己': 'Kỷ',  '庚': 'Canh', '辛': 'Tân',
  '壬': 'Nhâm', '癸': 'Quý',
};

const EARTHLY_BRANCHES_VI: Record<string, string> = {
  '子': 'Tý',   '丑': 'Sửu', '寅': 'Dần',  '卯': 'Mão',
  '辰': 'Thìn', '巳': 'Tỵ',  '午': 'Ngọ',  '未': 'Mùi',
  '申': 'Thân', '酉': 'Dậu', '戌': 'Tuất', '亥': 'Hợi',
};

const ZODIAC_VI: Record<string, string> = {
  '鼠': 'Chuột', '牛': 'Trâu', '虎': 'Hổ',   '兔': 'Mèo',
  '龙': 'Rồng',  '蛇': 'Rắn',  '马': 'Ngựa',  '羊': 'Dê',
  '猴': 'Khỉ',  '鸡': 'Gà',   '狗': 'Chó',   '猪': 'Heo',
};

const SOLAR_TERMS_VI: Record<string, string> = {
  '小寒': 'Tiểu Hàn',  '大寒': 'Đại Hàn',   '立春': 'Lập Xuân',
  '雨水': 'Vũ Thủy',   '惊蛰': 'Kinh Trập',  '春分': 'Xuân Phân',
  '清明': 'Thanh Minh','谷雨': 'Cốc Vũ',     '立夏': 'Lập Hạ',
  '小满': 'Tiểu Mãn',  '芒种': 'Mang Chủng', '夏至': 'Hạ Chí',
  '小暑': 'Tiểu Thử',  '大暑': 'Đại Thử',    '立秋': 'Lập Thu',
  '处暑': 'Xử Thử',    '白露': 'Bạch Lộ',    '秋分': 'Thu Phân',
  '寒露': 'Hàn Lộ',    '霜降': 'Sương Giáng','立冬': 'Lập Đông',
  '小雪': 'Tiểu Tuyết','大雪': 'Đại Tuyết',  '冬至': 'Đông Chí',
};

const FESTIVALS_VI: Record<string, string> = {
  // ── Tết & lễ âm lịch chính ──────────────────────────────────────────────
  '春节':  'Tết Nguyên Đán',  '元宵节': 'Tết Nguyên Tiêu',
  '龙头节':'Lễ Thần Long',    '清明节': 'Thanh Minh',
  '端午节':'Tết Đoan Ngọ',    '七夕节': 'Thất Tịch',
  '中元节':'Vu Lan',          '中秋节': 'Tết Trung Thu',
  '重阳节':'Tết Trùng Cửu',   '腊八节': 'Lễ Lạp Bát',
  '除夕':  'Giao Thừa',       '寒食节': 'Tết Hàn Thực',
  // ── Lễ âm lịch khác ─────────────────────────────────────────────────────
  '接神日': 'Cúng Thần',      '隔开日': 'Lễ Cách Khai',
  '人日':  'Nhân Nhật',       '谷日':   'Cốc Nhật',
  '顺星节':'Lễ Thuận Tinh',   '天日':   'Thiên Nhật',
  '地日':  'Địa Nhật',        '天穿节': 'Thiên Xuyên',
  '填仓节':'Lễ Điền Thương',  '正月晦': 'Cuối Tháng Giêng',
  '中和节':'Lễ Trung Hòa',    '社日节': 'Lễ Xã Nhật',
  '上巳节':'Lễ Thượng Tỵ',    '分龙节': 'Lễ Phân Long',
  '会龙节':'Lễ Hội Long',     '天贶节': 'Thiên Huống',
  '观莲节':'Lễ Quan Liên',    '五谷母节':'Ngũ Cốc Mẫu',
  '财神节':'Lễ Tài Thần',     '地藏节': 'Lễ Địa Tạng',
  '天灸日':'Thiên Cứu',       '寒衣节': 'Lễ Hàn Y',
  '十成节':'Lễ Thập Thành',   '下元节': 'Lễ Hạ Nguyên',
  '驱傩日':'Khu Na',          '尾牙':   'Tất Niên',
  '祭灶日':'Cúng Táo Quân',   '春社':   'Lễ Xuân Xã',
  '秋社':  'Lễ Thu Xã',
  // ── Lễ dương lịch quốc gia ──────────────────────────────────────────────
  '元旦':  'Tết Dương Lịch',  '妇女节': 'Ngày Phụ Nữ',
  '劳动节':'Ngày Lao Động',   '儿童节': 'Ngày Thiếu Nhi',
  '青年节':'Ngày Thanh Niên', '建党节': 'Ngày Lập Đảng',
  '建军节':'Ngày Quân Đội',   '教师节': 'Ngày Nhà Giáo',
  '国庆节':'Quốc Khánh',      '记者节': 'Ngày Nhà Báo',
  '女生节':'Ngày Nữ Sinh',    '男人节': 'Ngày Đàn Ông',
  '光棍节':'Ngày Độc Thân',   '程序员节':'Ngày Lập Trình Viên',
  // ── Lễ quốc tế phổ biến ─────────────────────────────────────────────────
  '圣诞节':'Giáng Sinh',      '平安夜': 'Đêm Giáng Sinh',
  '情人节':'Valentine',       '愚人节': 'Ngày Cá Tháng Tư',
  '母亲节':'Ngày của Mẹ',     '父亲节': 'Ngày của Cha',
  '感恩节':'Lễ Tạ Ơn',        '万圣节': 'Halloween',
  '万圣节前夜':'Đêm Halloween',
  '护士节':'Ngày Y Tá',       '植树节': 'Ngày Trồng Cây',
  '地球日':'Ngày Trái Đất',   '五四运动':'Ngày Thanh Niên',
  '消费者权益日':'Quyền Người Tiêu Dùng',
  // ── Các ngày Valentine biến thể ─────────────────────────────────────────
  '玫瑰情人节':'Valentine Hoa Hồng', '白色情人节':'Valentine Trắng',
  '黑色情人节':'Valentine Đen',      '绿色情人节':'Valentine Xanh',
  '网络情人节':'Valentine Online',   '亲亲情人节':'Valentine Hôn',
  '拥抱情人节':'Valentine Ôm',       '银色情人节':'Valentine Bạc',
  '葡萄酒情人节':'Valentine Rượu Vang','日记情人节':'Valentine Nhật Ký',
  '电影情人节':'Valentine Điện Ảnh', '相片情人节':'Valentine Ảnh',
  // ── Ngày sức khỏe & môi trường thế giới ────────────────────────────────
  '世界卫生日':'Ngày Y Tế Thế Giới',
  '世界无烟日':'Ngày Không Thuốc Lá',
  '世界艾滋病日':'Ngày AIDS Thế Giới',
  '世界抗癌日':'Ngày Phòng Chống Ung Thư',
  '世界睡眠日':'Ngày Ngủ Thế Giới',
  '世界肥胖日':'Ngày Béo Phì Thế Giới',
  '世界防治结核病日':'Ngày Phòng Chống Lao',
  '世界青光眼日':'Ngày Glaucoma Thế Giới',
  '世界环境日':'Ngày Môi Trường Thế Giới',
  '世界地球日':'Ngày Trái Đất Thế Giới',
  '世界水日':'Ngày Nước Thế Giới',
  '世界海洋日':'Ngày Đại Dương Thế Giới',
  '世界湿地日':'Ngày Đất Ngập Nước Thế Giới',
  '世界森林日':'Ngày Rừng Thế Giới',
  '世界清洁地球日':'Ngày Làm Sạch Trái Đất',
  '世界防治荒漠化与干旱日':'Ngày Chống Sa Mạc Hóa',
  '世界气象日':'Ngày Khí Tượng Thế Giới',
  // ── Ngày động vật & thiên nhiên ────────────────────────────────────────
  '世界动物日':'Ngày Động Vật Thế Giới',
  '世界野生动植物日':'Ngày Động Thực Vật Hoang Dã',
  '世界金枪鱼日':'Ngày Cá Ngừ Thế Giới',
  '国际珍稀动物保护日':'Ngày Bảo Vệ Động Vật Quý Hiếm',
  '国际海豹日':'Ngày Hải Cẩu Quốc Tế',
  // ── Ngày xã hội & nhân quyền thế giới ─────────────────────────────────
  '世界人权日':'Ngày Nhân Quyền Thế Giới',
  '世界人道主义日':'Ngày Nhân Đạo Thế Giới',
  '世界难民日':'Ngày Người Tị Nạn Thế Giới',
  '世界残疾人日':'Ngày Người Khuyết Tật Thế Giới',
  '世界弱能人士日':'Ngày Người Khuyết Tật Thế Giới',
  '世界住房日':'Ngày Nhà Ở Thế Giới',
  '世界扫盲日':'Ngày Xóa Mù Chữ Thế Giới',
  '世界粮食日':'Ngày Lương Thực Thế Giới',
  '世界老年人日':'Ngày Người Cao Tuổi Thế Giới',
  '世界社会公正日':'Ngày Công Bằng Xã Hội',
  '国际家庭日':'Ngày Gia Đình Quốc Tế',
  '国际老年人日':'Ngày Người Cao Tuổi Quốc Tế',
  '国际友谊日':'Ngày Hữu Nghị Quốc Tế',
  '国际幸福日':'Ngày Hạnh Phúc Quốc Tế',
  '国际青年节':'Ngày Thanh Niên Quốc Tế',
  '国际大学生节':'Ngày Sinh Viên Quốc Tế',
  '国际女童日':'Ngày Bé Gái Quốc Tế',
  '国际母语日':'Ngày Tiếng Mẹ Đẻ Quốc Tế',
  '国际土著人日':'Ngày Người Bản Địa Quốc Tế',
  '国际大屠杀纪念日':'Ngày Tưởng Niệm Holocaust',
  '国际接吻日':'Ngày Hôn Quốc Tế',
  '曼德拉国际日':'Ngày Mandela Quốc Tế',
  // ── Ngày hòa bình & an ninh ────────────────────────────────────────────
  '国际和平日':'Ngày Hòa Bình Quốc Tế',
  '国际非暴力日':'Ngày Bất Bạo Động Quốc Tế',
  '国际禁毒日':'Ngày Phòng Chống Ma Túy',
  '国际反腐败日':'Ngày Chống Tham Nhũng',
  '国际地雷行动日':'Ngày Hành Động Chống Mìn',
  '国际声援巴勒斯坦人民日':'Ngày Ủng Hộ Nhân Dân Palestine',
  '国际维和人员日':'Ngày Gìn Giữ Hòa Bình',
  '联合国宪章日':'Ngày Hiến Chương LHQ',
  // ── Ngày văn hóa & tri thức thế giới ──────────────────────────────────
  '世界读书日':'Ngày Đọc Sách Thế Giới',
  '世界新闻自由日':'Ngày Tự Do Báo Chí',
  '世界知识产权日':'Ngày Sở Hữu Trí Tuệ',
  '世界旅游日':'Ngày Du Lịch Thế Giới',
  '世界足球日':'Ngày Bóng Đá Thế Giới',
  '世界自行车日':'Ngày Xe Đạp Thế Giới',
  '世界骑行日':'Ngày Đạp Xe Thế Giới',
  '国际儿童图书日':'Ngày Sách Thiếu Nhi Quốc Tế',
  '国际电影节':'Ngày Điện Ảnh Quốc Tế',
  '国际瑜伽日':'Ngày Yoga Quốc Tế',
  '国际民主日':'Ngày Dân Chủ Quốc Tế',
  '国际宽容日':'Ngày Khoan Dung Quốc Tế',
  '世界人口日':'Ngày Dân Số Thế Giới',
  '世界统计日':'Ngày Thống Kê Thế Giới',
  '世界红十字日':'Ngày Chữ Thập Đỏ',
  '世界献血日':'Ngày Hiến Máu Thế Giới',
  '世界自闭症日':'Ngày Tự Kỷ Thế Giới',
  '世界发展信息日':'Ngày Thông Tin Phát Triển',
  '世界海啸日':'Ngày Sóng Thần Thế Giới',
  '世界安全生产与健康日':'Ngày An Toàn Lao Động',
  '世界航天日':'Ngày Hàng Không Vũ Trụ',
  '国际山岳日':'Ngày Núi Quốc Tế',
  '国际臭氧层保护日':'Ngày Bảo Vệ Tầng Ozone',
  '国际生物多样性日':'Ngày Đa Dạng Sinh Học',
  '国际移徙者日':'Ngày Người Di Cư Quốc Tế',
  '国际志愿人员日':'Ngày Tình Nguyện Viên Quốc Tế',
  '国际气象节':'Ngày Khí Tượng Quốc Tế',
  '国际民航日':'Ngày Hàng Không Dân Dụng',
  '国际海关日':'Ngày Hải Quan Quốc Tế',
  '国际航海日':'Ngày Hàng Hải Quốc Tế',
  '国际减轻自然灾害日':'Ngày Giảm Nhẹ Thiên Tai',
  '国际消除种族歧视日':'Ngày Chống Phân Biệt Chủng Tộc',
  '儿童预防接种宣传日':'Ngày Tiêm Chủng Trẻ Em',
  '世界厕所日':'Ngày Vệ Sinh Thế Giới',
  '525心理健康节':'Ngày Sức Khỏe Tâm Thần',
  // ── Ngày toàn quốc (Trung Quốc) ───────────────────────────────────────
  '全国防灾减灾日':'Ngày Phòng Chống Thiên Tai',
  '全国爱眼日':'Ngày Chăm Sóc Mắt',
  '全国爱耳日':'Ngày Chăm Sóc Tai',
  '全国爱牙日':'Ngày Chăm Sóc Răng',
  '全国爱肝日':'Ngày Chăm Sóc Gan',
  '全国助残日':'Ngày Hỗ Trợ Người Khuyết Tật',
  '全国土地日':'Ngày Đất Đai',
  '全国交通安全日':'Ngày An Toàn Giao Thông',
  '全国交通安全反思日':'Ngày Phản Tư An Toàn Giao Thông',
  '全国消防日':'Ngày Phòng Cháy Chữa Cháy',
  '全国扶贫日':'Ngày Xóa Đói Giảm Nghèo',
  '全国疟疾日':'Ngày Phòng Chống Sốt Rét',
  '全民健身日':'Ngày Thể Dục Toàn Dân',
  '全民国家安全教育日':'Ngày Giáo Dục An Ninh Quốc Gia',
  '全民国防教育日':'Ngày Giáo Dục Quốc Phòng',
  '全国法制宣传日':'Ngày Tuyên Truyền Pháp Luật',
  '全国中小学生安全教育日':'Ngày An Toàn Học Sinh',
  '全国爱国卫生运动日':'Ngày Vệ Sinh Yêu Nước',
  '全国科技人才活动日':'Ngày Nhân Tài KH&CN',
  '全国拒绝酒驾日':'Ngày Chống Lái Xe Say Rượu',
  '全国测绘法宣传日':'Ngày Tuyên Truyền Luật Đo Đạc',
  '中华慈善日':'Ngày Từ Thiện',
  '中国旅游日':'Ngày Du Lịch',
  '中国医师节':'Ngày Thầy Thuốc',
  '中国人民警察节':'Ngày Cảnh Sát Nhân Dân',
  '中国航天日':'Ngày Hàng Không Vũ Trụ',
  '中国航海日':'Ngày Hàng Hải',
  '中国人口日':'Ngày Dân Số',
  '中国烈士纪念日':'Ngày Tưởng Niệm Liệt Sĩ',
  '中国青年志愿者服务日':'Ngày Tình Nguyện Viên Thanh Niên',
  '中国少年先锋队诞辰日':'Ngày Đội Thiếu Niên Tiền Phong',
  '上海解放日':'Ngày Giải Phóng Thượng Hải',
  '国家公祭日':'Ngày Quốc Gia Tưởng Niệm',
  '香港回归纪念日':'Kỷ Niệm Hồng Kông Trở Về',
  // ── Kỷ niệm lịch sử ───────────────────────────────────────────────────
  '七七事变纪念日':'Kỷ Niệm Sự Kiện 7/7',
  '九一八事变纪念日':'Kỷ Niệm Sự Kiện 18/9',
  '西安事变纪念日':'Kỷ Niệm Sự Kiện Tây An',
  '辛亥革命纪念日':'Kỷ Niệm Cách Mạng Tân Hợi',
  '中国抗日战争胜利纪念日':'Kỷ Niệm Thắng Lợi Chống Nhật',
  '抗美援朝纪念日':'Kỷ Niệm Chiến Tranh Triều Tiên',
  '中国五卅运动纪念日':'Kỷ Niệm Phong Trào 30/5',
  '中国黄花岗七十二烈士殉难纪念日':'Kỷ Niệm 72 Liệt Sĩ Hoàng Hoa Cương',
  '京汉铁路罢工纪念日':'Kỷ Niệm Bãi Công Đường Sắt',
  '第三世界青年日':'Ngày Thanh Niên Thế Giới Thứ Ba',
  // ── Kỷ niệm sinh nhật / ngày mất danh nhân ────────────────────────────
  '马克思诞辰纪念日':'Kỷ Niệm Sinh Nhật Marx',
  '马克思逝世纪念日':'Kỷ Niệm Ngày Mất Marx',
  '列宁诞辰纪念日':'Kỷ Niệm Sinh Nhật Lenin',
  '列宁逝世纪念日':'Kỷ Niệm Ngày Mất Lenin',
  '恩格斯诞辰纪念日':'Kỷ Niệm Sinh Nhật Engels',
  '恩格斯逝世纪念日':'Kỷ Niệm Ngày Mất Engels',
  '毛泽东诞辰纪念日':'Kỷ Niệm Sinh Nhật Mao Trạch Đông',
  '毛泽东逝世纪念日':'Kỷ Niệm Ngày Mất Mao Trạch Đông',
  '邓小平诞辰纪念日':'Kỷ Niệm Sinh Nhật Đặng Tiểu Bình',
  '邓小平逝世纪念日':'Kỷ Niệm Ngày Mất Đặng Tiểu Bình',
  '周恩来诞辰纪念日':'Kỷ Niệm Sinh Nhật Chu Ân Lai',
  '周恩来逝世纪念日':'Kỷ Niệm Ngày Mất Chu Ân Lai',
  '朱德逝世纪念日':'Kỷ Niệm Ngày Mất Chu Đức',
  '孙中山诞辰纪念日':'Kỷ Niệm Sinh Nhật Tôn Trung Sơn',
  '孙中山逝世纪念日':'Kỷ Niệm Ngày Mất Tôn Trung Sơn',
};

// ─── Translation helpers ─────────────────────────────────────────────────────

function translateGanZhi(cn: string): string {
  return cn
    .split('')
    .map(c => HEAVENLY_STEMS_VI[c] ?? EARTHLY_BRANCHES_VI[c] ?? c)
    .join(' ');
}

function translateFestivals(list: string[]): string[] {
  return list.map(f => {
    if (FESTIVALS_VI[f]) return FESTIVALS_VI[f];
    const key = Object.keys(FESTIVALS_VI).find(k => f.startsWith(k));
    return key ? FESTIVALS_VI[key] : f;
  });
}

function translateSolarTerms(list: string[]): string[] {
  return list.map(t => SOLAR_TERMS_VI[t] ?? t);
}

// ─── Public interfaces ───────────────────────────────────────────────────────

export interface LunarDayInfo {
  lunarYear: number;
  lunarMonth: number;
  lunarDay: number;
  lunarMonthStr: string;      // Tháng Giêng, Tháng Hai ...
  lunarMonthShort: string;    // Th.Giêng (for small cells)
  lunarDayStr: string;        // Mùng 1, Rằm, 16 ...
  isLeapMonth: boolean;
  ganZhiYear: string;         // Giáp Thìn, Ất Tỵ ...
  ganZhiMonth: string;
  ganZhiDay: string;
  zodiac: string;             // Rồng, Hổ, Mèo ...
  festivals: string[];        // Tết Nguyên Đán ...
  solarTerms: string[];       // Lập Xuân, Xuân Phân ...
  solarFestivals: string[];   // Tết Dương Lịch ...
  lunarFull: string;          // Mùng 1 Tháng Giêng, Năm Giáp Thìn
  isFirstDayOfMonth: boolean;
}

export interface CalendarDay {
  date: Date;
  solarDay: number;
  solarMonth: number;
  solarYear: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  lunar: LunarDayInfo;
  displayLabel: string;
  labelType: 'festival' | 'solarTerm' | 'lunar' | 'leapMonth';
}

// ─── Core functions ──────────────────────────────────────────────────────────

export function getLunarInfo(year: number, month: number, day: number): LunarDayInfo {
  const solar = Solar.fromYmd(year, month, day);
  const lunar = solar.getLunar();

  const lunarYear  = lunar.getYear();
  const lunarMonth = lunar.getMonth();
  const lunarDay   = lunar.getDay();
  const isLeapMonth = lunarMonth < 0;

  // Get the raw Chinese strings from the library, then translate to Vietnamese
  const rawMonthCn = lunar.getMonthInChinese().replace('闰', '');
  const rawDayCn   = lunar.getDayInChinese();
  const rawZodiac  = lunar.getYearShengXiao();

  const lunarMonthStr   = (isLeapMonth ? 'Nhuận ' : '') + (LUNAR_MONTHS_VI[rawMonthCn]    ?? rawMonthCn);
  const lunarMonthShort = (isLeapMonth ? 'Nh.'    : '') + (LUNAR_MONTHS_SHORT_VI[rawMonthCn] ?? rawMonthCn);
  const lunarDayStr     = LUNAR_DAYS_VI[rawDayCn] ?? rawDayCn;
  const zodiac          = ZODIAC_VI[rawZodiac]    ?? rawZodiac;

  const ganZhiYear  = translateGanZhi(lunar.getYearInGanZhi());
  const ganZhiMonth = translateGanZhi(lunar.getMonthInGanZhi());
  const ganZhiDay   = translateGanZhi(lunar.getDayInGanZhi());

  const festivals      = translateFestivals([...lunar.getFestivals(), ...lunar.getOtherFestivals()]);
  const solarFestivals = translateFestivals([...solar.getFestivals(), ...solar.getOtherFestivals()]);
  const solarTerms     = translateSolarTerms(lunar.getJieQi() ? [lunar.getJieQi()] : []);

  const isFirstDayOfMonth = Math.abs(lunarDay) === 1;
  const leapPrefix = isLeapMonth ? ' (Nhuận)' : '';
  const lunarFull = `${lunarDayStr} ${lunarMonthStr}${leapPrefix}, Năm ${ganZhiYear}`;

  return {
    lunarYear, lunarMonth, lunarDay,
    lunarMonthStr, lunarMonthShort, lunarDayStr,
    isLeapMonth, ganZhiYear, ganZhiMonth, ganZhiDay,
    zodiac, festivals, solarTerms, solarFestivals,
    lunarFull, isFirstDayOfMonth,
  };
}

export function buildCalendarMonth(year: number, month: number): CalendarDay[] {
  const today  = new Date();
  const todayY = today.getFullYear();
  const todayM = today.getMonth() + 1;
  const todayD = today.getDate();

  const firstDay = new Date(year, month - 1, 1);
  const lastDay  = new Date(year, month, 0);

  const startOffset = firstDay.getDay();
  const totalCells  = Math.ceil((startOffset + lastDay.getDate()) / 7) * 7;

  const days: CalendarDay[] = [];

  for (let i = 0; i < totalCells; i++) {
    const d  = new Date(year, month - 1, 1 - startOffset + i);
    const y  = d.getFullYear();
    const m  = d.getMonth() + 1;
    const dy = d.getDate();
    const isCurrentMonth = m === month && y === year;
    const isToday = y === todayY && m === todayM && dy === todayD;

    const lunar = getLunarInfo(y, m, dy);

    const absMonth = Math.abs(lunar.lunarMonth);
    const absDay   = Math.abs(lunar.lunarDay);

    let displayLabel: string;
    let labelType: CalendarDay['labelType'] = 'lunar';

    if (lunar.isFirstDayOfMonth && absMonth !== 1) {
      displayLabel = `1/${absMonth}`;
      labelType = 'leapMonth';
    } else if (absMonth === 1) {
      displayLabel = lunar.lunarDayStr; // Mùng 1…Mùng 10, Rằm, 11…30
    } else {
      displayLabel = String(absDay);
    }

    days.push({ date: d, solarDay: dy, solarMonth: m, solarYear: y, isCurrentMonth, isToday, lunar, displayLabel, labelType });
  }

  return days;
}

export function formatMonthYear(year: number, month: number): string {
  const MONTHS_VI = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4',
    'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
    'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',
  ];
  return `${MONTHS_VI[month - 1]}, ${year}`;
}

export function getTodayLunarInfo(): LunarDayInfo {
  const t = new Date();
  return getLunarInfo(t.getFullYear(), t.getMonth() + 1, t.getDate());
}
