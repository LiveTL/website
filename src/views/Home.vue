<template>
  <div class="home">
    <v-container>
      <h1>LiveTL</h1>
      <h3>Get live translations for YouTube streams, crowdsourced from multilingual viewers!</h3>

      <br/>
      <br/>

      <h2>Download</h2>
      <v-row>
        <v-col sm="3">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <a> <!-- TODO href to play store link -->
                <v-img src="@/assets/install-android.png" v-bind="attrs" v-on="on"/>
              </a>
            </template>
            <span>Coming Soon&#8482;!</span>
          </v-tooltip>
        </v-col>

        <v-col sm="3">
          <a href="https://chrome.google.com/webstore/detail/livetl-live-translations/moicohcfhhbmmngneghfjfjpdobmmnlg">
            <v-img src="@/assets/install-chrome.png"/>
          </a>
        </v-col>

        <v-col sm="3">
          <a href="https://addons.mozilla.org/en-US/firefox/addon/livetl/">
            <v-img src="@/assets/install-firefox.png"/>
          </a>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    getUser() {
      return this.$store.getters.getUser;
    }
  }
};
</script>
