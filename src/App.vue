<template>
  <MobileTopBar />
  <AppSidebar />
  <main class="page-content">
    <AppBreadcrumb />
    <router-view />
  </main>
</template>

<script>
import AppSidebar from '@/components/layout/AppSidebar.vue';
import AppBreadcrumb from '@/components/layout/AppBreadcrumb.vue';
import MobileTopBar from '@/components/layout/MobileTopBar.vue';

export default {
  components: {
    AppSidebar,
    AppBreadcrumb,
    MobileTopBar,
  },
};
</script>

<style>
/* App-level styles are in src/styles/main.css */
</style>
