const { Structures, MessageEmbed } = require('discord.js');
const { User, GuildMember, MessagePayload } = require('discord.js');
function RegexEscape(input) {
  return input.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}
function replaceStringsInObject(objRaw, findStr, replaceStr) {
  let value = objRaw;
  if (objRaw.embeds) {
    value.embeds = objRaw.embeds.map((obj) => {
      if (obj instanceof MessageEmbed) {
        const toClean = obj instanceof MessageEmbed ? obj : obj.embed;
        let embedClean = JSON.stringify(toClean)
          .replace(findStr[0], replaceStr[0])
          .replace(findStr[1], replaceStr[1]);
        embedClean = JSON.parse(embedClean);
        return new MessageEmbed(obj);
      }
    });
  }
  if (value.content && !value.reply)
    value.content = value.content
      ?.replace(findStr[0], replaceStr[0])
      .replace(findStr[1], replaceStr[1]);
  if (value.reply) {
    let tempVal = value;
    obj.content
      ? (tempVal.content = tempVal.content
          .replace(findStr[0], replaceStr[0])
          .replace(findStr[1], replaceStr[1]))
      : null;
    value = tempVal;
  }
  return value;
}
module.exports = Structures.extend('TextChannel', (channel) => {
  class HurricanoChannel extends channel {
    constructor(...args) {
      super(...args);
    }
    async send(optionsRaw) {
      const tokenRegex = new RegExp(RegexEscape(client.config.token), 'g');
      const mongoUri = new RegExp(RegexEscape(client.config.mongouri), 'g');
      let options =
        typeof optionsRaw === 'string'
          ? optionsRaw
              .replace(tokenRegex, 'Bot Token.')
              .replace(mongoUri, 'MongoDB Uri.')
          : replaceStringsInObject(
              optionsRaw,
              [tokenRegex, mongoUri],
              ['Bot Token.', 'MongoDB Uri.'],
            );
      return await super.send(options);
    }

    async sendError(message, Header, Msg, Footer, Fields, Components) {
      const embed = new MessageEmbed()
        .setAuthor(
          Header,
          'https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Error.png',
        )
        .setColor('RED');

      if (Msg) {
        embed.setDescription(Msg);
      }
      if (Footer) {
        embed.setFooter(Footer);
      } else {
        embed.setFooter(
          message.author.username,
          message.author.displayAvatarURL(),
        );
      }
      if (Fields) embed.addFields(Fields);
      const sendObj = { embeds: [embed] };
      if (Components) sendObj.components = Components;
      const msg = await this.send(sendObj);
      return msg;
    }
    async sendSuccess(message, Header, Msg, Footer, Fields, Components) {
      const embed = new MessageEmbed()
        .setAuthor(
          Header,
          'https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Success.png',
        )
        .setColor('GREEN');
      if (Msg) {
        embed.setDescription(Msg);
      }
      if (Footer) {
        embed.setFooter(Footer);
      } else {
        embed.setFooter(
          message.author.username,
          message.author.displayAvatarURL(),
        );
      }
      if (Fields) embed.addFields(Fields);
      const sendObj = { embeds: [embed] };
      if (Components) sendObj.components = Components;
      const msg = await this.send(sendObj);
      return msg;
    }
  }
  return HurricanoChannel;
});
