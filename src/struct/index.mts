export function isFunctionVariant(
	x: any,
): "" | "function" | "class" | "async" | "arrow" {
	return typeof x !== "function"
		? ""
		: Object.hasOwnProperty.call(x, "arguments")
		? "function"
		: x.prototype
		? "class"
		: x.constructor.name === "AsyncFunction"
		? "async"
		: "arrow";
}

import type { Channel } from "discord.js";
import { TextChannel } from "discord.js";
import type { ArgumentResolver, ArgumentOptions } from "../types/index.mjs";
import { HurricanoClient } from "./HurricanoClient.mjs";

export { Config, ConfigOptions } from "./Config.mjs";
export { AliasesManager } from "./AliasesManager.mjs";
export { CollectionBasedManager } from "./CollectionBasedManager.mjs";
export { Command } from "./Command.mjs";
export { CommandManager } from "./CommandManager.mjs";
export { HurricanoClient };

export class False {}

export const DefaultArgumentParsers: Record<string, typeof ArgumentResolver> = {
	string({ arg }): string | typeof False {
		return arg;
	},
	number({ arg }): number | typeof False {
		if (parseInt(arg)) return parseInt(arg);
		else return False;
	},
	boolean({ arg }): boolean | typeof False {
		const ret = toBoolean(arg);

		if (ret) return ret as boolean;
		else return False;
	},
	async channel({
		arg,
		guild,
		fetch,
		message,
	}: ArgumentOptions<true>): Promise<Channel | typeof False> {
		const channel =
			message.mentions.channels.first() ?? fetch
				? await guild.channels.fetch(arg)
				: guild.channels.cache.get(arg);

		return channel ?? False;
	},
	async TextChannel({
		arg,
		guild,
		fetch,
	}): Promise<TextChannel | typeof False> {
		const channel = await this.channel({
			arg,
			guild,
			fetch,
		} as ArgumentOptions);

		return channel instanceof False
			? False
			: channel.isText()
			? (channel as TextChannel)
			: False;
	},
};

export function toBoolean(string: string): boolean | null {
	return string === "true" ? true : string === "false" ? false : null;
}

export function removeMentions(string: string): string {
	return string.replaceAll("@", "@\u200b");
}
