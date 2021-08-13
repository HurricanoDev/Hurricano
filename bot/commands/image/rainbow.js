const Discord = require('discord.js'),
  { MessageAttachment } = require('discord.js');
const Command = require('@Command');
module.exports = new Command({
  name: 'rainbow',
  cooldown: 5,
  description: "Makes someone's avatar rainbow!",
  async run(message, args) {
    const canvacord = require('canvacord');
    let person = (await client.functions.getMember(true, message, args[0]))
      .user;
    let avatar = person.displayAvatarURL({
      dynamic: false,
      format: 'png',
      size: 1024,
    });
    const img = await canvacord.Canvas.rainbow(avatar);
    const embed = new Discord.MessageEmbed()
      .setAuthor('🌈', message.author.displayAvatarURL())
      .setDescription(`${person.toString()} is a   r a i n b o w .`)
      .attachFiles([new Discord.MessageAttachment(img, 'img.png')])
      .setImage('attachment://img.png');
    message.reply({
      embeds: [embed],
      files: [new MessageAttachment(img, 'img.png')],
    });
  },
});
