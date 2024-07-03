import {calendarSettings} from "@/data";

interface DayDividerProps {
    index: number;
}

export const DayDivider = (props: DayDividerProps) => {
    const dayDuration = calendarSettings.endTime - calendarSettings.startTime;
    const dividerStep = 100 / dayDuration;
    const itemOffsetPercentage = props.index * dividerStep;

    return <>
        <div
            className={'border-l border-gray-200 absolute h-[calc(100%-0.5rem)] top-1'}
            style={{
                left: `${itemOffsetPercentage}%`,
            }}
        />
    </>
};