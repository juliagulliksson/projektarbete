<template>
  <div class="questions-homepage">
    <h4>Latest unanswered questions</h4>
    <template v-for="question in questionsWithoutAnswers">
      <question-card :question="question" :key="question.id"></question-card>
    </template>
  </div>
</template>

<script>
import QuestionCard from "./QuestionCard";
export default {
  components: {
    QuestionCard
  },
  computed: {
    questionsWithoutAnswers() {
      return this.$store.getters.questionsWithoutAnswers;
    }
  },
  created() {
    this.$store.dispatch("getQuestions");
  }
};
</script>
