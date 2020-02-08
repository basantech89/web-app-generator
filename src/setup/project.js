const { prompt } = require('enquirer');

exports.setupProject = async () => await prompt([
		{
			type: 'form',
			name : 'project',
			message: 'Pl provide following information',
			choices: [
				{ name: 'loc', message: 'Project Location', initial: '/luv/repos/' },
				{ name: 'name', message: 'Project Name', initial: 'example' },
				{ name: 'author', message: 'Author', initial: 'Basant Soni' },
				{ name: 'description', message: 'Description', initial: '' },
			]
		},
		{
			type: 'toggle',
			name: 'monoRepo',
			message: 'Do you want to setup a mono repo ?',
			enabled: 'Yes',
			disabled: 'No'
		}
	]);
