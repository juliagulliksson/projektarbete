<template></template>

<script>
export default {
  created() {
    this.$store
      .dispatch("destroyToken")
      .then(response => {
        /**
         * User is successfully logged out
         */
        if (response === 200) {
          this.$router.push({ name: "home" });
        } else {
          /**
           * Stored cookie token has expired or user is not authenticated
           */
          this.$router.push({
            name: "login",
            params: { sessionError: "Session expired" }
          });
        }
      })
      .catch(error => {
        this.$router.push({
          name: "login",
          params: { sessionError: "Session expired" }
        });
      });
  }
};
</script>
