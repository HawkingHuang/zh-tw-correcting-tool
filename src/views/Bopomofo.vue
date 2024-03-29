<template>
  <div class="library-section">
    <p v-if="loading" class="loading">Loading...</p>
    <p v-else-if="noResult" class="no-result">No Collection Yet</p>
    <ul class="word-grid" v-else>
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
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

export default {
  metaInfo: {
    title: "Bopomofo",
    meta: [
      {
        name: "description",
        content: "The Bopomofo section displays categorized data.",
      },
    ],
  },
  props: ["bopomofoId"],
  data() {
    return {
      words: [],
      loading: true,
    };
  },
  computed: {
    noResult() {
      return this.words.length === 0;
    },
  },
  methods: {
    async fetchWords(bopomofoId) {
      try {
        this.loading = true;

        const fileRef = doc(
          db,
          "zh-tw-correcting-library-categorized",
          bopomofoId
        );

        const fileSnapshot = await getDoc(fileRef);

        if (fileSnapshot.exists()) {
          const bopomofoCollectionRef = collection(fileRef, "bopomofo");

          const querySnapshot = await getDocs(bopomofoCollectionRef);

          this.words = [];
          querySnapshot.forEach((doc) => {
            this.words.push(doc.data());
          });

          console.log("Fetched words:", this.words);
        } else {
          this.words = [];
          console.error("Document not found");
        }
      } catch (error) {
        console.error("Error fetching words:", error);
      } finally {
        this.loading = false;
      }
    },
  },
  beforeRouteUpdate(to, _, next) {
    this.fetchWords(to.params.bopomofoId);
    next();
  },
  mounted() {
    this.fetchWords(this.bopomofoId);
  },
};
</script>

<style scoped>
.library-section {
  padding: 2rem;
}

.loading,
.no-result {
  font-size: 2rem;
  font-weight: 700;
}

.word-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  row-gap: 1rem;
}

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
  font-size: 2rem;
  padding: 1rem 0;
  font-weight: 600;
}

.incorrect {
  color: #f03e3e;
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
