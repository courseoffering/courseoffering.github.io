/// from https://forum.vuejs.org/t/best-way-to-clear-localstorage/63125/4

let version = process.env.APP_VERSION;

// Store intial version in localStorage
if (!localStorage.getItem('app_version')) {
	localStorage.setItem('app_version', version);
}

console.log('Initial app version', localStorage.getItem('app_version'))

// Now lets imagine the user comes back to your app after a period of time...
// The version in package.json has changed and therefore you need to update your localStorage version

console.log('New app version', version)

// This timeout is just for this example
if (localStorage.getItem('app_version') !== version) {
	if (confirm(`New app version ${version} available, please refresh`)) {
		// Refresh the page and clear the app_version, so it can be set again with the latest version
		localStorage.removeItem('app_version');
		localStorage.clear();

		// Fire a refresh
		window.location.reload();
	}
}

