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
        .catch(error => {
          reject(error.data.message);
        });
    });
  },
  destroyToken(context) {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + context.state.token;
    if (context.getters.loggedIn) {
      return new Promise((resolve, reject) => {
        axios
          .post("/api/logout")
          .then(response => {
            localStorage.removeItem("access_token");
            // localStorage.setItem("user", JSON.stringify(response.data.user));
            context.commit("destroyToken");
            resolve(response);
          })
          .catch(error => {
            localStorage.removeItem("access_token");
            context.commit("destroyToken");
            reject(error.data.message);
          });
      });
    }
  },
  register(context, data) {
    return new Promise((resolve, reject) => {
      axios
        .post("/api/register", {
          name: data.name,
          email: data.email,
          password: data.password
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error.data.message);
        });
    });
  },
  postQuestion(context, data) {
    /*   axios.defaults.headers.common["Content-Type"] = "application/json"; */
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + context.state.token;
    return new Promise((resolve, reject) => {
      axios
        .post("api/questions", {
          title: data.title
        })
        .then(response => {
          console.log(response);
          resolve(response);
        })
        .catch(error => {
          reject(error.data.message);
        });
    });
  },
  getQuestions(context, data) {
    axios.get("api/questions").then(response => {
      console.log(response);
    });
  }
};
