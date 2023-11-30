<template>
  <nav>
    <ul class="nav-section-list">
      <div class="nav-section-list-child">
        <li>
          <router-link to="/" class="nav-section-button"
            ><ion-icon name="checkmark-circle-outline"></ion-icon
            >Check</router-link
          >
        </li>
        <!-- <li>
          <router-link to="/" class="nav-section-button">File</router-link>
        </li> -->
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
      </div>
      <div class="nav-section-list-child">
        <li>
          <router-link to="/signup" class="nav-section-button"
            ><ion-icon name="person-add-outline"></ion-icon>Sign Up</router-link
          >
        </li>
        <li>
          <router-link to="/login" class="nav-section-button"
            ><ion-icon name="log-in-outline"></ion-icon>Log In</router-link
          >
        </li>
      </div>
    </ul>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
.nav-section-list {
  width: 100%;
  display: flex;
  list-style: none;
  padding: 2rem 3rem;
  justify-content: space-between;
  font-size: 2rem;
  background-color: #f1f3f5;
  margin: 0;
}

.nav-section-list-child {
  display: flex;
  gap: 4.8rem;
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

.nav-section-button:hover,
.nav-section-button:active {
  color: #3b5bdb;
}

a:active,
a:hover,
a.router-link-active {
  background-color: #dee2e6;
}

ion-icon {
  font-size: 2.4rem;
  color: black;
}
</style>
