import { resolveErrorMessage } from "../util/index.mjs";
export class CommandError extends Error {
    name;
    code;
    type;
    commandName;
    constructor(data) {
        const { message, code } = resolveErrorMessage(data);
        super(message);
        this.name = message;
        this.code = code;
        this.type = data.type;
        if (data.commandName)
            this.commandName = data.commandName;
    }
}
