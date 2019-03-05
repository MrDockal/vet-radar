module.exports = {
	test: /\.(t|j)sx?$/,
	// pretty-bytes because is written in ES6
	exclude: /node_modules(?!\/pretty-bytes)/,
	use: {
		loader: 'babel-loader',
		options: {
			presets: ['env']
		},
	},
	enforce: "post"
};
