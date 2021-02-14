<template>
  <v-simple-table>
    <thead>
    <tr>
      <th class="text-left" v-for="(_, name) in parameters[0]" :key="name" v-text="name" />
    </tr>
    </thead>
    <tbody>
    <tr v-for="(property, name) in parameters" :key="name">
      <td v-for="val in property" v-text="val" :key="val" />
    </tr>
    </tbody>
  </v-simple-table>
</template>

<script>
export default {
  name: 'ParametersTable',
  props: ['parameters']
};
</script>

<style scoped>
.v-data-table {
  margin-bottom: 2em !important;
}
</style>
