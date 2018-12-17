<template>
  <div v-if="loaded" class="grid">
    <div class="col-8_sm-12">
      <div class="single-question">
        <h3 class="question-title">{{question.title}}</h3>
        <question-details :question="question"></question-details>
      </div>
      <div v-if="question.user_id != user.id && isAuthenticated && !userHasAlreadyAnswered">
        <new-answer-form @submit="postAnswer"></new-answer-form>
      </div>
      <div v-if="question.answers.length > 0" class="single-question-answers">
        <div class="answers">
          <h4>
            {{question.answers.length}} answer
            <span v-if="question.answers.length > 1">s</span>
          </h4>
          <template v-for="answer in question.answers">
            <answer-card :key="'a' + answer.id" :answer="answer"></answer-card>
          </template>
        </div>
      </div>
      <div v-else>
        No answers yet.
        <span
          v-if="!isAuthenticated"
        >Be first to offer your insights on this subject by
          <router-link :to="{name: 'register'}">signing up.</router-link>
        </span>
      </div>
    </div>

    <div class="col-4_sm-12">
      <latest-questions></latest-questions>
    </div>
  </div>
</template>

<script>
import QuestionDetails from "./../cards/QuestionDetails";
import LatestQuestions from "./../cards/LatestQuestions";
import AnswerCard from "./../cards/AnswerCard";
import NewAnswerForm from "./../forms/NewAnswerForm";

export default {
  data() {
    return {
      loaded: false
    };
  },
  components: {
    QuestionDetails,

    LatestQuestions,
    AnswerCard,
    NewAnswerForm
  },
  computed: {
    question() {
      return this.$store.getters.singleQuestion;
    },
    user() {
      return this.$store.getters.user;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    userHasAlreadyAnswered() {
      let userAnswer = this.question.answers.filter(
        answer => answer.user_id === this.user.id
      );
      return userAnswer.length > 0;
    }
  },
  methods: {
    postAnswer(answer) {
      this.$store.commit("changeLoading");
      this.$store
        .dispatch("postAnswer", {
          question_id: this.$route.params.id,
          body: answer
        })
        .then(response => {
          const answer = response.data.answer;
          answer.user = this.user;
          answer.votes = [];
          answer.votes_count = 0;
          this.question.answers.push(answer);
          this.answer = "";
          this.$store.commit("changeLoading");
        });
    },
    getQuestion() {
      this.$store
        .dispatch("getSingleQuestion", this.$route.params.id)
        .then(response => {
          this.loaded = true;
        })
        .catch(error => {
          this.$router.push({ name: "404" });
        });
    }
  },
  created() {
    this.getQuestion();
  },
  watch: {
    $route(to, from) {
      this.getQuestion();
    }
  }
};
</script>
