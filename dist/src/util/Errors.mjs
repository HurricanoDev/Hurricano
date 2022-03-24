import { Constants } from "./index.mjs";
import { BaseErrorContext } from "./index.mjs";
import { createContext, runInContext } from "vm";
const EnumCodes = {}, ErrorTypes = Object.keys(Constants.Errors), AllErrors = [].concat(...ErrorTypes.map((x) => Object.keys(Constants.Errors[x])));
for (let x = 1; x < AllErrors.length + 1; ++x)
    EnumCodes[x] = AllErrors[x];
export function errorMessageResolver(data) {
    const code = EnumCodes[data.type], message = `[${EnumCodes[data.type]}]` + runInContext(code, createContext(Object.assign(BaseErrorContext, Object.create(data.args))));
    return {
        message,
        code,
    };
}
