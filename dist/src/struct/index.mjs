export function isFunctionVariant(x) {
    return typeof x !== "function"
        ? ""
        : Object.hasOwnProperty.call(x, "arguments")
            ? "function"
            : x.prototype
                ? "class"
                : x.constructor.name === "AsyncFunction"
                    ? "async"
                    : "arrow";
}
import { HurricanoClient } from "./HurricanoClient.mjs";
export { Config } from "./Config.mjs";
export { AliasesManager } from "./AliasesManager.mjs";
export { CollectionBasedManager } from "./CollectionBasedManager.mjs";
export { Command } from "./Command.mjs";
export { CommandManager } from "./CommandManager.mjs";
export { HurricanoClient };
export { ErisExtension } from "./ErisExtension.mjs";
export class False {
}
export const DefaultArgumentParsers = {
    string({ arg }) {
        return arg;
    },
    number({ arg }) {
        if (parseInt(arg))
            return parseInt(arg);
        else
            return False;
    },
    boolean({ arg }) {
        const ret = toBoolean(arg);
        if (ret)
            return ret;
        else
            return False;
    },
    async channel({ arg, guild, fetch, message, }) {
        const channel = message.channelMentions ?? fetch
            ? await guild.getRESTChannel(arg)
            : guild.channels.get(arg);
        return channel ?? False;
    },
    async TextChannel({ arg, guild, fetch, }) {
        const channel = await this.channel({
            arg,
            guild,
            fetch,
        });
        return channel instanceof False
            ? False
            : channel.isText()
                ? channel
                : False;
    },
};
export function toBoolean(string) {
    return string === "true" ? true : string === "false" ? false : null;
}
export function removeMentions(string) {
    return string.replaceAll("@", "@\u200b");
}
