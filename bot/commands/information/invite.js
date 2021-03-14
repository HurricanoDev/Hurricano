const Discord = require("discord.js");
const emojis = require('../../utilities/emojis.json')
module.exports = {
  name: "invite",
  aliases: ["inv"],
  description: "Invite The Bot!",
  run: async (message) => {

    const embed = new Discord.MessageEmbed()
    .setAuthor("Invite Hurricano™")
    .addField(emojis.plus + "Invite Link", "Click [here](https://discord.com/oauth2/authorize?client_id=803169312827113483&permissions=8&scope=bot) to invite the bot")
    .addField(emojis.info + "Support Server Link", "Click [here](https://discord.gg/dNc3EvABCA) to join the support server.")
    .setColor("#90ee90")
    .setImage("https://media.discordapp.net/attachments/770953232318726144/804251677950869514/Untitled_9.jpg?width=1025&height=342")
    message.reply(embed)
  }
}
