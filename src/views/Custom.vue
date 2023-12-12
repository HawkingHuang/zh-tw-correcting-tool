<template>
  <div>
    <base-card>
      <div class="custom-section">
        <h2 class="custom-section-title">Add Your Own Words</h2>
        <form>
          <div class="custom-flex">
            <div class="custom-flex-child">
              <!-- <label for="correct">Correct</label> -->
              <input
                v-model="formData.correct"
                @input="clearWarning"
                type="text"
                name="correct"
                placeholder="Enter a CORRECT word"
                required
              />
            </div>
            <div class="custom-flex-child">
              <!-- <label for="incorrect">Incorrect</label> -->
              <input
                v-model="formData.incorrect"
                @input="clearWarning"
                type="text"
                name="incorrect"
                placeholder="Enter a INCORRECT word"
                required
              />
            </div>
          </div>
          <transition name="warning">
            <p class="warning" v-show="showWarning">
              Both fields must not be empty!
            </p>
          </transition>
          <button @click.prevent="submitForm" class="btn">
            <ion-icon name="add-outline"></ion-icon>
          </button>
        </form>
      </div>
    </base-card>
  </div>
</template>

<script>
import { collection, addDoc } from "firebase/firestore";
import { db } from "../main.js";

export default {
  data() {
    return {
      formData: {
        correct: "",
        incorrect: "",
      },
      showWarning: false,
    };
  },
  methods: {
    async submitForm() {
      // For adding central database
      // const subCollectionName = "bopomofo-31";

      // const colRef = collection(
      //   db,
      //   "zh-tw-correcting-library-categorized",
      //   subCollectionName,
      //   "bopomofo"
      // );

      // try {
      //   await addDoc(colRef, this.formData);
      //   console.log("Document added successfully!");
      //   this.formData.correct = "";
      //   this.formData.incorrect = "";
      // } catch (error) {
      //   console.error("Error adding document: ", error);
      // }
      // For adding indivisual database
      const subCollectionName = this.$store.state.userEmail.split("@")[0];

      const colRef = collection(
        db,
        "zh-tw-correcting-library-users",
        subCollectionName,
        "users-custom-words"
      );

      if (this.formData.correct !== "" && this.formData.incorrect !== "") {
        try {
          await addDoc(colRef, this.formData);
          console.log("Document added successfully!");
          this.formData.correct = "";
          this.formData.incorrect = "";
        } catch (error) {
          console.error("Error adding document: ", error);
        }
      } else {
        this.showWarning = true;
      }
    },
    clearWarning() {
      this.showWarning = false;
    },
  },
};
</script>

<style scoped>
.custom-section {
  padding: 2rem;
}

.custom-section-title {
  font-size: 3rem;
}

form {
  margin: 3rem auto;
}

.custom-flex {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.custom-flex-child {
  display: flex;
  gap: 1rem;
}

form {
  font-size: 3rem;
}

input {
  height: 3rem;
  font-size: 1.8rem;
  padding: 0.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: none;
}

.btn {
  padding: 0.2rem;
  margin: 4rem auto;
  width: 6rem;
  height: 2.4rem;
  background-color: #fff;
  border-radius: 15px;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

ion-icon {
  font-size: 1.8rem;
  color: black;
}

.warning {
  width: 40rem;
  color: #f59f00;
  margin: 1rem auto;
  padding: 1rem;
  font-size: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: none;
  border-radius: 5px;
}

.warning-enter-from,
.warning-leave-to {
  opacity: 0;
}

.warning-enter-active {
  transition: opacity 0.3s ease-out;
}

.warning-leave-active {
  transition: opacity 0.3s ease-in;
}

.warning-enter-to,
.warning-leave-from {
  opacity: 1;
}

/* 640px */
@media (max-width: 40em) {
  .warning {
    width: 20rem;
  }
}

/* 768px */
@media (max-width: 48em) {
  .custom-flex {
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
  }
}
</style>
