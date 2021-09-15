import moduleAlias from "../utilities/module-alias.js";
import { Intents, Collection } from "discord.js";
import HurricanoClient from "@structures/Client.js";
import config from "@config";
import "@root/website/index.js";
moduleAlias();
const intents = new Intents();
global.Collection = Collection;
intents.add("GUILD_PRESENCES", "GUILD_MEMBERS", "GUILDS", "GUILD_VOICE_STATES", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS");
const client = new HurricanoClient(config, {
    intents,
    allowedMentions: { parse: ["users"], repliedUser: false },
});
global.client = client;
// website initialization
if (client.config.website.enabled) {
}
async function init() {
    await client.commands.load("./bot/commands");
    client.loadEvents();
    await client.loadTopgg();
    client.db.init();
    client.connect();
}
init();
process.on("unhandledRejection", client.logger.warn.call);
