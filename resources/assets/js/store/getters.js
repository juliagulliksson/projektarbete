export default {
  isAuthenticated: state => state.token !== null,
  questions: state => state.questions,
  user: state => state.user,
  userQuestions: state => state.userQuestions,
  singleQuestion: state => state.question
};
