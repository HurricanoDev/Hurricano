const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'queueEnd',
	run: async (message, queue) => {
    message.channel.send(new MessageEmbed().setAuthor("Music Ended.", "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Error.png").setDescription(`There is no more songs in the queue.`));
}};