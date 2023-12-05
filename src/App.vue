<!-- Port: 8085 -->
<template>
  <div class="main-section">
    <the-header></the-header>
    <the-nav></the-nav>
    <transition name="welcome" mode="out-in">
      <div v-show="showWelcome" class="welcome-box">
        Welcome, {{ $store.state.userEmail.split("@")[0] }}!
      </div>
    </transition>
    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import TheNav from "./components/TheNav.vue";
import TheFooter from "./components/TheFooter.vue";

export default {
  components: {
    TheHeader,
    TheNav,
    TheFooter,
  },
  computed: {
    showWelcome() {
      return this.$store.state.showWelcome;
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.main-section {
  position: relative;
}

.welcome-box {
  position: absolute;
  font-size: 1.6rem;
  top: 2rem;
  right: 2rem;
  background-color: black;
  color: white;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.route-enter-from,
.route-leave-to {
  opacity: 0;
}

.route-enter-active {
  transition: opacity 0.3s ease-out;
}

.route-leave-active {
  transition: opacity 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
}

.welcome-enter-active,
.welcome-leave-active {
  transition: all 0.8s ease-out;
}

.welcome-enter-from,
.welcome-leave-to {
  opacity: 0;
}

.welcome-enter-to,
.welcome-leave-from {
  opacity: 1;
}
</style>
