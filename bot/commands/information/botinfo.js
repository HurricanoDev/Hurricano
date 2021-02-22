const Discord = require('discord.js');

module.exports = {
  name: "botinfo",
  description: "About the bot!",
  aliases: ["info", "bi"],
  permissions: 'SEND_MESSAGES',
  run: async (message, args) => {
    const embed = new Discord.MessageEmbed()
    .setAuthor("DragonNight Botinfo", "https://media.discordapp.net/attachments/803204453321670700/804127160104648704/circle-cropped_15.png")
    .setColor("#034ea2")
    .setImage("https://media.discordapp.net/attachments/803204453321670700/804129586664701968/Botinfo.png?width=1025&height=342")
    .addField("Description", "DragonNight was created in January of 2021. DragonNight's theme colour is blue. The bot also is related to the theme of Dragon's and Night's by the name of course. DragonNight's owners own a server called Dragon World too.")
    .addField("Extra Information", `<:DragonNight_Ping:804131592062632008> Ping: \`${message.client.ws.ping}\`ms\n<:DragonNight_Owner:804132731834466356> Owners: \`Dragonizedpizza\`, \`NightZan999\`, \`Militia21\`\n<:DragonNight_Servers:804133920324452392> Servers: \`${message.client.guilds.cache.size} Servers\`\n<:DragonNight_Users:804135471269412884> Users: \`${message.client.users.cache.size} Users\``)
    message.reply(embed)
  }
}
