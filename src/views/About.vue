<template>
  <div>
    <base-card>
      <div class="about-section">
        <h2 class="about-section-title">About This Tool</h2>
        <div class="about-section-para">
          <p>
            The <strong>Traditional Chinese Checker</strong> is a tool built for
            professional translators, editors, writers, researchers, students,
            and so on.
          </p>
          <p>
            Simply copy and paste content into the <strong>Check</strong> area
            and see if our tool has detected any incorrect words.
          </p>
          <img src="/img/2023-12-13_153729.png" alt="" class="img" />
          <img src="/img/2023-12-13_154001.png" alt="" class="img" />
          <p>
            You can click <strong>Custom</strong> and add custom words you like
            to check.
          </p>
          <img src="/img/2023-12-13_154653.png" alt="" class="img" />
          <p>
            Besides, you can go to <strong>Library</strong> to view the words
            within the scope.
          </p>
          <img src="/img/2023-12-13_155052.png" alt="" class="img" />
          <p>
            You can search for any words you like to see whether they're in the
            collection or not.
          </p>
          <img src="/img/2023-12-13_160402.png" alt="" class="img" />
          <p>
            Also, you can click <strong>Feedback</strong> to see what other
            users have to say.
          </p>
          <img src="/img/2023-12-13_155243.png" alt="" class="img" />
          <p>
            If you want to leave a comment, please log in, click your personal
            page, and then click <strong>+ Feedback</strong> to add one.
          </p>
          <img src="/img/2023-12-13_155440.png" alt="" class="img" />
          <p>
            You can click <strong>My Words</strong> to check the words you added
            before.
          </p>
          <img src="/img/2023-12-13_162420.png" alt="" class="img" />
          <p>
            Hover and click words of your choice, and you can delete them as you
            wish.
          </p>
          <img src="/img/2023-12-13_193417.png" alt="" class="img" />
          <p>Enjoy your ride!</p>
        </div>
      </div>
    </base-card>
  </div>
</template>

<script>
export default {
  metaInfo: {
    meta: [
      {
        name: "about",
        content: "The About section describes how the tool works.",
      },
    ],
  },
};
</script>

<style scoped>
.about-section {
  padding: 2rem;
}

.about-section-title {
  font-size: 3rem;
}

.about-section-para {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  font-size: 2rem;
  margin-top: 2rem;
  padding: 1rem;
  overflow-y: auto;
  max-height: 60vh;
}

.about-section-para p {
  font-weight: 500;
}

strong {
  font-weight: 800;
}

.img {
  width: 40%;
  margin: 2rem auto;
  border: 4px solid #adb5bd;
  border-radius: 12px;
}

.about-section-para::-webkit-scrollbar {
  height: 1rem;
}

.about-section-para::-webkit-scrollbar-thumb {
  background-color: #dee2e6;
  border-radius: 10px;
}

.about-section-para::-webkit-scrollbar-track {
  background-color: #f1f3f5;
}

/* 1600px */
@media (max-width: 100em) {
  .img {
    width: 60%;
  }
}

/* 1360px */
@media (max-width: 85em) {
  .img {
    width: 75%;
  }
}

/* 1024px */
@media (max-width: 64em) {
  .img {
    width: 95%;
  }
}
</style>
