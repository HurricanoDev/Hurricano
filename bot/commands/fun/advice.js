const { MessageEmbed } = require('discord.js');
const Command = require('@Command');
const fetch = require('node-fetch');
module.exports = new Command({
  name: 'advice',
  userPermissions: ['SEND_MESSAGES'],
  cooldown: 20,
  description: 'gives a random advice.',
  async run(message, args) {
    fetch('https://api.adviceslip.com/advice')
      .then((res) => res.json())
      .then((json) => {
        const embed = new MessageEmbed()
          .setColor('#403B3A')
          .setAuthor(
            'Advice Slip',
            'https://i.imgur.com/8pIvnmD.png',
            'https://adviceslip.com/',
          )
          .setDescription(json.slip.advice)
          .setTimestamp()
          .setFooter('Powered by adviceslip.com', '');
        message.channel.send({ embeds: [embed] });
        return;
      })
      .catch((err) => {
        message.reply('Failed to deliver advice :sob:');
        return console.error(err);
      });
  },
});
