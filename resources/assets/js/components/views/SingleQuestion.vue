<template>
  <div v-if="loaded" class="grid-center">
    <div class="col-10_sm-12">
      <div class="single-question">
        <h3 class="question-title">{{question.title}}</h3>
        <question-details :question="question"></question-details>
      </div>
    </div>
    <div
      v-if="question.user_id != user.id && isAuthenticated && !userHasAlreadyAnswered"
      class="col-10_sm-12"
    >
      <form method="post" @submit.prevent="postAnswer">
        <div class="form-group">
          <vue-editor v-model="answer"></vue-editor>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-main">
            Post answer
            <i v-if="loading" class="fas fa-spinner fa-spin"></i>
          </button>
        </div>
      </form>
    </div>
    <div v-if="question.answers.length > 0" class="col-10_sm-12 single-question-answers">
      <div class="answers">
        <template v-for="answer in question.answers">
          <div class="answer" :key="answer.id">
            <p class="answer-details">
              <i class="fas fa-user-circle"></i>
              {{answer.user.name}} |
              Answered {{answer.created_at}}
            </p>
            <p v-html="answer.body" class="answer-body"></p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import QuestionDetails from "./../cards/QuestionDetails";

export default {
  data() {
    return {
      question: {},
      loaded: false,
      answer: ""
    };
  },
  components: {
    QuestionDetails,
    VueEditor
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
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
    postAnswer() {
      this.$store.commit("changeLoading");
      this.$store
        .dispatch("postAnswer", {
          question_id: this.$route.params.id,
          body: this.answer
        })
        .then(response => {
          const answer = response.data.answer;
          answer.user = this.user;
          this.question.answers.push(answer);
          this.answer = "";
          this.$store.commit("changeLoading");
        });
    }
  },
  created() {
    this.$store
      .dispatch("getSingleQuestion", this.$route.params.id)
      .then(response => {
        this.question = response.data;
        this.loaded = true;
      });
    /* .catch(error => {
         this.$router.push({ name: "dashboard" });
      }) */
    console.log(this.$route.params.id);
  }
};
</script>
