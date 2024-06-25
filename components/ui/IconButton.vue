<template>
  <UiButton class="!p-1 w-8 items-center justify-center">
    <client-only>
      <Icon :name="name" />
    </client-only>
  </UiButton>
</template>

<script setup lang="ts">
defineProps<{ name: string }>();
</script>
