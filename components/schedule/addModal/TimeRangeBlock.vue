<script setup lang="ts">
import TimeRangeSingleInput from "~/components/schedule/addModal/TimeRangeSingleInput.vue";
import type { FormState } from "@tanstack/vue-form";
import type { PlainScheduleDayItem } from "~/types";

defineProps<{
  field: any;
  subscriptionData: FormState<PlainScheduleDayItem>;
}>();
</script>

<template>
  <div class="flex gap-x-2 items-center w-full">
    <TimeRangeSingleInput label="Start" :field :subscriptionData :index="0" />
    <div class="hidden sm:block">&dash;</div>
    <TimeRangeSingleInput label="End" :field :subscriptionData :index="1" />
  </div>
</template>
