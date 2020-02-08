const shell = require('shelljs');
const { PROJECT_ROOT } = require("../../config");

exports.configureProject = () => {
	shell.exec(`git init ${PROJECT_ROOT}`);
	shell.cd(PROJECT_ROOT);
	shell.exec('yarn add -D concurrently');
};