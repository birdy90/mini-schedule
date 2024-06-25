<template>
  <ScheduleTimeline />
  <div class="grid grid-rows-7 gap-4 grow mb-4">
    <ScheduleDay
      v-for="i in 7"
      :index="i"
      :items="processedItems[i]?.map(toPlainItem)"
    />
  </div>
</template>

<script setup lang="ts">
import type { ScheduleDayItem } from "~/types";
import { toPlainItem } from "~/utils";

const props = defineProps<{
  items: ScheduleDayItem[];
}>();

const processedItems = computed(() => {
  const itemsWithDays = props.items.map<ScheduleDayItem>((item) => ({
    ...item,
    day: item.startDate.getDay(),
  }));

  return itemsWithDays.reduce(
    (acc, item) => {
      if (item.day) {
        acc[item.day] = acc[item.day] ?? [];
        acc[item.day].push(item);
      }
      return acc;
    },
    {} as Record<number, ScheduleDayItem[]>,
  );
});
</script>
