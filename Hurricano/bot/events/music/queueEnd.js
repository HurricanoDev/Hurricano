module.exports = {
  name: "queueEnd",
  run: async (message, queue) => {
    message.channel.sendError(
      message,
      "Music Ended.",
      `There is no more songs in the queue.`
    );
  },
};
