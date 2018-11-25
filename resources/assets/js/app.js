require("./bootstrap");

window.Vue = require("vue");

import VueRouter from "vue-router";
import App from "./App.vue";
Vue.use(VueRouter);
import Example from "./components/ExampleComponent";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { store } from "./store/store.js";

const routes = [
  {
    path: "/test",
    name: "test",
    component: Example
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard
  }
];

const router = new VueRouter({
  /*   mode: "history", */
  routes
});

const app = new Vue({
  el: "#app",
  store,
  components: { App },
  router
});
