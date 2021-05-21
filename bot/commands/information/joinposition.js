const Command = require("@Command");
module.exports = new Command({
  name: "joinposition",
  aliases: ["joinp"],
  description: "View the position a user joined the server.",
  async run(message, args) {
    let member = parseInt(args[0]);
    if (!member)
    member = await client.functions.getMember(true, message, args[0]);
    const members = (await message.guild.members.fetch())
      .sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)
      .array();

    let position;
    if (!parseInt(member)) {
    for (let i = 1; i < members.length + 1; i++) {
      if (members[i - 1].id === member.id) position = i;
    }
  } else {
    position = members[member];
  }
    await message.sendSuccessReply(
      "Success!",
      `${member} is the ${client.functions.getOrdinalSuffix(
        position
      )} member to join the server!`
    );
  },
});
