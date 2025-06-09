export function twoMoreWeeks(day, moreDays) {
  //   const today = new Date(day);
  const twoWeeksLater = new Date(day);
  //   console.log("this date:", day, twoWeeksLater);
  twoWeeksLater.setDate(twoWeeksLater.getDate() + moreDays); // 2 weeks = 14 days
  return twoWeeksLater.toISOString().split("T")[0] + " 23:59:59"; // Returns in YYYY-MM-DD format
}
