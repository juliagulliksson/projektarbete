export default {
  retrieveToken(context, credentials) {
    return new Promise((resolve, reject) => {
      axios
        .post("/api/login", {
          username: credentials.username,
          password: credentials.password
        })
        .then(response => {
          const token = response.data.token;
          localStorage.setItem("access_token", token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          context.commit("retrieveToken", token);
          resolve(response);
        })
        .catch(response => {
          reject(response.data.message);
        });
    });
  }
};
