const { Toggle, Select, MultiSelect } = require('enquirer');

exports.setupClient = async () => {
	let ui_package = false;
	const ui = await new Toggle({
			message: 'Do you want to install any UI library/framework ?',
			enabled: 'Yes',
			disabled: 'No'
	}).run();

	if (ui) {
		ui_package = await new Select({
			message: 'Which UI library / framework do you want to install ?',
			choices: [ 'reactstrap', 'Material-UI', 'Grommet' ],
		}).run();
	}

	const client_packages = await new MultiSelect({
		message: 'Pick the client packages you want to install',
		choices: [
			'react-router-dom',
			'prop-types',
			'node-sass',
			'classnames',
			'enzyme',
			'redux'
		]
	}).run();

	const theme = await new Toggle({
		message: 'Do you want to use a theme switcher for client ?',
		enabled: 'Yes',
		disabled: 'No'
	}).run();

	const auth = await new Toggle({
		message: 'Do you want to have authentication ?',
		enabled: 'Yes',
		disabled: 'No'
	}).run();

	return { ui, ui_package, client_packages, theme, auth };
};
