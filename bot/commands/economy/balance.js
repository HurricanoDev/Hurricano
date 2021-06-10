const Command = require("@Command");
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  name: "balance",
  aliases: ["bal", "coins", "money"],
  slash: false,
  description: "Check how many coins you have.",
  async run(message, args) {
    const target = client.functions.getMember(true, message, args[0]);
    const userData = client.db.users.cache.get(target.id);
    
    const wallet = userData.wallet;
    const bank = userData.bank;

    const balEmbed = new MessageEmbed()
      .setTitle(`${target.user.username}'s balance`)
      .setDescription(
        `**Wallet:** $${wallet}\n**Bank:** $${bank}`
      )
      .setTimestamp()
      .setFooter("🤠");

    message.channel.send(balEmbed);
  },
});
