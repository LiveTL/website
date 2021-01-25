<template>
  <div class="Apply">
    <v-container>
      <v-row align="center" justify="center">
        <v-col md="8">
          <v-row align="center">
            <v-col sm="4">
              <h1 v-text="$t('reg-tl_header')" />
            </v-col>

            <v-col sm="4">
              <v-text-field v-model="searchText" single-line prepend-inner-icon="mdi-magnify" hide-details outlined
                            clearable :label="$t('reg-tl_search_hint')" />
            </v-col>

            <v-col sm="2">
              <v-select :items="languages" item-text="display" item-value="code" v-model="filterLang" hide-details
                        outlined :label="$t('reg-tl_lang_dropdown')" />
            </v-col>

            <v-col v-if="isLoggedIn && !loading && userAsTranslator() !== undefined" order="10" sm="2"
                   class="text-right">
              <v-btn v-if="userAsTranslator().type === 'user'" color="success" @click="dialog.show = true"
                     height="56px" v-text="$t('reg-tl_register_btn')" />

              <!--<v-btn v-else-if="userAsTranslator().type === 'registered'" to="/apply" color="success" height="56px"-->
              <!--       v-text="$t('reg-tl_verify_btn')" />-->
            </v-col>

            <v-col v-else sm="2" />
          </v-row>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col md="8">
          <v-divider />
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col md="8" v-if="loading">
          <v-progress-linear indeterminate />
        </v-col>

        <v-col md="8" v-else-if="countRegisteredTranslators() !== 0">
          <v-list two-line>
            <v-list-item v-for="translator in filterTranslators()" :key="translator.id">
              <v-list-item-avatar>
                <v-avatar color="primary" size="40">
                  <v-img :src="translator.picture">
                    <template v-slot:placeholder>
                      <v-row class="fill-height" align="center" justify="center">
                        <span v-text="getInitials(translator.name)" />
                      </v-row>
                    </template>
                  </v-img>
                </v-avatar>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>
                  <span v-text="translator.name" />
                  <span class="text--disabled pa-2" v-if="userMatches(translator.id)"
                        v-text="$t('reg-tl_you_hint')" />
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-action-text>
                <v-chip v-text="translator.langs.join(', ').toUpperCase()" />
              </v-list-item-action-text>
            </v-list-item>
          </v-list>
        </v-col>

        <v-col md="8" v-else>
          <h3 class="error--text" v-text="$t('reg-tl_no_tlers')" />
        </v-col>
      </v-row>
    </v-container>

    <v-row justify="end">
      <v-dialog v-model="dialog.show" scrollable max-width="30%">
        <v-card>
          <v-card-title v-text="$t('reg-tl_select_langs')" />
          <v-card-subtitle v-text="$t('reg-tl_select_langs_sub')" />

          <v-divider />

          <v-card-text style="height: 300px">
            <div v-for="language in languages.slice(1)" :key="language.code">
              <v-checkbox v-model="dialog.selectedLanguages" :label="language.display" :value="language.code"
                          hide-details />
            </div>
          </v-card-text>

          <v-divider />

          <v-card-actions>
            <v-spacer />
            <v-btn color="success" text @click="register()" v-text="$t('reg-tl_register_btn')" />
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-snackbar v-model="errorSnackbar.display" color="error" right outlined>
      {{ errorSnackbar.message }}
    </v-snackbar>

    <v-snackbar v-model="successSnackbar" color="success" right outlined>
      {{ $t('reg-tl_success_snackbar') }}
    </v-snackbar>
  </div>
</template>

<script>
import { database, firebase } from '@/firebase';

async function getChannelId(token) {
  const request = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const apiRes = await fetch('https://youtube.googleapis.com/youtube/v3/channels?mine=true', request);
  const json = await apiRes.json();
  if (apiRes.ok === false || json.pageInfo.totalResults === 0) {
    return '';
  } else {
    return json.items[0].id;
  }
}

