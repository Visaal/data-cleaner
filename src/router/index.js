import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import DataCleaner from "../views/DataCleaner.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/DataCleaner",
    name: "DataCleaner",
    component: DataCleaner,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
