import { Message } from "discord.js";
import {
	HurricanoClient,
	CommandManager,
	Command,
	False,
} from "../struct/index.mjs";

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
	type?: string;
	path?: string;
	run({
		message,
		args,
	}: {
		message: Message;
		args: string[];
	}): Promise<any> | any;
}

export interface CommandManagerOptions
	extends CollectionBasedManagerOptions<Command> {
	path: string;
}

export interface ArgumentOptions {
	parsers?: Record<string, typeof ArgumentResolver>;
	flagTypes?: Record<string, string>;
}

export const ArgumentResolver: (
	string: string,
	...args: any[],
) => Promise<any> | any | typeof False;

export interface ArgumentFlags {
	name: string;
	exists: boolean;
	value?: any;
}

export type ArgumentFlagsConfig = Record<string, string>;

export type UnPromisify<T> = T extends Promise<infer U> ? U : T;

export type ArgumentTypes<T> = "string" | "number" | T;