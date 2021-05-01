const ghostPingSchema = require("../models/ghost-ping-schema.js");
const { MessageEmbed } = require("discord.js");
const cache = {};

module.exports = {
  name: "messageDelete",
  run: async (message, client) => {
    if (message.author.bot) return;
    client.snipes.set(message.channel.id, {
      content: message.content,
      author: message.author.tag,
      member: message.member,
      image: message.attachments.first()
        ? message.attachments.first().proxyURL
        : null,
    });
    //GhostPing Detector Start-
    const { content, channel, author, guild, mentions } = message;

    if (!author || author.bot || mentions.users.size === 0) {
      return;
    }

    let channelId = cache[guild.id];
    if (!channelId) {
      const result = await ghostPingSchema.findById(guild.id);
      if (!result) {
        return;
      }

      channelId = result.channelId;
      cache[guild.id] = channelId;
    }

    const embed = new MessageEmbed()
      .setTitle("Possible Ghost Ping Detected")
      .setDescription(`Message\n\n"${content}"`)
      .addField("Channel", channel)
      .addField("Message Author", author)
      .setColor("#FFFFFF")

    const targetChannel = guild.channels.cache.get(channelId);
    if (targetChannel) {
      targetChannel.send(embed);
    }
  },
};
