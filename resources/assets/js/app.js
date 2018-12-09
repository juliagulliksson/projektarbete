require("./bootstrap");

import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
import routes from "./routes.js";
import { store } from "./store/store.js";
Vue.component("App", require("./App.vue"));

const router = new Router({
  base: "/",
  mode: "history",
  history: true,
  relative: true,
  routes
});

router.beforeEach((to, from, next) => {
  if (!to.matched.length) {
    /**
     * The url is invalid
     */
    next({ path: "/404" });
  } else {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (store.getters.isAuthenticated) {
        /**
         * Even if user is authenticated, run the check to see if cookie is stored
         * and thereby hasn't expired, and if it isn't, renew the cookie to extend session
         */
        store
          .dispatch("checkIfCookie")
          .then(response => {
            if (response) {
              /**
               * User still authenticated and session has been renewed
               */
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
            if (response) {
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
       * Both guests and logged in users can access page
       */

      if (store.getters.isAuthenticated) {
        console.log("IS AUTH");
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
  }
});

new Vue({
  el: "#app",
  store,
  router
});
