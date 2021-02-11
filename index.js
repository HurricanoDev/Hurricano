const { Collection, Intents, MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const fs = require('fs');
const ms = require('ms');
const intents = new Intents();
const client = require('./bot-files/handler-client/Client.js');
const giveaway = require('./bot-files/schemas/giveaway.js');
const { readdirSync } = require("fs");
intents.add(
	'GUILD_PRESENCES',
	'GUILD_MEMBERS',
	'GUILDS',
	'GUILD_VOICE_STATES',
	'GUILD_MESSAGES',
	'GUILD_MESSAGE_REACTIONS'
);
const config = require('./config.json');
client.config = config;
client.commands = new Collection();
client.aliases = new Collection();
client.cooldowns = new Collection();
readdirSync("./bot-files/commands");
["command"].forEach(handler => {
    require(`./bot-files/handler-client/Handle.js`)(client);
});
const init = async () => {
const evtFiles = await readdirSync("./bot-files/events/");
console.log(`Loading a total of ${evtFiles.length} events.`);
evtFiles.forEach(file => {
  const eventName = file.split(".")[0];
  console.log(`Loading Event: ${eventName}`);
  const event = require(`./bot-files/events/${file}`);
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