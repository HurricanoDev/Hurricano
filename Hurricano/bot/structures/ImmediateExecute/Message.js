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
        );
        embed.setColor("RED");
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
        );
        embed.setColor("GREEN");
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
