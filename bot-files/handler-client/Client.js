const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../../config.json');
const guildPrefixes = {};
const mongoconnect = require('../utilities/mongoconnect.js')
const mongoose = require('mongoose');
client.on('message', async message => {
  const prefixMention = new RegExp(`^<@!?${client.user.id}>`);
  const prefix = guildPrefixes[message.guild.id] || config.prefix;
  
      const embed = new Discord.MessageEmbed()
    .setAuthor("Hello!", "https://media.discordapp.net/attachments/803204453321670700/804186498688876584/circle-cropped_20.png")
    .setDescription(`Hello! I'm **DragonNight™**. My prefix is \`${prefix}\`. I have a variety of commands you can use! If you want to view information about me please do \`dn!info\`. That's it for now, bye and have a great time!`)
    .setColor("#034ea2")
    .setImage("https://media.discordapp.net/attachments/803204453321670700/804187690362732565/Untitled_6.jpg?width=1025&height=342")
    .setFooter(`© DragonNight™ v1.0.0`)
    
    const prefixSchema = require('../schemas/prefix.js')
    module.exports.updateCache = (guildId, newPrefix) => {
      guildPrefixes[guildId] = newPrefix
    }
    
    module.exports.loadPrefixes = async (client) => {
      await mongoconnect().then(async (mongoose) => {
        try {
          for (const guild of client.guilds.cache) {
            const guildId = guild[1].id
    
            const result = await prefixSchema.findOne({ _id: guildId })
            guildPrefixes[guildId] = result ? result.prefix : globalPrefix
          }
        } finally {
          mongoose.connection.close()
        }
      })
    }
    if (message.content.match(prefixMention)) {
    return message.channel.send(embed);
 }
 if(message.author.bot) return;
 if (message.channel.type == "dm") return message.channel.send("Dude, use my commands in servers only! My commands do not work here!"); 
 if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (!message.guild) return;
  if (cmd.length == 0) return;
  const command = client.commands.get(cmd);
  if (!message.member) message.member = await message.guild.fetchMember(message);
   if (command.permissions) {
  	const authorPerms = message.channel.permissionsFor(message.author);
   	if (!authorPerms || !authorPerms.has(command.permissions)) {
 		return message.reply(new Discord.MessageEmbed().setTitle('Permission Error.').setDescription(`Stop disturbing me bro, you require the \`${command.permissions}\` permission to use that command...`)
     .setFooter('Smh, imagine trying to use a command without having the perms-'));
   	}
  }
  if (command.args && !args.length) {
    return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
    }
    if (!client.cooldowns.has(command.name)) {
      client.cooldowns.set(command.name, new Discord.Collection());
    }
    const now = Date.now();
    const timestamps = client.cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply({ embed: {
          title: "Chillza.",
          description: `You need to wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`,
          footer: {text: `"Patience is the key my child."`}
        }});
      }
    }
    timestamps.set(message.author.id, now);
setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) command.run(message, args)
  })
const connectmongo = async () => {
  await mongoconnect().then((mongoose) => {
    try {
      console.log('MongoDB Connected!')
    } finally {
      mongoose.connection.close()
    }
    })
  } 
connectmongo()
module.exports = client;
