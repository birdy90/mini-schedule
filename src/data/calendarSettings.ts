const startTime = 8;
const endTime = 24;
const dayDuration = endTime - startTime;
const dayDividerStep = 2;
const minChangeStep = 15;
const stepsPerHour = 60 / minChangeStep;
const stepsPerDay = (60 * dayDuration) / minChangeStep;
const selectionStepCount = dayDuration * stepsPerHour;
const dividerStepsCount = dayDuration / dayDividerStep;

export const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const calendarSettings = {
  startTime,
  endTime,
  dayDividerStep,
  minChangeStep,
  stepsPerHour,
  stepsPerDay,
  dayDuration,
  dividerStepsCount,
  selectionStepCount,
};
