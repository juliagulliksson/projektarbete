<template>
  <div class="grid-center">
    <div class="col-7_sm-12">
      <div class="register-box">
        <h3 class="text-center">Sign up</h3>
        <form method="post" @submit.prevent="register">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" name="name" class="form-control" v-model="name" required>
          </div>
          <div class="form-group">
            <label for="email">E-mail</label>
            <input
              type="email"
              name="email"
              class="form-control"
              v-model="email"
              placeholder="user@example.com"
              required
            >
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" name="password" class="form-control" v-model="password" required>
          </div>
          <div class="form-group">
            <input type="checkbox" class="form-check-input" name="gdpr" required>
            <label for="gdpr" class="form-check-label">I agree to my the storing of my information</label>
          </div>
          <div v-if="error != ''" class="alert alert-danger" role="alert">
            <p class="text-center">{{error }}</p>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-main">
              Sign up
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
  data() {
    return {
      name: "",
      email: "",
      password: "",
      loading: false,
      error: ""
    };
  },
  methods: {
    register() {
      this.loading = true;
      this.$store
        .dispatch("register", {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(response => {
          this.$router.push({ name: "login" });
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;

          this.error = "Username or email already exists";
        });
    }
  }
};
</script>
