export * from "./Constants.mjs";
import { Type } from "@sapphire/type";
export function getDataType(data) {
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
