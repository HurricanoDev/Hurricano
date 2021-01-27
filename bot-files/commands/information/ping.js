const Discord = require('discord.js')

module.exports = {
    name: "ping",
    aliases: ["latency", "pong"],
    description: "Returns the bot's ping!",
    run: async(client, message) => {
        const embed = new Discord.MessageEmbed()
        .setAuthor("DragonNight Latency", "https://media.discordapp.net/attachments/803204453321670700/803930305135116288/circle-cropped_13.png")
        .addField("Latency", `\`${msg.createdTimestamp - timestamp}ms\``)
        .addField("API Latency", `\`${client.ws.ping}\``)
        .addField("Description", `**Latency** is the amount of time the bot took to send the message. \n ** API latency is the ping to the Discord API.`)
        .setColor('#034ea2')
        .setImage("https://media.discordapp.net/attachments/803204453321670700/803931313483939850/Ping.png?width=1025&height=342")
        message.channel.send(embed)
    }
}
