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
  // Lunar festivals
  '春节':  'Tết Nguyên Đán',  '元宵节': 'Tết Nguyên Tiêu',
  '龙头节':'Lễ Thần Long',    '清明节': 'Thanh Minh',
  '端午节':'Tết Đoan Ngọ',    '七夕节': 'Thất Tịch',
  '中元节':'Vu Lan',          '中秋节': 'Tết Trung Thu',
  '重阳节':'Tết Trùng Cửu',   '腊八节': 'Lễ Lạp Bát',
  '除夕':  'Giao Thừa',
  // Other lunar
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
  '祭灶日':'Cúng Táo Quân',
  // Solar festivals
  '元旦':  'Tết Dương Lịch',  '妇女节': 'Ngày Phụ Nữ',
  '劳动节':'Ngày Lao Động',   '儿童节': 'Ngày Thiếu Nhi',
  '建党节':'Ngày Lập Đảng',   '建军节': 'Ngày Quân Đội',
  '教师节':'Ngày Nhà Giáo',   '国庆节': 'Quốc Khánh',
  '圣诞节':'Giáng Sinh',      '平安夜': 'Đêm Giáng Sinh',
  '情人节':'Valentine',       '愚人节': 'Ngày Cá Tháng Tư',
  '母亲节':'Ngày của Mẹ',     '父亲节': 'Ngày của Cha',
  '感恩节':'Lễ Tạ Ơn',        '万圣节': 'Halloween',
  '护士节':'Ngày Y Tá',       '植树节': 'Ngày Trồng Cây',
  '地球日':'Ngày Trái Đất',   '五四运动':'Ngày Thanh Niên',
  '消费者权益日': 'Quyền Người Tiêu Dùng',
  '青年节': 'Ngày Thanh Niên', '光棍节': 'Ngày Độc Thân',
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
