<template>
  <div class="library-section">
    <p v-if="noResult" class="no-result">No results found</p>
    <!-- <ul v-if="!noResult">
      <li class="word-item-list">
        <div class="word-item-title">
          <div class="correct">
            <ion-icon name="shield-checkmark-outline"></ion-icon>
          </div>
          <div class="incorrect">
            <ion-icon name="close-circle-outline"></ion-icon>
          </div>
        </div>
      </li>
    </ul> -->
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
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";

export default {
  props: ["bopomofoId"],
  data() {
    return {
      searchTerm: "",
      words: [],
    };
  },
  computed: {
    // filteredWords() {
    //   return this.words.filter((word) => {
    //     const searchString = this.searchTerm;
    //     return (
    //       word.correct.includes(searchString) ||
    //       word.incorrect.includes(searchString)
    //     );
    //   });
    // },
    noResult() {
      return this.words.length === 0;
    },
  },
  methods: {
    // async fetchWords(bopomofoId) {
    //   const db = getFirestore();
    //   const fileRef = doc(db, "zh-tw-correcting-library", bopomofoId);
    //   const subCollectionRef = collection(fileRef, "bopomofo");

    //   const q = query(subCollectionRef);
    //   const querySnapshot = await getDocs(q);

    //   this.words = [];
    //   querySnapshot.forEach((doc) => {
    //     this.words.push(doc.data());
    //   });
    //   console.log(this.words);
    // },
    async fetchWords(bopomofoId) {
      try {
        const db = getFirestore();
        const fileRef = doc(
          db,
          "zh-tw-correcting-library-categorized",
          bopomofoId
        );

        const fileSnapshot = await getDoc(fileRef);

        if (fileSnapshot.exists()) {
          const bopomofoCollectionRef = collection(fileRef, "bopomofo");

          const q = query(bopomofoCollectionRef);

          const querySnapshot = await getDocs(q);

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
      }
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchWords(to.params.bopomofoId);
    next();
  },
  mounted() {
    this.fetchWords(this.$props.bopomofoId);
    // this.fetchWords("bopomofo-8");
  },
};
</script>

<style>
.library-section {
  padding: 2rem;
}

.no-result {
  font-size: 2rem;
  font-weight: 700;
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
  padding: 1rem 0;
}

.word-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  row-gap: 1rem;
}
</style>
