const Command = require("@Command");
const Discord = require("discord.js");
module.exports = new Command({
  name: "nickname",
  description: "Changes nickname of the user specified.",
  userPermissions: ["CHANGE_NICKNAME", "MANAGE_MESSAGES"],
  async run(message, args) {
    const mentionedMember =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    const nickName = args.slice(1).join(" ");
    if (!args[0])
      return message.channel.sendError(
        message,
        "Error.",
        `Incorrect Usage\n\`${message._usedPrefix}nickname <mention_user> <nickname>\``
      );

    if (!mentionedMember)
      return message.channel.sendError(
        message,
        "Error.",
        "The member stated is not in the server."
      );
    if (!nickName)
      return message.channel.sendError(
        message,
        "Error.",
        `Incorrect Usage\n\`${message._usedPrefix}nickname <mention_user> <nickname>\``
      );
    if (
      mentionedMember.roles.highest.position >
      message.guild.me.roles.highest.position
    )
      return message.channel.sendError(
        message,
        "Error.",
        "I cannot change the nickname of this member as their position on the role hierarchy is higher than mine!"
      );

    if (
      mentionedMember.roles.highest.position >
      message.member.roles.highest.position
    )
      return message.channel.sendError(
        message,
        "Error.",
        "You cannot change the nickname of this member as their position on the role hierarchy is higher than yours!"
      );

    message.channel.sendSuccess(
      message,
      "Done!",
      `Changed ${mentionedMember}'s nickname from ${mentionedMember.displayName} => ${nickName}`
    );

    await mentionedMember.setNickname(nickName).catch((err) => {
      console.log(err);
      message.channel.sendError(
        message,
        "Error.",
        `An error was encountered.\nError: \`${err}\``
      );
    });
  },
});
