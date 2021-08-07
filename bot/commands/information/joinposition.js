const Command = require('@Command');
module.exports = new Command({
  name: 'joinposition',
  aliases: ['joinp'],
  description: 'View the position a user joined the server.',
  async run(message, args) {
    let member = parseInt(args[0]);
    if (!member || member.length > 16)
      member = await client.functions.getMember(true, message, args[0]);
    const members = (await message.guild.members.fetch())
      .sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)
      .array();
    if (
      (parseInt(args[0]) && member < 0) ||
      (parseInt(args[0]) && member > message.guild.memberCount)
    )
      return message.channel.sendError(
        message,
        'Invalid Number!',
        'Please provide a valid number!',
      );
    let position;
    if (!parseInt(member)) {
      for (let i = 1; i < members.length + 1; i++) {
        if (members[i - 1].id === member.id) position = i;
      }
    } else {
      position = members[member - 1];
    }
    if (!parseInt(member)) {
      await message.sendSuccessReply(
        'Success!',
        `${member} is the ${client.functions.getOrdinalSuffix(
          position,
        )} member to join the server!`,
      );
    } else {
      await message.sendSuccessReply(
        'Success!',
        `${position} is the ${client.functions.getOrdinalSuffix(
          member,
        )} to join the server!`,
      );
    }
  },
});
