/**
 * Returns a date string representing the date that is a specified number of days from today,
 * formatted as "YYYY-MM-DD 23:59:59".
 *
 * @param {number} moreDays - The number of days to add to the current date.
 * @returns {string} The resulting date in "YYYY-MM-DD 23:59:59" format.
 */
export function twoWeeksFromNow(moreDays) {
  const today = new Date();
  const twoWeeksLater = new Date(today);
  twoWeeksLater.setDate(today.getDate() + moreDays); // 2 weeks = 14 days
  return twoWeeksLater.toISOString().split("T")[0] + " 23:59:59"; // Returns in YYYY-MM-DD format
}
