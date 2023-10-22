<template>
  <div>

    <ClassesCalendar @class:delete="deleteClass" :classes="selectedClasses" />
    <ClassesSelectedStats
      @class:delete="deleteClass"
      :selectedClasses="selectedClasses"
    />
    <ClassesFilters
      @college:change="collegeChange($event)"
      @gender:change="genderChange($event)"
	  @department:change="selectedDepartments = $event"
	  :colleges="colleges"
	  :genders="genders"
	  :allDepartments="allDepartments"
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
import saveState from 'vue-save-state'

export default {
  mixins: [saveState],
  data() {
    return {
	  colleges:
       		[
         "الطب البيطيري",
         "العلوم",
         "علوم الحاسب وتقنية المعلومات",
         "الصيدلة الاكلينيكية",
         "الدراسات التطبيقية وخدمة المجمتع",
         "الطب",
         "إدارة الأعمال",
         "الهندسة",
		 "الشريعة والدراسات الاسلامية",
         "العلوم الطبية التطبيقية",
         "العلوم الزراعية والاغذية",
         "الحقوق",
         "الاسنان",
         "مركز اللغة الانجيليزية",
         // "الدراسات التطبيقية وخدمة المجمتع فرع بقيق"
         "الآداب",
         "التربية",
       ],

	  genders: ["Male", "Female", "Engineer"],
      rawClasses: [],
      selectedGender: null,
      selectedCollege: null,
      selectedClasses: [],
      loadingClasses: false,
      snackbarText: '',
      snackbarActive: false,
	  selectedDepartments: [],
    }
  },
  computed: {
	  allDepartments(){
		  // with duplicates
		  let departments = this.rawClasses.map((a)=> a.department);
		  // without dups
		  let unique = [...new Set(departments)];
		  return unique;
	  },
    filteredClasses() {
      // it no longer filters, this naming is due to historic reasons
		let filtered = this.rawClasses.filter(clas =>
			this.selectedDepartments.includes(clas.department)
		)
        filtered = filtered.map((clas) =>
        findConflicts(clas, this.selectedClasses)
      )
      filtered = filtered.map(buttonOptions)

      return filtered
    },
  },
  methods: {
    getSaveStateConfig() {
      return {
        cacheKey: 'index',
		saveProperties: ['selectedClasses'],
      }
    },

    deleteClass(e) {
      this.selectedClasses = this.selectedClasses.filter(
        (c) => c.code != e.code
      )
    },
    genderChange(e) {
      this.selectedGender = e.toLowerCase()
	  // don't download if college isn't yet selected
	  if (this.selectedCollege){
        this.getClasses()
	  }
    },
    collegeChange(e) {
      this.selectedCollege = e
	  // college can only be selected after gender, no need to check for selectedGender
      this.getClasses()
    },
    // gets Classs for Plan/Major
    async getClasses() {
      let url = `/by_college/${this.selectedGender}/${this.selectedCollege}.json`
      console.log(url)
      this.loadingClasses = true
      try {
        const response = await this.$axios.get(url)
        this.rawClasses = response.data
        this.loadingClasses = false
      } catch (error) {
        this.snackbarActive = !this.snackbarActive
        this.snackbarText = `${this.selectedGender}, ${this.selectedCollege}: Error fetching!`
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
