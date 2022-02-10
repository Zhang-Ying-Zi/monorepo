<template>
  <div>
    <button @click="show = !show">Toggle render</button>
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__tada"
      leave-active-class="animate__animated animate__bounceOutRight"
    >
      <p v-if="show">hello</p>
    </transition>
  </div>
</template>

<script>
import Vue from "vue";
import "animate.css";

export default Vue.extend({
  components: {},
  inheritAttrs: true,
  model: {
    prop: "value",
    event: "input",
  },
  props: {},
  data: function () {
    return {
      show: true,
    };
  },
  computed: {},
  watch: {},
  created: function () {},
  methods: {},
});
</script>

<style></style>
