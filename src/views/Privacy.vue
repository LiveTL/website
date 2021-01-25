<template>
  <div class="privacy">
    <v-container>
      <h1>LiveTL Privacy Policy</h1>

      <v-col md="8">
        <div v-for="(text, header) in getPrivacy()" :key="header">
          <h3 v-text="header" />
          <p v-html="text" />
          <br />
        </div>
      </v-col>

      <br />
      <br />
      <br />

      <v-col md="8">
        <span>Last Updated: January 25th, 2021</span>
      </v-col>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Privacy',
  methods: {
    getPrivacy() {
      switch (this.$route.params.platform?.toLowerCase()) {
        case 'extension':
        case 'ext':
        case 'chrome':
        case 'firefox':
          return {
            'Personal Data': 'LiveTL does not collect any personal data. Settings changed in the Settings Menu will be stored for the duration the extension is installed.',
            'Third Party Services': 'LiveTL stores your user preferences using the Browser Extension Storage API.'
          };
        default:
          return {
            'Personal Data': 'LiveTL Web directly collects as little personal data as possible, as such, when you do not login to the service, no data is collected by it. ' +
              'Note that some of the third party services used by the service may still collect data. Learn more in the Third Party Services section.<br/>' +
              'When you log into the service using your Google Account, various pieces of information gathered from your Google Account are stored, such as your Display Name and Email.',
            'Third Party Services': 'LiveTL Web makes use of several third party services which may collect personal information about you.<br/>' +
              'These services include (but are not limited to): Google (Firebase Hosting, Firestore, Firebase Authentication, and Google Fonts), and Cloudflare (DNS and Cache).',
            'Translator/Translation Data': 'When you register as a LiveTL Translator, LiveTL Web will lookup and store the YouTube Channel ID associated with your Google Account, ' +
              'along with any information you entered during the registration process.'
          };
      }
    }
  }
};
</script>
