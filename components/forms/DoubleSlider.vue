<script setup lang="ts">
const props = defineProps<{
  range?: [number, number];
  modelValue: [number, number];
  step?: number;
  showLabels?: boolean;
}>();

const defaultStep = 15;
const currentValues = useVModel(props, 'modelValue');

const range = ref(props.range ?? [0, 100]);
const rangeInterval = range.value[1] - range.value[0];

const currentRangeStyles = computed(() => ({
  left: `${(currentValues.value?.[0] - range.value[0]) / rangeInterval * 100}%`,
  right: `${(rangeInterval - currentValues.value?.[1] + range.value[0]) / rangeInterval * 100}%`,
}));

const handleClasses = [
    'absolute -top-1 rounded-full bg-white shadow border-2 border-gray-200 h-4 w-4',
    'cursor-pointer hover:bg-gray-100',
]

function moveLeft(index: number) {
  const newValue: [number, number] = [...currentValues.value];
  newValue[index] -= props.step ?? defaultStep;
  const canMove = newValue.filter(t => t === newValue[index]).length && newValue[index] >= range.value[0];
  if (!canMove) return;
  currentValues.value = newValue;
}

function moveRight(index: number) {
  const newValue: [number, number] = [...currentValues.value];
  newValue[index] += props.step ?? defaultStep;
  const canMove = newValue.filter(t => t === newValue[index]).length && newValue[index] <= range.value[1];
  if (!canMove) return;
  currentValues.value = newValue;
}
</script>

<template>
  <div>
    <div v-if="showLabels" class="flex text-xs justify-between mb-2">
      <div>{{range[0]}}</div>
      <div>{{range[1]}}</div>
    </div>
    <div class="bg-gray-100 w-full h-2 rounded mb-2 relative">
      <div class="bg-main-300 h-full absolute top-0" :style="currentRangeStyles">
        <div tabindex="0" :class="[handleClasses, '-left-1']" @keydown.left="moveLeft(0)" @keydown.right="moveRight(0)" />
        <div tabindex="0" :class="[handleClasses, '-right-1']" @keydown.left="moveLeft(1)" @keydown.right="moveRight(1)" />
      </div>
    </div>
  </div>
</template>