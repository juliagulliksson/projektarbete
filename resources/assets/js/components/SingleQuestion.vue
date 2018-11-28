<template>
  <div class="grid-center">
    <div class="col-8_sm-12">
      <div class="well">
        <h3>{{question.title}}</h3>
        <small>Asked on {{slicedDate(question.created_at)}} by {{username(question.user)}}</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    slicedDate(date) {
      return date => {
        if (date != undefined) {
          return date.slice(0, 16);
        }
      };
    },
    question() {
      return this.$store.getters.singleQuestion;
    },
    username(name) {
      return user => {
        if (user != undefined) {
          return user.name;
        }
      };
    }
  },
  created() {
    this.$store
      .dispatch("getSingleQuestion", this.$route.params.id)
      .then(response => {
        console.log(response);
      });
  }
};
</script>
