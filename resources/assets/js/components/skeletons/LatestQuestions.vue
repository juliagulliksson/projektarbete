<template>
  <div>
    <template v-for="(c, index) in questionLength">
      <div class="question skeleton" :key="'c' + index">
        <h3 class="question-title title-skeleton-1"></h3>
        <h3 class="question-title title-skeleton-2"></h3>

        <p class="question-details">
          <span>
            <i class="fas fa-user-circle"></i>
            <span class="user-skeleton"></span>
          </span>
          <span class="date date-skeleton"></span>
        </p>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  computed: {
    questionLength() {
      return this.$store.getters.unAnsweredQuestions.length;
    }
  }
};
</script>
