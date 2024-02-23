<!-- CategoryCard.vue -->
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
  color: inherit;
  border: 1px solid #ccc;
  padding: 20px;
  cursor: pointer;
  margin: 10px;
}

.category-card:hover {
  background-color: #f0f0f0;
}
</style>
