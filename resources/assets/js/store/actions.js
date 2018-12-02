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
          // Prevent email from being shown in the client
          delete user.email;
          // localStorage.setItem("access_token", token);
          localStorage.setItem("user", JSON.stringify(user));

          resolve(response);
          axios
            .post("api/setcookie", {
              token: token
            })
            .then(response => {
              // context.commit("retrieveToken", token);
              context.commit("setUser", user);
              console.log(response);
            })
            .catch(error => {
              console.log("COOKIE-ERROR", error);
            });
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  destroyToken(context) {
    if (context.getters.isAuthenticated) {
      return new Promise((resolve, reject) => {
        /**
         * Retrive token in the httponly cookie set in api/setcookie when the user
         * was logged in
         */
        axios
          .get("api/returncookie")
          .then(response => {
            if (response.data.status === 200) {
              const token = response.data.token;
              axios.defaults.headers.common["Authorization"] =
                "Bearer " + token;
              axios
                .post("/api/logout")
                .then(response => {
                  localStorage.removeItem("user");
                  context.commit("destroyToken");
                  resolve(response.data.status);
                })
                .catch(error => {
                  localStorage.removeItem("user");
                  context.commit("destroyToken");
                  reject(error);
                });
            } else {
              resolve(response.data.status);
            }
          })
          .catch(error => {
            console.log("COOKIE-ERROR", error);
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
          reject(error);
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
          reject(error);
        });
    });
  },
  postUserDescription(context, data) {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + context.state.token;
    return new Promise((resolve, reject) => {
      axios
        .post("api/userdescription", {
          description: data.description
        })
        .then(response => {
          console.log(response);
          const user = response.data.user;
          localStorage.setItem("user", JSON.stringify(user));
          context.commit("updateUser", user);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
