import { TimeRow } from "@/components/schedule/timeRow";
import { Day } from "@/components/schedule/day";
import { PlainScheduleDayItem, ScheduleDayItem } from "@/types";
import { useEffect, useState } from "react";
import { toPlainItem } from "@/utils";

interface WeekProps {
  items: ScheduleDayItem[];
}

export const Week = (props: WeekProps) => {
  const [processedItems, setProcessedItems] = useState<
    Record<number, PlainScheduleDayItem[]>
  >({});

  useEffect(() => {
    const itemsWithDays = props.items.map(toPlainItem);

    const itemsObject = itemsWithDays.reduce(
      (acc, item) => {
        if (item.day) {
          acc[item.day] = acc[item.day] ?? [];
          acc[item.day].push(item);
        }
        return acc;
      },
      {} as Record<number, PlainScheduleDayItem[]>,
    );

    setProcessedItems(itemsObject);
  }, [props.items]);

  return (
    <>
      <TimeRow />
      <div className="grid grid-rows-7 gap-4 grow mb-4">
        {Array(7)
          .fill(0)
          .map((_, i) => (
            <Day key={i} index={i + 1} items={processedItems[i + 1]} />
          ))}
      </div>
    </>
  );
};
