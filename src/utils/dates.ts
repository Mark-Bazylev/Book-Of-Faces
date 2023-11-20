import {
  formatDistanceToNow,
  format,
  isThisYear,
  isThisWeek,
  isThisMonth,
  differenceInMinutes,
} from 'date-fns';

export function getDayOfWeek(date: string) {
  const dayOfWeek = new Date(date).getDay();
  return isNaN(dayOfWeek)
    ? null
    : [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ][dayOfWeek];
}

export function getFormatedDate(date: string) {
  const timestamp = new Date(date);

  // Calculate the time difference

  const daysAgo = Math.floor(
    (Date.now() - timestamp.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysAgo <= 6) {
    return formatDistanceToNow(timestamp); // Use formatDistanceToNow for 3 to 6 days ago
  } else if (isThisWeek(timestamp)) {
    return format(timestamp, 'do MMMM'); // Day of the month and month name for last week
  } else if (isThisMonth(timestamp)) {
    return format(timestamp, 'do MMMM'); // Day of the month and month name for last month
  } else if (daysAgo >= 7 && daysAgo <= 31) {
    return format(timestamp, 'do MMMM'); // Day of the month and month name for this month
  } else if (isThisYear(timestamp)) {
    return format(timestamp, 'do MMMM yyyy'); // Day of the month, month name, and year
  } else {
    return format(timestamp, 'do MMMM yyyy'); // Day of the month, month name, and year for last year
  }

  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function isTimeGapExceeded(previousDate: string, currentDate: string) {
  const previousTime = new Date(previousDate);
  const currentTime = new Date(currentDate);

  const timeDifferenceMinutes = differenceInMinutes(currentTime, previousTime);

  return timeDifferenceMinutes > 5;
}
