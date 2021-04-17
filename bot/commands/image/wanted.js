const Discord = require("discord.js");
const Command = require("@Command");

module.exports = new Command({
  name: "wanted",
  cooldown: 5,
  description: "Makes someone's avatar wanted.",
  async run(message, args) {
    const canvacord = require("canvacord");
    let person =
      message.mentions.users.first() ||
      (await message.client.users.fetch(args[0]).catch((e) => {})) ||
      message.author;
    let avatar = person.displayAvatarURL({ dynamic: false, format: "png" });
    const img = await canvacord.Canvas.wanted(avatar);
    const embed = new Discord.MessageEmbed()
      .setTitle("Wanted.")
      .setDescription(`${person.toString()} is now wanted.`)
      .attachFiles([new Discord.MessageAttachment(img, "img.png")])
      .setImage("attachment://img.png");
    message.reply(embed);
  },
});
