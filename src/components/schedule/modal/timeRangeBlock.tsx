import { TimeRangeInput } from "@/components/schedule/modal/timeRangeInput";
import { FormState } from "@tanstack/form-core";
import { SimplifiedScheduleDayItem } from "@/types";

interface TimeRangeBlockProps {
  field: any;
  subscriptionData: FormState<SimplifiedScheduleDayItem>;
}

export const TimeRangeBlock = (props: TimeRangeBlockProps) => {
  const rangeInputProps = {
    ...props,
    className: "w-full",
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 items-center w-full">
      <TimeRangeInput index={0} label="Start" {...rangeInputProps} />
      <div className="hidden sm:block"> -</div>
      <TimeRangeInput index={1} label="End" {...rangeInputProps} />
    </div>
  );
};
