export default {
  retrieveToken(context, data) {
    return new Promise((resolve, reject) => {
      axios
        .post("/api/login", {
          username: data.username,
          password: data.password
        })
        .then(response => {
          const token = response.data.token;
          const user = response.data.user;
          localStorage.setItem("access_token", token);
          localStorage.setItem("user", JSON.stringify(user));
          context.commit("retrieveToken", token);
          context.commit("setUser", user);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  destroyToken(context) {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + context.state.token;
    if (context.getters.isAuthenticated) {
      return new Promise((resolve, reject) => {
        axios
          .post("/api/logout")
          .then(response => {
            localStorage.removeItem("access_token");
            localStorage.removeItem("user");
            context.commit("destroyToken");
            resolve(response);
          })
          .catch(error => {
            localStorage.removeItem("access_token");
            localStorage.removeItem("user");
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
    /**
     * Send through token to authorize request
     */
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
          context.commit("updateUserQuestions", response.data);
        })
        .catch(error => {
          reject(error.data.message);
        });
    });
  },
  getQuestions(context, data) {
    return new Promise((resolve, reject) => {
      axios
        .get("api/questions")
        .then(response => {
          console.log(response);
          resolve(response);
          context.commit("setQuestions", response.data);
        })
        .catch(error => {
          reject(error.data.message);
        });
    });
  },
  getUserQuestions(context) {
    const userId = context.state.user.id;
    return new Promise((resolve, reject) => {
      axios
        .get(`api/questions/user/${userId}`)
        .then(response => {
          console.log(response);
          resolve(response);
          context.commit("setUserQuestions", response.data);
        })
        .catch(error => {
          reject(error.data.message);
        });
    });
  },
  getSingleQuestion(context, id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`api/questions/${id}`)
        .then(response => {
          console.log(response);
          resolve(response);
        })
        .catch(error => {
          reject(error.data.message);
        });
    });
  }
};
