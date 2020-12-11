<template>
  <v-app-bar app color="dark">
    <div class="d-flex align-center">
      <v-img alt="logo" class="shrink mr-2" contain src="@/assets/logo.png" width="40"></v-img>
      <v-toolbar-title>LiveTL</v-toolbar-title>
    </div>

    <v-btn to="/" depressed>Home</v-btn>
    <v-btn to="/translators" depressed>Registered Translators</v-btn>
    <v-btn v-if="isLoggedIn" to="/applications" depressed>Verified Translator Applications</v-btn>

    <v-spacer/>

    <div v-if="isLoggedIn">
      <v-btn outlined color="error" @click="logout">
        <span>Logout</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </div>

    <div v-else>
      <v-btn outlined color="success" @click="login">
        <span>Login</span>
        <v-icon right>mdi-account</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import { auth, firebase } from '@/firebase';

const authProvider = new firebase.auth.GoogleAuthProvider();
authProvider.addScope('https://www.googleapis.com/auth/youtube.readonly');

export default {
  name: 'Navbar',
  computed: {
    isLoggedIn() {
      return this.$store.getters.getUser !== null;
    }
  },
  methods: {
    login: () => auth.signInWithPopup(authProvider).catch(error => console.log(error)),
    logout: () => auth.signOut().catch(error => console.log(error))
  }
};
</script>

<style scoped>

</style>
