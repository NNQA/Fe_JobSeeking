import { format as dateFnsFormat, formatRelative } from 'date-fns';
import { enUS } from 'date-fns/locale';

type Locale = 'en';

export function getLocale(locale?: Locale) {
  switch (locale) {
    case 'en':
      return enUS;
    default:
      return enUS;
  }
}

export function formatRelativeTime(date: Date, baseDate: Date, locale?: Locale) {
  const format = formatRelative(date, baseDate, { locale: getLocale(locale) });
  return format[0].toLocaleUpperCase(locale) + format.substring(1);
}

export function formatRelativeTimeFromNow(date: Date, locale?: Locale) {
  return formatRelativeTime(date, new Date(), locale);
}

export const parseDateFromArray = (dateArray: number[]) => {
  if (dateArray && dateArray.length >= 3) {
    const [year, month, day, hour = 0, minute = 0] = dateArray;
    return new Date(year, month - 1, day, hour, minute); // month - 1 vì tháng trong JS bắt đầu từ 0
  }
  return null;
};

// export function parseDateFromAbsolute(input: string) {
//   return toCalendarDate(parseAbsoluteToLocal(input));
// }

export function formatDate(date: Date, format: string = 'MM/dd/yyyy') {
  return dateFnsFormat(date, format);
}

export function formatDateTime(date: Date, format: string = 'MM/dd/yyyy HH:mm') {
  return formatDate(date, format);
}