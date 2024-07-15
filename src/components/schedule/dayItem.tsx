import { cn } from "@/utils/cn";
import { SimplifiedScheduleDayItem } from "@/types";
import { Modal } from "@mantine/core";
import { AddModal } from "@/components/schedule/modal/addModal";
import { useDisclosure } from "@mantine/hooks";
import {
  fromSimplifiedItem,
  timeIndexToOffsetPercentage,
} from "@/utils/schedule";
import { useDraggingStore, useItemsStore } from "@/data/store";
import { CSSProperties, forwardRef, PointerEvent, useRef } from "react";
import { DayItemHandle } from "@/components/schedule/dayItemHandle";
import { mergedRef } from "@/utils/common";
import { useIsDragging } from "@/utils/hooks/useIsDragging";

interface DayItemProps {
  item: SimplifiedScheduleDayItem;
  className?: string;
  style?: CSSProperties;
  isDragged?: boolean;
}

export const DayItem = forwardRef<HTMLDivElement, DayItemProps>(
  (props, ref) => {
    const myRef = useRef<HTMLDivElement>(null);
    const [modalOpened, modalActions] = useDisclosure(false);
    const setEditedItem = useItemsStore((state) => state.setEditedItem);
    const startDragging = useDraggingStore((state) => state.startDragging);
    const draggedItem = useDraggingStore((state) => state.draggedItem);
    const [isMouseDown, setIsMouseDown] = useIsDragging();

    const item = props.item;
    const itemStartTime = item.timeRange[0];
    const itemEndTime = item.timeRange[1];

    const itemDuration = itemEndTime - itemStartTime;
    const startOffsetPercentage = timeIndexToOffsetPercentage(itemStartTime);
    const endOffsetPercentage = timeIndexToOffsetPercentage(itemEndTime);
    const itemWidthPercentage = endOffsetPercentage - startOffsetPercentage;

    const itemClasses = cn(
      "rounded-md select-none cursor-pointer",
      "absolute top-0 border-2 p-0.5",
      "flex justify-center text-xs tracking-wide",
      item.regular ? "text-main-600" : "text-secondary-600",
      item.background
        ? "top-0 -bottom-0 items-center z-0 outline outline-dashed outline-1"
        : "text-white shadow-xl top-0 bottom-0 items-center z-10",
      item.regular
        ? item.background
          ? "bg-main-50 border-gray-100 hover:border-gray-300"
          : "border-main-700/10 hover:border-main-800 bg-main-700/80 shadow-main-700/40"
        : item.background
          ? "bg-secondary-50 border-gray-100 hover:border-gray-300"
          : "border-secondary-700/10 hover:border-secondary-800 bg-secondary-700/80 shadow-secondary-700/40",
      props.className,
    );

    function onEditOpen() {
      setEditedItem(fromSimplifiedItem(item));
      modalActions.open();
    }

    function onPointerDown() {
      setIsMouseDown(true);
    }

    function onPointerMove(e: PointerEvent<HTMLDivElement>) {
      if (!isMouseDown || !!draggedItem) return;
      const rect = myRef.current?.getBoundingClientRect() ?? { x: 0, y: 0 };
      const coords = { x: e.clientX - rect.x, y: e.clientY - rect.y };
      startDragging("item", props.item, coords);
    }

    return (
      <div
        ref={mergedRef<HTMLDivElement>(ref, myRef)}
        className={itemClasses}
        onDoubleClick={onEditOpen}
        onPointerMove={onPointerMove}
        onPointerDown={onPointerDown}
        style={{
          width: `calc(${itemWidthPercentage}% - ${0.25}rem)`,
          marginLeft: `calc(${startOffsetPercentage}% + ${0.125}rem)`,
          ...props.style,
        }}
        aria-label={`${item.title} at ${item.timeRange[0]} o'clock`}
      >
        <DayItemHandle isRegular={item.regular} item={item} side={"start"} />
        <DayItemHandle isRegular={item.regular} item={item} side={"end"} />

        <div
          className={cn(
            itemDuration <= 1 && "-rotate-90",
            itemDuration > 1 && itemDuration <= 2 && "-rotate-90 sm:rotate-0",
            "text-center font-bold scale-90",
            "pointer-events-none",
          )}
        >
          {item.title}
        </div>

        <Modal
          opened={modalOpened}
          onClose={modalActions.close}
          title="Add New Item"
        >
          <AddModal actions={modalActions} />
        </Modal>
      </div>
    );
  },
);
