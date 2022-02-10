<template>
  <input type="checkbox" :checked="checked" @change="$emit('change', $event.target.checked)" />
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "BaseCheckbox",
  components: {},
  inheritAttrs: true,
  model: {
    prop: "checked",
    event: "change",
  },
  props: {
    checked: Boolean,
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
