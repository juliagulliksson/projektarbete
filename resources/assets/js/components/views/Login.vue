<template>
  <div class="grid-center">
    <div class="col-7_sm-12">
      <div class="login-box">
        <div v-if="sessionError != ''" class="alert alert-danger" role="alert">
          <p class="text-center">{{ sessionError}}</p>
        </div>
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
          <div v-if="error != ''" class="alert alert-danger" role="alert">
            <p class="text-center">{{error }}</p>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-main">
              Sign in
              <i v-if="loading" class="fas fa-spinner fa-spin"></i>
            </button>
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
  } /* ,
  props: {
    sessionError: {
      type: String,
      required: false,
      default: ""
    }
  } */,
  computed: {
    sessionError() {
      return this.$route.query.sessionError || "";
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    login() {
      this.$store.commit("changeLoading");
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
          this.$store.commit("changeLoading");
        })
        .catch(error => {
          console.log(error);
          this.$store.commit("changeLoading");
          this.error = "Wrong username or password. Please try again";
        });
    }
  }
};
</script>
