const fs = require("../utils/files");
const shell = require('shelljs');
const { TEMPLATE_ROOT, PROJECT_ROOT } = require("../config");

exports.configureMonoRepo = async (project) => {
	let data = await fs.readFile(`${TEMPLATE_ROOT}package.json`);
	data = JSON.parse(data);
	data.description = project.description;
	data.name = project.name;
	data.author = project.author;
	await fs.writeFile(`${PROJECT_ROOT}package.json`, JSON.stringify(data, null, 2));
	shell.exec('create-react-app client');
	shell.exec('express server');
};