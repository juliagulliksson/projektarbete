<template>
  <div class="question">
    <h3 class="question-title">
      <router-link :to="questionUrl(question.id)">{{question.title}}</router-link>
    </h3>
    <template v-for="answer in question.answers">
      <div class="answer" :key="'a' + answer.id">
        <p class="answer-details">
          <i class="fas fa-user-circle"></i>
          {{answer.user.name}} |
          <span
            class="date"
          >Answered {{formattedDate(answer.created_at)}}</span>
        </p>
        <p class="answer-body" v-html="answer.body"></p>
      </div>
    </template>
  </div>
</template>

<script>
import formatDate from "./../mixins/formatDate.js";
import QuestionCard from "./QuestionCard";
export default {
  props: {
    question: Object
  },
  components: {
    QuestionCard
  },
  mixins: [formatDate],
  computed: {
    formattedDate(date) {
      return date => {
        return this.formatDate(date);
      };
    },
    questionUrl(id) {
      return id => {
        return "/question-" + id;
      };
    }
  }
};
</script>
