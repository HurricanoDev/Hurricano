const { MessageEmbed } = require("discord.js");
const BaseEvent = require("../../structures/BaseEvent.js");
module.exports = class messageDeleteEvent extends BaseEvent {
  constructor(client) {
    super("messageDelete", {
      description: "messageDelete event, meant for logs and snipe command.",
      client: client,
    });
  }
  async run(message, client) {
    if (message.author.bot) return;
    let snipeArray = client.snipes.deleted.get(message.channel.id) ?? [];
    const snipeObject = {
      content: message.content,
      author: message.author,
      member: message.member,
      image: message.attachments?.length
        ? message.attachments.map((x) => x.proxyURL)
        : null,
    };
    snipeArray.push(snipeObject);
    client.snipes.deleted.set(message.channel.id, snipeArray);
    snipeObject.action = "delete";
    let recentArray = client.snipes.recent.get(message.channel.id) ?? [];
    recentArray.push(snipeObject);
    client.snipes.recent.set(message.channel.id, recentArray);

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
            embed.addField("Images:", snipeObject.images.join(", \n"));
          })()
        : embed.addField("Images:", "False.");

      guildChannel.send({ embeds: [embed] })
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

    guildChannel.send({ embeds: [embed] })
  }
};
