<template>
  <div v-if="isLoggedIn">
    <v-btn outlined color="error" @click="logout" :style="mobileButtonPadding">
      <span v-text="$t('nav_logout_btn')" />
      <v-icon right>mdi-exit-to-app</v-icon>
    </v-btn>
  </div>

  <div v-else>
    <v-btn outlined color="success" @click="login" :style="mobileButtonPadding">
      <span v-text="$t('nav_login_btn')"></span>
      <v-icon right>mdi-account</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { auth, database, firebase } from '@/firebase';

const authProvider = new firebase.auth.GoogleAuthProvider();

export default {
  name: 'LoginManager',
  computed: {
    isLoggedIn() {
      return this.$store.getters.getUser !== null;
    },
    mobileButtonPadding() {
      const paddingSize = 16 - (8 * this.$vuetify.breakpoint.xs);
      return `padding-left: ${paddingSize}px; padding-right: ${paddingSize}px`;
    }
  },
  methods: {
    login() {
      auth.signInWithPopup(authProvider).then(async authRes => {
        const userDocRef = database.collection('translators').doc(authRes.user.uid);
        if ((await userDocRef.get()).exists === false) {
          await userDocRef.set({
            name: authRes.user.displayName,
            picture: authRes.user.photoURL,
            type: 'user'
          });

          await userDocRef.collection('private').doc('personal').set({
            email: authRes.user.email
          });
        } else {
          // update any information that can change
          await userDocRef.update({
            name: authRes.user.displayName,
            picture: authRes.user.photoURL
          });
        }
      }).catch(error => console.error(error));
    },
    logout: () => auth.signOut().catch(error => console.error(error))
  }
};
</script>
