<template>
  <div id="app">
    <input v-model.number="firstNumber" type="number" step="20" /> +
    <input v-model.number="secondNumber" type="number" step="20" /> =
    {{ result }}
    <p>
      <animated-integer :value="firstNumber"></animated-integer> +
      <animated-integer :value="secondNumber"></animated-integer> =
      <animated-integer :value="result"></animated-integer>
    </p>
  </div>
</template>

<script>
import AnimatedInteger from "../components/AnimatedInteger.vue";
export default {
  name: "ComputeView",
  components: {
    AnimatedInteger,
  },
  data() {
    return {
      firstNumber: 20,
      secondNumber: 40,
    };
  },
  computed: {
    result() {
      return this.firstNumber + this.secondNumber;
    },
  },
  watch: {},
  methods: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeUnmount() {},
  unmounted() {},
  inheritAttrs: true,
};
</script>

<style scoped></style>
