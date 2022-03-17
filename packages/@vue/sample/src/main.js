import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
// import router from "./router";
import { createWebHistory } from "vue-router";
import createRouter from "./router/index.js";
import store from "./store";
import i18nPlugin from "./plugins/i18n";
import addDirectives from "./directives/index.js";

const vm = createApp(App);
vm.use(store);
// vm.use(router);
vm.use(createRouter(createWebHistory()));

const i18nStrings = {
  greetings: {
    hi: "Hallo!",
  },
};
vm.use(i18nPlugin, i18nStrings);
console.log(vm.config.globalProperties.$translate("greetings.hi"));

addDirectives(vm);

vm.mount("#app");
