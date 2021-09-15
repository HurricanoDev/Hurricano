import Discord from "discord.js";
import { resolve } from "path";
import { readdirSync } from "fs";
import utils from "./Utils.js";
const overrides = Object.keys(Discord), { bindObject } = utils;
class Structures {
    name;
    extend(structure, callback) {
        const fullPath = resolve(require
            .resolve("discord.js")
            .replace("index.js", `/structures/${structure}.js`));
        const modified = callback(original);
        require.cache[fullPath].exports = overrides[fullPath] = modified;
        const dependencies = Object.keys(require.cache).filter((key) => require.cache[key].children?.find((child) => child.id === fullPath));
        for (const dependency of dependencies) {
            if (!overrides[dependency]) {
                delete require.cache[dependency];
            }
        }
    }
    loadAll(_path) {
        const path = _path["path"] ?? _path;
    }
}
export default new Structures();
