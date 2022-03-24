import { Type } from "@sapphire/type";

export { default as Constants, ErrorArgs } from "./Constants.mjs";
export * from "./Errors.mjs";

export function getDataType(data: any): string {
	return new Type(data).toString();
}

export const Regexes = {
	CodeBlocks: /```(\w*)(.+)```/ms,
	UnescapedQuotes: /"([^"\\]*(\\.[^"\\]*)*)"|'([^'\\]*(\\.[^'\\]*)*)'/,
};

export const ErrorUtil = {
    getType: getDataType,
};

export const BaseErrorContext = {
    Utils: ErrorUtil,
};