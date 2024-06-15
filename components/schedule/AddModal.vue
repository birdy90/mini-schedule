<script setup>
const modalRef = ref(null);

defineExpose({
  open() {
    modalRef.value?.open();
  },
  close() {
    modalRef.value?.close();
  },
});
</script>

<template>
  <Dialog ref="modalRef" title="New calendar item">
    <div>
      <ScheduleDay />
    </div>
    <template v-slot:controls>
      <Button>Save</Button>
    </template>
  </Dialog>
</template>
