module.exports = {
  name: 'botDisconnect',
  run: async (queue) => {
    const message = queue.metadata;
    message.channel.sendError(
      message,
      'Bot Disconnected.',
      `Music playback has been seized due to me being disconnected from the channel.`,
    );
  },
};
