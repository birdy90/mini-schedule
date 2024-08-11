import { calendarSettings, daysOfWeek } from "@/data";
import { cn } from "@/utils/cn";

export const DayNamesCol = () => {
  return (
    <div
      className={cn("flex flex-col gap-4 text-xs size-full")}
      style={{
        gridTemplateColumns: `repeat(${calendarSettings.dividerStepsCount}, 1fr)`,
      }}
    >
      {daysOfWeek.map((day, index) => (
        <div
          key={day}
          className={cn(
            "flex flex-col items-center justify-center grow",
            index >= 5 && "text-secondary-700",
          )}
        >
          <div className={cn("-rotate-90")}>{day}</div>
        </div>
      ))}
    </div>
  );
};
