export default {
  retrieveToken(state, token) {
    state.token = token;
  },
  destroyToken(state) {
    state.token = null;
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
  updateUserQuestions(state, question) {
    state.userQuestions.unshift(question);
  }
};
