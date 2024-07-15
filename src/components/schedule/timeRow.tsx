import { calendarSettings } from "@/data";
import { cn } from "@/utils/cn";

export const TimeRow = () => {
  const timeString = (index: number): string => {
    const hour =
      index * calendarSettings.dayDividerStep + calendarSettings.startTime;
    return `${hour % 12 || 12}${hour < 12 || hour === 24 ? "am" : "pm"}`;
  };

  return (
    <div
      className="grid text-xs relative px-2"
      style={{
        gridTemplateColumns: `repeat(${calendarSettings.dividerStepsCount}, 1fr)`,
      }}
    >
      {Array(calendarSettings.dividerStepsCount)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="relative flex">
            <div
              className={cn(
                "absolute -translate-x-1/2",
                i === 0 && "relative -translate-x-2",
              )}
            >
              {timeString(i)}
            </div>

            {i === calendarSettings.dividerStepsCount - 1 && (
              <div className="absolute -right-2">{timeString(i + 1)}</div>
            )}
          </div>
        ))}
    </div>
  );
};
