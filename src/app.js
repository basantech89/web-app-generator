const shell = require('shelljs');
const { setupProject } = require("./setup/project");
const { setupClient } = require("./setup/client");
const { setupServer } = require("./setup/server");
const { configureProject } = require("./configuration/project");
const { configureMonoRepo } = require("./configuration/monorepo");
const { configureClient } = require("./configuration/client");
const { configureServer } = require("./configuration/server");

const runGenerator = async () => {
	try {
		const { project, monoRepo } = await setupProject();
		const PROJECT_ROOT = project.loc + project.name + '/';
		shell.exec('sed -i "/PROJECT_ROOT/d" config.js'); // delete line having word PROJECT_ROOT if exists in config.js
		shell.exec(`sed -i "$ a exports.PROJECT_ROOT = '${PROJECT_ROOT}';" config.js`); // append PROJECT_ROOT to config.js
		if (monoRepo) {
			const { ui, ui_package, client_packages, theme, auth } = await setupClient();
			const server_packages = await setupServer();
			await configureProject();
			await configureMonoRepo(project);
			await configureClient(ui, ui_package, client_packages, theme, auth);
			await configureServer(server_packages);
		} else {
		}
	} catch (e) {
		console.log(e);
	}
};

runGenerator();
