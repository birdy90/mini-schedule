import { ScheduleDayItem } from "@/types";
import { fromSimplifiedItem } from "@/utils";

let id = 0;

const newRegularItem = (start: number, day: number) => {
  return fromSimplifiedItem({
    id: (++id).toString(),
    title: `Item ${id}`,
    background: false,
    regular: true,
    timeRange: [start, start + 3],
    day,
  });
};

export const testDayItem: ScheduleDayItem = newRegularItem(
  12,
  new Date().getDay() || 7,
);

export const testWeekItems: ScheduleDayItem[] = [
  newRegularItem(10, 1),
  newRegularItem(10, 2),
  newRegularItem(15, 2),
  newRegularItem(8, 4),
  newRegularItem(21, 4),
  newRegularItem(12, 6),
  newRegularItem(12, 7),
];
