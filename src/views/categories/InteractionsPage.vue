<template>
  <div>
    <h2>Interactions</h2>
    <p class="page-description">Drag, drop, sort, and resize components</p>
    <ToolLayout :tools="tools"></ToolLayout>
  </div>
</template>

<script>
import ToolLayout from "@/components/tools/ToolLayout.vue";

export default {
  components: {
    ToolLayout
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
  }
}
</script>
