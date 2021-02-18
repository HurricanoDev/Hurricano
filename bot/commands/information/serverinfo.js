const { MessageEmbed } = require("discord.js"); 
module.exports = {
    name: 'serverinfo',
    aliases: ['serveri', 'si', 'guildinfo', 'gi'],
    description: 'Shows information about the server!', 
    run: async(message) => {
        const em = new MessageEmbed();
        em.setTitle(`Info about ${message.guild}`); 
        em.setColor("#FF0000"); 
        em.addField('Owner:', `${message.guild.owner}`)
        message.channel.send(em); 
    }
}