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
  deleteUserAnswer(state, answerID) {
    state.userAnswers = state.userAnswers.filter(
      answer => answer.id != answerID
    );
  },
  editAnswer(state, answer) {
    const index = state.userAnswers.findIndex(
      userAnswer => userAnswer.id === answer.id
    );
    state.userAnswers[index].body = answer.body;
    return state.userAnswers;
  },
  editQuestion(state, question) {
    const index = state.userQuestions.findIndex(
      userQuestion => userQuestion.id === question.id
    );
    state.userQuestions[index].title = question.title;
    return state.userQuestions;
  },
  updateUser(state, user) {
    state.user = user;
  },
  changeLoading(state) {
    state.loading = !state.loading;
  }
};
