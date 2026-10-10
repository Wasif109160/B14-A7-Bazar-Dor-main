// Bengali numeral mapping
const banglaDigits: { [key: string]: string } = {
  '0': '০',
  '1': '১',
  '2': '২',
  '3': '৩',
  '4': '৪',
  '5': '৫',
  '6': '৬',
  '7': '৭',
  '8': '৮',
  '9': '৯',
};

const englishDigits: { [key: string]: string } = {
  '০': '0',
  '১': '1',
  '২': '2',
  '৩': '3',
  '৪': '4',
  '৫': '5',
  '৬': '6',
  '৭': '7',
  '৮': '8',
  '৯': '9',
};

/**
 * Converts any number or string with English digits into Bengali numerals.
 * Supports comma separation, decimals, and negative signs.
 */
export function toBanglaNumber(value: number | string | undefined | null): string {
  if (value === undefined || value === null) return '';
  const str = value.toString();
  return str.replace(/[0-9]/g, (digit) => banglaDigits[digit] || digit);
}

/**
 * Parses Bengali numeral string into standard JavaScript number.
 */
export function parseBanglaNumber(value: string): number {
  if (!value) return 0;
  const englishStr = value.replace(/[০-৯]/g, (digit) => englishDigits[digit] || digit).replace(/,/g, '');
  return parseFloat(englishStr) || 0;
}

/**
 * Formats a numeric price into Bengali format with commas (e.g. 1850 -> ১,৮৫০ টাকা)
 */
export function formatBanglaPrice(num: number | string): string {
  if (num === undefined || num === null) return '০ টাকা';
  const val = typeof num === 'string' ? parseFloat(num) : num;
  if (isNaN(val)) return `${toBanglaNumber(num)} টাকা`;
  const formatted = val.toLocaleString('en-US');
  return `${toBanglaNumber(formatted)} টাকা`;
}

/**
 * Returns formatted current Bangla date: e.g. "শনিবার, ১০ অক্টোবর, ২০২৬"
 */
export function getBanglaDate(): string {
  const banglaDays = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
  const banglaMonths = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];

  const now = new Date();
  const dayName = banglaDays[now.getDay()];
  const dateNum = toBanglaNumber(now.getDate());
  const monthName = banglaMonths[now.getMonth()];
  const yearNum = toBanglaNumber(now.getFullYear());

  return `${dayName}, ${dateNum} ${monthName}, ${yearNum}`;
}

/**
 * Map unit codes to Bangla text
 */
export function formatBanglaUnit(unit: string): string {
  switch (unit?.toLowerCase()) {
    case 'kg':
      return 'প্রতি কেজি';
    case 'liter':
    case 'litre':
    case 'l':
      return 'প্রতি লিটার';
    case 'dozen':
      return 'প্রতি ডজন';
    case 'piece':
    case 'pcs':
    case 'pc':
      return 'প্রতি পিস';
    default:
      return unit ? `প্রতি ${unit}` : 'প্রতি একক';
  }
}
