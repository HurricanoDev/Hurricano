const { Structures, MessageEmbed } = require('discord.js');
module.exports = Structures.extend('User', (User) => {
  class HurricanoUser extends User {
    constructor(...args) {
      super(...args);
      this.bot
        ? null
        : (this.db = {
            fetch: async () => {
              const data = await client.schemas.user.findOne({ id: this.id });
              client.db.users.cache.set(this.id, data);
              return data;
            },
            cache: () => {
              return client.db.users.cache.get(this.id);
            },
          });
    }
    async sendError(message, Header, Msg, Footer, Fields) {
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
      const msg = await this.createDM().then((x) =>
        x.send({ embeds: [embed] }),
      );
      return msg;
    }
    async sendSuccess(message, Header, Msg, Footer, Fields) {
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
      const msg = await this.createDM().then((x) =>
        x.send({ embeds: [embed] }),
      );
      return msg;
    }
  }
  return HurricanoUser;
});
