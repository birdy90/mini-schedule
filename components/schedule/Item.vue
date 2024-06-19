<script setup lang="ts">
import type { PlainScheduleDayItem, ScheduleDayItem } from "~/types";
import { dateToTimeIndex } from "~/utils";

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
      item.regular
        ? 'bg-main-50 text-main-500 border border-gray-200'
        : 'bg-main-600 text-white shadow-lg shadow-main-700/20',
    ]"
    :style="{
      width: `calc(${itemWidthPercentage}% - 0.5rem)`,
      left: `calc(${itemOffsetPercentage}% + 0.25rem)`,
    }"
  >
    {{ item.title }}
  </div>
</template>
