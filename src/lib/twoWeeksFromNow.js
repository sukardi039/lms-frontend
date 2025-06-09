export function twoWeeksFromNow(moreDays) {
  const today = new Date();
  const twoWeeksLater = new Date(today);
  twoWeeksLater.setDate(today.getDate() + moreDays); // 2 weeks = 14 days
  return twoWeeksLater.toISOString().split("T")[0] + " 23:59:59"; // Returns in YYYY-MM-DD format
}
