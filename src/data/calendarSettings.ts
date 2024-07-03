const startTime = 8;
const endTime = 24;
const dividerStep = 2;
const selectionStep = 30;
const timeInterval = endTime - startTime;
const stepsNumber = timeInterval / dividerStep;

export const calendarSettings = {
    startTime,
    endTime,
    dividerStep,
    selectionStep,
    timeInterval,
    stepsNumber,
};
