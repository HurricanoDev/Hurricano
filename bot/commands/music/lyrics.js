const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");
const Command = require("@Command");
module.exports = new Command({
  name: "lyrics",
  aliases: ["ly"],
  description: "Get a song's lyrics!",
  async run(message, args) {
    let lyrics = null;
    const prefix = message._usedPrefix;
    if (!client.player.getQueue(message))
      return message.channel.sendError(
        message,
        "No Music is Playing.",
        "Please join a voice channel to play music."
      );

    let track = args;
    if (!args.length) {
      track = client.player.getQueue(message).playing;
    }
    try {
      if (!args.length) {
        lyrics = await lyricsFinder(track.title, "");
      } else if ((track = args)) {
        lyrics = await lyricsFinder(args[0], "");
      }
      if ((track = message.client.player.nowPlaying(message) && !lyrics)) {
        message.channel.sendError(
          message,
          "No Lyrics Found.",
          "No lyrics were found for **" +
            track.title +
            "**. Try looking for the lyrics yourself by doing `" +
            prefix +
            "lyrics {Your song}`."
        );
      } else if ((track = args && !lyrics)) {
        return message.channel.sendError(
          message,
          "No Lyrics Found.",
          "No lyrics were found for **" +
            track +
            "**. Try looking for the lyrics yourself by doing `" +
            prefix +
            "lyrics {Your song}`."
        );
      }
    } catch (error) {
      message.channel.sendError(
        message,
        "No Lyrics Found.",
        "No lyrics were found for **" +
          track +
          "**. Try looking for the lyrics yourself by doing `" +
          prefix +
          "lyrics {Your song}`."
      );
    }
    if ((track = client.player.getQueue(message).playing)) {
      const lyricsEmbed = new MessageEmbed()
        .setAuthor(
          "Lyrics for " + track.title,
          "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Music.gif"
        )
        .setURL(track.url)
        .setDescription(lyrics)
        .setFooter(
          `Requested by ${message.author.username}`,
          message.author.displayAvatarURL()
        )
        .setThumbnail(track.thumbnail);

      if (lyricsEmbed.description.length >= 2048)
        lyricsEmbed.description = `${lyricsEmbed.description.substr(
          0,
          2045
        )}...`;
      return message.channel
        .send({ embeds: [lyricsEmbed] })
        .catch((x) => client.logger.warn(x));
    } else if ((track = args)) {
      const lyricsEmbed = new MessageEmbed()
        .setAuthor(
          `Lyrics found for ${track}`,
          "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Music.gif"
        )
        .setDescription(lyrics)
        .setFooter(
          `Requested by ${message.author.username}`,
          message.author.displayAvatarURL()
        );
      if (lyricsEmbed.description.length >= 2048)
        lyricsEmbed.description = `${lyricsEmbed.description.substr(
          0,
          2045
        )}...`;
      return message.channel
        .send({ embeds: [lyricsEmbed] })
        .catch((x) => client.logger.warn(x));
    }
  },
});
