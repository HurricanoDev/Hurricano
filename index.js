const Discord = require("discord.js");
const fs = require("fs");
const config = require("./config.json")
const { Intents } = require('discord.js')
const intents = new Intents();
const client = new Discord.Client();

intents.add(
    'GUILD_PRESENCES',
    'GUILD_MEMBERS',
    'GUILDS',
    'GUILD_VOICE_STATES',
    'GUILD_MESSAGES',
    'GUILD_MESSAGES_REACTIONS'
);
 
client.commands = new Discord.Collection();

const cmdsrc = fs.readdirSync('./bot-files/commands/./').filter(file => file.endsWith('.js'));

for (const file of cmdsrc) {
	const command = require(`./bot-files/commands/./${file}`);
	client.commands.set(command.name, command);
}
const args = message.content.slice(prefix.length).trim().split(/ +/);
const commandName = args.shift().toLowerCase();
const command = client.commands.get(commandName);
client.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;
});

if (!client.commands.has(command)) return;

try {
	command.execute(message, args);
} catch (error) {
	console.error(error);
	message.reply(`There was an error trying to execute that command! Please send this error to the support server. \n \`\`\`${error}\`\`\``);
}

client.once('ready', () => {
	console.log(`Ready! Logged in as ${message.client.user} with a total of ${message.client.guilds.cache.size} guilds and ${message.client.users.cache.size} users.`);
});

client.login(config.token)
