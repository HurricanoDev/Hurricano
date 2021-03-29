const Command = require("@Command");
const Discord = require("discord.js");

module.exports = class SnipeCommand extends Command {
  constructor(client) {
    super(client, {
      name: "snipe",
      description: "Snipe a deleted message.",
    });
  }
  async run(message, args) {
    const msg = this.client.snipes.get(message.channel.id);
    const embed = new Discord.MessageEmbed()
      .setAuthor(msg.author, msg.member.user.displayAvatarURL())
      .setDescription(msg.content)
      .setFooter("Get Sniped lol")
      .setTimestamp();
    if (msg.image) {
      embed.setImage(msg.image);
    }

    message.channel.send(embed);
  }
};
