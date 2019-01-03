<template>
  <div class="dashboard">
    <div class="grid-center">
      <div class="col-10_md-12_sm-12">
        <div class="user-profile">
          <div class="grid-center">
            <div class="col-3_sm-5 user-profile-image">
              <i class="fas fa-user-circle"></i>
            </div>
            <div class="col-4_sm-7">
              <h3>{{ user.name }}</h3>
              <h5>Joined {{ formattedDate(user.created_at) }}</h5>
            </div>

            <div class="col-5_sm-12 user-description">
              <p v-if="user.description != null">{{user.description}}</p>
              <p v-else class="italic">No description yet...</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid-center-noGutter">
      <div class="col-10_md-12_sm-12 profile-views">
        <div class="grid-noGutter">
          <div class="col-4">
            <span
              :class="{ active: view == 'questions' }"
              @click="switchView('questions')"
            >Questions ({{questions.length}})</span>
          </div>
          <div class="col-4">
            <span
              :class="{ active: view == 'answers' }"
              @click="switchView('answers')"
            >Answers ({{answers.length}})</span>
          </div>
          <div class="col-4">
            <span
              :class="[view == 'settings' ? 'active' : 'last']"
              @click="switchView('settings')"
            >Settings</span>
          </div>
        </div>
      </div>

      <div v-if="view === 'questions'" class="col-10_md-12_sm-12">
        <div class="questions">
          <new-question-form></new-question-form>
          <h4 v-if="questions.length <= 0" class="text-center none-yet">You have no questions yet</h4>

          <template v-else v-for="question in questions">
            <user-question-card :question="question" :key="question.id"></user-question-card>
          </template>
        </div>
      </div>

      <div v-if="view === 'answers'" class="col-10_md-12_sm-12">
        <div class="answers">
          <h4 v-if="answers.length <= 0" class="text-center none-yet">You have no answers yet</h4>
          <template v-else v-for="answer in answers">
            <user-answer-card :question="answer.question" :key="answer.id" :answer="answer"></user-answer-card>
          </template>
        </div>
      </div>

      <div v-if="view === 'settings'" class="col-10_md-12_sm-12">
        <div class="settings">
          <div class="grid-center">
            <div class="col-10_md-12_sm-12">
              <change-username-form :username="user.name"></change-username-form>

              <div class="user-description-form">
                <user-description-form
                  v-if="user.description === null"
                  @clicked="addDescription"
                  :initialValue="''"
                  :type="'add'"
                ></user-description-form>
                <user-description-form
                  v-else
                  @clicked="addDescription"
                  :type="'edit'"
                  :initialValue="user.description"
                ></user-description-form>
                <transition name="message">
                  <div v-if="message != ''" class="alert alert-light" role="alert">{{message}}</div>
                </transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserQuestionCard from "./../cards/UserQuestionCard";
import UserAnswerCard from "./../cards/UserAnswerCard";
import NewQuestionForm from "./../forms/NewQuestionForm";
import UserDescriptionForm from "./../forms/UserDescriptionForm";
import ChangeUsernameForm from "./../forms/ChangeUsernameForm";

export default {
  data() {
    return {
      title: "",
      view: "questions",
      message: ""
    };
  },
  components: {
    UserQuestionCard,
    UserAnswerCard,
    NewQuestionForm,
    UserDescriptionForm,
    ChangeUsernameForm
  },
  methods: {
    addDescription(content, type) {
      this.$store.commit("changeLoading");

      this.$store
        .dispatch("postUserDescription", {
          description: content
        })
        .then(response => {
          this.$store.commit("changeLoading");
          this.message = "Description " + type + "ed";
          console.log(response);
        })
        .catch(error => {
          this.$store.commit("changeLoading");
          this.message = "Something went wrong on the server";
        });
    },
    switchView(view) {
      this.view = view;
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    questions() {
      return this.$store.getters.userQuestions;
    },
    answers() {
      return this.$store.getters.userAnswers;
    },
    formattedDate(date) {
      return date => {
        let d = new Date(date);
        let options = {
          month: "short",
          day: "numeric",
          year: "numeric"
        };
        return d.toLocaleString("en-us", options);
      };
    }
  },
  created() {
    this.$store.dispatch("getUserQuestions");
    this.$store.dispatch("getUserAnswers");
  }
};
</script>
