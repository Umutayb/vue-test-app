<template>
  <router-link :to="{ name: routeName }" class="tool-button">
    <h3>{{ toolName }}</h3>
  </router-link>
</template>

<script>
export default {
  props: {
    toolName: String,
    routeName: String,
  },
};
</script>

<style scoped>
.tool-button {
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

.tool-button:hover {
  border-color: var(--accent);
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.1);
}
</style>
