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
                  v-model="selectedGender"
                  :items="genders"
                  label="Gender"
                  @input="$emit('gender:change', $event)"
                ></v-select>
              </v-col>

              <v-col class="d-flex" cols="12" sm="4">
                <v-select
                  v-model="selectedCollege"
                  :items="colleges"
                  item-text="name"
                  item-value="abbrv"
                  label="College"
                  return-object
                  :disabled="!selectedGender"
                  @input="$emit('college:change', $event)"
                ></v-select>
              </v-col>

              <v-col class="d-flex" cols="12" sm="4">
                <v-select
                  v-model="selectedDepartments"
                  :items="allDepartments"
                  item-text="name"
                  item-value="abbrv"
                  label="Departments"
                  return-object
                  :disabled="!selectedCollege"
                  @input="$emit('department:change', $event)"
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
    colleges : { type: Array, default: () => [] },
    loading: { type: Boolean, default: false },
	genders: {type: Array, default: () => []},
	allDepartments: {type: Array, default: () => []},
  },
  emits: ['gender:change', 'college:change', 'department:change'],
  data() {
    return {
	  selectedGender: null, /* "male" or "female" */
	  selectedCollege: null,
	  selectedDepartments: [],
    }
  },
  computed: {},
  methods: {},
}
</script>
