import { createStore } from "vuex";
import { db } from "../main.js";
import { getDocs, collection } from "firebase/firestore";

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
  actions: {
    async fetchCustomWords(context) {
      // Users custom words
      const subCollectionName = context.state.userEmail.split("@")[0];
      if (subCollectionName === "") {
        console.log("No custom words to fetch because users didn't log in");
      } else {
        const colRef = collection(
          db,
          "zh-tw-correcting-library-users",
          subCollectionName,
          "users-custom-words"
        );

        const words = [];
        const querySnapshotCustom = await getDocs(colRef);
        querySnapshotCustom.docs.forEach((doc) => {
          words.push({ ...doc.data() });
          console.log(words);
        });

        context.commit("clearCustomWords");
        context.commit("addCustomWords", words);
      }
    },
  },
});
