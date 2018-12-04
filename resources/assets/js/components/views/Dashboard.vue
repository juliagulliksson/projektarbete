<template>
  <div class="dashboard">
    <div class="grid-center">
      <div class="col-8_sm-12">
        <div class="user-profile">
          <div class="grid-center">
            <div class="col-3 user-profile-image">
              <i class="fas fa-user-circle"></i>
            </div>
            <div class="col-4">
              <h3>{{ user.name }}</h3>
              <h5>Joined {{ formattedDate(user.created_at) }}</h5>
            </div>

            <!-- <div class="grid"> -->
            <div class="col-5_sm-12">
              <p v-if="user.description != null">{{user.description}}</p>
              <p v-else class="italic">No description yet...</p>
            </div>
          </div>
          <!--   </div> -->
        </div>
      </div>
      <div class="col-6_sm-12">
        <new-question-form></new-question-form>
      </div>
    </div>

    <div class="grid-center-noGutter">
      <div class="col-8_sm-12 profile-views">
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

      <div v-if="view === 'questions'" class="col-8_sm-12">
        <div class="questions">
          <h5 v-if="questions.length <= 0" class="text-center">You have no questions yet</h5>
          <template v-else v-for="question in questions">
            <user-question-card :question="question" :key="question.id"></user-question-card>
          </template>
        </div>
      </div>

      <div v-if="view === 'answers'" class="col-8_sm-12">
        <div class="answers">
          <h5 v-if="answers.length <= 0" class="text-center">You have no answers yet</h5>
          <template v-else v-for="answer in answers">
            <answer-card :question="answer.question" :key="answer.id" :answer="answer"></answer-card>
          </template>
        </div>
      </div>

      <div v-if="view === 'settings'" class="col-8_sm-12">
        <div class="settings">
          <h4 class="text-center">Change username</h4>
          <h5 class="text-center">Change password</h5>
          <h5 class="text-center">Upload profile picture</h5>
          <!-- <div class="col-5_sm-12"> -->
          <form @submit.prevent="addDescription">
            <div class="form-group">
              <label for="description">Add a description</label>
              <textarea
                v-model="description"
                class="form-control"
                name="description"
                cols="40"
                rows="5"
                placeholder="Write something about yourself..."
              ></textarea>
            </div>
            <button class="btn btn-default btn-main">Submit</button>
          </form>
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

export default {
  data() {
    return {
      title: "",
      view: "questions",
      description: ""
    };
  },
  components: {
    UserQuestionCard,
    AnswerCard,
    NewQuestionForm
  },
  methods: {
    // postQuestion() {
    //   this.$store
    //     .dispatch("postQuestion", {
    //       title: this.title
    //     })
    //     .then(response => {
    //       console.log(response);
    //       this.title = "";
    //     });
    // },
    addDescription() {
      this.$store
        .dispatch("postUserDescription", {
          description: this.description
        })
        .then(response => {
          console.log(response);
        });
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
