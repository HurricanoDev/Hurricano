module.exports = {
  name: "botDisconnect",
  run: async (message) => {
    message.channel.sendError(
      message,
      "Bot Disconnected.",
      `Music playback has been seized due to me being disconnected from the channel.`
    );
  },
};
