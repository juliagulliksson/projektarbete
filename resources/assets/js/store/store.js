import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters.js";
import actions from "./actions.js";
import mutations from "./mutations.js";

Vue.use(Vuex);

const user = localStorage.getItem("user");

export const store = new Vuex.Store({
  state: {
    user: user ? JSON.parse(user) : null,
    token: localStorage.getItem("access_token") || null,
    questions: [],
    userQuestions: [],
    question: {}
  },
  getters,
  mutations,
  actions
});
