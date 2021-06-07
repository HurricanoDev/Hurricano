const mongoose = require("mongoose");
const config = require("@config");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "guildBanAdd",
  run: async (guild, user) => {
    const guildData = client.db.guilds.cache.get(guild.id);
    const serverLogChannel = await client.channels.cache.get(
      guildData.serverLog
    );

    const embed = new MessageEmbed()
      .setTitle("Member Banned")
      .setDescription(`A member was banned in **${guild.name}**`)
      .setThumbnail(user.displayAvatarURL())
      .addField("Member Banned", user)
      .setTimestamp()
      .setColor("#606365");

    if (
      serverLogChannel &&
      serverLogChannel.viewable &&
      serverLogChannel.permissionsFor(guild.me).has("SEND_MESSAGES")
    ) {
      serverLogChannel.send(embed);
    }
  },
};
