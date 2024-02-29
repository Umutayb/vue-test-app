<!-- ToolLayout.vue -->
<template>
      <!-- Tool buttons (Navigation Links) -->
      <ToolButton
        v-for="tool in tools"
        :key="tool.routeName"
        :toolName="tool.name"
        :name="tool.name"
        :routeName="tool.routeName"
        id="tool"
      />
  </template>
  
  <script>
  import ToolButton from "@/components/tools/ToolButton.vue";
  
  export default {
    components: {
      ToolButton,
    },
    data() {
      return {
        tools: [
          { name: "Sortable", routeName: "sortable" },
          { name: "Dropdown", routeName: "dropDown" },
          { name: "Resizable", routeName: "resizable" },
          { name: "Droppable", routeName: "droppable" },
          { name: "Draggable", routeName: "draggable" },
          { name: "Tall Page", routeName: "tall" },
        ],
      };
    },
  };
  </script>
  
  <style>
  /* Add styling for your category cards and layout */
  </style>