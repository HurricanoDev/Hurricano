const Command = require('@Command');
const { MessageEmbed } = requre('discord.js');
module.exports = new Command({
  name: "ban",
  description: "Ban someone.",
  cooldown: 7,
  userPermissions: ["BAN_MEMBERS"],
  clientPermissions: ["BAN_MEMBERS"],
  async run (message, args) {
    const members = await message.guild.members.fetch();
    const member = await client.functions.getMember(false, message, args[0]);
    if (!member && !members.some(x => x.id === args[0])) member = await client.users.fetch(args);
    if (!member) return message.channel.sendError(message, 'Invalid User!', 'Please provide a valid user to ban!');
    if (members.some(x => x.id == member.id) && message.member.roles.highest.position > member.roles.highest.position) return message.channel.sendError(message, 'An Error Occured.', "You cannot ban this user as their roles are higher than yours!");
    const reason = args.splice(1).join(" ");
    if (!reason) member.ban({ reason: `Banned by ${message.author} With no Reason Provided.` })
    if (reason) member.ban({ reason: `"${reason}" - Banned By ${message.author}.`})
    const embed = new MessageEmbed()
    .setAuthor('Member Successfully Banned.', client.links.successImage)
    .setDescription(`${member} was banned in ${message.guild by ${message.author}`)
    
  }
})