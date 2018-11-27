<template>
  <div>
    <h1>Register</h1>
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
      <button type="submit" class="btn btn-default">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    register() {
      this.$store
        .dispatch("register", {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(response => {
          this.$router.push({ name: "login" });
        });
    }
  }
};
</script>
