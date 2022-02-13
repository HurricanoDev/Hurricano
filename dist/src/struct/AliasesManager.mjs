import { CollectionBasedManager } from "./CollectionBasedManager.mjs";
export class AliasesManager extends CollectionBasedManager {
    commands;
    resolveCommand;
    constructor({ commands, ...args }) {
        super(args);
        this.commands = commands;
        this.resolveCommand = commands.resolveCommand;
    }
    findCommand(alias) {
        return this.commands.get(this.get(alias));
    }
    resolveName(command) {
        return this.commands.resolveCommand(command)?.name;
    }
}
