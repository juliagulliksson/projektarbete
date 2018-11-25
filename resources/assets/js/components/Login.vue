<template>
  <div>
    <h2>Sign in {{ user }}</h2>
      <form method="post" @submit.prevent="login">
        <div class="form-group">
          <label for="username">E-mail</label>
          <input type="username" id="username" class="form-control" placeholder="user@example.com" v-model="username" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" class="form-control" v-model="password" required>
        </div>
        <button type="submit" class="btn btn-default">Sign in</button>
      </form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  computed: {
    user() {
      return this.$store.getters.userId;
    }
  },
  methods: {
    login() {
      /**
       * Retrieve the token from the API endpoint
       */
      this.$store
        .dispatch("retrieveToken", {
          username: this.username,
          password: this.password
        })
        .then(response => {
          this.$router.push({ name: "dashboard" });
        });
    }
  }
};
</script>
