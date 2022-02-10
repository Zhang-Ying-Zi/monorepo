import Vue from "vue";
import VueRouter from "vue-router";
import Index from "./components/Index.vue";
import Welcome from "./components/Welcome.vue";
import Example from "./components/Example.vue";
import "./css/page1.less";
import Flexc from "./flex-container";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Index },
  { path: "/welcome", component: Welcome },
  { path: "/example/:username", component: Example }
];

const router = new VueRouter({
  mode: "history",
  routes
});

// 注册一个全局自定义指令 `v-focus`
Vue.directive("focus", {
  // 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
  // bind:
  // update:
  // componentUpdated:
  // unbind:
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function(el) {
    el.focus();
  }
});

Vue.component("anchored-heading", {
  render: function(createElement) {
    return createElement(
      "h" + this.level, // 标签名称
      this.$slots.default // 子元素数组
    );
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
});

const app = new Vue({
  el: "#app",
  router,
  render: function(h) {
    return (
      <router-view>
        <Index />
      </router-view>
    );
  }
  // data: {
  //   msg: "Front end"
  // },
  // render: function(h) {
  //   return (
  //     <div>
  //       <div rel="flex-container" class="flex-container">
  //         <welcome />
  //       </div>
  //       <anchored-heading level={2}>anchored-heading</anchored-heading>
  //       <router-link to="/Example/魔力鸭">跳转</router-link>
  //     </div>
  //   );
  // },
  // // template:
  // //   '<div>\
  // //   <div rel="flex-container" class="flex-container"><welcome /></div>\
  // //   <anchored-heading :level="2">anchored-heading</anchored-heading>\
  // //   </div>',
  // mounted() {
  //   // const instance = new Flexc({
  //   //   rel: "flex-container"
  //   // });
  //   // instance.sayHi();
  // },
  // components: {
  //   welcome
  // }
});
