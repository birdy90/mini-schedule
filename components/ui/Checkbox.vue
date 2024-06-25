<template>
  <div
    :class="[
      'flex gap-2 items-center',
      readonly && 'opacity-50 pointer-events-none',
    ]"
  >
    <input
      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
      type="checkbox"
      v-bind="$attrs"
    />
    <FormsUiLabel
      v-if="label"
      :for="$attrs.id"
      class="flex gap-2 items-baseline cursor-pointer"
      :label
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{ label?: string; readonly?: boolean }>();

defineOptions({
  inheritAttrs: false,
});
</script>
