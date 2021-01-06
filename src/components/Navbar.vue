<template>
  <v-app-bar app color="dark">
    <div class="d-flex align-center">
      <v-img alt="logo" class="shrink mr-2" contain src="@/assets/logo.png" width="40"></v-img>
      <v-toolbar-title>LiveTL</v-toolbar-title>
    </div>

    <v-btn to="/" depressed>Home</v-btn>
    <v-btn to="/translators" depressed>Registered Translators</v-btn>
    <v-btn v-if="admin" to="/applications" depressed>Verified Translator Applications</v-btn>

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
import { auth, database, firebase } from '@/firebase';

const authProvider = new firebase.auth.GoogleAuthProvider();
authProvider.addScope('https://www.googleapis.com/auth/youtube.readonly');

export default {
  name: 'Navbar',
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
  methods: {
    login() {
      auth.signInWithPopup(authProvider).then(async authRes => {
        const request = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authRes.credential.accessToken}`
          }
        };

        const apiRes = await fetch('https://youtube.googleapis.com/youtube/v3/channels?mine=true', request);
        const json = await apiRes.json();
        if (apiRes.ok === false || json.pageInfo.totalResults === 0) {
          await this.$router.push('sign-in-error');
          return;
        }

        const userDocRef = database.collection('translators').doc(authRes.user.uid);
        if ((await userDocRef.get()).exists === false) {
          await userDocRef.set({
            email: authRes.user.email,
            name: authRes.user.displayName,
            channel: json.items[0].id,
            picture: authRes.user.photoURL,
            type: 'user'
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
