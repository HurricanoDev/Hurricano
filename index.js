const { Collection, Discord, Intents, MessageEmbed } = require('discord.js');
const fs = require('fs');
const ms = require('ms');
const intents = new Intents();
const Client = require('./bot-files/handler-client/Client.js');
const client = Client;
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
client.categories = fs.readdirSync("./bot-files/commands/");
["command"].forEach(handler => {
    require(`./bot-files/handler-client/Handle.js`)(client);
});
client.on('ready', () => {
   client.user.setActivity({ name:`${config.prefix}help`, type: 'STREAMING', url: 'https://twitch.tv/Pewdiepie'});
   console.log(`${client.user.username} Successfully Logged in!`);
})

client.login(config.token);
