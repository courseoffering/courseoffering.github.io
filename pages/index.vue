<template>
  <div>
    <!-- <ClassesCalendar /> -->
    <!-- <ClassesSelectedStats /> -->
    <ClassesFilters
      @major:change="majorChange($event)"
      @department:change="departmentChange($event)"
      @semsters:change="selectedSemsters = $event"
      :selectedSemstersProp="selectedSemsters"
      :departments="departments"
    />
    <ClassesList :loading="loadingClasses" :classes="filteredClasses" />
    <snackBar :text="snackbarText" :active="snackbarActive" />
  </div>
</template>

<script>
const axios = require('axios')

export default {
  data() {
    return {
      departments: {
        Engineering: [
          {
            name: 'Electrical Engineering',
            abbrv: 'EE',
            sems: [...Array(9).keys()],
          },
          {
            name: 'Mechanical Engineering',
            abbrv: 'ME',
            sems: [...Array(9).keys()],
          },
          {
            name: 'Chemical   Engineering',
            abbrv: 'ChE',
            sems: [...Array(9).keys()],
          },
          {
            name: 'Civil      Engineering',
            abbrv: 'CE',
            sems: [...Array(9).keys()],
          },
        ],
        'Computer Science': [
          { name: 'Networking', abbrv: 'Net', sems: [...Array(9).keys()] },
        ],
      },
      rawClasses: [],
      selectedDepartment: null,
      selectedMajor: null,
      selectedSemsters: [0],
      loadingClasses: false,
      snackbarText: '',
      snackbarActive: false,
    }
  },
  computed: {
    filteredClasses() {
      return this.rawClasses.filter((c) =>
        this.selectedSemsters.includes(c.semster_index)
      )
    },
  },
  methods: {
    majorChange(e) {
      this.selectedMajor = e.abbrv
      this.snackbarActive = false
      this.getCP()
    },
    departmentChange(e) {
      this.selectedDepartment = e
    },
    // gets Classs for Plan/Major
    async getCP() {
      let url = `/CP/${this.selectedDepartment}/${this.selectedMajor}.json`
      this.loadingClasses = true
      try {
        const response = await axios.get(url)
        this.rawClasses = response.data
        this.loadingClasses = false
      } catch (error) {
        this.snackbarActive = true
        this.snackbarText = `${this.selectedDepartment}, ${this.selectedMajor} Not yet supported!`
        this.loadingClasses = false
        this.rawClasses = []
        console.log(error) //TODO: handle error
      }
    },
  },
}
</script>
