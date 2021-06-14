const { MessageEmbed } = require("discord.js");
const disk = ":Music:";
module.exports = {
  name: "trackStart",
  run: async (message, track) => {
    const embed = new MessageEmbed()
      .setTitle(`${track.title}`)
      .setURL(`${track.url}`)
      .setAuthor(
        `Now Playing`,
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Music.gif"
      )
      .addField("Duration", `\`${track.duration}\``, true)
      .addField("Views", `\`${track.views}\``, true)
      .addField("Channel", `\`${message.member.voice.channel.name}\``, true)
      .addField("Author", `\`${track.author}\``)
      .setFooter(
        `Requested by ${track.requestedBy.username}`,
        track.requestedBy.displayAvatarURL
      )
      .setThumbnail(track.thumbnail);
    return message.channel.send({ embeds: [embed] });
  },
};
