<template>
  <div class="home">
    <v-container>
      <v-row justify="center">
        <h1>LiveTL News</h1>
      </v-row>
      <v-card
        class="mx-auto"
        max-width="800"
        style="word-break: unset !important;"
        v-for="(post, index) in posts"
        :key="index"
      >
        <v-card-title>{{ post.title }}</v-card-title>

        <v-card-actions>
          <v-btn
            text
            color="blue"
            @click="openLink(post.link)"
            v-if="post.link"
          >
            {{ post.button }}
          </v-btn>
          <v-chip
            class="ma-2"
            color="pink"
            v-if="!post.link"
          >
            Oops! The link is not active yet. Check back in a bit :)
          </v-chip>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import posts from '../js/posts.js';
export default {
  name: 'Home',
  data: () => {
    return {
      posts,
      error: ''
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
    },
    openLink(url) {
      if (url) window.location.href = url;
    }
  }
};
</script>
