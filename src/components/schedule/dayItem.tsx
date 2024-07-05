import { cn } from "@/utils/cn";
import { PlainScheduleDayItem, ScheduleDayItem } from "@/types";
import { calendarSettings } from "@/data";
import { Modal } from "@mantine/core";
import { editedItemAtom } from "@/data/stores";
import { AddModal } from "@/components/schedule/modal/addModal";
import { useDisclosure } from "@mantine/hooks";
import { fromPlainItem } from "@/utils";
import { useSetAtom } from "jotai";

interface DayItemProps {
  item: PlainScheduleDayItem;
  preview?: boolean;
}

export const DayItem = (props: DayItemProps) => {
  const [modalOpened, modalActions] = useDisclosure(false);
  const setEditedItem = useSetAtom(editedItemAtom);

  const item = props.item;
  const itemStartTime = item.timeRange[0];
  const itemEndTime = item.timeRange[1];

  const dayDuration = calendarSettings.endTime - calendarSettings.startTime;
  const itemDuration = itemEndTime - itemStartTime;
  const itemWidthPercentage = (itemDuration / dayDuration) * 100;
  const itemOffset = itemStartTime - calendarSettings.startTime;
  const itemOffsetPercentage = (itemOffset / dayDuration) * 100;

  const previewItemClasses = cn(
    "border-2 top-0 bottom-0",
    item.regular
      ? "border-main-700 shadow-main-700/40"
      : "border-secondary-700 shadow-secondary-700/40",
  );

  const commonItemClasses = cn(
    "p-0.5 flex justify-center text-xs",
    !item.preview && "cursor-pointer",
    item.regular ? "text-main-500" : "text-secondary-500",
    item.background
      ? "border-gray-200 top-0 items-start"
      : "text-white shadow-lg top-5 items-center",
    item.regular
      ? item.background
        ? "bg-main-50 border"
        : "bg-main-600 shadow-main-700/40"
      : item.background
        ? "bg-secondary-50 border"
        : "bg-secondary-600 shadow-secondary-700/40",
  );

  const itemClasses = cn(
    "rounded absolute bottom-0 select-none",
    item.preview ? previewItemClasses : commonItemClasses,
  );

  function onEditOpen() {
    if (item.preview) return;
    setEditedItem(fromPlainItem(item));
    modalActions.open();
  }

  function onEditSave(item: ScheduleDayItem) {}

  return (
    <div
      className={itemClasses}
      onDoubleClick={onEditOpen}
      style={{
        width: `calc(${itemWidthPercentage}% - ${0.25}rem)`,
        left: `calc(${itemOffsetPercentage}% + ${0.125}rem)`,
      }}
    >
      <span className={cn(itemDuration < 1 && "-rotate-90", "leading-none")}>
        {item.preview ? "" : item.title}
      </span>

      <Modal
        opened={modalOpened}
        onClose={modalActions.close}
        title="Add New Item"
      >
        <AddModal onSave={onEditSave} />
      </Modal>
    </div>
  );
};
