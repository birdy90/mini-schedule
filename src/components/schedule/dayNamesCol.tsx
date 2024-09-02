import { daysOfWeek } from "@/data";
import { cn } from "@/utils/cn";
import { useAppOrientation } from "@/components/providers/OrientationContext";
import { WeekGrid } from "@/components/schedule/weekGrid";

export const DayNamesCol = () => {
  const { isHorizontal } = useAppOrientation();

  return (
    <WeekGrid className={cn("text-xs")}>
      {daysOfWeek.map((day, index) => (
        <div
          key={day}
          className={cn(
            "flex items-center justify-center grow",
            index >= 5 && "text-secondary-700",
          )}
        >
          <div className={cn(isHorizontal && "-rotate-90")}>
            {day.toLowerCase()}
          </div>
        </div>
      ))}
    </WeekGrid>
  );
};
