/**
 * Calculates the number of overdue days between two dates.
 *
 * @param {string|Date} date1 - The initial date (e.g., due date).
 * @param {string|Date} date2 - The date to compare (e.g., return date).
 * @returns {number} The number of overdue days. Returns 0 if date2 is not after date1.
 */
export function overdueDays(date1, date2) {
  let overdue = 0;
  if (date2 > date1) {
    const oneDay = 1000 * 60 * 60 * 24; // milliseconds in one day
    const diffInTime = Math.abs(new Date(date2) - new Date(date1));
    overdue = Math.ceil(diffInTime / oneDay);
  }
  return overdue;
}
