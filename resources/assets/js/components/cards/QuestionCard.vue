<template>
  <!--  <div class="col-6_sm-12"> -->
  <div class="question">
    <h3 class="question-title">
      <router-link :to="questionUrl(question.id)">{{question.title}}</router-link>
    </h3>
    <p class="question-details">
      <span v-if="question.user != undefined">
        <i class="fas fa-user-circle"></i>
        {{question.user.name}} |
      </span>
      {{formattedDate(question.created_at)}}
    </p>
  </div>
  <!--   </div> -->
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
    },
    questionUrl(id) {
      return id => {
        return "/question/" + id;
      };
    }
  }
};
</script>
