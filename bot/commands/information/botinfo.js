const Discord = require('discord.js');
const emojis = require('../../utilities/emojis.json');
module.exports = {
  name: "botinfo",
  description: "About the bot!",
  aliases: ["info", "bi"],
  permissions: 'SEND_MESSAGES',
  run: async (message, args) => {
    const embed = new Discord.MessageEmbed()
    .setAuthor("Hurricano™ Botinfo", "https://media.discordapp.net/attachments/803204453321670700/804127160104648704/circle-cropped_15.png")
    .setColor("#034ea2")
    .setImage("https://media.discordapp.net/attachments/803204453321670700/804129586664701968/Botinfo.png?width=1025&height=342")
    .addField("Description", "Hurricano™ was created in January of 2021. It's theme colour is blue. It's also open source! You can check out its repository by clicking [here](https://github.com/HurricanoBot/Hurricano). It's owners own a server called Dragon World too.")
    .addField("Extra Information", `${emojis.ping} Ping: \`${message.client.ws.ping}\`ms\n${emojis.owner} Owners: \`Dragonizedpizza\`, \`NightZan999\`, \`Militia21\`, \`Anogh297\`. \n${emojis.servers} Servers: \`${message.client.guilds.cache.size} Servers.\`\n${emojis.users} Users: \`${message.client.users.cache.size} Users.\``)
    message.reply(embed)
  }
}
