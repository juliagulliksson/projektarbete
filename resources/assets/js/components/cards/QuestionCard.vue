<template>
  <div class="col-md-6 col-sm-12 col-md-offset-3">
    <div class="well">
      <h3>
        <router-link :to="questionUrl(question.id)">{{question.title}}</router-link>
      </h3>
      <small>
        Asked on {{slicedDate(question.created_at)}}
        <span
          v-if="question.user != undefined"
        >by {{question.user.name}}</span>
      </small>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: Object
  },
  computed: {
    slicedDate(date) {
      return date => {
        return date.slice(0, 16);
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
