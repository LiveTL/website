<template>
  <div class="home">
    <v-container>
      <h1>LiveTL</h1>

      <p>info about livetl goes here</p>

      <div v-if="getUser !== null">
        <span>Logged in as: {{getUser.email}}</span>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    getUser() {
      return this.$store.getters.getUser;
    }
  }
};
</script>
