<template>
  <div></div>
</template>

<script>
export default {
  name: "<%= sfcName %>",
  components: {},
  mixins: [],
  directives: {
    // focus: {
    //   mounted(el) {
    //     el.focus()
    //   }
    // }
  },
  provide() {
    // 要访问组件实例 property（this），我们需要将 provide 转换为返回对象的函数
    return {};
  },
  inject: [],
  props: {
    // // 基础的类型检查 (`null` 和 `undefined` 值会通过任何类型验证)
    // // type: String Number Boolean Array Object Date Function Symbol or 自定义构造函数
    // propA: Number,
    // // 多个可能的类型
    // propB: [String, Number],
    // // 必填的字符串
    // propC: {
    //   type: String,
    //   required: true,
    // },
    // // 带有默认值的数字
    // propD: {
    //   type: Number,
    //   default: 100,
    // },
    // // 带有默认值的对象
    // propE: {
    //   type: Object,
    //   // 对象或数组的默认值必须从一个工厂函数返回
    //   default() {
    //     return { message: "hello" };
    //   },
    // },
    // // 自定义验证函数
    // propF: {
    //   validator(value) {
    //     // 这个值必须与下列字符串中的其中一个相匹配
    //     return ["success", "warning", "danger"].includes(value);
    //   },
    // },
    // // 具有默认值的函数
    // propG: {
    //   type: Function,
    //   // 与对象或数组的默认值不同，这不是一个工厂函数——这是一个用作默认值的函数
    //   default() {
    //     return "Default function";
    //   },
    // },
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
  setup(props, context) {
    // 在 `setup` 中你应该避免使用 `this`，因为它不会找到组件实例。`setup` 的调用发生在 `data` property、`computed` property 或 `methods` 被解析之前，所以它们无法在 `setup` 中被获取。
    // 这里返回的任何内容都可以用于组件的其余部分
    // 因为 props 是响应式的，不能使用 ES6 解构，它会消除 prop 的响应性。
    // 如果需要解构 prop，可以在 setup 函数中使用 toRefs 函数来完成此操作
    // context是非响应式的 = { attrs, slots, emit, expose }
    // onMounted(() => {}); 
    // watch(property, () => {});
    return {};
  },
  data() {
    return {};
  },
  computed: {
    // publishedBooksMessage() {
    //   return this.author.books.length > 0 ? 'Yes' : 'No'
    // },
    // fullName: {
    //   get() {
    //     return this.firstName + ' ' + this.lastName
    //   },
    //   set(newValue) {
    //     const names = newValue.split(' ')
    //     this.firstName = names[0]
    //     this.lastName = names[names.length - 1]
    //   }
    // }
  },
  watch: {
    // datapropertysample(newValue, oldValue) {},
  },
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
