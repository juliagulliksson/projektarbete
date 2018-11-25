export default {
  userId(state) {
    return state.user;
  },
  loggedIn(state) {
    return state.token !== null;
  }
};
