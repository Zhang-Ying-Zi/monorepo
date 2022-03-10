// import { createRouter, createWebHashHistory } from "vue-router";
import { createRouter } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "vender" */ "../views/AboutView.vue"),
  },
  {
    path: "/todo",
    name: "todo",
    component: () =>
      import(/* webpackChunkName: "vender" */ "../views/TodoView.vue"),
  },
  {
    path: "/compute",
    name: "compute",
    component: () =>
      import(/* webpackChunkName: "vender" */ "../views/ComputeView.vue"),
  },
];

// const router = createRouter({
//   history: createWebHashHistory(),
//   routes,
// });
// export default router;

export default function (history) {
  return createRouter({
    history,
    routes,
  });
}
