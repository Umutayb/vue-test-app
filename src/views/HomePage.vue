<template>
  <div class="home-page">
    <h1>Pickleib Test Suite</h1>
    <p class="page-description">UI test automation target application</p>

    <div class="stats">
      <span class="stat">{{ totalComponents }} components</span>
      <span class="stat">{{ navigation.length }} categories</span>
    </div>

    <div class="category-grid">
      <router-link
        v-for="group in navigation"
        :key="group.category"
        :to="{ name: group.items[0].routeName }"
        class="home-card"
        :data-testid="`home-card-${group.items[0].routeName}`"
      >
        <h3>{{ group.category }}</h3>
        <p>{{ group.items.length }} {{ group.items.length === 1 ? 'component' : 'components' }}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { navigation } from '@/config/navigation';

export default {
  setup() {
    const totalComponents = computed(() =>
      navigation.reduce((sum, group) => sum + group.items.length, 0)
    );
    return { navigation, totalComponents };
  },
};
</script>

<style scoped>
.home-page {
  max-width: 48rem;
}

.stats {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat {
  font-size: 0.875rem;
  color: var(--text-muted);
  background-color: var(--accent-light);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
  gap: 1rem;
}

.home-card {
  display: block;
  padding: 1.25rem;
  background-color: var(--bg-sidebar);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  text-decoration: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.home-card:hover {
  border-color: var(--accent);
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.1);
}

.home-card h3 {
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.home-card p {
  color: var(--text-muted);
  font-size: 0.8125rem;
}
</style>
