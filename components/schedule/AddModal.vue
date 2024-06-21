<script lang="ts" setup>
import type { PlainScheduleDayItem, ScheduleDayItem } from "~/types";
import { useForm } from "@tanstack/vue-form";
import type { ModalWindow } from "#components";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { dateRangeToTimeIndex } from "~/utils";
import TimeRangeBlock from "~/components/schedule/addModal/TimeRangeBlock.vue";

const emits = defineEmits<{
  save: [value: ScheduleDayItem];
}>();

const today = new Date();
const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const modalRef = ref<InstanceType<typeof ModalWindow> | null>(null);
const datesIntervalValue = [
  new Date(`2024-06-20 ${Math.max(Math.min(today.getHours(), 23), 8)}:00:00`),
  new Date(
    `2024-06-20 ${Math.max(Math.min(today.getHours(), 23), 8) + 1}:00:00`,
  ),
] as [Date, Date];

const form = useForm<PlainScheduleDayItem, typeof zodValidator>({
  validatorAdapter: zodValidator,
  defaultValues: {
    title: "",
    timeRange: dateRangeToTimeIndex(datesIntervalValue),
    regular: true,
    background: false,
    day: new Date().getDay() || 7,
  },
  onSubmit: async ({ value }) => {
    emits("save", fromPlainItem(value));
    modalRef.value?.close();
    form.reset();
  },
});

defineExpose({
  open() {
    modalRef.value?.open();
  },
  close() {
    modalRef.value?.close();
  },
});
</script>

<template>
  <ModalWindow ref="modalRef" title="New calendar item">
    <div class="flex flex-col gap-4">
      <form.Field
        :validators="{ onChange: z.string().min(1, 'Event name is required') }"
        name="title"
      >
        <template v-slot="{ field }">
          <div class="flex flex-col">
            <FormsUiLabel class="mb-1" for="title-input" label="Event name" />
            <FormsUiInput
              id="title-input"
              :invalid="field.state.meta.errors.length > 0"
              :name="field.name"
              :value="field.state.value"
              placeholder="Put event name here"
              @blur="field.handleBlur"
              @change="(e) => field.handleChange(e.target.value)"
            />
            <div
              v-if="field.state.meta.errors.length > 0"
              class="text-xs text-red-500"
            >
              <div v-for="err in field.state.meta.errors">{{ err }}</div>
            </div>
          </div>
        </template>
      </form.Field>

      <form.Subscribe>
        <template v-slot="data">
          <div class="flex flex-col gap-1">
            <ScheduleTimeline />
            <ScheduleDay
              :items="[{...data.values, preview: true}]"
              class="h-14"
            />
          </div>

          <form.Field name="day">
            <template v-slot="{ field }">
              <div>
                <div class="flex gap-1 sm:gap-2">
                  <Button
                    v-for="(item, i) in daysOfWeek"
                    :class="[
                      'grow items-center justify-center text-sm',
                      data.values.day === i + 1 &&
                        'border-transparent bg-main-600 hover:bg-main-600 active:bg-main-600 shadow-lg shadow-main-700/20 text-white pointer-events-none',
                    ]"
                    :tabindex="data.values.day === i + 1 ? -1 : 0"
                    @click="() => field.handleChange(i + 1)"
                  >
                    {{ item }}
                  </Button>
                </div>
              </div>
            </template>
          </form.Field>

          <form.Field name="timeRange">
            <template v-slot="{ field }">
              <TimeRangeBlock :field :subscriptionData="data" />
            </template>
          </form.Field>

          <form.Field name="regular">
            <template v-slot="{ field }">
              <Checkbox
                id="regular-input"
                :checked="field.state.value as boolean"
                label="Is a regular event"
                @change="
                  (e) =>
                    field.handleChange((e.target as HTMLInputElement).checked)
                "
              />
            </template>
          </form.Field>

          <form.Field name="background">
            <template v-slot="{ field }">
              <Checkbox
                id="background-input"
                :checked="field.state.value as boolean"
                label="Is a background event"
                @change="
                  (e) =>
                    field.handleChange((e.target as HTMLInputElement).checked)
                "
              />
            </template>
          </form.Field>
        </template>
      </form.Subscribe>
    </div>

    <template v-slot:controls>
      <Button @click="form.handleSubmit()">Save</Button>
    </template>
  </ModalWindow>
</template>
