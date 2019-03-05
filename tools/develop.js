
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const fork = require('child_process').fork;
const browserWebpackConfig = require('../webpack.browser.config');
const serverWebpackConfig = require('../webpack.server.config');
const parameters = require('../configs/parameters');

const debugPort = 9901
const watchOptions = {
	aggregateTimeout: 300
};
const statsOptions = {
	cached: false,
	colors: true,
	modules: false,
	chunks: false,
	assets: false
};

browserWebpackConfig.output.publicPath = '/';
browserWebpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
browserWebpackConfig.entry.push('webpack/hot/dev-server');

const browserCompiler = webpack(browserWebpackConfig);
const serverCompiler = webpack(serverWebpackConfig);

var serverProcess;
const serverWatcher = serverCompiler.watch(watchOptions, (error, stats) => {
	if (error) {
		console.error(error);
	} else {
		process.stdout.write('server target:' + '\n');
		process.stdout.write(stats.toString(statsOptions) + '\n');
		const serverPath = parameters.paths.distPath + '/server.js';
		const runStart = () => {
			console.info('Starting server');
			serverProcess = fork(serverPath);
			serverProcess.on('error', (error) => console.error(error));
		};
		if (serverProcess && serverProcess.connected) {
			console.info('Stopping server');
			serverProcess.on('close', () => runStart());
			serverProcess.kill();
		} else {
			runStart();
		}
	}
});

const webpackDevServer = new WebpackDevServer(browserCompiler, {
	contentBase: parameters.assetsPath,
	hot: true,
	// inline: true,
	https: parameters.secureClient,
	historyApiFallback: true,
	proxy: {
		"**": "http://localhost:" + parameters.server.port
	},
	publicPath: '/',
	filename: "bundle.js",
	watchOptions,
	headers: {
		"X-Webpack-Dev-Server": "yes"
	},
	stats: statsOptions
});
webpackDevServer.listen(debugPort, (error) => {
	if (error) {
		console.error(error);
	} else {
		console.info('Webpack Dev Server running on port ' + debugPort)
	}
});

process.on('exit', (code) => {
	serverProcess.kill();
	serverWatcher.close();
	webpackDevServer.close();
});