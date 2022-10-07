import Vue from "vue";
import VueRouter from "vue-router";

import StockPage from "../pages/Stock.vue";

Vue.use(VueRouter);

const routes = [
  {
    name: "StockPage",
    path: "/",
    component: StockPage
  }
];

const router = new VueRouter({
  mode: "history",
  base: window.noraInventoryData.baseUrl,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

export default router;
