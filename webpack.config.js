const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
	target: 'web',
	entry: {
		'scripts/index': './src/pages/index.tsx',
		'scripts/background': './src/utils/background.ts',
		'scripts/external-integration': './src/utils/external-integration.ts'
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'build')
	},
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.(tsx|ts)?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/i,
				include: path.resolve(__dirname, 'src'),
				use: ['style-loader', 'css-loader', 'postcss-loader']
			},
			{
				test: /\.(svg|png)$/,
				loader: 'file-loader',
				options: {
					outputPath: 'assets/images'
				}
			}
		]
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{
					from: 'static',
					to: ''
				}
			]
		})
	],
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx'],
		modules: ['src', 'node_modules']
	}
}