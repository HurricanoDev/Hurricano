const Discord = require("discord.js");
const Command = require("@Command");

module.exports = new Command({
  name: "blur",
  cooldown: 5,
  description: "Blur you!",
  async run(message, args) {
    const canvacord = require("canvacord");
    let person =
      message.mentions.users.first() ||
      (await message.client.users.fetch(args[0]).catch((e) => {})) ||
      message.author;
    let avatar = person.displayAvatarURL({ dynamic: false, format: "png" });
    const img = await canvacord.Canvas.burn(avatar, 4);
    const embed = new Discord.MessageEmbed()
      .setTitle("Where are my glasses?")
      .setDescription(`Can't see anything without my darn glasses...`)
      .attachFiles([new Discord.MessageAttachment(img, "img.png")])
      .setImage("attachment://img.png");
    message.reply(embed);
  },
});
