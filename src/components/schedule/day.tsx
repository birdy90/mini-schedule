import {PlainScheduleDayItem} from "@/types";
import {calendarSettings} from "@/data";
import {DayDivider} from "@/components/schedule/dayDivider";
import {cn} from "@/utils/cn";
import {DayItem} from "@/components/schedule/dayItem";

interface DayProps {
    className?: string;
    index?: number;
    items?: PlainScheduleDayItem[];
}

export const Day = (props: DayProps) => {
    const today = new Date();
    const isToday = props.index === (today.getDay() || 7);

    const dividersRange = Array(calendarSettings.stepsNumber - 1).fill(0).map((_, index) => index);

    return (
        <div
            className={cn(
                'border-2 border-gray-200 rounded-lg w-full grow shrink-0',
                'py-1 flex gap-2',
                isToday && 'border-l-4 border-main-200 border-l-main-400 shadow-lg shadow-main-100',
                props.className,
            )}
        >
            <div className="relative h-full w-full">
                {dividersRange.map(index => (
                    <DayDivider
                        key={index}
                        index={(index + 1) * calendarSettings.dividerStep}
                    />
                ))}
                {props.items?.map(item => (
                    <DayItem
                        key={`${item.title}${JSON.stringify(item.timeRange)}`}
                        item={item}
                    />
                ))}
            </div>
        </div>
    );
};