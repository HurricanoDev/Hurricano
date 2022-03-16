import { resolveErrorMessage } from "../util/index.mjs";
import { ErrorData } from "../types/index.mjs";

export class StructureError extends Error {
	public name: string;
	public code: string | null;
	public type: string;

	constructor(data: ErrorData) {
		const { message, code } = resolveErrorMessage(data);

		super(message);

		this.name = message;

		this.code = code;

		this.type = data.type as string;
	}
}
