export default {
  isAuthenticated: state =>
    state.user.name !== undefined && state.user !== null && state.user !== {},
  // questions: state => state.questions,
  unAnsweredQuestions: state => {
    return state.unAnsweredQuestions;
  },
  answeredQuestions: state => {
    let questions = state.answeredQuestions;
    for (let question of questions) {
      question.answers = question.answers.slice(0, 1);
    }
    return questions;
  },
  answeredQuestionsPageInfo: state => {
    return state.answeredQuestionsPageInfo;
  },
  unAnsweredQuestionsPageInfo: state => {
    return state.unAnsweredQuestionsPageInfo;
  },
  user: state => state.user,
  userQuestions: state => state.userQuestions,
  userAnswers: state => state.userAnswers,
  singleQuestion: state => state.question,
  loading: state => state.loading
};
