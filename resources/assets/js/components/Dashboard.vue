<template>
  <div>
    <h1>Welcome {{user.name}}!</h1>
    <h2>Post a new question</h2>
    <form method="post" @submit.prevent="postQuestion">
      <div class="form-group">
        <label for="username">Title</label>
        <input type="text" class="form-control" placeholder="Ask away" v-model="title" required>
      </div>
      <button type="submit" class="btn btn-default">Submit</button>
    </form>

    <h4>Your questions</h4>

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
    }
  },
  created() {
    this.$store.dispatch("getUserQuestions");
  }
};
</script>
