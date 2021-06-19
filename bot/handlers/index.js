const { Intents, Collection } = require("discord.js");
const express = require("express");
require("module-alias/register");
global._Collection = Collection;
const Topgg = require("@top-gg/sdk");
const { Client, loadStructures } = require("@root/bot/Client.js");
loadStructures();
const config = require("@config");
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

const app = express();

const webhook = new Topgg.Webhook();

app.post(
  "/dblwebhook",
  webhook.listener((vote) => {
    console.log(vote.user);
  })
);
app.listen(3000);

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
