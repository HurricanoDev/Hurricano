module.exports = {
  name: "playlistAdd",
  run: async (message, playlist) => {
    message.channel.sendError(
      message,
      "Song Successfully Added!",
      `${playlist.title} has been added to the queue! The queue currently has **${playlist.tracks.length}** songs!`
    );
  },
};
