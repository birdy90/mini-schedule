<template>
  <Teleport to="body">
    <dialog
      ref="dialogRef"
      class="sm:shadow-xl sm:border-2 border-gray-100 sm:rounded-lg sm:w-2/3 md:w-1/2 xl:w-1/3 min-h-full sm:min-h-0 min-w-full sm:min-w-96"
    >
      <div class="flex flex-col gap-2 h-full w-full">
        <h2 class="h3 sticky bg-white top-0 p-4 pb-2" v-if="title">
          {{ title }}
        </h2>

        <div class="grow overflow-auto px-4">
          <slot />
        </div>

        <div class="flex gap-2 justify-end sticky p-4 pt-2 bottom-0 bg-white">
          <slot name="controls" />

          <UiButton @click="close()">Cancel</UiButton>
        </div>
      </div>
    </dialog>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string;
  visible?: boolean;
}>();

const dialogRef = ref<HTMLDialogElement | null>(null);

function open() {
  nextTick(() => {
    dialogRef.value?.showModal();
  });
}

function close() {
  dialogRef.value?.close();
}

defineExpose({
  open,
  close,
});
</script>
