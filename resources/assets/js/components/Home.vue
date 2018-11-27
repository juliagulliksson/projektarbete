<template>
  <div class="container">
    <h1>Welcome to What's What!</h1>
    <p>Here you can read and post questions and answers to life's great mysteries.</p>

    <template v-if="!loggedIn">
      <p>Register and/or login to post questions and answers of your own.</p>

      <div class="login-container">
        <div class="login-box">
          <li>
            <router-link :to="{name:'login'}" class="btn btn-primary">Login</router-link>
          </li>
        </div>
        <div class="register-box">
          <li>
            <router-link :to="{name:'register'}" class="btn btn-success">Register</router-link>
          </li>
        </div>
      </div>
    </template>

    <template v-for="question in questions">
      <div class="row" :key="question.id">
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
    loggedIn() {
      return this.$store.getters.loggedIn;
    }
  },
  created() {
    this.$store.dispatch("getQuestions");
  }
};
</script>
