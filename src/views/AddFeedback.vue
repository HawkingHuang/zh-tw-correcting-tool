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
      <p
        class="warning"
        :class="{
          'warning-visibility': showWarning,
        }"
      >
        Title and text area must not be empty!
      </p>
      <button @click.prevent="submitForm" class="btn">
        <ion-icon name="arrow-up-outline"></ion-icon>
      </button>
      <p class="success" :class="{ 'success-visibility': showSuccess }">
        Feedback added successfully!
      </p>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../main.js";

export default {
  props: ["userId"],
  setup() {
    let formData = ref({ title: "", text: "" });
    let showWarning = ref(false);
    let showSuccess = ref(false);

    async function submitForm() {
      const colRef = collection(db, "zh-tw-correcting-library-feedback");

      if (formData.value.title !== "" && formData.value.text !== "") {
        try {
          await addDoc(colRef, formData.value);
          console.log("Document added successfully!");
          formData.value.title = "";
          formData.value.text = "";
          showSuccess.value = true;
          setTimeout(() => {
            showSuccess.value = false;
          }, 5000);
        } catch (error) {
          console.error("Error adding document: ", error);
        }
      } else {
        showWarning.value = true;
      }
    }

    function clearWarning() {
      showWarning.value = false;
    }

    return { formData, showWarning, showSuccess, submitForm, clearWarning };
  },
};
</script>

<style scoped>
.add-feedback-section-title {
  font-size: 2.4rem;
  color: #40c057;
}

.form,
.title-section,
.text-section {
  margin: 2rem auto;
}

.title {
  height: 3rem;
  font-size: 1.8rem;
  padding: 0.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: none;
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

ion-icon {
  font-size: 1.8rem;
  color: #212529;
}

.warning,
.success {
  margin: 1rem auto;
  padding: 0.2rem;
  font-size: 1.6rem;
  visibility: hidden;
  font-weight: 700;
}

.warning {
  color: #fa5252;
}

.success {
  color: #40c057;
}

.warning-visibility,
.success-visibility {
  visibility: visible;
}
</style>
