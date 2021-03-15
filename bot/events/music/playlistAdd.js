module.exports = {
  name: "playlistAdd",
  run: async (message, playlist) => {
    message.sendError(
      "Song Successfully Added!",
      `${playlist.title} has been added to the queue! The queue currently has **${playlist.tracks.length}** songs!`
    );
  },
};
