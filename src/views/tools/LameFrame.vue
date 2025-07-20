<template>
  <div>
    <h3>LameFrame Page</h3>
    <iframe
      src="/inner-page.html"
      id="lameframe-test-id"
      width="100%"
      height="500"
      style="border: 1px solid #aaa;"
      title="Lameframe Iframe"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: "IframePage",
};
</script>
