const Command = require("@Command");
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  name: "balance",
  aliases: ["bal"],
  slash: false,
  description: "Check how many coins you have.",
  async run(message, args) {
    const target = client.functions.getMember(true, message, args[0]);
    const userData = client.db.users.cache.get(target.user.id);

    const balEmbed = new MessageEmbed()
      .setTitle(`${target.user.username}'s balance`)
      .setDescription(
        `**Wallet:** $${userData.wallet}\n**Bank:** $${userData.bank}`
      )
      .setTimestamp()
      .setFooter("🤠");

    message.channel.send(balEmbed);
  },
});
