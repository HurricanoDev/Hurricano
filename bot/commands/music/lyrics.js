const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");
module.exports = {
  name: "lyrics",
  aliases: ["ly"],
  description: "Get a song's lyrics!",
  run: async (message, args) => {
    let lyrics = null;
    const prefix = await message.client.db.guild.getPrefix(message.guild.id);
    if (!message.client.player.nowPlaying(message)) {
       message.sendError(
        "No Music Is Playing.",
        "No music is being played right now."
      );
      return;
       }
    let track = args[0];
    if (!args.length) {
      track = message.client.player.nowPlaying(message);
    }
    if (!track) return;
    try {
      if (!args.length) {
        lyrics = await lyricsFinder(track.title, "");
      } else if (track = args[0]) {
        lyrics = await lyricsFinder(args[0], "");
      }
      if (track = message.client.player.nowPlaying(message) && !lyrics) {
          message.sendError(
                "No Lyrics Found.",
                "No lyrics were found for **" +
                  track.title +
                  "**. Try looking for the lyrics yourself by doing `" +
                  prefix +
                  "lyrics {Your song}`."
              )
      } else if (track = args[0] && !lyrics) {
          return message.sendError(
                "No Lyrics Found.",
                "No lyrics were found for **" +
                  track +
                  "**. Try looking for the lyrics yourself by doing `" +
                  prefix +
                  "lyrics {Your song}`."
              )
      }
    } catch (error) {
      message.sendError(
            "No Lyrics Found.",
            "No lyrics were found for **" +
              track +
              "**. Try looking for the lyrics yourself by doing `" +
              prefix +
              "lyrics {Your song}`."
          )
    }
    let lyricsEmbed = new MessageEmbed();
    if (track = message.client.player.nowPlaying(message).title) {
      lyricsEmbed
        .setAuthor(
          `Lyrics for ${track.title}`,
          "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Music.gif"
        )
        .setURL(track.url)
        .setDescription(lyrics)
        .setFooter(
          `Requested by ${message.author.username}`,
          message.author.displayAvatarURL()
        )
        .setThumbnail(track.thumbnail);
    } else if ((track = args[0])) {
      lyricsEmbed
        .setAuthor(
          `Lyrics found for ${args[0]}`,
          "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Music.gif"
        )
        .setDescription(lyrics)
        .setFooter(
          `Requested by ${message.author.username}`,
          message.author.displayAvatarURL()
        );
    }

    if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
    return message.channel.send(lyricsEmbed).catch(console.error);
  },
};
