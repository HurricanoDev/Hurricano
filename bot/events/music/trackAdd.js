const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "trackAdd",
  run: async (message, queue, track) => {
    const embed = new MessageEmbed()
      .setAuthor(
        "Song Added",
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Music.gif"
      )
      .setColor(message.guild.me.displayHexColor)
      .setDescription(
        `Successfully added **${track.title}** to queue. [ ${message.author} ]`
      )
      .setURL(track.url)
      .setFooter(
        `Requested by ${track.requestedBy.username}`,
        track.requestedBy.displayAvatarURL
      )
      .setThumbnail(track.thumbnail);
    return message.channel.send(embed);
  },
};
