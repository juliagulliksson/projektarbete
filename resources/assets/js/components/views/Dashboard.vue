<template>
  <div class="dashboard">
    <div class="grid-center">
      <div class="col-10_md-12_sm-12">
        <div class="user-profile">
          <div class="grid-center">
            <div class="col-3 user-profile-image">
              <i class="fas fa-user-circle"></i>
            </div>
            <div class="col-4">
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
      <div class="col-10_md-12_sm-12">
        <new-question-form></new-question-form>
      </div>
    </div>

    <div class="grid-center-noGutter">
      <div class="col-10_md-12_sm-12 profile-views">
        <div class="grid-noGutter">
          <div class="col-4">
            <span
              :class="{ active: view == 'questions' }"
              @click="showQuestions"
            >Questions ({{questions.length}})</span>
          </div>
          <div class="col-4">
            <span
              :class="{ active: view == 'answers' }"
              @click="showAnswers"
            >Answers ({{answers.length}})</span>
          </div>
          <div class="col-4">
            <span :class="[view == 'settings' ? 'active' : 'last']" @click="showSettings">Settings</span>
          </div>
        </div>
      </div>

      <div v-if="view === 'questions'" class="col-10_md-12_sm-12">
        <div class="questions">
          <h5 v-if="questions.length <= 0" class="text-center">You have no questions yet</h5>
          <template v-else v-for="question in questions">
            <user-question-card :question="question" :key="question.id"></user-question-card>
          </template>
        </div>
      </div>

      <div v-if="view === 'answers'" class="col-10_md-12_sm-12">
        <div class="answers">
          <h5 v-if="answers.length <= 0" class="text-center">You have no answers yet</h5>
          <template v-else v-for="answer in answers">
            <answer-card :question="answer.question" :key="answer.id" :answer="answer"></answer-card>
          </template>
        </div>
      </div>

      <div v-if="view === 'settings'" class="col-10_md-12_sm-12">
        <div class="settings">
          <h4 class="text-center">Change username</h4>
          <h5 class="text-center">Change password</h5>
          <h5 class="text-center">Upload profile picture</h5>
          <h5 class="text-center">Delete account</h5>
          <!-- <div class="col-5_sm-12"> -->
          <user-description-form
            v-if="user.description === null"
            @clicked="addDescription"
            :initialValue="user.description"
            :type="'add'"
          ></user-description-form>

          <!-- <form @submit.prevent="addDescription" >
            <div class="form-group">
              <label for="description">Add a description</label>
              <textarea
                v-model="description"
                class="form-control"
                name="description"
                cols="40"
                rows="5"
                
              ></textarea>
            </div>
            <button class="btn btn-default btn-main">Submit</button>
          </form>-->
          <user-description-form
            v-else
            @clicked="editDescription"
            :type="'edit'"
            :initialValue="user.description"
          ></user-description-form>

          <!--  </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserQuestionCard from "./../cards/UserQuestionCard";
import AnswerCard from "./../cards/AnswerCard";
import NewQuestionForm from "./../cards/NewQuestionForm";
import UserDescriptionForm from "./../cards/UserDescriptionForm";

export default {
  data() {
    return {
      title: "",
      view: "questions"
    };
  },
  components: {
    UserQuestionCard,
    AnswerCard,
    NewQuestionForm,
    UserDescriptionForm
  },
  methods: {
    addDescription(content) {
      this.$store
        .dispatch("postUserDescription", {
          description: content
        })
        .then(response => {
          console.log(response);
        });
    },
    editDescription(content) {
      console.log(content);
    },
    showQuestions() {
      this.view = "questions";
    },
    showAnswers() {
      this.view = "answers";
    },
    showSettings() {
      this.view = "settings";
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
