<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        class="modal-wrapper"
        @click.self="store.closeModal"
        v-if="store.modalState?.component"
      >
        <component
          :is="store.modalState?.component"
          v-bind="store.modalState?.props"
        />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import useModalStore from "~/stores/modalStore";

const store = useModalStore();
</script>
