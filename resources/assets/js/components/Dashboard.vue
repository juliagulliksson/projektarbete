<template>
  <div class="dashboard">
    <div class="grid-center">
      <div class="col-8_sm-12">
        <div class="user-profile">
          <div class="grid-center">
            <div class="col-3 user-profile-image">
              <i class="fas fa-user-circle"></i>
            </div>
            <div class="col-6">
              <h3>{{ user.name }}</h3>
              <h5>Joined {{ formattedDate(user.created_at) }}</h5>
            </div>
          </div>
          <div class="grid">
            <div v-if="user.description.length > 0" class="col-6">
              <p>{{user.description}}</p>
            </div>
            <div v-else class="col-6">
              <form @submit.prevent="addDescription">
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
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6_sm-12">
        <h4>Post a new question</h4>
        <form method="post" @submit.prevent="postQuestion">
          <div class="grid">
            <div class="form-group col-8 dashboard-input">
              <input
                type="text"
                class="form-control"
                placeholder="Ask away"
                v-model="title"
                required
              >
            </div>
            <div class="text-center col-4">
              <button type="submit" class="btn btn-main">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div class="grid-center-noGutter">
      <div class="col-8_sm-12 profile-views">
        <div class="grid-noGutter">
          <div class="col-4">
            <span
              :class="{ active: view == 'questions' }"
              @click="showQuestions"
            >Your questions ({{questions.length}})</span>
          </div>
          <div class="col-4">
            <span :class="{ active: view == 'answers' }" @click="showAnswers">Your answers (0)</span>
          </div>
          <div class="col-4">
            <span :class="[view == 'settings' ? 'active' : 'last']" @click="showSettings">Settings</span>
          </div>
        </div>
      </div>
      <div v-if="view === 'questions'" class="col-8_sm-12">
        <div class="questions">
          <template v-if="questions.length <= 0">
            <h5 class="text-center">You have no questions yet</h5>
          </template>
          <template v-else v-for="question in questions">
            <question-card :question="question" :key="question.id"></question-card>
          </template>
        </div>
      </div>
      <div v-if="view === 'answers'" class="col-8_sm-12">
        <div class="answers">
          <h5 class="text-center">You have no answers yet</h5>
        </div>
      </div>
      <div v-if="view === 'settings'" class="col-8_sm-12">
        <div class="settings">
          <h4 class="text-center">Change username</h4>
          <h5 class="text-center">Change password</h5>
          <h5 class="text-center">Upload profile picture</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionCard from "./cards/QuestionCard";

export default {
  data() {
    return {
      title: "",
      view: "questions",
      description: ""
    };
  },
  components: {
    QuestionCard
  },
  methods: {
    postQuestion() {
      this.$store
        .dispatch("postQuestion", {
          title: this.title
        })
        .then(response => {
          console.log(response);
          this.title = "";
        });
    },
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
  }
};
</script>
