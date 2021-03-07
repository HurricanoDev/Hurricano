const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'trackAdd',
	run: async (message, track) => {
    message.channel.send(new MessageEmbed().setAuthor("Added Song to Queue.", "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Success.png").setDescription(`Successfully added ${track.title} to queue.`).setURL(track.url).setThumbnail(track.thumbnail));
}};