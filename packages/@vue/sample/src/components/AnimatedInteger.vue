<template>
  <span>{{ fullValue }}</span>
</template>

<script>
import loadjs from "../utils/loadjs.js";

export default {
  name: "AnimatedInteger",
  components: {},
  provide() {
    return {};
  },
  inject: [],
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  emits: {
    // // 没有验证
    // click: null,
    // // 验证 submit 事件
    // submit: ({ email, password }) => {
    //   if (email && password) {
    //     return true;
    //   } else {
    //     console.warn("Invalid submit event payload!");
    //     return false;
    //   }
    // },
  },
  data() {
    return {
      tweeningValue: 0,
    };
  },
  computed: {
    fullValue() {
      return Math.floor(this.tweeningValue);
    },
  },
  watch: {
    value(newValue, oldValue) {
      this.tween(newValue, oldValue);
    },
  },
  methods: {
    tween(newValue) {
      // eslint-disable-next-line no-undef
      gsap.to(this.$data, {
        duration: 0.5,
        tweeningValue: newValue,
        ease: "sine",
      });
    },
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    const vm = this;
    loadjs(
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.2.4/gsap.min.js"
    ).then(() => {
      vm.tween(this.value, 0);
    });
  },
  beforeUpdate() {},
  updated() {},
  beforeUnmount() {},
  unmounted() {},
  inheritAttrs: true,
};
</script>

<style scoped></style>
