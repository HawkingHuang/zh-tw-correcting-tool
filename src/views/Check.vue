<template>
  <div>
    <base-card>
      <section class="text-input-section">
        <div class="original">
          <label for="original-text" class="original-title">Original</label>
          <textarea
            id="original-text"
            placeholder="Enter Traditional Chinese here..."
            v-model="userInput"
            class="textarea"
          ></textarea>
        </div>
        <div class="result">
          <label for="result-text" class="result-title">Corrected</label>
          <div id="result-text" class="result-text"></div>
        </div>
      </section>
      <section class="button-section">
        <button class="btn" @click="check" aria-label="Check">
          <ion-icon name="checkmark-outline"></ion-icon>
        </button>
        <button class="btn" @click="reset" aria-label="Refresh">
          <ion-icon name="refresh-outline"></ion-icon>
        </button>
      </section>
    </base-card>
  </div>
</template>

<script>
import { db } from "../main.js";
import { getDocs, collection } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default {
  metaInfo: {
    meta: [
      {
        name: "check",
        content: "The Check section finds incorrect words for users.",
      },
    ],
  },
  data() {
    return {
      userInput: "",
    };
  },
  mounted() {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.$store.commit("logIn");
        this.$store.commit("setUserEmail", user.email);

        if (!this.$store.state.welcomed) {
          this.$store.commit("showWelcomeOrNot");
          setTimeout(() => {
            this.$store.commit("showWelcomeOrNot");
            this.fetchCustomWords();
          }, 3000);
        }
        this.$store.commit("changeWelcomed");
      } else {
        this.$store.commit("logOut");
      }
    });
  },
  computed: {
    words() {
      return this.$store.getters.words;
    },
  },
  methods: {
    async fetchCustomWords() {
      // Users custom words
      const subCollectionName = this.$store.state.userEmail.split("@")[0];

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

      this.$store.commit("clearCustomWords");
      this.$store.commit("addCustomWords", words);
    },
    check() {
      let correctedText = this.userInput;
      this.words.forEach((word) => {
        const regex = new RegExp(word.incorrect, "gi");
        correctedText = correctedText.replace(
          regex,
          `<span style="color: red; display: inline-block;">${word.correct}</span>`
        );
      });

      const resultContainer = document.getElementById("result-text");
      resultContainer.innerHTML = correctedText;
    },
    reset() {
      this.userInput = "";
      const resultContainer = document.getElementById("result-text");
      resultContainer.innerHTML = "";
    },
  },
};
</script>

<style scoped>
.text-input-section {
  max-width: 185rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
  margin: 1.5rem auto;
}

.original,
.result {
  padding: 1rem 2rem;
  width: 100%;
}

.original-title,
.result-title {
  font-weight: 700;
}

label {
  display: block;
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

textarea,
.result-text {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  width: 90%;
  height: 50rem;
  border: 3px solid #ced4da;
  border-radius: 10px;
  resize: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-size: 2rem;
  padding: 0.5rem;
  overflow: auto;
}

.textarea::-webkit-scrollbar,
.result-text::-webkit-scrollbar {
  height: 1rem;
}

.textarea::-webkit-scrollbar-thumb,
.result-text::-webkit-scrollbar-thumb {
  background-color: #dee2e6;
  border-radius: 10px;
}

.textarea::-webkit-scrollbar-track,
.result-text::-webkit-scrollbar-track {
  background-color: #f1f3f5;
}

.result-text {
  text-align: left;
  margin: auto;
  white-space: pre-line;
}

.button-section {
  display: grid;
  grid-template-columns: 1fr;
  max-width: 6rem;
  margin: 2rem auto;
  row-gap: 1.6rem;
}

.btn {
  width: 6rem;
  height: 2.4rem;
  background-color: #fff;
  border-radius: 15px;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

ion-icon {
  font-size: 1.8rem;
  color: #212529;
}

/* 1024px */
@media (max-width: 64em) {
  .text-input-section {
    grid-template-columns: 1fr;
    margin: 1.5rem auto;
  }
}

/* 768px */
@media (max-width: 48em) {
  textarea,
  .result-text {
    width: 90%;
    height: 25rem;
  }

  .button-section {
    max-width: 8rem;
    margin: 2rem auto;
    row-gap: 1.6rem;
  }

  .btn {
    width: 8rem;
    height: 3.2rem;
  }
  ion-icon {
    font-size: 2.4rem;
  }
}

/* 480px */
@media (max-width: 30em) {
  textarea,
  .result-text {
    width: 90%;
    height: 15rem;
  }
}
</style>
