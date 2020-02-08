const fs = require('fs').promises;

exports.readFile = async (file) => {
	try {
		return await fs.readFile(file, 'utf-8');
	} catch (e) {
		console.log(e);
	}
};

exports.writeFile = async (file, data) => {
	try {
		await fs.writeFile(file, data, 'utf-8');
	} catch (e) {
		console.log(e);
	}
};