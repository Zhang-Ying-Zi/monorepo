import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

const vm = createApp(App);
vm.use(store);
vm.use(router);
vm.mount("#app");
