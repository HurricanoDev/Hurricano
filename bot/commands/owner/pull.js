const Command = require('@Command');
const { MessageEmbed } = require('discord.js');
const { exec } = require('child_process');
module.exports = class PullCommand extends Command {
  constructor(client) {
    super(client, {
      name: "pull",
      description: "Pull a change from GitHub."
    });
  };
  async run(message, args) {
    try {
      message.channel.startTyping();
      exec('git reset --hard');
      exec('git pull' || "date", function (err, stdout, stderr) {
        if (err) {
          const emErr = new Discord.MessageEmbed()
            .setAuthor(`GitHub Pull Successful!`, 'https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Success.png')
            .setDescription(
              `\`\`\`xl\n${err.toString().substr(0, 1000)}\n\`\`\``
            )
            .setTimestamp()
            .setFooter(`Requested by: ${message.author.tag}`);
          message.channel.stopTyping(true);
          return message.channel.send(emErr);
        }
        const emSuccess = new Discord.MessageEmbed()
            .setAuthor(`GitHub Pull Successful!`, 'https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Success.png')
            .setDescription(
              `\`\`\`xl\n${stdout}\n\`\`\``
            )
            .setTimestamp()
          .setColor(123456)
          .setFooter(`Requested by: ${message.author.tag}`);
        message.channel.stopTyping(true);
        return message.channel.send(emSuccess).catch((err) => {
          const emSuccess = new Discord.MessageEmbed()
            .setAuthor(`GitHub Pull Successful!`, 'https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Success.png')
            .setDescription(
              `\`\`\`xl\n${stdout}\n\`\`\``
            )
            .setTimestamp()
          .setColor(123456)
          .setFooter(`Requested by: ${message.author.tag}`);
          message.channel.send(emSuccess);
          return message.channel.stopTyping(true);
        });
      });
    } catch (err) {
      const embed = new Discord.MessageEmbed()
            .setAuthor(`GitHub Pull Successful!`, 'https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Success.png')
            .setDescription(
              `\`\`\`xl\n${stdout}\n\`\`\``
            )
            .setTimestamp()
          .setColor(123456)
          .setFooter(`Requested by: ${message.author.tag}`);
      message.channel.send(embed);
      return message.channel.stopTyping(true);
    }
      let response;
      
    await message.channel.awaitMessages(m => m.author.id === message.author.id, {
        max: 1,
        time: 20000,
    }).then(collected => {
        response = collected.first().content.toLowerCase();
    })
      if (!response.includes('yes') || !response.includes('no')) {
     message.sendErrorReply('Invalid Response Provided', 'You did not provide a valid response (`yes` or `no`). I will not reboot the bot right now.')
    }
    if (response.includes('yes')) {
      message.channel.sendSuccess(message, 'Rebooting...', 'Rebooting the bot now.').then(() => process.exit())
  }
    if (response.includes('no')) {
      message.channel.sendSuccess(message, 'Reboot Cancelled.', 'Will not reboot the bot now.')
    }
    }
  }
