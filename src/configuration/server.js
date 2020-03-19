const shell = require('shelljs');
const { PROJECT_ROOT } = require("../config");

exports.configureServer = (packages, dbms) => {
	const all_packages = packages;
	shell.cd(`${PROJECT_ROOT}server`);
	if (dbms === 'mongo') {
		all_packages.push('mongoose');
	}
	shell.exec('npm install');
	shell.exec('npm install ' + all_packages.join(' '));
};