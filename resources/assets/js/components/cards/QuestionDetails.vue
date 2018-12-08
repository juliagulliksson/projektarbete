<template>
  <p class="question-details">
    <span v-if="question.user != undefined">
      <i class="fas fa-user-circle"></i>
      {{question.user.name}} |
    </span>
    Asked {{formattedDate(question.created_at)}}
  </p>
</template>

<script>
import formatDate from "./../mixins/formatDate.js";
export default {
  props: {
    question: Object
  },
  mixins: [formatDate],
  computed: {
    formattedDate(date) {
      return date => {
        return this.formatDate(date);
      };
    }
  }
};
</script>
