import { ScheduleDayItem } from "@/types";

const storageItemsKey = "schedule-items";

interface ListStorageHandler {
  get: () => ScheduleDayItem[];
  set: (items: ScheduleDayItem[]) => void;
}

export const localStorageHandler: ListStorageHandler = {
  get() {
    return deserializeItems(localStorage.getItem(storageItemsKey) ?? "");
  },
  set(items) {
    localStorage.setItem(storageItemsKey, JSON.stringify(items));
  },
};

function deserializeItems(v: string): ScheduleDayItem[] {
  if (!v) return [];
  const parsed = JSON.parse(v) as ScheduleDayItem[];
  return [
    ...parsed.map((t) => ({
      ...t,
      startDate: new Date(t.startDate),
      endDate: new Date(t.endDate),
    })),
  ];
}
