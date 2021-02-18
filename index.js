const { Collection, Intents, MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config.json');
const ms = require('ms');
const intents = new Intents();
const client = require('./bot/handler-client/Client.js');
const giveaway = require('./bot/utilities/schema.js');
const { readdirSync } = require("fs");
// website initialization
if (config.website.enabled === true) {
require('./website/index.js');
}
// over
intents.add(
	'GUILD_PRESENCES',
	'GUILD_MEMBERS',
	'GUILDS',
	'GUILD_VOICE_STATES',
	'GUILD_MESSAGES',
	'GUILD_MESSAGE_REACTIONS'
);
client.config = config;
client.commands = new Collection();
client.aliases = new Collection();
client.cooldowns = new Collection();
readdirSync("./bot/commands");
["command"].forEach(handler => {
    require(`./bot/handler-client/Handle.js`)(client);
});
const init = async () => {
const evtFiles = await readdirSync("./bot/events/");
console.log(`Loading a total of ${evtFiles.length} events.`);
evtFiles.forEach(file => {
  const eventName = file.split(".")[0];
  console.log(`Loading Event: ${eventName}`);
  const event = require(`./bot/events/${file}`);
  client.on(eventName, event.bind(null, client));
});
}
if (config.topggapi === true) {
	let DBL = require("dblapi.js");
    let dbl = new DBL(config.toptoken, client);
    client.on('ready', () => {
     setInterval(() => {
         dbl.postStats(client.guilds.cache.size);
    }, 900000);
});
}
client.login(config.token)

init();