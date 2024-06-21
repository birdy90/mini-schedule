<script setup lang="ts">
import type { PlainScheduleDayItem } from "~/types";

const props = defineProps<{
  item: PlainScheduleDayItem;
  timeInterval: [number, number];
  preview?: boolean;
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
      'rounded absolute bottom-0',
      ...(item.preview ? [
        'border-2 top-0 bottom-0',
        item.regular
            ? 'border-main-700 shadow-main-700/40'
            : 'border-secondary-700 shadow-secondary-700/40',
      ] : [
        'p-0.5 flex justify-center text-xs',
        item.regular ? 'text-main-500' : 'text-secondary-500',
        item.background ? 'border-gray-200 top-0 items-start' : 'text-white shadow-lg top-5 items-center',
        item.regular
          ? item.background
            ? 'bg-main-50 border'
            : 'bg-main-600 shadow-main-700/40'
          : item.background
            ? 'bg-secondary-50 border'
            : 'bg-secondary-600 shadow-secondary-700/40',
      ]),
    ]"
    :style="{
      width: `calc(${itemWidthPercentage}% - ${0.25}rem)`,
      left: `calc(${itemOffsetPercentage}% + ${0.125}rem)`,
    }"
  >
  <span :class="[itemDuration < 1 && '-rotate-90', 'leading-none']">
    {{ item.preview ? '' : item.title }}
  </span>
  </div>
</template>
