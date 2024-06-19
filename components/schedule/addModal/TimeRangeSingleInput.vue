<script setup lang="ts">
import { FieldApi, type FormState } from "@tanstack/vue-form";
import type { PlainScheduleDayItem } from "~/types";
import { useCalendarSettings } from "~/composables/useCalendarSettings";

const props = defineProps<{
  field: any;
  subscriptionData: FormState<PlainScheduleDayItem>;
  label: string;
  index: number;
}>();

const timeSettings = useCalendarSettings();

function handleChange(operation: (a: number, b: number) => number) {
  const newRange: [number, number] = [...props.field.state.value] as [
    number,
    number,
  ];

  const newValue = operation(
    newRange[props.index],
    timeSettings.selectionStep / 60,
  );
  newRange[props.index] = newValue;

  const hoursOverlap =
    newRange.filter((t) => Math.round(t * 100) === Math.round(newValue * 100))
      .length === 2;
  const isWithinRange =
    (props.index === 0 && newRange[props.index] >= timeSettings.startHour) ||
    (props.index === 1 && newRange[props.index] <= timeSettings.endHour);
  const canMove = !hoursOverlap && isWithinRange;

  if (!canMove) return;
  props.field.handleChange(newRange);
}

function onAdd() {
  handleChange((a, b) => a + b);
}

function onSubtract() {
  handleChange((a, b) => a - b);
}
</script>

<template>
  <div class="flex items-center min-w-0">
    <div class="mr-2 shrink-0">{{ label }}</div>
    <FormsUiInput
      id="start-time-input"
      tabindex="-1"
      class="rounded-r-none text-right pointer-events-none"
      placeholder="Start time"
      readonly
      :name="field.name"
      :value="timeIndexToTimeString(subscriptionData.values.timeRange[index])"
    />
    <IconButton
      class="shrink-0 rounded-none border-x-0"
      name="bi:plus"
      @click="onAdd"
    />
    <IconButton
      class="shrink-0 rounded-l-none"
      name="bi:dash"
      @click="onSubtract"
    />
  </div>
</template>
