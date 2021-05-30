//TODO: Add logging
const Command = require("@Command");
const { MessageEmbed } = require("discord.js");
module.exports = new Command({
  name: "ban",
  description: "Ban someone.",
  cooldown: 7,
  userPermissions: ["BAN_MEMBERS"],
  clientPermissions: ["BAN_MEMBERS"],
  async run(message, args) {
    const members = await message.guild.members.fetch();
    let member = await client.functions.getMember(false, message, args[0]);
    if (!member && !members.some((x) => x.id === args[0]))
      member = args[0] ? await client.users.fetch(args) : undefined;
    if (!member)
      return message.channel.sendError(
        message,
        "Invalid User!",
        "Please provide a valid user to ban!"
      );
    if (
      members.some((x) => x.id == member.id) &&
      message.member.roles.highest.position < member.roles.highest.position
    )
      return message.channel.sendError(
        message,
        "An Error Occured.",
        "You cannot ban this user as their roles are higher than yours!"
      );
    const reason = args.splice(1).join(" ");
    if (!reason)
      member.ban({
        reason: `Banned by ${message.author} With no Reason Provided.`,
      });
    if (reason)
      member.ban({ reason: `"${reason}" - Banned By ${message.author}.` });
    const embed = new MessageEmbed()
      .setAuthor("Member Successfully Banned.", client.links.successImage)
      .setDescription(`${member} was banned.`)
      .addField("Banned By:", `${message.author.tag}`, true)
      .addField("Reason:", reason, true)

      .setColor("#008000")
      .setThumbnail(member.user.displayAvatarURL());

    message.reply(embed);

    //ModLogs
    const guildData = client.db.guilds.cache.get(message.guild.id);
    const modLog = await client.channels.fetch(guildData.modLogs);

    if (
      modLog &&
      modLog.permissionsFor(message.guild.me).has("SEND_MESSAGES") &&
      modLog.viewable
    ) {
      const logEmbed = new MessageEmbed()
        .setTitle("Member Banned")
        .addField("Moderator", `${message.author.id}`, true)
        .addField("Member Banned", `${member.tag}`, true)
        .setTimestamp()
        .setThumbnail(member.user.displayAvatarURL())
        .setColor("BLACK");

      modLog.send(logEmbed);
    }
  },
});
