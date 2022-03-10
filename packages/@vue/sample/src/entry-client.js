import { createSSRApp } from "vue";
import { createWebHistory } from "vue-router";
import createRouter from "./router/index.js";
import App from "./App.vue";

// 针对客户端的启动逻辑......

const app = createSSRApp(App);

const router = createRouter(createWebHistory());

app.use(router);

router.isReady().then(() => {
  app.mount("#app");
});
