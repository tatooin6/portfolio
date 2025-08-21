import { Milestone } from "@/app/components/Timeline";

const months: { [key: number]: string } = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

function titleFormat(incomingDate: Milestone["endDate"]) {
  if (!incomingDate) return "Present";
  const d =
    incomingDate instanceof Date ? incomingDate : new Date(incomingDate);
  if (isNaN(d.getTime())) return "-";
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export { titleFormat, formatDate };
