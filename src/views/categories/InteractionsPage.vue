<template>
  <div>
    <h2>Interactions Page</h2>
    <a>Wellcome to Interactions!</a>
    <ToolLayout></ToolLayout>
  </div>
</template>

<script>
import '@vuepic/vue-datepicker/dist/main.css'
import ToolLayout from "@/components/tools/ToolLayout.vue";

export default {
  components: {
    ToolLayout
  }
}
</script>
