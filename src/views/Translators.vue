<template>
  <div class="Apply">
    <v-container>
      <div v-if="loading">
        <v-progress-linear indeterminate/>
      </div>

      <v-row align="center" justify="center" v-else>
        <v-col md="8">
          <v-row align="center">
            <v-col sm="4">
              <h1>Registered Translators</h1>
            </v-col>

            <v-col v-if="isLoggedIn" order="10" sm="2" class="text-right">
              <v-btn v-if="getUserAsTranslator(user.email).type === 'registered'" to="/apply" color="success"
                     height="56px">Apply
              </v-btn>
              <v-btn v-else-if="getUserAsTranslator(user.email).type !== 'verified'" color="success" height="56px">
                Register
              </v-btn>
            </v-col>

            <v-col v-else sm="2"/>

            <v-col sm="4">
              <v-text-field single-line prepend-inner-icon="mdi-magnify" hide-details outlined/>
            </v-col>

            <v-col sm="2">
              <v-select :items="languages" item-text="display" item-value="code" label="Language" hide-details
                        outlined/>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col md="8">
          <v-divider/>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col md="8">
          <v-list two-line>
            <v-list-item v-for="translator in translators" :key="translator.email">
              <v-list-item-avatar>
                <v-avatar color="primary" size="40">
                  <span v-text="getInitials(translator.name)"/>
                </v-avatar>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>
                  <span v-text="translator.name"/>
                  <span class="text--disabled pa-2" v-if="userMatches(translator.email)">(you)</span>
                </v-list-item-title>
                <v-list-item-subtitle v-text="translator.email"/>
              </v-list-item-content>

              <v-list-item-action-text>
                <v-chip v-text="translator.langs.join(', ').toUpperCase()"></v-chip>

              </v-list-item-action-text>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
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
    translators() {
      return this.$store.getters.getTranslators;
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
      return this.$store.getters.getUser.email === email;
    },
    getUserAsTranslator(email) {
      return this.$store.getters.getTranslators.find(trans => trans.email === email);
    }
  },
  data: () => {
    return {
      loading: true,
      translator: null,
      languages: [
        {
          code: 'all',
          display: 'All Languages'
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
        }
      ]
    };
  },
  created() {
    database.collection('translators').onSnapshot(res => {
      this.loading = true;

      for (const change of res.docChanges()) {
        console.log('something changed');

        if (change.type === 'added') {
          this.$store.commit('addTranslator', {
            id: change.doc.id,
            ...change.doc.data()
          });
        } else if (change.type === 'modified') {
          this.$store.commit('updateTranslator', {
            id: change.doc.id,
            ...change.doc.data()
          });
        } else if (change.type === 'removed') {
          this.$store.commit('removeTranslator', change.doc.id);
        }
      }

      this.loading = false;
    });
  }
};
</script>

<style scoped>

</style>
