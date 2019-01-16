export default {
  resetUser(state) {
    state.user = {};
  },
  setPaginatedContent(state, [name, data]) {
    if (state[name].length === 0) {
      state[name] = data;
    } else {
      /**
       * Combine the existing array with the new one for pagination
       */
      state[name] = state[name].concat(data);
    }
  },
  setAnsweredQuestionsPageInfo(state, pageInfo) {
    state.answeredQuestionsPageInfo = pageInfo;
  },
  setUnAnsweredQuestionsPageInfo(state, pageInfo) {
    state.unAnsweredQuestionsPageInfo = pageInfo;
  },
  setUser(state, user) {
    state.user = user;
  },
  setUserQuestionsPageInfo(state, pageInfo) {
    state.userQuestionsPageInfo = pageInfo;
  },
  setUserAnswersPageInfo(state, pageInfo) {
    state.userAnswersPageInfo = pageInfo;
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
  },
  updateAnswerVotes(state, payload) {
    /**
     * Find the question
     */
    // state.answeredQuestions = [];
    // return;
    const index = state.answeredQuestions.findIndex(
      question => question.id === payload.questionID
    );

    const answerIndex = state.answeredQuestions[index].answers.findIndex(
      answer => answer.id === payload.vote.voteables_id
    );
    if (payload.vote.deleted_at === null) {
      /**
       * Add to the vote count of the answer and add the vote into the votes array
       */
      state.answeredQuestions[index].answers[answerIndex].votes_count++;
      state.answeredQuestions[index].answers[answerIndex].votes.push(
        payload.vote
      );
      return state.answeredQuestions;
    } else {
      /**
       * The vote has been deleted, so remove from vote count and filter out the vote from array
       */
      state.answeredQuestions[index].answers[answerIndex].votes_count--;
      state.answeredQuestions[index].answers[
        answerIndex
      ].votes = state.answeredQuestions[index].answers[
        answerIndex
      ].votes.filter(initialVote => initialVote.id !== payload.vote.id);
      return state.answeredQuestions;
    }
  },
  updateSingleQuestionVotes(state, vote) {
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
  },
  clearState(state, names) {
    /**
     * Clear the arrays of paginated content, to not load the api response arrays
     * again and again on component mount
     */
    for (name of names) {
      state[name] = [];
    }
  }
};
