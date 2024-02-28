<!-- ToolButton.vue -->
<template>
    <router-link :to="{ name: routeName }" :class="{'dark-tool-button': isDark, 'tool-button': true }">
      <h3>{{ toolName }}</h3>
    </router-link>
  </template>
  
  <script>
  export default {
    props: {
      toolName: String,
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
  
  .dark-tool-button:hover {
    background-color: #4e6172;
  }
  </style>