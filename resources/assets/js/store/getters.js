export default {
  isAuthenticated: state =>
    state.user.name !== undefined && state.user != null && state.user != {},
  questions: state => state.questions,
  questionsWithoutAnswers: state => {
    return state.questions.filter(question => question.answers.length <= 0);
  },
  questionsWithAnswers: state => {
    return state.questions.filter(question => question.answers.length > 0);
  },
  user: state => state.user,
  userQuestions: state => state.userQuestions,
  userAnswers: state => state.userAnswers,
  singleQuestion: state => state.question
};
