import { Snowflake } from "discord.js";

export interface ConfigOptions {
	token: string;
	prefixes: string[];
	apis: {
		TopGG?: string;
		Statcord?: string;
	};
	MongoDBUri: string;
	botChannels: {
		bugReport: Snowflake;
		feedback: Snowflake;
		serverJoin: Snowflake;
	};
	isModified: boolean;
}

export interface Config extends ConfigOptions {}

export class Config {
	public usesEnv = false;

	public constructor(options?: ConfigOptions) {
		if (options) {
			this.usesEnv = false;

			Object.assign(this, options);
		}
	}
	public fillInEnvironmentalVariables(): void {
		Object.assign(this, JSON.parse(process.env.CONFIG!));

		this.isModified = true;

		this.usesEnv = true;
	}
}
