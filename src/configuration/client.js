const shell = require('shelljs');
const { PROJECT_ROOT, TEMPLATE_ROOT } = require("../config");

exports.configureClient = (ui, ui_package, packages, theme, auth) => {
	shell.cd(`${PROJECT_ROOT}client`);
	shell.exec(`cp -r ${TEMPLATE_ROOT}src/* ${PROJECT_ROOT}client/src/`);
	shell.rm(`${PROJECT_ROOT}client/src/logo.svg`);
	const app = `${PROJECT_ROOT}client/src/App.js`;
	const main = `${PROJECT_ROOT}client/src/Main.js`;
	if (packages.includes('react-router-dom')) {
		shell.exec('sed -i "1 a import { BrowserRouter } from \'react-router-dom\'" ' + app);
		shell.exec('sed -i "/<Main \\/>/ i \\\t\t<BrowserRouter>" ' + app);
		shell.exec('sed -i "s/<Main \\/>/\t &/" ' + app);
		shell.exec('sed -i "/<Main \\/>/ a \\\t\t</BrowserRouter>" ' + app);
		shell.exec('sed -i "1 a import { Switch, Route, Redirect } from \'react-router-dom\'" ' + main);
		shell.exec('sed -i "/<Home \\/>/d" ' + main);
		shell.exec('sed -i "/<Header \\/>/ a \\\t\t\t<Switch>" ' + main);
		shell.exec('sed -i "/<Switch>/ a \\\t\t\t</Switch>" ' + main);
		shell.exec('sed -i "/<Switch>/ a \\\t\t\t\t<Redirect from=\\"/\\" to=\\"/home\\" />" ' + main);
		if (auth) {
			shell.cp(`${TEMPLATE_ROOT}config.js`, `${PROJECT_ROOT}client/src/`);
			shell.cp(`${TEMPLATE_ROOT}apiCaller.js`, `${PROJECT_ROOT}client/src/utils`);
			shell.cp(`${TEMPLATE_ROOT}Auth.js`, `${PROJECT_ROOT}client/src/components/common/`);
			shell.exec('sed -i "2 a import Auth from \'./components/common/Auth\'" ' + main);
			shell.exec('sed -i "/<Switch>/ a \\\t\t\t\t<Route path=\\"/signup\\" component={Auth} />" ' + main);
			shell.exec('sed -i "/<Switch>/ a \\\t\t\t\t<Route path=\\"/login\\" component={Auth} />" ' + main);
		}
		shell.exec('sed -i "/<Switch>/ a \\\t\t\t\t<Route path=\\"/\\" component={Home} />" ' + main);
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