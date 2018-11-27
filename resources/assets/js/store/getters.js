export default {
  loggedIn(state) {
    return state.token !== null;
  }
};
