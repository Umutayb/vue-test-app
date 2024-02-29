<template>
    <div>
      <h2>Scrollable Page</h2>
      <a>Where the scrolling of page is possible</a>
      <div id="image">
        <img :src="image"/>
      </div>
      <div id="image">
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