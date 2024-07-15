import { TimeRow } from "@/components/schedule/timeRow";
import { Day } from "@/components/schedule/day";
import { ScheduleDayItem, SimplifiedScheduleDayItem } from "@/types";
import { useEffect, useState } from "react";
import { toSimplifiedItem } from "@/utils/schedule";
import { DayNamesCol } from "@/components/schedule/dayNamesCol";
import { WeekGrid } from "@/components/schedule/weekGrid";
import { WeekDraggingArea } from "@/components/schedule/weekDraggingArea";
import { useDraggingStore } from "@/data/store";
import { cn } from "@/utils";

interface WeekProps {
  items: ScheduleDayItem[];
}

export const Week = (props: WeekProps) => {
  const draggedItem = useDraggingStore((state) => state.draggedItem);
  const [processedItems, setProcessedItems] = useState<
    Record<number, SimplifiedScheduleDayItem[]>
  >({});

  useEffect(() => {
    const itemsWithDays = props.items.map(toSimplifiedItem);

    const itemsObject = itemsWithDays.reduce(
      (acc, item) => {
        if (item.day) {
          acc[item.day] = acc[item.day] ?? [];
          acc[item.day].push(item);
        }
        return acc;
      },
      {} as Record<number, SimplifiedScheduleDayItem[]>,
    );

    setProcessedItems(itemsObject);
  }, [props.items]);

  return (
    <div
      className={
        "grid grid-cols-[1.5rem_1fr] grid-rows-[1.5rem_1fr] size-full max-h-[1000px]"
      }
    >
      <div />
      <TimeRow />
      <DayNamesCol />
      <WeekGrid>
        <>
          {Array(7)
            .fill(0)
            .map((_, i) => (
              <Day
                key={i}
                index={i + 1}
                className={cn(
                  draggedItem && "opacity-50 ",
                  "transition-opacity",
                )}
                items={processedItems[i + 1]}
              />
            ))}
        </>

        <WeekDraggingArea />
      </WeekGrid>
    </div>
  );
};
