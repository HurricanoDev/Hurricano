import Yargs, { Argv } from "yargs";
import type {
	ArgumentOptions,
	ArgumentResolver,
	ArgumentFlags,
	UnPromisify,
	ArgumentFlagsConfig,
} from "../types/index.mjs";
import { False, DefaultArgumentParsers } from "./index.mjs";

export class Arguments {
	public yargs!: Argv;
	public content: string;
	public parsers!: ArgumentOptions["parsers"];
	public flags!: Record<string, ArgumentFlags>;

	constructor(command: string, options: ArgumentOptions = {}) {
		Object.defineProperty(this, "yargs", { value: Yargs() });

		this.parsers = this.makeParsers(options.parsers);

		const parsed = this.yargs.parseSync(command);

		this.content = parsed["_"].join(" ");

		this.resolveTypes(parsed, options.flagTypes);
	}
	private makeParsers(otherParsers?: ArgumentOptions["parsers"]) {
		let parsers: Record<string, typeof ArgumentResolver> = {};

		if (otherParsers) Object.assign(parsers, otherParsers);

		for (const defaultParser of Object.keys(DefaultArgumentParsers))
			parsers[defaultParser] ??= DefaultArgumentParsers[defaultParser];

		return parsers;
	}
	private resolveTypes(
		parsed: UnPromisify<Argv["argv"]>,
		flagTypes?: ArgumentFlagsConfig,
	) {
		const flags: Record<string, ArgumentFlags> = {};

		if (flagTypes)
			for (const [name, expected] of Object.entries(flagTypes)) {
				const flagValue = parsed[name] as string;

				let converted;

				if (flagTypes[expected])
					converted = this.parsers![flagTypes[expected]](flagValue);
				else converted = this.attemptParse(flagValue);

				flags[name] = { name, exists: true, value: converted };
			}

		this.flags = flags;

		return flags;
	}
	private attemptParse(value: string): string | number | undefined {
		let parsed;

		for (const generator of Object.values(DefaultArgumentParsers)) {
			const temporary = generator(value);

			if (!Object.is(temporary, False)) {
				parsed = temporary;

				break;
			} else continue;
		}

		return parsed;
	}
}

// TODO: Fix attemptParse
// TODO: Add more types