<template>
  <div>
    <base-card>
      <div class="logout-section">
        <h2 class="logout-section-title">Sure you want to log out?</h2>
        <div class="yesNo-section">
          <button @click="logOut" class="btn">
            <ion-icon name="log-out-outline"></ion-icon>
          </button>
          <button @click="stay" class="btn">
            <ion-icon name="close-outline"></ion-icon>
          </button>
        </div>
      </div>
    </base-card>
  </div>
</template>

<script>
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

export default {
  metaInfo: {
    title: "Logout",
    meta: [
      {
        name: "description",
        content: "The Login section is the place to log out.",
      },
    ],
  },
  mounted() {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (!user) {
        this.$store.commit("logOut");
        this.$store.commit("setUserEmail", "");
      } else {
        console.log("Failed to log out");
      }
    });
  },
  methods: {
    async logOut() {
      const auth = getAuth();
      try {
        await signOut(auth);
        console.log("The user signed out");
        this.$router.push("/");
        this.$store.commit("logOut");
        this.$store.commit("clearCustomWords");
      } catch (error) {
        console.error(error.message);
      }
    },
    stay() {
      this.$router.push("/");
    },
  },
};
</script>

<style>
.logout-section {
  padding: 2rem;
}

.logout-section-title {
  font-size: 3rem;
}

.yesNo-section {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 2rem;
}

.btn {
  width: 6rem;
  height: 2.4rem;
  background-color: #fff;
  border-radius: 15px;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.btn:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
}

ion-icon {
  font-size: 1.8rem;
  color: #212529;
}
</style>
