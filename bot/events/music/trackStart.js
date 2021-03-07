const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'trackStart',
	run: async (message, track) => {
    message.channel.send(new MessageEmbed().setAuthor(`Now Playing ${track.title}`, "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Success.png")
    .setDescription(`Now playing ${track.title} in ${message.member.voice.channel.name}.`)
    .addField('Additional Information', `Duration: ${track.duration} \n URL: [here](${track.url}) \n Views: ${track.views} \n Author: ${track.author}`)
    .setFooter(`Requested by ${track.requestedBy.username}`, track.requestedBy.displayAvatarURL)
    .setThumbnail(track.thumbnail));
}};