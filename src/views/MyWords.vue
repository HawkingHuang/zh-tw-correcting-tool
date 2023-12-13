<template>
  <div>
    <ul class="word-grid">
      <li
        v-for="(word, index) in words"
        :key="index"
        class="word-item-list"
        @click="showDeleteButton"
      >
        <div class="word-item">
          <div class="correct">{{ word.correct }}</div>
          <div class="incorrect">{{ word.incorrect }}</div>
        </div>
        <button @click="deleteWord(index)" class="btn" v-if="DeleteButton">
          <ion-icon name="trash-outline"></ion-icon>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { db } from "../main.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";

export default {
  props: ["userId"],
  data() {
    return {
      words: [],
      DeleteButton: false,
    };
  },
  methods: {
    async fetchCustomWords() {
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
        this.words.push({ ...doc.data(), id: doc.id });
      });
      console.log(this.words);

      this.$store.commit("addCustomWords", words);
    },
    async deleteWord(index) {
      const subCollectionName = this.$store.state.userEmail.split("@")[0];
      const docId = this.words[index].id;
      const docRef = doc(
        db,
        "zh-tw-correcting-library-users",
        subCollectionName,
        "users-custom-words",
        docId
      );
      try {
        await deleteDoc(docRef);
        console.log("Document deleted successfully!");
        this.words.splice(index, 1);
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    },
    showDeleteButton() {
      this.DeleteButton = !this.DeleteButton;
    },
  },
  mounted() {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.$store.commit("logIn");
        this.$store.commit("setUserEmail", user.email);
        this.fetchCustomWords();
      } else {
        this.$store.commit("logOut");
      }
    });
  },
};
</script>

<style scoped>
.word-item-list {
  list-style-type: none;
  cursor: pointer;
  position: relative;
}

.word-item-title {
  display: flex;
  justify-content: center;
  gap: 2.8rem;
}

.word-item {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.correct,
.incorrect {
  padding: 1rem 0;
  font-weight: 600;
}

.correct {
  font-size: 2rem;
  color: #69db7c;
}

.incorrect {
  font-size: 2rem;
  color: #f03e3e;
}

.word-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  row-gap: 1rem;
}

.btn {
  position: absolute;
  top: 26%;
  left: 85%;
  width: 3rem;
  height: 2.4rem;
  background-color: #fff;
  border-radius: 15px;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

ion-icon {
  font-size: 1.8rem;
  color: #212529;
}

/* 1200px */
@media (max-width: 75em) {
  .word-grid {
    grid-template-columns: repeat(7, 1fr);
  }
}

/* 1024px */
@media (max-width: 64em) {
  .word-grid {
    grid-template-columns: repeat(6, 1fr);
  }
}

/* 928px */
@media (max-width: 58em) {
  .word-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

/* 768px */
@media (max-width: 48em) {
  .word-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* 640px */
@media (max-width: 40em) {
  .word-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* 480px */
@media (max-width: 30em) {
  .word-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
