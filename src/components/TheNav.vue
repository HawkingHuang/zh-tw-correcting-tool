<template>
  <nav class="nav-section">
    <ul class="nav-section-list">
      <div class="nav-section-list-child" v-if="!showMenuOrNot">
        <li>
          <router-link to="/" class="nav-section-button"
            ><ion-icon name="checkmark-circle-outline"></ion-icon
            >Check</router-link
          >
        </li>
        <li>
          <router-link to="/custom" class="nav-section-button"
            ><ion-icon name="add-circle-outline"></ion-icon>Custom</router-link
          >
        </li>
        <li>
          <router-link to="/about" class="nav-section-button"
            ><ion-icon name="information-circle-outline"></ion-icon
            >About</router-link
          >
        </li>
        <li>
          <router-link to="/library" class="nav-section-button"
            ><ion-icon name="library-outline"></ion-icon>Library</router-link
          >
        </li>
        <li>
          <router-link to="/feedback" class="nav-section-button"
            ><ion-icon name="chatbox-ellipses-outline"></ion-icon
            >Feedback</router-link
          >
        </li>
      </div>
      <!-- Mobile menu -->
      <div class="nav-section-list-child-m" v-if="showMenuOrNot">
        <li>
          <button class="nav-section-button-m" @click="toggleDropdown">
            <ion-icon name="menu-outline"></ion-icon>
          </button>
          <transition name="dropdown-menu">
            <div v-if="isDropdownOpen" class="dropdown-menu">
              <router-link
                to="/"
                class="nav-dropdown-item"
                @click="closeDropdown"
              >
                <ion-icon name="checkmark-circle-outline"></ion-icon> Check
              </router-link>
              <router-link
                to="/custom"
                class="nav-dropdown-item"
                @click="closeDropdown"
              >
                <ion-icon name="add-circle-outline"></ion-icon> Custom
              </router-link>
              <router-link
                to="/about"
                class="nav-dropdown-item"
                @click="closeDropdown"
              >
                <ion-icon name="information-circle-outline"></ion-icon> About
              </router-link>
              <router-link
                to="/library"
                class="nav-dropdown-item"
                @click="closeDropdown"
              >
                <ion-icon name="library-outline"></ion-icon> Library
              </router-link>
              <router-link
                to="/feedback"
                class="nav-dropdown-item"
                @click="closeDropdown"
              >
                <ion-icon name="chatbox-ellipses-outline"></ion-icon> Feedback
              </router-link>
            </div>
          </transition>
        </li>
      </div>
      <div class="nav-section-list-child">
        <li v-if="$store.state.loggedIn">
          <router-link to="/user" class="nav-section-button"
            ><ion-icon name="person-outline"></ion-icon
            >{{ $store.state.userEmail.split("@")[0] }}</router-link
          >
        </li>
        <li v-if="!$store.state.loggedIn">
          <router-link to="/signup" class="nav-section-button"
            ><ion-icon name="person-add-outline"></ion-icon>Sign Up</router-link
          >
        </li>
        <li v-if="!$store.state.loggedIn">
          <router-link to="/login" class="nav-section-button"
            ><ion-icon name="log-in-outline"></ion-icon>Log In</router-link
          >
        </li>
        <li v-if="$store.state.loggedIn">
          <router-link to="/logout" class="nav-section-button"
            ><ion-icon name="log-out-outline"></ion-icon>Log Out</router-link
          >
        </li>
      </div>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isDropdownOpen: false,
      showMenuOrNot: false,
      windowWidth: window.innerWidth,
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
      this.showMenuOrNot = this.windowWidth < 1184;
    },
    closeDropdown() {
      this.isDropdownOpen = false;
    },
  },
  watch: {
    windowWidth(newWidth) {
      this.showMenuOrNot = newWidth < 1184;
    },
  },
  created() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  },
  mounted() {
    this.showMenuOrNot = this.windowWidth < 1184;
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style scoped>
.nav-section-list {
  width: 100%;
  display: flex;
  list-style: none;
  padding: 2rem 3rem;
  justify-content: space-between;
  font-size: 2rem;
  background-color: white;
  margin: 0;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.05);
}

.nav-section-list-child {
  display: flex;
  gap: 2rem;
}

.nav-section-button:link,
.nav-section-button:visited {
  text-decoration: none;
  color: #343a40;
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

ion-icon {
  font-size: 2.4rem;
  color: black;
}

/* Mobile */
.nav-section-list-child-m li {
  position: relative;
}

.nav-section-button-m {
  color: #343a40;
  padding: 1rem;
  border-radius: 5px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  border: none;
  cursor: pointer;
}

.dropdown-menu {
  padding: 1rem;
  display: grid;
  grid-auto-columns: 1fr;
  justify-items: left;
  align-items: center;
  gap: 0.5rem;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
}

.nav-dropdown-item {
  text-decoration: none;
  color: #343a40;
  padding: 1rem;
  border-radius: 5px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dropdown-menu-enter-from,
.dropdown-menu-leave-to {
  opacity: 0;
}

.dropdown-menu-enter-active {
  transition: opacity 0.4s ease-out;
}

.dropdown-menu-leave-active {
  transition: opacity 0.4s ease-in;
}

.dropdown-menu-enter-to,
.dropdown-menu-leave-from {
  opacity: 1;
}

/* 768px */
@media (max-width: 48em) {
}

/* 640px */
@media (max-width: 40em) {
  .nav-section-list {
    padding: 1rem 1.5rem;
  }

  .nav-section-list-child {
    gap: 0;
  }
}
</style>
