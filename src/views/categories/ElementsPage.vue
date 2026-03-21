<template>
  <div>
    <h2>Elements</h2>
    <p class="page-description">UI element components for test automation</p>
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
        { name: "Radio Buttons", routeName: "radiobuttons" }
      ],
    };
  }
}
</script>
