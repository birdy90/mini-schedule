import { forwardRef, HTMLProps, RefAttributes } from "react";
import { cn } from "@/utils";
import { useAppOrientation } from "@/components/providers/OrientationContext";

type WeekGridProps = HTMLProps<HTMLDivElement> & RefAttributes<HTMLDivElement>;

export const WeekGrid = forwardRef<HTMLDivElement, WeekGridProps>(
  (props, ref) => {
    const { isHorizontal } = useAppOrientation();

    return (
      <div
        ref={ref}
        className={cn(
          "size-full relative grid grow gap-0.5 sm:gap-4",
          isHorizontal ? "grid-rows-7" : "grid-cols-7 grid-rows-1",
          props.className,
        )}
      >
        {props.children}
      </div>
    );
  },
);
WeekGrid.displayName = "WeekGrid";
