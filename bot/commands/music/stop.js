const { MessageEmbed } = require("discord.js");
const Command = require("@Command");
module.exports = new Command({
  name: "stop",
  aliases: ["dc"],
  async run(message, args) {
    if (!message.member.voice.channel)
      return message.channel.sendError(
        message,
        "Not in A Voice Channel.",
        "Please join a voice channel to play music."
      );

    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return message.channel.sendError(
        message,
        "Different Voice Channel.",
        "Please join the same voice channel as me."
      );

    if (!client.player.getQueue(message))
      return message.channel.sendError(
        message,
        "No Music is Playing.",
        "Please join a voice channel to play music."
      );

    client.player.setRepeatMode(message, false);
    const success = client.player.stop(message);

    if (success)
      await message.channel.sendSuccess(
        message,
        "Stopped.",
        "I have successfully stopped the music."
      );
  },
});
