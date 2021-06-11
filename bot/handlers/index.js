const { Intents } = require("discord.js");
const config = require('@config');
const Statcord = require("statcord.js");
require("module-alias/register");
const Client = require("@root/bot/Client.js");
const intents = new Intents();
intents.add(
  "GUILD_PRESENCES",
  "GUILD_MEMBERS",
  "GUILDS",
  "GUILD_VOICE_STATES",
  "GUILD_MESSAGES",
  "GUILD_MESSAGE_REACTIONS"
);

const client = new Client(config, {
  intents: intents,
  allowedMentions: { parse: ["users"], repliedUser: false },
  partials: ["MESSAGE", "REACTION"],
});
const statcord = new Statcord.Client({
    client,
    key: config.statcord,
    postCpuStatistics: false,
    postMemStatistics: false,
    postNetworkStatistics: false,
});

statcord.on("autopost-start", () => {
    client.logger.info("[STATCORD] Started autopost.");
});

statcord.on("post", status => {
    if (!status) client.logger.info("[STATCORD] Successful post");
    else console.error(status);
});

global.client = client;
// website initialization
if (client.config.website.enabled) {
  require("@root/website/index.js");
}
function init() {
  client.loadCommands();
  client.loadEvents();
  client.loadTopgg();
  client.db.init();
  client.connect();
}

init();

process.on("unhandledRejection", (error) => client.logger.warn(error));
