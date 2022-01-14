<template>
  <div>
    <!-- <pre> -->
    <!-- {{ selectedClasses.map((c) => ({ name: c.name, crn: c.crn })) }} -->
    <!-- {{ selectedClasses }} -->
    <!-- </pre> -->

    <ClassesCalendar @class:delete="deleteClass" :classes="selectedClasses" />
    <ClassesSelectedStats :selectedClasses="selectedClasses" />
    <ClassesFilters
      @major:change="majorChange($event)"
      @department:change="departmentChange($event)"
      @semsters:change="selectedSemsters = $event"
      :selectedSemstersProp="selectedSemsters"
      :departments="departments"
    />
    <ClassesList
      :loading="loadingClasses"
      :classes="filteredClasses"
      @class:action="classButtonAction($event)"
    />
    <snackBar :text="snackbarText" :active="snackbarActive" />
  </div>
</template>

<script>
const axios = require('axios')
import { buttonOptions, findConflicts } from '@/logic/classes'

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
      selectedClasses: [],
      loadingClasses: false,
      snackbarText: '',
      snackbarActive: false,
    }
  },
  computed: {
    filteredClasses() {
      // selected semster (from <ClassesFilters/>
      let filtered = this.rawClasses.filter((c) =>
        this.selectedSemsters.includes(c.semster_index)
      )
      filtered = filtered.map((clas) =>
        findConflicts(clas, this.selectedClasses)
      )
      filtered = filtered.map(buttonOptions)

      return filtered
    },
  },
  methods: {
    deleteClass(e) {
      this.selectedClasses = this.selectedClasses.filter(
        (c) => c.code != e.code
      )
    },
    majorChange(e) {
      this.selectedMajor = e.abbrv
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
        const response = await this.$axios.get(url)
        this.rawClasses = response.data
        this.loadingClasses = false
      } catch (error) {
        this.snackbarActive = !this.snackbarActive
        this.snackbarText = `${this.selectedDepartment}, ${this.selectedMajor} Not yet supported!`
        this.loadingClasses = false
        this.rawClasses = []
        console.log(error) //TODO: handle error
      }
    },
    // If the button was pressed
    classButtonAction(e) {
      if (this.selectedClasses.find((c) => c.crn == e.crn)) {
        this.snackbarActive = !this.snackbarActive
        this.snackbarText = `Removing: ${e.name}`
        this.deleteClass(e)
        //
      } else if (this.selectedClasses.find((c) => c.code == e.code)) {
        this.snackbarActive = !this.snackbarActive
        this.snackbarText = `Removing Other Section`
        this.selectedClasses = this.selectedClasses.filter(
          (c) => c.code != e.code
        )
        this.selectedClasses.push(e)
        //
      } else {
        this.selectedClasses.push(e)
      }
    },
  },
}
</script>
