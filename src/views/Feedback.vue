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
import { collection, getDocs } from "firebase/firestore";
import { db } from "../main.js";

export default {
  data() {
    return {
      feedback: [],
    };
  },
  mounted() {
    this.fetchFeedback();
  },
  methods: {
    async fetchFeedback() {
      try {
        this.feedback = [];
        const feedbackRef = collection(db, "zh-tw-correcting-library-feedback");

        const feedbackSnapshot = await getDocs(feedbackRef);
        feedbackSnapshot.docs.forEach((doc) => {
          this.feedback.push({ ...doc.data() });
          console.log(this.feedback);
        });
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    },
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

/* 768px */
@media (max-width: 48em) {
  .feedback-list {
    margin: 3rem 1rem;
  }
}
</style>
