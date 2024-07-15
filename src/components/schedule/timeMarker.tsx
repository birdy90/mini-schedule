import { useEffect, useState } from "react";
import { cn, datetimeToTimeIndex, timeIndexToOffsetPercentage } from "@/utils";
import { calendarSettings } from "@/data";

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

  const classes = cn(
    "border border-main-800/80 w-0 h-full top-0.5 absolute z-20",
    "after:content-[''] after:size-2 after:rounded-full after:bg-main-800/80 after:absolute after:-bottom-2 after:-left-1",
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
        left: `calc(${leftOffset}%)`,
      }}
    />
  );
};
