const Command = require("@Command");
const decancer = require("weird-to-normal-chars").weirdToNormalChars;
module.exports = new Command({
  name: "decancer",
  description: "Decancers a user.",
  args: "Please specify who you would like to decancer!",
  userPermissions: ["MANAGE_NICKNAMES"],
  async run(message, args) {
    let target = await client.functions.getMember(false, message, args[0]);
    if (!target)
      return message.channel.sendError(
        message,
        "Error",
        "Invalid user provided!"
      );
    if (target.id === message.author.id)
      return message.sendErrorReply("Error!", "You can't decancer yourself!");
    const origiName = target.displayName;
    const nick = decancer(target.displayName);
    if (nick === origiName)
      return message.channel.sendError(
        message,
        "Error!",
        "Target has already been decancered."
      );

    //Actually decancering the nickname smh.
    target.setNickname(nick);
    message.sendSuccessReply(
      "Nickname Decancered.",
      `${target}'s name has been decancered. \n \`${origiName}\` => \`${nick}\``
    );
  },
});
