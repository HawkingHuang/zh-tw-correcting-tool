import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      words: [],
      loggedIn: false,
      userEmail: "",
    };
  },
  getters: {
    words(state) {
      return state.words;
    },
  },
  mutations: {
    setWords(state, words) {
      state.words = words;
    },
    LogInOut(state) {
      state.loggedIn = !state.loggedIn;
    },
    setUserEmail(state, email) {
      state.userEmail = email;
    },
  },
  actions: {},
  modules: {},
});
