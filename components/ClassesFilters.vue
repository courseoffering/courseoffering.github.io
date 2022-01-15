<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="12" lg="8">
      <v-card :loading="loading">
        <v-card-title> Filters </v-card-title>
        <v-card-actions>
          <v-container fluid>
            <v-row align="center">
              <v-col class="d-flex" cols="12" sm="4">
                <v-select
                  v-model="selectedDepartment"
                  :items="Object.keys(departments)"
                  label="Department"
                  @input="$emit('department:change', $event)"
                ></v-select>
              </v-col>

              <v-col class="d-flex" cols="12" sm="4">
                <v-select
                  v-model="selectedMajor"
                  :items="departments[selectedDepartment]"
                  item-text="name"
                  item-value="abbrv"
                  label="Major"
                  return-object
                  :disabled="!selectedDepartment"
                  @input="$emit('major:change', $event)"
                ></v-select>
              </v-col>
              <v-col class="d-flex" cols="12" sm="4">
                <v-select
                  :items="semsters"
                  v-model="selectedSemsters"
                  label="Semsters"
                  :clearable="true"
                  :deletable-chips="false"
                  :disabled="!selectedMajor"
                  @input="$emit('semsters:change', $event)"
                  chips
                  multiple
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    departments: { type: Object },
    loading: { type: Boolean, default: false },
    selectedSemstersProp: { type: Array },
  },
  emits: ['major:change', 'semsters:change', 'department:change'],
  data() {
    return {
      selectedDepartment: null,
      selectedMajor: null,
      selectedSemsters: this.selectedSemstersProp,
    }
  },
  computed: {
    semsters() {
      if (this.selectedMajor) {
        let sems = this.selectedMajor.sems
        return sems
      } else {
        return []
      }
    },
  },
  methods: {},
}
</script>
