import { resolveErrorMessage, ErrorArgs } from "#util";

export class CommandError extends Error {
    public type: number;
	public name: string;
	public code: string | null;
	public command?: string;

	constructor(data: ErrorArgs["Command"] & { type: number }) {
		const { message, code } = resolveErrorMessage<"Command">({ type: 4, args: data });

		super(message);

		this.name = message;

		this.code = code;

		this.type = data.type;

		if (data.command) this.command = data.command;
	}
}
