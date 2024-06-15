<script setup>
const props = defineProps(['items']);

const startTime = 8;
const endTime = 26;
const dividerStep = 2;
const timeInterval = endTime - startTime;
const stepsNumber = timeInterval / dividerStep;

const timeSettings = provide('time-settings', {
  startTime,
  endTime,
  dividerStep,
  timeInterval,
  stepsNumber,
});

const timeString = (index) => {
  const hour = (index * dividerStep + startTime) % 24;
  return (hour === 0 ? '24' : hour) + ':00';
};

const processedItems = computed(() => {
  const itemsWithDays = props.items.map((item) => ({
    ...item,
    day: item.startDate.getDay(),
  }));

  const itemsMappedToDays = itemsWithDays.reduce((acc, item) => {
    acc[item.day] = acc[item.day] ?? [];
    acc[item.day].push(item);
    return acc;
  }, {});
  return itemsMappedToDays;
});
</script>

<template>
  <div
    class="grid text-xs relative px-2 mt-4"
    :style="{ gridTemplateColumns: `repeat(${stepsNumber}, 1fr)` }"
  >
    <div v-for="i in stepsNumber" class="relative flex">
      <div
        :class="[
          i > 1 && 'absolute -translate-x-1/2',
          i === 1 && '-translate-x-2',
        ]"
      >
        {{ timeString(i - 1) }}
      </div>
      <div v-if="i === stepsNumber" class="absolute -right-2">
        {{ timeString(i) }}
      </div>
    </div>
  </div>

  <div class="grid grid-rows-7 gap-4 grow mb-4">
    <ScheduleDay v-for="i in 7" :index="i" :items="processedItems[i]" />
  </div>
</template>
