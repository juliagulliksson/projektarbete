import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters.js";
import actions from "./actions.js";
import mutations from "./mutations.js";

Vue.use(Vuex);

const user = localStorage.getItem("user");
const token = localStorage.getItem("access_token");
const userExists = user !== "undefined";
const tokenExists = token !== "undefined";

export const store = new Vuex.Store({
  state: {
    user: userExists ? JSON.parse(user) : null,
    token: tokenExists ? token : null,
    questions: [],
    userQuestions: [],
    question: {}
  },
  getters,
  mutations,
  actions
});
