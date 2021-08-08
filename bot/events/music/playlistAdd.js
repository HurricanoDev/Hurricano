module.exports = {
  name: "playlistAdd",
  run: async (queue, playlist) => {
    const message = queue.metadata;
    message.channel.sendError(
      message,
      "Song Successfully Added!",
      `${playlist.title} has been added to the queue! The queue currently has **${playlist.tracks.length}** songs!`,
    );
  },
};
