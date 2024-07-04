import {TimeRangeInput} from "@/components/schedule/modal/timeRangeInput";
import {FormState} from "@tanstack/form-core";
import {PlainScheduleDayItem} from "@/types";

interface TimeRangeBlockProps {
  field: any;
  subscriptionData: FormState<PlainScheduleDayItem>;
}

export const TimeRangeBlock = (props: TimeRangeBlockProps) => {
    return (
      <div className="flex gap-x-2 items-center w-full">
        <TimeRangeInput index={0} label="Start" {...props} />
        <div className="hidden sm:block"> - </div>
        <TimeRangeInput index={1} label="End" {...props} />
      </div>
    )
}