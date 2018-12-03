import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters.js";
import actions from "./actions.js";
import mutations from "./mutations.js";

Vue.use(Vuex);

const user = localStorage.getItem("user");
const token = localStorage.getItem("access_token");
const userExists = user !== null;
const tokenExists = token !== "undefined";
export const store = new Vuex.Store({
  state: {
    user: userExists ? JSON.parse(user) : {},
    token: tokenExists ? token : null,
    questions: [],
    userQuestions: [],
    userAnswers: [],
    question: {}
  },
  getters,
  mutations,
  actions
});
