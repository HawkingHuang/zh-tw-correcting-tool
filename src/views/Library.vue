<template>
  <div>
    <base-card>
      <div class="search-bar">
        <input v-model="searchTerm" placeholder="Search..." />
        <ion-icon
          name="close-circle-outline"
          class="empty-icon"
          @click="emptyField"
        ></ion-icon>
      </div>
      <div class="router-link-section" v-if="showRouterLink">
        <ul>
          <li class="router-list">
            <router-link
              class="router-btn"
              v-for="(subset, index) in subsets"
              :key="index"
              :to="bopomofoLink(index)"
            >
              {{ subset.label }}
            </router-link>
          </li>
        </ul>
      </div>
      <router-view v-slot="slotProps" v-if="showRouterLink">
        <transition name="route-library" mode="out-in" appear>
          <component :is="slotProps.Component"></component>
        </transition>
      </router-view>
      <div class="library-section" v-if="!showRouterLink">
        <p v-if="noResult" class="no-result">No Results Found</p>
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
import Bopomofo from "./Bopomofo.vue";
export default {
  components: {
    Bopomofo,
  },
  data() {
    return {
      searchTerm: "",
      showRouterLink: true,
      subsets: [
        { name: "bopomofo-1", label: "ㄅ" },
        { name: "bopomofo-3", label: "ㄆ" },
        { name: "bopomofo-2", label: "ㄇ" },
        { name: "bopomofo-4", label: "ㄈ" },
        { name: "bopomofo-5", label: "ㄉ" },
        { name: "bopomofo-6", label: "ㄊ" },
        { name: "bopomofo-7", label: "ㄋ" },
        { name: "bopomofo-8", label: "ㄌ" },
        { name: "bopomofo-9", label: "ㄍ" },
        { name: "bopomofo-10", label: "ㄎ" },
        { name: "bopomofo-11", label: "ㄏ" },
        { name: "bopomofo-12", label: "ㄐ" },
        { name: "bopomofo-13", label: "ㄑ" },
        { name: "bopomofo-14", label: "ㄒ" },
        { name: "bopomofo-15", label: "ㄓ" },
        { name: "bopomofo-16", label: "ㄔ" },
        { name: "bopomofo-17", label: "ㄕ" },
        { name: "bopomofo-18", label: "ㄖ" },
        { name: "bopomofo-19", label: "ㄗ" },
        { name: "bopomofo-20", label: "ㄘ" },
        { name: "bopomofo-21", label: "ㄙ" },
        { name: "bopomofo-22", label: "ㄧ" },
        { name: "bopomofo-23", label: "ㄨ" },
        { name: "bopomofo-24", label: "ㄩ" },
        { name: "bopomofo-25", label: "ㄚ" },
        { name: "bopomofo-26", label: "ㄛ" },
        { name: "bopomofo-27", label: "ㄜ" },
        { name: "bopomofo-28", label: "ㄝ" },
        { name: "bopomofo-29", label: "ㄞ" },
        { name: "bopomofo-30", label: "ㄟ" },
        { name: "bopomofo-31", label: "ㄠ" },
        { name: "bopomofo-32", label: "ㄡ" },
        { name: "bopomofo-33", label: "ㄢ" },
        { name: "bopomofo-34", label: "ㄣ" },
        { name: "bopomofo-35", label: "ㄤ" },
        { name: "bopomofo-36", label: "ㄥ" },
        { name: "bopomofo-37", label: "ㄦ" },
      ],
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
  watch: {
    searchTerm(newValue) {
      if (newValue.trim() !== "") {
        this.showRouterLink = false;
      } else {
        this.showRouterLink = true;
      }
    },
  },
  methods: {
    bopomofoLink(index) {
      return `/library/bopomofo-${index + 1}`;
    },
    emptyField() {
      this.searchTerm = "";
    },
  },
};
</script>

<style>
.search-bar {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 2rem;
}

.empty-icon:hover {
  cursor: pointer;
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
  color: black;
  font-weight: 600;
}

.incorrect {
  font-size: 2rem;
  color: red;
}

ion-icon {
  font-size: 2.4rem;
  color: black;
}

.router-link-section {
  margin: 2rem;
  display: flex;
  overflow-x: auto;
  padding: 1rem 0.4rem;
}

.router-link-section::-webkit-scrollbar {
  height: 1rem;
}

.router-link-section::-webkit-scrollbar-thumb {
  background-color: #dee2e6;
  border-radius: 6px;
}

.router-link-section::-webkit-scrollbar-track {
  background-color: #f1f3f5;
}

.router-list {
  width: 100%;
  display: flex;
  justify-content: center;
  list-style-type: none;
  gap: 2rem;
}

.router-btn {
  text-decoration: none;
  font-size: 2rem;
  color: black;
  padding: 0.5rem;
  border-radius: 5px;
}

a:active,
a:hover,
a.router-link-active {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

/*.route-library-enter-from,
.route-library-leave-to {
  opacity: 0;
}

.route-library-enter-active {
  transition: opacity 0.3s ease-out;
}

.route-library-leave-active {
  transition: opacity 0.3s ease-in;
}

.route-library-enter-to,
.route-library-leave-from {
  opacity: 1;
}
@keyframes route-library-enter {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes route-library-leave {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.route-library-enter-active,
.route-library-leave-active {
  animation: route-library-enter 0.3s ease-out, route-library-leave 0.3s ease-in;
}*/
</style>
