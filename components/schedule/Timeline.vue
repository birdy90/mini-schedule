<script setup lang="ts">
import { useCalendarSettings } from "~/composables/useCalendarSettings";

const timeSettings = useCalendarSettings();

const timeString = (index: number): string => {
  const hour = index * timeSettings.dividerStep + timeSettings.startHour;
  return `${hour % 12 || 12}${hour < 12 || hour === 24 ? "am" : "pm"}`;
};
</script>

<template>
  <div
    class="grid text-xs relative px-2"
    :style="{ gridTemplateColumns: `repeat(${timeSettings.stepsNumber}, 1fr)` }"
  >
    <div v-for="i in timeSettings.stepsNumber" class="relative flex">
      <div
        :class="[
          i > 1 && 'absolute -translate-x-1/2',
          i === 1 && '-translate-x-2',
        ]"
      >
        {{ timeString(i - 1) }}
      </div>
      <div v-if="i === timeSettings.stepsNumber" class="absolute -right-2">
        {{ timeString(i) }}
      </div>
    </div>
  </div>
</template>
