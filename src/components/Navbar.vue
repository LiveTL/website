<template>
  <v-app-bar app color="dark">
    <div id="branding" class="d-flex align-center">
      <v-img alt="logo" class="shrink mr-2" contain src="@/assets/logo.png" width="40"></v-img>
      <v-toolbar-title>LiveTL</v-toolbar-title>
    </div>

    <v-btn to="/home" depressed v-text="$t('nav_home_btn')" />
    <v-btn to="/hyperchat" depressed>HyperChat</v-btn>
    <v-btn to="/news" depressed>News</v-btn>
    <!-- <v-btn to="/translators" depressed v-text="$t('nav_translators_btn')" /> -->
    <v-btn v-if="admin" to="/applications" depressed v-text="$t('nav_applications_btn')" />

    <v-spacer />

    <language-selector />

    <login-manager />
  </v-app-bar>
</template>

<script>
import LanguageSelector from './LanguageSelector';
import LoginManager from './LoginManager';

export default {
  name: 'Navbar',
  components: { LoginManager, LanguageSelector },
  data: () => {
    return {
      admin: false
    };
  },
  created() {
    this.admin = false; // TODO
  }
};
</script>

<style scoped>
div#branding {
  margin-right: 10px;
}
</style>
