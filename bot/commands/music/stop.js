const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'stop',
    aliases: ['dc'],
    run: (message, args) => {
        if (!message.member.voice.channel) return message.channel.send(new MessageEmbed().setAuthor('Not in a Voice Channel.', 'https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Error.png').setDescription('Please join a voice channel to play music.'));

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(new MessageEmbed().setAuthor('Different Voice Channel.', 'https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Error.png').setDescription('Please join the same voice channel as me.'));

        if (!client.player.getQueue(message)) return message.channel.send(new MessageEmbed().setAuthor('No Music Is Playing.', 'https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Error.png')
        .setDescription('No music is being played right now.'));


        client.player.setRepeatMode(message, false);
        const success = client.player.stop(message);

        if (success) message.channel.send(new MessageEmbed().setAuthor(`Music Stopped.`, "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Success.png")
        .setDescription(`Successfully stopped music on this server.`));
    },
};