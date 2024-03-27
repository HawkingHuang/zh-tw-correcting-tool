<template>
  <div>
    <base-card>
      <div class="signup-section">
        <form @submit.prevent="register">
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
            <p
              class="warning"
              :class="{ 'warning-visibility': isEmailValid === false }"
            >
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
              :class="{ 'warning-visibility': isPasswordValid === false }"
            >
              Please enter 6-20 alphanumeric characters
            </p>
          </div>
          <button type="submit" @click="validateData">
            <ion-icon name="person-add-outline"></ion-icon>
          </button>
          <p class="warning" :class="{ 'warning-visibility': !isDataValid }">
            Please fill up both fields in correct format
          </p>
        </form>
      </div>
    </base-card>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { db } from "../main.js";
import { doc, addDoc, setDoc, collection } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    let email = ref("");
    let password = ref("");
    let isEmailValid = ref(true);
    let isPasswordValid = ref(true);
    let isDataValid = ref(true);

    async function register() {
      if (isEmailValid.value && isPasswordValid.value) {
        const auth = getAuth();

        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email.value,
            password.value
          );
          const user = userCredential.user;
          console.log("User registered:", user);
          router.push("/");
          const userDocRef = doc(
            db,
            "zh-tw-correcting-library-users",
            user.email.split("@")[0]
          );
          await setDoc(userDocRef, {});

          // First sub
          const collection1Ref = collection(userDocRef, "personal-information");
          await addDoc(collection1Ref, {
            email: user.email,
          });
          // Second sub
          const collection2Ref = collection(userDocRef, "users-custom-words");
          await addDoc(collection2Ref);
        } catch (error) {
          console.error("Registration error:", error.message);
        }
      } else {
        isDataValid.value = false;
        setTimeout(() => {
          isDataValid.value = !isDataValid.value;
        }, 3000);
      }
    }

    function validateEmail() {
      const emailRegex =
        /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
      isEmailValid.value = emailRegex.test(email.value);
    }

    function validatePassword() {
      const passwordRegex = /^[\d\w]{6,20}$/i;
      isPasswordValid.value = passwordRegex.test(password.value);
    }

    return {
      email,
      password,
      isEmailValid,
      isPasswordValid,
      isDataValid,
      register,
      validateEmail,
      validatePassword,
    };
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
