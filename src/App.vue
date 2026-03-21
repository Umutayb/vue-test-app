<template>
  <AppSidebar />
  <main class="page-content">
    <AppBreadcrumb />
    <router-view />
  </main>
</template>

<script>
import AppSidebar from '@/components/layout/AppSidebar.vue';
import AppBreadcrumb from '@/components/layout/AppBreadcrumb.vue';

export default {
  components: {
    AppSidebar,
    AppBreadcrumb,
  },
};
</script>

<style>
/* App-level styles are in src/styles/main.css */
</style>
