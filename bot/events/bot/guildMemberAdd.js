const mongoose = require("mongoose");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "guildMemberAdd",
  run: async (member, client) => {
    const memberLogId = client.db.guilds.cache.get(member.guild.id);
    const memberLog = member.guild.channels.cache.get(memberLogId.memberLog);
    const systemChannelId = memberLogId.systemChannel;
    const systemChannel = member.guild.channels.cache.get(systemChannelId);
    if (
      memberLog &&
      memberLog.viewable &&
      memberLog
        .permissionsFor(member.guild.me)
        .has(["SEND_MESSAGES", "EMBED_LINKS"])
    ) {
      const embed = new MessageEmbed()
        .setTitle("New Member Joined.")
        .setAuthor(
          `${member.guild.name}`,
          member.guild.iconURL({ dynamic: true })
        )
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setDescription(
          `${member} (**${member.user.tag}**) [**${member.user.id}**]`
        )
        .addField(
          "Account created on",
          moment(member.user.createdAt).format("dddd, MMMM Do YYYY")
        )
        .setTimestamp()
        .setColor("#6082b6");
      memberLog.send(embed);
    }
    const autoRoleId = client.db.guilds.cache.get(member.guild.id);
    const autoRole = member.guild.roles.cache.get(autoRoleId.autoRole);
    if (autoRole) {
      try {
        await member.roles.add(autoRole);
      } catch (e) {
        const systemChannelId = autoRoleId.systemChannel;
        const systemChannel = member.guild.channels.cache.get(
          autoRoleId.systemChannel
        );
        const systemError = new MessageEmbed()
          .setTitle("Error")
          .setColor("RED")
          .setDescription(
            `I was unable to assign the autorole to new members.\n\nError: \`${e}\``
          );
        if (systemChannel) await systemChannel.send(systemError);
      }
    }
  },
};
