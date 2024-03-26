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
        <button @click="deleteWord(index)" class="btn" v-if="deleteButton">
          <ion-icon name="trash-outline"></ion-icon>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { db } from "../main.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";

export default {
  props: ["userId"],
  setup() {
    const store = useStore();

    let words = ref([]);
    let deleteButton = ref(false);

    async function deleteWord(index) {
      const subCollectionName = store.state.userEmail.split("@")[0];
      const docId = words.value[index].id;
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
        words.value.splice(index, 1);
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    }

    function showDeleteButton() {
      deleteButton.value = !deleteButton.value;
    }

    onMounted(() => {
      const auth = getAuth();

      onAuthStateChanged(auth, (user) => {
        if (user) {
          store.commit("logIn");
          store.commit("setUserEmail", user.email);
          store.dispatch("fetchCustomWords").then(() => {
            words.value = store.state.customWords;
          });
        } else {
          store.commit("logOut");
        }
      });
    });

    return { words, deleteButton, deleteWord, showDeleteButton };
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
  font-size: 2rem;
  padding: 1rem 0;
  font-weight: 600;
}

.correct {
  color: #69db7c;
}

.incorrect {
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

/* 1088px */
@media (max-width: 68em) {
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
