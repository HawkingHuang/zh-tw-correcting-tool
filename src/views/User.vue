<template>
  <div>
    <base-card>
      <div class="user-section">
        <h2 class="user-section-title">
          Welcome, {{ $store.state.userEmail.split("@")[0] }}!
        </h2>
        <div class="user-section-links">
          <ul class="user-section-list">
            <li>
              <router-link :to="wordsLink()" class="user-section-btn"
                >My Words</router-link
              >
            </li>
            <li>
              <router-link :to="logsLink()" class="user-section-btn"
                >My Logs</router-link
              >
            </li>
          </ul>
        </div>
        <router-view></router-view>
      </div>
    </base-card>
  </div>
</template>

<script>
import MyWords from "./MyWords.vue";
import MyLogs from "./MyLogs.vue";
export default {
  components: {
    MyWords,
    MyLogs,
  },
  data() {
    return {
      userId: this.$store.state.userEmail.split("@")[0],
    };
  },
  methods: {
    wordsLink() {
      return `/user/mywords/${this.userId}`;
    },
    logsLink() {
      return `/user/mylogs/${this.userId}`;
    },
  },
};
</script>

<style scoped>
.user-section {
  padding: 2rem;
}

.user-section-title {
  font-size: 3rem;
}

.user-section-links {
  margin: 2rem 0;
}

.user-section-list {
  width: 20%;
  display: flex;
  justify-content: center;
  gap: 1.6rem;
  list-style: none;
  margin: 1rem auto;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  padding: 1rem;
}

.user-section-btn:link,
.user-section-btn:visited {
  text-decoration: none;
  color: #343a40;
  font-size: 2rem;
  padding: 1rem;
  border-radius: 5px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

a:active,
a:hover,
a.router-link-active {
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
</style>
