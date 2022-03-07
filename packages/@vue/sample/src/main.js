import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import i18nPlugin from "./plugins/i18n";

const vm = createApp(App);
vm.use(store);
vm.use(router);

const i18nStrings = {
  greetings: {
    hi: "Hallo!",
  },
};
vm.use(i18nPlugin, i18nStrings);
console.log(vm.config.globalProperties.$translate("greetings.hi"));

vm.mount("#app");
