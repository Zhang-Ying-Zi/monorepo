<template>
  <div class="container">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <!-- 一个不带 name 的 <slot> 出口会带有隐含的名字“default”。 -->
      <slot></slot>
    </main>
    <footer :class="$style.footer">
      <slot name="footer"></slot>
    </footer>
  </div>
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
  props: {},
  data: function () {
    return {};
  },
  computed: {},
  watch: {},
  created: function () {},
  methods: {},
});
</script>

<style module>
.footer {
  background: pink;
}
</style>
