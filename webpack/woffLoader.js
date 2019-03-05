module.exports = {
	test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
	loader: "url-loader",
	options: {
		limit: 10000,
		mimetype: 'application/font-woff'
	},
};
