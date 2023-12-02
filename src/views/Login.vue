<template>
  <div>
    <base-card>
      <div class="signup-section">
        <form @submit.prevent="login">
          <div class="form-control">
            <div class="flex">
              <ion-icon name="mail-outline" class="icon"></ion-icon>
              <label for="email">Email</label>
            </div>
            <input type="email" id="email" v-model="email" />
          </div>
          <div class="form-control">
            <div class="flex">
              <ion-icon name="key-outline" class="icon"></ion-icon>
              <label for="password">Password</label>
            </div>
            <input type="password" id="password" v-model="password" />
          </div>
          <button type="submit">
            <ion-icon name="log-in-outline"></ion-icon>
          </button>
        </form>
      </div>
    </base-card>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      const auth = getAuth();

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        const user = userCredential.user;
        console.log("User logged in:", user);
        this.$router.push("/");
        this.$store.commit("LogInOut");
      } catch (error) {
        console.error("Registration error:", error.message);
      }
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 1rem 0;
}

label {
  font-weight: bold;
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
  display: block;
}

input {
  width: 25rem;
  height: 3rem;
  font-size: 2.4rem;
  border: 1px solid #ccc;
  padding: 0.3rem;
  border-radius: 5px;
}

input:focus {
  border-color: #3d008d;
  background-color: #f1f3f5;
  outline: none;
}

button {
  width: 6rem;
  padding: 0.2rem;
  margin: 2rem auto;
  font-size: medium;
  background-color: #fff;
  border-radius: 15px;
  cursor: pointer;
}

.flex {
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 0.5rem;
}

ion-icon {
  font-size: 1.4rem;
  color: black;
}
</style>