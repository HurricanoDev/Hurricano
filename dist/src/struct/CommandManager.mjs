import { CollectionBasedManager } from "./CollectionBasedManager.mjs";
import { AliasesManager } from "./AliasesManager.mjs";
import { opendir } from "fs/promises";
import { resolve, dirname, basename } from "path";
export class CommandManager extends CollectionBasedManager {
    aliases;
    resolveName;
    path;
    constructor({ client, path }) {
        super({ client });
        this.aliases = new AliasesManager({ client, commands: this });
        this.resolveName = this.aliases.resolveName;
        this.path = path;
    }
    resolveCommand(command) {
        return this.aliases.has(command)
            ? this.get(this.aliases.get(command))
            : this.get(command);
    }
    async *readAll(basePath) {
        const path = basePath || this.path, dir = await opendir(path), category = this._resolveCategory(path);
        for await (const file of dir)
            switch (true) {
                case file.isFile(): {
                    if (!file.name.endsWith(".mjs") ||
                        file.name.endsWith(".except.mjs") ||
                        file.name.endsWith(".mts"))
                        continue;
                    const { default: command } = await import("file://" + resolve(path, file.name));
                    command.setType(category, true);
                    command.setPath(resolve(path, file.name), true);
                    yield command;
                    break;
                }
                case file.isDirectory(): {
                    if (file.name.includes(".except"))
                        continue;
                    yield* this.readAll(resolve(path, file.name));
                }
            }
    }
    async read(path) {
        if (!path.endsWith(".mjs") ||
            path.endsWith(".except.mjs") ||
            path.endsWith(".mts"))
            return;
        const { default: command } = await import("file://" + path), category = this._resolveCategory(path);
        command.setType(category, true);
        command.setPath(path);
        return command;
    }
    async loadAll(path) {
        const commands = await this.readAll(path), table = {};
        for await (const command of commands)
            table[command.name] = command;
        return table;
    }
    _resolveCategory(path) {
        return basename(dirname(path));
    }
}
