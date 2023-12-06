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
                type="text"
                name="incorrect"
                placeholder="Enter a INCORRECT word"
                required
              />
            </div>
          </div>
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
    };
  },
  methods: {
    async submitForm() {
      // For adding central database
      const subCollectionName = "bopomofo-31";

      const colRef = collection(
        db,
        "zh-tw-correcting-library-categorized",
        subCollectionName,
        "bopomofo"
      );

      try {
        await addDoc(colRef, this.formData);
        console.log("Document added successfully!");
        this.formData.correct = "";
        this.formData.incorrect = "";
      } catch (error) {
        console.error("Error adding document: ", error);
      }
      // For adding indivisual database
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
  width: 6rem;
  height: 2.4rem;
  padding: 0.2rem;
  margin: 4rem auto;
  font-size: medium;
  background-color: #fff;
  border-radius: 15px;
  cursor: pointer;
}

ion-icon {
  font-size: 1.8rem;
  color: black;
}
</style>
