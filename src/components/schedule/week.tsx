import { TimeRow } from "@/components/schedule/timeRow";
import { Day } from "@/components/schedule/day";
import { SimplifiedScheduleDayItem, WeekProps } from "@/types";
import { useEffect, useState } from "react";
import { toSimplifiedItem } from "@/utils/schedule";
import { DayNamesCol } from "@/components/schedule/dayNamesCol";
import { WeekGrid } from "@/components/schedule/weekGrid";
import { DragArea } from "@/components/schedule/dragArea";
import { useDraggingStore } from "@/data/store";
import { cn } from "@/utils";
import { useAppOrientation } from "@/components/providers/OrientationContext";

export const Week = (props: WeekProps) => {
  const draggedItem = useDraggingStore((state) => state.draggedItem);
  const [processedItems, setProcessedItems] = useState<
    Record<number, SimplifiedScheduleDayItem[]>
  >({});
  const { isHorizontal } = useAppOrientation();

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
      className={cn(
        "relative grid size-full",
        isHorizontal
          ? "grid-cols-[1.5rem_1fr] grid-rows-[1.75rem_1fr] max-h-[1000px]"
          : "grid-cols-[1.75rem_1fr] grid-rows-[1.5rem_1fr] max-w-[1000px]",
      )}
    >
      <div />

      {isHorizontal ? (
        <>
          <TimeRow />
          <DayNamesCol />
        </>
      ) : (
        <>
          <DayNamesCol />
          <TimeRow />
        </>
      )}

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

        <DragArea />
      </WeekGrid>
    </div>
  );
};
