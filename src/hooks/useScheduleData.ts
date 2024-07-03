import type {ScheduleDayItem} from "@/types";
import {sampleData} from "@/data";
import { useLocalStorage } from '@mantine/hooks';

const storageItemsKey = "schedule-items";

type ScheduleDaySetter = (val: (ScheduleDayItem[] | ((prevState: ScheduleDayItem[]) => ScheduleDayItem[]))) => void;

export function useScheduleData(): [ScheduleDayItem[], ScheduleDaySetter] {
  const [scheduleData, setScheduleData] = useLocalStorage({
    key: storageItemsKey,
    defaultValue: sampleData,

    deserialize: (v): ScheduleDayItem[] => {
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
    serialize: (v) => JSON.stringify(v)
  });

  // useLocalStorage(storageItemsKey, [], undefined, {
  //   initOnMounted: true,
  // });

  // useLayoutEffect(() => {
  //   if (!scheduleData || scheduleData.length === 0) {
  //     setScheduleData([...sampleData]);
  //   }
  // }, []);

  return [scheduleData, setScheduleData];
}
