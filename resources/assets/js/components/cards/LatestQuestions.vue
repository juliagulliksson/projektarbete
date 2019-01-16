<template>
  <div class="questions-homepage">
    <div>
      <h4>Latest unanswered questions</h4>
      <template v-if="loaded">
        <div>
          <template v-for="question in questions">
            <question-card :question="question" :key="question.id"></question-card>
          </template>
        </div>
        <div class="text-center">
          <button @click="loadMore" class="btn btn-main btn-load-more">
            Load more
            <i v-if="loading" class="fas fa-spinner fa-spin"></i>
          </button>
        </div>
      </template>
      <template v-else>
        <skeleton></skeleton>
      </template>
    </div>
  </div>
</template>

<script>
import QuestionCard from "./QuestionCard";
import Skeleton from "./../skeletons/LatestQuestions";
export default {
  data() {
    return {
      loaded: false,
      loading: false
    };
  },
  components: {
    QuestionCard,
    Skeleton
  },
  computed: {
    questions() {
      return this.$store.getters.unAnsweredQuestions;
    },
    pageInfo() {
      return this.$store.getters.unAnsweredQuestionsPageInfo;
    }
  },
  methods: {
    getQuestions(page = "1") {
      this.$store.dispatch("getUnansweredQuestions", page).then(response => {
        this.loaded = true;
        this.loading = false;
      });
    },
    loadMore() {
      this.loading = true;
      let nextPage = this.pageInfo.current_page + 1;
      this.getQuestions(nextPage);
    }
  },
  created() {
    this.$store.commit("clearState", [
      "unAnsweredQuestions",
      "unAnsweredQuestionsPageInfo"
    ]);
    this.getQuestions();
  }
};
</script>
