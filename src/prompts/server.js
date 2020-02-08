const { MultiSelect } = require('enquirer');

exports.setupServer = async () => await new MultiSelect({
	message: 'Pick the server packages you want to install',
	choices: [ 'body-parser', 'cors', 'assert', 'mongoose' ]
}).run();
