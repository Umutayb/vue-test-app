<!-- ToolButton.vue -->
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
    color: inherit;
    border: 1px solid #ccc;
    padding: 20px;
    cursor: pointer;
    margin: 10px;
  }
  
  .tool-button:hover {
    background-color: #f0f0f0;
  }
  </style>