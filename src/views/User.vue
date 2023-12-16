<template>
  <div>
    <base-card>
      <div class="user-section">
        <h2 class="user-section-title">
          Welcome, {{ $store.state.userEmail.split("@")[0] }}!
        </h2>
        <div class="user-route-section">
          <ul class="user-route-links">
            <li>
              <router-link :to="wordsLink()" class="user-route-link"
                >My Words</router-link
              >
            </li>
            <li>
              <router-link :to="logsLink()" class="user-route-link"
                >+ Feedback</router-link
              >
            </li>
          </ul>
        </div>
        <router-view v-slot="slotProps" :key="$route.path">
          <transition name="route-child" mode="out-in" appear>
            <component :is="slotProps.Component"></component>
          </transition>
        </router-view>
      </div>
    </base-card>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import MyWords from "./MyWords.vue";
import MyLogs from "./AddFeedback.vue";
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
  mounted() {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.$store.commit("logIn");
        this.$store.commit("setUserEmail", user.email);
        this.$store.commit("showWelcomeOrNot");
        setTimeout(() => {
          this.$store.commit("showWelcomeOrNot");
        }, 3000);
        this.userId = this.$store.state.userEmail.split("@")[0];
      } else {
        this.$store.commit("logOut");
      }
    });
  },
  methods: {
    wordsLink() {
      return `/user/mywords/${this.userId}`;
    },
    logsLink() {
      return `/user/add-feedback/${this.userId}`;
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

.user-route-section {
  margin: 2rem 0;
}

.user-route-links {
  width: 20%;
  display: flex;
  justify-content: center;
  gap: 1.6rem;
  list-style: none;
  margin: 1rem auto;
  border-radius: 5px;
  padding: 1rem;
}

.user-route-link:link,
.user-route-link:visited {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #212529;
  font-size: 2rem;
  font-weight: 700;
  padding: 1rem;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.user-route-link:hover {
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.route-child-enter-from,
.route-child-leave-to {
  opacity: 0;
}

.route-child-enter-active {
  transition: opacity 1.2s ease-out;
}

.route-child-leave-active {
  transition: opacity 1.2s ease-in;
}

.route-child-enter-to,
.route-child-leave-from {
  opacity: 1;
}
</style>
