const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "noResults",
  run: async (message, query) => {
    message.channel.sendError(
      message,
      "No Results Found.",
      `No results were found on YouTube for ${query}.`
    );
  },
};
