import { cn } from "@/utils";
import { HTMLProps, MouseEvent } from "react";
import { SimplifiedScheduleDayItem } from "@/types";
import { HandleType, useDraggingStore } from "@/data/store";
import { useIsDragging } from "@/utils/hooks/useIsDragging";
import { useAppOrientation } from "@/components/providers/OrientationContext";

interface DayItemHandleProps extends HTMLProps<HTMLDivElement> {
  isRegular?: boolean;
  side: HandleType;
  item: SimplifiedScheduleDayItem;
}

/*
this component is supposed to work only in DayItem components, as it relies on its layout
 */
export const DayItemHandle = (props: DayItemHandleProps) => {
  const { isRegular, className, side, ...divProps } = props;
  const startDragging = useDraggingStore((state) => state.startDragging);
  const [isDragging, setIsDragging] = useIsDragging();
  const draggedItem = useDraggingStore((state) => state.draggedItem);
  const { isHorizontal } = useAppOrientation();

  const handleClasses = cn(
    "absolute flex items-center justify-center rounded",
    isRegular ? "border-main-800/80" : "border-secondary-800/80",
    "border-2 bg-white",
    isHorizontal ? "w-2.5 h-6" : "h-2.5 w-6",
    "after:content-[''] after:border-0 after:border-gray-400",
    isHorizontal
      ? "after:h-2 after:border-l-[1px]"
      : "after:w-2 after:border-t-[1px]",
    "opacity-0 hover:opacity-100 transition-opacity cursor-grab",
    isHorizontal ? "top-1/2 -translate-y-1/2" : "left-1/2 -translate-x-1/2",
    isHorizontal
      ? side === "start"
        ? "-left-0.5 -translate-x-1/2"
        : "-right-0.5 translate-x-1/2"
      : side === "start"
        ? "-top-0.5 -translate-y-1/2"
        : "-bottom-0.5 translate-y-1/2",
    draggedItem && "pointer-events-none",
    className,
  );

  function onStartDragging(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    setIsDragging(true);
  }

  function drag(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    if (!isDragging) return;
    startDragging(props.side, props.item);
  }

  return (
    <div
      {...divProps}
      onPointerDown={onStartDragging}
      onPointerMove={drag}
      className={handleClasses}
    />
  );
};
