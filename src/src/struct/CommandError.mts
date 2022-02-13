import { resolveErrorMessage } from "../util/index.mjs";
import { ErrorData } from "../types/index.mjs";

export class CommandError extends Error {
	public name: string;
	public code: string | null;
	public type: string;
	public commandName?: string;

	constructor(data: ErrorData) {
		const { message, code } = resolveErrorMessage(data);

		super(message);

		this.name = message;

		this.code = code;

		this.type = data.type as string;

		if (data.commandName) this.commandName = data.commandName;
	}
}
