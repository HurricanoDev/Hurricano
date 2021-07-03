const { MessageEmbed } = require("discord.js");
const Command = require("@Command");
module.exports = new Command({
  name: "play",
  aliases: ["p"],
  args: "Please provide which song you would like to play!",
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

    const queue = client.player.createQueue(message.guild, {
      metadata: message,
    });
    if (!queue.connection) await queue.connect(message.member.voice.channel);
    const track = (await client.player
      .search(args.join(" "), {
        requestedBy: message.author,
      })).tracks[0];
      
      if (!track) return message.channel.sendError(
        message,
        "No Results Found.",
        `No results were found on YouTube for ${query}.`
      );

    queue.play(track);
  },
});
