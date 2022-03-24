import { resolveErrorMessage } from "../util/index.mjs";
export class StructureError extends Error {
    name;
    code;
    type;
    constructor(data) {
        const { message, code } = resolveErrorMessage(data);
        super(message);
        this.name = message;
        this.code = code;
        this.type = data.type;
    }
}
