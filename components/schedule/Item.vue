<script setup>
const props = defineProps(['item', 'timeInterval']);

function getTime(datetime) {
  return datetime.getHours() + datetime.getMinutes() / 60;
}

const itemStartTime = getTime(props.item.startDate);
const itemEndTime = getTime(props.item.endDate);
const dayDuration = props.timeInterval[1] - props.timeInterval[0];
const itemDuration = itemEndTime - itemStartTime;
const itemWidthPercentage = (itemDuration / dayDuration) * 100;
const itemOffset = itemStartTime - props.timeInterval[0];
const itemOffsetPercentage = (itemOffset / dayDuration) * 100;
</script>

<template>
  <div
    :class="[
      'border border-gray-200 rounded p-2 flex items-center justify-center absolute h-full text-xs',
      item.regular ? 'bg-gray-50 text-gray-400' : 'bg-green-50',
    ]"
    :style="{
      width: `calc(${itemWidthPercentage}% - 0.25rem)`,
      left: `calc(${itemOffsetPercentage}% + 0.25rem)`,
    }"
  >
    {{ item.title }}
  </div>
</template>
