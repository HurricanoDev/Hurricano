const { MessageEmbed } = require("discord.js"); 
// import { MessageEmbed } from "discord.js"; 

module.exports = {
    name: 'botinfo',
    description: 'Shows you information about DragonNight',
    aliases: ["bi", "botinformation", "informationbot", "infobot"]
    guildOnly: true,
    run: async(client, message) {
        const e = new MessageEmbed()
        .setTitle("Botinfo")
        message.channel.send(e); 
    }
}
