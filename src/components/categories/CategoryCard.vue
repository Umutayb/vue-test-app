<template>
  <router-link :to="{ name: routeName }" class="category-card">
    <h3>{{ categoryName }}</h3>
    <p>{{ categoryDescription }}</p>
  </router-link>
</template>

<script>
export default {
  props: {
    categoryName: String,
    categoryDescription: String,
    routeName: String,
  },
};
</script>

<style scoped>
.category-card {
  display: block;
  text-decoration: none;
  color: var(--text-primary);
  border: 1px solid var(--border);
  padding: 1.25rem;
  cursor: pointer;
  margin: 0.625rem;
  border-radius: var(--radius);
  transition: border-color 0.15s, box-shadow 0.15s;
}

.category-card:hover {
  border-color: var(--accent);
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.1);
}

.category-card h3 {
  color: var(--text-primary);
}

.category-card p {
  color: var(--text-secondary);
  font-size: 0.875rem;
}
</style>
