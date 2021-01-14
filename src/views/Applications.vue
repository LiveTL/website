<template>
  <v-container>
    <div v-if="!isLoggedIn">
      <h1 v-text="$t('login_warning')" />
    </div>

    <div v-else class="applications">
      <h1 v-text="$t('applications_header')" />
    </div>
  </v-container>
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
