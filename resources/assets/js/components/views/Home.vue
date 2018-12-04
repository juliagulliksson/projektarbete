<template>
  <div>
    <div class="grid-center welcome-container">
      <div class="col-8_sm-12">
        <!-- <h1>Welcome to What's What!</h1>
        <p>Here you can read and post questions and answers to life's great mysteries.</p>
        -->
        <template v-if="!isAuthenticated">
          <div class="grid">
            <div class="col register-button-wrapper">
              <li>
                <router-link :to="{name:'register'}" class="btn btn-default btn-main">Sign up</router-link>
              </li>
            </div>
            <div class="col-2">
              <p class="homepage-or">or</p>
            </div>
            <div class="col login-button-wrapper">
              <li>
                <router-link :to="{name:'login'}" class="btn btn-default btn-inverted">Sign in</router-link>
              </li>
            </div>
          </div>
          <p>to post questions and answers</p>
        </template>
      </div>
    </div>
    <!-- welcome-container -->
    <div class="grid">
      <div class="col-8_sm-12">
        <div class="answers-homepage">
          <h4>Questions + answers go here</h4>
        </div>
      </div>
      <div v-if="loaded" class="col-4_sm-12">
        <div class="questions-homepage">
          <h4>Latest unanswered questions</h4>
          <template v-for="question in questionsWithoutAnswers">
            <question-card :question="question" :key="question.id"></question-card>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionCard from "./../cards/QuestionCard";
export default {
  data() {
    return {
      loaded: false
    };
  },
  components: {
    "question-card": QuestionCard
  },
  computed: {
    questionsWithoutAnswers() {
      return this.$store.getters.questionsWithoutAnswers;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  created() {
    this.$store.dispatch("getQuestions").then(response => {
      this.loaded = true;
    });
  }
};
</script>
