import { cn } from "@/utils/cn";
import { SimplifiedScheduleDayItem } from "@/types";
import { calendarSettings } from "@/data";
import { CSSProperties } from "react";

interface DayItemProps {
  item: SimplifiedScheduleDayItem;
  preview?: boolean;
  style?: CSSProperties;
}

export const PreviewDayItem = (props: DayItemProps) => {
  const item = props.item;
  const itemStartTime = item.timeRange[0];
  const itemEndTime = item.timeRange[1];

  const dayDuration = calendarSettings.endTime - calendarSettings.startTime;
  const itemDuration = itemEndTime - itemStartTime;
  const itemWidthPercentage = (itemDuration / dayDuration) * 100;
  const itemOffset = itemStartTime - calendarSettings.startTime;
  const itemOffsetPercentage = (itemOffset / dayDuration) * 100;

  const itemClasses = cn(
    "rounded bottom-0 select-none z-10",
    "border-2 top-0 bottom-0",
    item.regular
      ? "border-main-700 shadow-main-700/40"
      : "border-secondary-700 shadow-secondary-700/40",
    item.regular
      ? item.background
        ? "bg-main-100 border-main-400 hover:border-gray-300"
        : "hover:border-main-800 bg-main-700/80 shadow-main-700/40"
      : item.background
        ? "bg-secondary-100 border-secondary-400 hover:border-gray-300"
        : "hover:border-secondary-800 bg-secondary-700/80 shadow-secondary-700/40",
  );

  return (
    <div
      className={itemClasses}
      style={{
        width: `calc(${itemWidthPercentage}% - ${0.25}rem)`,
        marginLeft: `calc(${itemOffsetPercentage}% + ${0.125}rem)`,
        ...props.style,
      }}
    />
  );
};
