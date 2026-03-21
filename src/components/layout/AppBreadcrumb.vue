<template>
  <div v-if="navItem" class="breadcrumb" data-testid="breadcrumb">
    <span class="breadcrumb-category">{{ navItem.category }}</span>
    <span class="breadcrumb-separator">›</span>
    <span class="breadcrumb-current">{{ navItem.label }}</span>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { findNavItem } from '@/config/navigation';

export default {
  setup() {
    const route = useRoute();
    const navItem = computed(() => findNavItem(route.name));
    return { navItem };
  },
};
</script>

<style scoped>
.breadcrumb {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-bottom: 1rem;
}

.breadcrumb-separator {
  margin: 0 0.25rem;
}

.breadcrumb-current {
  color: var(--accent);
}
</style>
