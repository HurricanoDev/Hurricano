const Discord = require("discord.js");
const Command = require("@Command");

module.exports = class PingCommand extends Command {
  constructor(client) {
    super(client, {
      name: "ping",
      aliases: ["latency", "pong"],
      cooldown: 5,
      description: "Returns the bot's ping!",
      userPermissions: ["SEND_MESSAGES"],
    });
  }
  async run(message) {
    const msgamount = message.editedTimestamp
      ? message.editedTimestamp
      : message.createdTimestamp;
    const embed = new Discord.MessageEmbed()
      .setAuthor(
        "Hurricano™ Latency",
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Ping.png"
      )
      .setDescription("Pinging...");
    const ping = await message.channel.send(embed);
    embed
      .setDescription("")
      .setAuthor(
        "Hurricano™",
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Ping.png"
      )
      .addField("Latency", `\`${ping.createdTimestamp - msgamount}ms\``)
      .addField("API Latency", `\`${message.client.ws.ping}ms\``)
      .addField(
        "Description",
        `**Latency** is the amount of time the bot took to send the message. \n **API latency** is the ping to the Discord API.`
      )
      .setColor("#034ea2")
      .setImage(
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/other/Ping.png"
      );
    ping.edit(embed);
  }
};
