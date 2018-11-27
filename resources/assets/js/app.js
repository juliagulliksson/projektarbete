require("./bootstrap");

import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
import routes from "./routes.js";
import { store } from "./store/store.js";
Vue.component("App", require("./App.vue"));

const router = new Router({
  /*   mode: "history", */
  routes
});

/**
 * Redirects if user is trying to access unauthorized pages
 */
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        path: "/login"
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (store.getters.loggedIn) {
      next({
        path: "/dashboard"
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

new Vue({
  el: "#app",
  store,
  router
});
