import { CollectionBasedManager } from "./CollectionBasedManager.mjs";
import { CommandManagerOptions } from "../types/index.mjs";
import { AliasesManager } from "./AliasesManager.mjs";
import { Command } from "./Command.mjs";
import { opendir } from "fs/promises";
import { resolve, dirname, basename } from "path";

export class CommandManager extends CollectionBasedManager<Command> {
	public aliases: AliasesManager;
	public resolveName: AliasesManager["resolveName"];
	public path: string;

	constructor({ client, path }: CommandManagerOptions) {
		super({ client });

		this.aliases = new AliasesManager({ client, commands: this });

		this.resolveName = this.aliases.resolveName;

		this.path = path;
	}
	public resolveCommand(command: string): Command | void {
		return this.aliases.has(command)
			? this.get(this.aliases.get(command)!)
			: this.get(command);
	}
	public async *readAll(
		basePath?: string,
	): AsyncGenerator<Command, void, void> {
		const path = basePath || this.path,
			dir = await opendir(path),
			category = this._resolveCategory(path);

		for await (const file of dir)
			switch (true) {
				case file.isFile(): {
					const command = await this.read(resolve(path, file.name));

					if (command) yield command!;

					continue;
				}
				case file.isDirectory(): {
					if (file.name.includes(".except")) continue;

					yield* this.readAll(resolve(path, file.name));
				}
			}
	}
	public async read(path: string): Promise<Command | void> {
		if (
			!path.endsWith(".mjs") ||
			path.endsWith(".except.mjs") ||
			path.endsWith(".mts")
		)
			return;

		const { default: command }: { default: Command } = await import(
				"file://" + path
			),
			category = this._resolveCategory(path);

		command.setType(category, true);
		command.setPath(path, true);

		return command;
	}
	public async loadAll(path?: string): Promise<Record<string, Command>> {
		const commands = await this.readAll(path),
			table: Record<string, Command> = {};

		for await (const command of commands) table[command.name] = command;

		return table;
	}
	private _resolveCategory(path: string): string {
		return basename(dirname(path));
	}
}
