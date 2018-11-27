<template>
  <div>
    <div class="grid welcome-container">
      <div class="col"></div>
      <div class="col-8_sm-12">
        <h1>Welcome to What's What!</h1>
        <p>Here you can read and post questions and answers to life's great mysteries.</p>

        <template v-if="!isAuthenticated">
          <div class="grid">
            <div class="col register-button-wrapper">
              <li>
                <router-link :to="{name:'register'}" class="btn btn-success">Sign up</router-link>
              </li>
            </div>
            <div class="col-2">
              <p>or</p>
            </div>
            <div class="col login-button-wrapper">
              <li>
                <router-link :to="{name:'login'}" class="btn btn-primary">Sign in</router-link>
              </li>
            </div>
          </div>
          <p>to post questions and answers</p>
        </template>
      </div>
      <div class="col"></div>
    </div>
    <!-- welcome-container -->
    <template v-for="question in questions">
      <div class="grid-6_sm-12" :key="question.id">
        <question-card :question="question"></question-card>
      </div>
    </template>
  </div>
</template>

<script>
import QuestionCard from "./cards/QuestionCard";
export default {
  data() {
    return {};
  },
  components: {
    "question-card": QuestionCard
  },
  computed: {
    questions() {
      return this.$store.getters.questions;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  created() {
    this.$store.dispatch("getQuestions");
  }
};
</script>
