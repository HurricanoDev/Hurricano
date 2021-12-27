import type { Channel, Guild } from "discord.js";
import { TextChannel } from "discord.js";
import type { ArgumentResolver } from "../types/index.mjs";
import { HurricanoClient } from "./HurricanoClient.mjs";

export { AliasesManager } from "./AliasesManager.mjs";
export { CollectionBasedManager } from "./CollectionBasedManager.mjs";
export { Command } from "./Command.mjs";
export { CommandManager } from "./CommandManager.mjs";
export { HurricanoClient };

export const False = class False {};

export const DefaultArgumentParsers: Record<string, typeof ArgumentResolver> = {
	string (string: string): string | typeof False {
		if (!parseInt(string)) return string;
		else return False;
	},
	number (string: string): number | typeof False {
		if (parseInt(string)) return parseInt(string);
		else return False;
	},
	boolean (string: string): boolean | typeof False {
		if (Boolean(string)) return Boolean(string);
		else return False;
	},
	async channel(string: string, guild: Guild, fetch?: boolean): Promise<Channel | typeof False> {
		const channel = fetch ? await guild.channels.fetch(string) : guild.channels.cache.get(string);

		return channel ?? False;
	},
	async TextChannel(string: string, guild: Guild, fetch?: boolean): Promise<TextChannel | typeof False> {
		const channel = await this.channel(string, guild);

		return channel instanceof False ? False : channel.type === "GUILD_TEXT" ? channel as TextChannel : False;
	},


};
