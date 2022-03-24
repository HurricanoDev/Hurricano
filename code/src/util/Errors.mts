import { default as Constants, ErrorArgs, ErrorTypes as ErrorKeys } from "./Constants.mjs";
import { ErrorArgsMerger } from "#types";
import { BaseErrorContext } from "./index.mjs";
import { createContext, runInContext } from "vm";

export const ErrorEnumCodes: Record<number, string> = {},
	ErrorTypes: ErrorKeys[] = Object.keys(
		Constants.Errors,
	) as any[],
	AllErrors = [].concat(
		...(ErrorTypes.map((x) => Object.keys(Constants.Errors[x as keyof typeof Constants.Errors])) as any[]),
	) as string[];

for (let x = 1; x < AllErrors.length + 1; ++x) ErrorEnumCodes[x] = AllErrors[x];

export function resolveErrorMessage<T extends ErrorKeys>(data: ErrorArgsMerger<ErrorArgs[T]>): {
	message: string;
	code: string | null;
} {
	const code = ErrorEnumCodes[data.type],
		message = `[${ErrorEnumCodes[data.type]}] ` + runInContext(
			code,
			createContext(
				Object.assign(BaseErrorContext, Object.create(data.args!)),
			),
		);

	return {
		message,
		code,
	};
}
