import Vue from "vue";
import VueRouter from "vue-router";

import HomePage from "../pages/Home.vue";
import SummaryPage from "../pages/Summary.vue";
import StepsPage from "../pages/Steps.vue";
import Error404 from "../pages/404.vue";

Vue.use(VueRouter);

const routes = [
  {
    name: "HomePage",
    path: "/",
    component: HomePage
  },
  {
    name: "StepsPage",
    path: "/steps/:id",
    component: StepsPage,
    props: true
  },
  {
    name: "SummaryPage",
    path: "/summary",
    component: SummaryPage
  },
  {
    path: "*",
    component: Error404
  }
];

const router = new VueRouter({
  mode: "history",
  base: window.noraInventoryData.baseUrl,
  routes
});

export default router;
