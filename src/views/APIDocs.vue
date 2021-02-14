<template>
  <div class="api-docs">
    <v-container>
      <v-navigation-drawer right floating fixed color="transparent" style="top: 96px">
        <template v-slot:prepend>
          <div class="text--primary font-weight-medium text-h6">Endpoints</div>
        </template>
        <v-list flat dense>
          <v-list-item v-for="(display, endpoint) in endpoints" :key="endpoint" :to="getHeaderLinkId(endpoint)"
                       @click="$vuetify.goTo(getHeaderLinkId(endpoint), scrollOptions)">
            <v-list-item-content v-text="display" to="test" />
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-row>
        <v-col md="6" offset-md="2">
          <h1>API Documentation</h1>
        </v-col>
      </v-row>

      <v-row v-for="data in $options.apiDocs" :key="data.id">
        <v-col md="8" offset-md="2">
          <h2 :id="data.id">{{ data.name }} <code v-text="data.endpoint" /></h2>
          <p v-text="data.description" />

          <div v-if="data.alert !== undefined">
            <v-alert text :type="data.alert.type" v-text="data.alert.message" />
          </div>

          <div v-if="data.common_query_routes">
            <h3>Common Route Values:</h3>
            <parameters-table :parameters="data.common_query_routes" />
          </div>

          <h3>Routes</h3>
          <ul class="routes">
            <li v-for="route in data.routes" :key="route.id">
              <code v-text="route.call" />
              <p v-text="route.description" />

              <div v-if="route.deprecated !== undefined">
                <v-alert text type="error">
                  This route has been deprecated as of {{ route.deprecated.on }}<span v-if="!route.deprecated.removed"> and will be removed at some point in the future</span>.<br />
                  Please use <code>{{ route.deprecated.replacement }}</code> instead.
                </v-alert>
              </div>

              <div v-if="route.query_routes !== undefined">
                <h4>Route Values:</h4>
                <parameters-table :parameters="route.query_routes" />
              </div>

              <div v-if="route.query_parameters !== undefined">
                <h4>Query Parameters:</h4>
                <parameters-table :parameters="route.query_parameters" />
              </div>

              <div v-if="route.request_body !== undefined">
                <h4>Request Body:</h4>
                <parameters-table :parameters="route.request_body" />
              </div>
            </li>
          </ul>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import apiDocs from '@/assets/APIDocumentation.json';
import ParametersTable from '../components/ParametersTable';

export default {
  name: 'APIDocs',
  components: { ParametersTable },
  apiDocs,
  data: () => {
    return {
      endpoints: {
        translations: 'Translations',
        translators: 'Translators'
      },
      scrollOptions: {
        duration: 500,
        offset: 0,
        easing: 'easeInOutCubic'
      }
    };
  },
  methods: {
    getHeaderLinkId(id) {
      return `#${id}`;
    }
  }
};
</script>

<style scoped>
ul.routes > li {
  margin: 0 0 1.5em 0;
}
</style>
