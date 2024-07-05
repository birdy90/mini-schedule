import {FormState} from "@tanstack/form-core";
import {PlainScheduleDayItem} from "@/types";
import {ActionIcon, Input} from "@mantine/core";
import {BsDash} from "@react-icons/all-files/bs/BsDash";
import {calendarSettings} from "@/data";
import {BsPlus} from "@react-icons/all-files/bs/BsPlus";
import {timeIndexToTimeString} from "@/utils";

interface TimeRangeInputProps {
    field: any;
    subscriptionData: FormState<PlainScheduleDayItem>;
    label: string;
    index: 0 | 1;
}

export const TimeRangeInput = (props: TimeRangeInputProps) => {
    function calculateNewPos(
        operation: (a: number, b: number) => number,
        value: number,
    ): number {
        return operation(value, calendarSettings.selectionStep / 60);
    }

    function isOutOfRange(item: number): boolean {
        return item < calendarSettings.startTime || item > calendarSettings.endTime;
    }

    function isOnRangeBorder(item: number): boolean {
        return item === calendarSettings.startTime || item === calendarSettings.endTime;
    }

    function handleChange(operation: (a: number, b: number) => number) {
        const newRange: [number, number] = [...props.field.state.value] as [
            number,
            number,
        ];

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
        <div className="flex items-center min-w-0">
            <div className="mr-2 shrink-0">{ props.label }</div>

            <Input
                id="start-time-input"
                name={props.field.name}
                value={timeIndexToTimeString(props.subscriptionData.values.timeRange[props.index])}
                className="rounded-none text-right pointer-events-none"
                placeholder="Start time"
                readOnly
                tabIndex={-1}
                leftSectionPointerEvents="all"
                leftSection={
                    <ActionIcon aria-label="Add item" onClick={onSubtract} variant="light">
                        <BsDash/>
                    </ActionIcon>
                }
                rightSectionPointerEvents="all"
                rightSection={
                    <ActionIcon aria-label="Add item" onClick={onAdd} variant="light">
                        <BsPlus/>
                    </ActionIcon>
                }
            />
        </div>
    )
}