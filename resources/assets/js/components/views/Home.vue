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
                <div class="grid home-buttons">
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
              <questions-with-answers-card></questions-with-answers-card>
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
import QuestionsWithAnswersCard from "./../cards/QuestionsWithAnswers";
import LatestQuestions from "./../cards/LatestQuestions";
export default {
  components: {
    QuestionsWithAnswersCard,
    LatestQuestions
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  }
};
</script>
