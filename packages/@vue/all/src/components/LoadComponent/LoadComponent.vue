<template>
  <!-- 失活的组件将会被缓存！-->
  <keep-alive>
    <component :is="component"></component>
  </keep-alive>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  components: {},
  inheritAttrs: true,
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    component: {
      type: Function,
      required: true,
    },
  },
  data: function () {
    return {};
  },
  computed: {},
  watch: {},
  created: function () {},
  methods: {},
});
</script>

<style></style>
