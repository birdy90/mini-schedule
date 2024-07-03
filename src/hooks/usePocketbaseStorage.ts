import type {ScheduleDayItem} from "@/types";
import {useEffect, useState} from "react";
import {sampleData} from "@/data";

export function usePocketbaseStorage(): ScheduleDayItem[] {
  const [scheduleData, setScheduleData] = useState<ScheduleDayItem[]>([]);

  useEffect(() => {
    if (!scheduleData.value || scheduleData.value?.length === 0) {
      scheduleData.value = [...sampleData];
    }
  }, []);

  return scheduleData;
}
