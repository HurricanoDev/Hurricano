const { Collection } = require("discord.js"),
  { readdir } = require("fs"),
  { resolve } = require("path"),
  // eslint-disable-next-line no-unused-vars
  Command = require("./Command.js"),
  // eslint-disable-next-line no-unused-vars
  { HurricanoClient } = require("./Client.js");

/**
 * Manager to load commands.
 * @extends {Collection}
 * @property {String} path
 */

module.exports = class ClientCommandsManager extends Collection {
  constructor({ client }) {
    super();

    /**
     * Command path.
     * @type {?String}
     */

    this.path = null;

    /**
     * Whether the commands are loaded.
     * @type {Boolean}
     */

    this.loaded = false;

    /**
     * Hurricano's client.
     * @type {HurricanoClient}
     */

    this.client = client;

    /**
     * How many times the commands have been reloaded.
     * @type {Number}
     */

    this.reloaded = 0;
  }
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
    }

    this.loaded = true;
    return commands;
  }

  /**
   * Reload all commands.
   * @returns {Object<String, Command>}
   */

  async reload() {
    super.clear();
    this.reloaded++;
    return await this.load();
  }
};
