<template>
  <v-footer padless>
    <v-row justify="center" no-gutters>
      <div v-for="link in getButtons()" :key="link.text">
        <v-btn text :to="link.link">
          {{ link.text }}
          <v-icon right v-text="link.icon"></v-icon>
        </v-btn>
      </div>

      <v-col cols="12" class="text-center">
        &copy; 2020 - {{ new Date().getFullYear() }} <a href="https://github.com/orgs/LiveTL/people"
                                                                  target="_blank">LiveTL Developers</a>
        | <a href="https://github.com/LiveTL"
        target="_blank">View on GitHub</a>
        | <a href="https://opencollective.com/livetl" target="_blank">Support the Developers :)</a>
        | <a href="/discord" target="_blank">Join the LiveTL Discord Server</a>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  methods: {
    getButtons() {
      return [
        {
          text: this.$t('footer_faq_btn'),
          link: '/faq',
          icon: 'mdi-help-circle'
        },
        {
          text: this.$t('footer_contact_btn'),
          link: '/contact',
          icon: 'mdi-email'
        },
        {
          text: this.$t('footer_privacy_btn'),
          link: '/privacy',
          icon: 'mdi-shield-lock'
        }
      ];
    }
  }
};
</script>
