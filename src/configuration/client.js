const shell = require('shelljs');
const { PROJECT_ROOT, TEMPLATE_ROOT } = require("../config");

exports.configureClient = (ui, ui_package, packages, theme, auth) => {
	const CLIENT_ROOT = `${TEMPLATE_ROOT}client/`;
	shell.cd(`${PROJECT_ROOT}client`);
	shell.exec(`cp -r ${CLIENT_ROOT}src/* ${PROJECT_ROOT}client/src/`);
	shell.rm(`${PROJECT_ROOT}client/src/logo.svg`);
	const app = `${PROJECT_ROOT}client/src/App.js`;
	const main = `${PROJECT_ROOT}client/src/Main.js`;
	if (packages.includes('react-router-dom')) {
		shell.exec(`bash ${TEMPLATE_ROOT}../scripts/setup_router.sh ${main} ${app} ${auth}`);
		if (auth) {
			shell.cp(`${CLIENT_ROOT}config.js`, `${PROJECT_ROOT}client/src/`);
			shell.cp(`${CLIENT_ROOT}apiCaller.js`, `${PROJECT_ROOT}client/src/utils`);
			shell.cp(`${CLIENT_ROOT}Auth.js`, `${PROJECT_ROOT}client/src/components/common/`);
		}
	}
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
	shell.cd(`${PROJECT_ROOT}client`);
	shell.exec('yarn add ' + all_packages.join(' '));
};