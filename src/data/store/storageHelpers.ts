import { ScheduleDayItem, ScheduleDayItemPayload } from "@/types";
import { deserializePayload } from "@/utils";

const storageItemsKey = "schedule-items";

interface ListStorageHandler {
  get: () => ScheduleDayItem[];
  set: (items: ScheduleDayItem[]) => void;
}

export const localStorageHandler: ListStorageHandler = {
  get() {
    const itemsString = localStorage.getItem(storageItemsKey) ?? "";
    if (!itemsString) return [] as ScheduleDayItem[];
    const parsedItem = JSON.parse(itemsString) as ScheduleDayItemPayload[];
    return parsedItem.map(deserializePayload);
  },
  set(items) {
    localStorage.setItem(storageItemsKey, JSON.stringify(items));
  },
};
