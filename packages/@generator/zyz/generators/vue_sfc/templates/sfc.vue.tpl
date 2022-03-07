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
    // 要访问组件实例 property，我们需要将 provide 转换为返回对象的函数
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
    // setup中避免使用this, 会找不到组件实例
    // 这里返回的任何内容都可以用于组件的其余部分
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
