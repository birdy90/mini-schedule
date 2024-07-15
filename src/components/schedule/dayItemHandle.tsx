import { cn } from "@/utils";
import { HTMLProps, MouseEvent } from "react";
import { SimplifiedScheduleDayItem } from "@/types";
import { HandleType, useDraggingStore } from "@/data/store";
import { useIsDragging } from "@/utils/hooks/useIsDragging";

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

  const handleClasses = cn(
    isRegular ? "border-main-800/80" : "border-secondary-800/80",
    "border-2 w-2.5 h-6 bg-white flex items-center justify-center rounded",
    "after:content-[''] after:border-0 after:border-gray-400 after:h-2 after:border-l-[1px]",
    "opacity-0 hover:opacity-100 transition-opacity cursor-grab",
    side === "start"
      ? "absolute -left-0.5 top-1/2 -translate-x-1/2 -translate-y-1/2"
      : "absolute -right-0.5 top-1/2 translate-x-1/2 -translate-y-1/2",
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
    ></div>
  );
};
