import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      words: [],
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
  },
  actions: {},
  modules: {},
});
