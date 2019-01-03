<template>
  <div class="questions-homepage">
    <div>
      <h4>Latest unanswered questions</h4>
      <template v-if="loaded">
        <template v-for="question in questions">
          <question-card :question="question" :key="question.id"></question-card>
        </template>
      </template>
      <template v-else>
        <skeleton></skeleton>
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
    getQuestions(page) {
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
    this.getQuestions("1");
  }
};
</script>
