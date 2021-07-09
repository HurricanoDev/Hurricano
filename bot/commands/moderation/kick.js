const Command = require("@Command");
const { MessageEmbed } = require("discord.js");
module.exports = new Command({
  name: "kick",
  description:
    "This command could be used by the server moderator to kick a user.",
  userPermissions: ["KICK_MEMBERS"],
  async run(message, args) {
    const mentionedMember = message.mentions.members.first() || message.guild.users.cache.get(args[0]);
    let reason = args.slice(1).join(" ") || "No reason provided.";
    const kickEmbed = new MessageEmbed()
      .setTitle(`You were kicked from ${message.guild.name}`)
      .setDescription(`Reason: ${reason}`)
      .setColor("#ffff")
      .setTimestamp()
      .setFooter(client.user.tag, client.user.displayAvatarURL());

    if (!args[0])
      return message.channel.sendError(
        message,
        "Error.",
        `\`${message._usedPrefix}kick <@member> <reeason>\`\nMember in args is missing.`
      );
    if (!mentionedMember)
      return message.channel.sendError(
        message,
        "Error.",
        "The member mentioned is not in the server."
      );
    if (!mentionedMember.kickable)
      return message.channel.sendError(
        message,
        "Error.",
        "I cannot kick that member."
      );
    try {
      await mentionedMember.send({ embeds: [kickEmbed] });
    } catch (err) {
      console.log(`I was unable to message the member.`);
    }

    try {
      message.channel.sendSuccess(
        message,
        "Done!",
        `Kicked **${mentionedMember.user.tag}** successfully!`
      );
      await mentionedMember.kick();
    } catch (err) {
      console.log(err);
      return message.channel.sendError(
        message,
        "Error.",
        "I was unable to kick member mentioned ."
      );
    }
  },
});
