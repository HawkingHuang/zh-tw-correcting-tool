import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      words: [],
      customWords: [],
      loggedIn: false,
      userEmail: "",
      showWelcome: false,
      welcomed: false,
    };
  },
  getters: {
    words(state) {
      return state.words.concat(state.customWords);
    },
  },
  mutations: {
    setWords(state, words) {
      state.words = words;
    },
    addCustomWords(state, words) {
      state.customWords = state.customWords.concat(words);
      // console.log(words);
    },
    clearCustomWords(state) {
      state.customWords = [];
    },
    logIn(state) {
      state.loggedIn = true;
    },
    logOut(state) {
      state.loggedIn = false;
    },
    setUserEmail(state, email) {
      state.userEmail = email;
    },
    showWelcomeOrNot(state) {
      state.showWelcome = !state.showWelcome;
    },
    changeWelcomed(state) {
      state.welcomed = true;
    },
    clearWords(state) {
      state.words = [];
    },
  },
  actions: {},
  modules: {},
});
