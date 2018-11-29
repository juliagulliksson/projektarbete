<template>
  <div class="grid-center">
    <div class="col-8_sm-12">
      <div v-if="loaded" class="single-question">
        <h3 class="question-title">{{question.title}}</h3>
        <question-details :question="question"></question-details>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionDetails from "./cards/QuestionDetails";
export default {
  data() {
    return {
      question: {},
      loaded: false
    };
  },
  components: {
    QuestionDetails
  },
  computed: {
    /*  question() {
      return this.$store.getters.singleQuestion;
    }, */
    /* username(name) {
      return user => {
        if (user != undefined) {
          return user.name;
        }
      };
    } */
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
  }
};
</script>
