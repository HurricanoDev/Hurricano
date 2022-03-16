import Yargs from "yargs";
import { DefaultArgumentParsers } from "./index.mjs";
import { Regexes } from "../util/index.mjs";
const { CodeBlocks, RemoveYargsQuotes } = Regexes;
export class Arguments {
    yargs;
    content;
    parsers;
    flags;
    client;
    message;
    guild;
    flagTypes;
    channel;
    promise;
    constructor({ content, parsers, client, message, guild, flagTypes = {}, channel, }) {
        Object.defineProperties(this, {
            yargs: {
                enumerable: false,
                value: Yargs(),
            },
            client: {
                enumerable: false,
                value: client,
            },
            parsers: {
                enumerable: false,
                value: this.makeParsers(parsers),
            },
            message: {
                enumerable: false,
                value: message,
            },
            guild: {
                enumerable: false,
                value: guild,
            },
            flagTypes: {
                enumerable: false,
                value: flagTypes,
            },
            channel: {
                enumerable: false,
                value: channel,
            },
        });
        const parsed = this.yargs.parseSync(
        // eslint-disable-next-line quotes
        content.replace(CodeBlocks, '"$1$2"'));
        this.content = parsed["_"].map((x) => String(x).replace(RemoveYargsQuotes, "$0"));
        Object.defineProperty(this.content, "raw", {
            enumerable: false,
            value: content,
        });
        Object.defineProperty(this, "promise", {
            enumerable: false,
            value: new Promise(async (resolve) => {
                await this.makeFlags(Object.fromEntries(Object.keys(parsed)
                    .filter((x) => !["$0", "_"].includes(x))
                    .map((x) => [x, String(parsed[x])])));
                resolve();
            }),
        });
    }
    makeParsers(otherParsers) {
        const parsers = otherParsers ?? {};
        for (const defaultParser of Object.keys(DefaultArgumentParsers))
            parsers[defaultParser] ??= DefaultArgumentParsers[defaultParser];
        return parsers;
    }
    async makeFlags(obj) {
        const flags = {};
        for (const key of Object.keys(obj)) {
            if (!(key in this.flagTypes)) {
                flags[key] = obj[key];
                continue;
            }
            flags[key] = {
                name: key,
                value: await this.parsers[this.flagTypes[key]]({
                    arg: obj[key],
                    content: this.content.raw,
                    flagTypes: this.flagTypes,
                    message: this.message,
                    guild: this.guild,
                    client: this.client,
                    channel: this.channel,
                }),
            };
        }
        this.flags = flags;
    }
    wait() {
        return this.promise;
    }
    async pick(type, { fetch }) {
        const parser = this.parsers[type];
        for (const arg of this.content) {
            const value = await parser({
                arg,
                content: this.content.raw,
                flagTypes: this.flagTypes,
                message: this.message,
                guild: this.guild,
                client: this.client,
                channel: this.channel,
                fetch,
            });
            if (value?.constructor.name === "False")
                return value;
        }
        return null;
    }
}
