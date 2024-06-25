import { useStorage } from "@vueuse/core";
import type { ScheduleDayItem } from "~/types";
import { sampleData } from "~/utils/data/sample";

const storageItemsKey = "schedule-items";

export function useLocalStorage(): Ref<ScheduleDayItem[]> {
  const scheduleData = useStorage(storageItemsKey, [], undefined, {
    initOnMounted: true,
    serializer: {
      read: (v): ScheduleDayItem[] => {
        if (!v) return [];
        const parsed = JSON.parse(v) as ScheduleDayItem[];
        return [
          ...parsed.map((t) => ({
            ...t,
            startDate: new Date(t.startDate),
            endDate: new Date(t.endDate),
          })),
        ];
      },
      write: (v) => JSON.stringify(v),
    },
  });

  onMounted(() => {
    console.log(!scheduleData.value, scheduleData.value?.length === 0);
    if (!scheduleData.value || scheduleData.value?.length === 0) {
      scheduleData.value = [...sampleData];
    }
  });

  return scheduleData;
}
