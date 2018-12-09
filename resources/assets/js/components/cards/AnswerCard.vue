<template>
  <div class="answer">
    <p class="answer-details">
      <i class="fas fa-user-circle"></i>
      {{answer.user.name}} |
      <span class="date">Answered {{formattedDate(answer.created_at)}}</span>
    </p>
    <p v-html="answer.body" class="answer-body"></p>
    <div v-if="user.id === answer.user_id">
      <p>BUTTONS</p>
    </div>
    <div class="upvote" :class="{voted: userHasVoted}">
      <span class="vote-button" @click="upvote">
        <i class="fas fa-arrow-up"></i>
        <span class="upvote-text">Upvote</span>
        <i class="fas fa-circle"></i>
        <span class="nr-of-votes">{{answer.votes_count}}</span>
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
      if (!this.isAuthenticated) {
        this.$router.push({ name: "login" });
      } else {
        this.$store.dispatch("upvoteAnswer", { answerID: this.answer.id });
      }
    }
  }
};
</script>
