<template>
  <div id="app">
    <GlobalBanner :obj="config" />
  </div>
</template>

<script>
import { Component as GlobalBanner } from "../packages/global-banner";

export default {
  name: "App",
  data() {
    return {
      component: "div",
      config: {
        src: require("./banner.jpg"),
      },
    };
  },
  components: {
    GlobalBanner,
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
ul,
ol {
  list-style: none;
}
</style>
