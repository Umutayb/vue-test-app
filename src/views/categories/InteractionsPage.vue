<template>
  <div>
    <h2>Interactions Page</h2>
    <a>Wellcome to Interactions!</a>
    <ToolLayout :tools="tools"></ToolLayout>
  </div>
</template>

<script>
import '@vuepic/vue-datepicker/dist/main.css'
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
