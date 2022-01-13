// too lazy to  add types ;)
export function buttonOptions(todo: any) {
	let buttonOptions = {
		disabled: false,
		color: 'success',
		tooltips: ['Hello!', 'Error 2'],
	}
	return { ...todo, buttonOptions }
}
export function findConflicts(todo: any) {
	return todo
}
