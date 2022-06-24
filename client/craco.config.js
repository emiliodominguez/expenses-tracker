const { CracoAliasPlugin, configPaths } = require('react-app-rewire-alias');

const alias = configPaths('./tsconfig.base.json');

module.exports = {
	plugins: [
		{
			plugin: CracoAliasPlugin,
			options: { alias }
		}
	]
};
