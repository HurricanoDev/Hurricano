import { HurricanoClient } from "../struct/HurricanoClient.mjs";
import { Message } from "discord.js";
import { CommandManager } from "../struct/CommandManager.mjs";

export interface CollectionBasedManagerOptions<DataType> {
	client: HurricanoClient;
	data?: Iterable<[string, DataType]>;
}

export interface AliasesManagerOptions
	extends CollectionBasedManagerOptions<string> {
	commands: CommandManager;
}

export interface CommandOptions {
	name: string;
	description: string;
	aliases?: string[];
	cooldown?: number;
	run({
		message,
		args,
	}: {
		message: Message;
		args: string[];
	}): Promise<any> | any;
}
