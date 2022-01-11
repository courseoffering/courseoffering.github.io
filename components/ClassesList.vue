<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="10" lg="8">
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="classes"
          item-key="crn"
          sort-by="semster_index"
          :dense="true"
          :loading="loading"
          group-by="semster_index"
          class="elevation-1"
          :search="search"
          show-group-by
        ></v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    classes: { type: Array, default: {} },
    loading: { type: Boolean, default: false },
  },
  data() {
    return {
      search: '',
      headers: [
        { text: 'Course Name', align: 'start', value: 'name' },
        { text: 'Code', value: 'code', align: 'right', groupable: false },
        { text: 'CRN', value: 'crn', align: 'right', groupable: false },
        { text: 'Section', value: 'section', align: 'right', groupable: false },
        { text: 'Days', value: 'days', align: 'right', groupable: false },
        { text: 'time', value: 'time', align: 'right', groupable: false },
        { text: 'Instructor', value: 'instructor', align: 'right' },
        { text: 'Semster', value: 'semster_index', align: 'right' },
      ],
    }
  },
}
</script>
