const { Collection } = require("discord.js"),
  { readdir } = require("fs"),
  { resolve } = require("path"),
  // eslint-disable-next-line no-unused-vars
  Command = require("./Command.js");

module.exports = class ClientCommandsManager extends Collection {
    /**
     * Load the commands.
     * @param {String} pathRaw Path to load commands from.
     * @returns {Object<String, Command>}
     */

    async load(pathRaw) {
    Object.defineProperty(this, "path", { value: pathRaw });
    const path = resolve(pathRaw || this.path),
    commandFolders = await readdir(path),
    commands = {};

    for await (const folder of commandFolders) {
        commands[folder] = [];
         const commandFiles = await readdir(resolve(path, folder));
         for (const file of commandFiles) {
             const command = require(resolve(path, folder, file));
             commands[folder] = command;
            super.set(command.name, command);
         }   
    };
    return commands;
  }

  /**
   * Reload all commands.
   * @returns {Object<String, Command>}
   */

  async reload() {
      super.clear();
      return await this.load();
  }
};
