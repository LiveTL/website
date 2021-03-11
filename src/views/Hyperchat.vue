<template>
  <div class="home">
    <v-container>
      <v-row justify="center">
        <h1>HyperChat by LiveTL</h1>
      </v-row>

      <v-row justify="center">
        <h3>Youtube chat, but it's fast and sleek!</h3>
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
      </v-row>

      <v-row justify="center">
        <v-col md="9" lg="8">
          <v-carousel v-model="showcase" hide-delimiters>
            <v-carousel-item>
              <iframe style="border: 0px; width: 100%; height: 100%;" src="https://www.youtube.com/embed/BVxxiegcOOA" />
            </v-carousel-item>
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
        'showcase-images/hyperchat/slide1.png',
        'showcase-images/hyperchat/slide2.png',
        'showcase-images/hyperchat/slide3.png',
        'showcase-images/hyperchat/slide4.png'
      ],
      stores: [
        {
          link: 'https://chrome.google.com/webstore/detail/hyperchat-optimized-youtu/naipgebhooiiccifflecbffmnjbabdbh',
          image: 'store-images/install-chrome.png'
        },
        {
          link: 'https://addons.mozilla.org/en-US/firefox/addon/hyperchat/',
          image: 'store-images/install-firefox.png'
        }
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
