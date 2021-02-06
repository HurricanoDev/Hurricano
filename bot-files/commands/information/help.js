const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const config = require('../../../config.json');
const client = require('../../handler-client/Client.js');
module.exports = {
    name: "help",
    description: "Provides help about the bot.",
    run: async (message, args) => {
        const guildId = message.guild.id;
        const prefixSchema = require('../../schemas/prefix.js');
        let prefix = await prefixSchema.findOne({ _id: guildId })
if (!prefix) prefix = await new prefixSchema({ _id: guildId, prefix: config.prefix }).save();
        const e = new MessageEmbed()
        .setTitle('Help')
        .setDescription(`Use \`${prefix}help (category)\` for commands in that category.`)
    client.categories.forEach(x => e.addField(x,`\`${prefix}help ${x}\``))
        message.channel.send(e)
    }
}