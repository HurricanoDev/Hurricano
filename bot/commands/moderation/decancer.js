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
        "Invalid user provided!",
      );
    if (target.id === message.author.id)
      return message.sendErrorReply("Error!", "You can't decancer yourself!");
    if (target.roles.highest > message.member.roles.highest)
      return message.channel.sendError(
        message,
        "Error.",
        "You can't decancer someone higher than you!",
      );
    if (message.guild.me.roles.highest < target.roles.highest)
      return message.channel.sendError(
        message,
        "Error.",
        "I cannot decancer this user.",
      );
    const origiName = target.displayName;
    const nick = decancer(target.displayName);
    if (nick === origiName)
      return message.channel.sendError(
        message,
        "Error!",
        "Target has already been decancered.",
      );

    //Actually decancering the nickname smh.
    target.setNickname(nick);
    message.sendSuccessReply(
      "Nickname Decancered.",
      `${target}'s name has been decancered. \n \`${origiName}\` => \`${nick}\``,
    );

    //ModLogs
    const guildData = client.db.guilds.cache.get(message.guild.id);
    const modLog = await message.guild.channels.cache.get(guildData.modLogs);

    if (
      modLog &&
      modLog.permissionsFor(message.guild.me).has("SEND_MESSAGES") &&
      modLog.viewable
    ) {
      const logEmbed = new MessageEmbed()
        .setTitle("Member Nickname Decancered")
        .addField("Moderator", `<@${message.author.id}>`, true)
        .addField("Member Decancered", `${target.tag}`, true)
        .addField("Nickname", `\`${origiName}\` => \`${nick}\``)
        .setTimestamp()
        .setThumbnail(target.user.displayAvatarURL())
        .setColor("BLACK");

      modLog.send({ embeds: [logEmbed] });
    }
  },
});
