<template>
  <div class="flex items-center min-w-0">
    <div class="mr-2 shrink-0">{{ label }}</div>
    <IconButton
      class="shrink-0 rounded-r-none border-r-0"
      name="bi:dash"
      @click="onSubtract"
    />
    <FormsUiInput
      id="start-time-input"
      :name="field.name"
      :value="timeIndexToTimeString(subscriptionData.values.timeRange[index])"
      class="rounded-none text-right pointer-events-none"
      placeholder="Start time"
      readonly
      tabindex="-1"
    />
    <IconButton
      class="shrink-0 rounded-l-none border-l-0"
      name="bi:plus"
      @click="onAdd"
    />
  </div>
</template>

<script lang="ts" setup>
import { type FormState } from "@tanstack/vue-form";
import type { PlainScheduleDayItem } from "~/types";
import { useCalendarSettings } from "~/composables/useCalendarSettings";

const props = defineProps<{
  field: any;
  subscriptionData: FormState<PlainScheduleDayItem>;
  label: string;
  index: 0 | 1;
}>();

const timeSettings = useCalendarSettings();

function calculateNewPos(
  operation: (a: number, b: number) => number,
  value: number,
): number {
  return operation(value, timeSettings.selectionStep / 60);
}

function isOutOfRange(item: number): boolean {
  return item < timeSettings.startHour || item > timeSettings.endHour;
}

function isOnRangeBorder(item: number): boolean {
  return item === timeSettings.startHour || item === timeSettings.endHour;
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
</script>
