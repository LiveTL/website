<template>
  <v-footer padless>
    <v-row justify="center" no-gutters>
      <div v-for="link in buttons" :key="link.text">
        <v-btn text :to="link.link">
          {{ link.text }}
          <v-icon right v-text="link.icon"></v-icon>
        </v-btn>
      </div>

      <v-col cols="12" class="text-center">
        Copyright &copy; 2020 - {{ new Date().getFullYear() }} <a href="https://github.com/orgs/LiveTL/people"
                                                                  target="_blank">LiveTL Developers</a>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  data: () => {
    return {
      buttons: [
        {
          text: 'FAQ',
          link: '/faq',
          icon: 'mdi-help-circle'
        },
        {
          text: 'Contact',
          link: '/contact',
          icon: 'mdi-email'
        },
        {
          text: 'Privacy',
          link: '/privacy',
          icon: 'mdi-shield-lock'
        }
      ]
    };
  }
};
</script>
