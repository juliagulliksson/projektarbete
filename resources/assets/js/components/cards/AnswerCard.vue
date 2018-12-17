<template>
  <div class="answer">
    <p class="answer-details">
      <i class="fas fa-user-circle"></i>
      {{answer.user.name}} |
      {{answer.user.description}}
    </p>
    <p class="date">Answered {{formattedDate(answer.created_at)}}</p>
    <p v-html="answer.body" class="answer-body"></p>
    <div class="upvote" :class="{voted: userHasVoted}">
      <span class="vote-button" @click="upvote">
        <i class="fas fa-arrow-up"></i>
        <span class="upvote-text">Upvote</span>
        <span class="bullet">|</span>
        <span class="nr-of-votes" v-if="!loading">{{answer.votes_count}}</span>
        <i v-else class="fas fa-spinner fa-spin"></i>
      </span>
    </div>
  </div>
</template>

<script>
import formatDate from "./../mixins/formatDate.js";
export default {
  props: {
    answer: Object
  },
  data() {
    return {
      loading: false
    };
  },
  mixins: [formatDate],
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    user() {
      return this.$store.getters.user;
    },
    formattedDate(date) {
      return date => {
        return this.formatDate(date);
      };
    },
    userHasVoted() {
      let userVote = this.answer.votes.filter(
        vote => vote.user_id === this.user.id
      );
      return userVote.length > 0;
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
          .dispatch("upvoteAnswer", { answerID: this.answer.id })
          .then(response => {
            this.loading = false;
          });
      }
    }
  }
};
</script>
