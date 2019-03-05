
const path = require('path');
const lodash = require('lodash');
const packageConfig = require('../package.json');

const environment = process.env.NODE_ENV || 'dev';
const rootPath = path.join(path.resolve(__dirname), '..');
const configPath = rootPath + '/config';
const testsPath = rootPath + '/tests';
const distPath = rootPath + '/dist';
const customerSampleDataPath = path.join(rootPath, 'src', 'data', 'SampleData.csv');
try {
	const localEnv = require('./env.' + environment + '.json');
	process.env = lodash.assign(process.env, localEnv);
} catch (e) {
	console.info('Do not use override env.' + environment + '.json file');
}

const version = packageConfig.version;
const port = process.env.PORT || 8080;

exports = module.exports = {
	environment: environment,
	paths: {
		configPath: configPath,
		rootPath: rootPath,
		testsPath: testsPath,
		distPath: distPath,
		customerSampleDataPath: customerSampleDataPath,
	},
	app: {
		version: version,
	},
	server: {
		port: port
	},
};
