<template>
  <form method="post" @submit.prevent="$emit('submit', answer)">
    <div class="form-group">
      <vue-editor v-model="answer"></vue-editor>
    </div>
    <div class="text-center">
      <button type="submit" class="btn btn-main">
        Post answer
        <i v-if="loading" class="fas fa-spinner fa-spin"></i>
      </button>
    </div>
  </form>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  data() {
    return {
      answer: ""
    };
  },
  components: {
    VueEditor
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>
