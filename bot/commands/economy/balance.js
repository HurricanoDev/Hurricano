const Command = require("@Command");
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  name: "balance",
  aliases: ["bal", "coins", "money"],
  slash: false,
  description: "Check how many coins you have.",
  async run(message, args) {
    const target = client.functions.getMember(true, message, args[0]) || message.author;
    const userData = client.db.users.cache.get(target.user.id);
    
    const wallet = userData.wallet;
    const bank = userData.bank;

    const balEmbed = new MessageEmbed()
      .setTitle(`${target.user.username}'s balance`)
      .setDescription(
        `**Wallet:** $${parseInt(wallet)}\n**Bank:** $${parseInt(bank)}`
      )
      .setTimestamp()
      .setFooter("🤠");

    message.channel.send(balEmbed);
  },
});
