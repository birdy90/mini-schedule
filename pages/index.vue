<template>
  <main class="flex flex-col h-dvh p-2 gap-2 text-sm">
    <div class="flex justify-between items-center">
      <div class="flex justify-center items-center gap-4">
        <h1 class="h2 text-center">Mini Schedule</h1>
        <UiIconButton name="bi:plus" @click="addItemModalShow" />
      </div>

      <template v-if="initialized">
        <UiButton v-if="isAuthorized" @click="onLogout">Logout</UiButton>
        <UiButton v-else @click="onLogin">Login</UiButton>
      </template>

      <!--      <ScheduleAddModal ref="addModalRef" @save="onAddItem" />-->
    </div>

    <ScheduleWeek :items="[]" />
    {{ storedItems }}

    <div class="text-sm">Grigorii Bederdinov @ 2024</div>
  </main>
</template>

<script lang="ts" setup>
import type AddModal from "~/components/schedule/AddModal.vue";
import type { ScheduleDayItem } from "~/types";
import type { BaseAuthStore } from "pocketbase";
import type { Ref } from "@vue/reactivity";

const { $pb } = useNuxtApp();

const authData = ref<Pick<BaseAuthStore, "token" | "model">>({
  token: "",
  model: null,
});
const initialized = ref(false);
const addModalRef = ref<InstanceType<typeof AddModal> | null>(null);
const storedItems = ref<Ref<ScheduleDayItem[]>>(usePocketbaseStorage());

const isAuthorized = computed(() => {
  return authData.value && authData.value.token && authData.value.model;
});

onMounted(() => {
  initialized.value = true;
  authData.value = { token: $pb.authStore.token, model: $pb.authStore.model };

  $pb.authStore.onChange((token, model) => {
    authData.value = { token, model };
  });

  // storedItems = isAuthorized ? usePocketbaseStorage() : useLocalStorage();
});

function addItemModalShow() {
  addModalRef.value?.open();
}

function onAddItem(item: ScheduleDayItem) {
  console.log(item);
  storedItems.value.push(item);
}

async function onLogin() {
  await $pb.collection("users").authWithOAuth2({ provider: "google" });
}

async function onLogout() {
  $pb.authStore.clear();
}
</script>
