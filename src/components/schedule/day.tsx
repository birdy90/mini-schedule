import { SimplifiedScheduleDayItem } from "@/types";
import { calendarSettings } from "@/data";
import { DayDivider } from "@/components/schedule/dayDivider";
import { cn } from "@/utils/cn";
import { DayItem } from "@/components/schedule/dayItem";
import { PreviewDayItem } from "@/components/schedule/previewDayItem";
import { TimeMarker } from "@/components/schedule/timeMarker";

interface DayProps {
  className?: string;
  index?: number;
  items?: SimplifiedScheduleDayItem[];
}

export const Day = (props: DayProps) => {
  const today = new Date();
  const isToday = props.index === (today.getDay() || 7);

  const dividersRange = Array(calendarSettings.dividerStepsCount - 1)
    .fill(0)
    .map((_, index) => index);

  return (
    <>
      <div
        className={cn(
          "relative border-2 border-x-4 border-gray-200 rounded-lg h-full grow shrink-0",
          "py-1 flex gap-2",
          isToday &&
            "border-main-200 border-l-main-400 shadow-lg shadow-main-100",
          props.className,
        )}
      >
        {dividersRange.map((index) => (
          <DayDivider
            key={index}
            index={(index + 1) * calendarSettings.dayDividerStep}
          />
        ))}

        {isToday && <TimeMarker />}

        {props.items?.map((item) => {
          const Component = item.preview ? PreviewDayItem : DayItem;
          return (
            <Component
              key={`${item.id}-${item.title}${JSON.stringify(item.timeRange)}`}
              item={item}
            />
          );
        })}
      </div>
    </>
  );
};
