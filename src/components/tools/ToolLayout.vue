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
    props: {
      tools: {
        type: Array,
        default: () => [],
      },
    },
  };
  </script>
  
  <style>
  /* Add styling for your category cards and layout */
  </style>