import { useElementSize, useThrottledCallback } from "@mantine/hooks";
import { calendarSettings, daysOfWeek } from "@/data";
import { WeekGrid } from "@/components/schedule/weekGrid";
import { Ref, useEffect, useMemo } from "react";
import { DayItem } from "@/components/schedule/dayItem";
import { useDraggingStore, useItemsStore } from "@/data/store";
import {
  calculateRow,
  cn,
  fromSimplifiedItem,
  preparePayload,
  toSimplifiedItem,
} from "@/utils";
import { clamp, createRemap } from "@/utils/common";
import { usePocket } from "@/components/providers/PocketContext";

export const WeekDraggingArea = () => {
  const { pb, user } = usePocket();
  const items = useItemsStore((state) => state.itemsList);

  const {
    canDrag,
    draggedItem: item,
    draggedHandle,
    stopDragging,
    updateDraggingItem,
    positionWithinItem,
  } = useDraggingStore();
  const { updateItem } = useItemsStore((state) => ({
    updateItem: state.updateItem,
  }));

  const {
    ref: refWeekSize,
    width: dayContainerWidth,
    height: dayContainerHeight,
  } = useElementSize();
  const stepXInPixels = dayContainerWidth / calendarSettings.stepsPerDay;
  const { ref: refItemSize } = useElementSize();
  const coordsToTimeIndex = useMemo(
    () =>
      createRemap(
        0,
        dayContainerWidth,
        calendarSettings.startTime,
        calendarSettings.endTime,
      ),
    [dayContainerWidth],
  );

  const containerRect: DOMRect =
    refWeekSize.current?.getBoundingClientRect() ?? {
      x: 0,
      y: 0,
    };
  const { x: containerPosX, y: containerPosY } = containerRect;
  const stepY = dayContainerHeight / daysOfWeek.length || 1;

  const getClampedMousePos = (e: PointerEvent) => {
    const { clientX: mouseX, clientY: mouseY } = e;
    const x =
      clamp(mouseX - containerPosX, 0, containerRect.width) + stepXInPixels / 2;
    const y = clamp(mouseY - containerPosY, 0, containerRect.height);
    return { x, y };
  };

  const calculateLeftPos = (x: number) => {
    const mappedPos = coordsToTimeIndex(x);
    return mappedPos - (mappedPos % (calendarSettings.minChangeStep / 60));
  };

  const onMouseMove = useThrottledCallback((e: PointerEvent) => {
    if (!item || !refItemSize.current || !refItemSize.current?.parentElement)
      return;

    const { x, y } = getClampedMousePos(e);

    const itemDuration = item ? item.timeRange[1] - item.timeRange[0] : 0;

    switch (draggedHandle) {
      case "item":
        const day = calculateRow(y, stepY);
        refItemSize.current.parentElement.style.gridRow = day;
        const leftPosItem = clamp(
          calculateLeftPos(x - (positionWithinItem?.x ?? 0)),
          calendarSettings.startTime,
          calendarSettings.endTime - itemDuration,
        );
        const timeRange = [leftPosItem, leftPosItem + itemDuration] as [
          number,
          number,
        ];

        updateDraggingItem({
          ...item,
          day,
          timeRange,
        });
        break;
      case "start":
        refItemSize.current.parentElement.style.gridRow = item.day;
        const leftPosStart = clamp(
          calculateLeftPos(x),
          calendarSettings.startTime,
          item.timeRange[1] - calendarSettings.minChangeStep / 60,
        );

        updateDraggingItem({
          ...item,
          timeRange: [leftPosStart, item.timeRange[1]],
        });
        break;
      case "end":
        refItemSize.current.parentElement.style.gridRow = item.day;
        const rightPosEnd = clamp(
          calculateLeftPos(x),
          item.timeRange[0] + calendarSettings.minChangeStep / 60,
          calendarSettings.endTime,
        );

        updateDraggingItem({
          ...item,
          timeRange: [item.timeRange[0], rightPosEnd],
        });
        break;
    }
  }, 50);

  const onMouseUp = () => {
    if (item && item.id) {
      const targetItem = items.find((t) => t.id === item.id);
      if (targetItem) {
        const simplifiedTarget = toSimplifiedItem(targetItem);
        if (
          simplifiedTarget.timeRange[0] !== item.timeRange[0] ||
          simplifiedTarget.timeRange[1] !== item.timeRange[1] ||
          simplifiedTarget.day !== item.day
        ) {
          const scheduleItem = fromSimplifiedItem(item);
          if (user) {
            pb
              ?.collection("miniSchedule")
              .update(item.id, preparePayload(scheduleItem));
          }
          updateItem(item.id, scheduleItem);
        }
      }
    }
    stopDragging();
  };

  function onEscapeClick(e: KeyboardEvent) {
    if (e.key === "Escape") {
      stopDragging();
    }
  }

  useEffect(() => {
    if (!canDrag) return;
    document.addEventListener("pointermove", onMouseMove);
    document.addEventListener("pointerup", onMouseUp);
    document.addEventListener("keydown", onEscapeClick);

    return () => {
      document.removeEventListener("pointermove", onMouseMove);
      document.removeEventListener("pointerup", onMouseUp);
      document.removeEventListener("keydown", onEscapeClick);
    };
  }, [item, canDrag]);

  return (
    <div className={"absolute size-full z-20 pointer-events-none px-1"}>
      <WeekGrid
        ref={refWeekSize as Ref<HTMLDivElement>}
        className={cn("relative size-full")}
      >
        {item && (
          <div className={"relative"}>
            <DayItem
              ref={refItemSize}
              className={"my-[1.5px] pointer-events-none"}
              isDragged
              item={item}
            />
          </div>
        )}
      </WeekGrid>
    </div>
  );
};
