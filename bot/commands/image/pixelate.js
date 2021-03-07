const Discord = require('discord.js');

  
module.exports = {
    name: "pixelate",
    cooldown: 5,
    description: "Shows a pixelated version of someone's avatar!",
    run: async(message, args) => {
    
      const canvacord = require('canvacord')
      let person = message.mentions.users.first() || await message.client.users.fetch(args[0]).catch(e => {}) || message.author;
      let avatar = person.displayAvatarURL({ dynamic: false, format: 'png' });
      const img = await canvacord.Canvas.pixelate(avatar)
      const embed = new Discord.MessageEmbed()
      .setTitle('P i x e l a t e d')
      .setDescription(`${person.toString()} in Minecraft:`)
      .attachFiles([new Discord.MessageAttachment(img, "img.png")])
      .setImage('attachment://img.png')
      message.reply(embed) 
    },
  };