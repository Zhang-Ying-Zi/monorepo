<template>
  <div id="dynamicexample">
    <h2>Scroll down the page</h2>
    <input type="range" min="0" max="500" v-model="pinPadding" />
    <p v-pin:[direction]="pinPadding">
      Stick me {{ pinPadding + "px" }} from the {{ direction || "top" }} of the
      page
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return { direction: "right", pinPadding: 200 };
  },
  setup() {},
};
</script>
