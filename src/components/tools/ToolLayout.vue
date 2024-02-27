<!-- ToolLayout.vue -->
<template>
    <tools>
      <!-- Tool buttons (Navigation Links) -->
      <ToolButton
        v-for="tool in tools"
        :key="tool.routeName"
        :toolName="tool.name"
        :id="tool.name"
        :routeName="tool.routeName"
      />
    </tools>
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
          { name: "DropDown", routeName: "dropDown" },
          { name: "Resizable", routeName: "resizable" },
          { name: "Droppable", routeName: "droppable" },
          { name: "Draggable", routeName: "draggable" },
        ],
      };
    },
  };
  </script>
  
  <style>
  /* Add styling for your category cards and layout */
  </style>