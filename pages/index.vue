<script lang="ts" setup>
import { useStorage } from "@vueuse/core";
import type AddModal from "~/components/schedule/AddModal.vue";
import type { ScheduleDayItem } from "~/types";

const storageItemsKey = "schedule-items";

const initialized = ref(false);
const addModalRef = ref<InstanceType<typeof AddModal> | null>(null);
const storedItems = useStorage(storageItemsKey, [], undefined, {
  initOnMounted: true,
  serializer: {
    read: (v): ScheduleDayItem[] => {
      if (!v) return [];
      const parsed = JSON.parse(v) as ScheduleDayItem[];
      return [
        ...parsed.map((t) => ({
          ...t,
          startDate: new Date(t.startDate),
          endDate: new Date(t.endDate),
        })),
      ];
    },
    write: (v) => JSON.stringify(v),
  },
});

const items: ScheduleDayItem[] = [
  {
    title: "working hours",
    regular: true,
    background: true,
    startDate: new Date("2024-06-10 14:00:00.000"),
    endDate: new Date("2024-06-10 23:00:00.000"),
  },
  {
    title: "working hours",
    regular: true,
    background: true,
    startDate: new Date("2024-06-11 14:00:00.000"),
    endDate: new Date("2024-06-11 23:00:00.000"),
  },
  {
    title: "working hours",
    regular: true,
    background: true,
    startDate: new Date("2024-06-12 14:00:00.000"),
    endDate: new Date("2024-06-12 23:00:00.000"),
  },
  {
    title: "working hours",
    regular: true,
    background: true,
    startDate: new Date("2024-06-13 14:00:00.000"),
    endDate: new Date("2024-06-13 23:00:00.000"),
  },
  {
    title: "working hours",
    regular: true,
    background: true,
    startDate: new Date("2024-06-14 14:00:00.000"),
    endDate: new Date("2024-06-14 23:00:00.000"),
  },
  {
    title: "Sofia",
    regular: true,
    background: false,
    startDate: new Date("2024-06-04 12:00:00.000"),
    endDate: new Date("2024-06-04 13:00:00.000"),
  },
  {
    title: "eng",
    regular: true,
    background: false,
    startDate: new Date("2024-06-04 13:00:00.000"),
    endDate: new Date("2024-06-04 14:30:00.000"),
  },
  {
    title: "eng",
    regular: true,
    background: false,
    startDate: new Date("2024-06-06 12:00:00.000"),
    endDate: new Date("2024-06-06 13:30:00.000"),
  },
];

onMounted(() => {
  if (storedItems.value?.length === 0) {
    storedItems.value = [...items];
  }

  initialized.value = true;
});

function addItemModalShow() {
  addModalRef.value?.open();
}

function onAddItem(item: ScheduleDayItem) {
  storedItems.value.push(item);
}
</script>

<template>
  <main class="flex flex-col h-dvh p-2 gap-2 text-sm">
    <div class="flex justify-center items-center gap-4">
      <h1 class="h2 text-center">Mini Schedule</h1>
      <IconButton name="bi:plus" @click="addItemModalShow" />

      <ScheduleAddModal ref="addModalRef" @save="onAddItem" />
    </div>

    <ScheduleWeek :items="storedItems" />

    <div class="text-sm">Grigorii Bederdinov @ 2024</div>
  </main>
</template>
