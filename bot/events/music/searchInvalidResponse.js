const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "searchInvalidResponse",
  run: async (message, query, tracks, content, collector) => {
    if (content === "cancel") {
      collector.stop();
      return message.channel.send(
        new MessageEmbed()
          .setAuthor(
            "Selection Cancelled.",
            "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Success.png"
          )
          .setDescription(`The selection has successfully been cancelled.`)
      );
    } else
      message.channel.send(
        new MessageEmbed()
          .setAuthor(
            "Please Choose a Valid Number.",
            "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Error.png"
          )
          .setDescription(
            `Please choose a valid number between **1** and **${tracks.length}**.`
          )
      );
  },
};
