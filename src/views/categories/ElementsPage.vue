<template>
  <div>
    <h2>Elements Page</h2>
    <a>Welcome to the Elements Page!</a>
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
          { name: "Radio Buttons", routeName: "radiobuttons" }
        ],
      };
    }
}
</script>
