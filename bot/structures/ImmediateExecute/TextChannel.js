const { Structures, MessageEmbed } = require("discord.js");
module.exports = Structures.extend("TextChannel", (channel) => {
  class HurricanoChannel extends channel {
    constructor(...args) {
      super(...args);
    }

    async sendError(message, Header, Msg, Footer, Fields) {
      const embed = new MessageEmbed()
        .setAuthor(
          Header,
          "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Error.png"
        )
        .setColor("#ff6962");

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
      if (Fields) embed.addFields(Fields);
      const msg = await this.send(embed);
      return msg;
    }
    async sendSuccess(message, Header, Msg, Footer, Fields) {
      const embed = new MessageEmbed()
        .setAuthor(
          Header,
          "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Success.png"
        )
        .setColor("#32ba7c");
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
      if (Fields) embed.addFields(Fields);
      const msg = await this.send(embed);
      return msg;
    }
  }
  return HurricanoChannel;
});
