import { useStorage } from "@vueuse/core";
import type { ScheduleDayItem, DataManager } from "~/types";
import { sampleData } from "~/utils/data/sample";

const storageItemsKey = "schedule-items";

export function usePocketbaseStorage(): Ref<ScheduleDayItem[]> {
  const scheduleData = ref<ScheduleDayItem[]>([]);

  onMounted(() => {
    if (!scheduleData.value || scheduleData.value?.length === 0) {
      scheduleData.value = [...sampleData];
    }
  });

  return scheduleData;
}