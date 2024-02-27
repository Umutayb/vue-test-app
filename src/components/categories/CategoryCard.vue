<!-- CategoryCard.vue -->
<template>
  <router-link :to="{ name: routeName }" :class="{'dark-category-card': isDark, 'category-card': true }">
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
    data() {
      return {
        isDark: true
      };
    },
    created (){
    this.emitter.on('isDark', (evt) => {
      this.isDark = evt.isDark;
      console.log(this.isDark)
    })
  } 
}  
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

.dark-category-card:hover {
  background-color: #4e6172;
}
</style>
