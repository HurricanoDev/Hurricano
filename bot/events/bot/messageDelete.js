const { MessageEmbed } = require("discord.js");
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

    // LOGS
    const guildSchema = client.db.guilds.cache.get(message.guild.id);
    if (guildSchema.messageLogs) {
      const guildChannel = message.guild.channels.cache.get(
        guildSchema.messageLogs
      );
      let embed = new MessageEmbed()
        .setAuthor(
          `Message Deleted By ${message.author.tag}! | ID: ${message.author.id})`,
          message.author.displayAvatarURL()
        )
        .setDescription(
          `${
            message.content.length > 2034
              ? "Message content is larger than 2034 characters!"
              : "**Content:**\n" + message.toString()
          }`
        )
        .addField("Channel:", `<#${message.channel.id}>`)
        .setFooter(`Deleted by ${message.author.tag} | ${message.author.id}`)
        .setColor("#6082b6");
      message.attachments.first()
        ? (() => {
            embed.setImage(message.attachments.first().proxyURL);
            embed.addField("Images:", "True. Attaching the first image.");
          })()
        : embed.addField("Images:", "False.");

      guildChannel.send(embed);
    }

    const { content, channel, author, guild, mentions } = message;

    if (!author || author.bot || mentions.users.size === 0) {
      return;
    }

    const embed = new MessageEmbed()
      .setTitle("Possible Ghost Ping Detected")
      .setDescription(`Message\n\n"${content}"`)
      .addField("Channel", channel)
      .addField("Message Author", author)
      .setColor("#FFFFFF");

    guildChannel.send(embed);
  },
};
