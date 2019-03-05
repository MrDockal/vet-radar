
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const parameters = require('./configs/parameters');
const tsLoader = require('./webpack/tsLoader');
const sassLoader = require('./webpack/sassLoader');
const cssLoader = require('./webpack/cssLoader');
const woffLoader = require('./webpack/woffLoader');
const fontsLoader = require('./webpack/fontsLoader');
const imageLoader = require('./webpack/imageLoader');
const babelLoader = require('./webpack/babelLoader');

module.exports = {
	entry: [
		'babel-polyfill', './src/Web/bundle',
	],
	output: {
		path: parameters.paths.distPath,
		filename: 'bundle.js',
		publicPath: "/"
	},
	devtool: 'source-map',
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"' + parameters.environment + '"',
		}),
		new ExtractTextPlugin({ filename: "styles.css" }),
	],
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json'],
	},
	module: {
		rules: [
			tsLoader,
			sassLoader,
			cssLoader,
			woffLoader,
			fontsLoader,
			imageLoader,
			babelLoader,
		],
	},
}

switch (parameters.environment) {
	case 'production':
		module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({
			mangle: false,
			sourceMap: true,
		}));
		break;
	case 'staging':
		module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({
			mangle: false,
			sourceMap: true,
		}));
		break;
	case 'test':
		break;
	case 'dev':
		break;
	default:
		throw new Error('Unknown environment ' + parameters.environment);
}
