const path = require('path');

const clientConfig = {
	target: 'web',
	mode: 'production',
	entry: {
		form_filler: './src/form_filler.ts'
	},
	module: {
		rules: [
			{
				test: /\.ts?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.ts']
	},
	output: {
		filename: '[name].min.js',
		path: path.resolve(__dirname, 'dist/content_scripts'),
	}
};

module.exports = clientConfig;
