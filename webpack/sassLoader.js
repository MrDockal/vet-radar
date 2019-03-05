const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	test: /\.sass$/,
	use: ExtractTextPlugin.extract({
		fallback: 'style-loader',
		use: [
			'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
			'sass-loader?sourceMap',
		],
	})
};
