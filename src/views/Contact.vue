<template>
  <div class="contact">
    <v-container>
      <v-row>
        <v-col md="6" offset-md="2">
          <h1>Contact Us</h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col md="6" offset-md="2">
          <h3 class="error--text">
            Please make sure you read the
            <router-link to="/faq">FAQ</router-link>
            before asking for support or reporting issues!
          </h3>
        </v-col>
      </v-row>

      <v-row>
        <v-col md="6" offset-md="2">
          <h3 class="font-weight-regular">
            The primary and easiest way to get in contact with us is on our <discord-server-link />. You can find all
            our source code on <a href="https://github.com/LiveTL" target="_blank">GitHub</a>.
            <span v-if="platform !== undefined">To view all known issues for you platform, or create a new one, please visit the
              <a :href="getRepoIssuesLink(platform)" target="_blank">issues page</a>.
            </span>
          </h3>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import DiscordServerLink from '../components/DiscordServerLink';

export default {
  name: 'Contact',
  components: { DiscordServerLink },
  data: () => {
    return {
      platforms: {
        extension: 'core',
        safari: 'safari',
        android: 'core',
        ios: 'ios'
      }
    };
  },
  computed: {
    platform() {
      // TODO maybe some platform detection to fall back on?
      return this.platforms[this.$route.query.platform];
    }
  },
  methods: {
    getRepoIssuesLink(repo) {
      return `https://github.com/LiveTL/${repo}/issues`;
    }
  }
};
</script>
