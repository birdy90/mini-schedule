<script setup lang="ts">
const props = defineProps<{
  index: number;
  timeInterval: [number, number];
}>();

const dayDuration = props.timeInterval[1] - props.timeInterval[0];
const dividerStep = 100 / dayDuration;
const itemOffsetPercentage = props.index * dividerStep;
</script>

<template>
  <div
    :class="['border-l border-gray-200 absolute h-[calc(100%-0.5rem)] top-1']"
    :style="{
      left: `${itemOffsetPercentage}%`,
    }"
  />
</template>
