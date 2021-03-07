const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'searchResults',
	run: async (message, query, tracks) => {
    message.channel.send(new MessageEmbed().setAuthor(`Search Results for ${query}.`, "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Success.png").setDescription(`${tracks.map((t, i) => `**${i + 1}** - ${t.title}`).join('\n')}`).setTimestamp());
}};