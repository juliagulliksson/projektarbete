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
export default {
  props: {
    question: Object
  },
  computed: {
    formattedDate(date) {
      return date => {
        let d = new Date(date);
        let options = {
          month: "short",
          day: "numeric",
          year: "numeric"
        };
        return d.toLocaleString("en-us", options);
      };
    }
  }
};
</script>
