<template>
  <div>
    <h2>Interactions Page</h2>
    <a>Wellcome to Interactions!</a>
    <button>Button</button>
    <VueDatePicker v-model="date" id="dob" :format="dateFormat" :enable-time-picker="false"></VueDatePicker>
<!-- Your content for the Forms category page -->
    <ToolLayout></ToolLayout>
  </div>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import ToolLayout from "@/components/tools/ToolLayout.vue";

export default {
  components: {
    VueDatePicker,
    ToolLayout,
  },
 
}
</script>