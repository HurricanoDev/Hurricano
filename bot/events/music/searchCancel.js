const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "searchCancel",
  run: async (queue) => {
    const message = queue.metadata;
    message.channel.sendError(
      message,
      "Invalid Response.",
      `You did not provide a valid response. Please try again.`
    );
  },
};
