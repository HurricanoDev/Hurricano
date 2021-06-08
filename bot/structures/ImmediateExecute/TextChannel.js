const { Structures, MessageEmbed } = require("discord.js");
const { User, GuildMember, APIMessage } = require('discord.js');
const lodash = require('lodash');
function RegexEscape(input) {
  return input.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
function replaceStringsInObject(obj, findStr, replaceStr) {  
  let value;
    if (obj instanceof MessageEmbed) {
      value = JSON.stringify(obj).replace(findStr[0], replaceStr[0]).replace(findStr[1], replaceStr[1]);
    value = JSON.parse(value);
    value = new MessageEmbed(value);
  } 
  if (obj.reply) { let tempVal = obj;
    obj.content ? tempVal.content = tempVal.content.replace(findStr[0], replaceStr[0]).replace(findStr[1], replaceStr[1]) :  null
  value = tempVal; };
    return value;
}
module.exports = Structures.extend("TextChannel", (channel) => {
  class HurricanoChannel extends channel {
    constructor(...args) {
      super(...args);
    }
    async send(rawContent, rawOptions) {
      const tokenReplaceRegex = new RegExp(this.client.config.token, 'g');
      const mongoUriReplaceRegex = new RegExp(RegexEscape(this.client.config.mongouri), 'g');
      let content;
      let options = rawOptions;
      delete options?.rawMessageContent;
      if (rawOptions?.rawMessageContent) content = rawContent;
      else {
        if (typeof rawContent == 'object') content = replaceStringsInObject(rawContent, [tokenReplaceRegex, mongoUriReplaceRegex], ["`DISCORD BOT TOKEN`", "`MONGODB URI`"]);
        else content = rawContent.replace(tokenReplaceRegex, "`DISCORD BOT TOKEN`").replace(mongoUriReplaceRegex, "`MONGODB URI`");
      }

      if (this instanceof User || this instanceof GuildMember) {
        return this.createDM().then(dm => dm.send(content, options));
      }
  
      let apiMessage;
  
      if (content instanceof APIMessage) {
        apiMessage = content.resolveData();
      } else {
        apiMessage = APIMessage.create(this, content, options).resolveData();
        if (Array.isArray(apiMessage.data.content)) {
          return Promise.all(apiMessage.split().map(this.send.bind(this)));
        }
      }
  
      const { data, files } = await apiMessage.resolveFiles();
      return this.client.api.channels[this.id].messages
        .post({ data, files })
        .then(d => this.client.actions.MessageCreate.handle(d).message);
    }

    async sendError(message, Header, Msg, Footer, Fields) {
      const embed = new MessageEmbed()
        .setAuthor(
          Header,
          "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Error.png"
        )
        .setColor("RED");

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
        .setColor("GREEN");
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
