const { MessageEmbed } = require("discord.js");
const Command = require("@Command");
module.exports = new Command({
  name: "search",
  description: "Search for a song!",
  args: "Please provide what you would like to search!",
  cooldown: 15,
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

    client.player.play(message, args.join(" "));
  },
});
