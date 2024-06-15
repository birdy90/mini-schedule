<script setup>
import { useStorage } from '@vueuse/core';

const addModalRef = ref(null);

const items = [
  {
    title: 'working hours',
    regular: true,
    startDate: new Date('2024-06-10 14:00:00.000'),
    endDate: new Date('2024-06-10 23:00:00.000'),
  },
  {
    title: 'working hours',
    regular: true,
    startDate: new Date('2024-06-11 14:00:00.000'),
    endDate: new Date('2024-06-11 23:00:00.000'),
  },
  {
    title: 'working hours',
    regular: true,
    startDate: new Date('2024-06-12 14:00:00.000'),
    endDate: new Date('2024-06-12 23:00:00.000'),
  },
  {
    title: 'working hours',
    regular: true,
    startDate: new Date('2024-06-13 14:00:00.000'),
    endDate: new Date('2024-06-13 23:00:00.000'),
  },
  {
    title: 'working hours',
    regular: true,
    startDate: new Date('2024-06-14 14:00:00.000'),
    endDate: new Date('2024-06-14 23:00:00.000'),
  },
  {
    title: 'psy',
    regular: false,
    startDate: new Date('2024-06-04 12:00:00.000'),
    endDate: new Date('2024-06-04 13:00:00.000'),
  },
  {
    title: 'eng',
    regular: false,
    startDate: new Date('2024-06-04 13:00:00.000'),
    endDate: new Date('2024-06-04 14:30:00.000'),
  },
  {
    title: 'eng',
    regular: false,
    startDate: new Date('2024-06-06 12:00:00.000'),
    endDate: new Date('2024-06-06 13:30:00.000'),
  },
];

const storedItems = useStorage('schedule-items', [], undefined, {
  serializer: {
    read: (v) => {
      if (!v) return null;
      const parsed = JSON.parse(v);
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

if (storedItems.value.length === 0) {
  storedItems.value.push(...items);
}

function addItemModalShow() {
  addModalRef.value?.open();
}

watch(addModalRef, () => {
addItemModalShow();
});
</script>

<template>
  <main class="flex flex-col h-dvh p-2 gap-2 text-sm">
    <div class="flex justify-center items-center gap-4">
      <h1 class="h2 text-center">Mini Schedule</h1>
      <IconButton name="bi:plus" @click="addItemModalShow" />

      <ScheduleAddModal ref="addModalRef" />
    </div>

    <ScheduleWeek :items="storedItems" />

    <div class="text-sm">Grigorii Bederdinov @ 2024</div>
  </main>
</template>
