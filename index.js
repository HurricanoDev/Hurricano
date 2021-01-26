const { Collection, Client, Discord, Intents } = require('discord.js')
const { MessageEmbed } = require('discord.js')
const fs = require('fs')
const ms = require('ms')
const client = new Client()
const intents = new Intents();
intents.add(
	'GUILD_PRESENCES',
	'GUILD_MEMBERS',
	'GUILDS',
	'GUILD_VOICE_STATES',
	'GUILD_MESSAGES',
	'GUILD_MESSAGE_REACTIONS'
);
const config = require('./config.json')
client.config = config;
client.commands = new Collection(); 
client.aliases = new Collection();
client.categories = fs.readdirSync("./bot-files/commands/");
["command"].forEach(handler => {
    require(`./bot-files/handler-client/Handle.js`)(client);
});
client.on('ready', () => {
   client.user.setActivity(`${config.prefix}help`)
   console.log(`${client.user.username} Successfully Logged in!`)
})

client.on('message', async message => {

     const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
     if (message.content.match(prefixMention)) {
     return message.channel.send(`Hii! <@${message.author.id}>, My prefix is \`${config.prefix}\`!`);
  }
     if(message.author.bot || message.channel.type === "dm") return;
     if (!message.content.startsWith(config.prefix)) return;
     if (!message.guild) return;
     if (!message.member) message.member = await message.guild.fetchMember(message);
     const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
     const cmd = args.shift().toLowerCase();
     if (cmd.length == 0) return;
     let command = client.commands.get(cmd)
     if (!command) command = client.commands.get(client.aliases.get(cmd));
     if (command) command.run(client, message, args)
   })

client.login(config.token)