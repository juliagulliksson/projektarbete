<template>
  <div class="new-question-form">
    <h4>Post a new question</h4>
    <form method="post" @submit.prevent="postQuestion">
      <div class="grid">
        <div class="form-group col-9_sm-12 dashboard-input">
          <input type="text" class="form-control" placeholder="Ask away" v-model="title" required>
        </div>
        <div class="text-center col-3_sm-12">
          <button type="submit" class="btn btn-main">
            Submit
            <i v-if="loading" class="fas fa-spinner fa-spin"></i>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      loading: false
    };
  },
  methods: {
    postQuestion() {
      this.loading = true;
      this.$store
        .dispatch("postQuestion", {
          title: this.title
        })
        .then(response => {
          this.loading = false;
          this.title = "";
        })
        .catch(error => {
          this.loading = false;
          this.title = "";
        });
    }
  }
};
</script>
