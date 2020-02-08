const shell = require('shelljs');
const { PROJECT_ROOT } = require("../config");

exports.configureProject = () => {
	shell.exec(`git init ${PROJECT_ROOT}`);
	shell.cd(PROJECT_ROOT);
	shell.exec('yarn add -D concurrently eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y ' +
		'eslint-plugin-monorepo eslint-plugin-react eslint-plugin-react-hooks husky jest');
};