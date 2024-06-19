const startTime: number = 8;
const endTime: number = 24;
const dividerStep: number = 2;
const selectionStep: number = 30;
const timeInterval = endTime - startTime;
const stepsNumber = timeInterval / dividerStep;

export function useCalendarSettings() {
  return {
    startHour: startTime,
    endHour: endTime,
    dividerStep,
    selectionStep,
    timeInterval,
    stepsNumber,
  };
}
