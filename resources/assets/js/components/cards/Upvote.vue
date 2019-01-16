<template>
  <div class="upvote" :class="{voted: userHasVoted}">
    <span class="vote-button" @click="upvote">
      <i class="fas fa-arrow-up"></i>
      <span class="upvote-text">Upvote</span>
      <span class="bullet">|</span>
      <span class="nr-of-votes" v-if="!loading">{{answer.votes_count}}</span>
      <i v-else class="fas fa-spinner fa-spin"></i>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false
    };
  },
  props: {
    answer: Object,
    type: String
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    userHasVoted() {
      let userVote = this.answer.votes.filter(
        vote => vote.user_id === this.user.id
      );
      return userVote.length > 0;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    upvote() {
      this.loading = true;
      if (!this.isAuthenticated) {
        this.loading = false;

        this.$router.push({ name: "login" });
      } else {
        this.$store
          .dispatch("upvoteAnswer", {
            answerID: this.answer.id,
            type: this.type,
            questionID: this.answer.question_id
          })
          .then(response => {
            this.loading = false;
          })
          .catch(error => {
            this.$router.push({
              path: "/login",
              query: { sessionError: "Session expired" }
            });
          });
      }
    }
  }
};
</script>
