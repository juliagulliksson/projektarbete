export default {
  isAuthenticated: state =>
    state.user.name !== undefined && state.user != null && state.user != {},
  // isAuthenticated: state => false,
  questions: state => state.questions,
  user: state => state.user,
  userQuestions: state => state.userQuestions,
  singleQuestion: state => state.question
};
