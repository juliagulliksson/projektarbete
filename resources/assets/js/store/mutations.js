export default {
  // retrieveToken(state, token) {
  //   state.token = token;
  // },
  destroyToken(state) {
    state.user = {};
  },
  setQuestions(state, questions) {
    state.questions = questions;
  },
  setUser(state, user) {
    state.user = user;
  },
  setUserQuestions(state, questions) {
    state.userQuestions = questions;
  },
  setUserAnswers(state, answers) {
    state.userAnswers = answers;
  },
  updateUserQuestions(state, question) {
    state.userQuestions.unshift(question);
  },
  updateUser(state, user) {
    state.user = user;
  },
  changeLoading(state) {
    state.loading = !state.loading;
  }
};
