import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import BaseCard from "./components/BaseCard.vue";
const app = createApp(App);

app.use(router);
app.use(store);

app.component("base-card", BaseCard);

app.mount("#app");

// Firebase
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  collectionGroup,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDRi_N0bR_9OjOZVdciEBETd_go7ve_1GE",
  authDomain: "fir-course-48871.firebaseapp.com",
  projectId: "fir-course-48871",
  storageBucket: "fir-course-48871.appspot.com",
  messagingSenderId: "517794616083",
  appId: "1:517794616083:web:e4d7d82ee5bf06e8b100e6",
};
initializeApp(firebaseConfig);
const db = getFirestore();

// const colRef = collection(db, "zh-tw-correcting-library");

// getDocs(colRef)
//   .then((snapshot) => {
//     let words = [];
//     snapshot.docs.forEach((doc) => {
//       words.push({ ...doc.data() });
//     });
//     console.log(words);
//     store.commit("setWords", words);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

// Categorized

const querySnapshot = await getDocs(collectionGroup(db, "bopomofo"));

const words = [];
querySnapshot.docs.forEach((doc) => {
  words.push({ ...doc.data() });
});
// console.log(words);

store.commit("setWords", words);

export { db };
