import { useDraggingStore, useItemsStore } from "@/data/store";
import { useElementSize, useThrottledCallback } from "@mantine/hooks";
import { calendarSettings, daysOfWeek } from "@/data";
import { Ref, useCallback, useEffect, useMemo, useRef } from "react";
import {
  calculateDay,
  clamp,
  cn,
  createRemap,
  fromSimplifiedItem,
  getItemDimensions,
  toSimplifiedItem,
} from "@/utils";
import { WeekGrid } from "@/components/schedule/weekGrid";
import { DayItem } from "@/components/schedule/dayItem";
import { useAppOrientation } from "@/components/providers/OrientationContext";

export const DragArea = () => {
  const { itemsList: items, updateItem } = useItemsStore();
  const { isHorizontal } = useAppOrientation();
  const {
    canDrag,
    draggedItem: item,
    draggedHandle,
    stopDragging,
    updateDraggingItem,
    positionWithinItem,
  } = useDraggingStore();

  const {
    ref: refWeekSize,
    width: dayContainerWidth,
    height: dayContainerHeight,
  } = useElementSize();
  const stepInPixels =
    (isHorizontal ? dayContainerWidth : dayContainerHeight) /
    calendarSettings.stepsPerDay;
  const { ref: refItemSize } = useElementSize();
  const refItemSizeClientRect = useRef<DOMRect | undefined>();
  const coordsToTimeIndex = useMemo(
    () =>
      createRemap(
        0,
        isHorizontal ? dayContainerWidth : dayContainerHeight,
        calendarSettings.startTime,
        calendarSettings.endTime,
      ),
    [stepInPixels],
  );

  const containerRect: DOMRect =
    refWeekSize.current?.getBoundingClientRect() ?? {
      x: 0,
      y: 0,
    };
  const { x: containerPosX, y: containerPosY } = containerRect;
  const dayStep =
    (isHorizontal ? dayContainerHeight : dayContainerWidth) /
      daysOfWeek.length || 1;

  const getClampedMousePos = (e: PointerEvent) => {
    const { clientX: mouseX, clientY: mouseY } = e;
    const x =
      clamp(mouseX - containerPosX, 0, containerRect.width) + stepInPixels / 2;
    const y = clamp(mouseY - containerPosY, 0, containerRect.height);
    return { x, y };
  };

  const calculatePosOffset = (pos: number) => {
    const mappedPos = coordsToTimeIndex(pos);
    if (!Number.isFinite(mappedPos)) return 0;
    return mappedPos - (mappedPos % (calendarSettings.minChangeStep / 60));
  };

  const onMouseMove = useCallback(
    useThrottledCallback((e: PointerEvent) => {
      if (!item || !refItemSize.current || !refItemSize.current?.parentElement)
        return;

      const { x, y } = getClampedMousePos(e);
      const itemDuration = item ? item.timeRange[1] - item.timeRange[0] : 0;

      switch (draggedHandle) {
        case "item":
          const day = calculateDay(isHorizontal ? y : x, dayStep);
          refItemSize.current.parentElement.style[
            isHorizontal ? "gridRow" : "gridColumn"
          ] = day;

          const positionWithinX =
            (positionWithinItem?.x === "50%"
              ? (refItemSizeClientRect.current?.width ?? 0) / 2
              : positionWithinItem?.x) ?? 0;
          const positionWithinY =
            (positionWithinItem?.y === "50%"
              ? (refItemSizeClientRect.current?.height ?? 0) / 2
              : positionWithinItem?.y) ?? 0;

          const leftPosItem = clamp(
            calculatePosOffset(
              isHorizontal ? x - positionWithinX : y - positionWithinY,
            ),
            calendarSettings.startTime,
            calendarSettings.endTime - itemDuration,
          );
          const timeRange: [number, number] = [
            leftPosItem,
            leftPosItem + itemDuration,
          ];

          updateDraggingItem({
            ...item,
            day,
            timeRange,
          });
          break;
        case "start":
          refItemSize.current.parentElement.style[
            isHorizontal ? "gridRow" : "gridColumn"
          ] = item.day;
          const leftPosStart = clamp(
            calculatePosOffset(isHorizontal ? x : y),
            calendarSettings.startTime,
            item.timeRange[1] - calendarSettings.minChangeStep / 60,
          );

          updateDraggingItem({
            ...item,
            timeRange: [leftPosStart, item.timeRange[1]],
          });
          break;
        case "end":
          refItemSize.current.parentElement.style[
            isHorizontal ? "gridRow" : "gridColumn"
          ] = item.day;
          const rightPosEnd = clamp(
            calculatePosOffset(isHorizontal ? x : y),
            item.timeRange[0] + calendarSettings.minChangeStep / 60,
            calendarSettings.endTime,
          );

          updateDraggingItem({
            ...item,
            timeRange: [item.timeRange[0], rightPosEnd],
          });
          break;
      }
    }, 50),
    [item, refItemSizeClientRect.current],
  );

  const onMouseUp = useCallback(() => {
    if (item && item.id) {
      const originalItem = items.find((t) => t.id === item.id);
      if (originalItem) {
        const simplifiedOriginal = toSimplifiedItem(originalItem);
        if (
          simplifiedOriginal.timeRange[0] !== item.timeRange[0] ||
          simplifiedOriginal.timeRange[1] !== item.timeRange[1] ||
          simplifiedOriginal.day !== item.day
        ) {
          const updatedItem = fromSimplifiedItem(item);
          updateItem(item.id, updatedItem);
        }
      }
    }
    stopDragging();
  }, [item]);

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
  }, [canDrag, onMouseMove, onMouseUp]);

  useEffect(() => {
    refItemSizeClientRect.current =
      refItemSize.current?.getBoundingClientRect();
  }, [refItemSize.current]);

  return (
    <div className={cn("absolute size-full z-20 pointer-events-none")}>
      <WeekGrid ref={refWeekSize as Ref<HTMLDivElement>}>
        {item && (
          <div
            className={cn(
              "relative border-2 border-[transparent]",
              isHorizontal
                ? "py-1 px-0.5 border-x-4"
                : "px-0.5 sm:px-1 py-0.5 border-y-4",
              !isHorizontal && "[writing-mode:vertical-lr]",
            )}
          >
            <DayItem
              ref={refItemSize}
              className={"pointer-events-none"}
              style={getItemDimensions(item, isHorizontal)}
              isDragged
              item={item}
            />
          </div>
        )}
      </WeekGrid>
    </div>
  );
};
