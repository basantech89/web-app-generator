const shell = require('shelljs');
const { PROJECT_ROOT } = require("../../config");

exports.configureServer = packages => {
	shell.cd(`${PROJECT_ROOT}server`);
	shell.exec('npm install ' + packages.join(' '));
};