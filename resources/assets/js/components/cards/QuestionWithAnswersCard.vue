<template>
  <div class="question-with-answer">
    <h3 class="question-title">
      <router-link :to="questionUrl(question.id)">{{question.title}}</router-link>
    </h3>
    <template v-for="answer in question.answers">
      <div :key="'a' + answer.id">
        <div
          class="answer"
          :class="{expanded: expand === true, 'unexpanded-answer': expandableAnswer && !expand}"
        >
          <p class="answer-details">
            <i class="fas fa-user-circle"></i>
            {{answer.user.name}} |
            <span
              class="date"
            >Answered {{formattedDate(answer.created_at)}}</span>
          </p>
          <p class="answer-body" v-html="answer.body"></p>
        </div>
        <div class="text-center">
          <button
            v-if="expandableAnswer && !expand"
            class="btn btn-default btn-expand"
            @click="expand = true"
          >Read more</button>
        </div>
        <upvote :answer="answer" :type="'questionWithAnswer'"/>
      </div>
    </template>
  </div>
</template>

<script>
import Upvote from "./Upvote";
import formatDate from "./../mixins/formatDate.js";

export default {
  data() {
    return {
      expand: false
    };
  },
  props: {
    question: Object
  },
  components: {
    Upvote
  },
  mixins: [formatDate],
  computed: {
    expandableAnswer() {
      if (this.question.answers[0].body.length > 400) {
        return true;
      }
      return false;
    },
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
