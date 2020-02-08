const shell = require('shelljs');
const { PROJECT_ROOT } = require("../../config");

exports.configureClient = (ui, ui_package, packages) => {
	shell.cd(`${PROJECT_ROOT}client`);
	const all_packages = packages;
	if (ui) {
		if (ui_package === 'reactstrap') {
			all_packages.push('bootstrap', 'reactstrap');
		}
	}
	if (packages.includes('redux')) {
		all_packages.push('react-redux', 'redux-logger', 'redux-thunk');
	}
	if (packages.includes('enzyme')) {
		all_packages.push('enzyme-adapter-react-16', 'enzyme-to-json');
	}
	shell.exec('yarn add ' + all_packages.join(' '));
};