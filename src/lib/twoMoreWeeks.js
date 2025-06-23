/**
 * Returns a date string representing the date after adding a specified number of days to the given date,
 * formatted as "YYYY-MM-DD 23:59:59".
 *
 * @param {string|Date} day - The starting date, either as a Date object or a date string parseable by Date.
 * @param {number} moreDays - The number of days to add to the starting date.
 * @returns {string} The resulting date in "YYYY-MM-DD 23:59:59" format.
 */
export function twoMoreWeeks(day, moreDays) {
  //   const today = new Date(day);
  const twoWeeksLater = new Date(day);
  //   console.log("this date:", day, twoWeeksLater);
  twoWeeksLater.setDate(twoWeeksLater.getDate() + moreDays); // 2 weeks = 14 days
  return twoWeeksLater.toISOString().split("T")[0] + " 23:59:59"; // Returns in YYYY-MM-DD format
}
