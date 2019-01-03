<template>
  <div class="questions-with-answer">
    <div>
      <template v-for="question in questions">
        <question-with-answers-card :key="'q' + question.id" :question="question"></question-with-answers-card>
      </template>
    </div>
    <div class="text-center">
      <button @click="loadMore" class="btn btn-main btn-load-more">
        Load more
        <i v-if="loading" class="fas fa-spinner fa-spin"></i>
      </button>
    </div>
  </div>
</template>

<script>
import formatDate from "./../mixins/formatDate.js";
import QuestionWithAnswersCard from "./QuestionWithAnswersCard";
export default {
  data() {
    return {
      page: "",
      loading: false
    };
  },
  components: {
    QuestionWithAnswersCard
  },
  mixins: [formatDate],
  methods: {
    getQuestions(page) {
      this.$store.dispatch("getAnsweredQuestions", page).then(response => {
        this.loading = false;
      });
    },
    loadMore() {
      this.loading = true;
      let nextPage = this.pageInfo.current_page + 1;
      this.getQuestions(nextPage);
    }
  },
  computed: {
    questions() {
      return this.$store.getters.answeredQuestions;
    },
    pageInfo() {
      return this.$store.getters.answeredQuestionsPageInfo;
    }
  },
  created() {
    this.getQuestions("1");
  }
};
</script>
