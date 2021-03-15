const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "searchCancel",
  run: async (message) => {
    message.sendError(
      "Invalid Response.",
      `You did not provide a valid response. Please try again.`
    );
  },
};
