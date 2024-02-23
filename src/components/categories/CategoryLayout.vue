<!-- CategoryLayout.vue -->
<template>
  <div>
    <!-- Category Cards (Navigation Links) -->
    <CategoryCard
      v-for="category in categories"
      :key="category.routeName"
      :categoryName="category.name"
      :categoryDescription="category.description"
      :routeName="category.routeName"
    />

  </div>
</template>

<script>
import CategoryCard from "@/components/categories/CategoryCard.vue";

export default {
  components: {
    CategoryCard,
  },
  data() {
    return {
      categories: [
        { name: "Elements", description: "Description for Elements", routeName: "elements" },
        { name: "Forms", description: "Description for Forms", routeName: "forms" },
        { name: "Alerts, Frame & Windows", description: "Description for Alerts, Frame & Windows", routeName: "alerts" },
        { name: "Widgets", description: "Description for Widgets", routeName: "widgets" },
        { name: "Interactions", description: "Description for Interactions", routeName: "interactions" },
      ],
    };
  },
};
</script>

<style>
/* Add styling for your category cards and layout */
</style>
