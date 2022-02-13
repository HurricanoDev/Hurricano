import Constants from "./Constants.mjs";
import { ErrorData } from "../types/index.mjs";
import { Type } from "@sapphire/type";

export { Constants };

const {
	errors: { command: CommandErrors },
} = Constants;

export function getVariableType(data: any): string {
	return new Type(data).toString();
}

export function resolveErrorType(type: string | number) {
	if (typeof type === "string") return type;

	switch (type) {
		case 1:
			return "IncorrectParameterType";
		case 2:
			return "NoParameter";
		case 3:
			return "Custom";
	}
}

export function resolveErrorMessage(data: ErrorData): {
	message: string;
	code: string | null;
} {
	const {
			type: RawType,
			name,
			expected: _expected,
			received: _received,
			message: Message,
		} = data,
		type = resolveErrorType(RawType),
		expected =
			typeof _expected === "string"
				? _expected
				: new Type(_expected).toString(),
		received =
			typeof _received === "string"
				? _received
				: new Type(_received).toString();

	let message = "",
		code: string | null = null;

	switch (type) {
		case "IncorrectParameterType": {
			message = `[${CommandErrors.IncorrectParameterType}] An invalid type was provided for property "${name}". Expected "${expected}", but received "${received}".`;
			code = CommandErrors.IncorrectParameterType;

			break;
		}
		case "NoParameter": {
			message = `[${CommandErrors.NoParameter}] Property "${name}" is required, but its value was not provided, or is falsey.`;
			code = CommandErrors.NoParameter;

			break;
		}
		case "Custom": {
			message = Message!;
			code = null;

			break;
		}
	}

	return { message, code };
};

export const Regexes = {
	CodeBlocks: /```(\w*)(.+)```/ms,
	RemoveYargsQuotes: /^["'](.+(?=["']$))["']$/,
};