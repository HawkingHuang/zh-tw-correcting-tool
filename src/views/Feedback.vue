<template>
  <div>
    <base-card>
      <div class="feedback-section">
        <h2 class="feedback-section-title">Feedback from Users</h2>
        <div>
          <ul class="feedback-grid">
            <li
              v-for="(feed, index) in feedback"
              :key="index"
              class="feedback-list"
            >
              <div class="feedback">
                <h3>{{ feed.title }}</h3>
                <p>{{ feed.text }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </base-card>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../main.js";

export default {
  setup() {
    let feedback = ref([]);

    async function fetchFeedback() {
      try {
        feedback.value = [];
        const feedbackRef = collection(db, "zh-tw-correcting-library-feedback");

        const feedbackSnapshot = await getDocs(feedbackRef);
        feedbackSnapshot.docs.forEach((doc) => {
          feedback.value.push({ ...doc.data() });
        });
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    }

    onMounted(() => fetchFeedback());

    return { feedback, fetchFeedback };
  },
};
</script>

<style scoped>
.feedback-section {
  padding: 2rem;
}

.feedback-section-title {
  font-size: 3rem;
}

.feedback-list {
  list-style: none;
  margin: 4rem;
  padding: 1rem;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.feedback-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.feedback {
  height: auto;
  margin: 2rem 0;
}

.feedback h3 {
  font-size: 2.4rem;
  text-align: left;
  margin-bottom: 0.5rem;
  text-align: center;
}

.feedback p {
  max-width: 160rem;
  font-size: 2rem;
  text-align: center;
}

/* 1360px */
@media (max-width: 85em) {
  .feedback-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* 1024px */
@media (max-width: 64em) {
  .feedback-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 768px */
@media (max-width: 48em) {
  .feedback-list {
    margin: 3rem 1rem;
  }
}

/* 640px */
@media (max-width: 40em) {
  .feedback-grid {
    grid-template-columns: 1fr;
  }
}
</style>
