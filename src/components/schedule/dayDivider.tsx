import { calendarSettings } from "@/data";
import { cn } from "@/utils";
import { useAppOrientation } from "@/components/providers/OrientationContext";
import { DayDividerProps } from "@/types";

export const DayDivider = (props: DayDividerProps) => {
  const dayDuration = calendarSettings.endTime - calendarSettings.startTime;
  const dividerStep = 100 / dayDuration;
  const itemOffsetPercentage = props.index * dividerStep;
  const { isHorizontal } = useAppOrientation();

  return (
    <>
      <div
        className={cn(
          "border-gray-200 absolute",
          isHorizontal ? "border-l h-full" : "border-y w-full",
        )}
        style={{
          [isHorizontal ? "left" : "top"]: `${itemOffsetPercentage}%`,
        }}
      />
    </>
  );
};
