const { Structures, MessageEmbed } = require("discord.js");

Structures.extend("TextChannel", (channel) => {
  class HurricanoChannel extends channel {
    constructor(...args) {
      super(...args);
    }

    sendError(message, Header, Msg, Footer) {
      const embed = new MessageEmbed()
        .setAuthor(
          Header,
          "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Error.png"
        )
        .setColor("#FF0000");

      if (Msg) {
        embed.setDescription(Msg);
      }
      if (Footer) {
        embed.setFooter(Footer);
      } else {
        embed.setFooter(
          message.author.username,
          message.author.displayAvatarURL()
        );
      }
      this.send(embed);
    }
    sendSuccess(message, Header, Msg, Footer) {
      const embed = new MessageEmbed().setAuthor(
        Header,
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Success.png"
      );
      if (Msg) {
        embed.setDescription(Msg);
      }
      if (Footer) {
        embed.setFooter(Footer);
      } else {
        embed.setFooter(
          message.author.username,
          message.author.displayAvatarURL()
        );
      }
      this.send(embed);
    }
  }
  return HurricanoChannel;
});
