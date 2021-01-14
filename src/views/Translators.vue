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
            <v-list-item v-for="translator in filterTranslators()" :key="translator.email">
              <v-list-item-avatar>
                <v-avatar color="primary" size="40">
                  <img v-if="translator.picture" :src="translator.picture" alt="pfp">
                  <span v-else v-text="getInitials(translator.name)" />
                </v-avatar>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>
                  <span v-text="translator.name" />
                  <span class="text--disabled pa-2" v-if="userMatches(translator.email)" v-text="$t('reg-tl_you_hint')" />
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-action-text>
                <v-chip v-text="translator.langs.join(', ').toUpperCase()"></v-chip>
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

    <v-snackbar v-model="errorSnackbar" color="error" right outlined>
      {{ $t('reg-tl_error_snackbar') }}
    </v-snackbar>

    <v-snackbar v-model="successSnackbar" color="success" right outlined>
      {{ $t('reg-tl_success_snackbar') }}
    </v-snackbar>
  </div>
</template>

<script>
import { database } from '@/firebase';

export default {
  name: 'Translators',
  computed: {
    isLoggedIn() {
      return this.$store.getters.getUser !== null;
    },
    user() {
      return this.$store.getters.getUser;
    }
  },
  methods: {
    getInitials(name) {
      const names = name.split(' ');
      // TODO make sure this handles edge cases
      return (names[0].substring(0, 1) + names[names.length - 1].substring(0, 1)).toUpperCase();
    },
    userMatches(email) {
      const user = this.user;
      if (user === null) {
        return false;
      }

      return user.email === email;
    },
    userAsTranslator() {
      return this.$store.getters.getUsers.find(user => user.email === this.user.email);
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
        this.errorSnackbar = true;
        return;
      }

      await database.collection('translators').doc(this.user.uid).update({
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
      errorSnackbar: false,
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
          this.$store.commit('addUser', {
            id: change.doc.id,
            ...change.doc.data()
          });
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
