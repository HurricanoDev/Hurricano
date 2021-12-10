import { CollectionBasedManager } from "./CollectionBasedManager.mjs";
import { AliasesManagerOptions } from "../types/index.mjs";
import { CommandManager } from "./CommandManager.mjs";

export class AliasesManager extends CollectionBasedManager<string> {
	public commands: CommandManager;

	constructor(args: AliasesManagerOptions) {
		super(args);

		this.commands = args.commands;
	}
}
