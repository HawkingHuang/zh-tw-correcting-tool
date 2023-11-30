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
            Simply copy and paste content into the checking area and see if our
            tool has detected any incorrect words.
          </p>
          <p>
            You can click <strong>Custom</strong> and add custom words you like
            to check.
          </p>
          <p>
            Besides, you can go to <strong>Library</strong> to view the words
            within the scope.
          </p>
        </div>
      </div>
    </base-card>
  </div>
</template>

<script>
export default {};
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
  gap: 1.5rem;
  font-size: 2rem;
  margin-top: 2rem;
}
</style>
