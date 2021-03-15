const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "error",
  run: async (error, message, ...args) => {
    switch (error) {
      case "NotPlaying":
        message.sendError(
          "No Music Being Played.",
          `There is no music being played in this server.`
        );
        break;
      case "NotConnected":
        message.sendError(
          "Not in a Voice Channel.",
          `You are not in a voice channel.`
        );
        break;
      case "UnableToJoin":
        message.sendError(
          "Permission Error.",
          `I am unable to join your voice channel. Please check my permissions.`
        );
        break;
      case "VideoUnavailable":
        message.sendError(
          "Video Unavailable.",
          `${args[0].title} is unavailable. Skipping.`
        );
        break;
      case "MusicStarting":
        message.sendError(
          "The Song is Starting.",
          `The song is starting. Please wait or retry.`
        );
        break;
      default:
        message.sendError(
          "Something Went Wrong."`Something went wrong. Error: \`\`\`${error}\`\`\``
        );
    }
  },
};
