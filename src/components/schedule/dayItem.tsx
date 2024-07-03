import {cn} from "@/utils/cn";
import {PlainScheduleDayItem} from "@/types";
import {calendarSettings} from "@/data";

interface DayItemProps {
    item: PlainScheduleDayItem;
    preview?: boolean;
}

export const DayItem = (props: DayItemProps) => {
    const item = props.item;
    const itemStartTime = item.timeRange[0];
    const itemEndTime = item.timeRange[1];

    const dayDuration = calendarSettings.endTime - calendarSettings.startTime;
    const itemDuration = itemEndTime - itemStartTime;
    const itemWidthPercentage = (itemDuration / dayDuration) * 100;
    const itemOffset = itemStartTime - calendarSettings.startTime;
    const itemOffsetPercentage = (itemOffset / dayDuration) * 100;

    const previewItemClasses = cn(
        'border-2 top-0 bottom-0',
        item.regular
            ? 'border-main-700 shadow-main-700/40'
            : 'border-secondary-700 shadow-secondary-700/40',
    );

    const commonItemClasses = cn(
        'p-0.5 flex justify-center text-xs',
        item.regular ? 'text-main-500' : 'text-secondary-500',
        item.background
            ? 'border-gray-200 top-0 items-start'
            : 'text-white shadow-lg top-5 items-center',
        item.regular
            ? item.background
                ? 'bg-main-50 border'
                : 'bg-main-600 shadow-main-700/40'
            : item.background
                ? 'bg-secondary-50 border'
                : 'bg-secondary-600 shadow-secondary-700/40',
    )

    const itemClasses = cn(
        'rounded absolute bottom-0',
        item.preview
            ? previewItemClasses
            : commonItemClasses
    )

    return (
        <div
            className={itemClasses}
            style={{
                width: `calc(${itemWidthPercentage}% - ${0.25}rem)`,
                left: `calc(${itemOffsetPercentage}% + ${0.125}rem)`,
            }}
        >
            <span className={cn(itemDuration < 1 && '-rotate-90', 'leading-none')}>
              {item.preview ? "" : item.title}
            </span>
        </div>
    )
}
