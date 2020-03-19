const shell = require('shelljs');
const { PROJECT_ROOT } = require("../config");

exports.configureProject = () => {
	console.log('here ', PROJECT_ROOT);
	if (!PROJECT_ROOT) throw new Error('root is ' + PROJECT_ROOT);
	shell.exec(`git init ${PROJECT_ROOT}`);
	shell.cd(PROJECT_ROOT);
	shell.exec('npm init -y');
	shell.exec('yarn add -W -D concurrently eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-monorepo eslint-plugin-react eslint-plugin-react-hooks husky jest');
	// shell.cp(`${TEMPLATE_ROOT}package.json`, `${PROJECT_ROOT}`);
};