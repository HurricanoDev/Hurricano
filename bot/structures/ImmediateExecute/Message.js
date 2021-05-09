const { Structures, APIMessage, MessageEmbed } = require("discord.js");

module.exports = Structures.extend(
  "Message",
  (Message) =>
    class HurricanoMessage extends Message {
      constructor(...args) {
        super(...args);
      }
      sendErrorReply(Header, Msg, Footer) {
        const embed = new MessageEmbed().setAuthor(
          Header,
          "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Error.png"
        ).setColor("#ff6962");
        if (Msg) {
          embed.setDescription(Msg);
        }
        if (Footer) {
          embed.setFooter(Footer);
        } else {
          embed.setFooter(this.author.username, this.author.displayAvatarURL());
        }
        this.reply(embed);
      }
      sendSuccessReply(Header, Msg, Footer) {
        const embed = new MessageEmbed().setAuthor(
          Header,
          "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Success.png"
        ).setColor("#32ba7c");
        if (Msg) {
          embed.setDescription(Msg);
        }
        if (Footer) {
          embed.setFooter(Footer);
        } else {
          embed.setFooter(this.author.username, this.author.displayAvatarURL());
        }
        this.reply(embed);
      }
    }
);
