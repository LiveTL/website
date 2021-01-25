<template>
  <v-menu>
    <template v-slot:activator="{on, attrs}">
      <v-btn id="locale_btn" text v-bind="attrs" v-on="on">
        <v-icon>mdi-translate</v-icon>
        <v-icon class="dropdown-arrow">mdi-chevron-down</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item v-for="(locale, i) in languages" :key="i">
        <v-btn @click="updateLocale(locale.code)" v-text="locale.display" block text />
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { availableLanguages, i18n, loadLanguageAsync } from '@/plugins/i18n';

export default {
  name: 'LanguageSelector',
  data: () => {
    return {
      languages: availableLanguages
    };
  },
  methods: {
    updateLocale(code) {
      if (i18n.locale === code) {
        return;
      }

      const language = this.languages[this.languages.findIndex(loc => loc.code === code)];
      this.$router.push({
        params: { lang: language.code },
        name: this.$route.name
      });

      loadLanguageAsync(code);
    }
  }
};
</script>

<style scoped>
button#locale_btn {
  margin-right: 8px;
}

.dropdown-arrow {
  width: 12px;
  height: 12px;
  margin-left: 4px;
}
</style>
