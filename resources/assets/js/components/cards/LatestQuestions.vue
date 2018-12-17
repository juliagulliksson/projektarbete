<template>
  <div class="questions-homepage">
    <h4>Latest unanswered questions</h4>
    <template v-if="loaded">
      <template v-for="question in questionsWithoutAnswers">
        <question-card :question="question" :key="question.id"></question-card>
      </template>
    </template>
    <template v-else>
      <skeleton></skeleton>
    </template>
  </div>
</template>

<script>
import QuestionCard from "./QuestionCard";
import Skeleton from "./../skeletons/LatestQuestions";
export default {
  data() {
    return {
      loaded: false
    };
  },
  components: {
    QuestionCard,
    Skeleton
  },
  computed: {
    questionsWithoutAnswers() {
      return this.$store.getters.questionsWithoutAnswers;
    }
  },
  created() {
    this.$store.dispatch("getQuestions").then(response => {
      this.loaded = true;
    });
  }
};
</script>
