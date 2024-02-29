<template>
  <div>
    <h2>Interactions Page</h2>
    <a>Wellcome to Interactions!</a>
    <ToolLayout></ToolLayout>
    <div id="image">
        <img :src="image"/>
    </div>
    <div id="logo">
        <img :src="logo"/>
    </div>
  </div>
</template>

<script>
import '@vuepic/vue-datepicker/dist/main.css'
import ToolLayout from "@/components/tools/ToolLayout.vue";
import logo from "@/assets/logo.png"
import image from "@/assets/image.png"

export default {
  components: {
    ToolLayout
  },
  data: function () {
            return {
              logo: logo,
              image: image
            }
        }
 
}
</script>

<style lang="css">
</style>