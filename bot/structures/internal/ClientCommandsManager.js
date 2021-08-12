const CollectionBasedManager = require("./CollectionBasedManager.js"),
  { readdir } = require("fs/promises"),
  { resolve } = require("path"),
  // eslint-disable-next-line no-unused-vars
  Command = require("./Command.js"),
  AsciiTable = require("ascii-table"),
  ClientAliasesManager = require("./ClientAliasesManager.js");

/**
 * Manager to load commands.
 * @extends {CollectionBasedManager}
 * @property {?String} path Command path.
 * @property {Boolean} loaded Whether the commands have been loaded.
 * @property {ClientAliasesManager} aliases Command aliases.
 * @property {Boolean} reloaded How many times the commands have been reloaded.
 */

module.exports = class ClientCommandsManager extends CollectionBasedManager {
  constructor(a) {
    console.log(a);
    const { client, input } = a;
    super({ client, input });

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
     * Command aliases.
     * @type {ClientAliasesManager}
     */

    this.aliases = new ClientAliasesManager({ client });

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
    const table = new AsciiTable("Client Commands").setHeading(
        "Command File",
        "Command Name",
        "Command Category",
        "Aliases",
        "Load status",
      ),
      path = resolve(pathRaw || this.path),
      commandFolders = (await readdir(path)).filter((dir) =>
        [".js", ".json", ".md"].some((ending) => dir.endsWith(ending)),
      ),
      commands = {};

    for await (const folder of commandFolders) {
      commands[folder] = [];
      const commandFiles = await readdir(resolve(path, folder));

      for (const file of commandFiles) {
        try {
          const command = require(resolve(path, folder, file));
          (commands[folder] = command), (command.category = folder);

          if (commands.aliases)
            for (const ali of command.aliases)
              this.aliases.add(ali, command.name);

          table.addRow(
            file,
            command.name,
            folder,
            command.aliases ? command.aliases.join(", ") : "None.",
            "Loaded!",
          );
          super.set(command.name, command);
        } catch (e) {
          this.client.logger.error(e);
        }
      }
    }

    this.loaded = true;
    this.client.logger.client("\n" + table);
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

  /**
   *
   * @param {String} string String to find command with.
   * @returns  {Command}
   */

  resolve(string) {
    return this.get(string) || this.get(this.aliases.get(string));
  }
};
