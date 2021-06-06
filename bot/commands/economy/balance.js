const Command = require("@Command");
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  name: "balance",
  aliases: ["bal"],
  slash: false,
  description: "Check how many coins you have.",
  async run(message, args) {
    const target =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.author;
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
