<template>
  <div class="grid-center">
    <div class="col-7_sm-12">
      <div class="login-box">
        <h3 class="text-center">Sign in</h3>
        <form method="post" @submit.prevent="login">
          <div class="form-group">
            <label for="username">E-mail</label>
            <input
              type="username"
              id="username"
              class="form-control"
              placeholder="user@example.com"
              v-model="username"
              required
            >
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" class="form-control" v-model="password" required>
          </div>
          <div
            v-if="error != '' || sessionError != ''"
            class="alert alert-danger"
            role="alert"
          >{{error || sessionError}}</div>
          <div class="text-center">
            <button type="submit" class="btn btn-main">Sign in</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      error: ""
    };
  },
  props: {
    sessionError: {
      type: String,
      required: false,
      default: ""
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
          console.log(response);
          this.$router.push({ name: "dashboard" });
        })
        .catch(error => {
          console.log(error);
          this.error = "Wrong username or password. Please try again";
        });
    }
  }
};
</script>
