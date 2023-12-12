<template>
  <div class="add-feedback-section">
    <h2 class="add-feedback-section-title">Let Us Hear Your Voice</h2>
    <form class="form">
      <div>
        <div class="title-section">
          <input
            v-model="formData.title"
            @input="clearWarning"
            class="title"
            type="text"
            name="title"
            placeholder="Enter a title"
            required
          />
        </div>
        <div class="text-section">
          <textarea
            v-model="formData.text"
            @input="clearWarning"
            id="feedback"
            placeholder="Enter your feedback..."
            class="textarea"
            required
          ></textarea>
        </div>
      </div>
      <transition name="warning">
        <p class="warning" v-show="showWarning">
          Title and text area must not be empty!
        </p>
      </transition>
      <button @click.prevent="submitForm" class="btn">
        <ion-icon name="arrow-up-outline"></ion-icon>
      </button>
    </form>
  </div>
</template>

<script>
import { collection, addDoc } from "firebase/firestore";
import { db } from "../main.js";

export default {
  props: ["userId"],
  data() {
    return {
      formData: {
        title: "",
        text: "",
      },
      showWarning: false,
    };
  },
  created() {
    console.log("Received userId prop:", this.userId);
  },
  methods: {
    async submitForm() {
      // const subCollectionName = this.$store.state.userEmail.split("@")[0];
      const colRef = collection(db, "zh-tw-correcting-library-feedback");

      if (this.formData.title !== "" && this.formData.text !== "") {
        try {
          await addDoc(colRef, this.formData);
          console.log("Document added successfully!");
          this.formData.title = "";
          this.formData.text = "";
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
.add-feedback-section-title {
  font-size: 2.4rem;
  color: #40c057;
}

.form {
  margin: 2rem auto;
}

.title-section {
  margin: 2rem auto;
}

.title {
  height: 3rem;
  font-size: 1.8rem;
  padding: 0.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: none;
}

.text-section {
  margin: 2rem auto;
}

textarea {
  width: 90%;
  height: 20rem;
  border: 3px solid #ced4da;
  border-radius: 10px;
  resize: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-size: large;
  padding: 0.5rem;
  overflow: auto;
}

.textarea::-webkit-scrollbar {
  height: 1rem;
}

.textarea::-webkit-scrollbar-thumb {
  background-color: #dee2e6;
  border-radius: 10px;
}

.textarea::-webkit-scrollbar-track {
  background-color: #f1f3f5;
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
</style>
