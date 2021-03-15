module.exports = {
  name: "channelEmpty",
  run: async (message) => {
    message.sendError(
      "Music Playback Stopped.",
      `Music playback has been seized as there is no one in the voice channel.`
    );
  },
};
