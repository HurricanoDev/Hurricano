const { MessageEmbed } = require('discord.js');
const Command = require('@Command');

module.exports = new Command({
  name: 'howgay',
  aliases: ['gayrate'],
  description: 'How gay are you? Find out now.',
  clientPermissions: ['SEND_MESSAGES'],
  async run(message, args) {
    const gayrate = Math.floor(Math.random() * 101);
    const who = args.join(' ') || 'You';
    let desc;
    if (who === 'You') {
      desc = `You are ${gayrate}% gay 🏳️‍🌈`;
    } else desc = `${who} is ${gayrate}% gay 🏳️‍🌈`;
    const embed = new MessageEmbed()
      .setTitle('Howgay Machine')
      .setDescription(`${desc}`);

    message.channel.send({ embeds: [embed] });
  },
});
