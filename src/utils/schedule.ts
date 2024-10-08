import {
  ItemTimeRange,
  ScheduleDayItem,
  ScheduleDayItemPayload,
  SimplifiedScheduleDayItem,
} from "@/types";
import { calendarSettings } from "@/data";

export function datetimeToTimeIndex(d: Date) {
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
  return dates.map(datetimeToTimeIndex) as ItemTimeRange;
}

export function timeIndexAndDayToDate(index: number, day: number): Date {
  const today = new Date();
  const hours = Math.floor(index);
  const minutes = (index % 1) * 60;
  const daysToNewDay = (7 - today.getDay() + day) % 7;

  today.setDate(today.getDate() + daysToNewDay);
  today.setHours(hours);
  today.setMinutes(minutes);
  today.setSeconds(0);
  today.setMilliseconds(0);

  return today;
}

export const timeIndexToOffsetPercentage = (index: number) => {
  const dayDuration = calendarSettings.endTime - calendarSettings.startTime;
  const itemOffset = index - calendarSettings.startTime;
  return (itemOffset / dayDuration) * 100;
};

export function toSimplifiedItem({
  startDate,
  endDate,
  ...item
}: ScheduleDayItem): SimplifiedScheduleDayItem {
  return {
    ...item,
    timeRange: dateRangeToTimeIndex([startDate, endDate]),
    day: startDate.getDay() || 7,
  };
}

export function fromSimplifiedItem({
  timeRange,
  day,
  ...item
}: SimplifiedScheduleDayItem): ScheduleDayItem {
  return {
    ...item,
    startDate: timeIndexAndDayToDate(timeRange[0], day),
    endDate: timeIndexAndDayToDate(timeRange[1], day),
  };
}

export function preparePayload(
  data: ScheduleDayItem,
  emptyId: boolean = false,
): ScheduleDayItemPayload {
  return {
    ...data,
    id: emptyId ? undefined : data.id,
    startDate: data.startDate.toISOString(),
    endDate: data.endDate.toISOString(),
  };
}

export function deserializePayload(
  item: ScheduleDayItemPayload,
): ScheduleDayItem {
  return {
    ...item,
    startDate: new Date(item.startDate),
    endDate: new Date(item.endDate),
  };
}

export const getItemDimensions = (
  item: SimplifiedScheduleDayItem,
  isHorizontal: boolean,
) => {
  const itemStartTime = item.timeRange[0];
  const itemEndTime = item.timeRange[1];

  const startOffsetPercentage = timeIndexToOffsetPercentage(itemStartTime);
  const endOffsetPercentage = timeIndexToOffsetPercentage(itemEndTime);
  const itemWidthPercentage = endOffsetPercentage - startOffsetPercentage;

  return {
    [isHorizontal ? "width" : "height"]:
      `calc(${itemWidthPercentage}% - ${0.25}rem)`,
    [isHorizontal ? "marginLeft" : "marginTop"]:
      `calc(${startOffsetPercentage}% + ${0.125}rem)`,
  };
};
