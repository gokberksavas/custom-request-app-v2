<script setup lang="ts">
const props = defineProps<{
  current: number;
  maxLength: number;
}>();
</script>

<template>
  <span class="character-counter">{{ `${current} / ${maxLength}` }}</span>
</template>

<style src="@/styles/character-counter.sass"></style>