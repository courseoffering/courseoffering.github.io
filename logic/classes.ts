// too lazy to  add types ;)
export function buttonOptions(todo: any) {
	let tooltips: String[] = []
	let color = 'grey'
	let icon = 'mdi-plus'
	let disabled = false

	let sameCourse = todo.conflicts.sameCourse
	// course already added
	if (sameCourse) {
		// same class
		if (sameCourse.crn == todo.crn) {
			icon = 'mdi-check'
			tooltips = ['Remove']
			color = 'success'
		} else {
			color = 'lime'
			tooltips = ['Course added in Section: ' + sameCourse.section, 'Replace?']
			icon = 'mdi-plus'
		}
	}
	if (todo.conflicts._any) {
		icon = 'mdi-alert-circle'
		tooltips = todo.conflicts.time.map((c: any) => 'Conflict: ' + c.name)
		color = 'error'
		disabled = true
	}

	let buttonOptions = {
		icon,
		disabled,
		color,
		tooltips,
	}
	return { ...todo, buttonOptions }
}
export function findConflicts(checkClass: any, selectedClasses: any[]) {
	// same course
	let sameCourse: any = selectedClasses.filter(
		(c: any) => c.code == checkClass.code
	)[0]

	// get rid of memory leak!
	if (sameCourse) {
		sameCourse.conflicts = {}
		sameCourse.buttonOptions = {}
	}

	// time conflicts
	let time: any[] = []
	time = selectedClasses.filter((sc) => {
		return (
			checkConflict(sc, checkClass) &&
			// can't conflict with itself or other same courses
			sc.crn != checkClass.crn &&
			sc.code != checkClass.code
		)
	})
	let _any = time.length > 0
	let conflicts = { _any, time, sameCourse }

	return { ...checkClass, conflicts }
}

function checkConflict(c1: any, c2: any): boolean {
	return JSON.stringify(c1.days) == JSON.stringify(c2.days)
}
