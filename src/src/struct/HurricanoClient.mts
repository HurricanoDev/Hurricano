import { Client } from "discord.js";
import { CommandManager } from "./CommandManager.mjs";

export class HurricanoClient extends Client {
	public commands: CommandManager;

	constructor() {
		super({ intents: 32767 });

		this.commands = new CommandManager({
			client: this,
			path: "./src/commands"
		});
	}
}
