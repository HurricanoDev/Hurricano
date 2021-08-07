const { exec } = require('child_process');
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const Command = require('@Command');

module.exports = new Command({
  name: 'exec',
  description:
    'Executes the provided code in the bash console and shows the output.',
  ownerOnly: true,
  async run(message, args) {
    try {
      message.channel.startTyping();
      exec(args.join(' ') || 'date', function (err, stdout, stderr) {
        if (err) {
          const emErr = new Discord.MessageEmbed()
            .setAuthor(`Command Executed!`)
            .addField(`📥 INPUT 📥`, `\`\`\`xl\n${args.join(' ')}\`\`\``)
            .addField(`📤 OUTPUT 📤`)
            .setTimestamp()
            .setColor('#FF0000')
            .setFooter(`Requested by: ${message.author.tag}`);
          message.channel.stopTyping(true);
          return message.channel.send({ embeds: [emErr] });
        }
        const emSuccess = new Discord.MessageEmbed()
          .setAuthor(`Command Executed!`)
          .addField(`📥 INPUT 📥`, `\`\`\`xl\n${args.join(' ')}\`\`\``)
          .addField(`📤 OUTPUT 📤`, `\`\`\`xl\n${stdout}\n\`\`\``)
          .setTimestamp()
          .setColor(123456)
          .setFooter(`Requested by: ${message.author.tag}`);
        message.channel.stopTyping(true);
        return message.channel.send(emSuccess).catch((err) => {
          const emSuccess = new Discord.MessageEmbed()
            .setAuthor(`Command Executed!`)
            .addField(`📥 INPUT 📥`, `\`\`\`xl\n${args.join(' ')}\`\`\``)
            .addField(
              `📤 OUTPUT 📤`,
              `\`\`\`xl\n${stdout.substr(0, 1000)}\n\`\`\``,
            )
            .setTimestamp()
            .setColor(123456)
            .setFooter(`Requested by: ${message.author.tag}`);
          message.channel.send({ embeds: [emSuccess] });
          return message.channel.stopTyping(true);
        });
      });
    } catch (err) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(`Command Executed!`)
        .addField(`📥 INPUT 📥`, `\`\`\`xl\n${args.join(' ')}\`\`\``)
        .addField(`📤 OUTPUT 📤`, `\`\`\`xl\n${err.toString()}\n\`\`\``)
        .setTimestamp()
        .setColor('#FF0000')
        .setFooter(`Requested by: ${message.author.tag}`);
      message.channel.send({ embeds: [embed] });
      return message.channel.stopTyping(true);
    }
  },
});
