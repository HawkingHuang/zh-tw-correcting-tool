<template>
  <div>
    <base-card>
      <div class="search-bar">
        <input v-model="searchTerm" placeholder="Search..." />
      </div>
      <div class="library-section">
        <p v-if="noResult" class="no-result">No results found</p>
        <ul v-if="!noResult">
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
        </ul>
        <ul>
          <li
            v-for="(word, index) in filteredWords"
            :key="index"
            class="word-item-list"
          >
            <div class="word-item">
              <div class="correct">{{ word.correct }}</div>
              <div class="incorrect">{{ word.incorrect }}</div>
            </div>
          </li>
        </ul>
      </div>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: "",
    };
  },
  computed: {
    words() {
      return this.$store.getters.words;
    },
    filteredWords() {
      return this.words.filter((word) => {
        const searchString = this.searchTerm;
        return (
          word.correct.includes(searchString) ||
          word.incorrect.includes(searchString)
        );
      });
    },
    noResult() {
      return this.filteredWords.length === 0;
    },
  },
};
</script>

<style scoped>
.search-bar {
  padding: 2rem;
}

.search-bar input {
  height: 3rem;
  font-size: 1.8rem;
  padding: 0.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: none;
}

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

.correct {
  font-size: 2rem;
  color: blue;
}

.incorrect {
  font-size: 2rem;
  color: red;
}
</style>
