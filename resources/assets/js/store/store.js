import Vue from "vue";
import Es6Promise from "es6-promise";
Es6Promise.polyfill();
import Vuex from "vuex";
import getters from "./getters.js";
import actions from "./actions.js";
import mutations from "./mutations.js";

Vue.use(Vuex);

const user = localStorage.getItem("user");
const userExists = user !== null;
export const store = new Vuex.Store({
  state: {
    user: userExists ? JSON.parse(user) : {},
    questions: [],
    answers: [],
    userQuestions: [],
    userAnswers: [],
    question: {},
    loading: false
  },
  getters,
  mutations,
  actions
});
