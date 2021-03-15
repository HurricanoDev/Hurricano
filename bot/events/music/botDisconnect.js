module.exports = {
  name: "botDisconnect",
  run: async (message) => {
    message.sendError(
      "Bot Disconnected.",
      `Music playback has been seized due to me being disconnected from the channel.`
    );
  },
};
