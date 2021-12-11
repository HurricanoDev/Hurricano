import { CommandOptions } from "../types/index.mjs";

export class Command {
	public name: string;
	public description: string;
	public run: CommandOptions["run"];
	public type!: string;
	public path!: string;

	constructor({ name, description, run, type, path }: CommandOptions) {
		this.name = name;

		this.description = description;

		this.run = run;

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
}
