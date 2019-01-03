export default {
  resetUser(state) {
    state.user = {};
  },
  setAnsweredQuestions(state, questions) {
    if (state.answeredQuestions.length === 0) {
      state.answeredQuestions = questions;
    } else {
      /**
       * Combine the existing questions with the new ones for pagination
       */
      state.answeredQuestions = state.answeredQuestions.concat(questions);
    }
  },
  setAnsweredQuestionsPageInfo(state, pageInfo) {
    state.answeredQuestionsPageInfo = pageInfo;
  },
  setUnansweredQuestions(state, questions) {
    if (state.unAnsweredQuestions.length === 0) {
      state.unAnsweredQuestions = questions;
    } else {
      /**
       * Combine the existing questions with the new ones for pagination
       */
      state.unAnsweredQuestions = state.unAnsweredQuestions.concat(questions);
    }
  },
  setUnAnsweredQuestionsPageInfo(state, pageInfo) {
    state.unAnsweredQuestionsPageInfo = pageInfo;
  },
  setAnswers(state, answers) {
    state.answers = answers;
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
  deleteUserQuestion(state, questionID) {
    state.userQuestions = state.userQuestions.filter(
      question => question.id != questionID
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
    delete user.email;
    localStorage.setItem("user", JSON.stringify(user));
  },
  changeLoading(state) {
    state.loading = !state.loading;
  },
  updateAnswerVotes(state, vote) {
    /**
     * Find the associated answer
     */
    const index = state.question.answers.findIndex(
      answer => answer.id === vote.voteables_id
    );
    if (vote.deleted_at === null) {
      /**
       * Add to the vote count of the answer and add the vote into the votes array
       */
      state.question.answers[index].votes_count++;
      state.question.answers[index].votes.push(vote);
      return state.question;
    } else {
      /**
       * The vote has been deleted, so remove from vote count and filter out the vote from array
       */
      state.question.answers[index].votes_count--;
      state.question.answers[index].votes = state.question.answers[
        index
      ].votes.filter(initialVote => initialVote.id !== vote.id);
      return state.question;
    }
  },
  setSingleQuestion(state, question) {
    state.question = question;
  }
};
