<template>
  <div>
    <base-card>
      <div class="login-section">
        <form @submit.prevent="login">
          <div class="form-control">
            <div class="flex">
              <ion-icon name="mail-outline" class="icon"></ion-icon>
              <label for="email">Email</label>
            </div>
            <input
              type="email"
              id="email"
              v-model="email"
              @keyup="validateEmail"
            />
            <p class="warning" :class="{ 'warning-visibility': !isEmailValid }">
              Invalid Email Format
            </p>
          </div>
          <div class="form-control">
            <div class="flex">
              <ion-icon name="key-outline" class="icon"></ion-icon>
              <label for="password">Password</label>
            </div>
            <input
              type="password"
              id="password"
              v-model="password"
              @keyup="validatePassword"
            />
            <p
              class="warning"
              :class="{ 'warning-visibility': !isPasswordValid }"
            >
              Please enter 6-20 alphanumeric characters
            </p>
          </div>
          <button type="submit">
            <ion-icon name="log-in-outline"></ion-icon>
          </button>
          <p class="warning" :class="{ 'warning-visibility': !isDataValid }">
            Incorrect email or password!
          </p>
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
  metaInfo: {
    title: "Login",
    meta: [
      {
        name: "description",
        content: "The Login section is the place to log in.",
      },
    ],
  },
  data() {
    return {
      email: "",
      password: "",
      isEmailValid: true,
      isPasswordValid: true,
      isDataValid: true,
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
      if (this.isEmailValid && this.isPasswordValid) {
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
          this.$store.commit("LogIn");
          this.$store.commit("setUserEmail", user.email);
          this.$store.commit("showWelcomeOrNot");
          setTimeout(() => {
            this.$store.commit("showWelcomeOrNot");
          }, 3000);
        } catch (error) {
          console.error("Login error:", error.message);
          if (error.message.includes("auth/invalid-login-credentials")) {
            this.isDataValid = false;
            setTimeout(() => {
              this.isDataValid = !this.isDataValid;
            }, 3000);
          }
        }
      }
    },
    validateEmail() {
      const emailRegex =
        /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
      this.isEmailValid = emailRegex.test(this.email);
    },
    validatePassword() {
      const passwordRegex = /^[\d\w]{6,20}$/i;
      this.isPasswordValid = passwordRegex.test(this.password);
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

button:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.flex {
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 0.5rem;
}

.warning {
  color: #fa5252;
  margin: 0.5rem auto;
  padding: 0.2rem;
  font-size: 1.6rem;
  visibility: hidden;
  font-weight: 700;
}

.warning-visibility {
  visibility: visible;
}

ion-icon {
  font-size: 1.4rem;
  color: #212529;
}
</style>
