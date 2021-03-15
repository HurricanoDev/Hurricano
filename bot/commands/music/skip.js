const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "skip",
  aliases: ["sk"],
  cooldown: 20,
  run: async (message, args) => {
    if (!message.member.voice.channel)
      return message.channel.send(
        new MessageEmbed()
          .setAuthor(
            "Not in a Voice Channel.",
            "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Error.png"
          )
          .setDescription("Please join a voice channel to play music.")
      );
    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return message.channel.send(
        new MessageEmbed()
          .setAuthor(
            "Different Voice Channel.",
            "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Error.png"
          )
          .setDescription("Please join the same voice channel as me.")
      );

    if (!message.client.player.getQueue(message))
      return message.channel.send(
        new MessageEmbed()
          .setAuthor(
            "No Music Is Playing.",
            "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Error.png"
          )
          .setDescription("No music is being played right now.")
      );

    const success = message.client.player.skip(message);

    if (success)
      message.channel.send(
        new MessageEmbed()
          .setAuthor(
            "Skipped.",
            "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Success.png"
          )
          .setDescription("I have skipped that song.")
      );
  },
};
