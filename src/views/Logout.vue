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
import { getAuth, signOut } from "firebase/auth";

export default {
  methods: {
    async logOut() {
      const auth = getAuth();
      try {
        await signOut(auth);
        console.log("The user signed out");
        this.$router.push("/");
        this.$store.commit("LogInOut");
        this.$store.commit("setUserEmail", "");
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
  font-size: medium;
  background-color: #fff;
  color: #f8f9fa;
  border-radius: 15px;
  cursor: pointer;
}

ion-icon {
  font-size: 1.8rem;
  color: black;
}
</style>
