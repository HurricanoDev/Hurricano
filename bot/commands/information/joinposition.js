const Command = require("@Command");
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  name: "joinposition",
  aliases: ["joinp"],
  description: "View the position a user joined the server.",
  async run(message, args) {
    const member = await client.functions.getMember(true, message, args[0]);
    const members = (await message.guild.members.fetch())
      .sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)
      .array();

    const position = new Promise((ful) => {
      for (let i = 1; i < members.length + 1; i++) {
        if (members[i - 1].id === member.id) ful(i);
      }
    });
    function ordinal(i) {
      var j = i % 10,
        k = i % 100;
      if (j == 1 && k != 11) {
        return i + "st";
      }
      if (j == 2 && k != 12) {
        return i + "nd";
      }
      if (j == 3 && k != 13) {
        return i + "rd";
      }
      return i + "th";
    }

    await message.sendSuccessReply(
      "Success!",
      `${member} is the ${ordinal(await position)} member to join the server!`
    );
  },
});
