<script setup lang="ts">
import { useCalendarSettings } from "~/composables/useCalendarSettings";
import type { PlainScheduleDayItem } from "~/types";

const props = defineProps<{
  index?: number;
  items?: PlainScheduleDayItem[];
}>();
const timeSettings = useCalendarSettings();

const today = new Date();
const isToday = props.index === (today.getDay() || 7);

function onUpdated(callback: () => void) {
  console.log(props.items?.[0]);
}
</script>

<template>
  <div
    :class="[
      'border-2 border-gray-200 rounded-lg w-full grow shrink-0',
      'py-1 flex gap-2',
      {
        ['border-l-4 border-main-200 border-l-main-400 shadow-lg shadow-main-100']:
          isToday,
      },
    ]"
  >
    <div class="relative h-full w-full">
      <ScheduleDayDivider
        v-for="i in timeSettings.stepsNumber - 1"
        :index="i * timeSettings.dividerStep"
        :timeInterval="[timeSettings.startHour, timeSettings.endHour]"
      />
      <ScheduleItem
        v-for="item in items"
        :key="`${item.title}${JSON.stringify(item.timeRange)}`"
        :item
        :timeInterval="[timeSettings.startHour, timeSettings.endHour]"
      />
    </div>
  </div>
</template>
