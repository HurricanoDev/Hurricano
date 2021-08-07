const Command = require('@Command');

module.exports = new Command({
  name: 'unblacklist',
  description: 'Unblacklist a user from the bot.',
  ownerOnly: true,
  args: 'Please provide who you would like to unblacklist!',
  async run(message, args) {
    let user =
      message.mentions.users.first() ||
      (await message.client.users.fetch(args[0]).catch((e) => {}));
    if (!user)
      return message.sendErrorReply(
        'Invalid User!',
        'Invalid user provided! Please provide a valid user.',
      );
    let userSchema = await client.db.users.cache.get(user.id);
    if (!userSchema) userSchema = await client.functions.createUserDB(user);

    await message.channel.sendSuccess(
      message,
      'Confirmation.',
      `Are you sure you would like to unblacklist ${user}? Please respond with \`yes\` or \`no\`.`,
    );
    let confirmation = await message.channel
      .awaitMessages({
        filter: (m) => m.author.id === message.author.id,
        max: 1,
        limit: 30000,
        errors: ['time'],
      })
      .catch(() => {
        return message.channel.sendError(
          message,
          'Time Limit Reached.',
          'You took too long to respond. You can try again later.',
        );
      });
    confirmation = confirmation.first();
    let negativeResponses = ['nope', 'no', 'nah'];
    if (negativeResponses.includes(confirmation.content.toLowerCase()))
      return await message.channel.sendSuccess(
        'Cancelling Blacklist.',
        'Cancelling blacklist.',
      );
    let positiveResponses = ['yes', 'yep', 'sure', 'yessir'];
    if (positiveResponses.includes(confirmation.content.toLowerCase())) {
      message.sendSuccessReply(
        'Unblacklisting...',
        'Unblacklisting that user now.',
      );
      const data = await client.schemas.user.findOneAndUpdate(
        {
          id: user.id,
        },
        {
          blacklisted: false,
        },
      );
      client.db.users.cache.set(user.id, data);
    }
  },
});
