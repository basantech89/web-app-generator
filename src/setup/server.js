const { MultiSelect, Select } = require('enquirer');

exports.setupServer = async () => {
	const packages = await new MultiSelect({
		message: 'Pick the server packages you want to install',
		choices: [ 'body-parser', 'cors', 'assert', 'nodemon', 'jsonwebtoken', 'bcrypt' ]
	}).run();

	const dbms = await new Select({
		message: 'Which DBMS do you want to install ?',
		choices: [ 'mysql', 'mongo' ],
	}).run();

	return { packages, dbms }
};
