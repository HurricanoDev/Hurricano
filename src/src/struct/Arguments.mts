import type { Message, Guild, Channel } from "discord.js";
import Yargs, { Argv } from "yargs";
import type {
	ArgumentOptions,
	ArgumentResolver,
	ArgumentContent,
} from "../types/index.mjs";
import { DefaultArgumentParsers } from "./index.mjs";
import { HurricanoClient } from "../struct/index.mjs";

export class Arguments {
	public yargs!: Argv;
	public content: ArgumentContent;
	public parsers!: ArgumentOptions["parsers"];
	public client!: HurricanoClient;
	public message!: Message;
	public guild?: Guild;
	public flagTypes!: Record<string, string>;
	public channel!: Channel;

	public constructor({
		args,
		parsers,
		client,
		message,
		guild,
		flagTypes,
		channel,
	}: ArgumentOptions) {
		Object.defineProperties(this, {
			yargs: {
				enumerable: false,
				value: Yargs(),
			},
			client: {
				enumerable: false,
				value: client,
			},
			parsers: {
				enumerable: false,
				value: this.makeParsers(parsers),
			},
			message: {
				enumerable: false,
				value: message,
			},
			guild: {
				enumerable: false,
				value: guild,
			},
			flagTypes: {
				enumerable: false,
				value: flagTypes,
			},
			channel: {
				enumerable: false,
				value: channel,
			},
		});

		const parsed = this.yargs.parseSync(args);
		this.content = parsed["_"].map((x) =>
			String(x).replace(/['"]+/g, ""),
		) as any as ArgumentContent;

		Object.defineProperty(this.content, "raw", {
			enumerable: false,
			value: args,
		});
	}
	private makeParsers(otherParsers?: ArgumentOptions["parsers"]) {
		let parsers: Record<string, typeof ArgumentResolver> = {};

		if (otherParsers) Object.assign(parsers, otherParsers);

		for (const defaultParser of Object.keys(DefaultArgumentParsers))
			parsers[defaultParser] ??= DefaultArgumentParsers[defaultParser];

		return parsers;
	}
	public async pick<T>(
		type: string,
		{ expected }: { expected?: string; fetch?: boolean },
	): Promise<T | null> {
		const parser = this.parsers![type]!;
		for (const arg of this.content) {
			const value = await parser({
				arg,
				args: this.content,
				flagTypes: this.flagTypes,
				message: this.message,
				guild: this.guild as undefined,
				client: this.client,
				channel: this.channel,
			});

			if (value?.constructor.name === "False") return value;
		}

		return null;
	}
}
