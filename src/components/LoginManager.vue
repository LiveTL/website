<template>
  <v-progress-circular id="auth-loading" v-if="this.$auth.isLoading" indeterminate color="blue" />
  <div id="auth" v-else>
    <div v-if="this.$auth.user">
      <v-btn outlined color="error" @click="logout">
        <span v-text="$t('nav_logout_btn')" />
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </div>

    <div v-else>
      <v-btn outlined color="success" @click="login">
        <span v-text="$t('nav_login_btn')"></span>
        <v-icon right>mdi-account</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginManager',
  methods: {
    async login() {
      await this.$auth.loginWithRedirect();
    },
    async logout() {
      await this.$auth.logout();
    }
  }
};
</script>
