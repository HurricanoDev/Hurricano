const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "noResults",
  run: async (queue, query) => {
    const message = queue.metadata;
    message.channel.sendError(
      message,
      "No Results Found.",
      `No results were found on YouTube for ${query}.`
    );
  },
};
