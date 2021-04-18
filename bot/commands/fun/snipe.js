const Command = require("@Command");
const Discord = require("discord.js");

module.exports = new Command({
  name: "snipe",
  description: "Snipe a deleted message.",
  async run(message, args) {
    const msg = this.client.snipes.get(message.channel.id);
    if (!msg)
      message.channel.sendError(
        message,
        "Nothing To Snipe!",
        `What do you expect me to snipe, ${message.author}?`
      );
    const embed = new Discord.MessageEmbed()
      .setAuthor(msg.author, msg.member.user.displayAvatarURL())
      .setDescription(msg.content)
      .setFooter("Get rekt")
      .setTimestamp();
    msg.image ? embed.setImage(msg.image) : null;

    message.channel.send(embed);
  },
});
