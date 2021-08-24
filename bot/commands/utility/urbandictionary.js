const Command = require("@Command");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = new Command({
  name: "urbandictionary",
  aliases: ["urband", "urbandict"],
  cooldown: 30,
  usage: "dictionary <word>",
  description:
    "Fetches some information about a particular word specified by the user.",
  async run(message, args) {
    const text = args.join(" ");
    if (!text)
      return message.channel.sendError(
        message,
        "Error.",
        `Usage: \`${message._usedPrefix}urbandictionary <word>\``
      );
    fetch(`https://api.urbandictionary.com/v0/define?term=${text}`)
      .then((res) => res.json())
      .then((json) => {
        const embed = new MessageEmbed()
          .setColor("#BB7D61")
          .setTitle(`${text}`)
          .setAuthor(
            "Urban Dictionary",
            "https://i.imgur.com/vdoosDm.png",
            "https://urbandictionary.com"
          )
          .setDescription(
            `*${json.list[Math.floor(Math.random() * 1)].definition}*`
          )
          .setURL(json.list[0].permalink)
          .setTimestamp()
          .setFooter("Powered by UrbanDictionary", "");
        message.channel.send({ embeds: [embed] });
        return;
      });
  },
});
