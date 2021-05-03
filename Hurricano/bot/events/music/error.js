const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "error",
  run: async (error, message, ...args) => {
    switch (error) {
      case "NotPlaying":
        message.channel.sendError(
          message,
          "No Music Being Played.",
          `There is no music being played in this server.`
        );
        break;
      case "NotConnected":
        message.channel.sendError(
          message,
          "Not in a Voice Channel.",
          `You are not in a voice channel.`
        );
        break;
      case "UnableToJoin":
        message.channel.sendError(
          message,
          "Permission Error.",
          `I am unable to join your voice channel. Please check my permissions.`
        );
        break;
      case "VideoUnavailable":
        message.channel.sendError(
          message,
          "Video Unavailable.",
          `${args[0].title} is unavailable. Skipping.`
        );
        break;
      case "MusicStarting":
        message.channel.sendError(
          message,
          "The Song is Starting.",
          `The song is starting. Please wait or retry.`
        );
        break;
      default:
        message.channel.sendError(
          message,
          "Something Went Wrong."`Something went wrong. Error: \`\`\`${error}\`\`\``
        );
    }
  },
};
