const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'play',
    aliases: ['p'],
    args: true,
    cooldown: 15,
    run: (message, args) => {
        if (!message.member.voice.channel) return message.channel.send(new MessageEmbed().setAuthor('Not in a Voice Channel.', 'https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Error.png').setDescription('Please join a voice channel to play music.'));
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(new MessageEmbed().setAuthor('Different Voice Channel.', 'https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Error.png').setDescription('Please join the same voice channel as me.'));

        client.player.play(message, args.join(" "), { firstResult: true });
    },
};