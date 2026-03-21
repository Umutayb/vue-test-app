<template>
  <router-link
    :to="{ name: routeName }"
    class="nav-item"
    :class="{ active: isActive }"
    :data-testid="`nav-item-${routeName}`"
  >
    {{ label }}
  </router-link>
</template>

<script>
export default {
  props: {
    label: { type: String, required: true },
    routeName: { type: String, required: true },
    isActive: { type: Boolean, default: false },
  },
};
</script>

<style scoped>
.nav-item {
  display: block;
  padding: 0.4375rem 0.75rem 0.4375rem 1.5rem;
  color: var(--text-secondary);
  border-radius: 0.375rem;
  font-size: 0.875rem;
  text-decoration: none;
  transition: background-color 0.15s, color 0.15s;
}

.nav-item:hover {
  background-color: var(--accent-light);
  color: var(--accent);
}

.nav-item.active {
  background-color: var(--accent-light);
  color: var(--accent);
  font-weight: 500;
}
</style>
