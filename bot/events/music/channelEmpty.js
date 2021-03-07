const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'channelEmpty',
	run: async (message, client, queue) => {
    message.channel.send(new MessageEmbed().setAuthor("Music Playback Stopped.", "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Error.png").setDescription(`Music playback has been seized as there is no one in the voice channel.`));
}};