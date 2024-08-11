import { forwardRef, HTMLProps, RefAttributes } from "react";
import { cn } from "@/utils";

type WeekGridProps = HTMLProps<HTMLDivElement> & RefAttributes<HTMLDivElement>;

export const WeekGrid = forwardRef<HTMLDivElement, WeekGridProps>(
  (props, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative grid grid-rows-7 grow gap-4", props.className)}
      >
        {props.children}
      </div>
    );
  },
);
WeekGrid.displayName = "WeekGrid";
