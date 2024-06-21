<script lang="ts" setup>
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
    <TimeRangeSingleInput :field :index="0" :subscriptionData label="Start" />
    <div class="hidden sm:block">&dash;</div>
    <TimeRangeSingleInput :field :index="1" :subscriptionData label="End" />
  </div>
</template>
