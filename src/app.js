const shell = require('shelljs');
const { setupProject } = require("./prompts/project");
const { setupClient } = require("./prompts/client");
const { setupServer } = require("./prompts/server");
const { configureProject } = require("./utils/configuration/project");
const { configureMonoRepo } = require("./utils/configuration/monorepo");
const { configureClient } = require("./utils/configuration/client");
const { configureServer } = require("./utils/configuration/server");

const runGenerator = async () => {
	try {
		const { project, monoRepo } = await setupProject();
		const PROJECT_ROOT = project.loc + project.name + '/';
		shell.exec('sed -i "/PROJECT_ROOT/d" config.js'); // delete line having word PROJECT_ROOT if exists in config.js
		shell.exec(`sed -i "$ a exports.PROJECT_ROOT = '${PROJECT_ROOT}';" config.js`); // append PROJECT_ROOT to config.js
		if (monoRepo) {
			const { ui, ui_package, client_packages } = await setupClient();
			console.log(ui, ui_package, client_packages);
			const server_packages = await setupServer();
			await configureProject();
			await configureMonoRepo(project);
			await configureClient(ui, ui_package, client_packages);
			await configureServer(server_packages);
		} else {
		}
	} catch (e) {
		console.log(e);
	}
};

runGenerator();
