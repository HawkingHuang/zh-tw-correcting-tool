import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      words: [],
      loggedIn: false,
      userEmail: "",
      showWelcome: false,
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
    showWelcomeOrNot(state) {
      state.showWelcome = !state.showWelcome;
    },
  },
  actions: {},
  modules: {},
});
