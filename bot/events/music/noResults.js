const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "noResults",
  run: async (message, query) => {
    message.channel.send(
      new MessageEmbed()
        .setAuthor(
          "No Results Found.",
          "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Error.png"
        )
        .setDescription(`No results were found on YouTube for ${query}.`)
    );
  },
};
