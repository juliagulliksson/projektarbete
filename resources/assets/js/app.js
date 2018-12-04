require("./bootstrap");

import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
import routes from "./routes.js";
import { store } from "./store/store.js";
Vue.component("App", require("./App.vue"));

const router = new Router({
  /* mode: "history", */
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      /**
       * Even if the getter is returning true, run the check to see if cookie is stored
       * and thereby hasn't expired
       */
      store
        .dispatch("checkIfCookie")
        .then(response => {
          if (response) {
            //Cookie exists and the user is still authenticated
            next();
          } else {
            router.push({
              path: "/login",
              query: { sessionError: "Session expired" }
            });
          }
        })
        .catch(error => {
          router.push({
            path: "/login",
            query: { sessionError: "Session expired" }
          });
        });
    } else {
      // User is guest and not authenticated to visit page

      console.log("ROUTE KÖRS");
      next({
        path: "/login"
      });
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    console.log("requeres guest");
    if (store.getters.isAuthenticated) {
      console.log("AUTHENTICATED");
      store
        .dispatch("checkIfCookie")
        .then(response => {
          console.log("COOKIE RESPONSE", response);
          if (response === true) {
            next({
              path: "/dashboard"
            });
          } else {
            router.push({
              path: "/login",
              query: { sessionError: "Session expired" }
            });
          }
        })
        .catch(error => {
          console.log("COOKIE ERROR", error);
          router.push({
            path: "/login",
            query: { sessionError: "Session expired" }
          });
        });
    } else {
      console.log("IS GUEST");
      next();
    }
  } else {
    console.log("NEITHER GUEST OR AUTH");
    /**
     * Neither guest or auth is required to access page
     */

    if (store.getters.isAuthenticated) {
      console.log("IS AUTH");
      next();
      store
        .dispatch("checkIfCookie")
        .then(response => {
          console.log("COOKIE RESPONSE", response);
          if (response) {
            next();
          } else {
            router.push({
              path: "/login",
              query: { sessionError: "Session expired" }
            });
          }
        })
        .catch(error => {
          router.push({
            path: "/login",
            query: { sessionError: "Session expired" }
          });
        });
    } else {
      console.log("IS GUEST");
      next();
    }
  }
});

new Vue({
  el: "#app",
  store,
  router
});
