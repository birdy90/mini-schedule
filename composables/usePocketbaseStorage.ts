import type { ScheduleDayItem } from "~/types";
import { sampleData } from "~/utils/data/sample";

export function usePocketbaseStorage(): Ref<ScheduleDayItem[]> {
  const scheduleData = ref<ScheduleDayItem[]>([]);

  onMounted(() => {
    if (!scheduleData.value || scheduleData.value?.length === 0) {
      scheduleData.value = [...sampleData];
    }
  });

  return scheduleData;
}
