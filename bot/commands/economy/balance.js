const Command = require("@Command");
const { MessageEmbed } = require('discord.js');

module.exports = new Command({
  name: 'balance',
  aliases: ['bal'],
  slash: false,
  description: "Check how many coins you have.",
  async run(message, args) {
    const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const userData = client.users.cache.get(target.id);

    const balEmbed = new MessageEmbed()
      .setTitle(`${target.username}'s balance`)
      .setDescription(`**Wallet:** $${userData.wallet}\n**Bank:** $${userData.bank}`)
      .setTimestamp()
      .setFooter("🤠")

    message.channel.send(balEmbed);
  }
});