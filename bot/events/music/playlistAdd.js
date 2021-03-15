const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "playlistAdd",
  run: async (message, playlist) => {
    message.channel.send(
      new MessageEmbed()
        .setAuthor(
          "Song Successfully Added!",
          "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Success.png"
        )
        .setDescription(
          `${playlist.title} has been added to the queue! The queue currently has **${playlist.tracks.length}** songs!`
        )
    );
  },
};
