<template>
  <v-app-bar app color="dark">
    <router-link to="/home" tag="button" id="branding" class="d-flex align-center">
      <v-img alt="logo" class="shrink mr-2" contain src="@/assets/logo.png" width="40"></v-img>
      <v-toolbar-title>LiveTL</v-toolbar-title>
    </router-link>
    <div v-if="!mobile">
      <v-btn to="/home" depressed v-text="$t('nav_home_btn')" />
      <v-btn to="/hyperchat" depressed>HyperChat</v-btn>
      <v-btn to="/news" depressed>News</v-btn>
      <!-- <v-btn to="/translators" depressed v-text="$t('nav_translators_btn')" /> -->
      <v-btn v-if="admin" to="/applications" depressed v-text="$t('nav_applications_btn')" />
    </div>

    <v-spacer />

    <route-selector v-if="mobile" />
    <language-selector />

    <login-manager />
  </v-app-bar>
</template>

<script>
import { database } from '@/firebase';
import LanguageSelector from './LanguageSelector';
import RouteSelector from './RouteSelector';
import LoginManager from './LoginManager';

export default {
  name: 'Navbar',
  components: { LoginManager, LanguageSelector, RouteSelector },
  data: () => {
    return {
      admin: false
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.getUser !== null;
    },
    mobile() {
      return this.$vuetify.breakpoint.sm | this.$vuetify.breakpoint.xs;
    }
  },
  created() {
    if (this.isLoggedIn === false) {
      this.admin = false;
      return;
    }
    database.collection('admins').where('email', '==', this.$store.getters.getUser.email).get().then(res => {
      this.admin = res.empty === false;
    });
  }
};
</script>

<style scoped>
div#branding {
  margin-right: 10px;
}
</style>
