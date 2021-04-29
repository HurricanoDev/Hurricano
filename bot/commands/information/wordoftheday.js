const Command = require("@Command");
const { MessageEmbed } = require("discord.js");
const wotd = require("words-of-the-day");

module.exports = new Command({
  name: "wordoftheday",
  aliases: ["wotd"],
  slash: true,
  double: false,
  description: "Get the word of the day",
  async run(message, args, quicksend) {
      wotd.merriamWebster().then(data => {
      const embed = new MessageEmbed();
      embed.setTitle("Word of the day!");
      embed.setDescription(
        `**Word:** \`${data.word}\`\n**Meaning:** \`${data.meaning}\``
      );
      embed.setColor("RANDOM");
      embed.setFooter(`Date: ${data.date}`);

      message.channel.send(embed);
    });
  },
});
