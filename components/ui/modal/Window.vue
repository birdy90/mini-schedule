<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        class="fixed inset-0 z-40 size-dvh bg-black/20 flex items-center justify-center"
        @click.self="store.closeModal"
        v-if="store.modalState?.component"
      >
        <UiPanel
          class="sm:shadow-xl sm:w-2/3 md:w-1/2 xl:w-1/3 min-h-full sm:min-h-0 min-w-full sm:min-w-96"
        >
          <component
            :is="store.modalState?.component"
            v-bind="store.modalState?.props"
          />
        </UiPanel>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import useModalStore from "~/stores/modalStore";

const store = useModalStore();
</script>
