const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'error',
	run: async (error, message, ...args) => {
    switch (error) {
        case 'NotPlaying':
            message.channel.send(new MessageEmbed().setAuthor("No Music Being Played.", "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Error.png").setDescription(`There is no music being played in this server.`));
            break;
        case 'NotConnected':
            message.channel.send(new MessageEmbed().setAuthor("Not in a Voice Channel.", "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Error.png").setDescription(`You are not in a voice channel.`));
            break;
        case 'UnableToJoin':
            message.channel.send(new MessageEmbed().setAuthor("Permission Error.", "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Error.png").setDescription(`I am unable to join your voice channel. Please check my permissions.`));
            break;
        case 'VideoUnavailable':
            message.channel.send(new MessageEmbed().setAuthor("Video Unavailable.", "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Error.png").setDescription(`${args[0].title} is unavailable. Skipping.`));
            break;
        case 'MusicStarting':
            message.channel.send(new MessageEmbed().setAuthor("The Song is Starting.", "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Error.png").setDescription(`The song is starting. Please wait or retry.`));
            break;
        default:
            message.channel.send(new MessageEmbed().setAuthor("Something Went Wrong.", "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Error.png").setDescription(`Something went wrong. Error: \`\`\`${error}\`\`\``));
    };
}};
