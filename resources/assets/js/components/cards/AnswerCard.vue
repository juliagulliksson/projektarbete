<template>
  <div class="question">
    <h3 class="question-title">
      <router-link :to="questionUrl(question.id)">{{question.title}}</router-link>
    </h3>
    <question-details :question="question"></question-details>
    <div class="answer">
      <p>{{answer.body}}</p>
      <question-details :question="answer"></question-details>
    </div>
  </div>
</template>

<script>
import QuestionDetails from "./QuestionDetails";
export default {
  props: {
    question: Object,
    answer: Object
  },
  components: {
    QuestionDetails
  },
  computed: {
    questionUrl(id) {
      return id => {
        return "/question/" + id;
      };
    }
  }
};
</script>
