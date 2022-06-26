const { CracoAliasPlugin, configPaths } = require('react-app-rewire-alias');

const alias = configPaths('./tsconfig.base.json');

module.exports = {
	webpack: {
		configure: config => ({
			...config,
			ignoreWarnings: [/Failed to parse source map/],
			stats: 'errors-only'
		})
	},
	plugins: [
		{
			plugin: CracoAliasPlugin,
			options: { alias }
		}
	]
};
