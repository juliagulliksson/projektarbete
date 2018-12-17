<template>
  <div>
    <div class="grid">
      <div class="col-8_sm-12">
        <div class="grid">
          <div class="col-12">
            <div class="welcome" v-if="!isAuthenticated">
              <div class="welcome-container">
                <h1 class="welcome-title text-center">Welcome to What's What!</h1>
                <p
                  class="text-center"
                >Here you can read and post questions and get them answered by someone who 'knows what's what'.</p>
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
              </div>
            </div>
            <div class="answers-homepage">
              <h4>Latest answers</h4>

              <template v-for="question in questionsWithAnswers">
                <questions-with-answers-card :key="'q' + question.id" :question="question"></questions-with-answers-card>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4_sm-12">
        <latest-questions></latest-questions>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionsWithAnswersCard from "./../cards/QuestionsWithAnswersCard";
import LatestQuestions from "./../cards/LatestQuestions";
export default {
  data() {
    return {
      loaded: false
    };
  },
  components: {
    QuestionsWithAnswersCard,
    LatestQuestions
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    questionsWithAnswers() {
      return this.$store.getters.questionsWithAnswers;
    }
  },
  created() {
    this.$store.dispatch("getQuestions").then(response => {
      this.loaded = true;
    });
  }
};
</script>
