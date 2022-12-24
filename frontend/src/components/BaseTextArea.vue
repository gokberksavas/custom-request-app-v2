<script setup lang="ts">
import { computed, ref } from 'vue';
import CharacterCounter from '@/components/CharacterCounter.vue';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
  maxLength: {
    type: Number,
    required: false,
    default: 500,
  },
  showCharCount: Boolean,
  placeHolder: {
    type: String,
    required: false,
  },
});

const isFocused = ref<boolean>(false);
const shrinkLabel = computed(() => {
  return !!props.modelValue || isFocused.value;
});
</script>

<template>
  <div class="text-area-wrapper">
    <span class="text-area-label" :class="{ 'value-exists': shrinkLabel }">{{ label }}</span>
    <textarea
      @focus="isFocused = true"
      @blur="isFocused = false"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      :value="modelValue"
      :maxlength="maxLength"
    ></textarea>
    <CharacterCounter
      v-if="showCharCount"
      v-show="shrinkLabel"
      :current="modelValue.length"
      :max-length="maxLength"
      :style="{ position: 'absolute', bottom: '.3rem', right: '.3rem' }"
    />
  </div>
</template>

<style src="@/styles/base-text-area.sass"></style>
