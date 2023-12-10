<template>
  <div>
    <ul class="word-grid">
      <li v-for="(word, index) in words" :key="index" class="word-item-list">
        <div class="word-item">
          <div class="correct">{{ word.correct }}</div>
          <div class="incorrect">{{ word.incorrect }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { db } from "../main.js";
import { getDocs, collection } from "firebase/firestore";

export default {
  props: ["userId"],
  data() {
    return {
      words: [],
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
        this.words.push({ ...doc.data() });
        console.log(words);
      });

      this.$store.commit("addCustomWords", words);
    },
  },
  mounted() {
    this.fetchCustomWords();
  },
};
</script>

<style>
.word-item-list {
  list-style-type: none;
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
</style>
