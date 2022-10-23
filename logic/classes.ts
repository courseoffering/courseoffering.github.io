import { areIntervalsOverlapping } from 'date-fns'
// too lazy to  add types ;)
export function buttonOptions(checkClass: any) {
	let tooltips: String[] = []
	let color = 'primary'
	let icon = 'mdi-plus'
	let disabled = false

	let sameCourse = checkClass.conflicts.sameCourse
	// course already added
	if (sameCourse) {
		// same class
		if (sameCourse.crn == checkClass.crn) {
			icon = 'mdi-check'
			tooltips = ['Remove']
			color = 'success'
		} else {
			color = 'warning'
			tooltips = ['Course added in Section: ' + sameCourse.section, 'Replace?']
			icon = 'mdi-plus'
		}
	}
	if (checkClass.conflicts._any) {
		icon = 'mdi-alert-circle'
			; (tooltips = checkClass.conflicts.time.map(
				(c: any) => 'Conflict: ' + c.name
			)),
				(color = 'error')
		disabled = true
	}
	let availability: string = checkClass.available
	if (availability != 'available') {
		icon = 'mdi-alert'
		color = 'error'
		tooltips = [
			...tooltips,
			availability == 'Unknown'// todo
				? 'Not Available for an Unknown reason!'
				: availability,
		]
		if (checkClass.available == 'full') icon = 'mdi-alert-plus'
		// class itself is added, but full
		if (sameCourse && sameCourse.crn == checkClass.crn) {
			color = 'success'
		} else if (sameCourse && sameCourse.crn != checkClass.crn) {
			color = 'warning'
		}
	}

	let buttonOptions = {
		icon,
		disabled,
		color,
		tooltips,
	}
	return { ...checkClass, buttonOptions }
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

function checkConflict(c1s: any, c2s: any): boolean {
	let intersection = c1s.days.filter((dayc1: any) => c2s.days.includes(dayc1))
	if (intersection.length > 0) {
		let c1time = c1s.time.split('-')
		let c2time = c2s.time.split('-')
		let c1t1: number = parseInt(c1time[0])
		let c1t2: number = parseInt(c1time[1])
		let c2t1: number = parseInt(c2time[0])
		let c2t2: number = parseInt(c2time[1])

		return areIntervalsOverlapping(
			{ start: new Date(c1t1), end: new Date(c1t2) },
			{ start: new Date(c2t1), end: new Date(c2t2) }
		)
	}
	return false
}
