const Discord = require('discord.js')

module.exports = {
    name: "ping",
    aliases: ["latency", "pong"],
    description: "Returns the bot's ping!",
    run: async(client, message) => {
        const embed = new Discord.MessageEmbed()
        .setAuthor("<:DragonNight_Settings:803919154405965864> DragonNight Latency")
        .setDescription(`Client Latency - \`\`${client.ws.ping}\ms`)
        .setColor('#034ea2')
        message.channel.send(embed)
    }
}
