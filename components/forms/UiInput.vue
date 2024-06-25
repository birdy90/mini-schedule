<template>
  <input :class="inputClasses" placeholder="..." />
</template>

<script setup lang="ts">
const props = defineProps<{
  invalid?: boolean;
}>();

const inputClasses = computed(() => [
  "border-2  p-1 px-2 rounded-lg min-w-0 h-8",
  props.invalid ? "border-red-500 focus:outline-red-500" : "border-gray-100",
]);
</script>
