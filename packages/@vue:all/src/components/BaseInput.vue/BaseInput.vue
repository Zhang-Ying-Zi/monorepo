<template>
  <label>
    {{ label }}
    <input v-bind="$attrs" :value="value" v-on="inputListeners" />
  </label>
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
    label: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
  },
  data: function () {
    return {};
  },
  computed: {
    inputListeners: function () {
      var vm = this;
      return Object.assign(
        {},
        // 我们从父级添加所有的监听器
        this.$listeners,
        // 然后我们添加自定义监听器，
        // 或覆写一些监听器的行为
        {
          // 这里确保组件配合 `v-model` 的工作
          input: function (event) {
            vm.$emit("input", event.target.value);
          },
        }
      );
    },
  },
  watch: {},
  created: function () {},
  methods: {},
});
</script>

<style></style>
