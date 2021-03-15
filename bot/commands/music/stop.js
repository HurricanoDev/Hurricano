const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "stop",
  aliases: ["dc"],
  run: (message, args) => {
    if (!message.member.voice.channel)
      return message.sendError(
        "Not in A Voice Channel.",
        "Please join a voice channel to play music."
      );

    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return message.sendError(
        "Different Voice Channel.",
        "Please join the same voice channel as me."
      );

    if (!client.player.getQueue(message))
      return message.sendError(
        "No Music is Playing.",
        "Please join a voice channel to play music."
      );

    client.player.setRepeatMode(message, false);
    const success = client.player.stop(message);

    if (success)
      message.sendSuccess("Stopped.", "I have successfully stopped the music.");
  },
};
