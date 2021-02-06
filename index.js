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
client.categories = readdirSync("./bot-files/commands")
console.log(client.categories);

["command"].forEach(handler => {
    require(`./bot-files/handler-client/Handle.js`)(client);
});
client.on('ready', () => {
   client.user.setActivity({ name:`${config.prefix}help`, type: 'STREAMING', url: 'https://twitch.tv/Pewdiepie'});
   console.log(`${client.user.username} Successfully Logged in!`);
})
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
