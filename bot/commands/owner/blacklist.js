const Command = require("@Command");

module.exports = new Command({
  name: "blacklist",
  description:
    "Set your server's message logs. This includes: Message deletion, Ghostping logging. More coming soon!",
  ownerOnly: true,
  args: "Please provide who you would like to blacklist!",
  async run(message, args) {
    let user =
      message.mentions.users.first() ||
      (await message.client.users.fetch(args[0]).catch((e) => {}));
    if (!user)
      return message.sendErrorReply(
        "Invalid User!",
        "Invalid user provided! Please provide a valid user."
      );
    let userSchema = await client.schemas.user.findOne({ id: user.id });
    if (!userSchema) await this.functions.createUserDB(user);

    message.channel.sendSuccess(
      message,
      "Confirmation.",
      `Are you sure you would like to blacklist ${user}? Please respond with \`yes\` or \`no\`.`
    );
    let confirmation = await message.channel
      .awaitMessages((m) => m.author.id === message.author.id, {
        max: 1,
        limit: 30000,
        errors: ["time"],
      })
      .catch((e) => {
        return message.channel.sendError(
          message,
          "Time Limit Reached.",
          "You took too long to respond. You can try again later."
        );
      });
    confirmation = confirmation.first();
    let negativeResponses = ["nope", "no", "nah"];
    if (negativeResponses.includes(confirmation.content.toLowerCase()))
      return message.channel.sendSuccess(
        "Cancelling Blacklist.",
        "Cancelling blacklist."
      );
    let positiveResponses = ["yes", "yep", "sure", "yessir"];
    if (positiveResponses.includes(confirmation.content.toLowerCase())) {
      message.sendSuccessReply(
        "Blacklisting...",
        "Blacklisting that user now."
      );
      await client.schemas.user.findOneAndUpdate(
        {
          id: user.id,
        },
        {
          blacklisted: true,
        }
      );
    }
  },
});
