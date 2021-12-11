import type { ArgumentResolver } from "../types/index.mjs";

export { AliasesManager } from "./AliasesManager.mjs";
export { CollectionBasedManager } from "./CollectionBasedManager.mjs";
export { Command } from "./Command.mjs";
export { CommandManager } from "./CommandManager.mjs";
export { HurricanoClient } from "./HurricanoClient.mjs";
export const False = class False {};

export const DefaultArgumentParsers: Record<string, typeof ArgumentResolver> = {
	string: (string: string): string | typeof False => {
		if (!parseInt(string)) return string;
		else return False;
	},
	number: (string: string): number | typeof False => {
		if (parseInt(string)) return parseInt(string);
		else return False;
	},
};
