<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="12" lg="8">
      <v-card :disabled="loading">
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
          :dense="false"
          :loading="loading"
          group-by="semster_index"
          class="elevation-1"
          :search="search"
          show-group-by
        >
          <template v-slot:item.days="{ item }">
            <v-chip v-for="day in item.days" :key="day">
              {{ daysNames[day] }}
            </v-chip>
          </template>

          <template v-slot:item.button="{ item }">
            <v-tooltip right :color="item.buttonOptions.color">
              <template v-slot:activator="{ on, attrs }">
                <div v-bind="attrs" v-on="on">
                  <v-btn
                    elevation="2"
                    :color="item.buttonOptions.color"
                    :disabled="item.buttonOptions.disabled"
                    fab
                    small
                    @click="$emit('class:action', item)"
                  >
                    <v-icon> {{ item.buttonOptions.icon }} </v-icon>
                  </v-btn>
                </div>
              </template>
              <div v-if="item.buttonOptions.tooltips == 0">
                {{ 'Add' }}
              </div>
              <div
                v-for="tooltip in item.buttonOptions.tooltips"
                align="center"
              >
                {{ tooltip }}
              </div>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  emits: ['class:action'],
  props: {
    classes: { type: Array, default: {} },
    loading: { type: Boolean, default: false },
  },
  data() {
    return {
      search: '',
      daysNames: {
        1: 'Sun',
        2: 'Mon',
        3: 'Tue',
        4: 'Wed',
        5: 'Thu',
        6: 'Fri',
        7: 'Sat',
      },
      headers: [
        { text: 'Course Name', align: 'start', value: 'name' },
        { text: 'Code', value: 'code', align: 'right', groupable: false },
        { text: 'CRN', value: 'crn', align: 'right', groupable: false },
        { text: 'Section', value: 'section', align: 'right', groupable: false },
        { text: 'Days', value: 'days', align: 'right', groupable: false },
        { text: 'time', value: 'time', align: 'right', groupable: false },
        { text: 'Instructor', value: 'instructor', align: 'right' },
        { text: 'Semster', value: 'semster_index', align: 'right' },
        { text: 'button', value: 'button', align: 'right', groupable: false },
      ],
    }
  },
}
</script>
