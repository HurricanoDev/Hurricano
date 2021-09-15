import CollectionBasedManager from "./CollectionBasedManager.js";
import { readdirSync as readdir } from "fs";
import { resolve } from "path";
import AsciiTable from "ascii-table";
import ClientAliasesManager from "./ClientAliasesManager.js";
export default (class ClientCommandsManager extends CollectionBasedManager {
    constructor({ client, input }) {
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
     * @returns {Record<String, Command>}
     */
    async load(pathRaw) {
        Object.defineProperty(this, "path", { value: pathRaw });
        const table = new AsciiTable("Client Commands").setHeading("Command File", "Command Name", "Command Category", "Aliases", "Load status"), path = resolve(pathRaw || this.path), commandFolders = readdir(path).filter((dir) => [".js", ".json", ".md", ".ts"].some((ending) => !dir.endsWith(ending))), commands = {};
        for await (const folder of commandFolders) {
            commands[folder] = [];
            const commandFiles = readdir(resolve(path, folder));
            for (const file of commandFiles) {
                try {
                    (commands[folder] = command), (command.category = folder);
                    if (commands.aliases)
                        for (const ali of command.aliases)
                            this.aliases.add(ali, command.name);
                    table.addRow(file, command.name, folder, command.aliases ? command.aliases.join(", ") : "None.", "Loaded!");
                    super.set(command.name, command);
                }
                catch (e) {
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
});
