const Command = require("@Command");
const decancer = require("weird-to-normal-chars").weirdToNormalChars;
module.exports = new Command({
  name: "decancer",
  description: "Decancers a user.",
  args: "Please specify who you would like to decancer!",
  userPermissions: ["MANAGE_NICKNAMES"],
  async run(message, args) {
    let target;
    if (args[0]) {
      target =
        message.mentions.members.first() ||
        (await message.guild.members.fetch(args[0]).catch((e) => {}));
    }
    if (!target || target.size)
      message.channel.sendErrorReply(
        message,
        "Error",
        "Invalid user provided!"
      );
    if (target.id === message.author.id)
      return message.channel.sendErrorReply(
        message,
        "Error!",
        "You can't decancer youtself!"
      );
    const origiName = target.displayName;
    const nick = decancer(target.displayName);
    if (nick === origiName)
      return message.channel.sendErrorReply(
        message,
        "Error!",
        "Target has already been decancered."
      );

    //Actually decancering the nickname smh.
    target.setNickname(nick);
    message.channel.sendSuccessReply(
      message,
      "Nickname Decancered.",
      `${target}'s name has been decancered. \n \`${origiName}\` => \`${nick}\``
    );
  },
});
