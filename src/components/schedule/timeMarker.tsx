import { useEffect, useState } from "react";
import { cn, datetimeToTimeIndex, timeIndexToOffsetPercentage } from "@/utils";
import { calendarSettings } from "@/data";
import { useAppOrientation } from "@/components/providers/OrientationContext";

const getCurrentTimeIndex = () => {
  const today = new Date();
  return datetimeToTimeIndex(today);
};

/*
this indicator works only within <Day/> component, as it relies on its layout
 */
export const TimeMarker = () => {
  const [currentTime, setCurrentTime] = useState(getCurrentTimeIndex());
  const leftOffset = timeIndexToOffsetPercentage(currentTime);
  const { isHorizontal } = useAppOrientation();

  const classes = cn(
    "border border-main-900/90 absolute z-20",
    "after:content-[''] after:size-2 after:rounded-full after:bg-main-900/90 after:absolute",
    isHorizontal
      ? "top-0.5 h-full w-0 after:-left-1 after:-bottom-2"
      : "left-0.5 w-full h-0 after:-top-1 after:-right-2",
  );

  useEffect(() => {
    const interval = setInterval(
      () => {
        setCurrentTime(getCurrentTimeIndex());
      },
      2 * 60 * 1000,
    );

    return () => clearInterval(interval);
  }, []);

  if (
    currentTime < calendarSettings.startTime ||
    currentTime > calendarSettings.endTime
  ) {
    return null;
  }

  return (
    <div
      className={classes}
      style={{
        [isHorizontal ? "left" : "top"]: `calc(${leftOffset}%)`,
      }}
    />
  );
};
