<template>
  <div class="home">
    <v-container>
      <v-row justify="center">
        <h1>LiveTL</h1>
      </v-row>

      <v-row justify="center">
        <h3 v-text="$t('home_description')" />
      </v-row>

      <br />
      <br />

      <v-row justify="center">
        <h2 v-text="$t('home_download_header')" />
      </v-row>

      <v-row justify="center">
        <v-col xs="2" sm="4" md="3" lg="2" v-for="store in stores" :key="store.link" align-self="center">
          <a :href="store.link" target="_blank">
            <v-img :src="getImgUrl(store.image)" />
          </a>
        </v-col>

        <!-- TODO Remove the below block when the store link is added to the data array -->
        <v-col xs="2" sm="4" md="3" lg="2" align-self="center">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-img :src="getImgUrl('store-images/install-safari.svg')" v-bind="attrs" v-on="on" />
            </template>
            <span>Coming Soon&#8482;!</span>
          </v-tooltip>
        </v-col>
      </v-row>
      <!-- TODO Remove the above block when the store link is added to the data array -->

      <v-row justify="center">
        <v-col md="9" lg="8">
          <v-carousel v-model="showcase" hide-delimiters>
            <v-carousel-item v-for="image in showcaseImages" :key="image" contain :src="getImgUrl(image)" />
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
      showcaseImages: [
        'showcase-images/cover.png',
        'showcase-images/holotools-launcher.png',
        'showcase-images/launcher-buttons.png',
        'showcase-images/options.png',
        'showcase-images/popout.png'
      ],
      stores: [
        {
          link: 'https://play.google.com/store/apps/details?id=com.livetl.android',
          image: 'store-images/install-android.png'
        },
        {
          link: 'https://chrome.google.com/webstore/detail/livetl-live-translations/moicohcfhhbmmngneghfjfjpdobmmnlg',
          image: 'store-images/install-chrome.png'
        },
        {
          link: 'https://addons.mozilla.org/en-US/firefox/addon/livetl/',
          image: 'store-images/install-firefox.png'
        }
        // TODO uncomment when safari extension is released
        // {
        //   link: '', // TODO add link to store
        //   image: 'store-images/install-safari.svg'
        // }
      ]
    };
  },
  computed: {
    getUser() {
      return this.$store.getters.getUser;
    }
  },
  methods: {
    getImgUrl(img) {
      // https://stackoverflow.com/a/47480286
      return require(`@/assets/${img}`);
    }
  }
};
</script>
