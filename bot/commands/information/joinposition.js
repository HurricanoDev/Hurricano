const Command = require("@Command");
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  name: "joinposition",
  aliases: ["joinp"],
  description: "View the position a user joined the server.",
  async run(message, args) {
    const member =
      message.mentions.members.first() ||
      message.guild.users.cache.get(args[0]) ||
      message.author;
    if (!member) return message.channel.sendError("Please specify a member!");

    const members = message.guild.members.cache
      .sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)
      .array();

    const position = new Promise((ful) => {
      for (let i = 1; i < members.length + 1; i++) {
        if (members[i - 1].id === member.id) ful(i);
      }
    });

    message.sendSuccessReply(
      message,
      "Success!",
      `${member} is the ${await position} member to join the server!`
    );
  },
});
