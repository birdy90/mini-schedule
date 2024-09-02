import { cn } from "@/utils/cn";
import { SimplifiedScheduleDayItem } from "@/types";
import { Modal } from "@mantine/core";
import { AddModal } from "@/components/schedule/modal/addModal";
import { useDisclosure } from "@mantine/hooks";
import { fromSimplifiedItem } from "@/utils/schedule";
import { useDraggingStore, useItemsStore } from "@/data/store";
import { CSSProperties, forwardRef, PointerEvent, useRef } from "react";
import { DayItemHandle } from "@/components/schedule/dayItemHandle";
import { mergedRef } from "@/utils/common";
import { useIsDragging } from "@/utils/hooks/useIsDragging";
import { useAppOrientation } from "@/components/providers/OrientationContext";

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
    const { startDragging, draggedItem, stopDragging, canDrag } =
      useDraggingStore();
    const [isMouseDown, setIsMouseDown] = useIsDragging();
    const { isVertical } = useAppOrientation();

    const item = props.item;

    const itemClasses = cn(
      "rounded-md select-none",
      "flex justify-center items-center size-full",
      "border-2 p-0.5 transition-colors",
      item.regular ? "text-main-600" : "text-secondary-600",
      item.background ? "items-center z-0" : "text-white shadow-xl z-10",
      item.regular
        ? item.background
          ? "bg-main-50 border-main-100"
          : "border-main-700/10 bg-main-700/80 shadow-main-700/40"
        : item.background
          ? "bg-secondary-50 border-secondary-100"
          : "border-secondary-700/10 bg-secondary-700/80 shadow-secondary-700/40",
      canDrag &&
        (item.regular
          ? item.background
            ? "hover:border-main-200"
            : "hover:border-main-800"
          : item.background
            ? "hover:border-secondary-200"
            : "hover:border-secondary-800"),
      canDrag && "cursor-pointer",
      props.className,
    );

    function onEditOpen(e: PointerEvent<HTMLDivElement>) {
      e.stopPropagation();
      stopDragging();
      setEditedItem(fromSimplifiedItem(item));
      modalActions.open();
    }

    function onPointerDown() {
      setIsMouseDown(true);
    }

    function onPointerMove(e: PointerEvent<HTMLDivElement>) {
      e.stopPropagation();

      if (!isMouseDown || !!draggedItem) return;
      const rect = myRef.current?.getBoundingClientRect() ?? { x: 0, y: 0 };
      const coords = { x: e.clientX - rect.x, y: e.clientY - rect.y };
      startDragging("item", props.item, coords);
    }

    return (
      <div
        ref={mergedRef<HTMLDivElement>(ref, myRef)}
        className={itemClasses}
        onDoubleClick={canDrag ? onEditOpen : undefined}
        onPointerMove={canDrag ? onPointerMove : undefined}
        onPointerDown={canDrag ? onPointerDown : undefined}
        onClick={(e) => e.stopPropagation()}
        style={props.style}
        aria-label={`${item.title} at ${item.timeRange[0]} o'clock`}
      >
        {canDrag && (
          <>
            <DayItemHandle
              isRegular={item.regular}
              item={item}
              side={"start"}
            />
            <DayItemHandle isRegular={item.regular} item={item} side={"end"} />
          </>
        )}

        <div
          className={cn(
            // itemDuration <= 1 && "-rotate-90",
            // itemDuration > 1 && itemDuration <= 2 && "-rotate-90 sm:rotate-0",
            isVertical && "-rotate-180",
            !item.background ? "font-bold" : "tracking-wide",
            "text-center text-xs scale-90",
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
DayItem.displayName = "DayItem";
