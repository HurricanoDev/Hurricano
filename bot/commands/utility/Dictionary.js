const Command = require("@Command");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = new Command({
  name: "Dictionary",
  aliases: ["dictionary", "dict"],
  cooldown: 30,
  usage: "github <user> repository",
  description:
    "fetches some information about a particular word specified by the user.",
  async run(message, args) {
    const text = args.join(' ');
    fetch(`https://api.urbandictionary.com/v0/define?term=${text}`)
      .then(res => res.json())
      .then(json => {
        const embed = new MessageEmbed()
          .setColor('#BB7D61')
          .setTitle(`${text}`)
          .setAuthor(
            'Urban Dictionary',
            'https://i.imgur.com/vdoosDm.png',
            'https://urbandictionary.com'
          )
          .setDescription(
            `*${json.list[Math.floor(Math.random() * 1)].definition}*`
          )
          .setURL(json.list[0].permalink)
          .setTimestamp()
          .setFooter('Powered by UrbanDictionary', '');
        message.channel.send(embed);
        return;
      })
  },
});
