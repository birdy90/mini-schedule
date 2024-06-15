<script setup>
defineProps(['name']);
</script>

<template>
  <Button class="!p-1">
    <Icon :name="name" />
  </Button>
</template>
