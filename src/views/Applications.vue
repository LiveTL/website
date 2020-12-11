<template>
  <div v-if="!isLoggedIn">
    <h1 v-if="!isLoggedIn">You must be logged in to view this page</h1>
  </div>

  <div v-else class="applications">
    <h1>Applications</h1>
  </div>
</template>

<script>
export default {
  name: 'Applications',
  computed: {
    isLoggedIn() {
      return this.$store.getters.getUser !== null;
    }
  }
};
</script>

<style scoped>

</style>
