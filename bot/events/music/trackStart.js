const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'trackStart',
	run: async (message, client, track) => {
    message.channel.send(new MessageEmbed().setAuthor(`Now Playing ${track.title}`, "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Success.png").setDescription(`Now playing ${track.title} in ${message.member.voice.channel.name}.`).setURL(track.url).setThumbnail(track.thumbnail));
}};