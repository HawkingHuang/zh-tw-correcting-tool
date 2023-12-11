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
            <!-- <p class="hint">Invalid Email</p> -->
          </div>
          <div class="form-control">
            <div class="flex">
              <ion-icon name="key-outline" class="icon"></ion-icon>
              <label for="password">Password</label>
            </div>
            <input type="password" id="password" v-model="password" />
            <!-- <p class="hint">Invalid Password</p> -->
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
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
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
      } else {
        this.$store.commit("logOut");
      }
    });
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
        // this.$store.commit("LogIn");
        // this.$store.commit("setUserEmail", user.email);
        // this.$store.commit("showWelcomeOrNot");
        // setTimeout(() => {
        //   this.$store.commit("showWelcomeOrNot");
        // }, 3000);
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
  margin: 2.4rem 0;
}

label {
  font-weight: bold;
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
  display: block;
}

input {
  height: 3rem;
  font-size: 1.8rem;
  padding: 0.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: none;
  border-radius: 5px;
}

input:focus {
  border-color: #3d008d;
  background-color: #f1f3f5;
  outline: none;
}

button {
  width: 6rem;
  height: 2.4rem;
  background-color: #fff;
  border-radius: 15px;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
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

.hint {
  color: orange;
  font-size: 1.2rem;
  margin: 0.5rem;
}
</style>
