import { Client } from "discord.js";
import { CommandManager } from "./CommandManager.mjs";
import { AliasesManager } from "./AliasesManager.mjs";
import { ClientOptions } from "../types/index.mjs";
import { Config } from "./Config.mjs";

export class HurricanoClient extends Client {
	public commands: CommandManager;
	public aliases: AliasesManager;
	public config: Config;

	constructor({ config }: ClientOptions) {
		super({ intents: 32767 });

		this.commands = new CommandManager({
			client: this,
			path: "./src/commands",
		});

		this.aliases = this.commands.aliases;

		this.config = config;
	}
}
