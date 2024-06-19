import type { PlainScheduleDayItem, ScheduleDayItem } from "~/types";

export function dateToTimeIndex(d: Date) {
  const hours = d.getHours() || 24;
  const minutes = d.getMinutes() / 60;
  return hours + minutes;
}

export function timeIndexToTimeString(index: number) {
  const hours = Math.floor(index);
  const minutes = (index % 1) * 60;
  return `${hours}:${minutes < 10 ? "0" : ""}${minutes.toFixed()}`;
}

export function dateRangeToTimeIndex(dates: [Date, Date]) {
  return dates.map(dateToTimeIndex) as [number, number];
}

export function toPlainItem({
  startDate,
  endDate,
  ...item
}: ScheduleDayItem): PlainScheduleDayItem {
  return {
    ...item,
    timeRange: dateRangeToTimeIndex([startDate, endDate]),
    day: startDate.getDay() || 7,
  };
}
