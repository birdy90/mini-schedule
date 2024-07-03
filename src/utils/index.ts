import {PlainScheduleDayItem, ScheduleDayItem} from "@/types";

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

export function timeIndexAndDayToDate(index: number, day: number): Date {
  const today = new Date();
  const hours = Math.floor(index);
  const minutes = (index % 1) * 60;
  const daysToNewDay = (7 - today.getDay() + day) % 7;

  const newDate = new Date();
  newDate.setDate(newDate.getDate() + daysToNewDay);
  newDate.setHours(hours);
  newDate.setMinutes(minutes);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);

  return newDate;
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

export function fromPlainItem({
  timeRange,
  day,
  preview,
  ...item
}: PlainScheduleDayItem): ScheduleDayItem {
  return {
    ...item,
    startDate: timeIndexAndDayToDate(timeRange[0], day),
    endDate: timeIndexAndDayToDate(timeRange[1], day),
  };
}
