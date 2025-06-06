export function overdueDays(date1, date2) {
  let overdue = 0;
  if (date2 > date1) {
    const oneDay = 1000 * 60 * 60 * 24; // milliseconds in one day
    const diffInTime = Math.abs(new Date(date2) - new Date(date1));
    overdue = Math.ceil(diffInTime / oneDay);
  }
  return overdue;
}
