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
                  context.dispatch("logOut");
                  resolve(response.data.status);
                })
                .catch(error => {
                  context.dispatch("logOut");
                  reject(error);
                });
            } else {
              context.dispatch("logOut");
              resolve(response.data.status);
            }
          })
          .catch(error => {
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
              console.log(response, data.type);
              const vote = response.data.vote;
              resolve(response);
              if (data.type === "singleQuestion") {
                console.log("singleQuestion");
                context.commit("updateSingleQuestionVotes", vote);
              } else {
                console.log("correct");

                context.commit("updateAnswerVotes", {
                  vote: vote,
                  questionID: data.questionID
                });
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
  getAnsweredQuestions(context, data) {
    return new Promise((resolve, reject) => {
      axios
        .get("api/questions/answered/true?page=" + data)
        .then(response => {
          context.commit("setPaginatedContent", [
            "answeredQuestions",
            response.data.data
          ]);
          delete response.data.data;
          context.commit("setAnsweredQuestionsPageInfo", response.data);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getUnansweredQuestions(context, data) {
    return new Promise((resolve, reject) => {
      axios
        .get("api/questions/answered/false?page=" + data)
        .then(response => {
          context.commit("setPaginatedContent", [
            "unAnsweredQuestions",
            response.data.data
          ]);

          context.commit("setUnAnsweredQuestionsPageInfo", response.data);

          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getUserQuestions(context, data) {
    const userId = context.state.user.id;
    return new Promise((resolve, reject) => {
      axios
        .get(`api/questions/user/${userId}?page=${data}`)
        .then(response => {
          resolve(response);
          context.commit("setPaginatedContent", [
            "userQuestions",
            response.data.data
          ]);
          context.commit("setUserQuestionsPageInfo", response.data);
        })
        .catch(error => {
          reject(error.data.message);
        });
    });
  },
  getUserAnswers(context, data) {
    const userId = context.state.user.id;
    return new Promise((resolve, reject) => {
      axios
        .get(`api/answers/user/${userId}?page=${data}`)
        .then(response => {
          resolve(response);
          context.commit("setPaginatedContent", [
            "userAnswers",
            response.data.data
          ]);
          context.commit("setUserAnswersPageInfo", response.data);
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
          if (response.data.status === 200) {
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
                const user = response.data.user;
                context.dispatch("updateUser", user);
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
                const user = response.data.user;
                context.dispatch("updateUser", user);
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
            /**
             * User is still authenticated and active, so renew session by setting the cookie again
             */
            axios
              .post("api/setcookie", {
                token: token
              })
              .then(response => {
                if (response.status === 200) {
                  resolve(true);
                } else {
                  context.dispatch("logOut");
                  resolve(false);
                }
              });
          } else {
            context.dispatch("logOut");
            resolve(false);
          }
        })
        .catch(error => {
          context.dispatch("logOut");
          reject(false);
        });
    });
  },
  logOut(context) {
    localStorage.removeItem("user");
    context.commit("resetUser");
  },
  updateUser(context, user) {
    localStorage.setItem("user", JSON.stringify(user));
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
