const { Structures, MessageEmbed } = require("discord.js");
console.log("ee");
module.exports = Structures.extend("User", (User) => {
  class HurricanoUser extends User {
    constructor(...args) {
      super(...args);
      this.db = {
        fetch: async () => {
          const data = await client.schemas.user.findOne({ id: this.id });
          client.db.users.cache.set(this.id, data);
          return data;
        },
        cache: () => {
          return client.db.users.cache.get(this.id);
        },
      };
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
      this.createDM().then((x) => x.send(embed));
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
      this.createDM().then((x) => x.send(embed));
    }
  }
  return HurricanoUser;
});
