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
