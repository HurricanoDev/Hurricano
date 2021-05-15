const Command = require("@Command");
module.exports = new Command({
  name: "volume",
  description: "Set the volume.",
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

    if (!this.client.player.getQueue(message))
      return message.channel.sendError(
        message,
        "No Music is Playing.",
        "Please join a voice channel to play music."
      );

    if (!args[0] || isNaN(args[0]) || args[0] === "Infinity")
      return message.channel.sendError(
        message,
        "Invalid Arguments Provided.",
        "Please provide a valid number. The number can only be between 1 - 100."
      );

    if (
      Math.round(parseInt(args[0])) < 1 ||
      Math.round(parseInt(args[0])) > 100
    )
      return message.channel.sendError(
        message,
        "Invalid Arguments Provided.",
        "Please provide a number between 1 - 100."
      );

    const success = this.client.player.setVolume(message, parseInt(args[0]));

    if (success)
      await message.channel.sendSuccesss(
        message,
        "Success.",
        `Volume successfully set to **${parseInt(args[0])}%**!`
      );
  },
});
