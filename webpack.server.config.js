
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { getNodeModulesExternals } = require('./tools/nodeModulesHelper.js');
const parameters = require('./configs/parameters');
const tsLoader = require('./webpack/tsLoader');
const sassLoader = require('./webpack/sassLoader');
const imageLoader = require('./webpack/imageLoader');

module.exports = {
	entry: './src/Server/server',
	target: 'node',
	node: {
		__filename: true,
		__dirname: true
	},
	output: {
		path: parameters.paths.distPath,
		filename: 'server.js',
		publicPath: "/"
	},
	devtool: 'source-map',
	plugins: [
		new webpack.BannerPlugin({ banner: 'require("source-map-support").install();', raw: true, entryOnly: false }),
		new ExtractTextPlugin({ filename: "server-styles.css" }),
	],
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json'],
	},
	module: {
		rules: [
			tsLoader,
			sassLoader,
			imageLoader,
		]
	},
	externals: getNodeModulesExternals(parameters.paths.rootPath)
}

switch (parameters.environment) {
	case 'production':
		break;
	case 'staging':
		break;
	case 'test':
		break;
	case 'dev':
		break;
	default:
		console.warn('Unknown environment ' + parameters.environment);
}
