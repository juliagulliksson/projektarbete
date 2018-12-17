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
          /**
           * Prevent email from being shown in the client
           */

          delete user.email;
          /**
           * Save token in an httponly cookie on the server side
           */
          axios
            .post("api/setcookie", {
              token: token
            })
            .then(response => {
              /**
               * Finally log the user in
               */
              localStorage.setItem("user", JSON.stringify(user));
              context.commit("setUser", user);
              resolve(response);
            })
            .catch(error => {
              reject(error);
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
                  console.log("EXPECTED");
                  context.dispatch("logOut");
                  resolve(response.data.status);
                })
                .catch(error => {
                  context.dispatch("logOut");
                  reject(error);
                });
            } else {
              console.log("LOGOUT", response);
              context.dispatch("logOut");
              resolve(response.data.status);
            }
          })
          .catch(error => {
            console.log("COOKIE-ERROR", error);
            context.dispatch("logOut");
            reject(error);
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
    return new Promise((resolve, reject) => {
      axios
        .get("api/returncookie")
        .then(response => {
          if (response.status === 200) {
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + response.data.token;
            axios
              .post("api/questions", {
                title: data.title
              })
              .then(response => {
                console.log(response);
                resolve(response);
                context.commit("updateUserQuestions", response.data.question);
              })
              .catch(error => {
                reject(error);
              });
          } else {
            reject(response.status);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  postAnswer(context, data) {
    return new Promise((resolve, reject) => {
      axios
        .get("api/returncookie")
        .then(response => {
          if (response.status === 200) {
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + response.data.token;
            axios
              .post("api/answers", {
                question_id: data.question_id,
                body: data.body
              })
              .then(response => {
                console.log(response);
                resolve(response);
              })
              .catch(error => {
                reject(error);
              });
          } else {
            reject(response.status);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  upvoteAnswer(context, data) {
    return new Promise((resolve, reject) => {
      axios.get("api/returncookie").then(response => {
        if (response.status === 200) {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.token;
          axios
            .post("api/answers/votes", {
              type: "App\\Answer",
              id: data.answerID
            })
            .then(response => {
              console.log(response);
              resolve(response);
              context.commit("updateAnswerVotes", response.data.vote);
            })
            .catch(error => {
              reject(error);
            });
        }
      });
    });
  },
  getQuestions(context) {
    return new Promise((resolve, reject) => {
      axios
        .get("api/questions")
        .then(response => {
          console.log(response);
          resolve(response);
          context.commit("setQuestions", response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getAnswers(context) {
    return new Promise((resolve, reject) => {
      axios
        .get("api/answers")
        .then(response => {
          console.log(response);
          resolve(response);
          context.commit("setAnswers", response.data);
        })
        .catch(error => {
          reject(error);
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
  getUserAnswers(context) {
    const userId = context.state.user.id;
    return new Promise((resolve, reject) => {
      axios
        .get(`api/answers/user/${userId}`)
        .then(response => {
          console.log(response);
          resolve(response);
          context.commit("setUserAnswers", response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getSingleQuestion(context, id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`api/questions/${id}`)
        .then(response => {
          console.log(response);
          if (response.data.status === 200) {
            console.log(response);
            context.commit("setSingleQuestion", response.data.question);
            resolve(response);
          } else {
            reject(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  postUserDescription(context, data) {
    return new Promise((resolve, reject) => {
      axios
        .get("api/returncookie")
        .then(response => {
          if (response.data.status === 200) {
            const token = response.data.token;
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
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
          } else {
            reject(error);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  changeUsername(context, data) {
    return new Promise((resolve, reject) => {
      axios
        .get("api/returncookie")
        .then(response => {
          if (response.data.status === 200) {
            const token = response.data.token;
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            axios
              .put("api/user/" + data.id, {
                name: data.name
              })
              .then(response => {
                context.commit("updateUser", response.data.user);
                resolve(response);
                console.log(response);
              })
              .catch(error => {
                reject(error);
              });
          } else {
            reject(error);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  checkIfCookie(context, data) {
    return new Promise((resolve, reject) => {
      /**
       * Retrive token in the httponly cookie set in api/setcookie when the user
       * was logged in, to check if it still exists and hasn't expired
       * This code will run every time an authenticated user tries to navigates a route (app.js)
       */
      axios
        .get("api/returncookie")
        .then(response => {
          if (response.data.status === 200) {
            const token = response.data.token;
            console.log("IS COOKIE", response);
            /**
             * User is still authenticated and active, so renew session by setting the cookie again
             */
            axios
              .post("api/setcookie", {
                token: token
              })
              .then(response => {
                if (response.status === 200) {
                  console.log("YEAH");
                  resolve(true);
                } else {
                  context.dispatch("logOut");
                  /* localStorage.removeItem("user");
                  context.commit("destroyToken"); */
                  resolve(false);
                }
              });
          } else {
            console.log("NO COOKIE", response);
            /*  localStorage.removeItem("user");
            context.commit("destroyToken"); */
            context.dispatch("logOut");
            resolve(false);
          }
        })
        .catch(error => {
          console.log("ERROR", error);
          /* localStorage.removeItem("user");
          context.commit("destroyToken"); */
          context.dispatch("logOut");
          reject(false);
        });
    });
  },
  logOut(context) {
    localStorage.removeItem("user");
    context.commit("resetUser");
  },
  deleteAnswer(context, data) {
    const answerID = data.id;
    return new Promise((resolve, reject) => {
      axios.get("api/returncookie").then(response => {
        if (response.data.status === 200) {
          const token = response.data.token;
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;

          axios
            .delete("api/answers/" + answerID)
            .then(response => {
              if (response.data.status === 200) {
                context.commit("deleteUserAnswer", answerID);
                resolve(response);
              } else {
                reject(response);
              }
            })
            .catch(error => {
              reject(error);
            });
        } else {
          reject(error);
        }
      });
    });
  },
  editAnswer(context, data) {
    const answerID = data.id;
    return new Promise((resolve, reject) => {
      axios.get("api/returncookie").then(response => {
        if (response.data.status === 200) {
          const token = response.data.token;
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          axios
            .patch("api/answers/" + answerID, {
              body: data.body
            })
            .then(response => {
              if (response.data.status === 200) {
                console.log(response);
                context.commit("editAnswer", response.data.answer);
                resolve(response.data.answer);
              } else {
                reject(response);
              }
            })
            .catch(error => {
              reject(error);
            });
        } else {
          reject(error);
        }
      });
    });
  },
  editQuestion(context, data) {
    const questionID = data.id;
    return new Promise((resolve, reject) => {
      axios.get("api/returncookie").then(response => {
        if (response.data.status === 200) {
          const token = response.data.token;
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          axios
            .patch("api/questions/" + questionID, {
              title: data.title
            })
            .then(response => {
              if (response.data.status === 200) {
                console.log(response);
                context.commit("editQuestion", response.data.question);
                resolve(response.data.question);
              } else {
                reject(response);
              }
            })
            .catch(error => {
              reject(error);
            });
        } else {
          reject(401);
        }
      });
    });
  },
  deleteQuestion(context, data) {
    const questionID = data.id;
    return new Promise((resolve, reject) => {
      axios.get("api/returncookie").then(response => {
        if (response.data.status === 200) {
          const token = response.data.token;
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          axios
            .delete("api/questions/" + questionID)
            .then(response => {
              if (response.data.status === 200) {
                console.log(response);
                context.commit("deleteUserQuestion", questionID);
                resolve(response);
              } else {
                reject(response);
              }
            })
            .catch(error => {
              reject(error);
            });
        } else {
          reject(401);
        }
      });
    });
  }
};
