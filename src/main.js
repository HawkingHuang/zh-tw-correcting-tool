import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import BaseCard from "./components/BaseCard.vue";
const vueApp = createApp(App);

vueApp.use(router);
vueApp.use(store);

vueApp.component("base-card", BaseCard);

vueApp.mount("#app");

// Firebase
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDocs,
  collectionGroup,
  connectFirestoreEmulator,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRi_N0bR_9OjOZVdciEBETd_go7ve_1GE",
  authDomain: "fir-course-48871.firebaseapp.com",
  projectId: "fir-course-48871",
  storageBucket: "fir-course-48871.appspot.com",
  messagingSenderId: "517794616083",
  appId: "1:517794616083:web:e4d7d82ee5bf06e8b100e6",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

// Connect to the Firestore emulator only in development
if (process.env.NODE_ENV === "development") {
  connectFirestoreEmulator(db, "localhost", 8095);
}

// Categorized
let hasInitialized = false;
const querySnapshot = await getDocs(collectionGroup(db, "bopomofo"));

const words = [];
querySnapshot.docs.forEach((doc) => {
  words.push({ ...doc.data() });
});
console.log(words);

store.commit("setWords", words);
hasInitialized = true;

export { db, firebaseApp, hasInitialized };
