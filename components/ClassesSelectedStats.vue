<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="12" lg="8">
      <v-card>
        <v-card-title> Total Credits: {{ totalCredits }}</v-card-title>
        <div class="text-center">
          <v-chip
            class="ma-2"
            v-for="clas in selectedClasses"
            :key="clas.crn"
            close
          >
            {{ clas.name }}{{ clas.credits }} {{ clas.crn }}
          </v-chip>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    selectedClasses: { type: Array, default: [] },
  },
  computed: {
    totalCredits() {
      console.log(this.selectedClasses)
      return this.selectedClasses.reduce((a, b) => a + b.credits, 0)
    },
  },
}
</script>
