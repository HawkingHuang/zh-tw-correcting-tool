import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      words: [],
      loggedIn: false,
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
  },
  actions: {},
  modules: {},
});
