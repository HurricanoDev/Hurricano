import { Channel, Guild, Message } from "discord.js";
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

export interface ArgumentOptions<guildOptional extends boolean = false> {
	parsers?: Record<string, typeof ArgumentResolver>;
	flagTypes: Record<string, string>;
	arg: string;
	args: string[];
	guild: guildOptional extends true ? Guild : undefined;
	message: Message;
	channel: Channel;
	client: HurricanoClient;
	fetch?: boolean;
}

export function ArgumentResolver(
	options: ArgumentOptions<boolean>,
): any | typeof False;

export interface ArgumentFlags {
	name: string;
	exists: boolean;
	value?: any;
}

export type ArgumentFlagsConfig = Record<string, string>;

export type UnPromisify<T> = T extends Promise<infer U> ? U : T;

export interface ArgumentContent extends Array<string> {
	raw: string[];
}

export interface ArgumentParserOptions {
	content: string[];
	client: HurricanoClient;
	message: Message;
	fetch?: boolean;
}

export interface ErrorData {
	type: string | number;
	message?: string;
	name?: string;
	expected?: string;
	received?: string;
}
