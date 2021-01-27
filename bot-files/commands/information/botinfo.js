const { MessageEmbed } = require("discord.js"); 
// import { MessageEmbed } from "discord.js"; (for ts, but imagine using TS LMAO)

module.exports = {
    name: 'botinfo',
    description: 'Shows you information about DragonNight',
    guildOnly: true,
    aliases: ["bi", "botinformation", "informationbot", "infobot"],

    run: async(client, message) => {
        const e = new MessageEmbed()
        .setTitle("DragonNight Botinfo!")
        .setDescription('Work in progress uwu')
        message.channel.send(e); 
    }
}
