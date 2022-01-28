<template>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      <!--
      我们为每个 todo 准备了一个插槽，
      将 `todo` 对象作为一个插槽的 prop 传入。
      -->
      <slot name="todo" :todo="todo">
        <!-- 后备内容 -->
        {{ todo.text }}
      </slot>
    </li>
  </ul>
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
    todos: {
      type: Array,
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
