const fs = require("../utils/files");
const shell = require('shelljs');
const { PROJECT_ROOT } = require("../config");

exports.configureMonoRepo = async (project) => {
	let data = await fs.readFile(`${PROJECT_ROOT}package.json`);
	data = JSON.parse(data);
	data.private = true;
	data.description = project.description;
	data.name = project.name;
	data.author = project.author;
	data.workspaces = [
		"client",
		"server"
	];
	data.scripts = {
		"client": "yarn workspace client start",
		"server": "yarn workspace server dev",
		"start": "concurrently --kill-others-on-fail \"yarn server\" \"yarn client\"",
		"test:client": "yarn workspace client test",
		"test:server": "yarn workspace server test",
		"test:coverage": "jest --coverage",
		"client:lint": "yarn workspace client lint",
		"server:lint": "yarn workspace server lint",
		"lint": "concurrently \"yarn client:lint\" \"yarn server:lint\"",
		"test": "concurrently \"yarn test:client\" \"yarn test:server\""
	};
	data['lint-staged'] = {
		"*.{js,jsx}": [
			"eslint --fix",
			"git add"
		]
	};
	data.husky = {
		"hooks": {
			"pre-commit": "yarn lint && git add --all"
		}
	};
	await fs.writeFile(`${PROJECT_ROOT}package.json`, JSON.stringify(data, null, 2));
	shell.exec('create-react-app client');
	shell.exec('express server');
};