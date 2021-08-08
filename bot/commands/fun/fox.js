const Discord = require("discord.js");
const Command = require("@Command");
const fetch = require("node-fetch");
module.exports = new Command({
  name: "fox",
  userPermissions: ["SEND_MESSAGES"],
  cooldown: 7,
  description: "Random pictures of a fox",
  async run(client, message, args) {
    const req = await fetch("https://foxapi.dev/foxes");
    const data = await req.json();
    const embed = new discord.MessageEmbed()
      .setColor("ff8800")
      .setFooter("<3 foxes")
      .setImage(image);

    await message.reply({ embeds: [embed] });
  },
});
