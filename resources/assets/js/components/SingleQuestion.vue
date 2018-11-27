<template>
  <div class="row">
    <div class="col-md-6 col-sm-12 col-md-offset-3">
      <div class="well" v-if="question != undefined">
        <h3>{{question.title}}</h3>
        <small>Asked on {{slicedDate(question.created_at)}} by</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      question: {}
    };
  },
  computed: {
    slicedDate(date) {
      return date => {
        return date.slice(0, 16);
      };
    }
  },
  created() {
    this.$store
      .dispatch("getSingleQuestion", this.$route.params.id)
      .then(response => {
        this.question = response.data;
      });
  }
};
</script>
