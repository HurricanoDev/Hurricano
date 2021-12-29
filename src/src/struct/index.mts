import type { Channel, Guild } from "discord.js";
import { TextChannel } from "discord.js";
import type { ArgumentResolver, ArgumentOptions } from "../types/index.mjs";
import { HurricanoClient } from "./HurricanoClient.mjs";

export { AliasesManager } from "./AliasesManager.mjs";
export { CollectionBasedManager } from "./CollectionBasedManager.mjs";
export { Command } from "./Command.mjs";
export { CommandManager } from "./CommandManager.mjs";
export { HurricanoClient };

export const False = class False {};

export const DefaultArgumentParsers: Record<string, typeof ArgumentResolver> = {
	string({ arg }): string | typeof False {
		return arg;
	},
	number({ arg }): number | typeof False {
		if (parseInt(arg)) return parseInt(arg);
		else return False;
	},
	boolean({ arg }): boolean | typeof False {
		if (Boolean(arg)) return Boolean(arg);
		else return False;
	},
	async channel({
		arg,
		guild,
		fetch,
	}: ArgumentOptions<true>): Promise<Channel | typeof False> {
		const channel = fetch
			? await guild.channels.fetch(arg)
			: guild.channels.cache.get(arg);

		return channel ?? False;
	},
	async TextChannel({
		arg,
		guild,
		fetch,
	}): Promise<TextChannel | typeof False> {
		const channel = await this.channel({ arg, guild } as ArgumentOptions);

		return channel instanceof False
			? False
			: channel.type === "GUILD_TEXT"
			? (channel as TextChannel)
			: False;
	},
};
