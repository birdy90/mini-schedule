import { PointerEvent, useCallback, useRef } from "react";
import { DayProps } from "@/types";
import { calendarSettings } from "@/data";
import { cn } from "@/utils/cn";
import { DayItem } from "@/components/schedule/dayItem";
import { TimeMarker } from "@/components/schedule/timeMarker";
import { useAppOrientation } from "@/components/providers/OrientationContext";
import { getItemDimensions } from "@/utils";
import { DayDivider } from "@/components/schedule/dayDivider";

export const Day = (props: DayProps) => {
  const dayContainerRef = useRef<HTMLDivElement>(null);

  const today = new Date();
  const isToday = props.index === (today.getDay() || 7);
  const { isVertical, isHorizontal } = useAppOrientation();

  const dividersRange = Array(calendarSettings.dividerStepsCount - 1)
    .fill(0)
    .map((_, index) => index);

  const onClickHandler = useCallback((e: PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const rect = dayContainerRef.current?.getBoundingClientRect() ?? {
      x: 0,
      y: 0,
    };
    const coords = { x: e.clientX - rect.x, y: e.clientY - rect.y };
    console.log(e.clientX, rect.x, coords);
  }, []);

  return (
    <div
      className={cn(
        "relative flex gap-2 h-full w-full shrink-0",
        "border-2 border-gray-200 rounded-lg",
        isVertical
          ? "[writing-mode:vertical-lr] border-y-4 px-0.5 sm:px-1 py-0.5"
          : "border-x-4 py-1 px-0.5",
        isToday && "border-main-200 shadow-lg shadow-main-100",
        isToday && (isVertical ? "border-y-main-400" : "border-x-main-400"),
        props.className,
      )}
    >
      {isToday && <TimeMarker />}

      <div
        ref={dayContainerRef}
        className={"relative grow"}
        onClick={onClickHandler}
      >
        {dividersRange.map((index) => (
          <DayDivider
            key={index}
            index={(index + 1) * calendarSettings.dayDividerStep}
          />
        ))}

        {props.items?.map((item) => {
          return (
            <DayItem
              className={"absolute"}
              style={getItemDimensions(item, isHorizontal)}
              key={`${item.id}-${item.title}${JSON.stringify(item.timeRange)}`}
              item={item}
            />
          );
        })}
      </div>
    </div>
  );
};
