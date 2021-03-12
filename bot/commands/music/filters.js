const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'filters',
    aliases: ['filter'],
    args: true,
run: async (message, args) => {
        if (!message.member.voice.channel) return message.channel.send(`${client._emojis.signs.fail}`);

        if (!message.member.voice.channel) return message.channel.send(new MessageEmbed().setAuthor('Not in a Voice Channel.', 'https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Error.png').setDescription('Please join a voice channel to play music.'));

        if (!client.player.getQueue(message)) return message.channel.send(new MessageEmbed().setAuthor('No Music Is Playing.', 'https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Error.png')
        .setDescription('No music is being played right now.'));

        const filterToUpdate = client.filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

        if (!filterToUpdate) return message.channel.send(new MessageEmbed().setAuthor('Invalid Filter.', 'https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Error.png')
        .setDescription("This filter doesn\'t exist. Filters you can use are: \n 8D \n gate \n haas \n phaser \n treble \n tremolo \n vibrato \n reverse \n karaoke \n flanger \n mcompand \n pulsator \n subboost \n bassboost \n vaporwave \n nightcore \n normalizer \n surrounding"));

        const filtersUpdated = {};

        filtersUpdated[filterToUpdate] = client.player.getQueue(message).filters[filterToUpdate] ? false : true;

        client.player.setFilters(message, filtersUpdated);
        if (filtersUpdated[filterToUpdate]) message.channel.send(new MessageEmbed().setAuthor('Filter Being Added.', 'https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Success.png').setDescription('I am adding the filter the the song. Please wait. The longer the song is, the longer it takes.'));
        else message.channel.send(new MessageEmbed().setAuthor('Filter Being Removed.', 'https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Success.png').setDescription('I am removing the filters. Please wait. The longer the song is, the longer this will take.'));
    },
};