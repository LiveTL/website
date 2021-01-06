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
          <a href="https://play.google.com/store/apps/details?id=com.livetl.android">
            <v-img src="@/assets/store-images/install-android.png"/>
          </a>
        </v-col>

        <v-col sm="3">
          <a href="https://chrome.google.com/webstore/detail/livetl-live-translations/moicohcfhhbmmngneghfjfjpdobmmnlg">
            <v-img src="@/assets/store-images/install-chrome.png"/>
          </a>
        </v-col>

        <v-col sm="3">
          <a href="https://addons.mozilla.org/en-US/firefox/addon/livetl/">
            <v-img src="@/assets/store-images/install-firefox.png"/>
          </a>
        </v-col>
      </v-row>

      <v-row>
        <v-col md="8">
          <v-carousel v-model="showcase">
            <v-carousel-item v-for="image in images" :key="image" :src="image" />
          </v-carousel>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: () => {
    return {
      showcase: 0,
      // FIXME these don't work like this apparently
      images: [
        './assets/showcase-images/cover.png',
        './assets/showcase-images/holotools-launcher.png',
        './assets/showcase-images/launcher-buttons.png',
        './assets/showcase-images/launcher-ui.png',
        './assets/showcase-images/options.png',
        './assets/showcase-images/popout.png'
      ]
    };
  },
  computed: {
    getUser() {
      return this.$store.getters.getUser;
    }
  }
};
</script>
