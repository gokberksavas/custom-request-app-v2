<script setup lang="ts">
import { computed, ref } from '@vue/reactivity';

const props = defineProps<{
  type: 'text' | 'number' | 'email' | 'password' | 'tel';
  label: string;
  modelValue: string | number | Date;
}>();
const isFocused = ref(false);

const shrinkLabel = computed(() => {
  return !!props.modelValue || isFocused.value;
});
</script>

<template>
  <div class="input-wrapper">
    <span class="input-label" :class="{ 'value-exists': shrinkLabel }">{{ label }}</span>
    <input
      @focus="isFocused = true"
      @blur="isFocused = false"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :value="modelValue"
      :type="type"
    />
  </div>
</template>

<style src="@/styles/base-input.sass"></style>
