<template>
  <div>
    <h1>You are logged in!</h1>
    <h2>Post a new question</h2>
     <form method="post" @submit.prevent="postQuestion">
        <div class="form-group">
          <label for="username">Title</label>
          <input type="text" class="form-control" placeholder="Ask away" v-model="title" required>
        </div>
        <button type="submit" class="btn btn-default">Submit</button>
      </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: ""
    };
  },
  methods: {
    postQuestion() {
      this.$store.dispatch("postQuestion", {
        title: this.title
      });
    }
  },
  created() {
    this.$store.dispatch("getQuestions");
  }
};
</script>
