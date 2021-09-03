const Discord = require("discord.js"),
	overrides = Object.keys(Discord),
	{ resolve } = require("path"),
	{ readdirSync } = require("fs"),
	{ bindObject } = require("./Utils.js");

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
	loadAll(_path) {
		const path = _path["path"] ?? _path;

		for (const { name, extend } of readdirSync(resolve(path)).map((file) =>
			require(file),
		))
			this.extend(
				name,
				typeof extend === "function"
					? extend({ [name]: Discord[name], bind: bindObject })
					: extend,
			);
	}
}

module.exports = new Structures();
