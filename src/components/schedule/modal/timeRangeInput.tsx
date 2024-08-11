import { FormState } from "@tanstack/form-core";
import { ItemTimeRange, SimplifiedScheduleDayItem } from "@/types";
import { ActionIcon, Input } from "@mantine/core";
import { calendarSettings } from "@/data";
import { timeIndexToTimeString } from "@/utils/schedule";
import { BsDash, BsPlus } from "react-icons/bs";

interface TimeRangeInputProps {
  field: any;
  subscriptionData: FormState<SimplifiedScheduleDayItem>;
  label: string;
  index: 0 | 1;
}

export const TimeRangeInput = (props: TimeRangeInputProps) => {
  function calculateNewPos(
    operation: (a: number, b: number) => number,
    value: number,
  ): number {
    return operation(value, calendarSettings.minChangeStep / 60);
  }

  function isOutOfRange(item: number): boolean {
    return item < calendarSettings.startTime || item > calendarSettings.endTime;
  }

  function isOnRangeBorder(item: number): boolean {
    return (
      item === calendarSettings.startTime || item === calendarSettings.endTime
    );
  }

  function handleChange(operation: (a: number, b: number) => number) {
    const newRange = [...props.field.state.value] as ItemTimeRange;

    newRange[props.index] = calculateNewPos(operation, newRange[props.index]);
    if (isOutOfRange(newRange[props.index])) return;

    if (newRange[0] === newRange[1]) {
      if (!isOnRangeBorder(newRange[1 - props.index])) {
        newRange[1 - props.index] = calculateNewPos(
          operation,
          newRange[1 - props.index],
        );
      }
    }

    if (newRange[0] === newRange[1]) return;
    props.field.handleChange(newRange);
  }

  function onAdd() {
    handleChange((a, b) => a + b);
  }

  function onSubtract() {
    handleChange((a, b) => a - b);
  }

  return (
    <div className="flex items-center min-w-0 w-full mx-auto">
      <div className="mr-2 shrink-0 grow text-sm font-medium text-right">
        {props.label}
      </div>

      <Input
        id="start-time-input"
        name={props.field.name}
        value={timeIndexToTimeString(
          props.subscriptionData.values.timeRange[props.index],
        )}
        classNames={{
          wrapper: "rounded-none pointer-events-none",
          input: "!text-center px-2",
        }}
        placeholder="Start time"
        readOnly
        tabIndex={-1}
        leftSectionPointerEvents="all"
        leftSection={
          <ActionIcon
            aria-label="Add item"
            onClick={onSubtract}
            variant="light"
          >
            <BsDash />
          </ActionIcon>
        }
        rightSectionPointerEvents="all"
        rightSection={
          <ActionIcon aria-label="Add item" onClick={onAdd} variant="light">
            <BsPlus />
          </ActionIcon>
        }
      />
    </div>
  );
};
