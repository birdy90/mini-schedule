<script lang="ts" setup>
import type AddModal from "~/components/schedule/AddModal.vue";
import type { ScheduleDayItem } from "~/types";

const { $pb } = useNuxtApp()
const initialized = ref(false);
const addModalRef = ref<InstanceType<typeof AddModal> | null>(null);
const storedItems = true ? useLocalStorage() : usePocketbaseStorage();
const authData = ref();

onMounted(() => {
  initialized.value = true;
});

function addItemModalShow() {
  addModalRef.value?.open();
}

function onAddItem(item: ScheduleDayItem) {
  storedItems.value.push(item);
}

async function onLogin() {
  authData.value = await $pb.collection('users').authWithOAuth2({ provider: 'google' });
}
</script>

<template>
  <main class="flex flex-col h-dvh p-2 gap-2 text-sm">
    <div class="flex justify-between items-center">
      <div class="flex justify-center items-center gap-4">
        <h1 class="h2 text-center">Mini Schedule</h1>
        <IconButton name="bi:plus" @click="addItemModalShow" />
      </div>

      <Button @click="onLogin">Login</Button>

      <ScheduleAddModal ref="addModalRef" @save="onAddItem" />
    </div>

    {{ authData }}

    <ScheduleWeek :items="storedItems" />

    <div class="text-sm">Grigorii Bederdinov @ 2024</div>
  </main>
</template>
