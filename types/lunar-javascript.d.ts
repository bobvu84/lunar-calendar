declare module 'lunar-javascript' {
  export class Solar {
    static fromYmd(year: number, month: number, day: number): Solar;
    static fromDate(date: Date): Solar;
    getYear(): number;
    getMonth(): number;
    getDay(): number;
    getLunar(): Lunar;
    getFestivals(): string[];
    getOtherFestivals(): string[];
  }

  export class Lunar {
    getYear(): number;
    /** Negative value indicates a leap (intercalary) month */
    getMonth(): number;
    getDay(): number;
    isLeap(): boolean;
    getMonthInChinese(): string;
    getDayInChinese(): string;
    getYearInGanZhi(): string;
    getMonthInGanZhi(): string;
    getDayInGanZhi(): string;
    getYearShengXiao(): string;
    /** Returns the name of the current solar term (节气), or empty string */
    getJieQi(): string;
    getFestivals(): string[];
    getOtherFestivals(): string[];
  }
}
