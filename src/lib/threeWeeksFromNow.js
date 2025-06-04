export function threeWeeksFromNow() {
  const today = new Date();
  const threeWeeksLater = new Date(today);
  threeWeeksLater.setDate(today.getDate() + 21); // 3 weeks = 21 days
  return threeWeeksLater.toISOString().split("T")[0] + " 23:59:58"; // Returns in YYYY-MM-DD format
}
