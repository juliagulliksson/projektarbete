import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters.js";
import actions from "./actions.js";
import mutations from "./mutations.js";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loggedIn: false,
    user: {},
    token: localStorage.getItem("access_token") || null
  },
  getters,
  mutations,
  actions
});
