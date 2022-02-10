import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
// import "tailwindcss";
import "./assets/app.css";
import App from "./app.vue";
import routes from "./routes";

/******* webpack 可以使用 require.context 全局导入基础组件 *******/
import "./components/global.js";

/****** router ******/
Vue.use(VueRouter);
const router = new VueRouter({
  routes,
});

Vue.use(Vuex);

// 在创建 Vue 实例之前使用插件
import VueAnimateFullpage from "vue-animate-fullpage/dist/index";
Vue.use(VueAnimateFullpage);
// Vue.prototype.$fullscreen = VueAnimateFullpage; //全局挂载，方便手动跳转
// 手动跳转到指定页:
// this.$fullpage.moveTo(0, true) ;

// 在创建 Vue 实例之前全局定义过滤器
Vue.filter("capitalize", function (value) {
  if (!value) return "";
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

// 全局注册
// 定义名为 li-item 的新组件
Vue.component("LiItem", {
  props: {
    todo: {
      type: Object,
      default() {
        return { text: "" };
      },
    },
  },
  template: "<li>{{ todo.text }}</li>",
});

// 异步组件
// Vue.component("AsyncExample", function (resolve, reject) {
//   setTimeout(function () {
//     // 向 `resolve` 回调传递组件定义
//     resolve({
//       template: "<div>I am async!</div>",
//     });
//   }, 1000);
// });
// Vue.component("AsyncWebpackExample", function (resolve) {
//   // 这个特殊的 `require` 语法将会告诉 webpack
//   // 自动将你的构建代码切割成多个包，这些包
//   // 会通过 Ajax 请求加载
//   require(["./AsyncExample"], resolve);
// });
// Vue.component(
//   "AsyncWebpackExample",
//   // 这个动态导入会返回一个 `Promise` 对象。
//   () => import("./AsyncExample")
// );
// new Vue({
//   // ...
//   components: {
//     "my-component": () => import("./AsyncExample"),
//   },
// });
// // 异步组件工厂函数也可以返回一个如下格式的对象
// const AsyncComponent = () => ({
//   // 需要加载的组件 (应该是一个 `Promise` 对象)
//   component: import('./MyComponent.vue'),
//   // 异步组件加载时使用的组件
//   loading: LoadingComponent,
//   // 加载失败时使用的组件
//   error: ErrorComponent,
//   // 展示加载时组件的延时时间。默认值是 200 (毫秒)
//   delay: 200,
//   // 如果提供了超时时间且组件加载也超时了，
//   // 则使用加载失败时使用的组件。默认值是：`Infinity`
//   timeout: 3000
// })

// 全局混入
// 为自定义的选项 'myOption' 注入一个处理器。
// Vue.mixin({
//   created: function () {
//     var myOption = this.$options.myOption;
//     if (myOption) {
//       console.log(myOption);
//     }
//   },
// });

// 全局指令
// 注册一个全局自定义指令 `v-focus`
// Vue.directive('focus', {
//   // 当被绑定的元素插入到 DOM 中时……
//   inserted: function (el) {
//     // 聚焦元素
//     el.focus()
//   }
// })

var vm = new Vue({
  el: "#root",
  router,
  components: {},
  render: (h) => h(App),
});

// 跟踪运行时错误
// Vue.config.errorHandler

// vm.$data;
// vm.$el;
// vm.$props;
// vm.$options;
// vm.$parent;
// vm.$root;
// vm.$children;
// vm.$slots;
// // $watch 是一个实例方法
// vm.$watch("a", function(newValue, oldValue) {
//   // 这个回调将在 `vm.a` 改变后调用
//   console.log(newValue, oldValue);
// });
// vm.$on("test", function(msg) {
//   console.log(msg);
// });
// vm.$emit("test", "hi");
// // => "hi"
// vm.$once( event, callback )
// vm.$off( [event, callback] )
// this.$once('hook:beforeDestroy', function () {
// })

// <base-input ref="usernameInput"></base-input>
// vm.$refs.usernameInput

// vm.$forceUpdate()
