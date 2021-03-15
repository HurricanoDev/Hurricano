module.exports = {
  name: "queueEnd",
  run: async (message, queue) => {
    message.sendError("Music Ended.", `There is no more songs in the queue.`);
  },
};
