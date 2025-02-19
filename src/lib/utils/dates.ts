import { format as dateFnsFormat, formatDistanceToNow, formatRelative } from 'date-fns';
import { enUS, vi } from 'date-fns/locale';

type Locale = 'en' | 'vi';

export function getLocale(locale?: Locale | string) {
  switch (locale) {
    case 'vi':
      return vi;
    default:
      return enUS;
  }
}


export const getExpiryStatus = (expiryDate: string): string => {
  const currentDate = new Date();
  const expiry = new Date(expiryDate);

  if (expiry > currentDate) {
    const difference = expiry.getTime() - currentDate.getTime();
    const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));

    return daysLeft <= 7 ? "Active":  "Upcoming";
  } else {
    return "Expired";
  }
};


export const compareExpiryDate = (dateApplicant: string, dateOfJob: string): string => {
  const compareDate = new Date(dateOfJob);
  const expiry = new Date(dateApplicant);

  if (compareDate > expiry) {
    const difference = expiry.getTime() - compareDate.getTime();
    const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));

    return daysLeft <= 7 ? "Active":  "Upcoming";
  } else {
    return "Expired";
  }
};
export function formatRelativeTime(date: Date, baseDate: Date, locale?: Locale) {
  const format = formatRelative(date, baseDate, { locale: getLocale(locale) });
  return format[0].toLocaleUpperCase(locale) + format.substring(1);
}

export function formatRelativeTimeFromNow(date: Date, locale?: Locale) {
  return formatRelativeTime(date, new Date(), locale);
}

export function formatRelativeDateFromNowAndDistanceDate(date: Date, locale?: Locale | string) {
  return formatDistanceToNow(date, {addSuffix: true, locale: getLocale(locale)})
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