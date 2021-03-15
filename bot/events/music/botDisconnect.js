const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "botDisconnect",
  run: async (message) => {
    message.channel.send(
      new MessageEmbed()
        .setAuthor(
          "Bot Disconnected.",
          "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Error.png"
        )
        .setDescription(
          `Music playback has been seized due to me being disconnected from the channel.`
        )
    );
  },
};
