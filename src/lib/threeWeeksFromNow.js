/**
 * Returns the date exactly three weeks (21 days) from today,
 * formatted as "YYYY-MM-DD 23:59:59".
 *
 * @returns {string} The date three weeks from now in "YYYY-MM-DD 23:59:59" format.
 */
export function threeWeeksFromNow() {
  const today = new Date();
  const threeWeeksLater = new Date(today);
  threeWeeksLater.setDate(today.getDate() + 21); // 3 weeks = 21 days
  return threeWeeksLater.toISOString().split("T")[0] + " 23:59:59"; // Returns in YYYY-MM-DD format
}
