import { CollectionBasedManager } from "./CollectionBasedManager.mjs";
import { AliasesManagerOptions } from "../types/index.mjs";
import { CommandManager } from "./CommandManager.mjs";
import { Command } from "./Command.mjs";

export class AliasesManager extends CollectionBasedManager<string> {
	public commands: CommandManager;
	public resolveCommand: CommandManager["resolveCommand"];

	constructor({ commands, ...args }: AliasesManagerOptions) {
		super(args);

		this.commands = commands;

		this.resolveCommand = commands.resolveCommand;
	}
	public findCommand(alias: string): Command | void {
		return this.commands.get(this.get(alias)!);
	}
	public resolveName(command: string): string | void {
		return this.commands.resolveCommand(command)?.name;
	}
}
