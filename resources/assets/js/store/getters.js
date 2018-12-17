export default {
  isAuthenticated: state =>
    state.user.name !== undefined && state.user !== null && state.user !== {},
  questions: state => state.questions,
  questionsWithoutAnswers: state => {
    return state.questions.filter(
      question => question.answers.length <= 0 && question.answered_at === null
    );
  },
  questionsWithAnswers: state => {
    let questions = state.questions.filter(
      question => question.answers.length > 0
    );

    for (let question of questions) {
      question.answers = question.answers.slice(0, 1);
    }
    return questions;
  },
  user: state => state.user,
  userQuestions: state => state.userQuestions,
  userAnswers: state => state.userAnswers,
  singleQuestion: state => state.question,
  loading: state => state.loading
};
