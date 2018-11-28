<template>
  <div>
    <div class="grid-center">
      <div class="col-7_sm-12">
        <div class="user-profile">
          <div class="grid-center">
            <div class="col-3_sm-12 user-profile-image">
              <i class="fas fa-user-circle"></i>
            </div>
            <div class="col-6_sm-12">
              <h3>{{ user.name }}</h3>
              <h5>Joined {{ formattedDate(user.created_at) }}</h5>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6_sm-12">
        <h4>Post a new question</h4>
        <form method="post" @submit.prevent="postQuestion">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Ask away" v-model="title" required>
          </div>
          <button type="submit" class="btn btn-main">Submit</button>
        </form>
      </div>
    </div>

    <div class="grid-center">
      <div class="col-5_sm-12">
        <h4 class="text-center">Your questions ({{questions.length}})</h4>
        <template v-if="questions.length <= 0">
          <h5 class="text-center">You have no questions yet</h5>
        </template>
        <template v-else v-for="question in questions">
          <question-card :question="question" :key="question.id"></question-card>
        </template>
      </div>
      <div class="col-5_sm-12">
        <h4 class="text-center">Your answers(0)</h4>
        <h5 class="text-center">You have no answers yet</h5>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionCard from "./cards/QuestionCard";
export default {
  data() {
    return {
      title: ""
    };
  },
  components: {
    "question-card": QuestionCard
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
