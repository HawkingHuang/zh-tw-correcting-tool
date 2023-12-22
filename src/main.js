import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import { createMetaManager } from "vue-meta";
import VueMeta from "vue-meta";
import BaseCard from "./components/BaseCard.vue";

const vueApp = createApp(App);

vueApp.use(router);
vueApp.use(store);
vueApp.use(VueMeta.createMetaManager);

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
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
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
