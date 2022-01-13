// too lazy to  add types ;)
export function buttonOptions(todo: any) {
	let tooltips = todo.conflicts.time
	let color = 'success'
	let icon = 'mdi-plus'

	let sameCourse = todo.conflicts.sameCourse
	// course already added
	if (sameCourse) {
		// same class
		if (sameCourse.crn == todo.crn) {
			icon = 'mdi-minus'
			tooltips = ['Remove']
			color = 'red'
		} else {
			color = 'grey'
			console.log(sameCourse)
			tooltips = ['Course added in Section: ' + sameCourse.section, 'Replace?']
		}
	}

	let buttonOptions = {
		icon,
		disabled: todo.conflicts._any,
		color,
		tooltips,
	}
	return { ...todo, buttonOptions }
}
export function findConflicts(checkClass: any, selectedClasses: any) {
	// same course
	let time: String[] = []
	let sameCourse: any = selectedClasses.filter(
		(c: any) => c.code == checkClass.code
	)[0]
	let _any = time.length > 0
	let conflicts = { _any, time, sameCourse }

	return { ...checkClass, conflicts }
}
