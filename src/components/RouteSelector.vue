<template>
  <v-menu>
    <template v-slot:activator="{on, attrs}">
      <v-btn id="routes_btn" text v-bind="attrs" v-on="on">
        <v-icon>mdi-menu</v-icon>
        <v-icon class="dropdown-arrow">mdi-chevron-down</v-icon>
      </v-btn>
    </template>

    <v-navigation-drawer style="transform: translateX(0%) !important; visibility: visible !important;">
      <v-list>
        <v-list-item v-for="(route, i) in routes" :key="i">
          <v-btn :to="`${route.route}`" v-text="$t(route.display)" block text />
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-menu>
</template>

<script>
export default {
  name: 'RouteSelector',
  data: () => {
    // FIXME: Re-Write This (29/10/2021)
    return {
      isHidden: false,
      routes: [
        {
          route: '/home',
          display: 'nav_home_btn'
        },
        {
          route: '/hyperchat',
          display: 'Hyperchat'
        },
        {
          route: '/news',
          display: 'News'
        }
      ]
    };
  }
};
</script>

<style scoped>
.dropdown-arrow {
  width: 12px;
  height: 12px;
  margin-left: 4px;
}
</style>
