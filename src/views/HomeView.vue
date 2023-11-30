<template>
  <div>
    <base-card>
      <section class="text-input-section">
        <div class="original field">
          <label for="original-text" class="original-title">Original</label>
          <textarea
            id="original-text"
            placeholder="Enter Traditional Chinese text"
            v-model="userInput"
          ></textarea>
        </div>
        <div class="result field">
          <label for="result-text" class="result-title">Corrected</label>
          <div id="result-text" class="result-text"></div>
        </div>
      </section>
      <section class="button-section">
        <button class="btn" @click="check">
          <ion-icon name="checkmark-outline"></ion-icon>
        </button>
        <button class="btn" @click="reset">
          <ion-icon name="refresh-outline"></ion-icon>
        </button>
      </section>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInput: "",
    };
  },
  computed: {
    words() {
      return this.$store.getters.words;
    },
  },
  methods: {
    check() {
      let correctedText = this.userInput;
      this.words.forEach((word) => {
        const regex = new RegExp(word.incorrect, "gi");
        correctedText = correctedText.replace(
          regex,
          `<span style="color: red; display: inline-block;">${word.correct}</span>`
        );
      });

      const resultContainer = document.getElementById("result-text");
      resultContainer.innerHTML = correctedText;
    },
    reset() {
      // console.log(this.words);
      this.userInput = "";
      const resultContainer = document.getElementById("result-text");
      resultContainer.innerHTML = "";
    },
  },
};
</script>

<style scoped>
.text-input-section {
  max-width: 185rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
  margin: 1.5rem auto;
}

.field {
  width: 100%;
}

.original,
.result {
  padding: 1rem 2rem;
  width: 100%;
  text-align: center;
}

.original-title,
.result-title {
  font-weight: 700;
}

label {
  display: block;
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

textarea,
.result-text {
  width: 90%;
  height: 50rem;
  border: 3px solid #ced4da;
  border-radius: 10px;
  resize: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-size: large;
  padding: 0.5rem;
}

.result-text {
  text-align: left;
  margin: auto;
}

.button-section {
  display: grid;
  grid-template-columns: 1fr;
  max-width: 6rem;
  margin: 2rem auto;
  row-gap: 1.6rem;
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
