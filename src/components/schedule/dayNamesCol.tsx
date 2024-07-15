import { calendarSettings, daysOfWeek } from "@/data";
import { cn } from "@/utils/cn";

export const DayNamesCol = () => {
  const timeString = (index: number): string => {
    const hour =
      index * calendarSettings.dayDividerStep + calendarSettings.startTime;
    return `${hour % 12 || 12}${hour < 12 || hour === 24 ? "am" : "pm"}`;
  };

  return (
    <div
      className="flex flex-col gap-4 text-xs size-full"
      style={{
        gridTemplateColumns: `repeat(${calendarSettings.dividerStepsCount}, 1fr)`,
      }}
    >
      {daysOfWeek.map((day) => (
        <div
          key={day}
          className="flex flex-col items-center justify-center grow"
        >
          <div className={cn("-rotate-90")}>{day}</div>
        </div>
      ))}
    </div>
  );
};
