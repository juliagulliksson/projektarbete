<template>
  <div>
    <label for="username">Change username</label>
    <div class="grid">
      <div class="form-group col-8_sm-12 dashboard-input">
        <input type="text" class="form-control" name="username" v-model="newUsername">
      </div>
      <div class="text-center col-4_sm-12">
        <button class="btn btn-main" @click="postNewUsername">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    username: String
  },
  data() {
    return {
      newUsername: this.username
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    postNewUsername() {
      this.$store.dispatch("changeUsername", {
        name: this.newUsername,
        id: this.user.id
      });
    }
  }
};
</script>
