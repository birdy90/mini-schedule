<script setup lang="ts">
import type { PlainScheduleDayItem } from "~/types";

const props = defineProps<{
  item: PlainScheduleDayItem;
  timeInterval: [number, number];
}>();

const itemStartTime = props.item.timeRange[0];
const itemEndTime = props.item.timeRange[1];
const dayDuration = props.timeInterval[1] - props.timeInterval[0];
const itemDuration = itemEndTime - itemStartTime;
const itemWidthPercentage = (itemDuration / dayDuration) * 100;
const itemOffset = itemStartTime - props.timeInterval[0];
const itemOffsetPercentage = (itemOffset / dayDuration) * 100;
</script>

<template>
  <div
    :class="[
      'rounded p-0.5 flex items-center justify-center absolute h-full text-xs',
      item.regular ? 'text-main-500' : 'text-secondary-500',
      item.background ? 'border-gray-200' : 'text-white shadow-lg',
      item.regular
        ? item.background
          ? 'bg-main-50 border '
          : 'bg-main-600 shadow-main-700/40'
        : item.background
          ? 'bg-secondary-50 border'
          : 'bg-secondary-600 shadow-secondary-700/40',
    ]"
    :style="{
      width: `calc(${itemWidthPercentage}% - 0.5rem)`,
      left: `calc(${itemOffsetPercentage}% + 0.25rem)`,
    }"
  >
    {{ item.title }}
  </div>
</template>
