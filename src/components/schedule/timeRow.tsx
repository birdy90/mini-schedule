import { calendarSettings } from "@/data";
import { cn } from "@/utils/cn";
import { useAppOrientation } from "@/components/providers/OrientationContext";

export const TimeRow = () => {
  const { isVertical, isHorizontal } = useAppOrientation();

  const timeString = (index: number): string => {
    const hour =
      index * calendarSettings.dayDividerStep + calendarSettings.startTime;
    return `${hour % 12 || 12}${hour < 12 || hour === 24 ? "am" : "pm"}`;
  };

  return (
    <div className={cn("flex", isHorizontal && "flex-col")}>
      <div
        className={cn("grid text-xs relative", isHorizontal ? "px-2" : "py-1")}
        style={{
          [isHorizontal ? "gridTemplateColumns" : "gridTemplateRows"]:
            `repeat(${calendarSettings.dividerStepsCount}, 1fr)`,
        }}
      >
        {Array(calendarSettings.dividerStepsCount)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className={cn("relative flex", isHorizontal ? "h-4" : "w-4")}
            >
              <div
                className={cn(
                  isVertical
                    ? "-rotate-90 -translate-x-1/4 -translate-y-1/2"
                    : "-translate-x-1/2",
                  "absolute",
                  i === 0 &&
                    (isHorizontal ? "-translate-x-2" : "translate-y-0"),
                )}
              >
                {timeString(i)}
              </div>

              {i === calendarSettings.dividerStepsCount - 1 && (
                <div
                  className={cn(
                    isVertical
                      ? "-rotate-90 -right-1.5 bottom-0.5"
                      : "-right-2",
                    "absolute",
                  )}
                >
                  {timeString(i + 1)}
                </div>
              )}
            </div>
          ))}
      </div>

      <div
        className={cn(
          "flex justify-between",
          isHorizontal ? "h-2 pl-1 pr-[3px]" : "flex-col w-2 pt-1 pb-[3px]",
        )}
      >
        {Array(calendarSettings.endTime - calendarSettings.startTime + 1)
          .fill(0)
          .map((_, i) => {
            return (
              <div
                key={i}
                className={cn(
                  "border-gray-300",
                  isHorizontal ? "border-r h-full" : "border-t w-full",
                )}
              />
            );
          })}
      </div>
    </div>
  );
};
