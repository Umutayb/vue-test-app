<template>
    <div>
      <h2>Tall Page</h2>
      <a>Long page which can be scrolled</a>
      <div id="image1">
        <img :src="image"/>
      </div>
      <div id="image2">
        <img :src="image"/>
      </div>
      <div id="logo">
        <img :src="logo"/>
      </div>
    </div>
  </template>

  <script>
    import logo from "@/assets/logo.png"
    import image from "@/assets/image.png"

    export default {
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