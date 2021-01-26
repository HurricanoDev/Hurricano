const Discord = require('discord.js')

module.exports = {
    name: "ping",
    aliases: ["latency", "pong"],
    description: "Returns the bot's ping!",
    run: async(client, message) => {
        const embed = new Discord.MessageEmbed()
        .setTitle("Bot's ping")
        .setDescription(`Ping - ${client.ws.ping}ms`)
        .setColor('BLACK')
        message.channel.send(embed)
    }
}