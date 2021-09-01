const overrides = Object.keys(require("discord.js")),
	{ resolve } = require("path");

class Structures {
	extend(structure, callback) {
		const fullPath = resolve(
			require
				.resolve("discord.js")
				.replace("index.js", `/structures/${structure}.js`),
		);
		const original = require(fullPath);
		const modified = callback(original);
		require.cache[fullPath].exports = overrides[fullPath] = modified;
		const dependencies = Object.keys(require.cache).filter((key) =>
			require.cache[key].children?.find((child) => child.id === fullPath),
		);
		for (const dependency of dependencies) {
			if (!overrides[dependency]) {
				delete require.cache[dependency];
				require(dependency);
			}
		}
	}
}

module.exports = new Structures();
