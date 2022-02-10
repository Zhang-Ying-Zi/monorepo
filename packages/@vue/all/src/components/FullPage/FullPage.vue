<template>
  <div :class="$style.fullscreen">
    <!-- v-animate的值是animate.css的动画效果 -->
    <div ref="fullscreen" v-fullscreen="opts" class="fullscreen-wp">
      <div class="page-1 page">
        <p v-animate="{ value: 'bounceInLeft' }" class="part-1">1</p>
      </div>
      <div class="page-2 page">
        <p v-animate="{ value: 'bounceInRight' }" class="part-2">2</p>
      </div>
      <div class="page-3 page">
        <p v-animate="{ value: 'bounceInLeft', delay: 0 }" class="part-3">part-3-1</p>
        <p v-animate="{ value: 'bounceInRight', delay: 600 }" class="part-3">part-3-2</p>
        <p v-animate="{ value: 'zoomInDown', delay: 1200 }" class="part-3">part-3-3</p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import "vue-animate-fullpage/dist/animate.css";

export default Vue.extend({
  components: {},
  directives: {},
  filters: {},
  mixins: [],
  inheritAttrs: true,
  model: {
    prop: "value",
    event: "input",
  },
  props: {},
  data: function () {
    return {
      opts: {
        page: ".page",
        start: 0,
        loop: true,
        direction: "h", // h v
        duration: 500,
        preventWechat: true,
        beforeChange: (prev, next) => {},
        afterChange: (prev, next) => {},
      },
    };
  },
  computed: {},
  watch: {},
  created: function () {},
  methods: {},
});
</script>

<style module>
.fullscreen {
  background: #999;
}
</style>
