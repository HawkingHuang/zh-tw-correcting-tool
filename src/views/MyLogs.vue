<template>
  <div>{{ userId }}</div>
</template>

<script>
export default {
  props: ["userId"],
  created() {
    console.log("Received userId prop:", this.userId);
  },
};
</script>

<style></style>
