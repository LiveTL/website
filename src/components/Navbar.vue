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
  </v-app-bar>
</template>

<script>
import { database } from '@/firebase';
import LanguageSelector from './LanguageSelector';

export default {
  name: 'Navbar',
  components: { LanguageSelector },
  data: () => {
    return {
      admin: false
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.getUser !== null;
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