export default {
  name: 'Translators',
  computed: {
    isLoggedIn() {
      return this.$store.getters.getUser !== null;
    }
  },
  methods: {
    getInitials(name) {
      const names = name.split(' ');
      // TODO make sure this handles edge cases
      return (names[0].substring(0, 1) + names[names.length - 1].substring(0, 1)).toUpperCase();
    },
    getUser() {
      return this.$store.getters.getUser;
    },
    userMatches(id) {
      const user = this.getUser();
      if (user === null) {
        return false;
      }

      return user.uid === id;
    },
    userAsTranslator() {
      return this.$store.getters.getUsers.find(user => user.id === this.getUser().uid);
    },
    countRegisteredTranslators() {
      return this.$store.getters.getUsers.filter(tl => {
        if (tl.type !== 'user') {
          return tl;
        }
      }).length;
    },
    filterTranslators() {
      return this.$store.getters.getUsers.filter(tl => {
        if (
          tl.type !== 'user' &&
          tl.name.toLowerCase().includes(this.searchText) &&
          (tl.langs.includes(this.filterLang) || this.filterLang === 'all')
        ) {
          return tl;
        }
      });
    },
    async register() {
      if (this.dialog.selectedLanguages.length < 1) {
        this.errorSnackbar.message = this.$t('reg-tl_no_lang_error');
        this.errorSnackbar.display = true;
        return;
      }

      // reauth so we can get token
      const user = this.$store.getters.getUser;
      const authProvider = new firebase.auth.GoogleAuthProvider();
      authProvider.addScope('https://www.googleapis.com/auth/youtube.readonly');

      const authRes = await user.reauthenticateWithPopup(authProvider).catch(() => {
        this.errorSnackbar.message = this.$t('reg-tl_wrong_acc_error');
        this.errorSnackbar.display = true;
      });

      if (authRes === undefined) {
        this.errorSnackbar.message = this.$t('reg-tl_must_signin_error');
        this.errorSnackbar.display = true;
      }

      const channelId = await getChannelId(authRes.credential.accessToken);
      if (channelId === null) {
        await this.$router.push('/sign-in-error');
        return;
      }

      await database.collection('translators').doc(this.getUser().uid).update({
        channel: channelId,
        langs: this.dialog.selectedLanguages,
        type: 'registered'
      });

      this.errorSnackbar = false;
      this.successSnackbar = true;
      this.dialog.show = false;
    }
  },
  data: () => {
    return {
      loading: true,
      translator: null,
      searchText: '',
      filterLang: 'all',
      dialog: {
        show: false,
        selectedLanguages: []
      },
      errorSnackbar: {
        display: false,
        message: 'Error'
      },
      successSnackbar: false,
      languages: [
        {
          code: 'all',
          display: 'All Languages' // TODO use TL string
        },
        {
          code: 'en',
          display: 'English'
        },
        {
          code: 'jp',
          display: 'Japanese (日本語)'
        },
        {
          code: 'es',
          display: 'Spanish (Español)'
        },
        {
          code: 'id',
          display: 'Indonesian (bahasa Indonesia)'
        },
        {
          code: 'kr',
          display: 'Korean (한국)'
        },
        {
          code: 'cn',
          display: 'Chinese (中文)'
        },
        {
          code: 'ru',
          display: 'Russian (русский)'
        }
      ]
    };
  },
  created() {
    database.collection('translators').onSnapshot(res => {
      this.loading = true;

      for (const change of res.docChanges()) {
        if (change.type === 'added') {
          const payload = {
            id: change.doc.id,
            ...change.doc.data()
          };

          if (this.isLoggedIn && change.doc.id === this.$store.getters.getUser.uid) {
            database.collection(`translators/${change.doc.id}/private`).doc('personal').get().then(dbRes => {
              payload.email = dbRes.data().email;
              this.$store.commit('addUser', payload);
            });
          } else {
            this.$store.commit('addUser', payload);
          }
        } else if (change.type === 'modified') {
          this.$store.commit('updateUser', {
            id: change.doc.id,
            ...change.doc.data()
          });
        } else if (change.type === 'removed') {
          this.$store.commit('removeUser', change.doc.id);
        }
      }

      this.loading = false;
    });
  }
};
</script>
