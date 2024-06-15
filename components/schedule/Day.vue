<script setup>
const props = defineProps(['index', 'items']);
const timeSettings = inject('time-settings');

const today = new Date();
const isToday = props.index === today.getDay();
</script>

<template>
  <div
    :class="[
      'border-2 border-gray-200 rounded-lg w-full grow shrink-0',
      'p-1 flex gap-2',
      { ['border-l-green-400']: isToday },
    ]"
  >
    <div class="relative h-full w-full">
      <ScheduleDayDivider
        v-for="i in timeSettings.stepsNumber - 1"
        :index="i * timeSettings.dividerStep"
        :timeInterval="[timeSettings.startTime, timeSettings.endTime]"
      />
      <ScheduleItem
        v-for="item in items"
        :item
        :timeInterval="[timeSettings.startTime, timeSettings.endTime]"
      />
    </div>
  </div>
</template>
