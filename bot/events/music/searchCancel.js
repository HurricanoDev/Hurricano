const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "searchCancel",
  run: async (message) => {
    message.channel.send(
      new MessageEmbed()
        .setAuthor(
          "Invalid Response.",
          "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Error.png"
        )
        .setDescription(
          `You did not provide a valid response. Please try again.`
        )
    );
  },
};
