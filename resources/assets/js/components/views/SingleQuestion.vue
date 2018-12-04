<template>
  <div class="grid-center">
    <div class="col-8_sm-12">
      <div v-if="loaded" class="single-question">
        <h3 class="question-title">{{question.title}}</h3>
        <question-details :question="question"></question-details>
      </div>
    </div>
    <div v-if="question.user_id != user.id" class="col-8_sm-12">
      <h4>Post an answer to this question</h4>
      <form method="post" @submit.prevent="postAnswer">
        <div class="form-group">
          <textarea class="form-control" placeholder="Offer your insights..." v-model="answer"></textarea>
        </div>
        <div class="text-center col-4">
          <button type="submit" class="btn btn-main">
            Submit
            <i v-if="loading" class="fas fa-spinner fa-spin"></i>
          </button>
        </div>
      </form>
    </div>
    <div class="col-8_sm-12">
      <div class="answers">
        <template v-for="answer in question.answers">
          <div class="answer" :key="answer.id">
            <p class="answer-details">
              <i class="fas fa-user-circle"></i>
              {{answer.user.name}} |
              Answered {{answer.created_at}}
            </p>
            <p>{{answer.body}}</p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionDetails from "./../cards/QuestionDetails";
export default {
  data() {
    return {
      question: {},
      loaded: false,
      answer: ""
    };
  },
  components: {
    QuestionDetails
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    postAnswer() {
      this.$store.commit("changeLoading");
      this.$store
        .dispatch("postAnswer", {
          question_id: this.$route.params.id,
          body: this.answer
        })
        .then(response => {
          const answer = response.data.answer;
          answer.user = this.user;
          this.question.answers.push(answer);
          this.answer = "";
          this.$store.commit("changeLoading");
        });
    }
  },
  created() {
    this.$store
      .dispatch("getSingleQuestion", this.$route.params.id)
      .then(response => {
        this.question = response.data;
        this.loaded = true;
      });
    /* .catch(error => {
         this.$router.push({ name: "dashboard" });
      }) */
    console.log(this.$route.params.id);
  }
};
</script>
