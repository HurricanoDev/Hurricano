const { MessageEmbed } = require('discord.js');
module.exports = {
  name: "setprefix",
  aliases: ["sp", "setp"], 
  permissions: ['MANAGE_MESSAGES', 'MANAGE_CHANNELS'],
  args: true,
  cooldown: 20,
  description: "Set your server's custom prefix!",
  run: async (message, args) => {
    const prefix = args[0]

    await message.client.db.guild.updatePrefix(message.guild.id, prefix)
    
    const embed = new MessageEmbed()
    .setTitle(`${emojis.fail} Server Settings Change.`)
    .setDescription(`The prefix is now \`${prefix}\`.`)
    
    message.reply(embed)
  }
}