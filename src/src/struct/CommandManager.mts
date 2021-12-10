import { CollectionBasedManager } from "./CollectionBasedManager.mjs";
import { CollectionBasedManagerOptions } from "../types/index.mjs";
import { AliasesManager } from "./AliasesManager.mjs";
import { Command } from "./Command.mjs";

export class CommandManager extends CollectionBasedManager<Command> {
	public aliases: AliasesManager;

	constructor({ client }: CollectionBasedManagerOptions<Command>) {
		super({ client });

		this.aliases = new AliasesManager({ client, commands: this });
	}
}
