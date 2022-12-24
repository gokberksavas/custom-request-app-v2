<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const navItems = [
  { text: 'Ana Sayfa', name: 'homepage' },
  { text: 'Portfolyo', name: 'portfolio-page' },
  { text: 'İstek Formu', name: 'submission-page' },
];

const route = useRoute();
const currentPath = computed(() => {
  return route.name;
});
</script>

<template>
  <div class="layout-wrapper">
    <nav class="navigation-bar">
      <RouterLink :to="{ name: 'homepage' }">
        <div class="header">the figure shop</div>
      </RouterLink>
      <div class="navigation">
        <RouterLink v-for="(item, index) in navItems" :key="index" :to="{ name: item.name }">
          <div class="navigation-item" :class="{ 'active': item.name === currentPath }">{{ item.text }}</div>
        </RouterLink>
      </div>
    </nav>
    <main class="page-content">
      <RouterView />
    </main>
    <footer></footer>
  </div>
</template>

<style src="@/styles/main-layout.sass">

</style>
