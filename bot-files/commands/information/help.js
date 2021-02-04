const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const config = require('../../../config.json')
module.exports = {
    name: "help",
    description: "Provides help about the bot.",
    run: async (message, args) => {
        const make = (args[0]) ? args[0].toLowerCase() : '';
        const { INFORMATION, FUN } = client.categories;
        const helpmap = {
            [INFORMATION]: `information`,
            [FUN]: `fun`
        }
        const e = new MessageEmbed()
        .setTitle('Help')
        .setDescription(`Use \`${config.prefix}help (category)\` for commands in that category.`)
        .addFields(helpmap, `\`${config.prefix}help ${helpmap}\``)
        message.channel.send(e)
    }
}