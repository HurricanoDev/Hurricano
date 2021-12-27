import Yargs, { Argv } from "yargs";
import type {
	ArgumentOptions,
	ArgumentResolver,
} from "../types/index.mjs";
import { False, DefaultArgumentParsers } from "./index.mjs";

export class Arguments {
	public yargs!: Argv;
	public content: {
		raw: string;
		clean: string;
	};
	public parsers!: ArgumentOptions["parsers"];

	public constructor(command: string, options: ArgumentOptions = {}) {
		Object.defineProperty(this, "yargs", { value: Yargs() });

		this.parsers = this.makeParsers(options.parsers);

		const parsed = this.yargs.parseSync(command);

		this.content = {
			raw: command,
			clean: parsed["_"].join(" "),
		};
	}
	private makeParsers(otherParsers?: ArgumentOptions["parsers"]) {
		let parsers: Record<string, typeof ArgumentResolver> = {};

		if (otherParsers) Object.assign(parsers, otherParsers);

		for (const defaultParser of Object.keys(DefaultArgumentParsers))
			parsers[defaultParser] ??= DefaultArgumentParsers[defaultParser];

		return parsers;
	}
	public async pick<T>(type: string, expected?: string) {}
}

// TODO: Fix attemptParse
// TODO: Add more types