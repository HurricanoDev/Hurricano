module.exports = async (client, message) => {
  const Discord = require('discord.js');
  const config = require('../../config.json');
  const mongoconnect = require('../utilities/mongoconnect.js'); 
  const guildId = message.guild.id;
  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${client.prefixes.get(guildId).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\s*`);
    const embed = new Discord.MessageEmbed()
  .setAuthor("Hello!", "https://media.discordapp.net/attachments/803204453321670700/804186498688876584/circle-cropped_20.png")
  .setDescription(`Hello! I'm **DragonNight™**. My prefix is \`${client.prefixes.get(guildId)}\`. I have a variety of commands you can use which you can view by doing \`${client.prefixes.get(message.guild.id)}help\`! If you want to view information about me please do \`dn!bot!info\`. That's it for now, bye and have a great time!`)
  .setColor("#034ea2")
  .setImage("https://media.discordapp.net/attachments/803204453321670700/804187690362732565/Untitled_6.jpg?width=1025&height=342")
  .setFooter(`© DragonNight™ v1.0.0`)
  if (prefixRegex.test(message.content)) {
  if ( 
    (message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`)) {
  return message.channel.send(embed);
}

const [, match] = message.content.match(prefixRegex);
if(message.author.bot) return;
if (message.channel.type == "dm") return message.channel.send("Dude, use my commands in servers only! My commands do not work here!"); 
if (!message.content.startsWith(match)) return;
const args = message.content.slice(match.length).trim().split(/ +/g);
const cmd = args.shift().toLowerCase();

if (!message.guild) return;
if (cmd.length == 0) return;
const command = client.commands.get(cmd);
let checkAdmin = config.ownerIds.includes(message.author.id);
if (command.ownerOnly === true && !checkAdmin) return message.channel.send('Sorry, you\'re too much of a boomer to use this command.');

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
}

}