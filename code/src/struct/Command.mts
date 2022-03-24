import { CommandOptions, ErrorEnums } from "#types";
import { HurricanoClient } from "./HurricanoClient.mjs";
import { CommandError } from "./CommandError.mjs";

export class Command {
	public name: string;
	public description: string;
	public aliases: string[] = [];
	public cooldown: number;
	public type!: string;
	public path!: string;
	public client: HurricanoClient;

	constructor(client: HurricanoClient, options: CommandOptions) {
		Command.validateOptions(client, options);

		const { name, description, aliases, cooldown, type, path } = options;

		this.client = client;

		this.name = name;

		this.description = description;

		if (aliases)
			for (const ali of aliases) {
				this.aliases.push(ali);

				this.client.commands.aliases.set(ali, name);
			}

		this.cooldown = cooldown ?? 3;

		if (type) this.type = type;

		if (path) this.path = path;
	}
	public setPath(path: string, OnlyIfExists?: boolean): boolean {
		if (OnlyIfExists) this.path ??= path;
		else this.path = path;

		return true;
	}
	public setType(type: string, OnlyIfExists?: boolean): boolean {
		if (OnlyIfExists) this.type ??= type;
		else this.type = type;

		return true;
	}
    private static notThere(key: string, object: any): boolean {
        return key in object;
    }
	private static validateOptions(
		client: HurricanoClient,
		Options: CommandOptions,
	): void {
        const { name, description, aliases, type, path } = Options;

		if (!name)
			throw new CommandError({
				name: "name",
				type: ErrorEnums.ParameterNotProvided,
				expected: "String",
			});

		if (typeof name !== "string")
			throw new CommandError({
				name: "name	",
				type: ErrorEnums.IncorrectParameterType,
				expected: "String",
				received: name,
			});

		const command = name;

		if (!description)
			throw new CommandError({
				name: "description",
				type: ErrorEnums.ParameterNotProvided,
				expected: "String",
				command,
			});

		if (typeof description !== "string")
			throw new CommandError({
				name: "description",
				type: ErrorEnums.IncorrectParameterType,
				expected: "String",
				received: description,
				command,
			});

		if (aliases) {
			if (!Array.isArray(aliases))
				throw new CommandError({
					name: "aliases",
					type: ErrorEnums.IncorrectParameterType,
					expected: "Array<string>",
					received: aliases,
					command,
				});

			for (const ali of aliases)
				if (typeof ali !== "string")
					throw new CommandError({
						name: "aliases[0]",
						type: ErrorEnums.IncorrectParameterType,
						expected: "String",
						received: ali,
						command,
					});
		}

		if (type && typeof type !== "string")
			throw new CommandError({
				name: "type",
				type: ErrorEnums.IncorrectParameterType,
				expected: "String",
				received: type,
				command,
			});

		if (path && typeof path !== "string")
			throw new CommandError({
				name: "path",
				type: ErrorEnums.IncorrectParameterType,
				expected: "String",
				received: path,
				command,
			});
	}
}
