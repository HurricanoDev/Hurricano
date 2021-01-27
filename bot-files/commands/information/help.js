const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const config = require('../../../config.json')
module.exports = {
    name: "help",
    description: "Provides help about the bot.",
    run: async (client, message) => {
        const make = (args[0]) ? args[0].toLowerCase() : '';
        const helpmap = {
            [INFORMATION]: `information`,
            [FUN]: `fun`,
            [MUSIC]: `music`,
        }
        message.channel.send(new MessageEmbed().setTitle("Help.").addField(client.categories, `\`${config.prefix}help ${helpmap[type]}\``))
    }
}