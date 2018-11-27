export default {
  loggedIn(state) {
    return state.token !== null;
  },
  questions(state) {
    return state.questions;
  },
  user(state) {
    return state.user;
  },
  userQuestions(state) {
    return state.userQuestions;
  }
};
